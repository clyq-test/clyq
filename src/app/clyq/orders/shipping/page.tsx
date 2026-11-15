// @ts-nocheck
'use client'
import { useState } from 'react'
import { Page, Kpis, Badge, Empty, itemsText } from '../../_ui'
import { useOrders, setStatus, patchOrder, CARRIERS, dt, won } from '../../../lib/orders'

const WAIT = ['주문접수', '상품준비', '신청접수', '발송준비']
export default function Shipping() {
  const [orders] = useOrders()
  const [tab, setTab] = useState('wait')
  const [draft, setDraft] = useState({})
  const wait = orders.filter(o => WAIT.includes(o.status))
  const ship = orders.filter(o => o.status === '배송중')
  const list = tab === 'wait' ? wait : ship
  const d = (id, k, v) => setDraft(p => ({ ...p, [id]: { carrier: CARRIERS[0], no: '', ...(p[id] || {}), [k]: v } }))

  function out(o) {
    const x = { carrier: CARRIERS[0], no: '', ...(draft[o.id] || {}) }
    if (!x.no.trim()) { alert('송장번호를 입력해 주세요.'); return }
    patchOrder(o.id, n => { n.tracking = { carrier: x.carrier, no: x.no.trim() }; return n }, `송장 등록 ${x.carrier} ${x.no.trim()}`)
    setStatus(o.id, '배송중')
  }
  function arrive(o) { setStatus(o.id, o.kind === 'fitting' ? '피팅중' : '배송완료') }

  return (
    <Page title="배송 관리" sub="출고 처리와 배송 완료 처리">
      <Kpis items={[{ l: '출고 대기', v: wait.length + '건' }, { l: '배송중', v: ship.length + '건' }]} />
      <div className="ad-card">
        <div className="ad-bar">
          <button className={'ad-chip' + (tab === 'wait' ? ' on' : '')} onClick={() => setTab('wait')}>출고 대기 ({wait.length})</button>
          <button className={'ad-chip' + (tab === 'ship' ? ' on' : '')} onClick={() => setTab('ship')}>배송중 ({ship.length})</button>
        </div>
        {list.length === 0 ? <Empty>{tab === 'wait' ? '출고 대기 중인 주문이 없어요.' : '배송 중인 주문이 없어요.'}</Empty> : (
          <div className="ad-scroll"><table className="ad-tbl">
            <thead><tr><th>주문번호</th><th>구분</th><th>수령인</th><th>배송지</th><th>상품</th><th className="ad-c">상태</th><th>{tab === 'wait' ? '송장 입력 · 출고' : '송장 · 완료'}</th></tr></thead>
            <tbody>{list.map(o => (
              <tr key={o.id}>
                <td className="ad-mono">{o.id}</td><td>{o.kind === 'fitting' ? '피팅' : '구매'}</td><td>{o.customer.name}<br /><span style={{ color: '#767676', fontSize: 13 }}>{o.customer.phone}</span></td>
                <td style={{ whiteSpace: 'normal', minWidth: 180 }}>{o.customer.addr} {o.customer.addr2}</td><td>{itemsText(o)}</td><td className="ad-c"><Badge s={o.status} /></td>
                <td>{tab === 'wait' ? (
                  <div className="ad-row">
                    <select className="ad-inp" value={(draft[o.id] || {}).carrier || CARRIERS[0]} onChange={e => d(o.id, 'carrier', e.target.value)} aria-label="택배사">{CARRIERS.map(c => <option key={c}>{c}</option>)}</select>
                    <input className="ad-inp" style={{ width: 150 }} placeholder="송장번호" value={(draft[o.id] || {}).no || ''} onChange={e => d(o.id, 'no', e.target.value)} />
                    <button className="ad-btn p s" onClick={() => out(o)}>출고 처리</button>
                  </div>
                ) : (
                  <div className="ad-row"><span>{o.tracking ? `${o.tracking.carrier} ${o.tracking.no}` : '-'}</span>
                    <button className="ad-btn p s" onClick={() => arrive(o)}>{o.kind === 'fitting' ? '수령 확인(피팅 시작)' : '배송 완료'}</button></div>
                )}</td>
              </tr>))}</tbody>
          </table></div>
        )}
      </div>
      <div className="ad-note">피팅박스는 ‘수령 확인’을 누른 시점부터 48시간이 피팅 기간으로 계산돼요. 실제 택배사 배송 추적 연동은 아직 없어서 완료 처리는 수동입니다.</div>
    </Page>
  )
}
