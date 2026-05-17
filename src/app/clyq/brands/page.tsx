// @ts-nocheck
'use client'
import { useState } from 'react'

const INIT_BRANDS = [
  { id:'BR-001', name:'MARCIA', nameKo:'마르시아', category:'여성 컨템포러리', manager:'김지원', email:'jiwon@marcia.co.kr', phone:'02-1234-5678', joinDate:'2024-03-15', contractEnd:'2026-12-31', commission:30, products:24, fitting:4, monthSales:12840000, status:'정상', memo:'' },
  { id:'BR-002', name:'MATIN KIM', nameKo:'마뗑킴', category:'여성 캐주얼', manager:'이수진', email:'sujin@matinkim.com', phone:'02-2345-6789', joinDate:'2024-05-01', contractEnd:'2026-12-31', commission:30, products:18, fitting:3, monthSales:9620000, status:'정상', memo:'' },
  { id:'BR-003', name:'EENK', nameKo:'잉크', category:'여성 디자이너', manager:'박민아', email:'mina@eenk.kr', phone:'02-3456-7890', joinDate:'2024-06-10', contractEnd:'2026-09-30', commission:28, products:31, fitting:6, monthSales:5280000, status:'계약만료임박', memo:'계약 갱신 협의 중' },
  { id:'BR-004', name:'D.POUND', nameKo:'디파운드', category:'여성 스트리트', manager:'최준혁', email:'junhyuk@dpound.com', phone:'02-4567-8901', joinDate:'2024-08-20', contractEnd:'2027-08-19', commission:27, products:12, fitting:2, monthSales:4150000, status:'정상', memo:'' },
  { id:'BR-005', name:'ANDERSSONBELL', nameKo:'앤더슨벨', category:'유니섹스 컨템포러리', manager:'정하은', email:'haeun@anderssonbell.com', phone:'02-5678-9012', joinDate:'2024-09-01', contractEnd:'2027-08-31', commission:30, products:27, fitting:5, monthSales:3960000, status:'정상', memo:'' },
  { id:'BR-006', name:'ANOTHER A', nameKo:'어나더에이', category:'여성 미니멀', manager:'한소연', email:'soyeon@anothera.kr', phone:'02-6789-0123', joinDate:'2025-01-15', contractEnd:'2027-01-14', commission:27, products:15, fitting:3, monthSales:2730000, status:'정상', memo:'' },
  { id:'BR-007', name:'EIGHT', nameKo:'에이트', category:'여성 베이직', manager:'윤채린', email:'chaerin@eight.co.kr', phone:'02-7890-1234', joinDate:'2025-03-01', contractEnd:'2027-02-28', commission:25, products:9, fitting:2, monthSales:1980000, status:'정상', memo:'' },
  { id:'BR-008', name:'ADER ERROR', nameKo:'아더에러', category:'유니섹스 아방가르드', manager:'조성민', email:'sungmin@adererror.com', phone:'02-8901-2345', joinDate:'2024-11-01', contractEnd:'2025-10-31', commission:30, products:21, fitting:4, monthSales:6410000, status:'계약만료임박', memo:'수수료 재협상 예정' },
]

const STATUS_STYLE = {
  '정상':      { bg:'#f0fdf4', color:'#16a34a' },
  '계약만료임박':{ bg:'#fff7ed', color:'#C94E1A' },
  '이용정지':  { bg:'#fff1f0', color:'#dc2626' },
  '계약종료':  { bg:'#f5f5f7', color:'#999' },
}

const FILTER_OPTS = ['전체','정상','계약만료임박','이용정지']

export default function BrandsPage() {
  const [brands, setBrands]     = useState(INIT_BRANDS)
  const [filter, setFilter]     = useState('전체')
  const [search, setSearch]     = useState('')
  const [modal, setModal]       = useState(null)
  const [tab, setTab]           = useState('info')

  const visible = brands.filter(b => {
    const okF = filter === '전체' || b.status === filter
    const okS = !search || b.name.includes(search) || b.nameKo.includes(search) || b.manager.includes(search)
    return okF && okS
  })

  const totalSales = brands.reduce((s, b) => s + b.monthSales, 0)

  const statCards = [
    { label:'전체 파트너 브랜드', value: brands.length + '개', color:'#1a1a2e' },
    { label:'정상 운영',          value: brands.filter(b => b.status === '정상').length + '개', color:'#16a34a' },
    { label:'계약 만료 임박',     value: brands.filter(b => b.status === '계약만료임박').length + '개', color:'#C94E1A' },
    { label:'이달 총 매출',       value: totalSales.toLocaleString() + '원', color:'#2563eb' },
  ]

  return (
    <>
      <style>{`
        .br-wrap { width:100%; }
        .br-grid4 { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-bottom:16px; }
        .br-stat { background:#fff; border:1px solid #e8e8eb; border-radius:8px; padding:16px 20px; }
        .br-toolbar { background:#fff; border:1px solid #e8e8eb; border-radius:8px; padding:14px 20px; margin-bottom:14px; display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
        .br-fb { padding:5px 14px; border-radius:20px; border:1px solid #d8d8dc; background:#fff; font-size:12px; cursor:pointer; color:#666; font-family:inherit; }
        .br-fb.on { background:#1a1a2e; border-color:#1a1a2e; color:#fff; font-weight:600; }
        .br-search { padding:7px 12px; border:1px solid #d8d8dc; border-radius:5px; font-size:13px; outline:none; font-family:inherit; width:220px; margin-left:auto; }
        .br-search:focus { border-color:#C94E1A; }
        .br-card { background:#fff; border:1px solid #e8e8eb; border-radius:8px; overflow:hidden; }
        .br-tbl { width:100%; border-collapse:collapse; font-size:13px; }
        .br-tbl th { padding:10px 14px; text-align:left; font-size:11px; font-weight:600; color:#999; background:#fafafa; border-bottom:1px solid #f0f0f2; white-space:nowrap; }
        .br-tbl td { padding:13px 14px; border-bottom:1px solid #f5f5f7; color:#333; vertical-align:middle; white-space:nowrap; }
        .br-tbl tr:last-child td { border-bottom:none; }
        .br-tbl tbody tr { cursor:pointer; }
        .br-tbl tbody tr:hover td { background:#fff8f5; }
        .br-bdg { display:inline-block; padding:3px 9px; border-radius:4px; font-size:11px; font-weight:600; }
        .br-btn-p { padding:9px 20px; background:#C94E1A; color:#fff; border:none; border-radius:5px; font-size:13px; font-weight:600; cursor:pointer; font-family:inherit; }
        .br-btn-p:hover { background:#a83d14; }
        .br-modal-bg { position:fixed; inset:0; background:rgba(0,0,0,0.45); z-index:500; display:flex; align-items:center; justify-content:center; padding:20px; }
        .br-modal { background:#fff; border-radius:8px; width:100%; max-width:680px; max-height:90vh; overflow-y:auto; box-shadow:0 20px 60px rgba(0,0,0,0.2); }
        .br-modal-head { padding:18px 24px; background:#1a1a2e; color:#fff; display:flex; align-items:center; justify-content:space-between; position:sticky; top:0; }
        .br-modal-x { background:rgba(255,255,255,0.12); border:none; color:#fff; width:30px; height:30px; border-radius:50%; cursor:pointer; font-size:16px; display:flex; align-items:center; justify-content:center; font-family:inherit; }
        .br-modal-x:hover { background:rgba(255,255,255,0.25); }
        .br-tabs { display:flex; border-bottom:1px solid #f0f0f2; }
        .br-tab { padding:12px 20px; font-size:13px; font-weight:500; color:#aaa; cursor:pointer; border-bottom:2px solid transparent; margin-bottom:-1px; }
        .br-tab.on { color:#C94E1A; border-bottom-color:#C94E1A; font-weight:700; }
        .br-itbl { width:100%; border-collapse:collapse; font-size:13px; }
        .br-itbl th { padding:12px 18px; background:#fafafa; font-weight:600; color:#555; font-size:12px; border:1px solid #f0f0f2; text-align:left; width:140px; }
        .br-itbl td { padding:12px 18px; color:#1a1a2e; border:1px solid #f0f0f2; }
        .br-modal-foot { padding:16px 20px; border-top:1px solid #f0f0f2; display:flex; justify-content:flex-end; gap:'8px'; }
        .br-btn-close { padding:8px 20px; background:#fff; color:#555; border:1px solid #d0d0d8; border-radius:4px; font-size:13px; cursor:pointer; font-family:inherit; }
        .br-btn-warn { padding:8px 16px; background:#fff1f0; color:#dc2626; border:1px solid #fca5a5; border-radius:4px; font-size:13px; cursor:pointer; font-family:inherit; font-weight:600; }
        @media (max-width:900px) { .br-grid4 { grid-template-columns:repeat(2,1fr); } }
      `}</style>

      <div className="br-wrap">
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:'20px', flexWrap:'wrap', gap:'10px' }}>
          <div>
            <div style={{ fontSize:'11px', color:'#aaa', marginBottom:'4px' }}>브랜드 관리 › 브랜드 목록</div>
            <h1 style={{ fontSize:'22px', fontWeight:800, color:'#1a1a2e', margin:0 }}>브랜드 목록</h1>
          </div>
          <button className="br-btn-p">브랜드 신규 등록</button>
        </div>

        <div className="br-grid4">
          {statCards.map(s => (
            <div key={s.label} className="br-stat">
              <div style={{ fontSize:'11px', color:'#999', marginBottom:'8px' }}>{s.label}</div>
              <div style={{ fontSize:'22px', fontWeight:800, color:s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div className="br-toolbar">
          {FILTER_OPTS.map(opt => (
            <button key={opt} className={filter === opt ? 'br-fb on' : 'br-fb'} onClick={() => setFilter(opt)}>
              {opt}
            </button>
          ))}
          <input
            className="br-search"
            type="text"
            placeholder="브랜드명 · 담당자 검색"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <span style={{ fontSize:'12px', color:'#aaa' }}>{visible.length}개</span>
        </div>

        <div className="br-card">
          <div style={{ overflowX:'auto' }}>
            <table className="br-tbl">
              <thead>
                <tr>
                  <th>브랜드명</th>
                  <th>카테고리</th>
                  <th>담당자</th>
                  <th>수수료</th>
                  <th style={{ textAlign:'center' }}>등록 상품</th>
                  <th style={{ textAlign:'center' }}>피팅 제품</th>
                  <th style={{ textAlign:'right' }}>이달 매출</th>
                  <th>계약 만료</th>
                  <th style={{ textAlign:'center' }}>상태</th>
                </tr>
              </thead>
              <tbody>
                {visible.map(b => {
                  const ss = STATUS_STYLE[b.status] || { bg:'#f5f5f7', color:'#999' }
                  return (
                    <tr key={b.id} onClick={() => { setModal(b); setTab('info') }}>
                      <td>
                        <div style={{ fontWeight:700, color:'#1a1a2e' }}>{b.name}</div>
                        <div style={{ fontSize:'11px', color:'#aaa', marginTop:'2px' }}>{b.nameKo}</div>
                      </td>
                      <td style={{ color:'#666', fontSize:'12px' }}>{b.category}</td>
                      <td>{b.manager}</td>
                      <td style={{ fontWeight:600 }}>{b.commission}%</td>
                      <td style={{ textAlign:'center' }}>{b.products}개</td>
                      <td style={{ textAlign:'center', color:'#C94E1A', fontWeight:600 }}>{b.fitting}개</td>
                      <td style={{ textAlign:'right', fontWeight:600, color:'#1a1a2e' }}>{b.monthSales.toLocaleString()}원</td>
                      <td style={{ fontSize:'12px', color: b.status === '계약만료임박' ? '#C94E1A' : '#666' }}>{b.contractEnd}</td>
                      <td style={{ textAlign:'center' }}>
                        <span className="br-bdg" style={{ background:ss.bg, color:ss.color }}>{b.status}</span>
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
        <div className="br-modal-bg" onClick={() => setModal(null)}>
          <div className="br-modal" onClick={e => e.stopPropagation()}>
            <div className="br-modal-head">
              <div>
                <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.45)', marginBottom:'3px' }}>브랜드 상세</div>
                <div style={{ fontWeight:800, fontSize:'18px' }}>{modal.name}</div>
              </div>
              <button className="br-modal-x" onClick={() => setModal(null)}>✕</button>
            </div>

            <div className="br-tabs">
              {[['info','기본 정보'],['contract','계약 정보'],['stats','실적']].map(([key, label]) => (
                <div key={key} className={tab === key ? 'br-tab on' : 'br-tab'} onClick={() => setTab(key)}>
                  {label}
                </div>
              ))}
            </div>

            {tab === 'info' && (
              <table className="br-itbl">
                <tbody>
                  <tr><th>브랜드 ID</th><td style={{ fontFamily:'monospace' }}>{modal.id}</td></tr>
                  <tr><th>브랜드명 (영문)</th><td style={{ fontWeight:700 }}>{modal.name}</td></tr>
                  <tr><th>브랜드명 (한글)</th><td>{modal.nameKo}</td></tr>
                  <tr><th>카테고리</th><td>{modal.category}</td></tr>
                  <tr><th>담당자</th><td>{modal.manager}</td></tr>
                  <tr><th>이메일</th><td>{modal.email}</td></tr>
                  <tr><th>전화번호</th><td>{modal.phone}</td></tr>
                  <tr><th>입점일</th><td>{modal.joinDate}</td></tr>
                  <tr><th>상태</th><td><span className="br-bdg" style={{ background: STATUS_STYLE[modal.status]?.bg, color: STATUS_STYLE[modal.status]?.color }}>{modal.status}</span></td></tr>
                  <tr><th>메모</th><td style={{ color:'#666' }}>{modal.memo || '-'}</td></tr>
                </tbody>
              </table>
            )}

            {tab === 'contract' && (
              <table className="br-itbl">
                <tbody>
                  <tr><th>계약 시작일</th><td>{modal.joinDate}</td></tr>
                  <tr><th>계약 만료일</th><td style={{ color: modal.status === '계약만료임박' ? '#C94E1A' : '#1a1a2e', fontWeight:600 }}>{modal.contractEnd}</td></tr>
                  <tr><th>수수료율</th><td style={{ fontWeight:700, fontSize:'16px', color:'#C94E1A' }}>{modal.commission}%</td></tr>
                  <tr><th>피팅박스 참여</th><td><span className="br-bdg" style={{ background:'#fff7ed', color:'#C94E1A' }}>참여중</span></td></tr>
                  <tr><th>정산 주기</th><td>월 1회 (매월 말일)</td></tr>
                  <tr><th>반품 배송비</th><td>6,000원 (브랜드 부담)</td></tr>
                </tbody>
              </table>
            )}

            {tab === 'stats' && (
              <div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'0' }}>
                  {[
                    { label:'등록 상품', value: modal.products + '개', color:'#1a1a2e' },
                    { label:'피팅 제품', value: modal.fitting + '개', color:'#C94E1A' },
                    { label:'이달 매출', value: modal.monthSales.toLocaleString() + '원', color:'#16a34a' },
                  ].map((s, idx) => (
                    <div key={s.label} style={{ padding:'20px', borderRight: idx < 2 ? '1px solid #f0f0f2' : 'none', textAlign:'center' }}>
                      <div style={{ fontSize:'11px', color:'#999', marginBottom:'8px' }}>{s.label}</div>
                      <div style={{ fontSize:'20px', fontWeight:800, color:s.color }}>{s.value}</div>
                    </div>
                  ))}
                </div>
                <div style={{ padding:'16px 20px', borderTop:'1px solid #f0f0f2' }}>
                  <div style={{ fontSize:'12px', color:'#999', marginBottom:'8px', fontWeight:600 }}>이달 CLYQ 수수료</div>
                  <div style={{ fontSize:'18px', fontWeight:800, color:'#C94E1A' }}>
                    {Math.round(modal.monthSales * modal.commission / 100).toLocaleString()}원
                  </div>
                  <div style={{ fontSize:'12px', color:'#aaa', marginTop:'4px' }}>
                    브랜드 정산 예정: {Math.round(modal.monthSales * (100 - modal.commission) / 100).toLocaleString()}원
                  </div>
                </div>
              </div>
            )}

            <div className="br-modal-foot" style={{ display:'flex', gap:'8px', padding:'16px 20px', borderTop:'1px solid #f0f0f2', justifyContent:'flex-end' }}>
              <button className="br-btn-warn">이용 정지</button>
              <button className="br-btn-close" onClick={() => setModal(null)}>닫기</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
