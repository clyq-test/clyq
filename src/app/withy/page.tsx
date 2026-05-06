// @ts-nocheck
'use client'
import { useState } from 'react'
import Navbar from '../components/Navbar'

const history = [
  { date:'2026.04.28', desc:'마르시아 오버핏 코트 구매 확정', amount:'+428P', type:'earn' },
  { date:'2026.04.25', desc:'선피팅 서비스 이용', amount:'+50P', type:'earn' },
  { date:'2026.04.22', desc:'순환유통 참여 보너스', amount:'+120P', type:'earn' },
  { date:'2026.04.20', desc:'위디 포인트 사용 (피팅 비용 차감)', amount:'-200P', type:'use' },
  { date:'2026.04.15', desc:'에잇 셔링 드레스 구매 확정', amount:'+198P', type:'earn' },
  { date:'2026.04.12', desc:'선피팅 서비스 이용', amount:'+50P', type:'earn' },
  { date:'2026.04.10', desc:'리뷰 작성 보너스', amount:'+30P', type:'earn' },
  { date:'2026.04.05', desc:'골드 등급 달성 보너스', amount:'+500P', type:'earn' },
]

const grades = [
  { name:'일반', color:'#999', bg:'#f5f5f5', min:0, max:999, icon:'⚪', perks:['피팅 이용 시 50P 적립','구매가의 0.1% 적립','기본 피팅 서비스 이용'] },
  { name:'실버', color:'#7a8a9a', bg:'#eef2f5', min:1000, max:4999, icon:'🥈', perks:['피팅 이용 시 70P 적립','구매가의 0.15% 적립','월 1회 무료 배송','실버 전용 얼리액세스'] },
  { name:'골드', color:'#B08D57', bg:'#fdf6e8', min:5000, max:19999, icon:'🥇', perks:['피팅 이용 시 100P 적립','구매가의 0.2% 적립','월 2회 무료 배송','골드 전용 신상 선피팅','전담 CS 채널'] },
  { name:'VIP', color:'#C94E1A', bg:'#fff0eb', min:20000, max:999999, icon:'👑', perks:['피팅 이용 시 150P 적립','구매가의 0.3% 적립','무제한 무료 배송','VIP 단독 브랜드 미팅','개인 스타일리스트 상담','연간 선물 증정'] },
]

const earnWays = [
  { icon:'📦', title:'피팅 서비스 이용', desc:'선피팅을 신청하면 이용 건당 자동 적립', point:'50P', tag:'기본' },
  { icon:'🛍️', title:'구매 확정', desc:'구매 확정 금액의 0.1% 자동 적립. 등급에 따라 최대 0.3%', point:'0.1~0.3%', tag:'기본' },
  { icon:'♻️', title:'순환유통 참여', desc:'반납한 제품이 순환유통되면 보너스 포인트 지급', point:'+100P', tag:'보너스' },
  { icon:'⭐', title:'리뷰 작성', desc:'구매 제품 리뷰 작성 시 포인트 지급 (포토 리뷰 추가 적립)', point:'+30P', tag:'보너스' },
  { icon:'👥', title:'친구 초대', desc:'초대한 친구가 첫 피팅 신청 시 양쪽 모두 포인트 지급', point:'+200P', tag:'이벤트' },
  { icon:'📅', title:'구독 멤버십', desc:'CLYQ 구독 시 매월 추가 위디 포인트 자동 지급', point:'+500P/월', tag:'구독' },
]

const useWays = [
  { icon:'📦', title:'피팅 비용 차감', desc:'위디 포인트로 피팅 서비스 이용 비용 차감 (Y2부터)' },
  { icon:'💸', title:'구매 금액 할인', desc:'결제 시 위디 포인트로 최대 10% 할인 적용' },
  { icon:'🚚', title:'배송비 차감', desc:'위디 포인트로 배송비 결제 가능' },
  { icon:'🎁', title:'특별 혜택 교환', desc:'파트너 브랜드 쿠폰, 한정 아이템 교환 가능' },
]

const plans = [
  {
    name:'BASIC',
    price:0,
    unit:'무료',
    color:'#666',
    border:'#e8e8e8',
    perks:['선피팅 이용 가능','기본 위디 적립 (0.1%)','피팅 이용 시 50P 적립','월 1회 피팅 가능'],
    cta:'현재 이용 중',
    current:true,
  },
  {
    name:'STANDARD',
    price:9900,
    unit:'월',
    color:'#B08D57',
    border:'#B08D57',
    perks:['월 3회 피팅 가능','위디 적립 1.5배','매월 500P 자동 지급','무료 배송 월 2회','신상품 얼리액세스'],
    cta:'구독 시작하기',
    current:false,
    badge:'인기',
  },
  {
    name:'PREMIUM',
    price:19900,
    unit:'월',
    color:'#C94E1A',
    border:'#C94E1A',
    perks:['월 무제한 피팅','위디 적립 2배','매월 1,500P 자동 지급','무제한 무료 배송','VIP 전용 브랜드 미팅','개인 스타일리스트 상담'],
    cta:'프리미엄 시작',
    current:false,
    badge:'최고 혜택',
  },
]

export default function WithyPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [historyFilter, setHistoryFilter] = useState('전체')

  const myPoints = 2400
  const myGrade = grades[2] // 골드
  const nextGrade = grades[3] // VIP
  const progress = ((myPoints - myGrade.min) / (nextGrade.min - myGrade.min)) * 100

  const filteredHistory = historyFilter === '전체' ? history
    : historyFilter === '적립' ? history.filter(h => h.type === 'earn')
    : history.filter(h => h.type === 'use')

  return (
    <main style={{background:'#fafafa',minHeight:'100vh'}}>
      <Navbar />

      {/* 상단 대시보드 */}
      <div style={{background:'#1a1814',padding:'48px 40px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,backgroundImage:'radial-gradient(circle at 80% 50%, rgba(176,141,87,0.12) 0%, transparent 60%)',pointerEvents:'none'}}/>
        <div style={{position:'relative',zIndex:1,display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'40px',maxWidth:'1100px',margin:'0 auto'}}>

          {/* 내 위디 */}
          <div>
            <div style={{fontSize:'10px',letterSpacing:'3px',color:'rgba(255,255,255,0.4)',marginBottom:'12px',fontWeight:500}}>MY WITHY</div>
            <div style={{fontFamily:'Georgia,serif',fontSize:'72px',fontWeight:300,color:'#B08D57',lineHeight:1,marginBottom:'4px'}}>{myPoints.toLocaleString()}</div>
            <div style={{fontSize:'13px',color:'rgba(255,255,255,0.4)',marginBottom:'24px'}}>포인트 잔액 · 약 {myPoints.toLocaleString()}원 상당</div>
            <div style={{display:'flex',gap:'8px'}}>
              <button style={{flex:1,padding:'11px',background:'#B08D57',color:'#fff',border:'none',fontSize:'12px',fontWeight:500,cursor:'pointer'}}>포인트 사용</button>
              <button style={{flex:1,padding:'11px',background:'rgba(255,255,255,0.08)',color:'rgba(255,255,255,0.7)',border:'1px solid rgba(255,255,255,0.15)',fontSize:'12px',cursor:'pointer'}}>이력 보기</button>
            </div>
          </div>

          {/* 등급 */}
          <div style={{borderLeft:'1px solid rgba(255,255,255,0.08)',borderRight:'1px solid rgba(255,255,255,0.08)',padding:'0 40px'}}>
            <div style={{fontSize:'10px',letterSpacing:'3px',color:'rgba(255,255,255,0.4)',marginBottom:'12px',fontWeight:500}}>MY GRADE</div>
            <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px'}}>
              <span style={{fontSize:'36px'}}>{myGrade.icon}</span>
              <div>
                <div style={{fontFamily:'Georgia,serif',fontSize:'28px',color:myGrade.color,fontWeight:300}}>{myGrade.name}</div>
                <div style={{fontSize:'11px',color:'rgba(255,255,255,0.4)',marginTop:'2px'}}>{myPoints.toLocaleString()}P 보유</div>
              </div>
            </div>
            <div style={{marginBottom:'8px'}}>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:'11px',color:'rgba(255,255,255,0.4)',marginBottom:'6px'}}>
                <span>{myGrade.name}</span>
                <span>{nextGrade.name}까지 {(nextGrade.min - myPoints).toLocaleString()}P</span>
              </div>
              <div style={{height:'4px',background:'rgba(255,255,255,0.08)',borderRadius:'2px',overflow:'hidden'}}>
                <div style={{height:'100%',background:'linear-gradient(90deg,#B08D57,#C94E1A)',width:progress+'%',borderRadius:'2px',transition:'width 0.5s'}}/>
              </div>
            </div>
            <div style={{fontSize:'11px',color:'rgba(255,255,255,0.35)'}}>다음 등급: {nextGrade.icon} {nextGrade.name}</div>
          </div>

          {/* 이번 달 요약 */}
          <div style={{paddingLeft:'0'}}>
            <div style={{fontSize:'10px',letterSpacing:'3px',color:'rgba(255,255,255,0.4)',marginBottom:'12px',fontWeight:500}}>THIS MONTH</div>
            {[
              {label:'이번 달 적립',val:'+876P',color:'#B08D57'},
              {label:'이번 달 사용',val:'-200P',color:'rgba(255,255,255,0.4)'},
              {label:'피팅 횟수',val:'3회',color:'#fff'},
              {label:'구매 횟수',val:'2회',color:'#fff'},
            ].map((item,i) => (
              <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'10px 0',borderBottom:'1px solid rgba(255,255,255,0.06)',fontSize:'12px'}}>
                <span style={{color:'rgba(255,255,255,0.4)',fontWeight:300}}>{item.label}</span>
                <span style={{color:item.color,fontWeight:500}}>{item.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 탭 */}
      <div style={{background:'#fff',borderBottom:'1px solid #e8e8e8',position:'sticky',top:0,zIndex:100}}>
        <div style={{display:'flex',padding:'0 40px',maxWidth:'1100px',margin:'0 auto'}}>
          {[
            {id:'overview',label:'위디 안내'},
            {id:'grade',label:'등급 혜택'},
            {id:'subscribe',label:'구독 멤버십'},
            {id:'history',label:'포인트 이력'},
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{padding:'16px 24px',fontSize:'13px',fontWeight:activeTab===tab.id?500:400,color:activeTab===tab.id?'#111':'#999',background:'none',border:'none',borderBottom:activeTab===tab.id?'2px solid #111':'2px solid transparent',cursor:'pointer',transition:'all 0.15s'}}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{padding:'48px 40px',maxWidth:'1100px',margin:'0 auto'}}>

        {/* 위디 안내 */}
        {activeTab === 'overview' && (
          <div>
            {/* 적립 방법 */}
            <div style={{marginBottom:'56px'}}>
              <div style={{fontSize:'10px',letterSpacing:'3px',color:'#C94E1A',fontWeight:600,marginBottom:'12px'}}>HOW TO EARN</div>
              <h2 style={{fontFamily:'Georgia,serif',fontSize:'28px',fontWeight:300,marginBottom:'8px'}}>위디 적립 방법</h2>
              <p style={{fontSize:'13px',color:'#999',fontWeight:300,marginBottom:'32px'}}>다양한 방법으로 위디를 모아보세요</p>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px'}}>
                {earnWays.map((way,i) => (
                  <div key={i} style={{background:'#fff',border:'1px solid #e8e8e8',padding:'24px',position:'relative',transition:'all 0.2s'}}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor='#B08D57';e.currentTarget.style.transform='translateY(-2px)'}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor='#e8e8e8';e.currentTarget.style.transform='translateY(0)'}}>
                    <div style={{position:'absolute',top:'16px',right:'16px',fontSize:'9px',fontWeight:700,padding:'3px 8px',background:way.tag==='기본'?'#111':way.tag==='구독'?'#C94E1A':'#B08D57',color:'#fff',letterSpacing:'0.5px'}}>
                      {way.tag}
                    </div>
                    <div style={{fontSize:'32px',marginBottom:'12px'}}>{way.icon}</div>
                    <div style={{fontSize:'14px',fontWeight:500,marginBottom:'6px'}}>{way.title}</div>
                    <div style={{fontSize:'12px',color:'#999',fontWeight:300,lineHeight:1.7,marginBottom:'12px'}}>{way.desc}</div>
                    <div style={{fontFamily:'Georgia,serif',fontSize:'22px',color:'#B08D57',fontWeight:300}}>{way.point}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 사용 방법 */}
            <div>
              <div style={{fontSize:'10px',letterSpacing:'3px',color:'#C94E1A',fontWeight:600,marginBottom:'12px'}}>HOW TO USE</div>
              <h2 style={{fontFamily:'Georgia,serif',fontSize:'28px',fontWeight:300,marginBottom:'8px'}}>위디 사용처</h2>
              <p style={{fontSize:'13px',color:'#999',fontWeight:300,marginBottom:'32px'}}>쌓인 위디를 다양하게 활용하세요</p>
              <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'16px'}}>
                {useWays.map((way,i) => (
                  <div key={i} style={{background:'#fff',border:'1px solid #e8e8e8',padding:'24px',textAlign:'center'}}>
                    <div style={{fontSize:'36px',marginBottom:'12px'}}>{way.icon}</div>
                    <div style={{fontSize:'14px',fontWeight:500,marginBottom:'8px'}}>{way.title}</div>
                    <div style={{fontSize:'12px',color:'#999',fontWeight:300,lineHeight:1.7}}>{way.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 등급 혜택 */}
        {activeTab === 'grade' && (
          <div>
            <div style={{fontSize:'10px',letterSpacing:'3px',color:'#C94E1A',fontWeight:600,marginBottom:'12px'}}>GRADE SYSTEM</div>
            <h2 style={{fontFamily:'Georgia,serif',fontSize:'28px',fontWeight:300,marginBottom:'8px'}}>등급별 혜택</h2>
            <p style={{fontSize:'13px',color:'#999',fontWeight:300,marginBottom:'32px'}}>위디 포인트가 쌓일수록 더 많은 혜택을 누려요</p>

            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'16px',marginBottom:'40px'}}>
              {grades.map((grade,i) => (
                <div key={i} style={{background:'#fff',border:`2px solid ${myGrade.name===grade.name?grade.color:'#e8e8e8'}`,padding:'28px 24px',position:'relative',transition:'all 0.2s'}}>
                  {myGrade.name === grade.name && (
                    <div style={{position:'absolute',top:'-12px',left:'50%',transform:'translateX(-50%)',background:grade.color,color:'#fff',fontSize:'10px',fontWeight:700,padding:'4px 12px',letterSpacing:'1px',whiteSpace:'nowrap'}}>
                      현재 등급
                    </div>
                  )}
                  <div style={{textAlign:'center',marginBottom:'20px'}}>
                    <div style={{fontSize:'40px',marginBottom:'8px'}}>{grade.icon}</div>
                    <div style={{fontFamily:'Georgia,serif',fontSize:'22px',color:grade.color,fontWeight:300,marginBottom:'4px'}}>{grade.name}</div>
                    <div style={{fontSize:'11px',color:'#999'}}>
                      {grade.min.toLocaleString()}P {grade.max < 999999 ? '~ '+grade.max.toLocaleString()+'P' : '이상'}
                    </div>
                  </div>
                  <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                    {grade.perks.map((perk,j) => (
                      <div key={j} style={{display:'flex',alignItems:'flex-start',gap:'8px',fontSize:'12px',color:'#333',fontWeight:300}}>
                        <span style={{color:grade.color,flexShrink:0,marginTop:'1px'}}>✓</span>
                        {perk}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* 내 등급 진행 */}
            <div style={{background:'#fff',border:'1px solid #e8e8e8',padding:'32px'}}>
              <div style={{fontSize:'14px',fontWeight:500,marginBottom:'20px'}}>나의 등급 진행 현황</div>
              <div style={{display:'flex',alignItems:'center',gap:'0',position:'relative',marginBottom:'24px'}}>
                <div style={{position:'absolute',top:'16px',left:'5%',right:'5%',height:'2px',background:'#e8e8e8',zIndex:0}}/>
                {grades.map((grade,i) => (
                  <div key={i} style={{flex:1,textAlign:'center',position:'relative',zIndex:1}}>
                    <div style={{
                      width:'32px',height:'32px',borderRadius:'50%',
                      background: myPoints >= grade.min ? grade.color : '#e8e8e8',
                      border:`2px solid ${myPoints >= grade.min ? grade.color : '#e8e8e8'}`,
                      display:'flex',alignItems:'center',justifyContent:'center',
                      margin:'0 auto 8px',fontSize:'14px',color:'#fff'
                    }}>
                      {myPoints >= grade.min ? '✓' : ''}
                    </div>
                    <div style={{fontSize:'11px',fontWeight:myGrade.name===grade.name?600:400,color:myGrade.name===grade.name?grade.color:'#999'}}>{grade.name}</div>
                    <div style={{fontSize:'10px',color:'#ccc',marginTop:'2px'}}>{grade.min.toLocaleString()}P</div>
                  </div>
                ))}
              </div>
              <div style={{background:'#f9f7f4',padding:'16px',fontSize:'13px',color:'#666',display:'flex',alignItems:'center',gap:'10px'}}>
                <span style={{fontSize:'20px'}}>💡</span>
                <span><strong style={{color:'#111'}}>VIP 달성까지 {(nextGrade.min - myPoints).toLocaleString()}P</strong> 남았어요. 선피팅 {Math.ceil((nextGrade.min - myPoints) / 50)}회 이용하면 달성 가능해요!</span>
              </div>
            </div>
          </div>
        )}

        {/* 구독 멤버십 */}
        {activeTab === 'subscribe' && (
          <div>
            <div style={{fontSize:'10px',letterSpacing:'3px',color:'#C94E1A',fontWeight:600,marginBottom:'12px'}}>SUBSCRIPTION</div>
            <h2 style={{fontFamily:'Georgia,serif',fontSize:'28px',fontWeight:300,marginBottom:'8px'}}>구독 멤버십</h2>
            <p style={{fontSize:'13px',color:'#999',fontWeight:300,marginBottom:'32px'}}>구독하면 위디가 더 빠르게 쌓이고, 더 많은 혜택을 누려요</p>

            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'20px',marginBottom:'48px'}}>
              {plans.map((plan,i) => (
                <div key={i} style={{background:'#fff',border:`2px solid ${plan.border}`,padding:'36px 28px',position:'relative',transition:'all 0.2s'}}
                  onMouseEnter={e => !plan.current && (e.currentTarget.style.transform='translateY(-4px)')}
                  onMouseLeave={e => (e.currentTarget.style.transform='translateY(0)')}>
                  {plan.badge && (
                    <div style={{position:'absolute',top:'-12px',left:'50%',transform:'translateX(-50%)',background:plan.color,color:'#fff',fontSize:'10px',fontWeight:700,padding:'4px 14px',letterSpacing:'1px',whiteSpace:'nowrap'}}>
                      {plan.badge}
                    </div>
                  )}
                  <div style={{marginBottom:'24px'}}>
                    <div style={{fontSize:'13px',fontWeight:600,letterSpacing:'2px',color:plan.color,marginBottom:'8px'}}>{plan.name}</div>
                    <div style={{display:'flex',alignItems:'baseline',gap:'4px'}}>
                      <span style={{fontFamily:'Georgia,serif',fontSize:'40px',fontWeight:300,color:'#111'}}>{plan.price === 0 ? '무료' : plan.price.toLocaleString()}</span>
                      {plan.price > 0 && <span style={{fontSize:'13px',color:'#999'}}>원/{plan.unit}</span>}
                    </div>
                  </div>
                  <div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'28px'}}>
                    {plan.perks.map((perk,j) => (
                      <div key={j} style={{display:'flex',alignItems:'flex-start',gap:'8px',fontSize:'12px',color:'#333',fontWeight:300}}>
                        <span style={{color:plan.color,flexShrink:0}}>✓</span>
                        {perk}
                      </div>
                    ))}
                  </div>
                  <button style={{
                    width:'100%',padding:'13px',
                    background: plan.current ? '#f5f5f5' : plan.color,
                    color: plan.current ? '#999' : '#fff',
                    border:'none',fontSize:'13px',fontWeight:500,
                    cursor: plan.current ? 'default' : 'pointer',
                    letterSpacing:'0.5px'
                  }}>
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>

            {/* 구독 FAQ */}
            <div style={{background:'#fff',border:'1px solid #e8e8e8',padding:'32px'}}>
              <div style={{fontSize:'14px',fontWeight:500,marginBottom:'20px'}}>구독 관련 안내</div>
              {[
                {q:'구독은 언제든 해지할 수 있나요?',a:'네, 언제든 해지 가능해요. 해지 후에도 남은 구독 기간 동안 혜택이 유지돼요.'},
                {q:'구독 중 등급 혜택도 함께 적용되나요?',a:'네, 등급 혜택과 구독 혜택이 함께 적용돼요. 위디 적립은 더 높은 혜택이 자동으로 적용됩니다.'},
                {q:'매월 지급되는 위디는 언제 적립되나요?',a:'구독 결제일에 자동으로 적립돼요. 카카오 알림톡으로 알려드려요.'},
                {q:'구독 기간 중 플랜 변경이 가능한가요?',a:'언제든 상위 플랜으로 업그레이드 가능해요. 하위 플랜 전환은 다음 결제일부터 적용돼요.'},
              ].map((faq,i) => (
                <div key={i} style={{padding:'16px 0',borderBottom:'1px solid #e8e8e8'}}>
                  <div style={{fontSize:'13px',fontWeight:500,marginBottom:'6px',color:'#111'}}>Q. {faq.q}</div>
                  <div style={{fontSize:'12px',color:'#666',fontWeight:300,lineHeight:1.7}}>A. {faq.a}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 포인트 이력 */}
        {activeTab === 'history' && (
          <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:'24px'}}>
              <div>
                <div style={{fontSize:'10px',letterSpacing:'3px',color:'#C94E1A',fontWeight:600,marginBottom:'12px'}}>POINT HISTORY</div>
                <h2 style={{fontFamily:'Georgia,serif',fontSize:'28px',fontWeight:300}}>포인트 이력</h2>
              </div>
              <div style={{display:'flex',gap:'6px'}}>
                {['전체','적립','사용'].map(f => (
                  <button key={f} onClick={() => setHistoryFilter(f)}
                    style={{padding:'7px 16px',fontSize:'12px',color:historyFilter===f?'#111':'#999',background:historyFilter===f?'#fff':'transparent',border:historyFilter===f?'1px solid #111':'1px solid #e8e8e8',cursor:'pointer',borderRadius:'20px'}}>
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div style={{background:'#fff',border:'1px solid #e8e8e8'}}>
              {/* 요약 */}
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',borderBottom:'1px solid #e8e8e8'}}>
                {[
                  {label:'총 적립 포인트',val:'1,376P',color:'#B08D57'},
                  {label:'총 사용 포인트',val:'200P',color:'#999'},
                  {label:'현재 잔액',val:'2,400P',color:'#C94E1A'},
                ].map((item,i) => (
                  <div key={i} style={{padding:'20px 24px',borderRight:i<2?'1px solid #e8e8e8':'none',textAlign:'center'}}>
                    <div style={{fontSize:'11px',color:'#999',marginBottom:'6px'}}>{item.label}</div>
                    <div style={{fontFamily:'Georgia,serif',fontSize:'24px',color:item.color,fontWeight:300}}>{item.val}</div>
                  </div>
                ))}
              </div>

              {/* 이력 리스트 */}
              {filteredHistory.map((item,i) => (
                <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'16px 24px',borderBottom:'1px solid #f5f5f5'}}>
                  <div style={{display:'flex',gap:'14px',alignItems:'center'}}>
                    <div style={{width:'36px',height:'36px',borderRadius:'50%',background:item.type==='earn'?'#fdf6e8':'#f5f5f5',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'16px',flexShrink:0}}>
                      {item.type==='earn'?'💛':'💸'}
                    </div>
                    <div>
                      <div style={{fontSize:'13px',fontWeight:400,marginBottom:'3px'}}>{item.desc}</div>
                      <div style={{fontSize:'11px',color:'#999'}}>{item.date}</div>
                    </div>
                  </div>
                  <div style={{fontSize:'15px',fontWeight:600,color:item.type==='earn'?'#B08D57':'#999'}}>{item.amount}</div>
                </div>
              ))}

              <div style={{padding:'20px 24px',textAlign:'center'}}>
                <button style={{padding:'11px 32px',border:'1px solid #e8e8e8',background:'#fff',fontSize:'12px',color:'#666',cursor:'pointer'}}>
                  더보기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer style={{background:'#111',padding:'40px 80px',marginTop:'40px'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div style={{fontFamily:'Georgia,serif',fontSize:'22px',color:'#fff',letterSpacing:'4px'}}>CLY<span style={{color:'#C94E1A'}}>Q</span></div>
          <div style={{fontSize:'12px',color:'rgba(255,255,255,0.3)'}}>© 2026 CLYQ Inc. exyai company.</div>
        </div>
      </footer>
    </main>
  )
}
