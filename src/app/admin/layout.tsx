// @ts-nocheck
'use client'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

const menus = [
  {
    id: 'dashboard',
    label: '대시보드',
    icon: '▦',
    href: '/admin',
    children: [],
  },
  {
    id: 'product',
    label: '상품관리',
    icon: '🏷',
    children: [
      { group: '상품등록', items: [
        { label: '상품 등록', href: '/admin/products/new' },
      ]},
      { group: '상품관리', items: [
        { label: '전체 상품 목록', href: '/admin/products' },
        { label: '승인 대기 상품', href: '/admin/products/pending' },
        { label: '재고관리', href: '/admin/products/stock' },
        { label: '리뷰 관리', href: '/admin/products/reviews' },
        { label: 'Q&A 관리', href: '/admin/products/qna' },
      ]},
    ],
  },
  {
    id: 'fitting',
    label: '피팅박스 관리',
    icon: '📦',
    badge: 'HOT',
    children: [
      { group: '피팅 현황', items: [
        { label: '신청 현황', href: '/admin/fitting' },
        { label: '배송 · 수거 관리', href: '/admin/fitting/delivery' },
        { label: '반납 검수', href: '/admin/fitting/inspection' },
      ]},
      { group: '패널티 관리', items: [
        { label: '훼손 · 패널티 내역', href: '/admin/fitting/penalty' },
        { label: '법적조치 관리', href: '/admin/fitting/legal' },
      ]},
    ],
  },
  {
    id: 'order',
    label: '주문관리',
    icon: '🛍',
    children: [
      { group: '주문조회', items: [
        { label: '전체 주문 조회', href: '/admin/orders' },
      ]},
      { group: '배송관리', items: [
        { label: '결제 완료 내역', href: '/admin/orders/paid' },
        { label: '상품준비중 내역', href: '/admin/orders/preparing' },
        { label: '배송중 내역', href: '/admin/orders/shipping' },
        { label: '배송완료 내역', href: '/admin/orders/delivered' },
      ]},
      { group: '클레임관리', items: [
        { label: '취소 내역', href: '/admin/orders/cancel' },
        { label: '반품 내역', href: '/admin/orders/return' },
        { label: '교환 내역', href: '/admin/orders/exchange' },
      ]},
    ],
  },
  {
    id: 'member',
    label: '회원관리',
    icon: '👤',
    children: [
      { group: '회원', items: [
        { label: '회원 목록', href: '/admin/members' },
        { label: '등급 관리', href: '/admin/members/grade' },
      ]},
      { group: '위디 포인트', items: [
        { label: '적립 내역', href: '/admin/members/withy' },
        { label: '사용 내역', href: '/admin/members/withy/usage' },
        { label: '등급별 현황', href: '/admin/members/withy/grade' },
      ]},
    ],
  },
  {
    id: 'content',
    label: '콘텐츠 관리',
    icon: '📝',
    children: [
      { group: '편집', items: [
        { label: '배너 · 기획전 관리', href: '/admin/content/banner' },
        { label: '매거진 관리', href: '/admin/content/magazine' },
        { label: '커뮤니티 관리', href: '/admin/content/community' },
      ]},
    ],
  },
  {
    id: 'settlement',
    label: '정산관리',
    icon: '💰',
    children: [
      { group: '', items: [
        { label: '정산 내역', href: '/admin/settlement' },
        { label: '브랜드별 정산', href: '/admin/settlement/brand' },
        { label: '부가세 신고자료', href: '/admin/settlement/tax' },
        { label: '쿠폰 사용 내역', href: '/admin/settlement/coupon' },
      ]},
    ],
  },
  {
    id: 'marketing',
    label: '마케팅 관리',
    icon: '📣',
    children: [
      { group: '', items: [
        { label: '쿠폰 관리', href: '/admin/marketing/coupon' },
        { label: '이벤트 관리', href: '/admin/marketing/event' },
        { label: '푸시 알림 관리', href: '/admin/marketing/push' },
        { label: 'AI 추천 설정', href: '/admin/marketing/ai' },
      ]},
    ],
  },
  {
    id: 'system',
    label: '시스템 관리',
    icon: '⚙',
    children: [
      { group: '', items: [
        { label: '관리자 계정', href: '/admin/system/accounts' },
        { label: '공지사항 관리', href: '/admin/system/notice' },
        { label: '약관 관리', href: '/admin/system/terms' },
        { label: '접속 로그', href: '/admin/system/logs' },
      ]},
    ],
  },
]

export default function AdminLayout({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const [openMenus, setOpenMenus] = useState(['dashboard','fitting'])
  const [sidebarOpen, setSidebarOpen] = useState(true)

  function toggleMenu(id) {
    setOpenMenus(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    )
  }

  const isActive = (href) => pathname === href

  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#f5f6fa',fontFamily:"'Pretendard','Noto Sans KR',sans-serif"}}>
      <style>{`
        * { box-sizing:border-box; margin:0; padding:0; }
        /* 사이드바 */
        .adm-side {
          width:200px; background:#fff; border-right:1px solid #e8e8eb;
          display:flex; flex-direction:column; position:fixed; top:0; left:0;
          height:100vh; overflow-y:auto; scrollbar-width:none; z-index:200;
          transition:width 0.25s;
        }
        .adm-side::-webkit-scrollbar { display:none; }
        .adm-logo {
          padding:20px 20px 16px; border-bottom:1px solid #f0f0f2;
          font-size:18px; font-weight:700; letter-spacing:3px; color:#111;
          display:flex; align-items:center; justify-content:space-between; flex-shrink:0;
        }
        .adm-logo span { color:#C94E1A; }
        .adm-logo-sub { font-size:9px; color:#999; font-weight:400; letter-spacing:1px; margin-top:2px; }
        .menu-item {
          border-bottom:1px solid #f5f5f7;
        }
        .menu-header {
          display:flex; align-items:center; justify-content:space-between;
          padding:14px 18px; cursor:pointer; font-size:14px; font-weight:600;
          color:#1a1a2e; transition:background 0.15s; user-select:none;
        }
        .menu-header:hover { background:#fafafa; }
        .menu-header-left { display:flex; align-items:center; gap:8px; }
        .menu-icon { font-size:14px; width:20px; text-align:center; }
        .menu-badge { font-size:9px; background:#C94E1A; color:#fff; padding:1px 5px; border-radius:3px; font-weight:700; }
        .menu-arrow { font-size:11px; color:#ccc; transition:transform 0.2s; }
        .menu-arrow.open { transform:rotate(180deg); }
        .menu-children { background:#fafafa; border-top:1px solid #f0f0f2; }
        .menu-group-label { font-size:11px; color:#aaa; font-weight:500; letter-spacing:0.5px; padding:10px 18px 4px; }
        .menu-link {
          display:block; padding:9px 18px 9px 46px; font-size:13px; color:#555;
          text-decoration:none; cursor:pointer; transition:all 0.12s; font-weight:400;
        }
        .menu-link:hover { background:#f0f0f2; color:#111; }
        .menu-link.active { color:#C94E1A; font-weight:600; background:#fff5f2; }
        .menu-dash { padding:9px 18px 9px 46px; font-size:13px; color:#555; cursor:pointer; transition:all 0.12s; }
        .menu-dash:hover { background:#f0f0f2; color:#111; }
        .menu-dash.active { color:#C94E1A; font-weight:600; }

        /* 상단 헤더 */
        .adm-header {
          position:fixed; top:0; left:200px; right:0; height:52px;
          background:#fff; border-bottom:1px solid #e8e8eb;
          display:flex; align-items:center; justify-content:space-between;
          padding:0 28px; z-index:100;
        }
        .adm-header-left { display:flex; align-items:center; gap:16px; }
        .adm-header-right { display:flex; align-items:center; gap:12px; }
        .adm-notif { position:relative; cursor:pointer; }
        .adm-notif-dot { position:absolute; top:-2px; right:-2px; width:7px; height:7px; border-radius:50%; background:#e74c3c; }

        /* 본문 */
        .adm-main {
          margin-left:200px; margin-top:52px;
          padding:28px; min-height:calc(100vh - 52px);
        }

        /* 모바일 */
        @media (max-width:768px) {
          .adm-side { width:200px; transform:translateX(-200px); transition:transform 0.25s; }
          .adm-side.open { transform:translateX(0); }
          .adm-header { left:0; }
          .adm-main { margin-left:0; padding:16px; }
          .adm-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.4); z-index:199; display:none; }
          .adm-overlay.show { display:block; }
        }
      `}</style>

      {/* 사이드바 */}
      <aside className={`adm-side ${sidebarOpen ? 'open' : ''}`}>
        <div className="adm-logo">
          <div>
            <div>CLY<span>Q</span></div>
            <div className="adm-logo-sub">ADMIN CONSOLE</div>
          </div>
          <button onClick={() => setSidebarOpen(false)}
            style={{background:'none',border:'none',cursor:'pointer',fontSize:'16px',color:'#ccc',display:'none'}}
            className="adm-close-btn">✕</button>
        </div>

        {menus.map(menu => (
          <div key={menu.id} className="menu-item">
            {menu.children.length === 0 ? (
              /* 대시보드처럼 자식 없는 메뉴 */
              <div className={`menu-header ${isActive(menu.href) ? 'active' : ''}`}
                style={{color: isActive(menu.href) ? '#C94E1A' : undefined}}
                onClick={() => router.push(menu.href)}>
                <div className="menu-header-left">
                  <span className="menu-icon">{menu.icon}</span>
                  {menu.label}
                  {menu.badge && <span className="menu-badge">{menu.badge}</span>}
                </div>
              </div>
            ) : (
              <>
                <div className="menu-header" onClick={() => toggleMenu(menu.id)}>
                  <div className="menu-header-left">
                    <span className="menu-icon">{menu.icon}</span>
                    {menu.label}
                    {menu.badge && <span className="menu-badge">{menu.badge}</span>}
                  </div>
                  <span className={`menu-arrow ${openMenus.includes(menu.id) ? 'open' : ''}`}>▾</span>
                </div>
                {openMenus.includes(menu.id) && (
                  <div className="menu-children">
                    {menu.children.map((group, gi) => (
                      <div key={gi}>
                        {group.group && <div className="menu-group-label">{group.group}</div>}
                        {group.items.map(item => (
                          <a key={item.href} href={item.href}
                            className={`menu-link ${isActive(item.href) ? 'active' : ''}`}>
                            {item.label}
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

        {/* 로그아웃 */}
        <div style={{marginTop:'auto',padding:'16px 18px',borderTop:'1px solid #f0f0f2',fontSize:'12px',color:'#999',cursor:'pointer',display:'flex',alignItems:'center',gap:'6px'}}
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
      <div className={`adm-overlay ${sidebarOpen ? 'show' : ''}`}
        onClick={() => setSidebarOpen(false)}/>

      {/* 상단 헤더 */}
      <header className="adm-header">
        <div className="adm-header-left">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{background:'none',border:'none',cursor:'pointer',display:'flex',flexDirection:'column',gap:'4px',padding:'4px'}}>
            <div style={{width:'18px',height:'2px',background:'#666'}}/>
            <div style={{width:'18px',height:'2px',background:'#666'}}/>
            <div style={{width:'18px',height:'2px',background:'#666'}}/>
          </button>
          <span style={{fontSize:'13px',color:'#999'}}>
            {new Date().toLocaleDateString('ko-KR', {month:'long',day:'numeric',weekday:'short'})}
          </span>
        </div>
        <div className="adm-header-right">
          <div className="adm-notif" title="알림">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/>
            </svg>
            <div className="adm-notif-dot"/>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'6px',fontSize:'13px',color:'#333',fontWeight:500}}>
            <div style={{width:'28px',height:'28px',borderRadius:'50%',background:'#C94E1A',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'12px',fontWeight:700}}>관</div>
            관리자
          </div>
        </div>
      </header>

      {/* 본문 */}
      <main className="adm-main">
        {children}
      </main>
    </div>
  )
}
