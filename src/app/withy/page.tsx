// @ts-nocheck
'use client'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import { SharedStyle, Footer } from '../components/ui'

/* 아래 적립률·등급·요금은 화면 구성을 위한 예시 값이며 확정된 정책이 아닙니다. */
const history = [
  { date: '2026.04.28', desc: '오버핏 코트 구매 확정', amount: '+428P', type: 'earn' },
  { date: '2026.04.25', desc: '피팅 서비스 이용', amount: '+50P', type: 'earn' },
  { date: '2026.04.20', desc: '위디 포인트 사용', amount: '-200P', type: 'use' },
  { date: '2026.04.15', desc: '셔링 드레스 구매 확정', amount: '+198P', type: 'earn' },
  { date: '2026.04.12', desc: '피팅 서비스 이용', amount: '+50P', type: 'earn' },
  { date: '2026.04.10', desc: '리뷰 작성 보너스', amount: '+30P', type: 'earn' },
]
const grades = [
  { name: '일반', min: 0, perks: ['피팅 시 50P 적립', '구매가의 0.1% 적립'] },
  { name: '실버', min: 1000, perks: ['피팅 시 70P 적립', '구매가의 0.15% 적립', '신상품 먼저 보기'] },
  { name: '골드', min: 5000, perks: ['피팅 시 100P 적립', '구매가의 0.2% 적립', '신상품 먼저 보기'] },
  { name: 'VIP', min: 20000, perks: ['피팅 시 150P 적립', '구매가의 0.3% 적립', '전담 문의 창구'] },
]
const earnWays = [
  { title: '피팅 서비스 이용', desc: '피팅박스를 신청하면 자동으로 적립돼요.', point: '50P' },
  { title: '구매 확정', desc: '구매를 확정한 금액에 비례해 적립돼요.', point: '0.1~0.3%' },
  { title: '리뷰 작성', desc: '구매한 제품의 후기를 남기면 적립돼요.', point: '30P' },
  { title: '친구 초대', desc: '초대한 친구가 첫 피팅을 신청하면 양쪽에 적립돼요.', point: '200P' },
]
const tabs = [['overview', '적립 방법'], ['grade', '등급'], ['history', '내역']]

export default function WithyPage() {
  const [tab, setTab] = useState('overview')
  const [filter, setFilter] = useState('전체')
  const myPoints = 2400
  const cur = grades[1]
  const nxt = grades[2]
  const progress = Math.min(100, ((myPoints - cur.min) / (nxt.min - cur.min)) * 100)
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
        .w-grades { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; padding: 24px 0 72px; }
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
        <div className="page-head"><h1>위디</h1><p>피팅하고 구매할 때마다 쌓이는 CLYQ 포인트입니다.</p></div>
        <div className="w-sum">
          <div>
            <div className="count">보유 포인트</div>
            <div className="w-pts">{myPoints.toLocaleString()}<small>P</small></div>
          </div>
          <div>
            <div style={{ fontSize: 14 }}>현재 {cur.name} 등급</div>
            <div className="w-bar"><i style={{ width: progress + '%' }} /></div>
            <div className="count">{nxt.name}까지 {(nxt.min - myPoints).toLocaleString()}P 남았어요</div>
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
                <div className="min">{g.min.toLocaleString()}P 이상</div>
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
        <p className="w-note">화면에 표시된 적립률과 등급 기준은 예시이며, 정책 확정 후 변경될 수 있습니다.</p>
      </div>
      <Footer />
    </main>
  )
}
