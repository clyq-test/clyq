// @ts-nocheck
'use client'
import { useState } from 'react'
import Navbar from '../components/Navbar'

const fittingProducts = [
  { id:1, brand:'MARCIA', name:'오버핏 캐시미어 울 코트', price:428000, original:520000, category:'아우터', image:'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&auto=format&fit=crop', points:428 },
  { id:2, brand:'EIGHT', name:'셔링 디테일 미디 드레스', price:198000, original:240000, category:'원피스', image:'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&auto=format&fit=crop', points:198 },
  { id:3, brand:'MATIN KIM', name:'오버핏 레더 재킷', price:578000, original:578000, category:'아우터', image:'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop', points:578 },
  { id:5, brand:'ANDERSSONBELL', name:'테일러드 수트 재킷', price:318000, original:318000, category:'아우터', image:'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop', points:318 },
  { id:6, brand:'EENK', name:'셔링 미디 스커트', price:148000, original:148000, category:'하의', image:'https://images.unsplash.com/photo-1583496661160-fb5218e5b8a9?w=600&auto=format&fit=crop', points:148 },
  { id:7, brand:'D.POUND', name:'라운드넥 실크 블라우스', price:158000, original:198000, category:'상의', image:'https://images.unsplash.com/photo-1594938298603-c8148f4851b8?w=600&auto=format&fit=crop', points:158 },
  { id:9, brand:'ADER ERROR', name:'오버핏 후드 스웨트셔츠', price:198000, original:198000, category:'상의', image:'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&auto=format&fit=crop', points:198 },
  { id:11, brand:'MARCIA', name:'울 플리츠 와이드 팬츠', price:248000, original:298000, category:'하의', image:'https://images.unsplash.com/photo-1583496661160-fb5218e5b8a9?w=600&auto=format&fit=crop', points:248 },
  { id:12, brand:'EENK', name:'오프숄더 리본 블라우스', price:168000, original:168000, category:'상의', image:'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&auto=format&fit=crop', points:168 },
  { id:13, brand:'D.POUND', name:'울 롱 스커트', price:228000, original:268000, category:'하의', image:'https://images.unsplash.com/photo-1594938298603-c8148f4851b8?w=600&auto=format&fit=crop', points:228 },
  { id:15, brand:'ANOTHER A', name:'패딩 숏 재킷', price:398000, original:398000, category:'아우터', image:'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&auto=format&fit=crop', points:398 },
  { id:16, brand:'SORRY TOO MUCH LOVE', name:'벨벳 미니 원피스', price:188000, original:228000, category:'원피스', image:'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&auto=format&fit=crop', points:188 },
]

const categories = ['전체', '아우터', '상의', '하의', '원피스']

export default function Fitting() {
  const [activeCategory, setActiveCategory] = useState('전체')
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [step, setStep] = useState(1)
  const [selectedSize, setSelectedSize] = useState('M')
  const [withyOn, setWithyOn] = useState(false)
  const [done, setDone] = useState(false)
  const [hovered, setHovered] = useState(null)

  const filtered = fittingProducts.filter(p => activeCategory === '전체' || p.category === activeCategory)

  function openModal(product) {
    setSelectedProduct(product); setStep(1); setDone(false)
    setModalOpen(true); document.body.style.overflow = 'hidden'
  }
  function closeModal() { setModalOpen(false); document.body.style.overflow = '' }
  function nextStep() { if (step < 3) setStep(step + 1); else setDone(true) }

  return (
    <main>
      <style>{`
        .fit-hero { background:#1a1814; padding:48px 40px; position:relative; overflow:hidden; }
        .fit-hero-title { font-family:Georgia,serif; font-size:42px; font-weight:300; color:#fff; line-height:1.2; margin-bottom:14px; }
        .fit-hero-stats { display:flex; gap:28px; }
        .fit-steps-row { background:#f9f7f4; padding:32px 40px; display:flex; gap:0; align-items:flex-start; border-bottom:1px solid #e8e8e8; position:relative; }
        .fit-steps-row::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,#C94E1A,#B08D57); }
        .fit-products-wrap { padding:24px 40px 60px; }
        .fit-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:36px 16px; }
        @media (max-width:768px) {
          .fit-hero { padding:36px 16px; }
          .fit-hero-title { font-size:28px; }
          .fit-hero-stats { gap:16px; flex-wrap:wrap; }
          .fit-steps-row { padding:20px 16px; overflow-x:auto; gap:0; }
          .fit-products-wrap { padding:16px 16px 48px; }
          .fit-grid { grid-template-columns:repeat(2,1fr); gap:20px 12px; }
          .fit-step-item { min-width:100px; }
        }
      `}</style>

      <Navbar />

      {/* 히어로 */}
      <div className="fit-hero">
        <div style={{position:'absolute',inset:0,backgroundImage:'radial-gradient(circle at 70% 50%, rgba(201,78,26,0.1) 0%, transparent 60%)',pointerEvents:'none'}}/>
        <div style={{position:'relative',zIndex:1,maxWidth:'600px'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'rgba(201,78,26,0.15)',border:'1px solid rgba(201,78,26,0.3)',padding:'6px 14px',borderRadius:'20px',fontSize:'11px',color:'#C94E1A',letterSpacing:'2px',fontWeight:600,marginBottom:'20px'}}>
            📦 선피팅관
          </div>
          <h1 className="fit-hero-title">입어보고<br/><span style={{fontStyle:'italic',color:'#C94E1A'}}>마음에 드는 것만</span><br/>구매하세요</h1>
          <p style={{fontSize:'13px',color:'rgba(255,255,255,0.5)',fontWeight:300,lineHeight:1.8,marginBottom:'24px'}}>
            24시간 내 배송 · 3일 피팅 · 반납 무료 · 피팅 비용 0원
          </p>
          <div className="fit-hero-stats">
            {[{num:'0원',label:'피팅 비용'},{num:'24H',label:'전국 배송'},{num:'3일',label:'피팅 기간'},{num:'무료',label:'반납'}].map((s,i) => (
              <div key={i} style={{textAlign:'center'}}>
                <div style={{fontFamily:'Georgia,serif',fontSize:'24px',color:'#fff',fontWeight:300}}>{s.num}</div>
                <div style={{fontSize:'10px',color:'rgba(255,255,255,0.4)',marginTop:'3px'}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 이용 방법 */}
      <div className="fit-steps-row">
        {[
          {num:'01',icon:'🤖',title:'AI 분석',desc:'취향 분석'},
          {num:'02',icon:'📦',title:'박스 신청',desc:'제품 선택'},
          {num:'03',icon:'🚚',title:'24H 배송',desc:'빠른 배송'},
          {num:'04',icon:'🏠',title:'집 피팅',desc:'3일 여유'},
          {num:'05',icon:'✨',title:'구매·반납',desc:'자유 선택'},
        ].map((s,i) => (
          <div key={i} className="fit-step-item" style={{flex:1,padding:'0 16px',textAlign:'center',borderRight:i<4?'1px solid #e8e8e8':'none'}}>
            <div style={{fontFamily:'Georgia,serif',fontSize:'16px',color:'#ccc',marginBottom:'6px'}}>{s.num}</div>
            <div style={{fontSize:'22px',marginBottom:'6px'}}>{s.icon}</div>
            <div style={{fontSize:'12px',fontWeight:500,marginBottom:'2px'}}>{s.title}</div>
            <div style={{fontSize:'10px',color:'#999',fontWeight:300}}>{s.desc}</div>
          </div>
        ))}
      </div>

      {/* 카테고리 + 상품 */}
      <div className="fit-products-wrap">
        <div style={{borderBottom:'1px solid #e8e8e8',display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:'0',paddingBottom:'0'}}>
          <div style={{display:'flex',gap:'0',overflowX:'auto'}}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                style={{padding:'12px 16px',fontSize:'13px',fontWeight:activeCategory===cat?500:400,color:activeCategory===cat?'#111':'#999',background:'none',border:'none',borderBottom:activeCategory===cat?'2px solid #111':'2px solid transparent',cursor:'pointer',whiteSpace:'nowrap'}}>
                {cat}
              </button>
            ))}
          </div>
          <div style={{fontSize:'12px',color:'#999',paddingBottom:'12px',flexShrink:0}}>선피팅 가능 {filtered.length}개</div>
        </div>

        <div className="fit-grid" style={{marginTop:'24px'}}>
          {filtered.map(p => {
            const dc = p.original > p.price ? Math.round((1-p.price/p.original)*100) : 0
            return (
              <div key={p.id} style={{cursor:'pointer'}}
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}>
                <div style={{position:'relative',aspectRatio:'3/4',background:'#f5f5f5',overflow:'hidden',marginBottom:'10px'}}>
                  <img src={p.image} alt={p.name}
                    style={{width:'100%',height:'100%',objectFit:'cover',transition:'transform 0.4s',transform:hovered===p.id?'scale(1.05)':'scale(1)'}}/>
                  <div style={{position:'absolute',top:'10px',left:'10px'}}>
                    <span style={{background:'#C94E1A',color:'#fff',fontSize:'9px',fontWeight:700,padding:'3px 7px',display:'block'}}>선피팅</span>
                  </div>
                  <button style={{position:'absolute',top:'10px',right:'10px',width:'30px',height:'30px',borderRadius:'50%',background:'rgba(255,255,255,0.9)',border:'none',cursor:'pointer',fontSize:'13px'}}
                    onClick={e => e.stopPropagation()}>🤍</button>
                  {hovered === p.id && (
                    <button onClick={() => openModal(p)}
                      style={{position:'absolute',bottom:0,left:0,right:0,padding:'12px',background:'#C94E1A',color:'#fff',fontSize:'11px',fontWeight:500,border:'none',cursor:'pointer'}}>
                      선피팅 신청하기
                    </button>
                  )}
                </div>
                <div style={{fontSize:'10px',letterSpacing:'1.5px',color:'#999',marginBottom:'4px'}}>{p.brand}</div>
                <div style={{fontSize:'13px',color:'#333',marginBottom:'6px',fontWeight:300,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{p.name}</div>
                <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'4px'}}>
                  <span style={{fontSize:'14px',fontWeight:500}}>{p.price.toLocaleString()}원</span>
                  {dc>0 && <>
                    <span style={{fontSize:'12px',color:'#ccc',textDecoration:'line-through'}}>{p.original.toLocaleString()}원</span>
                    <span style={{fontSize:'12px',fontWeight:600,color:'#c0392b'}}>{dc}%</span>
                  </>}
                </div>
                <div style={{fontSize:'10px',color:'#B08D57'}}>W {p.points}P 적립</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 피팅 신청 모달 */}
      {modalOpen && (
        <div onClick={closeModal}
          style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.55)',zIndex:1000,display:'flex',alignItems:'flex-end',justifyContent:'flex-end',backdropFilter:'blur(3px)'}}>
          <div onClick={e => e.stopPropagation()}
            style={{width:'min(460px,100vw)',height:'100dvh',background:'#fff',display:'flex',flexDirection:'column',overflow:'hidden'}}>
            <div style={{padding:'20px 24px',borderBottom:'1px solid #e8e8e8',display:'flex',justifyContent:'space-between',alignItems:'center',flexShrink:0}}>
              <div>
                <div style={{fontSize:'17px',fontWeight:500}}>선피팅 신청</div>
                {!done && <div style={{fontSize:'11px',color:'#999',marginTop:'3px'}}>STEP {step} / 3</div>}
              </div>
              <button onClick={closeModal} style={{width:'30px',height:'30px',border:'1px solid #e8e8e8',background:'none',cursor:'pointer',fontSize:'15px',color:'#666'}}>✕</button>
            </div>
            {!done && (
              <div style={{height:'3px',background:'#e8e8e8',flexShrink:0}}>
                <div style={{height:'100%',background:'#C94E1A',transition:'width 0.3s',width:step===1?'33%':step===2?'66%':'100%'}}/>
              </div>
            )}
            <div style={{flex:1,overflowY:'auto',padding:'24px'}}>
              {done ? (
                <div style={{textAlign:'center',paddingTop:'16px'}}>
                  <div style={{width:'60px',height:'60px',borderRadius:'50%',background:'#2a7a50',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'22px',margin:'0 auto 16px',color:'#fff'}}>✓</div>
                  <div style={{fontSize:'20px',fontWeight:500,marginBottom:'8px'}}>피팅 신청 완료!</div>
                  <div style={{fontSize:'13px',color:'#666',fontWeight:300,lineHeight:1.8,marginBottom:'24px'}}>피팅 박스가 곧 출발해요 📦<br/>카카오 알림톡으로 알려드려요.</div>
                  {[
                    {dot:true,title:'피팅 신청 완료',time:'방금 전'},
                    {dot:false,title:'검수 & 패킹',time:'오늘 중'},
                    {dot:false,title:'배송 출발',time:'내일 오전'},
                    {dot:false,title:'수령 & 피팅 시작',time:'내일 오후~저녁'},
                  ].map((item,i) => (
                    <div key={i} style={{display:'flex',gap:'14px',padding:'12px 0',borderBottom:'1px solid #e8e8e8',alignItems:'flex-start',textAlign:'left'}}>
                      <div style={{width:'8px',height:'8px',borderRadius:'50%',background:item.dot?'#C94E1A':'#e8e8e8',flexShrink:0,marginTop:'4px'}}/>
                      <div>
                        <div style={{fontSize:'13px',fontWeight:500,marginBottom:'2px'}}>{item.title}</div>
                        <div style={{fontSize:'11px',color:'#999'}}>{item.time}</div>
                      </div>
                    </div>
                  ))}
                  <button onClick={closeModal} style={{marginTop:'20px',width:'100%',padding:'14px',background:'#111',color:'#fff',border:'none',fontSize:'13px',fontWeight:500,cursor:'pointer'}}>확인</button>
                </div>
              ) : step === 1 ? (
                <div>
                  {selectedProduct && (
                    <div style={{display:'flex',gap:'14px',padding:'14px',background:'#f9f7f4',marginBottom:'20px'}}>
                      <img src={selectedProduct.image} alt={selectedProduct.name} style={{width:'64px',height:'80px',objectFit:'cover',flexShrink:0}}/>
                      <div>
                        <div style={{fontSize:'10px',letterSpacing:'1.5px',color:'#999',marginBottom:'3px'}}>{selectedProduct.brand}</div>
                        <div style={{fontSize:'14px',fontWeight:500,marginBottom:'5px'}}>{selectedProduct.name}</div>
                        <div style={{fontSize:'14px',color:'#C94E1A',fontWeight:500}}>{selectedProduct.price.toLocaleString()}원</div>
                      </div>
                    </div>
                  )}
                  <div style={{marginBottom:'16px'}}>
                    <div style={{fontSize:'12px',fontWeight:500,color:'#666',marginBottom:'10px'}}>사이즈 선택 (최대 2개)</div>
                    <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
                      {['XS','S','M','L','XL'].map(sz => (
                        <button key={sz} onClick={() => setSelectedSize(sz)}
                          style={{width:'52px',height:'44px',border:selectedSize===sz?'1px solid #111':'1px solid #e8e8e8',background:selectedSize===sz?'#111':'#fff',color:selectedSize===sz?'#fff':'#666',fontSize:'12px',cursor:'pointer'}}>
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div style={{background:'#fff5f2',borderLeft:'3px solid #C94E1A',padding:'13px 15px',fontSize:'12px',color:'#333',lineHeight:1.7}}>
                    <strong>선피팅 안내</strong><br/>피팅 기간: 3일 · 피팅 비용: <strong style={{color:'#2a7a50'}}>무료</strong><br/>반납 시 추가 비용 없음
                  </div>
                </div>
              ) : step === 2 ? (
                <div>
                  {[{label:'받으실 분',type:'text',value:'김지연'},{label:'연락처',type:'tel',value:'010-1234-5678'}].map((f,i) => (
                    <div key={i} style={{marginBottom:'16px'}}>
                      <div style={{fontSize:'11px',fontWeight:500,color:'#666',marginBottom:'7px'}}>{f.label}</div>
                      <input type={f.type} defaultValue={f.value} style={{width:'100%',padding:'11px 13px',border:'1px solid #e8e8e8',fontSize:'13px',outline:'none',fontFamily:'inherit'}}/>
                    </div>
                  ))}
                  <div style={{marginBottom:'16px'}}>
                    <div style={{fontSize:'11px',fontWeight:500,color:'#666',marginBottom:'7px'}}>배송 주소</div>
                    <input type="text" defaultValue="서울시 강남구 압구정로 000" style={{width:'100%',padding:'11px 13px',border:'1px solid #e8e8e8',fontSize:'13px',outline:'none',fontFamily:'inherit',marginBottom:'8px'}}/>
                    <input type="text" placeholder="상세 주소" defaultValue="000동 000호" style={{width:'100%',padding:'11px 13px',border:'1px solid #e8e8e8',fontSize:'13px',outline:'none',fontFamily:'inherit'}}/>
                  </div>
                  <div style={{padding:'12px',background:'#f9f7f4',fontSize:'12px',color:'#666'}}>
                    🚚 신청 후 <strong>24시간 이내</strong> 발송
                  </div>
                </div>
              ) : (
                <div>
                  {[
                    {label:'제품',val:selectedProduct?.name+' / '+selectedSize},
                    {label:'배송지',val:'서울시 강남구 압구정로'},
                    {label:'피팅 기간',val:'3일'},
                    {label:'피팅 비용',val:'무료',green:true},
                    {label:'구매 확정 시',val:selectedProduct?.price.toLocaleString()+'원',orange:true,big:true},
                  ].map((r,i) => (
                    <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'12px 0',borderBottom:'1px solid #e8e8e8',fontSize:'13px'}}>
                      <span style={{color:'#999',fontWeight:300}}>{r.label}</span>
                      <span style={{fontWeight:r.big?500:400,color:r.orange?'#C94E1A':r.green?'#2a7a50':'#111',fontSize:r.big?'15px':'13px'}}>{r.val}</span>
                    </div>
                  ))}
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'13px',background:'#f9f7f4',margin:'14px 0'}}>
                    <div style={{fontSize:'13px'}}>위디 <span style={{color:'#B08D57',fontWeight:500}}>2,400P 사용</span></div>
                    <div onClick={() => setWithyOn(!withyOn)}
                      style={{width:'40px',height:'22px',borderRadius:'11px',background:withyOn?'#C94E1A':'#ddd',position:'relative',cursor:'pointer'}}>
                      <div style={{width:'18px',height:'18px',borderRadius:'50%',background:'#fff',position:'absolute',top:'2px',left:withyOn?'20px':'2px',transition:'left 0.2s',boxShadow:'0 1px 3px rgba(0,0,0,0.2)'}}/>
                    </div>
                  </div>
                  <div style={{background:'#fff5f2',borderLeft:'3px solid #C94E1A',padding:'12px',fontSize:'12px',color:'#333',lineHeight:1.7}}>
                    구매 확정 시에만 결제됩니다. 반납 시 <strong>추가 비용 없음</strong>.
                  </div>
                </div>
              )}
            </div>
            {!done && (
              <div style={{padding:'14px 24px',borderTop:'1px solid #e8e8e8',display:'flex',justifyContent:'space-between',alignItems:'center',flexShrink:0}}>
                <button onClick={() => step > 1 ? setStep(step-1) : null}
                  style={{fontSize:'12px',color:'#999',background:'none',border:'none',cursor:'pointer',visibility:step>1?'visible':'hidden'}}>← 이전</button>
                <button onClick={nextStep}
                  style={{padding:'12px 28px',background:step===3?'#2a7a50':'#C94E1A',color:'#fff',fontSize:'13px',fontWeight:500,border:'none',cursor:'pointer'}}>
                  {step < 3 ? '다음 단계 →' : '피팅 신청 완료!'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <footer style={{background:'#111',padding:'32px 40px'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:'Georgia,serif',fontSize:'20px',color:'#fff',letterSpacing:'4px'}}>CLY<span style={{color:'#C94E1A'}}>Q</span></div>
          <div style={{fontSize:'12px',color:'rgba(255,255,255,0.3)'}}>© 2026 CLYQ Inc.</div>
        </div>
      </footer>
    </main>
  )
}
