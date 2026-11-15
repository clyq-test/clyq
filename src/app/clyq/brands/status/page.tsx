// @ts-nocheck
'use client'
import { useState } from 'react'

import { useBrandStats } from '../../../lib/hq'

const SORT_OPTS = [
  { key:'monthSales',  label:'이달 매출순' },
  { key:'convRate',    label:'전환율순' },
  { key:'monthFit',    label:'피팅 건수순' },
  { key:'monthOrders', label:'주문수순' },
]

export default function BrandStatusPage() {
  const BRANDS = useBrandStats()
  const [selected, setSelected] = useState(null)
  const [sortKey, setSortKey]   = useState('monthSales')
  const [search, setSearch]     = useState('')

  const sorted = [...BRANDS]
    .filter(b => !search || b.name.includes(search))
    .sort((a, b) => b[sortKey] - a[sortKey])

  const totalSales   = BRANDS.reduce((s, b) => s + b.monthSales, 0)
  const totalFitting = BRANDS.reduce((s, b) => s + b.inFitting, 0)
  const totalOrders  = BRANDS.reduce((s, b) => s + b.monthOrders, 0)
  const known        = BRANDS.filter(b => b.convKnown)
  const avgConv      = known.length ? Math.round(known.reduce((s, b) => s + b.convRate, 0) / known.length) : 0

  const detail = BRANDS.find(b => b.name === selected)

  return (
    <>
      <style>{`
        .bs-wrap { width:100%; }
        .bs-kpi { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-bottom:20px; }
        .bs-kpi-card { background:#fff; border:1px solid #e6e6e3; border-radius:8px; padding:16px 20px; }
        .bs-toolbar { display:flex; align-items:center; gap:8px; margin-bottom:14px; flex-wrap:wrap; }
        .bs-sort-btn { padding:6px 14px; border-radius:20px; border:1px solid #d6d6d2; background:#fff; font-size:13px; cursor:pointer; color:#555; font-family:inherit; }
        .bs-sort-btn.on { background:#111; border-color:#111; color:#fff; font-weight:600; }
        .bs-search { padding:7px 12px; border:1px solid #d6d6d2; border-radius:5px; font-size:14px; outline:none; font-family:inherit; width:200px; margin-left:auto; }
        .bs-search:focus { border-color:#111; }
        .bs-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:14px; }
        .bs-brand-card { background:#fff; border:1px solid #e6e6e3; border-radius:8px; overflow:hidden; cursor:pointer; transition:box-shadow 0.15s; }
        .bs-brand-card:hover { box-shadow:0 4px 16px rgba(0,0,0,0.08); border-color:#d6d6d2; }
        .bs-brand-card.sel { border-color:#111; box-shadow:0 0 0 2px rgba(201,78,26,0.15); }
        .bs-brand-head { padding:14px 16px; border-bottom:1px solid #eeeeec; }
        .bs-brand-body { padding:14px 16px; display:flex; flex-direction:column; gap:10px; }
        .bs-brand-row { display:flex; align-items:center; justify-content:space-between; font-size:13px; }
        .bs-bar-bg { flex:1; height:5px; background:#eeeeec; border-radius:3px; margin:0 8px; }
        .bs-bar-fill { height:5px; border-radius:3px; }
        .bs-detail { background:#fff; border:1px solid #e6e6e3; border-radius:8px; overflow:hidden; margin-bottom:14px; }
        .bs-detail-head { padding:16px 20px; background:#111; display:flex; align-items:center; justify-content:space-between; }
        .bs-detail-kpi { display:grid; grid-template-columns:repeat(6,1fr); border-bottom:1px solid #eeeeec; }
        .bs-dk { padding:16px; text-align:center; border-right:1px solid #eeeeec; }
        .bs-dk:last-child { border-right:none; }
        .bs-tbl { width:100%; border-collapse:collapse; font-size:14px; }
        .bs-tbl th { padding:10px 16px; text-align:left; font-size:12px; font-weight:600; color:#767676; background:#f9f9f7; border-bottom:1px solid #eeeeec; }
        .bs-tbl td { padding:13px 16px; border-bottom:1px solid #f2f2f0; color:#222; }
        .bs-tbl tr:last-child td { border-bottom:none; }
        .bs-warn { background:#f4f4f2; border-left:3px solid #111; padding:10px 14px; font-size:13px; color:#555; border-radius:0 4px 4px 0; margin:12px 16px; }
        @media (max-width:1300px) { .bs-grid { grid-template-columns:repeat(3,1fr); } .bs-detail-kpi { grid-template-columns:repeat(3,1fr); } }
        @media (max-width:900px)  { .bs-grid { grid-template-columns:repeat(2,1fr); } .bs-kpi { grid-template-columns:repeat(2,1fr); } }
      `}</style>

      <div className="bs-wrap">
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:'20px', flexWrap:'wrap', gap:'10px' }}>
          <div>
            <div style={{ fontSize:'12px', color:'#767676', marginBottom:'4px' }}>브랜드 관리 › 브랜드별 현황</div>
            <h1 style={{ fontSize:'22px', fontWeight:800, color:'#111', margin:0 }}>브랜드별 현황</h1>
          </div>
        </div>

        {/* 전체 KPI */}
        <div className="bs-kpi">
          {[
            { label:'전체 파트너 브랜드', value: BRANDS.length + '개',           color:'#111' },
            { label:'이달 총 매출',       value: totalSales.toLocaleString() + '원', color:'#555' },
            { label:'현재 전체 피팅중',   value: totalFitting + '건',            color:'#111' },
            { label:'평균 피팅 전환율',   value: avgConv + '%',                  color:'#3D6A4F' },
          ].map(s => (
            <div key={s.label} className="bs-kpi-card">
              <div style={{ fontSize:'12px', color:'#767676', marginBottom:'8px' }}>{s.label}</div>
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
                <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.45)', marginBottom:'3px' }}>브랜드 상세 현황</div>
                <div style={{ fontWeight:800, fontSize:'18px', color:'#fff' }}>{detail.name}</div>
              </div>
              <button
                onClick={() => setSelected(null)}
                style={{ background:'rgba(255,255,255,0.1)', border:'none', color:'#fff', padding:'6px 16px', borderRadius:'4px', cursor:'pointer', fontSize:'13px', fontFamily:'inherit' }}
              >
                닫기
              </button>
            </div>

            <div className="bs-detail-kpi">
              {[
                { label:'등록 상품',   value: detail.products + '개',                color:'#111' },
                { label:'피팅 제품',   value: detail.fitting + '개',                 color:'#111' },
                { label:'현재 피팅중', value: detail.inFitting + '건',               color:'#111' },
                { label:'이달 피팅',   value: detail.monthFit + '건',                color:'#555' },
                { label:'전환율',      value: detail.convKnown ? detail.convRate + '%' : '-',                 color: detail.convRate >= 55 ? '#3D6A4F' : '#111' },
                { label:'이달 매출',   value: detail.monthSales.toLocaleString() + '원', color:'#3D6A4F' },
              ].map(s => (
                <div key={s.label} className="bs-dk">
                  <div style={{ fontSize:'12px', color:'#767676', marginBottom:'6px' }}>{s.label}</div>
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
                  <td style={{ fontWeight:600, color:'#555', width:'140px', background:'#f9f9f7' }}>이달 주문수</td>
                  <td>{detail.monthOrders}건</td>
                  <td style={{ fontWeight:600, color:'#555', width:'140px', background:'#f9f9f7' }}>평균 주문금액</td>
                  <td>{detail.avgOrder.toLocaleString()}원</td>
                </tr>
                <tr>
                  <td style={{ fontWeight:600, color:'#555', background:'#f9f9f7' }}>CLYQ 수수료율</td>
                  <td>{detail.commission}%</td>
                  <td style={{ fontWeight:600, color:'#555', background:'#f9f9f7' }}>이달 수수료</td>
                  <td style={{ color:'#111', fontWeight:700 }}>{Math.round(detail.monthSales * detail.commission / 100).toLocaleString()}원</td>
                </tr>
                <tr>
                  <td style={{ fontWeight:600, color:'#555', background:'#f9f9f7' }}>브랜드 정산 예정</td>
                  <td style={{ color:'#3D6A4F', fontWeight:700 }}>{Math.round(detail.monthSales * (100 - detail.commission) / 100).toLocaleString()}원</td>
                  <td style={{ fontWeight:600, color:'#555', background:'#f9f9f7' }}>피팅 전환 건수</td>
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
                      <div style={{ fontWeight:800, color:'#111', fontSize:'15px' }}>{b.name}</div>
                      <div style={{ fontSize:'12px', color:'#767676', marginTop:'2px' }}>{b.products}개 상품 · 피팅 {b.fitting}개</div>
                    </div>
                    <div style={{ fontSize:'12px', fontWeight:700, color:'#767676' }}>#{rank + 1}</div>
                  </div>
                </div>
                <div className="bs-brand-body">
                  <div>
                    <div style={{ display:'flex', justifyContent:'space-between', fontSize:'12px', color:'#767676', marginBottom:'4px' }}>
                      <span>이달 매출</span>
                      <span style={{ fontWeight:700, color:'#111' }}>{b.monthSales.toLocaleString()}원</span>
                    </div>
                    <div className="bs-bar-bg" style={{ margin:0 }}>
                      <div className="bs-bar-fill" style={{ background:'#555', width: Math.round(b.monthSales / maxSales * 100) + '%' }}/>
                    </div>
                  </div>
                  <div className="bs-brand-row">
                    <span style={{ color:'#767676' }}>피팅 전환율</span>
                    <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                      <div className="bs-bar-bg">
                        <div className="bs-bar-fill" style={{ background: b.convRate >= 55 ? '#3D6A4F' : '#111', width: b.convRate + '%' }}/>
                      </div>
                      <span style={{ fontWeight:700, color: b.convRate >= 55 ? '#3D6A4F' : '#111', fontSize:'13px' }}>{b.convKnown ? b.convRate + '%' : '-'}</span>
                    </div>
                  </div>
                  <div className="bs-brand-row">
                    <span style={{ color:'#767676' }}>현재 피팅중</span>
                    <span style={{ fontWeight:700, color:'#111' }}>{b.inFitting}건</span>
                  </div>
                  <div className="bs-brand-row">
                    <span style={{ color:'#767676' }}>이달 주문</span>
                    <span style={{ fontWeight:600, color:'#555' }}>{b.monthOrders}건</span>
                  </div>
                  {(b.lowStock > 0 || b.penalty > 0) && (
                    <div style={{ display:'flex', gap:'4px', flexWrap:'wrap' }}>
                      {b.lowStock > 0 && <span style={{ fontSize:'12px', fontWeight:700, padding:'2px 6px', background:'#f4f4f2', color:'#111', borderRadius:'3px' }}>재고부족</span>}
                      {b.penalty > 0 && <span style={{ fontSize:'12px', fontWeight:700, padding:'2px 6px', background:'#fbeeed', color:'#b3261e', borderRadius:'3px' }}>패널티</span>}
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
