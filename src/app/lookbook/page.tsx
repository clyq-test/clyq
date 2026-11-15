// @ts-nocheck
'use client'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { SharedStyle, Footer, Img } from '../components/ui'
import { BRAND_INFO, allProducts } from '../lib/catalog'

// 브랜드별 룩 = 해당 브랜드 제품 중 이미지가 겹치지 않는 제품들. 브랜드마다 대표 컷이 다르게 보이도록 시작 위치를 돌려 줍니다.
// (샘플 이미지는 11장을 돌려 쓰므로 브랜드 15곳 중 일부는 대표 컷이 같을 수 있어요. 입점 브랜드가 올린 실제 룩북으로 교체 예정)
const looksOf = (name, bi) => {
  const seen = new Set()
  const l = allProducts.filter(p => p.brand === name).filter(p => !seen.has(p.image) && seen.add(p.image))
  const r = bi % l.length
  return [...l.slice(r), ...l.slice(0, r)]
}
const BRAND_LOOKS = BRAND_INFO.map((b, i) => ({ ...b, looks: looksOf(b.name, i) }))

export default function Lookbook() {
  const [open, setOpen] = useState(null) // { bi, idx }
  const b = open ? BRAND_LOOKS[open.bi] : null
  const look = b ? b.looks[open.idx] : null
  const step = d => setOpen(o => ({ ...o, idx: (o.idx + d + BRAND_LOOKS[o.bi].looks.length) % BRAND_LOOKS[o.bi].looks.length }))

  useEffect(() => {
    if (!open) return
    const k = e => { if (e.key === 'Escape') setOpen(null); if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1) }
    window.addEventListener('keydown', k)
    const prev = document.body.style.overflow; document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = prev }
  }, [open && open.bi])

  return (
    <main>
      <SharedStyle />
      <style>{`
        .lb-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 36px 20px; padding: 8px 0 80px; }
        .lb-card { text-align: left; display: block; width: 100%; color: inherit; background: none; border: 0; padding: 0; cursor: pointer; }
        .lb-ph { aspect-ratio: 2 / 3; background: #f4f4f2; overflow: hidden; position: relative; }
        .lb-ph img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .5s; }
        .lb-card:hover .lb-ph img { transform: scale(1.03); }
        .lb-more { position: absolute; right: 10px; bottom: 10px; background: rgba(255,255,255,.92); font-size: 12px; padding: 5px 10px; }
        .lb-cap { padding: 12px 2px 0; }
        .lb-cap b { display: block; font-size: 15px; font-weight: 600; letter-spacing: .01em; margin-bottom: 3px; }
        .lb-cap span { font-size: 13px; color: #8a8a8a; line-height: 1.5; }
        @media (max-width: 1280px) { .lb-grid { grid-template-columns: repeat(4, 1fr); } }
        @media (max-width: 1024px) { .lb-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 640px) { .lb-grid { grid-template-columns: repeat(2, 1fr); gap: 28px 12px; } }

        .lbp-bg { position: fixed; inset: 0; background: rgba(0,0,0,.72); z-index: 1200; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .lbp { background: #fff; width: min(960px, 100%); height: min(760px, 94dvh); display: grid; grid-template-columns: 1fr 112px; grid-template-rows: auto 1fr; }
        .lbp-h { grid-column: 1 / -1; display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 6px 6px 6px 22px; border-bottom: 1px solid #eee; }
        .lbp-h b { font-size: 17px; } .lbp-h span { font-size: 13px; color: #8a8a8a; margin-left: 10px; }
        .lbp-h button { width: 44px; height: 44px; font-size: 18px; flex-shrink: 0; }
        .lbp-view { position: relative; background: #f4f4f2; min-height: 0; display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .lbp-view img { height: 100%; width: 100%; object-fit: contain; }
        .lbp-arr { position: absolute; top: 50%; transform: translateY(-50%); width: 44px; height: 44px; background: rgba(255,255,255,.9); font-size: 24px; line-height: 1; border: 0; }
        .lbp-arr.l { left: 10px; } .lbp-arr.r { right: 10px; }
        .lbp-cnt { position: absolute; left: 12px; bottom: 12px; background: rgba(255,255,255,.9); font-size: 12px; padding: 4px 8px; }
        .lbp-go { position: absolute; right: 12px; bottom: 12px; background: #111; color: #fff; font-size: 13px; padding: 0 16px; min-height: 40px; display: inline-flex; align-items: center; }
        .lbp-th { overflow-y: auto; padding: 10px; display: flex; flex-direction: column; gap: 8px; border-left: 1px solid #eee; }
        .lbp-th button { padding: 0; border: 2px solid transparent; background: #f4f4f2; flex-shrink: 0; aspect-ratio: 2/3; }
        .lbp-th button.on { border-color: #111; }
        .lbp-th img { width: 100%; height: 100%; object-fit: cover; }
        @media (max-width: 640px) {
          .lbp-bg { padding: 0; } .lbp { height: 100dvh; width: 100%; grid-template-columns: 1fr; grid-template-rows: auto 1fr auto; }
          .lbp-th { flex-direction: row; border-left: 0; border-top: 1px solid #eee; overflow-x: auto; overflow-y: hidden; }
          .lbp-th button { width: 56px; }
        }
      `}</style>
      <Navbar />
      <div className="wrap-full">
        <div className="page-head"><h1>룩북</h1><p>입점 브랜드 {BRAND_INFO.length}곳의 대표 룩이에요. 사진을 누르면 브랜드의 전체 룩을 볼 수 있어요.</p></div>
        <div className="lb-grid">
          {BRAND_LOOKS.map((br, bi) => (
            <button key={br.name} className="lb-card" onClick={() => setOpen({ bi, idx: 0 })} aria-label={`${br.name} 룩북 열기`}>
              <div className="lb-ph"><Img src={br.looks[0].image} alt={`${br.name} 대표 룩`} /><span className="lb-more">전체 {br.looks.length}컷 보기</span></div>
              <div className="lb-cap"><b>{br.name}</b><span>{br.concept}</span></div>
            </button>
          ))}
        </div>
      </div>
      {open && (
        <div className="lbp-bg" onClick={() => setOpen(null)}>
          <div className="lbp" role="dialog" aria-modal="true" aria-label={`${b.name} 룩북`} onClick={e => e.stopPropagation()}>
            <div className="lbp-h"><div><b>{b.name}</b><span>{b.concept}</span></div><button onClick={() => setOpen(null)} aria-label="닫기">✕</button></div>
            <div className="lbp-view">
              <img src={look.image} alt={`${b.name} ${look.name}`} />
              <button className="lbp-arr l" onClick={() => step(-1)} aria-label="이전 룩">‹</button>
              <button className="lbp-arr r" onClick={() => step(1)} aria-label="다음 룩">›</button>
              <span className="lbp-cnt">{open.idx + 1} / {b.looks.length}</span>
              <a className="lbp-go" href={'/products/' + look.id}>{look.name} 보러가기</a>
            </div>
            <div className="lbp-th">
              {b.looks.map((l, i) => <button key={l.id} className={i === open.idx ? 'on' : ''} onClick={() => setOpen({ ...open, idx: i })} aria-label={`${i + 1}번째 룩`}><Img src={l.image} alt="" /></button>)}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </main>
  )
}
