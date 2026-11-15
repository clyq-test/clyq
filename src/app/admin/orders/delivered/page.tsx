// @ts-nocheck
'use client'
import { Page, Kpis, Badge, Empty } from '../../../clyq/_ui'
import { useOrders, brandShippable, brandStatus, won, dt } from '../../../lib/orders'
import { BRAND } from '../../_brand'

export default function Delivered() {
  const [orders] = useOrders()
  const list = brandShippable(orders, BRAND).filter(o => brandStatus(o, BRAND) === '배송완료')
  return (
    <Page title="배송완료" sub="배송이 끝난 주문">
      <Kpis items={[{ l: '완료 건수', v: list.length + '건' }, { l: '완료 금액', v: won(list.reduce((n, o) => n + o.myTotal, 0)) }]} />
      <div className="ad-card">
        {list.length === 0 ? <Empty>배송 완료된 주문이 아직 없어요.</Empty> : (
          <div className="ad-scroll"><table className="ad-tbl"><thead><tr><th>주문번호</th><th>구분</th><th>완료일시</th><th>고객</th><th>상품</th><th className="ad-r">금액</th><th className="ad-c">상태</th></tr></thead>
            <tbody>{list.map(o => <tr key={o.id}><td className="ad-mono">{o.id}</td><td>{o.kind === 'fitting' ? '피팅 후 구매' : '구매'}</td><td>{dt((o.ship && o.ship[BRAND] && o.ship[BRAND].at) || o.doneAt)}</td><td>{o.customer.name[0]}**</td>
              <td>{o.mine[0].name}{o.mine.length > 1 ? ` 외 ${o.mine.length - 1}` : ''}</td><td className="ad-r">{won(o.myTotal)}</td><td className="ad-c"><Badge s="배송완료" /></td></tr>)}</tbody></table></div>
        )}
      </div>
    </Page>
  )
}
