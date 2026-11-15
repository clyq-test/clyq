// @ts-nocheck
'use client'
import Navbar from '../components/Navbar'
import { SharedStyle, Footer, Img, U } from '../components/ui'

/* 내용 출처: CLYQ 사업계획서 ver11 (고객에게 보여줄 수 있는 서비스 영역만 사용. 재무·투자 등 대외비 내용은 제외) */
const flow = [
  { t: '수령', d: '관심 있는 옷을 여러 벌 한꺼번에 집에서 받아봐요.', img: U('1551232864-3f0890e580d9', 900) },
  { t: '착용', d: '내 공간, 내 조명, 내 옷들과 함께 직접 입어보고 비교해요.', img: U('1581044777550-4cfa60707c03', 900) },
  { t: '결정', d: '마음에 든 옷만 구매하고, 나머지는 돌려보내요.', img: U('1583744946564-b52ac1c389c8', 900) },
]
const steps = [
  { t: '취향 분석', d: '온보딩 설문으로 취향과 사이즈를 알려주면, 그에 맞는 제품을 추천해요.' },
  { t: '피팅박스 신청', d: '입어보고 싶은 제품을 골라 신청해요. 피팅용 제품이 재사용 가방에 담겨 와요.' },
  { t: '48시간 착용', d: '받은 날부터 48시간 동안 집에서 입어보며 비교해요.' },
  { t: '구매 또는 회수', d: '구매를 확정하면 새 제품이 브랜드에서 배송되고, 피팅용 제품은 회수돼요.' },
  { t: '다음 피팅', d: '회수가 끝나면 바로 다음 피팅을 신청할 수 있어요.' },
]
const bag = [
  ['크기', '50cm × 35cm (A3보다 큰 옷도 수납)'],
  ['소재', '600D 리사이클 폴리에스터, 세탁 가능'],
  ['내구성', '50회 이상 재사용을 기준으로 설계'],
  ['여닫이', '벨크로 덮개, 테이프 없이 다시 쓰는 구조'],
  ['구성', '투명 윈도우, 송장 주머니, 측면 손잡이'],
]
const levels = [
  ['Basic', '3%', '1% / 1%', '2%', '3%~10%'],
  ['Easy', '3.2%', '1.1% / 1.1%', '2.2%', '3.5%~10%'],
  ['Fit', '3.4%', '1.2% / 1.2%', '2.4%', '4%~10%'],
  ['Select', '3.6%', '1.3% / 1.3%', '2.6%', '4.5%~10%'],
  ['Withy+', '4%', '1.5% / 1.5%', '3%', '6%~10%'],
]
const roadmap = [
  ['1단계', '캐주얼복', '남녀 모두가 입는 카테고리에서 시작해요.'],
  ['2단계', '여성복 · 신발', '신발은 위생 관리 체계를 갖춘 뒤 함께 열어요.'],
  ['3단계', '스포츠', '기능성 옷의 핏을 직접 확인하고 싶은 수요를 담아요.'],
  ['4단계', '아웃도어', '가격이 높고 반품이 잦은 카테고리로 넓혀요.'],
]
const faq = [
  ['렌탈인가요, 쇼핑인가요?', '입어본 뒤 구매 여부를 정하는 쇼핑이에요. 구매를 확정한 제품만 결제하고, 판매가는 신제품과 같게 운영할 계획이에요.'],
  ['다른 사람이 입은 옷이 오는 건가요?', '피팅 전용으로만 쓰는 제품이에요. 회수 후 검수를 거치고, 5회 이용 중 4회는 업체용 스팀으로 관리하고 1회는 전문 세탁업체에 맡겨요. 피팅용 제품은 일반 판매하지 않아요.'],
  ['구매하면 어떤 제품이 오나요?', '구매를 확정하면 입점 브랜드가 새 제품을 직접 보내요. 피팅했던 제품이 아니에요.'],
  ['전부 반납해도 되나요?', '네. 입어보고 마음에 들지 않으면 전부 반납할 수 있어요. 반납 비용 등 세부 조건은 오픈 전에 이용약관으로 확정해 안내할게요.'],
  ['제품이 훼손되면요?', '피팅 제품은 책임을 갖고 관리해야 해요. 훼손 정도에 따른 기준은 이용약관에 명시되며, 가입할 때 동의를 받아요.'],
  ['정품인가요? A/S는요?', '입점 심사를 통과한 브랜드만 판매해요. A/S는 브랜드 정책과 CLYQ 고객센터가 함께 맡아요.'],
]

export default function About() {
  return (
    <main>
      <SharedStyle />
      <style>{`
        .ab { max-width: 1240px; margin: 0 auto; padding: 0 40px; width: 100%; }
        .ab-hero { position: relative; height: clamp(460px, 74vh, 760px); background: #222; color: #fff; overflow: hidden; }
        .ab-hero > img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .ab-hero::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(0,0,0,.6), rgba(0,0,0,.1) 60%, rgba(0,0,0,0)); }
        .ab-hero div { position: absolute; z-index: 1; left: 56px; bottom: 72px; max-width: 640px; }
        .ab-hero h1 { font-size: 56px; font-weight: 700; letter-spacing: -0.035em; line-height: 1.2; margin: 0 0 16px; }
        .ab-hero p { font-size: 16px; line-height: 1.8; margin: 0; color: rgba(255,255,255,.88); word-break: keep-all; }
        .ab-sec { padding: 88px 0; border-bottom: 1px solid #eee; }
        .ab-sec h2 { font-size: 28px; font-weight: 700; letter-spacing: -0.03em; line-height: 1.35; margin: 0 0 12px; word-break: keep-all; }
        .ab-lead { font-size: 15px; color: #6b6b6b; line-height: 1.8; margin: 0 0 40px; max-width: 40em; word-break: keep-all; }
        .ab-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
        .ab-img { background: #f4f4f2; overflow: hidden; aspect-ratio: 4/5; }
        .ab-img img { width: 100%; height: 100%; object-fit: cover; }
        .ab-img.wide { aspect-ratio: 16/10; }
        .ab-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .ab-card .ab-img { aspect-ratio: 3/4; margin-bottom: 16px; }
        .ab-card b { display: block; font-size: 18px; margin-bottom: 6px; }
        .ab-card span { font-size: 14px; color: #6b6b6b; line-height: 1.7; word-break: keep-all; }
        .ab-card em { display: block; font-style: normal; font-size: 13px; color: #3D6A4F; font-weight: 600; margin-bottom: 4px; }
        .ab-steps { display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px; }
        .ab-steps .step b { font-size: 16px; } .ab-steps .step span { word-break: keep-all; }
        .ab-quote { font-size: 14px; color: #555; line-height: 1.8; border-left: 2px solid #111; padding-left: 16px; margin-top: 24px; word-break: keep-all; }
        .ab-quote a { text-decoration: underline; color: #111; }
        .ab-dl { display: grid; grid-template-columns: 110px 1fr; margin: 0; font-size: 14px; }
        .ab-dl dt, .ab-dl dd { padding: 14px 0; border-bottom: 1px solid #eee; margin: 0; line-height: 1.6; }
        .ab-dl dt { color: #8a8a8a; }
        .ab-bag { background: #fafaf8; padding: 48px; display: flex; justify-content: center; }
        .ab table { width: 100%; border-collapse: collapse; font-size: 14px; }
        .ab th, .ab td { padding: 14px 10px; border-bottom: 1px solid #eee; text-align: center; }
        .ab th { color: #8a8a8a; font-weight: 500; font-size: 13px; }
        .ab td:first-child { font-weight: 600; text-align: left; }
        .ab-note { font-size: 12px; color: #8a8a8a; line-height: 1.7; margin-top: 16px; }
        .ab-road { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .ab-road > div { border-top: 2px solid #e5e5e5; padding-top: 16px; }
        .ab-road > div:first-child { border-top-color: #3D6A4F; }
        .ab-road small { font-size: 12px; color: #3D6A4F; font-weight: 600; }
        .ab-road b { display: block; font-size: 18px; margin: 4px 0 6px; }
        .ab-road span { font-size: 13px; color: #6b6b6b; line-height: 1.7; word-break: keep-all; }
        .ab details { border-bottom: 1px solid #eee; }
        .ab summary { list-style: none; cursor: pointer; padding: 20px 0; font-size: 16px; font-weight: 500; display: flex; justify-content: space-between; gap: 16px; min-height: 56px; }
        .ab summary::-webkit-details-marker { display: none; }
        .ab summary::after { content: '+'; font-size: 20px; color: #8a8a8a; }
        .ab details[open] summary::after { content: '−'; }
        .ab details p { margin: 0; padding: 0 0 22px; font-size: 14px; line-height: 1.8; color: #555; max-width: 50em; word-break: keep-all; }
        .ab-cta { background: #111; color: #fff; text-align: center; padding: 88px 24px; }
        .ab-cta h2 { font-size: 32px; font-weight: 700; letter-spacing: -0.03em; margin: 0 0 24px; }
        .ab-cta a { background: #fff; color: #111; padding: 15px 32px; font-size: 14px; font-weight: 500; display: inline-flex; min-height: 48px; align-items: center; }
        @media (max-width: 1024px) { .ab-steps { grid-template-columns: repeat(3, 1fr); } .ab-road { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 768px) {
          .ab { padding: 0 16px; }
          .ab-hero div { left: 20px; right: 20px; bottom: 40px; } .ab-hero h1 { font-size: 34px; }
          .ab-sec { padding: 52px 0; } .ab-sec h2 { font-size: 22px; }
          .ab-2, .ab-3 { grid-template-columns: 1fr; gap: 28px; }
          .ab-steps { grid-template-columns: 1fr; } .ab-road { grid-template-columns: 1fr; }
          .ab-bag { padding: 24px; } .ab-tbl { overflow-x: auto; } .ab table { min-width: 520px; }
        }
      `}</style>
      <Navbar />

      <section className="ab-hero">
        <Img src={U('1551232864-3f0890e580d9', 2400)} alt="" />
        <div>
          <h1>입고, 고르고,<br />내 것으로</h1>
          <p>CLYQ는 옷을 먼저 입어본 뒤 구매를 정하는 패션 플랫폼이에요. 남녀 20~40대 모두를 위한 선(先)피팅을 2027년 한국에서 시작합니다.</p>
        </div>
      </section>

      <div className="ab">
        <section className="ab-sec ab-2">
          <div>
            <h2>온라인 패션에는<br />해결되지 않은 불안이 있어요</h2>
            <p className="ab-lead">화면으로는 사이즈, 핏, 색감을 알 수 없어요. 사 보고 맞지 않으면 반품해야 하고, 그 과정에서 피로와 갈등이 생겨요. CLYQ는 이 불확실함을 구매 전에 줄이는 구조로 시작했어요.</p>
            <div className="ab-quote">
              한국소비자원에 따르면 2025년 상반기 패션 플랫폼 피해구제 신청은 337건이었고, 가장 많은 사유는 청약철회(반품·환불) 관련이었어요. 20·30대가 약 80%를 차지했어요.{' '}
              <a href="https://www.hankyung.com/article/202508212764i" target="_blank" rel="noreferrer">출처: 한국경제</a>
            </div>
          </div>
          <div className="ab-img"><Img src={U('1496217590455-aa63a8350eea', 1000)} alt="" /></div>
        </section>

        <section className="ab-sec">
          <h2>선피팅은 수령 → 착용 → 결정이에요</h2>
          <p className="ab-lead">기존 온라인 쇼핑은 구매, 실패, 반품, 피로로 이어져요. CLYQ는 순서를 바꿔 먼저 입어보고 나서 결정해요.</p>
          <div className="ab-3">
            {flow.map((f, i) => (
              <div key={f.t} className="ab-card">
                <div className="ab-img"><Img src={f.img} alt="" /></div>
                <em>{i + 1}</em><b>{f.t}</b><span>{f.d}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="ab-sec">
          <h2>이렇게 이용해요</h2>
          <p className="ab-lead">반납은 예외가 아니라 처음부터 설계된 과정이에요. 피팅이 끝나 돌아온 제품은 다음 고객의 피팅 제품이 돼요.</p>
          <div className="ab-steps">
            {steps.map((s, i) => <div key={s.t} className="step"><div className="step-n">{i + 1}</div><b>{s.t}</b><span>{s.d}</span></div>)}
          </div>
        </section>

        <section className="ab-sec ab-2">
          <div className="ab-bag">
            <svg width="300" height="340" viewBox="0 0 300 340" role="img" aria-label="CLYQ 피팅백 도면: 가로 35cm, 세로 50cm">
              <rect x="40" y="30" width="190" height="270" fill="#fff" stroke="#111" strokeWidth="2" rx="6" />
              <rect x="40" y="30" width="190" height="60" fill="#e9e6df" stroke="#111" strokeWidth="2" rx="6" />
              <rect x="62" y="110" width="146" height="84" fill="#f4f4f2" stroke="#111" strokeWidth="1.5" />
              <text x="135" y="158" textAnchor="middle" fontSize="12" fill="#6b6b6b">투명 윈도우</text>
              <rect x="62" y="248" width="86" height="34" fill="none" stroke="#111" strokeWidth="1.5" />
              <text x="105" y="269" textAnchor="middle" fontSize="11" fill="#6b6b6b">송장 주머니</text>
              <rect x="230" y="120" width="14" height="80" fill="#fff" stroke="#111" strokeWidth="2" rx="7" />
              <text x="135" y="62" textAnchor="middle" fontSize="12" fill="#6b6b6b">벨크로 덮개</text>
              <line x1="40" y1="320" x2="230" y2="320" stroke="#3D6A4F" strokeWidth="1.5" />
              <text x="135" y="336" textAnchor="middle" fontSize="12" fill="#3D6A4F">35cm</text>
              <line x1="20" y1="30" x2="20" y2="300" stroke="#3D6A4F" strokeWidth="1.5" />
              <text x="14" y="168" textAnchor="middle" fontSize="12" fill="#3D6A4F" transform="rotate(-90 14 168)">50cm</text>
            </svg>
          </div>
          <div>
            <h2>다시 쓰는 피팅백</h2>
            <p className="ab-lead">피팅박스는 일회용 박스가 아니라 여러 번 쓰는 가방으로 와요. 피팅백은 CLYQ를 처음 만나는 물건이기도 해요.</p>
            <dl className="ab-dl">{bag.map(([k, v]) => <><dt key={k}>{k}</dt><dd>{v}</dd></>)}</dl>
          </div>
        </section>

        <section className="ab-sec ab-2">
          <div className="ab-img wide"><Img src={U('1515372039744-b8f02a3ae446', 1200)} alt="" /></div>
          <div>
            <h2>위생과 신뢰는 이렇게 지켜요</h2>
            <p className="ab-lead">피팅 전용 제품은 따로 관리하고, 일반 판매 채널에는 내놓지 않아요.</p>
            <dl className="ab-dl">
              <dt>회수 후</dt><dd>1차 검수 후 관리 단계로 넘어가요.</dd>
              <dt>세탁·관리</dt><dd>5회 중 4회는 업체용 스팀, 1회는 전문 세탁업체에 맡겨요.</dd>
              <dt>제품</dt><dd>피팅 전용으로만 쓰고 일반 판매하지 않아요.</dd>
              <dt>브랜드</dt><dd>입점 심사를 통과한 브랜드만 만나요.</dd>
            </dl>
          </div>
        </section>

        <section className="ab-sec">
          <h2>위디(Withy)로 참여가 쌓여요</h2>
          <p className="ab-lead">위디는 구매뿐 아니라 리뷰, 공유, 회수 같은 참여 행동에도 쌓이는 CLYQ의 포인트예요. 많이 사는 사람이 아니라 많이 참여하는 사람이 유리해요.</p>
          <div className="ab-tbl">
            <table>
              <thead><tr><th style={{ textAlign: 'left' }}>레벨</th><th>구매 적립</th><th>리뷰 / 댓글</th><th>SNS 공유</th><th>회수 페이백</th></tr></thead>
              <tbody>{levels.map(r => <tr key={r[0]}>{r.map((c, i) => <td key={i}>{c}</td>)}</tr>)}</tbody>
            </table>
          </div>
          <p className="ab-note">
            피팅박스를 신청하면 1,000WT가 차감되고, 회수가 끝나면 100WT가 돌아와요. 오픈 초기 6~12개월은 피팅박스를 무료로 운영할 계획이에요.<br />
            적립률과 규칙은 사업계획 기준이며, 오픈 전에 변경될 수 있어요.
          </p>
        </section>

        <section className="ab-sec">
          <h2>카테고리는 단계적으로 넓혀요</h2>
          <p className="ab-lead">운영 모델을 먼저 검증한 뒤 시장 규모와 선피팅 적합도를 보고 순서대로 넓혀 가요.</p>
          <div className="ab-road">{roadmap.map(([a, b, c]) => <div key={a}><small>{a}</small><b>{b}</b><span>{c}</span></div>)}</div>
        </section>

        <section className="ab-sec ab-2">
          <div>
            <h2>버려지는 옷이 없는 순환</h2>
            <p className="ab-lead">피팅이 끝난 제품은 폐기되지 않고 검수와 관리를 거쳐 다시 피팅 제품이 돼요. 구매하신 지 1년이 지난 제품은 별도 순환 방식을 준비하고 있어요. 고객 간 빈티지 거래는 향후 추가할 예정이에요.</p>
          </div>
          <div className="ab-img wide"><Img src={U('1566174053879-31528523f8ae', 1200)} alt="" /></div>
        </section>

        <section className="ab-sec" style={{ borderBottom: 0 }}>
          <h2>자주 묻는 질문</h2>
          <p className="ab-lead">처음 CLYQ를 만나면 드는 궁금증을 모았어요.</p>
          {faq.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
          <p className="ab-note">이 페이지의 운영 방식은 2027년 오픈을 기준으로 한 계획이며, 세부 조건은 오픈 전 이용약관으로 확정됩니다.</p>
        </section>
      </div>

      <section className="ab-cta">
        <h2>먼저 입어보고 결정하세요</h2>
        <a href="/fitting">피팅박스 보러가기</a>
      </section>
      <Footer />
    </main>
  )
}
