// @ts-nocheck
'use client'
import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import { SharedStyle, Footer, ProductCard, Img, U } from '../../components/ui'
import { allProducts, CATEGORIES, BRANDS } from '../../lib/catalog'

const sorts = ['최신순', '가격 낮은순', '가격 높은순']
const banners = {
  '전체': U('1551232864-3f0890e580d9', 2400), '아우터': U('1539533018447-63fcce2678e3', 2400), '상의': U('1581044777550-4cfa60707c03', 2400),
  '하의': U('1496217590455-aa63a8350eea', 2400), '원피스': U('1515372039744-b8f02a3ae446', 2400), '가방': U('1583744946564-b52ac1c389c8', 2400),
}

export default function NewProducts() {
  const [cat, setCat] = useState('전체')
  const [brand, setBrand] = useState('')
  const [sale, setSale] = useState(false)
  const [sort, setSort] = useState('최신순')
  const [fitOnly, setFitOnly] = useState(false)
  const [visible, setVisible] = useState(15)

  useEffect(() => {
    const q = new URLSearchParams(window.location.search)
    setCat(q.get('c') || '전체'); setBrand(q.get('b') || ''); setSale(q.get('sale') === '1')
  }, [])

  function go(c) { setCat(c); setBrand(''); setSale(false); setVisible(15); window.history.replaceState(null, '', c === '전체' ? '/products/new' : '/products/new?c=' + encodeURIComponent(c)) }

  let list = allProducts.filter(p => (cat === '전체' || p.category === cat) && (!brand || p.brand === brand) && (!sale || p.original > p.price) && (!fitOnly || p.fit))
  if (sort === '가격 낮은순') list = [...list].sort((a, b) => a.price - b.price)
  if (sort === '가격 높은순') list = [...list].sort((a, b) => b.price - a.price)
  const title = brand || (sale ? 'SALE' : cat === '전체' ? '신상품' : cat)

  return (
    <main>
      <SharedStyle />
      <style>{`
        .cat-hero { position: relative; height: clamp(200px, 28vh, 320px); background: #222; overflow: hidden; color: #fff; }
        .cat-hero img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .cat-hero::after { content: ''; position: absolute; inset: 0; background: linear-gradient(0deg, rgba(0,0,0,.5), rgba(0,0,0,.1)); }
        .cat-hero div { position: absolute; left: 48px; bottom: 28px; z-index: 1; }
        .cat-hero h1 { font-size: 36px; font-weight: 700; letter-spacing: -0.03em; margin: 0 0 4px; }
        .cat-hero p { margin: 0; font-size: 14px; opacity: .85; }
        .tabs-full { display: flex; gap: 4px; overflow-x: auto; border-bottom: 1px solid #eee; margin-bottom: 4px; }
        @media (max-width: 768px) { .cat-hero div { left: 16px; } .cat-hero h1 { font-size: 26px; } }
      `}</style>
      <Navbar />
      <section className="cat-hero">
        <Img src={banners[cat] || banners['전체']} alt="" />
        <div><h1>{title}</h1><p>{list.length}개의 제품</p></div>
      </section>
      <div className="wrap-full">
        <div className="tabs-full">
          {['전체', ...CATEGORIES].map(c => <button key={c} className={'tab' + (cat === c && !brand && !sale ? ' on' : '')} onClick={() => go(c)}>{c}</button>)}
        </div>
        <div className="bar">
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
            <div className={'toggle' + (fitOnly ? ' on' : '')} role="switch" aria-checked={fitOnly} tabIndex={0}
              onClick={() => setFitOnly(!fitOnly)} onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setFitOnly(!fitOnly)}>
              <i /><span>피팅 가능한 제품만</span>
            </div>
            <select className="chip" value={brand} onChange={e => { setBrand(e.target.value); setVisible(15) }} aria-label="브랜드">
              <option value="">전체 브랜드</option>{BRANDS.map(b => <option key={b}>{b}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {sorts.map(s => <button key={s} className={'chip' + (sort === s ? ' on' : '')} onClick={() => setSort(s)}>{s}</button>)}
          </div>
        </div>
        {list.length === 0 ? (
          <div className="empty">조건에 맞는 제품이 아직 없어요. 다른 카테고리를 선택해 보세요.</div>
        ) : (
          <>
            <div className="grid-full" style={{ paddingTop: 16 }}>{list.slice(0, visible).map(p => <ProductCard key={p.id} p={p} />)}</div>
            {visible < list.length && <button className="btn-s more" onClick={() => setVisible(v => v + 10)}>더 보기 ({list.length - visible}개 남음)</button>}
          </>
        )}
      </div>
      <Footer />
    </main>
  )
}
