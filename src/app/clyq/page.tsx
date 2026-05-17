// @ts-nocheck
'use client'
import { useState } from 'react'

const kpis = [
  { label:'오늘 피팅 신청',  value:'18',         unit:'건', sub:'+8% 어제 대비',   color:'#2563eb' },
  { label:'현재 피팅 진행중',value:'74',         unit:'건', sub:'전체 브랜드 합산', color:'#C94E1A' },
  { label:'오늘 반납 완료',  value:'12',         unit:'건', sub:'검수 대기 5건',    color:'#16a34a' },
  { label:'이달 전환율',     value:'54',         unit:'%',  sub:'목표 60% 대비',   color:'#7c3aed' },
  { label:'이달 매출',       value:'46,820,000', unit:'원', sub:'위디 발행 +24.8M', color:'#0891b2' },
  { label:'훼손 패널티',     value:'3',          unit:'건', sub:'청구 대기 2건',    color:'#dc2626' },
]

const pipeline = [
  { stage:'신청 대기',   count:6,  color:'#2563eb', total:74 },
  { stage:'배송중',      count:18, color:'#0891b2', total:74 },
  { stage:'피팅중',      count:24, color:'#C94E1A', total:74 },
  { stage:'반납 수거중', count:9,  color:'#ca8a04', total:74 },
  { stage:'검수중',      count:5,  color:'#7c3aed', total:74 },
  { stage:'오늘 완료',   count:12, color:'#16a34a', total:74 },
]

const alerts = [
  { type:'반납 초과', text:'FIT-0510-015  울 블레이저 세트업 — 김** (1일 초과)', color:'#dc2626', bg:'#fff1f0' },
  { type:'반납 초과', text:'FIT-0509-031  실크 블라우스 — 윤** (오늘 마감)', color:'#dc2626', bg:'#fff1f0' },
  { type:'패널티',    text:'FIT-0507-024  캐시미어 니트 — 한** 훼손 확인, 배상 청구 대기', color:'#7c3aed', bg:'#faf5ff' },
  { type:'재고 부족', text:'MA-2026-JK-007  레더 재킷 피팅 재고 3개 이하 (MARCIA)', color:'#C94E1A', bg:'#fff7ed' },
  { type:'재고 부족', text:'MA-2026-BL-005  실크 블라우스 피팅 재고 0개 (MARCIA)', color:'#C94E1A', bg:'#fff7ed' },
]

const brands = [
  { name:'MARCIA',        products:4, fitting:6,  monthFit:31, converted:16, convRate:52, monthSales:12840000, status:'정상' },
  { name:'MATIN KIM',     products:3, fitting:5,  monthFit:24, converted:14, convRate:58, monthSales:9620000,  status:'정상' },
  { name:'EENK',          products:6, fitting:12, monthFit:41, converted:28, convRate:68, monthSales:5280000,  status:'재고부족' },
  { name:'D.POUND',       products:2, fitting:3,  monthFit:18, converted:8,  convRate:44, monthSales:4150000,  status:'정상' },
  { name:'ANDERSSONBELL', products:5, fitting:7,  monthFit:29, converted:17, convRate:59, monthSales:3960000,  status:'정상' },
  { name:'ANOTHER A',     products:3, fitting:4,  monthFit:15, converted:7,  convRate:47, monthSales:2730000,  status:'정상' },
  { name:'EIGHT',         products:2, fitting:2,  monthFit:11, converted:5,  convRate:45, monthSales:1980000,  status:'정상' },
  { name:'ADER ERROR',    products:4, fitting:9,  monthFit:22, converted:14, convRate:64, monthSales:6410000,  status:'패널티' },
]

const fittingList = [
  { id:'FIT-0510-018', brand:'MARCIA',        product:'오버핏 캐시미어 울 코트', customer:'이**', size:'M', stage:'검수 대기',   returnDue:'05-12', dDay:0,  alert:true  },
  { id:'FIT-0510-015', brand:'MARCIA',        product:'울 블레이저 세트업',      customer:'김**', size:'S', stage:'피팅중',      returnDue:'05-13', dDay:-1, alert:true  },
  { id:'FIT-0510-014', brand:'MATIN KIM',     product:'레더 재킷',               customer:'박**', size:'M', stage:'피팅중',      returnDue:'05-13', dDay:-2, alert:false },
  { id:'FIT-0510-013', brand:'EENK',          product:'울 블레이저',             customer:'최**', size:'L', stage:'배송중',      returnDue:'05-15', dDay:2,  alert:false },
  { id:'FIT-0510-012', brand:'ANDERSSONBELL', product:'오버사이즈 셔츠',         customer:'정**', size:'M', stage:'배송중',      returnDue:'05-15', dDay:2,  alert:false },
  { id:'FIT-0509-042', brand:'D.POUND',       product:'캐시미어 니트',           customer:'한**', size:'L', stage:'피팅중',      returnDue:'05-13', dDay:-2, alert:false },
  { id:'FIT-0509-039', brand:'ADER ERROR',    product:'그래픽 후드집업',         customer:'조**', size:'S', stage:'신청 대기',   returnDue:'05-14', dDay:1,  alert:false },
  { id:'FIT-0509-031', brand:'MARCIA',        product:'실크 블라우스',           customer:'윤**', size:'M', stage:'반납 수거중', returnDue:'05-11', dDay:-1, alert:true  },
]

const activity = [
  { type:'피팅박스', text:'FIT-0510-018  피팅 완료 → 검수 대기',            time:'10:24' },
  { type:'주문',     text:'ORD-0510-024  결제 완료 / MARCIA 캐시미어 코트', time:'10:18' },
  { type:'패널티',   text:'FIT-0509-012  훼손 패널티 청구 — 이**  32,000원', time:'09:55' },
  { type:'피팅박스', text:'FIT-0510-017  반납 완료 → 세탁 처리',            time:'09:40' },
  { type:'주문',     text:'ORD-0510-023  배송 완료 / MATIN KIM 레더재킷',   time:'09:22' },
  { type:'피팅박스', text:'FIT-0510-011  피팅 신청 — 최**  EENK 블레이저',  time:'08:44' },
  { type:'반납',     text:'FIT-0509-042  반납 D-1 알림 발송 — 박**',        time:'08:00' },
]

const stageStyle = {
  '신청 대기':   { bg:'#eff6ff', color:'#2563eb' },
  '배송중':      { bg:'#f0fdf4', color:'#16a34a' },
  '피팅중':      { bg:'#fff7ed', color:'#C94E1A' },
  '반납 수거중': { bg:'#fefce8', color:'#ca8a04' },
  '검수 대기':   { bg:'#faf5ff', color:'#7c3aed' },
  '검수중':      { bg:'#faf5ff', color:'#7c3aed' },
  '완료':        { bg:'#f0fdf4', color:'#16a34a' },
}

const activityColor = {
  '피팅박스': { bg:'#fff7ed', color:'#C94E1A' },
  '주문':     { bg:'#eff6ff', color:'#2563eb' },
  '패널티':   { bg:'#faf5ff', color:'#7c3aed' },
  '반납':     { bg:'#fefce8', color:'#ca8a04' },
  '신규':     { bg:'#f0fdf4', color:'#16a34a' },
}

const brandStatusStyle = {
  '정상':   { color:'#16a34a' },
  '재고부족':{ color:'#C94E1A' },
  '패널티': { color:'#dc2626' },
}

const stageOptions = ['전체', ...pipeline.map(p => p.stage)]

export default function ClyqDashboard() {
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [stageFilter, setStageFilter]     = useState('전체')

  const filteredFitting = stageFilter === '전체'
    ? fittingList
    : fittingList.filter(f => f.stage === stageFilter)

  const brandDetail = brands.find(b => b.name === selectedBrand)
  const brandFitting = fittingList.filter(f => f.brand === selectedBrand)

  return (
    <>
      <style>{`
        .cqd-wrap { width:100%; }

        /* KPI */
        .cqd-kpi-grid { display:grid; grid-template-columns:repeat(6,1fr); gap:12px; margin-bottom:20px; }
        .cqd-kpi { background:#fff; border:1px solid #e8e8eb; border-radius:8px; padding:16px 18px; }
        .cqd-kpi-label { font-size:11px; color:#999; margin-bottom:8px; }
        .cqd-kpi-val { font-size:26px; font-weight:800; letter-spacing:-0.5px; }
        .cqd-kpi-unit { font-size:12px; color:#aaa; font-weight:400; margin-left:2px; }
        .cqd-kpi-sub { font-size:11px; color:#bbb; margin-top:4px; }

        /* 파이프라인 */
        .cqd-pipe { background:#fff; border:1px solid #e8e8eb; border-radius:8px; padding:20px 24px; margin-bottom:20px; }
        .cqd-pipe-grid { display:grid; grid-template-columns:repeat(6,1fr); gap:0; }
        .cqd-pipe-item { text-align:center; padding:12px 8px; position:relative; }
        .cqd-pipe-item:not(:last-child)::after { content:''; position:absolute; right:0; top:20px; width:1px; height:28px; background:#e8e8eb; }
        .cqd-pipe-num { font-size:34px; font-weight:800; margin-bottom:4px; }
        .cqd-pipe-label { font-size:11px; color:#888; }
        .cqd-pipe-bar { height:4px; border-radius:2px; margin-top:10px; }

        /* 알림 */
        .cqd-alert { background:#fff; border:1px solid #e8e8eb; border-radius:8px; margin-bottom:20px; overflow:hidden; }
        .cqd-alert-head { padding:13px 20px; border-bottom:1px solid #f0f0f2; display:flex; align-items:center; gap:8px; }
        .cqd-alert-cnt { background:#dc2626; color:#fff; font-size:10px; font-weight:700; padding:2px 7px; border-radius:10px; }
        .cqd-alert-item { display:flex; align-items:center; gap:10px; padding:10px 20px; border-bottom:1px solid #f5f5f7; }
        .cqd-alert-item:last-child { border-bottom:none; }
        .cqd-alert-badge { font-size:10px; font-weight:700; padding:2px 8px; border-radius:3px; white-space:nowrap; flex-shrink:0; }

        /* 카드 */
        .cqd-card { background:#fff; border:1px solid #e8e8eb; border-radius:8px; overflow:hidden; }
        .cqd-card-head { padding:13px 20px; border-bottom:1px solid #f0f0f2; display:flex; align-items:center; justify-content:space-between; }
        .cqd-card-title { font-size:14px; font-weight:700; color:#1a1a2e; }
        .cqd-link { font-size:12px; color:#C94E1A; font-weight:600; background:none; border:none; cursor:pointer; font-family:inherit; padding:0; }

        /* 테이블 */
        .cqd-tbl { width:100%; border-collapse:collapse; font-size:13px; }
        .cqd-tbl th { padding:9px 14px; text-align:left; font-size:11px; font-weight:600; color:#999; background:#fafafa; border-bottom:1px solid #f0f0f2; white-space:nowrap; }
        .cqd-tbl td { padding:12px 14px; border-bottom:1px solid #f5f5f7; color:#333; vertical-align:middle; white-space:nowrap; }
        .cqd-tbl tr:last-child td { border-bottom:none; }
        .cqd-tbl tbody tr { cursor:pointer; }
        .cqd-tbl tbody tr:hover td { background:#fff8f5; }
        .cqd-tbl tbody tr.sel td { background:#fff3ee; }
        .cqd-badge { display:inline-block; padding:3px 9px; border-radius:4px; font-size:11px; font-weight:600; }
        .cqd-bar-bg { width:60px; height:5px; background:#f0f0f2; border-radius:3px; display:inline-block; vertical-align:middle; margin-right:6px; }
        .cqd-bar-fill { height:5px; border-radius:3px; background:#C94E1A; }

        /* 2단 레이아웃 */
        .cqd-two { display:grid; grid-template-columns:1fr 340px; gap:16px; margin-bottom:20px; }

        /* 피드 */
        .cqd-feed-item { display:flex; align-items:flex-start; gap:10px; padding:10px 18px; border-bottom:1px solid #f5f5f7; }
        .cqd-feed-item:last-child { border-bottom:none; }
        .cqd-feed-badge { font-size:9px; font-weight:700; padding:2px 6px; border-radius:3px; white-space:nowrap; flex-shrink:0; margin-top:2px; }
        .cqd-feed-text { font-size:12px; color:#333; line-height:1.5; flex:1; }
        .cqd-feed-time { font-size:11px; color:#bbb; flex-shrink:0; }

        /* 스테이지 필터 */
        .cqd-sf-bar { display:flex; gap:6px; flex-wrap:wrap; padding:12px 20px; border-bottom:1px solid #f0f0f2; }
        .cqd-sf-btn { padding:4px 12px; border-radius:20px; border:1px solid #d8d8dc; background:#fff; font-size:11px; cursor:pointer; color:#666; font-family:inherit; }
        .cqd-sf-btn.on { background:#1a1a2e; border-color:#1a1a2e; color:#fff; font-weight:600; }

        /* 브랜드 상세 패널 */
        .cqd-brand-panel { background:#fff; border:1px solid #e8e8eb; border-radius:8px; margin-bottom:20px; overflow:hidden; }
        .cqd-brand-panel-head { padding:16px 20px; background:#1a1a2e; display:flex; align-items:center; justify-content:space-between; }
        .cqd-brand-stat-grid { display:grid; grid-template-columns:repeat(5,1fr); border-bottom:1px solid #f0f0f2; }
        .cqd-brand-stat { padding:18px 20px; border-right:1px solid #f0f0f2; text-align:center; }
        .cqd-brand-stat:last-child { border-right:none; }

        @media (max-width:1400px) { .cqd-kpi-grid { grid-template-columns:repeat(3,1fr); } }
        @media (max-width:1200px) {
          .cqd-pipe-grid { grid-template-columns:repeat(3,1fr); }
          .cqd-two { grid-template-columns:1fr; }
          .cqd-brand-stat-grid { grid-template-columns:repeat(3,1fr); }
        }
        @media (max-width:768px) {
          .cqd-kpi-grid { grid-template-columns:repeat(2,1fr); }
          .cqd-pipe-grid { grid-template-columns:repeat(2,1fr); }
        }
      `}</style>

      <div className="cqd-wrap">

        {/* 헤더 */}
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:'20px', flexWrap:'wrap', gap:'10px' }}>
          <div>
            <div style={{ fontSize:'11px', color:'#aaa', marginBottom:'4px' }}>오전 10시 기준 · 자동 갱신</div>
            <h1 style={{ fontSize:'22px', fontWeight:800, color:'#1a1a2e', margin:0 }}>피팅박스 대시보드</h1>
          </div>
          <div style={{ display:'flex', gap:'8px' }}>
            <button style={{ padding:'9px 18px', background:'#fff', color:'#555', border:'1px solid #d8d8dc', borderRadius:'5px', fontSize:'13px', cursor:'pointer', fontFamily:'inherit' }}>
              리포트 다운로드
            </button>
            <button style={{ padding:'9px 18px', background:'#C94E1A', color:'#fff', border:'none', borderRadius:'5px', fontSize:'13px', fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}
              onClick={() => location.href='/clyq/fitting/products'}>
              피팅 제품 관리
            </button>
          </div>
        </div>

        {/* KPI */}
        <div className="cqd-kpi-grid">
          {kpis.map(k => (
            <div key={k.label} className="cqd-kpi">
              <div className="cqd-kpi-label">{k.label}</div>
              <div>
                <span className="cqd-kpi-val" style={{ color:k.color }}>{k.value}</span>
                <span className="cqd-kpi-unit">{k.unit}</span>
              </div>
              <div className="cqd-kpi-sub">{k.sub}</div>
            </div>
          ))}
        </div>

        {/* 피팅 파이프라인 */}
        <div className="cqd-pipe" style={{ marginBottom:'20px' }}>
          <div style={{ fontSize:'14px', fontWeight:700, color:'#1a1a2e', marginBottom:'16px' }}>
            피팅 단계별 현황
            <span style={{ fontSize:'12px', color:'#aaa', fontWeight:400, marginLeft:'8px' }}>전체 브랜드 실시간</span>
          </div>
          <div className="cqd-pipe-grid">
            {pipeline.map(p => (
              <div key={p.stage} className="cqd-pipe-item">
                <div className="cqd-pipe-num" style={{ color:p.color }}>{p.count}</div>
                <div className="cqd-pipe-label">{p.stage}</div>
                <div className="cqd-pipe-bar" style={{ background: p.color + '22' }}>
                  <div style={{ height:'4px', borderRadius:'2px', background:p.color, width: Math.round(p.count / p.total * 100) + '%' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 알림 */}
        <div className="cqd-alert">
          <div className="cqd-alert-head">
            <span style={{ fontSize:'14px', fontWeight:700, color:'#1a1a2e' }}>처리 필요 알림</span>
            <span className="cqd-alert-cnt">{alerts.length}</span>
          </div>
          {alerts.map((a, i) => (
            <div key={i} className="cqd-alert-item">
              <span className="cqd-alert-badge" style={{ background:a.bg, color:a.color }}>{a.type}</span>
              <span style={{ fontSize:'12px', color:'#333' }}>{a.text}</span>
              <button style={{ marginLeft:'auto', padding:'3px 10px', background:'#f5f5f7', border:'1px solid #e0e0e0', borderRadius:'3px', fontSize:'11px', cursor:'pointer', color:'#555', fontFamily:'inherit', flexShrink:0 }}>
                처리
              </button>
            </div>
          ))}
        </div>

        {/* 브랜드 목록 + 실시간 활동 */}
        <div className="cqd-two">

          {/* 브랜드 목록 */}
          <div className="cqd-card">
            <div className="cqd-card-head">
              <span className="cqd-card-title">브랜드별 피팅 현황</span>
              <span style={{ fontSize:'12px', color:'#aaa' }}>클릭 시 상세 보기</span>
            </div>
            <div style={{ overflowX:'auto' }}>
              <table className="cqd-tbl">
                <thead>
                  <tr>
                    <th>브랜드</th>
                    <th style={{ textAlign:'center' }}>등록 제품</th>
                    <th style={{ textAlign:'center' }}>피팅중</th>
                    <th style={{ textAlign:'center' }}>이달 피팅</th>
                    <th style={{ textAlign:'center' }}>전환율</th>
                    <th style={{ textAlign:'right' }}>이달 매출</th>
                    <th style={{ textAlign:'center' }}>상태</th>
                  </tr>
                </thead>
                <tbody>
                  {brands.map(b => (
                    <tr
                      key={b.name}
                      className={selectedBrand === b.name ? 'sel' : ''}
                      onClick={() => setSelectedBrand(selectedBrand === b.name ? null : b.name)}
                    >
                      <td style={{ fontWeight:700, color:'#1a1a2e' }}>{b.name}</td>
                      <td style={{ textAlign:'center', color:'#666' }}>{b.products}개</td>
                      <td style={{ textAlign:'center', fontWeight:700, color:'#C94E1A' }}>{b.fitting}건</td>
                      <td style={{ textAlign:'center', color:'#555' }}>{b.monthFit}건</td>
                      <td style={{ textAlign:'center' }}>
                        <div style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
                          <div className="cqd-bar-bg">
                            <div className="cqd-bar-fill" style={{ width: b.convRate + '%' }}></div>
                          </div>
                          <span style={{ fontSize:'12px', fontWeight:700, color: b.convRate >= 55 ? '#16a34a' : '#C94E1A' }}>
                            {b.convRate}%
                          </span>
                        </div>
                      </td>
                      <td style={{ textAlign:'right', fontWeight:600, color:'#1a1a2e' }}>
                        {b.monthSales.toLocaleString()}원
                      </td>
                      <td style={{ textAlign:'center' }}>
                        <span style={{ fontSize:'12px', fontWeight:700, ...brandStatusStyle[b.status] }}>
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 실시간 활동 */}
          <div className="cqd-card">
            <div className="cqd-card-head">
              <span className="cqd-card-title">실시간 활동</span>
              <button className="cqd-link">전체</button>
            </div>
            {activity.map((a, i) => {
              const ac = activityColor[a.type] || { bg:'#f5f5f7', color:'#666' }
              return (
                <div key={i} className="cqd-feed-item">
                  <span className="cqd-feed-badge" style={{ background:ac.bg, color:ac.color }}>{a.type}</span>
                  <span className="cqd-feed-text">{a.text}</span>
                  <span className="cqd-feed-time">{a.time}</span>
                </div>
              )
            })}
          </div>

        </div>

        {/* 브랜드 상세 패널 — 클릭 시 펼침 */}
        {brandDetail && (
          <div className="cqd-brand-panel">
            <div className="cqd-brand-panel-head">
              <div>
                <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)', marginBottom:'3px' }}>브랜드 상세 현황</div>
                <div style={{ fontSize:'18px', fontWeight:800, color:'#fff' }}>{brandDetail.name}</div>
              </div>
              <button
                onClick={() => setSelectedBrand(null)}
                style={{ background:'rgba(255,255,255,0.1)', border:'none', color:'#fff', padding:'5px 14px', borderRadius:'4px', cursor:'pointer', fontSize:'12px', fontFamily:'inherit' }}
              >
                닫기
              </button>
            </div>

            {/* 브랜드 KPI */}
            <div className="cqd-brand-stat-grid">
              {[
                { label:'등록 제품',   value: brandDetail.products + '개',                      color:'#1a1a2e' },
                { label:'현재 피팅중', value: brandDetail.fitting + '건',                        color:'#C94E1A' },
                { label:'이달 피팅',   value: brandDetail.monthFit + '건',                       color:'#2563eb' },
                { label:'이달 전환율', value: brandDetail.convRate + '%',                        color: brandDetail.convRate >= 55 ? '#16a34a' : '#C94E1A' },
                { label:'이달 매출',   value: brandDetail.monthSales.toLocaleString() + '원',    color:'#16a34a' },
              ].map(s => (
                <div key={s.label} className="cqd-brand-stat">
                  <div style={{ fontSize:'11px', color:'#999', marginBottom:'6px' }}>{s.label}</div>
                  <div style={{ fontSize:'20px', fontWeight:800, color:s.color }}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* 브랜드 피팅 목록 */}
            <div style={{ padding:'14px 20px', borderBottom:'1px solid #f0f0f2', fontSize:'13px', fontWeight:700, color:'#1a1a2e' }}>
              진행중인 피팅 ({brandFitting.length}건)
            </div>
            {brandFitting.length === 0 ? (
              <div style={{ padding:'32px', textAlign:'center', color:'#aaa', fontSize:'13px' }}>
                현재 진행중인 피팅이 없습니다.
              </div>
            ) : (
              <div style={{ overflowX:'auto' }}>
                <table className="cqd-tbl">
                  <thead>
                    <tr>
                      <th>피팅 ID</th>
                      <th>제품명</th>
                      <th style={{ textAlign:'center' }}>사이즈</th>
                      <th>고객</th>
                      <th style={{ textAlign:'center' }}>단계</th>
                      <th style={{ textAlign:'center' }}>반납 기한</th>
                      <th style={{ textAlign:'center' }}>D-Day</th>
                    </tr>
                  </thead>
                  <tbody>
                    {brandFitting.map(f => {
                      const ss = stageStyle[f.stage] || { bg:'#f5f5f7', color:'#666' }
                      const dDayLabel = f.dDay === 0 ? 'D-Day' : f.dDay > 0 ? 'D-' + f.dDay : '초과 ' + Math.abs(f.dDay) + '일'
                      const dDayColor = f.dDay < 0 ? '#dc2626' : f.dDay === 0 ? '#C94E1A' : '#555'
                      return (
                        <tr key={f.id}>
                          <td style={{ fontSize:'12px', color:'#888', fontFamily:'monospace' }}>{f.id}</td>
                          <td style={{ fontWeight:600, color:'#1a1a2e' }}>{f.product}</td>
                          <td style={{ textAlign:'center', color:'#666' }}>{f.size}</td>
                          <td style={{ fontWeight:500 }}>{f.customer}</td>
                          <td style={{ textAlign:'center' }}>
                            <span className="cqd-badge" style={{ background:ss.bg, color:ss.color }}>{f.stage}</span>
                          </td>
                          <td style={{ textAlign:'center', color:'#888', fontSize:'12px' }}>{f.returnDue}</td>
                          <td style={{ textAlign:'center', fontWeight:700, color:dDayColor }}>{dDayLabel}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* 전체 피팅 목록 */}
        <div className="cqd-card">
          <div className="cqd-card-head">
            <span className="cqd-card-title">전체 피팅 목록</span>
            <button className="cqd-link" onClick={() => location.href='/clyq/fitting'}>전체 보기</button>
          </div>

          <div className="cqd-sf-bar">
            {stageOptions.map(s => (
              <button
                key={s}
                className={stageFilter === s ? 'cqd-sf-btn on' : 'cqd-sf-btn'}
                onClick={() => setStageFilter(s)}
              >
                {s}
              </button>
            ))}
            <span style={{ fontSize:'12px', color:'#aaa', marginLeft:'auto', alignSelf:'center' }}>
              {filteredFitting.length}건
            </span>
          </div>

          <div style={{ overflowX:'auto' }}>
            <table className="cqd-tbl">
              <thead>
                <tr>
                  <th>피팅 ID</th>
                  <th>브랜드</th>
                  <th>제품명</th>
                  <th style={{ textAlign:'center' }}>사이즈</th>
                  <th>고객</th>
                  <th style={{ textAlign:'center' }}>단계</th>
                  <th style={{ textAlign:'center' }}>반납 기한</th>
                  <th style={{ textAlign:'center' }}>D-Day</th>
                </tr>
              </thead>
              <tbody>
                {filteredFitting.map(f => {
                  const ss = stageStyle[f.stage] || { bg:'#f5f5f7', color:'#666' }
                  const dDayLabel = f.dDay === 0 ? 'D-Day' : f.dDay > 0 ? 'D-' + f.dDay : '초과 ' + Math.abs(f.dDay) + '일'
                  const dDayColor = f.dDay < 0 ? '#dc2626' : f.dDay === 0 ? '#C94E1A' : '#555'
                  return (
                    <tr key={f.id}>
                      <td style={{ fontSize:'12px', color:'#888', fontFamily:'monospace' }}>{f.id}</td>
                      <td style={{ fontWeight:600, color:'#1a1a2e' }}>{f.brand}</td>
                      <td style={{ fontWeight:500 }}>{f.product}</td>
                      <td style={{ textAlign:'center', color:'#666' }}>{f.size}</td>
                      <td>{f.customer}</td>
                      <td style={{ textAlign:'center' }}>
                        <span className="cqd-badge" style={{ background:ss.bg, color:ss.color }}>{f.stage}</span>
                      </td>
                      <td style={{ textAlign:'center', color:'#888', fontSize:'12px' }}>{f.returnDue}</td>
                      <td style={{ textAlign:'center', fontWeight:700, color:dDayColor }}>{dDayLabel}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </>
  )
}
