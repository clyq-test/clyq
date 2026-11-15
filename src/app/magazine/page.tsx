// @ts-nocheck
'use client'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import { SharedStyle, Footer, Img, U } from '../components/ui'

/* 샘플 콘텐츠 — 실제 기사·제휴·통계가 아니며, 오픈 전에 실제 콘텐츠로 교체해야 합니다. */
const categories = ['전체', '트렌드', '스타일링', '서비스']
const articles = [
  { id: 1, category: '트렌드', title: '가을·겨울 아우터, 이번 시즌 실루엣', desc: '넉넉한 오버핏과 단정한 롱 기장이 함께 보이는 시즌입니다.', date: '2026.05.01', read: '5분', image: U('1469334031218-e382a71b716b', 1000) },
  { id: 2, category: '서비스', title: '피팅박스, 이렇게 이용하세요', desc: '신청부터 48시간 착용, 구매 확정과 반납까지 한 번에 정리했어요.', date: '2026.04.28', read: '3분', image: U('1551232864-3f0890e580d9', 800) },
  { id: 3, category: '스타일링', title: '코트 하나로 완성하는 출근룩', desc: '같은 코트도 이너와 신발에 따라 분위기가 달라져요.', date: '2026.04.25', read: '4분', image: U('1539533018447-63fcce2678e3', 800) },
  { id: 4, category: '트렌드', title: '이번 시즌 컬러, 버건디와 오트밀', desc: '차분한 톤이 중심이 되는 컬러 팔레트를 살펴봅니다.', date: '2026.04.20', read: '4분', image: U('1581044777550-4cfa60707c03', 800) },
  { id: 5, category: '스타일링', title: '사이즈가 애매할 때 고르는 법', desc: '어깨와 기장을 기준으로 두 사이즈를 비교하는 방법입니다.', date: '2026.04.15', read: '3분', image: U('1515372039744-b8f02a3ae446', 800) },
  { id: 6, category: '서비스', title: '위디 포인트 모으는 방법', desc: '피팅, 구매, 리뷰로 포인트가 쌓이는 흐름을 안내합니다.', date: '2026.04.10', read: '2분', image: U('1583744946564-b52ac1c389c8', 800) },
]

export default function Magazine() {
  const [cat, setCat] = useState('전체')
  const list = articles.filter(a => cat === '전체' || a.category === cat)
  const [first, ...rest] = list

  return (
    <main>
      <SharedStyle />
      <style>{`
        .m-feat { display: grid; grid-template-columns: 1.3fr 1fr; gap: 40px; align-items: center; padding: 32px 0 48px; color: inherit; }
        .m-feat-img { aspect-ratio: 16/10; background: #f4f4f2; overflow: hidden; }
        .m-feat-img img { width: 100%; height: 100%; object-fit: cover; transition: transform .5s ease; }
        .m-feat:hover .m-feat-img img { transform: scale(1.03); }
        .m-feat h2 { font-size: 30px; font-weight: 700; letter-spacing: -0.03em; line-height: 1.35; margin: 8px 0 12px; }
        .m-feat p { font-size: 15px; color: #6b6b6b; line-height: 1.7; margin: 0 0 16px; }
        .m-cat { font-size: 12px; color: #3D6A4F; font-weight: 500; }
        .m-meta { font-size: 12px; color: #9a9a9a; }
        .m-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px 24px; padding-bottom: 32px; }
        .m-card { display: block; color: inherit; }
        .m-card .pc-img { aspect-ratio: 4/3; }
        .m-card h3 { font-size: 17px; font-weight: 600; line-height: 1.45; margin: 6px 0 6px; letter-spacing: -0.01em; }
        .m-card p { font-size: 13px; color: #6b6b6b; line-height: 1.6; margin: 0 0 8px; }
        .m-note { font-size: 12px; color: #8a8a8a; padding-bottom: 72px; }
        @media (max-width: 1024px) { .m-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 768px) {
          .m-feat { grid-template-columns: 1fr; gap: 16px; padding: 16px 0 32px; }
          .m-feat h2 { font-size: 22px; }
          .m-grid { grid-template-columns: 1fr; gap: 28px; }
        }
      `}</style>
      <Navbar />
      <div className="wrap">
        <div className="page-head"><h1>매거진</h1><p>스타일링과 서비스 이용 팁을 전해드려요.</p></div>
        <div className="tabs">
          {categories.map(c => <button key={c} className={'tab' + (cat === c ? ' on' : '')} onClick={() => setCat(c)}>{c}</button>)}
        </div>
        {first && (
          <a href="#" className="m-feat" onClick={e => e.preventDefault()}>
            <div className="m-feat-img"><Img src={first.image} alt="" /></div>
            <div>
              <div className="m-cat">{first.category}</div>
              <h2>{first.title}</h2>
              <p>{first.desc}</p>
              <div className="m-meta">{first.date} · 읽는 시간 {first.read}</div>
            </div>
          </a>
        )}
        <div className="m-grid">
          {rest.map(a => (
            <a key={a.id} href="#" className="m-card" onClick={e => e.preventDefault()}>
              <div className="pc-img"><Img src={a.image} alt="" /></div>
              <div className="m-cat">{a.category}</div>
              <h3>{a.title}</h3>
              <p>{a.desc}</p>
              <div className="m-meta">{a.date} · 읽는 시간 {a.read}</div>
            </a>
          ))}
        </div>
        <p className="m-note">현재 표시된 콘텐츠는 화면 구성을 위한 샘플입니다.</p>
      </div>
      <Footer />
    </main>
  )
}
