// @ts-nocheck
'use client'
import { useState } from 'react'
import Navbar from '../components/Navbar'

const steps = [
  { num:'01', title:'AI 취향 분석', desc:'5가지 간단한 질문으로 AI가 나의 스타일과 체형을 파악해요.', icon:'🤖', detail:'AI가 수천 개의 데이터를 바탕으로 지금 나에게 가장 잘 어울리는 제품을 선별해요.' },
  { num:'02', title:'피팅 박스 선택', desc:'AI가 추천한 제품 중 마음에 드는 것을 골라 피팅 박스를 신청해요.', icon:'📦', detail:'피팅 가능한 제품은 CLYQ가 직접 검수·케어한 제품들이에요. 위생과 품질을 보장해요.' },
  { num:'03', title:'집에서 피팅', desc:'24시간 이내 전국 배송. 집에서 여유롭게 입어보세요. 피팅 기간은 수령일 포함 3일이에요.', icon:'🏠', detail:'매장 직원 눈치 없이, 내 공간에서 내 옷들과 함께 매치해보며 천천히 결정할 수 있어요.' },
  { num:'04', title:'구매 또는 반납', desc:'마음에 드는 옷만 구매 확정하면 돼요. 나머지는 앱에서 반납 신청하면 수거해드려요.', icon:'✨', detail:'구매 확정 시에만 결제가 이루어져요. 반납은 무료이며 별도 비용이 없어요.' },
  { num:'05', title:'위디 포인트 적립', desc:'피팅하고 구매할 때마다 위디 포인트가 쌓여요. 적립된 위디로 다음 쇼핑이 더 저렴해져요.', icon:'💛', detail:'구매 확정 금액의 0.1%가 자동 적립되고, 피팅 이용 시 50P가 추가로 쌓여요.' },
]

const reasons = [
  { icon:'👗', title:'반품 걱정 없어요', desc:'온라인 쇼핑의 가장 큰 고민, "실제로 입었을 때 어떨까?" 선피팅으로 해결해요.' },
  { icon:'🤖', title:'AI가 골라주는 나만의 스타일', desc:'AI가 취향을 분석해서 수천 개 제품 중 나에게 딱 맞는 것만 추천해요.' },
  { icon:'🏠', title:'백화점 피팅룸을 집으로', desc:'지방에 살아도, 바쁜 직장인도. 집에서 여유롭게 다양한 스타일을 입어볼 수 있어요.' },
  { icon:'♻️', title:'지속가능한 패션', desc:'피팅 후 반납된 제품은 검수와 세탁을 거쳐 순환유통으로 이어져요.' },
  { icon:'💛', title:'쌓이는 위디 포인트', desc:'피팅할 때마다, 구매할 때마다 포인트가 쌓여요. 오래 쓸수록 더 유리해요.' },
  { icon:'🔒', title:'검수된 제품만', desc:'CLYQ가 직접 선별하고 관리하는 제품만 피팅 가능해요. 위생을 보장해요.' },
]

export default function About() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <main>
      <style>{`
        .about-hero { background:#1a1814; padding:100px 80px; text-align:center; position:relative; overflow:hidden; }
        .about-hero-title { font-family:Georgia,serif; font-size:60px; font-weight:300; color:#fff; line-height:1.2; margin-bottom:20px; }
        .about-stats { background:#fff; padding:60px 80px; display:grid; grid-template-columns:repeat(4,1fr); gap:0; border-bottom:1px solid #e8e8e8; }
        .about-how { padding:72px 80px; }
        .about-how-grid { display:grid; grid-template-columns:1fr 1fr; gap:0; max-width:1000px; margin:0 auto; }
        .about-why { background:#1a1814; padding:72px 80px; }
        .about-why-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:rgba(255,255,255,0.08); max-width:1000px; margin:0 auto; }
        .about-withy { padding:72px 80px; background:#f9f7f4; }
        .about-withy-grid { display:grid; grid-template-columns:1fr 1fr; gap:72px; align-items:center; max-width:900px; margin:0 auto; }
        .about-circular { padding:72px 80px; text-align:center; border-top:1px solid #e8e8e8; }
        .about-cta { background:#C94E1A; padding:72px 80px; text-align:center; }
        .about-cta-btns { display:flex; gap:14px; justify-content:center; }
        @media (max-width:768px) {
          .about-hero { padding:56px 20px; }
          .about-hero-title { font-size:32px; }
          .about-hero-desc { font-size:13px !important; }
          .about-hero-btns { flex-direction:column; align-items:center; gap:10px; }
          .about-stats { grid-template-columns:repeat(2,1fr); padding:32px 20px; }
          .about-stat-item:nth-child(2) { border-right:1px solid #e8e8e8; }
          .about-stat-item:nth-child(3) { border-right:none; border-top:1px solid #e8e8e8; }
          .about-stat-item:nth-child(4) { border-top:1px solid #e8e8e8; }
          .about-how { padding:40px 16px; }
          .about-how-grid { grid-template-columns:1fr; gap:0; }
          .about-how-right { display:none; }
          .about-why { padding:40px 16px; }
          .about-why-grid { grid-template-columns:1fr 1fr; }
          .about-withy { padding:40px 16px; }
          .about-withy-grid { grid-template-columns:1fr; gap:32px; }
          .about-circular { padding:40px 16px; }
          .about-cta { padding:48px 20px; }
          .about-cta-title { font-size:28px !important; }
          .about-cta-btns { flex-direction:column; align-items:center; }
        }
      `}</style>

      <Navbar />

      {/* 히어로 */}
      <div className="about-hero">
        <div style={{position:'absolute',inset:0,backgroundImage:'radial-gradient(circle at 30% 50%, rgba(201,78,26,0.08) 0%, transparent 60%), radial-gradient(circle at 70% 50%, rgba(176,141,87,0.06) 0%, transparent 60%)',pointerEvents:'none'}}/>
        <div style={{position:'relative',zIndex:1}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'rgba(201,78,26,0.15)',border:'1px solid rgba(201,78,26,0.3)',padding:'7px 18px',borderRadius:'20px',fontSize:'11px',color:'#C94E1A',letterSpacing:'2px',fontWeight:600,marginBottom:'28px'}}>ABOUT CLYQ</div>
          <h1 className="about-hero-title">입어보고<br/><span style={{color:'#C94E1A',fontStyle:'italic'}}>확실한 것만</span><br/>구매하는 패션</h1>
          <p className="about-hero-desc" style={{fontSize:'15px',color:'rgba(255,255,255,0.5)',fontWeight:300,lineHeight:1.9,maxWidth:'520px',margin:'0 auto 36px'}}>
            온라인 쇼핑의 가장 큰 고민은 "입어보지 못한다"는 것이에요.<br/>CLYQ는 AI 취향 분석과 선피팅 서비스로 이 문제를 해결했어요.
          </p>
          <div className="about-hero-btns" style={{display:'flex',gap:'14px',justifyContent:'center'}}>
            <a href="/fitting" style={{padding:'14px 28px',background:'#C94E1A',color:'#fff',fontSize:'14px',fontWeight:500,textDecoration:'none'}}>지금 시작하기</a>
            <a href="#how" style={{padding:'14px 28px',border:'1px solid rgba(255,255,255,0.2)',color:'rgba(255,255,255,0.7)',fontSize:'14px',textDecoration:'none'}}>서비스 알아보기</a>
          </div>
        </div>
      </div>

      {/* 숫자 */}
      <div className="about-stats">
        {[{num:'0원',label:'피팅 비용',desc:'선피팅은 완전 무료예요'},{num:'24H',label:'전국 배송',desc:'신청 후 이튿날 수령'},{num:'3일',label:'피팅 기간',desc:'여유롭게 입어보세요'},{num:'0.1%',label:'위디 적립',desc:'구매할수록 쌓여요'}].map((item,i) => (
          <div key={i} className="about-stat-item" style={{padding:'32px 20px',textAlign:'center',borderRight:i<3?'1px solid #e8e8e8':'none'}}>
            <div style={{fontFamily:'Georgia,serif',fontSize:'44px',fontWeight:300,color:'#111',lineHeight:1,marginBottom:'6px'}}>{item.num}</div>
            <div style={{fontSize:'12px',fontWeight:600,color:'#111',marginBottom:'4px',letterSpacing:'0.5px'}}>{item.label}</div>
            <div style={{fontSize:'11px',color:'#999',fontWeight:300}}>{item.desc}</div>
          </div>
        ))}
      </div>

      {/* 서비스 설명 */}
      <div style={{background:'#f9f7f4',padding:'32px',textAlign:'center',borderBottom:'1px solid #e8e8e8'}}>
        <div style={{fontSize:'10px',letterSpacing:'4px',color:'#C94E1A',fontWeight:600,marginBottom:'12px'}}>WHAT IS 선피팅</div>
        <h2 style={{fontFamily:'Georgia,serif',fontSize:'28px',fontWeight:300,marginBottom:'12px',lineHeight:1.3}}>선피팅이 처음이신가요?</h2>
        <p style={{fontSize:'13px',color:'#666',fontWeight:300,lineHeight:1.9,maxWidth:'420px',margin:'0 auto'}}>
          선피팅(先fitting)은 구매 전에 먼저 입어보는 서비스예요.<br/>마음에 들면 구매하고, 아니면 반납하면 됩니다.
        </p>
      </div>

      {/* 이용 방법 */}
      <div id="how" className="about-how">
        <div style={{textAlign:'center',marginBottom:'48px'}}>
          <div style={{fontSize:'10px',letterSpacing:'4px',color:'#C94E1A',fontWeight:600,marginBottom:'12px'}}>HOW IT WORKS</div>
          <h2 style={{fontFamily:'Georgia,serif',fontSize:'32px',fontWeight:300,lineHeight:1.3}}>이렇게 이용해요</h2>
        </div>
        <div className="about-how-grid">
          <div style={{borderRight:'1px solid #e8e8e8',paddingRight:'48px'}}>
            {steps.map((step,i) => (
              <div key={i} onClick={() => setActiveStep(i)}
                style={{padding:'20px 0',borderBottom:'1px solid #e8e8e8',cursor:'pointer',display:'flex',gap:'16px',alignItems:'flex-start',opacity:activeStep===i?1:0.5,transition:'opacity 0.2s'}}>
                <div style={{fontFamily:'Georgia,serif',fontSize:'28px',fontWeight:300,color:activeStep===i?'#C94E1A':'#ccc',lineHeight:1,flexShrink:0,width:'44px'}}>{step.num}</div>
                <div>
                  <div style={{fontSize:'15px',fontWeight:500,marginBottom:'5px',color:activeStep===i?'#111':'#666'}}>{step.icon} {step.title}</div>
                  <div style={{fontSize:'12px',color:'#999',fontWeight:300,lineHeight:1.7}}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="about-how-right" style={{paddingLeft:'48px',display:'flex',alignItems:'center'}}>
            <div>
              <div style={{fontSize:'56px',marginBottom:'20px'}}>{steps[activeStep].icon}</div>
              <div style={{fontFamily:'Georgia,serif',fontSize:'26px',fontWeight:300,marginBottom:'14px',lineHeight:1.3}}>{steps[activeStep].title}</div>
              <div style={{fontSize:'13px',color:'#666',fontWeight:300,lineHeight:1.9,marginBottom:'20px'}}>{steps[activeStep].detail}</div>
              <div style={{display:'flex',gap:'6px'}}>
                {steps.map((_,i) => (
                  <div key={i} onClick={() => setActiveStep(i)}
                    style={{width:activeStep===i?'24px':'6px',height:'6px',borderRadius:'3px',background:activeStep===i?'#C94E1A':'#e8e8e8',cursor:'pointer',transition:'all 0.3s'}}/>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 선택 이유 */}
      <div className="about-why">
        <div style={{textAlign:'center',marginBottom:'48px'}}>
          <div style={{fontSize:'10px',letterSpacing:'4px',color:'#C94E1A',fontWeight:600,marginBottom:'12px'}}>WHY CLYQ</div>
          <h2 style={{fontFamily:'Georgia,serif',fontSize:'32px',fontWeight:300,color:'#fff',lineHeight:1.3}}>CLYQ를 선택하는 이유</h2>
        </div>
        <div className="about-why-grid">
          {reasons.map((r,i) => (
            <div key={i} style={{background:'#1a1814',padding:'32px',transition:'background 0.2s'}}
              onMouseEnter={e=>e.currentTarget.style.background='#242018'}
              onMouseLeave={e=>e.currentTarget.style.background='#1a1814'}>
              <div style={{fontSize:'28px',marginBottom:'12px'}}>{r.icon}</div>
              <div style={{fontSize:'14px',fontWeight:500,color:'#fff',marginBottom:'8px'}}>{r.title}</div>
              <div style={{fontSize:'12px',color:'rgba(255,255,255,0.45)',fontWeight:300,lineHeight:1.8}}>{r.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 위디 */}
      <div className="about-withy">
        <div className="about-withy-grid">
          <div>
            <div style={{fontSize:'10px',letterSpacing:'4px',color:'#B08D57',fontWeight:600,marginBottom:'12px'}}>WITHY POINT</div>
            <h2 style={{fontFamily:'Georgia,serif',fontSize:'32px',fontWeight:300,marginBottom:'16px',lineHeight:1.3}}>위디(Withy)<br/>포인트란?</h2>
            <p style={{fontSize:'13px',color:'#666',fontWeight:300,lineHeight:1.9,marginBottom:'24px'}}>CLYQ 안에서 쌓이고 사용되는 패션 포인트예요. 피팅할 때마다, 구매할 때마다 자동으로 적립돼요.</p>
            <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
              {[{icon:'📦',text:'피팅 신청 시 50P 자동 적립'},{icon:'🛍️',text:'구매 확정 시 구매가의 0.1% 적립'},{icon:'♻️',text:'순환유통 참여 시 보너스 포인트'},{icon:'💰',text:'적립된 위디로 다음 피팅 할인'}].map((item,i) => (
                <div key={i} style={{display:'flex',alignItems:'center',gap:'10px',fontSize:'13px',color:'#333'}}>
                  <span style={{fontSize:'16px'}}>{item.icon}</span>{item.text}
                </div>
              ))}
            </div>
          </div>
          <div style={{background:'#111',padding:'32px',borderRadius:'4px'}}>
            <div style={{fontSize:'11px',letterSpacing:'2px',color:'rgba(255,255,255,0.4)',marginBottom:'6px'}}>MY WITHY</div>
            <div style={{fontFamily:'Georgia,serif',fontSize:'56px',fontWeight:300,color:'#B08D57',lineHeight:1,marginBottom:'4px'}}>2,400</div>
            <div style={{fontSize:'12px',color:'rgba(255,255,255,0.4)',marginBottom:'24px'}}>포인트 잔액</div>
            {[{name:'마르시아 코트 구매',date:'04.28',point:'+428P'},{name:'피팅 서비스 이용',date:'04.25',point:'+50P'},{name:'위디 포인트 사용',date:'04.20',point:'-200P'}].map((item,i) => (
              <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'11px 0',borderBottom:'1px solid rgba(255,255,255,0.06)',fontSize:'12px'}}>
                <div>
                  <div style={{color:'rgba(255,255,255,0.7)',marginBottom:'2px'}}>{item.name}</div>
                  <div style={{color:'rgba(255,255,255,0.3)'}}>{item.date}</div>
                </div>
                <div style={{color:item.point.startsWith('+')?'#B08D57':'rgba(255,255,255,0.4)',fontWeight:500}}>{item.point}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 순환유통 */}
      <div className="about-circular">
        <div style={{fontSize:'10px',letterSpacing:'4px',color:'#2a7a50',fontWeight:600,marginBottom:'12px'}}>CIRCULAR FASHION</div>
        <h2 style={{fontFamily:'Georgia,serif',fontSize:'30px',fontWeight:300,marginBottom:'16px',lineHeight:1.3}}>입고 반납된 옷은<br/>새로운 여정을 시작해요</h2>
        <p style={{fontSize:'13px',color:'#666',fontWeight:300,lineHeight:1.9,maxWidth:'440px',margin:'0 auto 36px'}}>
          피팅 후 구매하지 않은 제품은 CLYQ의 검수·세탁 과정을 거쳐 순환유통 채널로 이어져요.
        </p>
        <div style={{display:'flex',justifyContent:'center',gap:'24px',flexWrap:'wrap'}}>
          {[{icon:'📦',label:'피팅'},{icon:'→',label:'',plain:true},{icon:'🧺',label:'검수·세탁'},{icon:'→',label:'',plain:true},{icon:'♻️',label:'순환유통'},{icon:'→',label:'',plain:true},{icon:'💚',label:'새 주인'}].map((item,i) => (
            <div key={i} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'6px'}}>
              <div style={{fontSize:item.plain?'18px':'28px',color:item.plain?'#ccc':'inherit'}}>{item.icon}</div>
              {item.label && <div style={{fontSize:'11px',color:'#999'}}>{item.label}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="about-cta">
        <h2 className="about-cta-title" style={{fontFamily:'Georgia,serif',fontSize:'36px',fontWeight:300,color:'#fff',marginBottom:'12px',lineHeight:1.3}}>지금 바로 시작해보세요</h2>
        <p style={{fontSize:'14px',color:'rgba(255,255,255,0.75)',fontWeight:300,marginBottom:'32px',lineHeight:1.8}}>피팅은 무료. 마음에 드는 것만 구매하면 됩니다.</p>
        <div className="about-cta-btns">
          <a href="/fitting" style={{padding:'15px 36px',background:'#fff',color:'#C94E1A',fontSize:'14px',fontWeight:600,textDecoration:'none'}}>선피팅 신청하기</a>
          <a href="/products/new" style={{padding:'15px 36px',border:'1px solid rgba(255,255,255,0.4)',color:'#fff',fontSize:'14px',textDecoration:'none'}}>전체 상품 보기</a>
        </div>
      </div>

      <footer style={{background:'#111',padding:'32px 40px'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:'Georgia,serif',fontSize:'20px',color:'#fff',letterSpacing:'4px'}}>CLY<span style={{color:'#C94E1A'}}>Q</span></div>
          <div style={{fontSize:'12px',color:'rgba(255,255,255,0.3)'}}>© 2026 CLYQ Inc.</div>
        </div>
      </footer>
    </main>
  )
}
