// @ts-nocheck
'use client'
import { useState } from 'react'
import Navbar from '../components/Navbar'

const featured = {
  category:'TREND',
  title:'2026 F/W 키 트렌드: 오버사이즈의 귀환과 뉴 클래식의 시대',
  desc:'올 가을겨울, 패션 위크가 말하는 것은 하나다. 크고 넉넉하고 단정한 것. 마뗑킴부터 앤더슨벨까지, 국내 브랜드들도 이 흐름을 이미 포착했다.',
  author:'CLYQ 에디터 김지연', date:'2026.05.01', readTime:'5분',
  image:'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&auto=format&fit=crop',
  tag:"EDITOR'S PICK",
  id:'featured',
}

const initArticles = [
  { id:1, category:'트렌드', tag:'TREND', title:'선피팅이 바꾸는 패션 소비 방식', desc:'입어보지 않고 구매하는 시대는 끝났다. 집에서 먼저 피팅하는 새로운 소비 문화가 확산되고 있다.', author:'CLYQ 에디터', date:'2026.04.28', readTime:'4분', image:'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop', likes:24, liked:false, comments:8, shared:false },
  { id:2, category:'브랜드', tag:'BRAND', title:'MARCIA 2026 F/W 컬렉션 프리뷰', desc:'마르시아가 이번 시즌 선보이는 캐시미어 라인. 미니멀하지만 깊이 있는 텍스처가 핵심이다.', author:'CLYQ 에디터', date:'2026.04.25', readTime:'3분', image:'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&auto=format&fit=crop', likes:41, liked:false, comments:12, shared:false },
  { id:3, category:'뉴스', tag:'NEWS', title:'국내 패션 이커머스 시장 35조원 돌파', desc:'2026년 국내 온라인 패션 시장이 사상 최초 35조원을 넘어섰다.', author:'CLYQ 리포트', date:'2026.04.22', readTime:'3분', image:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop', likes:18, liked:false, comments:5, shared:false },
  { id:4, category:'스타일링', tag:'STYLING', title:'코트 하나로 완성하는 가을 출근룩 5가지', desc:'어떤 코트를 어떻게 입느냐에 따라 같은 옷도 전혀 다른 분위기가 된다.', author:'CLYQ 스타일리스트', date:'2026.04.20', readTime:'6분', image:'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop', likes:67, liked:false, comments:23, shared:false },
  { id:5, category:'지속가능패션', tag:'ECO', title:'순환유통이 만드는 지속가능한 패션 생태계', desc:'버려지는 옷이 없는 세상. CLYQ의 순환유통 시스템이 패션 산업의 탄소 발자국을 줄이고 있다.', author:'CLYQ 에디터', date:'2026.04.18', readTime:'5분', image:'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&auto=format&fit=crop', likes:35, liked:false, comments:11, shared:false },
  { id:6, category:'브랜드', tag:'BRAND', title:'MATIN KIM × CLYQ 단독 피팅 컬렉션 공개', desc:'마뗑킴과 CLYQ가 손잡았다. CLYQ에서만 만날 수 있는 단독 선피팅 컬렉션이 드디어 공개된다.', author:'CLYQ 에디터', date:'2026.04.15', readTime:'3분', image:'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop', likes:89, liked:false, comments:31, shared:false },
  { id:7, category:'트렌드', tag:'TREND', title:'파리 패션위크가 말하는 2026 F/W 컬러', desc:'이번 시즌 파리를 물들인 컬러는 딥 버건디와 오트밀 베이지.', author:'CLYQ 파리 특파원', date:'2026.04.10', readTime:'4분', image:'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&auto=format&fit=crop', likes:52, liked:false, comments:17, shared:false },
  { id:8, category:'스타일링', tag:'STYLING', title:'40대 여성이 가장 많이 선택한 스타일 TOP 5', desc:'CLYQ 피팅 데이터가 말하는 40대 여성의 진짜 취향.', author:'CLYQ 데이터팀', date:'2026.04.08', readTime:'5분', image:'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&auto=format&fit=crop', likes:112, liked:false, comments:44, shared:false },
  { id:9, category:'뉴스', tag:'NEWS', title:'Amazon Try Before You Buy 종료 이후', desc:'아마존이 선피팅 서비스를 종료한 2025년. 그 공백을 누가 채우고 있는가.', author:'CLYQ 리포트', date:'2026.04.05', readTime:'4분', image:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop', likes:78, liked:false, comments:26, shared:false },
]

const categories = ['전체', '트렌드', '브랜드', '뉴스', '스타일링', '지속가능패션']
const tagColors = { 'TREND':{bg:'#111',color:'#fff'}, 'BRAND':{bg:'#C94E1A',color:'#fff'}, 'NEWS':{bg:'#2a7a50',color:'#fff'}, 'STYLING':{bg:'#B08D57',color:'#fff'}, 'ECO':{bg:'#2a7a50',color:'#fff'} }

function ArticleActions({ article, onLike, onShare, onComment, compact = false }) {
  return (
    <div style={{display:'flex',alignItems:'center',gap:compact?'4px':'8px',flexWrap:'wrap'}}>
      <button
        onClick={e => { e.stopPropagation(); onLike(article.id) }}
        style={{display:'flex',alignItems:'center',gap:'5px',padding:compact?'5px 10px':'7px 14px',border:`1px solid ${article.liked?'#C94E1A':'#e8e8e8'}`,background:article.liked?'#fff5f2':'#fff',color:article.liked?'#C94E1A':'#666',fontSize:'12px',cursor:'pointer',fontFamily:'inherit',transition:'all .15s',borderRadius:'2px'}}>
        {article.liked?'❤️':'🤍'} {article.likes}
        {!compact && <span style={{color:'#ccc',fontSize:'10px',marginLeft:'2px'}}>좋아요+5P</span>}
      </button>
      <button
        onClick={e => { e.stopPropagation(); onComment(article.id) }}
        style={{display:'flex',alignItems:'center',gap:'5px',padding:compact?'5px 10px':'7px 14px',border:'1px solid #e8e8e8',background:'#fff',color:'#666',fontSize:'12px',cursor:'pointer',fontFamily:'inherit',borderRadius:'2px'}}>
        💬 {article.comments}
        {!compact && <span style={{color:'#ccc',fontSize:'10px',marginLeft:'2px'}}>댓글+10P</span>}
      </button>
      <button
        onClick={e => { e.stopPropagation(); onShare(article.id) }}
        style={{display:'flex',alignItems:'center',gap:'5px',padding:compact?'5px 10px':'7px 14px',border:`1px solid ${article.shared?'#2a7a50':'#e8e8e8'}`,background:article.shared?'#f0f9f4':'#fff',color:article.shared?'#2a7a50':'#666',fontSize:'12px',cursor:'pointer',fontFamily:'inherit',borderRadius:'2px'}}>
        🔗 공유
        {!compact && <span style={{color:'#ccc',fontSize:'10px',marginLeft:'2px'}}>+10P</span>}
      </button>
    </div>
  )
}

export default function Magazine() {
  const [activeCategory, setActiveCategory] = useState('전체')
  const [articles, setArticles] = useState(initArticles)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [toast, setToast] = useState('')
  const [commentOpen, setCommentOpen] = useState(null)
  const [commentText, setCommentText] = useState('')
  const [comments, setComments] = useState({})
  const [myWithy, setMyWithy] = useState(2400)
  const [withyAnim, setWithyAnim] = useState(null)

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(''), 2600) }

  function earnWithy(amount, msg) {
    setMyWithy(p => p + amount)
    setWithyAnim('+' + amount + 'P')
    setTimeout(() => setWithyAnim(null), 1800)
    showToast(msg)
  }

  function handleLike(id) {
    setArticles(prev => prev.map(a => {
      if (a.id !== id) return a
      if (!a.liked) earnWithy(5, '❤️ 좋아요! 위디 5P 적립됩니다')
      else showToast('좋아요를 취소했어요')
      return { ...a, liked: !a.liked, likes: a.liked ? a.likes - 1 : a.likes + 1 }
    }))
  }

  function handleShare(id) {
    setArticles(prev => prev.map(a => {
      if (a.id !== id) return a
      if (!a.shared) {
        earnWithy(10, '🔗 링크 복사 완료! 위디 10P 적립!')
        return { ...a, shared: true }
      }
      showToast('링크가 복사됐어요')
      return a
    }))
  }

  function handleComment(id) {
    setCommentOpen(id === commentOpen ? null : id)
  }

  function submitComment(id) {
    if (!commentText.trim()) return
    setComments(prev => ({
      ...prev,
      [id]: [...(prev[id]||[]), { text: commentText, date: '방금 전', avatar:'😊', name:'나' }]
    }))
    setArticles(prev => prev.map(a => a.id===id ? {...a, comments:a.comments+1} : a))
    setCommentText('')
    earnWithy(10, '💬 댓글 등록! 위디 10P 적립!')
  }

  const filtered = activeCategory === '전체' ? articles : articles.filter(a => a.category === activeCategory)

  return (
    <main style={{background:'#fafafa',minHeight:'100vh'}}>
      <style>{`
        .mag-header { background:#fff; border-bottom:1px solid #e8e8e8; padding:28px 40px 0; }
        .mag-title { font-family:Georgia,serif; font-size:36px; font-weight:300; color:#111; }
        .mag-content { max-width:1100px; margin:0 auto; padding:32px 40px; display:grid; grid-template-columns:1fr 260px; gap:40px; }
        .mag-main { min-width:0; }
        .mag-side { }
        .mag-featured { height:420px; cursor:pointer; position:relative; overflow:hidden; background:#1a1814; margin-bottom:36px; }
        .mag-pick-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-bottom:36px; }
        .mag-list-item { display:grid; grid-template-columns:200px 1fr; gap:0; background:#fff; border-bottom:1px solid #e8e8e8; cursor:pointer; transition:background .15s; }
        .mag-list-item:hover { background:#fafafa; }
        .mag-list-img { overflow:hidden; position:relative; flex-shrink:0; }
        .mag-list-img img { width:100%; height:100%; object-fit:cover; display:block; }
        .withy-earn-bar { background:#fff8f5; border:1px solid rgba(201,78,26,.15); padding:10px 14px; margin-bottom:20px; display:flex; align-items:center; gap:10px; font-size:12px; color:#333; }
        .side-card { background:#fff; border:1px solid #e8e8e8; padding:18px; margin-bottom:16px; }
        .side-title { font-size:11px; font-weight:600; color:#111; letter-spacing:.5px; margin-bottom:12px; }
        .my-withy-num { font-family:Georgia,serif; font-size:32px; font-weight:300; color:#B08D57; }
        .withy-anim { position:fixed; top:80px; right:24px; background:#B08D57; color:#fff; padding:8px 16px; font-size:14px; font-weight:600; z-index:3000; animation:fadeUpOut 1.8s ease forwards; }
        @keyframes fadeUpOut { 0%{opacity:1;transform:translateY(0)} 70%{opacity:1;transform:translateY(-16px)} 100%{opacity:0;transform:translateY(-28px)} }
        .comment-box { background:#f9f9f9; border-top:1px solid #f0f0f0; padding:14px 16px; }
        .comment-input-row { display:flex; gap:8px; margin-bottom:10px; }
        .comment-inp { flex:1; padding:10px 12px; border:1px solid #e8e8e8; font-size:12px; outline:none; font-family:inherit; }
        .comment-inp:focus { border-color:#111; }
        .comment-sub { padding:10px 14px; background:#111; color:#fff; border:none; cursor:pointer; font-size:12px; font-family:inherit; }
        .comment-sub:hover { background:#C94E1A; }
        .comment-list-item { display:flex; gap:8px; padding:8px 0; border-bottom:1px solid #f0f0f0; }
        .comment-list-item:last-child { border-bottom:none; }
        .newsletter-form { display:flex; gap:0; max-width:400px; margin:0 auto; }
        @media (max-width:768px) {
          .mag-header { padding:20px 16px 0; }
          .mag-title { font-size:24px; }
          .mag-content { grid-template-columns:1fr; padding:16px; gap:0; }
          .mag-side { margin-top:24px; }
          .mag-featured { height:260px; margin-bottom:24px; }
          .mag-pick-grid { grid-template-columns:1fr; }
          .mag-list-item { grid-template-columns:110px 1fr; }
          .newsletter-form { flex-direction:column; gap:8px; }
          .newsletter-form input, .newsletter-form button { width:100%; }
        }
      `}</style>

      <Navbar />

      {/* 매거진 헤더 */}
      <div className="mag-header">
        <div style={{maxWidth:'1100px',margin:'0 auto'}}>
          <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginBottom:'16px'}}>
            <div>
              <div style={{fontSize:'10px',letterSpacing:'5px',color:'#999',marginBottom:'6px',fontWeight:500}}>CLYQ MAGAZINE</div>
              <h1 className="mag-title">패션, 그리고 라이프스타일</h1>
            </div>
            <div style={{fontSize:'12px',color:'#999',paddingBottom:'4px',display:'flex',alignItems:'center',gap:'12px'}}>
              <span style={{display:'flex',alignItems:'center',gap:'5px',color:'#B08D57',fontWeight:500}}>
                💛 위디 {myWithy.toLocaleString()}P
              </span>
              <span>패션 트렌드 · 브랜드 뉴스 · 스타일링 팁</span>
            </div>
          </div>
          <div style={{display:'flex',gap:'0',overflowX:'auto',scrollbarWidth:'none'}}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                style={{padding:'12px 16px',fontSize:'13px',fontWeight:activeCategory===cat?500:400,color:activeCategory===cat?'#111':'#999',background:'none',border:'none',borderBottom:activeCategory===cat?'2px solid #111':'2px solid transparent',cursor:'pointer',whiteSpace:'nowrap',fontFamily:'inherit'}}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 위디 적립 안내 바 */}
      <div style={{background:'#fff',borderBottom:'1px solid #f0f0f0',padding:'0 40px'}}>
        <div style={{maxWidth:'1100px',margin:'0 auto'}}>
          <div className="withy-earn-bar">
            <span style={{fontSize:'16px'}}>💛</span>
            <span>매거진과 상호작용하면 위디가 쌓여요 —</span>
            <span style={{color:'#C94E1A',fontWeight:500}}>좋아요 +5P</span>
            <span style={{color:'#999'}}>·</span>
            <span style={{color:'#C94E1A',fontWeight:500}}>댓글 +10P</span>
            <span style={{color:'#999'}}>·</span>
            <span style={{color:'#C94E1A',fontWeight:500}}>공유 +10P</span>
          </div>
        </div>
      </div>

      <div className="mag-content">
        <div className="mag-main">
          {/* 피처 */}
          {activeCategory === '전체' && (
            <div className="mag-featured">
              <img src={featured.image} alt={featured.title} style={{width:'100%',height:'100%',objectFit:'cover',opacity:.4,display:'block'}}/>
              <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,.85) 0%,rgba(0,0,0,.1) 60%,transparent 100%)'}}/>
              <div style={{position:'absolute',top:'16px',left:'16px',background:'#C94E1A',color:'#fff',fontSize:'9px',fontWeight:700,padding:'4px 10px',letterSpacing:'1px'}}>{featured.tag}</div>
              <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'24px'}}>
                <div style={{fontSize:'10px',letterSpacing:'2px',color:'rgba(255,255,255,.6)',marginBottom:'8px'}}>{featured.category}</div>
                <h2 style={{fontFamily:'Georgia,serif',fontSize:'24px',fontWeight:300,color:'#fff',lineHeight:1.3,marginBottom:'8px'}}>{featured.title}</h2>
                <div style={{fontSize:'11px',color:'rgba(255,255,255,.45)',display:'flex',gap:'8px',flexWrap:'wrap',marginBottom:'12px'}}>
                  <span>{featured.author}</span><span>·</span><span>{featured.date}</span><span>·</span><span>{featured.readTime}</span>
                </div>
              </div>
            </div>
          )}

          {/* 에디터 픽 */}
          {activeCategory === '전체' && (
            <div style={{marginBottom:'32px'}}>
              <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'18px'}}>
                <div style={{fontSize:'10px',letterSpacing:'3px',color:'#C94E1A',fontWeight:600}}>EDITOR'S PICK</div>
                <div style={{flex:1,height:'1px',background:'#e8e8e8'}}/>
              </div>
              <div className="mag-pick-grid">
                {articles.slice(0,3).map(article => {
                  const tc = tagColors[article.tag]||{bg:'#111',color:'#fff'}
                  return (
                    <div key={article.id} style={{background:'#fff',border:'1px solid #e8e8e8',overflow:'hidden'}}>
                      <div style={{position:'relative',height:'160px',overflow:'hidden'}}>
                        <img src={article.image} alt={article.title} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                        <div style={{position:'absolute',top:'8px',left:'8px',background:tc.bg,color:tc.color,fontSize:'9px',fontWeight:700,padding:'2px 7px'}}>{article.tag}</div>
                      </div>
                      <div style={{padding:'14px'}}>
                        <div style={{fontFamily:'Georgia,serif',fontSize:'14px',fontWeight:300,lineHeight:1.4,marginBottom:'10px',color:'#111'}}>{article.title}</div>
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:'11px',color:'#ccc',marginBottom:'10px'}}>
                          <span>{article.date}</span><span>{article.readTime}</span>
                        </div>
                        <ArticleActions article={article} onLike={handleLike} onShare={handleShare} onComment={handleComment} compact/>
                      </div>
                      {commentOpen === article.id && (
                        <div className="comment-box">
                          {(comments[article.id]||[]).map((c,i) => (
                            <div key={i} className="comment-list-item">
                              <span style={{fontSize:'14px'}}>{c.avatar}</span>
                              <div>
                                <div style={{fontSize:'11px',fontWeight:500,marginBottom:'2px'}}>{c.name} <span style={{color:'#ccc',fontWeight:300}}>{c.date}</span></div>
                                <div style={{fontSize:'12px',color:'#444'}}>{c.text}</div>
                              </div>
                            </div>
                          ))}
                          <div className="comment-input-row">
                            <input className="comment-inp" placeholder="댓글 입력... (+10P)" value={commentText} onChange={e => setCommentText(e.target.value)} onKeyDown={e => e.key==='Enter' && submitComment(article.id)}/>
                            <button className="comment-sub" onClick={() => submitComment(article.id)}>등록</button>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* 전체 기사 리스트 */}
          <div>
            <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px'}}>
              <div style={{fontSize:'10px',letterSpacing:'3px',color:'#999',fontWeight:600}}>{activeCategory!=='전체'?activeCategory.toUpperCase():'ALL ARTICLES'}</div>
              <div style={{flex:1,height:'1px',background:'#e8e8e8'}}/>
              {activeCategory !== '전체' && <div style={{fontSize:'12px',color:'#999'}}>{filtered.length}개</div>}
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'0'}}>
              {filtered.map(article => {
                const tc = tagColors[article.tag]||{bg:'#111',color:'#fff'}
                return (
                  <div key={article.id}>
                    <div className="mag-list-item">
                      <div className="mag-list-img" style={{height:'150px'}}>
                        <img src={article.image} alt={article.title}/>
                        <div style={{position:'absolute',top:'8px',left:'8px',background:tc.bg,color:tc.color,fontSize:'8px',fontWeight:700,padding:'2px 6px'}}>{article.tag}</div>
                      </div>
                      <div style={{padding:'16px 20px',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                        <div>
                          <div style={{fontSize:'10px',color:'#999',marginBottom:'5px'}}>{article.category}</div>
                          <div style={{fontFamily:'Georgia,serif',fontSize:'16px',fontWeight:300,lineHeight:1.35,marginBottom:'6px',color:'#111'}}>{article.title}</div>
                          <div style={{fontSize:'12px',color:'#999',fontWeight:300,lineHeight:1.6,display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>{article.desc}</div>
                        </div>
                        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:'10px',flexWrap:'wrap',gap:'8px'}}>
                          <ArticleActions article={article} onLike={handleLike} onShare={handleShare} onComment={handleComment} compact/>
                          <div style={{fontSize:'11px',color:'#ccc'}}>{article.date} · {article.readTime}</div>
                        </div>
                      </div>
                    </div>
                    {commentOpen === article.id && (
                      <div className="comment-box" style={{borderBottom:'1px solid #e8e8e8'}}>
                        {(comments[article.id]||[]).map((c,i) => (
                          <div key={i} className="comment-list-item">
                            <span style={{fontSize:'14px'}}>{c.avatar}</span>
                            <div>
                              <div style={{fontSize:'11px',fontWeight:500,marginBottom:'2px'}}>{c.name} <span style={{color:'#ccc',fontWeight:300}}>{c.date}</span></div>
                              <div style={{fontSize:'12px',color:'#444'}}>{c.text}</div>
                            </div>
                          </div>
                        ))}
                        <div className="comment-input-row">
                          <input className="comment-inp" placeholder="댓글을 입력해주세요. 등록 시 위디 10P 적립!" value={commentText} onChange={e => setCommentText(e.target.value)} onKeyDown={e => e.key==='Enter' && submitComment(article.id)}/>
                          <button className="comment-sub" onClick={() => submitComment(article.id)}>등록 +10P</button>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* 뉴스레터 */}
          <div style={{background:'#1a1814',padding:'40px',textAlign:'center',marginTop:'40px',position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',inset:0,backgroundImage:'radial-gradient(circle at 50% 50%, rgba(201,78,26,.08) 0%, transparent 60%)',pointerEvents:'none'}}/>
            <div style={{position:'relative',zIndex:1}}>
              <div style={{fontSize:'10px',letterSpacing:'4px',color:'#C94E1A',fontWeight:600,marginBottom:'10px'}}>NEWSLETTER</div>
              <h3 style={{fontFamily:'Georgia,serif',fontSize:'22px',fontWeight:300,color:'#fff',marginBottom:'8px',lineHeight:1.3}}>매주 새로운 패션 인사이트를 받아보세요</h3>
              <p style={{fontSize:'12px',color:'rgba(255,255,255,.4)',marginBottom:'20px'}}>구독 시 위디 <strong style={{color:'#B08D57'}}>100P</strong> 적립</p>
              {subscribed ? (
                <div style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'rgba(42,122,80,.2)',border:'1px solid #2a7a50',padding:'12px 20px',color:'#2a7a50',fontSize:'13px',fontWeight:500}}>
                  ✓ 구독 완료! 위디 100P 적립됐어요
                </div>
              ) : (
                <div className="newsletter-form">
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="이메일 주소를 입력해주세요"
                    style={{flex:1,padding:'12px 14px',border:'none',fontSize:'13px',outline:'none',fontFamily:'inherit',background:'rgba(255,255,255,.08)',color:'#fff'}}/>
                  <button onClick={() => { if(email) { setSubscribed(true); earnWithy(100,'📧 구독 완료! 위디 100P 적립!') }}}
                    style={{padding:'12px 20px',background:'#C94E1A',color:'#fff',border:'none',fontSize:'13px',fontWeight:500,cursor:'pointer',fontFamily:'inherit',whiteSpace:'nowrap'}}>
                    구독 +100P
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 사이드바 */}
        <div className="mag-side">
          {/* 내 위디 */}
          <div className="side-card">
            <div className="side-title">💛 내 위디</div>
            <div className="my-withy-num">{myWithy.toLocaleString()}</div>
            <div style={{fontSize:'11px',color:'#999',marginBottom:'12px'}}>포인트 잔액</div>
            <div style={{fontSize:'11px',color:'#666',background:'#f9f7f4',padding:'10px',lineHeight:1.8}}>
              오늘 매거진에서 적립 가능한 위디<br/>
              <strong style={{color:'#B08D57'}}>최대 200P+</strong>
            </div>
          </div>

          {/* 위디 적립 */}
          <div className="side-card">
            <div className="side-title">위디 적립 방법</div>
            {[['❤️','좋아요','+5P'],['💬','댓글 작성','+10P'],['🔗','공유하기','+10P'],['📧','뉴스레터 구독','+100P']].map(([icon,label,pt]) => (
              <div key={label} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid #f5f5f5',fontSize:'12px'}}>
                <div style={{color:'#666',display:'flex',gap:'5px',alignItems:'center'}}><span>{icon}</span>{label}</div>
                <div style={{color:'#B08D57',fontWeight:600}}>{pt}</div>
              </div>
            ))}
          </div>

          {/* 인기 기사 */}
          <div className="side-card">
            <div className="side-title">🔥 인기 기사</div>
            {[...articles].sort((a,b) => b.likes-a.likes).slice(0,5).map((a,i) => (
              <div key={a.id} style={{padding:'8px 0',borderBottom:'1px solid #f5f5f5',cursor:'pointer'}}>
                <div style={{fontSize:'12px',color:'#333',lineHeight:1.5,marginBottom:'3px'}}>{a.title}</div>
                <div style={{fontSize:'10px',color:'#ccc',display:'flex',gap:'8px'}}>
                  <span>❤️ {a.likes}</span><span>💬 {a.comments}</span>
                </div>
              </div>
            ))}
          </div>

          {/* 커뮤니티 링크 */}
          <div className="side-card" style={{textAlign:'center',background:'linear-gradient(110deg,#1a1814,#2d2318)',border:'none'}}>
            <div style={{fontSize:'24px',marginBottom:'8px'}}>💬</div>
            <div style={{fontSize:'13px',fontWeight:500,color:'#fff',marginBottom:'4px'}}>커뮤니티</div>
            <div style={{fontSize:'11px',color:'rgba(255,255,255,.5)',marginBottom:'14px'}}>피팅 후기 공유하고 위디 50P 추가 적립</div>
            <a href="/community" style={{display:'block',padding:'10px',background:'#C94E1A',color:'#fff',fontSize:'12px',fontWeight:500,textDecoration:'none'}}>
              커뮤니티 바로가기 →
            </a>
          </div>
        </div>
      </div>

      {/* 위디 적립 애니메이션 */}
      {withyAnim && <div className="withy-anim">{withyAnim}</div>}

      {/* 토스트 */}
      <div style={{position:'fixed',bottom:'24px',left:'50%',transform:`translateX(-50%) translateY(${toast?'0':'60px'})`,background:'#111',color:'#fff',padding:'12px 20px',fontSize:'13px',zIndex:2000,transition:'transform .3s',whiteSpace:'nowrap',pointerEvents:'none'}}>
        {toast}
      </div>
    </main>
  )
}
