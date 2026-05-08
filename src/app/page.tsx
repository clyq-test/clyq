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
  { id:1, brand:'MARCIA', name:'오버핏 캐시미어 울 코트', price:428000, match:97, reason:'선호 스타일과 97% 일치', image:'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&auto=format&fit=crop', fit:true },
  { id:2, brand:'EENK', name:'셔링 미디 스커트', price:148000, match:94, reason:'즐겨 보는 카테고리', image:'https://images.unsplash.com/photo-1583496661160-fb5218e5b8a9?w=400&auto=format&fit=crop', fit:true },
  { id:5, brand:'ANDERSSONBELL', name:'테일러드 수트 재킷', price:318000, match:91, reason:'출근룩 취향과 일치', image:'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&auto=format&fit=crop', fit:true },
  { id:7, brand:'D.POUND', name:'라운드넥 실크 블라우스', price:158000, match:89, reason:'선호 컬러 계열', image:'https://images.unsplash.com/photo-1594938298603-c8148f4851b8?w=400&auto=format&fit=crop', fit:true },
  { id:12, brand:'EENK', name:'오프숄더 리본 블라우스', price:168000, match:86, reason:'페미닌 스타일 매칭', image:'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&auto=format&fit=crop', fit:true },
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
      <div style={{position:'relative',aspectRatio:'3/4',background:'#f5f5f5',overflow:'hidden',marginBottom:'10px'}}>
        <img src={p.image} alt={p.name}
          style={{width:'100%',height:'100%',objectFit:'cover',transition:'transform 0.45s',transform:hovered?'scale(1.05)':'scale(1)'}}/>
        <div style={{position:'absolute',top:'10px',left:'10px',display:'flex',flexDirection:'column',gap:'4px'}}>
          {p.fit && <span style={{background:'#C94E1A',color:'#fff',fontSize:'9px',fontWeight:700,padding:'3px 7px'}}>피팅박스</span>}
          {p.rank && p.rank <= 3 && <span style={{background:'#111',color:'#fff',fontSize:'9px',fontWeight:700,padding:'3px 7px'}}>{p.rank===1?'🥇':p.rank===2?'🥈':'🥉'} TOP{p.rank}</span>}
        </div>
        <button style={{position:'absolute',top:'10px',right:'10px',width:'30px',height:'30px',borderRadius:'50%',background:'rgba(255,255,255,0.92)',border:'none',cursor:'pointer',fontSize:'13px'}}
          onClick={e => e.preventDefault()}>🤍</button>
        {hovered && (
          <div style={{position:'absolute',bottom:0,left:0,right:0,display:'flex'}}>
            <button style={{flex:1,padding:'11px',background:'#C94E1A',color:'#fff',fontSize:'11px',fontWeight:500,border:'none',cursor:'pointer'}} onClick={e => e.preventDefault()}>📦 피팅박스</button>
            <button style={{width:'44px',padding:'11px',background:'#111',color:'#fff',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}} onClick={e => e.preventDefault()}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            </button>
          </div>
        )}
      </div>
      <div style={{fontSize:'10px',letterSpacing:'1.5px',color:'#999',marginBottom:'4px'}}>{p.brand}</div>
      <div style={{fontSize:'13px',color:'#333',marginBottom:'5px',fontWeight:300,overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis'}}>{p.name}</div>
      <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'3px'}}>
        <span style={{fontSize:'14px',fontWeight:500}}>{p.price.toLocaleString()}원</span>
        {dc > 0 && <>
          <span style={{fontSize:'11px',color:'#ccc',textDecoration:'line-through'}}>{p.original.toLocaleString()}원</span>
          <span style={{fontSize:'11px',fontWeight:700,color:'#e74c3c'}}>{dc}%</span>
        </>}
      </div>
      <div style={{fontSize:'10px',color:'#B08D57'}}>W {p.points}P 적립</div>
    </a>
  )
}

export default function Home() {
  const [bannerIdx, setBannerIdx] = useState(0)
  const [aiPanelOpen, setAiPanelOpen] = useState(false)
  const [aiPanelVisible, setAiPanelVisible] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const [savedStyle, setSavedStyle] = useState(null)
  const [toast, setToast] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('clyq_user')
    if (saved) {
      const u = JSON.parse(saved)
      setIsLoggedIn(true)
      setUserName(u.name)
      setTimeout(() => {
        setAiPanelVisible(true)
        setTimeout(() => setAiPanelOpen(true), 200)
      }, 1500)
    }
    const style = localStorage.getItem('clyq_style')
    if (style) setSavedStyle(JSON.parse(style))
  }, [])

  useEffect(() => {
    const t = setInterval(() => setBannerIdx(i => (i + 1) % banners.length), 5000)
    return () => clearInterval(t)
  }, [])

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(''), 2600) }

  const b = banners[bannerIdx]

  return (
    <main>
      <style>{`
        .hero { position:relative; height:580px; overflow:hidden; background:#1a1814; }
        .hero-img { position:absolute; right:0; top:0; width:60%; height:100%; object-fit:cover; opacity:0.38; }
        .hero-inner { position:relative; z-index:1; padding:0 80px; height:100%; display:flex; align-items:center; }
        .hero-title { font-family:Georgia,serif; font-size:54px; font-weight:300; color:#fff; line-height:1.15; margin-bottom:16px; white-space:pre-line; }
        .hero-desc { font-size:13px; color:rgba(255,255,255,0.5); font-weight:300; line-height:1.8; margin-bottom:32px; white-space:pre-line; }
        .hero-btns { display:flex; gap:12px; }
        .quick-menu { padding:24px 40px; border-bottom:1px solid #e8e8e8; display:flex; gap:0; overflow-x:auto; scrollbar-width:none; }
        .quick-menu::-webkit-scrollbar { display:none; }
        .grid-5 { display:grid; grid-template-columns:repeat(5,1fr); gap:24px 16px; }
        .grid-6 { display:grid; grid-template-columns:repeat(6,1fr); gap:24px 16px; }
        .sec-pad { padding:52px 40px; }
        .sec-row { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:28px; }
        .fit-strip { background:linear-gradient(90deg,#1a1814,#2c2218,#1a1814); padding:16px 40px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; }
        .fit-strip-right { display:flex; gap:36px; align-items:center; flex-wrap:wrap; }
        .ed-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; padding:0 40px 52px; }
        .ed-card { position:relative; overflow:hidden; cursor:pointer; }
        .ed-img { width:100%; height:220px; object-fit:cover; display:block; transition:transform 0.45s; }
        .ed-card:hover .ed-img { transform:scale(1.04); }
        .comm-grid { display:grid; grid-template-columns:1fr 1fr; gap:32px; padding:0 40px 52px; }
        .cm-post { display:flex; gap:12px; padding:14px 0; border-bottom:1px solid #f5f5f5; cursor:pointer; }
        .cm-post:last-child { border-bottom:none; }
        .withy-banner { margin:0 40px 52px; background:#f5f5f5; border:1px solid #e8e8e8; padding:24px 32px; display:flex; align-items:center; justify-content:space-between; gap:24px; flex-wrap:wrap; }
        .withy-stats { display:flex; gap:28px; align-items:center; flex-wrap:wrap; }
        .footer-grid { display:grid; grid-template-columns:2fr 1fr 1fr 1fr 1fr; gap:40px; margin-bottom:48px; padding-bottom:48px; border-bottom:1px solid rgba(255,255,255,0.08); }
        .ai-panel-wrap { position:fixed; left:0; top:50%; transform:translateY(-50%); z-index:800; display:flex; align-items:center; transition:all 0.4s cubic-bezier(0.4,0,0.2,1); }
        .ai-panel-body { background:#fff; border:1px solid #e8e8e8; border-left:none; box-shadow:4px 0 24px rgba(0,0,0,.1); width:33vw; max-height:85vh; overflow-y:auto; scrollbar-width:none; }
        .ai-panel-body::-webkit-scrollbar { display:none; }
        .ai-tab-btn { background:#111; color:#fff; width:28px; writing-mode:vertical-rl; padding:16px 8px; font-size:11px; font-weight:500; letter-spacing:1px; cursor:pointer; border:none; font-family:inherit; transition:background 0.2s; display:flex; align-items:center; justify-content:center; }
        .ai-tab-btn:hover { background:#C94E1A; }
        .ai-prod { display:flex; gap:10px; padding:12px; border-bottom:1px solid #f0f0f0; cursor:pointer; transition:background 0.15s; text-decoration:none; color:inherit; }
        .ai-prod:hover { background:#fafafa; }
        .ai-prod:last-child { border-bottom:none; }
        @media (max-width:768px) {
          .hero { height:auto; min-height:420px; }
          .hero-img { width:100%; opacity:0.18; }
          .hero-inner { padding:48px 16px; align-items:flex-start; }
          .hero-title { font-size:30px; }
          .hero-desc { font-size:12px; margin-bottom:20px; }
          .hero-btns { flex-direction:column; gap:8px; }
          .quick-menu { padding:16px; }
          .grid-5 { grid-template-columns:repeat(2,1fr); gap:18px 12px; }
          .grid-6 { grid-template-columns:repeat(2,1fr); gap:18px 12px; }
          .sec-pad { padding:36px 16px; }
          .fit-strip { padding:16px; }
          .fit-strip-right { gap:20px; }
          .ed-grid { grid-template-columns:1fr; padding:0 16px 40px; }
          .ed-img { height:200px; }
          .comm-grid { grid-template-columns:1fr; padding:0 16px 40px; gap:0; }
          .withy-banner { margin:0 16px 40px; padding:20px; }
          .footer-grid { grid-template-columns:1fr 1fr; gap:28px; }
          .ai-panel-wrap { top:auto; transform:none; bottom:80px; }
          .ai-panel-body { width:calc(100vw - 44px); max-width:85vw; }
        }
        @media (max-width:1024px) and (min-width:769px) {
          .grid-5 { grid-template-columns:repeat(3,1fr); }
          .grid-6 { grid-template-columns:repeat(3,1fr); }
          .hero-inner { padding:0 40px; }
          .hero-title { font-size:44px; }
          .footer-grid { grid-template-columns:1fr 1fr 1fr; }
        }
      `}</style>

      <Navbar />

      {/* AI 추천 패널 — 로그인 시 */}
      {aiPanelVisible && (
        <div className="ai-panel-wrap" style={{left: aiPanelOpen ? '0' : '-33vw'}}>
          <div className="ai-panel-body">
            <div style={{padding:'14px 14px 10px',background:'linear-gradient(90deg,#1a1814,#2d2318)',borderBottom:'1px solid rgba(255,255,255,0.08)'}}>
              <div style={{fontSize:'9px',letterSpacing:'2px',color:'rgba(255,255,255,0.45)',marginBottom:'4px'}}>AI CURATION</div>
              <div style={{fontSize:'13px',fontWeight:500,color:'#fff',marginBottom:'2px'}}>{userName}님을 위한 추천</div>
              {savedStyle && savedStyle.style && savedStyle.style.length > 0 && (
                <div style={{fontSize:'10px',color:'rgba(255,255,255,0.4)'}}>{savedStyle.style.slice(0,2).join(' · ')} 취향 분석 완료</div>
              )}
            </div>
            {aiProducts.map(p => (
              <a key={p.id} href={'/products/' + p.id} className="ai-prod">
                <img src={p.image} alt={p.name} style={{width:'52px',height:'64px',objectFit:'cover',flexShrink:0,background:'#f5f5f5'}}/>
                <div style={{flex:1,minWidth:0}}>
                  <span style={{display:'inline-block',fontSize:'10px',fontWeight:700,color:'#C94E1A',background:'#fff5f2',padding:'2px 6px',borderRadius:'10px',marginBottom:'3px'}}>일치도 {p.match}%</span>
                  <div style={{fontSize:'10px',letterSpacing:'1px',color:'#999',marginBottom:'2px'}}>{p.brand}</div>
                  <div style={{fontSize:'12px',color:'#111',fontWeight:400,marginBottom:'3px',overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis'}}>{p.name}</div>
                  <div style={{fontSize:'11px',color:'#999',fontWeight:300,marginBottom:'4px'}}>{p.reason}</div>
                  <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
                    <span style={{fontSize:'12px',fontWeight:500}}>{p.price.toLocaleString()}원</span>
                    {p.fit && <span style={{fontSize:'9px',background:'#C94E1A',color:'#fff',padding:'1px 5px',fontWeight:700}}>피팅가능</span>}
                  </div>
                </div>
              </a>
            ))}
            <div style={{padding:'12px 14px',borderTop:'1px solid #f0f0f0'}}>
              <a href="/mypage" style={{display:'block',textAlign:'center',padding:'10px',background:'#111',color:'#fff',fontSize:'12px',fontWeight:500,textDecoration:'none'}}>
                취향 분석 더보기 →
              </a>
            </div>
          </div>
          <button className="ai-tab-btn" onClick={() => setAiPanelOpen(!aiPanelOpen)}>
            {aiPanelOpen ? '◀ 닫기' : '▶ AI추천'}
          </button>
        </div>
      )}

      {/* 비로그인 AI 탭 */}
      {!isLoggedIn && (
        <div style={{position:'fixed',left:0,top:'50%',transform:'translateY(-50%)',zIndex:800}}>
          <button onClick={() => showToast('로그인 후 AI 맞춤 추천을 받아보세요')}
            style={{display:'flex',flexDirection:'column',alignItems:'center',background:'#111',color:'#fff',padding:'14px 8px',fontSize:'10px',fontWeight:500,border:'none',cursor:'pointer',fontFamily:'inherit',gap:'6px',writingMode:'vertical-rl'}}>
            ✦ AI 맞춤추천
          </button>
        </div>
      )}

      {/* 메인 배너 */}
      <div className="hero">
        <img className="hero-img" src={b.image} alt="banner"/>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(90deg,#1a1814 38%,rgba(26,24,20,0.5) 65%,transparent 100%)'}}/>
        <div className="hero-inner">
          <div>
            <div style={{fontSize:'10px',letterSpacing:'4px',color:'#C94E1A',marginBottom:'18px',display:'flex',alignItems:'center',gap:'10px'}}>
              <span style={{display:'inline-block',width:'20px',height:'1px',background:'#C94E1A'}}/>
              {b.tag}
            </div>
            <h1 className="hero-title">{b.title}</h1>
            <p className="hero-desc">{b.sub}</p>
            <div className="hero-btns">
              <a href={b.ctaLink} style={{padding:'13px 28px',background:'#C94E1A',color:'#fff',fontSize:'13px',fontWeight:500,textDecoration:'none',letterSpacing:'0.5px'}}>{b.cta}</a>
              <a href="/products/new" style={{padding:'12px 24px',border:'1px solid rgba(255,255,255,0.3)',color:'rgba(255,255,255,0.7)',fontSize:'13px',textDecoration:'none'}}>전체 상품 보기</a>
            </div>
          </div>
        </div>
        <div style={{position:'absolute',bottom:'24px',left:'50%',transform:'translateX(-50%)',display:'flex',gap:'6px',zIndex:10}}>
          {banners.map((_,i) => (
            <div key={i} onClick={() => setBannerIdx(i)}
              style={{width:bannerIdx===i?'24px':'6px',height:'6px',borderRadius:'3px',background:bannerIdx===i?'#fff':'rgba(255,255,255,0.3)',cursor:'pointer',transition:'all 0.3s'}}/>
          ))}
        </div>
        <div style={{position:'absolute',bottom:'24px',right:'40px',fontSize:'11px',color:'rgba(255,255,255,0.4)',zIndex:10}}>
          {String(bannerIdx+1).padStart(2,'0')} / {String(banners.length).padStart(2,'0')}
        </div>
      </div>

      {/* 퀵메뉴 */}
      <div className="quick-menu">
        {[
          {icon:'📦',label:'피팅박스관',href:'/fitting'},
          {icon:'✨',label:'신상품',href:'/products/new'},
          {icon:'🔥',label:'베스트',href:'/products/new'},
          {icon:'🏷️',label:'세일',href:'/'},
          {icon:'🧥',label:'아우터',href:'/'},
          {icon:'👗',label:'원피스',href:'/'},
          {icon:'👖',label:'하의',href:'/'},
          {icon:'👚',label:'상의',href:'/'},
          {icon:'👜',label:'가방',href:'/'},
          {icon:'👠',label:'슈즈',href:'/'},
          {icon:'💍',label:'주얼리',href:'/'},
          {icon:'🌱',label:'순환유통',href:'/'},
          {icon:'💬',label:'커뮤니티',href:'/community'},
          {icon:'💛',label:'위디혜택',href:'/withy'},
        ].map(item => (
          <a key={item.label} href={item.href} style={{flex:'1',minWidth:'64px',display:'flex',flexDirection:'column',alignItems:'center',gap:'8px',textDecoration:'none',padding:'0 6px'}}>
            <div style={{width:'48px',height:'48px',borderRadius:'50%',border:'1px solid #e8e8e8',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px'}}>{item.icon}</div>
            <span style={{fontSize:'10px',color:'#666',whiteSpace:'nowrap'}}>{item.label}</span>
          </a>
        ))}
      </div>

      {/* 피팅박스 스트립 */}
      <div className="fit-strip">
        <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
          <span style={{background:'#C94E1A',color:'#fff',fontSize:'10px',fontWeight:700,padding:'5px 10px',letterSpacing:'1px'}}>피팅박스 서비스</span>
          <span style={{fontSize:'13px',color:'#fff',fontWeight:300}}>
            <strong style={{fontWeight:500}}>집에서 먼저 입어보고</strong>, 마음에 드는 옷만 구매하세요
          </span>
        </div>
        <div className="fit-strip-right">
          {[{num:'0원',label:'피팅 비용'},{num:'24H',label:'전국 배송'},{num:'3일',label:'피팅 기간'},{num:'무료',label:'반납'}].map(s => (
            <div key={s.label} style={{textAlign:'center'}}>
              <div style={{fontFamily:'Georgia,serif',fontSize:'20px',color:'#fff',fontWeight:300}}>{s.num}</div>
              <div style={{fontSize:'10px',color:'rgba(255,255,255,0.4)',marginTop:'2px'}}>{s.label}</div>
            </div>
          ))}
          <a href="/fitting" style={{padding:'9px 18px',border:'1px solid rgba(255,255,255,0.25)',color:'rgba(255,255,255,0.8)',fontSize:'12px',textDecoration:'none'}}>신청하기 →</a>
        </div>
      </div>

      {/* 베스트 상품 */}
      <section className="sec-pad">
        <div className="sec-row">
          <div>
            <div style={{fontSize:'10px',letterSpacing:'3px',color:'#999',marginBottom:'6px'}}>WEEKLY BEST</div>
            <div style={{fontSize:'22px',fontWeight:500}}>이번 주 베스트</div>
          </div>
          <a href="/products/new" style={{fontSize:'11px',color:'#666',textDecoration:'none'}}>전체보기 ›</a>
        </div>
        <div className="grid-5">
          {bestProducts.map(p => <ProductCard key={p.id} p={p}/>)}
        </div>
      </section>

      {/* AI 추천 인라인 배너 */}
      <div style={{margin:'0 40px',background:'linear-gradient(110deg,#1a1814,#2d2318)',padding:'28px 36px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'32px',flexWrap:'wrap'}}>
        <div>
          <div style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'10px',letterSpacing:'3px',color:'#C94E1A',fontWeight:600,marginBottom:'10px'}}>
            <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'#C94E1A'}}/>
            AI CURATION — {isLoggedIn ? userName + '님 맞춤 추천' : '취향 분석 기반 추천'}
          </div>
          <div style={{fontSize:'20px',fontWeight:300,color:'#fff',lineHeight:1.4,marginBottom:'8px'}}>
            AI가 분석한 <strong style={{fontWeight:500}}>오늘의 추천</strong>
          </div>
          <div style={{fontSize:'12px',color:'rgba(255,255,255,0.4)',fontWeight:300}}>
            {isLoggedIn ? '취향 데이터를 기반으로 지금 나에게 딱 맞는 제품을 골랐어요' : '5가지 질문으로 나만을 위한 피팅박스를 구성해드려요'}
          </div>
        </div>
        <div style={{display:'flex',gap:'10px',flexShrink:0}}>
          {(isLoggedIn ? aiProducts : bestProducts).slice(0,4).map(p => (
            <a key={p.id} href={'/products/' + p.id} style={{width:'90px',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.08)',overflow:'hidden',cursor:'pointer',flexShrink:0,textDecoration:'none',display:'block'}}>
              <img src={p.image} alt={p.name} style={{width:'100%',height:'110px',objectFit:'cover',display:'block'}}/>
              <div style={{padding:'7px'}}>
                <div style={{fontSize:'8px',letterSpacing:'1px',color:'rgba(255,255,255,0.35)',marginBottom:'2px'}}>{p.brand}</div>
                <div style={{fontSize:'10px',color:'rgba(255,255,255,0.7)',fontWeight:300}}>{p.name.slice(0,8)}...</div>
                {p.match && <div style={{fontSize:'9px',color:'#C94E1A',marginTop:'2px'}}>일치도 {p.match}%</div>}
              </div>
            </a>
          ))}
        </div>
        <a href={isLoggedIn ? '/mypage' : '/signup'}
          style={{padding:'12px 22px',background:'#C94E1A',color:'#fff',fontSize:'12px',fontWeight:500,textDecoration:'none',whiteSpace:'nowrap',flexShrink:0}}>
          {isLoggedIn ? 'AI 추천 더보기' : 'AI 취향 분석 시작'}
        </a>
      </div>

      {/* 신상품 */}
      <section className="sec-pad">
        <div className="sec-row">
          <div>
            <div style={{fontSize:'10px',letterSpacing:'3px',color:'#999',marginBottom:'6px'}}>NEW ARRIVALS</div>
            <div style={{fontSize:'22px',fontWeight:500}}>신상품</div>
          </div>
          <a href="/products/new" style={{fontSize:'11px',color:'#666',textDecoration:'none'}}>전체보기 ›</a>
        </div>
        <div className="grid-6">
          {newProducts.map(p => <ProductCard key={p.id} p={p}/>)}
        </div>
      </section>

      {/* 기획전 */}
      <div className="ed-grid">
        {[
          { title:'F/W 코트 피팅박스', sub:'이번 시즌 베스트 코트 7선', badge:'FITTING BOX', image:'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=700&auto=format&fit=crop', link:'/fitting' },
          { title:'출근룩 스타일 가이드', sub:'데이터로 본 40대 오피스룩', badge:'DATA PICK', image:'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=700&auto=format&fit=crop', link:'/magazine' },
          { title:'순환유통 특별전', sub:'피팅 후 반납 제품의 새 여정', badge:'ECO', image:'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=700&auto=format&fit=crop', link:'/fitting' },
        ].map((ed,i) => (
          <a key={i} href={ed.link} className="ed-card" style={{textDecoration:'none',display:'block'}}>
            <img className="ed-img" src={ed.image} alt={ed.title}/>
            <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,0.7) 0%,transparent 55%)'}}/>
            <span style={{position:'absolute',top:'12px',left:'12px',background:'#C94E1A',color:'#fff',fontSize:'9px',fontWeight:700,padding:'3px 8px',letterSpacing:'0.5px'}}>{ed.badge}</span>
            <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'18px',color:'#fff'}}>
              <div style={{fontSize:'11px',color:'rgba(255,255,255,0.7)',marginBottom:'5px',fontWeight:300}}>{ed.sub}</div>
              <div style={{fontSize:'16px',fontWeight:500,lineHeight:1.3}}>{ed.title}</div>
            </div>
          </a>
        ))}
      </div>

      {/* 커뮤니티 + 매거진 */}
      <div className="comm-grid">
        <div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:'16px'}}>
            <div>
              <div style={{fontSize:'10px',letterSpacing:'3px',color:'#999',marginBottom:'6px'}}>COMMUNITY</div>
              <div style={{fontSize:'20px',fontWeight:500}}>커뮤니티 인기글</div>
            </div>
            <a href="/community" style={{fontSize:'11px',color:'#666',textDecoration:'none'}}>더보기 ›</a>
          </div>
          {communityPosts.map((post,i) => (
            <a key={i} href="/community" style={{textDecoration:'none',color:'inherit'}}>
              <div className="cm-post">
                {post.image ? (
                  <img src={post.image} alt={post.title} style={{width:'56px',height:'56px',objectFit:'cover',flexShrink:0,background:'#f5f5f5'}}/>
                ) : (
                  <div style={{width:'56px',height:'56px',flexShrink:0,background:'#f5f5f5',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px'}}>💬</div>
                )}
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:'10px',color:'#C94E1A',fontWeight:600,marginBottom:'4px'}}>{post.tag}</div>
                  <div style={{fontSize:'13px',color:'#111',fontWeight:400,lineHeight:1.4,marginBottom:'6px',overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis'}}>{post.title}</div>
                  <div style={{fontSize:'11px',color:'#ccc',display:'flex',gap:'10px'}}>
                    <span>{post.author}</span>
                    <span>❤️ {post.likes}</span>
                    <span>💬 {post.comments}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
          <a href="/community" style={{display:'block',marginTop:'14px',padding:'11px',background:'#f5f5f5',textAlign:'center',fontSize:'12px',color:'#666',textDecoration:'none',fontWeight:500}}>
            ✍️ 피팅 후기 작성하기 — 위디 50P 적립
          </a>
        </div>
        <div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:'16px'}}>
            <div>
              <div style={{fontSize:'10px',letterSpacing:'3px',color:'#999',marginBottom:'6px'}}>MAGAZINE</div>
              <div style={{fontSize:'20px',fontWeight:500}}>매거진 추천</div>
            </div>
            <a href="/magazine" style={{fontSize:'11px',color:'#666',textDecoration:'none'}}>더보기 ›</a>
          </div>
          <a href="/magazine" style={{textDecoration:'none',color:'inherit',display:'block'}}>
            <div style={{position:'relative',height:'180px',overflow:'hidden',background:'#1a1814',marginBottom:'12px',cursor:'pointer'}}>
              <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=700&auto=format&fit=crop" alt="매거진" style={{width:'100%',height:'100%',objectFit:'cover',opacity:0.5,display:'block'}}/>
              <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',justifyContent:'flex-end',padding:'16px'}}>
                <div style={{fontSize:'9px',letterSpacing:'2px',color:'#C94E1A',fontWeight:700,marginBottom:'5px'}}>TREND</div>
                <div style={{fontFamily:'Georgia,serif',fontSize:'15px',color:'#fff',fontWeight:300,lineHeight:1.4}}>2026 F/W 키 트렌드: 오버사이즈의 귀환</div>
              </div>
            </div>
          </a>
          {[
            {title:'선피팅이 바꾸는 패션 소비 방식', tag:'TREND', date:'2026.04.28'},
            {title:'MARCIA 2026 F/W 컬렉션 프리뷰', tag:'BRAND', date:'2026.04.25'},
            {title:'40대 여성이 가장 많이 선택한 스타일', tag:'STYLING', date:'2026.04.20'},
          ].map((art,i) => (
            <a key={i} href="/magazine" style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',padding:'10px 0',borderBottom:'1px solid #f5f5f5',textDecoration:'none',color:'inherit'}}>
              <div style={{flex:1,minWidth:0,paddingRight:'10px'}}>
                <div style={{fontSize:'9px',color:'#C94E1A',fontWeight:700,marginBottom:'3px'}}>{art.tag}</div>
                <div style={{fontSize:'12px',color:'#333',lineHeight:1.4}}>{art.title}</div>
              </div>
              <div style={{fontSize:'10px',color:'#ccc',flexShrink:0}}>{art.date}</div>
            </a>
          ))}
        </div>
      </div>

      {/* Withy 배너 */}
      <div className="withy-banner">
        <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
          <span style={{fontSize:'28px'}}>💛</span>
          <div>
            <div style={{fontSize:'15px',fontWeight:500,marginBottom:'4px'}}>위디(Withy) 포인트</div>
            <div style={{fontSize:'12px',color:'#666',fontWeight:300,lineHeight:1.6}}>피팅하고 구매할 때마다 쌓이는 나만의 패션 포인트.<br/>커뮤니티 활동으로도 모을 수 있어요.</div>
          </div>
        </div>
        <div className="withy-stats">
          {[{num:'+50P',label:'피팅 이용'},{num:'+30P',label:'글 작성'},{num:'+10P',label:'댓글'}].map(s => (
            <div key={s.label} style={{textAlign:'center'}}>
              <div style={{fontFamily:'Georgia,serif',fontSize:'22px',color:'#B08D57',fontWeight:300}}>{s.num}</div>
              <div style={{fontSize:'10px',color:'#999',marginTop:'2px'}}>{s.label}</div>
            </div>
          ))}
          <a href="/withy" style={{padding:'11px 20px',background:'#111',color:'#fff',fontSize:'12px',fontWeight:500,textDecoration:'none'}}>위디 알아보기</a>
        </div>
      </div>

      {/* 파트너 브랜드 */}
      <div style={{padding:'36px 40px',borderTop:'1px solid #e8e8e8',borderBottom:'1px solid #e8e8e8'}}>
        <div style={{fontSize:'10px',letterSpacing:'3px',color:'#999',textAlign:'center',marginBottom:'24px'}}>CLYQ PARTNER BRANDS</div>
        <div style={{display:'flex',gap:'32px',alignItems:'center',justifyContent:'center',flexWrap:'wrap'}}>
          {['MARCIA','MATIN KIM','EENK','D.POUND','ANOTHER A','EIGHT','ANDERSSONBELL','ADER ERROR'].map(br => (
            <div key={br} style={{fontFamily:'Georgia,serif',fontSize:'15px',fontWeight:300,color:'#999',letterSpacing:'1.5px',cursor:'pointer',transition:'color 0.15s'}}
              onMouseEnter={e=>(e.currentTarget.style.color='#111')}
              onMouseLeave={e=>(e.currentTarget.style.color='#999')}>
              {br}
            </div>
          ))}
        </div>
      </div>

      {/* 푸터 */}
      <footer style={{background:'#111',padding:'56px 40px 32px'}}>
        <div className="footer-grid">
          <div>
            <div style={{fontFamily:'Georgia,serif',fontSize:'22px',color:'#fff',letterSpacing:'4px',marginBottom:'12px'}}>
              CLY<span style={{color:'#C94E1A'}}>Q</span>
            </div>
            <div style={{fontSize:'12px',color:'rgba(255,255,255,0.3)',lineHeight:1.9,fontWeight:300}}>
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
              <div style={{fontSize:'11px',fontWeight:500,color:'rgba(255,255,255,0.5)',letterSpacing:'1px',marginBottom:'14px'}}>{col.title}</div>
              <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                {col.links.map(l => (
                  <a key={l.t} href={l.h} style={{fontSize:'12px',color:'rgba(255,255,255,0.3)',textDecoration:'none',fontWeight:300}}
                    onMouseEnter={e=>(e.currentTarget.style.color='rgba(255,255,255,0.7)')}
                    onMouseLeave={e=>(e.currentTarget.style.color='rgba(255,255,255,0.3)')}>{l.t}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{display:'flex',justifyContent:'space-between',fontSize:'11px',color:'rgba(255,255,255,0.2)',flexWrap:'wrap',gap:'8px'}}>
          <span>© 2026 CLYQ Inc. exyai company. 통신판매업신고: 2026-서울강남-0000 대표: 학선</span>
          <span>사업자등록번호: 000-00-00000</span>
        </div>
      </footer>

      {/* 토스트 — inline style로 동적 처리 */}
      <div style={{
        position:'fixed', bottom:'24px', left:'50%',
        transform: toast ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(60px)',
        background:'#111', color:'#fff', padding:'12px 20px',
        fontSize:'13px', zIndex:2000, transition:'transform 0.3s',
        whiteSpace:'nowrap', pointerEvents:'none',
      }}>
        {toast}
      </div>
    </main>
  )
}
