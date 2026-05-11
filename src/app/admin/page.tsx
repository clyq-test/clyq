// @ts-nocheck
'use client'

const BRAND = 'MARCIA'

const stats = [
  { label:'등록 상품', value:'24', unit:'개', sub:'피팅 가능 18개', color:'#1a1a2e' },
  { label:'이달 주문', value:'247', unit:'건', sub:'전월 대비 +22%', color:'#2563eb' },
  { label:'이달 매출', value:'12,840,000', unit:'원', sub:'정산 예정 8,988,000원', color:'#16a34a' },
  { label:'피팅 진행중', value:'8', unit:'건', sub:'반납 예정 3건 (오늘)', color:'#C94E1A' },
]

const recentOrders = [
  { id:'ORD-0510-024', product:'오버핏 캐시미어 울 코트', size:'M', status:'결제완료', amount:'298,000', date:'05-10 10:18' },
  { id:'ORD-0510-023', product:'레더 재킷', size:'S', status:'배송중', amount:'456,000', date:'05-10 09:22' },
  { id:'ORD-0509-041', product:'울 블레이저 세트업', size:'M', status:'배송완료', amount:'389,000', date:'05-09 16:44' },
  { id:'ORD-0509-038', product:'캐시미어 니트', size:'L', status:'배송완료', amount:'178,000', date:'05-09 14:11' },
  { id:'ORD-0509-031', product:'오버핏 캐시미어 울 코트', size:'L', status:'반품접수', amount:'298,000', date:'05-09 11:05' },
]

const fittingList = [
  { id:'FIT-0510-018', product:'오버핏 캐시미어 울 코트', stage:'반납 완료', dDay:'-', alert:false },
  { id:'FIT-0510-015', product:'울 블레이저 세트업', stage:'피팅중', dDay:'D-1', alert:true },
  { id:'FIT-0509-042', product:'레더 재킷', stage:'피팅중', dDay:'D-2', alert:false },
  { id:'FIT-0509-039', product:'캐시미어 니트', stage:'배송중', dDay:'-', alert:false },
]

const myProducts = [
  { name:'오버핏 캐시미어 울 코트', sku:'MA-2026-CT-001', price:'298,000', stock:12, fitting:true, orders:24 },
  { name:'울 블레이저 세트업', sku:'MA-2026-ST-003', price:'389,000', stock:8, fitting:true, orders:18 },
  { name:'레더 재킷', sku:'MA-2026-JK-007', price:'456,000', stock:3, fitting:false, orders:14 },
  { name:'캐시미어 니트', sku:'MA-2026-KN-012', price:'178,000', stock:0, fitting:true, orders:31 },
]

const statusStyle = {
  '결제완료': { bg:'#eff6ff', color:'#2563eb' },
  '배송중':   { bg:'#f0fdf4', color:'#16a34a' },
  '배송완료': { bg:'#f5f5f7', color:'#666' },
  '반품접수': { bg:'#fff1f0', color:'#dc2626' },
  '반납 완료':{ bg:'#f5f5f7', color:'#666' },
  '피팅중':   { bg:'#fff7ed', color:'#C94E1A' },
}

export default function BrandDashboard() {
  return (
    <>
      <style>{`
        .db-stat-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-bottom:24px; }
        .db-stat { background:#fff; border:1px solid #e8e8eb; border-radius:8px; padding:20px 24px; }
        .db-two { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:20px; }
        .db-card { background:#fff; border:1px solid #e8e8eb; border-radius:8px; overflow:hidden; }
        .db-card-head { padding:14px 20px; border-bottom:1px solid #f0f0f2; display:flex; align-items:center; justify-content:space-between; }
        .db-card-title { font-size:14px; font-weight:700; color:#1a1a2e; }
        .db-link { font-size:12px; color:#C94E1A; font-weight:600; background:none; border:none; cursor:pointer; font-family:inherit; }
        .db-table { width:100%; border-collapse:collapse; font-size:13px; }
        .db-table th { padding:9px 16px; text-align:left; font-size:11px; font-weight:600; color:#999; background:#fafafa; border-bottom:1px solid #f0f0f2; white-space:nowrap; }
        .db-table td { padding:12px 16px; border-bottom:1px solid #f5f5f7; color:#333; white-space:nowrap; }
        .db-table tr:last-child td { border-bottom:none; }
        .db-table tbody tr:hover td { background:#fafafa; }
        .db-badge { display:inline-block; padding:3px 8px; border-radius:4px; font-size:11px; font-weight:600; }
        .db-btn-primary { padding:8px 18px; background:#C94E1A; color:#fff; border:none; border-radius:5px; font-size:13px; font-weight:600; cursor:pointer; font-family:inherit; }
        .db-btn-primary:hover { background:#a83d14; }
        .db-btn-outline { padding:8px 14px; background:#fff; color:#555; border:1px solid #d8d8dc; border-radius:5px; font-size:13px; cursor:pointer; font-family:inherit; }
        @media (max-width:1200px) {
          .db-stat-grid { grid-template-columns:repeat(2,1fr); }
          .db-two { grid-template-columns:1fr; }
        }
        @media (max-width:600px) {
          .db-stat-grid { grid-template-columns:repeat(2,1fr); }
        }
      `}</style>

      {/* 페이지 헤더 */}
      <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:'24px', flexWrap:'wrap', gap:'12px' }}>
        <div>
          <div style={{ fontSize:'11px', color:'#aaa', marginBottom:'4px' }}>오전 10시 기준 · 자동 갱신</div>
          <h1 style={{ fontSize:'22px', fontWeight:800, color:'#1a1a2e', letterSpacing:'-0.3px' }}>대시보드</h1>
        </div>
        <div style={{ display:'flex', gap:'8px' }}>
          <button className="db-btn-outline">정산 내역</button>
          <button className="db-btn-primary" onClick={() => location.href='/admin/products/new'}>상품 등록</button>
        </div>
      </div>

      {/* 핵심 지표 */}
      <div className="db-stat-grid">
        {stats.map(s => (
          <div key={s.label} className="db-stat">
            <div style={{ fontSize:'12px', color:'#999', fontWeight:500, marginBottom:'10px' }}>{s.label}</div>
            <div style={{ display:'flex', alignItems:'baseline', gap:'4px', marginBottom:'6px' }}>
              <span style={{ fontSize:'28px', fontWeight:800, color:s.color, letterSpacing:'-0.5px' }}>{s.value}</span>
              <span style={{ fontSize:'13px', color:'#aaa' }}>{s.unit}</span>
            </div>
            <div style={{ fontSize:'12px', color:'#bbb' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* 2단: 최근 주문 + 피팅 현황 */}
      <div className="db-two">
        <div className="db-card">
          <div className="db-card-head">
            <span className="db-card-title">최근 주문</span>
            <button className="db-link">전체 보기</button>
          </div>
          <div style={{ overflowX:'auto' }}>
            <table className="db-table">
              <thead>
                <tr>
                  <th>주문번호</th>
                  <th>상품</th>
                  <th>상태</th>
                  <th style={{ textAlign:'right' }}>금액</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(o => (
                  <tr key={o.id}>
                    <td style={{ fontSize:'11px', color:'#aaa' }}>{o.id}</td>
                    <td>
                      <div style={{ fontWeight:500, color:'#1a1a2e', maxWidth:'150px', overflow:'hidden', textOverflow:'ellipsis' }}>{o.product}</div>
                      <div style={{ fontSize:'11px', color:'#bbb' }}>{o.size} · {o.date}</div>
                    </td>
                    <td>
                      <span className="db-badge" style={{ background:statusStyle[o.status]?.bg, color:statusStyle[o.status]?.color }}>
                        {o.status}
                      </span>
                    </td>
                    <td style={{ textAlign:'right', fontWeight:600, color:'#1a1a2e' }}>{o.amount}원</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="db-card">
          <div className="db-card-head">
            <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
              <span className="db-card-title">피팅 현황</span>
              <span style={{ fontSize:'11px', color:'#bbb' }}>열람 전용</span>
            </div>
            <button className="db-link">전체 보기</button>
          </div>
          <div style={{ overflowX:'auto' }}>
            <table className="db-table">
              <thead>
                <tr>
                  <th>피팅 ID</th>
                  <th>상품</th>
                  <th>단계</th>
                  <th style={{ textAlign:'center' }}>D-Day</th>
                </tr>
              </thead>
              <tbody>
                {fittingList.map(f => (
                  <tr key={f.id}>
                    <td style={{ fontSize:'11px', color:'#aaa' }}>{f.id}</td>
                    <td style={{ fontWeight:500, color:'#1a1a2e', maxWidth:'140px', overflow:'hidden', textOverflow:'ellipsis' }}>{f.product}</td>
                    <td>
                      <span className="db-badge" style={{ background:statusStyle[f.stage]?.bg || '#f5f5f7', color:statusStyle[f.stage]?.color || '#666' }}>
                        {f.stage}
                      </span>
                    </td>
                    <td style={{ textAlign:'center', fontWeight:700, color:f.alert ? '#dc2626' : '#bbb' }}>{f.dDay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 내 상품 목록 */}
      <div className="db-card">
        <div className="db-card-head">
          <span className="db-card-title">내 상품 목록</span>
          <div style={{ display:'flex', gap:'8px' }}>
            <button className="db-btn-outline" style={{ fontSize:'12px', padding:'6px 12px' }}>전체 보기</button>
            <button className="db-btn-primary" style={{ fontSize:'12px', padding:'6px 14px' }} onClick={() => location.href='/admin/products/new'}>상품 등록</button>
          </div>
        </div>
        <div style={{ overflowX:'auto' }}>
          <table className="db-table">
            <thead>
              <tr>
                <th>상품명</th>
                <th>SKU</th>
                <th style={{ textAlign:'right' }}>판매가</th>
                <th style={{ textAlign:'center' }}>재고</th>
                <th style={{ textAlign:'center' }}>피팅</th>
                <th style={{ textAlign:'right' }}>주문수</th>
              </tr>
            </thead>
            <tbody>
              {myProducts.map(p => (
                <tr key={p.sku} style={{ cursor:'pointer' }}>
                  <td style={{ fontWeight:600, color:'#1a1a2e' }}>{p.name}</td>
                  <td style={{ fontSize:'12px', color:'#bbb' }}>{p.sku}</td>
                  <td style={{ textAlign:'right', fontWeight:500 }}>{p.price}원</td>
                  <td style={{ textAlign:'center' }}>
                    <span style={{ color: p.stock === 0 ? '#dc2626' : p.stock <= 3 ? '#C94E1A' : '#333', fontWeight: p.stock <= 3 ? 700 : 400 }}>
                      {p.stock === 0 ? '품절' : p.stock + '개'}
                    </span>
                  </td>
                  <td style={{ textAlign:'center' }}>
                    <span className="db-badge" style={{ background: p.fitting ? '#fff7ed' : '#f5f5f7', color: p.fitting ? '#C94E1A' : '#bbb' }}>
                      {p.fitting ? '가능' : '불가'}
                    </span>
                  </td>
                  <td style={{ textAlign:'right', color:'#666' }}>{p.orders}건</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}