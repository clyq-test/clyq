// @ts-nocheck
'use client'
import { useState } from 'react'
import Navbar from '../components/Navbar'

const featured = {
  category: 'TREND',
  title: '2026 F/W 키 트렌드: 오버사이즈의 귀환과 뉴 클래식의 시대',
  desc: '올 가을겨울, 패션 위크가 말하는 것은 하나다. 크고 넉넉하고 단정한 것. 마뗑킴부터 앤더슨벨까지, 국내 브랜드들도 이 흐름을 이미 포착했다.',
  author: 'CLYQ 에디터 김지연',
  date: '2026.05.01',
  readTime: '5분',
  image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&auto=format&fit=crop',
  tag: 'EDITOR\'S PICK',
}

const articles = [
  {
    id: 1, category: '트렌드', tag: 'TREND',
    title: '선피팅이 바꾸는 패션 소비 방식',
    desc: '입어보지 않고 구매하는 시대는 끝났다. 집에서 먼저 피팅하는 새로운 소비 문화가 확산되고 있다.',
    author: 'CLYQ 에디터', date: '2026.04.28', readTime: '4분',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop',
  },
  {
    id: 2, category: '브랜드', tag: 'BRAND',
    title: 'MARCIA 2026 F/W 컬렉션 프리뷰',
    desc: '마르시아가 이번 시즌 선보이는 캐시미어 라인. 미니멀하지만 깊이 있는 텍스처가 핵심이다.',
    author: 'CLYQ 에디터', date: '2026.04.25', readTime: '3분',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&auto=format&fit=crop',
  },
  {
    id: 3, category: '뉴스', tag: 'NEWS',
    title: '국내 패션 이커머스 시장 35조원 돌파',
    desc: '2026년 국내 온라인 패션 시장이 사상 최초 35조원을 넘어섰다. 모바일 구매 비중이 70%를 차지했다.',
    author: 'CLYQ 리포트', date: '2026.04.22', readTime: '3분',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop',
  },
  {
    id: 4, category: '스타일링', tag: 'STYLING',
    title: '코트 하나로 완성하는 가을 출근룩 5가지',
    desc: '어떤 코트를 어떻게 입느냐에 따라 같은 옷도 전혀 다른 분위기가 된다. 피팅 전에 미리 참고해보자.',
    author: 'CLYQ 스타일리스트', date: '2026.04.20', readTime: '6분',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop',
  },
  {
    id: 5, category: '지속가능패션', tag: 'ECO',
    title: '순환유통이 만드는 지속가능한 패션 생태계',
    desc: '버려지는 옷이 없는 세상. CLYQ의 순환유통 시스템이 패션 산업의 탄소 발자국을 줄이고 있다.',
    author: 'CLYQ 에디터', date: '2026.04.18', readTime: '5분',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&auto=format&fit=crop',
  },
  {
    id: 6, category: '브랜드', tag: 'BRAND',
    title: 'MATIN KIM × CLYQ 단독 피팅 컬렉션 공개',
    desc: '마뗑킴과 CLYQ가 손잡았다. CLYQ에서만 만날 수 있는 단독 선피팅 컬렉션이 드디어 공개된다.',
    author: 'CLYQ 에디터', date: '2026.04.15', readTime: '3분',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop',
  },
  {
    id: 7, category: '트렌드', tag: 'TREND',
    title: '파리 패션위크가 말하는 2026 F/W 컬러',
    desc: '이번 시즌 파리를 물들인 컬러는 딥 버건디와 오트밀 베이지. 한국 브랜드들의 해석은?',
    author: 'CLYQ 파리 특파원', date: '2026.04.10', readTime: '4분',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&auto=format&fit=crop',
  },
  {
    id: 8, category: '스타일링', tag: 'STYLING',
    title: '40대 여성이 가장 많이 선택한 스타일 TOP 5',
    desc: 'CLYQ 피팅 데이터가 말하는 40대 여성의 진짜 취향. 트렌드보다 나에게 맞는 옷을 선택하는 법.',
    author: 'CLYQ 데이터팀', date: '2026.04.08', readTime: '5분',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&auto=format&fit=crop',
  },
  {
    id: 9, category: '뉴스', tag: 'NEWS',
    title: 'Amazon, Try Before You Buy 서비스 종료 이후',
    desc: '아마존이 선피팅 서비스를 종료한 2025년. 그 공백을 누가 채우고 있는가. CLYQ의 성장이 주목받는 이유.',
    author: 'CLYQ 리포트', date: '2026.04.05', readTime: '4분',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop',
  },
]

const categories = ['전체', '트렌드', '브랜드', '뉴스', '스타일링', '지속가능패션']

const tagColors = {
  'TREND': { bg:'#111', color:'#fff' },
  'BRAND': { bg:'#C94E1A', color:'#fff' },
  'NEWS': { bg:'#2a7a50', color:'#fff' },
  'STYLING': { bg:'#B08D57', color:'#fff' },
  'ECO': { bg:'#2a7a50', color:'#fff' },
}

export default function Magazine() {
  const [activeCategory, setActiveCategory] = useState('전체')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const filtered = activeCategory === '전체'
    ? articles
    : articles.filter(a => a.category === activeCategory)

  return (
    <main style={{background:'#fafafa',minHeight:'100vh'}}>
      <Navbar />

      {/* 매거진 헤더 */}
      <div style={{background:'#fff',borderBottom:'1px solid #e8e8e8',padding:'32px 40px 0'}}>
        <div style={{maxWidth:'1100px',margin:'0 auto'}}>
          <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginBottom:'24px'}}>
            <div>
              <div style={{fontSize:'10px',letterSpacing:'5px',color:'#999',marginBottom:'8px',fontWeight:500}}>CLYQ MAGAZINE</div>
              <h1 style={{fontFamily:'Georgia,serif',fontSize:'40px',fontWeight:300,color:'#111',letterSpacing:'-0.5px'}}>
                패션, 그리고 라이프스타일
              </h1>
            </div>
            <div style={{fontSize:'12px',color:'#999',paddingBottom:'8px',fontWeight:300}}>
              패션 트렌드 · 브랜드 뉴스 · 스타일링 팁
            </div>
          </div>

          {/* 카테고리 탭 */}
          <div style={{display:'flex',gap:'0'}}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                style={{padding:'12px 20px',fontSize:'13px',fontWeight:activeCategory===cat?500:400,color:activeCategory===cat?'#111':'#999',background:'none',border:'none',borderBottom:activeCategory===cat?'2px solid #111':'2px solid transparent',cursor:'pointer',transition:'all 0.15s',whiteSpace:'nowrap'}}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'40px'}}>

        {/* 피처 기사 */}
        {activeCategory === '전체' && (
          <div style={{marginBottom:'48px',cursor:'pointer',position:'relative',overflow:'hidden',height:'480px',background:'#1a1814'}}
            onMouseEnter={e => e.currentTarget.querySelector('img').style.transform='scale(1.03)'}
            onMouseLeave={e => e.currentTarget.querySelector('img').style.transform='scale(1)'}>
            <img src={featured.image} alt={featured.title}
              style={{width:'100%',height:'100%',objectFit:'cover',opacity:0.45,transition:'transform 0.5s'}}/>
            <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,0.85) 0%,rgba(0,0,0,0.2) 60%,transparent 100%)'}}/>
            <div style={{position:'absolute',top:'24px',left:'24px',background:'#C94E1A',color:'#fff',fontSize:'10px',fontWeight:700,padding:'5px 12px',letterSpacing:'1.5px'}}>
              {featured.tag}
            </div>
            <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'40px'}}>
              <div style={{fontSize:'11px',letterSpacing:'2px',color:'rgba(255,255,255,0.6)',marginBottom:'12px',fontWeight:500}}>{featured.category}</div>
              <h2 style={{fontFamily:'Georgia,serif',fontSize:'32px',fontWeight:300,color:'#fff',lineHeight:1.3,marginBottom:'12px',maxWidth:'700px'}}>
                {featured.title}
              </h2>
              <p style={{fontSize:'13px',color:'rgba(255,255,255,0.6)',fontWeight:300,lineHeight:1.7,maxWidth:'560px',marginBottom:'20px'}}>
                {featured.desc}
              </p>
              <div style={{display:'flex',alignItems:'center',gap:'16px',fontSize:'11px',color:'rgba(255,255,255,0.45)'}}>
                <span>{featured.author}</span>
                <span>·</span>
                <span>{featured.date}</span>
                <span>·</span>
                <span>읽는 시간 {featured.readTime}</span>
              </div>
            </div>
          </div>
        )}

        {/* 에디터 픽 (전체 탭만) */}
        {activeCategory === '전체' && (
          <div style={{marginBottom:'48px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'24px'}}>
              <div style={{fontSize:'10px',letterSpacing:'3px',color:'#C94E1A',fontWeight:600}}>EDITOR'S PICK</div>
              <div style={{flex:1,height:'1px',background:'#e8e8e8'}}/>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'20px'}}>
              {articles.slice(0,3).map(article => {
                const tc = tagColors[article.tag] || {bg:'#111',color:'#fff'}
                return (
                  <div key={article.id} style={{background:'#fff',border:'1px solid #e8e8e8',overflow:'hidden',cursor:'pointer',transition:'all 0.2s'}}
                    onMouseEnter={e => {e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow='0 12px 40px rgba(0,0,0,0.1)'}}
                    onMouseLeave={e => {e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none'}}>
                    <div style={{position:'relative',height:'200px',overflow:'hidden'}}>
                      <img src={article.image} alt={article.title}
                        style={{width:'100%',height:'100%',objectFit:'cover',transition:'transform 0.4s'}}/>
                      <div style={{position:'absolute',top:'12px',left:'12px',background:tc.bg,color:tc.color,fontSize:'9px',fontWeight:700,padding:'3px 8px',letterSpacing:'1px'}}>
                        {article.tag}
                      </div>
                    </div>
                    <div style={{padding:'20px'}}>
                      <div style={{fontSize:'11px',color:'#999',marginBottom:'8px',letterSpacing:'0.5px'}}>{article.category}</div>
                      <div style={{fontFamily:'Georgia,serif',fontSize:'16px',fontWeight:300,lineHeight:1.4,marginBottom:'10px',color:'#111'}}>{article.title}</div>
                      <div style={{fontSize:'12px',color:'#999',fontWeight:300,lineHeight:1.6,marginBottom:'16px'}}>{article.desc}</div>
                      <div style={{display:'flex',justifyContent:'space-between',fontSize:'11px',color:'#ccc'}}>
                        <span>{article.date}</span>
                        <span>읽는 시간 {article.readTime}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* 전체 기사 그리드 */}
        <div style={{marginBottom:'48px'}}>
          {activeCategory !== '전체' && (
            <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'24px'}}>
              <div style={{fontSize:'10px',letterSpacing:'3px',color:'#C94E1A',fontWeight:600}}>{activeCategory.toUpperCase()}</div>
              <div style={{flex:1,height:'1px',background:'#e8e8e8'}}/>
              <div style={{fontSize:'12px',color:'#999'}}>{filtered.length}개의 아티클</div>
            </div>
          )}
          {activeCategory === '전체' && (
            <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'24px'}}>
              <div style={{fontSize:'10px',letterSpacing:'3px',color:'#999',fontWeight:600}}>ALL ARTICLES</div>
              <div style={{flex:1,height:'1px',background:'#e8e8e8'}}/>
            </div>
          )}

          {/* 리스트 뷰 */}
          <div style={{display:'flex',flexDirection:'column',gap:'0'}}>
            {(activeCategory === '전체' ? articles : filtered).map((article, i) => {
              const tc = tagColors[article.tag] || {bg:'#111',color:'#fff'}
              return (
                <div key={article.id}
                  style={{display:'grid',gridTemplateColumns:'280px 1fr',gap:'0',background:'#fff',borderBottom:'1px solid #e8e8e8',cursor:'pointer',transition:'background 0.15s'}}
                  onMouseEnter={e => e.currentTarget.style.background='#fafafa'}
                  onMouseLeave={e => e.currentTarget.style.background='#fff'}>
                  <div style={{height:'180px',overflow:'hidden',position:'relative'}}>
                    <img src={article.image} alt={article.title}
                      style={{width:'100%',height:'100%',objectFit:'cover',transition:'transform 0.4s'}}/>
                    <div style={{position:'absolute',top:'10px',left:'10px',background:tc.bg,color:tc.color,fontSize:'9px',fontWeight:700,padding:'3px 8px',letterSpacing:'1px'}}>
                      {article.tag}
                    </div>
                  </div>
                  <div style={{padding:'24px 28px',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                    <div>
                      <div style={{fontSize:'11px',color:'#999',marginBottom:'8px',letterSpacing:'0.5px'}}>{article.category}</div>
                      <div style={{fontFamily:'Georgia,serif',fontSize:'20px',fontWeight:300,lineHeight:1.35,marginBottom:'10px',color:'#111'}}>{article.title}</div>
                      <div style={{fontSize:'13px',color:'#999',fontWeight:300,lineHeight:1.7}}>{article.desc}</div>
                    </div>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:'16px'}}>
                      <div style={{display:'flex',alignItems:'center',gap:'12px',fontSize:'11px',color:'#ccc'}}>
                        <span>{article.author}</span>
                        <span>·</span>
                        <span>{article.date}</span>
                        <span>·</span>
                        <span>{article.readTime} 읽기</span>
                      </div>
                      <div style={{fontSize:'12px',color:'#C94E1A',fontWeight:500,display:'flex',alignItems:'center',gap:'4px'}}>
                        읽기 →
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 뉴스레터 구독 */}
        <div style={{background:'#1a1814',padding:'48px',textAlign:'center',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',inset:0,backgroundImage:'radial-gradient(circle at 50% 50%, rgba(201,78,26,0.08) 0%, transparent 60%)',pointerEvents:'none'}}/>
          <div style={{position:'relative',zIndex:1}}>
            <div style={{fontSize:'10px',letterSpacing:'4px',color:'#C94E1A',fontWeight:600,marginBottom:'16px'}}>NEWSLETTER</div>
            <h3 style={{fontFamily:'Georgia,serif',fontSize:'28px',fontWeight:300,color:'#fff',marginBottom:'10px',lineHeight:1.3}}>
              매주 새로운 패션 인사이트를<br />이메일로 받아보세요
            </h3>
            <p style={{fontSize:'13px',color:'rgba(255,255,255,0.4)',fontWeight:300,marginBottom:'28px'}}>
              트렌드 리포트 · 브랜드 소식 · 스타일링 팁 · CLYQ 신상품 알림
            </p>
            {subscribed ? (
              <div style={{display:'inline-flex',alignItems:'center',gap:'10px',background:'rgba(42,122,80,0.2)',border:'1px solid #2a7a50',padding:'14px 28px',color:'#2a7a50',fontSize:'13px',fontWeight:500}}>
                ✓ 구독이 완료됐어요. 다음 뉴스레터를 기대해주세요!
              </div>
            ) : (
              <div style={{display:'flex',gap:'0',maxWidth:'440px',margin:'0 auto'}}>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="이메일 주소를 입력해주세요"
                  style={{flex:1,padding:'13px 16px',border:'none',fontSize:'13px',outline:'none',fontFamily:'inherit',background:'rgba(255,255,255,0.08)',color:'#fff',borderBottom:'1px solid rgba(255,255,255,0.2)'}}
                />
                <button
                  onClick={() => { if(email) setSubscribed(true) }}
                  style={{padding:'13px 24px',background:'#C94E1A',color:'#fff',border:'none',fontSize:'13px',fontWeight:500,cursor:'pointer',whiteSpace:'nowrap',transition:'background 0.2s'}}
                  onMouseEnter={e => e.currentTarget.style.background='#a83d14'}
                  onMouseLeave={e => e.currentTarget.style.background='#C94E1A'}>
                  구독하기
                </button>
              </div>
            )}
            <div style={{fontSize:'11px',color:'rgba(255,255,255,0.25)',marginTop:'12px'}}>
              언제든 구독 취소 가능 · 스팸 없음
            </div>
          </div>
        </div>
      </div>

      <footer style={{background:'#111',padding:'40px 80px'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div style={{fontFamily:'Georgia,serif',fontSize:'22px',color:'#fff',letterSpacing:'4px'}}>CLY<span style={{color:'#C94E1A'}}>Q</span></div>
          <div style={{fontSize:'12px',color:'rgba(255,255,255,0.3)'}}>© 2026 CLYQ Inc. exyai company.</div>
        </div>
      </footer>
    </main>
  )
}
