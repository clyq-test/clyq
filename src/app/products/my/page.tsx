// @ts-nocheck
'use client'
import { useState } from 'react'

const allProducts = [
  { id:'MA-2026-CT-001', name:'Oversized Cashmere Wool Coat', nameKo:'오버핏 캐시미어 울 코트', category:'여성 | 의류 > 아우터 > 코트', regDate:'2026-03-10', regularPrice:498000, salePrice:298000, commission:30, supplyPrice:208600, sellStatus:'판매중', fitting:true, display:'Y', season:'2026 F/W', stock:12, optionYn:'Y' },
  { id:'MA-2026-ST-003', name:'Wool Blazer Set-up', nameKo:'울 블레이저 세트업', category:'여성 | 의류 > 원피스·세트 > 세트업', regDate:'2026-03-10', regularPrice:520000, salePrice:389000, commission:30, supplyPrice:272300, sellStatus:'판매중', fitting:true, display:'Y', season:'2026 F/W', stock:8, optionYn:'Y' },
  { id:'MA-2026-JK-007', name:'Leather Jacket', nameKo:'레더 재킷', category:'여성 | 의류 > 아우터 > 재킷', regDate:'2026-03-15', regularPrice:680000, salePrice:456000, commission:30, supplyPrice:319200, sellStatus:'판매중', fitting:false, display:'Y', season:'2026 F/W', stock:3, optionYn:'Y' },
  { id:'MA-2026-KN-012', name:'Cashmere Knit', nameKo:'캐시미어 니트', category:'여성 | 의류 > 상의 > 니트', regDate:'2026-03-20', regularPrice:248000, salePrice:178000, commission:30, supplyPrice:124600, sellStatus:'판매중', fitting:true, display:'Y', season:'2026 F/W', stock:0, optionYn:'N' },
  { id:'MA-2026-BL-005', name:'Silk Blouse', nameKo:'실크 블라우스', category:'여성 | 의류 > 상의 > 블라우스', regDate:'2026-02-01', regularPrice:198000, salePrice:148000, commission:30, supplyPrice:103600, sellStatus:'품절', fitting:false, display:'Y', season:'2026 S/S', stock:0, optionYn:'Y' },
  { id:'MA-2025-CT-088', name:'Double Wool Coat', nameKo:'더블 울 코트', category:'여성 | 의류 > 아우터 > 코트', regDate:'2025-09-05', regularPrice:598000, salePrice:398000, commission:30, supplyPrice:278600, sellStatus:'판매중지', fitting:false, display:'N', season:'2025 F/W', stock:5, optionYn:'Y' },
  { id:'MA-2025-SK-044', name:'Midi Flare Skirt', nameKo:'미디 플레어 스커트', category:'여성 | 의류 > 하의 > 스커트', regDate:'2025-08-20', regularPrice:178000, salePrice:128000, commission:27, supplyPrice:93440, sellStatus:'품절', fitting:false, display:'Y', season:'2025 F/W', stock:0, optionYn:'N' },
  { id:'MA-2025-KN-031', name:'Merino Wool Turtleneck', nameKo:'메리노 울 터틀넥', category:'여성 | 의류 > 상의 > 니트', regDate:'2025-08-10', regularPrice:168000, salePrice:118000, commission:27, supplyPrice:86140, sellStatus:'판매중', fitting:true, display:'Y', season:'2025 F/W', stock:14, optionYn:'Y' },
  { id:'MA-2025-PA-019', name:'Wide Leg Trousers', nameKo:'와이드 레그 트라우저', category:'여성 | 의류 > 하의 > 팬츠', regDate:'2025-07-15', regularPrice:228000, salePrice:168000, commission:27, supplyPrice:122640, sellStatus:'판매중', fitting:false, display:'Y', season:'2025 S/S', stock:7, optionYn:'Y' },
  { id:'MA-2025-BL-011', name:'Linen Shirt Blouse', nameKo:'리넨 셔츠 블라우스', category:'여성 | 의류 > 상의 > 블라우스', regDate:'2025-04-01', regularPrice:148000, salePrice:98000, commission:27, supplyPrice:71540, sellStatus:'품절', fitting:false, display:'Y', season:'2025 S/S', stock:0, optionYn:'N' },
]

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 50]
const sellStatusOptions = ['전체','판매중','품절','판매중지']
const fittingOptions = ['전체','피팅가능','피팅불가']
const seasonOptions = ['전체','2026 F/W','2026 S/S','2025 F/W','2025 S/S']
const searchTypeOptions = ['상품코드','상품명','SKU']
const periodButtons = ['오늘','7일','15일','1개월','3개월','전체']

export default function ProductsMyPage() {
  const [sellStatus, setSellStatus] = useState('전체')
  const [fitting, setFitting]       = useState('전체')
  const [season, setSeason]         = useState('전체')
  const [searchType, setSearchType] = useState('상품명')
  const [searchText, setSearchText] = useState('')
  const [period, setPeriod]         = useState('전체')
  const [page, setPage]             = useState(1)
  const [perPage, setPerPage]       = useState(20)
  const [checked, setChecked]       = useState([])
  const [excelOpen, setExcelOpen]   = useState(false)

  const filtered = allProducts.filter(p => {
    const matchStatus  = sellStatus === '전체' || p.sellStatus === sellStatus
    const matchFitting = fitting === '전체' || (fitting === '피팅가능' ? p.fitting : !p.fitting)
    const matchSeason  = season === '전체' || p.season === season
    const matchSearch  = !searchText || (
      searchType === '상품코드' ? p.id.includes(searchText) :
      searchType === '상품명'   ? (p.name.toLowerCase().includes(searchText.toLowerCase()) || p.nameKo.includes(searchText)) :
      p.id.includes(searchText)
    )
    return matchStatus && matchFitting && matchSeason && matchSearch
  })

  const totalPages = Math.ceil(filtered.length / perPage)
  const paginated  = filtered.slice((page - 1) * perPage, page * perPage)

  function toggleCheck(id) {
    setChecked(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }
  function toggleAll() {
    const ids = paginated.map(p => p.id)
    const allChecked = ids.every(id => checked.includes(id))
    setChecked(allChecked ? checked.filter(id => !ids.includes(id)) : [...new Set([...checked, ...ids])])
  }
  function reset() {
    setSellStatus('전체'); setFitting('전체'); setSeason('전체')
    setSearchType('상품명'); setSearchText(''); setPeriod('전체'); setPage(1)
  }

  const pageNums = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <>
      <style>{`
        .pm-wrap { width:100%; font-size:13px; }
        .pm-head { display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:20px; flex-wrap:wrap; gap:10px; }

        /* 검색 영역 */
        .pm-search-box { background:#fff; border:1px solid #e0e0e0; border-radius:6px; margin-bottom:14px; overflow:hidden; }
        .pm-search-row { display:flex; align-items:center; border-bottom:1px solid #f0f0f0; min-height:46px; }
        .pm-search-row:last-child { border-bottom:none; }
        .pm-search-label { width:110px; min-width:110px; padding:10px 16px; font-size:12px; font-weight:600; color:#555; background:#fafafa; border-right:1px solid #f0f0f0; align-self:stretch; display:flex; align-items:center; }
        .pm-search-body { padding:8px 16px; display:flex; align-items:center; gap:8px; flex-wrap:wrap; flex:1; }
        .pm-period-btn { padding:4px 12px; border:1px solid #d0d0d8; border-radius:3px; background:#fff; font-size:12px; cursor:pointer; color:#555; font-family:inherit; }
        .pm-period-btn.on { background:#1a1a2e; border-color:#1a1a2e; color:#fff; font-weight:600; }
        .pm-select { padding:6px 10px; border:1px solid #d0d0d8; border-radius:3px; font-size:12px; font-family:inherit; outline:none; color:#333; background:#fff; cursor:pointer; }
        .pm-select:focus { border-color:#C94E1A; }
        .pm-input { padding:6px 12px; border:1px solid #d0d0d8; border-radius:3px; font-size:12px; font-family:inherit; outline:none; color:#333; }
        .pm-input:focus { border-color:#C94E1A; }
        .pm-btn-primary { padding:7px 24px; background:#1a1a2e; color:#fff; border:none; border-radius:3px; font-size:13px; font-weight:600; cursor:pointer; font-family:inherit; }
        .pm-btn-primary:hover { background:#2d2d44; }
        .pm-btn-reset { padding:7px 20px; background:#fff; color:#555; border:1px solid #d0d0d8; border-radius:3px; font-size:13px; cursor:pointer; font-family:inherit; }
        .pm-btn-reset:hover { background:#f5f5f7; }
        .pm-btn-sm { padding:5px 12px; background:#fff; color:#555; border:1px solid #d0d0d8; border-radius:3px; font-size:12px; cursor:pointer; font-family:inherit; }
        .pm-btn-sm:hover { background:#f5f5f7; }

        /* 엑셀 섹션 */
        .pm-excel-section { background:#fff; border:1px solid #e0e0e0; border-radius:6px; margin-bottom:14px; }
        .pm-excel-header { padding:13px 18px; display:flex; align-items:center; justify-content:space-between; cursor:pointer; user-select:none; }
        .pm-excel-title { font-size:14px; font-weight:700; color:#1a1a2e; }

        /* 결과 바 */
        .pm-result-bar { display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; flex-wrap:wrap; gap:8px; }
        .pm-result-count { font-size:14px; font-weight:700; color:#1a1a2e; }
        .pm-result-note { font-size:11px; color:#999; margin-top:2px; }
        .pm-result-right { display:flex; align-items:center; gap:8px; }

        /* 테이블 */
        .pm-card { background:#fff; border:1px solid #e0e0e0; border-radius:6px; overflow:hidden; }
        .pm-tbl { width:100%; border-collapse:collapse; font-size:12px; }
        .pm-tbl th { padding:10px 10px; text-align:center; font-size:11px; font-weight:600; color:#555; background:#fafafa; border-bottom:1px solid #e0e0e0; border-right:1px solid #f0f0f0; white-space:nowrap; }
        .pm-tbl th:last-child { border-right:none; }
        .pm-tbl td { padding:10px 10px; border-bottom:1px solid #f0f0f0; border-right:1px solid #f5f5f5; color:#333; vertical-align:middle; text-align:center; white-space:nowrap; }
        .pm-tbl td:last-child { border-right:none; }
        .pm-tbl tr:last-child td { border-bottom:none; }
        .pm-tbl tbody tr:hover td { background:#fff8f5; }
        .pm-prod-code { color:#C94E1A; font-weight:600; cursor:pointer; font-size:12px; }
        .pm-prod-code:hover { text-decoration:underline; }
        .pm-prod-name { text-align:left; }
        .pm-prod-name-en { color:#C94E1A; font-weight:500; cursor:pointer; font-size:12px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:200px; display:block; }
        .pm-prod-name-en:hover { text-decoration:underline; }
        .pm-prod-name-ko { font-size:11px; color:#888; margin-top:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:200px; display:block; }
        .pm-thumb { width:36px; height:36px; border-radius:3px; background:#f0f0f2; object-fit:cover; flex-shrink:0; }
        .pm-thumb-wrap { display:flex; align-items:center; gap:8px; }
        .pm-badge-fit { display:inline-block; padding:2px 6px; border-radius:3px; font-size:10px; font-weight:700; background:#fff7ed; color:#C94E1A; }
        .pm-sell-on { color:#16a34a; font-weight:600; }
        .pm-sell-out { color:#aaa; }
        .pm-sell-stop { color:#dc2626; }
        .pm-stock-warn { color:#C94E1A; font-weight:700; }

        /* 페이지네이션 */
        .pm-pagination { display:flex; align-items:center; justify-content:center; gap:4px; padding:24px 0; }
        .pm-page-btn { width:32px; height:32px; border:1px solid #d0d0d8; background:#fff; border-radius:3px; font-size:12px; cursor:pointer; display:flex; align-items:center; justify-content:center; color:#555; font-family:inherit; }
        .pm-page-btn:hover { background:#f5f5f7; }
        .pm-page-btn.on { background:#1a1a2e; border-color:#1a1a2e; color:#fff; font-weight:700; }
        .pm-page-btn:disabled { color:#ccc; cursor:default; background:#fafafa; }

        @media (max-width:1100px) { .pm-tbl { font-size:11px; } }
        @media (max-width:768px) {
          .pm-search-label { width:80px; min-width:80px; font-size:11px; }
          .pm-result-bar { flex-direction:column; align-items:flex-start; }
        }
      `}</style>

      <div className="pm-wrap">

        {/* 헤더 */}
        <div className="pm-head">
          <div>
            <div style={{ fontSize:'11px', color:'#aaa', marginBottom:'4px' }}>내 상품 관리 › 내 상품 목록</div>
            <h1 style={{ fontSize:'22px', fontWeight:800, color:'#1a1a2e', margin:0 }}>내 상품 목록</h1>
          </div>
          <button className="pm-btn-primary" onClick={() => location.href='/admin/products/new'}>
            상품 등록
          </button>
        </div>

        {/* 검색 영역 */}
        <div className="pm-search-box">

          <div className="pm-search-row">
            <div className="pm-search-label">등록일자</div>
            <div className="pm-search-body">
              <input className="pm-input" type="date" style={{ width:'130px' }}/>
              <span style={{ color:'#aaa' }}>~</span>
              <input className="pm-input" type="date" style={{ width:'130px' }}/>
              <div style={{ display:'flex', gap:'4px', marginLeft:'4px' }}>
                {periodButtons.map(p => (
                  <button key={p} className={period === p ? 'pm-period-btn on' : 'pm-period-btn'} onClick={() => setPeriod(p)}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pm-search-row">
            <div className="pm-search-label">검색조건</div>
            <div className="pm-search-body">
              <select className="pm-select" value={sellStatus} onChange={e => { setSellStatus(e.target.value); setPage(1) }}>
                {sellStatusOptions.map(s => <option key={s}>{s}</option>)}
              </select>
              <select className="pm-select" value={fitting} onChange={e => { setFitting(e.target.value); setPage(1) }}>
                {fittingOptions.map(f => <option key={f}>{f}</option>)}
              </select>
              <select className="pm-select" value={season} onChange={e => { setSeason(e.target.value); setPage(1) }}>
                {seasonOptions.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className="pm-search-row">
            <div className="pm-search-label">상품정보</div>
            <div className="pm-search-body">
              <select className="pm-select" value={searchType} onChange={e => setSearchType(e.target.value)}>
                {searchTypeOptions.map(s => <option key={s}>{s}</option>)}
              </select>
              <input
                className="pm-input"
                style={{ width:'260px' }}
                type="text"
                placeholder="검색어를 입력하세요"
                value={searchText}
                onChange={e => { setSearchText(e.target.value); setPage(1) }}
                onKeyDown={e => e.key === 'Enter' && setPage(1)}
              />
              <button className="pm-btn-primary" onClick={() => setPage(1)}>조회</button>
              <button className="pm-btn-reset" onClick={reset}>초기화</button>
            </div>
          </div>

        </div>

        {/* 상품 가격/정보 수정 엑셀 섹션 */}
        <div className="pm-excel-section">
          <div className="pm-excel-header" onClick={() => setExcelOpen(v => !v)}>
            <span className="pm-excel-title">상품 가격/정보 수정 (엑셀)</span>
            <span style={{ fontSize:'16px', color:'#888', transform: excelOpen ? 'rotate(180deg)' : 'none', display:'inline-block', transition:'transform 0.2s' }}>▾</span>
          </div>
          {excelOpen && (
            <div style={{ padding:'14px 18px', borderTop:'1px solid #f0f0f0', display:'flex', gap:'10px', flexWrap:'wrap' }}>
              <button className="pm-btn-sm">엑셀 양식 다운로드</button>
              <button className="pm-btn-sm">가격 일괄 수정 업로드</button>
              <button className="pm-btn-sm">재고 일괄 수정 업로드</button>
              <span style={{ fontSize:'11px', color:'#C94E1A', alignSelf:'center' }}>
                엑셀 업로드는 최대 1,000개 상품까지 일괄 수정 가능합니다.
              </span>
            </div>
          )}
        </div>

        {/* 결과 바 */}
        <div className="pm-result-bar">
          <div>
            <div className="pm-result-count">검색결과 {filtered.length}건</div>
            <div className="pm-result-note">
              상품코드를 클릭하시면 상세내용을 변경하실 수 있습니다.
            </div>
          </div>
          <div className="pm-result-right">
            <button className="pm-btn-sm" onClick={() => alert('엑셀 다운로드')}>
              엑셀 다운로드
            </button>
            <select
              className="pm-select"
              value={perPage}
              onChange={e => { setPerPage(Number(e.target.value)); setPage(1) }}
            >
              {ITEMS_PER_PAGE_OPTIONS.map(n => (
                <option key={n} value={n}>{n}개</option>
              ))}
            </select>
          </div>
        </div>

        {/* 테이블 */}
        <div className="pm-card">
          <div style={{ overflowX:'auto' }}>
            <table className="pm-tbl">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={paginated.length > 0 && paginated.every(p => checked.includes(p.id))}
                      onChange={toggleAll}
                      style={{ cursor:'pointer', accentColor:'#C94E1A' }}
                    />
                  </th>
                  <th>상품등록일</th>
                  <th>상품코드</th>
                  <th style={{ textAlign:'left', minWidth:'220px' }}>상품명</th>
                  <th>정상가</th>
                  <th>실판매가</th>
                  <th>수수료</th>
                  <th>공급가</th>
                  <th>재고</th>
                  <th>판매상태</th>
                  <th>피팅박스</th>
                  <th>전시</th>
                  <th>시즌</th>
                  <th style={{ minWidth:'160px' }}>카테고리</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map(p => {
                  const sellClass =
                    p.sellStatus === '판매중' ? 'pm-sell-on' :
                    p.sellStatus === '품절'   ? 'pm-sell-out' : 'pm-sell-stop'
                  return (
                    <tr key={p.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={checked.includes(p.id)}
                          onChange={() => toggleCheck(p.id)}
                          style={{ cursor:'pointer', accentColor:'#C94E1A' }}
                        />
                      </td>
                      <td style={{ color:'#888', fontSize:'11px' }}>{p.regDate}</td>
                      <td>
                        <span className="pm-prod-code" onClick={() => location.href='/admin/products/new'}>
                          {p.id}
                        </span>
                      </td>
                      <td className="pm-prod-name">
                        <div className="pm-thumb-wrap">
                          <div className="pm-thumb" style={{ background: p.fitting ? '#fff7ed' : '#f0f0f2', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px' }}>
                            {p.fitting ? '' : ''}
                          </div>
                          <div>
                            <span className="pm-prod-name-en" title={p.name}>{p.name}</span>
                            <span className="pm-prod-name-ko" title={p.nameKo}>{p.nameKo}</span>
                          </div>
                        </div>
                      </td>
                      <td>{p.regularPrice.toLocaleString()}</td>
                      <td style={{ fontWeight:600 }}>{p.salePrice.toLocaleString()}</td>
                      <td>{p.commission}%</td>
                      <td style={{ color:'#555' }}>{p.supplyPrice.toLocaleString()}</td>
                      <td>
                        <span className={p.stock === 0 ? 'pm-sell-out' : p.stock <= 3 ? 'pm-stock-warn' : ''}>
                          {p.stock === 0 ? '-' : p.stock}
                        </span>
                      </td>
                      <td>
                        <span className={sellClass}>{p.sellStatus}</span>
                      </td>
                      <td>
                        {p.fitting
                          ? <span className="pm-badge-fit">가능</span>
                          : <span style={{ color:'#ccc', fontSize:'11px' }}>-</span>
                        }
                      </td>
                      <td style={{ fontWeight:600, color: p.display === 'Y' ? '#333' : '#ccc' }}>
                        {p.display}
                      </td>
                      <td style={{ color:'#666', fontSize:'11px' }}>{p.season}</td>
                      <td style={{ color:'#666', fontSize:'11px', textAlign:'left' }}>{p.category}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 페이지네이션 */}
        <div className="pm-pagination">
          <button className="pm-page-btn" onClick={() => setPage(1)} disabled={page === 1}>
            {'<<'}
          </button>
          <button className="pm-page-btn" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
            {'<'}
          </button>
          {pageNums.map(n => (
            <button
              key={n}
              className={page === n ? 'pm-page-btn on' : 'pm-page-btn'}
              onClick={() => setPage(n)}
            >
              {n}
            </button>
          ))}
          <button className="pm-page-btn" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
            {'>'}
          </button>
          <button className="pm-page-btn" onClick={() => setPage(totalPages)} disabled={page === totalPages}>
            {'>>'}
          </button>
        </div>

      </div>
    </>
  )
}
