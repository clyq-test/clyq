// 브랜드 관리 메뉴 구성 (UI는 lib/AdminShell 공통)
export const menus = [
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

