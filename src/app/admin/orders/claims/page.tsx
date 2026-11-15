// @ts-nocheck
'use client'
import { useState } from 'react'
import { Page, Kpis, Badge, Empty } from '../../../clyq/_ui'
import { useOrders, brandOrders, setClaim, won, dt } from '../../../lib/orders'
import { BRAND } from '../../_brand'

export default function BrandClaims() {
  const [orders] = useOrders()
  const [f, setF] = useState('전체')
  const rows = brandOrders(orders, BRAND).flatMap(o => (o.claims || []).map(c => ({ ...c, o }))).sort((a, b) => b.at.localeCompare(a.at))
  const list = rows.filter(r => f === '전체' || r.status === f)
  return (
    <Page title="취소 · 반품 · 교환" sub="내 상품이 포함된 클레임">
      <div className="ad-note">반품·교환은 브랜드가 처리해요. 취소는 주문 전체에 영향을 주기 때문에 브랜드는 ‘확인’까지만 하고, 완료는 CLYQ 본사가 처리합니다.</div>
      <Kpis items={[{ l: '미처리', v: rows.filter(r => ['접수', '처리중'].includes(r.status)).length + '건' }, { l: '전체', v: rows.length + '건' }]} />
      <div className="ad-card">
        <div className="ad-bar">{['전체', '접수', '처리중', '완료', '거절'].map(s => <button key={s} className={'ad-chip' + (f === s ? ' on' : '')} onClick={() => setF(s)}>{s}</button>)}</div>
        {list.length === 0 ? <Empty>접수된 클레임이 없어요.</Empty> : (
          <div className="ad-scroll"><table className="ad-tbl"><thead><tr><th>접수일시</th><th>주문번호</th><th>유형</th><th>상품</th><th>사유</th><th className="ad-c">상태</th><th>처리</th></tr></thead>
            <tbody>{list.map(r => <tr key={r.id}><td>{dt(r.at)}</td><td className="ad-mono">{r.o.id}</td><td>{r.type}</td><td>{r.o.mine[0].name}</td><td style={{ whiteSpace: 'normal', minWidth: 150 }}>{r.reason || '-'}</td><td className="ad-c"><Badge s={r.status} /></td>
              <td>{['접수', '처리중'].includes(r.status) ? <div className="ad-row">
                {r.status === '접수' && <button className="ad-btn s" onClick={() => setClaim(r.o.id, r.id, '처리중')}>확인</button>}
                {r.type !== '취소' && <button className="ad-btn p s" onClick={() => setClaim(r.o.id, r.id, '완료')}>처리 완료</button>}
                {r.type !== '취소' && <button className="ad-btn d s" onClick={() => { const n = prompt('거절 사유'); if (n !== null) setClaim(r.o.id, r.id, '거절', n) }}>거절</button>}
              </div> : <span style={{ color: '#767676', fontSize: 13 }}>{r.note || '-'}</span>}</td></tr>)}</tbody></table></div>
        )}
      </div>
    </Page>
  )
}
