// @ts-nocheck
'use client'
import { useState } from 'react'

const inspections = [
  { id:'FIT-2026-0510-018', brand:'MARCIA', product:'오버핏 캐시미어 울 코트', size:'M', customer:'이**', returnDate:'2026-05-11', receivedAt:'2026-05-12 09:30', result:'', penaltyAmt:0, note:'' },
  { id:'FIT-2026-0509-031', brand:'MARCIA', product:'실크 블라우스', size:'M', customer:'윤**', returnDate:'2026-05-11', receivedAt:'2026-05-12 10:15', result:'', penaltyAmt:0, note:'' },
  { id:'FIT-2026-0509-042', brand:'D.POUND', product:'캐시미어 니트', size:'L', customer:'한**', returnDate:'2026-05-10', receivedAt:'2026-05-11 14:00', result:'이상없음', penaltyAmt:0, note:'세탁 완료' },
  { id:'FIT-2026-0508-031', brand:'MARCIA', product:'오버핏 캐시미어 울 코트', size:'L', customer:'정**', returnDate:'2026-05-10', receivedAt:'2026-05-10 16:00', result:'이상없음', penaltyAmt:0, note:'' },
  { id:'FIT-2026-0507-024', brand:'MATIN KIM', product:'레더 재킷', size:'M', customer:'한**', returnDate:'2026-05-09', receivedAt:'2026-05-10 09:00', result:'훼손', penaltyAmt:136800, note:'소매 부분 스크래치 확인' },
  { id:'FIT-2026-0506-019', brand:'EENK', product:'더블 브레스트 코트', size:'S', customer:'조**', returnDate:'2026-05-08', receivedAt:'2026-05-09 11:30', result:'이상없음', penaltyAmt:0, note:'' },
]

const resultOpts = ['이상없음','경미한 오염','훼손','분실']
const resultStyle = {
  '이상없음':   { bg:'#f0fdf4', color:'#16a34a' },
  '경미한 오염':{ bg:'#fefce8', color:'#ca8a04' },
  '훼손':       { bg:'#fff1f0', color:'#dc2626' },
  '분실':       { bg:'#fff1f0', color:'#dc2626' },
  '':           { bg:'#f5f5f7', color:'#aaa' },
}

export default function InspectionPage() {
  const [items, setItems]         = useState(inspections)
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
    setItems(prev => prev.map(i =>
      i.id === selected.id
        ? { ...i, result: editResult, note: editNote, penaltyAmt: Number(editPenalty) || 0 }
        : i
    ))
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
        .ins-stat { background:#fff; border:1px solid #e8e8eb; border-radius:8px; padding:16px 20px; }
        .ins-card { background:#fff; border:1px solid #e8e8eb; border-radius:8px; overflow:hidden; }
        .ins-card-head { padding:13px 20px; border-bottom:1px solid #f0f0f2; display:flex; align-items:center; justify-content:space-between; }
        .ins-filter-bar { display:flex; gap:6px; padding:12px 20px; border-bottom:1px solid #f0f0f2; flex-wrap:wrap; }
        .ins-fb { padding:5px 14px; border-radius:20px; border:1px solid #d8d8dc; background:#fff; font-size:12px; cursor:pointer; color:#666; font-family:inherit; }
        .ins-fb.on { background:#1a1a2e; border-color:#1a1a2e; color:#fff; font-weight:600; }
        .ins-tbl { width:100%; border-collapse:collapse; font-size:13px; }
        .ins-tbl th { padding:10px 14px; text-align:left; font-size:11px; font-weight:600; color:#999; background:#fafafa; border-bottom:1px solid #f0f0f2; white-space:nowrap; }
        .ins-tbl td { padding:13px 14px; border-bottom:1px solid #f5f5f7; color:#333; vertical-align:middle; white-space:nowrap; }
        .ins-tbl tr:last-child td { border-bottom:none; }
        .ins-tbl tbody tr:hover td { background:#fafafa; }
        .ins-badge { display:inline-block; padding:3px 9px; border-radius:4px; font-size:11px; font-weight:600; }
        .ins-action-btn { padding:6px 14px; background:#C94E1A; color:#fff; border:none; border-radius:4px; font-size:12px; cursor:pointer; font-family:inherit; font-weight:600; }
        .ins-action-btn:hover { background:#a83d14; }

        /* 모달 */
        .ins-modal-bg { position:fixed; inset:0; background:rgba(0,0,0,0.45); z-index:500; display:flex; align-items:center; justify-content:center; padding:20px; }
        .ins-modal { background:#fff; border-radius:8px; width:100%; max-width:540px; overflow:hidden; box-shadow:0 20px 60px rgba(0,0,0,0.2); }
        .ins-modal-head { padding:18px 24px; background:#1a1a2e; color:#fff; display:flex; align-items:center; justify-content:space-between; }
        .ins-modal-body { padding:24px; display:flex; flex-direction:column; gap:16px; }
        .ins-modal-row { display:flex; flex-direction:column; gap:6px; }
        .ins-modal-label { font-size:12px; font-weight:600; color:#555; }
        .ins-select { padding:8px 12px; border:1px solid #d0d0d8; border-radius:4px; font-size:13px; outline:none; font-family:inherit; width:100%; }
        .ins-select:focus { border-color:#C94E1A; }
        .ins-textarea { padding:10px 12px; border:1px solid #d0d0d8; border-radius:4px; font-size:13px; outline:none; font-family:inherit; width:100%; height:72px; resize:vertical; line-height:1.6; }
        .ins-textarea:focus { border-color:#C94E1A; }
        .ins-input { padding:8px 12px; border:1px solid #d0d0d8; border-radius:4px; font-size:13px; outline:none; font-family:inherit; width:100%; }
        .ins-input:focus { border-color:#C94E1A; }

        @media (max-width:768px) { .ins-stat-grid { grid-template-columns:repeat(2,1fr); } }
      `}</style>

      <div className="ins-wrap">
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:'20px', flexWrap:'wrap', gap:'10px' }}>
          <div>
            <div style={{ fontSize:'11px', color:'#aaa', marginBottom:'4px' }}>피팅박스 관리 › 반납 검수</div>
            <h1 style={{ fontSize:'22px', fontWeight:800, color:'#1a1a2e', margin:0 }}>반납 검수</h1>
          </div>
        </div>

        {/* 요약 */}
        <div className="ins-stat-grid">
          {[
            { label:'검수 대기', value: pending.length,   unit:'건', color:'#C94E1A' },
            { label:'검수 완료', value: completed.length, unit:'건', color:'#16a34a' },
            { label:'이상없음',  value: items.filter(i => i.result === '이상없음').length, unit:'건', color:'#2563eb' },
            { label:'훼손·분실', value: damaged.length,   unit:'건', color:'#dc2626' },
          ].map(s => (
            <div key={s.label} className="ins-stat">
              <div style={{ fontSize:'11px', color:'#999', marginBottom:'8px' }}>{s.label}</div>
              <div style={{ fontSize:'26px', fontWeight:800, color:s.color }}>
                {s.value}<span style={{ fontSize:'12px', color:'#aaa', fontWeight:400, marginLeft:'2px' }}>{s.unit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 테이블 */}
        <div className="ins-card">
          <div className="ins-card-head">
            <span style={{ fontSize:'14px', fontWeight:700, color:'#1a1a2e' }}>검수 목록</span>
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
                      <td style={{ fontSize:'12px', color:'#888', fontFamily:'monospace' }}>{item.id}</td>
                      <td style={{ fontWeight:600 }}>{item.brand}</td>
                      <td style={{ fontWeight:500, color:'#1a1a2e' }}>{item.product}</td>
                      <td style={{ textAlign:'center', color:'#666' }}>{item.size}</td>
                      <td>{item.customer}</td>
                      <td style={{ fontSize:'12px', color:'#888' }}>{item.returnDate}</td>
                      <td style={{ fontSize:'12px', color:'#888' }}>{item.receivedAt}</td>
                      <td style={{ textAlign:'center' }}>
                        {item.result
                          ? <span className="ins-badge" style={{ background:rs.bg, color:rs.color }}>{item.result}</span>
                          : <span style={{ fontSize:'12px', color:'#bbb' }}>미처리</span>
                        }
                      </td>
                      <td style={{ textAlign:'center', fontWeight:700, color: item.penaltyAmt > 0 ? '#dc2626' : '#bbb' }}>
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
                <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.45)', marginBottom:'3px' }}>반납 검수</div>
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
                <div className="ins-modal-label">검수 결과{' '}<span style={{ color:'#dc2626' }}>*</span></div>
                <select className="ins-select" value={editResult} onChange={e => { setEditResult(e.target.value); if (e.target.value !== '훼손' && e.target.value !== '분실') setEditPenalty('') }}>
                  <option value="">선택</option>
                  {resultOpts.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
              {(editResult === '훼손' || editResult === '분실') && (
                <div className="ins-modal-row">
                  <div className="ins-modal-label">패널티 금액 (원)</div>
                  <input className="ins-input" type="number" placeholder="0" value={editPenalty} onChange={e => setEditPenalty(e.target.value)}/>
                  <div style={{ fontSize:'11px', color:'#C94E1A' }}>입력 시 고객에게 자동 청구됩니다.</div>
                </div>
              )}
              <div className="ins-modal-row">
                <div className="ins-modal-label">검수 메모</div>
                <textarea className="ins-textarea" placeholder="상태 상세 메모 (내부용)" value={editNote} onChange={e => setEditNote(e.target.value)}/>
              </div>
              <div style={{ display:'flex', gap:'8px', justifyContent:'flex-end' }}>
                <button onClick={() => setSelected(null)} style={{ padding:'10px 20px', background:'#fff', color:'#555', border:'1px solid #d0d0d8', borderRadius:'5px', fontSize:'13px', cursor:'pointer', fontFamily:'inherit' }}>
                  취소
                </button>
                <button onClick={saveResult} disabled={!editResult} style={{ padding:'10px 24px', background: editResult ? '#C94E1A' : '#d0d0d8', color:'#fff', border:'none', borderRadius:'5px', fontSize:'13px', fontWeight:600, cursor: editResult ? 'pointer' : 'default', fontFamily:'inherit' }}>
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
