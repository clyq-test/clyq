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
