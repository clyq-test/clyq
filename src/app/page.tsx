// @ts-nocheck
'use client'
import { useMember } from './lib/auth'
import { useState, useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import { FitDrawer, Footer } from './components/ui'
import { useShop } from './lib/store'
import { allProducts, CATEGORIES, BRAND_INFO } from './lib/catalog'
import { MOODS, EXHIBITIONS, exhibitionItems, moodItems, mix, recommend } from './lib/curation'

/* ── 이미지 (Unsplash, 전부 로드 확인된 ID만 사용) ── */
const U = (id, w = 600) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop&crop=center`
const FB = U('1551232864-3f0890e580d9', 600) // 이미지 로드 실패시 대체

const banners = [
  { title: '입어보고\n확실한 것만\n담아가세요', sub: '집에서 먼저 입어보고, 마음에 드는 옷만 구매하세요.', image: U('1551232864-3f0890e580d9', 2400), cta: '피팅박스 신청', ctaLink: '/fitting' },
  { title: '취향에 맞는\n스타일을\n추천해 드려요', sub: '몇 가지 질문으로 나에게 맞는 제품을 골라드려요.', image: U('1581044777550-4cfa60707c03', 2400), cta: '취향 분석 시작', ctaLink: '/mypage' },
  { title: '위디 포인트로\n더 알차게\n쇼핑하세요', sub: '피팅하고 구매할 때마다 위디가 쌓여요.', image: U('1583744946564-b52ac1c389c8', 2400), cta: '위디 알아보기', ctaLink: '/withy' },
  { title: '커뮤니티에서\n함께 나누는\n패션 이야기', sub: '피팅 후기와 스타일을 공유해 보세요.', image: U('1496217590455-aa63a8350eea', 2400), cta: '커뮤니티 가기', ctaLink: '/community' },
]

// 큐레이션 데이터(전부 카탈로그에서 규칙으로 계산 — 판매 실적 기반 순위가 아님)
const editorPicks = mix(allProducts.filter(p => p.fit && p.original === p.price), 5)
const saleItems = mix(allProducts.filter(p => p.original > p.price).sort((x, y) => (y.original - y.price) / y.original - (x.original - x.price) / x.original), 5)
const fitItems = mix(allProducts.filter(p => p.fit && p.category !== '아우터'), 5)
const featured = EXHIBITIONS

const communityPosts = [
  { title: '마르시아 코트 S/M 비교 피팅 후기', author: '김지연', likes: 48, comments: 12, tag: '피팅 후기', image: U('1539533018447-63fcce2678e3', 200) },
  { title: 'CLYQ 피팅박스로 건진 가을 코디', author: '박소연', likes: 72, comments: 24, tag: '스타일 공유', image: U('1483985988355-763728e1935b', 200) },
  { title: '위디 골드 달성 후기 — 혜택 총정리', author: '강민수', likes: 134, comments: 45, tag: '자유게시판', image: U('1578932750294-f5075e85f44a', 200) },
]

const articles = [
  { title: '선피팅이 바꾸는 패션 소비 방식', tag: '트렌드' },
  { title: 'MARCIA 2026 F/W 컬렉션 프리뷰', tag: '브랜드' },
  { title: '가을 니트 고르는 법', tag: '스타일링' },
]

function ProductCard({ p, onFit }) {
  const [hovered, setHovered] = useState(false)
  const { isWished, toggleWish } = useShop()
  const dc = p.original > p.price ? Math.round((1 - p.price / p.original) * 100) : 0
  return (
    <a href={'/products/' + p.id} className="pc" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="pc-img">
        <img
          src={p.image} alt={p.name} loading="lazy"
          onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = FB }}
          style={{ transform: hovered ? 'scale(1.03)' : 'scale(1)' }}
        />
        <button className={'pc-heart' + (isWished(p.id) ? ' on' : '')} aria-label="찜하기" onClick={e => { e.preventDefault(); e.stopPropagation(); toggleWish(p.id) }}>{isWished(p.id) ? '♥' : '♡'}</button>
        {p.fit && <span className="pc-fit">피팅</span>}
        {hovered && p.fit && (
          <button className="pc-add" onClick={e => { e.preventDefault(); e.stopPropagation(); onFit && onFit(p) }}>피팅박스 신청</button>
        )}
      </div>
      <div className="pc-brand">{p.brand}</div>
      <div className="pc-name">{p.name}</div>
      <div className="pc-price">
        {dc > 0 && <span className="pc-dc">{dc}%</span>}
        <span>{p.price.toLocaleString()}원</span>
        {dc > 0 && <span className="pc-org">{p.original.toLocaleString()}원</span>}
      </div>
    </a>
  )
}

const CAT_MENU = [
  { h: '아우터', sub: ['코트', '재킷', '패딩', '조끼'] }, { h: '상의', sub: ['블라우스', '니트', '티셔츠', '셔츠'] },
  { h: '하의', sub: ['스커트', '팬츠', '레깅스', '쇼츠'] }, { h: '원피스·세트', sub: ['미디 드레스', '미니 드레스', '세트업', '점프수트'] },
  { h: '가방', sub: ['숄더백', '크로스백', '토트백', '클러치'] }, { h: '슈즈', sub: ['플랫', '힐', '스니커즈', '부츠'] },
]

export default function Home() {
  const [bannerIdx, setBannerIdx] = useState(0)
  const edRef = useRef(null)
  const [edPos, setEdPos] = useState(0)
  const [edAtEnd, setEdAtEnd] = useState(false)
  const slideEd = d => { const t = edRef.current; if (!t) return; const w = t.querySelector('.ed'); t.scrollBy({ left: d * (w.offsetWidth + 20), behavior: 'smooth' }) }
  useEffect(() => { const t = edRef.current; if (t) setEdAtEnd(t.scrollLeft + t.clientWidth >= t.scrollWidth - 4) }, [edPos])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const [fitProd, setFitProd] = useState(null)
  const [mood, setMood] = useState(MOODS[0].key)

  const [member] = useMember()
  useEffect(() => { setIsLoggedIn(!!member); setUserName(member ? member.name : '') }, [member])

  useEffect(() => {
    const t = setInterval(() => setBannerIdx(i => (i + 1) % banners.length), 6000)
    return () => clearInterval(t)
  }, [])

  const b = banners[bannerIdx]
  const personal = member ? recommend(member.style, 5) : null
  const moodList = mix(moodItems(mood), 10)
  const curMood = MOODS.find(m => m.key === mood)

  return (
    <main>
      <style>{`
        *, *::before, *::after { -webkit-tap-highlight-color: transparent; box-sizing: border-box; }
        button, a { touch-action: manipulation; }
        img { display: block; }
        main { background: #fff; color: #111; font-size: 14px; }
        .wrap { max-width: 1320px; margin: 0 auto; padding: 0 40px; }

        .hero-full { position: relative; width: 100%; height: clamp(480px, 78vh, 820px); overflow: hidden; background: #222; color: #fff; }
        .hero-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; animation: heroIn .8s ease; }
        @keyframes heroIn { from { opacity: 0 } to { opacity: 1 } }
        .hero-shade { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(0,0,0,.55) 0%, rgba(0,0,0,.15) 55%, rgba(0,0,0,0) 100%); }
        .hero-copy { position: absolute; left: 0; right: 0; bottom: 0; padding: 0 56px 64px; max-width: 760px; }
        .hero-full .hero-title { color: #fff; margin-bottom: 16px; }
        .hero-full .hero-desc { color: rgba(255,255,255,.85); margin-bottom: 28px; }
        .btn-w { padding: 14px 28px; background: #fff; color: #111; font-size: 14px; font-weight: 500; min-height: 48px; display: inline-flex; align-items: center; }
        .btn-w:hover { background: #3D6A4F; color: #fff; }
        .btn-o { padding: 13px 28px; border: 1px solid rgba(255,255,255,.7); color: #fff; font-size: 14px; min-height: 48px; display: inline-flex; align-items: center; }
        .btn-o:hover { background: rgba(255,255,255,.15); }
        .hero-full .dot { background: rgba(255,255,255,.4); } .hero-full .dot.on { background: #fff; }
        .wrap-full { width: 100%; padding: 0 48px; }
        @media (max-width: 768px) {
          .hero-full { height: 70vh; min-height: 440px; }
          .hero-copy { padding: 0 20px 36px; }
          .hero-shade { background: linear-gradient(0deg, rgba(0,0,0,.6) 0%, rgba(0,0,0,.1) 70%); }
          .wrap-full { padding: 0 16px; }
        }
        /* 히어로 */
        .hero { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; padding: 56px 0 72px; }
        .hero-title { font-size: 56px; font-weight: 700; line-height: 1.18; letter-spacing: -0.035em; margin: 0 0 20px; white-space: pre-line; }
        .hero-desc { font-size: 16px; color: #6b6b6b; line-height: 1.7; margin: 0 0 36px; max-width: 28em; }
        .hero-btns { display: flex; gap: 10px; flex-wrap: wrap; }
        .btn-p { padding: 14px 28px; background: #111; color: #fff; font-size: 14px; font-weight: 500; min-height: 48px; display: inline-flex; align-items: center; justify-content: center; transition: background .2s; }
        .btn-p:hover { background: #3D6A4F; }
        .btn-s { padding: 13px 28px; border: 1px solid #d9d9d9; color: #111; font-size: 14px; min-height: 48px; display: inline-flex; align-items: center; justify-content: center; transition: border-color .2s; }
        .btn-s:hover { border-color: #111; }
        .hero-media { position: relative; aspect-ratio: 1/1; max-height: 560px; width: 100%; background: #f4f4f2; overflow: hidden; }
        .hero-media img { width: 100%; height: 100%; object-fit: cover; }
        .dots { display: flex; gap: 8px; margin-top: 40px; }
        .dot { width: 24px; height: 2px; background: #d9d9d9; border: 0; padding: 0; cursor: pointer; transition: background .2s; }
        .dot.on { background: #111; }

        /* 섹션 */
        .sec { padding: 72px 0; }
        .sec.alt { background: #fafaf8; }
        .sec-row { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 28px; gap: 12px; }
        .sec-title { font-size: 24px; font-weight: 600; letter-spacing: -0.02em; margin: 0; }
        .sec-more { font-size: 13px; color: #6b6b6b; }
        .sec-more:hover { color: #111; }
        .grid-5 { display: grid; grid-template-columns: repeat(5, 1fr); gap: 36px 20px; }
        .grid-6 { display: grid; grid-template-columns: repeat(6, 1fr); gap: 36px 20px; }

        .sec-sub { margin: -14px 0 24px; font-size: 13px; color: #8a8a8a; line-height: 1.6; }
        .cat-menu { display: grid; grid-template-columns: repeat(6, 1fr); gap: 32px; text-align: center; }
        .cat-h { display: block; font-size: 15px; font-weight: 600; color: #111; padding-bottom: 14px; margin-bottom: 14px; border-bottom: 1px solid #e5e5e5; }
        .cat-s { display: block; font-size: 14px; color: #777; padding: 9px 0; font-weight: 300; transition: color .15s; }
        .cat-s:hover, .cat-h:hover { color: #3D6A4F; }
        .mood-tabs { display: flex; gap: 8px; overflow-x: auto; margin-bottom: 14px; padding-bottom: 2px; scrollbar-width: none; }
        .mood-tabs::-webkit-scrollbar { display: none; }
        .mood-tab { flex-shrink: 0; padding: 0 20px; min-height: 42px; border: 1px solid #e0e0e0; background: #fff; font-size: 14px; color: #555; border-radius: 21px; }
        .mood-tab.on { background: #111; border-color: #111; color: #fff; }
        .brand-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; }
        .brand-tile { background: #fff; border: 1px solid #eee; padding: 18px 16px; color: inherit; display: block; min-height: 84px; transition: border-color .2s; }
        .brand-tile:hover { border-color: #111; }
        .brand-tile b { display: block; font-size: 14px; letter-spacing: .03em; margin-bottom: 6px; }
        .brand-tile span { font-size: 12px; color: #8a8a8a; line-height: 1.5; display: block; }

        /* 상품 카드 */
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

        /* 피팅박스 안내 */
        .fit { display: grid; grid-template-columns: 1fr 1.4fr; gap: 56px; align-items: center; }
        .fit h2 { font-size: 30px; font-weight: 700; letter-spacing: -0.03em; line-height: 1.35; margin: 0 0 24px; }
        .steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .step { border-top: 2px solid #111; padding-top: 16px; }
        .step-n { font-size: 13px; color: #3D6A4F; font-weight: 600; margin-bottom: 8px; }
        .step b { display: block; font-size: 16px; margin-bottom: 6px; }
        .step span { font-size: 13px; color: #6b6b6b; line-height: 1.6; }

        /* 기획전: 한 화면 3개, 좌우 슬라이드 */
        .ed-wrap { position: relative; }
        .ed-track { display: flex; gap: 20px; overflow-x: auto; scroll-snap-type: x mandatory; scroll-behavior: smooth; scrollbar-width: none; -webkit-overflow-scrolling: touch; }
        .ed-track::-webkit-scrollbar { display: none; }
        .ed { flex: 0 0 calc((100% - 40px) / 3); scroll-snap-align: start; color: inherit; min-width: 0; }
        .ed-img { aspect-ratio: 2/3; background: #f4f4f2; overflow: hidden; margin-bottom: 14px; }
        .ed-img img { width: 100%; height: 100%; object-fit: cover; transition: transform .5s ease; }
        .ed:hover .ed-img img { transform: scale(1.03); }
        .ed-nav { position: absolute; top: calc(50% - 40px); width: 44px; height: 44px; background: rgba(255,255,255,.92); border: 1px solid #e5e5e5; font-size: 22px; line-height: 1; z-index: 2; }
        .ed-nav.l { left: -22px; } .ed-nav.r { right: -22px; }
        .ed-nav:disabled { opacity: .35; cursor: default; }
        @media (max-width: 900px) { .ed { flex-basis: calc((100% - 20px) / 2); } .ed-nav.l { left: 4px; } .ed-nav.r { right: 4px; } }
        @media (max-width: 560px) { .ed { flex-basis: 78%; } }
        .ed b { display: block; font-size: 17px; font-weight: 600; margin-bottom: 4px; }
        .ed span { font-size: 13px; color: #6b6b6b; }

        /* 커뮤니티·매거진 */
        .two { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; }
        .row-item { display: flex; gap: 16px; align-items: center; padding: 16px 0; border-bottom: 1px solid #eee; color: inherit; }
        .row-item:first-of-type { border-top: 1px solid #eee; }
        .row-item img { width: 64px; height: 64px; object-fit: cover; flex-shrink: 0; background: #f4f4f2; }
        .tagline { font-size: 12px; color: #3D6A4F; font-weight: 500; margin-bottom: 4px; }
        .row-title { font-size: 14px; line-height: 1.5; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
        .row-meta { font-size: 12px; color: #9a9a9a; display: flex; gap: 12px; margin-top: 4px; }

        /* 위디 · 브랜드 */
        .withy { display: flex; justify-content: space-between; align-items: center; gap: 24px; flex-wrap: wrap; padding: 32px 36px; background: #fafaf8; }
        .withy h3 { font-size: 20px; font-weight: 600; margin: 0 0 6px; letter-spacing: -0.02em; }
        .withy p { margin: 0; font-size: 13px; color: #6b6b6b; line-height: 1.7; }
        .withy-pts { display: flex; gap: 32px; align-items: center; flex-wrap: wrap; }
        .withy-pts div { text-align: center; font-size: 12px; color: #8a8a8a; }
        .withy-pts b { display: block; font-size: 22px; font-weight: 600; color: #111; margin-bottom: 2px; }
        .brands { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px 36px; padding: 40px 0; border-top: 1px solid #eee; font-size: 14px; color: #9a9a9a; letter-spacing: 0.04em; }
        .brands span:hover { color: #111; cursor: pointer; }

        /* 푸터 */

        @media (max-width: 1024px) {
          .wrap { padding: 0 24px; }
          .grid-5, .grid-6 { grid-template-columns: repeat(3, 1fr); }
          .cat-menu { grid-template-columns: repeat(3, 1fr); }
          .brand-grid { grid-template-columns: repeat(3, 1fr); }
          .hero { gap: 32px; }
          .hero-title { font-size: 44px; }
          .fit { grid-template-columns: 1fr; gap: 32px; }
          .two { gap: 32px; }
          }
        @media (max-width: 768px) {
          .wrap { padding: 0 16px; }
          .hero { grid-template-columns: 1fr; padding: 24px 0 48px; gap: 28px; }
          .hero-media { order: -1; aspect-ratio: 1/1; }
          .hero-title { font-size: 36px; }
          .hero-desc { font-size: 14px; margin-bottom: 24px; }
          .hero-btns { flex-direction: column; }
          .dots { margin-top: 28px; }
          .sec { padding: 44px 0; }
          .sec-title { font-size: 20px; }
          .grid-5, .grid-6 { grid-template-columns: repeat(2, 1fr); gap: 28px 12px; }
          .cat-menu { grid-template-columns: repeat(2, 1fr); gap: 24px 16px; }
          .brand-grid { grid-template-columns: repeat(2, 1fr); }
          .sec-sub { margin-top: -10px; }
          .steps { grid-template-columns: 1fr; gap: 16px; }
          .fit h2 { font-size: 24px; }
          .ed-grid { grid-template-columns: 1fr; }
          .ed-img { aspect-ratio: 16/10; }
          .two { grid-template-columns: 1fr; gap: 40px; }
          .withy { padding: 24px 20px; }
              }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
      `}</style>

      <Navbar />

      {/* ── 히어로 (전체 화면 가로형) ── */}
      <section className="hero-full">
        <img className="hero-bg" key={bannerIdx} src={b.image} alt="" onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = FB }} />
        <div className="hero-shade" />
        <div className="hero-copy">
          <h1 className="hero-title">{b.title}</h1>
          <p className="hero-desc">{b.sub}</p>
          <div className="hero-btns">
            <a href={b.ctaLink} className="btn-w">{b.cta}</a>
            <a href="/products/new" className="btn-o">전체 상품 보기</a>
          </div>
          <div className="dots" role="tablist" aria-label="배너 선택">
            {banners.map((_, i) => (
              <button key={i} className={'dot' + (bannerIdx === i ? ' on' : '')} onClick={() => setBannerIdx(i)} aria-label={`배너 ${i + 1}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 추천 ── */}
      <section id="best" className="sec" style={{ paddingTop: 56 }}>
        <div className="wrap-full">
          <div className="sec-row">
            <h2 className="sec-title">{personal && personal.length ? `${userName}님 취향 기반 추천` : '에디터 픽'}</h2>
            <a href="/products/new" className="sec-more">전체보기</a>
          </div>
          {!(personal && personal.length) && <p className="sec-sub">{isLoggedIn ? '마이페이지에서 취향 분석을 입력하면 취향에 맞는 제품을 골라 드려요.' : '피팅박스로 먼저 입어볼 수 있는 제품이에요. 로그인 후 취향 분석을 입력하면 맞춤 추천을 받을 수 있어요.'}</p>}
          <div className="grid-5">
            {(personal && personal.length ? personal : editorPicks).map(p => <ProductCard key={p.id} p={p} onFit={setFitProd} />)}
          </div>
        </div>
      </section>

      {/* ── 카테고리 ── */}
      <section className="sec" style={{ paddingTop: 8, paddingBottom: 56 }}>
        <div className="wrap-full">
          <div className="sec-row"><h2 className="sec-title">카테고리별 쇼핑</h2><a href="/products/new" className="sec-more">전체보기</a></div>
          <div className="cat-menu">
            {CAT_MENU.map(col => (
              <div key={col.h} className="cat-col">
                <a className="cat-h" href={'/products/new?c=' + encodeURIComponent(col.h.split('·')[0])}>{col.h}</a>
                {col.sub.map(s => <a key={s} className="cat-s" href={'/products/new?c=' + encodeURIComponent(col.h.split('·')[0])}>{s}</a>)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 무드별 ── */}
      <section className="sec alt">
        <div className="wrap-full">
          <div className="sec-row"><h2 className="sec-title">무드별 스타일</h2><a href={'/products/new?m=' + mood} className="sec-more">{curMood.label} 전체보기</a></div>
          <div className="mood-tabs" role="tablist" aria-label="무드">
            {MOODS.map(m => <button key={m.key} role="tab" aria-selected={mood === m.key} className={'mood-tab' + (mood === m.key ? ' on' : '')} onClick={() => setMood(m.key)}>{m.label}</button>)}
          </div>
          <p className="sec-sub">{curMood.sub} · {curMood.brands.join(', ')}</p>
          <div className="grid-5">
            {moodList.map(p => <ProductCard key={p.id} p={p} onFit={setFitProd} />)}
          </div>
        </div>
      </section>

      {/* ── 기획전 ── */}
      <section className="sec">
        <div className="wrap-full">
          <div className="sec-row"><h2 className="sec-title">기획전</h2><a href="/exhibition" className="sec-more">전체 기획전</a></div>
          <div className="ed-wrap">
            <button className="ed-nav l" onClick={() => slideEd(-1)} disabled={edPos <= 0} aria-label="이전 기획전">‹</button>
            <div className="ed-track" ref={edRef} onScroll={e => setEdPos(e.currentTarget.scrollLeft)}>
              {featured.map(ed => { const l = exhibitionItems(ed); return (
                <a key={ed.key} href={'/products/new?ex=' + ed.key} className="ed">
                  <div className="ed-img"><img src={l[0].image} alt="" loading="lazy" onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = FB }} /></div>
                  <b>{ed.title}</b>
                  <span>{ed.sub} · {l.length}개</span>
                </a>
              ) })}
            </div>
            <button className="ed-nav r" onClick={() => slideEd(1)} disabled={edAtEnd} aria-label="다음 기획전">›</button>
          </div>
        </div>
      </section>

      {/* ── 세일 ── */}
      <section className="sec alt">
        <div className="wrap-full">
          <div className="sec-row"><h2 className="sec-title">시즌 세일</h2><a href="/products/new?sale=1" className="sec-more">전체보기</a></div>
          <p className="sec-sub">할인율이 큰 제품부터 보여드려요.</p>
          <div className="grid-5">
            {saleItems.map(p => <ProductCard key={p.id} p={p} onFit={setFitProd} />)}
          </div>
        </div>
      </section>

      {/* ── 피팅박스 안내 ── */}
      <section className="sec alt">
        <div className="wrap fit">
          <div>
            <h2>집에서 먼저 입어보고,<br />마음에 드는 옷만 구매하세요</h2>
            <a href="/fitting" className="btn-p">피팅박스 신청하기</a>
          </div>
          <div className="steps">
            <div className="step"><div className="step-n">1</div><b>신청</b><span>입어보고 싶은 옷을 피팅박스에 담아 신청합니다.</span></div>
            <div className="step"><div className="step-n">2</div><b>착용 48시간</b><span>받은 박스를 집에서 편하게 입어봅니다.</span></div>
            <div className="step"><div className="step-n">3</div><b>결정</b><span>마음에 든 옷만 구매하고, 나머지는 반납합니다.</span></div>
          </div>
        </div>
      </section>

      {/* ── 피팅 가능 제품 ── */}
      <section className="sec">
        <div className="wrap-full">
          <div className="sec-row"><h2 className="sec-title">먼저 입어보세요</h2><a href="/exhibition" className="sec-more">피팅 가능 제품 전체</a></div>
          <p className="sec-sub">피팅박스로 신청하면 집에서 48시간 입어볼 수 있는 제품이에요.</p>
          <div className="grid-5">
            {fitItems.map(p => <ProductCard key={p.id} p={p} onFit={setFitProd} />)}
          </div>
        </div>
      </section>

      {/* ── 브랜드 ── */}
      <section className="sec alt">
        <div className="wrap-full">
          <div className="sec-row"><h2 className="sec-title">입점 브랜드</h2><a href="/lookbook" className="sec-more">룩북 보기</a></div>
          <div className="brand-grid">
            {BRAND_INFO.map(b => (
              <a key={b.name} href={'/products/new?b=' + encodeURIComponent(b.name)} className="brand-tile"><b>{b.name}</b><span>{b.concept}</span></a>
            ))}
          </div>
        </div>
      </section>

      {/* ── 커뮤니티 · 매거진 ── */}
      <section className="sec">
        <div className="wrap two">
          <div>
            <div className="sec-row">
              <h2 className="sec-title">커뮤니티 인기글</h2>
              <a href="/community" className="sec-more">더보기</a>
            </div>
            {communityPosts.map((post, i) => (
              <a key={i} href="/community" className="row-item">
                <img src={post.image} alt="" loading="lazy" onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = FB }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="tagline">{post.tag}</div>
                  <div className="row-title">{post.title}</div>
                  <div className="row-meta"><span>{post.author}</span><span>좋아요 {post.likes}</span><span>댓글 {post.comments}</span></div>
                </div>
              </a>
            ))}
          </div>
          <div>
            <div className="sec-row">
              <h2 className="sec-title">매거진</h2>
              <a href="/magazine" className="sec-more">더보기</a>
            </div>
            {articles.map((art, i) => (
              <a key={i} href="/magazine" className="row-item" style={{ padding: '22px 0' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="tagline">{art.tag}</div>
                  <div className="row-title" style={{ fontSize: '16px' }}>{art.title}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── 위디 포인트 ── */}
      <div className="wrap" style={{ paddingBottom: '72px' }}>
        <div className="withy">
          <div>
            <h3>위디(Withy) 포인트</h3>
            <p>피팅하고 구매할 때마다 쌓이는 포인트.<br />커뮤니티 활동으로도 모을 수 있어요.</p>
          </div>
          <div className="withy-pts">
            {[{ n: '+50P', l: '피팅 이용' }, { n: '+30P', l: '글 작성' }, { n: '+10P', l: '댓글' }].map(s => (
              <div key={s.l}><b>{s.n}</b>{s.l}</div>
            ))}
            <a href="/withy" className="btn-p">위디 알아보기</a>
          </div>
        </div>
      </div>

      <Footer />
      {fitProd && <FitDrawer product={fitProd} onClose={() => setFitProd(null)} />}
    </main>
  )
}
