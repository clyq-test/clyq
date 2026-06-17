// @ts-nocheck
'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [loginTab, setLoginTab] = useState('login')
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const [megaOpen, setMegaOpen] = useState(null)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('clyq_user')
    if (saved) { const u = JSON.parse(saved); setIsLoggedIn(true); setUserName(u.name) }
  }, [])

  function openLogin() { setLoginOpen(true); document.body.style.overflow = 'hidden' }
  function closeLogin() { setLoginOpen(false); document.body.style.overflow = '' }

  function handleLogin() {
    if (!email || !pw) return
    const u = { name: '김지연', email }
    localStorage.setItem('clyq_user', JSON.stringify(u))
    setIsLoggedIn(true); setUserName(u.name); closeLogin()
  }

  function handleLogout() {
    localStorage.removeItem('clyq_user')
    setIsLoggedIn(false); setUserName(''); router.push('/')
  }

  const megaData = {
    '카테고리': [
      [{ h: '아우터', sub: ['코트', '재킷', '패딩', '조끼'] }, { h: '상의', sub: ['블라우스', '니트', '티셔츠', '셔츠'] }],
      [{ h: '하의', sub: ['스커트', '팬츠', '레깅스', '쇼츠'] }, { h: '원피스·세트', sub: ['미디 드레스', '미니 드레스', '세트업', '점프수트'] }],
      [{ h: '가방', sub: ['숄더백', '크로스백', '토트백', '클러치'] }, { h: '슈즈', sub: ['플랫', '힐', '스니커즈', '부츠'] }],
    ],
    '브랜드': [
      ['MARCIA', 'MATIN KIM', 'EENK', 'D.POUND'],
      ['ANOTHER A', 'EIGHT', 'ANDERSSONBELL', 'ADER ERROR'],
      ['SORRY TOO MUCH LOVE', '전체 브랜드 보기'],
    ],
  }

  const catItems = [
    { label: '신상품', href: '/products/new', hot: true },
    { label: '베스트', href: '/' },
    { label: '카테고리', href: '/', mega: true },
    { label: '브랜드', href: '/', mega: true },
    { label: 'SALE', href: '/', red: true },
    { label: '매거진', href: '/magazine' },
    { label: '커뮤니티', href: '/community' },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Noto+Sans+KR:wght@300;400;500&display=swap');

        /* ── 전역 터치 최적화 ── */
        *, *::before, *::after { -webkit-tap-highlight-color: transparent; }
        button, a { touch-action: manipulation; }

        @media (max-width:768px) {
          .nav-dm { display:none !important; }
          .nav-ds { display:none !important; }
          .nav-di { display:none !important; }
          .nav-hb { display:flex !important; }
          .nav-cats { display:none !important; }
          .nav-top { padding:0 16px !important; height:52px !important; }
          .withy-pill { display:none !important; }
        }
        @media (max-width:360px) {
          .lm-box { width:96vw; }
          .lm-hd { padding:24px 20px 0; }
          .lm-body { padding:20px; }
        }

        /* ── Login Modal ── */
        .lm-bg { position:fixed; inset:0; background:rgba(28,24,20,.5); z-index:2000; display:flex; align-items:center; justify-content:center; backdrop-filter:blur(6px); }
        .lm-box { background:#fff; width:min(420px,92vw); position:relative; }
        .lm-hd { padding:32px 36px 0; text-align:center; }
        .lm-logo { font-family:'Cormorant Garamond',Georgia,serif; font-size:28px; font-weight:500; letter-spacing:0.14em; color:#1C1C1C; margin-bottom:24px; }
        .lm-tabs { display:flex; border-bottom:1px solid #E4DFDA; margin:0 -36px; }
        .lm-tab { flex:1; padding:13px; font-size:13px; border:none; background:none; cursor:pointer; color:#A09B97; border-bottom:2px solid transparent; font-family:inherit; }
        .lm-tab.on { color:#1C1C1C; border-bottom-color:#1C1C1C; font-weight:500; }
        .lm-body { padding:28px 36px 32px; }
        .lm-inp { width:100%; padding:13px 14px; border:1px solid #E4DFDA; font-size:13px; outline:none; font-family:inherit; margin-bottom:10px; background:#FAFAF8; }
        .lm-inp:focus { border-color:#1C1C1C; background:#fff; }
        .lm-close { position:absolute; top:14px; right:14px; width:28px; height:28px; border:none; background:none; cursor:pointer; font-size:16px; color:#A09B97; }
        .lm-btn { width:100%; padding:14px; background:#1C1C1C; color:#fff; font-size:13px; font-weight:500; border:none; cursor:pointer; font-family:inherit; transition:background .15s; }
        .lm-btn:hover { background:#3D6A4F; }
        .lm-kakao { width:100%; padding:13px; background:#FEE500; color:#111; font-size:13px; font-weight:600; border:none; cursor:pointer; font-family:inherit; display:flex; align-items:center; justify-content:center; gap:8px; }
        .lm-div { display:flex; align-items:center; gap:12px; margin:14px 0; font-size:11px; color:#D4CFC9; }
        .lm-div::before,.lm-div::after { content:''; flex:1; height:1px; background:#E4DFDA; }
        .lm-links { display:flex; justify-content:center; gap:14px; margin-top:12px; font-size:12px; }
        .lm-links a { cursor:pointer; color:#A09B97; }
        .lm-links a:hover { color:#1C1C1C; }
        .lm-signup { text-align:center; margin-top:12px; font-size:12px; color:#6A6460; padding-top:12px; border-top:1px solid #F0EBE4; }
        .lm-signup a { color:#3D6A4F; font-weight:500; text-decoration:none; }

        /* ── Mega Menu ── */
        .mega-wrap { position:absolute; top:100%; left:0; right:0; background:#fff; border-top:1px solid #E4DFDA; border-bottom:1px solid #E4DFDA; box-shadow:0 8px 32px rgba(28,24,20,.07); z-index:400; padding:28px 40px; display:flex; gap:40px; }
        .mega-col { min-width:120px; }
        .mega-col-title { font-size:12px; font-weight:500; color:#1C1C1C; letter-spacing:0.04em; margin-bottom:10px; padding-bottom:6px; border-bottom:1px solid #F0EBE4; }
        .mega-sub-link { display:block; font-size:12px; color:#6A6460; text-decoration:none; padding:5px 0; font-weight:300; transition:color .15s; }
        .mega-sub-link:hover { color:#3D6A4F; }

        /* ── Category Tab ── */
        .cat-link { padding:0 14px; height:42px; display:flex; align-items:center; gap:4px; font-size:12.5px; color:#6A6460; text-decoration:none; font-weight:400; letter-spacing:0.02em; white-space:nowrap; border-bottom:2px solid transparent; cursor:pointer; transition:all 0.15s; background:none; border-top:none; border-left:none; border-right:none; font-family:inherit; }
        .cat-link:hover { color:#1C1C1C; }
        .cat-link.active { border-bottom-color:#1C1C1C; color:#1C1C1C; }

        /* ── User Dropdown ── */
        .ud-drop { position:absolute; top:calc(100% + 8px); right:0; background:#fff; border:1px solid #E4DFDA; box-shadow:0 4px 20px rgba(28,24,20,.08); min-width:160px; z-index:600; }
        .udi { display:flex; align-items:center; gap:8px; padding:12px 16px; font-size:13px; color:#3A3835; cursor:pointer; text-decoration:none; border-bottom:1px solid #F7F4F0; transition:background .12s; }
        .udi:last-child { border-bottom:none; }
        .udi:hover { background:#F7F4F0; }
        .udi.red { color:#C04B4B; }

        /* ── Withy Pill ── */
        .withy-pill { display:flex; align-items:center; gap:5px; padding:6px 12px; background:#F0EBE4; color:#A07A4E; font-size:11px; font-weight:500; border-radius:20px; transition:background .15s; }
        .withy-pill:hover { background:#E8DFD4; }
      `}</style>

      {/* ── 공지 바 ── */}
      <div style={{ background: '#1C1C1C', color: 'rgba(247,244,240,0.6)', fontSize: '11px', textAlign: 'center', padding: '9px 0', letterSpacing: '0.03em' }}>
        <strong style={{ color: '#F7F4F0' }}>피팅박스 서비스</strong> — 입어보고 마음에 드는 것만 구매하세요 ·{' '}
        <a href="/community" style={{ color: '#C49A6C', textDecoration: 'none', fontWeight: 500 }}>커뮤니티 활동으로 위디 적립 ›</a>
      </div>

      {/* ── Nav ── */}
      <nav
        style={{ position: 'sticky', top: 0, zIndex: 500, background: '#fff', borderBottom: '1px solid #E4DFDA' }}
        onMouseLeave={() => setMegaOpen(null)}
      >
        {/* 상단 바 */}
        <div
          className="nav-top"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', height: '60px', borderBottom: '1px solid #E4DFDA' }}
        >
          {/* 로고 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
            <a href="/" style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: '25px', fontWeight: 600, letterSpacing: '0.12em', color: '#1C1C1C', textDecoration: 'none' }}>
              CLYQ
            </a>
            <div className="nav-dm" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <a href="/" style={{ fontSize: '12.5px', color: '#6A6460', textDecoration: 'none', transition: 'color .15s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#1C1C1C')}
                onMouseLeave={e => (e.currentTarget.style.color = '#6A6460')}>홈</a>
              <a href="/about" style={{ fontSize: '12.5px', color: '#6A6460', textDecoration: 'none', transition: 'color .15s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#1C1C1C')}
                onMouseLeave={e => (e.currentTarget.style.color = '#6A6460')}>서비스 소개</a>
            </div>
          </div>

          {/* 검색 */}
          <div className="nav-ds" style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #E4DFDA', padding: '8px 14px', width: '240px', background: '#FAFAF8' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#A09B97" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" /></svg>
            <input type="text" placeholder="브랜드, 상품명 검색" style={{ border: 'none', outline: 'none', fontSize: '12px', width: '100%', background: 'transparent', fontFamily: 'inherit', color: '#1C1C1C' }} />
          </div>

          {/* 아이콘 영역 */}
          <div className="nav-di" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a href="/withy" className="withy-pill">
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#C49A6C' }} />
              위디 2,400P
            </a>

            {/* 찜 */}
            <div onClick={() => !isLoggedIn && openLogin()}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', cursor: 'pointer', color: '#A09B97', fontSize: '10px', transition: 'color .15s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#1C1C1C')}
              onMouseLeave={e => (e.currentTarget.style.color = '#A09B97')}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
              찜
            </div>

            {/* 장바구니 */}
            <div onClick={() => !isLoggedIn && openLogin()}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', cursor: 'pointer', color: '#A09B97', fontSize: '10px', transition: 'color .15s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#1C1C1C')}
              onMouseLeave={e => (e.currentTarget.style.color = '#A09B97')}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" /></svg>
              장바구니
            </div>

            {/* 유저 */}
            {isLoggedIn ? (
              <div style={{ position: 'relative' }}>
                <button onClick={() => setUserMenuOpen(!userMenuOpen)}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', background: 'none', border: 'none', fontFamily: 'inherit' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#1C1C1C', color: '#F7F4F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 500 }}>
                    {userName.charAt(0)}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 500, color: '#1C1C1C' }}>{userName}님</span>
                    <span style={{ fontSize: '10px', color: '#A07A4E' }}>골드 2,400P</span>
                  </div>
                </button>
                {userMenuOpen && (
                  <>
                    <div style={{ position: 'fixed', inset: 0, zIndex: 590 }} onClick={() => setUserMenuOpen(false)} />
                    <div className="ud-drop">
                      {[
                        { label: '마이페이지', href: '/mypage' },
                        { label: '피팅 현황', href: '/mypage' },
                        { label: '주문 내역', href: '/mypage' },
                        { label: '위디 2,400P', href: '/withy' },
                        { label: 'AI 취향 설정', href: '/mypage' },
                      ].map(item => (
                        <a key={item.label} href={item.href} className="udi" onClick={() => setUserMenuOpen(false)}>
                          {item.label}
                        </a>
                      ))}
                      <div className="udi red" onClick={() => { setUserMenuOpen(false); handleLogout() }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                        로그아웃
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button onClick={openLogin}
                style={{ padding: '7px 16px', border: '1px solid #E4DFDA', background: '#fff', color: '#6A6460', fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#1C1C1C'; e.currentTarget.style.color = '#1C1C1C' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#E4DFDA'; e.currentTarget.style.color = '#6A6460' }}>
                로그인
              </button>
            )}
          </div>

          {/* 모바일 햄버거 */}
          <div className="nav-hb" style={{ display: 'none', alignItems: 'center', gap: '12px' }}>
            {isLoggedIn ? (
              <a href="/mypage" style={{ textDecoration: 'none' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#1C1C1C', color: '#F7F4F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 500 }}>
                  {userName.charAt(0)}
                </div>
              </a>
            ) : (
              <button onClick={openLogin} style={{ fontSize: '11px', border: '1px solid #E4DFDA', background: '#fff', padding: '6px 12px', cursor: 'pointer', fontFamily: 'inherit', color: '#6A6460' }}>로그인</button>
            )}
            <button onClick={() => setMenuOpen(!menuOpen)}
              style={{ display: 'flex', flexDirection: 'column', gap: '5px', padding: '4px', background: 'none', border: 'none', cursor: 'pointer' }}>
              <div style={{ width: '22px', height: '1.5px', background: '#1C1C1C', transition: 'all .2s', transform: menuOpen ? 'rotate(45deg) translate(4px,4px)' : 'none' }} />
              <div style={{ width: '22px', height: '1.5px', background: '#1C1C1C', opacity: menuOpen ? 0 : 1 }} />
              <div style={{ width: '22px', height: '1.5px', background: '#1C1C1C', transition: 'all .2s', transform: menuOpen ? 'rotate(-45deg) translate(4px,-4px)' : 'none' }} />
            </button>
          </div>
        </div>

        {/* ── 카테고리 탭 ── */}
        <div className="nav-cats" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '42px', position: 'relative', background: '#fff' }}>
          {catItems.map(item => (
            <button key={item.label}
              className={'cat-link' + (megaOpen === item.label ? ' active' : '')}
              style={{ color: item.red ? '#C04B4B' : item.hot ? '#3D6A4F' : '#6A6460', fontWeight: item.hot || item.red ? 500 : 400 }}
              onMouseEnter={() => item.mega ? setMegaOpen(item.label) : setMegaOpen(null)}
              onClick={() => { if (!item.mega) router.push(item.href) }}>
              {item.label}
              {item.hot && <span style={{ fontSize: '8px', background: '#3D6A4F', color: '#fff', padding: '1px 4px', borderRadius: '2px', fontWeight: 700, marginLeft: '3px' }}>N</span>}
              {item.mega && <span style={{ fontSize: '10px', marginLeft: '2px' }}>▾</span>}
            </button>
          ))}

          {/* 피팅박스관 탭 */}
          <a href="/fitting"
            style={{ padding: '0 16px', height: '42px', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#fff', textDecoration: 'none', fontWeight: 500, whiteSpace: 'nowrap', background: '#3D6A4F', marginLeft: '8px', letterSpacing: '0.03em', transition: 'background .15s' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#2F5540')}
            onMouseLeave={e => (e.currentTarget.style.background = '#3D6A4F')}>
            피팅박스관
          </a>

          {/* 메가메뉴 — 카테고리 */}
          {megaOpen === '카테고리' && (
            <div className="mega-wrap">
              {megaData['카테고리'].map((pair, pi) => (
                <div key={pi} style={{ display: 'flex', gap: '32px' }}>
                  {pair.map(col => (
                    <div key={col.h} className="mega-col">
                      <div className="mega-col-title">{col.h}</div>
                      {col.sub.map(s => (
                        <a key={s} href="/" className="mega-sub-link">{s}</a>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* 메가메뉴 — 브랜드 */}
          {megaOpen === '브랜드' && (
            <div className="mega-wrap">
              {megaData['브랜드'].map((col, ci) => (
                <div key={ci} className="mega-col">
                  {col.map(b => (
                    <a key={b} href="/" className="mega-sub-link"
                      style={{ fontFamily: b === '전체 브랜드 보기' ? 'inherit' : "'Cormorant Garamond',Georgia,serif", fontSize: b === '전체 브랜드 보기' ? '12px' : '13px', letterSpacing: b === '전체 브랜드 보기' ? '0' : '0.06em' }}>
                      {b}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── 모바일 드로어 ── */}
        {menuOpen && (
          <div style={{ position: 'fixed', top: '95px', left: 0, right: 0, bottom: 0, background: '#fff', zIndex: 999, overflowY: 'auto', borderTop: '1px solid #E4DFDA' }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #E4DFDA', background: '#FAFAF8' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #E4DFDA', padding: '10px 14px' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#A09B97" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" /></svg>
                <input type="text" placeholder="브랜드, 상품명 검색" style={{ border: 'none', outline: 'none', fontSize: '13px', width: '100%', background: 'transparent', fontFamily: 'inherit' }} />
              </div>
            </div>
            {[
              { label: '홈', href: '/' },
              { label: '서비스 소개', href: '/about', sub: 'CLYQ 피팅박스 서비스 안내' },
              { label: '신상품', href: '/products/new', sub: '새로 들어온 제품들', accent: true },
              { label: '피팅박스관', href: '/fitting', sub: '집에서 입어보고 결정하세요', hl: true },
              { label: '커뮤니티', href: '/community', sub: '피팅 후기 공유하고 위디 적립' },
              { label: '위디 포인트', href: '/withy', sub: '적립·등급·구독 혜택 확인' },
              { label: '매거진', href: '/magazine', sub: '패션 트렌드와 브랜드 소식' },
              { label: '아우터', href: '/', sub: '코트·재킷·패딩' },
              { label: '상의', href: '/', sub: '블라우스·니트·티셔츠' },
              { label: '하의', href: '/', sub: '스커트·팬츠·레깅스' },
              { label: '원피스·세트', href: '/', sub: '미디·미니·세트업' },
              { label: '가방', href: '/', sub: '숄더·크로스·토트' },
              { label: '슈즈', href: '/', sub: '플랫·힐·스니커즈' },
              { label: 'SALE', href: '/', sub: '한정 기간 특가', red: true },
            ].map((item, i) => (
              <a key={i} href={item.href} onClick={() => setMenuOpen(false)}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderBottom: '1px solid #F7F4F0', textDecoration: 'none', background: item.hl ? '#EDF4EF' : '#fff' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: item.hl ? 500 : 400, color: item.hl ? '#3D6A4F' : item.red ? '#C04B4B' : '#1C1C1C' }}>{item.label}</div>
                  {item.sub && <div style={{ fontSize: '11px', color: '#A09B97', marginTop: '1px' }}>{item.sub}</div>}
                </div>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#D4CFC9" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
              </a>
            ))}
            {isLoggedIn ? (
              <>
                <a href="/mypage" onClick={() => setMenuOpen(false)}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderBottom: '1px solid #F7F4F0', textDecoration: 'none' }}>
                  <div>
                    <div style={{ fontSize: '14px', color: '#1C1C1C' }}>마이페이지</div>
                    <div style={{ fontSize: '11px', color: '#A09B97', marginTop: '1px' }}>{userName}님 · 골드 · 위디 2,400P</div>
                  </div>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#D4CFC9" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                </a>
                <div style={{ padding: '14px 16px' }}>
                  <button onClick={() => { handleLogout(); setMenuOpen(false) }}
                    style={{ width: '100%', padding: '12px', border: '1px solid #E4DFDA', background: '#fff', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit', color: '#6A6460' }}>
                    로그아웃
                  </button>
                </div>
              </>
            ) : (
              <div style={{ padding: '14px 16px' }}>
                <button onClick={() => { setMenuOpen(false); openLogin() }}
                  style={{ width: '100%', padding: '13px', background: '#1C1C1C', color: '#fff', border: 'none', fontSize: '13px', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
                  로그인 / 회원가입
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* ── 로그인 모달 ── */}
      {loginOpen && (
        <div className="lm-bg" onClick={closeLogin}>
          <div className="lm-box" onClick={e => e.stopPropagation()}>
            <button className="lm-close" onClick={closeLogin}>✕</button>
            <div className="lm-hd">
              <div className="lm-logo">CLYQ</div>
              <div className="lm-tabs">
                <button className={'lm-tab ' + (loginTab === 'login' ? 'on' : '')} onClick={() => setLoginTab('login')}>로그인</button>
                <button className={'lm-tab ' + (loginTab === 'find' ? 'on' : '')} onClick={() => setLoginTab('find')}>아이디/비밀번호 찾기</button>
              </div>
            </div>
            <div className="lm-body">
              {loginTab === 'login' ? (
                <>
                  <button className="lm-kakao" onClick={handleLogin}>
                    <span style={{ fontWeight: 800, fontSize: '15px' }}>K</span>카카오로 시작하기
                  </button>
                  <div className="lm-div">또는 이메일로 로그인</div>
                  <input className="lm-inp" type="email" placeholder="이메일 주소" value={email} onChange={e => setEmail(e.target.value)} />
                  <input className="lm-inp" type="password" placeholder="비밀번호" value={pw} onChange={e => setPw(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} />
                  <button className="lm-btn" onClick={handleLogin}>로그인</button>
                  <div className="lm-links">
                    <a onClick={() => setLoginTab('find')}>아이디 찾기</a>
                    <span style={{ color: '#E4DFDA' }}>|</span>
                    <a onClick={() => setLoginTab('find')}>비밀번호 찾기</a>
                  </div>
                  <div className="lm-signup">아직 회원이 아니신가요? <a href="/signup" onClick={closeLogin}>회원가입</a></div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: '13px', color: '#6A6460', marginBottom: '20px', lineHeight: 1.7 }}>가입 시 입력한 이메일로 임시 비밀번호를 보내드려요.</div>
                  <input className="lm-inp" type="email" placeholder="가입한 이메일 주소" />
                  <button className="lm-btn">인증 메일 보내기</button>
                  <div className="lm-links" style={{ marginTop: '14px' }}>
                    <a onClick={() => setLoginTab('login')}>← 로그인으로 돌아가기</a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
