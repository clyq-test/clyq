// @ts-nocheck
'use client'
import { useState } from 'react'
import { Page, Kpis, Badge, Empty } from '../../_ui'
import { useOrders, setClaim, won, dt } from '../../../lib/orders'

export default function Claims() {
  const [orders] = useOrders()
  const [f, setF] = useState('전체')
  const [t, setT] = useState('전체')
  const rows = orders.flatMap(o => (o.claims || []).map(c => ({ ...c, o }))).sort((a, b) => b.at.localeCompare(a.at))
  const list = rows.filter(r => (f === '전체' || r.status === f) && (t === '전체' || r.type === t))
  const open = rows.filter(r => r.status === '접수' || r.status === '처리중').length

  return (
    <Page title="취소 · 반품 · 교환" sub="고객 요청과 관리자 등록 클레임을 처리해요">
      <Kpis items={[{ l: '미처리', v: open + '건' }, { l: '취소', v: rows.filter(r => r.type === '취소').length + '건' }, { l: '반품', v: rows.filter(r => r.type === '반품').length + '건' }, { l: '교환', v: rows.filter(r => r.type === '교환').length + '건' }]} />
      <div className="ad-card">
        <div className="ad-bar">
          {['전체', '접수', '처리중', '완료', '거절'].map(s => <button key={s} className={'ad-chip' + (f === s ? ' on' : '')} onClick={() => setF(s)}>{s}</button>)}
          <select className="ad-inp" style={{ marginLeft: 'auto' }} value={t} onChange={e => setT(e.target.value)} aria-label="유형">{['전체', '취소', '반품', '교환'].map(s => <option key={s}>{s}</option>)}</select>
        </div>
        {list.length === 0 ? <Empty>접수된 클레임이 없어요.<br />고객이 주문 내역에서 요청하거나, 주문 상세에서 관리자가 등록하면 여기에 모여요.</Empty> : (
          <div className="ad-scroll"><table className="ad-tbl">
            <thead><tr><th>접수일시</th><th>주문번호</th><th>유형</th><th>고객</th><th>사유</th><th className="ad-r">주문금액</th><th>요청자</th><th className="ad-c">상태</th><th>처리</th></tr></thead>
            <tbody>{list.map(r => (
              <tr key={r.id}>
                <td>{dt(r.at)}</td><td className="ad-mono">{r.o.id}</td><td>{r.type}</td><td>{r.o.customer.name}</td><td style={{ whiteSpace: 'normal', minWidth: 160 }}>{r.reason || '-'}</td>
                <td className="ad-r">{won(r.o.total)}</td><td>{r.by}</td><td className="ad-c"><Badge s={r.status} /></td>
                <td>{(r.status === '접수' || r.status === '처리중') ? (
                  <div className="ad-row">
                    {r.status === '접수' && <button className="ad-btn s" onClick={() => setClaim(r.o.id, r.id, '처리중')}>처리 시작</button>}
                    <button className="ad-btn p s" onClick={() => setClaim(r.o.id, r.id, '완료')}>승인·완료</button>
                    <button className="ad-btn d s" onClick={() => { const n = prompt('거절 사유'); if (n !== null) setClaim(r.o.id, r.id, '거절', n) }}>거절</button>
                  </div>) : <span style={{ color: '#767676', fontSize: 13 }}>{r.note || '-'}</span>}</td>
              </tr>))}</tbody>
          </table></div>
        )}
      </div>
      <div className="ad-note">취소 완료 시 주문은 ‘취소’, 구매 주문의 반품 완료 시 ‘반품완료’로 바뀌고 매출에서 빠집니다. 결제가 연결되지 않아 환불 처리는 아직 없어요.</div>
    </Page>
  )
}
