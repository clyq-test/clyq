// @ts-nocheck
'use client'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import { SharedStyle, Footer, ProductCard, Img } from '../components/ui'

const fittingProducts = [
  { id:1, brand:'MARCIA', name:'오버핏 캐시미어 울 코트', price:428000, original:520000, fit:true, category:'아우터', image:'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=80&auto=format&fit=crop&crop=center', points:428 },
  { id:2, brand:'EIGHT', name:'셔링 디테일 미디 드레스', price:198000, original:240000, fit:true, category:'원피스', image:'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80&auto=format&fit=crop&crop=center', points:198 },
  { id:3, brand:'MATIN KIM', name:'오버핏 레더 재킷', price:578000, original:578000, fit:true, category:'아우터', image:'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80&auto=format&fit=crop&crop=center', points:578 },
  { id:5, brand:'ANDERSSONBELL', name:'테일러드 수트 재킷', price:318000, original:318000, fit:true, category:'아우터', image:'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80&auto=format&fit=crop&crop=center', points:318 },
  { id:6, brand:'EENK', name:'셔링 미디 스커트', price:148000, original:148000, fit:true, category:'하의', image:'https://images.unsplash.com/photo-1496217590455-aa63a8350eea?w=600&q=80&auto=format&fit=crop&crop=center', points:148 },
  { id:7, brand:'D.POUND', name:'라운드넥 실크 블라우스', price:158000, original:198000, fit:true, category:'상의', image:'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&q=80&auto=format&fit=crop&crop=center', points:158 },
  { id:9, brand:'ADER ERROR', name:'오버핏 후드 스웨트셔츠', price:198000, original:198000, fit:true, category:'상의', image:'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80&auto=format&fit=crop&crop=center', points:198 },
  { id:11, brand:'MARCIA', name:'울 플리츠 와이드 팬츠', price:248000, original:298000, fit:true, category:'하의', image:'https://images.unsplash.com/photo-1496217590455-aa63a8350eea?w=600&q=80&auto=format&fit=crop&crop=center', points:248 },
  { id:12, brand:'EENK', name:'오프숄더 리본 블라우스', price:168000, original:168000, fit:true, category:'상의', image:'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80&auto=format&fit=crop&crop=center', points:168 },
  { id:13, brand:'D.POUND', name:'울 롱 스커트', price:228000, original:268000, fit:true, category:'하의', image:'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&q=80&auto=format&fit=crop&crop=center', points:228 },
  { id:15, brand:'ANOTHER A', name:'패딩 숏 재킷', price:398000, original:398000, fit:true, category:'아우터', image:'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=80&auto=format&fit=crop&crop=center', points:398 },
  { id:16, brand:'SORRY TOO MUCH LOVE', name:'벨벳 미니 원피스', price:188000, original:228000, fit:true, category:'원피스', image:'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80&auto=format&fit=crop&crop=center', points:188 },
]

const categories = ['전체', '아우터', '상의', '하의', '원피스']

export default function Fitting() {
  const [activeCategory, setActiveCategory] = useState('전체')
  const [selected, setSelected] = useState(null)
  const [step, setStep] = useState(1)
  const [size, setSize] = useState('M')
  const [done, setDone] = useState(false)

  const filtered = fittingProducts.filter(p => activeCategory === '전체' || p.category === activeCategory)

  function open(p) { setSelected(p); setStep(1); setDone(false); setSize('M'); document.body.style.overflow = 'hidden' }
  function close() { setSelected(null); document.body.style.overflow = '' }
  function next() { step < 3 ? setStep(step + 1) : setDone(true) }

  return (
    <main>
      <SharedStyle />
      <style>{`
        .f-hero { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; padding: 56px 0 40px; }
        .f-hero h1 { font-size: 44px; font-weight: 700; letter-spacing: -0.035em; line-height: 1.25; margin: 0 0 16px; }
        .f-hero p { font-size: 15px; color: #6b6b6b; line-height: 1.7; margin: 0; max-width: 28em; }
        .f-media { aspect-ratio: 4/3; max-height: 360px; background: #f4f4f2; overflow: hidden; }
        .f-media img { width: 100%; height: 100%; object-fit: cover; }
        .drawer-bg { position: fixed; inset: 0; background: rgba(0,0,0,.4); z-index: 1000; display: flex; justify-content: flex-end; }
        .drawer { width: min(440px, 100vw); height: 100dvh; background: #fff; display: flex; flex-direction: column; }
        .d-head { padding: 20px 24px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; }
        .d-head b { font-size: 17px; }
        .d-x { width: 44px; height: 44px; font-size: 18px; color: #6b6b6b; }
        .d-prog { height: 2px; background: #eee; }
        .d-prog i { display: block; height: 100%; background: #3D6A4F; transition: width .3s; }
        .d-body { flex: 1; overflow-y: auto; padding: 24px; }
        .d-foot { padding: 16px 24px; border-top: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; }
        .d-prod { display: flex; gap: 14px; padding: 14px; background: #fafaf8; margin-bottom: 20px; }
        .d-prod img { width: 64px; height: 80px; object-fit: cover; flex-shrink: 0; }
        .lbl { font-size: 13px; font-weight: 500; margin-bottom: 10px; }
        .sizes { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; }
        .size { width: 56px; height: 44px; border: 1px solid #e5e5e5; font-size: 13px; color: #6b6b6b; }
        .size.on { border-color: #111; background: #111; color: #fff; }
        .note { background: #fafaf8; padding: 14px 16px; font-size: 13px; line-height: 1.7; color: #444; }
        .note b { color: #3D6A4F; }
        .inp { width: 100%; padding: 12px 14px; border: 1px solid #e5e5e5; font-size: 14px; font-family: inherit; margin-bottom: 12px; min-height: 44px; }
        .inp:focus { outline: none; border-color: #111; }
        .sum { display: flex; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid #eee; font-size: 14px; }
        .sum span:first-child { color: #8a8a8a; }
        .tl { display: flex; gap: 14px; padding: 12px 0; border-bottom: 1px solid #eee; text-align: left; }
        .tl i { width: 8px; height: 8px; border-radius: 50%; background: #e5e5e5; margin-top: 6px; flex-shrink: 0; }
        .tl.on i { background: #3D6A4F; }
        @media (max-width: 768px) {
          .f-hero { grid-template-columns: 1fr; gap: 24px; padding: 28px 0 24px; }
          .f-hero h1 { font-size: 28px; }
        }
      `}</style>
      <Navbar />

      <div className="wrap">
        <section className="f-hero">
          <div>
            <h1>집에서 먼저 입어보고<br />마음에 드는 옷만 구매하세요</h1>
            <p>피팅박스로 받은 옷을 48시간 동안 입어보고, 결정한 옷만 결제합니다. 입어본 뒤 사지 않은 옷은 반납하면 됩니다.</p>
          </div>
          <div className="f-media"><Img src={fittingProducts[0].image.replace('w=600','w=1000')} alt="" /></div>
        </section>

        <div className="steps-row">
          {[
            { t: '취향 확인', d: '입어보고 싶은 제품을 고릅니다.' },
            { t: '박스 신청', d: '사이즈를 선택하고 신청합니다.' },
            { t: '48시간 착용', d: '집에서 편하게 입어봅니다.' },
            { t: '구매 또는 반납', d: '마음에 든 옷만 결제합니다.' },
          ].map((s, i) => (
            <div key={i} className="step"><div className="step-n">{i + 1}</div><b>{s.t}</b><span>{s.d}</span></div>
          ))}
        </div>

        <div className="tabs">
          {categories.map(c => (
            <button key={c} className={'tab' + (activeCategory === c ? ' on' : '')} onClick={() => setActiveCategory(c)}>{c}</button>
          ))}
        </div>
        <div className="bar"><span className="count">피팅 가능 {filtered.length}개</span></div>
        <div className="grid-4">
          {filtered.map(p => <ProductCard key={p.id} p={p} onFit={open} />)}
        </div>
      </div>

      {selected && (
        <div className="drawer-bg" onClick={close}>
          <div className="drawer" role="dialog" aria-modal="true" aria-label="피팅박스 신청" onClick={e => e.stopPropagation()}>
            <div className="d-head">
              <b>{done ? '신청이 접수됐어요' : `피팅박스 신청 (${step}/3)`}</b>
              <button className="d-x" onClick={close} aria-label="닫기">✕</button>
            </div>
            {!done && <div className="d-prog"><i style={{ width: `${step * 33.3}%` }} /></div>}
            <div className="d-body">
              {done ? (
                <div>
                  <p style={{ fontSize: 14, color: '#6b6b6b', lineHeight: 1.7, margin: '0 0 20px' }}>
                    접수 상태는 알림으로 알려드려요. 아래는 진행 순서 예시이며, 실제 일정은 서비스 오픈 시 확정됩니다.
                  </p>
                  {[['신청 접수', true], ['검수 및 패킹', false], ['배송 출발', false], ['수령 후 48시간 착용', false]].map(([t, on], i) => (
                    <div key={i} className={'tl' + (on ? ' on' : '')}><i /><span style={{ fontSize: 14 }}>{t}</span></div>
                  ))}
                  <button className="btn-p" style={{ width: '100%', marginTop: 24 }} onClick={close}>확인</button>
                </div>
              ) : step === 1 ? (
                <div>
                  <div className="d-prod">
                    <Img src={selected.image} alt={selected.name} />
                    <div>
                      <div className="pc-brand">{selected.brand}</div>
                      <div style={{ fontSize: 14, fontWeight: 500, margin: '2px 0 4px' }}>{selected.name}</div>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{selected.price.toLocaleString()}원</div>
                    </div>
                  </div>
                  <div className="lbl">사이즈</div>
                  <div className="sizes">
                    {['XS', 'S', 'M', 'L', 'XL'].map(z => (
                      <button key={z} className={'size' + (size === z ? ' on' : '')} onClick={() => setSize(z)}>{z}</button>
                    ))}
                  </div>
                  <div className="note"><b>피팅 안내</b><br />착용 기간은 수령 후 48시간입니다. 구매를 확정한 제품만 결제됩니다.</div>
                </div>
              ) : step === 2 ? (
                <div>
                  <div className="lbl">받는 분</div>
                  <input className="inp" placeholder="이름" />
                  <div className="lbl">연락처</div>
                  <input className="inp" type="tel" placeholder="010-0000-0000" />
                  <div className="lbl">배송 주소</div>
                  <input className="inp" placeholder="주소" />
                  <input className="inp" placeholder="상세 주소" />
                </div>
              ) : (
                <div>
                  {[['제품', `${selected.name} / ${size}`], ['착용 기간', '수령 후 48시간'], ['구매 확정 시 결제', `${selected.price.toLocaleString()}원`]].map(([k, v]) => (
                    <div key={k} className="sum"><span>{k}</span><span>{v}</span></div>
                  ))}
                  <div className="note" style={{ marginTop: 20 }}>구매를 확정하기 전에는 결제되지 않습니다. 반납 방법과 비용은 오픈 시 안내됩니다.</div>
                </div>
              )}
            </div>
            {!done && (
              <div className="d-foot">
                <button onClick={() => step > 1 && setStep(step - 1)} style={{ fontSize: 13, color: '#8a8a8a', visibility: step > 1 ? 'visible' : 'hidden', minHeight: 44 }}>이전</button>
                <button className="btn-p" onClick={next}>{step < 3 ? '다음' : '신청하기'}</button>
              </div>
            )}
          </div>
        </div>
      )}
      <Footer />
    </main>
  )
}
