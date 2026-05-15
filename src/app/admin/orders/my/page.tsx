// @ts-nocheck
'use client'
import { useState } from 'react'

const orders = [
  {
    id:'ORD-0510-024', product:'오버핏 캐시미어 울 코트', sku:'MA-2026-CT-001',
    option:'M / 아이보리', customer:'이**', phone:'010-****-3842',
    amount:298000, commission:89400, settle:208600,
    status:'결제완료', shipCompany:'-', trackingNo:'-',
    orderDate:'2026-05-10 10:18', payDate:'2026-05-10 10:19',
    shipDate:'-', deliverDate:'-',
  },
  {
    id:'ORD-0510-023', product:'레더 재킷', sku:'MA-2026-JK-007',
    option:'S / 블랙', customer:'김**', phone:'010-****-5571',
    amount:456000, commission:136800, settle:319200,
    status:'배송중', shipCompany:'CJ대한통운', trackingNo:'1234567890',
    orderDate:'2026-05-10 09:22', payDate:'2026-05-10 09:23',
    shipDate:'2026-05-10 14:00', deliverDate:'-',
  },
  {
    id:'ORD-0509-041', product:'울 블레이저 세트업', sku:'MA-2026-ST-003',
    option:'M / 차콜', customer:'박**', phone:'010-****-2219',
    amount:389000, commission:116700, settle:272300,
    status:'배송완료', shipCompany:'CJ대한통운', trackingNo:'9876543210',
    orderDate:'2026-05-09 16:44', payDate:'2026-05-09 16:45',
    shipDate:'2026-05-09 18:00', deliverDate:'2026-05-10 11:30',
  },
  {
    id:'ORD-0509-038', product:'캐시미어 니트', sku:'MA-2026-KN-012',
    option:'L / 베이지', customer:'최**', phone:'010-****-7734',
    amount:178000, commission:53400, settle:124600,
    status:'배송완료', shipCompany:'롯데택배', trackingNo:'1122334455',
    orderDate:'2026-05-09 14:11', payDate:'2026-05-09 14:12',
    shipDate:'2026-05-09 17:30', deliverDate:'2026-05-10 13:20',
  },
  {
    id:'ORD-0509-031', product:'오버핏 캐시미어 울 코트', sku:'MA-2026-CT-001',
    option:'L / 아이보리', customer:'정**', phone:'010-****-4421',
    amount:298000, commission:89400, settle:208600,
    status:'반품접수', shipCompany:'CJ대한통운', trackingNo:'5544332211',
    orderDate:'2026-05-09 11:05', payDate:'2026-05-09 11:06',
    shipDate:'2026-05-09 15:00', deliverDate:'2026-05-10 10:00',
  },
  {
    id:'ORD-0508-027', product:'울 블레이저 세트업', sku:'MA-2026-ST-003',
    option:'S / 네이비', customer:'한**', phone:'010-****-8812',
    amount:389000, commission:116700, settle:272300,
    status:'교환접수', shipCompany:'롯데택배', trackingNo:'6677889900',
    orderDate:'2026-05-08 15:33', payDate:'2026-05-08 15:34',
    shipDate:'2026-05-08 18:00', deliverDate:'2026-05-09 12:00',
  },
  {
    id:'ORD-0508-019', product:'캐시미어 니트', sku:'MA-2026-KN-012',
    option:'M / 아이보리', customer:'조**', phone:'010-****-3309',
    amount:178000, commission:53400, settle:124600,
    status:'취소완료', shipCompany:'-', trackingNo:'-',
    orderDate:'2026-05-08 11:20', payDate:'2026-05-08 11:21',
    shipDate:'-', deliverDate:'-',
  },
  {
    id:'ORD-0507-015', product:'오버핏 캐시미어 울 코트', sku:'MA-2026-CT-001',
    option:'M / 블랙', customer:'윤**', phone:'010-****-6645',
    amount:298000, commission:89400, settle:208600,
    status:'정산완료', shipCompany:'CJ대한통운', trackingNo:'3322114455',
    orderDate:'2026-05-07 09:44', payDate:'2026-05-07 09:45',
    shipDate:'2026-05-07 14:00', deliverDate:'2026-05-08 11:00',
  },
]

const statusStyle = {
  '결제완료': { bg:'#eff6ff', color:'#2563eb' },
  '배송중':   { bg:'#f0fdf4', color:'#16a34a' },
  '배송완료': { bg:'#f5f5f7', color:'#555' },
  '반품접수': { bg:'#fff1f0', color:'#dc2626' },
  '교환접수': { bg:'#fefce8', color:'#ca8a04' },
  '취소완료': { bg:'#f5f5f7', color:'#aaa' },
  '정산완료': { bg:'#f0fdf4', color:'#16a34a' },
}

const statusList = ['전체','결제완료','배송중','배송완료','반품접수','교환접수','취소완료','정산완료']
const periodList = ['오늘','7일','30일','90일','직접입력']

export default function OrdersMyPage() {
  const [status, setStatus]   = useState('전체')
  const [period, setPeriod]   = useState('30일')
  const [search, setSearch]   = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = orders.filter(o => {
    const matchStatus = status === '전체' || o.status === status
    const matchSearch =
      o.id.includes(search) ||
      o.product.includes(search) ||
      o.customer.includes(search) ||
      o.sku.includes(search)
    return matchStatus && matchSearch
  })

  const totalAmount = filtered.reduce((s, o) => s + o.amount, 0)
  const totalSettle = filtered.reduce((s, o) => s + o.settle, 0)

  return (
    <>
      <style>{`
        .od-wrap { width:100%; }
        .od-head { display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:20px; flex-wrap:wrap; gap:10px; }
        .od-stat-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:12px; margin-bottom:20px; }
        .od-stat { background:#fff; border:1px solid #e8e8eb; border-radius:8px; padding:16px 20px; }
        .od-toolbar { background:#fff; border:1px solid #e8e8eb; border-radius:8px; padding:16px 20px; margin-bottom:14px; display:flex; flex-direction:column; gap:12px; }
        .od-filter-row { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
        .od-filter-label { font-size:11px; font-weight:600; color:#999; width:48px; flex-shrink:0; }
        .od-period-btn { padding:5px 14px; border-radius:20px; border:1px solid #d8d8dc; background:#fff; font-size:12px; cursor:pointer; color:#666; font-family:inherit; transition:all 0.15s; }
        .od-period-btn.on { background:#1a1a2e; border-color:#1a1a2e; color:#fff; font-weight:600; }
        .od-status-btn { padding:5px 14px; border-radius:20px; border:1px solid #d8d8dc; background:#fff; font-size:12px; cursor:pointer; color:#666; font-family:inherit; transition:all 0.15s; }
        .od-status-btn.on { background:#C94E1A; border-color:#C94E1A; color:#fff; font-weight:600; }
        .od-search { padding:8px 14px; border:1px solid #d8d8dc; border-radius:5px; font-size:13px; width:280px; outline:none; font-family:inherit; }
        .od-search:focus { border-color:#C94E1A; }
        .od-card { background:#fff; border:1px solid #e8e8eb; border-radius:8px; overflow:hidden; }
        .od-tbl { width:100%; border-collapse:collapse; font-size:13px; }
        .od-tbl th { padding:10px 14px; text-align:left; font-size:11px; font-weight:600; color:#999; background:#fafafa; border-bottom:1px solid #f0f0f2; white-space:nowrap; }
        .od-tbl td { padding:13px 14px; border-bottom:1px solid #f5f5f7; color:#333; vertical-align:middle; white-space:nowrap; }
        .od-tbl tr:last-child td { border-bottom:none; }
        .od-tbl tbody tr { cursor:pointer; transition:background 0.1s; }
        .od-tbl tbody tr:hover td { background:#fff8f5; }
        .od-tbl tbody tr.selected td { background:#fff3ee; }
        .od-badge { display:inline-block; padding:3px 9px; border-radius:4px; font-size:11px; font-weight:600; }
        .od-sum-bar { display:flex; align-items:center; justify-content:flex-end; gap:24px; padding:12px 20px; background:#fafafa; border-top:1px solid #f0f0f2; font-size:13px; }
        .od-btn-o { padding:9px 18px; background:#fff; color:#555; border:1px solid #d8d8dc; border-radius:5px; font-size:13px; cursor:pointer; font-family:inherit; }

        /* 모달 */
        .od-modal-bg { position:fixed; inset:0; background:rgba(0,0,0,0.45); z-index:500; display:flex; align-items:center; justify-content:center; padding:20px; }
        .od-modal { background:#fff; border-radius:10px; width:100%; max-width:760px; max-height:90vh; overflow-y:auto; box-shadow:0 20px 60px rgba(0,0,0,0.25); }
        .od-modal-head { padding:20px 24px; background:#1a1a2e; color:#fff; display:flex; align-items:center; justify-content:space-between; border-radius:10px 10px 0 0; position:sticky; top:0; z-index:1; }
        .od-modal-close { background:rgba(255,255,255,0.12); border:none; color:#fff; width:30px; height:30px; border-radius:50%; cursor:pointer; font-size:16px; display:flex; align-items:center; justify-content:center; font-family:inherit; line-height:1; }
        .od-modal-close:hover { background:rgba(255,255,255,0.25); }
        .od-detail-grid { display:grid; grid-template-columns:repeat(4,1fr); }
        .od-detail-cell { padding:16px 20px; border-right:1px solid #f0f0f2; border-bottom:1px solid #f0f0f2; }
        .od-detail-cell:nth-child(4n) { border-right:none; }
        .od-detail-label { font-size:11px; color:#999; font-weight:500; margin-bottom:5px; }
        .od-detail-val { font-size:13px; font-weight:600; color:#1a1a2e; }
        .od-tracking-btn { padding:6px 14px; background:#f5f5f7; border-radius:4px; font-size:12px; color:#555; font-weight:500; border:none; cursor:pointer; font-family:inherit; }
        .od-tracking-btn:hover { background:#e8e8eb; }

        @media (max-width:1200px) {
          .od-stat-grid { grid-template-columns:repeat(3,1fr); }
          .od-detail-grid { grid-template-columns:repeat(2,1fr); }
          .od-detail-cell:nth-child(4n) { border-right:1px solid #f0f0f2; }
          .od-detail-cell:nth-child(2n) { border-right:none; }
        }
        @media (max-width:768px) {
          .od-stat-grid { grid-template-columns:repeat(2,1fr); }
          .od-search { width:100%; }
          .od-detail-grid { grid-template-columns:1fr 1fr; }
        }
        @media (max-width:480px) {
          .od-stat-grid { grid-template-columns:1fr 1fr; }
          .od-detail-grid { grid-template-columns:1fr; }
          .od-detail-cell { border-right:none; }
        }
      `}</style>

      <div className="od-wrap">

        {/* 헤더 */}
        <div className="od-head">
          <div>
            <div style={{ fontSize:'11px', color:'#aaa', marginBottom:'4px' }}>주문관리 › 주문 조회</div>
            <h1 style={{ fontSize:'22px', fontWeight:800, color:'#1a1a2e', margin:0 }}>주문 조회</h1>
          </div>
          <button className="od-btn-o" onClick={() => alert('엑셀 다운로드')}>
            엑셀 다운로드
          </button>
        </div>

        {/* 요약 지표 */}
        <div className="od-stat-grid">
          {[
            { label:'전체 주문',     value: orders.length,                                                            unit:'건', color:'#1a1a2e' },
            { label:'결제완료',      value: orders.filter(o => o.status === '결제완료').length,                       unit:'건', color:'#2563eb' },
            { label:'배송중',        value: orders.filter(o => o.status === '배송중').length,                         unit:'건', color:'#16a34a' },
            { label:'클레임',        value: orders.filter(o => ['반품접수','교환접수','취소완료'].includes(o.status)).length, unit:'건', color:'#dc2626' },
            { label:'이달 정산 예정',value: '1,208,900',                                                              unit:'원', color:'#C94E1A' },
          ].map(s => (
            <div key={s.label} className="od-stat">
              <div style={{ fontSize:'11px', color:'#999', marginBottom:'8px' }}>{s.label}</div>
              <div style={{ display:'flex', alignItems:'baseline', gap:'3px' }}>
                <span style={{ fontSize:'24px', fontWeight:800, color:s.color }}>{s.value}</span>
                <span style={{ fontSize:'12px', color:'#aaa' }}>{s.unit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 검색 / 필터 */}
        <div className="od-toolbar">
          <div className="od-filter-row">
            <span className="od-filter-label">기간</span>
            {periodList.map(p => (
              <button
                key={p}
                className={period === p ? 'od-period-btn on' : 'od-period-btn'}
                onClick={() => setPeriod(p)}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="od-filter-row">
            <span className="od-filter-label">상태</span>
            <div style={{ display:'flex', gap:'6px', flexWrap:'wrap' }}>
              {statusList.map(s => (
                <button
                  key={s}
                  className={status === s ? 'od-status-btn on' : 'od-status-btn'}
                  onClick={() => setStatus(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="od-filter-row">
            <span className="od-filter-label">검색</span>
            <input
              className="od-search"
              type="text"
              placeholder="주문번호 · 상품명 · 고객명 · SKU"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <span style={{ fontSize:'12px', color:'#aaa', marginLeft:'8px' }}>
              {filtered.length}건 조회됨
            </span>
          </div>
        </div>

        {/* 주문 테이블 */}
        <div className="od-card">
          <div style={{ overflowX:'auto' }}>
            <table className="od-tbl">
              <thead>
                <tr>
                  <th>주문번호</th>
                  <th>상품명</th>
                  <th>옵션</th>
                  <th>고객</th>
                  <th style={{ textAlign:'right' }}>결제금액</th>
                  <th style={{ textAlign:'right' }}>정산금액</th>
                  <th style={{ textAlign:'center' }}>상태</th>
                  <th>주문일시</th>
                  <th>배송사</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(o => (
                  <tr
                    key={o.id}
                    className={selected?.id === o.id ? 'selected' : ''}
                    onClick={() => setSelected(o)}
                  >
                    <td style={{ fontSize:'12px', color:'#888', fontFamily:'monospace' }}>{o.id}</td>
                    <td>
                      <div style={{ fontWeight:600, color:'#1a1a2e' }}>{o.product}</div>
                      <div style={{ fontSize:'11px', color:'#bbb', marginTop:'2px' }}>{o.sku}</div>
                    </td>
                    <td style={{ fontSize:'12px', color:'#666' }}>{o.option}</td>
                    <td style={{ fontWeight:500 }}>{o.customer}</td>
                    <td style={{ textAlign:'right', fontWeight:700, color:'#1a1a2e' }}>
                      {o.amount.toLocaleString()}원
                    </td>
                    <td style={{ textAlign:'right', fontWeight:600, color:'#16a34a' }}>
                      {o.settle.toLocaleString()}원
                    </td>
                    <td style={{ textAlign:'center' }}>
                      <span className="od-badge" style={{ background:statusStyle[o.status]?.bg, color:statusStyle[o.status]?.color }}>
                        {o.status}
                      </span>
                    </td>
                    <td style={{ fontSize:'12px', color:'#888' }}>{o.orderDate}</td>
                    <td style={{ fontSize:'12px', color:'#888' }}>{o.shipCompany}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 합계 바 */}
          <div className="od-sum-bar">
            <span style={{ color:'#999', fontSize:'12px' }}>조회된 {filtered.length}건 합계</span>
            <span>결제금액 <strong style={{ color:'#1a1a2e' }}>{totalAmount.toLocaleString()}원</strong></span>
            <span>정산금액 <strong style={{ color:'#16a34a' }}>{totalSettle.toLocaleString()}원</strong></span>
            <span style={{ color:'#aaa', fontSize:'12px' }}>수수료 {(totalAmount - totalSettle).toLocaleString()}원</span>
          </div>
        </div>

      </div>

      {/* 주문 상세 모달 */}
      {selected && (
        <div className="od-modal-bg" onClick={() => setSelected(null)}>
          <div className="od-modal" onClick={e => e.stopPropagation()}>

            {/* 모달 헤더 */}
            <div className="od-modal-head">
              <div>
                <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.45)', marginBottom:'3px' }}>주문 상세</div>
                <div style={{ fontWeight:700, fontSize:'15px' }}>{selected.id}</div>
              </div>
              <button className="od-modal-close" onClick={() => setSelected(null)}>✕</button>
            </div>

            {/* 상세 그리드 */}
            <div className="od-detail-grid">
              {[
                { label:'상품명',            val: selected.product },
                { label:'옵션',              val: selected.option },
                { label:'SKU',               val: selected.sku },
                { label:'고객',              val: selected.customer + '  ' + selected.phone },
                { label:'결제금액',          val: selected.amount.toLocaleString() + '원' },
                { label:'CLYQ 수수료 (30%)', val: selected.commission.toLocaleString() + '원' },
                { label:'정산금액',          val: selected.settle.toLocaleString() + '원' },
                { label:'주문 상태',         val: selected.status },
                { label:'주문일시',          val: selected.orderDate },
                { label:'결제일시',          val: selected.payDate },
                { label:'출고일시',          val: selected.shipDate },
                { label:'배송완료',          val: selected.deliverDate },
              ].map(cell => (
                <div key={cell.label} className="od-detail-cell">
                  <div className="od-detail-label">{cell.label}</div>
                  <div className="od-detail-val">{cell.val}</div>
                </div>
              ))}
            </div>

            {/* 배송 추적 */}
            <div style={{ padding:'16px 24px', borderTop:'1px solid #f0f0f2', display:'flex', alignItems:'center', gap:'16px' }}>
              <div>
                <div style={{ fontSize:'11px', color:'#999', marginBottom:'4px' }}>배송사 / 운송장번호</div>
                <div style={{ fontWeight:600, color:'#1a1a2e', fontSize:'14px' }}>
                  {selected.shipCompany === '-' ? '미출고' : selected.shipCompany + '  ' + selected.trackingNo}
                </div>
              </div>
              {selected.shipCompany !== '-' && (
                <button
                  className="od-tracking-btn"
                  onClick={() => window.open('https://trace.cjlogistics.com', '_blank')}
                >
                  배송 추적
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </>
  )
}
