// @ts-nocheck
'use client'
import { useState } from 'react'

const ROLE = 'clyq'

const warn_box_style = {
  background:'#fff0f0', borderLeft:'3px solid #e74c3c',
  padding:'10px 14px', fontSize:'12px', color:'#555',
  lineHeight:'1.7', borderRadius:'0 4px 4px 0',
}

export default function FittingProductNew() {
  const [form, setForm] = useState({
    brand:'', productName:'', productNameKo:'',
    category1:'', category2:'', season:'',
    material:'', origin:'대한민국', care:'드라이클리닝 권장',
    totalStock:'', alertStock:'5',
    sizeOptions:['S','M','L'],
    colorOptions:[{color:'', stock:''}],
    condition:'신품', acquisitionType:'브랜드 제공',
    fittingPeriod:'3', multiSize:true,
    deposit:'', penaltyRate:'30',
    acquisitionDate:'', acquisitionMemo:'',
    regularPrice:'', fittingFee:'0',
    notes:'',
  })
  const [saved, setSaved] = useState(false)

  if (ROLE !== 'clyq') {
    return (
      <div style={{textAlign:'center',padding:'80px 20px'}}>
        <div style={{fontSize:'48px',marginBottom:'16px'}}>🔒</div>
        <div style={{fontSize:'20px',fontWeight:700,color:'#1a1a2e',marginBottom:'8px'}}>접근 권한 없음</div>
        <div style={{fontSize:'14px',color:'#999'}}>피팅박스 제품 등록은 CLYQ 관리자만 가능합니다.</div>
        <a href="/admin" style={{display:'inline-block',marginTop:'20px',padding:'10px 24px',background:'#1a1a2e',color:'#fff',textDecoration:'none',fontSize:'13px',borderRadius:'4px'}}>
          대시보드로 돌아가기
        </a>
      </div>
    )
  }

  function f(key, val) { setForm(p => ({...p, [key]:val})) }
  function formatPrice(v) {
    const n = v.replace(/[^0-9]/g,'')
    return n ? Number(n).toLocaleString() : ''
  }

  const sectionStyle = {background:'#fff',border:'1px solid #e8e8eb',borderRadius:'8px',marginBottom:'16px',overflow:'hidden'}
  const sectionH = {padding:'13px 20px',background:'#1a1a2e',borderBottom:'1px solid rgba(255,255,255,0.08)',fontWeight:700,fontSize:'13px',color:'#fff',display:'flex',alignItems:'center',gap:'8px'}
  const rowS = {display:'grid',gridTemplateColumns:'150px 1fr',gap:0,borderBottom:'1px solid #f5f5f7',alignItems:'start'}
  const labelS = {padding:'13px 16px',fontSize:'12px',color:'#666',fontWeight:500,background:'#fafafa',borderRight:'1px solid #f0f0f2',display:'flex',alignItems:'center',minHeight:'46px'}
  const cellS = {padding:'8px 16px',display:'flex',alignItems:'center',gap:'8px',flexWrap:'wrap'}
  const inputS = {padding:'7px 11px',border:'1px solid #d0d0d8',borderRadius:'4px',fontSize:'13px',outline:'none',fontFamily:'inherit'}
  const selectS = {...inputS, cursor:'pointer', minWidth:'130px'}
  const req = <span style={{color:'#e74c3c',marginLeft:'2px'}}>*</span>

  return (
    <div>
      <style>{`
        input:focus, select:focus, textarea:focus { border-color:#C94E1A !important; }
        .btn-save { padding:11px 28px; background:#C94E1A; color:#fff; border:none; border-radius:4px; font-size:13px; font-weight:700; cursor:pointer; font-family:inherit; }
        .btn-save:hover { background:#a83d14; }
        .btn-out { padding:11px 20px; background:#fff; color:#666; border:1px solid #d0d0d8; border-radius:4px; font-size:13px; cursor:pointer; font-family:inherit; }
        .clyq-only { display:inline-flex; align-items:center; gap:4px; background:rgba(201,78,26,0.15); color:#C94E1A; font-size:9px; font-weight:700; padding:3px 7px; border-radius:3px; }
        .size-tag { display:flex; align-items:center; gap:3px; background:#e8e8f0; padding:4px 9px; border-radius:4px; font-size:12px; }
        .size-tag button { background:none; border:none; cursor:pointer; color:#999; font-size:13px; }
        .btn-add { padding:6px 12px; background:#fff; border:1px solid #d0d0d8; border-radius:4px; font-size:12px; cursor:pointer; color:#555; font-family:inherit; }
        .btn-add:hover { border-color:#C94E1A; color:#C94E1A; }
        .info-box { background:#fff8f5; border-left:3px solid #C94E1A; padding:10px 14px; font-size:12px; color:#555; line-height:1.7; border-radius:0 4px 4px 0; }
        .warn-box { background:#fff0f0; border-left:3px solid #e74c3c; padding:10px 14px; font-size:12px; color:#555; line-height:1.7; }
        .toggle { width:40px; height:22px; border-radius:11px; border:none; cursor:pointer; position:relative; transition:background 0.2s; }
        .toggle::after { content:''; width:18px; height:18px; border-radius:50%; background:#fff; position:absolute; top:2px; transition:left 0.2s; box-shadow:0 1px 3px rgba(0,0,0,.2); }
        .img-box { width:110px; height:138px; border:1.5px dashed #d0d0d8; border-radius:6px; display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; font-size:11px; color:#999; gap:4px; background:#fafafa; }
        .img-box:hover { border-color:#C94E1A; color:#C94E1A; background:#fff5f2; }
        .img-row { display:flex; gap:10px; flex-wrap:wrap; }
        .success-banner { background:#10b981; color:#fff; padding:13px 18px; border-radius:8px; font-size:14px; font-weight:600; margin-bottom:16px; display:flex; align-items:center; gap:8px; }
        @media (max-width:600px) {
          div[style*='grid-template-columns: 150px'] { grid-template-columns:1fr !important; }
        }
      `}</style>

      {/* 헤더 */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'20px',flexWrap:'wrap',gap:'10px'}}>
        <div>
          <div style={{fontSize:'9px',letterSpacing:'2px',color:'#C94E1A',fontWeight:700,marginBottom:'4px'}}>
            상품관리 › 피팅박스 제품 › 등록
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
            <h1 style={{fontSize:'22px',fontWeight:700,color:'#1a1a2e'}}>📦 피팅박스 제품 등록</h1>
            <span className="clyq-only">🔑 CLYQ 관리자 전용</span>
          </div>
          <div style={{fontSize:'12px',color:'#999',marginTop:'4px'}}>
            CLYQ 본사가 직접 관리하는 피팅 전용 제품입니다. 브랜드는 열람만 가능합니다.
          </div>
        </div>
        <div style={{display:'flex',gap:'8px'}}>
          <button className="btn-out" onClick={() => history.back()}>취소</button>
          <button className="btn-save" onClick={() => { setSaved(true); setTimeout(()=>setSaved(false),3000); window.scrollTo({top:0,behavior:'smooth'}) }}>
            등록하기
          </button>
        </div>
      </div>

      {saved && <div className="success-banner">✓ 피팅박스 제품이 등록됐어요. 브랜드는 열람만 가능합니다.</div>}

      <div style={{...warn_box_style, marginBottom:'16px'}} className="warn-box">
        ⚠ 피팅박스 제품은 CLYQ 본사가 직접 구매·보관·관리합니다. 브랜드 파트너는 자사 제품의 피팅 현황만 열람 가능하며 수정·삭제 권한이 없습니다.
      </div>

      {/* ① 브랜드 / 카테고리 */}
      <div style={sectionStyle}>
        <div style={sectionH}>① 브랜드 / 카테고리</div>

        <div style={rowS}>
          <div style={labelS}>브랜드{req}</div>
          <div style={cellS}>
            <select style={selectS} value={form.brand} onChange={e=>f('brand',e.target.value)}>
              <option value="">브랜드 선택</option>
              {['MARCIA','MATIN KIM','EENK','D.POUND','ANOTHER A','EIGHT','ANDERSSONBELL','ADER ERROR','SORRY TOO MUCH LOVE'].map(b=><option key={b}>{b}</option>)}
            </select>
          </div>
        </div>

        <div style={rowS}>
          <div style={labelS}>카테고리{req}</div>
          <div style={cellS}>
            <select style={selectS} value={form.category1} onChange={e=>f('category1',e.target.value)}>
              <option value="">대분류</option>
              {['아우터','상의','하의','원피스·세트','가방','슈즈'].map(c=><option key={c}>{c}</option>)}
            </select>
            <select style={selectS} value={form.category2} onChange={e=>f('category2',e.target.value)}>
              <option value="">중분류</option>
              {(form.category1==='아우터'?['코트','재킷','패딩']:
 form.category1==='상의'?['블라우스','니트','티셔츠']:
 form.category1==='하의'?['스커트','팬츠']:
 form.category1==='원피스·세트'?['미디드레스','미니드레스','세트업']:
 ['기타']
).map(c=><option key={c}>{c}</option>)}
            </select>
            <select style={selectS} value={form.season} onChange={e=>f('season',e.target.value)}>
              <option value="">시즌</option>
              {['2026 F/W','2026 S/S','2025 F/W'].map(s=><option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* ② 제품 기본 정보 */}
      <div style={sectionStyle}>
        <div style={sectionH}>② 제품 기본 정보</div>

        <div style={rowS}>
          <div style={labelS}>제품명 (영문){req}</div>
          <div style={{...cellS, flexDirection:'column', alignItems:'flex-start'}}>
            <input style={{...inputS, width:'100%', maxWidth:'440px'}} type="text" placeholder="예: Oversized Cashmere Wool Coat"
              value={form.productName} onChange={e=>f('productName',e.target.value)}/>
          </div>
        </div>

        <div style={rowS}>
          <div style={labelS}>제품명 (한글){req}</div>
          <div style={{...cellS, flexDirection:'column', alignItems:'flex-start'}}>
            <input style={{...inputS, width:'100%', maxWidth:'440px'}} type="text" placeholder="예: 오버핏 캐시미어 울 코트"
              value={form.productNameKo} onChange={e=>f('productNameKo',e.target.value)}/>
          </div>
        </div>

        <div style={rowS}>
          <div style={labelS}>소재{req}</div>
          <div style={cellS}>
            <input style={{...inputS, width:'300px'}} type="text" placeholder="예: 캐시미어 30%, 울 50%, 폴리에스터 20%"
              value={form.material} onChange={e=>f('material',e.target.value)}/>
          </div>
        </div>

        <div style={rowS}>
          <div style={labelS}>제조국{req}</div>
          <div style={cellS}>
            <input style={{...inputS, width:'180px'}} type="text"
              value={form.origin} onChange={e=>f('origin',e.target.value)}/>
          </div>
        </div>

        <div style={rowS}>
          <div style={labelS}>세탁 방법</div>
          <div style={cellS}>
            <select style={selectS} value={form.care} onChange={e=>f('care',e.target.value)}>
              {['드라이클리닝 권장','드라이클리닝 필수','손세탁 가능','기계세탁 (울 코스)'].map(c=><option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* ③ 피팅 재고 / 옵션 */}
      <div style={sectionStyle}>
        <div style={sectionH}>③ 피팅 재고 / 옵션</div>

        <div style={rowS}>
          <div style={labelS}>사이즈{req}</div>
          <div style={{...cellS, flexDirection:'column', alignItems:'flex-start', gap:'8px'}}>
            <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
              {form.sizeOptions.map(sz => (
                <div key={sz} className="size-tag">
                  {sz}
                  <button onClick={() => f('sizeOptions', form.sizeOptions.filter(s=>s!==sz))}>✕</button>
                </div>
              ))}
            </div>
            <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
              {['XS','S','M','L','XL','XXL','FREE'].filter(s=>!form.sizeOptions.includes(s)).map(sz=>(
                <button key={sz} className="btn-add" onClick={()=>f('sizeOptions',[...form.sizeOptions,sz])}>+ {sz}</button>
              ))}
            </div>
          </div>
        </div>

        <div style={rowS}>
          <div style={labelS}>컬러 / 수량{req}</div>
          <div style={{...cellS, flexDirection:'column', alignItems:'flex-start', gap:'6px'}}>
            <div style={{display:'grid',gridTemplateColumns:'160px 80px',gap:'8px',fontSize:'11px',fontWeight:600,color:'#888',marginBottom:'4px'}}>
              <span>컬러명</span><span>보유 수량</span>
            </div>
            {form.colorOptions.map((opt,i) => (
              <div key={i} style={{display:'flex',gap:'8px',alignItems:'center'}}>
                <input style={{...inputS, width:'160px'}} type="text" placeholder="예: 아이보리"
                  value={opt.color} onChange={e=>{const u=[...form.colorOptions];u[i]={...opt,color:e.target.value};f('colorOptions',u)}}/>
                <input style={{...inputS, width:'80px', textAlign:'right'}} type="number" placeholder="0"
                  value={opt.stock} onChange={e=>{const u=[...form.colorOptions];u[i]={...opt,stock:e.target.value};f('colorOptions',u)}}/>
                <span style={{fontSize:'12px',color:'#666'}}>개</span>
                {form.colorOptions.length > 1 && (
                  <button style={{background:'none',border:'none',cursor:'pointer',color:'#ccc',fontSize:'16px'}}
                    onClick={()=>f('colorOptions',form.colorOptions.filter((_,j)=>j!==i))}>✕</button>
                )}
              </div>
            ))}
            <button className="btn-add" onClick={()=>f('colorOptions',[...form.colorOptions,{color:'',stock:''}])}>
              + 컬러 추가
            </button>
          </div>
        </div>

        <div style={rowS}>
          <div style={labelS}>재고 부족 알림</div>
          <div style={cellS}>
            <input style={{...inputS, width:'80px', textAlign:'right'}} type="number"
              value={form.alertStock} onChange={e=>f('alertStock',e.target.value)}/>
            <span style={{fontSize:'12px',color:'#666'}}>개 이하 시 관리자 알림 발송</span>
          </div>
        </div>
      </div>

      {/* ④ 피팅 설정 */}
      <div style={sectionStyle}>
        <div style={sectionH}>④ 피팅 규정 설정</div>

        <div style={rowS}>
          <div style={labelS}>피팅 기간{req}</div>
          <div style={cellS}>
            <select style={selectS} value={form.fittingPeriod} onChange={e=>f('fittingPeriod',e.target.value)}>
              <option value="2">2일</option>
              <option value="3">3일 (기본)</option>
              <option value="5">5일</option>
              <option value="7">7일</option>
            </select>
            <span style={{fontSize:'12px',color:'#666'}}>수령일 포함 · 초과 시 자동 구매 확정</span>
          </div>
        </div>

        <div style={rowS}>
          <div style={labelS}>복수 사이즈 신청</div>
          <div style={cellS}>
            <button className="toggle"
              style={{background:form.multiSize?'#C94E1A':'#d0d0d8'}}
              onClick={()=>f('multiSize',!form.multiSize)}>
              <span style={{position:'absolute',left:form.multiSize?'20px':'2px',top:'2px',width:'18px',height:'18px',borderRadius:'50%',background:'#fff',boxShadow:'0 1px 3px rgba(0,0,0,.2)',transition:'left 0.2s'}}/>
            </button>
            <span style={{fontSize:'13px',color:form.multiSize?'#C94E1A':'#999'}}>
              {form.multiSize ? '최대 2가지 사이즈 동시 신청 허용' : '1가지 사이즈만 신청 가능'}
            </span>
          </div>
        </div>

        <div style={rowS}>
          <div style={labelS}>훼손 배상률</div>
          <div style={cellS}>
            <div style={{display:'flex',gap:'8px',flexWrap:'wrap',alignItems:'center'}}>
              {[
                {label:'경미한 손상', key:'light', default:'30'},
                {label:'중대한 손상', key:'serious', default:'70~100'},
                {label:'고의적 훼손', key:'intentional', default:'100 + 손배'},
              ].map(item => (
                <div key={item.key} style={{background:'#f5f5f7',padding:'8px 12px',borderRadius:'4px',fontSize:'12px',color:'#555'}}>
                  <div style={{fontWeight:600,marginBottom:'2px'}}>{item.label}</div>
                  <div style={{color:'#C94E1A',fontWeight:700}}>정가의 {item.default}%</div>
                </div>
              ))}
            </div>
            <div style={{width:'100%'}}>
              <div className="info-box">
                피팅박스 제품 관리 약관 제4조에 따라 자동 적용됩니다. 배상금액은 고객 결제 수단으로 자동 청구됩니다.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ⑤ 제품 입수 정보 */}
      <div style={sectionStyle}>
        <div style={sectionH}>⑤ 제품 입수 / 원가 정보 <span style={{fontSize:'10px',fontWeight:400,color:'rgba(255,255,255,0.5)'}}>CLYQ 내부용</span></div>

        <div style={rowS}>
          <div style={labelS}>입수 유형{req}</div>
          <div style={cellS}>
            <select style={selectS} value={form.acquisitionType} onChange={e=>f('acquisitionType',e.target.value)}>
              {['브랜드 제공 (무상)','브랜드 제공 (임차)','CLYQ 직접 구매'].map(t=><option key={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div style={rowS}>
          <div style={labelS}>입수일</div>
          <div style={cellS}>
            <input style={{...inputS, width:'160px'}} type="date"
              value={form.acquisitionDate} onChange={e=>f('acquisitionDate',e.target.value)}/>
          </div>
        </div>

        <div style={rowS}>
          <div style={labelS}>제품 정상가{req}</div>
          <div style={cellS}>
            <input style={{...inputS, width:'150px', textAlign:'right'}} type="text"
              placeholder="0" value={form.regularPrice} onChange={e=>f('regularPrice',formatPrice(e.target.value))}/>
            <span style={{fontSize:'12px',color:'#666'}}>원 (배상 기준금액)</span>
          </div>
        </div>

        <div style={rowS}>
          <div style={labelS}>피팅 수수료</div>
          <div style={cellS}>
            <input style={{...inputS, width:'100px', textAlign:'right'}} type="text"
              value={form.fittingFee} onChange={e=>f('fittingFee',formatPrice(e.target.value))}/>
            <span style={{fontSize:'12px',color:'#666'}}>원 (0원 = 무료 피팅)</span>
          </div>
        </div>

        <div style={rowS}>
          <div style={labelS}>내부 메모</div>
          <div style={{...cellS, flexDirection:'column', alignItems:'flex-start'}}>
            <textarea style={{...inputS, width:'100%', maxWidth:'440px', height:'72px', resize:'vertical', lineHeight:'1.6'}}
              placeholder="입수 경위, 보관 위치, 특이사항 등 내부 메모"
              value={form.acquisitionMemo} onChange={e=>f('acquisitionMemo',e.target.value)}/>
            <div style={{fontSize:'11px',color:'#C94E1A'}}>⚠ 이 정보는 CLYQ 관리자에게만 표시됩니다. 브랜드에는 공개되지 않습니다.</div>
          </div>
        </div>
      </div>

      {/* ⑥ 제품 이미지 */}
      <div style={sectionStyle}>
        <div style={sectionH}>⑥ 제품 이미지</div>
        <div style={{padding:'16px 20px'}}>
          <div style={{fontSize:'12px',color:'#888',marginBottom:'12px'}}>JPG/PNG · 960×1280px 권장 · 5MB 이하</div>
          <div className="img-row">
            {['대표', '추가1', '추가2', '추가3', '추가4', '추가5'].map((label,i) => (
              <div key={i}>
                <div style={{fontSize:'11px',color:i===0?'#C94E1A':'#888',fontWeight:i===0?600:400,marginBottom:'4px',textAlign:'center'}}>{label}</div>
                <div className="img-box" onClick={()=>{const inp=document.createElement('input');inp.type='file';inp.accept='image/*';inp.click()}}>
                  {i===0 ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  )}
                  <span>{i===0?'이미지 선택':'추가'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div style={{display:'flex',justifyContent:'center',gap:'10px',padding:'24px 0'}}>
        <button className="btn-out" onClick={()=>history.back()}>취소</button>
        <button className="btn-save" onClick={()=>{setSaved(true);setTimeout(()=>setSaved(false),3000);window.scrollTo({top:0,behavior:'smooth'})}}>
          📦 피팅박스 제품 등록하기
        </button>
      </div>
    </div>
  )
}

