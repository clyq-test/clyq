// @ts-nocheck
'use client'
import { useState, useEffect } from 'react'
import { kvRead, kvWrite, logAct } from './orders'

/* 회원 데이터는 현재 브라우저 localStorage에 저장됩니다(서버 DB·인증 연동 전 프로토타입).
   - 다른 브라우저/기기에서는 가입 정보가 보이지 않고, 같은 브라우저에서만 로그인됩니다.
   - 비밀번호는 PBKDF2(SHA-256)로 해시해 저장하지만, 브라우저 저장소 특성상 실서비스 보안 수준이 아닙니다.
   서비스 오픈 전 Supabase Auth 등 서버 인증으로 교체해야 합니다. */
export const SIGNUP_BONUS = 500
export const MARKETING_BONUS = 100
export const STYLE_BONUS = 500

const MEMBERS = 'clyq_members'
const SESSION = 'clyq_user'
const pad = n => String(n).padStart(2, '0')
const today = () => { const d = new Date(); return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}` }
const b64 = buf => btoa(String.fromCharCode(...new Uint8Array(buf)))
const unb64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0))

async function hash(pw, saltB64) {
  const salt = saltB64 ? unb64(saltB64) : crypto.getRandomValues(new Uint8Array(16))
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(pw), 'PBKDF2', false, ['deriveBits'])
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' }, key, 256)
  return { salt: b64(salt), hash: b64(bits) }
}

export const normEmail = e => (e || '').trim().toLowerCase()
export const normPhone = p => (p || '').replace(/\D/g, '')
export const members = () => kvRead(MEMBERS, [])
export const balance = m => (m.ledger || []).reduce((s, l) => s + l.amount, 0)
export const publicInfo = m => m && ({ id: m.id, name: m.name, email: m.email })

function setSession(m) {
  kvWrite(SESSION, publicInfo(m))
  kvWrite('clyq_cid', m.id) // 로그인한 회원의 주문이 계정에 묶이도록
}

export function emailTaken(email) { return members().some(m => m.email === normEmail(email)) }

export async function signupMember(f) {
  const email = normEmail(f.email)
  if (emailTaken(email)) return { ok: false, field: 'email', error: '이미 가입된 이메일이에요' }
  const { salt, hash: pwHash } = await hash(f.pw)
  const m = {
    id: 'M' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    name: f.name.trim(), email, phone: normPhone(f.phone), birthdate: f.birthdate || '', gender: f.gender || '',
    referral: (f.referral || '').trim(), marketing: !!f.marketing,
    agreed: { service: true, privacy: true, fitting: true, marketing: !!f.marketing, at: new Date().toISOString() },
    joinedAt: new Date().toISOString(), salt, pwHash, styleRewarded: false, style: null,
    ledger: [{ date: today(), desc: '가입 축하 포인트', amount: SIGNUP_BONUS, type: 'earn' }],
  }
  if (m.marketing) m.ledger.push({ date: today(), desc: '마케팅 수신 동의 보너스', amount: MARKETING_BONUS, type: 'earn' })
  kvWrite(MEMBERS, [...members(), m])
  setSession(m)
  logAct(`회원 가입 ${m.name} (${m.email})`, '고객')
  return { ok: true, member: m }
}

export async function loginMember(email, pw) {
  const m = members().find(x => x.email === normEmail(email))
  const bad = { ok: false, error: '이메일 또는 비밀번호가 올바르지 않아요' }
  if (!m) return bad
  const { hash: h } = await hash(pw, m.salt)
  if (h !== m.pwHash) return bad
  setSession(m)
  return { ok: true, member: m }
}

export function logoutMember() {
  try { localStorage.removeItem(SESSION) } catch {}
  window.dispatchEvent(new Event('clyq-data'))
}

export function updateMember(id, patch) {
  kvWrite(MEMBERS, members().map(m => m.id === id ? { ...m, ...patch } : m))
  const s = kvRead(SESSION, null)
  if (s && s.id === id && patch.name) kvWrite(SESSION, { ...s, name: patch.name })
}

// 취향 분석 저장. 최초 1회만 포인트 지급.
export function saveStyle(id, data) {
  let rewarded = false
  kvWrite(MEMBERS, members().map(m => {
    if (m.id !== id) return m
    const n = { ...m, style: data }
    if (!m.styleRewarded) { n.styleRewarded = true; n.ledger = [...(m.ledger || []), { date: today(), desc: 'AI 취향 분석 입력', amount: STYLE_BONUS, type: 'earn' }]; rewarded = true }
    return n
  }))
  try { localStorage.setItem('clyq_style', JSON.stringify(data)) } catch {}
  return rewarded
}

export function useMember() {
  const [m, setM] = useState(null)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const r = () => { const s = kvRead(SESSION, null); setM(s ? members().find(x => x.id === s.id) || null : null); setReady(true) }
    r(); window.addEventListener('clyq-data', r); window.addEventListener('storage', r)
    return () => { window.removeEventListener('clyq-data', r); window.removeEventListener('storage', r) }
  }, [])
  return [m, ready]
}
