// @ts-nocheck
'use client'
import { useState } from 'react'
import { Page, Kpis, Badge, Empty } from '../_ui'
import { useOrders, phoneKey, won, dt, DONE } from '../../lib/orders'

export function buildMembers(orders) {
  const m = {}
  orders.forEach(o => {
    const k = phoneKey(o.customer.phone) || o.customer.name
    const x = m[k] || (m[k] = { key: k, name: o.customer.name, phone: o.customer.phone, addr: o.customer.addr, orders: [], first: o.createdAt, last: o.createdAt })
    x.orders.push(o)
    if (o.createdAt < x.first) x.first = o.createdAt
    if (o.createdAt > x.last) { x.last = o.createdAt; x.name = o.customer.name; x.addr = o.customer.addr }
  })
  return Object.values(m).map(x => ({ ...x, spent: x.orders.filter(o => DONE.includes(o.status)).reduce((n, o) => n + o.total, 0), fits: x.orders.filter(o => o.kind === 'fitting').length })).sort((a, b) => b.last.localeCompare(a.last))
}

export default function Members() {
  const [orders, , ready] = useOrders()
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(null)
  const all = buildMembers(orders)
  const list = all.filter(m => !q || (m.name + m.phone).includes(q))
  return (
    <Page title="회원 목록" sub="주문·피팅 신청 기록으로 집계한 고객">
      <div className="ad-note">회원가입 DB가 아직 없어서, 주문과 피팅 신청에 입력된 이름·연락처를 기준으로 고객을 묶어 보여줘요. 가입 정보·등급 관리는 회원 DB 연동 후에 가능합니다.</div>
      <Kpis items={[{ l: '고객 수', v: all.length + '명' }, { l: '피팅 신청 고객', v: all.filter(m => m.fits).length + '명' }, { l: '구매 확정 고객', v: all.filter(m => m.spent > 0).length + '명' }]} />
      <div className="ad-card">
        <div className="ad-bar"><input className="ad-inp" style={{ minWidth: 220 }} placeholder="이름·연락처 검색" value={q} onChange={e => setQ(e.target.value)} /></div>
        {!ready || list.length === 0 ? <Empty>아직 집계된 고객이 없어요.</Empty> : (
          <div className="ad-scroll"><table className="ad-tbl">
            <thead><tr><th>이름</th><th>연락처</th><th>주소</th><th className="ad-c">주문</th><th className="ad-c">피팅</th><th className="ad-r">확정 구매액</th><th>최근 주문</th></tr></thead>
            <tbody>{list.map(m => (<>
              <tr key={m.key} className="click" onClick={() => setOpen(open === m.key ? null : m.key)}>
                <td><b>{m.name}</b></td><td>{m.phone}</td><td>{m.addr}</td><td className="ad-c">{m.orders.length}</td><td className="ad-c">{m.fits}</td><td className="ad-r">{won(m.spent)}</td><td>{dt(m.last)}</td>
              </tr>
              {open === m.key && <tr key={m.key + 'd'}><td colSpan={7} style={{ background: '#f9f9f7', whiteSpace: 'normal' }}>
                {m.orders.map(o => <div key={o.id} style={{ padding: '4px 0', fontSize: 13 }}><span className="ad-mono">{o.id}</span> · {dt(o.createdAt)} · {won(o.total)} · <Badge s={o.status} /></div>)}
              </td></tr>}
            </>))}</tbody>
          </table></div>
        )}
      </div>
    </Page>
  )
}
