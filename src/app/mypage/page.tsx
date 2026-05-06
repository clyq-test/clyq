// @ts-nocheck
'use client'
import { useState } from 'react'
import Navbar from '../components/Navbar'

const user = {
  name: '김지연',
  email: 'jiyeon@clyq.com',
  phone: '010-1234-5678',
  grade: '골드',
  gradeIcon: '🥇',
  gradeColor: '#B08D57',
  joinDate: '2025.11.03',
  avatar: '👩',
  withy: 2400,
  nextGrade: 'VIP',
  nextGradeMin: 20000,
  gradeMin: 5000,
  subscription: 'STANDARD',
}

const wityhHistory = [
  { date:'2026.05.01', desc:'매거진 댓글 작성', amount:'+10P', type:'earn' },
  { date:'2026.04.28', desc:'마르시아 코트 구매 확정', amount:'+428P', type:'earn' },
  { date:'2026.04.25', desc:'피팅박스 이용', amount:'+50P', type:'earn' },
  { date:'2026.04.22', desc:'커뮤니티 피팅 후기 작성', amount:'+50P', type:'earn' },
  { date:'2026.04.20', desc:'위디 포인트 사용 (할인 적용)', amount:'-200P', type:'use' },
  { date:'2026.04.15', desc:'에잇 드레스 구매 확정', amount:'+198P', type:'earn' },
  { date:'2026.04.12', desc:'피팅박스 이용', amount:'+50P', type:'earn' },
  { date:'2026.04.10', desc:'리뷰 작성 보너스', amount:'+30P', type:'earn' },
  { date:'2026.04.05', desc:'골드 등급 달성 보너스', amount:'+500P', type:'earn' },
  { date:'2026.04.01', desc:'구독 멤버십 자동 지급', amount:'+500P', type:'earn' },
]

const fittingHistory = [
  { id:'FIT-2406-001', product:'마르시아 오버핏 캐시미어 울 코트', size:'M', status:'구매확정', date:'2026.04.28', price:428000, image:'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=200&auto=format&fit=crop' },
  { id:'FIT-2405-003', product:'에잇 셔링 디테일 미디 드레스', size:'S', status:'반납완료', date:'2026.04.15', price:198000, image:'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=200&auto=format&fit=crop' },
  { id:'FIT-2404-007', product:'MATIN KIM 오버핏 레더 재킷', size:'M/L', status:'반납완료', date:'2026.03.22', price:578000, image:'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&auto=format&fit=crop' },
  { id:'FIT-2403-012', product:'EENK 셔링 미디 스커트', size:'S', status:'구매확정', date:'2026.03.05', price:148000, image:'https://images.unsplash.com/photo-1583496661160-fb5218e5b8a9?w=200&auto=format&fit=crop' },
]

const orderHistory = [
  { id:'ORD-2406-028', product:'마르시아 오버핏 캐시미어 울 코트 / M / 아이보리', status:'배송완료', date:'2026.04.28', price:428000, image:'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=200&auto=format&fit=crop' },
  { id:'ORD-2404-015', product:'EENK 셔링 미디 스커트 / S / 블랙', status:'배송완료', date:'2026.04.15', price:148000, image:'https://images.unsplash.com/photo-1583496661160-fb5218e5b8a9?w=200&auto=format&fit=crop' },
]

const badges = [
  { icon:'📦', label:'첫 피팅박스', earned:true, date:'2025.11.10' },
  { icon:'🛍️', label:'첫 구매', earned:true, date:'2025.11.15' },
  { icon:'⭐', label:'첫 리뷰', earned:true, date:'2025.12.01' },
  { icon:'🥇', label:'골드 달성', earned:true, date:'2026.04.05' },
  { icon:'💬', label:'커뮤니티 활성', earned:true, date:'2026.04.22' },
  { icon:'👑', label:'VIP 달성', earned:false, date:null },
  { icon:'🌱', label:'순환유통 참여', earned:false, date:null },
  { icon:'🎯', label:'피팅 10회', earned:false, date:null },
]

const tabs = ['홈','피팅 현황','주문 내역','위디 이력','나의 활동','설정']

export default function MyPage() {
  const [activeTab, setActiveTab] = useState('홈')
  const [wityhFilter, setWithyFilter] = useState('전체')
  const [toast, setToast] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({ name: user.name, phone: user.phone, email: user.email })

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(''), 2400) }

  const progress = ((user.withy - user.gradeMin) / (user.nextGradeMin - user.gradeMin)) * 100

  const filteredWithy = wityhFilter === '전체' ? wityhHistory
    : wityhFilter === '적립' ? wityhHistory.filter(h => h.type === 'earn')
    : wityhHistory.filter(h => h.type === 'use')

  const statusColor = { '피팅중':'#C94E1A', '구매확정':'#2a7a50', '반납완료':'#999', '배송완료':'#2a7a50', '배송중':'#C94E1A', '주문완료':'#B08D57' }

  return (
    <main style={{background:'#fafafa',minHeight:'100vh'}}>
      <style>{`
        .mp-wrap { max-width:960px; margin:0 auto; padding:32px 40px 80px; }
        /* 프로필 헤더 */
        .mp-profile { background:linear-gradient(110deg,#1a1814,#2d2318); padding:28px 32px; display:flex; align-items:center; gap:24px; }
        .mp-avatar { width:64px; height:64px; border-radius:50%; background:rgba(255,255,255,.1); display:flex; align-items:center; justify-content:center; font-size:28px; flex-shrink:0; border:2px solid rgba(255,255,255,.15); }
        .mp-info { flex:1; }
        .mp-name { font-size:20px; font-weight:500; color:#fff; margin-bottom:3px; }
        .mp-grade { display:inline-flex; align-items:center; gap:5px; background:rgba(176,141,87,.2); border:1px solid rgba(176,141,87,.3); padding:3px 10px; font-size:11px; color:#B08D57; font-weight:500; margin-bottom:6px; }
        .mp-join { font-size:11px; color:rgba(255,255,255,.4); }
        .mp-withy-quick { text-align:right; }
        .mp-withy-num { font-family:Georgia,serif; font-size:36px; font-weight:300; color:#B08D57; line-height:1; }
        .mp-withy-label { font-size:10px; color:rgba(255,255,255,.4); margin-top:2px; }
        /* 탭 */
        .mp-tabs { background:#fff; border-bottom:1px solid #e8e8e8; display:flex; overflow-x:auto; scrollbar-width:none; position:sticky; top:0; z-index:100; }
        .mp-tabs::-webkit-scrollbar { display:none; }
        .mp-tab { padding:14px 18px; font-size:13px; border:none; background:none; cursor:pointer; color:#999; border-bottom:2px solid transparent; white-space:nowrap; font-family:inherit; transition:all .15s; }
        .mp-tab.on { color:#111; border-bottom-color:#111; font-weight:500; }
        /* 카드 */
        .mp-card { background:#fff; border:1px solid #e8e8e8; padding:24px; margin-bottom:16px; }
        .mp-card-title { font-size:13px; font-weight:600; color:#111; margin-bottom:16px; display:flex; justify-content:space-between; align-items:center; }
        /* 그리드 */
        .mp-grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px; }
        .mp-stat { background:#fff; border:1px solid #e8e8e8; padding:20px; text-align:center; }
        .mp-stat-num { font-family:Georgia,serif; font-size:28px; font-weight:300; color:#111; margin-bottom:4px; }
        .mp-stat-label { font-size:11px; color:#999; }
        /* 피팅/주문 카드 */
        .fit-card { display:flex; gap:14px; padding:16px 0; border-bottom:1px solid #f5f5f5; }
        .fit-card:last-child { border-bottom:none; }
        .fit-img { width:64px; height:80px; object-fit:cover; flex-shrink:0; background:#f5f5f5; }
        .fit-info { flex:1; min-width:0; }
        .fit-id { font-size:10px; color:#ccc; margin-bottom:4px; }
        .fit-name { font-size:13px; color:#111; margin-bottom:5px; font-weight:400; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .fit-meta { font-size:11px; color:#999; margin-bottom:6px; display:flex; gap:10px; flex-wrap:wrap; }
        .fit-status { font-size:11px; font-weight:600; }
        .fit-price { font-size:13px; font-weight:500; color:#111; }
        /* 위디 이력 */
        .withy-row { display:flex; justify-content:space-between; align-items:center; padding:13px 0; border-bottom:1px solid #f5f5f5; }
        .withy-row:last-child { border-bottom:none; }
        .wr-icon { width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:14px; flex-shrink:0; }
        .wr-desc { font-size:13px; color:#333; margin-bottom:2px; }
        .wr-date { font-size:11px; color:#ccc; }
        .wr-amount { font-size:14px; font-weight:600; }
        /* 뱃지 */
        .badge-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; }
        .badge-item { text-align:center; padding:16px 8px; border:1px solid #e8e8e8; background:#fff; }
        .badge-item.on { border-color:#B08D57; background:#fdf6e8; }
        .badge-icon { font-size:28px; margin-bottom:6px; }
        .badge-label { font-size:11px; color:#666; }
        .badge-date { font-size:10px; color:#ccc; margin-top:2px; }
        /* 폼 */
        .mp-input { width:100%; padding:11px 14px; border:1px solid #e8e8e8; font-size:13px; outline:none; font-family:inherit; transition:border-color .15s; }
        .mp-input:focus { border-color:#111; }
        .mp-input:disabled { background:#f9f9f9; color:#999; }
        .mp-label { font-size:11px; font-weight:500; color:#555; margin-bottom:6px; display:block; }
        /* 진행바 */
        .prog-bar { height:5px; background:#e8e8e8; border-radius:3px; overflow:hidden; margin:8px 0; }
        .prog-fill { height:100%; background:linear-gradient(90deg,#B08D57,#C94E1A); border-radius:3px; transition:width .5s; }
        /* 토스트 */
        .mp-toast { position:fixed; bottom:24px; left:50%; transform:translateX(-50%) translateY(${toast?'0':'60px'}); background:#111; color:#fff; padding:12px 20px; font-size:13px; z-index:2000; transition:transform .3s; white-space:nowrap; pointer-events:none; }
        @media (max-width:768px) {
          .mp-profile { padding:20px 16px; gap:14px; flex-wrap:wrap; }
          .mp-avatar { width:52px; height:52px; font-size:22px; }
          .mp-name { font-size:17px; }
          .mp-withy-num { font-size:28px; }
          .mp-wrap { padding:0 0 80px; }
          .mp-card { padding:16px; border-radius:0; border-left:none; border-right:none; margin-bottom:8px; }
          .mp-grid-2 { gap:8px; margin-bottom:8px; }
          .mp-stat { padding:14px 10px; }
          .mp-stat-num { font-size:22px; }
          .badge-grid { grid-template-columns:repeat(4,1fr); gap:8px; }
          .badge-item { padding:12px 4px; }
          .badge-icon { font-size:22px; }
          .fit-img { width:52px; height:64px; }
          .mp-tab { padding:12px 14px; font-size:12px; }
        }
      `}</style>

      <Navbar />

      {/* 프로필 헤더 */}
      <div className="mp-profile">
        <div className="mp-avatar">{user.avatar}</div>
        <div className="mp-info">
          <div className="mp-name">{user.name}</div>
          <div className="mp-grade">
            {user.gradeIcon} {user.grade} 등급
          </div>
          <div className="mp-join">가입일 {user.joinDate} · {user.subscription} 구독중</div>
        </div>
        <div className="mp-withy-quick">
          <div className="mp-withy-num">{user.withy.toLocaleString()}</div>
          <div className="mp-withy-label">위디 포인트</div>
        </div>
      </div>

      {/* 탭 */}
      <div className="mp-tabs">
        {tabs.map(tab => (
          <button key={tab} className={`mp-tab ${activeTab===tab?'on':''}`} onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        ))}
      </div>

      <div className="mp-wrap">

        {/* ── 홈 ── */}
        {activeTab === '홈' && (
          <>
            {/* 위디 현황 */}
            <div className="mp-card">
              <div className="mp-card-title">
                💛 위디 현황
                <button onClick={() => setActiveTab('위디 이력')} style={{fontSize:'12px',color:'#999',border:'none',background:'none',cursor:'pointer'}}>이력 보기 ›</button>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:'12px'}}>
                <div>
                  <div style={{fontFamily:'Georgia,serif',fontSize:'44px',fontWeight:300,color:'#B08D57',lineHeight:1}}>{user.withy.toLocaleString()}</div>
                  <div style={{fontSize:'12px',color:'#999',marginTop:'4px'}}>포인트 잔액 · 약 {user.withy.toLocaleString()}원 상당</div>
                </div>
                <button onClick={() => showToast('위디 포인트는 피팅박스·구매 할인에 사용 가능해요')}
                  style={{padding:'11px 20px',background:'#111',color:'#fff',border:'none',fontSize:'13px',fontWeight:500,cursor:'pointer',fontFamily:'inherit'}}>
                  포인트 사용
                </button>
              </div>

              {/* 등급 진행 */}
              <div style={{background:'#f9f7f4',padding:'14px',borderRadius:'2px'}}>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:'12px',marginBottom:'6px'}}>
                  <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
                    <span>{user.gradeIcon}</span>
                    <span style={{fontWeight:500,color:user.gradeColor}}>{user.grade}</span>
                  </div>
                  <div style={{color:'#999'}}>👑 {user.nextGrade}까지 <strong style={{color:'#111'}}>{(user.nextGradeMin-user.withy).toLocaleString()}P</strong></div>
                </div>
                <div className="prog-bar">
                  <div className="prog-fill" style={{width:Math.min(progress,100)+'%'}}/>
                </div>
                <div style={{fontSize:'11px',color:'#999',marginTop:'4px'}}>
                  피팅박스 이용 {Math.ceil((user.nextGradeMin-user.withy)/50)}회면 VIP 달성!
                </div>
              </div>

              {/* 이번달 요약 */}
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'0',borderTop:'1px solid #f0f0f0',marginTop:'16px'}}>
                {[{label:'이번달 적립',val:'+638P',color:'#B08D57'},{label:'이번달 사용',val:'-200P',color:'#999'},{label:'누적 적립',val:'3,240P',color:'#111'}].map((item,i) => (
                  <div key={i} style={{padding:'12px',textAlign:'center',borderRight:i<2?'1px solid #f0f0f0':'none'}}>
                    <div style={{fontSize:'16px',fontWeight:600,color:item.color,marginBottom:'3px'}}>{item.val}</div>
                    <div style={{fontSize:'10px',color:'#999'}}>{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 빠른 통계 */}
            <div className="mp-grid-2">
              <div className="mp-stat">
                <div className="mp-stat-num">4</div>
                <div className="mp-stat-label">피팅박스 이용</div>
              </div>
              <div className="mp-stat">
                <div className="mp-stat-num">2</div>
                <div className="mp-stat-label">구매 확정</div>
              </div>
              <div className="mp-stat">
                <div className="mp-stat-num" style={{color:'#2a7a50'}}>50%</div>
                <div className="mp-stat-label">피팅 구매 전환율</div>
              </div>
              <div className="mp-stat">
                <div className="mp-stat-num" style={{color:'#C94E1A'}}>576,000</div>
                <div className="mp-stat-label">총 구매 금액(원)</div>
              </div>
            </div>

            {/* 최근 피팅 */}
            <div className="mp-card">
              <div className="mp-card-title">
                📦 최근 피팅박스
                <button onClick={() => setActiveTab('피팅 현황')} style={{fontSize:'12px',color:'#999',border:'none',background:'none',cursor:'pointer'}}>전체 보기 ›</button>
              </div>
              {fittingHistory.slice(0,2).map(fit => (
                <div key={fit.id} className="fit-card">
                  <img className="fit-img" src={fit.image} alt={fit.product}/>
                  <div className="fit-info">
                    <div className="fit-id">{fit.id}</div>
                    <div className="fit-name">{fit.product}</div>
                    <div className="fit-meta">
                      <span>사이즈 {fit.size}</span>
                      <span>{fit.date}</span>
                    </div>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                      <span className="fit-status" style={{color:statusColor[fit.status]||'#666'}}>{fit.status}</span>
                      <span className="fit-price">{fit.price.toLocaleString()}원</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 내 뱃지 */}
            <div className="mp-card">
              <div className="mp-card-title">🏅 내 뱃지</div>
              <div className="badge-grid">
                {badges.map((b,i) => (
                  <div key={i} className={`badge-item ${b.earned?'on':''}`}>
                    <div className="badge-icon" style={{opacity:b.earned?1:.3}}>{b.icon}</div>
                    <div className="badge-label" style={{color:b.earned?'#333':'#ccc'}}>{b.label}</div>
                    <div className="badge-date">{b.earned?b.date:'미달성'}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 커뮤니티 위디 */}
            <div className="mp-card" style={{background:'linear-gradient(110deg,#1a1814,#2d2318)',border:'none'}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'12px'}}>
                <div>
                  <div style={{fontSize:'11px',color:'rgba(255,255,255,.4)',marginBottom:'6px'}}>활동으로 더 모으기</div>
                  <div style={{fontSize:'16px',fontWeight:500,color:'#fff',marginBottom:'4px'}}>커뮤니티에서 위디 적립하세요</div>
                  <div style={{fontSize:'12px',color:'rgba(255,255,255,.5)'}}>피팅 후기 +50P · 댓글 +10P · 공유 +10P</div>
                </div>
                <a href="/community" style={{padding:'11px 20px',background:'#C94E1A',color:'#fff',fontSize:'13px',fontWeight:500,textDecoration:'none',flexShrink:0}}>
                  커뮤니티 가기
                </a>
              </div>
            </div>
          </>
        )}

        {/* ── 피팅 현황 ── */}
        {activeTab === '피팅 현황' && (
          <>
            <div className="mp-card">
              <div className="mp-card-title">📦 피팅박스 이용 내역</div>
              {fittingHistory.map(fit => (
                <div key={fit.id} className="fit-card">
                  <img className="fit-img" src={fit.image} alt={fit.product}/>
                  <div className="fit-info">
                    <div className="fit-id">{fit.id}</div>
                    <div className="fit-name">{fit.product}</div>
                    <div className="fit-meta">
                      <span>사이즈 {fit.size}</span>
                      <span>{fit.date}</span>
                    </div>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
                      <span className="fit-status" style={{color:statusColor[fit.status]||'#666'}}>{fit.status}</span>
                      <div style={{display:'flex',gap:'8px'}}>
                        {fit.status === '구매확정' && (
                          <button onClick={() => showToast('리뷰 작성 시 위디 30P 적립!')} style={{padding:'6px 12px',border:'1px solid #e8e8e8',background:'#fff',fontSize:'11px',cursor:'pointer',fontFamily:'inherit'}}>리뷰 작성 +30P</button>
                        )}
                        {fit.status === '반납완료' && (
                          <button onClick={() => showToast('다시 피팅박스를 신청해보세요!')} style={{padding:'6px 12px',border:'1px solid #C94E1A',color:'#C94E1A',background:'#fff',fontSize:'11px',cursor:'pointer',fontFamily:'inherit'}}>재신청</button>
                        )}
                        <span className="fit-price">{fit.price.toLocaleString()}원</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 피팅 통계 */}
            <div className="mp-card">
              <div className="mp-card-title">📊 피팅박스 통계</div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'0',borderTop:'1px solid #f0f0f0'}}>
                {[{label:'총 이용',val:'4회'},{label:'구매 확정',val:'2회'},{label:'전환율',val:'50%'}].map((s,i) => (
                  <div key={i} style={{padding:'16px',textAlign:'center',borderRight:i<2?'1px solid #f0f0f0':'none'}}>
                    <div style={{fontFamily:'Georgia,serif',fontSize:'28px',fontWeight:300,color:'#111',marginBottom:'4px'}}>{s.val}</div>
                    <div style={{fontSize:'11px',color:'#999'}}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{background:'#f9f7f4',padding:'12px 14px',marginTop:'16px',fontSize:'12px',color:'#666',lineHeight:1.7}}>
                💡 피팅박스를 이용할수록 구매 후 반품률이 <strong>98% 감소</strong>해요. 실제로 입어보고 결정하는 것이 가장 확실한 방법이에요.
              </div>
            </div>
          </>
        )}

        {/* ── 주문 내역 ── */}
        {activeTab === '주문 내역' && (
          <div className="mp-card">
            <div className="mp-card-title">🛍️ 주문 내역</div>
            {orderHistory.map(order => (
              <div key={order.id} className="fit-card">
                <img className="fit-img" src={order.image} alt={order.product}/>
                <div className="fit-info">
                  <div className="fit-id">{order.id}</div>
                  <div className="fit-name">{order.product}</div>
                  <div className="fit-meta">
                    <span>{order.date}</span>
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
                    <span className="fit-status" style={{color:statusColor[order.status]||'#666'}}>{order.status}</span>
                    <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
                      <button onClick={() => showToast('반품 신청이 접수됐어요. 채널톡으로 안내드려요.')} style={{padding:'6px 12px',border:'1px solid #e8e8e8',background:'#fff',fontSize:'11px',cursor:'pointer',fontFamily:'inherit'}}>반품/교환</button>
                      <span className="fit-price">{order.price.toLocaleString()}원</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {orderHistory.length === 0 && (
              <div style={{textAlign:'center',padding:'40px 0',color:'#999',fontSize:'13px'}}>
                주문 내역이 없어요.<br/>
                <a href="/products/new" style={{color:'#C94E1A',fontWeight:500,textDecoration:'none'}}>쇼핑하러 가기 →</a>
              </div>
            )}
          </div>
        )}

        {/* ── 위디 이력 ── */}
        {activeTab === '위디 이력' && (
          <>
            <div className="mp-card">
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',borderBottom:'1px solid #f0f0f0',marginBottom:'16px'}}>
                {[{label:'총 적립',val:'1,638P',color:'#B08D57'},{label:'총 사용',val:'200P',color:'#999'},{label:'현재 잔액',val:'2,400P',color:'#C94E1A'}].map((item,i) => (
                  <div key={i} style={{padding:'14px',textAlign:'center',borderRight:i<2?'1px solid #f0f0f0':'none'}}>
                    <div style={{fontFamily:'Georgia,serif',fontSize:'20px',color:item.color,fontWeight:300,marginBottom:'3px'}}>{item.val}</div>
                    <div style={{fontSize:'10px',color:'#999'}}>{item.label}</div>
                  </div>
                ))}
              </div>

              {/* 필터 */}
              <div style={{display:'flex',gap:'6px',marginBottom:'16px'}}>
                {['전체','적립','사용'].map(f => (
                  <button key={f} onClick={() => setWithyFilter(f)}
                    style={{padding:'7px 14px',fontSize:'12px',border:`1px solid ${wityhFilter===f?'#111':'#e8e8e8'}`,background:wityhFilter===f?'#111':'#fff',color:wityhFilter===f?'#fff':'#999',cursor:'pointer',borderRadius:'20px',fontFamily:'inherit'}}>
                    {f}
                  </button>
                ))}
              </div>

              {filteredWithy.map((item,i) => (
                <div key={i} className="withy-row">
                  <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                    <div className="wr-icon" style={{background:item.type==='earn'?'#fdf6e8':'#f5f5f5'}}>
                      {item.type==='earn'?'💛':'💸'}
                    </div>
                    <div>
                      <div className="wr-desc">{item.desc}</div>
                      <div className="wr-date">{item.date}</div>
                    </div>
                  </div>
                  <div className="wr-amount" style={{color:item.type==='earn'?'#B08D57':'#999'}}>
                    {item.amount}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── 나의 활동 ── */}
        {activeTab === '나의 활동' && (
          <>
            <div className="mp-card">
              <div className="mp-card-title">🏅 나의 뱃지</div>
              <div className="badge-grid">
                {badges.map((b,i) => (
                  <div key={i} className={`badge-item ${b.earned?'on':''}`}>
                    <div className="badge-icon" style={{opacity:b.earned?1:.3}}>{b.icon}</div>
                    <div className="badge-label" style={{color:b.earned?'#333':'#ccc'}}>{b.label}</div>
                    <div className="badge-date">{b.earned?b.date:'미달성'}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mp-card">
              <div className="mp-card-title">📊 활동 요약</div>
              {[
                {icon:'✍️',label:'작성한 글',val:'3개',sub:'커뮤니티'},
                {icon:'💬',label:'작성한 댓글',val:'12개',sub:'커뮤니티 + 매거진'},
                {icon:'❤️',label:'좋아요',val:'28개',sub:'매거진 + 커뮤니티'},
                {icon:'⭐',label:'작성한 리뷰',val:'2개',sub:'상품 리뷰'},
                {icon:'🔗',label:'공유',val:'6회',sub:'매거진 + 커뮤니티'},
              ].map((item,i) => (
                <div key={i} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 0',borderBottom:'1px solid #f5f5f5'}}>
                  <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                    <span style={{fontSize:'18px'}}>{item.icon}</span>
                    <div>
                      <div style={{fontSize:'13px',color:'#333'}}>{item.label}</div>
                      <div style={{fontSize:'11px',color:'#ccc'}}>{item.sub}</div>
                    </div>
                  </div>
                  <div style={{fontSize:'15px',fontWeight:600,color:'#111'}}>{item.val}</div>
                </div>
              ))}
            </div>

            <div className="mp-card" style={{textAlign:'center',padding:'28px'}}>
              <div style={{fontSize:'32px',marginBottom:'8px'}}>💛</div>
              <div style={{fontSize:'15px',fontWeight:500,marginBottom:'6px'}}>커뮤니티에서 더 많은 위디를 모으세요</div>
              <div style={{fontSize:'12px',color:'#999',marginBottom:'20px'}}>피팅 후기 작성 시 추가 50P 적립</div>
              <a href="/community" style={{display:'inline-block',padding:'12px 28px',background:'#C94E1A',color:'#fff',fontSize:'13px',fontWeight:500,textDecoration:'none'}}>
                커뮤니티 가기
              </a>
            </div>
          </>
        )}

        {/* ── 설정 ── */}
        {activeTab === '설정' && (
          <>
            <div className="mp-card">
              <div className="mp-card-title">
                👤 기본 정보
                <button onClick={() => { if(editMode) showToast('✓ 저장됐어요'); setEditMode(!editMode) }}
                  style={{padding:'7px 14px',border:'1px solid #111',background:editMode?'#111':'#fff',color:editMode?'#fff':'#111',fontSize:'12px',cursor:'pointer',fontFamily:'inherit'}}>
                  {editMode ? '저장' : '수정'}
                </button>
              </div>
              {[
                {label:'이름', key:'name', type:'text'},
                {label:'이메일', key:'email', type:'email'},
                {label:'휴대폰', key:'phone', type:'tel'},
              ].map(field => (
                <div key={field.key} style={{marginBottom:'14px'}}>
                  <label className="mp-label">{field.label}</label>
                  <input className="mp-input" type={field.type} disabled={!editMode}
                    value={formData[field.key]} onChange={e => setFormData({...formData,[field.key]:e.target.value})}/>
                </div>
              ))}
              <div style={{marginBottom:'14px'}}>
                <label className="mp-label">생년월일</label>
                <input className="mp-input" type="text" disabled value="1990년 8월 15일"/>
              </div>
              <div>
                <label className="mp-label">성별</label>
                <input className="mp-input" type="text" disabled value="여성"/>
              </div>
            </div>

            <div className="mp-card">
              <div className="mp-card-title">📅 구독 멤버십</div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'14px',background:'#f9f7f4',marginBottom:'14px'}}>
                <div>
                  <div style={{fontSize:'14px',fontWeight:500,color:'#111',marginBottom:'3px'}}>STANDARD 구독중</div>
                  <div style={{fontSize:'12px',color:'#999'}}>월 9,900원 · 다음 결제일 2026.06.01</div>
                </div>
                <span style={{background:'#B08D57',color:'#fff',fontSize:'10px',fontWeight:700,padding:'4px 10px'}}>이용중</span>
              </div>
              <div style={{display:'flex',gap:'8px'}}>
                <button onClick={() => showToast('PREMIUM으로 업그레이드되었어요!')} style={{flex:1,padding:'11px',border:'1px solid #C94E1A',color:'#C94E1A',background:'#fff',fontSize:'12px',cursor:'pointer',fontFamily:'inherit'}}>PREMIUM 업그레이드</button>
                <button onClick={() => showToast('구독 해지 신청이 접수됐어요')} style={{flex:1,padding:'11px',border:'1px solid #e8e8e8',color:'#999',background:'#fff',fontSize:'12px',cursor:'pointer',fontFamily:'inherit'}}>구독 해지</button>
              </div>
            </div>

            <div className="mp-card">
              <div className="mp-card-title">🔔 알림 설정</div>
              {[
                {label:'피팅박스 배송 알림', sub:'배송 현황을 카카오 알림톡으로', on:true},
                {label:'위디 적립 알림', sub:'포인트 적립 시 알림', on:true},
                {label:'신상품 알림', sub:'새 상품 입고 시 알림', on:false},
                {label:'마케팅 수신', sub:'이벤트·프로모션 정보', on:true},
              ].map((item,i) => (
                <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'13px 0',borderBottom:'1px solid #f5f5f5'}}>
                  <div>
                    <div style={{fontSize:'13px',color:'#333',marginBottom:'2px'}}>{item.label}</div>
                    <div style={{fontSize:'11px',color:'#ccc'}}>{item.sub}</div>
                  </div>
                  <div style={{width:'40px',height:'22px',borderRadius:'11px',background:item.on?'#111':'#ddd',position:'relative',cursor:'pointer',transition:'background .2s'}}
                    onClick={() => showToast('알림 설정이 변경됐어요')}>
                    <div style={{width:'18px',height:'18px',borderRadius:'50%',background:'#fff',position:'absolute',top:'2px',left:item.on?'20px':'2px',transition:'left .2s',boxShadow:'0 1px 3px rgba(0,0,0,.2)'}}/>
                  </div>
                </div>
              ))}
            </div>

            <div className="mp-card">
              <div className="mp-card-title">🔐 보안</div>
              {[
                {label:'비밀번호 변경', icon:'→'},
                {label:'로그인 기기 관리', icon:'→'},
                {label:'2단계 인증 설정', icon:'→'},
              ].map((item,i) => (
                <div key={i} onClick={() => showToast(`${item.label} 페이지로 이동해요`)}
                  style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'14px 0',borderBottom:'1px solid #f5f5f5',cursor:'pointer',fontSize:'13px',color:'#333'}}>
                  {item.label}
                  <span style={{color:'#ccc'}}>{item.icon}</span>
                </div>
              ))}
            </div>

            <div className="mp-card">
              <div className="mp-card-title" style={{color:'#e74c3c'}}>계정 관리</div>
              <button onClick={() => showToast('로그아웃 됐어요')} style={{width:'100%',padding:'12px',border:'1px solid #e8e8e8',background:'#fff',fontSize:'13px',cursor:'pointer',fontFamily:'inherit',marginBottom:'8px',color:'#666'}}>
                로그아웃
              </button>
              <button onClick={() => showToast('탈퇴 신청 전 고객센터로 문의해주세요')} style={{width:'100%',padding:'12px',border:'1px solid #fee',background:'#fff',fontSize:'13px',cursor:'pointer',fontFamily:'inherit',color:'#e74c3c'}}>
                회원 탈퇴
              </button>
            </div>
          </>
        )}
      </div>

      {/* 토스트 */}
      <div style={{position:'fixed',bottom:'24px',left:'50%',transform:`translateX(-50%) translateY(${toast?'0':'60px'})`,background:'#111',color:'#fff',padding:'12px 20px',fontSize:'13px',zIndex:2000,transition:'transform .3s',whiteSpace:'nowrap',pointerEvents:'none'}}>
        {toast}
      </div>
    </main>
  )
}
