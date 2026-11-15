// @ts-nocheck
import { allProducts, BRAND_INFO, CATEGORIES } from './catalog'

/* 메인·기획전 큐레이션. 판매 데이터가 없으므로 '인기순'이 아니라 카탈로그 속성(브랜드 무드·카테고리·세일·피팅 가능 여부)으로 묶습니다.
   실제 판매·조회 데이터가 쌓이면 정렬 기준만 바꾸면 됩니다. */
export const MOODS = [
  { key: 'minimal', label: '미니멀', sub: '군더더기 없는 기본의 힘', brands: ['MARCIA', 'NORDE', 'ATELIER BLANC'] },
  { key: 'romantic', label: '로맨틱', sub: '부드럽고 섬세한 디테일', brands: ['LUNE ATELIER', 'MIRELLE', 'ELSIE MOON'] },
  { key: 'classic', label: '클래식', sub: '오래 입는 정통 실루엣', brands: ['OTTO HAUS', 'HALDEN', 'PIERCE LANE'] },
  { key: 'casual', label: '캐주얼', sub: '편하게, 매일 손이 가는', brands: ['SOLEIL PARK', 'VAUGHN & CO', 'DORAN'] },
  { key: 'trend', label: '트렌디', sub: '지금의 감각을 담은', brands: ['KOVA', 'YUNA SEOUL', 'STUDIO TALE'] },
]
export const moodOf = key => MOODS.find(m => m.key === key)
export const MOOD_BY_STYLE = { minimal: 'minimal', feminine: 'romantic', romantic: 'romantic', classic: 'classic', luxe: 'classic', casual: 'casual', sporty: 'casual', street: 'trend' }
const CAT_BY_SLUG = { outer: '아우터', top: '상의', bottom: '하의', dress: '원피스', bag: '가방' }

export const EXHIBITIONS = [
  { key: 'coat', title: 'F/W 코트 모아보기', sub: '울·캐시미어·트렌치까지 코트만 모았어요', test: p => p.category === '아우터' && /코트/.test(p.name) },
  { key: 'office', title: '출근룩 스타일 가이드', sub: '슬랙스·블라우스·재킷으로 완성하는 오피스 룩', test: p => ['PIERCE LANE', 'OTTO HAUS', 'MARCIA'].includes(p.brand) && /슬랙스|블라우스|재킷|블레이저|셔츠|팬츠/.test(p.name) },
  { key: 'knit', title: '니트·가디건 모아보기', sub: '가을·겨울에 꺼내 입는 니트', test: p => /니트|가디건|터틀넥/.test(p.name) },
  { key: 'dress', title: '특별한 날의 원피스', sub: '모임·행사에 입기 좋은 원피스', test: p => p.category === '원피스' },
  { key: 'sale', title: '시즌 세일', sub: '할인 중인 제품만 모았어요', test: p => p.original > p.price },
  { key: 'fit', title: '입어보고 고르는 피팅 제품', sub: '피팅박스로 먼저 입어볼 수 있는 제품', test: p => p.fit },
]
export const exhibitionOf = key => EXHIBITIONS.find(e => e.key === key)
export const exhibitionItems = e => allProducts.filter(e.test)

// 같은 브랜드만 몰리지 않도록 브랜드를 번갈아 가며 n개 선택
export function mix(list, n) {
  const g = {}
  list.forEach(p => (g[p.brand] = g[p.brand] || []).push(p))
  const qs = Object.values(g), out = []
  for (let i = 0; out.length < n && qs.some(q => q[i]); i++) qs.forEach(q => { if (q[i] && out.length < n) out.push(q[i]) })
  return out
}
export const moodItems = key => allProducts.filter(p => (moodOf(key).brands).includes(p.brand))
export const categoryCover = cat => (allProducts.find(p => p.category === cat) || allProducts[0]).image

// 취향 분석 결과(style)가 있으면 점수로 추천, 없으면 null
export function recommend(style, n = 5) {
  if (!style) return null
  const brands = (style.brand || []).filter(b => b !== 'no_brand')
  const cats = (style.category || []).map(c => CAT_BY_SLUG[c]).filter(Boolean)
  const moods = (style.style || []).map(s => MOOD_BY_STYLE[s]).filter(Boolean)
  if (!brands.length && !cats.length && !moods.length) return null
  const moodBrands = moods.flatMap(m => moodOf(m).brands)
  const scored = allProducts.map(p => ({ p, s: (brands.includes(p.brand) ? 3 : 0) + (cats.includes(p.category) ? 2 : 0) + (moodBrands.includes(p.brand) ? 2 : 0) + (p.fit ? 0.5 : 0) })).filter(x => x.s >= 2)
  scored.sort((a, b) => b.s - a.s || a.p.id - b.p.id)
  return mix(scored.slice(0, 60).map(x => x.p), n)
}
export { BRAND_INFO, CATEGORIES }
