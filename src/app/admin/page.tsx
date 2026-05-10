// @ts-nocheck
'use client'
import { useState } from 'react'

const ROLE = 'clyq'

/* CLYQ 관리자 전용 통계 */
const clyqTodos = [
  { label:'피팅 반납 검수', count:5, color:'#C94E1A', href:'/admin/fitting-products/inspection' },
  { label:'신규 주문', count:12, color:'#3b82f6', href:'/admin/orders/paid' },
  { label:'상품 승인 대기', count:7, color:'#8b5cf6', href:'/admin/products/pending' },
  { label:'훼손 패널티 처리', count:2, color:'#e74c3c', href:'/admin/fitting-products/penalty' },
  { label:'Q&A 미답변', count:8, color:'#10b981', href:'/admin/products/qna' },
  { label:'재고 부족 상품', count:47, color:'#6366f1', href:'/admin/products/stock' },
  { label:'배송중 확인', count:28, color:'#f59e0b', href:'/admin/orders/shipping' },
]

const brandTodos = [
  { label:'신규 주문', count:4, color:'#3b82f6', href:'/admin/orders/my' },
  { label:'상품 승인 대기', count:2, color:'#8b5cf6', href:'/admin/products/my' },
  { label:'Q&A 미답변', count:3, color:'#10b981', href:'/admin/products/qna' },
  { label:'반품 요청', count:1, color:'#e74c3c', href:'/admin/orders/claims' },
]

const todos = ROLE === 'clyq' ? clyqTodos : brandTodos

const fittingStatus = [
  { label:'신청 대기', count:6, color:'#f59e0b' },
  { label:'배송중', count:18, color:'#3b82f6' },
  { label:'피팅중', count:24, color:'#8b5cf6' },
  { label:'반납 수거중', count:9, color:'#C94E1A' },
  { label:'검수중', count:5, color:'#e74c3c' },
  { label:'완료 (오늘)', count:12, color:'#10b981' },
]

const recentActivity = [
  { type:'fit', label:'FIT-2026-0510-018 피팅 완료 → 검수 대기', time:'10:24', badge:'피팅박스', badgeColor:'#C94E1A' },
  { type:'order', label:'ORD-0510-024 결제 완료 / 마르시아 캐시미어 코트', time:'10:18', badge:'주문', badgeColor:'#3b82f6' },
  { type:'penalty', label:'FIT-0509-012 훼손 패널티 청구 — 이주연** 32,000원', time:'09:55', badge:'패널티', badgeColor:'#e74c3c' },
  { type:'fit', label:'FIT-2026-0510-017 반납 완료 → 세탁 처리', time:'09:40', badge:'피팅박스', badgeColor:'#C94E1A' },
  { type:'order', label:'ORD-0510-023 배송 완료 / MATIN KIM 레더재킷', time:'09:22', badge:'주문', badgeColor:'#10b981' },
  { type:'member', label:'신규 회원 가입 — 박소연** (위디 500P 자동 지급)', time:'08:58', badge:'회원', badgeColor:'#8b5cf6' },
]

const brandSales = [
  { brand:'MARCIA', sales:'12,840,000', orders:24, fit:8 },
  { brand:'MATIN KIM', sales:'9,620,000', orders:16, fit:5 },
  { brand:'EENK', sales:'5,280,000', orders:18, fit:12 },
  { brand:'D.POUND', sales:'4,150,000', orders:14, fit:3 },
  { brand:'ANDERSSONBELL', sales:'3,960,000', orders:12, fit:7 },
]

export default function AdminDashboard() {
  const [orderTab, setOrderTab] = useState('전체')

  const card = (style={}) => ({
    background:'#fff', border:'1px solid #e8e8eb',
    borderRadius:'8px', overflow:'hidden', ...style
  })
  const cardH = { padding:'14px 20px', background:'#fafafa', borderBottom:'1px solid #e8e8eb', display:'flex', justifyContent:'space-between', alignItems:'center' }
  const cardT = { fontSize:'14px', fontWeight:700, color:'#1a1a2e' }
  const cardL = { fontSize:'12px', color:'#C94E1A', textDecoration:'none', cursor:'pointer' }

  return (
    <div>
      <style>{`
        .todo-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:10px; margin-bottom:24px; }
        .todo-card { background:#fff; border:1px solid #e8e8eb; padding:16px 14px; cursor:pointer; transition:all 0.15s; border-radius:8px; text-decoration:none; display:block; }
        .todo-card:hover { box-shadow:0 3px 12px rgba(0,0,0,.09); transform:translateY(-1px); }
        .stat-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-bottom:20px; }
        .stat-card { background:#fff; border:1px solid #e8e8eb; padding:18px 20px; border-radius:8px; }
        .fit-grid { display:grid; grid-template-columns:repeat(6,1fr); gap:10px; }
        .fit-card { background:#fff; border:1px solid #e8e8eb; border-radius:8px; padding:16px; text-align:center; }
        .bottom-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-top:16px; }
        .right-col { display:flex; flex-direction:column; gap:16px; }
        .adm-table { width:100%; border-collapse:collapse; font-size:12px; }
        .adm-table th { padding:9px 14px; text-align:left; font-size:11px; font-weight:600; color:#888; background:#fafafa; border-bottom:1px solid #e8e8eb; white-space:nowrap; }
        .adm-table td { padding:10px 14px; border-bottom:1px solid #f5f5f7; color:#333; }
        .adm-table tr:last-child td { border-bottom:none; }
        .adm-table tr:hover td { background:#fafffe; }
        .badge { display:inline-block; font-size:10px; font-weight:600; padding:2px 7px; border-radius:20px; }
        /* 역할 배너 */
        .role-banner { border-radius:8px; padding:12px 18px; margin-bottom:20px; display:flex; align-items:center; gap:10px; font-size:13px; font-weight:500; }
        .role-banner-clyq { background:rgba(201,78,26,0.08); border:1px solid rgba(201,78,26,0.2); color:#C94E1A; }
        .role-banner-brand { background:rgba(26,26,46,0.05); border:1px solid rgba(26,26,46,0.12); color:#1a1a2e; }
        /* 분리 섹션 타이틀 */
        .section-label { font-size:11px; font-weight:700; letter-spacing:1.5px; color:#999; margin:20px 0 10px; display:flex; align-items:center; gap:8px; }
        .section-label::after { content:''; flex:1; height:1px; background:#e8e8eb; }
        @media (max-width:1300px) {
          .todo-grid { grid-template-columns:repeat(4,1fr); }
          .fit-grid { grid-template-columns:repeat(3,1fr); }
        }
        @media (max-width:900px) {
          .stat-grid { grid-template-columns:1fr 1fr; }
          .bottom-grid { grid-template-columns:1fr; }
          .todo-grid { grid-template-columns:repeat(2,1fr); }
          .fit-grid { grid-template-columns:repeat(2,1fr); }
        }
      `}</style>

      {/* 역할 배너 */}
      <div className={`role-banner role-banner-${ROLE}`}>
        {ROLE === 'clyq' ? (
          <>🔑 <strong>CLYQ 관리자 모드</strong> — 피팅박스 제품 등록·수정·검수 및 전체 서비스 관리 권한</>
        ) : (
          <>🏷 <strong>MARCIA 브랜드 파트너 모드</strong> — 내 상품·주문·정산 관리 가능 · 피팅박스 제품은 <strong>열람만</strong> 가능</>
        )}
      </div>

      {/* 페이지 제목 */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px',flexWrap:'wrap',gap:'8px'}}>
        <div>
          <div style={{fontSize:'22px',fontWeight:700,color:'#1a1a2e'}}>
            {new Date().toLocaleDateString('ko-KR',{month:'long',day:'numeric'})} 대시보드
          </div>
          <div style={{fontSize:'12px',color:'#999',marginTop:'2px'}}>
            오늘 오전 10시 기준 · 자동 갱신
          </div>
        </div>
        {ROLE === 'clyq' && (
          <div style={{display:'flex',gap:'8px'}}>
            <a href="/admin/fitting-products/new"
              style={{padding:'9px 16px',background:'#C94E1A',color:'#fff',textDecoration:'none',fontSize:'12px',fontWeight:600,borderRadius:'4px',display:'flex',alignItems:'center',gap:'5px'}}>
              📦 피팅 제품 등록
            </a>
            <a href="/admin/products/pending"
              style={{padding:'9px 16px',background:'#1a1a2e',color:'#fff',textDecoration:'none',fontSize:'12px',fontWeight:600,borderRadius:'4px'}}>
              상품 승인 처리
            </a>
          </div>
        )}
      </div>

      {/* TO-DO */}
      <div className="section-label">처리 필요 항목</div>
      <div className="todo-grid">
        {todos.map(t => (
          <a key={t.label} href={t.href} className="todo-card">
            <div style={{fontSize:'11px',color:'#888',marginBottom:'8px',fontWeight:500}}>{t.label}</div>
            <div style={{fontSize:'28px',fontWeight:700,color:t.count>0?t.color:'#ccc'}}>{t.count}</div>
          </a>
        ))}
      </div>

      {/* 오늘 통계 */}
      <div className="section-label">오늘 핵심 지표</div>
      <div className="stat-grid">
        {(ROLE === 'clyq' ? [
          { label:'오늘 매출', value:'8,240,000원', delta:'+22%', up:true },
          { label:'오늘 주문', value:'24건', delta:'+12%', up:true },
          { label:'피팅 신청', value:'18건', delta:'+8%', up:true },
          { label:'위디 발행', value:'+12,400P', delta:'누적 24.8M', up:true },
        ] : [
          { label:'내 브랜드 매출', value:'2,840,000원', delta:'+18%', up:true },
          { label:'주문 건수', value:'8건', delta:'+4%', up:true },
          { label:'재고 부족', value:'5개 SKU', delta:'확인 필요', up:false },
          { label:'미답변 Q&A', value:'3건', delta:'처리 필요', up:false },
        ]).map(s => (
          <div key={s.label} className="stat-card">
            <div style={{fontSize:'12px',color:'#888',marginBottom:'6px'}}>{s.label}</div>
            <div style={{fontSize:'20px',fontWeight:700,color:'#1a1a2e',marginBottom:'3px'}}>{s.value}</div>
            <div style={{fontSize:'11px',fontWeight:500,color:s.up?'#10b981':'#e74c3c'}}>
              {s.up?'▲':'▼'} {s.delta}
            </div>
          </div>
        ))}
      </div>

      {/* 피팅박스 현황 — CLYQ 전용 */}
      {ROLE === 'clyq' && (
        <>
          <div className="section-label">📦 피팅박스 실시간 현황 <span style={{color:'#C94E1A',fontSize:'10px',fontWeight:700}}>CLYQ 전용</span></div>
          <div style={card({marginBottom:'20px'})}>
            <div style={cardH}>
              <div style={cardT}>피팅 단계별 현황</div>
              <div style={{display:'flex',gap:'8px'}}>
                <a href="/admin/fitting-products/new" style={{...cardL, background:'#C94E1A', color:'#fff', padding:'5px 12px', borderRadius:'4px', textDecoration:'none', fontSize:'12px', fontWeight:600}}>
                  + 피팅 제품 등록
                </a>
                <a href="/admin/fitting-products" style={cardL}>전체 보기 ›</a>
              </div>
            </div>
            <div style={{padding:'16px 20px'}}>
              <div className="fit-grid">
                {fittingStatus.map(f => (
                  <div key={f.label} className="fit-card">
                    <div style={{fontSize:'26px',fontWeight:700,color:f.color,marginBottom:'4px'}}>{f.count}</div>
                    <div style={{fontSize:'11px',color:'#888'}}>{f.label}</div>
                  </div>
                ))}
              </div>
              <div style={{marginTop:'12px',padding:'10px 14px',background:'#fff5f2',borderRadius:'4px',fontSize:'12px',color:'#C94E1A',fontWeight:500,display:'flex',gap:'12px',flexWrap:'wrap'}}>
                <span>⚠ 반납 검수 대기 <strong>5건</strong></span>
                <span>·</span>
                <span>훼손 패널티 처리 필요 <strong>2건</strong></span>
                <span>·</span>
                <span>피팅 기간 초과 예정 <strong>3건</strong> (오늘 23:59)</span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* 하단 2컬럼 */}
      <div className="bottom-grid">
        {/* 최근 활동 */}
        <div style={card()}>
          <div style={cardH}>
            <div style={cardT}>{ROLE==='clyq'?'실시간 활동':'최근 주문·활동'}</div>
            <a href="/admin/orders" style={cardL}>전체 ›</a>
          </div>
          <div style={{padding:'0 4px'}}>
            {recentActivity.map((a,i) => (
              <div key={i} style={{display:'flex',alignItems:'center',gap:'10px',padding:'10px 16px',borderBottom:'1px solid #f5f5f7',fontSize:'12px'}}>
                <span className="badge"
                  style={{background:a.badgeColor+'22',color:a.badgeColor,flexShrink:0}}>
                  {a.badge}
                </span>
                <span style={{flex:1,color:'#333',lineHeight:1.4}}>{a.label}</span>
                <span style={{fontSize:'11px',color:'#ccc',flexShrink:0}}>{a.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="right-col">
          {/* 브랜드별 매출 — CLYQ만 */}
          {ROLE === 'clyq' && (
            <div style={card()}>
              <div style={cardH}>
                <div style={cardT}>브랜드별 이번달 현황</div>
                <a href="/admin/settlement/brand" style={cardL}>자세히 ›</a>
              </div>
              <div style={{overflowX:'auto'}}>
                <table className="adm-table">
                  <thead>
                    <tr>
                      <th>브랜드</th>
                      <th>매출</th>
                      <th>주문</th>
                      <th>피팅 건수</th>
                    </tr>
                  </thead>
                  <tbody>
                    {brandSales.map(b => (
                      <tr key={b.brand}>
                        <td style={{fontWeight:500,fontFamily:'Georgia,serif',fontSize:'11px'}}>{b.brand}</td>
                        <td style={{fontWeight:600}}>{b.sales}원</td>
                        <td>{b.orders}건</td>
                        <td>
                          <span style={{color:'#C94E1A',fontWeight:600}}>{b.fit}건</span>
                          {' '}
                          <span style={{fontSize:'10px',color:'#ccc'}}>
                            ({Math.round(b.fit/b.orders*100)}%)
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 이번달 정산 요약 */}
          <div style={card()}>
            <div style={cardH}>
              <div style={cardT}>이번달 정산</div>
              <a href={ROLE==='clyq'?'/admin/settlement':'/admin/settlement/my'} style={cardL}>자세히 ›</a>
            </div>
            <div style={{padding:'14px 20px'}}>
              {(ROLE === 'clyq' ? [
                {label:'전체 매출', value:'42,680,000원', highlight:false},
                {label:'피팅박스 수익 (CLYQ)', value:'3,240,000원', highlight:true},
                {label:'브랜드 정산 예정', value:'29,876,000원', highlight:false},
                {label:'위디 사용액', value:'1,180,000원', highlight:false},
                {label:'훼손 패널티 징수', value:'280,000원', highlight:false},
              ] : [
                {label:'내 브랜드 매출', value:'12,840,000원', highlight:false},
                {label:'CLYQ 수수료 (30%)', value:'3,852,000원', highlight:false},
                {label:'정산 예정액', value:'8,988,000원', highlight:true},
                {label:'쿠폰 할인 차감', value:'240,000원', highlight:false},
              ]).map(item => (
                <div key={item.label}
                  style={{display:'flex',justifyContent:'space-between',padding:'9px 0',borderBottom:'1px solid #f5f5f7',fontSize:'12px',background:item.highlight?'#fff8f5':'transparent',marginLeft:item.highlight?'-20px':'0',marginRight:item.highlight?'-20px':'0',paddingLeft:item.highlight?'20px':'0',paddingRight:item.highlight?'20px':'0'}}>
                  <span style={{color:'#888'}}>{item.label}</span>
                  <span style={{fontWeight:700,color:item.highlight?'#C94E1A':'#1a1a2e'}}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 브랜드: 열람 전용 안내 */}
          {ROLE === 'brand' && (
            <div style={{...card(), border:'1px solid rgba(201,78,26,0.2)', background:'#fff8f5'}}>
              <div style={{padding:'16px 20px'}}>
                <div style={{fontSize:'13px',fontWeight:700,color:'#C94E1A',marginBottom:'8px'}}>📦 피팅박스 제품 안내</div>
                <div style={{fontSize:'12px',color:'#555',lineHeight:1.8}}>
                  내 브랜드의 피팅박스 제품은 CLYQ 본사에서 직접 관리합니다.<br/>
                  피팅 제품 목록 및 현황은 <strong>열람만</strong> 가능하며, 수정·삭제는 불가합니다.<br/><br/>
                  피팅 제품 등록·수정 요청은 CLYQ 담당 MD에게 문의해주세요.
                </div>
                <a href="/admin/fitting-products/my"
                  style={{display:'inline-block',marginTop:'12px',padding:'8px 16px',border:'1px solid #C94E1A',color:'#C94E1A',textDecoration:'none',fontSize:'12px',fontWeight:600,borderRadius:'4px'}}>
                  내 브랜드 피팅 현황 보기 →
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
