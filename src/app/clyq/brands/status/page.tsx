// @ts-nocheck
'use client'
import { useState } from 'react'

const BRANDS = [
  { name:'MARCIA',        products:24, fitting:4, inFitting:6,  monthFit:31, converted:16, convRate:52, monthSales:12840000, monthOrders:247, avgOrder:51976, commission:30, stock:12, lowStock:1, penalty:0 },
  { name:'MATIN KIM',     products:18, fitting:3, inFitting:5,  monthFit:24, converted:14, convRate:58, monthSales:9620000,  monthOrders:184, avgOrder:52283, commission:30, stock:8,  lowStock:0, penalty:1 },
  { name:'EENK',          products:31, fitting:6, inFitting:12, monthFit:41, converted:28, convRate:68, monthSales:5280000,  monthOrders:98,  avgOrder:53878, commission:28, stock:3,  lowStock:2, penalty:0 },
  { name:'D.POUND',       products:12, fitting:2, inFitting:3,  monthFit:18, converted:8,  convRate:44, monthSales:4150000,  monthOrders:76,  avgOrder:54605, commission:27, stock:6,  lowStock:0, penalty:0 },
  { name:'ANDERSSONBELL', products:27, fitting:5, inFitting:7,  monthFit:29, converted:17, convRate:59, monthSales:3960000,  monthOrders:72,  avgOrder:55000, commission:30, stock:9,  lowStock:0, penalty:0 },
  { name:'ANOTHER A',     products:15, fitting:3, inFitting:4,  monthFit:15, converted:7,  convRate:47, monthSales:2730000,  monthOrders:51,  avgOrder:53529, commission:27, stock:11, lowStock:0, penalty:0 },
  { name:'EIGHT',         products:9,  fitting:2, inFitting:2,  monthFit:11, converted:5,  convRate:45, monthSales:1980000,  monthOrders:38,  avgOrder:52105, commission:25, stock:14, lowStock:0, penalty:0 },
  { name:'ADER ERROR',    products:21, fitting:4, inFitting:9,  monthFit:22, converted:14, convRate:64, monthSales:6410000,  monthOrders:122, avgOrder:52541, commission:30, stock:5,  lowStock:1, penalty:1 },
]

const SORT_OPTS = [
  { key:'monthSales',  label:'이달 매출순' },
  { key:'convRate',    label:'전환율순' },
  { key:'monthFit',    label:'피팅 건수순' },
  { key:'monthOrders', label:'주문수순' },
]

export default function BrandStatusPage() {
  const [selected, setSelected] = useState(null)
  const [sortKey, setSortKey]   = useState('monthSales')
  const [search, setSearch]     = useState('')

  const sorted = [...BRANDS]
    .filter(b => !search || b.name.includes(search))
    .sort((a, b) => b[sortKey] - a[sortKey])

  const totalSales   = BRANDS.reduce((s, b) => s + b.monthSales, 0)
  const totalFitting = BRANDS.reduce((s, b) => s + b.inFitting, 0)
  const totalOrders  = BRANDS.reduce((s, b) => s + b.monthOrders, 0)
  const avgConv      = Math.round(BRANDS.reduce((s, b) => s + b.convRate, 0) / BRANDS.length)

  const detail = BRANDS.find(b => b.name === selected)

  return (
    <>
      <style>{`
        .bs-wrap { width:100%; }
        .bs-kpi { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-bottom:20px; }
        .bs-kpi-card { background:#fff; border:1px solid #e8e8eb; border-radius:8px; padding:16px 20px; }
        .bs-toolbar { display:flex; align-items:center; gap:8px; margin-bottom:14px; flex-wrap:wrap; }
        .bs-sort-btn { padding:6px 14px; border-radius:20px; border:1px solid #d8d8dc; background:#fff; font-size:12px; cursor:pointer; color:#666; font-family:inherit; }
        .bs-sort-btn.on { background:#1a1a2e; border-color:#1a1a2e; color:#fff; font-weight:600; }
        .bs-search { padding:7px 12px; border:1px solid #d8d8dc; border-radius:5px; font-size:13px; outline:none; font-family:inherit; width:200px; margin-left:auto; }
        .bs-search:focus { border-color:#C94E1A; }
        .bs-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:14px; }
        .bs-brand-card { background:#fff; border:1px solid #e8e8eb; border-radius:8px; overflow:hidden; cursor:pointer; transition:box-shadow 0.15s; }
        .bs-brand-card:hover { box-shadow:0 4px 16px rgba(0,0,0,0.08); border-color:#d0d0d8; }
        .bs-brand-card.sel { border-color:#C94E1A; box-shadow:0 0 0 2px rgba(201,78,26,0.15); }
        .bs-brand-head { padding:14px 16px; border-bottom:1px solid #f0f0f2; }
        .bs-brand-body { padding:14px 16px; display:flex; flex-direction:column; gap:10px; }
        .bs-brand-row { display:flex; align-items:center; justify-content:space-between; font-size:12px; }
        .bs-bar-bg { flex:1; height:5px; background:#f0f0f2; border-radius:3px; margin:0 8px; }
        .bs-bar-fill { height:5px; border-radius:3px; }
        .bs-detail { background:#fff; border:1px solid #e8e8eb; border-radius:8px; overflow:hidden; margin-bottom:14px; }
        .bs-detail-head { padding:16px 20px; background:#1a1a2e; display:flex; align-items:center; justify-content:space-between; }
        .bs-detail-kpi { display:grid; grid-template-columns:repeat(6,1fr); border-bottom:1px solid #f0f0f2; }
        .bs-dk { padding:16px; text-align:center; border-right:1px solid #f0f0f2; }
        .bs-dk:last-child { border-right:none; }
        .bs-tbl { width:100%; border-collapse:collapse; font-size:13px; }
        .bs-tbl th { padding:10px 16px; text-align:left; font-size:11px; font-weight:600; color:#999; background:#fafafa; border-bottom:1px solid #f0f0f2; }
        .bs-tbl td { padding:13px 16px; border-bottom:1px solid #f5f5f7; color:#333; }
        .bs-tbl tr:last-child td { border-bottom:none; }
        .bs-warn { background:#fff7ed; border-left:3px solid #C94E1A; padding:10px 14px; font-size:12px; color:#555; border-radius:0 4px 4px 0; margin:12px 16px; }
        @media (max-width:1300px) { .bs-grid { grid-template-columns:repeat(3,1fr); } .bs-detail-kpi { grid-template-columns:repeat(3,1fr); } }
        @media (max-width:900px)  { .bs-grid { grid-template-columns:repeat(2,1fr); } .bs-kpi { grid-template-columns:repeat(2,1fr); } }
      `}</style>

      <div className="bs-wrap">
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:'20px', flexWrap:'wrap', gap:'10px' }}>
          <div>
            <div style={{ fontSize:'11px', color:'#aaa', marginBottom:'4px' }}>브랜드 관리 › 브랜드별 현황</div>
            <h1 style={{ fontSize:'22px', fontWeight:800, color:'#1a1a2e', margin:0 }}>브랜드별 현황</h1>
          </div>
        </div>

        {/* 전체 KPI */}
        <div className="bs-kpi">
          {[
            { label:'전체 파트너 브랜드', value: BRANDS.length + '개',           color:'#1a1a2e' },
            { label:'이달 총 매출',       value: totalSales.toLocaleString() + '원', color:'#2563eb' },
            { label:'현재 전체 피팅중',   value: totalFitting + '건',            color:'#C94E1A' },
            { label:'평균 피팅 전환율',   value: avgConv + '%',                  color:'#16a34a' },
          ].map(s => (
            <div key={s.label} className="bs-kpi-card">
              <div style={{ fontSize:'11px', color:'#999', marginBottom:'8px' }}>{s.label}</div>
              <div style={{ fontSize:'24px', fontWeight:800, color:s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* 정렬 / 검색 */}
        <div className="bs-toolbar">
          {SORT_OPTS.map(opt => (
            <button
              key={opt.key}
              className={sortKey === opt.key ? 'bs-sort-btn on' : 'bs-sort-btn'}
              onClick={() => setSortKey(opt.key)}
            >
              {opt.label}
            </button>
          ))}
          <input className="bs-search" type="text" placeholder="브랜드 검색" value={search} onChange={e => setSearch(e.target.value)}/>
        </div>

        {/* 선택 브랜드 상세 */}
        {detail && (
          <div className="bs-detail">
            <div className="bs-detail-head">
              <div>
                <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.45)', marginBottom:'3px' }}>브랜드 상세 현황</div>
                <div style={{ fontWeight:800, fontSize:'18px', color:'#fff' }}>{detail.name}</div>
              </div>
              <button
                onClick={() => setSelected(null)}
                style={{ background:'rgba(255,255,255,0.1)', border:'none', color:'#fff', padding:'6px 16px', borderRadius:'4px', cursor:'pointer', fontSize:'12px', fontFamily:'inherit' }}
              >
                닫기
              </button>
            </div>

            <div className="bs-detail-kpi">
              {[
                { label:'등록 상품',   value: detail.products + '개',                color:'#1a1a2e' },
                { label:'피팅 제품',   value: detail.fitting + '개',                 color:'#C94E1A' },
                { label:'현재 피팅중', value: detail.inFitting + '건',               color:'#C94E1A' },
                { label:'이달 피팅',   value: detail.monthFit + '건',                color:'#2563eb' },
                { label:'전환율',      value: detail.convRate + '%',                 color: detail.convRate >= 55 ? '#16a34a' : '#C94E1A' },
                { label:'이달 매출',   value: detail.monthSales.toLocaleString() + '원', color:'#16a34a' },
              ].map(s => (
                <div key={s.label} className="bs-dk">
                  <div style={{ fontSize:'11px', color:'#999', marginBottom:'6px' }}>{s.label}</div>
                  <div style={{ fontSize:'18px', fontWeight:800, color:s.color }}>{s.value}</div>
                </div>
              ))}
            </div>

            {(detail.lowStock > 0 || detail.penalty > 0) && (
              <div className="bs-warn">
                {detail.lowStock > 0 && <div>피팅 재고 부족 제품 {detail.lowStock}개 — 즉시 확인 필요</div>}
                {detail.penalty > 0 && <div>패널티 처리 대기 {detail.penalty}건</div>}
              </div>
            )}

            <table className="bs-tbl">
              <tbody>
                <tr>
                  <td style={{ fontWeight:600, color:'#555', width:'140px', background:'#fafafa' }}>이달 주문수</td>
                  <td>{detail.monthOrders}건</td>
                  <td style={{ fontWeight:600, color:'#555', width:'140px', background:'#fafafa' }}>평균 주문금액</td>
                  <td>{detail.avgOrder.toLocaleString()}원</td>
                </tr>
                <tr>
                  <td style={{ fontWeight:600, color:'#555', background:'#fafafa' }}>CLYQ 수수료율</td>
                  <td>{detail.commission}%</td>
                  <td style={{ fontWeight:600, color:'#555', background:'#fafafa' }}>이달 수수료</td>
                  <td style={{ color:'#C94E1A', fontWeight:700 }}>{Math.round(detail.monthSales * detail.commission / 100).toLocaleString()}원</td>
                </tr>
                <tr>
                  <td style={{ fontWeight:600, color:'#555', background:'#fafafa' }}>브랜드 정산 예정</td>
                  <td style={{ color:'#16a34a', fontWeight:700 }}>{Math.round(detail.monthSales * (100 - detail.commission) / 100).toLocaleString()}원</td>
                  <td style={{ fontWeight:600, color:'#555', background:'#fafafa' }}>피팅 전환 건수</td>
                  <td>{detail.converted}건</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* 브랜드 카드 그리드 */}
        <div className="bs-grid">
          {sorted.map((b, rank) => {
            const isSel = selected === b.name
            const maxSales = Math.max(...BRANDS.map(x => x.monthSales))
            return (
              <div
                key={b.name}
                className={isSel ? 'bs-brand-card sel' : 'bs-brand-card'}
                onClick={() => setSelected(isSel ? null : b.name)}
              >
                <div className="bs-brand-head">
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                    <div>
                      <div style={{ fontWeight:800, color:'#1a1a2e', fontSize:'15px' }}>{b.name}</div>
                      <div style={{ fontSize:'11px', color:'#aaa', marginTop:'2px' }}>{b.products}개 상품 · 피팅 {b.fitting}개</div>
                    </div>
                    <div style={{ fontSize:'11px', fontWeight:700, color:'#aaa' }}>#{rank + 1}</div>
                  </div>
                </div>
                <div className="bs-brand-body">
                  <div>
                    <div style={{ display:'flex', justifyContent:'space-between', fontSize:'11px', color:'#999', marginBottom:'4px' }}>
                      <span>이달 매출</span>
                      <span style={{ fontWeight:700, color:'#1a1a2e' }}>{b.monthSales.toLocaleString()}원</span>
                    </div>
                    <div className="bs-bar-bg" style={{ margin:0 }}>
                      <div className="bs-bar-fill" style={{ background:'#2563eb', width: Math.round(b.monthSales / maxSales * 100) + '%' }}/>
                    </div>
                  </div>
                  <div className="bs-brand-row">
                    <span style={{ color:'#999' }}>피팅 전환율</span>
                    <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                      <div className="bs-bar-bg">
                        <div className="bs-bar-fill" style={{ background: b.convRate >= 55 ? '#16a34a' : '#C94E1A', width: b.convRate + '%' }}/>
                      </div>
                      <span style={{ fontWeight:700, color: b.convRate >= 55 ? '#16a34a' : '#C94E1A', fontSize:'12px' }}>{b.convRate}%</span>
                    </div>
                  </div>
                  <div className="bs-brand-row">
                    <span style={{ color:'#999' }}>현재 피팅중</span>
                    <span style={{ fontWeight:700, color:'#C94E1A' }}>{b.inFitting}건</span>
                  </div>
                  <div className="bs-brand-row">
                    <span style={{ color:'#999' }}>이달 주문</span>
                    <span style={{ fontWeight:600, color:'#555' }}>{b.monthOrders}건</span>
                  </div>
                  {(b.lowStock > 0 || b.penalty > 0) && (
                    <div style={{ display:'flex', gap:'4px', flexWrap:'wrap' }}>
                      {b.lowStock > 0 && <span style={{ fontSize:'10px', fontWeight:700, padding:'2px 6px', background:'#fff7ed', color:'#C94E1A', borderRadius:'3px' }}>재고부족</span>}
                      {b.penalty > 0 && <span style={{ fontSize:'10px', fontWeight:700, padding:'2px 6px', background:'#fff1f0', color:'#dc2626', borderRadius:'3px' }}>패널티</span>}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
