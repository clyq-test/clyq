// @ts-nocheck
'use client'
import { useState } from 'react'

const todos = [
  { label:'신규 주문 확인', count:12, color:'#3b82f6', href:'/admin/orders/paid' },
  { label:'피팅 반납 검수', count:5, color:'#C94E1A', href:'/admin/fitting/inspection' },
  { label:'배송중 확인', count:28, color:'#8b5cf6', href:'/admin/orders/shipping' },
  { label:'취소/반품 처리', count:3, color:'#f59e0b', href:'/admin/orders/return' },
  { label:'훼손 패널티 처리', count:2, color:'#e74c3c', href:'/admin/fitting/penalty' },
  { label:'Q&A 미답변', count:8, color:'#10b981', href:'/admin/products/qna' },
  { label:'재고 부족 상품', count:47, color:'#6366f1', href:'/admin/products/stock' },
]

const stats = [
  { label:'오늘 주문', value:'24건', delta:'+12%', up:true },
  { label:'오늘 피팅 신청', value:'18건', delta:'+8%', up:true },
  { label:'반납 대기', value:'12건', delta:'-3%', up:false },
  { label:'오늘 매출', value:'8,240,000원', delta:'+22%', up:true },
]

const recentOrders = [
  { id:'ORD-2026-0510-0024', member:'김지연**', product:'마르시아 오버핏 캐시미어 울 코트', amount:'428,000', status:'결제완료', type:'일반' },
  { id:'FIT-2026-0510-0018', member:'박소연**', product:'EENK 셔링 미디 스커트', amount:'148,000', status:'피팅중', type:'피팅박스' },
  { id:'ORD-2026-0510-0023', member:'이민준**', product:'MATIN KIM 레더 재킷', amount:'578,000', status:'배송중', type:'일반' },
  { id:'FIT-2026-0510-0017', member:'최유리**', product:'ANDERSSONBELL 테일러드 재킷', amount:'318,000', status:'반납완료', type:'피팅박스' },
  { id:'ORD-2026-0510-0022', member:'강민수**', product:'MARCIA 울 팬츠', amount:'248,000', status:'배송완료', type:'일반' },
]

const fittingStatus = [
  { label:'신청 대기', count:6, color:'#f59e0b' },
  { label:'배송중', count:18, color:'#3b82f6' },
  { label:'피팅중', count:24, color:'#8b5cf6' },
  { label:'반납 수거중', count:9, color:'#C94E1A' },
  { label:'검수중', count:5, color:'#e74c3c' },
  { label:'완료', count:142, color:'#10b981' },
]

const notices = [
  { type:'긴급', text:'피팅박스 물류센터 2026.05.15 정기점검 예정', date:'05.10' },
  { type:'공지', text:'MARCIA F/W 신상품 입고 예정 (05.20)', date:'05.09' },
  { type:'공지', text:'위디 포인트 시스템 업데이트 안내', date:'05.08' },
  { type:'안내', text:'2026년 5월 정산 내역 확인 가능', date:'05.07' },
]

const statusColor = {
  '결제완료':'#3b82f6','피팅중':'#8b5cf6','배송중':'#C94E1A',
  '반납완료':'#10b981','배송완료':'#10b981','취소':'#e74c3c'
}

export default function AdminDashboard() {
  const [orderTab, setOrderTab] = useState('전체')

  return (
    <div>
      <style>{`
        .adm-page-title { font-size:22px; font-weight:700; color:#1a1a2e; margin-bottom:4px; }
        .adm-page-sub { font-size:13px; color:#999; margin-bottom:24px; }
        /* TO-DO */
        .todo-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:10px; margin-bottom:28px; }
        .todo-card { background:#fff; border:1px solid #e8e8eb; padding:16px 14px; cursor:pointer; transition:all 0.15s; border-radius:6px; }
        .todo-card:hover { box-shadow:0 2px 12px rgba(0,0,0,.08); transform:translateY(-1px); }
        .todo-card-label { font-size:11px; color:#888; margin-bottom:8px; font-weight:500; }
        .todo-card-count { font-size:28px; font-weight:700; line-height:1; }
        /* 통계 */
        .stat-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-bottom:24px; }
        .stat-card { background:#fff; border:1px solid #e8e8eb; padding:20px; border-radius:6px; }
        .stat-label { font-size:12px; color:#888; margin-bottom:8px; }
        .stat-value { font-size:20px; font-weight:700; color:#1a1a2e; margin-bottom:4px; }
        .stat-delta { font-size:11px; font-weight:500; }
        /* 카드 공통 */
        .dash-card { background:#fff; border:1px solid #e8e8eb; border-radius:6px; overflow:hidden; margin-bottom:16px; }
        .dash-card-header { padding:16px 20px; border-bottom:1px solid #f0f0f2; display:flex; justify-content:space-between; align-items:center; }
        .dash-card-title { font-size:14px; font-weight:700; color:#1a1a2e; }
        .dash-card-link { font-size:12px; color:#C94E1A; text-decoration:none; cursor:pointer; }
        .dash-card-body { padding:16px 20px; }
        /* 테이블 */
        .adm-table { width:100%; border-collapse:collapse; font-size:13px; }
        .adm-table th { padding:10px 14px; text-align:left; font-size:11px; font-weight:600; color:#888; background:#fafafa; border-bottom:1px solid #e8e8eb; }
        .adm-table td { padding:11px 14px; border-bottom:1px solid #f5f5f7; color:#333; }
        .adm-table tr:last-child td { border-bottom:none; }
        .adm-table tr:hover td { background:#fafffe; }
        .status-badge { display:inline-block; font-size:10px; font-weight:600; padding:2px 8px; border-radius:20px; }
        .type-badge { font-size:10px; padding:2px 7px; border-radius:3px; }
        /* 탭 */
        .dash-tabs { display:flex; gap:0; border-bottom:1px solid #f0f0f2; padding:0 20px; }
        .dash-tab { padding:11px 16px; font-size:12px; font-weight:500; color:#999; border:none; background:none; cursor:pointer; border-bottom:2px solid transparent; font-family:inherit; }
        .dash-tab.on { color:#C94E1A; border-bottom-color:#C94E1A; }
        /* 피팅 현황 바 */
        .fit-bar { display:flex; gap:10px; flex-wrap:wrap; }
        .fit-bar-item { flex:1; min-width:80px; background:#fafafa; border:1px solid #e8e8eb; border-radius:6px; padding:14px; text-align:center; }
        .fit-bar-count { font-size:24px; font-weight:700; margin-bottom:4px; }
        .fit-bar-label { font-size:11px; color:#888; }
        /* 공지 */
        .notice-item { display:flex; align-items:center; gap:10px; padding:10px 0; border-bottom:1px solid #f5f5f7; font-size:13px; }
        .notice-item:last-child { border-bottom:none; }
        .notice-type { font-size:10px; font-weight:700; padding:2px 7px; border-radius:3px; flex-shrink:0; }
        /* 2컬럼 그리드 */
        .dash-grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .dash-grid-3 { display:grid; grid-template-columns:2fr 1fr; gap:16px; }

        @media (max-width:1200px) {
          .todo-grid { grid-template-columns:repeat(4,1fr); }
          .stat-grid { grid-template-columns:repeat(2,1fr); }
        }
        @media (max-width:768px) {
          .todo-grid { grid-template-columns:repeat(2,1fr); }
          .stat-grid { grid-template-columns:1fr 1fr; }
          .dash-grid-2 { grid-template-columns:1fr; }
          .dash-grid-3 { grid-template-columns:1fr; }
          .fit-bar-item { min-width:calc(50% - 10px); }
        }
      `}</style>

      {/* 페이지 제목 */}
      <div className="adm-page-title">
        {new Date().toLocaleDateString('ko-KR', {month:'long', day:'numeric'})} 대시보드
      </div>
      <div className="adm-page-sub">CLYQ 관리자 콘솔 · 오늘 오전 10시 기준</div>

      {/* TO-DO 카드 */}
      <div className="todo-grid">
        {todos.map(t => (
          <a key={t.label} href={t.href} style={{textDecoration:'none'}} className="todo-card">
            <div className="todo-card-label">{t.label}</div>
            <div className="todo-card-count" style={{color:t.count>0?t.color:'#ccc'}}>{t.count}</div>
          </a>
        ))}
      </div>

      {/* 통계 */}
      <div className="stat-grid">
        {stats.map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-delta" style={{color:s.up?'#10b981':'#e74c3c'}}>
              {s.up?'▲':'▼'} {s.delta} 어제 대비
            </div>
          </div>
        ))}
      </div>

      {/* 피팅박스 현황 */}
      <div className="dash-card">
        <div className="dash-card-header">
          <div className="dash-card-title">📦 피팅박스 현황</div>
          <a href="/admin/fitting" className="dash-card-link">전체 보기 ›</a>
        </div>
        <div className="dash-card-body">
          <div className="fit-bar">
            {fittingStatus.map(f => (
              <div key={f.label} className="fit-bar-item">
                <div className="fit-bar-count" style={{color:f.color}}>{f.count}</div>
                <div className="fit-bar-label">{f.label}</div>
              </div>
            ))}
          </div>
          <div style={{marginTop:'14px',padding:'10px 14px',background:'#fff5f2',borderRadius:'4px',fontSize:'12px',color:'#C94E1A',fontWeight:500}}>
            ⚠ 반납 검수 대기 5건 · 훼손 패널티 처리 필요 2건
          </div>
        </div>
      </div>

      {/* 최근 주문 + 공지사항 */}
      <div className="dash-grid-3">
        {/* 최근 주문 */}
        <div className="dash-card">
          <div className="dash-card-header">
            <div className="dash-card-title">최근 주문 · 피팅 내역</div>
            <a href="/admin/orders" className="dash-card-link">전체 보기 ›</a>
          </div>
          <div className="dash-tabs">
            {['전체','일반구매','피팅박스'].map(t => (
              <button key={t} className={`dash-tab ${orderTab===t?'on':''}`} onClick={() => setOrderTab(t)}>{t}</button>
            ))}
          </div>
          <div style={{overflowX:'auto'}}>
            <table className="adm-table">
              <thead>
                <tr>
                  <th>주문번호</th>
                  <th>회원</th>
                  <th>상품</th>
                  <th>금액</th>
                  <th>상태</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders
                  .filter(o => orderTab==='전체' || (orderTab==='피팅박스'?o.type==='피팅박스':o.type==='일반'))
                  .map(order => (
                  <tr key={order.id}>
                    <td>
                      <div style={{fontSize:'11px',color:'#999'}}>{order.id}</div>
                      <span className="type-badge" style={{background:order.type==='피팅박스'?'#fff5f2':'#f0f4ff',color:order.type==='피팅박스'?'#C94E1A':'#3b82f6',marginTop:'2px',display:'inline-block'}}>
                        {order.type}
                      </span>
                    </td>
                    <td style={{color:'#555'}}>{order.member}</td>
                    <td style={{maxWidth:'140px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{order.product}</td>
                    <td style={{fontWeight:500}}>{order.amount}원</td>
                    <td>
                      <span className="status-badge"
                        style={{background:(statusColor[order.status]||'#ccc')+'22',color:statusColor[order.status]||'#ccc'}}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 공지사항 + 발생 정산 */}
        <div>
          <div className="dash-card">
            <div className="dash-card-header">
              <div className="dash-card-title">공지사항</div>
            </div>
            <div className="dash-card-body" style={{padding:'12px 20px'}}>
              {notices.map((n,i) => (
                <div key={i} className="notice-item">
                  <span className="notice-type"
                    style={{background:n.type==='긴급'?'#e74c3c':n.type==='공지'?'#3b82f6':'#6b7280',color:'#fff'}}>
                    {n.type}
                  </span>
                  <span style={{flex:1,color:'#333',lineHeight:1.4}}>{n.text}</span>
                  <span style={{fontSize:'11px',color:'#ccc',flexShrink:0}}>{n.date}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="dash-card">
            <div className="dash-card-header">
              <div className="dash-card-title">이번달 정산</div>
              <a href="/admin/settlement" className="dash-card-link">자세히 ›</a>
            </div>
            <div className="dash-card-body">
              {[
                {label:'발생 매출', value:'42,680,000원'},
                {label:'피팅박스 수익', value:'3,240,000원'},
                {label:'위디 사용액', value:'1,180,000원'},
                {label:'패널티 징수', value:'280,000원'},
              ].map(item => (
                <div key={item.label} style={{display:'flex',justifyContent:'space-between',padding:'9px 0',borderBottom:'1px solid #f5f5f7',fontSize:'13px'}}>
                  <span style={{color:'#888'}}>{item.label}</span>
                  <span style={{fontWeight:600,color:'#1a1a2e'}}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 처리 현황 요약 */}
      <div className="dash-grid-2">
        <div className="dash-card">
          <div className="dash-card-header">
            <div className="dash-card-title">위디 포인트 현황</div>
            <a href="/admin/members/withy" className="dash-card-link">상세 ›</a>
          </div>
          <div className="dash-card-body">
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'0',textAlign:'center'}}>
              {[
                {label:'오늘 적립', value:'+12,400P', color:'#B08D57'},
                {label:'오늘 사용', value:'-4,200P', color:'#999'},
                {label:'총 발행 잔액', value:'24,800,000P', color:'#1a1a2e'},
              ].map((item,i) => (
                <div key={i} style={{padding:'12px',borderRight:i<2?'1px solid #f0f0f2':'none'}}>
                  <div style={{fontSize:'14px',fontWeight:700,color:item.color,marginBottom:'4px'}}>{item.value}</div>
                  <div style={{fontSize:'11px',color:'#888'}}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="dash-card">
          <div className="dash-card-header">
            <div className="dash-card-title">회원 현황</div>
            <a href="/admin/members" className="dash-card-link">상세 ›</a>
          </div>
          <div className="dash-card-body">
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'0',textAlign:'center'}}>
              {[
                {label:'전체 회원', value:'1,284명'},
                {label:'오늘 가입', value:'12명'},
                {label:'오늘 활성', value:'342명'},
              ].map((item,i) => (
                <div key={i} style={{padding:'12px',borderRight:i<2?'1px solid #f0f0f2':'none'}}>
                  <div style={{fontSize:'18px',fontWeight:700,color:'#1a1a2e',marginBottom:'4px'}}>{item.value}</div>
                  <div style={{fontSize:'11px',color:'#888'}}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
