// @ts-nocheck
'use client'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

/* 역할: 'clyq' = CLYQ 관리자 | 'brand' = 브랜드 파트너 */
const ROLE = 'clyq' // 실제 구현 시 로그인 세션에서 가져옴

const clyqMenus = [
  {
    id:'dashboard', label:'대시보드', icon:'▦', href:'/admin', children:[],
  },
  {
    id:'fitting_product', label:'피팅박스 제품', icon:'📦',
    badge:'CLYQ 전용', badgeColor:'#C94E1A',
    children:[
      { group:'', items:[
        { label:'피팅 제품 등록', href:'/admin/fitting-products/new' },
        { label:'피팅 제품 목록', href:'/admin/fitting-products' },
        { label:'피팅 현황 관리', href:'/admin/fitting-products/status' },
        { label:'반납 검수', href:'/admin/fitting-products/inspection' },
        { label:'훼손 · 패널티 내역', href:'/admin/fitting-products/penalty' },
      ]},
    ],
  },
  {
    id:'product', label:'일반 상품 관리', icon:'🏷',
    children:[
      { group:'', items:[
        { label:'전체 상품 목록', href:'/admin/products' },
        { label:'상품 승인 관리', href:'/admin/products/pending' },
        { label:'재고관리', href:'/admin/products/stock' },
        { label:'리뷰 관리', href:'/admin/products/reviews' },
        { label:'Q&A 관리', href:'/admin/products/qna' },
      ]},
    ],
  },
  {
    id:'order', label:'주문관리', icon:'🛍',
    children:[
      { group:'주문', items:[
        { label:'전체 주문 조회', href:'/admin/orders' },
        { label:'결제 완료', href:'/admin/orders/paid' },
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
    id:'member', label:'회원관리', icon:'👤',
    children:[
      { group:'', items:[
        { label:'회원 목록', href:'/admin/members' },
        { label:'등급 관리', href:'/admin/members/grade' },
        { label:'위디 적립 내역', href:'/admin/members/withy' },
        { label:'위디 사용 내역', href:'/admin/members/withy/usage' },
      ]},
    ],
  },
  {
    id:'content', label:'콘텐츠 관리', icon:'📝',
    children:[
      { group:'', items:[
        { label:'배너 · 기획전', href:'/admin/content/banner' },
        { label:'매거진 관리', href:'/admin/content/magazine' },
        { label:'커뮤니티 관리', href:'/admin/content/community' },
      ]},
    ],
  },
  {
    id:'settlement', label:'정산관리', icon:'💰',
    children:[
      { group:'', items:[
        { label:'정산 내역', href:'/admin/settlement' },
        { label:'브랜드별 정산', href:'/admin/settlement/brand' },
        { label:'쿠폰 사용 내역', href:'/admin/settlement/coupon' },
        { label:'부가세 신고자료', href:'/admin/settlement/tax' },
      ]},
    ],
  },
  {
    id:'marketing', label:'마케팅', icon:'📣',
    children:[
      { group:'', items:[
        { label:'쿠폰 관리', href:'/admin/marketing/coupon' },
        { label:'이벤트 관리', href:'/admin/marketing/event' },
        { label:'AI 추천 설정', href:'/admin/marketing/ai' },
        { label:'푸시 알림', href:'/admin/marketing/push' },
      ]},
    ],
  },
  {
    id:'system', label:'시스템', icon:'⚙',
    children:[
      { group:'', items:[
        { label:'관리자 계정', href:'/admin/system/accounts' },
        { label:'브랜드 파트너 관리', href:'/admin/system/brands' },
        { label:'공지사항', href:'/admin/system/notice' },
        { label:'약관 관리', href:'/admin/system/terms' },
        { label:'접속 로그', href:'/admin/system/logs' },
      ]},
    ],
  },
]

const brandMenus = [
  {
    id:'dashboard', label:'대시보드', icon:'▦', href:'/admin', children:[],
  },
  {
    id:'my_product', label:'내 상품 관리', icon:'🏷',
    children:[
      { group:'', items:[
        { label:'상품 등록', href:'/admin/products/new' },
        { label:'내 상품 목록', href:'/admin/products/my' },
        { label:'재고관리', href:'/admin/products/stock' },
        { label:'리뷰 관리', href:'/admin/products/reviews' },
        { label:'Q&A 관리', href:'/admin/products/qna' },
      ]},
    ],
  },
  {
    /* 브랜드: 피팅 제품은 열람만 */
    id:'fitting_product', label:'피팅박스 제품', icon:'📦',
    badge:'열람만', badgeColor:'#6b7280',
    readOnly: true,
    children:[
      { group:'', items:[
        { label:'피팅 제품 목록 (내 브랜드)', href:'/admin/fitting-products/my' },
        { label:'피팅 현황', href:'/admin/fitting-products/status' },
      ]},
    ],
  },
  {
    id:'order', label:'주문관리', icon:'🛍',
    children:[
      { group:'', items:[
        { label:'내 브랜드 주문 조회', href:'/admin/orders/my' },
        { label:'배송중', href:'/admin/orders/shipping' },
        { label:'배송완료', href:'/admin/orders/delivered' },
        { label:'취소·반품·교환', href:'/admin/orders/claims' },
      ]},
    ],
  },
  {
    id:'settlement', label:'정산관리', icon:'💰',
    children:[
      { group:'', items:[
        { label:'내 정산 내역', href:'/admin/settlement/my' },
        { label:'쿠폰 사용 내역', href:'/admin/settlement/coupon' },
      ]},
    ],
  },
  {
    id:'cs', label:'문의 관리', icon:'💬',
    children:[
      { group:'', items:[
        { label:'고객 Q&A', href:'/admin/cs/qna' },
        { label:'1:1 문의', href:'/admin/cs/inquiry' },
      ]},
    ],
  },
]

const menus = ROLE === 'clyq' ? clyqMenus : brandMenus

export default function AdminLayout({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const [openMenus, setOpenMenus] = useState(['fitting_product','dashboard'])
  const [mobileOpen, setMobileOpen] = useState(false)

  function toggle(id) {
    setOpenMenus(prev => prev.includes(id) ? prev.filter(m=>m!==id) : [...prev, id])
  }

  const isActive = (href) => href && pathname === href

  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#f5f6fa',fontFamily:"'Pretendard','Noto Sans KR',sans-serif"}}>
      <style>{`
        * { box-sizing:border-box; }
        /* 사이드바 */
        .adm-side {
          width:210px; background:#1a1a2e; display:flex; flex-direction:column;
          position:fixed; top:0; left:0; height:100vh; overflow-y:auto;
          scrollbar-width:thin; scrollbar-color:rgba(255,255,255,0.1) transparent; z-index:300;
          transition:transform 0.25s;
        }
        .adm-side::-webkit-scrollbar { width:3px; }
        .adm-side::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.1); border-radius:2px; }
        .adm-logo { padding:18px 18px 14px; border-bottom:1px solid rgba(255,255,255,0.08); flex-shrink:0; }
        .adm-logo-brand { font-size:9px; letter-spacing:2px; color:rgba(255,255,255,0.4); font-weight:500; margin-bottom:4px; }
        .adm-logo-name { font-size:20px; font-weight:700; letter-spacing:4px; color:#fff; }
        .adm-logo-name span { color:#C94E1A; }
        .adm-logo-role { display:inline-block; font-size:9px; font-weight:700; padding:2px 7px; border-radius:3px; margin-top:6px; }
        .adm-role-clyq { background:rgba(201,78,26,0.25); color:#ff8c5a; }
        .adm-role-brand { background:rgba(255,255,255,0.1); color:rgba(255,255,255,0.6); }
        .menu-item { border-bottom:1px solid rgba(255,255,255,0.04); }
        .menu-header {
          display:flex; align-items:center; justify-content:space-between;
          padding:12px 16px; cursor:pointer; font-size:13px; font-weight:600;
          color:rgba(255,255,255,0.7); transition:all 0.15s; user-select:none;
        }
        .menu-header:hover { background:rgba(255,255,255,0.06); color:#fff; }
        .menu-header.active-parent { color:#ff8c5a; }
        .menu-header-left { display:flex; align-items:center; gap:8px; }
        .menu-icon { font-size:13px; width:18px; text-align:center; }
        .menu-badge { font-size:9px; font-weight:700; padding:2px 6px; border-radius:3px; flex-shrink:0; }
        .menu-arrow { font-size:10px; color:rgba(255,255,255,0.3); transition:transform 0.2s; }
        .menu-arrow.open { transform:rotate(180deg); }
        .menu-children { background:rgba(0,0,0,0.2); }
        .menu-group-label { font-size:10px; color:rgba(255,255,255,0.3); font-weight:500; letter-spacing:0.5px; padding:10px 16px 3px 42px; }
        .menu-link {
          display:flex; align-items:center; justify-content:space-between;
          padding:8px 14px 8px 42px; font-size:12px; color:rgba(255,255,255,0.5);
          text-decoration:none; cursor:pointer; transition:all 0.12s; font-weight:400;
        }
        .menu-link:hover { background:rgba(255,255,255,0.06); color:rgba(255,255,255,0.85); }
        .menu-link.active { color:#C94E1A; background:rgba(201,78,26,0.12); font-weight:600; }
        .menu-link.readonly-link { color:rgba(255,255,255,0.35); }
        .menu-link.readonly-link:hover { color:rgba(255,255,255,0.5); background:rgba(255,255,255,0.03); }
        .ro-badge { font-size:9px; color:rgba(255,255,255,0.3); background:rgba(255,255,255,0.08); padding:1px 5px; border-radius:2px; }
        .menu-dash-single {
          display:flex; align-items:center; gap:8px; padding:12px 16px;
          cursor:pointer; font-size:13px; font-weight:600;
          color:rgba(255,255,255,0.7); transition:all 0.15s;
        }
        .menu-dash-single:hover { background:rgba(255,255,255,0.06); color:#fff; }
        .menu-dash-single.active { color:#C94E1A; background:rgba(201,78,26,0.12); }
        /* 상단 헤더 */
        .adm-header {
          position:fixed; top:0; left:210px; right:0; height:50px;
          background:#fff; border-bottom:1px solid #e8e8eb;
          display:flex; align-items:center; justify-content:space-between;
          padding:0 24px; z-index:200;
        }
        /* 본문 */
        .adm-body { margin-left:210px; margin-top:50px; padding:24px; min-height:calc(100vh - 50px); }
        /* 모바일 */
        .adm-overlay { display:none; position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:299; }
        .adm-hamb { display:none; }
        @media (max-width:768px) {
          .adm-side { transform:translateX(-210px); }
          .adm-side.mob-open { transform:translateX(0); }
          .adm-header { left:0; }
          .adm-body { margin-left:0; padding:16px; }
          .adm-overlay.show { display:block; }
          .adm-hamb { display:flex; }
        }
      `}</style>

      {/* 사이드바 */}
      <aside className={`adm-side ${mobileOpen?'mob-open':''}`}>
        {/* 로고 */}
        <div className="adm-logo">
          <div className="adm-logo-brand">CLYQ ADMIN CONSOLE</div>
          <div className="adm-logo-name">CLY<span>Q</span></div>
          <div className={`adm-logo-role ${ROLE==='clyq'?'adm-role-clyq':'adm-role-brand'}`}>
            {ROLE === 'clyq' ? '🔑 CLYQ 관리자' : '🏷 MARCIA (브랜드)'}
          </div>
        </div>

        {/* 메뉴 */}
        <div style={{flex:1}}>
          {menus.map(menu => (
            <div key={menu.id} className="menu-item">
              {menu.children.length === 0 ? (
                <div className={`menu-dash-single ${isActive(menu.href)?'active':''}`}
                  onClick={() => { router.push(menu.href); setMobileOpen(false) }}>
                  <span className="menu-icon">{menu.icon}</span>
                  {menu.label}
                </div>
              ) : (
                <>
                  <div className={`menu-header ${menu.children.some(g=>g.items.some(i=>isActive(i.href)))?'active-parent':''}`}
                    onClick={() => toggle(menu.id)}>
                    <div className="menu-header-left">
                      <span className="menu-icon">{menu.icon}</span>
                      {menu.label}
                      {menu.badge && (
                        <span className="menu-badge"
                          style={{background: menu.badgeColor+'33', color: menu.badgeColor}}>
                          {menu.badge}
                        </span>
                      )}
                    </div>
                    <span className={`menu-arrow ${openMenus.includes(menu.id)?'open':''}`}>▾</span>
                  </div>
                  {openMenus.includes(menu.id) && (
                    <div className="menu-children">
                      {menu.readOnly && (
                        <div style={{padding:'8px 14px 4px 42px',fontSize:'10px',color:'rgba(255,255,255,0.3)',display:'flex',alignItems:'center',gap:'5px'}}>
                          <span>👁</span> 열람 전용 — 수정 불가
                        </div>
                      )}
                      {menu.children.map((group, gi) => (
                        <div key={gi}>
                          {group.group && <div className="menu-group-label">{group.group}</div>}
                          {group.items.map(item => (
                            <a key={item.href} href={item.href}
                              className={`menu-link ${isActive(item.href)?'active':''} ${menu.readOnly?'readonly-link':''}`}
                              onClick={() => setMobileOpen(false)}>
                              {item.label}
                              {menu.readOnly && <span className="ro-badge">열람</span>}
                            </a>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {/* 하단 로그아웃 */}
        <div style={{padding:'14px 16px',borderTop:'1px solid rgba(255,255,255,0.06)',fontSize:'12px',color:'rgba(255,255,255,0.3)',cursor:'pointer',display:'flex',alignItems:'center',gap:'6px',flexShrink:0}}
          onClick={() => router.push('/')}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          로그아웃
        </div>
      </aside>

      {/* 모바일 오버레이 */}
      <div className={`adm-overlay ${mobileOpen?'show':''}`} onClick={() => setMobileOpen(false)}/>

      {/* 상단 헤더 */}
      <header className="adm-header">
        <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
          <button className="adm-hamb" onClick={() => setMobileOpen(!mobileOpen)}
            style={{background:'none',border:'none',cursor:'pointer',display:'flex',flexDirection:'column',gap:'4px',padding:'4px'}}>
            <div style={{width:'18px',height:'2px',background:'#666'}}/>
            <div style={{width:'18px',height:'2px',background:'#666'}}/>
            <div style={{width:'18px',height:'2px',background:'#666'}}/>
          </button>
          <span style={{fontSize:'12px',color:'#999'}}>
            {new Date().toLocaleDateString('ko-KR',{year:'numeric',month:'long',day:'numeric',weekday:'short'})}
          </span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
          {/* 알림 */}
          <div style={{position:'relative',cursor:'pointer'}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>
            </svg>
            <div style={{position:'absolute',top:'-2px',right:'-2px',width:'7px',height:'7px',borderRadius:'50%',background:'#e74c3c'}}/>
          </div>
          {/* 유저 */}
          <div style={{display:'flex',alignItems:'center',gap:'7px',fontSize:'13px',color:'#333',fontWeight:500}}>
            <div style={{width:'28px',height:'28px',borderRadius:'50%',background:ROLE==='clyq'?'#C94E1A':'#1a1a2e',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px',fontWeight:700}}>
              {ROLE==='clyq'?'관':'M'}
            </div>
            {ROLE==='clyq'?'CLYQ 관리자':'MARCIA 담당자'}
          </div>
        </div>
      </header>

      {/* 본문 */}
      <main className="adm-body">{children}</main>
    </div>
  )
}
