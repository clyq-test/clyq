// @ts-nocheck
'use client'
import { useState } from 'react'
import Navbar from '../components/Navbar'

const categories = ['전체', '피팅 후기', '스타일 공유', 'Q&A', '자유게시판', '브랜드 이야기']

const posts = [
  {
    id:1, category:'피팅 후기', badge:'REVIEW',
    title:'마르시아 코트 피팅박스 후기 — S/M 두 사이즈 비교해봤어요',
    preview:'S사이즈는 어깨가 딱 맞는데 가슴이 약간 타이트했고, M사이즈는 루즈하게 입기 딱 좋더라고요. 결국 M으로 구매 확정했어요. 소재가 생각보다 훨씬 고급스러워요.',
    author:'김지연', avatar:'👩', date:'2026.05.01', time:'14:32',
    likes:48, comments:12, shares:6, views:324,
    tags:['마르시아','코트','피팅후기'],
    images:['https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=300&auto=format&fit=crop'],
    withy:true, liked:false,
  },
  {
    id:2, category:'스타일 공유', badge:'STYLE',
    title:'CLYQ 피팅박스로 건진 가을 출근룩 조합 공유해요',
    preview:'에잇 드레스 + 마르시아 코트 조합인데 생각보다 잘 어울려요. 회사에서 반응 좋았어요 ㅎㅎ 두 개 다 피팅박스로 받아서 입어봤는데 코트만 구매했어요.',
    author:'박소연', avatar:'👩‍💼', date:'2026.04.30', time:'10:15',
    likes:72, comments:24, shares:18, views:512,
    tags:['스타일링','코디','출근룩'],
    images:['https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&auto=format&fit=crop'],
    withy:false, liked:false,
  },
  {
    id:3, category:'Q&A', badge:'Q&A',
    title:'피팅박스 반납할 때 구김 생긴 건 어떻게 하나요?',
    preview:'코트를 피팅해봤는데 반납 전날 좀 구겨졌어요. 다림질 해도 되는 건지, 아니면 그냥 반납해도 되는 건지 궁금해서요.',
    author:'이민준', avatar:'🧑', date:'2026.04.29', time:'19:44',
    likes:15, comments:8, shares:0, views:189,
    tags:['피팅박스','반납','Q&A'],
    images:[], withy:false, liked:false,
    answered:true,
    answer:'자연스러운 착용 과정에서 생긴 구김은 정상 반납으로 처리돼요. 다림질 가능한 소재라면 중간 온도로 다림질 후 반납해주시면 좋고, 드라이클리닝 전용 제품은 그냥 반납해주세요!',
  },
  {
    id:4, category:'피팅 후기', badge:'REVIEW',
    title:'MATIN KIM 레더 재킷 피팅박스 솔직 후기',
    preview:'578,000원이라 구매를 망설이다가 피팅박스로 신청했어요. 실제로 입어보니 생각보다 무겁지 않고 핏이 예쁘게 떨어지더라고요. 결국 구매했습니다.',
    author:'최유리', avatar:'👩‍🦰', date:'2026.04.28', time:'21:08',
    likes:93, comments:31, shares:22, views:748,
    tags:['마뗑킴','레더재킷','피팅후기'],
    images:['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&auto=format&fit=crop'],
    withy:true, liked:false,
  },
  {
    id:5, category:'자유게시판', badge:'FREE',
    title:'위디 포인트 골드 등급 달성했어요! 혜택 후기',
    preview:'열심히 피팅박스 이용하고 리뷰 쓰다 보니 골드 등급이 됐어요. 확실히 적립률이 달라지니까 쇼핑이 더 즐거워지더라고요.',
    author:'강민수', avatar:'🧑‍💻', date:'2026.04.27', time:'16:23',
    likes:134, comments:45, shares:33, views:1024,
    tags:['위디','골드등급','후기'],
    images:[], withy:false, liked:false,
  },
  {
    id:6, category:'브랜드 이야기', badge:'BRAND',
    title:'ANDERSSONBELL 브랜드에 대해 아는 것 총정리',
    preview:'앤더슨벨을 CLYQ에서 처음 접하게 됐는데, 알고 보니 꽤 유명한 브랜드더라고요. 궁금하신 분들을 위해 정리해봤어요.',
    author:'홍지수', avatar:'👩‍🎨', date:'2026.04.26', time:'11:50',
    likes:67, comments:19, shares:28, views:445,
    tags:['앤더슨벨','브랜드','패션'],
    images:[], withy:false, liked:false,
  },
]

const badgeColor = {
  'REVIEW':'#C94E1A', 'STYLE':'#B08D57', 'Q&A':'#2a7a50', 'FREE':'#666', 'BRAND':'#111'
}

export default function Community() {
  const [activeCategory, setActiveCategory] = useState('전체')
  const [postList, setPostList] = useState(posts)
  const [writeOpen, setWriteOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)
  const [toast, setToast] = useState('')
  const [sortBy, setSortBy] = useState('최신순')
  const [newPost, setNewPost] = useState({ title:'', content:'', category:'피팅 후기' })
  const [newComment, setNewComment] = useState('')
  const [comments, setComments] = useState({
    1:[{avatar:'🧑‍💼',name:'박민수',text:'저도 S/M 고민이었는데 도움됐어요!',likes:8,date:'2026.05.01',liked:false}],
    2:[{avatar:'👩',name:'김지연',text:'코트 어디서 구매하셨어요?',likes:5,date:'2026.04.30',liked:false}],
    3:[{avatar:'👩‍💼',name:'CLYQ 운영자',text:'자연스러운 착용 과정에서 생긴 구김은 정상 반납으로 처리돼요.',likes:12,date:'2026.04.29',liked:false,official:true}],
    4:[], 5:[], 6:[],
  })

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(''), 2600)
  }

  function toggleLike(postId) {
    setPostList(prev => prev.map(p => {
      if (p.id !== postId) return p
      if (!p.liked) showToast('💛 좋아요! 위디 5P가 글 작성자에게 적립됩니다')
      return { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
    }))
  }

  function handleShare(postId) {
    showToast('🔗 링크가 복사됐어요. 위디 10P 적립!')
  }

  function submitPost() {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      showToast('제목과 내용을 입력해주세요')
      return
    }
    const post = {
      id: postList.length + 1,
      category: newPost.category,
      badge: { '피팅 후기':'REVIEW','스타일 공유':'STYLE','Q&A':'Q&A','자유게시판':'FREE','브랜드 이야기':'BRAND' }[newPost.category] || 'FREE',
      title: newPost.title,
      preview: newPost.content.slice(0, 100),
      author: '나', avatar: '😊', date: '2026.05.06', time: '지금',
      likes:0, comments:0, shares:0, views:1,
      tags:[], images:[], withy:false, liked:false,
    }
    setPostList(prev => [post, ...prev])
    setComments(prev => ({ ...prev, [post.id]: [] }))
    setWriteOpen(false)
    setNewPost({ title:'', content:'', category:'피팅 후기' })
    showToast('✍️ 글이 등록됐어요! 위디 30P 적립!')
  }

  function submitComment(postId) {
    if (!newComment.trim()) return
    const comment = {
      avatar:'😊', name:'나', text:newComment,
      likes:0, date:'지금', liked:false,
    }
    setComments(prev => ({ ...prev, [postId]: [...(prev[postId]||[]), comment] }))
    setPostList(prev => prev.map(p => p.id===postId ? {...p, comments:p.comments+1} : p))
    setNewComment('')
    showToast('💬 댓글이 등록됐어요! 위디 10P 적립!')
  }

  const filtered = postList.filter(p => activeCategory === '전체' || p.category === activeCategory)
  const sorted = [...filtered].sort((a,b) => {
    if (sortBy === '인기순') return (b.likes+b.comments) - (a.likes+a.comments)
    if (sortBy === '댓글순') return b.comments - a.comments
    return b.id - a.id
  })

  return (
    <main style={{background:'#fafafa',minHeight:'100vh'}}>
      <style>{`
        .cm-wrap { max-width:1100px; margin:0 auto; padding:32px 40px 80px; display:grid; grid-template-columns:1fr 280px; gap:32px; }
        .cm-main { min-width:0; }
        .cm-side { }
        .cm-hero { background:linear-gradient(110deg,#1a1814,#2d2318); padding:28px 40px; }
        .cm-hero-title { font-family:Georgia,serif; font-size:28px; font-weight:300; color:#fff; margin-bottom:6px; }
        .cm-hero-sub { font-size:13px; color:rgba(255,255,255,.5); margin-bottom:20px; }
        .cm-hero-withy { display:flex; gap:16px; flex-wrap:wrap; }
        .cm-withy-tag { display:flex; align-items:center; gap:6px; background:rgba(176,141,87,.15); border:1px solid rgba(176,141,87,.25); padding:6px 12px; font-size:11px; color:#B08D57; }
        .cm-tab-bar { background:#fff; border-bottom:1px solid #e8e8e8; display:flex; overflow-x:auto; scrollbar-width:none; }
        .cm-tab-bar::-webkit-scrollbar { display:none; }
        .cm-tab { padding:13px 18px; font-size:13px; border:none; background:none; cursor:pointer; color:#999; border-bottom:2px solid transparent; white-space:nowrap; font-family:inherit; transition:all .15s; }
        .cm-tab.on { color:#111; border-bottom-color:#111; font-weight:500; }
        .cm-toolbar { display:flex; justify-content:space-between; align-items:center; padding:16px 0; }
        .cm-sort { display:flex; gap:6px; }
        .cm-sort-btn { padding:6px 12px; font-size:12px; border:1px solid #e8e8e8; background:#fff; cursor:pointer; color:#999; border-radius:20px; font-family:inherit; }
        .cm-sort-btn.on { border-color:#111; color:#111; }
        .write-btn { padding:10px 20px; background:#C94E1A; color:#fff; font-size:13px; font-weight:500; border:none; cursor:pointer; font-family:inherit; display:flex; align-items:center; gap:6px; }
        .write-btn:hover { background:#a83d14; }
        .post-card { background:#fff; border:1px solid #e8e8e8; margin-bottom:12px; cursor:pointer; transition:all .2s; }
        .post-card:hover { border-color:#ccc; box-shadow:0 2px 12px rgba(0,0,0,.06); }
        .post-inner { padding:20px; }
        .post-meta { display:flex; align-items:center; gap:8px; margin-bottom:10px; flex-wrap:wrap; }
        .post-badge { font-size:9px; font-weight:700; padding:3px 8px; letter-spacing:.5px; }
        .post-withy { font-size:10px; color:#B08D57; display:flex; align-items:center; gap:3px; background:#fdf6e8; padding:3px 7px; border-radius:20px; }
        .post-author { font-size:12px; color:#999; display:flex; align-items:center; gap:5px; }
        .post-author span { font-weight:400; }
        .post-title { font-size:15px; font-weight:500; color:#111; margin-bottom:6px; line-height:1.4; }
        .post-preview { font-size:13px; color:#666; line-height:1.7; font-weight:300; margin-bottom:12px; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
        .post-img-row { display:flex; gap:6px; margin-bottom:12px; }
        .post-thumb { width:80px; height:80px; overflow:hidden; }
        .post-thumb img { width:100%; height:100%; object-fit:cover; }
        .post-tags { display:flex; gap:5px; margin-bottom:12px; flex-wrap:wrap; }
        .post-tag { font-size:10px; padding:3px 8px; background:#f5f5f5; color:#666; border-radius:20px; }
        .post-actions { display:flex; align-items:center; gap:0; border-top:1px solid #f5f5f5; padding-top:12px; }
        .post-act-btn { display:flex; align-items:center; gap:5px; font-size:12px; color:#999; cursor:pointer; padding:6px 12px; border:none; background:none; font-family:inherit; transition:color .15s; }
        .post-act-btn:hover { color:#111; }
        .post-act-btn.liked { color:#C94E1A; }
        .post-views { margin-left:auto; font-size:11px; color:#ccc; }
        /* 상세 모달 */
        .post-modal-bg { position:fixed; inset:0; background:rgba(0,0,0,.5); z-index:1000; display:flex; align-items:flex-start; justify-content:center; overflow-y:auto; padding:40px 20px; backdrop-filter:blur(3px); }
        .post-modal { background:#fff; width:min(720px,100%); }
        .pm-header { padding:20px 24px; border-bottom:1px solid #e8e8e8; display:flex; justify-content:space-between; align-items:center; position:sticky; top:0; background:#fff; z-index:1; }
        .pm-close { width:28px; height:28px; border:1px solid #e8e8e8; background:none; cursor:pointer; font-size:14px; color:#666; }
        .pm-body { padding:28px 24px; }
        .pm-footer { padding:16px 24px; border-top:1px solid #e8e8e8; position:sticky; bottom:0; background:#fff; }
        .comment-item { padding:16px 0; border-bottom:1px solid #f5f5f5; }
        .ci-top { display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; }
        .ci-user { display:flex; align-items:center; gap:8px; font-size:13px; font-weight:500; }
        .ci-avatar { width:28px; height:28px; border-radius:50%; background:#f0f0f0; display:flex; align-items:center; justify-content:center; font-size:13px; }
        .ci-text { font-size:13px; color:#444; line-height:1.7; font-weight:300; }
        .comment-input { display:flex; gap:8px; }
        .ci-input { flex:1; padding:11px 14px; border:1px solid #e8e8e8; font-size:13px; outline:none; font-family:inherit; }
        .ci-input:focus { border-color:#111; }
        .ci-submit { padding:11px 18px; background:#111; color:#fff; border:none; cursor:pointer; font-size:13px; font-family:inherit; white-space:nowrap; }
        .ci-submit:hover { background:#C94E1A; }
        /* 글쓰기 모달 */
        .write-modal-bg { position:fixed; inset:0; background:rgba(0,0,0,.5); z-index:1000; display:flex; align-items:center; justify-content:center; padding:20px; backdrop-filter:blur(3px); }
        .write-modal { background:#fff; width:min(640px,100%); max-height:90vh; overflow-y:auto; }
        .wm-header { padding:20px 24px; border-bottom:1px solid #e8e8e8; display:flex; justify-content:space-between; align-items:center; }
        .wm-body { padding:24px; }
        .wm-input { width:100%; padding:12px 14px; border:1px solid #e8e8e8; font-size:13px; outline:none; font-family:inherit; margin-bottom:10px; }
        .wm-input:focus { border-color:#111; }
        .wm-select { width:100%; padding:11px 14px; border:1px solid #e8e8e8; font-size:13px; outline:none; font-family:inherit; margin-bottom:10px; background:#fff; }
        .wm-textarea { width:100%; padding:12px 14px; border:1px solid #e8e8e8; font-size:13px; outline:none; font-family:inherit; height:160px; resize:vertical; line-height:1.7; }
        .wm-textarea:focus { border-color:#111; }
        .wm-footer { padding:16px 24px; border-top:1px solid #e8e8e8; display:flex; justify-content:flex-end; gap:8px; }
        /* 사이드바 */
        .side-card { background:#fff; border:1px solid #e8e8e8; padding:20px; margin-bottom:16px; }
        .side-title { font-size:12px; font-weight:600; color:#111; letter-spacing:.5px; margin-bottom:14px; }
        .withy-earn-item { display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #f5f5f5; font-size:12px; }
        .withy-earn-item:last-child { border-bottom:none; }
        .we-label { color:#666; font-weight:300; display:flex; align-items:center; gap:5px; }
        .we-point { color:#B08D57; font-weight:600; }
        .hot-post { padding:10px 0; border-bottom:1px solid #f5f5f5; cursor:pointer; }
        .hot-post:last-child { border-bottom:none; }
        .hp-title { font-size:12px; color:#333; line-height:1.5; margin-bottom:3px; }
        .hp-meta { font-size:10px; color:#ccc; display:flex; gap:8px; }
        /* 토스트 */
        .cm-toast { position:fixed; bottom:24px; left:50%; transform:translateX(-50%) translateY(60px); background:#111; color:#fff; padding:12px 20px; font-size:13px; z-index:2000; transition:transform .3s; white-space:nowrap; pointer-events:none; }
        .cm-toast.show { transform:translateX(-50%) translateY(0); }
        @media (max-width:768px) {
          .cm-hero { padding:24px 16px; }
          .cm-hero-title { font-size:22px; }
          .cm-wrap { grid-template-columns:1fr; padding:16px 0 80px; gap:0; }
          .cm-main { padding:0; }
          .cm-side { padding:16px; }
          .cm-toolbar { padding:12px 16px; }
          .post-inner { padding:16px; }
          .post-modal-bg { padding:0; align-items:flex-end; }
          .post-modal { width:100%; max-height:90dvh; overflow-y:auto; }
          .write-modal { width:100%; max-height:90dvh; border-radius:0; }
        }
      `}</style>

      <Navbar />

      {/* 히어로 */}
      <div className="cm-hero">
        <div style={{maxWidth:'1100px',margin:'0 auto'}}>
          <div style={{fontSize:'10px',letterSpacing:'3px',color:'#C94E1A',fontWeight:600,marginBottom:'10px'}}>CLYQ COMMUNITY</div>
          <div className="cm-hero-title">패션을 함께 나누는 공간</div>
          <div className="cm-hero-sub">피팅 후기, 스타일 공유, 브랜드 이야기 — 그리고 활동할수록 쌓이는 위디</div>
          <div className="cm-hero-withy">
            {[['✍️ 글 작성','+30P'],['💬 댓글','+10P'],['❤️ 좋아요 받기','+5P'],['🔗 공유','+10P'],['📦 피팅 후기','+50P']].map(([act,pt]) => (
              <div key={act} className="cm-withy-tag">
                <span>{act}</span><span style={{fontWeight:700}}>{pt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 카테고리 탭 */}
      <div className="cm-tab-bar">
        <div style={{maxWidth:'1100px',margin:'0 auto',display:'flex',width:'100%',padding:'0 40px'}}>
          {categories.map(cat => (
            <button key={cat} className={`cm-tab ${activeCategory===cat?'on':''}`} onClick={() => setActiveCategory(cat)}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="cm-wrap">
        {/* 메인 */}
        <div className="cm-main">
          <div className="cm-toolbar">
            <div style={{fontSize:'13px',color:'#999'}}>총 {sorted.length}개의 게시글</div>
            <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
              <div className="cm-sort">
                {['최신순','인기순','댓글순'].map(s => (
                  <button key={s} className={`cm-sort-btn ${sortBy===s?'on':''}`} onClick={() => setSortBy(s)}>{s}</button>
                ))}
              </div>
              <button className="write-btn" onClick={() => setWriteOpen(true)}>✍️ 글쓰기</button>
            </div>
          </div>

          {sorted.map(post => (
            <div key={post.id} className="post-card">
              <div className="post-inner" onClick={() => setSelectedPost(post)}>
                <div className="post-meta">
                  <span className="post-badge" style={{background:badgeColor[post.badge]||'#666',color:'#fff'}}>{post.badge}</span>
                  {post.withy && <span className="post-withy">💛 위디 피팅 후기</span>}
                  <span className="post-author">
                    <span style={{fontSize:'14px'}}>{post.avatar}</span>
                    <span>{post.author}</span>
                    <span style={{color:'#ddd'}}>·</span>
                    <span>{post.date}</span>
                  </span>
                </div>
                <div className="post-title">{post.title}</div>
                <div className="post-preview">{post.preview}</div>
                {post.images.length > 0 && (
                  <div className="post-img-row">
                    {post.images.map((img,i) => (
                      <div key={i} className="post-thumb"><img src={img} alt=""/></div>
                    ))}
                  </div>
                )}
                {post.tags.length > 0 && (
                  <div className="post-tags">
                    {post.tags.map(t => <span key={t} className="post-tag">#{t}</span>)}
                  </div>
                )}
              </div>
              <div className="post-actions" style={{paddingLeft:'20px',paddingRight:'20px'}}>
                <button className={`post-act-btn ${post.liked?'liked':''}`}
                  onClick={() => toggleLike(post.id)}>
                  {post.liked?'❤️':'🤍'} {post.likes}
                </button>
                <button className="post-act-btn" onClick={() => setSelectedPost(post)}>
                  💬 {post.comments}
                </button>
                <button className="post-act-btn" onClick={() => handleShare(post.id)}>
                  🔗 {post.shares}
                </button>
                <span className="post-views">👁 {post.views}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 사이드바 */}
        <div className="cm-side">
          {/* 위디 적립 안내 */}
          <div className="side-card">
            <div className="side-title">💛 위디 적립 활동</div>
            {[
              {icon:'✍️',label:'글 작성',pt:'+30P'},
              {icon:'📦',label:'피팅 후기 작성',pt:'+50P'},
              {icon:'💬',label:'댓글 작성',pt:'+10P'},
              {icon:'❤️',label:'좋아요 받기',pt:'+5P'},
              {icon:'🔗',label:'공유하기',pt:'+10P'},
            ].map(item => (
              <div key={item.label} className="withy-earn-item">
                <div className="we-label"><span>{item.icon}</span>{item.label}</div>
                <div className="we-point">{item.pt}</div>
              </div>
            ))}
            <div style={{marginTop:'12px',padding:'10px',background:'#f9f7f4',fontSize:'11px',color:'#666',lineHeight:1.7}}>
              커뮤니티 활동으로 모은 위디는 <strong>피팅박스·구매 할인</strong>에 사용 가능해요.
            </div>
          </div>

          {/* 인기 게시글 */}
          <div className="side-card">
            <div className="side-title">🔥 인기 게시글</div>
            {[...posts].sort((a,b) => b.likes-a.likes).slice(0,5).map(p => (
              <div key={p.id} className="hot-post" onClick={() => setSelectedPost(p)}>
                <div className="hp-title">{p.title}</div>
                <div className="hp-meta">
                  <span>❤️ {p.likes}</span>
                  <span>💬 {p.comments}</span>
                  <span>{p.date}</span>
                </div>
              </div>
            ))}
          </div>

          {/* 커뮤니티 규칙 */}
          <div className="side-card">
            <div className="side-title">📋 커뮤니티 규칙</div>
            {['피팅박스 제품 사진 공유 시 개인정보 주의','욕설·비방·광고성 게시물 금지','허위 후기 작성 시 위디 회수 및 제재','타인 저작물 무단 사용 금지'].map((rule,i) => (
              <div key={i} style={{fontSize:'11px',color:'#666',padding:'5px 0',display:'flex',gap:'6px',lineHeight:1.6}}>
                <span style={{color:'#C94E1A',flexShrink:0}}>{i+1}.</span>{rule}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 게시글 상세 모달 */}
      {selectedPost && (
        <div className="post-modal-bg" onClick={() => setSelectedPost(null)}>
          <div className="post-modal" onClick={e => e.stopPropagation()}>
            <div className="pm-header">
              <div>
                <span className="post-badge" style={{background:badgeColor[selectedPost.badge]||'#666',color:'#fff',fontSize:'9px',fontWeight:700,padding:'3px 8px'}}>{selectedPost.badge}</span>
              </div>
              <button className="pm-close" onClick={() => setSelectedPost(null)}>✕</button>
            </div>
            <div className="pm-body">
              <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'16px'}}>
                <span style={{fontSize:'24px'}}>{selectedPost.avatar}</span>
                <div>
                  <div style={{fontSize:'14px',fontWeight:500}}>{selectedPost.author}</div>
                  <div style={{fontSize:'11px',color:'#999'}}>{selectedPost.date} {selectedPost.time}</div>
                </div>
              </div>
              <h2 style={{fontSize:'20px',fontWeight:500,marginBottom:'16px',lineHeight:1.4}}>{selectedPost.title}</h2>
              {selectedPost.images.length > 0 && (
                <div style={{marginBottom:'16px'}}>
                  {selectedPost.images.map((img,i) => (
                    <img key={i} src={img} alt="" style={{width:'100%',maxHeight:'360px',objectFit:'cover',marginBottom:'8px'}}/>
                  ))}
                </div>
              )}
              <p style={{fontSize:'14px',color:'#444',lineHeight:1.9,fontWeight:300,marginBottom:'20px'}}>{selectedPost.preview}</p>
              {selectedPost.tags.length > 0 && (
                <div style={{display:'flex',gap:'5px',marginBottom:'20px',flexWrap:'wrap'}}>
                  {selectedPost.tags.map(t => <span key={t} style={{fontSize:'11px',padding:'3px 9px',background:'#f5f5f5',color:'#666',borderRadius:'20px'}}>#{t}</span>)}
                </div>
              )}
              {selectedPost.answered && selectedPost.answer && (
                <div style={{background:'#f0f9f4',border:'1px solid rgba(42,122,80,.2)',padding:'16px',marginBottom:'20px'}}>
                  <div style={{fontSize:'11px',color:'#2a7a50',fontWeight:700,marginBottom:'6px'}}>✓ CLYQ 공식 답변</div>
                  <div style={{fontSize:'13px',color:'#333',lineHeight:1.8,fontWeight:300}}>{selectedPost.answer}</div>
                </div>
              )}
              {/* 좋아요/공유 */}
              <div style={{display:'flex',gap:'8px',marginBottom:'28px',paddingBottom:'20px',borderBottom:'1px solid #f0f0f0'}}>
                <button style={{padding:'10px 20px',border:`1px solid ${selectedPost.liked?'#C94E1A':'#e8e8e8'}`,background:selectedPost.liked?'#fff5f2':'#fff',color:selectedPost.liked?'#C94E1A':'#666',fontSize:'13px',cursor:'pointer',display:'flex',alignItems:'center',gap:'6px',fontFamily:'inherit'}}
                  onClick={() => { toggleLike(selectedPost.id); setSelectedPost(prev => ({...prev,liked:!prev.liked,likes:prev.liked?prev.likes-1:prev.likes+1})) }}>
                  {selectedPost.liked?'❤️':'🤍'} 좋아요 {selectedPost.likes}
                </button>
                <button style={{padding:'10px 20px',border:'1px solid #e8e8e8',background:'#fff',color:'#666',fontSize:'13px',cursor:'pointer',display:'flex',alignItems:'center',gap:'6px',fontFamily:'inherit'}}
                  onClick={() => handleShare(selectedPost.id)}>
                  🔗 공유하기 +10P
                </button>
              </div>
              {/* 댓글 */}
              <div style={{fontSize:'14px',fontWeight:500,marginBottom:'16px'}}>댓글 {(comments[selectedPost.id]||[]).length}</div>
              {(comments[selectedPost.id]||[]).map((c,i) => (
                <div key={i} className="comment-item">
                  <div className="ci-top">
                    <div className="ci-user">
                      <div className="ci-avatar">{c.avatar}</div>
                      <div>
                        <span>{c.name}</span>
                        {c.official && <span style={{fontSize:'10px',background:'#2a7a50',color:'#fff',padding:'2px 6px',marginLeft:'6px'}}>공식</span>}
                        <div style={{fontSize:'10px',color:'#ccc',marginTop:'1px'}}>{c.date}</div>
                      </div>
                    </div>
                    <div style={{fontSize:'12px',color:'#ccc',cursor:'pointer'}} onClick={() => showToast('좋아요!')}>
                      🤍 {c.likes}
                    </div>
                  </div>
                  <div className="ci-text">{c.text}</div>
                </div>
              ))}
            </div>
            <div className="pm-footer">
              <div className="comment-input">
                <input className="ci-input" placeholder="댓글을 입력해주세요. 댓글 작성 시 위디 10P 적립!"
                  value={newComment} onChange={e => setNewComment(e.target.value)}
                  onKeyDown={e => e.key==='Enter' && submitComment(selectedPost.id)}/>
                <button className="ci-submit" onClick={() => submitComment(selectedPost.id)}>등록</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 글쓰기 모달 */}
      {writeOpen && (
        <div className="write-modal-bg" onClick={() => setWriteOpen(false)}>
          <div className="write-modal" onClick={e => e.stopPropagation()}>
            <div className="wm-header">
              <div style={{fontSize:'16px',fontWeight:500}}>글쓰기</div>
              <button style={{width:'28px',height:'28px',border:'1px solid #e8e8e8',background:'none',cursor:'pointer',fontSize:'14px',color:'#666'}} onClick={() => setWriteOpen(false)}>✕</button>
            </div>
            <div className="wm-body">
              <div style={{background:'#f9f7f4',padding:'12px 14px',fontSize:'12px',color:'#666',marginBottom:'16px',lineHeight:1.7}}>
                💛 글 작성 시 <strong style={{color:'#B08D57'}}>위디 30P</strong> 적립 / 피팅 후기 선택 시 <strong style={{color:'#B08D57'}}>위디 50P</strong> 적립
              </div>
              <div style={{marginBottom:'10px'}}>
                <div style={{fontSize:'11px',fontWeight:500,color:'#555',marginBottom:'6px'}}>카테고리</div>
                <select className="wm-select" value={newPost.category} onChange={e => setNewPost({...newPost,category:e.target.value})}>
                  {categories.filter(c=>c!=='전체').map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div style={{marginBottom:'10px'}}>
                <div style={{fontSize:'11px',fontWeight:500,color:'#555',marginBottom:'6px'}}>제목</div>
                <input className="wm-input" placeholder="제목을 입력해주세요" value={newPost.title} onChange={e => setNewPost({...newPost,title:e.target.value})}/>
              </div>
              <div>
                <div style={{fontSize:'11px',fontWeight:500,color:'#555',marginBottom:'6px'}}>내용</div>
                <textarea className="wm-textarea" placeholder="내용을 입력해주세요..." value={newPost.content} onChange={e => setNewPost({...newPost,content:e.target.value})}/>
              </div>
            </div>
            <div className="wm-footer">
              <button style={{padding:'11px 20px',border:'1px solid #e8e8e8',background:'#fff',fontSize:'13px',cursor:'pointer',color:'#666',fontFamily:'inherit'}} onClick={() => setWriteOpen(false)}>취소</button>
              <button style={{padding:'11px 24px',background:'#C94E1A',color:'#fff',border:'none',fontSize:'13px',fontWeight:500,cursor:'pointer',fontFamily:'inherit'}} onClick={submitPost}>등록하기</button>
            </div>
          </div>
        </div>
      )}

      {/* 토스트 */}
      <div className={`cm-toast ${toast?'show':''}`}>{toast}</div>
    </main>
  )
}
