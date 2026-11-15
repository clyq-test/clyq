// @ts-nocheck
'use client'
import { useState, useEffect } from 'react'

/* 주문·운영 데이터는 현재 브라우저 localStorage에 저장됩니다(서버 DB 연동 전).
   같은 브라우저(같은 도메인)의 쇼핑몰과 본사 관리가 같은 데이터를 보지만, 다른 사람/기기와는 공유되지 않습니다.
   서버(Supabase 등)로 옮길 때는 이 파일의 kvRead/kvWrite와 아래 함수들만 교체하면 됩니다. */
const EVT = 'clyq-data'
export function kvRead(key, init) { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : init } catch { return init } }
export function kvWrite(key, val) { try { localStorage.setItem(key, JSON.stringify(val)) } catch {} window.dispatchEvent(new Event(EVT)) }
export function useKV(key, init) {
  const [v, setV] = useState(init)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const r = () => { setV(kvRead(key, init)); setReady(true) }
    r(); window.addEventListener(EVT, r); window.addEventListener('storage', r)
    return () => { window.removeEventListener(EVT, r); window.removeEventListener('storage', r) }
  }, [key])
  return [v, n => kvWrite(key, typeof n === 'function' ? n(kvRead(key, init)) : n), ready]
}
export const useOrders = () => useKV('clyq_orders', [])

export const FLOW = {
  purchase: ['주문접수', '상품준비', '배송중', '배송완료'],
  fitting: ['신청접수', '발송준비', '배송중', '피팅중', '반납수거중', '검수중', '반납완료', '구매확정'],
}
export const ALL_STATUS = {
  purchase: [...FLOW.purchase, '반품완료', '취소'],
  fitting: [...FLOW.fitting, '취소'],
}
export const DONE = ['배송완료', '구매확정'] // 매출로 잡는 상태
export const CARRIERS = ['CJ대한통운', '롯데택배', '한진택배', '우체국택배', '로젠택배']
const pad = (n, l = 2) => String(n).padStart(l, '0')
const now = () => new Date().toISOString()

export function logAct(text, by = '관리자') {
  const l = kvRead('clyq_log', [])
  kvWrite('clyq_log', [{ at: now(), by, text }, ...l].slice(0, 500))
}
export function clientId() {
  let c = kvRead('clyq_cid', null)
  if (!c) { c = 'C' + Math.random().toString(36).slice(2, 10); try { localStorage.setItem('clyq_cid', JSON.stringify(c)) } catch {} }
  return c
}
export function createOrder({ kind, customer, items, sample = false }) {
  const list = kvRead('clyq_orders', [])
  const d = new Date(); const ymd = String(d.getFullYear()).slice(2) + pad(d.getMonth() + 1) + pad(d.getDate())
  const pre = kind === 'fitting' ? 'FIT' : 'ORD'
  const seq = list.filter(o => o.id.startsWith(pre + '-' + ymd)).length + 1
  const order = {
    id: `${pre}-${ymd}-${pad(seq, 3)}`, kind, createdAt: now(), owner: clientId(), sample,
    customer, items, total: items.reduce((n, i) => n + i.price * i.qty, 0),
    status: FLOW[kind][0], payment: '결제 미연결(접수만)', tracking: null, claims: [], memo: '',
    history: [{ at: now(), by: '고객', text: kind === 'fitting' ? '피팅박스 신청' : '주문 접수' }],
  }
  kvWrite('clyq_orders', [order, ...list])
  logAct(`${order.id} 접수 (${customer.name})`, '고객')
  return order
}
export function patchOrder(id, fn, text, by = '관리자') {
  const list = kvRead('clyq_orders', [])
  kvWrite('clyq_orders', list.map(o => {
    if (o.id !== id) return o
    const n = fn({ ...o }) || o
    if (text) n.history = [...(n.history || []), { at: now(), by, text }]
    return n
  }))
  if (text) logAct(`${id} ${text}`, by)
}
export function setStatus(id, status, by = '관리자') {
  patchOrder(id, o => {
    o.status = status
    if (DONE.includes(status)) o.doneAt = now()
    if (status === '피팅중') o.fitStartAt = now()
    return o
  }, `상태 → ${status}`, by)
}
export function nextStatus(o) {
  const f = FLOW[o.kind]; const i = f.indexOf(o.status)
  if (i < 0 || i >= f.length - 1) return null
  if (o.kind === 'fitting' && o.status === '검수중') return '반납완료'
  return f[i + 1]
}
export function addClaim(id, type, reason, by = '관리자') {
  patchOrder(id, o => { o.claims = [...(o.claims || []), { id: 'CL' + Date.now().toString(36), type, reason, status: '접수', at: now(), by, note: '' }]; return o }, `${type} 요청 접수 (${reason || '사유 없음'})`, by)
}
export function setClaim(orderId, claimId, status, note = '') {
  patchOrder(orderId, o => {
    o.claims = o.claims.map(c => c.id === claimId ? { ...c, status, note: note || c.note } : c)
    const c = o.claims.find(x => x.id === claimId)
    if (status === '완료') {
      if (c.type === '취소') { o.status = '취소' }
      if (c.type === '반품' && o.kind === 'purchase') { o.status = '반품완료' }
    }
    return o
  }, `${o_type(orderId, claimId)} ${status}`)
}
function o_type(orderId, claimId) { const o = kvRead('clyq_orders', []).find(x => x.id === orderId); const c = o && o.claims.find(x => x.id === claimId); return c ? c.type : '클레임' }

export const won = n => (n || 0).toLocaleString() + '원'
export const dt = s => { if (!s) return '-'; const d = new Date(s); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}` }
export const ym = s => { const d = new Date(s); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}` }
export const phoneKey = p => (p || '').replace(/\D/g, '')
export const tone = s => ['배송완료', '구매확정', '반납완료', '완료', '정산완료'].includes(s) ? 'g' : ['취소', '반품완료', '거절'].includes(s) ? 'r' : ['주문접수', '신청접수', '접수'].includes(s) ? 'n' : 'b'

/* ── 브랜드 파트너용 ── */
export const brandOrders = (orders, brand) => orders.filter(o => o.items.some(i => i.brand === brand)).map(o => {
  const mine = o.items.filter(i => i.brand === brand)
  return { ...o, mine, myTotal: mine.reduce((n, i) => n + i.price * i.qty, 0) }
})
export function brandStatus(o, brand) {
  if (['취소', '반품완료'].includes(o.status)) return o.status
  if (o.kind === 'fitting') return o.status
  const s = o.ship && o.ship[brand]
  if (s && s.status) return s.status
  if (o.status === '배송중' || o.status === '배송완료') return o.status
  return '출고대기'
}
export function brandShip(id, brand, status, tracking) {
  patchOrder(id, o => {
    const prev = (o.ship || {})[brand] || {}
    o.ship = { ...(o.ship || {}), [brand]: { ...prev, status, tracking: tracking || prev.tracking, at: now() } }
    if (tracking && !o.tracking) o.tracking = tracking
    const sts = [...new Set(o.items.map(i => i.brand))].map(b => o.ship[b] && o.ship[b].status)
    if (sts.every(x => x === '배송완료')) { o.status = '배송완료'; o.doneAt = now() } else if (sts.some(x => x)) { o.status = '배송중' }
    return o
  }, `${brand} ${status}${tracking ? ` (${tracking.carrier} ${tracking.no})` : ''}`, brand)
}
export function addInquiry({ type, brand, pid, orderId, who, text }) {
  const l = kvRead('clyq_inq', [])
  kvWrite('clyq_inq', [{ id: 'Q' + Date.now().toString(36), type, brand, pid, orderId, who, text, at: now(), answer: '', answeredAt: '' }, ...l])
}
export function answerInquiry(id, answer) {
  kvWrite('clyq_inq', kvRead('clyq_inq', []).map(q => q.id === id ? { ...q, answer, answeredAt: now() } : q))
  logAct(`문의 답변 ${id}`, '브랜드')
}
