// @ts-nocheck
'use client'
import { Page, Empty } from '../../../clyq/_ui'
import { useOrders, useKV, brandOrders, won, ym, DONE } from '../../../lib/orders'
import { BRAND } from '../../_brand'

export default function BrandTax() {
  const [orders] = useOrders()
  const [rates] = useKV('clyq_commission', {})
  const rate = rates[BRAND] ?? 30
  const by = {}
  brandOrders(orders, BRAND).filter(o => DONE.includes(o.status)).forEach(o => { const m = ym(o.doneAt || o.createdAt); by[m] = (by[m] || 0) + o.myTotal })
  const rows = Object.entries(by).sort((a, b) => b[0].localeCompare(a[0])).map(([m, sales]) => { const pay = sales - Math.round(sales * rate / 100); const supply = Math.round(pay / 1.1); return { m, pay, supply, vat: pay - supply } })
  const csv = () => {
    const l = [['월', '지급액(VAT 포함)', '공급가액', '부가세'], ...rows.map(r => [r.m, r.pay, r.supply, r.vat])]
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(['﻿' + l.map(x => x.join(',')).join('\n')], { type: 'text/csv;charset=utf-8' })); a.download = 'tax-invoice-ref.csv'; a.click()
  }
  return (
    <Page title="세금계산서" sub="월별 발행 참고 금액" actions={<button className="ad-btn" onClick={csv} disabled={!rows.length}>CSV 받기</button>}>
      <div className="ad-note">정산 지급액을 VAT 포함 금액으로 보고 공급가액·부가세를 나눈 참고 자료예요. 실제 세금계산서 발행(전자세금계산서)은 이 화면에서 하지 않으며, 발행 대상 금액과 시점은 세무 담당자 확인이 필요합니다.</div>
      <div className="ad-card">{rows.length === 0 ? <Empty>발행 참고 금액이 아직 없어요.</Empty> : (
        <div className="ad-scroll"><table className="ad-tbl"><thead><tr><th>월</th><th className="ad-r">지급액(VAT 포함)</th><th className="ad-r">공급가액</th><th className="ad-r">부가세</th></tr></thead>
          <tbody>{rows.map(r => <tr key={r.m}><td><b>{r.m}</b></td><td className="ad-r">{won(r.pay)}</td><td className="ad-r">{won(r.supply)}</td><td className="ad-r">{won(r.vat)}</td></tr>)}</tbody></table></div>)}</div>
    </Page>
  )
}
