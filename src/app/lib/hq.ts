// @ts-nocheck
'use client'
import { useOrders, useKV, patchOrder, setStatus, DONE } from './orders'
import { BRAND_INFO, allProducts } from './catalog'

/* 본사 관리 화면(대시보드·피팅 현황·검수·패널티·브랜드 현황)이 주문 데이터를 같은 방식으로 읽도록 모은 계산 함수.
   피팅 1건 = 피팅박스 주문의 제품 1줄. 검수/패널티 결과는 주문(o.inspect, o.penalty)에 저장됩니다. */
const pad = n => String(n).padStart(2, '0')
const D = iso => { if (!iso) return ''; const d = new Date(iso); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` }
const DAY = 86400000
export const mask = n => (n || '').trim().slice(0, 1) + '**'
export const maskPhone = p => { const s = (p || '').replace(/\D/g, ''); return s.length >= 10 ? `${s.slice(0, 3)}-****-${s.slice(-4)}` : '-' }
export const isThisMonth = iso => { if (!iso) return false; const a = new Date(iso), n = new Date(); return a.getFullYear() === n.getFullYear() && a.getMonth() === n.getMonth() }
export const isToday = iso => !!iso && D(iso) === D(new Date().toISOString())
const when = (o, status) => { const h = [...(o.history || [])].reverse().find(x => (x.text || '').startsWith('상태 → ' + status)); return h ? h.at : '' }

export const STAGE = { 신청접수: '신청 대기', 발송준비: '신청 대기', 배송중: '배송중', 피팅중: '피팅중', 반납수거중: '반납 수거중', 검수중: '검수 대기', 반납완료: '반납 완료', 구매확정: '구매 전환', 취소: '취소' }
export const ACTIVE = ['신청 대기', '배송중', '피팅중', '반납 수거중', '검수 대기']
export const isPenalty = o => !!(o.penalty && o.penalty.amount > 0)

export function fitRows(orders) {
  const now = Date.now()
  return orders.filter(o => o.kind === 'fitting').flatMap(o => o.items.map((it, i) => {
    const due = o.fitStartAt ? new Date(new Date(o.fitStartAt).getTime() + 48 * 3600000) : null
    const open = ACTIVE.includes(STAGE[o.status])
    const diff = due ? due.getTime() - now : null
    return {
      key: o.id + ':' + i, id: o.id, orderId: o.id, brand: it.brand, pid: it.pid, product: it.name, size: it.size || '-', price: it.price,
      customer: mask(o.customer.name), phone: maskPhone(o.customer.phone),
      status: o.status, stage: isPenalty(o) ? '훼손 패널티' : STAGE[o.status] || o.status,
      reqDate: D(o.createdAt), shipDate: D(when(o, '배송중')), recvDate: D(o.fitStartAt), returnDue: due ? D(due.toISOString()) : '',
      returnDate: D(when(o, '검수중') || when(o, '반납수거중')), inspDate: D(o.inspect && o.inspect.at),
      converted: o.status === '구매확정', penalty: isPenalty(o),
      dDay: open && diff != null ? Math.floor(diff / DAY) : null, overdue: open && diff != null && diff < 0 && o.status === '피팅중',
      createdAt: o.createdAt, inspect: o.inspect || null,
    }
  })).sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''))
}
export const dLabel = d => d == null ? '-' : d === 0 ? 'D-Day' : d > 0 ? 'D-' + d : '초과 ' + Math.abs(d) + '일'

// 검수 결과 저장 → 주문에 기록하고, 검수중이면 반납완료로 진행
export function saveInspection(id, { result, note, penaltyAmt }) {
  patchOrder(id, o => {
    o.inspect = { result, note: note || '', penaltyAmt: penaltyAmt || 0, at: new Date().toISOString() }
    if (['훼손', '분실'].includes(result) && penaltyAmt > 0) {
      const it = o.items[0]
      o.penalty = { amount: penaltyAmt, status: '청구 대기', damageType: result, detail: note || '', basePrice: it ? it.price : 0, rate: it && it.price ? Math.round(penaltyAmt / it.price * 100) : 0, claimedAt: '', paidAt: '' }
    } else delete o.penalty
    return o
  }, `검수 결과: ${result}${penaltyAmt ? ` (패널티 ${penaltyAmt.toLocaleString()}원)` : ''}`)
  const cur = (JSON.parse(localStorage.getItem('clyq_orders') || '[]')).find(x => x.id === id)
  if (cur && cur.status === '검수중') setStatus(id, '반납완료')
}
export function setPenaltyStatus(id, status) {
  patchOrder(id, o => { const d = D(new Date().toISOString()); o.penalty = { ...o.penalty, status, ...(status === '청구 완료' ? { claimedAt: d } : status === '납부 완료' ? { paidAt: d } : {}) }; return o }, `패널티 ${status}`)
}

// 브랜드별 집계 (이달 기준)
export function brandStats(orders, commission = {}) {
  return BRAND_INFO.map(b => {
    const mine = orders.filter(o => o.items.some(i => i.brand === b.name))
    const fits = mine.filter(o => o.kind === 'fitting')
    const monthFits = fits.filter(o => isThisMonth(o.createdAt))
    const decided = fits.filter(o => isThisMonth(o.createdAt) && ['구매확정', '반납완료'].includes(o.status))
    const converted = decided.filter(o => o.status === '구매확정').length
    const sold = o => o.items.filter(i => i.brand === b.name).reduce((n, i) => n + i.price * i.qty, 0)
    const doneThisMonth = mine.filter(o => DONE.includes(o.status) && isThisMonth(o.doneAt || o.createdAt))
    const monthSales = doneThisMonth.reduce((n, o) => n + sold(o), 0)
    const prods = allProducts.filter(p => p.brand === b.name)
    return {
      name: b.name, products: prods.length, fitting: prods.filter(p => p.fit).length,
      inFitting: fits.filter(o => ACTIVE.includes(STAGE[o.status])).length, monthFit: monthFits.length, converted,
      convRate: decided.length ? Math.round(converted / decided.length * 100) : 0, convKnown: decided.length > 0,
      monthSales, monthOrders: doneThisMonth.length, avgOrder: doneThisMonth.length ? Math.round(monthSales / doneThisMonth.length) : 0,
      commission: commission[b.name] ?? 30, stock: 0, lowStock: 0,
      penalty: fits.filter(o => isPenalty(o) && o.penalty.status !== '납부 완료').length,
      status: fits.some(o => isPenalty(o) && o.penalty.status === '청구 대기') ? '패널티' : '정상',
    }
  })
}
export function useBrandStats() {
  const [orders] = useOrders(); const [rates] = useKV('clyq_commission', {})
  return brandStats(orders, rates || {})
}
