// @ts-nocheck
'use client'
import { useState } from 'react'
import { Page, Empty, Modal } from '../../_ui'
import { useKV, logAct, dt } from '../../../lib/orders'

export default function Notice() {
  const [list, setList] = useKV('clyq_notices', [])
  const [ed, setEd] = useState(null)
  const save = () => {
    if (!ed.title.trim()) return
    const n = ed.id ? list.map(x => x.id === ed.id ? { ...ed } : x) : [{ ...ed, id: 'n' + Date.now().toString(36), at: new Date().toISOString() }, ...list]
    setList(n); logAct(`공지 ${ed.id ? '수정' : '등록'}: ${ed.title}`); setEd(null)
  }
  const sorted = [...list].sort((a, b) => (b.pin ? 1 : 0) - (a.pin ? 1 : 0) || b.at.localeCompare(a.at))
  return (
    <Page title="공지사항" sub="내부·고객 공지를 작성하고 관리해요" actions={<button className="ad-btn p" onClick={() => setEd({ title: '', body: '', pin: false })}>공지 작성</button>}>
      <div className="ad-note">작성한 공지는 이 브라우저에 저장돼요. 쇼핑몰 화면 노출은 서버 연동 후에 연결합니다.</div>
      <div className="ad-card">
        {sorted.length === 0 ? <Empty>등록된 공지가 없어요.</Empty> : sorted.map(n => (
          <div key={n.id} style={{ padding: '16px 20px', borderBottom: '1px solid #f2f2f0' }}>
            <div className="ad-row" style={{ justifyContent: 'space-between' }}>
              <div><b>{n.pin ? '📌 ' : ''}{n.title}</b><div style={{ fontSize: 13, color: '#767676', marginTop: 2 }}>{dt(n.at)}</div></div>
              <div className="ad-row"><button className="ad-btn s" onClick={() => setEd(n)}>수정</button><button className="ad-btn d s" onClick={() => { if (confirm('삭제할까요?')) { setList(list.filter(x => x.id !== n.id)); logAct('공지 삭제: ' + n.title) } }}>삭제</button></div>
            </div>
            <p style={{ margin: '8px 0 0', fontSize: 14, lineHeight: 1.7, color: '#555', whiteSpace: 'pre-wrap' }}>{n.body}</p>
          </div>))}
      </div>
      {ed && <Modal title={ed.id ? '공지 수정' : '공지 작성'} onClose={() => setEd(null)}>
        <input className="ad-inp" style={{ width: '100%', marginBottom: 10 }} placeholder="제목" value={ed.title} onChange={e => setEd({ ...ed, title: e.target.value })} />
        <textarea className="ad-inp" style={{ width: '100%', minHeight: 140, marginBottom: 10 }} placeholder="내용" value={ed.body} onChange={e => setEd({ ...ed, body: e.target.value })} />
        <label style={{ fontSize: 14, display: 'flex', gap: 6, alignItems: 'center', marginBottom: 14 }}><input type="checkbox" checked={ed.pin} onChange={e => setEd({ ...ed, pin: e.target.checked })} /> 상단 고정</label>
        <button className="ad-btn p" onClick={save}>저장</button>
      </Modal>}
    </Page>
  )
}
