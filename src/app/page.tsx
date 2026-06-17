// @ts-nocheck
'use client'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'

const banners = [
  { title:'입어보고\n확실한 것만\n담아가세요', sub:'AI가 취향을 읽고 피팅 박스를 보내드려요.\n집에서 입어보고, 마음에 드는 것만 구매하면 됩니다.', image:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&auto=format&fit=crop', tag:'2026 F/W NEW COLLECTION', cta:'피팅박스 신청', ctaLink:'/fitting' },
  { title:'AI가 분석한\n나만의\n스타일 추천', sub:'5가지 질문으로 AI가 취향을 분석하고\n딱 맞는 제품을 골라드려요.', image:'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&auto=format&fit=crop', tag:'AI CURATION SERVICE', cta:'취향 분석 시작', ctaLink:'/mypage' },
  { title:'위디 포인트로\n더 알차게\n쇼핑하세요', sub:'피팅하고 구매할 때마다 위디가 쌓여요.\n쌓인 위디로 다음 쇼핑이 더 저렴해집니다.', image:'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&auto=format&fit=crop', tag:'WITHY POINT EVENT', cta:'위디 알아보기', ctaLink:'/withy' },
  { title:'커뮤니티에서\n함께 나누는\n패션 이야기', sub:'피팅 후기, 스타일 공유, Q&A\n활동할수록 위디가 쌓여요.', image:'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop', tag:'COMMUNITY OPEN', cta:'커뮤니티 가기', ctaLink:'/community' },
]

const bestProducts = [
  { id:1, brand:'MARCIA', name:'오버핏 캐시미어 울 코트', price:428000, original:520000, points:428, fit:true, image:'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&auto=format&fit=crop', rank:1 },
  { id:2, brand:'EIGHT', name:'셔링 디테일 미디 드레스', price:198000, original:240000, points:198, fit:true, image:'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&auto=format&fit=crop', rank:2 },
  { id:3, brand:'MATIN KIM', name:'오버핏 레더 재킷', price:578000, original:578000, points:578, fit:true, image:'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop', rank:3 },
  { id:4, brand:'SORRY TOO MUCH LOVE', name:'메리노 울 니트 세트업', price:245000, original:245000, points:245, fit:false, image:'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&auto=format&fit=crop', rank:4 },
  { id:5, brand:'ANDERSSONBELL', name:'테일러드 수트 재킷', price:318000, original:318000, points:318, fit:true, image:'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop', rank:5 },
]

const newProducts = [
  { id:6, brand:'EENK', name:'셔링 미디 스커트', price:148000, original:148000, points:148, fit:true, image:'https://images.unsplash.com/photo-1583496661160-fb5218e5b8a9?w=600&auto=format&fit=crop' },
  { id:7, brand:'D.POUND', name:'라운드넥 실크 블라우스', price:158000, original:198000, points:158, fit:true, image:'https://images.unsplash.com/photo-1594938298603-c8148f4851b8?w=600&auto=format&fit=crop' },
  { id:8, brand:'ANOTHER A', name:'캐시미어 터틀넥 니트', price:218000, original:218000, points:218, fit:false, image:'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&auto=format&fit=crop' },
  { id:9, brand:'ADER ERROR', name:'오버핏 후드 스웨트셔츠', price:198000, original:198000, points:198, fit:true, image:'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&auto=format&fit=crop' },
  { id:10, brand:'MATIN KIM', name:'퀼팅 미니 숄더백', price:368000, original:368000, points:368, fit:false, image:'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop' },
  { id:11, brand:'MARCIA', name:'울 플리츠 와이드 팬츠', price:248000, original:298000, points:248, fit:true, image:'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop' },
  { id:12, brand:'EENK', name:'오프숄더 리본 블라우스', price:168000, original:168000, points:168, fit:true, image:'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop' },
  { id:13, brand:'D.POUND', name:'울 롱 스커트', price:228000, original:268000, points:228, fit:true, image:'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&auto=format&fit=crop' },
  { id:14, brand:'ANDERSSONBELL', name:'플리츠 와이드 슬랙스', price:238000, original:238000, points:238, fit:false, image:'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=600&auto=format&fit=crop' },
  { id:15, brand:'ANOTHER A', name:'패딩 숏 재킷', price:398000, original:398000, points:398, fit:true, image:'https://images.unsplash.com/photo-1544441893-675973e31985?w=600&auto=format&fit=crop' },
  { id:16, brand:'SORRY TOO MUCH LOVE', name:'벨벳 미니 원피스', price:188000, original:228000, points:188, fit:true, image:'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&auto=format&fit=crop' },
  { id:17, brand:'MARCIA', name:'캐시미어 브이넥 가디건', price:268000, original:268000, points:268, fit:true, image:'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&auto=format&fit=crop' },
]

const aiProducts = [
  { id:1, brand:'MARCIA', name:'캐시미어 울 코트', price:428000, points:428, fit:true, image:'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&auto=format&fit=crop', rank:1 },
  { id:2, brand:'EENK', name:'셔링 미디 스커트', price:148000, points:148, fit:true, image:'https://images.unsplash.com/photo-1583496661160-fb5218e5b8a9?w=400&auto=format&fit=crop', rank:2 },
  { id:5, brand:'ANDERSSONBELL', name:'테일러드 재킷', price:318000, points:318, fit:true, image:'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&auto=format&fit=crop', rank:3 },
  { id:7, brand:'D.POUND', name:'실크 블라우스', price:158000, points:158, fit:true, image:'https://images.unsplash.com/photo-1594938298603-c8148f4851b8?w=400&auto=format&fit=crop', rank:4 },
  { id:12, brand:'EENK', name:'오프숄더 블라우스', price:168000, points:168, fit:true, image:'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&auto=format&fit=crop', rank:5 },
]

const communityPosts = [
  { title:'마르시아 코트 S/M 비교 피팅 후기', author:'김지연', likes:48, comments:12, tag:'피팅 후기', image:'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=200&auto=format&fit=crop' },
  { title:'CLYQ 피팅박스로 건진 가을 코디', author:'박소연', likes:72, comments:24, tag:'스타일 공유', image:'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=200&auto=format&fit=crop' },
  { title:'위디 골드 달성 후기 — 혜택 총정리', author:'강민수', likes:134, comments:45, tag:'자유게시판', image:null },
]

function ProductCard({ p }) {
  const [hovered, setHovered] = useState(false)
  const dc = p.original > p.price ? Math.round((1 - p.price / p.original) * 100) : 0
  return (
    <a href={'/products/' + p.id} style={{display:'block',textDecoration:'none',color:'inherit'}}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div style={{position:'relative',aspectRatio:'3/4',background:'#F0EBE4',overflow:'hidden',marginBottom:'10px'}}>
        <img src={p.image} alt={p.name}
          style={{width:'100%',height:'100%',objectFit:'cover',transition:'transform 0.5s ease',transform:hovered?'scale(1.04)':'scale(1)'}}/>
        <div style={{position:'absolute',top:'10px',left:'10px',display:'flex',flexDirection:'column',gap:'4px'}}>
          {p.rank && p.rank <= 5 && (
            <span style={{background:'rgba(0,0,0,0.5)',color:'#fff',fontSize:'10px',fontWeight:400,padding:'3px 9px',fontFamily:"'Cormorant Garamond',Georgia,serif",letterSpacing:'1px'}}>
              0{p.rank}
            </span>
          )}
          {p.fit && <span style={{background:'#3D6A4F',color:'#fff',fontSize:'8px',fontWeight:500,padding:'2px 6px',letterSpacing:'0.5px'}}>피팅</span>}
        </div>
        <button
          style={{position:'absolute',top:'10px',right:'10px',width:'32px',height:'32px',borderRadius:'50%',background:'rgba(255,255,255,0.9)',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}
          onClick={e => e.preventDefault()}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6A6460" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        {hovered && (
          <div style={{position:'absolute',bottom:0,left:0,right:0,display:'flex'}}>
            <button style={{flex:1,padding:'11px',background:'#3D6A4F',color:'#fff',fontSize:'11px',fontWeight:400,border:'none',cursor:'pointer',letterSpacing:'0.5px'}}
              onClick={e => e.preventDefault()}>피팅박스 담기</button>
            <button style={{width:'44px',padding:'11px',background:'#1C1C1C',color:'#fff',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}
              onClick={e => e.preventDefault()}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
            </button>
          </div>
        )}
      </div>
      <div style={{fontSize:'9px',letterSpacing:'2px',color:'#A09B97',marginBottom:'4px'}}>{p.brand}</div>
      <div style={{fontSize:'13px',color:'#3A3835',marginBottom:'5px',fontWeight:300,overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis'}}>{p.name}</div>
      <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'3px'}}>
        <span style={{fontSize:'14px',fontWeight:400}}>{p.price.toLocaleString()}원</span>
        {dc > 0 && <>
          <span style={{fontSize:'11px',color:'#D4CFC9',textDecoration:'line-through'}}>{p.original.toLocaleString()}원</span>
          <span style={{fontSize:'11px',fontWeight:500,color:'#C04B4B'}}>{dc}%</span>
        </>}
      </div>
      <div style={{fontSize:'10px',color:'#A07A4E'}}>W {p.points}P 적립</div>
    </a>
  )
}

export default function Home() {
  const [bannerIdx, setBannerIdx] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const [toast, setToast] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('clyq_user')
    if (saved) { const u = JSON.parse(saved); setIsLoggedIn(true); setUserName(u.name) }
  }, [])

  useEffect(() => {
    const t = setInterval(() => setBannerIdx(i => (i + 1) % banners.length), 5500)
    return () => clearInterval(t)
  }, [])

  const b = banners[bannerIdx]
  const displayProducts = isLoggedIn ? aiProducts : bestProducts

  return (
    <main>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=Noto+Sans+KR:wght@300;400;500&display=swap');

        .hero { position:relative; height:580px; overflow:hidden; background:#EDE8E0; }
        .hero-img { position:absolute; right:0; top:0; width:58%; height:100%; object-fit:cover; opacity:0.6; }
        .hero-inner { position:relative; z-index:2; padding:0 80px; height:100%; display:flex; align-items:center; }
        .hero-eyebrow { font-size:9px; letter-spacing:4px; color:#3D6A4F; margin-bottom:18px; display:flex; align-items:center; gap:12px; }
        .hero-title { font-family:'Cormorant Garamond',Georgia,serif; font-size:56px; font-weight:300; color:#1C1C1C; line-height:1.12; margin-bottom:18px; white-space:pre-line; }
        .hero-desc { font-size:12.5px; color:#6A6460; font-weight:300; line-height:1.9; margin-bottom:32px; white-space:pre-line; }
        .hero-btns { display:flex; gap:12px; flex-wrap:wrap; }
        .hero-btn-p { padding:13px 28px; background:#3D6A4F; color:#fff; font-size:12px; font-weight:400; text-decoration:none; letter-spacing:0.5px; transition:background .2s; }
        .hero-btn-p:hover { background:#2F5540; }
        .hero-btn-s { padding:12px 22px; border:1px solid #6A6460; color:#6A6460; font-size:12px; text-decoration:none; transition:all .2s; }
        .hero-btn-s:hover { border-color:#1C1C1C; color:#1C1C1C; }

        .cat-text-strip { display:flex; overflow-x:auto; scrollbar-width:none; border-bottom:1px solid #E4DFDA; background:#fff; }
        .cat-text-strip::-webkit-scrollbar { display:none; }
        .cat-tab { flex-shrink:0; padding:0 18px; height:42px; display:flex; align-items:center; font-size:12px; color:#A09B97; text-decoration:none; white-space:nowrap; border-bottom:2px solid transparent; transition:all .15s; font-weight:300; letter-spacing:0.3px; }
        .cat-tab:hover { color:#1C1C1C; }
        .cat-tab.fit { background:#3D6A4F; color:#fff !important; font-weight:400; border-bottom:2px solid #3D6A4F; }
        .cat-tab.sale { color:#C04B4B !important; }

        .ai-rec-bar { padding:11px 40px; background:#F7F4F0; border-bottom:1px solid #E4DFDA; display:flex; align-items:center; gap:12px; overflow-x:auto; scrollbar-width:none; }
        .ai-rec-bar::-webkit-scrollbar { display:none; }
        .ai-rec-label { font-size:9px; letter-spacing:2.5px; color:#A09B97; white-space:nowrap; flex-shrink:0; }
        .ai-rec-div { width:1px; height:12px; background:#E4DFDA; flex-shrink:0; }
        .ai-rec-chip { font-size:11px; color:#3A3835; background:#fff; border:1px solid #E4DFDA; padding:5px 13px; white-space:nowrap; flex-shrink:0; text-decoration:none; transition:border-color .15s; }
        .ai-rec-chip:hover { border-color:#A09B97; }
        .ai-rec-more { font-size:11px; color:#3D6A4F; white-space:nowrap; flex-shrink:0; text-decoration:none; margin-left:4px; }

        .sec-pad { padding:52px 40px; }
        .sec-row { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:32px; }
        .sec-label { font-size:9px; letter-spacing:3px; color:#A09B97; margin-bottom:7px; }
        .sec-title { font-family:'Cormorant Garamond',Georgia,serif; font-size:26px; font-weight:400; color:#1C1C1C; }
        .sec-more { font-size:11px; color:#A09B97; text-decoration:none; }
        .sec-more:hover { color:#1C1C1C; }

        .grid-5 { display:grid; grid-template-columns:repeat(5,1fr); gap:28px 16px; }
        .grid-6 { display:grid; grid-template-columns:repeat(6,1fr); gap:28px 16px; }

        .fit-strip { background:#1C1C1C; padding:16px 40px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; }
        .fit-strip-right { display:flex; gap:36px; align-items:center; flex-wrap:wrap; }

        .ed-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; padding:0 40px 52px; }
        .ed-card { position:relative; overflow:hidden; display:block; text-decoration:none; aspect-ratio:4/5; }
        .ed-img { width:100%; height:100%; object-fit:cover; display:block; transition:transform 0.5s ease; }
        .ed-card:hover .ed-img { transform:scale(1.03); }

        .comm-grid { display:grid; grid-template-columns:1fr 1fr; gap:40px; padding:0 40px 52px; }
        .cm-post { display:flex; gap:14px; padding:14px 0; border-bottom:1px solid #F0EBE4; text-decoration:none; color:inherit; }
        .cm-post:last-child { border-bottom:none; }

        .withy-box { margin:0 40px 52px; border:1px solid #E4DFDA; padding:28px 32px; display:flex; align-items:center; justify-content:space-between; gap:24px; flex-wrap:wrap; background:#fff; }

        .footer-grid { display:grid; grid-template-columns:2fr 1fr 1fr 1fr 1fr; gap:40px; margin-bottom:48px; padding-bottom:48px; border-bottom:1px solid rgba(255,255,255,0.08); }

        @media (max-width:768px) {
          .hero { height:auto; min-height:440px; }
          .hero-img { width:100%; opacity:0.2; }
          .hero-inner { padding:48px 20px; align-items:flex-start; }
          .hero-title { font-size:32px; }
          .hero-desc { font-size:12px; margin-bottom:20px; }
          .hero-btns { flex-direction:column; gap:8px; }
          .ai-rec-bar { padding:10px 16px; }
          .grid-5 { grid-template-columns:repeat(2,1fr); gap:20px 10px; }
          .grid-6 { grid-template-columns:repeat(2,1fr); gap:20px 10px; }
          .sec-pad { padding:32px 16px; }
          .fit-strip { padding:14px 16px; }
          .fit-strip-right { gap:16px; }
          .ed-grid { grid-template-columns:1fr; padding:0 16px 36px; }
          .comm-grid { grid-template-columns:1fr; padding:0 16px 36px; gap:0; }
          .withy-box { margin:0 16px 36px; padding:20px; }
          .footer-grid { grid-template-columns:1fr 1fr; gap:24px; }
        }
        @media (max-width:1024px) and (min-width:769px) {
          .grid-5 { grid-template-columns:repeat(3,1fr); }
          .grid-6 { grid-template-columns:repeat(3,1fr); }
          .hero-inner { padding:0 48px; }
          .hero-title { font-size:46px; }
          .footer-grid { grid-template-columns:1fr 1fr 1fr; }
        }
      `}</style>

      <Navbar />

      {/* ── 히어로 ── */}
      <div className="hero">
        <img className="hero-img" src={b.image} alt="banner"/>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(90deg,rgba(237,232,224,0.97) 42%,rgba(237,232,224,0.55) 68%,transparent 100%)',zIndex:1}}/>
        <div className="hero-inner">
          <div style={{maxWidth:'440px'}}>
            <div className="hero-eyebrow">
              <span style={{display:'inline-block',width:'22px',height:'1px',background:'#3D6A4F'}}/>
              {b.tag}
            </div>
            <h1 className="hero-title">{b.title}</h1>
            <p className="hero-desc">{b.sub}</p>
            <div className="hero-btns">
              <a href={b.ctaLink} className="hero-btn-p">{b.cta}</a>
              <a href="/products/new" className="hero-btn-s">전체 상품 보기</a>
            </div>
          </div>
        </div>
        <div style={{position:'absolute',bottom:'28px',left:'80px',display:'flex',gap:'8px',zIndex:3}}>
          {banners.map((_,i) => (
            <div key={i} onClick={() => setBannerIdx(i)}
              style={{width:bannerIdx===i?'28px':'6px',height:'2px',background:bannerIdx===i?'#1C1C1C':'rgba(28,24,20,0.2)',cursor:'pointer',transition:'all 0.35s'}}/>
          ))}
        </div>
        <div style={{position:'absolute',bottom:'24px',right:'80px',fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:'11px',color:'#A09B97',zIndex:3,letterSpacing:'2px'}}>
          {String(bannerIdx+1).padStart(2,'0')} / {String(banners.length).padStart(2,'0')}
        </div>
      </div>

      {/* ── 카테고리 텍스트 탭 ── */}
      <div className="cat-text-strip">
        {[
          { label:'피팅박스관', href:'/fitting', fit:true },
          { label:'신상품', href:'/products/new' },
          { label:'베스트', href:'/' },
          { label:'아우터', href:'/' },
          { label:'원피스·세트', href:'/' },
          { label:'상의', href:'/' },
          { label:'하의', href:'/' },
          { label:'가방', href:'/' },
          { label:'슈즈', href:'/' },
          { label:'주얼리', href:'/' },
          { label:'순환유통', href:'/' },
          { label:'커뮤니티', href:'/community' },
          { label:'SALE', href:'/', sale:true },
        ].map(item => (
          <a key={item.label} href={item.href}
            className={'cat-tab' + (item.fit?' fit':'') + (item.sale?' sale':'')}>
            {item.label}
          </a>
        ))}
      </div>

      {/* ── AI 추천 슬림 바 ── */}
      <div className="ai-rec-bar">
        <span className="ai-rec-label">{isLoggedIn ? 'FOR YOU' : 'AI PICK'}</span>
        <div className="ai-rec-div"/>
        {(isLoggedIn ? aiProducts : bestProducts.slice(0,5)).map(p => (
          <a key={p.id} href={'/products/'+p.id} className="ai-rec-chip">
            {p.brand} · {p.name.length > 14 ? p.name.slice(0,14)+'…' : p.name}
          </a>
        ))}
        <a href={isLoggedIn ? '/mypage' : '/signup'} className="ai-rec-more">
          {isLoggedIn ? '전체 추천 보기 →' : '취향 분석 시작 →'}
        </a>
      </div>

      {/* ── 베스트 / AI 추천 ── */}
      <section className="sec-pad">
        <div className="sec-row">
          <div>
            <div className="sec-label">{isLoggedIn ? 'AI CURATION' : 'WEEKLY BEST'}</div>
            <div className="sec-title">{isLoggedIn ? `${userName}님을 위한 추천` : '이번 주 베스트'}</div>
          </div>
          <a href="/products/new" className="sec-more">전체보기 ›</a>
        </div>
        <div className="grid-5">
          {displayProducts.map(p => <ProductCard key={p.id} p={p}/>)}
        </div>
      </section>

      {/* ── 피팅박스 서비스 스트립 ── */}
      <div className="fit-strip">
        <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
          <span style={{background:'#3D6A4F',color:'#fff',fontSize:'9px',fontWeight:500,padding:'5px 10px',letterSpacing:'1.5px'}}>FITTING BOX</span>
          <span style={{fontSize:'13px',color:'rgba(255,255,255,0.7)',fontWeight:300}}>
            <strong style={{fontWeight:500,color:'#fff'}}>집에서 먼저 입어보고</strong>, 마음에 드는 옷만 구매하세요
          </span>
        </div>
        <div className="fit-strip-right">
          {[{num:'0원',label:'피팅 비용'},{num:'24H',label:'전국 배송'},{num:'3일',label:'피팅 기간'},{num:'무료',label:'반납'}].map(s => (
            <div key={s.label} style={{textAlign:'center'}}>
              <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:'20px',color:'#fff',fontWeight:300}}>{s.num}</div>
              <div style={{fontSize:'9px',color:'rgba(255,255,255,0.35)',marginTop:'2px',letterSpacing:'0.5px'}}>{s.label}</div>
            </div>
          ))}
          <a href="/fitting"
            style={{fontSize:'11px',color:'rgba(255,255,255,0.6)',border:'1px solid rgba(255,255,255,0.2)',padding:'9px 18px',textDecoration:'none',transition:'all .2s'}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.5)';e.currentTarget.style.color='#fff'}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.2)';e.currentTarget.style.color='rgba(255,255,255,0.6)'}}>
            신청하기 →
          </a>
        </div>
      </div>

      {/* ── 신상품 ── */}
      <section className="sec-pad" style={{background:'#F7F4F0'}}>
        <div className="sec-row">
          <div>
            <div className="sec-label">NEW ARRIVALS</div>
            <div className="sec-title">신상품</div>
          </div>
          <a href="/products/new" className="sec-more">전체보기 ›</a>
        </div>
        <div className="grid-6">
          {newProducts.map(p => <ProductCard key={p.id} p={p}/>)}
        </div>
      </section>

      {/* ── 기획전 ── */}
      <div className="ed-grid">
        {[
          {title:'F/W 코트 피팅박스', sub:'이번 시즌 베스트 코트 7선', badge:'FITTING', image:'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=700&auto=format&fit=crop', link:'/fitting'},
          {title:'출근룩 스타일 가이드', sub:'데이터로 본 오피스 베스트', badge:'STYLING', image:'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=700&auto=format&fit=crop', link:'/magazine'},
          {title:'순환유통 특별전', sub:'피팅 후 반납 제품의 새 여정', badge:'ECO', image:'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=700&auto=format&fit=crop', link:'/fitting'},
        ].map((ed,i) => (
          <a key={i} href={ed.link} className="ed-card">
            <img className="ed-img" src={ed.image} alt={ed.title}/>
            <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 50%)'}}/>
            <div style={{position:'absolute',top:'16px',left:'16px',fontSize:'9px',letterSpacing:'2.5px',color:'rgba(255,255,255,0.65)',fontWeight:400}}>{ed.badge}</div>
            <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'20px'}}>
              <div style={{fontSize:'11px',color:'rgba(255,255,255,0.55)',marginBottom:'6px',fontWeight:300}}>{ed.sub}</div>
              <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:'18px',color:'#fff',fontWeight:300,lineHeight:1.3}}>{ed.title}</div>
            </div>
          </a>
        ))}
      </div>

      {/* ── 커뮤니티 + 매거진 ── */}
      <div className="comm-grid">
        <div>
          <div className="sec-row" style={{marginBottom:'16px'}}>
            <div>
              <div className="sec-label">COMMUNITY</div>
              <div className="sec-title">커뮤니티 인기글</div>
            </div>
            <a href="/community" className="sec-more">더보기 ›</a>
          </div>
          {communityPosts.map((post,i) => (
            <a key={i} href="/community" className="cm-post">
              {post.image
                ? <img src={post.image} alt={post.title} style={{width:'60px',height:'60px',objectFit:'cover',flexShrink:0}}/>
                : <div style={{width:'60px',height:'60px',flexShrink:0,background:'#F0EBE4',display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A09B97" strokeWidth="1.5">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                    </svg>
                  </div>
              }
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:'9px',color:'#3D6A4F',fontWeight:500,marginBottom:'5px',letterSpacing:'0.5px'}}>{post.tag}</div>
                <div style={{fontSize:'13px',color:'#1C1C1C',lineHeight:1.45,marginBottom:'6px',overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis',fontWeight:300}}>{post.title}</div>
                <div style={{fontSize:'11px',color:'#D4CFC9',display:'flex',gap:'12px'}}>
                  <span>{post.author}</span>
                  <span>좋아요 {post.likes}</span>
                  <span>댓글 {post.comments}</span>
                </div>
              </div>
            </a>
          ))}
          <a href="/community" style={{display:'block',marginTop:'14px',padding:'12px',border:'1px solid #E4DFDA',textAlign:'center',fontSize:'12px',color:'#6A6460',textDecoration:'none',fontWeight:300,letterSpacing:'0.3px'}}>
            피팅 후기 작성하기 — 위디 50P 적립
          </a>
        </div>

        <div>
          <div className="sec-row" style={{marginBottom:'16px'}}>
            <div>
              <div className="sec-label">MAGAZINE</div>
              <div className="sec-title">매거진 추천</div>
            </div>
            <a href="/magazine" className="sec-more">더보기 ›</a>
          </div>
          <a href="/magazine" style={{textDecoration:'none',color:'inherit',display:'block'}}>
            <div style={{position:'relative',height:'180px',overflow:'hidden',background:'#EDE8E0',marginBottom:'14px'}}>
              <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=700&auto=format&fit=crop" alt="매거진"
                style={{width:'100%',height:'100%',objectFit:'cover',opacity:0.7,display:'block'}}/>
              <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(28,24,20,0.7) 0%,transparent 50%)'}}/>
              <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'16px'}}>
                <div style={{fontSize:'9px',letterSpacing:'2px',color:'#C49A6C',fontWeight:500,marginBottom:'5px'}}>TREND</div>
                <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:'16px',color:'#fff',fontWeight:300,lineHeight:1.4}}>2026 F/W 키 트렌드: 오버사이즈의 귀환</div>
              </div>
            </div>
          </a>
          {[
            {title:'선피팅이 바꾸는 패션 소비 방식', tag:'TREND', date:'2026.04.28'},
            {title:'MARCIA 2026 F/W 컬렉션 프리뷰', tag:'BRAND', date:'2026.04.25'},
            {title:'40대 여성이 가장 많이 선택한 스타일', tag:'STYLING', date:'2026.04.20'},
          ].map((art,i) => (
            <a key={i} href="/magazine"
              style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',padding:'11px 0',borderBottom:'1px solid #F0EBE4',textDecoration:'none',color:'inherit'}}>
              <div style={{flex:1,paddingRight:'10px'}}>
                <div style={{fontSize:'9px',color:'#3D6A4F',fontWeight:500,marginBottom:'3px',letterSpacing:'0.5px'}}>{art.tag}</div>
                <div style={{fontSize:'12px',color:'#3A3835',lineHeight:1.45,fontWeight:300}}>{art.title}</div>
              </div>
              <div style={{fontSize:'10px',color:'#D4CFC9',flexShrink:0}}>{art.date}</div>
            </a>
          ))}
        </div>
      </div>

      {/* ── 위디 포인트 ── */}
      <div className="withy-box">
        <div>
          <div className="sec-label">WITHY POINT</div>
          <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:'22px',fontWeight:400,color:'#1C1C1C',marginBottom:'8px'}}>위디(Withy) 포인트</div>
          <div style={{fontSize:'12px',color:'#6A6460',fontWeight:300,lineHeight:1.8}}>피팅하고 구매할 때마다 쌓이는 나만의 패션 포인트.<br/>커뮤니티 활동으로도 모을 수 있어요.</div>
        </div>
        <div style={{display:'flex',gap:'32px',alignItems:'center',flexWrap:'wrap'}}>
          {[{num:'+50P',label:'피팅 이용'},{num:'+30P',label:'글 작성'},{num:'+10P',label:'댓글'}].map(s => (
            <div key={s.label} style={{textAlign:'center'}}>
              <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:'24px',color:'#A07A4E',fontWeight:300}}>{s.num}</div>
              <div style={{fontSize:'10px',color:'#A09B97',marginTop:'3px'}}>{s.label}</div>
            </div>
          ))}
          <a href="/withy" style={{padding:'12px 22px',background:'#1C1C1C',color:'#fff',fontSize:'12px',fontWeight:400,textDecoration:'none',letterSpacing:'0.3px'}}>위디 알아보기</a>
        </div>
      </div>

      {/* ── 파트너 브랜드 ── */}
      <div style={{padding:'32px 40px',borderTop:'1px solid #E4DFDA',borderBottom:'1px solid #E4DFDA'}}>
        <div style={{fontSize:'9px',letterSpacing:'3px',color:'#A09B97',textAlign:'center',marginBottom:'22px'}}>CLYQ PARTNER BRANDS</div>
        <div style={{display:'flex',gap:'32px',alignItems:'center',justifyContent:'center',flexWrap:'wrap'}}>
          {['MARCIA','MATIN KIM','EENK','D.POUND','ANOTHER A','EIGHT','ANDERSSONBELL','ADER ERROR'].map(br => (
            <div key={br}
              style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:'13px',fontWeight:300,color:'#A09B97',letterSpacing:'2px',cursor:'pointer',transition:'color 0.2s'}}
              onMouseEnter={e=>(e.currentTarget.style.color='#1C1C1C')}
              onMouseLeave={e=>(e.currentTarget.style.color='#A09B97')}>
              {br}
            </div>
          ))}
        </div>
      </div>

      {/* ── 푸터 ── */}
      <footer style={{background:'#1C1C1C',padding:'52px 40px 28px'}}>
        <div className="footer-grid">
          <div>
            <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:'22px',color:'#fff',letterSpacing:'4px',marginBottom:'14px',fontWeight:400}}>CLYQ</div>
            <div style={{fontSize:'12px',color:'rgba(255,255,255,0.3)',lineHeight:2,fontWeight:300}}>
              Personalized Fashion Experience Universe<br/>
              AI가 취향을 읽고, 집에서 먼저 입어보고,<br/>확실한 것만 구매하는 패션 쇼핑의 기준
            </div>
          </div>
          {[
            {title:'쇼핑', links:[{t:'신상품',h:'/products/new'},{t:'베스트',h:'/'},{t:'피팅박스관',h:'/fitting'},{t:'SALE',h:'/'},{t:'순환유통',h:'/'}]},
            {title:'서비스', links:[{t:'피팅 이용 안내',h:'/about'},{t:'Withy 포인트',h:'/withy'},{t:'반납 방법',h:'/about'},{t:'AI 취향 분석',h:'/mypage'}]},
            {title:'커뮤니티', links:[{t:'피팅 후기',h:'/community'},{t:'스타일 공유',h:'/community'},{t:'매거진',h:'/magazine'},{t:'브랜드 이야기',h:'/community'}]},
            {title:'고객센터', links:[{t:'1:1 문의',h:'/'},{t:'자주 묻는 질문',h:'/'},{t:'배송 조회',h:'/'},{t:'회사 소개',h:'/about'}]},
          ].map(col => (
            <div key={col.title}>
              <div style={{fontSize:'10px',fontWeight:400,color:'rgba(255,255,255,0.35)',letterSpacing:'2px',marginBottom:'16px'}}>{col.title}</div>
              <div style={{display:'flex',flexDirection:'column',gap:'11px'}}>
                {col.links.map(l => (
                  <a key={l.t} href={l.h}
                    style={{fontSize:'12px',color:'rgba(255,255,255,0.25)',textDecoration:'none',fontWeight:300,transition:'color .15s'}}
                    onMouseEnter={e=>(e.currentTarget.style.color='rgba(255,255,255,0.65)')}
                    onMouseLeave={e=>(e.currentTarget.style.color='rgba(255,255,255,0.25)')}>
                    {l.t}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{display:'flex',justifyContent:'space-between',fontSize:'10px',color:'rgba(255,255,255,0.18)',flexWrap:'wrap',gap:'8px'}}>
          <span>© 2026 CLYQ Inc. exyai company. 통신판매업신고: 2026-서울강남-0000 대표: 학선</span>
          <span>사업자등록번호: 000-00-00000</span>
        </div>
      </footer>

      <div style={{
        position:'fixed', bottom:'24px', left:'50%',
        transform: toast ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(60px)',
        background:'#1C1C1C', color:'#fff', padding:'12px 20px',
        fontSize:'13px', zIndex:2000, transition:'transform 0.3s',
        whiteSpace:'nowrap', pointerEvents:'none',
      }}>
        {toast}
      </div>
    </main>
  )
}
