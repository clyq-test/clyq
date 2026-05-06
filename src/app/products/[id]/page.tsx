// @ts-nocheck
'use client'
import { useState } from 'react'
import Navbar from '../../components/Navbar'

const product = {
  id: 1,
  brand: 'MARCIA',
  name: '오버핏 캐시미어 울 코트',
  price: 428000,
  original: 520000,
  points: 428,
  isFittable: true,
  images: [
    'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1583496661160-fb5218e5b8a9?w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=900&auto=format&fit=crop',
  ],
  detailImages: [
    'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop',
  ],
  sizes: ['XS', 'S', 'M', 'L'],
  soldout: ['XL'],
}

const relatedProducts = [
  { id:2, brand:'EIGHT', name:'셔링 미디 드레스', price:198000, original:240000, image:'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&auto=format&fit=crop' },
  { id:3, brand:'MATIN KIM', name:'오버핏 레더 재킷', price:578000, original:578000, image:'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&auto=format&fit=crop' },
  { id:6, brand:'EENK', name:'셔링 미디 스커트', price:148000, original:148000, image:'https://images.unsplash.com/photo-1583496661160-fb5218e5b8a9?w=400&auto=format&fit=crop' },
  { id:7, brand:'D.POUND', name:'라운드넥 실크 블라우스', price:158000, original:198000, image:'https://images.unsplash.com/photo-1594938298603-c8148f4851b8?w=400&auto=format&fit=crop' },
]

export default function ProductDetail() {
  const [mainImg, setMainImg] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [qty, setQty] = useState(1)
  const [wished, setWished] = useState(false)
  const [purchaseType, setPurchaseType] = useState('once')
  const [fitModalOpen, setFitModalOpen] = useState(false)
  const [buyModalOpen, setBuyModalOpen] = useState(false)
  const [fitStep, setFitStep] = useState(1)
  const [fitDone, setFitDone] = useState(false)
  const [withyOn, setWithyOn] = useState(false)
  const [toast, setToast] = useState('')

  const dc = Math.round((1 - product.price / product.original) * 100)
  const total = product.price * qty

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(''), 2600)
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

  return (
    <main style={{background:'#fff',minHeight:'100vh'}}>
      <style>{`
        * { box-sizing:border-box; }

        /* 브레드크럼 */
        .bc { padding:12px 40px; font-size:11px; color:#999; display:flex; gap:6px; border-bottom:1px solid #f0f0f0; }
        .bc a { color:#999; text-decoration:none; }
        .bc a:hover { color:#111; }

        /* 상단 2컬럼 */
        .top-wrap { display:grid; grid-template-columns:1fr 420px; max-width:1180px; margin:0 auto; padding:32px 40px; gap:48px; }

        /* 이미지 영역 */
        .img-area { position:sticky; top:80px; height:fit-content; }
        .main-img { position:relative; width:100%; aspect-ratio:3/4; overflow:hidden; background:#f5f5f5; cursor:zoom-in; }
        .main-img img { width:100%; height:100%; object-fit:cover; display:block; }
        .img-badges { position:absolute; top:14px; left:14px; display:flex; flex-direction:column; gap:5px; }
        .ibadge { font-size:10px; font-weight:700; padding:4px 8px; letter-spacing:.5px; }
        .ibadge-fit { background:#C94E1A; color:#fff; }
        .ibadge-new { background:#111; color:#fff; }
        .wish-btn { position:absolute; top:14px; right:14px; width:36px; height:36px; border-radius:50%; background:rgba(255,255,255,.92); border:none; cursor:pointer; font-size:16px; display:flex; align-items:center; justify-content:center; }
        /* 하단 썸네일 가로 스크롤 - 아비뮤아 스타일 */
        .thumb-row { display:flex; gap:6px; margin-top:8px; overflow-x:auto; scrollbar-width:none; padding-bottom:2px; }
        .thumb-row::-webkit-scrollbar { display:none; }
        .thumb { width:60px; height:76px; flex-shrink:0; overflow:hidden; cursor:pointer; border:1.5px solid transparent; }
        .thumb.on { border-color:#111; }
        .thumb img { width:100%; height:100%; object-fit:cover; display:block; }

        /* 정보 영역 */
        .info-area { padding-top:4px; }
        .info-brand { font-size:11px; letter-spacing:3px; color:#999; font-weight:500; margin-bottom:6px; }
        .info-name { font-size:22px; font-weight:400; color:#111; line-height:1.35; margin-bottom:20px; letter-spacing:-.3px; }

        /* 가격 */
        .price-section { border-top:1px solid #f0f0f0; border-bottom:1px solid #f0f0f0; padding:16px 0; margin-bottom:20px; }
        .price-row { display:flex; align-items:center; gap:10px; margin-bottom:6px; }
        .p-ori { font-size:13px; color:#ccc; text-decoration:line-through; }
        .p-dc { font-size:14px; font-weight:700; color:#e74c3c; }
        .p-main { font-size:26px; font-weight:500; color:#111; }
        .p-sub { display:flex; gap:16px; align-items:center; font-size:12px; }
        .p-withy { color:#B08D57; display:flex; gap:3px; align-items:center; }
        .p-delivery { color:#666; }

        /* 피팅박스 안내 */
        .fit-info-bar { background:#fff8f5; border:1px solid rgba(201,78,26,.15); padding:12px 14px; margin-bottom:20px; display:flex; align-items:center; gap:10px; font-size:12px; color:#333; line-height:1.6; }
        .fit-info-bar strong { color:#C94E1A; }

        /* 옵션 드롭다운 - 아비뮤아 스타일 */
        .opt-section { margin-bottom:16px; }
        .opt-label { font-size:12px; font-weight:500; color:#555; margin-bottom:8px; display:flex; justify-content:space-between; }
        .opt-label a { font-weight:400; color:#999; text-decoration:underline; cursor:pointer; font-size:11px; }
        .size-select { width:100%; padding:11px 14px; border:1px solid #e0e0e0; font-size:13px; color:#111; background:#fff; cursor:pointer; outline:none; appearance:none; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23999' stroke-width='1.5' fill='none'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 14px center; font-family:inherit; }
        .size-select:focus { border-color:#111; }

        /* 선택된 상품 목록 - 아비뮤아 스타일 */
        .selected-list { border:1px solid #f0f0f0; background:#fafafa; padding:14px; margin-bottom:16px; display:none; }
        .selected-list.show { display:block; }
        .selected-item { display:flex; justify-content:space-between; align-items:center; }
        .selected-name { font-size:13px; color:#333; }
        .selected-qty { display:flex; align-items:center; gap:0; border:1px solid #e0e0e0; background:#fff; }
        .sq-btn { width:28px; height:28px; border:none; background:none; cursor:pointer; font-size:14px; color:#666; display:flex; align-items:center; justify-content:center; }
        .sq-btn:hover { background:#f5f5f5; }
        .sq-num { width:32px; text-align:center; font-size:13px; }
        .selected-price { font-size:14px; font-weight:500; color:#111; min-width:72px; text-align:right; }

        /* 구매방법 */
        .purchase-type { display:flex; gap:8px; margin-bottom:20px; }
        .pt-btn { flex:1; padding:11px; border:1px solid #e0e0e0; font-size:13px; cursor:pointer; background:#fff; color:#666; text-align:center; transition:all .15s; font-family:inherit; }
        .pt-btn.on { border-color:#111; background:#111; color:#fff; font-weight:500; }

        /* 총 금액 */
        .total-section { border-top:1px solid #f0f0f0; padding:16px 0; margin-bottom:16px; display:flex; justify-content:space-between; align-items:center; }
        .total-label { font-size:13px; color:#666; }
        .total-right { text-align:right; }
        .total-price { font-size:22px; font-weight:600; color:#111; }
        .total-withy { font-size:11px; color:#B08D57; margin-top:2px; }

        /* CTA 버튼 */
        .cta-group { display:flex; flex-direction:column; gap:8px; }
        .btn-fitbox { padding:15px; background:#C94E1A; color:#fff; font-size:14px; font-weight:500; border:none; cursor:pointer; width:100%; display:flex; align-items:center; justify-content:center; gap:8px; letter-spacing:.2px; transition:background .2s; }
        .btn-fitbox:hover { background:#a83d14; }
        .btn-fitbox-note { font-size:11px; opacity:.75; font-weight:300; }
        .btn-buy-now { padding:15px; background:#111; color:#fff; font-size:14px; font-weight:500; border:none; cursor:pointer; width:100%; transition:background .2s; }
        .btn-buy-now:hover { background:#333; }
        .btn-cart-add { padding:13px; border:1px solid #e0e0e0; color:#333; font-size:13px; cursor:pointer; background:#fff; width:100%; display:flex; align-items:center; justify-content:center; gap:6px; transition:all .15s; }
        .btn-cart-add:hover { border-color:#111; color:#111; }

        /* 공유 */
        .share-area { display:flex; align-items:center; gap:8px; margin-top:16px; padding-top:16px; border-top:1px solid #f0f0f0; }
        .share-lbl { font-size:11px; color:#999; }
        .share-btn { width:30px; height:30px; border:1px solid #e8e8e8; background:#fff; display:flex; align-items:center; justify-content:center; font-size:13px; cursor:pointer; }
        .share-btn:hover { border-color:#111; }

        /* ── 하단 상세 정보 (스크롤 방식 - 아비뮤아) ── */
        .detail-wrap { max-width:860px; margin:0 auto; padding:60px 40px; }
        .detail-section-title { font-size:13px; font-weight:600; color:#111; letter-spacing:.5px; padding-bottom:12px; border-bottom:1px solid #111; margin-bottom:24px; }
        .detail-section-title::before { content:'> '; }

        /* 상세 이미지 */
        .detail-img-list { display:flex; flex-direction:column; gap:0; margin-bottom:48px; }
        .detail-img-item { width:100%; display:block; }
        .detail-img-item img { width:100%; display:block; }

        /* 제품 정보 텍스트 */
        .product-info-text { font-size:13px; color:#444; line-height:2.2; margin-bottom:48px; white-space:pre-line; }

        /* 사이즈 표 */
        .size-table { width:100%; border-collapse:collapse; font-size:13px; margin-bottom:16px; }
        .size-table th { background:#f5f5f5; padding:11px 14px; text-align:center; font-weight:500; color:#555; border:1px solid #e8e8e8; font-size:12px; }
        .size-table td { padding:11px 14px; text-align:center; border:1px solid #e8e8e8; color:#333; font-weight:300; }
        .size-note { font-size:12px; color:#999; line-height:1.8; }

        /* 배송 정보 */
        .ship-block { margin-bottom:16px; }
        .ship-title { font-size:13px; font-weight:600; color:#111; margin-bottom:8px; }
        .ship-text { font-size:13px; color:#555; line-height:2; font-weight:300; }

        /* 리뷰 / QnA */
        .review-list-item { padding:24px 0; border-bottom:1px solid #f5f5f5; }
        .ri-top { display:flex; justify-content:space-between; margin-bottom:8px; }
        .ri-user { font-size:13px; font-weight:500; }
        .ri-meta { font-size:11px; color:#999; margin-top:2px; }
        .ri-stars { font-size:13px; color:#B08D57; }
        .ri-tags { display:flex; gap:5px; margin:8px 0; flex-wrap:wrap; }
        .ri-tag { font-size:10px; padding:3px 8px; background:#f5f5f5; color:#666; border-radius:20px; }
        .ri-body { font-size:13px; color:#444; line-height:1.8; font-weight:300; }
        .ri-fitbadge { display:inline-flex; align-items:center; gap:4px; font-size:10px; color:#C94E1A; background:#fff8f5; padding:3px 9px; border-radius:20px; margin-top:8px; }

        /* 연관 상품 */
        .related-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; }
        .rel-card { cursor:pointer; text-decoration:none; color:inherit; display:block; }
        .rel-img { aspect-ratio:3/4; overflow:hidden; background:#f5f5f5; margin-bottom:10px; }
        .rel-img img { width:100%; height:100%; object-fit:cover; transition:transform .4s; display:block; }
        .rel-card:hover .rel-img img { transform:scale(1.04); }

        /* 모달 */
        .modal-bg { position:fixed; inset:0; background:rgba(0,0,0,.5); z-index:1000; display:flex; align-items:flex-end; justify-content:flex-end; backdrop-filter:blur(3px); }
        .modal-panel { width:min(460px,100vw); height:100dvh; background:#fff; display:flex; flex-direction:column; overflow:hidden; }
        .mp-hd { padding:20px 24px; border-bottom:1px solid #e8e8e8; display:flex; justify-content:space-between; align-items:center; flex-shrink:0; }
        .mp-close { width:28px; height:28px; border:1px solid #e8e8e8; background:none; cursor:pointer; font-size:14px; color:#666; display:flex; align-items:center; justify-content:center; }
        .mp-close:hover { background:#111; color:#fff; border-color:#111; }
        .mp-prog { height:3px; background:#e8e8e8; flex-shrink:0; }
        .mp-body { flex:1; overflow-y:auto; padding:24px; }
        .mp-ft { padding:14px 24px; border-top:1px solid #e8e8e8; display:flex; justify-content:space-between; align-items:center; flex-shrink:0; }
        .mp-next { padding:12px 28px; background:#C94E1A; color:#fff; font-size:13px; font-weight:500; border:none; cursor:pointer; }
        .mp-next:hover { background:#111; }
        .mp-next.ok { background:#2a7a50; }
        .mp-back-btn { font-size:12px; color:#999; background:none; border:none; cursor:pointer; }
        .finput { width:100%; padding:11px 13px; border:1px solid #e8e8e8; font-size:13px; outline:none; font-family:inherit; margin-bottom:8px; }
        .finput:focus { border-color:#111; }
        .conf-row { display:flex; justify-content:space-between; padding:11px 0; border-bottom:1px solid #f0f0f0; font-size:13px; }
        .conf-lbl { color:#999; font-weight:300; }
        .conf-total .conf-lbl { font-weight:500; color:#111; font-size:14px; }
        .conf-total .conf-val { color:#C94E1A; font-size:17px; font-weight:600; }
        .withy-row { display:flex; justify-content:space-between; align-items:center; padding:13px; background:#f9f7f4; margin:12px 0; }
        .toggle { width:38px; height:22px; border-radius:11px; background:#ddd; position:relative; cursor:pointer; border:none; transition:background .2s; flex-shrink:0; }
        .toggle.on { background:#C94E1A; }
        .toggle::after { content:''; width:18px; height:18px; border-radius:50%; background:#fff; position:absolute; top:2px; left:2px; transition:left .2s; box-shadow:0 1px 3px rgba(0,0,0,.2); }
        .toggle.on::after { left:18px; }
        .sc-icon { width:60px; height:60px; border-radius:50%; background:#2a7a50; display:flex; align-items:center; justify-content:center; font-size:22px; margin:0 auto 16px; color:#fff; }
        .tl-item { display:flex; gap:12px; padding:11px 0; border-bottom:1px solid #f0f0f0; }
        .tl-dot { width:8px; height:8px; border-radius:50%; background:#C94E1A; flex-shrink:0; margin-top:4px; }
        .tl-dot.g { background:#e8e8e8; }

        /* 모바일 스티키 */
        .mobile-sticky { display:none; position:fixed; bottom:0; left:0; right:0; z-index:400; background:#fff; border-top:1px solid #e8e8e8; padding:10px 16px; gap:8px; }

        /* 토스트 */
        .toast { position:fixed; bottom:24px; left:50%; transform:translateX(-50%) translateY(60px); background:#111; color:#fff; padding:12px 20px; font-size:13px; z-index:2000; transition:transform .3s; white-space:nowrap; pointer-events:none; }
        .toast.show { transform:translateX(-50%) translateY(0); }

        /* ───── 모바일 ───── */
        @media (max-width:768px) {
          .bc { padding:10px 16px; font-size:10px; }
          .top-wrap { grid-template-columns:1fr; padding:0; gap:0; }
          .img-area { position:static; }
          .main-img { aspect-ratio:1/1; }
          .thumb-row { padding:6px 16px; }
          .info-area { padding:20px 16px 32px; border-top:1px solid #f0f0f0; }
          .info-name { font-size:18px; }
          .p-main { font-size:22px; }
          .cta-group { display:none; }
          .share-area { display:none; }
          .fit-info-bar { font-size:11px; }
          .mobile-sticky { display:flex; }
          .detail-wrap { padding:40px 16px; }
          .related-grid { grid-template-columns:repeat(2,1fr); gap:14px; }
          .size-table { font-size:12px; }
          .size-table th, .size-table td { padding:9px 10px; }
        }
      `}</style>

      <Navbar />

      {/* 브레드크럼 */}
      <div className="bc">
        <a href="/">홈</a><span>›</span>
        <a href="/">아우터</a><span>›</span>
        <a href="/">코트</a><span>›</span>
        <span style={{color:'#333'}}>{product.name}</span>
      </div>

      {/* 상단 영역 */}
      <div className="top-wrap">

        {/* 이미지 */}
        <div className="img-area">
          <div className="main-img">
            <img src={product.images[mainImg]} alt={product.name}/>
            <div className="img-badges">
              {product.isFittable && <span className="ibadge ibadge-fit">피팅박스 가능</span>}
              <span className="ibadge ibadge-new">F/W NEW</span>
            </div>
            <button className="wish-btn" onClick={() => { setWished(!wished); showToast(wished?'찜 목록에서 제거됐어요':'찜 목록에 추가됐어요') }}>
              {wished ? '❤️' : '🤍'}
            </button>
          </div>
          {/* 하단 썸네일 가로 스크롤 - 아비뮤아 스타일 */}
          <div className="thumb-row">
            {product.images.map((img, i) => (
              <div key={i} className={`thumb ${mainImg===i?'on':''}`} onClick={() => setMainImg(i)}>
                <img src={img} alt=""/>
              </div>
            ))}
          </div>
        </div>

        {/* 상품 정보 */}
        <div className="info-area">
          <div className="info-brand">{product.brand}</div>
          <div className="info-name">{product.name}</div>

          {/* 가격 */}
          <div className="price-section">
            <div className="price-row">
              <span className="p-ori">{product.original.toLocaleString()}원</span>
              <span className="p-dc">{dc}%</span>
              <span className="p-main">{product.price.toLocaleString()}원</span>
            </div>
            <div className="p-sub">
              <div className="p-withy"><span style={{fontWeight:700}}>W</span>{product.points}P 적립</div>
              <div className="p-delivery">🚚 무료배송</div>
            </div>
          </div>

          {/* 피팅박스 안내 바 */}
          {product.isFittable && (
            <div className="fit-info-bar">
              <span style={{fontSize:'18px'}}>📦</span>
              <div>
                <strong>피팅박스 서비스 가능</strong> — 집에서 먼저 입어보고 마음에 드는 것만 구매하세요.<br/>
                피팅 비용 0원 · 반납 무료 · 구매 확정 시에만 결제
              </div>
            </div>
          )}

          {/* 사이즈 드롭다운 - 아비뮤아 스타일 */}
          <div className="opt-section">
            <div className="opt-label">
              사이즈
              <a onClick={() => showToast('사이즈 가이드: S(103cm), M(106cm), L(109cm)')}>사이즈 가이드</a>
            </div>
            <select className="size-select" value={selectedSize}
              onChange={e => setSelectedSize(e.target.value)}>
              <option value="">- [필수] 사이즈를 선택해 주세요 -</option>
              {product.sizes.map(sz => (
                <option key={sz} value={sz}>{sz}</option>
              ))}
              {product.soldout.map(sz => (
                <option key={sz} value={sz} disabled>{sz} - 품절</option>
              ))}
            </select>
          </div>

          {/* 선택된 상품 목록 - 아비뮤아 스타일 */}
          <div className={`selected-list ${selectedSize?'show':''}`}>
            {selectedSize && (
              <div className="selected-item">
                <div className="selected-name">{product.name} - {selectedSize}</div>
                <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                  <div className="selected-qty">
                    <button className="sq-btn" onClick={() => setQty(Math.max(1,qty-1))}>−</button>
                    <div className="sq-num">{qty}</div>
                    <button className="sq-btn" onClick={() => setQty(qty+1)}>+</button>
                  </div>
                  <div className="selected-price">{(product.price*qty).toLocaleString()}원</div>
                </div>
              </div>
            )}
          </div>

          {/* 구매방법 - 아비뮤아 스타일 */}
          <div style={{marginBottom:'8px',fontSize:'12px',fontWeight:500,color:'#555'}}>구매방법</div>
          <div className="purchase-type">
            <button className={`pt-btn ${purchaseType==='once'?'on':''}`} onClick={() => setPurchaseType('once')}>1회 구매</button>
            <button className={`pt-btn ${purchaseType==='sub'?'on':''}`} onClick={() => setPurchaseType('sub')}>
              정기배송 <span style={{fontSize:'11px',opacity:.7}}>({purchaseType==='sub'?'구독중':'구독 시 추가 혜택'})</span>
            </button>
          </div>

          {/* 총 금액 */}
          <div className="total-section">
            <div className="total-label">금액</div>
            <div className="total-right">
              <div className="total-price">{(product.price * qty).toLocaleString()}원</div>
              {selectedSize && <div className="total-withy">구매 확정 시 W {(product.points*qty).toLocaleString()}P 적립</div>}
            </div>
          </div>

          {/* CTA 버튼 */}
          <div className="cta-group">
            <button className="btn-fitbox" onClick={openFit}>
              📦 피팅박스 신청
              <span className="btn-fitbox-note">— 입어보고 결정하세요. 피팅 무료</span>
            </button>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
              <button className="btn-cart-add" onClick={() => { if(!selectedSize){showToast('사이즈를 선택해주세요');return} showToast('🛍️ 장바구니에 담았어요') }}>
                장바구니
              </button>
              <button className="btn-buy-now" onClick={openBuy}>바로구매</button>
            </div>
          </div>

          {/* 공유 */}
          <div className="share-area">
            <span className="share-lbl">공유</span>
            <button className="share-btn" onClick={() => showToast('카카오로 공유됐어요')}>💬</button>
            <button className="share-btn" onClick={() => showToast('링크가 복사됐어요')}>🔗</button>
            <button className="share-btn" onClick={() => showToast('인스타로 공유됐어요')}>📷</button>
          </div>
        </div>
      </div>

      {/* ── 하단 상세 정보 (스크롤 방식 - 아비뮤아) ── */}
      <div className="detail-wrap">

        {/* 상세 이미지 */}
        <div className="detail-img-list">
          {product.detailImages.map((img, i) => (
            <div key={i} className="detail-img-item">
              <img src={img} alt={`상세 이미지 ${i+1}`}/>
            </div>
          ))}
        </div>

        {/* 제품 정보 */}
        <div className="detail-section-title">제품 정보</div>
        <div className="product-info-text">{`· 소재: 캐시미어 30% 울 50% 폴리에스터 20%
· 안감: 폴리에스터 100%
· 색상: 아이보리

· 고급 캐시미어 혼방 소재로 제작된 오버핏 코트
· 루즈한 실루엣이지만 어깨 라인이 정돈된 디자인

· 탄탄한 실루엣을 위한 숄더 패드 내장
· 앞 여밈 버튼 디테일
· 양 측면 포켓

· 여름을 제외한 모든 계절 착용 가능 (개인차 有)
· 제조연월: 2025년 12월
· 제조국명: 대한민국
· 제조자명: (주)마르시아

*상품의 정확한 색상은 제품 사진을 참고해 주세요.
*모니터 설정에 따라 실제 제품 색상과 차이가 있을 수 있습니다.
*사이즈 표 · 배송 정보 · 제품 관리를 꼭 확인해 주세요.`}</div>

        {/* 사이즈 표 */}
        <div className="detail-section-title">사이즈 표</div>
        <table className="size-table">
          <thead>
            <tr><th>(cm)</th><th>총장</th><th>가슴</th><th>어깨</th><th>소매</th><th>밑단</th></tr>
          </thead>
          <tbody>
            {[['XS','100','100','41','59','104'],['S','103','104','43','60','106'],['M','106','108','45','61','110'],['L','109','112','47','62','114']].map(row => (
              <tr key={row[0]}>
                {row.map((v,i) => <td key={i}>{v}{i>0?'cm':''}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="size-note" style={{marginBottom:'48px'}}>
          *사이즈는 측정 방법에 따라 1~3cm 차이가 날 수 있습니다.<br/>
          *모델(167cm, 49kg)은 S 사이즈 착용.<br/>
          💡 사이즈 고민? 피팅박스로 2가지 사이즈를 동시에 신청해보세요.
        </div>

        {/* 배송 정보 */}
        <div className="detail-section-title">배송 정보</div>
        <div className="ship-block">
          <div className="ship-title">배송 정보</div>
          <div className="ship-text">{`· 일반 출고: 영업일 기준 1~3일 이내 출고
· 택배사: CJ대한통운
· 배송비: 무료 (5만원 이상)
· 5만원 미만 구매 시 3,000원`}</div>
        </div>
        <div className="ship-block">
          <div className="ship-title">피팅박스 배송</div>
          <div className="ship-text">{`· 피팅박스 배송비: 무료
· 신청 후 24시간 이내 출고, 이튿날 수령 가능
· 피팅 기간: 수령일 포함 3일
· 반납 비용: 무료 (앱에서 신청 → 익일 방문 수거)`}</div>
        </div>
        <div className="ship-block">
          <div className="ship-title">교환 및 반품 안내</div>
          <div className="ship-text">{`· 상품 수령일로부터 7일 이내 교환 및 반품 가능
· 채널톡을 통해 접수해 주세요

· 교환배송비: 6,000원 / 반품배송비: 6,000원
· 단순 변심의 경우 왕복 배송비 고객 부담

· 피팅박스 이용 시 반납 비용: 무료`}</div>
        </div>
        <div className="ship-block" style={{marginBottom:'48px'}}>
          <div className="ship-title">교환 및 반품 불가 사유</div>
          <div className="ship-text">{`· 상품 수령일로부터 7일 초과
· 단순 시착이 아닌 사용감이 있거나 세탁한 경우
· 향수, 화장품 등 냄새가 밴 경우
· 택·옷걸이 등 부자재가 훼손 또는 분실된 경우`}</div>
        </div>

        {/* 제품 관리 */}
        <div className="detail-section-title">제품 관리</div>
        <div className="ship-block" style={{marginBottom:'60px'}}>
          <div className="ship-text">{`· 드라이클리닝 필수
· 기계 세탁 불가
· 물세탁 불가
· 장시간 수분 노출 시 변형 가능성 있음
· 건조기 사용 금지
· 염소·표백제 사용 금지

*각 제품 라벨에 기재된 취급 주의사항을 참고해 주세요.`}</div>
        </div>

        {/* 리뷰 */}
        <div className="detail-section-title">Review</div>
        <div style={{marginBottom:'48px'}}>
          <div style={{display:'flex',justifyContent:'flex-end',gap:'8px',marginBottom:'16px'}}>
            <button style={{padding:'8px 16px',border:'1px solid #e8e8e8',background:'#fff',fontSize:'12px',cursor:'pointer'}} onClick={() => showToast('로그인 후 리뷰 작성이 가능해요')}>Write</button>
          </div>
          {[
            {user:'김지연**',date:'2026.04.20 · S / 아이보리',stars:'★★★★★',tags:['피팅박스 후 구매','사이즈 딱맞아요'],text:'피팅박스로 S, M 두 사이즈 신청했어요. 입어보니 S가 딱이었고 M은 반납했어요. 소재가 훨씬 고급스럽고 위디 포인트도 쌓여서 좋았습니다.',fit:true},
            {user:'박소**',date:'2026.04.15 · M / 블랙',stars:'★★★★★',tags:['피팅박스 후 구매','핏 좋아요'],text:'마르시아 브랜드 처음이었는데 피팅박스 덕에 부담없이 시도해봤어요. 출근룩으로 너무 잘 어울려요.',fit:true},
            {user:'이민**',date:'2026.04.08 · S / 베이지',stars:'★★★★☆',tags:['소재 좋아요'],text:'소재가 정말 부드럽고 고급스러워요. 포켓이 없어 실용성이 아쉽지만 코트 자체는 만족해요.',fit:false},
          ].map((r,i) => (
            <div key={i} className="review-list-item">
              <div className="ri-top">
                <div>
                  <div className="ri-user">{r.user}</div>
                  <div className="ri-meta">{r.date}</div>
                </div>
                <div className="ri-stars">{r.stars}</div>
              </div>
              <div className="ri-tags">{r.tags.map(t => <span key={t} className="ri-tag">{t}</span>)}</div>
              <div className="ri-body">{r.text}</div>
              {r.fit && <div className="ri-fitbadge">📦 피팅박스로 직접 확인 후 구매</div>}
            </div>
          ))}
          <div style={{textAlign:'center',marginTop:'20px'}}>
            <button style={{padding:'10px 28px',border:'1px solid #e8e8e8',background:'#fff',fontSize:'12px',cursor:'pointer',color:'#666'}}>All List</button>
          </div>
        </div>

        {/* Q&A */}
        <div className="detail-section-title">Q&A</div>
        <div style={{marginBottom:'60px'}}>
          <div style={{display:'flex',justifyContent:'flex-end',gap:'8px',marginBottom:'16px'}}>
            <button style={{padding:'8px 16px',border:'1px solid #e8e8e8',background:'#fff',fontSize:'12px',cursor:'pointer'}} onClick={() => showToast('로그인 후 문의 작성이 가능해요')}>Write</button>
          </div>
          {[
            {q:'피팅박스로 S, M 동시 신청 가능한가요?',a:'네, 최대 2가지 사이즈를 동시에 신청 가능해요! 3일 이내 피팅 후 마음에 드는 사이즈만 구매 확정하시면 됩니다.'},
            {q:'피팅 중 오염이 생겼어요. 어떻게 하나요?',a:'일반 착용 범위 내 하자는 면책입니다. 앱 내 CS 채널로 먼저 문의해 주세요.'},
          ].map((faq,i) => (
            <div key={i} style={{padding:'16px 0',borderBottom:'1px solid #f0f0f0'}}>
              <div style={{display:'flex',gap:'8px',marginBottom:'8px'}}>
                <span style={{fontWeight:600,color:'#999',fontSize:'12px',flexShrink:0}}>Q.</span>
                <span style={{fontSize:'13px',color:'#111',lineHeight:1.7}}>{faq.q}</span>
              </div>
              <div style={{display:'flex',gap:'8px',padding:'12px',background:'#f9f9f9'}}>
                <span style={{fontWeight:600,color:'#C94E1A',fontSize:'12px',flexShrink:0}}>A.</span>
                <span style={{fontSize:'12px',color:'#666',fontWeight:300,lineHeight:1.7}}>{faq.a}</span>
              </div>
            </div>
          ))}
          <div style={{textAlign:'center',marginTop:'20px'}}>
            <button style={{padding:'10px 28px',border:'1px solid #e8e8e8',background:'#fff',fontSize:'12px',cursor:'pointer',color:'#666'}}>All List</button>
          </div>
        </div>

        {/* 연관 상품 */}
        <div className="detail-section-title">관련 상품</div>
        <div className="related-grid">
          {relatedProducts.map(p => {
            const dc2 = p.original > p.price ? Math.round((1-p.price/p.original)*100) : 0
            return (
              <a key={p.id} href={'/products/'+p.id} className="rel-card">
                <div className="rel-img"><img src={p.image} alt={p.name}/></div>
                <div style={{fontSize:'10px',color:'#999',letterSpacing:'1.5px',marginBottom:'4px'}}>{p.brand}</div>
                <div style={{fontSize:'13px',color:'#333',marginBottom:'5px',fontWeight:300,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{p.name}</div>
                <div style={{display:'flex',gap:'6px',alignItems:'center'}}>
                  <span style={{fontSize:'14px',fontWeight:500}}>{p.price.toLocaleString()}원</span>
                  {dc2>0 && <span style={{fontSize:'11px',fontWeight:700,color:'#e74c3c'}}>{dc2}%</span>}
                </div>
              </a>
            )
          })}
        </div>
      </div>

      {/* 모바일 스티키 버튼 */}
      <div className="mobile-sticky">
        <button className="btn-fitbox" style={{flex:1.3}} onClick={openFit}>📦 피팅박스 신청</button>
        <button className="btn-buy-now" style={{flex:1}} onClick={openBuy}>바로구매</button>
      </div>

      {/* 피팅박스 모달 */}
      {fitModalOpen && (
        <div className="modal-bg" onClick={closeFit}>
          <div className="modal-panel" onClick={e => e.stopPropagation()}>
            <div className="mp-hd">
              <div>
                <div style={{fontSize:'16px',fontWeight:500}}>피팅박스 신청</div>
                {!fitDone && <div style={{fontSize:'11px',color:'#999',marginTop:'2px'}}>STEP {fitStep} / 3</div>}
              </div>
              <button className="mp-close" onClick={closeFit}>✕</button>
            </div>
            {!fitDone && (
              <div className="mp-prog">
                <div style={{height:'100%',background:'#C94E1A',transition:'width .3s',width:fitStep===1?'33%':fitStep===2?'66%':'100%'}}/>
              </div>
            )}
            <div className="mp-body">
              {fitDone ? (
                <div style={{textAlign:'center',paddingTop:'16px'}}>
                  <div className="sc-icon">✓</div>
                  <div style={{fontSize:'20px',fontWeight:500,marginBottom:'8px'}}>피팅박스 신청 완료!</div>
                  <div style={{fontSize:'13px',color:'#666',fontWeight:300,lineHeight:1.8,marginBottom:'24px'}}>피팅박스가 곧 출발해요 📦<br/>카카오 알림톡으로 배송 현황을 알려드려요.</div>
                  {[{on:true,title:'신청 완료',time:'방금 전 · 위디 50P 적립'},{on:false,title:'검수 & 패킹',time:'오늘 중'},{on:false,title:'배송 출발',time:'내일 오전'},{on:false,title:'수령 & 피팅 시작',time:'내일 오후'}].map((t,i) => (
                    <div key={i} className="tl-item">
                      <div className={`tl-dot ${t.on?'':'g'}`}/>
                      <div>
                        <div style={{fontSize:'13px',fontWeight:500,marginBottom:'2px'}}>{t.title}</div>
                        <div style={{fontSize:'11px',color:'#999'}}>{t.time}</div>
                      </div>
                    </div>
                  ))}
                  <button style={{marginTop:'20px',width:'100%',padding:'14px',background:'#111',color:'#fff',border:'none',fontSize:'13px',fontWeight:500,cursor:'pointer'}} onClick={closeFit}>확인</button>
                </div>
              ) : fitStep === 1 ? (
                <div>
                  <div style={{display:'flex',gap:'14px',padding:'14px',background:'#f9f7f4',marginBottom:'20px'}}>
                    <img src={product.images[0]} alt="" style={{width:'64px',height:'80px',objectFit:'cover',flexShrink:0}}/>
                    <div>
                      <div style={{fontSize:'10px',letterSpacing:'1.5px',color:'#999',marginBottom:'3px'}}>{product.brand}</div>
                      <div style={{fontSize:'14px',fontWeight:500,marginBottom:'5px'}}>{product.name}</div>
                      <div style={{fontSize:'13px',color:'#C94E1A',fontWeight:500}}>{product.price.toLocaleString()}원</div>
                    </div>
                  </div>
                  <div style={{marginBottom:'16px'}}>
                    <div style={{fontSize:'12px',fontWeight:500,color:'#555',marginBottom:'8px'}}>사이즈 선택 (최대 2개 동시 신청 가능)</div>
                    <select className="size-select" value={selectedSize} onChange={e => setSelectedSize(e.target.value)}>
                      <option value="">사이즈를 선택해 주세요</option>
                      {product.sizes.map(sz => <option key={sz} value={sz}>{sz}</option>)}
                    </select>
                    <div style={{fontSize:'11px',color:'#999',marginTop:'6px'}}>여러 사이즈를 신청해 집에서 비교해보세요.</div>
                  </div>
                  <div style={{background:'#fff8f5',borderLeft:'3px solid #C94E1A',padding:'13px 15px',fontSize:'12px',color:'#333',lineHeight:1.7}}>
                    <strong>피팅박스 안내</strong><br/>피팅 기간: 수령일 포함 <strong>3일</strong> · 피팅 비용: <strong style={{color:'#2a7a50'}}>무료</strong><br/>반납 시 추가 비용 없음
                  </div>
                </div>
              ) : fitStep === 2 ? (
                <div>
                  {[{label:'받으실 분',type:'text',val:'김지연'},{label:'연락처',type:'tel',val:'010-1234-5678'}].map((f,i) => (
                    <div key={i} style={{marginBottom:'14px'}}>
                      <div style={{fontSize:'11px',fontWeight:500,color:'#555',marginBottom:'7px'}}>{f.label}</div>
                      <input className="finput" type={f.type} defaultValue={f.val}/>
                    </div>
                  ))}
                  <div style={{marginBottom:'14px'}}>
                    <div style={{fontSize:'11px',fontWeight:500,color:'#555',marginBottom:'7px'}}>배송 주소</div>
                    <input className="finput" type="text" defaultValue="서울시 강남구 압구정로 000"/>
                    <input className="finput" type="text" placeholder="상세 주소" defaultValue="000동 000호"/>
                  </div>
                  <div style={{padding:'12px',background:'#f9f7f4',fontSize:'12px',color:'#666'}}>
                    🚚 신청 후 <strong>24시간 이내</strong> 발송, 이튿날 수령 가능해요.
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{borderTop:'1px solid #f0f0f0'}}>
                    {[['제품',`${product.name} / ${selectedSize}`],['배송지','서울시 강남구 압구정로 000'],['피팅 기간','3일'],['피팅 비용','무료']].map(([k,v]) => (
                      <div key={k} className="conf-row">
                        <span className="conf-lbl">{k}</span>
                        <span style={{color:k==='피팅 비용'?'#2a7a50':'#111'}}>{v}</span>
                      </div>
                    ))}
                    <div className="conf-row conf-total">
                      <span className="conf-lbl">구매 확정 시 결제액</span>
                      <span className="conf-val">{product.price.toLocaleString()}원</span>
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
              <div className="mp-ft">
                <button className="mp-back-btn" style={{visibility:fitStep>1?'visible':'hidden'}} onClick={() => setFitStep(fitStep-1)}>← 이전</button>
                <button className={`mp-next ${fitStep===3?'ok':''}`}
                  onClick={() => { if(fitStep<3) setFitStep(fitStep+1); else { setFitDone(true); showToast('🎁 피팅박스 신청 완료! 위디 50P 적립') }}}>
                  {fitStep < 3 ? '다음 단계 →' : '피팅박스 신청 완료!'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 바로구매 모달 */}
      {buyModalOpen && (
        <div className="modal-bg" onClick={closeBuy}>
          <div style={{background:'#fff',width:'min(440px,100vw)',maxHeight:'90dvh',overflowY:'auto'}} onClick={e => e.stopPropagation()}>
            <div className="mp-hd">
              <div style={{fontSize:'16px',fontWeight:500}}>바로구매</div>
              <button className="mp-close" onClick={closeBuy}>✕</button>
            </div>
            <div style={{padding:'24px'}}>
              <div style={{display:'flex',gap:'14px',padding:'14px',background:'#f9f7f4',marginBottom:'20px'}}>
                <img src={product.images[0]} alt="" style={{width:'64px',height:'80px',objectFit:'cover',flexShrink:0}}/>
                <div>
                  <div style={{fontSize:'10px',color:'#999',marginBottom:'3px'}}>{product.brand}</div>
                  <div style={{fontSize:'14px',fontWeight:500,marginBottom:'4px'}}>{product.name} - {selectedSize}</div>
                  <div style={{fontSize:'13px',color:'#C94E1A',fontWeight:500}}>{product.price.toLocaleString()}원</div>
                </div>
              </div>
              <div style={{marginBottom:'16px'}}>
                <div style={{fontSize:'12px',color:'#555',marginBottom:'7px'}}>수량</div>
                <div style={{display:'flex',alignItems:'center',gap:0,width:'110px',border:'1px solid #e8e8e8'}}>
                  <button className="sq-btn" style={{width:'36px',height:'36px'}} onClick={() => setQty(Math.max(1,qty-1))}>−</button>
                  <div style={{flex:1,textAlign:'center',fontSize:'14px',fontWeight:500}}>{qty}</div>
                  <button className="sq-btn" style={{width:'36px',height:'36px'}} onClick={() => setQty(qty+1)}>+</button>
                </div>
              </div>
              <div className="withy-row">
                <div style={{fontSize:'13px'}}>위디 <span style={{color:'#B08D57',fontWeight:500}}>2,400P 사용</span></div>
                <button className={`toggle ${withyOn?'on':''}`} onClick={() => setWithyOn(!withyOn)}/>
              </div>
              <div style={{borderTop:'1px solid #f0f0f0',padding:'14px 0',marginBottom:'14px',display:'flex',justifyContent:'space-between',fontSize:'14px'}}>
                <span style={{color:'#666'}}>최종 결제 금액</span>
                <span style={{fontWeight:600,color:'#C94E1A',fontSize:'18px'}}>{(product.price*qty).toLocaleString()}원</span>
              </div>
              <div style={{background:'#fff8f5',borderLeft:'3px solid #C94E1A',padding:'12px',fontSize:'12px',color:'#333',lineHeight:1.7,marginBottom:'16px'}}>
                💡 구매 전 <strong>피팅박스</strong>를 이용해보세요. 집에서 입어보고 맞지 않으면 무료 반납 가능해요.
              </div>
            </div>
            <div style={{padding:'14px 24px',borderTop:'1px solid #e8e8e8',display:'flex',gap:'8px'}}>
              <button className="btn-cart-add" style={{flex:1}} onClick={() => { showToast('🛍️ 장바구니에 담았어요'); closeBuy() }}>장바구니</button>
              <button className="btn-buy-now" style={{flex:1}} onClick={() => { showToast('✓ 결제 완료! 위디 적립!'); closeBuy() }}>결제하기</button>
            </div>
          </div>
        </div>
      )}

      {/* 토스트 */}
      <div className={`toast ${toast?'show':''}`}>{toast}</div>
    </main>
  )
}

