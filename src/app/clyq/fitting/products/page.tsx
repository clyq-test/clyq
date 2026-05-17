// @ts-nocheck
'use client'
import { useState } from 'react'

const products = [
  { id:'FP-2026-001', brand:'MARCIA', sku:'MA-2026-CT-001', name:'오버핏 캐시미어 울 코트', category:'아우터 > 코트', season:'2026 F/W', sizes:['S','M','L'], totalStock:6, inFitting:2, returnPending:1, available:3, penaltyBase:298000, acquisitionType:'브랜드 제공 (무상)', condition:'새 제품', storageLocation:'물류센터 A-3-12', status:'운영중', regDate:'2026-03-15', monthFit:18, converted:9, convRate:50 },
  { id:'FP-2026-002', brand:'MARCIA', sku:'MA-2026-ST-003', name:'울 블레이저 세트업', category:'원피스·세트 > 세트업', season:'2026 F/W', sizes:['S','M'], totalStock:4, inFitting:1, returnPending:0, available:3, penaltyBase:389000, acquisitionType:'브랜드 제공 (무상)', condition:'새 제품', storageLocation:'물류센터 A-3-15', status:'운영중', regDate:'2026-03-15', monthFit:11, converted:7, convRate:64 },
  { id:'FP-2026-003', brand:'MARCIA', sku:'MA-2026-KN-012', name:'캐시미어 니트', category:'상의 > 니트', season:'2026 F/W', sizes:['S','M','L','XL'], totalStock:8, inFitting:3, returnPending:1, available:4, penaltyBase:178000, acquisitionType:'브랜드 제공 (임차)', condition:'새 제품', storageLocation:'물류센터 B-1-04', status:'운영중', regDate:'2026-03-20', monthFit:24, converted:15, convRate:63 },
  { id:'FP-2026-004', brand:'MATIN KIM', sku:'MK-2026-JK-001', name:'레더 재킷', category:'아우터 > 재킷', season:'2026 F/W', sizes:['S','M','L'], totalStock:3, inFitting:2, returnPending:0, available:1, penaltyBase:456000, acquisitionType:'CLYQ 직접 구매', condition:'새 제품', storageLocation:'물류센터 A-2-07', status:'재고부족', regDate:'2026-03-18', monthFit:9, converted:5, convRate:56 },
  { id:'FP-2026-005', brand:'EENK', sku:'EK-2026-CT-002', name:'더블 브레스트 코트', category:'아우터 > 코트', season:'2026 F/W', sizes:['S','M','L'], totalStock:5, inFitting:4, returnPending:0, available:1, penaltyBase:528000, acquisitionType:'브랜드 제공 (무상)', condition:'새 제품', storageLocation:'물류센터 B-2-11', status:'재고부족', regDate:'2026-03-22', monthFit:14, converted:10, convRate:71 },
  { id:'FP-2026-006', brand:'D.POUND', sku:'DP-2026-PA-001', name:'와이드 팬츠', category:'하의 > 팬츠', season:'2026 F/W', sizes:['S','M','L'], totalStock:6, inFitting:1, returnPending:0, available:5, penaltyBase:198000, acquisitionType:'브랜드 제공 (무상)', condition:'새 제품', storageLocation:'물류센터 C-1-03', status:'운영중', regDate:'2026-04-01', monthFit:7, converted:3, convRate:43 },
  { id:'FP-2026-007', brand:'MARCIA', sku:'MA-2026-BL-005', name:'실크 블라우스', category:'상의 > 블라우스', season:'2026 S/S', sizes:['S','M'], totalStock:2, inFitting:0, returnPending:1, available:1, penaltyBase:148000, acquisitionType:'브랜드 제공 (임차)', condition:'샘플 제품', storageLocation:'물류센터 A-1-09', status:'일시중단', regDate:'2026-02-10', monthFit:6, converted:2, convRate:33 },
]

const statusStyle = {
  '운영중':   { bg:'#f0fdf4', color:'#16a34a' },
  '재고부족': { bg:'#fff7ed', color:'#C94E1A' },
  '일시중단': { bg:'#f5f5f7', color:'#999' },
  '종료':     { bg:'#f5f5f7', color:'#ccc' },
}

const brands = ['전체','MARCIA','MATIN KIM','EENK','D.POUND','ANDERSSONBELL']
const statuses = ['전체','운영중','재고부족','일시중단']

export default function FittingProductsPage() {
  const [brandFilter, setBrandFilter]   = useState('전체')
  const [statusFilter, setStatusFilter] = useState('전체')
  const [search, setSearch]             = useState('')
  const [selected, setSelected]         = useState(null)

  const filtered = products.filter(p => {
    const mb = brandFilter === '전체' || p.brand === brandFilter
    const ms = statusFilter === '전체' || p.status === statusFilter
    const mq = !search || p.name.includes(search) || p.sku.includes(search) || p.brand.includes(search)
    return mb && ms && mq
  })

  const totalStock  = products.reduce((s, p) => s + p.totalStock, 0)
  const inFitting   = products.reduce((s, p) => s + p.inFitting, 0)
  const available   = products.reduce((s, p) => s + p.available, 0)
  const lowStock    = products.filter(p => p.available <= 1).length

  return (
    <>
      <style>{`
        .fp-wrap { width:100%; }
        .fp-stat-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-bottom:16px; }
        .fp-stat { background:#fff; border:1px solid #e8e8eb; border-radius:8px; padding:16px 20px; }
        .fp-toolbar { background:#fff; border:1px solid #e8e8eb; border-radius:8px; padding:14px 20px; margin-bottom:14px; display:flex; flex-direction:column; gap:10px; }
        .fp-filter-row { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
        .fp-filter-label { font-size:11px; font-weight:600; color:#999; width:44px; flex-shrink:0; }
        .fp-btn { padding:5px 14px; border-radius:20px; border:1px solid #d8d8dc; background:#fff; font-size:12px; cursor:pointer; color:#666; font-family:inherit; }
        .fp-btn.on { background:#1a1a2e; border-color:#1a1a2e; color:#fff; font-weight:600; }
        .fp-s-btn { padding:5px 14px; border-radius:20px; border:1px solid #d8d8dc; background:#fff; font-size:12px; cursor:pointer; color:#666; font-family:inherit; }
        .fp-s-btn.on { background:#C94E1A; border-color:#C94E1A; color:#fff; font-weight:600; }
        .fp-search { padding:7px 12px; border:1px solid #d8d8dc; border-radius:5px; font-size:13px; width:240px; outline:none; font-family:inherit; }
        .fp-search:focus { border-color:#C94E1A; }
        .fp-card { background:#fff; border:1px solid #e8e8eb; border-radius:8px; overflow:hidden; }
        .fp-tbl { width:100%; border-collapse:collapse; font-size:13px; }
        .fp-tbl th { padding:10px 14px; text-align:left; font-size:11px; font-weight:600; color:#999; background:#fafafa; border-bottom:1px solid #f0f0f2; white-space:nowrap; }
        .fp-tbl td { padding:13px 14px; border-bottom:1px solid #f5f5f7; color:#333; vertical-align:middle; white-space:nowrap; }
        .fp-tbl tr:last-child td { border-bottom:none; }
        .fp-tbl tbody tr { cursor:pointer; }
        .fp-tbl tbody tr:hover td { background:#fff8f5; }
        .fp-tbl tbody tr.sel td { background:#fff3ee; }
        .fp-badge { display:inline-block; padding:3px 9px; border-radius:4px; font-size:11px; font-weight:600; }
        .fp-size-tag { display:inline-block; padding:2px 6px; background:#f0f0f2; border-radius:3px; font-size:10px; color:#555; margin-right:3px; }
        .fp-bar-bg { width:64px; height:5px; background:#f0f0f2; border-radius:3px; display:inline-block; vertical-align:middle; margin-right:5px; }
        .fp-bar-fill { height:5px; border-radius:3px; background:#C94E1A; }

        /* 상세 패널 */
        .fp-detail { background:#fff; border:1px solid #e8e8eb; border-radius:8px; margin-top:12px; overflow:hidden; }
        .fp-detail-head { padding:14px 20px; background:#1a1a2e; color:#fff; display:flex; align-items:center; justify-content:space-between; }
        .fp-detail-grid { display:grid; grid-template-columns:repeat(4,1fr); }
        .fp-detail-cell { padding:16px 20px; border-right:1px solid #f0f0f2; border-bottom:1px solid #f0f0f2; }
        .fp-detail-cell:nth-child(4n) { border-right:none; }

        @media (max-width:1100px) {
          .fp-stat-grid { grid-template-columns:repeat(2,1fr); }
          .fp-detail-grid { grid-template-columns:repeat(2,1fr); }
          .fp-detail-cell:nth-child(4n) { border-right:1px solid #f0f0f2; }
          .fp-detail-cell:nth-child(2n) { border-right:none; }
        }
        @media (max-width:768px) { .fp-search { width:100%; } }
      `}</style>

      <div className="fp-wrap">
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:'20px', flexWrap:'wrap', gap:'10px' }}>
          <div>
            <div style={{ fontSize:'11px', color:'#aaa', marginBottom:'4px' }}>피팅박스 관리 › 피팅 제품 목록</div>
            <h1 style={{ fontSize:'22px', fontWeight:800, color:'#1a1a2e', margin:0 }}>피팅 제품 목록</h1>
          </div>
          <button
            style={{ padding:'9px 20px', background:'#C94E1A', color:'#fff', border:'none', borderRadius:'5px', fontSize:'13px', fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}
            onClick={() => location.href='/clyq/fitting/products/new'}
          >
            피팅 제품 등록
          </button>
        </div>

        {/* 요약 */}
        <div className="fp-stat-grid">
          {[
            { label:'전체 피팅 제품', value: products.length + '개', color:'#1a1a2e' },
            { label:'총 보유 수량',   value: totalStock + '개',       color:'#2563eb' },
            { label:'현재 피팅중',    value: inFitting + '개',        color:'#C94E1A' },
            { label:'가용 재고',      value: available + '개',        color: available <= 5 ? '#dc2626' : '#16a34a' },
          ].map(s => (
            <div key={s.label} className="fp-stat">
              <div style={{ fontSize:'11px', color:'#999', marginBottom:'8px' }}>{s.label}</div>
              <div style={{ fontSize:'24px', fontWeight:800, color:s.color }}>{s.value}</div>
              {s.label === '가용 재고' && lowStock > 0 && (
                <div style={{ fontSize:'11px', color:'#C94E1A', marginTop:'4px' }}>재고 부족 {lowStock}개 제품</div>
              )}
            </div>
          ))}
        </div>

        {/* 필터 */}
        <div className="fp-toolbar">
          <div className="fp-filter-row">
            <span className="fp-filter-label">브랜드</span>
            {brands.map(b => (
              <button key={b} className={brandFilter === b ? 'fp-btn on' : 'fp-btn'} onClick={() => setBrandFilter(b)}>{b}</button>
            ))}
          </div>
          <div className="fp-filter-row">
            <span className="fp-filter-label">상태</span>
            {statuses.map(s => (
              <button key={s} className={statusFilter === s ? 'fp-s-btn on' : 'fp-s-btn'} onClick={() => setStatusFilter(s)}>{s}</button>
            ))}
            <div style={{ marginLeft:'auto' }}>
              <input className="fp-search" type="text" placeholder="제품명 · SKU · 브랜드 검색" value={search} onChange={e => setSearch(e.target.value)}/>
            </div>
          </div>
        </div>

        {/* 테이블 */}
        <div className="fp-card">
          <div style={{ overflowX:'auto' }}>
            <table className="fp-tbl">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>브랜드</th>
                  <th style={{ minWidth:'180px' }}>제품명</th>
                  <th>사이즈</th>
                  <th style={{ textAlign:'center' }}>총 수량</th>
                  <th style={{ textAlign:'center' }}>피팅중</th>
                  <th style={{ textAlign:'center' }}>가용</th>
                  <th style={{ textAlign:'center' }}>전환율</th>
                  <th style={{ textAlign:'right' }}>배상 기준가</th>
                  <th>보관 위치</th>
                  <th style={{ textAlign:'center' }}>상태</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => {
                  const ss = statusStyle[p.status] || { bg:'#f5f5f7', color:'#999' }
                  const isSel = selected === p.id
                  return (
                    <tr key={p.id} className={isSel ? 'sel' : ''} onClick={() => setSelected(isSel ? null : p.id)}>
                      <td style={{ fontSize:'11px', color:'#888', fontFamily:'monospace' }}>{p.id}</td>
                      <td style={{ fontWeight:700 }}>{p.brand}</td>
                      <td>
                        <div style={{ fontWeight:600, color:'#1a1a2e' }}>{p.name}</div>
                        <div style={{ fontSize:'11px', color:'#bbb', marginTop:'2px' }}>{p.sku}</div>
                      </td>
                      <td>{p.sizes.map(s => <span key={s} className="fp-size-tag">{s}</span>)}</td>
                      <td style={{ textAlign:'center', fontWeight:600 }}>{p.totalStock}</td>
                      <td style={{ textAlign:'center', fontWeight:700, color: p.inFitting > 0 ? '#C94E1A' : '#bbb' }}>{p.inFitting}</td>
                      <td style={{ textAlign:'center', fontWeight:700, color: p.available <= 1 ? '#dc2626' : '#16a34a' }}>{p.available}</td>
                      <td style={{ textAlign:'center' }}>
                        <div style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
                          <div className="fp-bar-bg">
                            <div className="fp-bar-fill" style={{ width: p.convRate + '%' }}></div>
                          </div>
                          <span style={{ fontSize:'12px', fontWeight:700, color: p.convRate >= 55 ? '#16a34a' : '#C94E1A' }}>{p.convRate}%</span>
                        </div>
                      </td>
                      <td style={{ textAlign:'right', fontWeight:500 }}>{p.penaltyBase.toLocaleString()}원</td>
                      <td style={{ fontSize:'12px', color:'#888' }}>{p.storageLocation}</td>
                      <td style={{ textAlign:'center' }}>
                        <span className="fp-badge" style={{ background:ss.bg, color:ss.color }}>{p.status}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 상세 패널 */}
        {selected && (() => {
          const p = products.find(x => x.id === selected)
          if (!p) return null
          return (
            <div className="fp-detail">
              <div className="fp-detail-head">
                <div>
                  <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)', marginBottom:'3px' }}>제품 상세</div>
                  <div style={{ fontSize:'16px', fontWeight:800 }}>{p.name}</div>
                </div>
                <div style={{ display:'flex', gap:'8px' }}>
                  <button
                    style={{ padding:'7px 16px', background:'rgba(255,255,255,0.1)', border:'none', color:'#fff', borderRadius:'4px', fontSize:'12px', cursor:'pointer', fontFamily:'inherit' }}
                    onClick={() => location.href='/clyq/fitting/products/new'}
                  >
                    수정
                  </button>
                  <button
                    onClick={() => setSelected(null)}
                    style={{ padding:'7px 14px', background:'rgba(255,255,255,0.08)', border:'none', color:'#fff', borderRadius:'4px', fontSize:'12px', cursor:'pointer', fontFamily:'inherit' }}
                  >
                    닫기
                  </button>
                </div>
              </div>
              <div className="fp-detail-grid">
                {[
                  { label:'브랜드',       val: p.brand },
                  { label:'SKU',          val: p.sku },
                  { label:'카테고리',     val: p.category },
                  { label:'시즌',         val: p.season },
                  { label:'입수 유형',    val: p.acquisitionType },
                  { label:'제품 상태',    val: p.condition },
                  { label:'등록일',       val: p.regDate },
                  { label:'보관 위치',    val: p.storageLocation },
                  { label:'이달 피팅',    val: p.monthFit + '건' },
                  { label:'구매 전환',    val: p.converted + '건' },
                  { label:'전환율',       val: p.convRate + '%' },
                  { label:'배상 기준가',  val: p.penaltyBase.toLocaleString() + '원' },
                ].map(cell => (
                  <div key={cell.label} className="fp-detail-cell">
                    <div style={{ fontSize:'11px', color:'#999', marginBottom:'4px' }}>{cell.label}</div>
                    <div style={{ fontSize:'13px', fontWeight:600, color:'#1a1a2e' }}>{cell.val}</div>
                  </div>
                ))}
              </div>
            </div>
          )
        })()}
      </div>
    </>
  )
}
