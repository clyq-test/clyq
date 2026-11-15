// @ts-nocheck
'use client'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import { SharedStyle, Footer, Img, U } from '../components/ui'

/* 샘플 게시글 (실제 회원 글이 아님) */
const categories = ['전체', '피팅 후기', '스타일 공유', 'Q&A', '자유게시판', '브랜드 이야기']
const initial = [
  { id: 1, category: '피팅 후기', title: '코트 피팅박스 후기, S와 M 두 사이즈 비교', body: 'S는 어깨가 맞았고 가슴이 약간 타이트했어요. M은 여유 있게 입기 좋아서 M으로 구매를 확정했어요.', author: '김지연', date: '2026.05.01', likes: 48, image: U('1539533018447-63fcce2678e3', 500) },
  { id: 2, category: '스타일 공유', title: '피팅박스로 입어본 가을 출근룩 조합', body: '드레스와 코트를 함께 받아 입어보고 코트만 구매했어요. 조합이 생각보다 잘 어울렸어요.', author: '박소연', date: '2026.04.30', likes: 72, image: U('1515372039744-b8f02a3ae446', 500) },
  { id: 3, category: 'Q&A', title: '반납할 때 구김이 생겼는데 어떻게 하나요?', body: '반납 전날 코트가 조금 구겨졌어요. 다림질을 하고 반납해도 되는지 궁금해요.', author: '이민준', date: '2026.04.29', likes: 15, answer: '운영 정책은 오픈 전 확정 예정입니다. 확정되면 이 답변을 갱신합니다.' },
  { id: 4, category: '피팅 후기', title: '레더 재킷 피팅박스 솔직 후기', body: '가격 때문에 망설이다 피팅박스로 신청했어요. 입어보니 생각보다 무겁지 않고 핏이 좋아서 구매했어요.', author: '최유리', date: '2026.04.28', likes: 93, image: U('1551028719-00167b16eac5', 500) },
  { id: 5, category: '자유게시판', title: '위디 포인트가 쌓이는 방식 정리', body: '피팅박스를 이용하고 리뷰를 쓰다 보니 포인트가 꾸준히 쌓여요. 정리해서 공유해요.', author: '강민수', date: '2026.04.27', likes: 134 },
  { id: 6, category: '브랜드 이야기', title: '입점 브랜드 스타일 비교', body: 'CLYQ에서 처음 접한 브랜드들의 특징을 정리해 봤어요.', author: '홍지수', date: '2026.04.26', likes: 67 },
]

export default function Community() {
  const [cat, setCat] = useState('전체')
  const [posts, setPosts] = useState(initial)
  const [sel, setSel] = useState(null)
  const [writing, setWriting] = useState(false)
  const [draft, setDraft] = useState({ title: '', body: '', category: '피팅 후기' })
  const [comments, setComments] = useState({})
  const [cmt, setCmt] = useState('')
  const [liked, setLiked] = useState({})

  const list = posts.filter(p => cat === '전체' || p.category === cat)

  function like(id) {
    const on = !liked[id]
    setLiked({ ...liked, [id]: on })
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + (on ? 1 : -1) } : p))
  }
  function submit() {
    if (!draft.title.trim() || !draft.body.trim()) return
    setPosts([{ id: Date.now(), ...draft, author: '나', date: '방금', likes: 0 }, ...posts])
    setDraft({ title: '', body: '', category: '피팅 후기' }); setWriting(false)
  }
  function addComment() {
    if (!cmt.trim() || !sel) return
    setComments({ ...comments, [sel.id]: [...(comments[sel.id] || []), { name: '나', text: cmt }] })
    setCmt('')
  }

  return (
    <main>
      <SharedStyle />
      <style>{`
        .c-top { display: flex; justify-content: space-between; align-items: flex-end; gap: 16px; flex-wrap: wrap; }
        .c-item { display: flex; gap: 20px; justify-content: space-between; padding: 22px 0; border-bottom: 1px solid #eee; width: 100%; text-align: left; }
        .c-item:hover .c-title { text-decoration: underline; }
        .c-cat { font-size: 12px; color: #3D6A4F; font-weight: 500; margin-bottom: 4px; }
        .c-title { font-size: 16px; font-weight: 500; margin-bottom: 6px; }
        .c-body { font-size: 14px; color: #6b6b6b; line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .c-meta { font-size: 12px; color: #9a9a9a; margin-top: 8px; display: flex; gap: 12px; }
        .c-thumb { width: 96px; height: 96px; flex-shrink: 0; background: #f4f4f2; overflow: hidden; }
        .c-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .c-list { padding-bottom: 72px; max-width: 880px; }
        .modal-bg { position: fixed; inset: 0; background: rgba(0,0,0,.4); z-index: 1000; display: flex; justify-content: flex-end; }
        .modal { width: min(520px, 100vw); height: 100dvh; background: #fff; display: flex; flex-direction: column; }
        .m-head { display: flex; justify-content: space-between; align-items: center; padding: 12px 12px 12px 24px; border-bottom: 1px solid #eee; font-weight: 600; }
        .m-body { flex: 1; overflow-y: auto; padding: 24px; }
        .m-body h2 { font-size: 20px; margin: 0 0 8px; letter-spacing: -0.02em; }
        .m-text { font-size: 15px; line-height: 1.8; color: #333; margin: 20px 0; }
        .ans { background: #fafaf8; padding: 14px 16px; font-size: 14px; line-height: 1.7; margin-bottom: 20px; }
        .inp { width: 100%; padding: 12px 14px; border: 1px solid #e5e5e5; font-size: 14px; font-family: inherit; min-height: 44px; margin-bottom: 12px; }
        .inp:focus { outline: none; border-color: #111; }
        .cm { padding: 12px 0; border-bottom: 1px solid #eee; font-size: 14px; }
        .cm b { font-size: 13px; margin-right: 8px; }
        .c-note { font-size: 12px; color: #8a8a8a; padding: 16px 0 72px; }
      `}</style>
      <Navbar />
      <div className="wrap">
        <div className="page-head c-top">
          <div><h1>커뮤니티</h1><p>피팅 후기와 스타일을 함께 나눠요.</p></div>
          <button className="btn-p" onClick={() => setWriting(true)}>글쓰기</button>
        </div>
        <div className="tabs">
          {categories.map(c => <button key={c} className={'tab' + (cat === c ? ' on' : '')} onClick={() => setCat(c)}>{c}</button>)}
        </div>
        <div className="c-list">
          {list.length === 0 && <div className="empty">아직 글이 없어요. 첫 글을 남겨 보세요.</div>}
          {list.map(p => (
            <button key={p.id} className="c-item" onClick={() => setSel(p)}>
              <div style={{ minWidth: 0 }}>
                <div className="c-cat">{p.category}</div>
                <div className="c-title">{p.title}</div>
                <div className="c-body">{p.body}</div>
                <div className="c-meta"><span>{p.author}</span><span>{p.date}</span><span>좋아요 {p.likes}</span><span>댓글 {(comments[p.id] || []).length}</span></div>
              </div>
              {p.image && <div className="c-thumb"><Img src={p.image} alt="" /></div>}
            </button>
          ))}
          <p className="c-note">현재 표시된 글은 화면 구성을 위한 샘플입니다.</p>
        </div>
      </div>

      {sel && (
        <div className="modal-bg" onClick={() => setSel(null)}>
          <div className="modal" role="dialog" aria-modal="true" onClick={e => e.stopPropagation()}>
            <div className="m-head"><span>{sel.category}</span><button className="d-x" style={{ width: 44, height: 44 }} onClick={() => setSel(null)} aria-label="닫기">✕</button></div>
            <div className="m-body">
              <h2>{sel.title}</h2>
              <div className="count">{sel.author} · {sel.date}</div>
              {sel.image && <div style={{ marginTop: 20 }}><Img src={sel.image.replace('w=500', 'w=900')} alt="" style={{ width: '100%', maxHeight: 360, objectFit: 'cover' }} /></div>}
              <p className="m-text">{sel.body}</p>
              {sel.answer && <div className="ans"><b>운영자 답변</b><br />{sel.answer}</div>}
              <button className={'chip' + (liked[sel.id] ? ' on' : '')} onClick={() => like(sel.id)}>좋아요 {posts.find(p => p.id === sel.id)?.likes}</button>
              <div style={{ margin: '24px 0 8px', fontWeight: 600, fontSize: 14 }}>댓글 {(comments[sel.id] || []).length}</div>
              {(comments[sel.id] || []).map((c, i) => <div key={i} className="cm"><b>{c.name}</b>{c.text}</div>)}
              <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                <input className="inp" style={{ marginBottom: 0 }} placeholder="댓글을 입력하세요" value={cmt} onChange={e => setCmt(e.target.value)} onKeyDown={e => e.key === 'Enter' && addComment()} />
                <button className="btn-p" style={{ minHeight: 44, padding: '0 20px' }} onClick={addComment}>등록</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {writing && (
        <div className="modal-bg" onClick={() => setWriting(false)}>
          <div className="modal" role="dialog" aria-modal="true" onClick={e => e.stopPropagation()}>
            <div className="m-head"><span>글쓰기</span><button className="d-x" style={{ width: 44, height: 44 }} onClick={() => setWriting(false)} aria-label="닫기">✕</button></div>
            <div className="m-body">
              <select className="inp" value={draft.category} onChange={e => setDraft({ ...draft, category: e.target.value })}>
                {categories.slice(1).map(c => <option key={c}>{c}</option>)}
              </select>
              <input className="inp" placeholder="제목" value={draft.title} onChange={e => setDraft({ ...draft, title: e.target.value })} />
              <textarea className="inp" rows={10} placeholder="내용을 입력하세요" value={draft.body} onChange={e => setDraft({ ...draft, body: e.target.value })} />
              <button className="btn-p" style={{ width: '100%' }} onClick={submit}>등록하기</button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </main>
  )
}
