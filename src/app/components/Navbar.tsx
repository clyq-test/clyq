'use client'
import { useState } from 'react'

export default function Navbar() {
  const [cartCount] = useState(0)
  const [withyPoints] = useState(2400)

  return (
    <>
      {/* 상단 공지 바 */}
      <div style={{
        background: '#111',
        color: 'rgba(255,255,255,0.6)',
        fontSize: '11px',
        textAlign: 'center',
        padding: '9px 0',
        letterSpacing: '0.5px',
        position: 'relative'
      }}>
        <strong style={{ color: '#fff' }}>선피팅 서비스</strong>
        {' '}— 입어보고 마음에 드는 것만 구매하세요. 피팅은 무료, 반품 걱정 없음
      </div>

      {/* 메인 GNB */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 500,
        background: '#fff',
        borderBottom: '1px solid #e8e8e8'
      }}>
        {/* 로고 + 검색 + 아이콘 */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 40px',
          height: '60px',
          borderBottom: '1px solid #e8e8e8'
        }}>
          {/* 로고 */}
          <a href="/" style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: '26px',
            fontWeight: 500,
            letterSpacing: '5px',
            color: '#111'
          }}>
            CLY<span style={{ color: '#C94E1A' }}>Q</span>
          </a>

          {/* 검색 */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: '1px solid #e8e8e8',
            padding: '9px 14px',
            width: '260px'
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
              <circle cx="11" cy="11" r="7"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="브랜드, 상품명 검색"
              style={{
                border: 'none',
                outline: 'none',
                fontSize: '12px',
                width: '100%',
                background: 'transparent',
                fontFamily: 'inherit'
              }}
            />
          </div>

          {/* 아이콘들 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* 위디 */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              background: '#111',
              color: '#fff',
              fontSize: '11px',
              letterSpacing: '0.5px',
              cursor: 'pointer'
            }}>
              <div style={{
                width: '5px', height: '5px',
                borderRadius: '50%',
                background: '#B08D57'
              }}/>
              위디 {withyPoints.toLocaleString()}P
            </div>

            {/* 찜 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', cursor: 'pointer', color: '#666' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <span style={{ fontSize: '10px' }}>찜</span>
            </div>

            {/* 장바구니 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', cursor: 'pointer', color: '#666', position: 'relative' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute', top: '-4px', right: '-4px',
                  background: '#C94E1A', color: '#fff',
                  borderRadius: '50%', width: '14px', height: '14px',
                  fontSize: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>{cartCount}</span>
              )}
              <span style={{ fontSize: '10px' }}>장바구니</span>
            </div>

            {/* 마이페이지 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', cursor: 'pointer', color: '#666' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <span style={{ fontSize: '10px' }}>마이페이지</span>
            </div>
          </div>
        </div>

        {/* 카테고리 탭 */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '44px',
          gap: '0'
        }}>
          {[
            { label: '신상품', href: '/products?category=new' },
            { label: '베스트', href: '/products?category=best' },
            { label: '아우터', href: '/products?category=아우터' },
            { label: '상의', href: '/products?category=상의' },
            { label: '하의', href: '/products?category=하의' },
            { label: '원피스/세트', href: '/products?category=원피스' },
            { label: '가방', href: '/products?category=가방' },
            { label: '슈즈', href: '/products?category=슈즈' },
            { label: 'SALE', href: '/products?category=sale' },
          ].map((item) => (
            
              key={item.label}
              href={item.href}
              style={{
                padding: '0 18px',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                fontSize: '12px',
                fontWeight: 400,
                color: '#666',
                letterSpacing: '0.5px',
                borderBottom: '2px solid transparent',
                transition: 'all 0.15s',
                whiteSpace: 'nowrap'
              }}
            >
              {item.label}
            </a>
          ))}
          
            href="/fitting"
            style={{
              padding: '0 18px',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              fontSize: '12px',
              fontWeight: 500,
              color: '#C94E1A',
              letterSpacing: '0.5px',
              borderBottom: '2px solid transparent',
              whiteSpace: 'nowrap'
            }}
          >
            📦 선피팅관
          </a>
        </div>
      </nav>
    </>
  )
}
