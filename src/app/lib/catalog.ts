// @ts-nocheck
/* 샘플 상품 카탈로그 (실제 상품 데이터 아님) */
export const allProducts = [
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

export const CATEGORIES = ['아우터', '상의', '하의', '원피스', '가방']
export const BRANDS = ['MARCIA', 'MATIN KIM', 'EENK', 'D.POUND', 'ANOTHER A', 'EIGHT', 'ANDERSSONBELL', 'ADER ERROR', 'SORRY TOO MUCH LOVE']
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
