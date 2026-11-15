// @ts-nocheck
'use client'
import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { AD_CSS } from '../lib/adminCss'

const READY_OLD = ['/clyq','/clyq/fitting','/clyq/fitting/inspection','/clyq/fitting/penalty','/clyq/fitting/products','/clyq/brands','/clyq/brands/status','/clyq/brands/approval']
const menus = [
  { id:'dashboard', label:'대시보드', href:'/clyq', children:[] },
  {
    id:'fitting', label:'피팅박스 관리',
    children:[{ group:'', items:[
      { label:'전체 피팅 현황', href:'/clyq/fitting' },
      { label:'반납 검수', href:'/clyq/fitting/inspection' },
      { label:'훼손 패널티', href:'/clyq/fitting/penalty' },
      { label:'피팅 제품 목록', href:'/clyq/fitting/products' },
    ]}],
  },
  {
    id:'brand', label:'브랜드 관리',
    children:[{ group:'', items:[
      { label:'브랜드 목록', href:'/clyq/brands' },
      { label:'브랜드별 현황', href:'/clyq/brands/status' },
      { label:'상품 승인 관리', href:'/clyq/brands/approval' },
    ]}],
  },
  {
    id:'order', label:'주문 관리',
    children:[{ group:'', items:[
      { label:'전체 주문 조회', href:'/clyq/orders' },
      { label:'배송 관리', href:'/clyq/orders/shipping' },
      { label:'취소 반품 교환', href:'/clyq/orders/claims' },
    ]}],
  },
  {
    id:'member', label:'회원 관리',
    children:[{ group:'', items:[
      { label:'회원 목록', href:'/clyq/members' },
      { label:'위디 적립 내역', href:'/clyq/members/withy' },
    ]}],
  },
  {
    id:'settlement', label:'정산 관리',
    children:[{ group:'', items:[
      { label:'브랜드별 정산', href:'/clyq/settlement' },
      { label:'부가세 신고자료', href:'/clyq/settlement/tax' },
    ]}],
  },
  {
    id:'system', label:'시스템',
    children:[{ group:'', items:[
      { label:'관리자 계정', href:'/clyq/system/accounts' },
      { label:'공지사항', href:'/clyq/system/notice' },
      { label:'처리 로그', href:'/clyq/system/logs' },
    ]}],
  },
]

export default function ClyqLayout({ children }) {
  const router    = useRouter()
  const pathname  = usePathname()
  const [openMenus, setOpenMenus]   = useState(['dashboard','fitting'])
  const [mobileOpen, setMobileOpen] = useState(false)

  function toggle(id) {
    setOpenMenus(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    )
  }

  const isActive   = (href) => !!(href && pathname === href)
  const sideClass  = mobileOpen ? 'cq-side mob-open' : 'cq-side'
  const overlayClass = mobileOpen ? 'cq-overlay show' : 'cq-overlay'
  const today = new Date().toLocaleDateString('ko-KR', {
    year:'numeric', month:'long', day:'numeric', weekday:'short',
  })

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#f7f7f5', color:'#111', fontFamily:"'Pretendard','Noto Sans KR',sans-serif" }}>
      <style>{`
        * { box-sizing:border-box; }
        .cq-side { width:224px; background:#fff; border-right:1px solid #e6e6e3; display:flex; flex-direction:column; position:fixed; top:0; left:0; height:100vh; overflow-y:auto; z-index:300; transition:transform .25s; }
        .cq-logo { padding:24px 24px 20px; flex-shrink:0; }
        .cq-logo-name { font-size:22px; font-weight:800; letter-spacing:-0.02em; color:#111; }
        .cq-logo-con { font-size:12px; color:#767676; margin-top:4px; }
        .cq-menu-header, .cq-menu-single { display:flex; align-items:center; justify-content:space-between; padding:11px 24px; cursor:pointer; font-size:14px; font-weight:500; color:#111; user-select:none; }
        .cq-menu-header:hover, .cq-menu-single:hover { background:#f7f7f5; }
        .cq-menu-single.active { font-weight:700; background:#f4f4f2; }
        .cq-menu-arrow { font-size:11px; color:#767676; transition:transform .2s; }
        .cq-menu-arrow.open { transform:rotate(180deg); }
        .cq-menu-link { display:flex; align-items:center; justify-content:space-between; padding:8px 24px 8px 36px; font-size:13px; color:#555; text-decoration:none; }
        .cq-menu-link:hover { color:#111; background:#f7f7f5; }
        .cq-menu-link.active { color:#111; font-weight:700; background:#f4f4f2; }
        .cq-menu-link.soon { color:#a0a0a0; cursor:default; }
        .cq-menu-link.soon:hover { background:none; color:#a0a0a0; }
        .cq-soon { font-size:11px; color:#767676; border:1px solid #e6e6e3; padding:1px 6px; border-radius:3px; }
        .cq-header { position:fixed; top:0; left:224px; right:0; height:56px; background:#fff; border-bottom:1px solid #e6e6e3; display:flex; align-items:center; justify-content:space-between; padding:0 32px; z-index:200; }
        .cq-body { flex:1; min-width:0; margin-left:224px; margin-top:56px; padding:32px; min-height:calc(100vh - 56px); }

        ${AD_CSS}
        .cq-overlay { display:none; position:fixed; inset:0; background:rgba(0,0,0,0.4); z-index:299; }
        .cq-overlay.show { display:block; }
        .cq-hamb { display:none; background:none; border:none; cursor:pointer; padding:8px; }
        .cq-ham-bar { display:block; width:18px; height:2px; background:#111; margin-bottom:4px; }
        .cq-ham-bar:last-child { margin-bottom:0; }
        @media (max-width:768px) {
          .cq-side { transform:translateX(-224px); }
          .cq-side.mob-open { transform:translateX(0); }
          .cq-header { left:0; padding:0 16px; }
          .cq-body { margin-left:0; padding:16px; }
          .cq-hamb { display:block; }
        }
      `}</style>

      {/* 사이드바 */}
      <aside className={sideClass}>
        <div className="cq-logo" role="link" tabIndex={0} aria-label="대시보드로 이동" style={{ cursor:'pointer' }} onClick={() => { router.push('/clyq'); setMobileOpen(false) }} onKeyDown={e => { if (e.key === 'Enter') router.push('/clyq') }}>
          <div className="cq-logo-name">CLYQ</div>
          <div className="cq-logo-con">본사 관리</div>
        </div>

        <div style={{ flex:1 }}>
          {menus.map(menu => {
            const hasChildren  = menu.children && menu.children.length > 0
            const isOpen       = openMenus.includes(menu.id)
            const hasActiveChild = hasChildren && menu.children.some(g => g.items.some(i => isActive(i.href)))
            const headerClass  = 'cq-menu-header'
            const singleClass  = isActive(menu.href) ? 'cq-menu-single active' : 'cq-menu-single'
            const arrowClass   = isOpen ? 'cq-menu-arrow open' : 'cq-menu-arrow'

            return (
              <div key={menu.id} className="cq-menu-item">
                {!hasChildren ? (
                  <div className={singleClass} onClick={() => { router.push(menu.href); setMobileOpen(false) }}>
                    {menu.label}
                  </div>
                ) : (
                  <div>
                    <div className={headerClass} onClick={() => toggle(menu.id)}>
                      {menu.label}
                      <span className={arrowClass}>▾</span>
                    </div>
                    {isOpen && (
                      <div className="cq-menu-sub">
                        {menu.children.map((group, gi) => (
                          <div key={gi}>
                            {group.items.map(item => {
                              const ready = true
                              const linkClass = isActive(item.href) ? 'cq-menu-link active' : 'cq-menu-link'
                              if (!ready) return (
                                <span key={item.href} className="cq-menu-link soon">{item.label}<span className="cq-soon">준비중</span></span>
                              )
                              return (
                                <a key={item.href} href={item.href} className={linkClass} onClick={() => setMobileOpen(false)}>
                                  {item.label}
                                </a>
                              )
                            })}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div
          style={{ padding:'16px 24px', borderTop:'1px solid #e6e6e3', fontSize:'13px', color:'#555', cursor:'pointer', flexShrink:0 }}
          onClick={() => router.push('/')}
        >
          로그아웃
        </div>
      </aside>

      <div className={overlayClass} onClick={() => setMobileOpen(false)}></div>

      {/* 헤더 */}
      <header className="cq-header">
        <div style={{ display:'flex', alignItems:'center', gap:'14px' }}>
          <button className="cq-hamb" onClick={() => setMobileOpen(v => !v)}>
            <span className="cq-ham-bar"></span>
            <span className="cq-ham-bar"></span>
            <span className="cq-ham-bar"></span>
          </button>
          <span style={{ fontSize:'13px', color:'#555' }}>{today}</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
          <span style={{ fontSize:'13px', color:'#555', cursor:'pointer' }}>알림</span>
          <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
            <div style={{ width:'28px', height:'28px', borderRadius:'50%', background:'#111', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px', fontWeight:700 }}>
              관
            </div>
            <span style={{ fontSize:'14px', color:'#111', fontWeight:500 }}>CLYQ 관리자</span>
          </div>
        </div>
      </header>

      <main className="cq-body" style={pathname === '/clyq' ? { background:'#e9ede6' } : undefined}>{children}</main>
    </div>
  )
}
