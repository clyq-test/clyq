// @ts-nocheck
'use client'
import { useState } from 'react'
import { BRAND_INFO, allProducts as catalog } from '../../lib/catalog'

// 쇼핑몰 카탈로그의 가상 브랜드 15곳. 담당자·연락처·계약 정보는 모두 샘플이며 실제 입점 계약 데이터로 교체해야 합니다.
const INIT_BRANDS = BRAND_INFO.map((b, i) => ({
  id: 'BR-' + String(i + 1).padStart(3, '0'), name: b.name, nameKo: b.name, category: b.concept,
  manager: '담당자 ' + (i + 1), email: 'partner' + (i + 1) + '@example.invalid', phone: '02-0000-' + String(1000 + i),
  joinDate: '2026-0' + (1 + (i % 9)) + '-01', contractEnd: '2027-12-31', commission: 30,
  products: catalog.filter(p => p.brand === b.name).length, fitting: catalog.filter(p => p.brand === b.name && p.fit).length,
  monthSales: 0, status: '정상', memo: '',
}))

const STATUS_STYLE = {
  '정상':      { bg:'#eef4f0', color:'#3D6A4F' },
  '계약만료임박':{ bg:'#f4f4f2', color:'#111' },
  '이용정지':  { bg:'#fbeeed', color:'#b3261e' },
  '계약종료':  { bg:'#f2f2f0', color:'#767676' },
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
    { label:'전체 파트너 브랜드', value: brands.length + '개', color:'#111' },
    { label:'정상 운영',          value: brands.filter(b => b.status === '정상').length + '개', color:'#3D6A4F' },
    { label:'계약 만료 임박',     value: brands.filter(b => b.status === '계약만료임박').length + '개', color:'#111' },
    { label:'이달 총 매출',       value: totalSales.toLocaleString() + '원', color:'#555' },
  ]

  return (
    <>
      <style>{`
        .br-wrap { width:100%; }
        .br-grid4 { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-bottom:16px; }
        .br-stat { background:#fff; border:1px solid #e6e6e3; border-radius:8px; padding:16px 20px; }
        .br-toolbar { background:#fff; border:1px solid #e6e6e3; border-radius:8px; padding:14px 20px; margin-bottom:14px; display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
        .br-fb { padding:5px 14px; border-radius:20px; border:1px solid #d6d6d2; background:#fff; font-size:13px; cursor:pointer; color:#555; font-family:inherit; }
        .br-fb.on { background:#111; border-color:#111; color:#fff; font-weight:600; }
        .br-search { padding:7px 12px; border:1px solid #d6d6d2; border-radius:5px; font-size:14px; outline:none; font-family:inherit; width:220px; margin-left:auto; }
        .br-search:focus { border-color:#111; }
        .br-card { background:#fff; border:1px solid #e6e6e3; border-radius:8px; overflow:hidden; }
        .br-tbl { width:100%; border-collapse:collapse; font-size:14px; }
        .br-tbl th { padding:10px 14px; text-align:left; font-size:12px; font-weight:600; color:#767676; background:#f9f9f7; border-bottom:1px solid #eeeeec; white-space:nowrap; }
        .br-tbl td { padding:13px 14px; border-bottom:1px solid #f2f2f0; color:#222; vertical-align:middle; white-space:nowrap; }
        .br-tbl tr:last-child td { border-bottom:none; }
        .br-tbl tbody tr { cursor:pointer; }
        .br-tbl tbody tr:hover td { background:#f7f7f5; }
        .br-bdg { display:inline-block; padding:3px 9px; border-radius:4px; font-size:12px; font-weight:600; }
        .br-btn-p { padding:9px 20px; background:#111; color:#fff; border:none; border-radius:5px; font-size:14px; font-weight:600; cursor:pointer; font-family:inherit; }
        .br-btn-p:hover { background:#333; }
        .br-modal-bg { position:fixed; inset:0; background:rgba(0,0,0,0.45); z-index:500; display:flex; align-items:center; justify-content:center; padding:20px; }
        .br-modal { background:#fff; border-radius:8px; width:100%; max-width:680px; max-height:90vh; overflow-y:auto; box-shadow:0 20px 60px rgba(0,0,0,0.2); }
        .br-modal-head { padding:18px 24px; background:#111; color:#fff; display:flex; align-items:center; justify-content:space-between; position:sticky; top:0; }
        .br-modal-x { background:rgba(255,255,255,0.12); border:none; color:#fff; width:30px; height:30px; border-radius:50%; cursor:pointer; font-size:16px; display:flex; align-items:center; justify-content:center; font-family:inherit; }
        .br-modal-x:hover { background:rgba(255,255,255,0.25); }
        .br-tabs { display:flex; border-bottom:1px solid #eeeeec; }
        .br-tab { padding:12px 20px; font-size:14px; font-weight:500; color:#767676; cursor:pointer; border-bottom:2px solid transparent; margin-bottom:-1px; }
        .br-tab.on { color:#111; border-bottom-color:#111; font-weight:700; }
        .br-itbl { width:100%; border-collapse:collapse; font-size:14px; }
        .br-itbl th { padding:12px 18px; background:#f9f9f7; font-weight:600; color:#555; font-size:13px; border:1px solid #eeeeec; text-align:left; width:140px; }
        .br-itbl td { padding:12px 18px; color:#111; border:1px solid #eeeeec; }
        .br-modal-foot { padding:16px 20px; border-top:1px solid #eeeeec; display:flex; justify-content:flex-end; gap:'8px'; }
        .br-btn-close { padding:8px 20px; background:#fff; color:#555; border:1px solid #d6d6d2; border-radius:4px; font-size:14px; cursor:pointer; font-family:inherit; }
        .br-btn-warn { padding:8px 16px; background:#fbeeed; color:#b3261e; border:1px solid #fca5a5; border-radius:4px; font-size:14px; cursor:pointer; font-family:inherit; font-weight:600; }
        @media (max-width:900px) { .br-grid4 { grid-template-columns:repeat(2,1fr); } }
      `}</style>

      <div className="br-wrap">
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:'20px', flexWrap:'wrap', gap:'10px' }}>
          <div>
            <div style={{ fontSize:'12px', color:'#767676', marginBottom:'4px' }}>브랜드 관리 › 브랜드 목록</div>
            <h1 style={{ fontSize:'22px', fontWeight:800, color:'#111', margin:0 }}>브랜드 목록</h1>
          </div>
          <button className="br-btn-p">브랜드 신규 등록</button>
        </div>

        <div className="br-grid4">
          {statCards.map(s => (
            <div key={s.label} className="br-stat">
              <div style={{ fontSize:'12px', color:'#767676', marginBottom:'8px' }}>{s.label}</div>
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
          <span style={{ fontSize:'13px', color:'#767676' }}>{visible.length}개</span>
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
                  const ss = STATUS_STYLE[b.status] || { bg:'#f2f2f0', color:'#767676' }
                  return (
                    <tr key={b.id} onClick={() => { setModal(b); setTab('info') }}>
                      <td>
                        <div style={{ fontWeight:700, color:'#111' }}>{b.name}</div>
                        <div style={{ fontSize:'12px', color:'#767676', marginTop:'2px' }}>{b.nameKo}</div>
                      </td>
                      <td style={{ color:'#555', fontSize:'13px' }}>{b.category}</td>
                      <td>{b.manager}</td>
                      <td style={{ fontWeight:600 }}>{b.commission}%</td>
                      <td style={{ textAlign:'center' }}>{b.products}개</td>
                      <td style={{ textAlign:'center', color:'#111', fontWeight:600 }}>{b.fitting}개</td>
                      <td style={{ textAlign:'right', fontWeight:600, color:'#111' }}>{b.monthSales.toLocaleString()}원</td>
                      <td style={{ fontSize:'13px', color: b.status === '계약만료임박' ? '#111' : '#555' }}>{b.contractEnd}</td>
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
                <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.45)', marginBottom:'3px' }}>브랜드 상세</div>
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
                  <tr><th>메모</th><td style={{ color:'#555' }}>{modal.memo || '-'}</td></tr>
                </tbody>
              </table>
            )}

            {tab === 'contract' && (
              <table className="br-itbl">
                <tbody>
                  <tr><th>계약 시작일</th><td>{modal.joinDate}</td></tr>
                  <tr><th>계약 만료일</th><td style={{ color: modal.status === '계약만료임박' ? '#111' : '#111', fontWeight:600 }}>{modal.contractEnd}</td></tr>
                  <tr><th>수수료율</th><td style={{ fontWeight:700, fontSize:'16px', color:'#111' }}>{modal.commission}%</td></tr>
                  <tr><th>피팅박스 참여</th><td><span className="br-bdg" style={{ background:'#f4f4f2', color:'#111' }}>참여중</span></td></tr>
                  <tr><th>정산 주기</th><td>월 1회 (매월 말일)</td></tr>
                  <tr><th>반품 배송비</th><td>6,000원 (브랜드 부담)</td></tr>
                </tbody>
              </table>
            )}

            {tab === 'stats' && (
              <div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'0' }}>
                  {[
                    { label:'등록 상품', value: modal.products + '개', color:'#111' },
                    { label:'피팅 제품', value: modal.fitting + '개', color:'#111' },
                    { label:'이달 매출', value: modal.monthSales.toLocaleString() + '원', color:'#3D6A4F' },
                  ].map((s, idx) => (
                    <div key={s.label} style={{ padding:'20px', borderRight: idx < 2 ? '1px solid #eeeeec' : 'none', textAlign:'center' }}>
                      <div style={{ fontSize:'12px', color:'#767676', marginBottom:'8px' }}>{s.label}</div>
                      <div style={{ fontSize:'20px', fontWeight:800, color:s.color }}>{s.value}</div>
                    </div>
                  ))}
                </div>
                <div style={{ padding:'16px 20px', borderTop:'1px solid #eeeeec' }}>
                  <div style={{ fontSize:'13px', color:'#767676', marginBottom:'8px', fontWeight:600 }}>이달 CLYQ 수수료</div>
                  <div style={{ fontSize:'18px', fontWeight:800, color:'#111' }}>
                    {Math.round(modal.monthSales * modal.commission / 100).toLocaleString()}원
                  </div>
                  <div style={{ fontSize:'13px', color:'#767676', marginTop:'4px' }}>
                    브랜드 정산 예정: {Math.round(modal.monthSales * (100 - modal.commission) / 100).toLocaleString()}원
                  </div>
                </div>
              </div>
            )}

            <div className="br-modal-foot" style={{ display:'flex', gap:'8px', padding:'16px 20px', borderTop:'1px solid #eeeeec', justifyContent:'flex-end' }}>
              <button className="br-btn-warn">이용 정지</button>
              <button className="br-btn-close" onClick={() => setModal(null)}>닫기</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
