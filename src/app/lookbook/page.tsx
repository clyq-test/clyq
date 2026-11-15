// @ts-nocheck
'use client'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import { SharedStyle, Footer, Img } from '../components/ui'
import { BRAND_INFO, allProducts } from '../lib/catalog'

// 브랜드별 룩 = 해당 브랜드 제품 중 이미지가 겹치지 않는 제품들(샘플 이미지는 카테고리별 대표 사진을 돌려 쓰므로 중복 제거)
const looks = name => {
  const seen = new Set()
  return allProducts.filter(p => p.brand === name).filter(p => !seen.has(p.image) && seen.add(p.image))
}

export default function Lookbook() {
  const [sel, setSel] = useState('')
  const list = sel ? BRAND_INFO.filter(b => b.name === sel) : BRAND_INFO
  return (
    <main>
      <SharedStyle />
      <style>{`
        .lb-chips { display: flex; gap: 8px; overflow-x: auto; padding: 4px 0 20px; scrollbar-width: none; }
        .lb-chips::-webkit-scrollbar { display: none; }
        .lb-chip { flex-shrink: 0; padding: 0 16px; min-height: 40px; border: 1px solid #e5e5e5; border-radius: 20px; font-size: 13px; color: #555; background: #fff; white-space: nowrap; }
        .lb-chip.on { background: #111; border-color: #111; color: #fff; }
        .lb-brand { padding: 36px 0 20px; border-top: 1px solid #eee; }
        .lb-head { display: flex; justify-content: space-between; align-items: flex-end; gap: 16px; margin-bottom: 20px; flex-wrap: wrap; }
        .lb-head h2 { font-size: 24px; font-weight: 700; letter-spacing: -0.02em; margin: 0 0 4px; }
        .lb-head p { margin: 0; font-size: 14px; color: #8a8a8a; }
        .lb-head a { font-size: 13px; text-decoration: underline; color: #555; min-height: 44px; display: inline-flex; align-items: center; }
        .lb-row { display: flex; gap: 12px; overflow-x: auto; scroll-snap-type: x proximity; padding-bottom: 8px; }
        .lb-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
        .lb-item { display: block; color: inherit; flex: 0 0 min(240px, 62vw); scroll-snap-align: start; }
        .lb-grid .lb-item { flex: none; }
        .lb-ph { aspect-ratio: 2 / 3; background: #f4f4f2; overflow: hidden; }
        .lb-ph img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .4s; }
        .lb-item:hover .lb-ph img { transform: scale(1.03); }
        .lb-cap { padding: 10px 2px 0; font-size: 13px; line-height: 1.5; }
        .lb-cap b { display: block; font-weight: 500; }
        .lb-cap span { color: #8a8a8a; }
        @media (max-width: 768px) { .lb-head h2 { font-size: 20px; } }
      `}</style>
      <Navbar />
      <div className="wrap-full">
        <div className="page-head"><h1>룩북</h1><p>입점 브랜드 {BRAND_INFO.length}곳의 스타일 제안이에요. 룩을 누르면 제품으로 이동해요.</p></div>
        <div className="lb-chips" role="tablist" aria-label="브랜드">
          <button className={'lb-chip' + (!sel ? ' on' : '')} onClick={() => setSel('')}>전체</button>
          {BRAND_INFO.map(b => <button key={b.name} className={'lb-chip' + (sel === b.name ? ' on' : '')} onClick={() => setSel(b.name)}>{b.name}</button>)}
        </div>
        {list.map(b => {
          const ls = looks(b.name)
          return (
            <section key={b.name} className="lb-brand">
              <div className="lb-head">
                <div><h2>{b.name}</h2><p>{b.concept}</p></div>
                <a href={'/products/new?b=' + encodeURIComponent(b.name)}>{b.name} 제품 전체 보기</a>
              </div>
              <div className={sel ? 'lb-grid' : 'lb-row'}>
                {ls.map(p => (
                  <a key={p.id} href={'/products/' + p.id} className="lb-item">
                    <div className="lb-ph"><Img src={p.image} alt={`${b.name} ${p.name}`} /></div>
                    <div className="lb-cap"><b>{p.name}</b><span>{p.price.toLocaleString()}원</span></div>
                  </a>
                ))}
              </div>
            </section>
          )
        })}
      </div>
      <Footer />
    </main>
  )
}
