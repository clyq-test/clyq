// @ts-nocheck
'use client'
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import { SharedStyle, Footer, ProductCard } from '../../components/ui'

const allProducts = [
  { id:1, brand:'MARCIA', name:'오버핏 캐시미어 울 코트', price:428000, original:520000, category:'아우터', fit:true, image:'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=80&auto=format&fit=crop&crop=center', points:428 },
  { id:2, brand:'EIGHT', name:'셔링 디테일 미디 드레스', price:198000, original:240000, category:'원피스', fit:true, image:'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80&auto=format&fit=crop&crop=center', points:198 },
  { id:3, brand:'MATIN KIM', name:'오버핏 레더 재킷', price:578000, original:578000, category:'아우터', fit:true, image:'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80&auto=format&fit=crop&crop=center', points:578 },
  { id:4, brand:'SORRY TOO MUCH LOVE', name:'메리노 울 니트 세트업', price:245000, original:245000, category:'상의', fit:false, image:'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80&auto=format&fit=crop&crop=center', points:245 },
  { id:5, brand:'ANDERSSONBELL', name:'테일러드 수트 재킷', price:318000, original:318000, category:'아우터', fit:true, image:'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80&auto=format&fit=crop&crop=center', points:318 },
  { id:6, brand:'EENK', name:'셔링 미디 스커트', price:148000, original:148000, category:'하의', fit:true, image:'https://images.unsplash.com/photo-1496217590455-aa63a8350eea?w=600&q=80&auto=format&fit=crop&crop=center', points:148 },
  { id:7, brand:'D.POUND', name:'라운드넥 실크 블라우스', price:158000, original:198000, category:'상의', fit:true, image:'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&q=80&auto=format&fit=crop&crop=center', points:158 },
  { id:8, brand:'ANOTHER A', name:'캐시미어 터틀넥 니트', price:218000, original:218000, category:'상의', fit:false, image:'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80&auto=format&fit=crop&crop=center', points:218 },
  { id:9, brand:'ADER ERROR', name:'오버핏 후드 스웨트셔츠', price:198000, original:198000, category:'상의', fit:true, image:'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80&auto=format&fit=crop&crop=center', points:198 },
  { id:10, brand:'MATIN KIM', name:'퀼팅 미니 숄더백', price:368000, original:368000, category:'가방', fit:false, image:'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80&auto=format&fit=crop&crop=center', points:368 },
  { id:11, brand:'MARCIA', name:'울 플리츠 와이드 팬츠', price:248000, original:298000, category:'하의', fit:true, image:'https://images.unsplash.com/photo-1496217590455-aa63a8350eea?w=600&q=80&auto=format&fit=crop&crop=center', points:248 },
  { id:12, brand:'EENK', name:'오프숄더 리본 블라우스', price:168000, original:168000, category:'상의', fit:true, image:'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80&auto=format&fit=crop&crop=center', points:168 },
  { id:13, brand:'D.POUND', name:'울 롱 스커트', price:228000, original:268000, category:'하의', fit:true, image:'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&q=80&auto=format&fit=crop&crop=center', points:228 },
  { id:14, brand:'ANDERSSONBELL', name:'플리츠 와이드 슬랙스', price:238000, original:238000, category:'하의', fit:false, image:'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80&auto=format&fit=crop&crop=center', points:238 },
  { id:15, brand:'ANOTHER A', name:'패딩 숏 재킷', price:398000, original:398000, category:'아우터', fit:true, image:'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=80&auto=format&fit=crop&crop=center', points:398 },
  { id:16, brand:'SORRY TOO MUCH LOVE', name:'벨벳 미니 원피스', price:188000, original:228000, category:'원피스', fit:true, image:'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80&auto=format&fit=crop&crop=center', points:188 },
]

const categories = ['전체', '아우터', '상의', '하의', '원피스', '가방']
const sorts = ['최신순', '가격 낮은순', '가격 높은순']

export default function NewProducts() {
  const [activeCategory, setActiveCategory] = useState('전체')
  const [activeSort, setActiveSort] = useState('최신순')
  const [fitOnly, setFitOnly] = useState(false)
  const [visibleCount, setVisibleCount] = useState(12)

  let filtered = allProducts.filter(p =>
    (activeCategory === '전체' || p.category === activeCategory) && (!fitOnly || p.fit)
  )
  if (activeSort === '가격 낮은순') filtered = [...filtered].sort((a, b) => a.price - b.price)
  if (activeSort === '가격 높은순') filtered = [...filtered].sort((a, b) => b.price - a.price)

  return (
    <main>
      <SharedStyle />
      <Navbar />
      <div className="wrap">
        <div className="page-head">
          <h1>신상품</h1>
          <p>새로 입점한 제품을 모아봤어요.</p>
        </div>
        <div className="tabs">
          {categories.map(cat => (
            <button key={cat} className={'tab' + (activeCategory === cat ? ' on' : '')}
              onClick={() => { setActiveCategory(cat); setVisibleCount(12) }}>{cat}</button>
          ))}
        </div>
        <div className="bar">
          <div className={'toggle' + (fitOnly ? ' on' : '')} role="switch" aria-checked={fitOnly} tabIndex={0}
            onClick={() => setFitOnly(!fitOnly)} onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setFitOnly(!fitOnly)}>
            <i /><span>피팅 가능한 제품만</span>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <span className="count">{filtered.length}개</span>
            {sorts.map(s => (
              <button key={s} className={'chip' + (activeSort === s ? ' on' : '')} onClick={() => setActiveSort(s)}>{s}</button>
            ))}
          </div>
        </div>
        {filtered.length === 0 ? (
          <div className="empty">조건에 맞는 제품이 없어요. 필터를 바꿔 보세요.</div>
        ) : (
          <>
            <div className="grid-4">
              {filtered.slice(0, visibleCount).map(p => <ProductCard key={p.id} p={p} />)}
            </div>
            {visibleCount < filtered.length && (
              <button className="btn-s more" onClick={() => setVisibleCount(v => v + 8)}>
                더 보기 ({filtered.length - visibleCount}개 남음)
              </button>
            )}
          </>
        )}
      </div>
      <Footer />
    </main>
  )
}
