// @ts-nocheck
'use client'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { SharedStyle, Footer } from '../components/ui'
import { useOrders, useKV, addInquiry, clientId, addClaim, setStatus, patchOrder, dt, won } from '../lib/orders'

export default function MyOrders() {
  const [orders] = useOrders()
  const [cid, setCid] = useState('')
  const [claim, setClaim] = useState(null)
  const [reason, setReason] = useState('')
  const [inq] = useKV('clyq_inq', [])
  const [ask, setAsk] = useState(null)
  const [atext, setAtext] = useState('')
  useEffect(() => { setCid(clientId()) }, [])
  const mine = orders.filter(o => o.owner === cid)
  const canCancel = o => ['주문접수', '상품준비', '신청접수', '발송준비'].includes(o.status) && !(o.claims || []).some(c => c.type === '취소' && c.status !== '거절')
  const canReturn = o => o.kind === 'purchase' && o.status === '배송완료' && !(o.claims || []).some(c => c.type === '반품' && c.status !== '거절')

  return (
    <main>
      <SharedStyle />
      <style>{`
        .mo { border: 1px solid #eee; margin-bottom: 16px; }
        .mo-h { display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; padding: 16px 20px; background: #fafaf8; font-size: 14px; }
        .mo-b { padding: 16px 20px; font-size: 14px; line-height: 1.9; }
        .mo-st { display: inline-block; padding: 2px 10px; background: #111; color: #fff; font-size: 12px; }
        .mo-act { display: flex; gap: 8px; flex-wrap: wrap; padding: 0 20px 16px; }
        .mo-act button { padding: 0 16px; min-height: 40px; border: 1px solid #ddd; font-size: 13px; background: #fff; }
        .mo-act button.p { background: #111; color: #fff; border-color: #111; }
        .mo-bg { position: fixed; inset: 0; background: rgba(0,0,0,.45); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 16px; }
        .mo-m { background: #fff; width: min(420px, 100%); padding: 24px; }
        .mo-m textarea { width: 100%; min-height: 90px; border: 1px solid #e5e5e5; padding: 12px; font-family: inherit; font-size: 14px; margin: 12px 0; }
      `}</style>
      <Navbar />
      <div className="wrap">
        <div className="page-head"><h1>주문 내역</h1><p>이 브라우저에서 접수한 주문과 피팅박스 신청이 표시돼요. (로그인·서버 연동 전)</p></div>
        {mine.length === 0 ? <div className="empty">접수된 주문이 없어요.<br /><a href="/products/new" className="btn-p" style={{ marginTop: 20 }}>제품 둘러보기</a></div> : mine.map(o => (
          <div key={o.id} className="mo">
            <div className="mo-h"><span><b>{o.id}</b> · {o.kind === 'fitting' ? '피팅박스' : '구매'} · {dt(o.createdAt)}</span><span className="mo-st">{o.status}</span></div>
            <div className="mo-b">
              {o.items.map((i, k) => <div key={k}>{i.brand} · {i.name} / {i.size || '-'} / {i.qty}개 — {won(i.price * i.qty)}</div>)}
              <div style={{ color: '#8a8a8a', fontSize: 13 }}>
                {o.kind === 'fitting' ? '구매 확정 시 결제될 금액 ' : '합계 '}{won(o.total)}
                {o.tracking && <> · 송장 {o.tracking.carrier} {o.tracking.no}</>}
                {o.fitStartAt && o.status === '피팅중' && <> · 반납/구매 결정 기한 {dt(new Date(new Date(o.fitStartAt).getTime() + 48 * 3600 * 1000).toISOString())}</>}
              </div>
              {inq.filter(q => q.orderId === o.id).map(q => <div key={q.id} style={{ fontSize: 13, color: '#555' }}>문의: {q.text} → {q.answer ? '답변: ' + q.answer : '답변 대기 중'}</div>)}
              {(o.claims || []).map(c => <div key={c.id} style={{ fontSize: 13, color: '#555' }}>{c.type} 요청: {c.status}{c.note ? ` (${c.note})` : ''}</div>)}
            </div>
            <div className="mo-act">
              {o.kind === 'fitting' && o.status === '피팅중' && <>
                <button className="p" onClick={() => { setStatus(o.id, '구매확정', '고객') }}>구매 확정</button>
                <button onClick={() => { setStatus(o.id, '반납수거중', '고객') }}>반납 신청</button>
              </>}
              <button onClick={() => { setAsk(o); setAtext('') }}>문의하기</button>
              {canCancel(o) && <button onClick={() => { setClaim({ o, type: '취소' }); setReason('') }}>주문 취소 요청</button>}
              {canReturn(o) && <button onClick={() => { setClaim({ o, type: '반품' }); setReason('') }}>반품 요청</button>}
            </div>
          </div>
        ))}
      </div>
      {ask && (
        <div className="mo-bg" onClick={() => setAsk(null)}>
          <div className="mo-m" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
            <b>주문 문의 — {ask.id}</b>
            <textarea placeholder="문의 내용을 적어 주세요" value={atext} onChange={e => setAtext(e.target.value)} />
            <button className="btn-p" style={{ width: '100%' }} onClick={() => { if (!atext.trim()) return; [...new Set(ask.items.map(i => i.brand))].forEach(b => addInquiry({ type: 'inquiry', brand: b, orderId: ask.id, who: ask.customer.name, text: atext.trim() })); setAsk(null) }}>문의 보내기</button>
          </div>
        </div>
      )}
      {claim && (
        <div className="mo-bg" onClick={() => setClaim(null)}>
          <div className="mo-m" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
            <b>{claim.type} 요청 — {claim.o.id}</b>
            <textarea placeholder="사유를 적어 주세요" value={reason} onChange={e => setReason(e.target.value)} />
            <button className="btn-p" style={{ width: '100%' }} onClick={() => { addClaim(claim.o.id, claim.type, reason, '고객'); setClaim(null) }}>요청 접수</button>
          </div>
        </div>
      )}
      <Footer />
    </main>
  )
}
