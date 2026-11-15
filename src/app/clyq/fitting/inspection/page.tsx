// @ts-nocheck
'use client'
import { useState } from 'react'

import { useOrders } from '../../../lib/orders'
import { fitRows, saveInspection } from '../../../lib/hq'

// 반납된 피팅박스(검수중·반납완료) 또는 검수 결과가 있는 주문을 실제 주문에서 가져옵니다.
const toItems = orders => fitRows(orders).filter(f => ['검수중', '반납완료'].includes(f.status) || f.inspect).map(f => ({
  id: f.orderId, brand: f.brand, product: f.product, size: f.size, customer: f.customer, returnDate: f.returnDate, receivedAt: f.returnDate,
  result: f.inspect ? f.inspect.result : '', penaltyAmt: f.inspect ? f.inspect.penaltyAmt : 0, note: f.inspect ? f.inspect.note : '',
}))

const resultOpts = ['이상없음','경미한 오염','훼손','분실']
const resultStyle = {
  '이상없음':   { bg:'#eef4f0', color:'#3D6A4F' },
  '경미한 오염':{ bg:'#f4f4f2', color:'#8a6d1f' },
  '훼손':       { bg:'#fbeeed', color:'#b3261e' },
  '분실':       { bg:'#fbeeed', color:'#b3261e' },
  '':           { bg:'#f2f2f0', color:'#767676' },
}

export default function InspectionPage() {
  const [orders] = useOrders()
  const items = toItems(orders)
  const [filter, setFilter]       = useState('전체')
  const [selected, setSelected]   = useState(null)
  const [editNote, setEditNote]   = useState('')
  const [editResult, setEditResult] = useState('')
  const [editPenalty, setEditPenalty] = useState('')

  function openModal(item) {
    setSelected(item)
    setEditResult(item.result)
    setEditNote(item.note)
    setEditPenalty(String(item.penaltyAmt || ''))
  }

  function saveResult() {
    saveInspection(selected.id, { result: editResult, note: editNote, penaltyAmt: ['훼손', '분실'].includes(editResult) ? Number(editPenalty) || 0 : 0 })
    setSelected(null)
  }

  const pending   = items.filter(i => !i.result)
  const completed = items.filter(i => !!i.result)
  const damaged   = items.filter(i => i.result === '훼손' || i.result === '분실')

  const filtered = filter === '전체' ? items
    : filter === '검수 대기' ? pending
    : filter === '이상없음' ? items.filter(i => i.result === '이상없음')
    : filter === '훼손·분실' ? damaged
    : items

  return (
    <>
      <style>{`
        .ins-wrap { width:100%; }
        .ins-stat-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-bottom:16px; }
        .ins-stat { background:#fff; border:1px solid #e6e6e3; border-radius:8px; padding:16px 20px; }
        .ins-card { background:#fff; border:1px solid #e6e6e3; border-radius:8px; overflow:hidden; }
        .ins-card-head { padding:13px 20px; border-bottom:1px solid #eeeeec; display:flex; align-items:center; justify-content:space-between; }
        .ins-filter-bar { display:flex; gap:6px; padding:12px 20px; border-bottom:1px solid #eeeeec; flex-wrap:wrap; }
        .ins-fb { padding:5px 14px; border-radius:20px; border:1px solid #d6d6d2; background:#fff; font-size:13px; cursor:pointer; color:#555; font-family:inherit; }
        .ins-fb.on { background:#111; border-color:#111; color:#fff; font-weight:600; }
        .ins-tbl { width:100%; border-collapse:collapse; font-size:14px; }
        .ins-tbl th { padding:10px 14px; text-align:left; font-size:12px; font-weight:600; color:#767676; background:#f9f9f7; border-bottom:1px solid #eeeeec; white-space:nowrap; }
        .ins-tbl td { padding:13px 14px; border-bottom:1px solid #f2f2f0; color:#222; vertical-align:middle; white-space:nowrap; }
        .ins-tbl tr:last-child td { border-bottom:none; }
        .ins-tbl tbody tr:hover td { background:#f9f9f7; }
        .ins-badge { display:inline-block; padding:3px 9px; border-radius:4px; font-size:12px; font-weight:600; }
        .ins-action-btn { padding:6px 14px; background:#111; color:#fff; border:none; border-radius:4px; font-size:13px; cursor:pointer; font-family:inherit; font-weight:600; }
        .ins-action-btn:hover { background:#333; }

        /* 모달 */
        .ins-modal-bg { position:fixed; inset:0; background:rgba(0,0,0,0.45); z-index:500; display:flex; align-items:center; justify-content:center; padding:20px; }
        .ins-modal { background:#fff; border-radius:8px; width:100%; max-width:540px; overflow:hidden; box-shadow:0 20px 60px rgba(0,0,0,0.2); }
        .ins-modal-head { padding:18px 24px; background:#111; color:#fff; display:flex; align-items:center; justify-content:space-between; }
        .ins-modal-body { padding:24px; display:flex; flex-direction:column; gap:16px; }
        .ins-modal-row { display:flex; flex-direction:column; gap:6px; }
        .ins-modal-label { font-size:13px; font-weight:600; color:#555; }
        .ins-select { padding:8px 12px; border:1px solid #d6d6d2; border-radius:4px; font-size:14px; outline:none; font-family:inherit; width:100%; }
        .ins-select:focus { border-color:#111; }
        .ins-textarea { padding:10px 12px; border:1px solid #d6d6d2; border-radius:4px; font-size:14px; outline:none; font-family:inherit; width:100%; height:72px; resize:vertical; line-height:1.6; }
        .ins-textarea:focus { border-color:#111; }
        .ins-input { padding:8px 12px; border:1px solid #d6d6d2; border-radius:4px; font-size:14px; outline:none; font-family:inherit; width:100%; }
        .ins-input:focus { border-color:#111; }

        @media (max-width:768px) { .ins-stat-grid { grid-template-columns:repeat(2,1fr); } }
      `}</style>

      <div className="ins-wrap">
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:'20px', flexWrap:'wrap', gap:'10px' }}>
          <div>
            <div style={{ fontSize:'12px', color:'#767676', marginBottom:'4px' }}>피팅박스 관리 › 반납 검수</div>
            <h1 style={{ fontSize:'22px', fontWeight:800, color:'#111', margin:0 }}>반납 검수</h1>
          </div>
        </div>

        {/* 요약 */}
        <div className="ins-stat-grid">
          {[
            { label:'검수 대기', value: pending.length,   unit:'건', color:'#111' },
            { label:'검수 완료', value: completed.length, unit:'건', color:'#3D6A4F' },
            { label:'이상없음',  value: items.filter(i => i.result === '이상없음').length, unit:'건', color:'#555' },
            { label:'훼손·분실', value: damaged.length,   unit:'건', color:'#b3261e' },
          ].map(s => (
            <div key={s.label} className="ins-stat">
              <div style={{ fontSize:'12px', color:'#767676', marginBottom:'8px' }}>{s.label}</div>
              <div style={{ fontSize:'26px', fontWeight:800, color:s.color }}>
                {s.value}<span style={{ fontSize:'13px', color:'#767676', fontWeight:400, marginLeft:'2px' }}>{s.unit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 테이블 */}
        <div className="ins-card">
          <div className="ins-card-head">
            <span style={{ fontSize:'14px', fontWeight:700, color:'#111' }}>검수 목록</span>
          </div>
          <div className="ins-filter-bar">
            {['전체','검수 대기','이상없음','훼손·분실'].map(f => (
              <button key={f} className={filter === f ? 'ins-fb on' : 'ins-fb'} onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>
          <div style={{ overflowX:'auto' }}>
            <table className="ins-tbl">
              <thead>
                <tr>
                  <th>피팅 ID</th>
                  <th>브랜드</th>
                  <th>제품명</th>
                  <th style={{ textAlign:'center' }}>사이즈</th>
                  <th>고객</th>
                  <th>반납일</th>
                  <th>수거 완료</th>
                  <th style={{ textAlign:'center' }}>검수 결과</th>
                  <th style={{ textAlign:'center' }}>패널티</th>
                  <th style={{ textAlign:'center' }}>처리</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(item => {
                  const rs = resultStyle[item.result] || resultStyle['']
                  return (
                    <tr key={item.id}>
                      <td style={{ fontSize:'13px', color:'#6b6b6b', fontFamily:'monospace' }}>{item.id}</td>
                      <td style={{ fontWeight:600 }}>{item.brand}</td>
                      <td style={{ fontWeight:500, color:'#111' }}>{item.product}</td>
                      <td style={{ textAlign:'center', color:'#555' }}>{item.size}</td>
                      <td>{item.customer}</td>
                      <td style={{ fontSize:'13px', color:'#6b6b6b' }}>{item.returnDate}</td>
                      <td style={{ fontSize:'13px', color:'#6b6b6b' }}>{item.receivedAt}</td>
                      <td style={{ textAlign:'center' }}>
                        {item.result
                          ? <span className="ins-badge" style={{ background:rs.bg, color:rs.color }}>{item.result}</span>
                          : <span style={{ fontSize:'13px', color:'#8a8a8a' }}>미처리</span>
                        }
                      </td>
                      <td style={{ textAlign:'center', fontWeight:700, color: item.penaltyAmt > 0 ? '#b3261e' : '#8a8a8a' }}>
                        {item.penaltyAmt > 0 ? item.penaltyAmt.toLocaleString() + '원' : '-'}
                      </td>
                      <td style={{ textAlign:'center' }}>
                        <button className="ins-action-btn" onClick={() => openModal(item)}>
                          {item.result ? '수정' : '검수'}
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 검수 모달 */}
      {selected && (
        <div className="ins-modal-bg" onClick={() => setSelected(null)}>
          <div className="ins-modal" onClick={e => e.stopPropagation()}>
            <div className="ins-modal-head">
              <div>
                <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.45)', marginBottom:'3px' }}>반납 검수</div>
                <div style={{ fontWeight:700, fontSize:'15px' }}>{selected.product} — {selected.customer}</div>
              </div>
              <button
                onClick={() => setSelected(null)}
                style={{ background:'rgba(255,255,255,0.12)', border:'none', color:'#fff', width:'30px', height:'30px', borderRadius:'50%', cursor:'pointer', fontSize:'16px', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'inherit' }}
              >
                ✕
              </button>
            </div>
            <div className="ins-modal-body">
              <div className="ins-modal-row">
                <div className="ins-modal-label">검수 결과{' '}<span style={{ color:'#b3261e' }}>*</span></div>
                <select className="ins-select" value={editResult} onChange={e => { setEditResult(e.target.value); if (e.target.value !== '훼손' && e.target.value !== '분실') setEditPenalty('') }}>
                  <option value="">선택</option>
                  {resultOpts.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
              {(editResult === '훼손' || editResult === '분실') && (
                <div className="ins-modal-row">
                  <div className="ins-modal-label">패널티 금액 (원)</div>
                  <input className="ins-input" type="number" placeholder="0" value={editPenalty} onChange={e => setEditPenalty(e.target.value)}/>
                  <div style={{ fontSize:'12px', color:'#111' }}>입력 시 고객에게 자동 청구됩니다.</div>
                </div>
              )}
              <div className="ins-modal-row">
                <div className="ins-modal-label">검수 메모</div>
                <textarea className="ins-textarea" placeholder="상태 상세 메모 (내부용)" value={editNote} onChange={e => setEditNote(e.target.value)}/>
              </div>
              <div style={{ display:'flex', gap:'8px', justifyContent:'flex-end' }}>
                <button onClick={() => setSelected(null)} style={{ padding:'10px 20px', background:'#fff', color:'#555', border:'1px solid #d6d6d2', borderRadius:'5px', fontSize:'14px', cursor:'pointer', fontFamily:'inherit' }}>
                  취소
                </button>
                <button onClick={saveResult} disabled={!editResult} style={{ padding:'10px 24px', background: editResult ? '#111' : '#d6d6d2', color:'#fff', border:'none', borderRadius:'5px', fontSize:'14px', fontWeight:600, cursor: editResult ? 'pointer' : 'default', fontFamily:'inherit' }}>
                  저장
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
