// @ts-nocheck
'use client'
import { useState } from 'react'

const products = [
  {
    id: 'FP-001',
    name: '오버핏 캐시미어 울 코트',
    sku: 'MA-2026-CT-001',
    category: '아우터 > 코트',
    season: '2026 F/W',
    sizes: ['S','M','L'],
    totalStock: 6,
    inFitting: 2,
    returned: 18,
    converted: 9,
    convRate: 50,
    status: '운영중',
  },
  {
    id: 'FP-002',
    name: '울 블레이저 세트업',
    sku: 'MA-2026-ST-003',
    category: '원피스·세트 > 세트업',
    season: '2026 F/W',
    sizes: ['S','M'],
    totalStock: 4,
    inFitting: 1,
    returned: 11,
    converted: 7,
    convRate: 64,
    status: '운영중',
  },
  {
    id: 'FP-003',
    name: '캐시미어 니트',
    sku: 'MA-2026-KN-012',
    category: '상의 > 니트',
    season: '2026 F/W',
    sizes: ['S','M','L','XL'],
    totalStock: 8,
    inFitting: 3,
    returned: 24,
    converted: 15,
    convRate: 63,
    status: '운영중',
  },
  {
    id: 'FP-004',
    name: '실크 블라우스',
    sku: 'MA-2026-BL-005',
    category: '상의 > 블라우스',
    season: '2026 S/S',
    sizes: ['S','M'],
    totalStock: 3,
    inFitting: 0,
    returned: 6,
    converted: 2,
    convRate: 33,
    status: '일시중단',
  },
]

const statusStyle = {
  '운영중':   { bg:'#f0fdf4', color:'#16a34a' },
  '일시중단': { bg:'#fff7ed', color:'#C94E1A' },
  '종료':     { bg:'#f5f5f7', color:'#999' },
}

export default function FittingProductsMyPage() {
  const [search, setSearch] = useState('')

  const filtered = products.filter(p =>
    p.name.includes(search) || p.sku.includes(search)
  )

  return (
    <>
      <style>{`
        .fp-wrap { width:100%; }
        .fp-head { display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:20px; flex-wrap:wrap; gap:10px; }
        .fp-notice { background:#f8f8fb; border:1px solid #e8e8eb; border-left:3px solid #6b7280; border-radius:6px; padding:12px 16px; font-size:12px; color:#666; margin-bottom:20px; line-height:1.7; }
        .fp-toolbar { display:flex; align-items:center; gap:10px; margin-bottom:14px; flex-wrap:wrap; }
        .fp-search { padding:8px 14px; border:1px solid #d8d8dc; border-radius:5px; font-size:13px; width:260px; outline:none; font-family:inherit; }
        .fp-search:focus { border-color:#C94E1A; }
        .fp-card { background:#fff; border:1px solid #e8e8eb; border-radius:8px; overflow:hidden; }
        .fp-tbl { width:100%; border-collapse:collapse; font-size:13px; }
        .fp-tbl th { padding:10px 16px; text-align:left; font-size:11px; font-weight:600; color:#999; background:#fafafa; border-bottom:1px solid #f0f0f2; white-space:nowrap; }
        .fp-tbl td { padding:14px 16px; border-bottom:1px solid #f5f5f7; color:#333; vertical-align:middle; }
        .fp-tbl tr:last-child td { border-bottom:none; }
        .fp-tbl tbody tr:hover td { background:#fafafa; }
        .fp-badge { display:inline-block; padding:3px 9px; border-radius:4px; font-size:11px; font-weight:600; }
        .fp-size-tag { display:inline-block; padding:2px 7px; background:#f0f0f2; border-radius:3px; font-size:11px; color:#555; margin-right:3px; }
        .fp-bar-wrap { width:80px; height:6px; background:#f0f0f2; border-radius:3px; overflow:hidden; display:inline-block; vertical-align:middle; margin-right:6px; }
        .fp-bar-fill { height:6px; border-radius:3px; background:#C94E1A; }
        .fp-stat-num { font-size:13px; font-weight:700; color:#1a1a2e; }
        .fp-sub { font-size:11px; color:#bbb; margin-top:2px; }
        .ro-label { display:inline-flex; align-items:center; gap:4px; font-size:10px; color:#6b7280; background:#f0f0f2; padding:3px 8px; border-radius:3px; font-weight:600; }
        @media (max-width:900px) {
          .fp-search { width:100%; }
        }
      `}</style>

      <div className="fp-wrap">

        {/* 헤더 */}
        <div className="fp-head">
          <div>
            <div style={{ fontSize:'11px', color:'#aaa', marginBottom:'4px' }}>피팅박스 현황 › 피팅 제품 목록</div>
            <h1 style={{ fontSize:'22px', fontWeight:800, color:'#1a1a2e', margin:0 }}>피팅 제품 (내 브랜드)</h1>
          </div>
          <span className="ro-label">열람 전용 — 수정은 CLYQ 본사에 문의</span>
        </div>

        {/* 안내 */}
        <div className="fp-notice">
          피팅박스 제품은 CLYQ 본사가 직접 구매·보관·관리합니다.<br/>
          아래 목록은 내 브랜드 제품 중 피팅박스에 등록된 항목입니다. 재고 수량 및 운영 상태 변경은 CLYQ 담당자에게 문의하세요.
        </div>

        {/* 요약 카드 */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'14px', marginBottom:'20px' }}>
          {[
            { label:'등록 제품수', value:'4', unit:'개', color:'#1a1a2e' },
            { label:'현재 피팅중', value:'6', unit:'건', color:'#C94E1A' },
            { label:'누적 피팅 완료', value:'59', unit:'건', color:'#2563eb' },
            { label:'평균 전환율', value:'54', unit:'%', color:'#16a34a' },
          ].map(s => (
            <div key={s.label} style={{ background:'#fff', border:'1px solid #e8e8eb', borderRadius:'8px', padding:'18px 20px' }}>
              <div style={{ fontSize:'11px', color:'#999', marginBottom:'8px' }}>{s.label}</div>
              <div style={{ display:'flex', alignItems:'baseline', gap:'3px' }}>
                <span style={{ fontSize:'26px', fontWeight:800, color:s.color }}>{s.value}</span>
                <span style={{ fontSize:'12px', color:'#aaa' }}>{s.unit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 검색 */}
        <div className="fp-toolbar">
          <input
            className="fp-search"
            type="text"
            placeholder="상품명 또는 SKU 검색"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <span style={{ fontSize:'12px', color:'#aaa' }}>총 {filtered.length}개 제품</span>
        </div>

        {/* 테이블 */}
        <div className="fp-card">
          <div style={{ overflowX:'auto' }}>
            <table className="fp-tbl">
              <thead>
                <tr>
                  <th>제품명</th>
                  <th>카테고리</th>
                  <th>시즌</th>
                  <th>사이즈</th>
                  <th style={{ textAlign:'center' }}>보유 수량</th>
                  <th style={{ textAlign:'center' }}>피팅중</th>
                  <th style={{ textAlign:'center' }}>누적 피팅</th>
                  <th style={{ textAlign:'center' }}>전환율</th>
                  <th style={{ textAlign:'center' }}>상태</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id}>
                    <td>
                      <div style={{ fontWeight:700, color:'#1a1a2e' }}>{p.name}</div>
                      <div className="fp-sub">{p.sku}</div>
                    </td>
                    <td style={{ color:'#666', fontSize:'12px' }}>{p.category}</td>
                    <td style={{ color:'#666', fontSize:'12px' }}>{p.season}</td>
                    <td>
                      {p.sizes.map(s => (
                        <span key={s} className="fp-size-tag">{s}</span>
                      ))}
                    </td>
                    <td style={{ textAlign:'center' }}>
                      <span className="fp-stat-num">{p.totalStock}</span>
                      <div className="fp-sub">개</div>
                    </td>
                    <td style={{ textAlign:'center' }}>
                      <span style={{ fontWeight:700, color: p.inFitting > 0 ? '#C94E1A' : '#bbb' }}>
                        {p.inFitting}건
                      </span>
                    </td>
                    <td style={{ textAlign:'center' }}>
                      <span className="fp-stat-num">{p.returned}</span>
                      <div className="fp-sub">건 완료</div>
                    </td>
                    <td style={{ textAlign:'center' }}>
                      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'6px' }}>
                        <div className="fp-bar-wrap">
                          <div className="fp-bar-fill" style={{ width: p.convRate + '%' }}></div>
                        </div>
                        <span style={{ fontWeight:700, color: p.convRate >= 50 ? '#16a34a' : '#C94E1A' }}>
                          {p.convRate}%
                        </span>
                      </div>
                    </td>
                    <td style={{ textAlign:'center' }}>
                      <span className="fp-badge" style={{ background:statusStyle[p.status].bg, color:statusStyle[p.status].color }}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </>
  )
}
