// @ts-nocheck
'use client'
import { useState } from 'react'

const BRAND_LIST = ['MARCIA','MATIN KIM','EENK','D.POUND','ANDERSSONBELL','ANOTHER A','EIGHT','ADER ERROR']
const ACQ_TYPES  = ['브랜드 제공 (무상)','브랜드 제공 (임차)','CLYQ 직접 구매']
const CONDITIONS = ['새 제품','전시 제품','샘플 제품']
const PERIODS    = ['2','3','5','7']
const ALL_SIZES  = ['XS','S','M','L','XL','XXL','FREE']

const PRODUCTS = [
  { brand:'MARCIA',    id:'MA-2026-CT-001', name:'오버핏 캐시미어 울 코트', category:'아우터 > 코트',        price:298000, season:'2026 F/W', sizes:['S','M','L'] },
  { brand:'MARCIA',    id:'MA-2026-ST-003', name:'울 블레이저 세트업',      category:'원피스·세트 > 세트업', price:389000, season:'2026 F/W', sizes:['S','M'] },
  { brand:'MARCIA',    id:'MA-2026-KN-012', name:'캐시미어 니트',           category:'상의 > 니트',          price:178000, season:'2026 F/W', sizes:['S','M','L','XL'] },
  { brand:'MATIN KIM', id:'MK-2026-JK-001', name:'레더 재킷',              category:'아우터 > 재킷',        price:456000, season:'2026 F/W', sizes:['S','M','L'] },
  { brand:'MATIN KIM', id:'MK-2026-BL-004', name:'실크 블라우스',          category:'상의 > 블라우스',      price:148000, season:'2026 S/S', sizes:['S','M'] },
  { brand:'EENK',      id:'EK-2026-CT-002', name:'더블 브레스트 코트',     category:'아우터 > 코트',        price:528000, season:'2026 F/W', sizes:['S','M','L'] },
  { brand:'D.POUND',   id:'DP-2026-PA-001', name:'와이드 팬츠',            category:'하의 > 팬츠',          price:198000, season:'2026 F/W', sizes:['S','M','L'] },
]

export default function FittingProductNewPage() {
  const [brand, setBrand]           = useState('')
  const [productId, setProductId]   = useState('')
  const [keyword, setKeyword]       = useState('')
  const [quantity, setQuantity]     = useState('1')
  const [sizes, setSizes]           = useState([])
  const [storage, setStorage]       = useState('')
  const [period, setPeriod]         = useState('3')
  const [multiSize, setMultiSize]   = useState(true)
  const [penalty, setPenalty]       = useState('')
  const [fitNote, setFitNote]       = useState('')
  const [acqType, setAcqType]       = useState('브랜드 제공 (무상)')
  const [condition, setCondition]   = useState('새 제품')
  const [acqDate, setAcqDate]       = useState('')
  const [intNote, setIntNote]       = useState('')
  const [saved, setSaved]           = useState(false)

  const picked = PRODUCTS.find(p => p.id === productId)

  const list = PRODUCTS.filter(p => {
    const okBrand = !brand || p.brand === brand
    const okWord  = !keyword || p.name.includes(keyword) || p.id.includes(keyword)
    return okBrand && okWord
  })

  function pickProduct(p) {
    setProductId(p.id)
    setBrand(p.brand)
    setSizes(p.sizes)
    setPenalty(String(p.price))
  }

  function toggleSize(s) {
    setSizes(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    )
  }

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
    window.scrollTo({ top:0, behavior:'smooth' })
  }

  const sizeList = picked ? picked.sizes : ALL_SIZES

  return (
    <>
      <style>{`
        .np-sec { background:#fff; border:1px solid #e8e8eb; border-radius:8px; margin-bottom:16px; overflow:hidden; }
        .np-head { padding:13px 20px; background:#0f1623; color:#fff; font-size:13px; font-weight:700; }
        .np-row { display:grid; grid-template-columns:160px 1fr; border-bottom:1px solid #f0f0f2; }
        .np-row:last-child { border-bottom:none; }
        .np-label { padding:13px 16px; font-size:12px; color:#555; font-weight:600; background:#fafafa; border-right:1px solid #f0f0f2; display:flex; align-items:center; }
        .np-cell { padding:10px 16px; display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
        .np-inp { padding:8px 12px; border:1px solid #d0d0d8; border-radius:4px; font-size:13px; outline:none; font-family:inherit; background:#fff; }
        .np-inp:focus { border-color:#C94E1A; }
        .np-sel { padding:8px 12px; border:1px solid #d0d0d8; border-radius:4px; font-size:13px; outline:none; font-family:inherit; background:#fff; cursor:pointer; }
        .np-sel:focus { border-color:#C94E1A; }
        .np-ta { padding:8px 12px; border:1px solid #d0d0d8; border-radius:4px; font-size:13px; outline:none; font-family:inherit; background:#fff; width:100%; height:72px; resize:vertical; line-height:1.6; }
        .np-ta:focus { border-color:#C94E1A; }
        .np-prod-list { max-height:260px; overflow-y:auto; border:1px solid #e8e8eb; border-radius:6px; }
        .np-prod-row { padding:11px 14px; border-bottom:1px solid #f5f5f7; cursor:pointer; display:flex; align-items:center; justify-content:space-between; }
        .np-prod-row:last-child { border-bottom:none; }
        .np-prod-row:hover { background:#fff8f5; }
        .np-prod-row.on { background:#fff3ee; border-left:3px solid #C94E1A; }
        .np-sz { padding:5px 12px; border-radius:4px; font-size:12px; font-weight:500; cursor:pointer; border:1px solid #d0d0d8; background:#fff; color:#555; }
        .np-sz.on { background:#C94E1A; border-color:#C94E1A; color:#fff; }
        .np-toggle { width:40px; height:22px; border-radius:11px; border:none; cursor:pointer; position:relative; transition:background 0.2s; flex-shrink:0; }
        .np-toggle-knob { position:absolute; top:2px; width:18px; height:18px; border-radius:50%; background:#fff; box-shadow:0 1px 3px rgba(0,0,0,.2); transition:left 0.2s; }
        .np-btn-save { padding:11px 32px; background:#C94E1A; color:#fff; border:none; border-radius:5px; font-size:14px; font-weight:700; cursor:pointer; font-family:inherit; }
        .np-btn-save:hover { background:#a83d14; }
        .np-btn-out { padding:11px 20px; background:#fff; color:#555; border:1px solid #d0d0d8; border-radius:5px; font-size:13px; cursor:pointer; font-family:inherit; }
        .np-ok { background:#f0fdf4; border:1px solid #bbf7d0; border-radius:6px; padding:12px 16px; font-size:12px; color:#16a34a; font-weight:600; margin-top:12px; }
        .np-success { background:#10b981; color:#fff; padding:13px 18px; border-radius:8px; font-size:14px; font-weight:600; margin-bottom:16px; }
        .np-note { font-size:11px; color:#C94E1A; margin-top:4px; }
      `}</style>

      <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:'20px', flexWrap:'wrap', gap:'10px' }}>
        <div>
          <div style={{ fontSize:'11px', color:'#aaa', marginBottom:'4px' }}>피팅박스 관리 › 피팅 제품 등록</div>
          <h1 style={{ fontSize:'22px', fontWeight:800, color:'#1a1a2e', margin:0 }}>피팅 제품 등록</h1>
          <div style={{ fontSize:'12px', color:'#aaa', marginTop:'4px' }}>브랜드 등록 상품에서 선택 후 피팅 전용 설정을 추가합니다.</div>
        </div>
        <div style={{ display:'flex', gap:'8px' }}>
          <button className="np-btn-out" onClick={() => history.back()}>취소</button>
          <button className="np-btn-save" onClick={handleSave}>등록하기</button>
        </div>
      </div>

      {saved && <div className="np-success">피팅 제품이 등록됐어요.</div>}

      {/* 브랜드 선택 */}
      <div className="np-sec">
        <div className="np-head">① 브랜드 선택</div>
        <div className="np-row">
          <div className="np-label">브랜드 <span style={{ color:'#dc2626', marginLeft:'2px' }}>*</span></div>
          <div className="np-cell">
            <select
              className="np-sel"
              style={{ width:'220px' }}
              value={brand}
              onChange={e => { setBrand(e.target.value); setProductId('') }}
            >
              <option value="">브랜드 선택</option>
              {BRAND_LIST.map(b => <option key={b}>{b}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* 상품 선택 */}
      <div className="np-sec">
        <div className="np-head">② 브랜드 등록 상품에서 선택</div>
        <div style={{ padding:'16px 20px' }}>
          <input
            className="np-inp"
            style={{ width:'320px', marginBottom:'12px', display:'block' }}
            type="text"
            placeholder="상품명 또는 상품코드 검색"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
          />
          <div className="np-prod-list">
            {list.length === 0 ? (
              <div style={{ padding:'24px', textAlign:'center', color:'#aaa', fontSize:'13px' }}>
                {brand ? '등록된 상품이 없습니다.' : '브랜드를 먼저 선택하세요.'}
              </div>
            ) : list.map(p => (
              <div
                key={p.id}
                className={productId === p.id ? 'np-prod-row on' : 'np-prod-row'}
                onClick={() => pickProduct(p)}
              >
                <div>
                  <div style={{ fontWeight:600, color:'#1a1a2e', fontSize:'13px' }}>{p.name}</div>
                  <div style={{ fontSize:'11px', color:'#aaa', marginTop:'2px' }}>
                    {p.id} · {p.brand} · {p.category} · {p.season}
                  </div>
                </div>
                <div style={{ fontSize:'13px', fontWeight:700, color:'#C94E1A', flexShrink:0 }}>
                  {p.price.toLocaleString()}원
                </div>
              </div>
            ))}
          </div>
          {picked && (
            <div className="np-ok">선택됨: {picked.name} ({picked.id})</div>
          )}
        </div>
      </div>

      {/* 피팅 재고 설정 */}
      <div className="np-sec">
        <div className="np-head">③ 피팅 재고 설정</div>
        <div className="np-row">
          <div className="np-label">보유 수량 <span style={{ color:'#dc2626', marginLeft:'2px' }}>*</span></div>
          <div className="np-cell">
            <input
              className="np-inp"
              style={{ width:'100px', textAlign:'right' }}
              type="number"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
            />
            <span style={{ fontSize:'12px', color:'#888' }}>개</span>
          </div>
        </div>
        <div className="np-row">
          <div className="np-label">피팅 사이즈 <span style={{ color:'#dc2626', marginLeft:'2px' }}>*</span></div>
          <div className="np-cell">
            {sizeList.map(s => (
              <div
                key={s}
                className={sizes.includes(s) ? 'np-sz on' : 'np-sz'}
                onClick={() => toggleSize(s)}
              >
                {s}
              </div>
            ))}
          </div>
        </div>
        <div className="np-row">
          <div className="np-label">보관 위치</div>
          <div className="np-cell">
            <input
              className="np-inp"
              style={{ width:'280px' }}
              type="text"
              placeholder="예: 물류센터 A-3-12"
              value={storage}
              onChange={e => setStorage(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* 피팅 규정 */}
      <div className="np-sec">
        <div className="np-head">④ 피팅 규정 설정</div>
        <div className="np-row">
          <div className="np-label">피팅 기간 <span style={{ color:'#dc2626', marginLeft:'2px' }}>*</span></div>
          <div className="np-cell">
            <select
              className="np-sel"
              style={{ width:'180px' }}
              value={period}
              onChange={e => setPeriod(e.target.value)}
            >
              {PERIODS.map(d => (
                <option key={d} value={d}>{d}일 (수령일 포함)</option>
              ))}
            </select>
          </div>
        </div>
        <div className="np-row">
          <div className="np-label">복수 사이즈 신청</div>
          <div className="np-cell">
            <button
              className="np-toggle"
              style={{ background: multiSize ? '#C94E1A' : '#d0d0d8' }}
              onClick={() => setMultiSize(v => !v)}
            >
              <div
                className="np-toggle-knob"
                style={{ left: multiSize ? '20px' : '2px' }}
              />
            </button>
            <span style={{ fontSize:'13px', color: multiSize ? '#C94E1A' : '#999' }}>
              {multiSize ? '최대 2가지 사이즈 동시 신청 허용' : '1가지 사이즈만 신청 가능'}
            </span>
          </div>
        </div>
        <div className="np-row">
          <div className="np-label">배상 기준가 <span style={{ color:'#dc2626', marginLeft:'2px' }}>*</span></div>
          <div className="np-cell">
            <input
              className="np-inp"
              style={{ width:'160px', textAlign:'right' }}
              type="text"
              placeholder="0"
              value={penalty}
              onChange={e => setPenalty(e.target.value)}
            />
            <span style={{ fontSize:'12px', color:'#888' }}>원 (훼손 시 배상 기준)</span>
          </div>
        </div>
        <div className="np-row">
          <div className="np-label">피팅 주의사항</div>
          <div style={{ padding:'10px 16px', flex:1 }}>
            <textarea
              className="np-ta"
              placeholder="예: 드라이클리닝 전용 소재. 향수 직접 접촉 주의."
              value={fitNote}
              onChange={e => setFitNote(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* 입수 정보 */}
      <div className="np-sec">
        <div className="np-head">⑤ 입수 정보 (내부용)</div>
        <div className="np-row">
          <div className="np-label">입수 유형 <span style={{ color:'#dc2626', marginLeft:'2px' }}>*</span></div>
          <div className="np-cell">
            <select
              className="np-sel"
              style={{ width:'240px' }}
              value={acqType}
              onChange={e => setAcqType(e.target.value)}
            >
              {ACQ_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div className="np-row">
          <div className="np-label">제품 상태</div>
          <div className="np-cell">
            {CONDITIONS.map(c => (
              <label key={c} style={{ display:'flex', alignItems:'center', gap:'6px', cursor:'pointer', fontSize:'13px', color:'#333' }}>
                <input
                  type="radio"
                  name="cond"
                  checked={condition === c}
                  onChange={() => setCondition(c)}
                  style={{ accentColor:'#C94E1A' }}
                />
                {c}
              </label>
            ))}
          </div>
        </div>
        <div className="np-row">
          <div className="np-label">입수일</div>
          <div className="np-cell">
            <input
              className="np-inp"
              style={{ width:'180px' }}
              type="date"
              value={acqDate}
              onChange={e => setAcqDate(e.target.value)}
            />
          </div>
        </div>
        <div className="np-row">
          <div className="np-label">내부 메모</div>
          <div style={{ padding:'10px 16px', flex:1 }}>
            <textarea
              className="np-ta"
              placeholder="입수 경위, 특이사항 등 내부 메모 (브랜드 비공개)"
              value={intNote}
              onChange={e => setIntNote(e.target.value)}
            />
            <div className="np-note">브랜드 파트너에게 공개되지 않습니다.</div>
          </div>
        </div>
      </div>

      <div style={{ display:'flex', justifyContent:'center', gap:'10px', padding:'24px 0' }}>
        <button className="np-btn-out" onClick={() => history.back()}>취소</button>
        <button className="np-btn-save" onClick={handleSave}>피팅 제품 등록하기</button>
      </div>
    </>
  )
}
