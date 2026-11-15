// @ts-nocheck
'use client'
import { useState } from 'react'

/* 공용 이미지 헬퍼 (Unsplash, 로드 확인된 ID만 사용) */
export const U = (id, w = 600) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop&crop=center`
export const FB = U('1551232864-3f0890e580d9', 600)
export const onImgError = e => { e.currentTarget.onerror = null; e.currentTarget.src = FB }

export function Img({ src, alt = '', style, className }) {
  return <img src={src} alt={alt} className={className} loading="lazy" onError={onImgError} style={style} />
}

/* 하위 페이지 공통 스타일 */
export function SharedStyle() {
  return (
    <style>{`
      *, *::before, *::after { -webkit-tap-highlight-color: transparent; box-sizing: border-box; }
      button, a { touch-action: manipulation; }
      img { display: block; }
      main { background: #fff; color: #111; font-size: 14px; }
      .wrap { max-width: 1320px; margin: 0 auto; padding: 0 40px; }
      .page-head { padding: 48px 0 24px; }
      .page-head h1 { font-size: 32px; font-weight: 700; letter-spacing: -0.03em; margin: 0 0 8px; }
      .page-head p { font-size: 14px; color: #6b6b6b; line-height: 1.7; margin: 0; max-width: 36em; }
      .tabs { display: flex; gap: 4px; overflow-x: auto; border-bottom: 1px solid #eee; }
      .tab { padding: 12px 16px; font-size: 14px; color: #8a8a8a; border-bottom: 2px solid transparent; white-space: nowrap; min-height: 44px; }
      .tab.on { color: #111; font-weight: 500; border-bottom-color: #111; }
      .bar { display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; padding: 16px 0; }
      .count { font-size: 13px; color: #8a8a8a; }
      .chip { padding: 8px 14px; font-size: 13px; color: #6b6b6b; border: 1px solid #e5e5e5; border-radius: 999px; min-height: 36px; }
      .chip.on { color: #111; border-color: #111; }
      .toggle { display: inline-flex; align-items: center; gap: 10px; font-size: 14px; cursor: pointer; min-height: 44px; }
      .toggle i { width: 36px; height: 20px; border-radius: 999px; background: #d9d9d9; position: relative; transition: background .2s; }
      .toggle i::after { content: ''; position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; border-radius: 50%; background: #fff; transition: left .2s; }
      .toggle.on i { background: #3D6A4F; }
      .toggle.on i::after { left: 18px; }
      .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 36px 20px; padding-bottom: 72px; }
      .pc { display: block; color: inherit; }
      .pc-img { position: relative; aspect-ratio: 3/4; background: #f4f4f2; overflow: hidden; margin-bottom: 12px; }
      .pc-img img { width: 100%; height: 100%; object-fit: cover; transition: transform .5s ease; }
      .pc-fit { position: absolute; top: 10px; left: 10px; background: #fff; color: #3D6A4F; font-size: 11px; font-weight: 500; padding: 3px 8px; }
      .pc-add { position: absolute; left: 10px; right: 10px; bottom: 10px; padding: 11px; background: #fff; color: #111; font-size: 12px; font-weight: 500; min-height: 40px; }
      .pc-add:hover { background: #111; color: #fff; }
      .pc-brand { font-size: 12px; color: #8a8a8a; margin-bottom: 3px; }
      .pc-name { font-size: 14px; margin-bottom: 6px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
      .pc-price { display: flex; align-items: baseline; gap: 8px; font-size: 14px; font-weight: 600; }
      .pc-dc { color: #c04b4b; }
      .pc-org { font-size: 12px; font-weight: 400; color: #b5b5b5; text-decoration: line-through; }
      .btn-p { padding: 14px 28px; background: #111; color: #fff; font-size: 14px; font-weight: 500; min-height: 48px; display: inline-flex; align-items: center; justify-content: center; transition: background .2s; border: 0; }
      .btn-p:hover { background: #3D6A4F; }
      .btn-s { padding: 13px 28px; border: 1px solid #d9d9d9; background: #fff; color: #111; font-size: 14px; min-height: 48px; display: inline-flex; align-items: center; justify-content: center; }
      .btn-s:hover { border-color: #111; }
      .more { display: block; margin: 0 auto 72px; }
      .empty { text-align: center; padding: 80px 0; color: #8a8a8a; }
      .steps-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; padding: 8px 0 32px; }
      .step { border-top: 2px solid #111; padding-top: 14px; }
      .step-n { font-size: 13px; color: #3D6A4F; font-weight: 600; margin-bottom: 6px; }
      .step b { display: block; font-size: 15px; margin-bottom: 4px; }
      .step span { font-size: 13px; color: #6b6b6b; line-height: 1.6; }
      .foot { background: #fafaf8; border-top: 1px solid #eee; padding: 28px 0; }
      .foot .wrap { display: flex; justify-content: space-between; gap: 8px; flex-wrap: wrap; font-size: 12px; color: #aaa; }
      .foot b { font-size: 16px; font-weight: 800; letter-spacing: -0.02em; color: #111; }
      @media (max-width: 1024px) { .grid-4 { grid-template-columns: repeat(3, 1fr); } }
      @media (max-width: 768px) {
        .wrap { padding: 0 16px; }
        .page-head { padding: 28px 0 16px; }
        .page-head h1 { font-size: 24px; }
        .grid-4 { grid-template-columns: repeat(2, 1fr); gap: 24px 12px; padding-bottom: 48px; }
        .steps-row { grid-template-columns: repeat(2, 1fr); }
      }
    `}</style>
  )
}

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <b>CLYQ</b>
        <span>© 2026 CLYQ Inc.</span>
      </div>
    </footer>
  )
}

export function ProductCard({ p, onFit }) {
  const [hovered, setHovered] = useState(false)
  const dc = p.original > p.price ? Math.round((1 - p.price / p.original) * 100) : 0
  const Tag = onFit ? 'div' : 'a'
  return (
    <Tag href={onFit ? undefined : '/products/' + p.id} className="pc" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="pc-img">
        <Img src={p.image} alt={p.name} style={{ transform: hovered ? 'scale(1.03)' : 'scale(1)' }} />
        {p.fit && <span className="pc-fit">피팅</span>}
        {hovered && (
          <button className="pc-add" onClick={e => { e.preventDefault(); onFit && onFit(p) }}>피팅박스 담기</button>
        )}
      </div>
      <div className="pc-brand">{p.brand}</div>
      <div className="pc-name">{p.name}</div>
      <div className="pc-price">
        {dc > 0 && <span className="pc-dc">{dc}%</span>}
        <span>{p.price.toLocaleString()}원</span>
        {dc > 0 && <span className="pc-org">{p.original.toLocaleString()}원</span>}
      </div>
    </Tag>
  )
}
