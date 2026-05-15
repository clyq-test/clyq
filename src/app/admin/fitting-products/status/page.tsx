// @ts-nocheck
'use client'
import { useState } from 'react'

const fittings = [
  {
    id:'FIT-2026-0510-018', product:'오버핏 캐시미어 울 코트', sku:'MA-2026-CT-001',
    size:'M', customer:'이**', requestDate:'2026-05-07', shipDate:'2026-05-08',
    receiveDate:'2026-05-09', returnDue:'2026-05-12', returnDate:'2026-05-11',
    inspectDate:'2026-05-12', stage:'검수 완료', converted:true, penalty:false,
    timeline:[
      { label:'피팅 신청', date:'05-07 14:23', done:true },
      { label:'출고', date:'05-08 09:00', done:true },
      { label:'수령', date:'05-09 12:44', done:true },
      { label:'반납', date:'05-11 18:30', done:true },
      { label:'검수 완료', date:'05-12 10:15', done:true },
    ],
  },
  {
    id:'FIT-2026-0510-015', product:'울 블레이저 세트업', sku:'MA-2026-ST-003',
    size:'S', customer:'김**', requestDate:'2026-05-08', shipDate:'2026-05-09',
    receiveDate:'2026-05-10', returnDue:'2026-05-13', returnDate:null,
    inspectDate:null, stage:'피팅중', converted:false, penalty:false,
    timeline:[
      { label:'피팅 신청', date:'05-08 11:05', done:true },
      { label:'출고', date:'05-09 09:30', done:true },
      { label:'수령', date:'05-10 14:20', done:true },
      { label:'반납', date:'D-1 남음', done:false, alert:true },
      { label:'검수', date:'-', done:false },
    ],
  },
  {
    id:'FIT-2026-0509-042', product:'레더 재킷', sku:'MA-2026-JK-007',
    size:'M', customer:'박**', requestDate:'2026-05-07', shipDate:'2026-05-08',
    receiveDate:'2026-05-09', returnDue:'2026-05-13', returnDate:null,
    inspectDate:null, stage:'피팅중', converted:false, penalty:false,
    timeline:[
      { label:'피팅 신청', date:'05-07 09:15', done:true },
      { label:'출고', date:'05-08 10:00', done:true },
      { label:'수령', date:'05-09 13:55', done:true },
      { label:'반납', date:'D-2 남음', done:false },
      { label:'검수', date:'-', done:false },
    ],
  },
  {
    id:'FIT-2026-0509-039', product:'캐시미어 니트', sku:'MA-2026-KN-012',
    size:'L', customer:'최**', requestDate:'2026-05-09', shipDate:'2026-05-10',
    receiveDate:null, returnDue:'2026-05-14', returnDate:null,
    inspectDate:null, stage:'배송중', converted:false, penalty:false,
    timeline:[
      { label:'피팅 신청', date:'05-09 17:40', done:true },
      { label:'출고', date:'05-10 09:15', done:true },
      { label:'수령', date:'배송중', done:false },
      { label:'반납', date:'-', done:false },
      { label:'검수', date:'-', done:false },
    ],
  },
  {
    id:'FIT-2026-0508-031', product:'오버핏 캐시미어 울 코트', sku:'MA-2026-CT-001',
    size:'L', customer:'정**', requestDate:'2026-05-05', shipDate:'2026-05-06',
    receiveDate:'2026-05-07', returnDue:'2026-05-10', returnDate:'2026-05-10',
    inspectDate:'2026-05-11', stage:'구매 전환', converted:true, penalty:false,
    timeline:[
      { label:'피팅 신청', date:'05-05 10:00', done:true },
      { label:'출고', date:'05-06 09:00', done:true },
      { label:'수령', date:'05-07 14:00', done:true },
      { label:'반납', date:'05-10 11:20', done:true },
      { label:'검수 완료', date:'05-11 09:30', done:true },
    ],
  },
  {
    id:'FIT-2026-0507-024', product:'캐시미어 니트', sku:'MA-2026-KN-012',
    size:'M', customer:'한**', requestDate:'2026-05-03', shipDate:'2026-05-04',
    receiveDate:'2026-05-05', returnDue:'2026-05-08', returnDate:'2026-05-09',
    inspectDate:'2026-05-10', stage:'훼손 패널티', converted:false, penalty:true,
    timeline:[
      { label:'피팅 신청', date:'05-03 15:20', done:true },
      { label:'출고', date:'05-04 09:00', done:true },
      { label:'수령', date:'05-05 13:10', done:true },
      { label:'반납', date:'05-09 (1일 초과)', done:true },
      { label:'검수 — 훼손 확인', date:'05-10 11:00', done:true },
    ],
  },
]

const stageStyle = {
  '피팅 신청': { bg:'#eff6ff', color:'#2563eb' },
  '배송중':    { bg:'#f0fdf4', color:'#16a34a' },
  '피팅중':    { bg:'#fff7ed', color:'#C94E1A' },
  '반납 수거중':{ bg:'#fefce8', color:'#ca8a04' },
  '검수 완료': { bg:'#f5f5f7', color:'#666' },
  '구매 전환': { bg:'#f0fdf4', color:'#16a34a' },
  '훼손 패널티':{ bg:'#fff1f0', color:'#dc2626' },
}

const stages = ['전체', '배송중', '피팅중', '검수 완료', '구매 전환', '훼손 패널티']

export default function FittingStatusPage() {
  const [filter, setFilter] = useState('전체')
  const [search, setSearch] = useState('')

  const filtered = fittings.filter(f => {
    const matchStage = filter === '전체' || f.stage === filter
    const matchSearch = f.product.includes(search) || f.id.includes(search) || f.customer.includes(search)
    return matchStage && matchSearch
  })

  return (
    <>
      <style>{`
        .fs-wrap { width:100%; }
        .fs-head { display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:20px; flex-wrap:wrap; gap:10px; }
        .fs-notice { background:#f8f8fb; border:1px solid #e8e8eb; border-left:3px solid #6b7280; border-radius:6px; padding:12px 16px; font-size:12px; color:#666; margin-bottom:20px; line-height:1.7; }
        .fs-filter-bar { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:14px; align-items:center; }
        .fs-filter-btn { padding:6px 14px; border-radius:20px; border:1px solid #d8d8dc; background:#fff; font-size:12px; font-weight:500; cursor:pointer; color:#666; font-family:inherit; transition:all 0.15s; }
        .fs-filter-btn.on { background:#1a1a2e; border-color:#1a1a2e; color:#fff; font-weight:600; }
        .fs-search { padding:7px 14px; border:1px solid #d8d8dc; border-radius:5px; font-size:13px; width:240px; outline:none; font-family:inherit; }
        .fs-search:focus { border-color:#C94E1A; }
        .fs-badge { display:inline-block; padding:3px 9px; border-radius:4px; font-size:11px; font-weight:600; }
        .fs-row-card { background:#fff; border:1px solid #e8e8eb; border-radius:8px; margin-bottom:10px; overflow:hidden; }
        .fs-row-top { display:grid; grid-template-columns:2fr 1.2fr 1fr 1fr 1fr; gap:0; align-items:center; padding:16px 20px; border-bottom:1px solid #f0f0f2; }
        .fs-row-bottom { padding:14px 20px; background:#fafafa; }
        .fs-tl { display:flex; align-items:center; gap:0; }
        .fs-tl-step { display:flex; flex-direction:column; align-items:center; flex:1; position:relative; }
        .fs-tl-step:not(:last-child)::after {
          content:''; position:absolute; top:10px; left:50%; width:100%;
          height:2px; background:#e8e8eb; z-index:0;
        }
        .fs-tl-step.done::after { background:#C94E1A; }
        .fs-tl-dot { width:20px; height:20px; border-radius:50%; border:2px solid #e8e8eb; background:#fff; z-index:1; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .fs-tl-step.done .fs-tl-dot { border-color:#C94E1A; background:#C94E1A; }
        .fs-tl-step.alert .fs-tl-dot { border-color:#dc2626; background:#fff; }
        .fs-tl-label { font-size:10px; color:#aaa; margin-top:5px; text-align:center; white-space:nowrap; }
        .fs-tl-step.done .fs-tl-label { color:#C94E1A; font-weight:600; }
        .fs-tl-step.alert .fs-tl-label { color:#dc2626; font-weight:700; }
        .fs-tl-date { font-size:10px; color:#ccc; margin-top:2px; text-align:center; white-space:nowrap; }
        .fs-tl-step.alert .fs-tl-date { color:#dc2626; }
        .ro-label { display:inline-flex; align-items:center; gap:4px; font-size:10px; color:#6b7280; background:#f0f0f2; padding:3px 8px; border-radius:3px; font-weight:600; }
        @media (max-width:900px) {
          .fs-row-top { grid-template-columns:1fr 1fr; gap:10px; }
          .fs-search { width:100%; }
        }
        @media (max-width:600px) {
          .fs-row-top { grid-template-columns:1fr; }
        }
      `}</style>

      <div className="fs-wrap">

        {/* 헤더 */}
        <div className="fs-head">
          <div>
            <div style={{ fontSize:'11px', color:'#aaa', marginBottom:'4px' }}>피팅박스 현황 › 피팅 진행 현황</div>
            <h1 style={{ fontSize:'22px', fontWeight:800, color:'#1a1a2e', margin:0 }}>피팅 진행 현황</h1>
          </div>
          <span className="ro-label">열람 전용 — 수정은 CLYQ 본사에 문의</span>
        </div>

        {/* 안내 */}
        <div className="fs-notice">
          내 브랜드 제품에 대한 피팅박스 진행 현황을 단계별로 확인할 수 있습니다.<br/>
          배송·검수·패널티 처리는 CLYQ 본사에서 담당합니다.
        </div>

        {/* 요약 */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:'12px', marginBottom:'20px' }}>
          {[
            { label:'전체', value: fittings.length, color:'#1a1a2e' },
            { label:'배송중', value: fittings.filter(f=>f.stage==='배송중').length, color:'#16a34a' },
            { label:'피팅중', value: fittings.filter(f=>f.stage==='피팅중').length, color:'#C94E1A' },
            { label:'구매 전환', value: fittings.filter(f=>f.converted).length, color:'#2563eb' },
            { label:'훼손 패널티', value: fittings.filter(f=>f.penalty).length, color:'#dc2626' },
          ].map(s => (
            <div key={s.label} style={{ background:'#fff', border:'1px solid #e8e8eb', borderRadius:'8px', padding:'16px 18px' }}>
              <div style={{ fontSize:'11px', color:'#999', marginBottom:'8px' }}>{s.label}</div>
              <div style={{ fontSize:'24px', fontWeight:800, color:s.color }}>{s.value}<span style={{ fontSize:'12px', color:'#aaa', fontWeight:400, marginLeft:'3px' }}>건</span></div>
            </div>
          ))}
        </div>

        {/* 필터 + 검색 */}
        <div className="fs-filter-bar">
          {stages.map(s => (
            <button
              key={s}
              className={filter === s ? 'fs-filter-btn on' : 'fs-filter-btn'}
              onClick={() => setFilter(s)}
            >
              {s}
            </button>
          ))}
          <div style={{ marginLeft:'auto' }}>
            <input
              className="fs-search"
              type="text"
              placeholder="상품명 · 피팅ID · 고객 검색"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div style={{ fontSize:'12px', color:'#aaa', marginBottom:'12px' }}>총 {filtered.length}건</div>

        {/* 피팅 카드 목록 */}
        {filtered.map(f => {
          const stageS = stageStyle[f.stage] || { bg:'#f5f5f7', color:'#666' }
          return (
            <div key={f.id} className="fs-row-card">
              <div className="fs-row-top">

                {/* 제품 */}
                <div>
                  <div style={{ fontWeight:700, color:'#1a1a2e', fontSize:'14px', marginBottom:'3px' }}>{f.product}</div>
                  <div style={{ fontSize:'11px', color:'#aaa' }}>{f.sku} · 사이즈 {f.size}</div>
                  <div style={{ fontSize:'11px', color:'#aaa', marginTop:'2px' }}>{f.id}</div>
                </div>

                {/* 고객 */}
                <div>
                  <div style={{ fontSize:'11px', color:'#999', marginBottom:'3px' }}>고객</div>
                  <div style={{ fontWeight:600, color:'#1a1a2e' }}>{f.customer}</div>
                  <div style={{ fontSize:'11px', color:'#aaa', marginTop:'2px' }}>신청 {f.requestDate}</div>
                </div>

                {/* 반납 기한 */}
                <div>
                  <div style={{ fontSize:'11px', color:'#999', marginBottom:'3px' }}>반납 기한</div>
                  <div style={{ fontWeight:700, color:'#1a1a2e' }}>{f.returnDue}</div>
                  {f.returnDate && (
                    <div style={{ fontSize:'11px', color:'#16a34a', marginTop:'2px' }}>반납 완료 {f.returnDate}</div>
                  )}
                </div>

                {/* 전환 여부 */}
                <div>
                  <div style={{ fontSize:'11px', color:'#999', marginBottom:'3px' }}>구매 전환</div>
                  <span className="fs-badge" style={{ background: f.converted ? '#f0fdf4' : '#f5f5f7', color: f.converted ? '#16a34a' : '#aaa' }}>
                    {f.converted ? '전환 완료' : '미전환'}
                  </span>
                </div>

                {/* 현재 단계 */}
                <div style={{ textAlign:'right' }}>
                  <span className="fs-badge" style={{ background:stageS.bg, color:stageS.color }}>
                    {f.stage}
                  </span>
                  {f.penalty && (
                    <div style={{ fontSize:'11px', color:'#dc2626', fontWeight:600, marginTop:'4px' }}>패널티 청구 중</div>
                  )}
                </div>
              </div>

              {/* 타임라인 */}
              <div className="fs-row-bottom">
                <div style={{ fontSize:'11px', color:'#999', marginBottom:'10px', fontWeight:600 }}>진행 단계</div>
                <div className="fs-tl">
                  {f.timeline.map((step, idx) => {
                    const stepClass = step.done
                      ? (step.alert ? 'fs-tl-step done alert' : 'fs-tl-step done')
                      : (step.alert ? 'fs-tl-step alert' : 'fs-tl-step')
                    return (
                      <div key={idx} className={stepClass}>
                        <div className="fs-tl-dot">
                          {step.done && (
                            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                              <polyline points="2,6 5,9 10,3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                        <div className="fs-tl-label">{step.label}</div>
                        <div className="fs-tl-date">{step.date}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
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
