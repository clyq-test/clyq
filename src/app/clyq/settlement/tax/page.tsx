// @ts-nocheck
'use client'
import { Page, Kpis, Empty } from '../../_ui'
import { useOrders, won, ym, dt, DONE } from '../../../lib/orders'

export default function Tax() {
  const [orders] = useOrders()
  const sold = orders.filter(o => DONE.includes(o.status))
  const by = {}
  sold.forEach(o => { const k = ym(o.doneAt || o.createdAt); const x = by[k] || (by[k] = { m: k, n: 0, total: 0 }); x.n++; x.total += o.total })
  const rows = Object.values(by).sort((a, b) => b.m.localeCompare(a.m)).map(x => { const supply = Math.round(x.total / 1.1); return { ...x, supply, vat: x.total - supply } })

  function csv(m) {
    const lines = [['주문번호', '확정일', '구분', '브랜드', '상품', '수량', '판매가(VAT포함)', '공급가액', '부가세']]
    sold.filter(o => ym(o.doneAt || o.createdAt) === m).forEach(o => o.items.forEach(i => { const t = i.price * i.qty; const s = Math.round(t / 1.1); lines.push([o.id, dt(o.doneAt || o.createdAt), o.kind === 'fitting' ? '피팅구매' : '구매', i.brand, i.name, i.qty, t, s, t - s]) }))
    const blob = new Blob(['﻿' + lines.map(l => l.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n')], { type: 'text/csv;charset=utf-8' })
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `clyq-sales-${m}.csv`; a.click()
  }
  return (
    <Page title="부가세 신고자료" sub="확정 매출 월별 집계 · CSV 내보내기">
      <div className="ad-note">판매가는 부가세 10% 포함가로 보고 공급가액 = 판매가 ÷ 1.1로 계산한 참고 자료예요. 플랫폼 매출을 판매 총액으로 볼지 수수료로 볼지(위탁·직매입 구조), 반품·취소 반영은 세무사 확인이 필요하며, 이 숫자를 그대로 신고에 사용하면 안 됩니다.</div>
      <div className="ad-card">
        {rows.length === 0 ? <Empty>집계할 확정 매출이 아직 없어요.</Empty> : (
          <div className="ad-scroll"><table className="ad-tbl">
            <thead><tr><th>월</th><th className="ad-c">건수</th><th className="ad-r">판매가 합계(VAT 포함)</th><th className="ad-r">공급가액</th><th className="ad-r">부가세</th><th>내보내기</th></tr></thead>
            <tbody>{rows.map(r => <tr key={r.m}><td><b>{r.m}</b></td><td className="ad-c">{r.n}</td><td className="ad-r">{won(r.total)}</td><td className="ad-r">{won(r.supply)}</td><td className="ad-r">{won(r.vat)}</td><td><button className="ad-btn s" onClick={() => csv(r.m)}>CSV 받기</button></td></tr>)}</tbody>
          </table></div>
        )}
      </div>
    </Page>
  )
}
