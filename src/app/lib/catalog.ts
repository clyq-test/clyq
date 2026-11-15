// @ts-nocheck
/* 샘플 카탈로그: 15개 가상 브랜드 × 20개 제품(총 300개). 실제 브랜드·제품·이미지가 아니며 입점 브랜드 데이터로 교체해야 합니다.
   서버 없이도 항상 같은 결과가 나오도록 무작위 없이 규칙으로 생성합니다. */
const U = id => `https://images.unsplash.com/photo-${id}?w=600&q=80&auto=format&fit=crop&crop=center`
// 이미 사이트에서 쓰고 있던 이미지만 재사용합니다(제품마다 별도 사진이 아니라 카테고리별 대표 이미지를 돌려 씀).
const IMG = {
  '아우터': ['1539533018447-63fcce2678e3', '1551028719-00167b16eac5', '1507679799987-c73779587ccf'],
  '상의': ['1581044777550-4cfa60707c03', '1576566588028-4147f3842f27', '1515886657613-9f3515b0c78f', '1434389677669-e08b4cac3105'],
  '하의': ['1496217590455-aa63a8350eea', '1509631179647-0177331693ae'],
  '원피스': ['1515372039744-b8f02a3ae446'],
  '가방': ['1548036328-c9fa89d128fa'],
}
export const CATEGORIES = ['아우터', '상의', '하의', '원피스', '가방']

export const BRAND_INFO = [
  { name: 'MARCIA', concept: '절제된 테일러링의 데일리 웨어', tier: 1.1 },
  { name: 'LUNE ATELIER', concept: '부드러운 실루엣의 페미닌 룩', tier: 1.0 },
  { name: 'OTTO HAUS', concept: '구조적인 라인의 모던 클래식', tier: 1.3 },
  { name: 'NORDE', concept: '북유럽 무드의 미니멀 니트웨어', tier: 0.9 },
  { name: 'SOLEIL PARK', concept: '가볍고 화사한 시즌 캐주얼', tier: 0.8 },
  { name: 'VAUGHN & CO', concept: '오래 입는 워크웨어 감성', tier: 1.0 },
  { name: 'MIRELLE', concept: '우아한 이브닝·특별한 날의 옷', tier: 1.4 },
  { name: 'KOVA', concept: '실용적인 어반 스트릿', tier: 0.8 },
  { name: 'ATELIER BLANC', concept: '화이트 톤으로 완성하는 기본', tier: 0.9 },
  { name: 'HALDEN', concept: '울과 가죽 중심의 아우터 전문', tier: 1.5 },
  { name: 'PIERCE LANE', concept: '출근길 비즈니스 캐주얼', tier: 1.1 },
  { name: 'YUNA SEOUL', concept: '서울 감성의 트렌디 컨템포러리', tier: 1.0 },
  { name: 'DORAN', concept: '편안한 오버사이즈 라운지웨어', tier: 0.8 },
  { name: 'ELSIE MOON', concept: '로맨틱한 디테일의 원피스 중심', tier: 1.2 },
  { name: 'STUDIO TALE', concept: '이야기를 담은 아티스틱 컬렉션', tier: 1.2 },
]
export const BRANDS = BRAND_INFO.map(b => b.name)

const BASE = {
  '아우터': { price: 360000, names: ['울 롱 코트', '캐시미어 블렌드 코트', '테일러드 재킷', '레더 라이더 재킷', '숏 패딩 재킷', '트렌치 코트', '더블 브레스트 블레이저', '퀼팅 점퍼'] },
  '상의': { price: 138000, names: ['실크 블라우스', '메리노 울 니트', '오버핏 셔츠', '캐시미어 터틀넥', '코튼 티셔츠', '리본 블라우스', '카디건', '후드 스웨트셔츠'] },
  '하의': { price: 158000, names: ['와이드 슬랙스', '플리츠 스커트', '울 롱 스커트', '데님 팬츠', '카고 팬츠', '미니 스커트', '조거 팬츠', '하이웨스트 팬츠'] },
  '원피스': { price: 208000, names: ['셔링 미디 드레스', '벨벳 미니 원피스', '플라워 롱 원피스', '니트 원피스', '셔츠 드레스', '새틴 슬립 드레스', '랩 드레스', '세트업 원피스'] },
  '가방': { price: 248000, names: ['퀼팅 숄더백', '미니 크로스백', '토트백', '버킷백', '클러치', '호보백', '백팩', '카드 지갑'] },
}
const ADJ = ['클래식', '소프트', '에센셜', '데일리', '오버핏', '슬림핏', '빈티지', '모던', '릴랙스드', '시그니처']

export const allProducts = BRAND_INFO.flatMap((b, bi) => {
  const rows = []
  CATEGORIES.forEach((cat, ci) => {
    for (let k = 0; k < 4; k++) {
      const n = bi * 20 + ci * 4 + k            // 0..299
      const base = BASE[cat]
      const price = Math.round(base.price * b.tier * (0.85 + ((n * 37) % 30) / 100) / 1000) * 1000
      const sale = n % 5 === 0 || n % 7 === 0
      const original = sale ? Math.round(price / (1 - (10 + (n % 4) * 5) / 100) / 1000) * 1000 : price
      const imgs = IMG[cat]
      rows.push({
        id: n + 1, brand: b.name,
        name: `${ADJ[(bi + k * 3 + ci) % ADJ.length]} ${base.names[(bi * 3 + k * 2 + ci) % base.names.length]}`,
        price, original, category: cat,
        fit: cat !== '가방' && (n * 7 + bi) % 10 < 7,
        image: U(imgs[(bi + k) % imgs.length]),
        points: Math.round(price / 1000),
      })
    }
  })
  return rows
})
export const byId = id => allProducts.find(p => p.id === Number(id))

/* 카테고리별 샘플 상세 정보 — 실제 제품 정보가 아니며 입점 브랜드 데이터로 교체해야 합니다. */
const SIZE_HEAD = {
  '아우터': ['총장', '가슴', '어깨', '소매'], '상의': ['총장', '가슴', '어깨', '소매'],
  '하의': ['총장', '허리', '엉덩이', '밑위'], '원피스': ['총장', '가슴', '허리', '어깨'], '가방': ['가로', '세로', '폭', '끈 길이'],
}
const DETAIL = {
  '아우터': { short: '어깨선이 정돈되고 여유 있는 실루엣의 아우터입니다.', fabric: ['겉감: 울 60% 폴리에스터 40%', '안감: 폴리에스터 100%'], care: ['드라이클리닝 권장', '물세탁·기계 세탁 불가', '건조기 사용 금지', '보관 시 옷걸이에 걸어 주세요'], table: [['S', '100', '108', '44', '60'], ['M', '103', '112', '46', '61'], ['L', '106', '116', '48', '62']] },
  '상의': { short: '매일 입기 좋은 부드러운 촉감의 상의입니다.', fabric: ['겉감: 면 70% 폴리에스터 30%'], care: ['30℃ 이하 중성세제 단독 손세탁', '표백제 사용 금지', '그늘에서 뉘어 건조', '중간 온도 다림질 가능'], table: [['S', '60', '92', '38', '58'], ['M', '62', '96', '40', '59'], ['L', '64', '100', '42', '60']] },
  '하의': { short: '핏이 깔끔하게 떨어지는 하의입니다.', fabric: ['겉감: 폴리에스터 65% 레이온 30% 폴리우레탄 5%'], care: ['드라이클리닝 권장', '물세탁 시 30℃ 이하 손세탁', '건조기 사용 금지'], table: [['S', '95', '66', '90', '29'], ['M', '97', '70', '94', '30'], ['L', '99', '74', '98', '31']] },
  '원피스': { short: '한 벌로 완성되는 부드러운 실루엣의 원피스입니다.', fabric: ['겉감: 폴리에스터 95% 폴리우레탄 5%', '안감: 폴리에스터 100%'], care: ['드라이클리닝 권장', '물세탁 불가', '다림질 시 안쪽에서 낮은 온도로'], table: [['S', '112', '88', '70', '38'], ['M', '114', '92', '74', '39'], ['L', '116', '96', '78', '40']] },
  '가방': { short: '데일리로 들기 좋은 크기의 가방입니다.', fabric: ['겉감: 합성피혁', '안감: 폴리에스터 100%'], care: ['마른 천으로 가볍게 닦아 주세요', '물·화학약품 접촉 주의', '보관 시 형태가 유지되도록 보관'], table: [['F', '22', '16', '8', '55']] },
}
export const detailOf = p => {
  const d = DETAIL[p.category] || DETAIL['상의']
  return { ...d, head: SIZE_HEAD[p.category] || SIZE_HEAD['상의'] }
}
