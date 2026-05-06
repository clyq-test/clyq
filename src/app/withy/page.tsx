// @ts-nocheck
'use client'
import { useState } from 'react'
import Navbar from '../components/Navbar'

const history = [
  { date:'2026.04.28', desc:'마르시아 오버핏 코트 구매 확정', amount:'+428P', type:'earn' },
  { date:'2026.04.25', desc:'선피팅 서비스 이용', amount:'+50P', type:'earn' },
  { date:'2026.04.22', desc:'순환유통 참여 보너스', amount:'+120P', type:'earn' },
  { date:'2026.04.20', desc:'위디 포인트 사용', amount:'-200P', type:'use' },
  { date:'2026.04.15', desc:'에잇 셔링 드레스 구매 확정', amount:'+198P', type:'earn' },
  { date:'2026.04.12', desc:'선피팅 서비스 이용', amount:'+50P', type:'earn' },
  { date:'2026.04.10', desc:'리뷰 작성 보너스', amount:'+30P', type:'earn' },
  { date:'2026.04.05', desc:'골드 등급 달성 보너스', amount:'+500P', type:'earn' },
]

const grades = [
  { name:'일반', color:'#999', min:0, max:999, icon:'⚪', perks:['피팅 시 50P 적립','구매가의 0.1% 적립','기본 피팅 서비스'] },
  { name:'실버', color:'#7a8a9a', min:1000, max:4999, icon:'🥈', perks:['피팅 시 70P 적립','구매가의 0.15% 적립','월 1회 무료 배송','얼리액세스'] },
  { name:'골드', color:'#B08D57', min:5000, max:19999, icon:'🥇', perks:['피팅 시 100P 적립','구매가의 0.2% 적립','월 2회 무료 배송','신상 선피팅','전담 CS'] },
  { name:'VIP', color:'#C94E1A', min:20000, max:999999, icon:'👑', perks:['피팅 시 150P 적립','구매가의 0.3% 적립','무제한 무료 배송','단독 브랜드 미팅','스타일리스트 상담','연간 선물'] },
]

const earnWays = [
  { icon:'📦', title:'피팅 서비스 이용', desc:'선피팅 신청 건당 자동 적립', point:'50P', tag:'기본' },
  { icon:'🛍️', title:'구매 확정', desc:'구매 확정 금액의 0.1% 자동 적립', point:'0.1~0.3%', tag:'기본' },
  { icon:'♻️', title:'순환유통 참여', desc:'반납 제품이 순환유통되면 보너스 지급', point:'+100P', tag:'보너스' },
  { icon:'⭐', title:'리뷰 작성', desc:'구매 제품 리뷰 작성 시 포인트 지급', point:'+30P', tag:'보너스' },
  { icon:'👥', title:'친구 초대', desc:'초대 친구 첫 피팅 신청 시 양쪽 지급', point:'+200P', tag:'이벤트' },
  { icon:'📅', title:'구독 멤버십', desc:'CLYQ 구독 시 매월 추가 위디 자동 지급', point:'+500P/월', tag:'구독' },
]

const plans = [
  { name:'BASIC', price:0, color:'#666', border:'#e8e8e8', perks:['선피팅 이용 가능','기본 위디 적립 (0.1%)','피팅 시 50P 적립','월 1회 피팅'], cta:'현재 이용 중', current:true },
  { name:'STANDARD', price:9900, color:'#B08D57', border:'#B08D57', perks:['월 3회 피팅','위디 적립 1.5배','매월 500P 지급','무료 배송 월 2회','얼리액세스'], cta:'구독 시작하기', badge:'인기' },
  { name:'PREMIUM', price:19900, color:'#C94E1A', border:'#C94E1A', perks:['월 무제한 피팅','위디 적립 2배','매월 1,500P 지급','무제한 무료 배송','VIP 브랜드 미팅','스타일리스트 상담'], cta:'프리미엄 시작', badge:'최고 혜택' },
]

export default function WithyPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [historyFilter, setHistoryFilter] = useState('전체')

  const myPoints = 2400
  const myGrade = grades[2]
  const nextGrade = grades[3]
  const progress = ((myPoints - myGrade.min) / (nextGrade.min - myGrade.min)) * 100
  const filteredHistory = historyFilter === '전체' ? history : historyFilter === '적립' ? history.filter(h => h.type==='earn') : history.filter(h => h.type==='use')

  return (
    <main style={{background:'#fafafa',minHeight:'100vh'}}>
      <style>{`
        .withy-dashboard { background:#1a1814; padding:40px; }
        .withy-dash-grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:32px; max-width:1100px; margin:0 auto; }
        .withy-tab-bar { background:#fff; border-bottom:1px solid #e8e8e8; position:sticky; top:0; z-index:100; }
        .withy-tab-inner { display:flex; padding:0 40px; overflow-x:auto; }
        .withy-content { padding:40px; max-width:1100px; margin:0 auto; }
        .earn-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
        .use-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
        .grade-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-bottom:32px; }
        .plans-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-bottom:40px; }
        .dash-divider { border-left:1px solid rgba(255,255,255,0.08); border-right:1px solid rgba(255,255,255,0.08); padding:0 32px; }
        @media (max-width:768px) {
          .withy-dashboard { padding:24px 16px; }
          .withy-dash-grid { grid-template-columns:1fr; gap:20px; }
          .dash-divider { border:none; border-top:1px solid rgba(255,255,255,0.08); border-bottom:1px solid rgba(255,255,255,0.08); padding:20px 0; }
          .withy-tab-inner { padding:0 8px; }
          .withy-content { padding:20px 16px; }
          .earn-grid { grid-template-columns:1fr 1fr; }
          .use-grid { grid-template-columns:1fr 1fr; }
          .grade-grid { grid-template-columns:1fr 1fr; }
          .plans-grid { grid-template-columns:1fr; }
          .withy-big-num { font-size:48px !important; }
        }
      `}</style>

      <Navbar />

      {/* 대시보드 */}
      <div className="withy-dashboard">
        <div className="withy-dash-grid">
          <div>
            <div style={{fontSize:'10px',letterSpacing:'3px',color:'rgba(255,255,255,0.4)',marginBottom:'10px',fontWeight:500}}>MY WITHY</div>
            <div className="withy-big-num" style={{fontFamily:'Georgia,serif',fontSize:'64px',fontWeight:300,color:'#B08D57',lineHeight:1,marginBottom:'4px'}}>{myPoints.toLocaleString()}</div>
            <div style={{fontSize:'13px',color:'rgba(255,255,255,0.4)',marginBottom:'20px'}}>포인트 잔액</div>
            <div style={{display:'flex',gap:'8px'}}>
              <button style={{flex:1,padding:'10px',background:'#B08D57',color:'#fff',border:'none',fontSize:'12px',fontWeight:500,cursor:'pointer'}}>포인트 사용</button>
              <button style={{flex:1,padding:'10px',background:'rgba(255,255,255,0.08)',color:'rgba(255,255,255,0.7)',border:'1px solid rgba(255,255,255,0.15)',fontSize:'12px',cursor:'pointer'}}>이력 보기</button>
            </div>
          </div>

          <div className="dash-divider">
            <div style={{fontSize:'10px',letterSpacing:'3px',color:'rgba(255,255,255,0.4)',marginBottom:'10px',fontWeight:500}}>MY GRADE</div>
            <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'14px'}}>
              <span style={{fontSize:'32px'}}>{myGrade.icon}</span>
              <div>
                <div style={{fontFamily:'Georgia,serif',fontSize:'24px',color:myGrade.color,fontWeight:300}}>{myGrade.name}</div>
                <div style={{fontSize:'11px',color:'rgba(255,255,255,0.4)',marginTop:'2px'}}>{myPoints.toLocaleString()}P 보유</div>
              </div>
            </div>
            <div style={{marginBottom:'8px'}}>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:'11px',color:'rgba(255,255,255,0.4)',marginBottom:'6px'}}>
                <span>{myGrade.name}</span>
                <span>{nextGrade.name}까지 {(nextGrade.min-myPoints).toLocaleString()}P</span>
              </div>
              <div style={{height:'4px',background:'rgba(255,255,255,0.08)',borderRadius:'2px',overflow:'hidden'}}>
                <div style={{height:'100%',background:'linear-gradient(90deg,#B08D57,#C94E1A)',width:progress+'%',borderRadius:'2px'}}/>
              </div>
            </div>
          </div>

          <div>
            <div style={{fontSize:'10px',letterSpacing:'3px',color:'rgba(255,255,255,0.4)',marginBottom:'10px',fontWeight:500}}>THIS MONTH</div>
            {[{label:'이번 달 적립',val:'+876P',color:'#B08D57'},{label:'이번 달 사용',val:'-200P',color:'rgba(255,255,255,0.4)'},{label:'피팅 횟수',val:'3회',color:'#fff'},{label:'구매 횟수',val:'2회',color:'#fff'}].map((item,i) => (
              <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'9px 0',borderBottom:'1px solid rgba(255,255,255,0.06)',fontSize:'12px'}}>
                <span style={{color:'rgba(255,255,255,0.4)',fontWeight:300}}>{item.label}</span>
                <span style={{color:item.color,fontWeight:500}}>{item.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 탭 */}
      <div className="withy-tab-bar">
        <div className="withy-tab-inner">
          {[{id:'overview',label:'위디 안내'},{id:'grade',label:'등급 혜택'},{id:'subscribe',label:'구독 멤버십'},{id:'history',label:'포인트 이력'}].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{padding:'14px 20px',fontSize:'13px',fontWeight:activeTab===tab.id?500:400,color:activeTab===tab.id?'#111':'#999',background:'none',border:'none',borderBottom:activeTab===tab.id?'2px solid #111':'2px solid transparent',cursor:'pointer',whiteSpace:'nowrap'}}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="withy-content">
        {/* 위디 안내 */}
        {activeTab === 'overview' && (
          <div>
            <div style={{marginBottom:'40px'}}>
              <div style={{fontSize:'10px',letterSpacing:'3px',color:'#C94E1A',fontWeight:600,marginBottom:'10px'}}>HOW TO EARN</div>
              <h2 style={{fontFamily:'Georgia,serif',fontSize:'24px',fontWeight:300,marginBottom:'6px'}}>위디 적립 방법</h2>
              <p style={{fontSize:'13px',color:'#999',fontWeight:300,marginBottom:'24px'}}>다양한 방법으로 위디를 모아보세요</p>
              <div className="earn-grid">
                {earnWays.map((way,i) => (
                  <div key={i} style={{background:'#fff',border:'1px solid #e8e8e8',padding:'20px',position:'relative'}}>
                    <div style={{position:'absolute',top:'12px',right:'12px',fontSize:'9px',fontWeight:700,padding:'3px 8px',background:way.tag==='기본'?'#111':way.tag==='구독'?'#C94E1A':'#B08D57',color:'#fff'}}>{way.tag}</div>
                    <div style={{fontSize:'28px',marginBottom:'10px'}}>{way.icon}</div>
                    <div style={{fontSize:'13px',fontWeight:500,marginBottom:'5px'}}>{way.title}</div>
                    <div style={{fontSize:'11px',color:'#999',fontWeight:300,lineHeight:1.6,marginBottom:'10px'}}>{way.desc}</div>
                    <div style={{fontFamily:'Georgia,serif',fontSize:'20px',color:'#B08D57',fontWeight:300}}>{way.point}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 등급 혜택 */}
        {activeTab === 'grade' && (
          <div>
            <div style={{fontSize:'10px',letterSpacing:'3px',color:'#C94E1A',fontWeight:600,marginBottom:'10px'}}>GRADE SYSTEM</div>
            <h2 style={{fontFamily:'Georgia,serif',fontSize:'24px',fontWeight:300,marginBottom:'6px'}}>등급별 혜택</h2>
            <p style={{fontSize:'13px',color:'#999',fontWeight:300,marginBottom:'24px'}}>위디 포인트가 쌓일수록 더 많은 혜택을 누려요</p>
            <div className="grade-grid">
              {grades.map((grade,i) => (
                <div key={i} style={{background:'#fff',border:`2px solid ${myGrade.name===grade.name?grade.color:'#e8e8e8'}`,padding:'20px',position:'relative'}}>
                  {myGrade.name === grade.name && (
                    <div style={{position:'absolute',top:'-10px',left:'50%',transform:'translateX(-50%)',background:grade.color,color:'#fff',fontSize:'9px',fontWeight:700,padding:'3px 10px',whiteSpace:'nowrap'}}>현재 등급</div>
                  )}
                  <div style={{textAlign:'center',marginBottom:'16px'}}>
                    <div style={{fontSize:'32px',marginBottom:'6px'}}>{grade.icon}</div>
                    <div style={{fontFamily:'Georgia,serif',fontSize:'18px',color:grade.color,fontWeight:300,marginBottom:'3px'}}>{grade.name}</div>
                    <div style={{fontSize:'10px',color:'#999'}}>{grade.min.toLocaleString()}P 이상</div>
                  </div>
                  <div style={{display:'flex',flexDirection:'column',gap:'6px'}}>
                    {grade.perks.map((perk,j) => (
                      <div key={j} style={{display:'flex',alignItems:'flex-start',gap:'6px',fontSize:'11px',color:'#333',fontWeight:300}}>
                        <span style={{color:grade.color,flexShrink:0}}>✓</span>{perk}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div style={{background:'#fff',border:'1px solid #e8e8e8',padding:'24px'}}>
              <div style={{fontSize:'14px',fontWeight:500,marginBottom:'16px'}}>나의 등급 현황</div>
              <div style={{background:'#f9f7f4',padding:'14px',fontSize:'13px',color:'#666',display:'flex',alignItems:'center',gap:'10px'}}>
                <span style={{fontSize:'18px'}}>💡</span>
                <span><strong style={{color:'#111'}}>VIP 달성까지 {(nextGrade.min-myPoints).toLocaleString()}P</strong> 남았어요!</span>
              </div>
            </div>
          </div>
        )}

        {/* 구독 멤버십 */}
        {activeTab === 'subscribe' && (
          <div>
            <div style={{fontSize:'10px',letterSpacing:'3px',color:'#C94E1A',fontWeight:600,marginBottom:'10px'}}>SUBSCRIPTION</div>
            <h2 style={{fontFamily:'Georgia,serif',fontSize:'24px',fontWeight:300,marginBottom:'6px'}}>구독 멤버십</h2>
            <p style={{fontSize:'13px',color:'#999',fontWeight:300,marginBottom:'24px'}}>구독하면 위디가 더 빠르게 쌓여요</p>
            <div className="plans-grid">
              {plans.map((plan,i) => (
                <div key={i} style={{background:'#fff',border:`2px solid ${plan.border}`,padding:'28px',position:'relative'}}>
                  {plan.badge && (
                    <div style={{position:'absolute',top:'-10px',left:'50%',transform:'translateX(-50%)',background:plan.color,color:'#fff',fontSize:'10px',fontWeight:700,padding:'4px 14px',whiteSpace:'nowrap'}}>{plan.badge}</div>
                  )}
                  <div style={{marginBottom:'20px'}}>
                    <div style={{fontSize:'12px',fontWeight:600,letterSpacing:'2px',color:plan.color,marginBottom:'8px'}}>{plan.name}</div>
                    <div style={{display:'flex',alignItems:'baseline',gap:'4px'}}>
                      <span style={{fontFamily:'Georgia,serif',fontSize:'36px',fontWeight:300,color:'#111'}}>{plan.price===0?'무료':plan.price.toLocaleString()}</span>
                      {plan.price>0 && <span style={{fontSize:'12px',color:'#999'}}>원/월</span>}
                    </div>
                  </div>
                  <div style={{display:'flex',flexDirection:'column',gap:'8px',marginBottom:'20px'}}>
                    {plan.perks.map((perk,j) => (
                      <div key={j} style={{display:'flex',alignItems:'flex-start',gap:'6px',fontSize:'12px',color:'#333',fontWeight:300}}>
                        <span style={{color:plan.color,flexShrink:0}}>✓</span>{perk}
                      </div>
                    ))}
                  </div>
                  <button style={{width:'100%',padding:'12px',background:plan.current?'#f5f5f5':plan.color,color:plan.current?'#999':'#fff',border:'none',fontSize:'13px',fontWeight:500,cursor:plan.current?'default':'pointer'}}>
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 포인트 이력 */}
        {activeTab === 'history' && (
          <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:'20px',flexWrap:'wrap',gap:'12px'}}>
              <div>
                <div style={{fontSize:'10px',letterSpacing:'3px',color:'#C94E1A',fontWeight:600,marginBottom:'10px'}}>POINT HISTORY</div>
                <h2 style={{fontFamily:'Georgia,serif',fontSize:'24px',fontWeight:300}}>포인트 이력</h2>
              </div>
              <div style={{display:'flex',gap:'6px'}}>
                {['전체','적립','사용'].map(f => (
                  <button key={f} onClick={() => setHistoryFilter(f)}
                    style={{padding:'7px 14px',fontSize:'12px',color:historyFilter===f?'#111':'#999',background:historyFilter===f?'#fff':'transparent',border:historyFilter===f?'1px solid #111':'1px solid #e8e8e8',cursor:'pointer',borderRadius:'20px'}}>
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div style={{background:'#fff',border:'1px solid #e8e8e8'}}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',borderBottom:'1px solid #e8e8e8'}}>
                {[{label:'총 적립',val:'1,376P',color:'#B08D57'},{label:'총 사용',val:'200P',color:'#999'},{label:'현재 잔액',val:'2,400P',color:'#C94E1A'}].map((item,i) => (
                  <div key={i} style={{padding:'16px',borderRight:i<2?'1px solid #e8e8e8':'none',textAlign:'center'}}>
                    <div style={{fontSize:'11px',color:'#999',marginBottom:'4px'}}>{item.label}</div>
                    <div style={{fontFamily:'Georgia,serif',fontSize:'20px',color:item.color,fontWeight:300}}>{item.val}</div>
                  </div>
                ))}
              </div>
              {filteredHistory.map((item,i) => (
                <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'14px 20px',borderBottom:'1px solid #f5f5f5'}}>
                  <div style={{display:'flex',gap:'12px',alignItems:'center'}}>
                    <div style={{width:'32px',height:'32px',borderRadius:'50%',background:item.type==='earn'?'#fdf6e8':'#f5f5f5',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'14px',flexShrink:0}}>
                      {item.type==='earn'?'💛':'💸'}
                    </div>
                    <div>
                      <div style={{fontSize:'13px',marginBottom:'2px'}}>{item.desc}</div>
                      <div style={{fontSize:'11px',color:'#999'}}>{item.date}</div>
                    </div>
                  </div>
                  <div style={{fontSize:'14px',fontWeight:600,color:item.type==='earn'?'#B08D57':'#999',flexShrink:0}}>{item.amount}</div>
                </div>
              ))}
              <div style={{padding:'16px',textAlign:'center'}}>
                <button style={{padding:'10px 28px',border:'1px solid #e8e8e8',background:'#fff',fontSize:'12px',color:'#666',cursor:'pointer'}}>더보기</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer style={{background:'#111',padding:'32px 40px',marginTop:'40px'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:'Georgia,serif',fontSize:'20px',color:'#fff',letterSpacing:'4px'}}>CLY<span style={{color:'#C94E1A'}}>Q</span></div>
          <div style={{fontSize:'12px',color:'rgba(255,255,255,0.3)'}}>© 2026 CLYQ Inc.</div>
        </div>
      </footer>
    </main>
  )
}
