// @ts-nocheck
'use client'
import { useState, useEffect } from 'react'

/* 찜·장바구니: 브라우저 localStorage에 저장 (서버 연동 전) */
const KEY = 'clyq_shop'
const EMPTY = { wish: [], cart: [] }
function read() {
  try { const v = JSON.parse(localStorage.getItem(KEY) || 'null'); return v && Array.isArray(v.wish) && Array.isArray(v.cart) ? v : EMPTY } catch { return EMPTY }
}
function write(v) {
  try { localStorage.setItem(KEY, JSON.stringify(v)) } catch {}
  window.dispatchEvent(new Event('clyq-shop'))
}

export function useShop() {
  const [s, setS] = useState(EMPTY)
  useEffect(() => {
    const r = () => setS(read())
    r()
    window.addEventListener('clyq-shop', r)
    window.addEventListener('storage', r)
    return () => { window.removeEventListener('clyq-shop', r); window.removeEventListener('storage', r) }
  }, [])
  return {
    wish: s.wish,
    cart: s.cart,
    cartCount: s.cart.reduce((n, c) => n + c.qty, 0),
    isWished: id => s.wish.includes(id),
    toggleWish: id => { const c = read(); write({ ...c, wish: c.wish.includes(id) ? c.wish.filter(x => x !== id) : [...c.wish, id] }) },
    addCart: (id, size) => {
      const c = read(); const f = c.cart.find(x => x.id === id && x.size === size)
      write({ ...c, cart: f ? c.cart.map(x => x === f ? { ...x, qty: x.qty + 1 } : x) : [...c.cart, { id, size, qty: 1 }] })
    },
    setQty: (id, size, qty) => { const c = read(); write({ ...c, cart: c.cart.map(x => x.id === id && x.size === size ? { ...x, qty: Math.max(1, qty) } : x) }) },
    removeCart: (id, size) => { const c = read(); write({ ...c, cart: c.cart.filter(x => !(x.id === id && x.size === size)) }) },
  }
}
