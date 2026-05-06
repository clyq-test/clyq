// @ts-nocheck
'use client'
import { useState } from 'react'
import Navbar from '../../components/Navbar'

const product = {
  id: 1,
  brand: 'MARCIA',
  name: '오버핏 캐시미어 울 코트',
  nameEn: 'Oversized Cashmere Wool Coat',
  price: 428000,
  original: 520000,
  points: 428,
  isFittable: true,
  category: '아우터',
  images: [
    'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1583496661160-fb5218e5b8a9?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&auto=format&fit=crop',
  ],
  colors: [
    { name: '아이보리', hex: '#e8e0d0' },
    { name: '베이지', hex: '#c8b8a0' },
    { name: '블랙', hex: '#1a1610' },
  ],
  sizes: ['XS', 'S', 'M', 'L'],
  soldout: ['XL'],
  desc: '고급 캐시미어 혼방 소재로 제작된 오버핏 코트. 루즈한 실루엣이지만 어깨 라인이 정돈되어 단정하면서도 여유로운 무드를 연출합니다.',
  material: '캐시미어 30% 울 50% 폴리에스터 20%',
  origin: '대한민국',
  wash: '드라이클리닝 권장',
  rating: 4.8,
  reviewCount: 128,
}

const relatedProducts = [
  { id:2, brand:'EIGHT', name:'셔링 디테일 미디 드레스', price:198000, original:240000, image:'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&auto=format&fit=crop' },
  { id:3, brand:'MATIN KIM', name:'오버핏 레더 재킷', price:578000, original:578000, image:'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop' },
  { id:6, brand:'EENK', name:'셔링 미디 스커트', price:148000, original:148000, image:'https://images.unsplash.com/photo-1583496661160-fb5218e5b8a9?w=600&auto=format&fit=crop' },
  { id:7, brand:'D.POUND', name:'라운드넥 실크 블라우스', price:158000, original:198000, image:'https://images.unsplash.com/photo-1594938298603-c8148f4851b8?w=600&auto=format&fit=crop' },
]

export default function ProductDetail() {
  const [mainImg, setMainImg] = useState(0)
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState('')
  const [qty, setQty] = useState(1)
  const [wished, setWished] = useState(false)
  const [activeTab, setActiveTab] = useState('detail')
  const [fitModalOpen, setFitModalOpen] = useState(false)
  const [buyModalOpen, setBuyModalOpen] = useState(false)
  const [fitStep, setFitStep] = useState(1)
  const [fitDone, setFitDone] = useState(false)
  const [withyOn, setWithyOn] = useState(false)
  const [toast, setToast] = useState('')
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)

  const dc = Math.round((1 - product.price / product.original) * 100)

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(''), 2800)
  }

  function openFit() {
    if (!selectedSize) { showToast('사이즈를 먼저 선택해주세요'); return }
    setFitStep(1); setFitDone(false); setFitModalOpen(true)
    document.body.style.overflow = 'hidden'
  }
  function closeFit() { setFitModalOpen(false); document.body.style.overflow = '' }
  function openBuy() {
    if (!selectedSize) { showToast('사이즈를 먼저 선택해주세요'); return }
    setBuyModalOpen(true); document.body.style.overflow = 'hidden'
  }
  function closeBuy() { setBuyModalOpen(false); document.body.style.overflow = '' }

  function addCart() {
    if (!selectedSize) { showToast('사이즈를 먼저 선택해주세요'); return }
    showToast('🛍️ 장바구니에 담았어요')
  }

  return (
    <main style={{background:'#fff'}}>
      <style>{`
        /* 브레드크럼 */
        .breadcrumb { padding:14px 40px; display:flex; align-items:center; gap:6px; font-size:11px; color:#999; border-bottom:1px solid #f0f0f0; }
        .breadcrumb a { color:#999; cursor:pointer; text-decoration:none; }
        .breadcrumb a:hover { color:#111; }

        /* 상품 레이아웃 */
        .product-wrap { display:grid; grid-template-columns:auto 1fr 420px; gap:0; padding:0; max-width:1200px; margin:0 auto; }

        /* 썸네일 */
        .thumb-col { width:72px; padding:24px 0 24px 24px; display:flex; flex-direction:column; gap:8px; }
        .thumb-item { width:60px; height:75px; overflow:hidden; cursor:pointer; border:1.5px solid transparent; flex-shrink:0; }
        .thumb-item.on { border-color:#111; }
        .thumb-item:hover { border-color:#ccc; }
        .thumb-item img { width:100%; height:100%; object-fit:cover; }

        /* 메인 이미지 */
        .main-img-col { padding:24px 20px; position:sticky; top:80px; height:fit-content; }
        .main-img-wrap { position:relative; aspect-ratio:3/4; overflow:hidden; background:#f5f5f5; cursor:zoom-in; }
        .main-img-wrap img { width:100%; height:100%; object-fit:cover; transition:transform 0.4s; }
        .main-img-wrap:hover img { transform:scale(1.04); }
        .img-badges { position:absolute; top:14px; left:14px; display:flex; flex-direction:column; gap:5px; z-index:2; }
        .img-badge { font-size:10px; font-weight:700; padding:4px 9px; letter-spacing:.5px; }
        .badge-fit { background:#C94E1A; color:#fff; }
        .badge-new { background:#111; color:#fff; }
        .wish-btn { position:absolute; top:14px; right:14px; width:36px; height:36px; border-radius:50%; background:rgba(255,255,255,0.9); border:none; cursor:pointer; font-size:16px; display:flex; align-items:center; justify-content:center; z-index:2; box-shadow:0 2px 8px rgba(0,0,0,.08); transition:all .15s; }
        .wish-btn:hover { background:#fff; transform:scale(1.1); }

        /* 상품 정보 */
        .info-col { padding:24px 24px 40px; border-left:1px solid #f0f0f0; }
        .info-brand { font-size:11px; letter-spacing:3px; color:#999; font-weight:500; margin-bottom:8px; cursor:pointer; }
        .info-brand:hover { color:#111; }
        .info-name { font-size:20px; font-weight:400; color:#111; line-height:1.35; margin-bottom:4px; }
        .info-name-en { font-family:Georgia,serif; font-size:13px; color:#bbb; font-style:italic; margin-bottom:20px; }

        /* 가격 */
        .price-block { padding:18px 0; border-top:1px solid #f0f0f0; border-bottom:1px solid #f0f0f0; margin-bottom:20px; }
        .price-row { display:flex; align-items:center; gap:10px; margin-bottom:6px; }
        .price-original { font-size:13px; color:#ccc; text-decoration:line-through; }
        .price-dc { font-size:14px; font-weight:700; color:#e74c3c; }
        .price-main { font-size:24px; font-weight:500; color:#111; }
        .price-sub { display:flex; align-items:center; gap:16px; }
        .withy-tag { display:flex; align-items:center; gap:4px; font-size:12px; color:#B08D57; }
        .delivery-tag { font-size:11px; color:#666; display:flex; align-items:center; gap:3px; }

        /* 피팅박스 배너 */
        .fit-banner { background:#fff8f5; border:1px solid rgba(201,78,26,.15); padding:12px 14px; margin-bottom:20px; display:flex; align-items:center; gap:10px; }
        .fit-banner-icon { font-size:18px; flex-shrink:0; }
        .fit-banner-text { font-size:12px; color:#333; line-height:1.6; }
        .fit-banner-text strong { color:#C94E1A; }
        .fit-match { margin-left:auto; font-family:Georgia,serif; font-size:22px; color:#C94E1A; font-weight:300; flex-shrink:0; }

        /* 옵션 */
        .opt-block { margin-bottom:18px; }
        .opt-label { font-size:12px; font-weight:500; color:#333; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center; }
        .opt-label a { font-size:11px; font-weight:400; color:#999; cursor:pointer; text-decoration:underline; }
        .opt-label a:hover { color:#111; }
        .color-opts { display:flex; gap:8px; }
        .color-sw { width:28px; height:28px; border-radius:50%; cursor:pointer; border:2px solid transparent; transition:all .2s; position:relative; }
        .color-sw.on { box-shadow:0 0 0 2px #fff, 0 0 0 3.5px #111; }
        .color-name { font-size:11px; color:#666; margin-top:4px; text-align:center; }
        .size-opts { display:flex; gap:6px; flex-wrap:wrap; }
        .size-btn { min-width:52px; height:44px; padding:0 10px; border:1px solid #e8e8e8; font-size:12px; color:#666; cursor:pointer; background:#fff; transition:all .15s; }
        .size-btn:hover { border-color:#111; color:#111; }
        .size-btn.on { background:#111; border-color:#111; color:#fff; }
        .size-btn.sold { background:#f9f9f9; color:#ccc; text-decoration:line-through; cursor:not-allowed; border-color:#f0f0f0; }

        /* 수량 */
        .qty-block { display:flex; align-items:center; gap:0; width:110px; border:1px solid #e8e8e8; margin-bottom:20px; }
        .qty-btn { width:36px; height:36px; display:flex; align-items:center; justify-content:center; font-size:18px; color:#666; cursor:pointer; border:none; background:none; transition:background .15s; }
        .qty-btn:hover { background:#f9f9f9; }
        .qty-num { flex:1; text-align:center; font-size:14px; font-weight:500; }

        /* 총 금액 */
        .total-row { display:flex; justify-content:space-between; align-items:center; padding:14px 0; border-top:1px solid #f0f0f0; margin-bottom:16px; }
        .total-label { font-size:13px; color:#666; }
        .total-price { font-size:20px; font-weight:600; color:#111; }
        .total-withy { font-size:11px; color:#B08D57; }

        /* CTA 버튼 */
        .cta-wrap { display:flex; flex-direction:column; gap:8px; }
        .btn-fit { padding:15px; background:#C94E1A; color:#fff; font-size:14px; font-weight:500; border:none; cursor:pointer; width:100%; text-align:center; display:flex; align-items:center; justify-content:center; gap:8px; transition:background .2s; letter-spacing:.3px; }
        .btn-fit:hover { background:#a83d14; }
        .btn-fit-sub { font-size:11px; opacity:.75; font-weight:300; }
        .btn-buy { padding:15px; background:#111; color:#fff; font-size:14px; font-weight:500; border:none; cursor:pointer; width:100%; text-align:center; transition:background .2s; letter-spacing:.3px; }
        .btn-buy:hover { background:#333; }
        .btn-cart { padding:13px; border:1px solid #e8e8e8; color:#333; font-size:13px; font-weight:400; cursor:pointer; background:#fff; width:100%; text-align:center; transition:all .2s; display:flex; align-items:center; justify-content:center; gap:6px; }
        .btn-cart:hover { border-color:#111; color:#111; }

        /* 혜택 행 */
        .benefit-row { display:grid; grid-template-columns:repeat(4,1fr); gap:0; border:1px solid #f0f0f0; margin-top:20px; }
        .benefit-item { padding:14px 8px; text-align:center; border-right:1px solid #f0f0f0; }
        .benefit-item:last-child { border-right:none; }
        .bi-icon { font-size:18px; margin-bottom:5px; }
        .bi-label { font-size:10px; color:#666; line-height:1.5; }
        .bi-label strong { color:#111; display:block; font-weight:500; margin-bottom:1px; }

        /* 공유 */
        .share-row { display:flex; align-items:center; gap:8px; margin-top:16px; padding-top:16px; border-top:1px solid #f0f0f0; }
        .share-label { font-size:11px; color:#999; }
        .share-btn { width:30px; height:30px; border:1px solid #e8e8e8; background:#fff; display:flex; align-items:center; justify-content:center; font-size:13px; cursor:pointer; transition:border-color .15s; }
        .share-btn:hover { border-color:#111; }

        /* 하단 탭 */
        .tab-section { max-width:1200px; margin:0 auto; padding:0 40px 80px; }
        .tab-bar { display:flex; border-bottom:1px solid #e8e8e8; position:sticky; top:80px; background:#fff; z-index:100; }
        .tab-btn { padding:16px 24px; font-size:13px; font-weight:400; color:#999; background:none; border:none; border-bottom:2px solid transparent; cursor:pointer; transition:all .15s; }
        .tab-btn.on { color:#111; border-bottom-color:#111; font-weight:500; }

        /* 상세 이미지 */
        .detail-imgs { display:flex; flex-direction:column; gap:0; margin:32px 0; }
        .detail-img { width:100%; max-width:720px; margin:0 auto; display:flex; align-items:center; justify-content:center; font-size:100px; aspect-ratio:4/3; }
        .detail-img:nth-child(odd) { background:#f5f5f5; }
        .detail-img:nth-child(even) { background:#eee; }

        /* 스펙 테이블 */
        .spec-table { width:100%; max-width:600px; border-collapse:collapse; margin:24px 0; }
        .spec-table tr { border-bottom:1px solid #f0f0f0; }
        .spec-table td { padding:12px 0; font-size:13px; vertical-align:top; }
        .spec-table td:first-child { width:130px; color:#999; font-weight:300; }

        /* 리뷰 */
        .review-summary { display:grid; grid-template-columns:160px 1fr; gap:32px; padding:28px 0; border-bottom:1px solid #e8e8e8; margin-bottom:24px; }
        .rs-score { text-align:center; }
        .rs-num { font-family:Georgia,serif; font-size:56px; font-weight:300; color:#111; line-height:1; }
        .rs-stars { font-size:16px; color:#B08D57; margin:6px 0; }
        .rs-count { font-size:11px; color:#999; }
        .rb-row { display:flex; align-items:center; gap:10px; font-size:12px; margin-bottom:8px; }
        .rb-bar { flex:1; height:5px; background:#f0f0f0; border-radius:3px; overflow:hidden; }
        .rb-fill { height:100%; background:#B08D57; border-radius:3px; }
        .review-item { padding:24px 0; border-bottom:1px solid #f5f5f5; }
        .ri-header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px; }
        .ri-user { display:flex; align-items:center; gap:10px; }
        .ri-avatar { width:30px; height:30px; border-radius:50%; background:#f0f0f0; display:flex; align-items:center; justify-content:center; font-size:12px; }
        .ri-name { font-size:13px; font-weight:500; }
        .ri-date { font-size:11px; color:#999; margin-top:1px; }
        .ri-stars { font-size:12px; color:#B08D57; }
        .ri-tags { display:flex; gap:6px; margin:8px 0; }
        .ri-tag { font-size:10px; padding:3px 8px; background:#f5f5f5; color:#666; border-radius:20px; }
        .ri-text { font-size:13px; color:#333; line-height:1.8; font-weight:300; }
        .ri-fit-badge { display:inline-flex; align-items:center; gap:4px; font-size:10px; color:#C94E1A; background:#fff8f5; padding:3px 8px; border-radius:20px; margin-top:8px; }

        /* 연관 상품 */
        .related-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:24px 16px; margin-top:24px; }
        .related-card { cursor:pointer; }
        .related-img { aspect-ratio:3/4; background:#f5f5f5; overflow:hidden; margin-bottom:10px; }
        .related-img img { width:100%; height:100%; object-fit:cover; transition:transform .4s; }
        .related-card:hover .related-img img { transform:scale(1.04); }

        /* 모달 */
        .modal-bg { position:fixed; inset:0; background:rgba(0,0,0,.5); z-index:1000; display:flex; align-items:flex-end; justify-content:flex-end; backdrop-filter:blur(3px); }
        .modal-panel { width:min(460px,100vw); height:100dvh; background:#fff; display:flex; flex-direction:column; overflow:hidden; }
        .mp-header { padding:20px 24px; border-bottom:1px solid #e8e8e8; display:flex; justify-content:space-between; align-items:center; flex-shrink:0; }
        .mp-title { font-size:16px; font-weight:500; }
        .mp-close { width:28px; height:28px; border:1px solid #e8e8e8; background:none; cursor:pointer; font-size:14px; color:#666; display:flex; align-items:center; justify-content:center; }
        .mp-close:hover { background:#111; color:#fff; border-color:#111; }
        .mp-prog { height:3px; background:#e8e8e8; flex-shrink:0; }
        .mp-prog-fill { height:100%; background:#C94E1A; transition:width .3s; }
        .mp-body { flex:1; overflow-y:auto; padding:24px; }
        .mp-footer { padding:14px 24px; border-top:1px solid #e8e8e8; display:flex; justify-content:space-between; align-items:center; flex-shrink:0; }
        .mp-back { font-size:12px; color:#999; background:none; border:none; cursor:pointer; }
        .mp-next { padding:12px 28px; background:#C94E1A; color:#fff; font-size:13px; font-weight:500; border:none; cursor:pointer; }
        .mp-next:hover { background:#111; }
        .mp-next.green { background:#2a7a50; }
        .form-row-2 { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
        .form-input { width:100%; padding:11px 13px; border:1px solid #e8e8e8; font-size:13px; outline:none; font-family:inherit; margin-bottom:8px; }
        .form-input:focus { border-color:#111; }
        .confirm-row { display:flex; justify-content:space-between; padding:12px 0; border-bottom:1px solid #f0f0f0; font-size:13px; }
        .c-label { color:#999; font-weight:300; }
        .c-total .c-label { font-weight:500; color:#111; font-size:14px; }
        .c-total .c-val { color:#C94E1A; font-size:17px; font-weight:600; }
        .withy-row { display:flex; justify-content:space-between; align-items:center; padding:13px; background:#f9f7f4; margin:14px 0; }
        .toggle { width:38px; height:22px; border-radius:11px; background:#ddd; position:relative; cursor:pointer; border:none; transition:background .2s; }
        .toggle.on { background:#C94E1A; }
        .toggle::after { content:''; width:18px; height:18px; border-radius:50%; background:#fff; position:absolute; top:2px; left:2px; transition:left .2s; box-shadow:0 1px 3px rgba(0,0,0,.2); }
        .toggle.on::after { left:18px; }
        .success-panel { text-align:center; padding:16px 0; }
        .sc-icon { width:60px; height:60px; border-radius:50%; background:#2a7a50; display:flex; align-items:center; justify-content:center; font-size:22px; margin:0 auto 16px; color:#fff; }
        .timeline-item { display:flex; gap:12px; padding:11px 0; border-bottom:1px solid #f0f0f0; text-align:left; }
        .tl-dot { width:8px; height:8px; border-radius:50%; background:#C94E1A; flex-shrink:0; margin-top:4px; }
        .tl-dot.g { background:#e8e8e8; }

        /* 사이즈 가이드 모달 */
        .sg-bg { position:fixed; inset:0; background:rgba(0,0,0,.5); z-index:1100; display:flex; align-items:center; justify-content:center; }
        .sg-modal { background:#fff; width:min(520px,92vw); max-height:85vh; overflow-y:auto; }
        .sg-header { padding:18px 24px; border-bottom:1px solid #e8e8e8; display:flex; justify-content:space-between; align-items:center; }
        .sg-table { width:100%; border-collapse:collapse; font-size:12px; margin-top:16px; }
        .sg-table th { background:#f9f9f9; padding:10px; text-align:center; font-weight:500; color:#666; border:1px solid #e8e8e8; }
        .sg-table td { padding:10px; text-align:center; border:1px solid #e8e8e8; color:#333; font-weight:300; }

        /* 스티키 하단 (모바일) */
        .sticky-bottom { display:none; position:fixed; bottom:0; left:0; right:0; z-index:400; background:#fff; border-top:1px solid #e8e8e8; padding:10px 16px; gap:8px; }

        /* 토스트 */
        .toast-wrap { position:fixed; bottom:24px; left:50%; transform:translateX(-50%) translateY(60px); background:#111; color:#fff; padding:12px 20px; font-size:13px; z-index:2000; transition:transform .3s; white-space:nowrap; pointer-events:none; }
        .toast-wrap.show { transform:translateX(-50%) translateY(0); }

        /* ───── 모바일 ───── */
        @media (max-width:768px) {
          .breadcrumb { padding:12px 16px; }
          .product-wrap { grid-template-columns:1fr; }
          .thumb-col { display:none; }
          .main-img-col { padding:0; position:relative; top:0; }
          .main-img-wrap { aspect-ratio:1/1; }
          .info-col { padding:20px 16px 32px; border-left:none; border-top:1px solid #f0f0f0; }
          .info-name { font-size:17px; }
          .price-main { font-size:20px; }
          .benefit-row { display:grid; grid-template-columns:repeat(2,1fr); }
          .benefit-item:nth-child(2) { border-right:none; }
          .benefit-item:nth-child(3) { border-top:1px solid #f0f0f0; }
          .benefit-item:nth-child(4) { border-top:1px solid #f0f0f0; border-right:none; }
          .tab-bar { overflow-x:auto; top:0; }
          .tab-btn { padding:14px 16px; white-space:nowrap; font-size:12px; }
          .tab-section { padding:0 0 100px; }
          .tab-section .tab-bar { padding:0 16px; }
          .detail-content-pad { padding:0 16px; }
          .review-summary { grid-template-columns:120px 1fr; gap:20px; }
          .rs-num { font-size:44px; }
          .related-grid { grid-template-columns:repeat(2,1fr); padding:0 16px; }
          .cta-wrap { display:none; }
          .sticky-bottom { display:flex; }
          .fit-banner { display:none; }
          .fit-match { display:none; }
          .share-row { display:none; }
        }
        @media (min-width:769px) {
          .detail-content-pad { padding:0; }
        }
      `}</style>

      <Navbar />

      {/* 브레드크럼 */}
      <div className="breadcrumb">
        <a href="/">홈</a><span style={{color:'#ddd'}}>›</span>
        <a href="/">아우터</a><span style={{color:'#ddd'}}>›</span>
        <a href="/">코트</a><span style={{color:'#ddd'}}>›</span>
        <span style={{color:'#333'}}>{product.name}</span>
      </div>

      {/* 상품 메인 영역 */}
      <div className="product-wrap">

        {/* 썸네일 컬럼 */}
        <div className="thumb-col">
          {product.images.map((img, i) => (
            <div key={i} className={`thumb-item ${mainImg===i?'on':''}`} onClick={() => setMainImg(i)}>
              <img src={img} alt={`상품 이미지 ${i+1}`}/>
            </div>
          ))}
        </div>

        {/* 메인 이미지 */}
        <div className="main-img-col">
          <div className="main-img-wrap">
            <img src={product.images[mainImg]} alt={product.name}/>
            <div className="img-badges">
              {product.isFittable && <span className="img-badge badge-fit">피팅박스 가능</span>}
              <span className="img-badge badge-new">F/W NEW</span>
            </div>
            <button className="wish-btn" onClick={() => { setWished(!wished); showToast(wished?'찜 목록에서 제거됐어요':'찜 목록에 추가됐어요') }}>
              {wished ? '❤️' : '🤍'}
            </button>
          </div>
          {/* 모바일 썸네일 */}
          <div style={{display:'flex',gap:'6px',padding:'8px 0 0',overflowX:'auto',scrollbarWidth:'none'}}>
            {product.images.map((img, i) => (
              <div key={i} onClick={() => setMainImg(i)}
                style={{width:'52px',height:'64px',flexShrink:0,cursor:'pointer',border:`1.5px solid ${mainImg===i?'#111':'transparent'}`,overflow:'hidden'}}>
                <img src={img} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
              </div>
            ))}
          </div>
        </div>

        {/* 상품 정보 */}
        <div className="info-col">
          <div className="info-brand">{product.brand}</div>
          <div className="info-name">{product.name}</div>
          <div className="info-name-en">{product.nameEn}</div>

          {/* 가격 */}
          <div className="price-block">
            <div className="price-row">
              <span className="price-original">{product.original.toLocaleString()}원</span>
              <span className="price-dc">{dc}%</span>
              <span className="price-main">{product.price.toLocaleString()}원</span>
            </div>
            <div className="price-sub">
              <div className="withy-tag">
                <span style={{fontWeight:700}}>W</span> {product.points}P 적립
              </div>
              <div className="delivery-tag">🚚 무료배송</div>
            </div>
          </div>

          {/* 피팅박스 배너 */}
          <div className="fit-banner">
            <div className="fit-banner-icon">📦</div>
            <div className="fit-banner-text">
              <strong>피팅박스 서비스 가능</strong><br/>
              집에서 먼저 입어보고 마음에 드는 것만 구매하세요. 피팅 비용 0원 · 반납 무료
            </div>
            <div className="fit-match">94%</div>
          </div>

          {/* 컬러 */}
          <div className="opt-block">
            <div className="opt-label">
              컬러 <span style={{color:'#111',fontWeight:500}}>{selectedColor.name}</span>
            </div>
            <div className="color-opts">
              {product.colors.map(c => (
                <div key={c.name}>
                  <div className={`color-sw ${selectedColor.name===c.name?'on':''}`}
                    style={{background:c.hex}}
                    onClick={() => setSelectedColor(c)}/>
                  {selectedColor.name===c.name && <div className="color-name">{c.name}</div>}
                </div>
              ))}
            </div>
          </div>

          {/* 사이즈 */}
          <div className="opt-block">
            <div className="opt-label">
              사이즈
              <a onClick={() => setSizeGuideOpen(true)}>사이즈 가이드</a>
            </div>
            <div className="size-opts">
              {product.sizes.map(sz => (
                <button key={sz} className={`size-btn ${selectedSize===sz?'on':''}`}
                  onClick={() => setSelectedSize(sz)}>{sz}</button>
              ))}
              {product.soldout.map(sz => (
                <button key={sz} className="size-btn sold" disabled>{sz}</button>
              ))}
            </div>
            {!selectedSize && <div style={{fontSize:'11px',color:'#999',marginTop:'8px'}}>사이즈를 선택해주세요</div>}
          </div>

          {/* 수량 */}
          <div className="opt-block">
            <div className="opt-label">수량</div>
            <div className="qty-block">
              <button className="qty-btn" onClick={() => setQty(Math.max(1,qty-1))}>−</button>
              <div className="qty-num">{qty}</div>
              <button className="qty-btn" onClick={() => setQty(qty+1)}>+</button>
            </div>
          </div>

          {/* 총 금액 */}
          <div className="total-row">
            <div>
              <div className="total-label">총 결제 예정금액</div>
              <div className="total-withy">구매 확정 시 W {(product.points*qty).toLocaleString()}P 적립</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div className="total-price">{(product.price*qty).toLocaleString()}원</div>
              <div style={{fontSize:'11px',color:'#999'}}>수량 {qty}개</div>
            </div>
          </div>

          {/* CTA */}
          <div className="cta-wrap">
            <button className="btn-fit" onClick={openFit}>
              <span>📦 피팅박스 신청하기</span>
              <span className="btn-fit-sub">— 입어보고 결정하세요. 피팅 무료</span>
            </button>
            <button className="btn-buy" onClick={openBuy}>바로 구매하기</button>
            <button className="btn-cart" onClick={addCart}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              장바구니 담기
            </button>
          </div>

          {/* 혜택 */}
          <div className="benefit-row">
            {[
              {icon:'📦',title:'피팅박스',desc:'집에서 먼저\n입어보세요'},
              {icon:'🚚',title:'무료배송',desc:'5만원 이상\n무료 배송'},
              {icon:'↩️',title:'무료반품',desc:'7일 이내\n무료 반품'},
              {icon:'💛',title:'위디 적립',desc:`${product.points}P\n자동 적립`},
            ].map((b,i) => (
              <div key={i} className="benefit-item">
                <div className="bi-icon">{b.icon}</div>
                <div className="bi-label"><strong>{b.title}</strong>{b.desc}</div>
              </div>
            ))}
          </div>

          {/* 공유 */}
          <div className="share-row">
            <span className="share-label">공유하기</span>
            <button className="share-btn" onClick={() => showToast('카카오톡으로 공유됐어요')}>💬</button>
            <button className="share-btn" onClick={() => showToast('링크가 복사됐어요')}>🔗</button>
            <button className="share-btn" onClick={() => showToast('인스타그램으로 공유됐어요')}>📷</button>
          </div>
        </div>
      </div>

      {/* 하단 탭 */}
      <div className="tab-section">
        <div className="tab-bar">
          {[
            {id:'detail',label:'상품 정보'},
            {id:'size',label:'사이즈'},
            {id:'fit',label:'피팅박스 안내'},
            {id:'review',label:`리뷰 (${product.reviewCount})`},
            {id:'qna',label:'Q&A'},
            {id:'ship',label:'배송/반품'},
          ].map(tab => (
            <button key={tab.id} className={`tab-btn ${activeTab===tab.id?'on':''}`}
              onClick={() => setActiveTab(tab.id)}>{tab.label}</button>
          ))}
        </div>

        {/* 상품 정보 */}
        {activeTab === 'detail' && (
          <div className="detail-content-pad">
            <div className="detail-imgs">
              <div className="detail-img">🧥</div>
              <div className="detail-img" style={{background:'#eee'}}>📐</div>
              <div className="detail-img">🪡</div>
            </div>
            <div style={{maxWidth:'600px',margin:'0 auto',padding:'0 0 40px'}}>
              <div style={{fontSize:'10px',letterSpacing:'3px',color:'#C94E1A',fontWeight:600,marginBottom:'10px'}}>MATERIAL</div>
              <table className="spec-table">
                <tbody>
                  {[
                    ['소재','캐시미어 30% 울 50% 폴리에스터 20%'],
                    ['색상','아이보리, 베이지, 블랙'],
                    ['제조국','대한민국'],
                    ['세탁법','드라이클리닝 권장 / 손세탁 가능'],
                    ['안감','폴리에스터 100%'],
                    ['두께','두꺼움 (겨울용)'],
                    ['비침','없음'],
                    ['신축성','없음'],
                  ].map(([k,v]) => (
                    <tr key={k}><td>{k}</td><td>{v}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 사이즈 */}
        {activeTab === 'size' && (
          <div className="detail-content-pad" style={{padding:'32px 0'}}>
            <div style={{maxWidth:'600px',margin:'0 auto'}}>
              <div style={{fontSize:'10px',letterSpacing:'3px',color:'#C94E1A',fontWeight:600,marginBottom:'16px'}}>SIZE GUIDE</div>
              <table className="sg-table" style={{margin:'0 0 16px'}}>
                <thead>
                  <tr><th>사이즈</th><th>총장</th><th>어깨</th><th>가슴</th><th>소매</th></tr>
                </thead>
                <tbody>
                  {[['XS','100cm','41cm','100cm','59cm'],['S','103cm','43cm','104cm','60cm'],['M','106cm','45cm','108cm','61cm'],['L','109cm','47cm','112cm','62cm']].map(row => (
                    <tr key={row[0]}><td>{row[0]}</td><td>{row[1]}</td><td>{row[2]}</td><td>{row[3]}</td><td>{row[4]}</td></tr>
                  ))}
                </tbody>
              </table>
              <div style={{background:'#fff8f5',borderLeft:'3px solid #C94E1A',padding:'13px 15px',fontSize:'12px',color:'#333',lineHeight:1.7}}>
                💡 모델(167cm, 49kg)은 S 사이즈 착용. 사이즈 고민이라면 <strong>피팅박스로 2가지 사이즈를 동시에</strong> 신청해보세요.
              </div>
            </div>
          </div>
        )}

        {/* 피팅박스 안내 */}
        {activeTab === 'fit' && (
          <div className="detail-content-pad">
            <div style={{background:'#1a1814',padding:'32px',margin:'32px 0'}}>
              <div style={{fontFamily:'Georgia,serif',fontSize:'22px',color:'#fff',marginBottom:'24px',fontWeight:300}}>
                📦 피팅박스 <span style={{fontStyle:'italic',color:'#C94E1A'}}>서비스 안내</span>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:'0',position:'relative'}}>
                {[{icon:'📦',title:'신청',desc:'제품·사이즈 선택 후 배송지 입력'},{icon:'🧺',title:'검수·발송',desc:'청정기 케어 후 24H 이내 발송'},{icon:'🏠',title:'집 피팅',desc:'3일간 여유롭게 입어보기'},{icon:'✨',title:'구매·반납',desc:'원하는 것만 구매, 나머지 무료 반납'},{icon:'💛',title:'위디 적립',desc:'구매 확정 시 포인트 자동 적립'}].map((s,i) => (
                  <div key={i} style={{textAlign:'center',padding:'0 12px',borderRight:i<4?'1px solid rgba(255,255,255,0.08)':'none'}}>
                    <div style={{fontSize:'24px',marginBottom:'8px'}}>{s.icon}</div>
                    <div style={{fontSize:'12px',fontWeight:500,color:'#fff',marginBottom:'4px'}}>{s.title}</div>
                    <div style={{fontSize:'10px',color:'rgba(255,255,255,0.45)',lineHeight:1.6,fontWeight:300}}>{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{maxWidth:'600px',margin:'0 auto 40px'}}>
              <table className="spec-table">
                <tbody>
                  {[['피팅 비용','무료'],['피팅 기간','수령일 포함 3일'],['반납 비용','무료'],['반납 방법','앱에서 신청 → 익일 방문 수거'],['복수 신청','최대 2가지 사이즈 동시 신청 가능'],['구매 확정','구매 확정 시에만 결제']].map(([k,v]) => (
                    <tr key={k}><td>{k}</td><td style={{color: k==='피팅 비용'||k==='반납 비용'?'#2a7a50':'#333'}}>{v}</td></tr>
                  ))}
                </tbody>
              </table>
              <button className="btn-fit" style={{marginTop:'20px'}} onClick={openFit}>📦 피팅박스 신청하기</button>
            </div>
          </div>
        )}

        {/* 리뷰 */}
        {activeTab === 'review' && (
          <div className="detail-content-pad" style={{padding:'32px 0'}}>
            <div className="review-summary">
              <div className="rs-score">
                <div className="rs-num">{product.rating}</div>
                <div className="rs-stars">★★★★★</div>
                <div className="rs-count">{product.reviewCount}개 리뷰</div>
              </div>
              <div style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
                {[[5,82],[4,12],[3,4],[2,1],[1,1]].map(([star,pct]) => (
                  <div key={star} className="rb-row">
                    <span style={{width:'24px',color:'#666',textAlign:'right',fontSize:'12px'}}>{star}점</span>
                    <div className="rb-bar"><div className="rb-fill" style={{width:pct+'%'}}/></div>
                    <span style={{width:'28px',color:'#ccc',fontSize:'11px'}}>{pct}</span>
                  </div>
                ))}
              </div>
            </div>

            {[
              {avatar:'👩',name:'김지연**',date:'2026.04.20 · S / 아이보리',stars:'★★★★★',tags:['피팅박스 후 구매','사이즈 딱 맞아요','소재 좋아요'],text:'피팅박스로 S, M 두 사이즈 신청했어요. 입어보니 S가 딱이었고 M은 반납했어요. 소재가 생각보다 훨씬 고급스럽고 두께도 적당해요. 위디 포인트 쌓인 것도 좋았습니다.',fit:true},
              {avatar:'👩‍💼',name:'박소**',date:'2026.04.15 · M / 블랙',stars:'★★★★★',tags:['피팅박스 후 구매','핏 좋아요'],text:'마르시아 브랜드 처음이었는데 피팅박스 덕에 부담없이 시도해봤어요. 블랙으로 골랐는데 출근룩으로 너무 잘 어울려요.',fit:true},
              {avatar:'🧑‍🦱',name:'이민**',date:'2026.04.08 · S / 베이지',stars:'★★★★☆',tags:['소재 좋아요','배송 빨라요'],text:'소재가 정말 부드럽고 고급스러워요. 포켓이 없어서 별 4개지만 코트 자체는 정말 만족해요.',fit:false},
            ].map((r,i) => (
              <div key={i} className="review-item">
                <div className="ri-header">
                  <div className="ri-user">
                    <div className="ri-avatar">{r.avatar}</div>
                    <div>
                      <div className="ri-name">{r.name}</div>
                      <div className="ri-date">{r.date}</div>
                    </div>
                  </div>
                  <div className="ri-stars">{r.stars}</div>
                </div>
                <div className="ri-tags">{r.tags.map(t => <span key={t} className="ri-tag">{t}</span>)}</div>
                <div className="ri-text">{r.text}</div>
                {r.fit && <div className="ri-fit-badge">📦 피팅박스로 직접 확인 후 구매</div>}
              </div>
            ))}
          </div>
        )}

        {/* Q&A */}
        {activeTab === 'qna' && (
          <div className="detail-content-pad" style={{padding:'24px 0'}}>
            <div style={{padding:'16px',border:'1px solid #e8e8e8',display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
              <span style={{fontSize:'13px',color:'#666'}}>상품에 대해 궁금한 점을 문의해주세요.</span>
              <button style={{padding:'9px 18px',border:'1px solid #111',fontSize:'12px',cursor:'pointer',background:'#fff'}} onClick={() => showToast('로그인 후 문의 작성이 가능해요')}>문의 작성하기</button>
            </div>
            {[
              {q:'피팅박스로 S, M 두 사이즈 동시에 신청할 수 있나요?', a:'네, 피팅박스 신청 시 최대 2가지 사이즈를 동시에 신청 가능해요! 3일 이내 피팅 후 마음에 드는 사이즈만 구매 확정하시면 됩니다.'},
              {q:'피팅 중 옷에 오염이 생겼어요. 어떻게 해야 하나요?', a:'일반 착용 범위 내 하자는 면책이에요. 세탁으로 복원 불가능한 수준의 오염은 약관에 따라 처리됩니다. 앱 내 CS 채널로 먼저 문의해주세요.'},
            ].map((faq,i) => (
              <div key={i} style={{padding:'18px 0',borderBottom:'1px solid #f0f0f0'}}>
                <div style={{display:'flex',gap:'8px',marginBottom:'10px'}}>
                  <span style={{fontSize:'12px',fontWeight:700,color:'#666',flexShrink:0}}>Q.</span>
                  <span style={{fontSize:'13px',color:'#111',lineHeight:1.7}}>{faq.q}</span>
                </div>
                <div style={{display:'flex',gap:'8px',padding:'12px',background:'#f9f7f4'}}>
                  <span style={{fontSize:'12px',fontWeight:700,color:'#C94E1A',flexShrink:0}}>A.</span>
                  <span style={{fontSize:'12px',color:'#666',fontWeight:300,lineHeight:1.7}}>{faq.a}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 배송/반품 */}
        {activeTab === 'ship' && (
          <div className="detail-content-pad" style={{padding:'24px 0'}}>
            <table style={{width:'100%',borderCollapse:'collapse',fontSize:'13px'}}>
              <thead>
                <tr style={{background:'#f9f9f9'}}>
                  <th style={{padding:'12px 16px',textAlign:'left',fontWeight:500,color:'#666',borderBottom:'1px solid #e8e8e8',width:'120px'}}>구분</th>
                  <th style={{padding:'12px 16px',textAlign:'left',fontWeight:500,color:'#666',borderBottom:'1px solid #e8e8e8'}}>내용</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['일반 배송','무료 (5만원 이상) / 3,000원 (미만) · 결제 완료 후 2~3 영업일'],
                  ['피팅박스 배송','무료 — 신청 후 24시간 이내 발송'],
                  ['교환/반품','수령일 포함 7일 이내'],
                  ['피팅박스 반납','무료 — 앱에서 신청 → 익일 방문 수거'],
                  ['반품 비용','단순 변심: 왕복 6,000원 / 상품 하자: 무료'],
                ].map(([k,v]) => (
                  <tr key={k} style={{borderBottom:'1px solid #f0f0f0'}}>
                    <td style={{padding:'13px 16px',color:'#999',fontWeight:300,verticalAlign:'top'}}>{k}</td>
                    <td style={{padding:'13px 16px',color:'#333',lineHeight:1.7}}>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{background:'#fff8f5',borderLeft:'3px solid #C94E1A',padding:'14px 16px',marginTop:'16px',fontSize:'12px',color:'#333',lineHeight:1.8}}>
              <strong>피팅박스 이용 시 유의사항</strong><br/>
              • 피팅 기간(3일) 초과 시 자동 구매 확정 처리됩니다.<br/>
              • 반납 제품은 CLYQ 검수 후 이상 없을 시 비용 없음.
            </div>
          </div>
        )}

        {/* 연관 상품 */}
        <div style={{marginTop:'48px',padding:'0',borderTop:'1px solid #f0f0f0'}}>
          <div style={{padding:'28px 0 16px'}}>
            <div style={{fontSize:'10px',letterSpacing:'3px',color:'#999',marginBottom:'8px'}}>YOU MAY ALSO LIKE</div>
            <div style={{fontSize:'18px',fontWeight:500}}>함께 보면 좋은 제품</div>
          </div>
          <div className="related-grid">
            {relatedProducts.map(p => {
              const dc2 = p.original > p.price ? Math.round((1-p.price/p.original)*100) : 0
              return (
                <a key={p.id} href={'/products/'+p.id} style={{textDecoration:'none',color:'inherit'}}>
                  <div className="related-card">
                    <div className="related-img">
                      <img src={p.image} alt={p.name}/>
                    </div>
                    <div style={{fontSize:'10px',letterSpacing:'1.5px',color:'#999',marginBottom:'4px'}}>{p.brand}</div>
                    <div style={{fontSize:'13px',color:'#333',marginBottom:'6px',fontWeight:300,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{p.name}</div>
                    <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
                      <span style={{fontSize:'14px',fontWeight:500}}>{p.price.toLocaleString()}원</span>
                      {dc2 > 0 && <>
                        <span style={{fontSize:'11px',color:'#ccc',textDecoration:'line-through'}}>{p.original.toLocaleString()}원</span>
                        <span style={{fontSize:'11px',fontWeight:600,color:'#e74c3c'}}>{dc2}%</span>
                      </>}
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </div>

      {/* 모바일 스티키 하단 */}
      <div className="sticky-bottom">
        <button className="btn-fit" style={{flex:1.2}} onClick={openFit}>📦 피팅박스 신청</button>
        <button className="btn-buy" style={{flex:1}} onClick={openBuy}>바로 구매</button>
      </div>

      {/* 피팅박스 모달 */}
      {fitModalOpen && (
        <div className="modal-bg" onClick={closeFit}>
          <div className="modal-panel" onClick={e => e.stopPropagation()}>
            <div className="mp-header">
              <div>
                <div className="mp-title">피팅박스 신청</div>
                {!fitDone && <div style={{fontSize:'11px',color:'#999',marginTop:'2px'}}>STEP {fitStep} / 3</div>}
              </div>
              <button className="mp-close" onClick={closeFit}>✕</button>
            </div>
            {!fitDone && (
              <div className="mp-prog">
                <div className="mp-prog-fill" style={{width:fitStep===1?'33%':fitStep===2?'66%':'100%'}}/>
              </div>
            )}
            <div className="mp-body">
              {fitDone ? (
                <div className="success-panel">
                  <div className="sc-icon">✓</div>
                  <div style={{fontSize:'20px',fontWeight:500,marginBottom:'8px'}}>피팅박스 신청 완료!</div>
                  <div style={{fontSize:'13px',color:'#666',fontWeight:300,lineHeight:1.8,marginBottom:'24px'}}>피팅박스가 곧 출발해요 📦<br/>카카오 알림톡으로 배송 현황을 알려드려요.</div>
                  {[{dot:true,title:'신청 완료',time:'방금 전 · 위디 50P 적립'},{dot:false,title:'검수 & 패킹',time:'오늘 중'},{dot:false,title:'배송 출발',time:'내일 오전'},{dot:false,title:'수령 & 피팅 시작',time:'내일 오후~저녁'}].map((item,i) => (
                    <div key={i} className="timeline-item">
                      <div className={`tl-dot ${item.dot?'':'g'}`}/>
                      <div>
                        <div style={{fontSize:'13px',fontWeight:500,marginBottom:'2px'}}>{item.title}</div>
                        <div style={{fontSize:'11px',color:'#999'}}>{item.time}</div>
                      </div>
                    </div>
                  ))}
                  <button style={{marginTop:'20px',width:'100%',padding:'14px',background:'#111',color:'#fff',border:'none',fontSize:'13px',fontWeight:500,cursor:'pointer'}} onClick={closeFit}>확인</button>
                </div>
              ) : fitStep === 1 ? (
                <div>
                  <div style={{display:'flex',gap:'14px',padding:'14px',background:'#f9f7f4',marginBottom:'20px'}}>
                    <img src={product.images[0]} alt={product.name} style={{width:'64px',height:'80px',objectFit:'cover',flexShrink:0}}/>
                    <div>
                      <div style={{fontSize:'10px',letterSpacing:'1.5px',color:'#999',marginBottom:'3px'}}>{product.brand}</div>
                      <div style={{fontSize:'14px',fontWeight:500,marginBottom:'5px'}}>{product.name}</div>
                      <div style={{fontSize:'13px',color:'#C94E1A',fontWeight:500}}>{product.price.toLocaleString()}원</div>
                    </div>
                  </div>
                  <div style={{marginBottom:'16px'}}>
                    <div style={{fontSize:'12px',fontWeight:500,color:'#666',marginBottom:'10px'}}>컬러 · {selectedColor.name}</div>
                    <div style={{fontSize:'12px',fontWeight:500,color:'#666',marginBottom:'10px'}}>사이즈 선택 (최대 2개 동시 신청)</div>
                    <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
                      {product.sizes.map(sz => (
                        <button key={sz} className={`size-btn ${selectedSize===sz?'on':''}`} onClick={() => setSelectedSize(sz)}>{sz}</button>
                      ))}
                    </div>
                    <div style={{fontSize:'11px',color:'#999',marginTop:'8px'}}>여러 사이즈를 신청해 집에서 비교해보세요.</div>
                  </div>
                  <div style={{background:'#fff8f5',borderLeft:'3px solid #C94E1A',padding:'13px 15px',fontSize:'12px',color:'#333',lineHeight:1.7}}>
                    <strong>피팅박스 안내</strong><br/>피팅 기간: 수령일 포함 <strong>3일</strong> · 피팅 비용: <strong style={{color:'#2a7a50'}}>무료</strong><br/>반납 시 추가 비용 없음
                  </div>
                </div>
              ) : fitStep === 2 ? (
                <div>
                  <div style={{marginBottom:'14px'}}>
                    <div style={{fontSize:'11px',fontWeight:500,color:'#666',marginBottom:'7px'}}>받으실 분</div>
                    <input className="form-input" type="text" defaultValue="김지연" placeholder="이름"/>
                  </div>
                  <div style={{marginBottom:'14px'}}>
                    <div style={{fontSize:'11px',fontWeight:500,color:'#666',marginBottom:'7px'}}>연락처</div>
                    <input className="form-input" type="tel" defaultValue="010-1234-5678"/>
                  </div>
                  <div style={{marginBottom:'14px'}}>
                    <div style={{fontSize:'11px',fontWeight:500,color:'#666',marginBottom:'7px'}}>배송 주소</div>
                    <input className="form-input" type="text" defaultValue="서울시 강남구 압구정로 000"/>
                    <input className="form-input" type="text" placeholder="상세 주소" defaultValue="000동 000호"/>
                  </div>
                  <div style={{marginBottom:'14px'}}>
                    <div style={{fontSize:'11px',fontWeight:500,color:'#666',marginBottom:'7px'}}>배송 요청 사항</div>
                    <input className="form-input" type="text" placeholder="예) 경비실 맡겨주세요"/>
                  </div>
                  <div style={{padding:'12px',background:'#f9f7f4',fontSize:'12px',color:'#666'}}>
                    🚚 신청 후 <strong>24시간 이내</strong> 발송, 이튿날 수령 가능해요.
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{borderTop:'1px solid #f0f0f0'}}>
                    {[['제품',`${product.name} / ${selectedSize}`],['컬러',selectedColor.name],['배송지','서울시 강남구 압구정로 000'],['피팅 기간','3일'],['피팅 비용','무료']].map(([k,v]) => (
                      <div key={k} className="confirm-row">
                        <span className="c-label">{k}</span>
                        <span style={{color:k==='피팅 비용'?'#2a7a50':'#111'}}>{v}</span>
                      </div>
                    ))}
                    <div className="confirm-row c-total">
                      <span className="c-label">구매 확정 시 결제액</span>
                      <span className="c-val">{product.price.toLocaleString()}원</span>
                    </div>
                  </div>
                  <div className="withy-row">
                    <div style={{fontSize:'13px'}}>위디 포인트 사용 <span style={{color:'#B08D57',fontWeight:500}}>2,400P → 2,400원 할인</span></div>
                    <button className={`toggle ${withyOn?'on':''}`} onClick={() => setWithyOn(!withyOn)}/>
                  </div>
                  <div style={{background:'#fff8f5',borderLeft:'3px solid #C94E1A',padding:'12px',fontSize:'12px',color:'#333',lineHeight:1.7}}>
                    구매 확정 시에만 결제됩니다. 반납 시 <strong>추가 비용 없음</strong>.
                  </div>
                </div>
              )}
            </div>
            {!fitDone && (
              <div className="mp-footer">
                <button className="mp-back" style={{visibility:fitStep>1?'visible':'hidden'}} onClick={() => fitStep>1&&setFitStep(fitStep-1)}>← 이전</button>
                <button className={`mp-next ${fitStep===3?'green':''}`}
                  onClick={() => { if(fitStep<3) setFitStep(fitStep+1); else { setFitDone(true); showToast('🎁 피팅박스 신청 완료! 위디 50P 적립') }}}>
                  {fitStep < 3 ? '다음 단계 →' : '피팅박스 신청 완료!'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 바로 구매 모달 */}
      {buyModalOpen && (
        <div className="modal-bg" onClick={closeBuy}>
          <div style={{background:'#fff',width:'min(440px,100vw)',maxHeight:'90dvh',overflowY:'auto',transform:'none'}} onClick={e => e.stopPropagation()}>
            <div className="mp-header">
              <div className="mp-title">바로 구매하기</div>
              <button className="mp-close" onClick={closeBuy}>✕</button>
            </div>
            <div style={{padding:'24px'}}>
              <div style={{display:'flex',gap:'14px',padding:'14px',background:'#f9f7f4',marginBottom:'20px'}}>
                <img src={product.images[0]} alt={product.name} style={{width:'64px',height:'80px',objectFit:'cover',flexShrink:0}}/>
                <div>
                  <div style={{fontSize:'10px',letterSpacing:'1.5px',color:'#999',marginBottom:'3px'}}>{product.brand}</div>
                  <div style={{fontSize:'14px',fontWeight:500,marginBottom:'5px'}}>{product.name}</div>
                  <div style={{fontSize:'13px',color:'#C94E1A',fontWeight:500}}>{product.price.toLocaleString()}원</div>
                </div>
              </div>
              <div style={{marginBottom:'16px'}}>
                <div style={{fontSize:'12px',fontWeight:500,color:'#666',marginBottom:'10px'}}>사이즈 · {selectedSize}</div>
                <div style={{fontSize:'12px',fontWeight:500,color:'#666',marginBottom:'6px'}}>수량</div>
                <div style={{display:'flex',alignItems:'center',gap:0,width:'110px',border:'1px solid #e8e8e8'}}>
                  <button className="qty-btn" onClick={() => setQty(Math.max(1,qty-1))}>−</button>
                  <div className="qty-num">{qty}</div>
                  <button className="qty-btn" onClick={() => setQty(qty+1)}>+</button>
                </div>
              </div>
              <div className="withy-row">
                <div style={{fontSize:'13px'}}>위디 <span style={{color:'#B08D57',fontWeight:500}}>2,400P 사용</span></div>
                <button className={`toggle ${withyOn?'on':''}`} onClick={() => setWithyOn(!withyOn)}/>
              </div>
              <div style={{borderTop:'1px solid #f0f0f0',padding:'14px 0',marginBottom:'16px'}}>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:'14px'}}>
                  <span style={{color:'#666'}}>최종 결제 금액</span>
                  <span style={{fontWeight:600,color:'#C94E1A',fontSize:'18px'}}>{(product.price*qty).toLocaleString()}원</span>
                </div>
              </div>
              <div style={{background:'#fff8f5',borderLeft:'3px solid #C94E1A',padding:'12px',fontSize:'12px',color:'#333',lineHeight:1.7,marginBottom:'16px'}}>
                💡 구매 전 <strong>피팅박스</strong>를 이용해보세요. 집에서 입어보고 맞지 않으면 무료 반납할 수 있어요.
              </div>
            </div>
            <div style={{padding:'14px 24px',borderTop:'1px solid #e8e8e8',display:'flex',gap:'8px'}}>
              <button className="btn-cart" style={{flex:1}} onClick={() => { addCart(); closeBuy() }}>장바구니 담기</button>
              <button className="btn-buy" style={{flex:1}} onClick={() => { showToast('✓ 결제가 완료됐어요. 위디 적립!'); closeBuy() }}>결제하기</button>
            </div>
          </div>
        </div>
      )}

      {/* 사이즈 가이드 모달 */}
      {sizeGuideOpen && (
        <div className="sg-bg" onClick={() => setSizeGuideOpen(false)}>
          <div className="sg-modal" onClick={e => e.stopPropagation()}>
            <div className="sg-header">
              <span style={{fontSize:'16px',fontWeight:500}}>사이즈 가이드</span>
              <button className="mp-close" onClick={() => setSizeGuideOpen(false)}>✕</button>
            </div>
            <div style={{padding:'20px 24px 24px'}}>
              <table className="sg-table">
                <thead>
                  <tr><th>사이즈</th><th>총장</th><th>어깨</th><th>가슴</th><th>소매</th></tr>
                </thead>
                <tbody>
                  {[['XS','100cm','41cm','100cm','59cm'],['S','103cm','43cm','104cm','60cm'],['M','106cm','45cm','108cm','61cm'],['L','109cm','47cm','112cm','62cm']].map(row => (
                    <tr key={row[0]}><td>{row[0]}</td><td>{row[1]}</td><td>{row[2]}</td><td>{row[3]}</td><td>{row[4]}</td></tr>
                  ))}
                </tbody>
              </table>
              <div style={{fontSize:'11px',color:'#999',marginTop:'12px',lineHeight:1.7}}>
                ※ 제품 실측 기준이며 1~2cm 오차 있을 수 있어요.<br/>
                💡 사이즈 고민? 피팅박스로 2가지 동시 신청해보세요.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 토스트 */}
      <div className={`toast-wrap ${toast?'show':''}`}>{toast}</div>
    </main>
  )
}
