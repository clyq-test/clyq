// @ts-nocheck
'use client'
import { useState } from 'react'
import { Page, Kpis, Badge, Empty, Modal } from '../../../clyq/_ui'
import { useOrders, useKV, brandShippable, brandStatus, won, dt, DONE } from '../../../lib/orders'
import { BRAND } from '../../_brand'

export default function BrandOrders() {
  const [orders, , ready] = useOrders()
  const [rates] = useKV('clyq_commission', {})
  const [f, setF] = useState('전체')
  const [q, setQ] = useState('')
  const [sel, setSel] = useState(null)
  const rate = rates[BRAND] ?? 30
  const mine = brandShippable(orders, BRAND)
  const list = mine.filter(o => (f === '전체' || (f === '구매' ? o.kind === 'purchase' : o.kind === 'fitting')) && (!q || (o.id + o.customer.name).includes(q)))
  const cur = sel && mine.find(o => o.id === sel)
  const sales = mine.filter(o => DONE.includes(o.status)).reduce((n, o) => n + o.myTotal, 0)
  return (
    <Page title="주문 조회" sub={BRAND + ' 상품이 포함된 구매 주문'}>
      <div className="ad-note">{BRAND} 상품이 들어간 구매 주문과, 피팅 후 구매가 확정된 주문이 보여요. 피팅박스 신청 자체는 CLYQ가 처리하며 ‘피팅 진행 현황’에서 열람만 할 수 있습니다. 출고는 ‘배송중’ 메뉴에서 처리해요.</div>
      <Kpis items={[{ l: '전체 주문', v: mine.length + '건' }, { l: '출고 대기', v: mine.filter(o => brandStatus(o, BRAND) === '출고대기').length + '건' }, { l: '확정 매출', v: won(sales) }, { l: '예상 정산액', v: won(Math.round(sales * (100 - rate) / 100)), s: `수수료 ${rate}% 기준(샘플)` }]} />
      <div className="ad-card">
        <div className="ad-bar">{['전체', '구매', '피팅 후 구매'].map(k => <button key={k} className={'ad-chip' + (f === k ? ' on' : '')} onClick={() => setF(k)}>{k}</button>)}
          <input className="ad-inp" style={{ marginLeft: 'auto', minWidth: 200 }} placeholder="주문번호·이름 검색" value={q} onChange={e => setQ(e.target.value)} /></div>
        {!ready || list.length === 0 ? <Empty>해당 주문이 아직 없어요.</Empty> : (
          <div className="ad-scroll"><table className="ad-tbl">
            <thead><tr><th>주문번호</th><th>접수일시</th><th>구분</th><th>고객</th><th>상품</th><th className="ad-r">금액</th><th className="ad-c">상태</th></tr></thead>
            <tbody>{list.map(o => <tr key={o.id} className="click" onClick={() => setSel(o.id)}>
              <td className="ad-mono">{o.id}</td><td>{dt(o.createdAt)}</td><td>{o.kind === 'fitting' ? '피팅 후 구매' : '구매'}</td><td>{o.customer.name[0]}**</td>
              <td>{o.mine[0].name}{o.mine.length > 1 ? ` 외 ${o.mine.length - 1}` : ''}</td><td className="ad-r">{won(o.myTotal)}</td><td className="ad-c"><Badge s={brandStatus(o, BRAND)} /></td></tr>)}</tbody></table></div>
        )}
      </div>
      {cur && <Modal title={cur.id} onClose={() => setSel(null)}>
        <dl className="ad-dl"><dt>구분</dt><dd>{cur.kind === 'fitting' ? '피팅 후 구매 확정' : '구매 주문'}</dd><dt>상태</dt><dd><Badge s={brandStatus(cur, BRAND)} /></dd>
          <dt>수령인</dt><dd>{cur.customer.name}</dd><dt>연락처</dt><dd>{cur.customer.phone.replace(/\d{4}$/, '****')}</dd><dt>배송지</dt><dd>{cur.customer.zip ? `(${cur.customer.zip}) ` : ''}{cur.customer.addr} {cur.customer.addr2}</dd><dt>배송 요청</dt><dd>{cur.customer.req || '-'}{cur.customer.entry ? ` · 출입: ${cur.customer.entry}` : ''}</dd>
          <dt>송장</dt><dd>{(cur.ship && cur.ship[BRAND] && cur.ship[BRAND].tracking) ? `${cur.ship[BRAND].tracking.carrier} ${cur.ship[BRAND].tracking.no}` : '-'}</dd></dl>
        <div className="ad-scroll"><table className="ad-tbl"><tbody>{cur.mine.map((i, k) => <tr key={k}><td>{i.name}</td><td>{i.size || '-'}</td><td>{i.qty}개</td><td className="ad-r">{won(i.price * i.qty)}</td></tr>)}</tbody></table></div>
      </Modal>}
    </Page>
  )
}
