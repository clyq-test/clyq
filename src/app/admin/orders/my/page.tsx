// @ts-nocheck
'use client'
import { useState } from 'react'

const orders = [
  {
    id:'ORD-0510-024', product:'오버핏 캐시미어 울 코트', sku:'MA-2026-CT-001',
    option:'M / 아이보리', customer:'이유진', phone:'010-****-3842',
    payMethod:'신용카드', amount:298000, shipFee:0, extraShipFee:0,
    commission:89400, settle:208600, exchangeFee:0, returnFee:6000,
    status:'결제완료', shipCompany:'-', trackingNo:'-',
    orderDate:'2026-05-10 10:18', payDate:'2026-05-10 10:19',
    shipDate:'-', deliverDate:'-', memo:'',
  },
  {
    id:'ORD-0510-023', product:'레더 재킷', sku:'MA-2026-JK-007',
    option:'S / 블랙', customer:'김민서', phone:'010-****-5571',
    payMethod:'신용카드', amount:456000, shipFee:0, extraShipFee:0,
    commission:136800, settle:319200, exchangeFee:0, returnFee:6000,
    status:'배송중', shipCompany:'CJ대한통운', trackingNo:'1234567890',
    orderDate:'2026-05-10 09:22', payDate:'2026-05-10 09:23',
    shipDate:'2026-05-10 14:00', deliverDate:'-', memo:'',
  },
  {
    id:'ORD-0509-041', product:'울 블레이저 세트업', sku:'MA-2026-ST-003',
    option:'M / 차콜', customer:'박지현', phone:'010-****-2219',
    payMethod:'카카오페이', amount:389000, shipFee:0, extraShipFee:0,
    commission:116700, settle:272300, exchangeFee:0, returnFee:6000,
    status:'배송완료', shipCompany:'CJ대한통운', trackingNo:'9876543210',
    orderDate:'2026-05-09 16:44', payDate:'2026-05-09 16:45',
    shipDate:'2026-05-09 18:00', deliverDate:'2026-05-10 11:30', memo:'',
  },
  {
    id:'ORD-0509-038', product:'캐시미어 니트', sku:'MA-2026-KN-012',
    option:'L / 베이지', customer:'최수연', phone:'010-****-7734',
    payMethod:'신용카드', amount:178000, shipFee:0, extraShipFee:0,
    commission:53400, settle:124600, exchangeFee:0, returnFee:6000,
    status:'배송완료', shipCompany:'롯데택배', trackingNo:'1122334455',
    orderDate:'2026-05-09 14:11', payDate:'2026-05-09 14:12',
    shipDate:'2026-05-09 17:30', deliverDate:'2026-05-10 13:20', memo:'',
  },
  {
    id:'ORD-0509-031', product:'오버핏 캐시미어 울 코트', sku:'MA-2026-CT-001',
    option:'L / 아이보리', customer:'정다은', phone:'010-****-4421',
    payMethod:'네이버페이', amount:298000, shipFee:0, extraShipFee:0,
    commission:89400, settle:208600, exchangeFee:6000, returnFee:6000,
    status:'반품접수', shipCompany:'CJ대한통운', trackingNo:'5544332211',
    orderDate:'2026-05-09 11:05', payDate:'2026-05-09 11:06',
    shipDate:'2026-05-09 15:00', deliverDate:'2026-05-10 10:00', memo:'',
  },
  {
    id:'ORD-0508-027', product:'울 블레이저 세트업', sku:'MA-2026-ST-003',
    option:'S / 네이비', customer:'한소희', phone:'010-****-8812',
    payMethod:'신용카드', amount:389000, shipFee:0, extraShipFee:0,
    commission:116700, settle:272300, exchangeFee:6000, returnFee:6000,
    status:'교환접수', shipCompany:'롯데택배', trackingNo:'6677889900',
    orderDate:'2026-05-08 15:33', payDate:'2026-05-08 15:34',
    shipDate:'2026-05-08 18:00', deliverDate:'2026-05-09 12:00', memo:'',
  },
  {
    id:'ORD-0508-019', product:'캐시미어 니트', sku:'MA-2026-KN-012',
    option:'M / 아이보리', customer:'조예린', phone:'010-****-3309',
    payMethod:'카카오페이', amount:178000, shipFee:0, extraShipFee:0,
    commission:53400, settle:124600, exchangeFee:0, returnFee:0,
    status:'취소완료', shipCompany:'-', trackingNo:'-',
    orderDate:'2026-05-08 11:20', payDate:'2026-05-08 11:21',
    shipDate:'-', deliverDate:'-', memo:'',
  },
  {
    id:'ORD-0507-015', product:'오버핏 캐시미어 울 코트', sku:'MA-2026-CT-001',
    option:'M / 블랙', customer:'윤채원', phone:'010-****-6645',
    payMethod:'신용카드', amount:298000, shipFee:0, extraShipFee:0,
    commission:89400, settle:208600, exchangeFee:0, returnFee:0,
    status:'정산완료', shipCompany:'CJ대한통운', trackingNo:'3322114455',
    orderDate:'2026-05-07 09:44', payDate:'2026-05-07 09:45',
    shipDate:'2026-05-07 14:00', deliverDate:'2026-05-08 11:00', memo:'',
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
  const [status, setStatus]     = useState('전체')
  const [period, setPeriod]     = useState('30일')
  const [search, setSearch]     = useState('')
  const [selected, setSelected] = useState(null)
  const [memo, setMemo]         = useState('')

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

  function openModal(o) {
    setSelected(o)
    setMemo(o.memo || '')
  }

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
        .od-period-btn { padding:5px 14px; border-radius:20px; border:1px solid #d8d8dc; background:#fff; font-size:12px; cursor:pointer; color:#666; font-family:inherit; }
        .od-period-btn.on { background:#1a1a2e; border-color:#1a1a2e; color:#fff; font-weight:600; }
        .od-status-btn { padding:5px 14px; border-radius:20px; border:1px solid #d8d8dc; background:#fff; font-size:12px; cursor:pointer; color:#666; font-family:inherit; }
        .od-status-btn.on { background:#C94E1A; border-color:#C94E1A; color:#fff; font-weight:600; }
        .od-search { padding:8px 14px; border:1px solid #d8d8dc; border-radius:5px; font-size:13px; width:280px; outline:none; font-family:inherit; }
        .od-search:focus { border-color:#C94E1A; }
        .od-card { background:#fff; border:1px solid #e8e8eb; border-radius:8px; overflow:hidden; }
        .od-tbl { width:100%; border-collapse:collapse; font-size:13px; }
        .od-tbl th { padding:10px 14px; text-align:left; font-size:11px; font-weight:600; color:#999; background:#fafafa; border-bottom:1px solid #f0f0f2; white-space:nowrap; }
        .od-tbl td { padding:13px 14px; border-bottom:1px solid #f5f5f7; color:#333; vertical-align:middle; white-space:nowrap; }
        .od-tbl tr:last-child td { border-bottom:none; }
        .od-tbl tbody tr { cursor:pointer; }
        .od-tbl tbody tr:hover td { background:#fff8f5; }
        .od-badge { display:inline-block; padding:3px 9px; border-radius:4px; font-size:11px; font-weight:600; }
        .od-sum-bar { display:flex; align-items:center; justify-content:flex-end; gap:24px; padding:12px 20px; background:#fafafa; border-top:1px solid #f0f0f2; font-size:13px; }
        .od-btn-o { padding:9px 18px; background:#fff; color:#555; border:1px solid #d8d8dc; border-radius:5px; font-size:13px; cursor:pointer; font-family:inherit; }

        /* 모달 */
        .od-modal-bg { position:fixed; inset:0; background:rgba(0,0,0,0.45); z-index:500; display:flex; align-items:center; justify-content:center; padding:20px; }
        .od-modal { background:#fff; border-radius:6px; width:100%; max-width:860px; max-height:92vh; overflow-y:auto; box-shadow:0 8px 40px rgba(0,0,0,0.2); }

        /* 모달 내부 */
        .mo-header { display:flex; align-items:center; justify-content:space-between; padding:20px 28px 16px; border-bottom:2px solid #1a1a2e; }
        .mo-title { font-size:20px; font-weight:800; color:#1a1a2e; display:flex; align-items:center; gap:14px; }
        .mo-title-id { font-size:15px; font-weight:400; color:#555; }
        .mo-title-date { font-size:13px; color:#aaa; font-weight:400; }
        .mo-close { background:none; border:1px solid #d8d8dc; color:#555; width:32px; height:32px; border-radius:4px; cursor:pointer; font-size:16px; display:flex; align-items:center; justify-content:center; font-family:inherit; }
        .mo-close:hover { background:#f5f5f7; }
        .mo-body { padding:24px 28px; }
        .mo-section-title { font-size:14px; font-weight:700; color:#1a1a2e; margin-bottom:10px; padding-bottom:8px; border-bottom:1px solid #1a1a2e; }
        .mo-section { margin-bottom:28px; }

        /* 모달 info 테이블 */
        .mo-info-tbl { width:100%; border-collapse:collapse; font-size:13px; border:1px solid #e0e0e0; }
        .mo-info-tbl th { padding:11px 16px; background:#fafafa; font-weight:600; color:#555; font-size:12px; border:1px solid #e0e0e0; text-align:left; width:130px; white-space:nowrap; }
        .mo-info-tbl td { padding:11px 16px; color:#1a1a2e; border:1px solid #e0e0e0; }

        /* 모달 상품 테이블 */
        .mo-prod-tbl { width:100%; border-collapse:collapse; font-size:13px; border:1px solid #e0e0e0; }
        .mo-prod-tbl th { padding:10px 14px; background:#fafafa; font-weight:600; color:#555; font-size:11px; border:1px solid #e0e0e0; text-align:center; white-space:nowrap; }
        .mo-prod-tbl td { padding:13px 14px; border:1px solid #e0e0e0; text-align:center; vertical-align:middle; font-size:13px; color:#333; }
        .mo-prod-tbl tfoot td { background:#fafafa; font-weight:600; }
        .mo-prod-name { color:#C94E1A; font-weight:500; cursor:pointer; text-decoration:underline; text-align:left; }
        .mo-action-btn { padding:5px 12px; border:1px solid #d8d8dc; background:#fff; border-radius:3px; font-size:12px; cursor:pointer; font-family:inherit; color:#555; }
        .mo-action-btn:hover { background:#f5f5f7; }
        .mo-note { font-size:11px; color:#999; text-align:right; margin-top:6px; }

        /* 메모 */
        .mo-memo { width:100%; min-height:80px; border:1px solid #d8d8dc; border-radius:4px; padding:12px 14px; font-size:13px; font-family:inherit; resize:vertical; outline:none; color:#333; }
        .mo-memo:focus { border-color:#C94E1A; }
        .mo-save-btn { margin-top:10px; padding:10px 28px; background:#1a1a2e; color:#fff; border:none; border-radius:4px; font-size:13px; font-weight:600; cursor:pointer; font-family:inherit; float:right; }
        .mo-save-btn:hover { background:#2d2d44; }

        @media (max-width:1200px) { .od-stat-grid { grid-template-columns:repeat(3,1fr); } }
        @media (max-width:768px) {
          .od-stat-grid { grid-template-columns:repeat(2,1fr); }
          .od-search { width:100%; }
          .mo-body { padding:16px 16px; }
          .mo-header { padding:16px 16px 12px; }
        }
      `}</style>

      <div className="od-wrap">

        {/* 헤더 */}
        <div className="od-head">
          <div>
            <div style={{ fontSize:'11px', color:'#aaa', marginBottom:'4px' }}>주문관리 › 주문 조회</div>
            <h1 style={{ fontSize:'22px', fontWeight:800, color:'#1a1a2e', margin:0 }}>주문 조회</h1>
          </div>
          <button className="od-btn-o">엑셀 다운로드</button>
        </div>

        {/* 요약 지표 */}
        <div className="od-stat-grid">
          {[
            { label:'전체 주문',      value: orders.length,                                                                       unit:'건', color:'#1a1a2e' },
            { label:'결제완료',       value: orders.filter(o => o.status === '결제완료').length,                                  unit:'건', color:'#2563eb' },
            { label:'배송중',         value: orders.filter(o => o.status === '배송중').length,                                    unit:'건', color:'#16a34a' },
            { label:'클레임',         value: orders.filter(o => ['반품접수','교환접수','취소완료'].includes(o.status)).length,     unit:'건', color:'#dc2626' },
            { label:'이달 정산 예정', value: '1,208,900',                                                                         unit:'원', color:'#C94E1A' },
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

        {/* 필터 */}
        <div className="od-toolbar">
          <div className="od-filter-row">
            <span className="od-filter-label">기간</span>
            {periodList.map(p => (
              <button key={p} className={period === p ? 'od-period-btn on' : 'od-period-btn'} onClick={() => setPeriod(p)}>
                {p}
              </button>
            ))}
          </div>
          <div className="od-filter-row">
            <span className="od-filter-label">상태</span>
            <div style={{ display:'flex', gap:'6px', flexWrap:'wrap' }}>
              {statusList.map(s => (
                <button key={s} className={status === s ? 'od-status-btn on' : 'od-status-btn'} onClick={() => setStatus(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="od-filter-row">
            <span className="od-filter-label">검색</span>
            <input
              className="od-search" type="text"
              placeholder="주문번호 · 상품명 · 고객명 · SKU"
              value={search} onChange={e => setSearch(e.target.value)}
            />
            <span style={{ fontSize:'12px', color:'#aaa', marginLeft:'8px' }}>{filtered.length}건 조회됨</span>
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
                  <tr key={o.id} onClick={() => openModal(o)}>
                    <td style={{ fontSize:'12px', color:'#888', fontFamily:'monospace' }}>{o.id}</td>
                    <td>
                      <div style={{ fontWeight:600, color:'#1a1a2e' }}>{o.product}</div>
                      <div style={{ fontSize:'11px', color:'#bbb', marginTop:'2px' }}>{o.sku}</div>
                    </td>
                    <td style={{ fontSize:'12px', color:'#666' }}>{o.option}</td>
                    <td style={{ fontWeight:500 }}>{o.customer}</td>
                    <td style={{ textAlign:'right', fontWeight:700, color:'#1a1a2e' }}>{o.amount.toLocaleString()}원</td>
                    <td style={{ textAlign:'right', fontWeight:600, color:'#16a34a' }}>{o.settle.toLocaleString()}원</td>
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
            <div className="mo-header">
              <div className="mo-title">
                주문상세정보
                <span className="mo-title-id">
                  {selected.id}
                  <span className="mo-title-date"> ({selected.orderDate})</span>
                </span>
              </div>
              <button className="mo-close" onClick={() => setSelected(null)}>✕</button>
            </div>

            <div className="mo-body">

              {/* 주문 정보 */}
              <div className="mo-section">
                <div className="mo-section-title">주문 정보</div>
                <table className="mo-info-tbl">
                  <tbody>
                    <tr>
                      <th>주문자명</th>
                      <td>{selected.customer}</td>
                      <th>연락처</th>
                      <td>{selected.phone}</td>
                    </tr>
                    <tr>
                      <th>결제방법</th>
                      <td>{selected.payMethod}</td>
                      <th>결제합계</th>
                      <td style={{ fontWeight:700, color:'#1a1a2e' }}>{selected.amount.toLocaleString()}원</td>
                    </tr>
                    <tr>
                      <th>주문일시</th>
                      <td>{selected.orderDate}</td>
                      <th>결제일시</th>
                      <td>{selected.payDate}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 주문 상품 */}
              <div className="mo-section">
                <div className="mo-section-title">주문 상품</div>
                <table className="mo-prod-tbl">
                  <thead>
                    <tr>
                      <th style={{ textAlign:'left', width:'36%' }}>상품명</th>
                      <th>옵션</th>
                      <th>수량</th>
                      <th>주문금액</th>
                      <th>배송비</th>
                      <th>추가배송비</th>
                      <th>주문상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="mo-prod-name">{selected.product}</td>
                      <td>{selected.option}</td>
                      <td>1</td>
                      <td>{selected.amount.toLocaleString()}</td>
                      <td>{selected.shipFee}</td>
                      <td>{selected.extraShipFee}</td>
                      <td>
                        <div style={{ display:'flex', gap:'4px', justifyContent:'center', flexWrap:'wrap' }}>
                          <span className="od-badge" style={{ background:statusStyle[selected.status]?.bg, color:statusStyle[selected.status]?.color }}>
                            {selected.status}
                          </span>
                          {selected.trackingNo !== '-' && (
                            <button
                              className="mo-action-btn"
                              onClick={() => window.open('https://trace.cjlogistics.com', '_blank')}
                            >
                              배송조회
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={2} style={{ textAlign:'center' }}>합계</td>
                      <td>1</td>
                      <td>{selected.amount.toLocaleString()}</td>
                      <td>{selected.shipFee}</td>
                      <td>{selected.extraShipFee}</td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
                <div className="mo-note">최초 무료배송 후 교환/반품/취소로 기본 배송비가 재부과되는 경우 * 표시됩니다.</div>
              </div>

              {/* 배송 정보 */}
              <div className="mo-section">
                <div className="mo-section-title">배송 정보</div>
                <table className="mo-info-tbl">
                  <tbody>
                    <tr>
                      <th>배송사</th>
                      <td>{selected.shipCompany === '-' ? '미출고' : selected.shipCompany}</td>
                      <th>운송장번호</th>
                      <td style={{ fontFamily:'monospace' }}>{selected.trackingNo === '-' ? '-' : selected.trackingNo}</td>
                    </tr>
                    <tr>
                      <th>출고일시</th>
                      <td>{selected.shipDate}</td>
                      <th>배송완료</th>
                      <td>{selected.deliverDate}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 교환/반품 배송비 */}
              <div className="mo-section">
                <div className="mo-section-title">교환/반품 배송비</div>
                <table className="mo-info-tbl">
                  <tbody>
                    <tr>
                      <th>교환 배송비</th>
                      <td>{selected.exchangeFee === 0 ? '0원' : selected.exchangeFee.toLocaleString() + '원'}</td>
                      <th>반품 배송비</th>
                      <td>{selected.returnFee === 0 ? '0원' : selected.returnFee.toLocaleString() + '원'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 정산 정보 */}
              <div className="mo-section">
                <div className="mo-section-title">정산 정보</div>
                <table className="mo-info-tbl">
                  <tbody>
                    <tr>
                      <th>CLYQ 수수료 (30%)</th>
                      <td style={{ color:'#C94E1A', fontWeight:600 }}>{selected.commission.toLocaleString()}원</td>
                      <th>브랜드 정산금액</th>
                      <td style={{ color:'#16a34a', fontWeight:700 }}>{selected.settle.toLocaleString()}원</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 업체 메모 */}
              <div className="mo-section">
                <div className="mo-section-title">업체 메모</div>
                <textarea
                  className="mo-memo"
                  placeholder="메모를 입력하세요."
                  value={memo}
                  onChange={e => setMemo(e.target.value)}
                />
                <button
                  className="mo-save-btn"
                  onClick={() => alert('저장되었습니다.')}
                >
                  저장
                </button>
                <div style={{ clear:'both' }}></div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  )
}
