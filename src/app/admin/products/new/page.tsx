// @ts-nocheck
'use client'
import { useState } from 'react'

export default function AdminProductNew() {
  const [form, setForm] = useState({
    category1:'', category2:'', category3:'',
    brand:'', productName:'', productNameKo:'',
    season:'', fitting:true, fittingNote:'',
    tax:'과세', origin:'대한민국', material:'',
    manufacturer:'', styleCode:'', keywords:'',
    regularPrice:'', salePrice:'', commission:'30',
    withyRate:'0.1', stockAlert:'10',
    colorOptions:[{color:'', stock:'', use:true}],
    sizeOptions:['XS','S','M','L'],
    shippingType:'무료배송', returnFee:'6000',
    mainImage:null, extraImages:[null,null,null,null,null,null],
    description:'',
  })
  const [saved, setSaved] = useState(false)
  const [activeSection, setActiveSection] = useState(null)

  function f(key, val) { setForm(p => ({...p, [key]:val})) }

  const withy = form.salePrice
    ? Math.round(Number(form.salePrice.replace(/,/g,'')) * Number(form.withyRate) / 100)
    : 0

  function formatPrice(v) {
    const n = v.replace(/[^0-9]/g,'')
    return n ? Number(n).toLocaleString() : ''
  }

  function handleSubmit() {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
    window.scrollTo({top:0, behavior:'smooth'})
  }

  const sectionStyle = (id) => ({
    background:'#fff',
    border:'1px solid #e8e8eb',
    borderRadius:'8px',
    marginBottom:'16px',
    overflow:'hidden',
  })

  const sectionHeaderStyle = {
    padding:'14px 20px',
    background:'#fafafa',
    borderBottom:'1px solid #e8e8eb',
    fontWeight:700,
    fontSize:'14px',
    color:'#1a1a2e',
    display:'flex',
    alignItems:'center',
    gap:'8px',
  }

  const rowStyle = {
    display:'grid',
    gridTemplateColumns:'140px 1fr',
    gap:'0',
    borderBottom:'1px solid #f5f5f7',
    alignItems:'start',
  }

  const labelStyle = {
    padding:'14px 16px',
    fontSize:'13px',
    color:'#666',
    fontWeight:500,
    background:'#fafafa',
    borderRight:'1px solid #f0f0f2',
    display:'flex',
    alignItems:'center',
    minHeight:'48px',
  }

  const cellStyle = {
    padding:'10px 16px',
    display:'flex',
    alignItems:'center',
    gap:'8px',
    flexWrap:'wrap',
  }

  const inputStyle = {
    padding:'8px 12px',
    border:'1px solid #d0d0d8',
    borderRadius:'4px',
    fontSize:'13px',
    outline:'none',
    fontFamily:'inherit',
    background:'#fff',
  }

  const selectStyle = {
    ...inputStyle,
    cursor:'pointer',
    minWidth:'120px',
  }

  const required = <span style={{color:'#e74c3c',marginLeft:'2px'}}>*</span>

  return (
    <div>
      <style>{`
        input:focus, select:focus, textarea:focus { border-color:#C94E1A !important; outline:none; }
        .req-badge { background:#e74c3c; color:#fff; font-size:9px; padding:2px 5px; border-radius:3px; font-weight:700; margin-left:4px; }
        .opt-badge { background:#6b7280; color:#fff; font-size:9px; padding:2px 5px; border-radius:3px; font-weight:700; margin-left:4px; }
        .fit-badge { background:#C94E1A; color:#fff; font-size:9px; padding:2px 6px; border-radius:3px; font-weight:700; }
        .info-box { background:#fff8f5; border-left:3px solid #C94E1A; padding:10px 14px; font-size:12px; color:#555; line-height:1.7; border-radius:0 4px 4px 0; }
        .check-row { display:flex; align-items:center; gap:8px; cursor:pointer; font-size:13px; color:#333; }
        .check-row input[type=checkbox] { width:16px; height:16px; cursor:pointer; accent-color:#C94E1A; }
        .size-tag { display:flex; align-items:center; gap:4px; background:#f0f0f2; padding:5px 10px; border-radius:4px; font-size:12px; font-weight:500; }
        .size-tag button { background:none; border:none; cursor:pointer; color:#999; font-size:14px; line-height:1; }
        .color-row { display:grid; grid-template-columns:140px 80px 80px 80px; gap:8px; align-items:center; font-size:12px; margin-bottom:8px; }
        .img-box { width:120px; height:120px; border:1.5px dashed #d0d0d8; border-radius:6px; display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; font-size:11px; color:#999; gap:4px; background:#fafafa; transition:all 0.15s; position:relative; overflow:hidden; }
        .img-box:hover { border-color:#C94E1A; color:#C94E1A; background:#fff5f2; }
        .img-grid { display:grid; grid-template-columns:repeat(7,120px); gap:10px; flex-wrap:wrap; }
        .btn-save { padding:13px 36px; background:#C94E1A; color:#fff; border:none; border-radius:4px; font-size:14px; font-weight:700; cursor:pointer; font-family:inherit; transition:background 0.2s; }
        .btn-save:hover { background:#a83d14; }
        .btn-cancel { padding:13px 24px; background:#fff; color:#666; border:1px solid #d0d0d8; border-radius:4px; font-size:14px; cursor:pointer; font-family:inherit; }
        .btn-add { padding:7px 14px; background:#fff; border:1px solid #d0d0d8; border-radius:4px; font-size:12px; cursor:pointer; color:#555; display:flex; align-items:center; gap:4px; font-family:inherit; }
        .btn-add:hover { border-color:#C94E1A; color:#C94E1A; }
        .price-preview { padding:14px 16px; background:#f9f7f4; border-radius:6px; font-size:13px; }
        .success-banner { background:#10b981; color:#fff; padding:14px 20px; border-radius:8px; font-size:14px; font-weight:600; margin-bottom:20px; display:flex; align-items:center; gap:8px; animation:fadein 0.3s; }
        @keyframes fadein { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:none} }
        .step-bar { display:flex; gap:0; margin-bottom:24px; overflow-x:auto; scrollbar-width:none; }
        .step-item { padding:10px 18px; font-size:12px; font-weight:500; color:#999; white-space:nowrap; border-bottom:2px solid #e8e8eb; cursor:pointer; transition:all 0.15s; }
        .step-item:hover { color:#333; }
        .step-item.on { color:#C94E1A; border-bottom-color:#C94E1A; }
        .toggle-switch { width:40px; height:22px; border-radius:11px; border:none; cursor:pointer; position:relative; transition:background 0.2s; flex-shrink:0; }
        .toggle-switch::after { content:''; width:18px; height:18px; border-radius:50%; background:#fff; position:absolute; top:2px; transition:left 0.2s; box-shadow:0 1px 3px rgba(0,0,0,.2); }
        @media (max-width:768px) {
          .img-grid { grid-template-columns:repeat(3,1fr); }
          .img-box { width:100%; }
          .color-row { grid-template-columns:1fr 70px 70px 70px; }
        }
        @media (max-width:600px) {
          div[style*='grid-template-columns: 140px'] { grid-template-columns:1fr !important; }
        }
      `}</style>

      {/* 페이지 헤더 */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'20px',flexWrap:'wrap',gap:'12px'}}>
        <div>
          <div style={{fontSize:'9px',letterSpacing:'2px',color:'#C94E1A',fontWeight:700,marginBottom:'4px'}}>상품관리 › 상품등록</div>
          <h1 style={{fontSize:'22px',fontWeight:700,color:'#1a1a2e'}}>상품 등록</h1>
        </div>
        <div style={{display:'flex',gap:'8px'}}>
          <button className="btn-cancel" onClick={() => history.back()}>취소</button>
          <button className="btn-save" onClick={handleSubmit}>저장하기</button>
        </div>
      </div>

      {saved && (
        <div className="success-banner">
          ✓ 상품이 성공적으로 등록됐어요. 검토 후 승인됩니다.
        </div>
      )}

      {/* ① 카테고리 / 브랜드 */}
      <div style={sectionStyle()}>
        <div style={sectionHeaderStyle}>
          <span style={{color:'#C94E1A'}}>①</span> 카테고리 / 브랜드
        </div>

        <div style={rowStyle}>
          <div style={labelStyle}>진열 카테고리{required}</div>
          <div style={cellStyle}>
            <select style={selectStyle} value={form.category1} onChange={e=>f('category1',e.target.value)}>
              <option value="">대분류</option>
              {['아우터','상의','하의','원피스·세트','가방','슈즈','주얼리','액세서리'].map(c=><option key={c}>{c}</option>)}
            </select>
            <select style={selectStyle} value={form.category2} onChange={e=>f('category2',e.target.value)}>
              <option value="">중분류</option>
              {form.category1==='아우터'?['코트','재킷','패딩','조끼']:
               form.category1==='상의'?['블라우스','니트','티셔츠','셔츠']:
               form.category1==='하의'?['스커트','팬츠','레깅스']:
               form.category1==='원피스·세트'?['미디드레스','미니드레스','맥시드레스','세트업']:
               ['기타']
              }.map(c=><option key={c}>{c}</option>)}
            </select>
            <select style={selectStyle} value={form.category3} onChange={e=>f('category3',e.target.value)}>
              <option value="">세분류 (선택)</option>
              <option>오버핏</option>
              <option>슬림핏</option>
              <option>레귤러핏</option>
            </select>
          </div>
        </div>

        <div style={rowStyle}>
          <div style={labelStyle}>브랜드{required}</div>
          <div style={cellStyle}>
            <select style={{...selectStyle, minWidth:'200px'}} value={form.brand} onChange={e=>f('brand',e.target.value)}>
              <option value="">브랜드 선택</option>
              {['MARCIA','MATIN KIM','EENK','D.POUND','ANOTHER A','EIGHT','ANDERSSONBELL','ADER ERROR','SORRY TOO MUCH LOVE'].map(b=><option key={b}>{b}</option>)}
            </select>
          </div>
        </div>

        <div style={rowStyle}>
          <div style={labelStyle}>시즌</div>
          <div style={cellStyle}>
            <select style={selectStyle} value={form.season} onChange={e=>f('season',e.target.value)}>
              <option value="">시즌 선택</option>
              {['2026 F/W','2026 S/S','2025 F/W','2025 S/S'].map(s=><option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* ② 상품 기본 정보 */}
      <div style={sectionStyle()}>
        <div style={sectionHeaderStyle}>
          <span style={{color:'#C94E1A'}}>②</span> 상품 기본 정보
        </div>

        <div style={rowStyle}>
          <div style={labelStyle}>상품명 (영문){required}</div>
          <div style={{...cellStyle, flexDirection:'column', alignItems:'flex-start', gap:'6px'}}>
            <input style={{...inputStyle, width:'100%', maxWidth:'500px'}} type="text"
              placeholder="예: Oversized Cashmere Wool Coat"
              value={form.productName} onChange={e=>f('productName',e.target.value)}/>
            <div style={{fontSize:'11px',color:'#999'}}>시즌, 소재, 스타일, 컬러, 품목명 순으로 입력해주세요.</div>
          </div>
        </div>

        <div style={rowStyle}>
          <div style={labelStyle}>상품명 (한글){required}</div>
          <div style={{...cellStyle, flexDirection:'column', alignItems:'flex-start', gap:'6px'}}>
            <input style={{...inputStyle, width:'100%', maxWidth:'500px'}} type="text"
              placeholder="예: 오버핏 캐시미어 울 코트"
              value={form.productNameKo} onChange={e=>f('productNameKo',e.target.value)}/>
            <div style={{fontSize:'11px',color:'#999'}}>검색 최적화를 위해 핵심 키워드를 포함해주세요.</div>
          </div>
        </div>

        <div style={rowStyle}>
          <div style={labelStyle}>과세여부{required}</div>
          <div style={cellStyle}>
            <select style={selectStyle} value={form.tax} onChange={e=>f('tax',e.target.value)}>
              <option>과세</option>
              <option>면세</option>
              <option>영세율</option>
            </select>
          </div>
        </div>

        <div style={rowStyle}>
          <div style={labelStyle}>상품 검색 키워드</div>
          <div style={{...cellStyle, flexDirection:'column', alignItems:'flex-start', gap:'6px'}}>
            <input style={{...inputStyle, width:'100%', maxWidth:'500px'}} type="text"
              placeholder="예: 캐시미어,코트,오버핏,미니멀,가을,겨울 (쉼표로 구분)"
              value={form.keywords} onChange={e=>f('keywords',e.target.value)}/>
            <div style={{fontSize:'11px',color:'#999'}}>쉼표(,)로 구분해 입력. 브랜드명·타 브랜드명 입력 불가.</div>
          </div>
        </div>
      </div>

      {/* ③ 피팅박스 설정 — CLYQ 전용 */}
      <div style={sectionStyle()}>
        <div style={sectionHeaderStyle}>
          <span style={{color:'#C94E1A'}}>③</span> 피팅박스 설정
          <span className="fit-badge">CLYQ 전용</span>
        </div>

        <div style={rowStyle}>
          <div style={labelStyle}>피팅박스 가능{required}</div>
          <div style={cellStyle}>
            <button className="toggle-switch"
              style={{background: form.fitting ? '#C94E1A' : '#d0d0d8'}}
              onClick={() => f('fitting', !form.fitting)}>
              <span style={{position:'absolute',left: form.fitting ? '20px' : '2px',top:'2px',width:'18px',height:'18px',borderRadius:'50%',background:'#fff',boxShadow:'0 1px 3px rgba(0,0,0,.2)',transition:'left 0.2s'}}/>
            </button>
            <span style={{fontSize:'13px',color:form.fitting?'#C94E1A':'#999',fontWeight:500}}>
              {form.fitting ? '피팅박스 가능 — 상품에 📦 아이콘 표시됨' : '피팅박스 불가 (일반 구매만)'}
            </span>
          </div>
        </div>

        {form.fitting && (
          <>
            <div style={rowStyle}>
              <div style={labelStyle}>피팅 주의사항</div>
              <div style={{...cellStyle, flexDirection:'column', alignItems:'flex-start', gap:'6px'}}>
                <textarea style={{...inputStyle, width:'100%', maxWidth:'500px', height:'80px', resize:'vertical', lineHeight:'1.6'}}
                  placeholder="예: 드라이클리닝 전용 소재로 착용 시 향수 직접 접촉 주의"
                  value={form.fittingNote} onChange={e=>f('fittingNote',e.target.value)}/>
                <div className="info-box" style={{maxWidth:'500px'}}>
                  피팅박스 제품은 고객이 착용 후 반납합니다. 손상 시 CLYQ 피팅박스 제품 관리 약관에 따라 배상 청구됩니다.
                </div>
              </div>
            </div>

            <div style={rowStyle}>
              <div style={labelStyle}>복수 사이즈 신청</div>
              <div style={cellStyle}>
                <label className="check-row">
                  <input type="checkbox" defaultChecked/>
                  고객이 최대 2가지 사이즈 동시 신청 허용
                </label>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ④ 상품 가격 */}
      <div style={sectionStyle()}>
        <div style={sectionHeaderStyle}>
          <span style={{color:'#C94E1A'}}>④</span> 상품 가격 정보
        </div>

        <div style={rowStyle}>
          <div style={labelStyle}>정상가{required}</div>
          <div style={cellStyle}>
            <input style={{...inputStyle, width:'160px', textAlign:'right'}} type="text"
              placeholder="0"
              value={form.regularPrice} onChange={e=>f('regularPrice', formatPrice(e.target.value))}/>
            <span style={{fontSize:'13px',color:'#666'}}>원</span>
          </div>
        </div>

        <div style={rowStyle}>
          <div style={labelStyle}>판매가{required}</div>
          <div style={cellStyle}>
            <input style={{...inputStyle, width:'160px', textAlign:'right'}} type="text"
              placeholder="0"
              value={form.salePrice} onChange={e=>f('salePrice', formatPrice(e.target.value))}/>
            <span style={{fontSize:'13px',color:'#666'}}>원</span>
            {form.regularPrice && form.salePrice && (
              <span style={{fontSize:'12px',fontWeight:700,color:'#e74c3c'}}>
                {Math.round((1 - Number(form.salePrice.replace(/,/g,'')) / Number(form.regularPrice.replace(/,/g,''))) * 100)}% 할인
              </span>
            )}
          </div>
        </div>

        <div style={rowStyle}>
          <div style={labelStyle}>CLYQ 수수료</div>
          <div style={cellStyle}>
            <input style={{...inputStyle, width:'80px', textAlign:'right'}} type="number"
              value={form.commission} onChange={e=>f('commission', e.target.value)}/>
            <span style={{fontSize:'13px',color:'#666'}}>%</span>
            {form.salePrice && (
              <span style={{fontSize:'12px',color:'#999'}}>
                = {Math.round(Number(form.salePrice.replace(/,/g,'')) * Number(form.commission) / 100).toLocaleString()}원
              </span>
            )}
          </div>
        </div>

        <div style={rowStyle}>
          <div style={labelStyle}>위디 적립률</div>
          <div style={cellStyle}>
            <input style={{...inputStyle, width:'80px', textAlign:'right'}} type="number"
              step="0.1" value={form.withyRate} onChange={e=>f('withyRate', e.target.value)}/>
            <span style={{fontSize:'13px',color:'#666'}}>%</span>
            <span style={{fontSize:'12px',color:'#B08D57',fontWeight:600}}>
              구매 시 위디 {withy > 0 ? withy.toLocaleString() : 0}P 적립
            </span>
          </div>
        </div>

        {/* 가격 요약 */}
        {form.salePrice && (
          <div style={{padding:'14px 16px'}}>
            <div className="price-preview">
              <div style={{fontWeight:700,color:'#1a1a2e',marginBottom:'8px',fontSize:'12px'}}>💰 가격 요약</div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'12px',textAlign:'center'}}>
                {[
                  {label:'판매가', val: Number(form.salePrice.replace(/,/g,'') || 0).toLocaleString()+'원', color:'#1a1a2e'},
                  {label:'CLYQ 수수료', val: Math.round(Number(form.salePrice.replace(/,/g,'')) * Number(form.commission) / 100).toLocaleString()+'원', color:'#C94E1A'},
                  {label:'브랜드 정산', val: Math.round(Number(form.salePrice.replace(/,/g,'')) * (100 - Number(form.commission)) / 100).toLocaleString()+'원', color:'#10b981'},
                  {label:'위디 적립', val: withy.toLocaleString()+'P', color:'#B08D57'},
                ].map(item => (
                  <div key={item.label}>
                    <div style={{fontSize:'11px',color:'#888',marginBottom:'4px'}}>{item.label}</div>
                    <div style={{fontSize:'14px',fontWeight:700,color:item.color}}>{item.val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ⑤ 상품 옵션 */}
      <div style={sectionStyle()}>
        <div style={sectionHeaderStyle}>
          <span style={{color:'#C94E1A'}}>⑤</span> 상품 옵션 / 재고
        </div>

        <div style={rowStyle}>
          <div style={labelStyle}>사이즈{required}</div>
          <div style={{...cellStyle, flexDirection:'column', alignItems:'flex-start', gap:'8px'}}>
            <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
              {form.sizeOptions.map(sz => (
                <div key={sz} className="size-tag">
                  {sz}
                  <button onClick={() => f('sizeOptions', form.sizeOptions.filter(s=>s!==sz))}>✕</button>
                </div>
              ))}
            </div>
            <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
              {['XS','S','M','L','XL','XXL','FREE'].filter(s=>!form.sizeOptions.includes(s)).map(sz => (
                <button key={sz} className="btn-add" onClick={() => f('sizeOptions', [...form.sizeOptions, sz])}>
                  + {sz}
                </button>
              ))}
            </div>
            <div style={{fontSize:'11px',color:'#999'}}>피팅박스 신청 시 위 사이즈 중 선택 가능합니다.</div>
          </div>
        </div>

        <div style={rowStyle}>
          <div style={labelStyle}>컬러 / 재고</div>
          <div style={{...cellStyle, flexDirection:'column', alignItems:'flex-start', gap:'6px'}}>
            <div style={{display:'grid',gridTemplateColumns:'140px 80px 80px 80px',gap:'8px',alignItems:'center',fontSize:'11px',fontWeight:600,color:'#888',marginBottom:'4px'}}>
              <span>컬러명</span><span>재고(개)</span><span>추가금(원)</span><span>사용여부</span>
            </div>
            {form.colorOptions.map((opt, i) => (
              <div key={i} className="color-row">
                <input style={inputStyle} type="text" placeholder="예: 아이보리"
                  value={opt.color} onChange={e => {
                    const updated = [...form.colorOptions]
                    updated[i] = {...opt, color:e.target.value}
                    f('colorOptions', updated)
                  }}/>
                <input style={{...inputStyle, textAlign:'right'}} type="number" placeholder="0"
                  value={opt.stock} onChange={e => {
                    const updated = [...form.colorOptions]
                    updated[i] = {...opt, stock:e.target.value}
                    f('colorOptions', updated)
                  }}/>
                <input style={{...inputStyle, textAlign:'right'}} type="number" placeholder="0"/>
                <select style={selectStyle} onChange={e => {
                  const updated = [...form.colorOptions]
                  updated[i] = {...opt, use: e.target.value==='사용'}
                  f('colorOptions', updated)
                }}>
                  <option>사용</option><option>미사용</option>
                </select>
              </div>
            ))}
            <button className="btn-add" onClick={() => f('colorOptions', [...form.colorOptions, {color:'',stock:'',use:true}])}>
              + 컬러 추가
            </button>
            <div style={{fontSize:'11px',color:'#999'}}>전체 재고 부족 기준:
              <input style={{...inputStyle, width:'60px', textAlign:'right', padding:'4px 8px', marginLeft:'6px'}} type="number"
                value={form.stockAlert} onChange={e=>f('stockAlert',e.target.value)}/>
              개 이하 시 알림
            </div>
          </div>
        </div>
      </div>

      {/* ⑥ 상세 정보 */}
      <div style={sectionStyle()}>
        <div style={sectionHeaderStyle}>
          <span style={{color:'#C94E1A'}}>⑥</span> 상품 상세 정보
        </div>

        {[
          {label:'소재 (성분)', key:'material', placeholder:'예: 캐시미어 30%, 울 50%, 폴리에스터 20%', req:true},
          {label:'제조국', key:'origin', placeholder:'예: 대한민국', req:true},
          {label:'제조자', key:'manufacturer', placeholder:'예: (주)마르시아', req:false},
          {label:'스타일코드', key:'styleCode', placeholder:'예: MA-2026-CT-001', req:false},
        ].map(row => (
          <div key={row.key} style={rowStyle}>
            <div style={labelStyle}>{row.label}{row.req && required}</div>
            <div style={cellStyle}>
              <input style={{...inputStyle, width:'100%', maxWidth:'400px'}} type="text"
                placeholder={row.placeholder}
                value={form[row.key]} onChange={e=>f(row.key,e.target.value)}/>
            </div>
          </div>
        ))}

        <div style={rowStyle}>
          <div style={labelStyle}>세탁 방법</div>
          <div style={cellStyle}>
            <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
              {['드라이클리닝 권장','손세탁 가능','기계세탁 가능','울 코스 세탁','표백 금지'].map(w => (
                <label key={w} className="check-row">
                  <input type="checkbox"/> {w}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ⑦ 배송 / 반납 정보 */}
      <div style={sectionStyle()}>
        <div style={sectionHeaderStyle}>
          <span style={{color:'#C94E1A'}}>⑦</span> 배송 / 반납 정보
        </div>

        <div style={rowStyle}>
          <div style={labelStyle}>배송비 유형{required}</div>
          <div style={cellStyle}>
            <select style={selectStyle} value={form.shippingType} onChange={e=>f('shippingType',e.target.value)}>
              <option>무료배송</option>
              <option>조건부 무료 (5만원 이상)</option>
              <option>유료배송 (3,000원)</option>
            </select>
          </div>
        </div>

        <div style={rowStyle}>
          <div style={labelStyle}>교환·반품 배송비{required}</div>
          <div style={cellStyle}>
            <span style={{fontSize:'13px',color:'#666'}}>회수배비</span>
            <input style={{...inputStyle, width:'100px', textAlign:'right'}} type="text"
              value={form.returnFee} onChange={e=>f('returnFee',e.target.value)}/>
            <span style={{fontSize:'13px',color:'#666'}}>원 / 배송택배비</span>
            <input style={{...inputStyle, width:'100px', textAlign:'right'}} defaultValue="3000"/>
            <span style={{fontSize:'13px',color:'#666'}}>원</span>
          </div>
        </div>

        <div style={rowStyle}>
          <div style={labelStyle}>피팅박스 반납</div>
          <div style={cellStyle}>
            <div className="info-box">
              피팅박스 반납 비용은 CLYQ 정책에 따라 <strong>무료</strong>로 처리됩니다. 고객은 앱에서 반납 신청 후 익일 수거됩니다.
            </div>
          </div>
        </div>
      </div>

      {/* ⑧ 상품 이미지 */}
      <div style={sectionStyle()}>
        <div style={sectionHeaderStyle}>
          <span style={{color:'#C94E1A'}}>⑧</span> 상품 이미지
          <span style={{fontSize:'11px',color:'#999',fontWeight:400,marginLeft:'4px'}}>
            JPG/PNG · 960 × 1280px 권장 · 파일당 5MB 이하
          </span>
        </div>

        <div style={{padding:'16px 20px'}}>
          <div style={{fontSize:'12px',fontWeight:600,color:'#333',marginBottom:'12px'}}>
            대표 이미지 <span className="req-badge">필수</span>
            &nbsp;&nbsp;추가 이미지 (최대 6장) <span className="opt-badge">선택</span>
          </div>
          <div className="img-grid">
            {/* 대표 이미지 */}
            <div>
              <div style={{fontSize:'11px',color:'#C94E1A',fontWeight:600,marginBottom:'4px',textAlign:'center'}}>대표 이미지</div>
              <div className="img-box" onClick={() => {const inp=document.createElement('input');inp.type='file';inp.accept='image/*';inp.click()}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
                <span>이미지 선택</span>
              </div>
            </div>
            {/* 추가 이미지 */}
            {[1,2,3,4,5,6].map(i => (
              <div key={i}>
                <div style={{fontSize:'11px',color:'#888',fontWeight:500,marginBottom:'4px',textAlign:'center'}}>추가 {i}</div>
                <div className="img-box" onClick={() => {const inp=document.createElement('input');inp.type='file';inp.accept='image/*';inp.click()}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  <span>추가</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{marginTop:'10px',fontSize:'11px',color:'#999'}}>
            · 이미지는 최소 960×1280px, 3:4 비율 권장<br/>
            · 대표 이미지는 검색·목록·피팅박스 상세 페이지에 사용됩니다
          </div>
        </div>
      </div>

      {/* ⑨ 상품 상세 설명 */}
      <div style={sectionStyle()}>
        <div style={sectionHeaderStyle}>
          <span style={{color:'#C94E1A'}}>⑨</span> 상품 상세 설명
        </div>
        <div style={{padding:'16px 20px'}}>
          {/* 에디터 툴바 시뮬레이션 */}
          <div style={{border:'1px solid #d0d0d8',borderRadius:'4px',overflow:'hidden'}}>
            <div style={{padding:'8px 12px',background:'#f5f5f7',borderBottom:'1px solid #d0d0d8',display:'flex',gap:'8px',flexWrap:'wrap'}}>
              {['B','I','U','H1','H2','─','정렬','리스트','링크','이미지'].map(tool => (
                <button key={tool} style={{padding:'4px 8px',border:'1px solid #d0d0d8',background:'#fff',fontSize:'11px',cursor:'pointer',borderRadius:'3px',fontFamily:'inherit'}}>
                  {tool}
                </button>
              ))}
            </div>
            <textarea style={{width:'100%',minHeight:'240px',border:'none',outline:'none',padding:'16px',fontSize:'13px',fontFamily:'inherit',lineHeight:'1.8',resize:'vertical',boxSizing:'border-box'}}
              placeholder="상품 상세 설명을 입력해주세요. 소재, 핏, 사이즈 포인트, 스타일링 팁 등을 포함하면 전환율이 높아집니다."
              value={form.description} onChange={e=>f('description',e.target.value)}/>
          </div>
          <div style={{marginTop:'8px',fontSize:'11px',color:'#999'}}>
            · 피팅박스 상품의 경우 세탁 방법, 소재 특성을 상세히 작성해주세요<br/>
            · 고객이 피팅 전 확인할 수 있는 사이즈 체크 포인트를 포함해주세요
          </div>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div style={{display:'flex',justifyContent:'center',gap:'12px',padding:'24px 0'}}>
        <button className="btn-cancel" onClick={() => history.back()}>취소</button>
        <button className="btn-save" onClick={handleSubmit}>상품 등록하기</button>
      </div>
    </div>
  )
}
