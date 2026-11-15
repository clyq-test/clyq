// @ts-nocheck
'use client'
import { useState } from 'react'
import { Page, Kpis, Badge, Empty } from '../../../clyq/_ui'
import { useOrders, useKV, brandOrders, won, ym, dt, DONE } from '../../../lib/orders'
import { BRAND } from '../../_brand'

export default function MySettlement() {
  const [orders] = useOrders()
  const [rates] = useKV('clyq_commission', {})
  const [done] = useKV('clyq_settled', {})
  const rate = rates[BRAND] ?? 30
  const sold = brandOrders(orders, BRAND).filter(o => DONE.includes(o.status))
  const by = {}
  sold.forEach(o => { const m = ym(o.doneAt || o.createdAt); const x = by[m] || (by[m] = { m, n: 0, sales: 0 }); x.n++; x.sales += o.myTotal })
  const rows = Object.values(by).sort((a, b) => b.m.localeCompare(a.m)).map(x => { const fee = Math.round(x.sales * rate / 100); return { ...x, fee, pay: x.sales - fee, paid: done[x.m + '|' + BRAND] } })
  const unpaid = rows.filter(r => !r.paid).reduce((n, r) => n + r.pay, 0)
  const [sel, setSel] = useState('')
  const detail = sold.filter(o => ym(o.doneAt || o.createdAt) === sel)
  return (
    <Page title="정산 내역" sub="배송완료·구매확정 주문 기준 월별 정산">
      <div className="ad-note">수수료율 {rate}%는 샘플 기본값이며 실제 계약 조건과 다를 수 있어요. 지급은 CLYQ가 ‘정산 완료’로 표시하면 완료로 보입니다.</div>
      <Kpis items={[{ l: '정산 예정(미지급)', v: won(unpaid) }, { l: '정산 월 수', v: rows.length + '개월' }]} />
      <div className="ad-card">
        {rows.length === 0 ? <Empty>정산할 확정 주문이 아직 없어요.</Empty> : (
          <div className="ad-scroll"><table className="ad-tbl"><thead><tr><th>월</th><th className="ad-c">건수</th><th className="ad-r">판매액</th><th className="ad-r">수수료</th><th className="ad-r">지급액</th><th className="ad-c">상태</th><th /></tr></thead>
            <tbody>{rows.map(r => <tr key={r.m}><td><b>{r.m}</b></td><td className="ad-c">{r.n}</td><td className="ad-r">{won(r.sales)}</td><td className="ad-r">{won(r.fee)}</td><td className="ad-r"><b>{won(r.pay)}</b></td>
              <td className="ad-c"><Badge s={r.paid ? '정산완료' : '정산예정'} t={r.paid ? 'g' : 'n'} /></td><td><button className="ad-btn s" onClick={() => setSel(sel === r.m ? '' : r.m)}>상세</button></td></tr>)}</tbody></table></div>
        )}
      </div>
      {sel && <div className="ad-card"><div className="ad-ch">{sel} 주문 상세</div><div className="ad-scroll"><table className="ad-tbl"><tbody>{detail.map(o => <tr key={o.id}><td className="ad-mono">{o.id}</td><td>{dt(o.doneAt)}</td><td>{o.mine.map(i => i.name).join(', ')}</td><td className="ad-r">{won(o.myTotal)}</td></tr>)}</tbody></table></div></div>}
    </Page>
  )
}
