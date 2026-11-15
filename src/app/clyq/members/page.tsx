// @ts-nocheck
'use client'
import { useState } from 'react'
import { Page, Kpis, Badge, Empty } from '../_ui'
import { useOrders, useKV, phoneKey, won, dt, DONE } from '../../lib/orders'
import { balance } from '../../lib/auth'

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
  const [signed] = useKV('clyq_members', [])
  const fmtP = p => (p || '').replace(/^(\d{3})(\d{3,4})(\d{4})$/, '$1-$2-$3')
  const list = all.filter(m => !q || (m.name + m.phone).includes(q))
  return (
    <Page title="회원 목록" sub="주문·피팅 신청 기록으로 집계한 고객">
      <div className="ad-card">
        <div className="ad-ch">가입 회원 ({signed.length}명)<span style={{ fontWeight: 400, fontSize: 12, color: '#767676' }}>쇼핑몰 회원가입으로 저장된 정보 · 비밀번호는 해시로만 저장되며 여기서 볼 수 없어요</span></div>
        {signed.length === 0 ? <Empty>아직 가입한 회원이 없어요.</Empty> : (
          <div className="ad-scroll"><table className="ad-tbl">
            <thead><tr><th>이름</th><th>이메일</th><th>연락처</th><th>가입일시</th><th className="ad-c">마케팅 동의</th><th className="ad-c">취향 분석</th><th className="ad-r">위디 잔액</th></tr></thead>
            <tbody>{[...signed].reverse().map(m => (
              <tr key={m.id}><td><b>{m.name}</b></td><td>{m.email}</td><td>{fmtP(m.phone)}</td><td>{dt(m.joinedAt)}</td><td className="ad-c">{m.marketing ? '동의' : '-'}</td><td className="ad-c">{m.style ? '완료' : '-'}</td><td className="ad-r">{balance(m).toLocaleString()}P</td></tr>
            ))}</tbody>
          </table></div>
        )}
      </div>
      <div className="ad-note">아래 목록은 가입 여부와 무관하게 주문·피팅 신청에 입력된 이름·연락처로 고객을 묶어 보여줘요. 가입 정보는 브라우저 저장소에만 있어 다른 기기의 가입자는 보이지 않으며, 등급 관리는 서버 DB 연동 후에 가능합니다.</div>
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
