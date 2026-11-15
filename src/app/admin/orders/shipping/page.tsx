// @ts-nocheck
'use client'
import { useState } from 'react'
import { Page, Kpis, Badge, Empty } from '../../../clyq/_ui'
import { useOrders, brandOrders, brandStatus, brandShip, CARRIERS, dt } from '../../../lib/orders'
import { BRAND } from '../../_brand'

export default function BrandShipping() {
  const [orders] = useOrders()
  const [tab, setTab] = useState('wait')
  const [draft, setDraft] = useState({})
  const mine = brandOrders(orders, BRAND).filter(o => o.kind === 'purchase')
  const wait = mine.filter(o => brandStatus(o, BRAND) === '출고대기')
  const ship = mine.filter(o => brandStatus(o, BRAND) === '배송중')
  const list = tab === 'wait' ? wait : ship
  const d = (id, k, v) => setDraft(p => ({ ...p, [id]: { carrier: CARRIERS[0], no: '', ...(p[id] || {}), [k]: v } }))
  const out = o => { const x = { carrier: CARRIERS[0], no: '', ...(draft[o.id] || {}) }; if (!x.no.trim()) { alert('송장번호를 입력해 주세요.'); return } brandShip(o.id, BRAND, '배송중', { carrier: x.carrier, no: x.no.trim() }) }
  return (
    <Page title="배송중" sub="구매 주문 출고 처리">
      <div className="ad-note">구매 확정된 신제품은 브랜드가 직접 발송해요. 피팅박스(피팅 전용 제품)는 CLYQ가 발송하므로 여기에 나오지 않습니다. 택배사 배송 추적 연동은 아직 없어 배송 완료는 수동 처리예요.</div>
      <Kpis items={[{ l: '출고 대기', v: wait.length + '건' }, { l: '배송중', v: ship.length + '건' }]} />
      <div className="ad-card">
        <div className="ad-bar"><button className={'ad-chip' + (tab === 'wait' ? ' on' : '')} onClick={() => setTab('wait')}>출고 대기 ({wait.length})</button><button className={'ad-chip' + (tab === 'ship' ? ' on' : '')} onClick={() => setTab('ship')}>배송중 ({ship.length})</button></div>
        {list.length === 0 ? <Empty>{tab === 'wait' ? '출고 대기 주문이 없어요.' : '배송 중인 주문이 없어요.'}</Empty> : (
          <div className="ad-scroll"><table className="ad-tbl"><thead><tr><th>주문번호</th><th>수령인</th><th>배송지</th><th>상품</th><th className="ad-c">상태</th><th>{tab === 'wait' ? '송장 입력 · 출고' : '송장 · 완료'}</th></tr></thead>
            <tbody>{list.map(o => <tr key={o.id}>
              <td className="ad-mono">{o.id}</td><td>{o.customer.name}<br /><span style={{ color: '#767676', fontSize: 13 }}>{o.customer.phone}</span></td>
              <td style={{ whiteSpace: 'normal', minWidth: 170 }}>{o.customer.addr} {o.customer.addr2}</td><td>{o.mine.map(i => `${i.name}(${i.size || '-'}) ×${i.qty}`).join(', ')}</td><td className="ad-c"><Badge s={brandStatus(o, BRAND)} /></td>
              <td>{tab === 'wait' ? <div className="ad-row">
                <select className="ad-inp" value={(draft[o.id] || {}).carrier || CARRIERS[0]} onChange={e => d(o.id, 'carrier', e.target.value)} aria-label="택배사">{CARRIERS.map(c => <option key={c}>{c}</option>)}</select>
                <input className="ad-inp" style={{ width: 140 }} placeholder="송장번호" value={(draft[o.id] || {}).no || ''} onChange={e => d(o.id, 'no', e.target.value)} />
                <button className="ad-btn p s" onClick={() => out(o)}>출고 처리</button></div>
                : <div className="ad-row"><span>{o.ship && o.ship[BRAND] && o.ship[BRAND].tracking ? `${o.ship[BRAND].tracking.carrier} ${o.ship[BRAND].tracking.no}` : '-'}</span><button className="ad-btn p s" onClick={() => brandShip(o.id, BRAND, '배송완료')}>배송 완료</button></div>}</td>
            </tr>)}</tbody></table></div>
        )}
      </div>
    </Page>
  )
}
