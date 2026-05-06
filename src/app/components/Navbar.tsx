'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [loginTab, setLoginTab] = useState<'login'|'find'>('login')
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')

  // 로그인 상태 복원
  useEffect(() => {
    const saved = localStorage.getItem('clyq_user')
    if (saved) {
      const user = JSON.parse(saved)
      setIsLoggedIn(true)
      setUserName(user.name)
    }
  }, [])

  function openLogin() {
    setLoginOpen(true)
    document.body.style.overflow = 'hidden'
  }
  function closeLogin() {
    setLoginOpen(false)
    document.body.style.overflow = ''
  }
  function handleLogin() {
    if (!email || !pw) return
    // 임시 로그인 처리 (추후 Supabase Auth 연동)
    const user = { name: '김지연', email }
    localStorage.setItem('clyq_user', JSON.stringify(user))
    setIsLoggedIn(true)
    setUserName(user.name)
    closeLogin()
  }
  function handleLogout() {
    localStorage.removeItem('clyq_user')
    setIsLoggedIn(false)
    setUserName('')
    router.push('/')
  }

  return (
    <>
      <style>{`
        @media (max-width:768px) {
          .nav-desktop-menu { display:none !important; }
          .nav-desktop-search { display:none !important; }
          .nav-desktop-icons { display:none !important; }
          .nav-hamburger { display:flex !important; }
          .nav-cat-row { display:none !important; }
          .nav-top { padding:0 16px !important; }
        }
        .lm-bg {
          position:fixed; inset:0; background:rgba(0,0,0,.45);
          z-index:2000; display:flex; align-items:center; justify-content:center;
          backdrop-filter:blur(4px);
        }
        .lm-box {
          background:#fff; width:min(420px,92vw); position:relative;
        }
        .lm-hd { padding:32px 36px 0; text-align:center; }
        .lm-logo { font-family:Georgia,serif; font-size:28px; font-weight:300; letter-spacing:5px; color:#111; margin-bottom:24px; }
        .lm-tabs { display:flex; border-bottom:1px solid #e8e8e8; margin:0 -36px; }
        .lm-tab { flex:1; padding:13px; font-size:13px; border:none; background:none; cursor:pointer; color:#999; border-bottom:2px solid transparent; font-family:inherit; }
        .lm-tab.on { color:#111; border-bottom-color:#111; font-weight:500; }
        .lm-body { padding:28px 36px 32px; }
        .lm-inp { width:100%; padding:13px 14px; border:1px solid #e8e8e8; font-size:13px; outline:none; font-family:inherit; margin-bottom:10px; transition:border-color .15s; }
        .lm-inp:focus { border-color:#111; }
        .lm-close { position:absolute; top:14px; right:14px; width:28px; height:28px; border:none; background:none; cursor:pointer; font-size:16px; color:#999; }
        .lm-close:hover { color:#111; }
        .lm-btn { width:100%; padding:14px; background:#111; color:#fff; font-size:14px; font-weight:500; border:none; cursor:pointer; font-family:inherit; transition:background .2s; }
        .lm-btn:hover { background:#C94E1A; }
        .lm-kakao { width:100%; padding:13px; background:#FEE500; color:#111; font-size:13px; font-weight:500; border:none; cursor:pointer; font-family:inherit; display:flex; align-items:center; justify-content:center; gap:8px; margin-bottom:0; }
        .lm-divider { display:flex; align-items:center; gap:12px; margin:16px 0; font-size:11px; color:#ccc; }
        .lm-divider::before, .lm-divider::after { content:''; flex:1; height:1px; background:#e8e8e8; }
        .lm-links { display:flex; justify-content:center; gap:16px; margin-top:14px; font-size:12px; color:#999; flex-wrap:wrap; }
        .lm-links a { cursor:pointer; color:#999; }
        .lm-links a:hover { color:#111; }
        .lm-signup { text-align:center; margin-top:14px; font-size:12px; color:#666; padding-top:14px; border-top:1px solid #f0f0f0; }
        .lm-signup a { color:#C94E1A; font-weight:500; cursor:pointer; text-decoration:none; }

        /* 유저 드롭다운 */
        .user-menu-wrap { position:relative; }
        .user-menu-btn { display:flex; align-items:center; gap:6px; cursor:pointer; background:none; border:none; font-family:inherit; }
        .user-avatar { width:30px; height:30px; border-radius:50%; background:#111; color:#fff; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:500; }
        .user-dropdown { position:absolute; top:calc(100% + 8px); right:0; background:#fff; border:1px solid #e8e8e8; box-shadow:0 4px 20px rgba(0,0,0,.1); min-width:160px; z-index:600; }
        .ud-item { display:flex; align-items:center; gap:8px; padding:12px 16px; font-size:13px; color:#333; cursor:pointer; text-decoration:none; border-bottom:1px solid #f5f5f5; transition:background .15s; }
        .ud-item:last-child { border-bottom:none; }
        .ud-item:hover { background:#fafafa; }
        .ud-item.red { color:#e74c3c; }
      `}</style>

      {/* 공지 바 */}
      <div style={{background:'#111',color:'rgba(255,255,255,0.6)',fontSize:'11px',textAlign:'center',padding:'9px 0',letterSpacing:'0.5px'}}>
        <strong style={{color:'#fff'}}>피팅박스 서비스</strong> — 입어보고 마음에 드는 것만 구매하세요. 피팅 무료
      </div>

      <nav style={{position:'sticky',top:0,zIndex:500,background:'#fff',borderBottom:'1px solid #e8e8e8'}}>

        {/* 상단 바 */}
        <div className="nav-top" style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 40px',height:'60px',borderBottom:'1px solid #e8e8e8'}}>

          {/* 로고 + 상단 메뉴 */}
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

          {/* 검색 */}
          <div className="nav-desktop-search" style={{display:'flex',alignItems:'center',gap:'8px',border:'1px solid #e8e8e8',padding:'9px 14px',width:'260px'}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
              <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <input type="text" placeholder="브랜드, 상품명 검색"
              style={{border:'none',outline:'none',fontSize:'12px',width:'100%',background:'transparent',fontFamily:'inherit'}}/>
          </div>

          {/* 데스크탑 우측 아이콘 */}
          <div className="nav-desktop-icons" style={{display:'flex',alignItems:'center',gap:'20px'}}>
            <a href="/withy" style={{display:'flex',alignItems:'center',gap:'6px',padding:'7px 14px',background:'#111',color:'#fff',fontSize:'11px',textDecoration:'none',transition:'background .2s'}}
              onMouseEnter={e=>(e.currentTarget.style.background='#C94E1A')}
              onMouseLeave={e=>(e.currentTarget.style.background='#111')}>
              <div style={{width:'5px',height:'5px',borderRadius:'50%',background:'#B08D57'}}/>
              위디 2,400P
            </a>

            {/* 찜 */}
            <div onClick={() => !isLoggedIn && openLogin()}
              style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'3px',cursor:'pointer',color:'#666',fontSize:'10px'}}
              onMouseEnter={e=>(e.currentTarget.style.color='#111')}
              onMouseLeave={e=>(e.currentTarget.style.color='#666')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              찜
            </div>

            {/* 장바구니 */}
            <div onClick={() => !isLoggedIn && openLogin()}
              style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'3px',cursor:'pointer',color:'#666',fontSize:'10px'}}
              onMouseEnter={e=>(e.currentTarget.style.color='#111')}
              onMouseLeave={e=>(e.currentTarget.style.color='#666')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              장바구니
            </div>

            {/* 로그인 / 마이페이지 */}
            {isLoggedIn ? (
              <UserMenu name={userName} onLogout={handleLogout}/>
            ) : (
              <div onClick={openLogin}
                style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'3px',cursor:'pointer',color:'#666',fontSize:'10px'}}
                onMouseEnter={e=>(e.currentTarget.style.color='#111')}
                onMouseLeave={e=>(e.currentTarget.style.color='#666')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                로그인
              </div>
            )}
          </div>

          {/* 모바일 우측 */}
          <div className="nav-hamburger" style={{display:'none',alignItems:'center',gap:'14px'}}>
            {isLoggedIn ? (
              <a href="/mypage" style={{display:'flex',alignItems:'center',gap:'6px',textDecoration:'none',color:'#111',fontSize:'12px'}}>
                <div style={{width:'28px',height:'28px',borderRadius:'50%',background:'#111',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'12px',fontWeight:500}}>
                  {userName.charAt(0)}
                </div>
              </a>
            ) : (
              <button onClick={openLogin} style={{fontSize:'11px',border:'1px solid #e8e8e8',background:'#fff',padding:'7px 12px',cursor:'pointer',fontFamily:'inherit'}}>
                로그인
              </button>
            )}
            <button onClick={() => setMenuOpen(!menuOpen)}
              style={{display:'flex',flexDirection:'column',gap:'5px',padding:'4px',background:'none',border:'none',cursor:'pointer'}}>
              <div style={{width:'22px',height:'1.5px',background:'#111',transition:'all .2s',transform:menuOpen?'rotate(45deg) translate(4px,4px)':'none'}}/>
              <div style={{width:'22px',height:'1.5px',background:'#111',transition:'all .2s',opacity:menuOpen?0:1}}/>
              <div style={{width:'22px',height:'1.5px',background:'#111',transition:'all .2s',transform:menuOpen?'rotate(-45deg) translate(4px,-4px)':'none'}}/>
            </button>
          </div>
        </div>

        {/* 카테고리 탭 */}
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
              style={{padding:'0 16px',height:'44px',display:'flex',alignItems:'center',fontSize:'12px',color:'#666',textDecoration:'none',letterSpacing:'0.5px',whiteSpace:'nowrap'}}
              onMouseEnter={e=>e.currentTarget.style.color='#111'}
              onMouseLeave={e=>e.currentTarget.style.color='#666'}>
              {item.label}
            </a>
          ))}
          <a href="/fitting"
            style={{padding:'0 16px',height:'44px',display:'flex',alignItems:'center',fontSize:'12px',color:'#C94E1A',textDecoration:'none',fontWeight:500,whiteSpace:'nowrap'}}>
            📦 피팅박스관
          </a>
        </div>

        {/* 모바일 드로어 */}
        {menuOpen && (
          <div style={{position:'fixed',top:'110px',left:0,right:0,bottom:0,background:'#fff',zIndex:999,overflowY:'auto',borderTop:'1px solid #e8e8e8'}}>
            <div style={{padding:'14px 16px',borderBottom:'1px solid #e8e8e8'}}>
              <div style={{display:'flex',alignItems:'center',gap:'8px',border:'1px solid #e8e8e8',padding:'11px 14px'}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>
                <input type="text" placeholder="브랜드, 상품명 검색" style={{border:'none',outline:'none',fontSize:'13px',width:'100%',background:'transparent',fontFamily:'inherit'}}/>
              </div>
            </div>
            {[
              {label:'홈',href:'/'},
              {label:'서비스 소개',href:'/about',sub:'CLYQ가 무엇인지 알아보세요'},
              {label:'신상품',href:'/products/new',sub:'새로 들어온 제품들'},
              {label:'📦 피팅박스관',href:'/fitting',sub:'집에서 입어보고 결정하세요',highlight:true},
              {label:'커뮤니티',href:'/community',sub:'피팅 후기 공유하고 위디 적립'},
              {label:'위디 포인트',href:'/withy',sub:'포인트 적립·사용·등급 확인'},
              {label:'매거진',href:'/magazine',sub:'패션 트렌드와 브랜드 소식'},
            ].map((item,i) => (
              <a key={i} href={item.href} onClick={() => setMenuOpen(false)}
                style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'16px',borderBottom:'1px solid #f5f5f5',textDecoration:'none',background:item.highlight?'#fff5f2':'#fff'}}>
                <div>
                  <div style={{fontSize:'14px',fontWeight:item.highlight?600:400,color:item.highlight?'#C94E1A':'#111'}}>{item.label}</div>
                  {item.sub && <div style={{fontSize:'11px',color:'#999',marginTop:'2px'}}>{item.sub}</div>}
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              </a>
            ))}
            {isLoggedIn ? (
              <>
                <a href="/mypage" onClick={() => setMenuOpen(false)}
                  style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'16px',borderBottom:'1px solid #f5f5f5',textDecoration:'none',background:'#fff'}}>
                  <div>
                    <div style={{fontSize:'14px',color:'#111'}}>마이페이지</div>
                    <div style={{fontSize:'11px',color:'#999',marginTop:'2px'}}>{userName}님 · 위디 2,400P</div>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                </a>
                <div style={{padding:'16px'}}>
                  <button onClick={() => { handleLogout(); setMenuOpen(false) }}
                    style={{width:'100%',padding:'13px',border:'1px solid #e8e8e8',background:'#fff',fontSize:'13px',cursor:'pointer',fontFamily:'inherit',color:'#666'}}>
                    로그아웃
                  </button>
                </div>
              </>
            ) : (
              <div style={{padding:'16px'}}>
                <button onClick={() => { setMenuOpen(false); openLogin() }}
                  style={{width:'100%',padding:'13px',background:'#111',color:'#fff',border:'none',fontSize:'13px',fontWeight:500,cursor:'pointer',fontFamily:'inherit'}}>
                  로그인 / 회원가입
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* 로그인 모달 */}
      {loginOpen && (
        <div className="lm-bg" onClick={closeLogin}>
          <div className="lm-box" onClick={e => e.stopPropagation()}>
            <button className="lm-close" onClick={closeLogin}>✕</button>
            <div className="lm-hd">
              <div className="lm-logo">CLY<span style={{color:'#C94E1A'}}>Q</span></div>
              <div className="lm-tabs">
                <button className={`lm-tab ${loginTab==='login'?'on':''}`} onClick={() => setLoginTab('login')}>로그인</button>
                <button className={`lm-tab ${loginTab==='find'?'on':''}`} onClick={() => setLoginTab('find')}>아이디/비밀번호 찾기</button>
              </div>
            </div>
            <div className="lm-body">
              {loginTab === 'login' ? (
                <>
                  <button className="lm-kakao" onClick={handleLogin}>
                    <span style={{fontWeight:800,fontSize:'15px'}}>K</span>
                    카카오로 시작하기
                  </button>
                  <div className="lm-divider">또는 이메일로 로그인</div>
                  <input className="lm-inp" type="email" placeholder="이메일 주소"
                    value={email} onChange={e => setEmail(e.target.value)}/>
                  <input className="lm-inp" type="password" placeholder="비밀번호"
                    value={pw} onChange={e => setPw(e.target.value)}
                    onKeyDown={e => e.key==='Enter' && handleLogin()}/>
                  <button className="lm-btn" onClick={handleLogin}>로그인</button>
                  <div className="lm-links">
                    <a onClick={() => setLoginTab('find')}>아이디 찾기</a>
                    <span style={{color:'#e8e8e8'}}>|</span>
                    <a onClick={() => setLoginTab('find')}>비밀번호 찾기</a>
                  </div>
                  <div className="lm-signup">
                    아직 회원이 아니신가요?{' '}
                    <a href="/signup" onClick={closeLogin}>회원가입</a>
                  </div>
                </>
              ) : (
                <>
                  <div style={{fontSize:'13px',color:'#666',marginBottom:'20px',lineHeight:1.7}}>
                    가입 시 입력한 이메일로 임시 비밀번호를 보내드려요.
                  </div>
                  <input className="lm-inp" type="email" placeholder="가입한 이메일 주소"/>
                  <button className="lm-btn">인증 메일 보내기</button>
                  <div className="lm-links" style={{marginTop:'14px'}}>
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

// 로그인 후 유저 드롭다운 컴포넌트
function UserMenu({ name, onLogout }: { name: string, onLogout: () => void }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="user-menu-wrap">
      <button className="user-menu-btn" onClick={() => setOpen(!open)}>
        <div className="user-avatar">{name.charAt(0)}</div>
        <div style={{display:'flex',flexDirection:'column',alignItems:'flex-start',gap:'1px'}}>
          <span style={{fontSize:'11px',fontWeight:500,color:'#111'}}>{name}님</span>
          <span style={{fontSize:'10px',color:'#B08D57'}}>골드 2,400P</span>
        </div>
      </button>
      {open && (
        <>
          <div style={{position:'fixed',inset:0,zIndex:590}} onClick={() => setOpen(false)}/>
          <div className="user-dropdown">
            <a href="/mypage" className="ud-item" onClick={() => setOpen(false)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              마이페이지
            </a>
            <a href="/mypage" className="ud-item" onClick={() => setOpen(false)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
              주문 내역
            </a>
            <a href="/mypage" className="ud-item" onClick={() => setOpen(false)}>
              <span style={{fontSize:'12px'}}>📦</span>
              피팅 현황
            </a>
            <a href="/withy" className="ud-item" onClick={() => setOpen(false)}>
              <span style={{fontSize:'12px'}}>💛</span>
              위디 2,400P
            </a>
            <div className="ud-item red" onClick={() => { setOpen(false); onLogout() }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              로그아웃
            </div>
          </div>
        </>
      )}
    </div>
  )
}
