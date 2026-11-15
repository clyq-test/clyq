// @ts-nocheck
'use client'
import { Page, Kpis, Empty } from '../../_ui'
import { useOrders, useKV, dt, DONE } from '../../../lib/orders'

/* 적립 규칙은 사업계획서 D-8 기준(Basic 구매 적립 3%, 피팅박스 신청 -1,000WT, 회수 +100WT).
   오픈 초기 6~12개월은 피팅박스 무료 운영 계획이라 차감/페이백은 기본 꺼짐입니다. */
export default function WithyLedger() {
  const [orders] = useOrders()
  const [cfg, setCfg] = useKV('clyq_withy_cfg', { rate: 3, fitDeduct: false })
  const rows = []
  orders.forEach(o => {
    const who = o.customer.name + ' ' + o.customer.phone
    if (o.kind === 'purchase' && o.status === '배송완료') rows.push({ at: o.doneAt || o.createdAt, who, text: `구매 적립 ${cfg.rate}% (${o.id})`, amt: Math.round(o.total * cfg.rate / 100) })
    if (o.kind === 'fitting' && o.status === '구매확정') rows.push({ at: o.doneAt || o.createdAt, who, text: `구매 확정 적립 ${cfg.rate}% (${o.id})`, amt: Math.round(o.total * cfg.rate / 100) })
    if (o.kind === 'fitting' && cfg.fitDeduct && o.status !== '취소') rows.push({ at: o.createdAt, who, text: `피팅박스 신청 (${o.id})`, amt: -1000 })
    if (o.kind === 'fitting' && cfg.fitDeduct && o.status === '반납완료') rows.push({ at: o.history[o.history.length - 1].at, who, text: `회수 완료 페이백 (${o.id})`, amt: 100 })
  })
  rows.sort((a, b) => b.at.localeCompare(a.at))
  const earn = rows.filter(r => r.amt > 0).reduce((n, r) => n + r.amt, 0)
  const use = rows.filter(r => r.amt < 0).reduce((n, r) => n + r.amt, 0)
  return (
    <Page title="위디 적립 내역" sub="주문 기록에서 자동 계산한 적립·차감">
      <div className="ad-note">회원별 실제 포인트 잔액 DB는 아직 없어서, 주문 기록에 규칙을 적용해 계산한 참고용 내역이에요. 단위는 WT이며 승급(레벨) 조건은 계획서에 확정값이 없어 반영하지 않았습니다.</div>
      <div className="ad-card"><div className="ad-bar">
        <label style={{ fontSize: 14 }}>구매 적립률 <input className="ad-inp" type="number" min="0" max="20" step="0.1" style={{ width: 80 }} value={cfg.rate} onChange={e => setCfg({ ...cfg, rate: Number(e.target.value) })} /> %</label>
        <label style={{ fontSize: 14, display: 'flex', gap: 6, alignItems: 'center' }}><input type="checkbox" checked={cfg.fitDeduct} onChange={e => setCfg({ ...cfg, fitDeduct: e.target.checked })} /> 피팅박스 차감(-1,000)·회수 페이백(+100) 적용 (오픈 초기 무료 기간엔 끄기)</label>
      </div></div>
      <Kpis items={[{ l: '적립 합계', v: earn.toLocaleString() + 'WT' }, { l: '차감 합계', v: use.toLocaleString() + 'WT' }, { l: '내역 수', v: rows.length + '건' }]} />
      <div className="ad-card">
        {rows.length === 0 ? <Empty>적립 대상 내역이 아직 없어요.<br />구매가 ‘배송완료’, 피팅이 ‘구매확정’이 되면 적립이 계산돼요.</Empty> : (
          <div className="ad-scroll"><table className="ad-tbl"><thead><tr><th>일시</th><th>고객</th><th>내용</th><th className="ad-r">포인트</th></tr></thead>
            <tbody>{rows.map((r, i) => <tr key={i}><td>{dt(r.at)}</td><td>{r.who}</td><td>{r.text}</td><td className="ad-r" style={{ color: r.amt < 0 ? '#b3261e' : '#3D6A4F', fontWeight: 600 }}>{r.amt > 0 ? '+' : ''}{r.amt.toLocaleString()}WT</td></tr>)}</tbody></table></div>
        )}
      </div>
    </Page>
  )
}
