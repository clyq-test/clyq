'use client'
import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <div style={{background:'#111',color:'rgba(255,255,255,0.6)',fontSize:'11px',textAlign:'center',padding:'9px 0',letterSpacing:'0.5px'}}>
        <strong style={{color:'#fff'}}>선피팅 서비스</strong> — 입어보고 마음에 드는 것만 구매하세요. 피팅 무료
      </div>
      <nav style={{position:'sticky',top:0,zIndex:500,background:'#fff',borderBottom:'1px solid #e8e8e8'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 40px',height:'60px',borderBottom:'1px solid #e8e8e8'}}>
          <a href="/" style={{fontFamily:'Georgia,serif',fontSize:'26px',fontWeight:500,letterSpacing:'5px',color:'#111',textDecoration:'none'}}>
            CLY<span style={{color:'#C94E1A'}}>Q</span>
          </a>
          <div style={{display:'flex',alignItems:'center',gap:'8px',border:'1px solid #e8e8e8',padding:'9px 14px',width:'260px'}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>
            <input type="text" placeholder="브랜드, 상품명 검색" style={{border:'none',outline:'none',fontSize:'12px',width:'100%',background:'transparent'}}/>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'20px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'6px',padding:'7px 14px',background:'#111',color:'#fff',fontSize:'11px',cursor:'pointer'}}>
              <div style={{width:'5px',height:'5px',borderRadius:'50%',background:'#B08D57'}}/>
              위디 2,400P
            </div>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'3px',cursor:'pointer',color:'#666',fontSize:'10px'}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              찜
            </div>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'3px',cursor:'pointer',color:'#666',fontSize:'10px'}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
              장바구니
            </div>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'3px',cursor:'pointer',color:'#666',fontSize:'10px'}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              마이페이지
            </div>
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'44px'}}>
          {[
            {label:'신상품',href:'/'},
            {label:'베스트',href:'/'},
            {label:'아우터',href:'/'},
            {label:'상의',href:'/'},
            {label:'하의',href:'/'},
            {label:'원피스/세트',href:'/'},
            {label:'가방',href:'/'},
            {label:'슈즈',href:'/'},
            {label:'SALE',href:'/'},
          ].map(item => (
            <a key={item.label} href={item.href} style={{padding:'0 16px',height:'44px',display:'flex',alignItems:'center',fontSize:'12px',color:'#666',textDecoration:'none',letterSpacing:'0.5px'}}>
              {item.label}
            </a>
          ))}
          <a href="/" style={{padding:'0 16px',height:'44px',display:'flex',alignItems:'center',fontSize:'12px',color:'#C94E1A',fontWeight:500,textDecoration:'none'}}>
            📦 선피팅관
          </a>
        </div>
      </nav>
    </>
  )
}