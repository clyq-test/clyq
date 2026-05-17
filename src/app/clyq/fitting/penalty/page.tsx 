// @ts-nocheck
'use client'
import { useState } from 'react'

const INIT_DATA = [
  {
    id:'PEN-2026-001', fitId:'FIT-2026-0507-024',
    brand:'MATIN KIM', product:'레더 재킷',
    customer:'한**', phone:'010-****-5678',
    damageType:'훼손', detail:'소매 부분 스크래치',
    basePrice:456000, rate:30, amount:136800,
    status:'청구 대기', claimedAt:'', paidAt:'', inspDate:'2026-05-10',
  },
  {
    id:'PEN-2026-002', fitId:'FIT-2026-0505-011',
    brand:'MARCIA', product:'캐시미어 니트',
    customer:'정**', phone:'010-****-1122',
    damageType:'오염', detail:'전체적 오염 (세탁 불가)',
    basePrice:178000, rate:70, amount:124600,
    status:'청구 완료', claimedAt:'2026-05-09', paidAt:'', inspDate:'2026-05-08',
  },
  {
    id:'PEN-2026-003', fitId:'FIT-2026-0503-007',
    brand:'EENK', product:'더블 브레스트 코트',
    customer:'이**', phone:'010-****-3344',
    damageType:'분실', detail:'제품 미반납',
    basePrice:528000, rate:100, amount:528000,
    status:'납부 완료', claimedAt:'2026-05-05', paidAt:'2026-05-08', inspDate:'2026-05-05',
  },
  {
    id:'PEN-2026-004', fitId:'FIT-2026-0501-003',
    brand:'ADER ERROR', product:'그래픽 후드집업',
    customer:'최**', phone:'010-****-5566',
    damageType:'훼손', detail:'지퍼 파손',
    basePrice:198000, rate:30, amount:59400,
    status:'분쟁 중', claimedAt:'2026-05-03', paidAt:'', inspDate:'2026-05-02',
  },
]

const STATUS_STYLE = {
  '청구 대기': { bg:'#fff7ed', color:'#C94E1A' },
  '청구 완료': { bg:'#eff6ff', color:'#2563eb' },
  '납부 완료': { bg:'#f0fdf4', color:'#16a34a' },
  '분쟁 중':   { bg:'#fff1f0', color:'#dc2626' },
}

const DAMAGE_STYLE = {
  '훼손': { bg:'#fff1f0', color:'#dc2626' },
  '오염': { bg:'#fefce8', color:'#ca8a04' },
  '분실': { bg:'#faf5ff', color:'#7c3aed' },
}

const FILTER_OPTS = ['전체','청구 대기','청구 완료','납부 완료','분쟁 중']

export default function PenaltyPage() {
  const [rows, setRows]         = useState(INIT_DATA)
  const [tab, setTab]           = useState('전체')
  const [modal, setModal]       = useState(null)

  const visible = tab === '전체' ? rows : rows.filter(r => r.status === tab)

  const total   = rows.reduce((s, r) => s + r.amount, 0)
  const paid    = rows.filter(r => r.status === '납부 완료').reduce((s, r) => s + r.amount, 0)
  const unpaid  = rows.filter(r => r.status !== '납부 완료').reduce((s, r) => s + r.amount, 0)

  function doClaim(id) {
    const today = new Date().toLocaleDateString('ko-KR')
    setRows(prev => prev.map(r =>
      r.id === id ? { ...r, status:'청구 완료', claimedAt:today } : r
    ))
  }

  function doPaid(id) {
    const today = new Date().toLocaleDateString('ko-KR')
    setRows(prev => prev.map(r =>
      r.id === id ? { ...r, status:'납부 완료', paidAt:today } : r
    ))
  }

  const statCards = [
    { label:'전체 건수',    value: rows.length + '건',      color:'#1a1a2e' },
    { label:'총 청구 금액', value: total.toLocaleString() + '원', color:'#dc2626' },
    { label:'납부 완료',    value: paid.toLocaleString() + '원',  color:'#16a34a' },
    { label:'미납 금액',    value: unpaid.toLocaleString() + '원', color:'#C94E1A' },
  ]

  return (
    <>
      <style>{`
        .pn-wrap { width:100%; }
        .pn-grid4 { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-bottom:16px; }
        .pn-stat { background:#fff; border:1px solid #e8e8eb; border-radius:8px; padding:16px 20px; }
        .pn-card { background:#fff; border:1px solid #e8e8eb; border-radius:8px; overflow:hidden; }
        .pn-fbar { display:flex; gap:6px; padding:12px 20px; border-bottom:1px solid #f0f0f2; flex-wrap:wrap; }
        .pn-fb { padding:5px 14px; border-radius:20px; border:1px solid #d8d8dc; background:#fff; font-size:12px; cursor:pointer; color:#666; font-family:inherit; }
        .pn-fb.on { background:#1a1a2e; border-color:#1a1a2e; color:#fff; font-weight:600; }
        .pn-tbl { width:100%; border-collapse:collapse; font-size:13px; }
        .pn-tbl th { padding:10px 14px; text-align:left; font-size:11px; font-weight:600; color:#999; background:#fafafa; border-bottom:1px solid #f0f0f2; white-space:nowrap; }
        .pn-tbl td { padding:13px 14px; border-bottom:1px solid #f5f5f7; color:#333; vertical-align:middle; white-space:nowrap; }
        .pn-tbl tr:last-child td { border-bottom:none; }
        .pn-tbl tbody tr:hover td { background:#fafafa; }
        .pn-bdg { display:inline-block; padding:3px 9px; border-radius:4px; font-size:11px; font-weight:600; }
        .pn-b-red   { padding:5px 12px; background:#dc2626; color:#fff; border:none; border-radius:3px; font-size:11px; cursor:pointer; font-family:inherit; font-weight:600; }
        .pn-b-green { padding:5px 12px; background:#16a34a; color:#fff; border:none; border-radius:3px; font-size:11px; cursor:pointer; font-family:inherit; font-weight:600; }
        .pn-b-gray  { padding:5px 12px; background:#f5f5f7; color:#555; border:1px solid #e0e0e0; border-radius:3px; font-size:11px; cursor:pointer; font-family:inherit; }
        .pn-b-gray:hover { background:#e8e8eb; }
        .pn-modal-bg { position:fixed; inset:0; background:rgba(0,0,0,0.45); z-index:500; display:flex; align-items:center; justify-content:center; padding:20px; }
        .pn-modal { background:#fff; border-radius:8px; width:100%; max-width:560px; overflow:hidden; box-shadow:0 20px 60px rgba(0,0,0,0.2); }
        .pn-modal-head { padding:18px 24px; background:#1a1a2e; color:#fff; display:flex; align-items:center; justify-content:space-between; }
        .pn-modal-x { background:rgba(255,255,255,0.12); border:none; color:#fff; width:30px; height:30px; border-radius:50%; cursor:pointer; font-size:16px; display:flex; align-items:center; justify-content:center; font-family:inherit; }
        .pn-modal-x:hover { background:rgba(255,255,255,0.25); }
        .pn-itbl { width:100%; border-collapse:collapse; font-size:13px; }
        .pn-itbl th { padding:12px 18px; background:#fafafa; font-weight:600; color:#555; font-size:12px; border:1px solid #f0f0f2; text-align:left; width:130px; }
        .pn-itbl td { padding:12px 18px; color:#1a1a2e; border:1px solid #f0f0f2; }
        .pn-modal-foot { padding:16px 20px; border-top:1px solid #f0f0f2; display:flex; justify-content:flex-end; gap:8px; }
        .pn-b-close { padding:8px 20px; background:#fff; color:#555; border:1px solid #d0d0d8; border-radius:4px; font-size:13px; cursor:pointer; font-family:inherit; }
        @media (max-width:768px) { .pn-grid4 { grid-template-columns:repeat(2,1fr); } }
      `}</style>

      <div className="pn-wrap">

        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:'20px', flexWrap:'wrap', gap:'10px' }}>
          <div>
            <div style={{ fontSize:'11px', color:'#aaa', marginBottom:'4px' }}>피팅박스 관리 › 훼손 패널티</div>
            <h1 style={{ fontSize:'22px', fontWeight:800, color:'#1a1a2e', margin:0 }}>훼손 패널티 관리</h1>
          </div>
        </div>

        <div className="pn-grid4">
          {statCards.map(s => (
            <div key={s.label} className="pn-stat">
              <div style={{ fontSize:'11px', color:'#999', marginBottom:'8px' }}>{s.label}</div>
              <div style={{ fontSize:'20px', fontWeight:800, color:s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div className="pn-card">
          <div className="pn-fbar">
            {FILTER_OPTS.map(opt => (
              <button
                key={opt}
                className={tab === opt ? 'pn-fb on' : 'pn-fb'}
                onClick={() => setTab(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
          <div style={{ overflowX:'auto' }}>
            <table className="pn-tbl">
              <thead>
                <tr>
                  <th>패널티 ID</th>
                  <th>브랜드</th>
                  <th>제품명</th>
                  <th>고객</th>
                  <th style={{ textAlign:'center' }}>유형</th>
                  <th>훼손 내용</th>
                  <th style={{ textAlign:'right' }}>청구 금액</th>
                  <th style={{ textAlign:'center' }}>상태</th>
                  <th style={{ textAlign:'center' }}>처리</th>
                </tr>
              </thead>
              <tbody>
                {visible.map(row => {
                  const ss = STATUS_STYLE[row.status] || { bg:'#f5f5f7', color:'#666' }
                  const ds = DAMAGE_STYLE[row.damageType] || { bg:'#f5f5f7', color:'#666' }
                  const isClaim = row.status === '청구 대기'
                  const isPaid  = row.status === '청구 완료'
                  return (
                    <tr key={row.id}>
                      <td
                        style={{ fontSize:'12px', color:'#888', fontFamily:'monospace', cursor:'pointer' }}
                        onClick={() => setModal(row)}
                      >
                        {row.id}
                      </td>
                      <td style={{ fontWeight:600 }}>{row.brand}</td>
                      <td style={{ fontWeight:500, color:'#1a1a2e' }}>{row.product}</td>
                      <td>{row.customer}</td>
                      <td style={{ textAlign:'center' }}>
                        <span className="pn-bdg" style={{ background:ds.bg, color:ds.color }}>
                          {row.damageType}
                        </span>
                      </td>
                      <td style={{ fontSize:'12px', color:'#666' }}>{row.detail}</td>
                      <td style={{ textAlign:'right', fontWeight:700, color:'#dc2626' }}>
                        {row.amount.toLocaleString()}원
                      </td>
                      <td style={{ textAlign:'center' }}>
                        <span className="pn-bdg" style={{ background:ss.bg, color:ss.color }}>
                          {row.status}
                        </span>
                      </td>
                      <td style={{ textAlign:'center' }}>
                        <div style={{ display:'flex', gap:'4px', justifyContent:'center' }}>
                          {isClaim && (
                            <button className="pn-b-red" onClick={() => doClaim(row.id)}>청구</button>
                          )}
                          {isPaid && (
                            <button className="pn-b-green" onClick={() => doPaid(row.id)}>납부확인</button>
                          )}
                          <button className="pn-b-gray" onClick={() => setModal(row)}>상세</button>
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

      {modal && (
        <div className="pn-modal-bg" onClick={() => setModal(null)}>
          <div className="pn-modal" onClick={e => e.stopPropagation()}>
            <div className="pn-modal-head">
              <div>
                <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.45)', marginBottom:'3px' }}>패널티 상세</div>
                <div style={{ fontWeight:700, fontSize:'15px' }}>{modal.id}</div>
              </div>
              <button className="pn-modal-x" onClick={() => setModal(null)}>✕</button>
            </div>
            <table className="pn-itbl">
              <tbody>
                <tr><th>피팅 ID</th><td style={{ fontFamily:'monospace', fontSize:'12px' }}>{modal.fitId}</td></tr>
                <tr><th>브랜드</th><td>{modal.brand}</td></tr>
                <tr><th>제품명</th><td style={{ fontWeight:600 }}>{modal.product}</td></tr>
                <tr><th>고객</th><td>{modal.customer} {modal.phone}</td></tr>
                <tr><th>훼손 유형</th><td>{modal.damageType}</td></tr>
                <tr><th>훼손 내용</th><td>{modal.detail}</td></tr>
                <tr><th>기준 가격</th><td>{modal.basePrice.toLocaleString()}원</td></tr>
                <tr><th>배상률</th><td>{modal.rate}%</td></tr>
                <tr>
                  <th>청구 금액</th>
                  <td style={{ fontWeight:700, color:'#dc2626', fontSize:'15px' }}>
                    {modal.amount.toLocaleString()}원
                  </td>
                </tr>
                <tr><th>검수일</th><td>{modal.inspDate}</td></tr>
                <tr><th>청구일</th><td>{modal.claimedAt || '-'}</td></tr>
                <tr><th>납부일</th><td>{modal.paidAt || '-'}</td></tr>
                <tr>
                  <th>현재 상태</th>
                  <td>
                    <span
                      className="pn-bdg"
                      style={{
                        background: STATUS_STYLE[modal.status]?.bg || '#f5f5f7',
                        color: STATUS_STYLE[modal.status]?.color || '#666',
                      }}
                    >
                      {modal.status}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="pn-modal-foot">
              {modal.status === '청구 대기' && (
                <button
                  className="pn-b-red"
                  style={{ padding:'8px 20px', fontSize:'13px' }}
                  onClick={() => { doClaim(modal.id); setModal(null) }}
                >
                  청구하기
                </button>
              )}
              {modal.status === '청구 완료' && (
                <button
                  className="pn-b-green"
                  style={{ padding:'8px 20px', fontSize:'13px' }}
                  onClick={() => { doPaid(modal.id); setModal(null) }}
                >
                  납부 확인
                </button>
              )}
              <button className="pn-b-close" onClick={() => setModal(null)}>닫기</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
