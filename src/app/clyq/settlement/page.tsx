// @ts-nocheck
'use client'
import { useState } from 'react'
import { Page, Kpis, Badge, Empty } from '../_ui'
import { useOrders, useKV, logAct, won, ym, DONE } from '../../lib/orders'

export default function Settlement() {
  const [orders] = useOrders()
  const [rates, setRates] = useKV('clyq_commission', {})
  const [done, setDone] = useKV('clyq_settled', {})
  const sold = orders.filter(o => DONE.includes(o.status))
  const months = [...new Set(sold.map(o => ym(o.doneAt || o.createdAt)))].sort().reverse()
  const [m, setM] = useState('')
  const month = m || months[0] || ''
  const by = {}
  sold.filter(o => ym(o.doneAt || o.createdAt) === month).forEach(o => o.items.forEach(i => {
    const b = by[i.brand] || (by[i.brand] = { brand: i.brand, n: 0, sales: 0 }); b.n += i.qty; b.sales += i.price * i.qty
  }))
  const rows = Object.values(by).map(b => { const r = rates[b.brand] ?? 30; const fee = Math.round(b.sales * r / 100); return { ...b, r, fee, pay: b.sales - fee, key: month + '|' + b.brand } }).sort((a, b) => b.sales - a.sales)
  const tot = rows.reduce((t, r) => ({ sales: t.sales + r.sales, fee: t.fee + r.fee, pay: t.pay + r.pay }), { sales: 0, fee: 0, pay: 0 })
  const unpaid = rows.filter(r => !done[r.key]).reduce((n, r) => n + r.pay, 0)

  return (
    <Page title="브랜드별 정산" sub="배송완료·구매확정 주문 기준">
      <div className="ad-note">수수료율은 샘플 기본값 30%이며 브랜드별로 수정할 수 있어요(브랜드 계약 조건으로 교체 필요). 실제 지급·세금계산서 발행은 이 화면 밖에서 진행하고, 여기서는 정산 완료 표시만 해요.</div>
      <Kpis items={[{ l: '정산 월', v: month || '-' }, { l: '판매액', v: won(tot.sales) }, { l: '수수료', v: won(tot.fee) }, { l: '미정산 지급액', v: won(unpaid) }]} />
      <div className="ad-card">
        <div className="ad-bar">{months.map(x => <button key={x} className={'ad-chip' + (month === x ? ' on' : '')} onClick={() => setM(x)}>{x}</button>)}</div>
        {rows.length === 0 ? <Empty>정산할 확정 주문이 아직 없어요.<br />주문이 ‘배송완료’ 또는 ‘구매확정’이 되면 해당 월에 집계돼요.</Empty> : (
          <div className="ad-scroll"><table className="ad-tbl">
            <thead><tr><th>브랜드</th><th className="ad-c">판매 수량</th><th className="ad-r">판매액</th><th className="ad-c">수수료율</th><th className="ad-r">수수료</th><th className="ad-r">브랜드 지급액</th><th className="ad-c">상태</th></tr></thead>
            <tbody>{rows.map(r => (
              <tr key={r.key}><td><b>{r.brand}</b></td><td className="ad-c">{r.n}</td><td className="ad-r">{won(r.sales)}</td>
                <td className="ad-c"><input className="ad-inp" type="number" min="0" max="100" style={{ width: 70 }} value={r.r} onChange={e => setRates({ ...rates, [r.brand]: Number(e.target.value) })} /> %</td>
                <td className="ad-r">{won(r.fee)}</td><td className="ad-r"><b>{won(r.pay)}</b></td>
                <td className="ad-c">{done[r.key] ? <><Badge s="정산완료" /> <button className="ad-btn s" onClick={() => { const n = { ...done }; delete n[r.key]; setDone(n) }}>취소</button></> :
                  <button className="ad-btn p s" onClick={() => { setDone({ ...done, [r.key]: new Date().toISOString() }); logAct(`정산 완료 표시 ${r.key} ${won(r.pay)}`) }}>정산 완료 표시</button>}</td></tr>))}
              <tr><td><b>합계</b></td><td /><td className="ad-r"><b>{won(tot.sales)}</b></td><td /><td className="ad-r"><b>{won(tot.fee)}</b></td><td className="ad-r"><b>{won(tot.pay)}</b></td><td /></tr></tbody>
          </table></div>
        )}
      </div>
    </Page>
  )
}
