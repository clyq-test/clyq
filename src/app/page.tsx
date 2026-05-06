'use client'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'

const banners = [
  {
    title: '입어보고\n확실한 것만\n담아가세요',
    sub: 'AI가 취향을 읽고 피팅 박스를 보내드려요.\n집에서 입어보고, 마음에 드는 것만 구매하면 됩니다.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop',
    tag: '2026 F/W NEW COLLECTION',
  },
  {
    title: 'AI가 분석한\n나만의\n스타일 추천',
    sub: '5가지 질문으로 AI가 취향을 분석하고\n딱 맞는 제품을 골라드려요.',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&auto=format&fit=crop',
    tag: 'AI CURATION SERVICE',
  },
  {
    title: '위디 포인트로\n더 알차게\n쇼핑하세요',
    sub: '피팅하고 구매할 때마다 위디가 쌓여요.\n다음 쇼핑이 더 저렴해집니다.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop',
    tag: 'WITHY POINT EVENT',
  },
]

const bestProducts = [
  { id:1, brand:'MARCIA', name:'오버핏 캐시미어 울 코트', price:428000, original:520000, points:428, image:'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&auto=format&fit=crop', fit:true },
  { id:2, brand:'EIGHT', name:'셔링 디테일 미디 드레스', price:198000, original:240000, points:198, image:'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&auto=format&fit=crop', fit:true },
  { id:3, brand:'MATIN KIM', name:'오버핏 레더 재킷', price:578000, original:578000, points:578, image:'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop', fit:true },
  { id:4, brand:'SORRY TOO MUCH LOVE', name:'메리노 울 니트 세트업', price:245000, original:245000, points:245, image:'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&auto=format&fit=crop', fit:false },
  { id:5, brand:'ANDERSSONBELL', name:'테일러드 수트 재킷', price:318000, original:318000, points:318, image:'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop', fit:true },
]

const newProducts = [
  { id:6, brand:'EENK', name:'셔링 미디 스커트', price:148000, original:148000, points:148, image:'https://images.unsplash.com/photo-1583496661160-fb5218e5b8a9?w=600&auto=format&fit=crop', fit:true },
  { id:7, brand:'D.POUND', name:'라운드넥 실크 블라우스', price:158000, original:198000, points:158, image:'https://images.unsplash.com/photo-1594938298603-c8148f4851b8?w=600&auto=format&fit=crop', fit:true },
  { id:8, brand:'ANOTHER A', name:'캐시미어 터틀넥 니트', price:218000, original:218000, points:218, image:'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&auto=format&fit=crop', fit:false },
  { id:9, brand:'ADER ERROR', name:'오버핏 후드 스웨트셔츠', price:198000, original:198000, points:198, image:'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&auto=format&fit=crop', fit:true },
  { id:10, brand:'MATIN KIM', name:'퀼팅 미니 숄더백', price:368000, original:368000, points:368, image:'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop', fit:false },
  { id:11, brand:'MARCIA', name:'울 플리츠 와이드 팬츠', price:248000, original:298000, points:248, image:'https://images.unsplash.com/photo-1594938298603-c8148f4851b8?w=600&auto=format&fit=crop', fit:true },
]

function ProductCard({ product }: { product: any }) {
  const [hovered, setHovered] = useState(false)
  const dc = product.original > product.price ? Math.round((1 - product.price / product.original) * 100) : 0

  return (
    <a href={'/products/' + product.id}
      style={{display:'block',textDecoration:'none',color:'inherit',cursor:'pointer'}}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{position:'relative',overflow:'hidden',marginBottom:'10px',aspectRatio:'3/4',background:'#f5f5f5'}}>
        <img src={product.image} alt={product.name}
          style={{width:'100%',height:'100%',objectFit:'cover',transition:'transform 0.4s',transform:hovered?'scale(1.05)':'scale(1)'}}/>
        {product.fit && (
          <div style={{position:'absolute',top:'10px',left:'10px',background:'#C94E1A',color:'#fff',fontSize:'9px',fontWeight:700,padding:'3px 7px',letterSpacing:'0.5px'}}>
            선피팅 가능
          </div>
        )}
        <button style={{position:'absolute',top:'10px',right:'10px',width:'30px',height:'30px',borderRadius:'50%',background:'rgba(255,255,255,0.9)',border:'none',cursor:'pointer',fontSize:'13px',display:'flex',alignItems:'center',justifyContent:'center'}}
          onClick={e => e.preventDefault()}>🤍</button>
        {hovered && (
          <button style={{position:'absolute',bottom:0,left:0,right:0,padding:'12px',background:'#C94E1A',color:'#fff',fontSize:'11px',fontWeight:500,border:'none',cursor:'pointer',letterSpacing:'0.5px'}}
            onClick={e => e.preventDefault()}>선피팅 신청하기</button>
        )}
      </div>
      <div style={{fontSize:'10px',letterSpacing:'1.5px',color:'#999',marginBottom:'4px'}}>{product.brand}</div>
      <div style={{fontSize:'13px',color:'#333',marginBottom:'6px',fontWeight:300,overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis'}}>{product.name}</div>
      <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
        <span style={{fontSize:'14px',fontWeight:500}}>{product.price.toLocaleString()}원</span>
        {dc > 0 && (
          <>
            <span style={{fontSize:'12px',color:'#ccc',textDecoration:'line-through'}}>{product.original.toLocaleString()}원</span>
            <span style={{fontSize:'12px',fontWeight:600,color:'#c0392b'}}>{dc}%</span>
          </>
        )}
      </div>
      <div style={{fontSize:'10px',color:'#B08D57',marginTop:'4px'}}>W {product.points}P 적립</div>
    </a>
  )
}

export default function Home() {
  const [bannerIdx, setBannerIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setBannerIdx(i => (i + 1) % banners.length), 5000)
    return () => clearInterval(t)
  }, [])

  const b = banners[bannerIdx]

  return (
    <main>
      <style>{`
        .hero-banner { position:relative; height:560px; overflow:hidden; background:#1a1814; }
        .hero-inner { position:relative; z-index:1; padding:0 80px; height:100%; display:flex; align-items:center; }
        .hero-title { font-family:Georgia,serif; font-size:52px; font-weight:300; color:#fff; line-height:1.15; margin-bottom:16px; white-space:pre-line; }
        .hero-desc { font-size:13px; color:rgba(255,255,255,0.5); font-weight:300; line-height:1.8; margin-bottom:32px; white-space:pre-line; }
        .hero-img { position:absolute; right:0; top:0; width:55%; height:100%; object-fit:cover; opacity:0.4; }
        .hero-btns { display:flex; gap:12px; }
        .fit-strip { background:linear-gradient(90deg,#1a1814,#2c2218,#1a1814); padding:18px 40px; display:flex; align-items:center; justify-content:space-between; }
        .fit-strip-left { display:flex; align-items:center; gap:16px; }
        .fit-strip-right { display:flex; gap:40px; align-items:center; }
        .quick-menu { padding:28px 40px; border-bottom:1px solid #e8e8e8; display:flex; gap:0; overflow-x:auto; }
        .best-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:24px 16px; }
        .new-grid { display:grid; grid-template-columns:repeat(6,1fr); gap:24px 16px; }
        .brand-feature { padding:0 40px 56px; display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
        .ai-banner { margin:0 40px; background:linear-gradient(110deg,#1a1814,#2d2318); padding:32px 40px; display:flex; align-items:center; justify-content:space-between; gap:40px; }
        .ai-cards { display:flex; gap:12px; }
        .withy-inline { margin:0 40px 56px; background:#f5f5f5; border:1px solid #e8e8e8; padding:28px 36px; display:flex; align-items:center; justify-content:space-between; gap:32px; }
        .withy-inline-right { display:flex; gap:32px; align-items:center; flex-shrink:0; }
        .footer-inner { display:grid; grid-template-columns:2fr 1fr 1fr 1fr 1fr; gap:40px; margin-bottom:48px; padding-bottom:48px; border-bottom:1px solid rgba(255,255,255,0.08); }
        .sec-pad { padding:56px 40px; }
        .brand-scroll-pad { padding:40px; border-top:1px solid #e8e8e8; border-bottom:1px solid #e8e8e8; }
        .footer-pad { background:#111; padding:56px 40px 32px; }

        @media (max-width: 768px) {
          .hero-banner { height:auto; min-height:400px; }
          .hero-inner { padding:48px 20px; align-items:flex-start; }
          .hero-title { font-size:32px; }
          .hero-desc { font-size:12px; margin-bottom:20px; }
          .hero-img { width:100%; opacity:0.2; }
          .hero-btns { flex-direction:column; gap:8px; }
          .fit-strip { flex-direction:column; gap:12px; padding:16px 20px; align-items:flex-start; }
          .fit-strip-right { gap:20px; flex-wrap:wrap; }
          .quick-menu { padding:16px 20px; }
          .best-grid { grid-template-columns:repeat(2,1fr); gap:20px 12px; }
          .new-grid { grid-template-columns:repeat(2,1fr); gap:20px 12px; }
          .brand-feature { grid-template-columns:repeat(2,1fr); padding:0 16px 40px; }
          .ai-banner { flex-direction:column; margin:0 16px; padding:20px; gap:16px; }
          .ai-cards { display:none; }
          .withy-inline { flex-direction:column; margin:0 16px 40px; padding:20px; }
          .withy-inline-right { flex-wrap:wrap; gap:20px; justify-content:center; }
          .footer-inner { grid-template-columns:1fr 1fr; gap:28px; }
          .sec-pad { padding:36px 16px; }
          .brand-scroll-pad { padding:28px 16px; }
          .footer-pad { padding:40px 16px 24px; }
        }

        @media (max-width: 1024px) and (min-width: 769px) {
          .best-grid { grid-template-columns:repeat(3,1fr); }
          .new-grid { grid-template-columns:repeat(3,1fr); }
          .brand-feature { grid-template-columns:repeat(2,1fr); }
          .footer-inner { grid-template-columns:1fr 1fr 1fr; }
        }
      `}</style>

      <Navbar />

      {/* 메인 배너 */}
      <div className="hero-banner">
        <img className="hero-img" src={b.image} alt="banner"/>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(90deg,#1a1814 40%,transparent 100%)'}}/>
        <div className="hero-inner">
          <div>
            <div style={{fontSize:'10px',letterSpacing:'4px',color:'#C94E1A',marginBottom:'16px',display:'flex',alignItems:'center',gap:'10px'}}>
              <span style={{display:'inline-block',width:'20px',height:'1px',background:'#C94E1A'}}/>
              {b.tag}
            </div>
            <h1 className="hero-title">{b.title}</h1>
            <p className="hero-desc">{b.sub}</p>
            <div className="hero-btns">
              <a href="/fitting" style={{padding:'13px 28px',background:'#fff',color:'#111',fontSize:'12px',fontWeight:500,letterSpacing:'1px',textDecoration:'none'}}>
                선피팅 신청하기
              </a>
              <a href="/products/new" style={{padding:'12px 24px',border:'1px solid rgba(255,255,255,0.3)',color:'rgba(255,255,255,0.7)',fontSize:'12px',textDecoration:'none'}}>
                전체 상품 보기
              </a>
            </div>
          </div>
        </div>
        <div style={{position:'absolute',bottom:'24px',left:'50%',transform:'translateX(-50%)',display:'flex',gap:'6px',zIndex:10}}>
          {banners.map((_, i) => (
            <div key={i} onClick={() => setBannerIdx(i)}
              style={{width:bannerIdx===i?'20px':'5px',height:'5px',borderRadius:'3px',background:bannerIdx===i?'#fff':'rgba(255,255,255,0.3)',cursor:'pointer',transition:'all 0.3s'}}/>
          ))}
        </div>
      </div>

      {/* 퀵메뉴 */}
      <div className="quick-menu">
        {[
          {icon:'📦',label:'선피팅관', href:'/fitting'},
          {icon:'✨',label:'신상품', href:'/products/new'},
          {icon:'🔥',label:'베스트', href:'/'},
          {icon:'🏷️',label:'세일', href:'/'},
          {icon:'🧥',label:'아우터', href:'/'},
          {icon:'👗',label:'원피스', href:'/'},
          {icon:'👖',label:'하의', href:'/'},
          {icon:'👜',label:'가방', href:'/'},
          {icon:'👠',label:'슈즈', href:'/'},
          {icon:'💍',label:'주얼리', href:'/'},
          {icon:'🌱',label:'순환유통', href:'/'},
          {icon:'💛',label:'위디혜택', href:'/withy'},
        ].map(item => (
          <a key={item.label} href={item.href} style={{flex:'1',minWidth:'64px',display:'flex',flexDirection:'column',alignItems:'center',gap:'8px',cursor:'pointer',padding:'0 8px',textDecoration:'none'}}>
            <div style={{width:'50px',height:'50px',borderRadius:'50%',border:'1px solid #e8e8e8',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px'}}>
              {item.icon}
            </div>
            <span style={{fontSize:'11px',color:'#666',whiteSpace:'nowrap'}}>{item.label}</span>
          </a>
        ))}
      </div>

      {/* 피팅 스트립 */}
      <div className="fit-strip">
        <div className="fit-strip-left">
          <span style={{background:'#C94E1A',color:'#fff',fontSize:'10px',fontWeight:700,padding:'5px 10px',letterSpacing:'1px'}}>선피팅 서비스</span>
          <span style={{fontSize:'13px',color:'#fff',fontWeight:300}}>
            <strong style={{fontWeight:500}}>집에서 먼저 입어보고</strong>, 마음에 드는 옷만 구매하세요
          </span>
        </div>
        <div className="fit-strip-right">
          {[{num:'24H',label:'전국 배송'},{num:'3일',label:'피팅 기간'},{num:'0원',label:'피팅 비용'}].map(s => (
            <div key={s.label} style={{textAlign:'center'}}>
              <div style={{fontFamily:'Georgia,serif',fontSize:'22px',color:'#fff',fontWeight:300}}>{s.num}</div>
              <div style={{fontSize:'10px',color:'rgba(255,255,255,0.4)',marginTop:'2px'}}>{s.label}</div>
            </div>
          ))}
          <a href="/fitting" style={{padding:'10px 20px',border:'1px solid rgba(255,255,255,0.25)',color:'rgba(255,255,255,0.8)',fontSize:'12px',textDecoration:'none'}}>신청하기 →</a>
        </div>
      </div>

      {/* 베스트 상품 */}
      <section className="sec-pad">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:'28px'}}>
          <div>
            <div style={{fontSize:'10px',letterSpacing:'3px',color:'#999',marginBottom:'6px'}}>WEEKLY BEST</div>
            <div style={{fontSize:'20px',fontWeight:500}}>이번 주 베스트</div>
          </div>
          <a href="/" style={{fontSize:'11px',color:'#666',textDecoration:'none'}}>전체보기 ›</a>
        </div>
        <div className="best-grid">
          {bestProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* AI 추천 배너 */}
      <div className="ai-banner">
        <div>
          <div style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'10px',letterSpacing:'3px',color:'#C94E1A',fontWeight:600,marginBottom:'10px'}}>
            <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'#C94E1A'}}/>
            AI CURATION
          </div>
          <div style={{fontSize:'22px',fontWeight:300,color:'#fff',lineHeight:1.4}}>
            AI가 분석한 <strong style={{fontWeight:500}}>오늘의 추천</strong>
          </div>
          <div style={{fontSize:'12px',color:'rgba(255,255,255,0.4)',marginTop:'8px',fontWeight:300}}>5가지 질문으로 나만을 위한 피팅 박스를 구성해드려요</div>
        </div>
        <div className="ai-cards">
          {bestProducts.slice(0,4).map(p => (
            <div key={p.id} style={{width:'110px',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.08)',overflow:'hidden',cursor:'pointer',flexShrink:0}}>
              <img src={p.image} alt={p.name} style={{width:'100%',height:'130px',objectFit:'cover'}}/>
              <div style={{padding:'8px'}}>
                <div style={{fontSize:'8px',letterSpacing:'1.5px',color:'rgba(255,255,255,0.35)',marginBottom:'2px'}}>{p.brand}</div>
                <div style={{fontSize:'10px',color:'rgba(255,255,255,0.7)',fontWeight:300}}>{p.name.slice(0,8)}...</div>
                <div style={{fontSize:'11px',color:'#fff',fontWeight:500,marginTop:'3px'}}>{p.price.toLocaleString()}</div>
                <div style={{fontSize:'9px',color:'#C94E1A',marginTop:'2px'}}>일치도 {90+p.id}%</div>
              </div>
            </div>
          ))}
        </div>
        <a href="/about#how" style={{padding:'12px 24px',background:'#C94E1A',color:'#fff',fontSize:'12px',fontWeight:500,textDecoration:'none',whiteSpace:'nowrap',flexShrink:0}}>AI 취향 분석 시작</a>
      </div>

      {/* 신상품 */}
      <section className="sec-pad">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:'28px'}}>
          <div>
            <div style={{fontSize:'10px',letterSpacing:'3px',color:'#999',marginBottom:'6px'}}>NEW ARRIVALS</div>
            <div style={{fontSize:'20px',fontWeight:500}}>신상품</div>
          </div>
          <a href="/products/new" style={{fontSize:'11px',color:'#666',textDecoration:'none'}}>전체보기 ›</a>
        </div>
        <div className="new-grid">
          {newProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* 브랜드 피처 */}
      <div className="brand-feature">
        {[
          {brand:'MARCIA',desc:'F/W 신상 전품목 선피팅 가능',image:'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&auto=format&fit=crop',badge:'피팅 가능'},
          {brand:'MATIN KIM',desc:'CLYQ 단독 피팅 컬렉션',image:'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop',badge:'EXCLUSIVE'},
          {brand:'순환유통',desc:'피팅 후 반납 제품의 새 여정',image:'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&auto=format&fit=crop',badge:'ESG'},
          {brand:'EENK',desc:'2026 S/S 프리뷰 입점',image:'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&auto=format&fit=crop',badge:'NEW'},
        ].map(item => (
          <div key={item.brand} style={{position:'relative',aspectRatio:'3/4',overflow:'hidden',cursor:'pointer'}}>
            <img src={item.image} alt={item.brand} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
            <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 55%)'}}/>
            <div style={{position:'absolute',top:'12px',right:'12px',background:'#C94E1A',color:'#fff',fontSize:'9px',fontWeight:700,padding:'4px 8px',letterSpacing:'0.5px'}}>{item.badge}</div>
            <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'20px',color:'#fff'}}>
              <div style={{fontSize:'11px',letterSpacing:'2px',fontWeight:500,marginBottom:'4px'}}>{item.brand}</div>
              <div style={{fontSize:'12px',color:'rgba(255,255,255,0.7)',fontWeight:300}}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Withy 안내 */}
      <div className="withy-inline">
        <div style={{display:'flex',alignItems:'center',gap:'20px'}}>
          <span style={{fontSize:'32px'}}>💛</span>
          <div>
            <div style={{fontSize:'16px',fontWeight:500,marginBottom:'4px'}}>위디(Withy) 포인트</div>
            <div style={{fontSize:'12px',color:'#666',fontWeight:300,lineHeight:1.6}}>피팅하고 구매할 때마다 쌓이는 나만의 패션 포인트.<br/>적립된 위디로 다음 쇼핑이 더 알차게.</div>
          </div>
        </div>
        <div className="withy-inline-right">
          {[{num:'2,400',label:'내 위디 잔액'},{num:'+50P',label:'피팅당 적립'},{num:'0.1%',label:'구매 적립률'}].map(s => (
            <div key={s.label} style={{textAlign:'center'}}>
              <div style={{fontFamily:'Georgia,serif',fontSize:'24px',color:'#B08D57',fontWeight:300}}>{s.num}</div>
              <div style={{fontSize:'10px',color:'#999',marginTop:'2px'}}>{s.label}</div>
            </div>
          ))}
          <a href="/withy" style={{padding:'12px 22px',background:'#111',color:'#fff',fontSize:'12px',fontWeight:500,textDecoration:'none'}}>위디 사용하기</a>
        </div>
      </div>

      {/* 파트너 브랜드 */}
      <div className="brand-scroll-pad">
        <div style={{fontSize:'11px',letterSpacing:'3px',color:'#999',textAlign:'center',marginBottom:'32px'}}>CLYQ PARTNER BRANDS</div>
        <div style={{display:'flex',gap:'48px',alignItems:'center',justifyContent:'center',flexWrap:'wrap'}}>
          {['MARCIA','MATIN KIM','EENK','D.POUND','ANOTHER A','EIGHT','ANDERSSONBELL'].map(b => (
            <div key={b} style={{fontFamily:'Georgia,serif',fontSize:'18px',fontWeight:300,color:'#999',letterSpacing:'2px',cursor:'pointer'}}>{b}</div>
          ))}
        </div>
      </div>

      {/* 푸터 */}
      <footer className="footer-pad">
        <div className="footer-inner">
          <div>
            <div style={{fontFamily:'Georgia,serif',fontSize:'24px',color:'#fff',letterSpacing:'4px',marginBottom:'12px'}}>
              CLY<span style={{color:'#C94E1A'}}>Q</span>
            </div>
            <div style={{fontSize:'12px',color:'rgba(255,255,255,0.3)',lineHeight:1.9,fontWeight:300}}>
              Personalized Fashion Experience Universe<br/>
              AI가 취향을 읽고, 집에서 먼저 입어보고,<br/>확실한 것만 구매하는 패션 쇼핑의 기준
            </div>
          </div>
          {[
            {title:'쇼핑',links:['신상품','베스트','선피팅관','SALE','순환유통']},
            {title:'서비스',links:['피팅 이용 안내','Withy 포인트','반납 방법','AI 취향 분석']},
            {title:'고객센터',links:['1:1 문의','자주 묻는 질문','배송 조회','반품/교환']},
            {title:'회사',links:['회사 소개','브랜드 입점','이용약관','개인정보처리방침']},
          ].map(col => (
            <div key={col.title}>
              <div style={{fontSize:'11px',fontWeight:500,color:'rgba(255,255,255,0.5)',letterSpacing:'1px',marginBottom:'16px'}}>{col.title}</div>
              <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                {col.links.map(l => (
                  <a key={l} href="/" style={{fontSize:'12px',color:'rgba(255,255,255,0.3)',textDecoration:'none',fontWeight:300}}>{l}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:'8px',fontSize:'11px',color:'rgba(255,255,255,0.2)'}}>
          <span>© 2026 CLYQ Inc. exyai company. 통신판매업신고: 2026-서울강남-0000 대표: 학선</span>
          <span>사업자등록번호: 000-00-00000</span>
        </div>
      </footer>
    </main>
  )
}
