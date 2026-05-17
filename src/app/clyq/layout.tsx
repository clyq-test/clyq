// @ts-nocheck
'use client'
import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

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
      { label:'접속 로그', href:'/clyq/system/logs' },
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
    <div style={{ display:'flex', minHeight:'100vh', background:'#f0f2f5', fontFamily:"'Pretendard','Noto Sans KR',sans-serif" }}>
      <style>{`
        * { box-sizing:border-box; }
        .cq-side {
          width:210px; background:#0f1623; display:flex; flex-direction:column;
          position:fixed; top:0; left:0; height:100vh; overflow-y:auto;
          scrollbar-width:thin; scrollbar-color:rgba(255,255,255,0.08) transparent;
          z-index:300; transition:transform 0.25s;
        }
        .cq-side::-webkit-scrollbar { width:3px; }
        .cq-side::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.08); border-radius:2px; }
        .cq-logo { padding:18px 18px 14px; border-bottom:1px solid rgba(255,255,255,0.06); flex-shrink:0; }
        .cq-logo-con { font-size:9px; letter-spacing:2px; color:rgba(255,255,255,0.3); font-weight:500; margin-bottom:4px; }
        .cq-logo-name { font-size:22px; font-weight:800; letter-spacing:4px; color:#fff; }
        .cq-logo-q { color:#C94E1A; }
        .cq-logo-role { display:inline-block; font-size:9px; font-weight:700; padding:3px 8px; border-radius:3px; margin-top:8px; background:rgba(201,78,26,0.3); color:#ff8c5a; letter-spacing:0.5px; }
        .cq-menu-item { border-bottom:1px solid rgba(255,255,255,0.03); }
        .cq-menu-header { display:flex; align-items:center; justify-content:space-between; padding:11px 16px; cursor:pointer; font-size:12px; font-weight:600; color:rgba(255,255,255,0.55); transition:all 0.15s; user-select:none; }
        .cq-menu-header:hover { background:rgba(255,255,255,0.05); color:#fff; }
        .cq-menu-header.ap { color:#ff8c5a; }
        .cq-menu-arrow { font-size:9px; color:rgba(255,255,255,0.2); transition:transform 0.2s; display:inline-block; }
        .cq-menu-arrow.open { transform:rotate(180deg); }
        .cq-menu-sub { background:rgba(0,0,0,0.2); }
        .cq-menu-link { display:flex; align-items:center; justify-content:space-between; padding:8px 16px 8px 24px; font-size:12px; color:rgba(255,255,255,0.4); text-decoration:none; transition:all 0.12s; cursor:pointer; }
        .cq-menu-link:hover { background:rgba(255,255,255,0.04); color:rgba(255,255,255,0.75); }
        .cq-menu-link.active { color:#C94E1A; background:rgba(201,78,26,0.12); font-weight:600; }
        .cq-menu-single { display:flex; align-items:center; padding:11px 16px; cursor:pointer; font-size:12px; font-weight:600; color:rgba(255,255,255,0.55); transition:all 0.15s; }
        .cq-menu-single:hover { background:rgba(255,255,255,0.05); color:#fff; }
        .cq-menu-single.active { color:#C94E1A; background:rgba(201,78,26,0.12); }
        .cq-header { position:fixed; top:0; left:210px; right:0; height:50px; background:#fff; border-bottom:1px solid #e8e8eb; display:flex; align-items:center; justify-content:space-between; padding:0 24px; z-index:200; }
        .cq-body { margin-left:210px; margin-top:50px; padding:28px; min-height:calc(100vh - 50px); }
        .cq-overlay { display:none; position:fixed; inset:0; background:rgba(0,0,0,0.4); z-index:299; }
        .cq-overlay.show { display:block; }
        .cq-hamb { display:none; background:none; border:none; cursor:pointer; padding:4px; }
        .cq-ham-bar { display:block; width:18px; height:2px; background:#666; border-radius:1px; margin-bottom:4px; }
        .cq-ham-bar:last-child { margin-bottom:0; }
        @media (max-width:768px) {
          .cq-side { transform:translateX(-210px); }
          .cq-side.mob-open { transform:translateX(0); }
          .cq-header { left:0; }
          .cq-body { margin-left:0; padding:16px; }
          .cq-hamb { display:block; }
        }
      `}</style>

      {/* 사이드바 */}
      <aside className={sideClass}>
        <div className="cq-logo">
          <div className="cq-logo-con">CLYQ HQ CONSOLE</div>
          <div className="cq-logo-name">CLY<span className="cq-logo-q">Q</span></div>
          <div className="cq-logo-role">본사 관리자</div>
        </div>

        <div style={{ flex:1 }}>
          {menus.map(menu => {
            const hasChildren  = menu.children && menu.children.length > 0
            const isOpen       = openMenus.includes(menu.id)
            const hasActiveChild = hasChildren && menu.children.some(g => g.items.some(i => isActive(i.href)))
            const headerClass  = hasActiveChild ? 'cq-menu-header ap' : 'cq-menu-header'
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
                              const linkClass = isActive(item.href) ? 'cq-menu-link active' : 'cq-menu-link'
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
          style={{ padding:'14px 16px', borderTop:'1px solid rgba(255,255,255,0.05)', fontSize:'12px', color:'rgba(255,255,255,0.3)', cursor:'pointer', flexShrink:0 }}
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
          <span style={{ fontSize:'12px', color:'#aaa' }}>{today}</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
          <span style={{ fontSize:'12px', color:'#888', cursor:'pointer' }}>알림</span>
          <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
            <div style={{ width:'28px', height:'28px', borderRadius:'50%', background:'#C94E1A', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', fontWeight:700 }}>
              관
            </div>
            <span style={{ fontSize:'13px', color:'#333', fontWeight:600 }}>CLYQ 관리자</span>
          </div>
        </div>
      </header>

      <main className="cq-body">{children}</main>
    </div>
  )
}
