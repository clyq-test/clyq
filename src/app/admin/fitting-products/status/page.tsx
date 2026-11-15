// @ts-nocheck
'use client'
import { useState } from 'react'
import { Page, Kpis, Badge, Empty } from '../../../clyq/_ui'
import { useOrders, brandFittings, won, dt } from '../../../lib/orders'
import { BRAND } from '../../_brand'

export default function FittingStatus() {
  const [orders] = useOrders()
  const [f, setF] = useState('진행중')
  const all = brandFittings(orders, BRAND)
  const ended = o => ['구매확정', '반납완료', '취소'].includes(o.status)
  const list = all.filter(o => f === '전체' || (f === '진행중' ? !ended(o) : ended(o)))
  return (
    <Page title="피팅 진행 현황" sub="내 브랜드 제품의 피팅박스 신청 (열람 전용)">
      <div className="ad-note">피팅박스 발송·수령·회수·검수는 CLYQ가 처리해요. 여기서는 진행 상황만 볼 수 있고 처리할 일은 없습니다. 고객이 <b>구매를 확정</b>하면 ‘주문 관리 → 배송중’에 새 제품 출고 건이 자동으로 생겨요.</div>
      <Kpis items={[{ l: '피팅 진행중', v: all.filter(o => !ended(o)).length + '건' }, { l: '구매 확정(출고 지시됨)', v: all.filter(o => o.status === '구매확정').length + '건' }, { l: '반납 완료', v: all.filter(o => o.status === '반납완료').length + '건' }]} />
      <div className="ad-card">
        <div className="ad-bar">{['진행중', '종료', '전체'].map(k => <button key={k} className={'ad-chip' + (f === k ? ' on' : '')} onClick={() => setF(k)}>{k}</button>)}</div>
        {list.length === 0 ? <Empty>해당 피팅 건이 없어요.</Empty> : (
          <div className="ad-scroll"><table className="ad-tbl"><thead><tr><th>신청번호</th><th>신청일시</th><th>상품</th><th>사이즈</th><th>고객</th><th className="ad-c">상태</th><th>피팅 마감(48시간)</th></tr></thead>
            <tbody>{list.map(o => <tr key={o.id}><td className="ad-mono">{o.id}</td><td>{dt(o.createdAt)}</td><td>{o.mine.map(i => i.name).join(', ')}</td><td>{o.mine.map(i => i.size || '-').join(', ')}</td><td>{o.customer.name[0]}**</td>
              <td className="ad-c"><Badge s={o.status} /></td><td>{o.fitStartAt && o.status === '피팅중' ? dt(new Date(new Date(o.fitStartAt).getTime() + 48 * 3600 * 1000).toISOString()) : '-'}</td></tr>)}</tbody></table></div>
        )}
      </div>
    </Page>
  )
}
