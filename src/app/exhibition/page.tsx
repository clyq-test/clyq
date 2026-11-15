// @ts-nocheck
'use client'
import Navbar from '../components/Navbar'
import { SharedStyle, Footer, Img } from '../components/ui'
import { EXHIBITIONS, exhibitionItems, MOODS, moodItems } from '../lib/curation'

export default function Page() {
  return (
    <main>
      <SharedStyle />
      <style>{`
        .ex-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; padding-bottom: 56px; }
        .ex-card { color: inherit; display: block; }
        .ex-img { aspect-ratio: 4/5; background: #f4f4f2; overflow: hidden; margin-bottom: 12px; }
        .ex-img img { width: 100%; height: 100%; object-fit: cover; transition: transform .5s; }
        .ex-card:hover .ex-img img { transform: scale(1.03); }
        .ex-card b { display: block; font-size: 17px; margin-bottom: 4px; } .ex-card span { font-size: 13px; color: #6b6b6b; }
        .ex-h { font-size: 20px; font-weight: 600; margin: 8px 0 16px; }
        .ex-moods { display: flex; gap: 8px; flex-wrap: wrap; padding-bottom: 72px; }
        @media (max-width: 900px) { .ex-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .ex-grid { grid-template-columns: 1fr; } }
      `}</style>
      <Navbar />
      <div className="wrap-full">
        <div className="page-head"><h1>기획전</h1><p>테마와 무드로 묶은 제품 모음이에요.</p></div>
        <div className="ex-grid">
          {EXHIBITIONS.map(e => { const l = exhibitionItems(e); return (
            <a key={e.key} className="ex-card" href={'/products/new?ex=' + e.key}>
              <div className="ex-img">{l[0] && <Img src={l[0].image} alt="" />}</div>
              <b>{e.title}</b><span>{e.sub} · {l.length}개</span>
            </a>
          ) })}
        </div>
        <h2 className="ex-h">무드별로 보기</h2>
        <div className="ex-moods">
          {MOODS.map(m => <a key={m.key} className="chip" href={'/products/new?m=' + m.key}>{m.label} · {moodItems(m.key).length}</a>)}
        </div>
      </div>
      <Footer />
    </main>
  )
}
