// @ts-nocheck
'use client'
import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { AD_CSS } from '../lib/adminCss'
import { BRAND } from './_brand'

const ROLE = 'brand' // 'clyq' | 'brand'

const clyqMenus = [
  { id:'dashboard', label:'대시보드', href:'/admin', children:[] },
  {
    id:'fitting', label:'피팅박스 제품', badge:'CLYQ 전용', badgeColor:'#111',
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
    id:'fitting', label:'피팅박스 현황', badge:'열람만', badgeColor:'#767676', readOnly:true,
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
  const [openMenus, setOpenMenus] = useState(['my_product', 'order'])
  const [mobileOpen, setMobileOpen] = useState(false)
  const toggle = id => setOpenMenus(prev => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id])
  const isActive = href => !!(href && pathname === href)
  const today = new Date().toLocaleDateString('ko-KR', { year:'numeric', month:'long', day:'numeric', weekday:'short' })

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#f7f7f5', color:'#111', fontFamily:"'Pretendard','Noto Sans KR',sans-serif" }}>
      <style>{`
        * { box-sizing:border-box; }
        .cq-side { width:224px; background:#fff; border-right:1px solid #e6e6e3; display:flex; flex-direction:column; position:fixed; top:0; left:0; height:100vh; overflow-y:auto; z-index:300; transition:transform .25s; }
        .cq-logo { padding:24px 24px 20px; flex-shrink:0; }
        .cq-logo-name { font-size:22px; font-weight:800; letter-spacing:-0.02em; color:#111; }
        .cq-logo-con { font-size:13px; color:#555; margin-top:4px; }
        .cq-menu-header, .cq-menu-single { display:flex; align-items:center; justify-content:space-between; padding:11px 24px; cursor:pointer; font-size:14px; font-weight:500; color:#111; user-select:none; }
        .cq-menu-header:hover, .cq-menu-single:hover { background:#f7f7f5; }
        .cq-menu-single.active { font-weight:700; background:#f4f4f2; }
        .cq-menu-arrow { font-size:11px; color:#767676; transition:transform .2s; } .cq-menu-arrow.open { transform:rotate(180deg); }
        .cq-menu-link { display:flex; align-items:center; justify-content:space-between; padding:8px 24px 8px 36px; font-size:13px; color:#555; text-decoration:none; }
        .cq-menu-link:hover { color:#111; background:#f7f7f5; } .cq-menu-link.active { color:#111; font-weight:700; background:#f4f4f2; }
        .cq-tag { font-size:11px; color:#767676; border:1px solid #e6e6e3; padding:1px 6px; border-radius:3px; margin-left:6px; }
        .cq-header { position:fixed; top:0; left:224px; right:0; height:56px; background:#fff; border-bottom:1px solid #e6e6e3; display:flex; align-items:center; justify-content:space-between; padding:0 32px; z-index:200; }
        .cq-body { flex:1; min-width:0; margin-left:224px; margin-top:56px; padding:32px; min-height:calc(100vh - 56px); }
        ${AD_CSS}
        .cq-overlay { display:none; position:fixed; inset:0; background:rgba(0,0,0,0.4); z-index:299; } .cq-overlay.show { display:block; }
        .cq-hamb { display:none; background:none; border:none; cursor:pointer; padding:8px; }
        .cq-ham-bar { display:block; width:18px; height:2px; background:#111; margin-bottom:4px; } .cq-ham-bar:last-child { margin-bottom:0; }
        @media (max-width:768px) { .cq-side { transform:translateX(-224px); } .cq-side.mob-open { transform:translateX(0); } .cq-header { left:0; padding:0 16px; } .cq-body { margin-left:0; padding:16px; } .cq-hamb { display:block; } }
      `}</style>

      <aside className={mobileOpen ? 'cq-side mob-open' : 'cq-side'}>
        <div className="cq-logo" role="link" tabIndex={0} aria-label="대시보드로 이동" style={{ cursor:'pointer' }} onClick={() => { router.push('/admin'); setMobileOpen(false) }} onKeyDown={e => { if (e.key === 'Enter') router.push('/admin') }}>
          <div className="cq-logo-name">CLYQ</div>
          <div className="cq-logo-con">{ROLE === 'clyq' ? '본사 관리자' : BRAND + ' 브랜드 파트너'}</div>
        </div>
        <div style={{ flex:1 }}>
          {menus.map(menu => {
            const has = menu.children && menu.children.length > 0
            const open = openMenus.includes(menu.id)
            return (
              <div key={menu.id}>
                {!has ? (
                  <div className={isActive(menu.href) ? 'cq-menu-single active' : 'cq-menu-single'} onClick={() => { router.push(menu.href); setMobileOpen(false) }}>{menu.label}</div>
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
                          <a key={item.href} href={item.href} className={isActive(item.href) ? 'cq-menu-link active' : 'cq-menu-link'} onClick={() => setMobileOpen(false)}>{item.label}</a>
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
          <span style={{ fontSize:'13px', color:'#555' }}>{today}</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
          <span style={{ fontSize:'13px', color:'#555' }}>알림</span>
          <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
            <div style={{ width:'28px', height:'28px', borderRadius:'50%', background:'#111', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px', fontWeight:700 }}>{ROLE === 'clyq' ? '관' : BRAND[0]}</div>
            <span style={{ fontSize:'14px', fontWeight:500 }}>{ROLE === 'clyq' ? 'CLYQ 관리자' : BRAND + ' 담당자'}</span>
          </div>
        </div>
      </header>

      <main className="cq-body" style={pathname === '/admin' ? { background:'#e9ede6' } : undefined}>{children}</main>
    </div>
  )
}
