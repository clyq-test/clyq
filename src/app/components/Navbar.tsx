'use client'
import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .nav-desktop-menu { display: none !important; }
          .nav-desktop-search { display: none !important; }
          .nav-desktop-icons { display: none !important; }
          .nav-hamburger { display: flex !important; }
          .nav-cat-row { display: none !important; }
          .nav-top { padding: 0 16px !important; }
        }
      `}</style>

      <div style={{background:'#111',color:'rgba(255,255,255,0.6)',fontSize:'11px',textAlign:'center',padding:'9px 0',letterSpacing:'0.5px'}}>
        <strong style={{color:'#fff'}}>선피팅 서비스</strong> — 입어보고 마음에 드는 것만 구매하세요. 피팅 무료
      </div>

      <nav style={{position:'sticky',top:0,zIndex:500,background:'#fff',borderBottom:'1px solid #e8e8e8'}}>

        {/* 상단 바 */}
        <div className="nav-top" style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 40px',height:'60px',borderBottom:'1px solid #e8e8e8'}}>

          {/* 로고 + 메뉴 */}
          <div style={{display:'flex',alignItems:'center',gap:'32px'}}>
            <a href="/" style={{fontFamily:'Georgia,serif',fontSize:'26px',fontWeight:500,letterSpacing:'5px',color:'#111',textDecoration:'none'}}>
              CLY<span style={{color:'#C94E1A'}}>Q</span>
            </a>
            <div className="nav-desktop-menu" style={{display:'flex',alignItems:'center',gap:'24px'}}>
              <a href="/" style={{fontSize:'13px',color:'#666',textDecoration:'none'}}
                onMouseEnter={e=>(e.currentTarget.style.color='#111')}
                onMouseLeave={e=>(e.currentTarget.style.color='#666')}>홈</a>
              <a href="/about" style={{fontSize:'13px',color:'#666',textDecoration:'none'}}
                onMouseEnter={e=>(e.currentTarget.style.color='#111')}
                onMouseLeave={e=>(e.currentTarget.style.color='#666')}>서비스 소개</a>
            </div>
          </div>

          {/* 검색 (데스크탑) */}
          <div className="nav-desktop-search" style={{display:'flex',alignItems:'center',gap:'8px',border:'1px solid #e8e8e8',padding:'9px 14px',width:'260px'}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
              <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <input type="text" placeholder="브랜드, 상품명 검색"
              style={{border:'none',outline:'none',fontSize:'12px',width:'100%',background:'transparent',fontFamily:'inherit'}}/>
          </div>

          {/* 데스크탑 아이콘 */}
          <div className="nav-desktop-icons" style={{display:'flex',alignItems:'center',gap:'20px'}}>
            <a href="/withy" style={{display:'flex',alignItems:'center',gap:'6px',padding:'7px 14px',background:'#111',color:'#fff',fontSize:'11px',letterSpacing:'0.5px',textDecoration:'none',transition:'background 0.2s'}}
              onMouseEnter={e=>(e.currentTarget.style.background='#C94E1A')}
              onMouseLeave={e=>(e.currentTarget.style.background='#111')}>
              <div style={{width:'5px',height:'5px',borderRadius:'50%',background:'#B08D57'}}/>
              위디 2,400P
            </a>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'3px',cursor:'pointer',color:'#666',fontSize:'10px'}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>찜
            </div>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'3px',cursor:'pointer',color:'#666',fontSize:'10px'}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>장바구니
            </div>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'3px',cursor:'pointer',color:'#666',fontSize:'10px'}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>마이페이지
            </div>
          </div>

          {/* 모바일 오른쪽 */}
          <div className="nav-hamburger" style={{display:'none',alignItems:'center',gap:'16px'}}>
            <a href="/withy" style={{display:'flex',alignItems:'center',gap:'5px',background:'#111',color:'#fff',fontSize:'11px',padding:'6px 12px',textDecoration:'none',borderRadius:'2px'}}>
              <div style={{width:'5px',height:'5px',borderRadius:'50%',background:'#B08D57'}}/>
              2,400P
            </a>
            <button onClick={() => setMenuOpen(!menuOpen)}
              style={{display:'flex',flexDirection:'column',gap:'5px',padding:'4px',background:'none',border:'none',cursor:'pointer'}}>
              <div style={{width:'22px',height:'1.5px',background:'#111',transition:'all 0.2s',transform:menuOpen?'rotate(45deg) translate(4px, 4px)':'none'}}/>
              <div style={{width:'22px',height:'1.5px',background:'#111',transition:'all 0.2s',opacity:menuOpen?0:1}}/>
              <div style={{width:'22px',height:'1.5px',background:'#111',transition:'all 0.2s',transform:menuOpen?'rotate(-45deg) translate(4px, -4px)':'none'}}/>
            </button>
          </div>
        </div>

        {/* 카테고리 탭 (데스크탑) */}
        <div className="nav-cat-row" style={{display:'flex',alignItems:'center',justifyContent:'center',height:'44px',overflowX:'auto'}}>
          {[
            {label:'신상품',href:'/products/new'},
            {label:'베스트',href:'/'},
            {label:'아우터',href:'/'},
            {label:'상의',href:'/'},
            {label:'하의',href:'/'},
            {label:'원피스/세트',href:'/'},
            {label:'가방',href:'/'},
            {label:'슈즈',href:'/'},
            {label:'SALE',href:'/'},
            {label:'매거진',href:'/magazine'},
          ].map(item => (
            <a key={item.label} href={item.href}
              style={{padding:'0 16px',height:'44px',display:'flex',alignItems:'center',fontSize:'12px',color:'#666',textDecoration:'none',letterSpacing:'0.5px',borderBottom:'2px solid transparent',transition:'all 0.15s',whiteSpace:'nowrap'}}
              onMouseEnter={e=>{e.currentTarget.style.color='#111';e.currentTarget.style.borderBottomColor='#111'}}
              onMouseLeave={e=>{e.currentTarget.style.color='#666';e.currentTarget.style.borderBottomColor='transparent'}}>
              {item.label}
            </a>
          ))}
          <a href="/fitting"
            style={{padding:'0 16px',height:'44px',display:'flex',alignItems:'center',fontSize:'12px',color:'#C94E1A',textDecoration:'none',fontWeight:500,letterSpacing:'0.5px',borderBottom:'2px solid transparent',whiteSpace:'nowrap'}}
            onMouseEnter={e=>e.currentTarget.style.borderBottomColor='#C94E1A'}
            onMouseLeave={e=>e.currentTarget.style.borderBottomColor='transparent'}>
            📦 선피팅관
          </a>
        </div>

        {/* 모바일 드로어 메뉴 */}
        {menuOpen && (
          <div style={{position:'fixed',top:'110px',left:0,right:0,bottom:0,background:'#fff',zIndex:999,overflowY:'auto',borderTop:'1px solid #e8e8e8'}}>
            {/* 검색 */}
            <div style={{padding:'16px',borderBottom:'1px solid #e8e8e8'}}>
              <div style={{display:'flex',alignItems:'center',gap:'8px',border:'1px solid #e8e8e8',padding:'11px 14px'}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                  <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/>
                </svg>
                <input type="text" placeholder="브랜드, 상품명 검색"
                  style={{border:'none',outline:'none',fontSize:'13px',width:'100%',background:'transparent',fontFamily:'inherit'}}/>
              </div>
            </div>

            {/* 메뉴 목록 */}
            {[
              {label:'홈', href:'/', sub:''},
              {label:'서비스 소개', href:'/about', sub:'CLYQ가 무엇인지 알아보세요'},
              {label:'신상품', href:'/products/new', sub:'새로 들어온 제품들'},
              {label:'📦 선피팅관', href:'/fitting', sub:'집에서 입어보고 결정하세요', highlight:true},
              {label:'위디 포인트', href:'/withy', sub:'포인트 적립·사용·등급 확인'},
              {label:'매거진', href:'/magazine', sub:'패션 트렌드와 브랜드 소식'},
              {label:'베스트', href:'/', sub:''},
              {label:'아우터', href:'/', sub:''},
              {label:'상의', href:'/', sub:''},
              {label:'하의', href:'/', sub:''},
              {label:'원피스/세트', href:'/', sub:''},
              {label:'가방', href:'/', sub:''},
              {label:'슈즈', href:'/', sub:''},
              {label:'SALE', href:'/', sub:''},
            ].map((item, i) => (
              <a key={i} href={item.href} onClick={() => setMenuOpen(false)}
                style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'16px',borderBottom:'1px solid #f5f5f5',textDecoration:'none',background:item.highlight?'#fff5f2':'#fff'}}>
                <div>
                  <div style={{fontSize:'14px',fontWeight:item.highlight?600:400,color:item.highlight?'#C94E1A':'#111'}}>{item.label}</div>
                  {item.sub && <div style={{fontSize:'11px',color:'#999',marginTop:'2px'}}>{item.sub}</div>}
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </a>
            ))}
          </div>
        )}
      </nav>
    </>
  )
}