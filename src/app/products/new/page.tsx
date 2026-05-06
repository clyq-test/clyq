// @ts-nocheck
'use client'
import { useState } from 'react'
import Navbar from '../../components/Navbar'

const allProducts = [
  { id:1, brand:'MARCIA', name:'오버핏 캐시미어 울 코트', price:428000, original:520000, category:'아우터', fit:true, image:'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&auto=format&fit=crop', points:428 },
  { id:2, brand:'EIGHT', name:'셔링 디테일 미디 드레스', price:198000, original:240000, category:'원피스', fit:true, image:'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&auto=format&fit=crop', points:198 },
  { id:3, brand:'MATIN KIM', name:'오버핏 레더 재킷', price:578000, original:578000, category:'아우터', fit:true, image:'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop', points:578 },
  { id:4, brand:'SORRY TOO MUCH LOVE', name:'메리노 울 니트 세트업', price:245000, original:245000, category:'상의', fit:false, image:'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&auto=format&fit=crop', points:245 },
  { id:5, brand:'ANDERSSONBELL', name:'테일러드 수트 재킷', price:318000, original:318000, category:'아우터', fit:true, image:'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop', points:318 },
  { id:6, brand:'EENK', name:'셔링 미디 스커트', price:148000, original:148000, category:'하의', fit:true, image:'https://images.unsplash.com/photo-1583496661160-fb5218e5b8a9?w=600&auto=format&fit=crop', points:148 },
  { id:7, brand:'D.POUND', name:'라운드넥 실크 블라우스', price:158000, original:198000, category:'상의', fit:true, image:'https://images.unsplash.com/photo-1594938298603-c8148f4851b8?w=600&auto=format&fit=crop', points:158 },
  { id:8, brand:'ANOTHER A', name:'캐시미어 터틀넥 니트', price:218000, original:218000, category:'상의', fit:false, image:'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&auto=format&fit=crop', points:218 },
  { id:9, brand:'ADER ERROR', name:'오버핏 후드 스웨트셔츠', price:198000, original:198000, category:'상의', fit:true, image:'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&auto=format&fit=crop', points:198 },
  { id:10, brand:'MATIN KIM', name:'퀼팅 미니 숄더백', price:368000, original:368000, category:'가방', fit:false, image:'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop', points:368 },
  { id:11, brand:'MARCIA', name:'울 플리츠 와이드 팬츠', price:248000, original:298000, category:'하의', fit:true, image:'https://images.unsplash.com/photo-1583496661160-fb5218e5b8a9?w=600&auto=format&fit=crop', points:248 },
  { id:12, brand:'EENK', name:'오프숄더 리본 블라우스', price:168000, original:168000, category:'상의', fit:true, image:'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&auto=format&fit=crop', points:168 },
  { id:13, brand:'D.POUND', name:'울 롱 스커트', price:228000, original:268000, category:'하의', fit:true, image:'https://images.unsplash.com/photo-1594938298603-c8148f4851b8?w=600&auto=format&fit=crop', points:228 },
  { id:14, brand:'ANDERSSONBELL', name:'플리츠 와이드 슬랙스', price:238000, original:238000, category:'하의', fit:false, image:'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop', points:238 },
  { id:15, brand:'ANOTHER A', name:'패딩 숏 재킷', price:398000, original:398000, category:'아우터', fit:true, image:'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&auto=format&fit=crop', points:398 },
  { id:16, brand:'SORRY TOO MUCH LOVE', name:'벨벳 미니 원피스', price:188000, original:228000, category:'원피스', fit:true, image:'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&auto=format&fit=crop', points:188 },
]

const categories = ['전체', '아우터', '상의', '하의', '원피스', '가방']
const sorts = ['최신순', '가격 낮은순', '가격 높은순']

function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false)
  const dc = product.original > product.price ? Math.round((1 - product.price / product.original) * 100) : 0
  return (
    <a href={'/products/' + product.id} style={{display:'block',textDecoration:'none',color:'inherit'}}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div style={{position:'relative',aspectRatio:'3/4',background:'#f5f5f5',overflow:'hidden',marginBottom:'10px'}}>
        <img src={product.image} alt={product.name}
          style={{width:'100%',height:'100%',objectFit:'cover',transition:'transform 0.4s',transform:hovered?'scale(1.05)':'scale(1)'}}/>
        <div style={{position:'absolute',top:'10px',left:'10px',display:'flex',flexDirection:'column',gap:'4px'}}>
          <span style={{background:'#111',color:'#fff',fontSize:'9px',fontWeight:700,padding:'3px 7px'}}>NEW</span>
          {product.fit && <span style={{background:'#C94E1A',color:'#fff',fontSize:'9px',fontWeight:700,padding:'3px 7px'}}>선피팅</span>}
        </div>
        <button style={{position:'absolute',top:'10px',right:'10px',width:'30px',height:'30px',borderRadius:'50%',background:'rgba(255,255,255,0.9)',border:'none',cursor:'pointer',fontSize:'13px'}}
          onClick={e => e.preventDefault()}>🤍</button>
        {hovered && (
          <button style={{position:'absolute',bottom:0,left:0,right:0,padding:'12px',background:'#C94E1A',color:'#fff',fontSize:'11px',fontWeight:500,border:'none',cursor:'pointer'}}
            onClick={e => e.preventDefault()}>선피팅 신청하기</button>
        )}
      </div>
      <div style={{fontSize:'10px',letterSpacing:'1.5px',color:'#999',marginBottom:'4px'}}>{product.brand}</div>
      <div style={{fontSize:'13px',color:'#333',marginBottom:'6px',fontWeight:300,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{product.name}</div>
      <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'4px'}}>
        <span style={{fontSize:'14px',fontWeight:500}}>{product.price.toLocaleString()}원</span>
        {dc > 0 && <>
          <span style={{fontSize:'12px',color:'#ccc',textDecoration:'line-through'}}>{product.original.toLocaleString()}원</span>
          <span style={{fontSize:'12px',fontWeight:600,color:'#c0392b'}}>{dc}%</span>
        </>}
      </div>
      <div style={{fontSize:'10px',color:'#B08D57'}}>W {product.points}P 적립</div>
    </a>
  )
}

export default function NewProducts() {
  const [activeCategory, setActiveCategory] = useState('전체')
  const [activeSort, setActiveSort] = useState('최신순')
  const [fitOnly, setFitOnly] = useState(false)
  const [visibleCount, setVisibleCount] = useState(12)

  let filtered = allProducts.filter(p =>
    (activeCategory === '전체' || p.category === activeCategory) && (!fitOnly || p.fit)
  )
  if (activeSort === '가격 낮은순') filtered = [...filtered].sort((a,b) => a.price - b.price)
  if (activeSort === '가격 높은순') filtered = [...filtered].sort((a,b) => b.price - a.price)

  return (
    <main>
      <style>{`
        .new-page-header { padding:32px 40px 0; border-bottom:1px solid #e8e8e8; }
        .new-filter-bar { padding:14px 40px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #e8e8e8; background:#fafafa; }
        .new-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:40px 20px; margin-bottom:48px; }
        .sort-btns { display:flex; gap:8px; }
        @media (max-width:768px) {
          .new-page-header { padding:20px 16px 0; }
          .new-filter-bar { padding:12px 16px; flex-direction:column; gap:12px; align-items:flex-start; }
          .new-grid { grid-template-columns:repeat(2,1fr); gap:20px 12px; }
          .sort-btns { flex-wrap:wrap; gap:6px; }
          .new-grid-wrap { padding:20px 16px; }
        }
        @media (min-width:769px) { .new-grid-wrap { padding:32px 40px; } }
      `}</style>

      <Navbar />

      <div className="new-page-header">
        <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginBottom:'20px'}}>
          <div>
            <div style={{fontSize:'10px',letterSpacing:'3px',color:'#999',marginBottom:'8px'}}>NEW ARRIVALS</div>
            <h1 style={{fontSize:'24px',fontWeight:500,color:'#111'}}>신상품</h1>
          </div>
          <div style={{fontSize:'13px',color:'#999',fontWeight:300,paddingBottom:'4px'}}>총 {filtered.length}개</div>
        </div>
        <div style={{display:'flex',gap:'0',overflowX:'auto'}}>
          {categories.map(cat => (
            <button key={cat} onClick={() => { setActiveCategory(cat); setVisibleCount(12) }}
              style={{padding:'12px 16px',fontSize:'13px',fontWeight:activeCategory===cat?500:400,color:activeCategory===cat?'#111':'#999',background:'none',border:'none',borderBottom:activeCategory===cat?'2px solid #111':'2px solid transparent',cursor:'pointer',whiteSpace:'nowrap'}}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="new-filter-bar">
        <div style={{display:'flex',alignItems:'center',gap:'10px',cursor:'pointer'}} onClick={() => setFitOnly(!fitOnly)}>
          <div style={{width:'40px',height:'22px',borderRadius:'11px',background:fitOnly?'#C94E1A':'#ddd',position:'relative',transition:'background 0.2s'}}>
            <div style={{width:'18px',height:'18px',borderRadius:'50%',background:'#fff',position:'absolute',top:'2px',left:fitOnly?'20px':'2px',transition:'left 0.2s',boxShadow:'0 1px 3px rgba(0,0,0,0.2)'}}/>
          </div>
          <span style={{fontSize:'13px',color:fitOnly?'#C94E1A':'#666',fontWeight:fitOnly?500:400}}>선피팅 가능만 보기</span>
        </div>
        <div className="sort-btns">
          {sorts.map(sort => (
            <button key={sort} onClick={() => setActiveSort(sort)}
              style={{padding:'7px 14px',fontSize:'12px',color:activeSort===sort?'#111':'#999',background:activeSort===sort?'#fff':'transparent',border:activeSort===sort?'1px solid #111':'1px solid #e8e8e8',cursor:'pointer',borderRadius:'20px'}}>
              {sort}
            </button>
          ))}
        </div>
      </div>

      <div className="new-grid-wrap">
        {filtered.length === 0 ? (
          <div style={{textAlign:'center',padding:'60px 0',color:'#999'}}>해당 조건의 상품이 없어요.</div>
        ) : (
          <>
            <div className="new-grid">
              {filtered.slice(0, visibleCount).map(p => <ProductCard key={p.id} product={p} />)}
            </div>
            {visibleCount < filtered.length && (
              <div style={{textAlign:'center'}}>
                <button onClick={() => setVisibleCount(v => v + 8)}
                  style={{padding:'14px 48px',border:'1px solid #111',background:'#fff',fontSize:'13px',fontWeight:500,cursor:'pointer'}}>
                  더보기 ({filtered.length - visibleCount}개 남음)
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <footer style={{background:'#111',padding:'32px 40px',marginTop:'40px'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:'Georgia,serif',fontSize:'20px',color:'#fff',letterSpacing:'4px'}}>CLY<span style={{color:'#C94E1A'}}>Q</span></div>
          <div style={{fontSize:'12px',color:'rgba(255,255,255,0.3)'}}>© 2026 CLYQ Inc.</div>
        </div>
      </footer>
    </main>
  )
}
