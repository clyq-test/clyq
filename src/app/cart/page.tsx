// @ts-nocheck
'use client'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import { SharedStyle, Footer, Img, FitDrawer } from '../components/ui'
import { useShop } from '../lib/store'
import { byId } from '../lib/catalog'

export default function Cart() {
  const { cart, setQty, removeCart } = useShop()
  const [fit, setFit] = useState(null)
  const [ordered, setOrdered] = useState(false)
  const rows = cart.map(c => ({ ...c, p: byId(c.id) })).filter(r => r.p)
  const total = rows.reduce((n, r) => n + r.p.price * r.qty, 0)

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
              <button className="btn-p" style={{ width: '100%', marginTop: 16 }} onClick={() => setOrdered(true)}>주문하기</button>
              {ordered && <p style={{ fontSize: 12, color: '#8a8a8a', lineHeight: 1.6, margin: '12px 0 0' }}>결제는 아직 연결되지 않았어요. 현재는 화면 예시입니다.</p>}
            </aside>
          </div>
        )}
      </div>
      {fit && <FitDrawer product={fit} onClose={() => setFit(null)} />}
      <Footer />
    </main>
  )
}
