// @ts-nocheck
'use client'
import { useState } from 'react'

const fittings = [
  { id:'FIT-2026-0510-018', brand:'MARCIA', product:'오버핏 캐시미어 울 코트', sku:'MA-2026-CT-001', size:'M', customer:'이**', phone:'010-****-3842', stage:'검수 대기', reqDate:'2026-05-07', shipDate:'2026-05-08', recvDate:'2026-05-09', returnDue:'2026-05-12', returnDate:'2026-05-11', inspDate:'', converted:false, penalty:false, dDay:0 },
  { id:'FIT-2026-0510-015', brand:'MARCIA', product:'울 블레이저 세트업', sku:'MA-2026-ST-003', size:'S', customer:'김**', phone:'010-****-5571', stage:'피팅중', reqDate:'2026-05-08', shipDate:'2026-05-09', recvDate:'2026-05-10', returnDue:'2026-05-13', returnDate:'', inspDate:'', converted:false, penalty:false, dDay:-1 },
  { id:'FIT-2026-0510-014', brand:'MATIN KIM', product:'레더 재킷', sku:'MK-2026-JK-001', size:'M', customer:'박**', phone:'010-****-2219', stage:'피팅중', reqDate:'2026-05-07', shipDate:'2026-05-08', recvDate:'2026-05-09', returnDue:'2026-05-13', returnDate:'', inspDate:'', converted:false, penalty:false, dDay:-2 },
  { id:'FIT-2026-0510-013', brand:'EENK', product:'울 블레이저', sku:'EK-2026-JK-003', size:'L', customer:'최**', phone:'010-****-7734', stage:'배송중', reqDate:'2026-05-09', shipDate:'2026-05-10', recvDate:'', returnDue:'2026-05-15', returnDate:'', inspDate:'', converted:false, penalty:false, dDay:2 },
  { id:'FIT-2026-0510-012', brand:'ANDERSSONBELL', product:'오버사이즈 셔츠', sku:'AB-2026-SH-002', size:'M', customer:'정**', phone:'010-****-4421', stage:'배송중', reqDate:'2026-05-09', shipDate:'2026-05-10', recvDate:'', returnDue:'2026-05-15', returnDate:'', inspDate:'', converted:false, penalty:false, dDay:2 },
  { id:'FIT-2026-0509-042', brand:'D.POUND', product:'캐시미어 니트', sku:'DP-2026-KN-001', size:'L', customer:'한**', phone:'010-****-8812', stage:'피팅중', reqDate:'2026-05-07', shipDate:'2026-05-08', recvDate:'2026-05-09', returnDue:'2026-05-13', returnDate:'', inspDate:'', converted:false, penalty:false, dDay:-2 },
  { id:'FIT-2026-0509-039', brand:'ADER ERROR', product:'그래픽 후드집업', sku:'AE-2026-HD-001', size:'S', customer:'조**', phone:'010-****-3309', stage:'신청 대기', reqDate:'2026-05-11', shipDate:'', recvDate:'', returnDue:'2026-05-14', returnDate:'', inspDate:'', converted:false, penalty:false, dDay:1 },
  { id:'FIT-2026-0509-031', brand:'MARCIA', product:'실크 블라우스', sku:'MA-2026-BL-005', size:'M', customer:'윤**', phone:'010-****-6645', stage:'반납 수거중', reqDate:'2026-05-06', shipDate:'2026-05-07', recvDate:'2026-05-08', returnDue:'2026-05-11', returnDate:'', inspDate:'', converted:false, penalty:false, dDay:-1 },
  { id:'FIT-2026-0508-031', brand:'MARCIA', product:'오버핏 캐시미어 울 코트', sku:'MA-2026-CT-001', size:'L', customer:'정**', phone:'010-****-1234', stage:'구매 전환', reqDate:'2026-05-05', shipDate:'2026-05-06', recvDate:'2026-05-07', returnDue:'2026-05-10', returnDate:'2026-05-10', inspDate:'2026-05-11', converted:true, penalty:false, dDay:0 },
  { id:'FIT-2026-0507-024', brand:'MATIN KIM', product:'레더 재킷', sku:'MK-2026-JK-001', size:'M', customer:'한**', phone:'010-****-5678', stage:'훼손 패널티', reqDate:'2026-05-03', shipDate:'2026-05-04', recvDate:'2026-05-05', returnDue:'2026-05-08', returnDate:'2026-05-09', inspDate:'2026-05-10', converted:false, penalty:true, dDay:0 },
]

const stageStyle = {
  '신청 대기':   { bg:'#eff6ff', color:'#2563eb' },
  '배송중':      { bg:'#f0fdf4', color:'#16a34a' },
  '피팅중':      { bg:'#fff7ed', color:'#C94E1A' },
  '반납 수거중': { bg:'#fefce8', color:'#ca8a04' },
  '검수 대기':   { bg:'#faf5ff', color:'#7c3aed' },
  '검수중':      { bg:'#faf5ff', color:'#7c3aed' },
  '구매 전환':   { bg:'#f0fdf4', color:'#16a34a' },
  '훼손 패널티': { bg:'#fff1f0', color:'#dc2626' },
}

const stages = ['전체','신청 대기','배송중','피팅중','반납 수거중','검수 대기','구매 전환','훼손 패널티']
const brands  = ['전체','MARCIA','MATIN KIM','EENK','D.POUND','ANDERSSONBELL','ADER ERROR']

export default function FittingAllPage() {
  const [stageFilter, setStageFilter] = useState('전체')
  const [brandFilter, setBrandFilter] = useState('전체')
  const [search, setSearch]           = useState('')
  const [selected, setSelected]       = useState(null)

  const filtered = fittings.filter(f => {
    const ms = stageFilter === '전체' || f.stage === stageFilter
    const mb = brandFilter === '전체' || f.brand === brandFilter
    const mq = !search || f.id.includes(search) || f.product.includes(search) || f.customer.includes(search)
    return ms && mb && mq
  })

  const tl = [
    { label:'신청', key:'reqDate' },
    { label:'출고', key:'shipDate' },
    { label:'수령', key:'recvDate' },
    { label:'반납', key:'returnDate' },
    { label:'검수', key:'inspDate' },
  ]

  return (
    <>
      <style>{`
        .fa-wrap { width:100%; }
        .fa-toolbar { background:#fff; border:1px solid #e8e8eb; border-radius:8px; padding:16px 20px; margin-bottom:14px; display:flex; flex-direction:column; gap:12px; }
        .fa-filter-row { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
        .fa-filter-label { font-size:11px; font-weight:600; color:#999; width:44px; flex-shrink:0; }
        .fa-btn { padding:5px 14px; border-radius:20px; border:1px solid #d8d8dc; background:#fff; font-size:12px; cursor:pointer; color:#666; font-family:inherit; }
        .fa-btn.on { background:#1a1a2e; border-color:#1a1a2e; color:#fff; font-weight:600; }
        .fa-brand-btn { padding:5px 14px; border-radius:20px; border:1px solid #d8d8dc; background:#fff; font-size:12px; cursor:pointer; color:#666; font-family:inherit; }
        .fa-brand-btn.on { background:#C94E1A; border-color:#C94E1A; color:#fff; font-weight:600; }
        .fa-search { padding:7px 12px; border:1px solid #d8d8dc; border-radius:5px; font-size:13px; width:260px; outline:none; font-family:inherit; }
        .fa-search:focus { border-color:#C94E1A; }
        .fa-stat-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:12px; margin-bottom:16px; }
        .fa-stat { background:#fff; border:1px solid #e8e8eb; border-radius:8px; padding:14px 18px; }
        .fa-card { background:#fff; border:1px solid #e8e8eb; border-radius:8px; overflow:hidden; margin-bottom:12px; }
        .fa-card-top { display:grid; grid-template-columns:2.5fr 1fr 1fr 1fr 1fr; gap:0; padding:16px 20px; border-bottom:1px solid #f0f0f2; align-items:center; cursor:pointer; }
        .fa-card-top:hover { background:#fafafa; }
        .fa-card-bottom { padding:16px 20px; background:#fafafa; }
        .fa-badge { display:inline-block; padding:3px 9px; border-radius:4px; font-size:11px; font-weight:600; }
        .fa-tl { display:flex; align-items:flex-start; gap:0; }
        .fa-tl-step { flex:1; display:flex; flex-direction:column; align-items:center; position:relative; }
        .fa-tl-step:not(:last-child)::after { content:''; position:absolute; top:10px; left:50%; width:100%; height:2px; background:#e8e8eb; z-index:0; }
        .fa-tl-step.done::after { background:#C94E1A; }
        .fa-tl-dot { width:20px; height:20px; border-radius:50%; border:2px solid #e8e8eb; background:#fff; z-index:1; display:flex; align-items:center; justify-content:center; }
        .fa-tl-step.done .fa-tl-dot { border-color:#C94E1A; background:#C94E1A; }
        .fa-tl-label { font-size:10px; color:#aaa; margin-top:5px; text-align:center; }
        .fa-tl-step.done .fa-tl-label { color:#C94E1A; font-weight:600; }
        .fa-tl-date { font-size:10px; color:#ccc; margin-top:2px; text-align:center; }
        @media (max-width:1100px) { .fa-card-top { grid-template-columns:1fr 1fr; gap:8px; } }
        @media (max-width:768px) { .fa-stat-grid { grid-template-columns:repeat(3,1fr); } }
      `}</style>

      <div className="fa-wrap">
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:'20px', flexWrap:'wrap', gap:'10px' }}>
          <div>
            <div style={{ fontSize:'11px', color:'#aaa', marginBottom:'4px' }}>피팅박스 관리 › 전체 피팅 현황</div>
            <h1 style={{ fontSize:'22px', fontWeight:800, color:'#1a1a2e', margin:0 }}>전체 피팅 현황</h1>
          </div>
          <button style={{ padding:'9px 20px', background:'#C94E1A', color:'#fff', border:'none', borderRadius:'5px', fontSize:'13px', fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}
            onClick={() => location.href='/clyq/fitting/products/new'}>
            피팅 제품 등록
          </button>
        </div>

        {/* 요약 */}
        <div className="fa-stat-grid">
          {stages.filter(s => s !== '전체').map(s => {
            const cnt = fittings.filter(f => f.stage === s).length
            const ss = stageStyle[s] || { color:'#666' }
            return (
              <div key={s} className="fa-stat" style={{ cursor:'pointer' }} onClick={() => setStageFilter(stageFilter === s ? '전체' : s)}>
                <div style={{ fontSize:'11px', color:'#999', marginBottom:'6px' }}>{s}</div>
                <div style={{ fontSize:'24px', fontWeight:800, color:ss.color }}>{cnt}<span style={{ fontSize:'12px', color:'#aaa', fontWeight:400, marginLeft:'2px' }}>건</span></div>
              </div>
            )
          })}
        </div>

        {/* 필터 */}
        <div className="fa-toolbar">
          <div className="fa-filter-row">
            <span className="fa-filter-label">단계</span>
            {stages.map(s => (
              <button key={s} className={stageFilter === s ? 'fa-btn on' : 'fa-btn'} onClick={() => setStageFilter(s)}>{s}</button>
            ))}
          </div>
          <div className="fa-filter-row">
            <span className="fa-filter-label">브랜드</span>
            {brands.map(b => (
              <button key={b} className={brandFilter === b ? 'fa-brand-btn on' : 'fa-brand-btn'} onClick={() => setBrandFilter(b)}>{b}</button>
            ))}
          </div>
          <div className="fa-filter-row">
            <span className="fa-filter-label">검색</span>
            <input className="fa-search" type="text" placeholder="피팅ID · 상품명 · 고객" value={search} onChange={e => setSearch(e.target.value)}/>
            <span style={{ fontSize:'12px', color:'#aaa', marginLeft:'6px' }}>{filtered.length}건</span>
          </div>
        </div>

        {/* 피팅 카드 목록 */}
        {filtered.map(f => {
          const ss = stageStyle[f.stage] || { bg:'#f5f5f7', color:'#666' }
          const isOpen = selected === f.id
          const dDayLabel = f.dDay === 0 ? 'D-Day' : f.dDay > 0 ? 'D-' + f.dDay : '초과 ' + Math.abs(f.dDay) + '일'
          const dDayColor = f.dDay < 0 ? '#dc2626' : f.dDay === 0 ? '#C94E1A' : '#555'

          return (
            <div key={f.id} className="fa-card">
              <div className="fa-card-top" onClick={() => setSelected(isOpen ? null : f.id)}>
                <div>
                  <div style={{ fontWeight:700, color:'#1a1a2e', fontSize:'14px', marginBottom:'3px' }}>{f.product}</div>
                  <div style={{ fontSize:'11px', color:'#aaa' }}>{f.id} · {f.brand} · SIZE {f.size}</div>
                </div>
                <div>
                  <div style={{ fontSize:'11px', color:'#999', marginBottom:'3px' }}>고객</div>
                  <div style={{ fontWeight:600 }}>{f.customer}</div>
                </div>
                <div>
                  <div style={{ fontSize:'11px', color:'#999', marginBottom:'3px' }}>반납 기한</div>
                  <div style={{ fontWeight:600 }}>{f.returnDue}</div>
                </div>
                <div>
                  <span className="fa-badge" style={{ background:ss.bg, color:ss.color }}>{f.stage}</span>
                  {f.penalty && <div style={{ fontSize:'11px', color:'#dc2626', fontWeight:600, marginTop:'4px' }}>패널티 청구중</div>}
                </div>
                <div style={{ textAlign:'right' }}>
                  <div style={{ fontWeight:800, fontSize:'15px', color:dDayColor }}>{dDayLabel}</div>
                  <div style={{ fontSize:'11px', color:'#bbb', marginTop:'2px' }}>{isOpen ? '접기 ▲' : '상세 ▼'}</div>
                </div>
              </div>

              {isOpen && (
                <div className="fa-card-bottom">
                  <div style={{ fontSize:'11px', color:'#999', fontWeight:600, marginBottom:'12px' }}>진행 단계</div>
                  <div className="fa-tl">
                    {tl.map((step, idx) => {
                      const dateVal = f[step.key]
                      const isDone = !!dateVal
                      const stepClass = isDone ? 'fa-tl-step done' : 'fa-tl-step'
                      return (
                        <div key={idx} className={stepClass}>
                          <div className="fa-tl-dot">
                            {isDone && (
                              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                                <polyline points="2,6 5,9 10,3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </div>
                          <div className="fa-tl-label">{step.label}</div>
                          <div className="fa-tl-date">{dateVal || '-'}</div>
                        </div>
                      )
                    })}
                  </div>
                  <div style={{ display:'flex', gap:'8px', marginTop:'16px', justifyContent:'flex-end' }}>
                    {f.stage === '검수 대기' && (
                      <>
                        <button style={{ padding:'7px 16px', background:'#16a34a', color:'#fff', border:'none', borderRadius:'4px', fontSize:'12px', cursor:'pointer', fontFamily:'inherit', fontWeight:600 }}>
                          검수 통과
                        </button>
                        <button style={{ padding:'7px 16px', background:'#dc2626', color:'#fff', border:'none', borderRadius:'4px', fontSize:'12px', cursor:'pointer', fontFamily:'inherit', fontWeight:600 }}>
                          훼손 확인
                        </button>
                      </>
                    )}
                    {f.stage === '신청 대기' && (
                      <button style={{ padding:'7px 16px', background:'#C94E1A', color:'#fff', border:'none', borderRadius:'4px', fontSize:'12px', cursor:'pointer', fontFamily:'inherit', fontWeight:600 }}>
                        출고 처리
                      </button>
                    )}
                    <button style={{ padding:'7px 14px', background:'#f5f5f7', color:'#555', border:'1px solid #e0e0e0', borderRadius:'4px', fontSize:'12px', cursor:'pointer', fontFamily:'inherit' }}>
                      메모
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div style={{ background:'#fff', border:'1px solid #e8e8eb', borderRadius:'8px', padding:'60px', textAlign:'center', color:'#aaa', fontSize:'14px' }}>
            해당 조건의 피팅 내역이 없습니다.
          </div>
        )}
      </div>
    </>
  )
}
