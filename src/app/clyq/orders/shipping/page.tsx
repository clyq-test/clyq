// @ts-nocheck
'use client'
import { useState } from 'react'
import { Page, Kpis, Badge, Empty, itemsText } from '../../_ui'
import { useOrders, setStatus, patchOrder, brandStatus, CARRIERS, dt } from '../../../lib/orders'

const WAIT = ['신청접수', '발송준비']
export default function Shipping() {
  const [orders] = useOrders()
  const [tab, setTab] = useState('wait')
  const [draft, setDraft] = useState({})
  const fit = orders.filter(o => o.kind === 'fitting')
  const wait = fit.filter(o => WAIT.includes(o.status))
  const ship = fit.filter(o => o.status === '배송중')
  const back = fit.filter(o => ['반납수거중', '검수중'].includes(o.status))
  const brandView = orders.filter(o => o.kind === 'purchase' || o.ship)
  const list = tab === 'wait' ? wait : tab === 'ship' ? ship : back
  const d = (id, k, v) => setDraft(p => ({ ...p, [id]: { carrier: CARRIERS[0], no: '', ...(p[id] || {}), [k]: v } }))

  function out(o) {
    const x = { carrier: CARRIERS[0], no: '', ...(draft[o.id] || {}) }
    if (!x.no.trim()) { alert('송장번호를 입력해 주세요.'); return }
    patchOrder(o.id, n => { n.tracking = { carrier: x.carrier, no: x.no.trim() }; return n }, `피팅박스 송장 등록 ${x.carrier} ${x.no.trim()}`)
    setStatus(o.id, '배송중')
  }
  const tabs = [['wait', `발송 대기 (${wait.length})`], ['ship', `배송중 (${ship.length})`], ['back', `회수·검수 (${back.length})`], ['brand', `브랜드 출고 현황 (${brandView.length})`]]

  return (
    <Page title="배송 관리" sub="피팅박스 발송·회수는 본사, 구매 상품 출고는 브랜드">
      <div className="ad-note">본사가 출고하는 것은 <b>피팅박스</b>뿐이에요. 일반 구매와 피팅 후 구매확정 주문의 새 제품은 <b>브랜드가 직접 출고</b>하며, 본사는 ‘브랜드 출고 현황’에서 조회만 합니다.</div>
      <Kpis items={[{ l: '피팅박스 발송 대기', v: wait.length + '건' }, { l: '배송중', v: ship.length + '건' }, { l: '회수·검수', v: back.length + '건' }]} />
      <div className="ad-card">
        <div className="ad-bar">{tabs.map(([k, l]) => <button key={k} className={'ad-chip' + (tab === k ? ' on' : '')} onClick={() => setTab(k)}>{l}</button>)}</div>
        {tab === 'brand' ? (
          brandView.length === 0 ? <Empty>브랜드 출고 대상 주문이 없어요.</Empty> : (
            <div className="ad-scroll"><table className="ad-tbl"><thead><tr><th>주문번호</th><th>구분</th><th>브랜드</th><th>상품</th><th>출고 상태</th><th>송장</th></tr></thead>
              <tbody>{brandView.flatMap(o => [...new Set(o.items.map(i => i.brand))].map(b => { const s = o.ship && o.ship[b]; return (
                <tr key={o.id + b}><td className="ad-mono">{o.id}</td><td>{o.kind === 'fitting' ? '피팅 후 구매' : '구매'}</td><td>{b}</td><td>{o.items.filter(i => i.brand === b).map(i => i.name).join(', ')}</td>
                  <td><Badge s={brandStatus(o, b)} /></td><td>{s && s.tracking ? `${s.tracking.carrier} ${s.tracking.no}` : '-'}</td></tr>) }))}</tbody></table></div>)
        ) : list.length === 0 ? <Empty>해당 건이 없어요.</Empty> : (
          <div className="ad-scroll"><table className="ad-tbl">
            <thead><tr><th>신청번호</th><th>수령인</th><th>배송지</th><th>상품</th><th className="ad-c">상태</th><th>{tab === 'wait' ? '송장 입력 · 발송' : tab === 'ship' ? '송장 · 수령 확인' : '처리'}</th></tr></thead>
            <tbody>{list.map(o => (
              <tr key={o.id}>
                <td className="ad-mono">{o.id}</td><td>{o.customer.name}<br /><span style={{ color: '#767676', fontSize: 13 }}>{o.customer.phone}</span></td>
                <td style={{ whiteSpace: 'normal', minWidth: 180 }}>{o.customer.addr} {o.customer.addr2}</td><td>{itemsText(o)}</td><td className="ad-c"><Badge s={o.status} /></td>
                <td>{tab === 'wait' ? (
                  <div className="ad-row">
                    <select className="ad-inp" value={(draft[o.id] || {}).carrier || CARRIERS[0]} onChange={e => d(o.id, 'carrier', e.target.value)} aria-label="택배사">{CARRIERS.map(c => <option key={c}>{c}</option>)}</select>
                    <input className="ad-inp" style={{ width: 150 }} placeholder="송장번호" value={(draft[o.id] || {}).no || ''} onChange={e => d(o.id, 'no', e.target.value)} />
                    <button className="ad-btn p s" onClick={() => out(o)}>발송 처리</button>
                  </div>
                ) : tab === 'ship' ? (
                  <div className="ad-row"><span>{o.tracking ? `${o.tracking.carrier} ${o.tracking.no}` : '-'}</span><button className="ad-btn p s" onClick={() => setStatus(o.id, '피팅중')}>수령 확인(피팅 시작)</button></div>
                ) : (
                  <div className="ad-row">{o.status === '반납수거중' && <button className="ad-btn s" onClick={() => setStatus(o.id, '검수중')}>회수 도착·검수 시작</button>}
                    {o.status === '검수중' && <button className="ad-btn p s" onClick={() => setStatus(o.id, '반납완료')}>검수 완료(반납완료)</button>}</div>
                )}</td>
              </tr>))}</tbody>
          </table></div>
        )}
      </div>
      <div className="ad-note">피팅박스는 ‘수령 확인’ 시점부터 48시간이 피팅 기간이에요. 택배사 추적 연동이 없어 모든 단계는 수동으로 처리합니다. 훼손 확인 시의 패널티 청구는 ‘훼손 패널티’ 메뉴 예시 화면을 참고하세요(아직 주문 데이터와 연결 전).</div>
    </Page>
  )
}
