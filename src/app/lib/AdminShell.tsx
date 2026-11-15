// @ts-nocheck
'use client'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { AD_CSS } from './adminCss'

// 본사·브랜드 관리페이지 공통 레이아웃. UI 사양은 여기 한 곳에서만 정의하고, 메뉴 구성/문구만 props로 받는다.
export default function AdminShell({ menus, home, subtitle, avatar, userLabel, children }) {
  const router = useRouter()
  const pathname = usePathname()
  const [openMenus, setOpenMenus] = useState([])
  const [mobileOpen, setMobileOpen] = useState(false)
  const toggle = id => setOpenMenus(prev => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id])
  const isActive = href => !!(href && pathname === href)
  const go = href => { router.push(href); setMobileOpen(false) }
  useEffect(() => {
    const ids = menus.filter(m => m.children && m.children.some(g => g.items.some(i => i.href === pathname))).map(m => m.id)
    if (ids.length) setOpenMenus(prev => [...new Set([...prev, ...ids])])
  }, [pathname])
  const [now, setNow] = useState(null)
  useEffect(() => { setNow(new Date()); const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t) }, [])
  const clock = now ? now.toLocaleString('ko-KR', { year:'numeric', month:'long', day:'numeric', weekday:'long', hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:false }) : ''

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#f7f7f5', color:'#111', fontFamily:"'Pretendard','Noto Sans KR',sans-serif" }}>
      <style>{`
        * { box-sizing:border-box; }
        .cq-side { width:224px; background:#fff; border-right:1px solid #e6e6e3; display:flex; flex-direction:column; position:fixed; top:0; left:0; height:100vh; overflow-y:auto; z-index:300; transition:transform .25s; }
        .cq-logo { padding:24px 24px 20px; flex-shrink:0; background:#0F3D2E; }
        .cq-logo-name { font-size:22px; font-weight:800; letter-spacing:-0.02em; color:#F9FCF8; }
        .cq-logo-con { font-size:13px; color:#A8D5BA; margin-top:4px; }
        .cq-menu-header, .cq-menu-single { display:flex; align-items:center; justify-content:space-between; padding:11px 24px; cursor:pointer; font-size:14px; font-weight:500; color:#111; user-select:none; }
        .cq-menu-header:hover { background:#F9FCF8; }
        .cq-menu-single { background:#E6F2EA; border-left:3px solid transparent; padding-left:21px; font-weight:700; color:#0F3D2E; } .cq-menu-single:hover { background:#d4e9db; }
        .cq-menu-single.active { background:#A8D5BA; border-left-color:#166534; }
        .cq-menu-arrow { font-size:11px; color:#767676; transition:transform .2s; } .cq-menu-arrow.open { transform:rotate(180deg); }
        .cq-menu-link { display:flex; align-items:center; justify-content:space-between; padding:8px 24px 8px 36px; font-size:13px; color:#555; text-decoration:none; }
        .cq-menu-link:hover { color:#0F3D2E; background:#F9FCF8; } .cq-menu-link.active { color:#0F3D2E; font-weight:700; background:#E6F2EA; box-shadow:inset 3px 0 0 #4C956C; }
        .cq-tag { font-size:11px; color:#767676; border:1px solid #e6e6e3; padding:1px 6px; border-radius:3px; margin-left:6px; }
        .cq-header { position:fixed; top:0; left:224px; right:0; height:56px; background:#0F3D2E; color:#E6F2EA; display:flex; align-items:center; justify-content:space-between; padding:0 32px; z-index:200; }
        .cq-body { flex:1; min-width:0; margin-left:224px; margin-top:56px; padding:32px; min-height:calc(100vh - 56px); }
        ${AD_CSS}
        .cq-overlay { display:none; position:fixed; inset:0; background:rgba(0,0,0,0.4); z-index:299; } .cq-overlay.show { display:block; }
        .cq-hamb { display:none; background:none; border:none; cursor:pointer; padding:8px; }
        .cq-ham-bar { display:block; width:18px; height:2px; background:#E6F2EA; margin-bottom:4px; } .cq-ham-bar:last-child { margin-bottom:0; }
        @media (max-width:768px) { .cq-side { transform:translateX(-224px); } .cq-side.mob-open { transform:translateX(0); } .cq-header { left:0; padding:0 16px; } .cq-body { margin-left:0; padding:16px; } .cq-hamb { display:block; } }
      `}</style>
      <aside className={mobileOpen ? 'cq-side mob-open' : 'cq-side'}>
        <div className="cq-logo" role="link" tabIndex={0} aria-label="대시보드로 이동" style={{ cursor:'pointer' }} onClick={() => go(home)} onKeyDown={e => { if (e.key === 'Enter') go(home) }}>
          <div className="cq-logo-name">CLYQ</div>
          <div className="cq-logo-con">{subtitle}</div>
        </div>
        <div style={{ flex:1 }}>
          {menus.map(menu => {
            const has = menu.children && menu.children.length > 0
            const open = openMenus.includes(menu.id)
            return (
              <div key={menu.id}>
                {!has ? (
                  <div className={isActive(menu.href) ? 'cq-menu-single active' : 'cq-menu-single'} onClick={() => go(menu.href)}>{menu.label}</div>
                ) : (
                  <div>
                    <div className="cq-menu-header" onClick={() => toggle(menu.id)}>
                      <span>{menu.label}{menu.badge && <span className="cq-tag">{menu.badge}</span>}</span>
                      <span className={open ? 'cq-menu-arrow open' : 'cq-menu-arrow'}>▾</span>
                    </div>
                    {open && menu.children.map((g, gi) => (
                      <div key={gi}>
                        {g.group && <div style={{ padding:'8px 24px 2px 36px', fontSize:'12px', color:'#767676' }}>{g.group}</div>}
                        {g.items.map(item => (
                          <a key={item.href} href={item.href} className={isActive(item.href) ? 'cq-menu-link active' : 'cq-menu-link'} onClick={e => { e.preventDefault(); go(item.href) }}>{item.label}</a>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
        <div style={{ padding:'16px 24px', borderTop:'1px solid #e6e6e3', fontSize:'13px', color:'#555', cursor:'pointer', flexShrink:0 }} onClick={() => router.push('/')}>로그아웃</div>
      </aside>
      <div className={mobileOpen ? 'cq-overlay show' : 'cq-overlay'} onClick={() => setMobileOpen(false)}></div>
      <header className="cq-header">
        <div style={{ display:'flex', alignItems:'center', gap:'14px' }}>
          <button className="cq-hamb" onClick={() => setMobileOpen(v => !v)} aria-label="메뉴"><span className="cq-ham-bar"></span><span className="cq-ham-bar"></span><span className="cq-ham-bar"></span></button>
          <span style={{ fontSize:'15px', color:'#E6F2EA', fontVariantNumeric:'tabular-nums', minWidth:'1px' }} suppressHydrationWarning>{clock}</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
          <span style={{ fontSize:'13px', color:'#A8D5BA' }}>알림</span>
          <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
            <div style={{ width:'28px', height:'28px', borderRadius:'50%', background:'#A8D5BA', color:'#0F3D2E', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px', fontWeight:700 }}>{avatar}</div>
            <span style={{ fontSize:'14px', fontWeight:500, color:'#F9FCF8' }}>{userLabel}</span>
          </div>
        </div>
      </header>
      <main className="cq-body">{children}</main>
    </div>
  )
}
