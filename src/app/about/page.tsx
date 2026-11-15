// @ts-nocheck
'use client'
import Navbar from '../components/Navbar'
import { SharedStyle, Footer, Img, U } from '../components/ui'

const steps = [
  { t: '취향 확인', d: '몇 가지 질문에 답하면 어울리는 제품을 추천해 드려요.' },
  { t: '피팅박스 신청', d: '입어보고 싶은 제품과 사이즈를 골라 신청해요.' },
  { t: '48시간 착용', d: '박스를 받은 뒤 48시간 동안 집에서 입어봐요.' },
  { t: '구매 또는 반납', d: '마음에 든 옷만 구매를 확정하고, 나머지는 반납해요.' },
]
const reasons = [
  { t: '입어보고 결정', d: '사이즈와 핏은 화면으로 알기 어려워요. 직접 입어본 뒤에 결정할 수 있어요.' },
  { t: '취향 기반 추천', d: '선호하는 스타일과 사이즈를 바탕으로 제품을 골라 드려요.' },
  { t: '집에서 편하게', d: '매장에 가지 않아도 여러 스타일을 비교해 볼 수 있어요.' },
  { t: '위디 포인트', d: '피팅하고 구매할 때마다 포인트가 쌓여요.' },
]

export default function About() {
  return (
    <main>
      <SharedStyle />
      <style>{`
        .a-hero { display: grid; grid-template-columns: 1.1fr 1fr; gap: 56px; align-items: center; padding: 56px 0 72px; }
        .a-hero h1 { font-size: 48px; font-weight: 700; letter-spacing: -0.035em; line-height: 1.25; margin: 0 0 20px; }
        .a-hero p { font-size: 16px; color: #6b6b6b; line-height: 1.8; margin: 0 0 32px; max-width: 28em; }
        .a-media { aspect-ratio: 4/5; max-height: 520px; background: #f4f4f2; overflow: hidden; }
        .a-media img { width: 100%; height: 100%; object-fit: cover; }
        .a-sec { padding: 64px 0; border-top: 1px solid #eee; }
        .a-sec h2 { font-size: 24px; font-weight: 600; letter-spacing: -0.02em; margin: 0 0 32px; }
        .a-why { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px 56px; }
        .a-why b { display: block; font-size: 16px; margin-bottom: 6px; }
        .a-why span { font-size: 14px; color: #6b6b6b; line-height: 1.7; }
        .a-cta { background: #fafaf8; padding: 64px 0; text-align: center; }
        .a-cta h2 { font-size: 28px; font-weight: 700; letter-spacing: -0.03em; margin: 0 0 24px; }
        @media (max-width: 768px) {
          .a-hero { grid-template-columns: 1fr; gap: 28px; padding: 28px 0 40px; }
          .a-hero h1 { font-size: 30px; }
          .a-why { grid-template-columns: 1fr; gap: 24px; }
          .a-sec { padding: 40px 0; }
        }
      `}</style>
      <Navbar />
      <div className="wrap">
        <section className="a-hero">
          <div>
            <h1>입어보고<br />결정하는 패션</h1>
            <p>CLYQ는 옷을 먼저 입어본 뒤 구매 여부를 정하는 패션 플랫폼입니다. 피팅박스로 받아 48시간 동안 입어보고, 마음에 든 옷만 구매하세요.</p>
            <a href="/fitting" className="btn-p">피팅박스 보러가기</a>
          </div>
          <div className="a-media"><Img src={U('1551232864-3f0890e580d9', 1000)} alt="" /></div>
        </section>

        <section className="a-sec">
          <h2>이용 방법</h2>
          <div className="steps-row">
            {steps.map((s, i) => <div key={i} className="step"><div className="step-n">{i + 1}</div><b>{s.t}</b><span>{s.d}</span></div>)}
          </div>
        </section>

        <section className="a-sec">
          <h2>CLYQ를 쓰는 이유</h2>
          <div className="a-why">
            {reasons.map(r => <div key={r.t}><b>{r.t}</b><span>{r.d}</span></div>)}
          </div>
        </section>
      </div>
      <div className="a-cta">
        <div className="wrap">
          <h2>먼저 입어보세요</h2>
          <a href="/fitting" className="btn-p">피팅박스 신청하기</a>
        </div>
      </div>
      <Footer />
    </main>
  )
}
