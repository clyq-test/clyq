// @ts-nocheck
'use client'
import { useState } from 'react'

const INIT_PRODUCTS = [
  { id:'APR-2026-001', brand:'MARCIA', sku:'MA-2026-DR-021', name:'Silk Wrap Dress', nameKo:'실크 랩 드레스', category:'원피스·세트 > 미디드레스', season:'2026 S/S', regularPrice:398000, salePrice:298000, commission:30, fitting:true, submittedAt:'2026-05-15 10:22', status:'승인 대기', rejectReason:'' },
  { id:'APR-2026-002', brand:'MATIN KIM', sku:'MK-2026-CT-005', name:'Double Breasted Wool Coat', nameKo:'더블 브레스트 울 코트', category:'아우터 > 코트', season:'2026 F/W', regularPrice:680000, salePrice:498000, commission:30, fitting:true, submittedAt:'2026-05-15 09:44', status:'승인 대기', rejectReason:'' },
  { id:'APR-2026-003', brand:'EENK', sku:'EK-2026-SK-007', name:'Asymmetric Pleated Skirt', nameKo:'비대칭 플리츠 스커트', category:'하의 > 스커트', season:'2026 S/S', regularPrice:228000, salePrice:168000, commission:28, fitting:false, submittedAt:'2026-05-14 16:30', status:'승인 대기', rejectReason:'' },
  { id:'APR-2026-004', brand:'ANDERSSONBELL', sku:'AB-2026-BL-009', name:'Oversized Linen Blazer', nameKo:'오버사이즈 리넨 블레이저', category:'아우터 > 재킷', season:'2026 S/S', regularPrice:318000, salePrice:248000, commission:30, fitting:true, submittedAt:'2026-05-14 14:10', status:'검토중', rejectReason:'' },
  { id:'APR-2026-005', brand:'D.POUND', sku:'DP-2026-KN-003', name:'Cashmere Blend Cardigan', nameKo:'캐시미어 블렌드 가디건', category:'상의 > 니트', season:'2026 F/W', regularPrice:248000, salePrice:188000, commission:27, fitting:false, submittedAt:'2026-05-13 11:55', status:'승인 완료', rejectReason:'' },
  { id:'APR-2026-006', brand:'ANOTHER A', sku:'AA-2026-PA-002', name:'Wide Leg Linen Pants', nameKo:'와이드 레그 리넨 팬츠', category:'하의 > 팬츠', season:'2026 S/S', regularPrice:198000, salePrice:148000, commission:27, fitting:false, submittedAt:'2026-05-13 09:20', status:'반려', rejectReason:'상품 이미지 해상도 미달 (960px 이하). 재촬영 후 재신청 바랍니다.' },
  { id:'APR-2026-007', brand:'ADER ERROR', sku:'AE-2026-JK-004', name:'Graphic Print Denim Jacket', nameKo:'그래픽 프린트 데님 재킷', category:'아우터 > 재킷', season:'2026 S/S', regularPrice:358000, salePrice:278000, commission:30, fitting:true, submittedAt:'2026-05-12 15:40', status:'승인 완료', rejectReason:'' },
  { id:'APR-2026-008', brand:'EIGHT', sku:'EI-2026-TS-006', name:'Cotton Pique Polo Shirt', nameKo:'코튼 피케 폴로 셔츠', category:'상의 > 티셔츠', season:'2026 S/S', regularPrice:128000, salePrice:98000, commission:25, fitting:false, submittedAt:'2026-05-12 11:10', status:'반려', rejectReason:'판매가 정상가 대비 할인율이 70% 초과. 가격 정책 위반.' },
]

const STATUS_STYLE = {
  '승인 대기': { bg:'#eff6ff', color:'#2563eb' },
  '검토중':    { bg:'#fefce8', color:'#ca8a04' },
  '승인 완료': { bg:'#f0fdf4', color:'#16a34a' },
  '반려':      { bg:'#fff1f0', color:'#dc2626' },
}

const FILTER_OPTS   = ['전체','승인 대기','검토중','승인 완료','반려']
const BRAND_OPTS    = ['전체','MARCIA','MATIN KIM','EENK','D.POUND','ANDERSSONBELL','ANOTHER A','EIGHT','ADER ERROR']

export default function ApprovalPage() {
  const [rows, setRows]         = useState(INIT_PRODUCTS)
  const [statusFilter, setStatusFilter] = useState('전체')
  const [brandFilter, setBrandFilter]   = useState('전체')
  const [search, setSearch]     = useState('')
  const [modal, setModal]       = useState(null)
  const [rejectText, setRejectText]     = useState('')
  const [actionType, setActionType]     = useState('')

  const visible = rows.filter(r => {
    const okS = statusFilter === '전체' || r.status === statusFilter
    const okB = brandFilter === '전체' || r.brand === brandFilter
    const okQ = !search || r.name.includes(search) || r.nameKo.includes(search) || r.sku.includes(search)
    return okS && okB && okQ
  })

  const pending  = rows.filter(r => r.status === '승인 대기').length
  const reviewing= rows.filter(r => r.status === '검토중').length
  const approved = rows.filter(r => r.status === '승인 완료').length
  const rejected = rows.filter(r => r.status === '반려').length

  function doApprove(id) {
    setRows(prev => prev.map(r => r.id === id ? { ...r, status:'승인 완료', rejectReason:'' } : r))
    setModal(null)
    setActionType('')
  }

  function doReview(id) {
    setRows(prev => prev.map(r => r.id === id ? { ...r, status:'검토중' } : r))
    setModal(null)
    setActionType('')
  }

  function doReject(id) {
    if (!rejectText.trim()) return
    setRows(prev => prev.map(r => r.id === id ? { ...r, status:'반려', rejectReason:rejectText } : r))
    setModal(null)
    setRejectText('')
    setActionType('')
  }

  function openModal(row, action) {
    setModal(row)
    setActionType(action || '')
    setRejectText('')
  }

  const statCards = [
    { label:'승인 대기', value: pending,   color:'#2563eb', onClick: () => setStatusFilter('승인 대기') },
    { label:'검토중',    value: reviewing, color:'#ca8a04', onClick: () => setStatusFilter('검토중') },
    { label:'승인 완료', value: approved,  color:'#16a34a', onClick: () => setStatusFilter('승인 완료') },
    { label:'반려',      value: rejected,  color:'#dc2626', onClick: () => setStatusFilter('반려') },
  ]

  return (
    <>
      <style>{`
        .ap-wrap { width:100%; }
        .ap-kpi { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-bottom:16px; }
        .ap-kpi-card { background:#fff; border:1px solid #e8e8eb; border-radius:8px; padding:16px 20px; cursor:pointer; transition:box-shadow 0.15s; }
        .ap-kpi-card:hover { box-shadow:0 4px 12px rgba(0,0,0,0.07); }
        .ap-toolbar { background:#fff; border:1px solid #e8e8eb; border-radius:8px; padding:14px 20px; margin-bottom:14px; display:flex; flex-direction:column; gap:10px; }
        .ap-frow { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
        .ap-flabel { font-size:11px; font-weight:600; color:#999; width:44px; flex-shrink:0; }
        .ap-fb { padding:5px 14px; border-radius:20px; border:1px solid #d8d8dc; background:#fff; font-size:12px; cursor:pointer; color:#666; font-family:inherit; }
        .ap-fb.on { background:#1a1a2e; border-color:#1a1a2e; color:#fff; font-weight:600; }
        .ap-bb { padding:5px 14px; border-radius:20px; border:1px solid #d8d8dc; background:#fff; font-size:12px; cursor:pointer; color:#666; font-family:inherit; }
        .ap-bb.on { background:#C94E1A; border-color:#C94E1A; color:#fff; font-weight:600; }
        .ap-search { padding:7px 12px; border:1px solid #d8d8dc; border-radius:5px; font-size:13px; outline:none; font-family:inherit; width:240px; margin-left:auto; }
        .ap-search:focus { border-color:#C94E1A; }
        .ap-card { background:#fff; border:1px solid #e8e8eb; border-radius:8px; overflow:hidden; }
        .ap-tbl { width:100%; border-collapse:collapse; font-size:13px; }
        .ap-tbl th { padding:10px 14px; text-align:left; font-size:11px; font-weight:600; color:#999; background:#fafafa; border-bottom:1px solid #f0f0f2; white-space:nowrap; }
        .ap-tbl td { padding:12px 14px; border-bottom:1px solid #f5f5f7; color:#333; vertical-align:middle; white-space:nowrap; }
        .ap-tbl tr:last-child td { border-bottom:none; }
        .ap-tbl tbody tr:hover td { background:#fafafa; }
        .ap-bdg { display:inline-block; padding:3px 9px; border-radius:4px; font-size:11px; font-weight:600; }
        .ap-fit-tag { display:inline-block; padding:2px 6px; background:#fff7ed; color:#C94E1A; border-radius:3px; font-size:10px; font-weight:700; }
        .ap-btn-approve { padding:5px 12px; background:#16a34a; color:#fff; border:none; border-radius:3px; font-size:11px; cursor:pointer; font-family:inherit; font-weight:600; }
        .ap-btn-review  { padding:5px 12px; background:#ca8a04; color:#fff; border:none; border-radius:3px; font-size:11px; cursor:pointer; font-family:inherit; font-weight:600; }
        .ap-btn-reject  { padding:5px 12px; background:#dc2626; color:#fff; border:none; border-radius:3px; font-size:11px; cursor:pointer; font-family:inherit; font-weight:600; }
        .ap-btn-detail  { padding:5px 12px; background:#f5f5f7; color:#555; border:1px solid #e0e0e0; border-radius:3px; font-size:11px; cursor:pointer; font-family:inherit; }
        .ap-btn-detail:hover { background:#e8e8eb; }
        .ap-modal-bg { position:fixed; inset:0; background:rgba(0,0,0,0.45); z-index:500; display:flex; align-items:center; justify-content:center; padding:20px; }
        .ap-modal { background:#fff; border-radius:8px; width:100%; max-width:680px; max-height:90vh; overflow-y:auto; box-shadow:0 20px 60px rgba(0,0,0,0.2); }
        .ap-modal-head { padding:18px 24px; background:#1a1a2e; color:#fff; display:flex; align-items:center; justify-content:space-between; position:sticky; top:0; }
        .ap-modal-x { background:rgba(255,255,255,0.12); border:none; color:#fff; width:30px; height:30px; border-radius:50%; cursor:pointer; font-size:16px; display:flex; align-items:center; justify-content:center; font-family:inherit; }
        .ap-modal-x:hover { background:rgba(255,255,255,0.25); }
        .ap-itbl { width:100%; border-collapse:collapse; font-size:13px; }
        .ap-itbl th { padding:11px 18px; background:#fafafa; font-weight:600; color:#555; font-size:12px; border:1px solid #f0f0f2; text-align:left; width:140px; }
        .ap-itbl td { padding:11px 18px; color:#1a1a2e; border:1px solid #f0f0f2; }
        .ap-action-bar { padding:16px 20px; border-top:2px solid #f0f0f2; background:#fafafa; }
        .ap-action-title { font-size:12px; font-weight:700; color:#555; margin-bottom:'10px'; }
        .ap-textarea { width:100%; padding:10px 12px; border:1px solid #d0d0d8; border-radius:4px; font-size:13px; font-family:inherit; height:80px; resize:vertical; outline:none; line-height:1.6; margin-top:8px; }
        .ap-textarea:focus { border-color:#dc2626; }
        .ap-foot { padding:16px 20px; border-top:1px solid #f0f0f2; display:flex; justify-content:flex-end; gap:'8px'; }
        .ap-btn-close { padding:8px 20px; background:#fff; color:#555; border:1px solid #d0d0d8; border-radius:4px; font-size:13px; cursor:pointer; font-family:inherit; }
        .ap-reject-notice { padding:12px 16px; background:#fff1f0; border-radius:6px; font-size:12px; color:#dc2626; margin-top:'0px'; }
        @media (max-width:900px) { .ap-kpi { grid-template-columns:repeat(2,1fr); } }
      `}</style>

      <div className="ap-wrap">
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:'20px', flexWrap:'wrap', gap:'10px' }}>
          <div>
            <div style={{ fontSize:'11px', color:'#aaa', marginBottom:'4px' }}>브랜드 관리 › 상품 승인 관리</div>
            <h1 style={{ fontSize:'22px', fontWeight:800, color:'#1a1a2e', margin:0 }}>상품 승인 관리</h1>
          </div>
        </div>

        {/* KPI */}
        <div className="ap-kpi">
          {statCards.map(s => (
            <div key={s.label} className="ap-kpi-card" onClick={s.onClick}>
              <div style={{ fontSize:'11px', color:'#999', marginBottom:'8px' }}>{s.label}</div>
              <div style={{ fontSize:'28px', fontWeight:800, color:s.color }}>
                {s.value}
                <span style={{ fontSize:'13px', color:'#aaa', fontWeight:400, marginLeft:'2px' }}>건</span>
              </div>
            </div>
          ))}
        </div>

        {/* 필터 */}
        <div className="ap-toolbar">
          <div className="ap-frow">
            <span className="ap-flabel">상태</span>
            {FILTER_OPTS.map(opt => (
              <button key={opt} className={statusFilter === opt ? 'ap-fb on' : 'ap-fb'} onClick={() => setStatusFilter(opt)}>
                {opt}
              </button>
            ))}
          </div>
          <div className="ap-frow">
            <span className="ap-flabel">브랜드</span>
            <div style={{ display:'flex', gap:'6px', flexWrap:'wrap', flex:1 }}>
              {BRAND_OPTS.map(b => (
                <button key={b} className={brandFilter === b ? 'ap-bb on' : 'ap-bb'} onClick={() => setBrandFilter(b)}>
                  {b}
                </button>
              ))}
            </div>
            <input
              className="ap-search"
              type="text"
              placeholder="상품명 · SKU 검색"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* 테이블 */}
        <div className="ap-card">
          <div style={{ overflowX:'auto' }}>
            <table className="ap-tbl">
              <thead>
                <tr>
                  <th>신청일시</th>
                  <th>브랜드</th>
                  <th style={{ minWidth:'200px' }}>상품명</th>
                  <th>카테고리</th>
                  <th style={{ textAlign:'right' }}>판매가</th>
                  <th style={{ textAlign:'center' }}>수수료</th>
                  <th style={{ textAlign:'center' }}>피팅</th>
                  <th style={{ textAlign:'center' }}>상태</th>
                  <th style={{ textAlign:'center' }}>처리</th>
                </tr>
              </thead>
              <tbody>
                {visible.map(row => {
                  const ss = STATUS_STYLE[row.status] || { bg:'#f5f5f7', color:'#666' }
                  const isPending  = row.status === '승인 대기'
                  const isReviewing= row.status === '검토중'
                  return (
                    <tr key={row.id}>
                      <td style={{ fontSize:'11px', color:'#aaa' }}>{row.submittedAt}</td>
                      <td style={{ fontWeight:700 }}>{row.brand}</td>
                      <td>
                        <div style={{ fontWeight:600, color:'#1a1a2e' }}>{row.name}</div>
                        <div style={{ fontSize:'11px', color:'#aaa', marginTop:'2px' }}>{row.nameKo} · {row.sku}</div>
                        {row.status === '반려' && row.rejectReason && (
                          <div style={{ fontSize:'11px', color:'#dc2626', marginTop:'3px' }}>반려: {row.rejectReason.slice(0, 30)}...</div>
                        )}
                      </td>
                      <td style={{ fontSize:'12px', color:'#666' }}>{row.category}</td>
                      <td style={{ textAlign:'right', fontWeight:600 }}>{row.salePrice.toLocaleString()}원</td>
                      <td style={{ textAlign:'center' }}>{row.commission}%</td>
                      <td style={{ textAlign:'center' }}>
                        {row.fitting
                          ? <span className="ap-fit-tag">피팅</span>
                          : <span style={{ color:'#ccc', fontSize:'11px' }}>-</span>
                        }
                      </td>
                      <td style={{ textAlign:'center' }}>
                        <span className="ap-bdg" style={{ background:ss.bg, color:ss.color }}>{row.status}</span>
                      </td>
                      <td style={{ textAlign:'center' }}>
                        <div style={{ display:'flex', gap:'4px', justifyContent:'center' }}>
                          {isPending && (
                            <>
                              <button className="ap-btn-approve" onClick={() => doApprove(row.id)}>승인</button>
                              <button className="ap-btn-review"  onClick={() => doReview(row.id)}>검토</button>
                              <button className="ap-btn-reject"  onClick={() => openModal(row, 'reject')}>반려</button>
                            </>
                          )}
                          {isReviewing && (
                            <>
                              <button className="ap-btn-approve" onClick={() => doApprove(row.id)}>승인</button>
                              <button className="ap-btn-reject"  onClick={() => openModal(row, 'reject')}>반려</button>
                            </>
                          )}
                          <button className="ap-btn-detail" onClick={() => openModal(row, '')}>상세</button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 상세 모달 */}
      {modal && (
        <div className="ap-modal-bg" onClick={() => setModal(null)}>
          <div className="ap-modal" onClick={e => e.stopPropagation()}>
            <div className="ap-modal-head">
              <div>
                <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.45)', marginBottom:'3px' }}>상품 승인 상세</div>
                <div style={{ fontWeight:700, fontSize:'15px' }}>{modal.name}</div>
              </div>
              <button className="ap-modal-x" onClick={() => setModal(null)}>✕</button>
            </div>

            <table className="ap-itbl">
              <tbody>
                <tr><th>승인 ID</th><td style={{ fontFamily:'monospace', fontSize:'12px' }}>{modal.id}</td></tr>
                <tr><th>브랜드</th><td style={{ fontWeight:700 }}>{modal.brand}</td></tr>
                <tr><th>상품명 (영문)</th><td style={{ fontWeight:600 }}>{modal.name}</td></tr>
                <tr><th>상품명 (한글)</th><td>{modal.nameKo}</td></tr>
                <tr><th>SKU</th><td style={{ fontFamily:'monospace' }}>{modal.sku}</td></tr>
                <tr><th>카테고리</th><td>{modal.category}</td></tr>
                <tr><th>시즌</th><td>{modal.season}</td></tr>
                <tr><th>정상가</th><td>{modal.regularPrice.toLocaleString()}원</td></tr>
                <tr><th>판매가</th><td style={{ fontWeight:700, fontSize:'15px', color:'#1a1a2e' }}>{modal.salePrice.toLocaleString()}원</td></tr>
                <tr><th>할인율</th><td style={{ color:'#dc2626', fontWeight:600 }}>{Math.round((1 - modal.salePrice / modal.regularPrice) * 100)}%</td></tr>
                <tr><th>CLYQ 수수료</th><td>{modal.commission}%</td></tr>
                <tr><th>피팅박스 신청</th><td>{modal.fitting ? '피팅박스 포함' : '피팅박스 미신청'}</td></tr>
                <tr><th>신청일시</th><td style={{ fontSize:'12px' }}>{modal.submittedAt}</td></tr>
                <tr>
                  <th>현재 상태</th>
                  <td>
                    <span className="ap-bdg" style={{ background: STATUS_STYLE[modal.status]?.bg, color: STATUS_STYLE[modal.status]?.color }}>
                      {modal.status}
                    </span>
                  </td>
                </tr>
                {modal.rejectReason && (
                  <tr>
                    <th>반려 사유</th>
                    <td style={{ color:'#dc2626', fontSize:'12px' }}>{modal.rejectReason}</td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* 반려 사유 입력 */}
            {actionType === 'reject' && (
              <div className="ap-action-bar">
                <div style={{ fontSize:'12px', fontWeight:700, color:'#dc2626', marginBottom:'8px' }}>반려 사유 입력</div>
                <textarea
                  className="ap-textarea"
                  placeholder="반려 사유를 입력하세요. 브랜드 담당자에게 전달됩니다."
                  value={rejectText}
                  onChange={e => setRejectText(e.target.value)}
                />
              </div>
            )}

            <div style={{ padding:'16px 20px', borderTop:'1px solid #f0f0f2', display:'flex', gap:'8px', justifyContent:'flex-end' }}>
              {(modal.status === '승인 대기' || modal.status === '검토중') && actionType !== 'reject' && (
                <>
                  <button className="ap-btn-approve" style={{ padding:'8px 18px', fontSize:'13px' }} onClick={() => doApprove(modal.id)}>승인</button>
                  {modal.status === '승인 대기' && (
                    <button className="ap-btn-review" style={{ padding:'8px 18px', fontSize:'13px' }} onClick={() => doReview(modal.id)}>검토중으로 변경</button>
                  )}
                  <button className="ap-btn-reject" style={{ padding:'8px 18px', fontSize:'13px' }} onClick={() => setActionType('reject')}>반려</button>
                </>
              )}
              {actionType === 'reject' && (
                <>
                  <button
                    style={{ padding:'8px 18px', background: rejectText.trim() ? '#dc2626' : '#d0d0d8', color:'#fff', border:'none', borderRadius:'4px', fontSize:'13px', fontWeight:600, cursor: rejectText.trim() ? 'pointer' : 'default', fontFamily:'inherit' }}
                    onClick={() => doReject(modal.id)}
                  >
                    반려 확정
                  </button>
                  <button className="ap-btn-close" onClick={() => setActionType('')}>취소</button>
                </>
              )}
              <button className="ap-btn-close" onClick={() => setModal(null)}>닫기</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
