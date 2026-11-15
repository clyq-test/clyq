// @ts-nocheck
'use client'
import { useState } from 'react'
import { useOrders, useKV, won, DONE } from '../lib/orders'
import { fitRows, dLabel, useBrandStats, ACTIVE, isPenalty, isThisMonth, isToday } from '../lib/hq'

const stageOptions = ['전체', ...ACTIVE]

const stageStyle = {
  '신청 대기':   { bg:'#f4f4f2', color:'#555' },
  '배송중':      { bg:'#eef4f0', color:'#3D6A4F' },
  '피팅중':      { bg:'#f4f4f2', color:'#111' },
  '반납 수거중': { bg:'#f4f4f2', color:'#8a6d1f' },
  '검수 대기':   { bg:'#f4f4f2', color:'#555' },
  '검수중':      { bg:'#f4f4f2', color:'#555' },
  '완료':        { bg:'#eef4f0', color:'#3D6A4F' },
  '반납 완료':   { bg:'#f4f4f2', color:'#555' },
  '구매 전환':   { bg:'#eef4f0', color:'#3D6A4F' },
  '훼손 패널티': { bg:'#fbeeed', color:'#b3261e' },
}

const activityColor = {
  '피팅박스': { bg:'#f4f4f2', color:'#111' },
  '주문':     { bg:'#f4f4f2', color:'#555' },
  '패널티':   { bg:'#f4f4f2', color:'#555' },
  '반납':     { bg:'#f4f4f2', color:'#8a6d1f' },
  '신규':     { bg:'#eef4f0', color:'#3D6A4F' },
}

const brandStatusStyle = {
  '정상':   { color:'#3D6A4F' },
  '재고부족':{ color:'#111' },
  '패널티': { color:'#b3261e' },
}

export default function ClyqDashboard() {
  const [realOrders] = useOrders()
  const [log] = useKV('clyq_log', [])
  const brands = useBrandStats()
  const newN = realOrders.filter(o => ['주문접수', '신청접수'].includes(o.status)).length
  const shipN = realOrders.filter(o => ['상품준비', '발송준비'].includes(o.status)).length
  const claimN = realOrders.reduce((n, o) => n + (o.claims || []).filter(c => c.status === '접수' || c.status === '처리중').length, 0)
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [stageFilter, setStageFilter]     = useState('전체')

  // ── 모든 수치는 이 브라우저에 쌓인 실제 주문에서 계산합니다 ──
  const fits = fitRows(realOrders)
  const fittingList = fits.filter(f => ACTIVE.includes(f.stage)).map(f => ({ ...f, returnDue: f.returnDue ? f.returnDue.slice(5) : '-' }))
  const monthFitOrders = realOrders.filter(o => o.kind === 'fitting' && isThisMonth(o.createdAt))
  const decided = monthFitOrders.filter(o => ['구매확정', '반납완료'].includes(o.status))
  const conv = decided.length ? Math.round(decided.filter(o => o.status === '구매확정').length / decided.length * 100) : null
  const monthSales = realOrders.filter(o => DONE.includes(o.status) && isThisMonth(o.doneAt || o.createdAt)).reduce((n, o) => n + o.total, 0)
  const pens = realOrders.filter(isPenalty)
  const pendingPen = pens.filter(o => o.penalty.status === '청구 대기').length
  const doneToday = realOrders.filter(o => o.kind === 'fitting' && ((o.inspect && isToday(o.inspect.at)) || (o.status === '구매확정' && isToday(o.doneAt)))).length
  const waitInspect = fits.filter(f => f.stage === '검수 대기').length
  const kpis = [
    { label:'오늘 피팅 신청',   value: String(realOrders.filter(o => o.kind === 'fitting' && isToday(o.createdAt)).length), unit:'건', sub:`전체 ${fits.length}건`, color:'#555' },
    { label:'현재 피팅 진행중', value: String(fittingList.length), unit:'건', sub:'신청~검수 진행 합산', color:'#111' },
    { label:'오늘 완료',        value: String(doneToday), unit:'건', sub:`검수 대기 ${waitInspect}건`, color:'#3D6A4F' },
    { label:'이달 전환율',      value: conv == null ? '-' : String(conv), unit: conv == null ? '' : '%', sub: conv == null ? '이달 완료된 피팅 없음' : `완료 ${decided.length}건 중 구매확정`, color:'#555' },
    { label:'이달 매출',        value: monthSales.toLocaleString(), unit:'원', sub:'배송완료·구매확정 기준', color:'#555' },
    { label:'훼손 패널티',      value: String(pens.length), unit:'건', sub:`청구 대기 ${pendingPen}건`, color:'#b3261e' },
  ]
  const pcount = st => fittingList.filter(f => f.stage === st).length
  const ptotal = Math.max(1, fittingList.length)
  const pipeline = [
    { stage:'신청 대기', color:'#555' }, { stage:'배송중', color:'#555' }, { stage:'피팅중', color:'#111' }, { stage:'반납 수거중', color:'#8a6d1f' }, { stage:'검수 대기', color:'#555' },
  ].map(p => ({ ...p, count: pcount(p.stage), total: ptotal })).concat([{ stage:'오늘 완료', count: doneToday, color:'#3D6A4F', total: ptotal }])
  const alerts = [
    ...fits.filter(f => f.overdue).map(f => ({ type:'반납 초과', text:`${f.id}  ${f.product} — ${f.customer} (${dLabel(f.dDay)})`, color:'#b3261e', bg:'#fbeeed' })),
    ...pens.filter(o => o.penalty.status === '청구 대기').map(o => ({ type:'패널티', text:`${o.id}  ${o.items[0].name} — ${o.penalty.damageType} 확인, 청구 대기 ${o.penalty.amount.toLocaleString()}원`, color:'#555', bg:'#f4f4f2' })),
    ...(waitInspect ? [{ type:'검수', text:`검수 대기 ${waitInspect}건 — 검수 화면에서 결과를 입력해 주세요`, color:'#111', bg:'#f4f4f2' }] : []),
  ]
  const typeOf = t => /^FIT-/.test(t) ? '피팅박스' : /^ORD-/.test(t) ? '주문' : /패널티/.test(t) ? '패널티' : /회원 가입/.test(t) ? '신규' : '주문'
  const hm = iso => { const d = new Date(iso); return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0') }
  const activity = (log || []).slice(0, 7).map(l => ({ type: typeOf(l.text), text: l.text, time: hm(l.at) }))

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
        .cqd-kpi { background:#fff; border:1px solid #e6e6e3; border-radius:6px; padding:16px 18px; }
        .cqd-kpi-label { font-size:12px; color:#767676; margin-bottom:8px; }
        .cqd-kpi-val { white-space:nowrap; font-size:26px; font-weight:700; color:#111; letter-spacing:-0.5px; }
        .cqd-kpi-unit { white-space:nowrap; font-size:13px; color:#767676; font-weight:400; margin-left:2px; }
        .cqd-kpi-sub { font-size:12px; color:#8a8a8a; margin-top:4px; }

        /* 파이프라인 */
        .cqd-pipe { background:#fff; border:1px solid #e6e6e3; border-radius:6px; padding:20px 24px; margin-bottom:20px; }
        .cqd-pipe-grid { display:grid; grid-template-columns:repeat(6,1fr); gap:0; }
        .cqd-pipe-item { text-align:center; padding:12px 8px; position:relative; }
        .cqd-pipe-item:not(:last-child)::after { content:''; position:absolute; right:0; top:20px; width:1px; height:28px; background:#e6e6e3; }
        .cqd-pipe-num { font-size:32px; font-weight:700; color:#111; margin-bottom:4px; }
        .cqd-pipe-label { font-size:12px; color:#6b6b6b; }
        .cqd-pipe-bar { height:4px; border-radius:2px; margin-top:10px; }

        /* 알림 */
        .cqd-alert { background:#fff; border:1px solid #e6e6e3; border-radius:6px; margin-bottom:20px; overflow:hidden; }
        .cqd-alert-head { padding:13px 20px; border-bottom:1px solid #eeeeec; display:flex; align-items:center; gap:8px; }
        .cqd-alert-cnt { background:#b3261e; color:#fff; font-size:12px; font-weight:700; padding:2px 7px; border-radius:10px; }
        .cqd-alert-item { display:flex; align-items:center; gap:10px; padding:10px 20px; border-bottom:1px solid #f2f2f0; }
        .cqd-alert-item:last-child { border-bottom:none; }
        .cqd-alert-badge { font-size:12px; font-weight:700; padding:2px 8px; border-radius:3px; white-space:nowrap; flex-shrink:0; }

        /* 카드 */
        .cqd-card { background:#fff; border:1px solid #e6e6e3; border-radius:6px; overflow:hidden; }
        .cqd-card-head { padding:13px 20px; border-bottom:1px solid #eeeeec; display:flex; align-items:center; justify-content:space-between; }
        .cqd-card-title { font-size:14px; font-weight:700; color:#111; }
        .cqd-link { font-size:13px; color:#111; font-weight:600; background:none; border:none; cursor:pointer; font-family:inherit; padding:0; }

        /* 테이블 */
        .cqd-tbl { width:100%; border-collapse:collapse; font-size:14px; }
        .cqd-tbl th { padding:9px 14px; text-align:left; font-size:12px; font-weight:600; color:#767676; background:#f9f9f7; border-bottom:1px solid #eeeeec; white-space:nowrap; }
        .cqd-tbl td { padding:12px 14px; border-bottom:1px solid #f2f2f0; color:#222; vertical-align:middle; white-space:nowrap; }
        .cqd-tbl tr:last-child td { border-bottom:none; }
        .cqd-tbl tbody tr { cursor:pointer; }
        .cqd-tbl tbody tr:hover td { background:#f7f7f5; }
        .cqd-tbl tbody tr.sel td { background:#f0f0ee; }
        .cqd-badge { display:inline-block; padding:3px 9px; border-radius:4px; font-size:12px; font-weight:600; }
        .cqd-bar-bg { width:60px; height:5px; background:#eeeeec; border-radius:3px; display:inline-block; vertical-align:middle; margin-right:6px; }
        .cqd-bar-fill { height:5px; border-radius:3px; background:#111; }

        /* 2단 레이아웃 */
        .cqd-two { display:grid; grid-template-columns:1fr 340px; gap:16px; margin-bottom:20px; }

        /* 피드 */
        .cqd-feed-item { display:flex; align-items:flex-start; gap:10px; padding:10px 18px; border-bottom:1px solid #f2f2f0; }
        .cqd-feed-item:last-child { border-bottom:none; }
        .cqd-feed-badge { font-size:12px; font-weight:700; padding:2px 6px; border-radius:3px; white-space:nowrap; flex-shrink:0; margin-top:2px; }
        .cqd-feed-text { font-size:13px; color:#222; line-height:1.5; flex:1; }
        .cqd-feed-time { font-size:12px; color:#8a8a8a; flex-shrink:0; }

        /* 스테이지 필터 */
        .cqd-sf-bar { display:flex; gap:6px; flex-wrap:wrap; padding:12px 20px; border-bottom:1px solid #eeeeec; }
        .cqd-sf-btn { padding:4px 12px; border-radius:20px; border:1px solid #d6d6d2; background:#fff; font-size:12px; cursor:pointer; color:#555; font-family:inherit; }
        .cqd-sf-btn.on { background:#111; border-color:#111; color:#fff; font-weight:600; }

        /* 브랜드 상세 패널 */
        .cqd-brand-panel { background:#fff; border:1px solid #e6e6e3; border-radius:6px; margin-bottom:20px; overflow:hidden; }
        .cqd-brand-panel-head { padding:16px 20px; background:#111; display:flex; align-items:center; justify-content:space-between; }
        .cqd-brand-stat-grid { display:grid; grid-template-columns:repeat(5,1fr); border-bottom:1px solid #eeeeec; }
        .cqd-brand-stat { padding:18px 20px; border-right:1px solid #eeeeec; text-align:center; }
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
            <div style={{ fontSize:'12px', color:'#767676', marginBottom:'4px' }}>실시간 · 이 브라우저에 접수된 주문 기준</div>
            <h1 style={{ fontSize:'24px', fontWeight:700, color:'#111', margin:0 }}>피팅박스 대시보드</h1>
          </div>
          <div style={{ display:'flex', gap:'8px' }}>
            <button style={{ padding:'9px 18px', background:'#fff', color:'#555', border:'1px solid #d6d6d2', borderRadius:'5px', fontSize:'14px', cursor:'pointer', fontFamily:'inherit' }}>
              리포트 다운로드
            </button>
            <button style={{ padding:'9px 18px', background:'#111', color:'#fff', border:'none', borderRadius:'5px', fontSize:'14px', fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}
              onClick={() => location.href='/clyq/fitting/products'}>
              피팅 제품 관리
            </button>
          </div>
        </div>

        {/* 실제 접수 주문 (쇼핑몰 연동) */}
        <div className="cqd-card" style={{ marginBottom:'20px' }}>
          <div className="cqd-card-head"><span className="cqd-card-title">쇼핑몰 실제 주문 현황</span><button className="cqd-link" onClick={() => location.href='/clyq/orders'}>주문 처리하러 가기</button></div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))' }}>
            {[['신규 접수', newN], ['출고 준비', shipN], ['미처리 클레임', claimN], ['전체 주문', realOrders.length]].map(([l, v]) => (
              <div key={l} style={{ padding:'16px 20px', borderRight:'1px solid #eeeeec' }}><div style={{ fontSize:'13px', color:'#767676', marginBottom:'6px' }}>{l}</div><div style={{ fontSize:'24px', fontWeight:700 }}>{v}건</div></div>
            ))}
          </div>
        </div>

        {/* KPI (아래 숫자는 샘플) */}
        <div className="cqd-kpi-grid">
          {kpis.map(k => (
            <div key={k.label} className="cqd-kpi">
              <div className="cqd-kpi-label">{k.label}</div>
              <div>
                <span className="cqd-kpi-val">{k.value}</span>
                <span className="cqd-kpi-unit">{k.unit}</span>
              </div>
              <div className="cqd-kpi-sub">{k.sub}</div>
            </div>
          ))}
        </div>

        {/* 피팅 파이프라인 */}
        <div className="cqd-pipe" style={{ marginBottom:'20px' }}>
          <div style={{ fontSize:'14px', fontWeight:700, color:'#111', marginBottom:'16px' }}>
            피팅 단계별 현황
            <span style={{ fontSize:'13px', color:'#767676', fontWeight:400, marginLeft:'8px' }}>전체 브랜드 실시간</span>
          </div>
          <div className="cqd-pipe-grid">
            {pipeline.map(p => (
              <div key={p.stage} className="cqd-pipe-item">
                <div className="cqd-pipe-num">{p.count}</div>
                <div className="cqd-pipe-label">{p.stage}</div>
                <div className="cqd-pipe-bar" style={{ background:'#eeeeec' }}>
                  <div style={{ height:'4px', borderRadius:'2px', background:'#111', width: Math.round(p.count / p.total * 100) + '%' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 알림 */}
        <div className="cqd-alert">
          <div className="cqd-alert-head">
            <span style={{ fontSize:'14px', fontWeight:700, color:'#111' }}>처리 필요 알림</span>
            <span className="cqd-alert-cnt">{alerts.length}</span>
          </div>
          {alerts.length === 0 && <div style={{ padding:'20px', fontSize:'13px', color:'#767676' }}>지금 처리가 필요한 알림이 없습니다.</div>}
          {alerts.map((a, i) => (
            <div key={i} className="cqd-alert-item">
              <span className="cqd-alert-badge" style={{ background:a.bg, color:a.color }}>{a.type}</span>
              <span style={{ fontSize:'13px', color:'#222' }}>{a.text}</span>
              <button style={{ marginLeft:'auto', padding:'3px 10px', background:'#f2f2f0', border:'1px solid #d6d6d2', borderRadius:'3px', fontSize:'12px', cursor:'pointer', color:'#555', fontFamily:'inherit', flexShrink:0 }}>
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
              <span style={{ fontSize:'13px', color:'#767676' }}>클릭 시 상세 보기</span>
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
                      <td style={{ fontWeight:700, color:'#111' }}>{b.name}</td>
                      <td style={{ textAlign:'center', color:'#555' }}>{b.products}개</td>
                      <td style={{ textAlign:'center', fontWeight:700, color:'#111' }}>{b.fitting}건</td>
                      <td style={{ textAlign:'center', color:'#555' }}>{b.monthFit}건</td>
                      <td style={{ textAlign:'center' }}>
                        <div style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
                          <div className="cqd-bar-bg">
                            <div className="cqd-bar-fill" style={{ width: b.convRate + '%' }}></div>
                          </div>
                          <span style={{ fontSize:'13px', fontWeight:700, color: b.convRate >= 55 ? '#3D6A4F' : '#111' }}>
                            {b.convKnown ? b.convRate + '%' : '-'}
                          </span>
                        </div>
                      </td>
                      <td style={{ textAlign:'right', fontWeight:600, color:'#111' }}>
                        {b.monthSales.toLocaleString()}원
                      </td>
                      <td style={{ textAlign:'center' }}>
                        <span style={{ fontSize:'13px', fontWeight:700, ...brandStatusStyle[b.status] }}>
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
            {activity.length === 0 && <div style={{ padding:'20px', fontSize:'13px', color:'#767676' }}>아직 활동 기록이 없습니다.</div>}
            {activity.map((a, i) => {
              const ac = activityColor[a.type] || { bg:'#f2f2f0', color:'#555' }
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
                <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.4)', marginBottom:'3px' }}>브랜드 상세 현황</div>
                <div style={{ fontSize:'18px', fontWeight:800, color:'#fff' }}>{brandDetail.name}</div>
              </div>
              <button
                onClick={() => setSelectedBrand(null)}
                style={{ background:'rgba(255,255,255,0.1)', border:'none', color:'#fff', padding:'5px 14px', borderRadius:'4px', cursor:'pointer', fontSize:'13px', fontFamily:'inherit' }}
              >
                닫기
              </button>
            </div>

            {/* 브랜드 KPI */}
            <div className="cqd-brand-stat-grid">
              {[
                { label:'등록 제품',   value: brandDetail.products + '개',                      color:'#111' },
                { label:'현재 피팅중', value: brandDetail.fitting + '건',                        color:'#111' },
                { label:'이달 피팅',   value: brandDetail.monthFit + '건',                       color:'#555' },
                { label:'이달 전환율', value: brandDetail.convKnown ? brandDetail.convRate + '%' : '-',                        color: brandDetail.convRate >= 55 ? '#3D6A4F' : '#111' },
                { label:'이달 매출',   value: brandDetail.monthSales.toLocaleString() + '원',    color:'#3D6A4F' },
              ].map(s => (
                <div key={s.label} className="cqd-brand-stat">
                  <div style={{ fontSize:'12px', color:'#767676', marginBottom:'6px' }}>{s.label}</div>
                  <div style={{ fontSize:'20px', fontWeight:800, color:s.color }}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* 브랜드 피팅 목록 */}
            <div style={{ padding:'14px 20px', borderBottom:'1px solid #eeeeec', fontSize:'14px', fontWeight:700, color:'#111' }}>
              진행중인 피팅 ({brandFitting.length}건)
            </div>
            {brandFitting.length === 0 ? (
              <div style={{ padding:'32px', textAlign:'center', color:'#767676', fontSize:'14px' }}>
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
                      const ss = stageStyle[f.stage] || { bg:'#f2f2f0', color:'#555' }
                      const dDayLabel = dLabel(f.dDay)
                      const dDayColor = f.dDay != null && f.dDay < 0 ? '#b3261e' : f.dDay === 0 ? '#111' : '#555'
                      return (
                        <tr key={f.id}>
                          <td style={{ fontSize:'13px', color:'#6b6b6b', fontFamily:'monospace' }}>{f.id}</td>
                          <td style={{ fontWeight:600, color:'#111' }}>{f.product}</td>
                          <td style={{ textAlign:'center', color:'#555' }}>{f.size}</td>
                          <td style={{ fontWeight:500 }}>{f.customer}</td>
                          <td style={{ textAlign:'center' }}>
                            <span className="cqd-badge" style={{ background:ss.bg, color:ss.color }}>{f.stage}</span>
                          </td>
                          <td style={{ textAlign:'center', color:'#6b6b6b', fontSize:'13px' }}>{f.returnDue}</td>
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
            <span style={{ fontSize:'13px', color:'#767676', marginLeft:'auto', alignSelf:'center' }}>
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
                  const ss = stageStyle[f.stage] || { bg:'#f2f2f0', color:'#555' }
                  const dDayLabel = dLabel(f.dDay)
                  const dDayColor = f.dDay != null && f.dDay < 0 ? '#b3261e' : f.dDay === 0 ? '#111' : '#555'
                  return (
                    <tr key={f.id}>
                      <td style={{ fontSize:'13px', color:'#6b6b6b', fontFamily:'monospace' }}>{f.id}</td>
                      <td style={{ fontWeight:600, color:'#111' }}>{f.brand}</td>
                      <td style={{ fontWeight:500 }}>{f.product}</td>
                      <td style={{ textAlign:'center', color:'#555' }}>{f.size}</td>
                      <td>{f.customer}</td>
                      <td style={{ textAlign:'center' }}>
                        <span className="cqd-badge" style={{ background:ss.bg, color:ss.color }}>{f.stage}</span>
                      </td>
                      <td style={{ textAlign:'center', color:'#6b6b6b', fontSize:'13px' }}>{f.returnDue}</td>
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
