// @ts-nocheck
'use client'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import { SharedStyle, Footer } from '../components/ui'

/* 적립률·레벨·규칙은 CLYQ 사업계획서(D-8) 기준이며 오픈 전 변경될 수 있습니다. 내역은 화면 예시입니다. */
const history = [
  { date: '예시', desc: '회원가입 포인트', amount: '+5,000WT', type: 'earn' },
  { date: '예시', desc: '피팅박스 신청', amount: '-1,000WT', type: 'use' },
  { date: '예시', desc: '피팅박스 회수 완료 페이백', amount: '+100WT', type: 'earn' },
]
const grades = [
  { name: 'Basic', perks: ['구매 적립 3%', '리뷰·댓글 1% / 1%', 'SNS 공유 2%', '회수 페이백 3%~10%'] },
  { name: 'Easy', perks: ['구매 적립 3.2%', '리뷰·댓글 1.1% / 1.1%', 'SNS 공유 2.2%', '회수 페이백 3.5%~10%'] },
  { name: 'Fit', perks: ['구매 적립 3.4%', '리뷰·댓글 1.2% / 1.2%', 'SNS 공유 2.4%', '회수 페이백 4%~10%'] },
  { name: 'Select', perks: ['구매 적립 3.6%', '리뷰·댓글 1.3% / 1.3%', 'SNS 공유 2.6%', '회수 페이백 4.5%~10%'] },
  { name: 'Withy+', perks: ['구매 적립 4%', '리뷰·댓글 1.5% / 1.5%', 'SNS 공유 3%', '회수 페이백 6%~10%'] },
]
const earnWays = [
  { title: '회원가입', desc: '가입하면 기본 포인트를 드려요.', point: '5,000WT' },
  { title: '피팅박스 신청', desc: '신청하면 차감되고, 회수가 끝나면 일부가 돌아와요. 오픈 초기 6~12개월은 무료로 운영할 계획이에요.', point: '-1,000WT' },
  { title: '회수 완료', desc: '피팅박스를 회수하면 페이백돼요.', point: '+100WT' },
  { title: '구매·리뷰·공유', desc: '구매, 리뷰와 댓글, SNS 공유에 레벨별 비율로 적립돼요.', point: '레벨별' },
]
const tabs = [['overview', '적립 방법'], ['grade', '등급'], ['history', '내역']]

export default function WithyPage() {
  const [tab, setTab] = useState('overview')
  const [filter, setFilter] = useState('전체')
  const cur = grades[0]
  const list = filter === '전체' ? history : history.filter(h => (filter === '적립' ? h.type === 'earn' : h.type === 'use'))

  return (
    <main>
      <SharedStyle />
      <style>{`
        .w-sum { display: grid; grid-template-columns: 1.4fr 1fr; gap: 40px; padding: 8px 0 40px; align-items: end; }
        .w-pts { font-size: 56px; font-weight: 700; letter-spacing: -0.03em; line-height: 1; }
        .w-pts small { font-size: 20px; font-weight: 500; margin-left: 6px; color: #6b6b6b; }
        .w-bar { height: 4px; background: #eee; margin: 10px 0 8px; }
        .w-bar i { display: block; height: 100%; background: #3D6A4F; }
        .w-list { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0 40px; padding: 24px 0 72px; }
        .w-row { display: flex; justify-content: space-between; gap: 16px; padding: 18px 0; border-bottom: 1px solid #eee; }
        .w-row b { display: block; font-size: 15px; margin-bottom: 4px; }
        .w-row span { font-size: 13px; color: #6b6b6b; }
        .w-row em { font-style: normal; font-weight: 600; font-size: 15px; white-space: nowrap; }
        .w-grades { display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px; padding: 24px 0 72px; }
        .w-g { border-top: 2px solid #e5e5e5; padding-top: 16px; }
        .w-g.on { border-top-color: #111; }
        .w-g h3 { font-size: 17px; margin: 0 0 4px; }
        .w-g .min { font-size: 12px; color: #8a8a8a; margin-bottom: 12px; }
        .w-g li { list-style: none; font-size: 13px; color: #555; line-height: 1.5; padding: 5px 0; }
        .w-hist { padding: 8px 0 72px; max-width: 760px; }
        .w-note { font-size: 12px; color: #8a8a8a; padding-bottom: 72px; }
        @media (max-width: 768px) {
          .w-sum { grid-template-columns: 1fr; gap: 24px; }
          .w-pts { font-size: 40px; }
          .w-list { grid-template-columns: 1fr; }
          .w-grades { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
      <Navbar />
      <div className="wrap">
        <div className="page-head"><h1>위디</h1><p>구매와 참여로 쌓이는 CLYQ 포인트입니다.</p></div>
        <div className="w-sum">
          <div>
            <div className="count">가입 포인트(계획)</div>
            <div className="w-pts">5,000<small>WT</small></div>
          </div>
          <div>
            <div style={{ fontSize: 14 }}>시작 레벨 {cur.name}</div>
            <div className="count" style={{ marginTop: 8 }}>레벨 승급 조건은 오픈 전에 안내할게요.</div>
          </div>
        </div>

        <div className="tabs">
          {tabs.map(([k, l]) => <button key={k} className={'tab' + (tab === k ? ' on' : '')} onClick={() => setTab(k)}>{l}</button>)}
        </div>

        {tab === 'overview' && (
          <div className="w-list">
            {earnWays.map(w => (
              <div key={w.title} className="w-row"><div><b>{w.title}</b><span>{w.desc}</span></div><em>{w.point}</em></div>
            ))}
          </div>
        )}
        {tab === 'grade' && (
          <div className="w-grades">
            {grades.map(g => (
              <div key={g.name} className={'w-g' + (g.name === cur.name ? ' on' : '')}>
                <h3>{g.name}</h3>
                                <ul>{g.perks.map(p => <li key={p}>{p}</li>)}</ul>
              </div>
            ))}
          </div>
        )}
        {tab === 'history' && (
          <div className="w-hist">
            <div className="bar">
              <div style={{ display: 'flex', gap: 8 }}>
                {['전체', '적립', '사용'].map(f => <button key={f} className={'chip' + (filter === f ? ' on' : '')} onClick={() => setFilter(f)}>{f}</button>)}
              </div>
            </div>
            {list.map((h, i) => (
              <div key={i} className="w-row">
                <div><b style={{ fontWeight: 500 }}>{h.desc}</b><span>{h.date}</span></div>
                <em style={{ color: h.type === 'earn' ? '#3D6A4F' : '#111' }}>{h.amount}</em>
              </div>
            ))}
          </div>
        )}
        <p className="w-note">적립률과 규칙은 사업계획 기준이며 오픈 전 변경될 수 있습니다. 내역은 화면 예시입니다.</p>
      </div>
      <Footer />
    </main>
  )
}
