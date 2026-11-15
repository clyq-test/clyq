// @ts-nocheck
'use client'
import { Page, Kpis, Badge, Empty } from '../clyq/_ui'
import { useOrders, useKV, brandOrders, brandShippable, brandFittings, brandStatus, won, dt, DONE } from '../lib/orders'
import { BRAND } from './_brand'

export default function BrandDashboard() {
  const [orders] = useOrders()
  const [inq] = useKV('clyq_inq', [])
  const [rates] = useKV('clyq_commission', {})
  const rate = rates[BRAND] ?? 30
  const mine = brandShippable(orders, BRAND)
  const wait = mine.filter(o => brandStatus(o, BRAND) === '출고대기')
  const fitting = brandFittings(orders, BRAND).filter(o => !['구매확정', '반납완료', '취소'].includes(o.status))
  const sales = mine.filter(o => DONE.includes(o.status)).reduce((n, o) => n + o.myTotal, 0)
  const claims = mine.reduce((n, o) => n + (o.claims || []).filter(c => ['접수', '처리중'].includes(c.status)).length, 0)
  const openInq = inq.filter(q => q.brand === BRAND && !q.answer).length
  const todo = [['출고 대기 주문', wait.length, '/admin/orders/shipping'], ['미처리 클레임', claims, '/admin/orders/claims'], ['답변 대기 문의', openInq, '/admin/cs/inquiry']]
  return (
    <Page title={BRAND + ' 대시보드'} sub="쇼핑몰 실제 주문 기준 (같은 브라우저에서 접수된 주문)">
      <Kpis items={[{ l: '출고 대상 주문', v: mine.length + '건' }, { l: '피팅 진행중(열람)', v: fitting.length + '건' }, { l: '확정 매출', v: won(sales) }, { l: '예상 정산액', v: won(Math.round(sales * (100 - rate) / 100)), s: `수수료 ${rate}%(샘플)` }]} />
      <div className="ad-card">
        <div className="ad-ch">처리할 일</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))' }}>
          {todo.map(([l, n, h]) => <a key={l} href={h} style={{ padding: '18px 20px', borderRight: '1px solid #eeeeec' }}><div style={{ fontSize: 13, color: '#767676' }}>{l}</div><div style={{ fontSize: 26, fontWeight: 700, marginTop: 4 }}>{n}건</div></a>)}
        </div>
      </div>
      <div className="ad-card">
        <div className="ad-ch">최근 주문<a href="/admin/orders/my" style={{ fontSize: 13, fontWeight: 500, textDecoration: 'underline' }}>전체 보기</a></div>
        {mine.length === 0 ? <Empty>아직 주문이 없어요.<br />쇼핑몰에서 {BRAND} 상품을 주문하면 여기에 바로 나타나요.</Empty> : (
          <div className="ad-scroll"><table className="ad-tbl"><thead><tr><th>주문번호</th><th>일시</th><th>구분</th><th>상품</th><th className="ad-r">금액</th><th className="ad-c">상태</th></tr></thead>
            <tbody>{mine.slice(0, 6).map(o => <tr key={o.id}><td className="ad-mono">{o.id}</td><td>{dt(o.createdAt)}</td><td>{o.kind === 'fitting' ? '피팅 후 구매' : '구매'}</td><td>{o.mine[0].name}{o.mine.length > 1 ? ` 외 ${o.mine.length - 1}` : ''}</td><td className="ad-r">{won(o.myTotal)}</td><td className="ad-c"><Badge s={brandStatus(o, BRAND)} /></td></tr>)}</tbody></table></div>
        )}
      </div>
    </Page>
  )
}
