// 본사 관리 메뉴 구성 (UI는 lib/AdminShell 공통)
export const menus = [
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

