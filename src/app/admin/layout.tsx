// @ts-nocheck
'use client'
import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

const ROLE = 'brand' // 'clyq' | 'brand'

const clyqMenus = [
  { id:'dashboard', label:'대시보드', href:'/admin', children:[] },
  {
    id:'fitting', label:'피팅박스 제품', badge:'CLYQ 전용', badgeColor:'#C94E1A',
    children:[{ group:'', items:[
      { label:'피팅 제품 목록', href:'/admin/fitting-products' },
      { label:'피팅 현황 관리', href:'/admin/fitting-products/status' },
      { label:'반납 검수', href:'/admin/fitting-products/inspection' },
      { label:'훼손 패널티 내역', href:'/admin/fitting-products/penalty' },
    ]}],
  },
  {
    id:'product', label:'일반 상품 관리',
    children:[{ group:'', items:[
      { label:'전체 상품 목록', href:'/admin/products' },
      { label:'상품 승인 관리', href:'/admin/products/pending' },
      { label:'재고관리', href:'/admin/products/stock' },
      { label:'Q&A 관리', href:'/admin/products/qna' },
    ]}],
  },
  {
    id:'order', label:'주문관리',
    children:[
      { group:'주문', items:[
        { label:'전체 주문 조회', href:'/admin/orders' },
        { label:'배송중', href:'/admin/orders/shipping' },
        { label:'배송완료', href:'/admin/orders/delivered' },
      ]},
      { group:'클레임', items:[
        { label:'취소 내역', href:'/admin/orders/cancel' },
        { label:'반품 내역', href:'/admin/orders/return' },
        { label:'교환 내역', href:'/admin/orders/exchange' },
      ]},
    ],
  },
  {
    id:'member', label:'회원관리',
    children:[{ group:'', items:[
      { label:'회원 목록', href:'/admin/members' },
      { label:'등급 관리', href:'/admin/members/grade' },
      { label:'위디 적립 내역', href:'/admin/members/withy' },
    ]}],
  },
  {
    id:'content', label:'콘텐츠 관리',
    children:[{ group:'', items:[
      { label:'배너 기획전', href:'/admin/content/banner' },
      { label:'매거진 관리', href:'/admin/content/magazine' },
      { label:'커뮤니티 관리', href:'/admin/content/community' },
    ]}],
  },
  {
    id:'settlement', label:'정산관리',
    children:[{ group:'', items:[
      { label:'정산 내역', href:'/admin/settlement' },
      { label:'브랜드별 정산', href:'/admin/settlement/brand' },
      { label:'부가세 신고자료', href:'/admin/settlement/tax' },
    ]}],
  },
  {
    id:'marketing', label:'마케팅',
    children:[{ group:'', items:[
      { label:'쿠폰 관리', href:'/admin/marketing/coupon' },
      { label:'이벤트 관리', href:'/admin/marketing/event' },
      { label:'AI 추천 설정', href:'/admin/marketing/ai' },
      { label:'푸시 알림', href:'/admin/marketing/push' },
    ]}],
  },
  {
    id:'system', label:'시스템',
    children:[{ group:'', items:[
      { label:'관리자 계정', href:'/admin/system/accounts' },
      { label:'브랜드 파트너 관리', href:'/admin/system/brands' },
      { label:'공지사항', href:'/admin/system/notice' },
      { label:'접속 로그', href:'/admin/system/logs' },
    ]}],
  },
]

const brandMenus = [
  { id:'dashboard', label:'대시보드', href:'/admin', children:[] },
  {
    id:'my_product', label:'내 상품 관리',
    children:[{ group:'', items:[
      { label:'상품 등록', href:'/admin/products/new' },
      { label:'내 상품 목록', href:'/admin/products/my' },
      { label:'재고관리', href:'/admin/products/stock' },
      { label:'Q&A 관리', href:'/admin/products/qna' },
    ]}],
  },
  {
    id:'fitting', label:'피팅박스 현황', badge:'열람만', badgeColor:'#6b7280', readOnly:true,
    children:[{ group:'', items:[
      { label:'피팅 제품 (내 브랜드)', href:'/admin/fitting-products/my' },
      { label:'피팅 진행 현황', href:'/admin/fitting-products/status' },
    ]}],
  },
  {
    id:'order', label:'주문관리',
    children:[{ group:'', items:[
      { label:'주문 조회', href:'/admin/orders/my' },
      { label:'배송중', href:'/admin/orders/shipping' },
      { label:'배송완료', href:'/admin/orders/delivered' },
      { label:'취소 반품 교환', href:'/admin/orders/claims' },
    ]}],
  },
  {
    id:'settlement', label:'정산관리',
    children:[{ group:'', items:[
      { label:'정산 내역', href:'/admin/settlement/my' },
      { label:'세금계산서', href:'/admin/settlement/tax' },
    ]}],
  },
  {
    id:'cs', label:'문의 관리',
    children:[{ group:'', items:[
      { label:'고객 Q&A', href:'/admin/cs/qna' },
      { label:'1:1 문의', href:'/admin/cs/inquiry' },
    ]}],
  },
]

const menus = ROLE === 'clyq' ? clyqMenus : brandMenus

export default function AdminLayout({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const [openMenus, setOpenMenus] = useState(['dashboard'])
  const [mobileOpen, setMobileOpen] = useState(false)

  function toggle(id) {
    setOpenMenus(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    )
  }

  const isActive = (href) => !!(href && pathname === href)

  // 클래스명을 변수로 미리 계산 — JSX 내 삼항연산 복잡도 제거
  const sideClass    = mobileOpen ? 'adm-side mob-open' : 'adm-side'
  const overlayClass = mobileOpen ? 'adm-overlay show'  : 'adm-overlay'
  const roleClass    = ROLE === 'clyq' ? 'adm-role role-clyq' : 'adm-role role-brand'
  const roleLabel    = ROLE === 'clyq' ? 'CLYQ 관리자' : 'MARCIA 브랜드 파트너'
  const userLabel    = ROLE === 'clyq' ? 'CLYQ 관리자' : 'MARCIA 담당자'
  const avatarBg     = ROLE === 'clyq' ? '#C94E1A' : '#1a1a2e'
  const avatarLetter = ROLE === 'clyq' ? '관' : 'M'
  const today = new Date().toLocaleDateString('ko-KR', {
    year:'numeric', month:'long', day:'numeric', weekday:'short',
  })

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#f4f5f7', fontFamily:"'Pretendard','Noto Sans KR',sans-serif" }}>
      <style>{`
        * { box-sizing:border-box; }
        .adm-side {
          width:210px; background:#1a1a2e; display:flex; flex-direction:column;
          position:fixed; top:0; left:0; height:100vh; overflow-y:auto;
          scrollbar-width:thin; scrollbar-color:rgba(255,255,255,0.1) transparent;
          z-index:300; transition:transform 0.25s;
        }
        .adm-side::-webkit-scrollbar { width:3px; }
        .adm-side::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.1); border-radius:2px; }
        .adm-logo { padding:18px 18px 14px; border-bottom:1px solid rgba(255,255,255,0.08); flex-shrink:0; }
        .adm-logo-con { font-size:9px; letter-spacing:2px; color:rgba(255,255,255,0.35); font-weight:500; margin-bottom:4px; }
        .adm-logo-name { font-size:22px; font-weight:800; letter-spacing:4px; color:#fff; }
        .adm-logo-q { color:#C94E1A; }
        .adm-role { display:inline-block; font-size:9px; font-weight:700; padding:3px 8px; border-radius:3px; margin-top:8px; letter-spacing:0.5px; }
        .role-clyq { background:rgba(201,78,26,0.25); color:#ff8c5a; }
        .role-brand { background:rgba(255,255,255,0.1); color:rgba(255,255,255,0.55); }
        .menu-item { border-bottom:1px solid rgba(255,255,255,0.04); }
        .menu-header {
          display:flex; align-items:center; justify-content:space-between;
          padding:11px 16px; cursor:pointer; font-size:12px; font-weight:600;
          color:rgba(255,255,255,0.6); transition:all 0.15s; user-select:none;
        }
        .menu-header:hover { background:rgba(255,255,255,0.06); color:#fff; }
        .menu-header.active-parent { color:#ff8c5a; }
        .menu-badge { font-size:9px; font-weight:700; padding:2px 6px; border-radius:3px; margin-left:6px; }
        .menu-arrow { font-size:9px; color:rgba(255,255,255,0.25); transition:transform 0.2s; display:inline-block; }
        .menu-arrow.open { transform:rotate(180deg); }
        .menu-sub { background:rgba(0,0,0,0.15); }
        .menu-group-label { font-size:9px; color:rgba(255,255,255,0.25); font-weight:600; letter-spacing:1px; padding:10px 16px 3px 20px; }
        .menu-link {
          display:flex; align-items:center; justify-content:space-between;
          padding:8px 16px 8px 24px; font-size:12px; color:rgba(255,255,255,0.45);
          text-decoration:none; transition:all 0.12s; cursor:pointer;
        }
        .menu-link:hover { background:rgba(255,255,255,0.05); color:rgba(255,255,255,0.8); }
        .menu-link.active { color:#C94E1A; background:rgba(201,78,26,0.1); font-weight:600; }
        .menu-link.readonly { color:rgba(255,255,255,0.3); }
        .menu-link.readonly:hover { color:rgba(255,255,255,0.45); }
        .ro-tag { font-size:9px; color:rgba(255,255,255,0.25); background:rgba(255,255,255,0.07); padding:1px 5px; border-radius:2px; }
        .menu-single {
          display:flex; align-items:center; padding:11px 16px;
          cursor:pointer; font-size:12px; font-weight:600;
          color:rgba(255,255,255,0.6); transition:all 0.15s;
        }
        .menu-single:hover { background:rgba(255,255,255,0.06); color:#fff; }
        .menu-single.active { color:#C94E1A; background:rgba(201,78,26,0.1); }
        .adm-header {
          position:fixed; top:0; left:210px; right:0; height:50px;
          background:#fff; border-bottom:1px solid #e8e8eb;
          display:flex; align-items:center; justify-content:space-between;
          padding:0 24px; z-index:200;
        }
        .adm-body { margin-left:210px; margin-top:50px; padding:28px; min-height:calc(100vh - 50px); }
        .adm-overlay { display:none; position:fixed; inset:0; background:rgba(0,0,0,0.4); z-index:299; }
        .adm-overlay.show { display:block; }
        .adm-hamb { display:none; background:none; border:none; cursor:pointer; padding:4px; }
        .ham-bar { display:block; width:18px; height:2px; background:#666; border-radius:1px; margin-bottom:4px; }
        .ham-bar:last-child { margin-bottom:0; }
        @media (max-width:768px) {
          .adm-side { transform:translateX(-210px); }
          .adm-side.mob-open { transform:translateX(0); }
          .adm-header { left:0; }
          .adm-body { margin-left:0; padding:16px; }
          .adm-overlay.show { display:block; }
          .adm-hamb { display:block; }
        }
      `}</style>

      {/* ── 사이드바 ── */}
      <aside className={sideClass}>

        <div className="adm-logo">
          <div className="adm-logo-con">CLYQ ADMIN CONSOLE</div>
          <div className="adm-logo-name">
            CLY<span className="adm-logo-q">Q</span>
          </div>
          <div className={roleClass}>{roleLabel}</div>
        </div>

        <div style={{ flex:1 }}>
          {menus.map(menu => {
            const hasChildren = menu.children && menu.children.length > 0
            const isOpen = openMenus.includes(menu.id)
            const hasActiveChild = hasChildren &&
              menu.children.some(g => g.items.some(i => isActive(i.href)))
            const headerClass = hasActiveChild
              ? 'menu-header active-parent'
              : 'menu-header'
            const singleClass = isActive(menu.href)
              ? 'menu-single active'
              : 'menu-single'
            const arrowClass = isOpen ? 'menu-arrow open' : 'menu-arrow'

            return (
              <div key={menu.id} className="menu-item">
                {!hasChildren ? (
                  <div
                    className={singleClass}
                    onClick={() => { router.push(menu.href); setMobileOpen(false) }}
                  >
                    {menu.label}
                  </div>
                ) : (
                  <div>
                    <div className={headerClass} onClick={() => toggle(menu.id)}>
                      <div style={{ display:'flex', alignItems:'center' }}>
                        {menu.label}
                        {menu.badge && (
                          <span
                            className="menu-badge"
                            style={{ background: menu.badgeColor + '28', color: menu.badgeColor }}
                          >
                            {menu.badge}
                          </span>
                        )}
                      </div>
                      <span className={arrowClass}>▾</span>
                    </div>

                    {isOpen && (
                      <div className="menu-sub">
                        {menu.readOnly && (
                          <div style={{ padding:'7px 16px 3px 24px', fontSize:'10px', color:'rgba(255,255,255,0.25)' }}>
                            열람 전용
                          </div>
                        )}
                        {menu.children.map((group, gi) => (
                          <div key={gi}>
                            {group.group && (
                              <div className="menu-group-label">{group.group}</div>
                            )}
                            {group.items.map(item => {
                              const parts = ['menu-link']
                              if (isActive(item.href)) parts.push('active')
                              if (menu.readOnly) parts.push('readonly')
                              const linkClass = parts.join(' ')
                              return (
                                <a
                                  key={item.href}
                                  href={item.href}
                                  className={linkClass}
                                  onClick={() => setMobileOpen(false)}
                                >
                                  {item.label}
                                  {menu.readOnly && (
                                    <span className="ro-tag">열람</span>
                                  )}
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
          style={{ padding:'14px 16px', borderTop:'1px solid rgba(255,255,255,0.06)', fontSize:'12px', color:'rgba(255,255,255,0.3)', cursor:'pointer', flexShrink:0 }}
          onClick={() => router.push('/')}
        >
          로그아웃
        </div>

      </aside>

      {/* ── 모바일 오버레이 ── */}
      <div className={overlayClass} onClick={() => setMobileOpen(false)}></div>

      {/* ── 상단 헤더 ── */}
      <header className="adm-header">
        <div style={{ display:'flex', alignItems:'center', gap:'14px' }}>
          <button className="adm-hamb" onClick={() => setMobileOpen(v => !v)}>
            <span className="ham-bar"></span>
            <span className="ham-bar"></span>
            <span className="ham-bar"></span>
          </button>
          <span style={{ fontSize:'12px', color:'#aaa' }}>{today}</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
          <span style={{ fontSize:'12px', color:'#888', cursor:'pointer' }}>알림</span>
          <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
            <div style={{ width:'28px', height:'28px', borderRadius:'50%', background:avatarBg, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', fontWeight:700 }}>
              {avatarLetter}
            </div>
            <span style={{ fontSize:'13px', color:'#333', fontWeight:600 }}>{userLabel}</span>
          </div>
        </div>
      </header>

      {/* ── 본문 ── */}
      <main className="adm-body">{children}</main>

    </div>
  )
}
