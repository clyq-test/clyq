// @ts-nocheck
'use client'
import { useState } from 'react'

import { useOrders, setStatus } from '../../lib/orders'
import { fitRows, dLabel, saveInspection } from '../../lib/hq'
import { BRANDS } from '../../lib/catalog'

const stageStyle = {
  '신청 대기':   { bg:'#f4f4f2', color:'#555' },
  '배송중':      { bg:'#eef4f0', color:'#3D6A4F' },
  '피팅중':      { bg:'#f4f4f2', color:'#111' },
  '반납 수거중': { bg:'#f4f4f2', color:'#8a6d1f' },
  '검수 대기':   { bg:'#f4f4f2', color:'#555' },
  '검수중':      { bg:'#f4f4f2', color:'#555' },
  '구매 전환':   { bg:'#eef4f0', color:'#3D6A4F' },
  '반납 완료':   { bg:'#f4f4f2', color:'#555' },
  '취소':        { bg:'#f2f2f0', color:'#767676' },
  '훼손 패널티': { bg:'#fbeeed', color:'#b3261e' },
}

const stages = ['전체','신청 대기','배송중','피팅중','반납 수거중','검수 대기','반납 완료','구매 전환','훼손 패널티']
const brands  = ['전체', ...BRANDS]

export default function FittingAllPage() {
  const [orders] = useOrders()
  const fittings = fitRows(orders)
  const [stageFilter, setStageFilter] = useState('전체')
  const [brandFilter, setBrandFilter] = useState('전체')
  const [search, setSearch]           = useState('')
  const [selected, setSelected]       = useState(null)

  const filtered = fittings.filter(f => {
    const ms = stageFilter === '전체' || f.stage === stageFilter
    const mb = brandFilter === '전체' || f.brand === brandFilter
    const mq = !search || f.id.includes(search) || f.product.includes(search) || f.customer.includes(search) || f.brand.includes(search.toUpperCase())
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
        .fa-toolbar { background:#fff; border:1px solid #e6e6e3; border-radius:8px; padding:16px 20px; margin-bottom:14px; display:flex; flex-direction:column; gap:12px; }
        .fa-filter-row { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
        .fa-filter-label { font-size:12px; font-weight:600; color:#767676; width:44px; flex-shrink:0; }
        .fa-btn { padding:5px 14px; border-radius:20px; border:1px solid #d6d6d2; background:#fff; font-size:13px; cursor:pointer; color:#555; font-family:inherit; }
        .fa-btn.on { background:#111; border-color:#111; color:#fff; font-weight:600; }
        .fa-brand-btn { padding:5px 14px; border-radius:20px; border:1px solid #d6d6d2; background:#fff; font-size:13px; cursor:pointer; color:#555; font-family:inherit; }
        .fa-brand-btn.on { background:#111; border-color:#111; color:#fff; font-weight:600; }
        .fa-search { padding:7px 12px; border:1px solid #d6d6d2; border-radius:5px; font-size:14px; width:260px; outline:none; font-family:inherit; }
        .fa-search:focus { border-color:#111; }
        .fa-stat-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:12px; margin-bottom:16px; }
        .fa-stat { background:#fff; border:1px solid #e6e6e3; border-radius:8px; padding:14px 18px; }
        .fa-card { background:#fff; border:1px solid #e6e6e3; border-radius:8px; overflow:hidden; margin-bottom:12px; }
        .fa-card-top { display:grid; grid-template-columns:2.5fr 1fr 1fr 1fr 1fr; gap:0; padding:16px 20px; border-bottom:1px solid #eeeeec; align-items:center; cursor:pointer; }
        .fa-card-top:hover { background:#f9f9f7; }
        .fa-card-bottom { padding:16px 20px; background:#f9f9f7; }
        .fa-badge { display:inline-block; padding:3px 9px; border-radius:4px; font-size:12px; font-weight:600; }
        .fa-tl { display:flex; align-items:flex-start; gap:0; }
        .fa-tl-step { flex:1; display:flex; flex-direction:column; align-items:center; position:relative; }
        .fa-tl-step:not(:last-child)::after { content:''; position:absolute; top:10px; left:50%; width:100%; height:2px; background:#e6e6e3; z-index:0; }
        .fa-tl-step.done::after { background:#111; }
        .fa-tl-dot { width:20px; height:20px; border-radius:50%; border:2px solid #e6e6e3; background:#fff; z-index:1; display:flex; align-items:center; justify-content:center; }
        .fa-tl-step.done .fa-tl-dot { border-color:#111; background:#111; }
        .fa-tl-label { font-size:12px; color:#767676; margin-top:5px; text-align:center; }
        .fa-tl-step.done .fa-tl-label { color:#111; font-weight:600; }
        .fa-tl-date { font-size:12px; color:#ccc; margin-top:2px; text-align:center; }
        @media (max-width:1100px) { .fa-card-top { grid-template-columns:1fr 1fr; gap:8px; } }
        @media (max-width:768px) { .fa-stat-grid { grid-template-columns:repeat(3,1fr); } }
      `}</style>

      <div className="fa-wrap">
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:'20px', flexWrap:'wrap', gap:'10px' }}>
          <div>
            <div style={{ fontSize:'12px', color:'#767676', marginBottom:'4px' }}>피팅박스 관리 › 전체 피팅 현황</div>
            <h1 style={{ fontSize:'22px', fontWeight:800, color:'#111', margin:0 }}>전체 피팅 현황</h1>
          </div>
          <button style={{ padding:'9px 20px', background:'#111', color:'#fff', border:'none', borderRadius:'5px', fontSize:'14px', fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}
            onClick={() => location.href='/clyq/fitting/products/new'}>
            피팅 제품 등록
          </button>
        </div>

        {/* 요약 */}
        <div className="fa-stat-grid">
          {stages.filter(s => s !== '전체').map(s => {
            const cnt = fittings.filter(f => f.stage === s).length
            const ss = stageStyle[s] || { color:'#555' }
            return (
              <div key={s} className="fa-stat" style={{ cursor:'pointer' }} onClick={() => setStageFilter(stageFilter === s ? '전체' : s)}>
                <div style={{ fontSize:'12px', color:'#767676', marginBottom:'6px' }}>{s}</div>
                <div style={{ fontSize:'24px', fontWeight:800, color:ss.color }}>{cnt}<span style={{ fontSize:'13px', color:'#767676', fontWeight:400, marginLeft:'2px' }}>건</span></div>
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
            <input className="fa-search" type="text" placeholder="피팅ID · 상품명 · 브랜드" value={search} onChange={e => setSearch(e.target.value)}/>
            <span style={{ fontSize:'13px', color:'#767676', marginLeft:'6px' }}>{filtered.length}건</span>
          </div>
        </div>

        {/* 피팅 카드 목록 */}
        {filtered.map(f => {
          const ss = stageStyle[f.stage] || { bg:'#f2f2f0', color:'#555' }
          const isOpen = selected === f.key
          const dDayLabel = dLabel(f.dDay)
          const dDayColor = f.dDay != null && f.dDay < 0 ? '#b3261e' : f.dDay === 0 ? '#111' : '#555'

          return (
            <div key={f.key} className="fa-card">
              <div className="fa-card-top" onClick={() => setSelected(isOpen ? null : f.key)}>
                <div>
                  <div style={{ fontWeight:700, color:'#111', fontSize:'14px', marginBottom:'3px' }}>{f.product}</div>
                  <div style={{ fontSize:'12px', color:'#767676' }}>{f.id} · {f.brand} · SIZE {f.size}</div>
                </div>
                <div>
                  <div style={{ fontSize:'12px', color:'#767676', marginBottom:'3px' }}>고객</div>
                  <div style={{ fontWeight:600 }}>{f.customer}</div>
                </div>
                <div>
                  <div style={{ fontSize:'12px', color:'#767676', marginBottom:'3px' }}>반납 기한</div>
                  <div style={{ fontWeight:600 }}>{f.returnDue || '-'}</div>
                </div>
                <div>
                  <span className="fa-badge" style={{ background:ss.bg, color:ss.color }}>{f.stage}</span>
                  {f.penalty && <div style={{ fontSize:'12px', color:'#b3261e', fontWeight:600, marginTop:'4px' }}>패널티 청구중</div>}
                </div>
                <div style={{ textAlign:'right' }}>
                  <div style={{ fontWeight:800, fontSize:'15px', color:dDayColor }}>{dDayLabel}</div>
                  <div style={{ fontSize:'12px', color:'#8a8a8a', marginTop:'2px' }}>{isOpen ? '접기 ▲' : '상세 ▼'}</div>
                </div>
              </div>

              {isOpen && (
                <div className="fa-card-bottom">
                  <div style={{ fontSize:'12px', color:'#767676', fontWeight:600, marginBottom:'12px' }}>진행 단계</div>
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
                        <button onClick={() => saveInspection(f.orderId, { result:'이상없음' })} style={{ padding:'7px 16px', background:'#3D6A4F', color:'#fff', border:'none', borderRadius:'4px', fontSize:'13px', cursor:'pointer', fontFamily:'inherit', fontWeight:600 }}>
                          검수 통과
                        </button>
                        <button onClick={() => location.href='/clyq/fitting/inspection'} style={{ padding:'7px 16px', background:'#b3261e', color:'#fff', border:'none', borderRadius:'4px', fontSize:'13px', cursor:'pointer', fontFamily:'inherit', fontWeight:600 }}>
                          훼손 확인
                        </button>
                      </>
                    )}
                    {f.stage === '신청 대기' && (
                      <button onClick={() => setStatus(f.orderId, f.status === '신청접수' ? '발송준비' : '배송중')} style={{ padding:'7px 16px', background:'#111', color:'#fff', border:'none', borderRadius:'4px', fontSize:'13px', cursor:'pointer', fontFamily:'inherit', fontWeight:600 }}>
                        {f.status === '신청접수' ? '발송 준비' : '출고 처리'}
                      </button>
                    )}
                    <button onClick={() => location.href='/clyq/orders'} style={{ padding:'7px 14px', background:'#f2f2f0', color:'#555', border:'1px solid #d6d6d2', borderRadius:'4px', fontSize:'13px', cursor:'pointer', fontFamily:'inherit' }}>
                      주문 상세
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div style={{ background:'#fff', border:'1px solid #e6e6e3', borderRadius:'8px', padding:'60px', textAlign:'center', color:'#767676', fontSize:'14px' }}>
            해당 조건의 피팅 내역이 없습니다.
          </div>
        )}
      </div>
    </>
  )
}
