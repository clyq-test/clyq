// @ts-nocheck
'use client'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import { SharedStyle, Footer, Img, FitDrawer } from '../components/ui'
import { useShop } from '../lib/store'
import { byId } from '../lib/catalog'
import { createOrder } from '../lib/orders'
import { useMember, openLogin, rememberAddr, prefill } from '../lib/auth'
import { useEffect } from 'react'

export default function Cart() {
  const { cart, setQty, removeCart } = useShop()
  const [fit, setFit] = useState(null)
  const [ordered, setOrdered] = useState(null)
  const [co, setCo] = useState(false)
  const [f, setF] = useState({ name: '', phone: '', addr: '', addr2: '' })
  const [err, setErr] = useState('')
  const [member] = useMember()
  useEffect(() => { if (member) setF(prev => prev.name || prev.phone || prev.addr ? prev : prefill(member)) }, [member])
  const rows = cart.map(c => ({ ...c, p: byId(c.id) })).filter(r => r.p)
  const total = rows.reduce((n, r) => n + r.p.price * r.qty, 0)

  function submit() {
    if (!member) { setCo(false); openLogin(); return }
    if (!f.name.trim() || f.phone.replace(/\D/g, '').length < 9 || !f.addr.trim()) { setErr('받는 분, 연락처(숫자 9자리 이상), 주소를 입력해 주세요.'); return }
    const o = createOrder({ kind: 'purchase', customer: f, items: rows.map(r => ({ pid: r.id, name: r.p.name, brand: r.p.brand, size: r.size, qty: r.qty, price: r.p.price })) })
    rememberAddr(member.id, f)
    rows.forEach(r => removeCart(r.id, r.size))
    setCo(false); setOrdered(o)
  }

  return (
    <main>
      <SharedStyle />
      <style>{`
        .ct { display: grid; grid-template-columns: 1fr 360px; gap: 56px; align-items: start; padding-bottom: 80px; }
        .ct-row { display: grid; grid-template-columns: 96px 1fr auto; gap: 20px; padding: 20px 0; border-bottom: 1px solid #eee; align-items: center; }
        .ct-row:first-child { border-top: 1px solid #eee; }
        .ct-img { width: 96px; aspect-ratio: 3/4; background: #f4f4f2; overflow: hidden; display: block; }
        .ct-img img { width: 100%; height: 100%; object-fit: cover; }
        .ct-name { font-size: 15px; font-weight: 500; margin: 2px 0 4px; }
        .ct-opt { font-size: 13px; color: #8a8a8a; margin-bottom: 10px; }
        .qty { display: inline-flex; border: 1px solid #e5e5e5; }
        .qty button { width: 36px; height: 36px; font-size: 16px; }
        .qty span { width: 40px; text-align: center; line-height: 36px; font-size: 14px; }
        .ct-act { display: flex; gap: 12px; margin-top: 10px; font-size: 13px; }
        .ct-act button { color: #6b6b6b; text-decoration: underline; min-height: 32px; }
        .ct-price { font-size: 16px; font-weight: 600; text-align: right; }
        .ct-sum { position: sticky; top: 88px; background: #fafaf8; padding: 28px; }
        .ct-sum .line { display: flex; justify-content: space-between; padding: 8px 0; font-size: 14px; color: #555; }
        .ct-sum .tot { border-top: 1px solid #e5e5e5; margin-top: 8px; padding-top: 16px; font-size: 18px; font-weight: 700; color: #111; }
        @media (max-width: 900px) { .ct { grid-template-columns: 1fr; gap: 24px; } .ct-sum { position: static; } .ct-row { grid-template-columns: 72px 1fr; } .ct-img { width: 72px; } .ct-price { grid-column: 2; text-align: left; } }
      `}</style>
      <Navbar />
      <div className="wrap-full">
        <div className="page-head"><h1>장바구니</h1></div>
        {rows.length === 0 ? (
          <div className="empty">장바구니가 비어 있어요.<br /><a href="/products/new" className="btn-p" style={{ marginTop: 20 }}>제품 둘러보기</a></div>
        ) : (
          <div className="ct">
            <div>
              {rows.map(r => (
                <div key={r.id + r.size} className="ct-row">
                  <a href={'/products/' + r.id} className="ct-img"><Img src={r.p.image} alt={r.p.name} /></a>
                  <div>
                    <div className="pc-brand" style={{ fontSize: 12, color: '#8a8a8a' }}>{r.p.brand}</div>
                    <div className="ct-name">{r.p.name}</div>
                    <div className="ct-opt">사이즈 {r.size || '-'}</div>
                    <div className="qty">
                      <button onClick={() => setQty(r.id, r.size, r.qty - 1)} aria-label="수량 줄이기">−</button>
                      <span>{r.qty}</span>
                      <button onClick={() => setQty(r.id, r.size, r.qty + 1)} aria-label="수량 늘리기">+</button>
                    </div>
                    <div className="ct-act">
                      {r.p.fit && <button onClick={() => setFit(r.p)}>피팅박스로 신청</button>}
                      <button onClick={() => removeCart(r.id, r.size)}>삭제</button>
                    </div>
                  </div>
                  <div className="ct-price">{(r.p.price * r.qty).toLocaleString()}원</div>
                </div>
              ))}
            </div>
            <aside className="ct-sum">
              <div className="line"><span>제품 금액</span><span>{total.toLocaleString()}원</span></div>
              <div className="line"><span>배송비</span><span>오픈 시 안내</span></div>
              <div className="line tot"><span>합계</span><span>{total.toLocaleString()}원</span></div>
              <button className="btn-p" style={{ width: '100%', marginTop: 16 }} onClick={() => { if (!member) { openLogin(); return } setErr(''); setCo(true) }}>{member ? '주문하기' : '로그인하고 주문하기'}</button>
              <p style={{ fontSize: 12, color: '#8a8a8a', lineHeight: 1.6, margin: '12px 0 0' }}>결제는 아직 연결되지 않아 주문 접수만 진행돼요.</p>
            </aside>
          </div>
        )}
      </div>
      {co && (
        <div className="co-bg" onClick={() => setCo(false)}>
          <style>{`.co-bg { position: fixed; inset: 0; background: rgba(0,0,0,.45); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 16px; } .co { background: #fff; width: min(440px, 100%); padding: 28px; max-height: 92vh; overflow-y: auto; } .co h2 { margin: 0 0 16px; font-size: 18px; } .co input { width: 100%; padding: 12px 14px; border: 1px solid #e5e5e5; font-size: 14px; font-family: inherit; margin-bottom: 10px; min-height: 44px; } .co input:focus { outline: none; border-color: #111; }`}</style>
          <div className="co" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
            <h2>배송 정보</h2>
            <input placeholder="받는 분" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} />
            <input type="tel" placeholder="연락처" value={f.phone} onChange={e => setF({ ...f, phone: e.target.value })} />
            <input placeholder="주소" value={f.addr} onChange={e => setF({ ...f, addr: e.target.value })} />
            <input placeholder="상세 주소" value={f.addr2} onChange={e => setF({ ...f, addr2: e.target.value })} />
            <p style={{ fontSize: 12, color: '#8a8a8a', lineHeight: 1.6, margin: '0 0 12px' }}>합계 {total.toLocaleString()}원 · 결제는 연결 전이라 접수만 되며, 실제 청구는 없습니다.</p>
            {err && <p style={{ fontSize: 13, color: '#b3261e', margin: '0 0 12px' }}>{err}</p>}
            <button className="btn-p" style={{ width: '100%' }} onClick={submit}>주문 접수하기</button>
          </div>
        </div>
      )}
      {ordered && (
        <div className="co-bg" onClick={() => setOrdered(null)}>
          <div className="co" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
            <h2>주문이 접수됐어요</h2>
            <p style={{ fontSize: 14, lineHeight: 1.8, margin: '0 0 16px' }}>주문번호 <b>{ordered.id}</b><br />합계 {ordered.total.toLocaleString()}원 · 결제 연결 전이라 실제 청구는 없습니다.</p>
            <a href="/orders" className="btn-p" style={{ width: '100%', textAlign: 'center' }}>주문 내역 보기</a>
          </div>
        </div>
      )}
      {fit && <FitDrawer product={fit} onClose={() => setFit(null)} />}
      <Footer />
    </main>
  )
}
