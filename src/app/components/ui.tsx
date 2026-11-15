// @ts-nocheck
'use client'
import { createOrder } from '../lib/orders'
import { useState } from 'react'
import { useShop } from '../lib/store'

/* 공용 이미지 헬퍼 (Unsplash, 로드 확인된 ID만 사용) */
export const U = (id, w = 600) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop&crop=center`
export const FB = U('1551232864-3f0890e580d9', 600)
export const onImgError = e => { e.currentTarget.onerror = null; e.currentTarget.src = FB }

export function Img({ src, alt = '', style, className }) {
  return <img src={src} alt={alt} className={className} loading="lazy" onError={onImgError} style={style} />
}

/* 하위 페이지 공통 스타일 */
export function SharedStyle() {
  return (
    <style>{`
      *, *::before, *::after { -webkit-tap-highlight-color: transparent; box-sizing: border-box; }
      button, a { touch-action: manipulation; }
      img { display: block; }
      main { background: #fff; color: #111; font-size: 14px; min-height: 100vh; display: flex; flex-direction: column; }
      main > .foot { margin-top: auto; }
      .wrap { max-width: 1320px; margin: 0 auto; padding: 0 40px; }
      .page-head { padding: 48px 0 24px; }
      .page-head h1 { font-size: 32px; font-weight: 700; letter-spacing: -0.03em; margin: 0 0 8px; }
      .page-head p { font-size: 14px; color: #6b6b6b; line-height: 1.7; margin: 0; max-width: 36em; }
      .tabs { display: flex; gap: 4px; overflow-x: auto; border-bottom: 1px solid #eee; }
      .tab { padding: 12px 16px; font-size: 14px; color: #8a8a8a; border-bottom: 2px solid transparent; white-space: nowrap; min-height: 44px; }
      .tab.on { color: #111; font-weight: 500; border-bottom-color: #111; }
      .bar { display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; padding: 16px 0; }
      .count { font-size: 13px; color: #8a8a8a; }
      .chip { padding: 8px 14px; font-size: 13px; color: #6b6b6b; border: 1px solid #e5e5e5; border-radius: 999px; min-height: 36px; }
      .chip.on { color: #111; border-color: #111; }
      .toggle { display: inline-flex; align-items: center; gap: 10px; font-size: 14px; cursor: pointer; min-height: 44px; }
      .toggle i { width: 36px; height: 20px; border-radius: 999px; background: #d9d9d9; position: relative; transition: background .2s; }
      .toggle i::after { content: ''; position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; border-radius: 50%; background: #fff; transition: left .2s; }
      .toggle.on i { background: #3D6A4F; }
      .toggle.on i::after { left: 18px; }
      .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 36px 20px; padding-bottom: 72px; }
      .wrap-full { width: 100%; padding: 0 48px; }
      .grid-full { display: grid; grid-template-columns: repeat(5, 1fr); gap: 40px 20px; padding-bottom: 80px; }
      @media (max-width: 1280px) { .grid-full { grid-template-columns: repeat(4, 1fr); } }
      @media (max-width: 1024px) { .grid-full { grid-template-columns: repeat(3, 1fr); } .wrap-full { padding: 0 24px; } }
      @media (max-width: 768px) { .wrap-full { padding: 0 16px; } .grid-full { grid-template-columns: repeat(2, 1fr); gap: 24px 12px; padding-bottom: 48px; } }
      .pc { display: block; color: inherit; }
      .pc-img { position: relative; aspect-ratio: 3/4; background: #f4f4f2; overflow: hidden; margin-bottom: 12px; }
      .pc-img img { width: 100%; height: 100%; object-fit: cover; transition: transform .5s ease; }
      .pc-fit { position: absolute; top: 10px; left: 10px; background: #fff; color: #3D6A4F; font-size: 11px; font-weight: 500; padding: 3px 8px; }
      .pc-add { position: absolute; left: 10px; right: 10px; bottom: 10px; padding: 11px; background: #fff; color: #111; font-size: 12px; font-weight: 500; min-height: 40px; }
      .pc-add:hover { background: #111; color: #fff; }
      .pc-brand { font-size: 12px; color: #8a8a8a; margin-bottom: 3px; }
      .pc-name { font-size: 14px; margin-bottom: 6px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
      .pc-price { display: flex; align-items: baseline; gap: 8px; font-size: 14px; font-weight: 600; }
      .pc-dc { color: #c04b4b; }
      .pc-org { font-size: 12px; font-weight: 400; color: #b5b5b5; text-decoration: line-through; }
      .btn-p { padding: 14px 28px; background: #111; color: #fff; font-size: 14px; font-weight: 500; min-height: 48px; display: inline-flex; align-items: center; justify-content: center; transition: background .2s; border: 0; }
      .btn-p:hover { background: #3D6A4F; }
      .btn-s { padding: 13px 28px; border: 1px solid #d9d9d9; background: #fff; color: #111; font-size: 14px; min-height: 48px; display: inline-flex; align-items: center; justify-content: center; }
      .btn-s:hover { border-color: #111; }
      .more { display: block; margin: 0 auto 72px; }
      .empty { text-align: center; padding: 80px 0; color: #8a8a8a; }
      .steps-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; padding: 8px 0 32px; }
      .step { border-top: 2px solid #111; padding-top: 14px; }
      .step-n { font-size: 13px; color: #3D6A4F; font-weight: 600; margin-bottom: 6px; }
      .step b { display: block; font-size: 15px; margin-bottom: 4px; }
      .step span { font-size: 13px; color: #6b6b6b; line-height: 1.6; }
      .foot { background: #fafaf8; border-top: 1px solid #eee; padding: 56px 0 28px; }
      .foot-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 40px; padding-bottom: 40px; margin-bottom: 24px; border-bottom: 1px solid #eee; }
      .foot-logo { font-size: 22px; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 12px; }
      .foot p { margin: 0; font-size: 13px; color: #8a8a8a; line-height: 1.9; }
      .foot h4 { margin: 0 0 14px; font-size: 13px; font-weight: 600; }
      .foot a { display: block; font-size: 13px; color: #6b6b6b; padding: 5px 0; }
      .foot a:hover { color: #111; }
      .foot-bottom { display: flex; justify-content: space-between; font-size: 12px; color: #aaa; flex-wrap: wrap; gap: 8px; }
      @media (max-width: 1024px) { .grid-4 { grid-template-columns: repeat(3, 1fr); } .foot-grid { grid-template-columns: 1fr 1fr 1fr; } }
      @media (max-width: 768px) {
        .foot-grid { grid-template-columns: 1fr 1fr; gap: 28px; }
        .foot-grid > div:first-child { grid-column: 1 / -1; }
        .foot-bottom { flex-direction: column; }
        .wrap { padding: 0 16px; }
        .page-head { padding: 28px 0 16px; }
        .page-head h1 { font-size: 24px; }
        .grid-4 { grid-template-columns: repeat(2, 1fr); gap: 24px 12px; padding-bottom: 48px; }
        .steps-row { grid-template-columns: repeat(2, 1fr); }
      }
    `}</style>
  )
}

const FOOT_COLS = [
  { title: '쇼핑', links: [{ t: 'New', h: '/products/new' }, { t: 'Best', h: '/#best' }, { t: '기획전', h: '/exhibition' }, { t: '피팅박스관', h: '/fitting' }] },
  { title: '서비스', links: [{ t: '피팅 이용 안내', h: '/about' }, { t: 'Withy 포인트', h: '/withy' }, { t: '반납 방법', h: '/about' }, { t: 'AI 취향 분석', h: '/mypage' }] },
  { title: '커뮤니티', links: [{ t: '피팅 후기', h: '/community' }, { t: '스타일 공유', h: '/community' }, { t: '매거진', h: '/magazine' }, { t: '룩북', h: '/lookbook' }] },
  { title: '고객센터', links: [{ t: '1:1 문의', h: '/' }, { t: '자주 묻는 질문', h: '/about' }, { t: '배송 조회', h: '/' }, { t: '회사 소개', h: '/about' }] },
]

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap-full">
        <div className="foot-grid">
          <div>
            <div className="foot-logo">CLYQ</div>
            <p>입어보고 결정하는 패션 쇼핑.<br />집에서 먼저 입어보고, 확실한 것만 구매하세요.</p>
          </div>
          {FOOT_COLS.map(col => (
            <div key={col.title}>
              <h4>{col.title}</h4>
              {col.links.map(l => <a key={l.t} href={l.h}>{l.t}</a>)}
            </div>
          ))}
        </div>
        <div className="foot-bottom">
          <span>© 2026 CLYQ Inc. exyai company. 통신판매업신고: 2026-서울강남-0000 대표: 학선</span>
          <span>사업자등록번호: 000-00-00000</span>
        </div>
      </div>
    </footer>
  )
}

export function ProductCard({ p, onFit }) {
  const [hovered, setHovered] = useState(false)
  const { isWished, toggleWish } = useShop()
  const dc = p.original > p.price ? Math.round((1 - p.price / p.original) * 100) : 0
  const Tag = onFit ? 'div' : 'a'
  return (
    <Tag href={onFit ? undefined : '/products/' + p.id} className="pc" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="pc-img">
        <Img src={p.image} alt={p.name} style={{ transform: hovered ? 'scale(1.03)' : 'scale(1)' }} />
        <button className={'pc-heart' + (isWished(p.id) ? ' on' : '')} aria-label="찜하기" onClick={e => { e.preventDefault(); e.stopPropagation(); toggleWish(p.id) }}>{isWished(p.id) ? '♥' : '♡'}</button>
        {p.fit && <span className="pc-fit">피팅</span>}
        {hovered && p.fit && (
          <button className="pc-add" onClick={e => { e.preventDefault(); onFit && onFit(p) }}>피팅박스 담기</button>
        )}
      </div>
      <div className="pc-brand">{p.brand}</div>
      <div className="pc-name">{p.name}</div>
      <div className="pc-price">
        {dc > 0 && <span className="pc-dc">{dc}%</span>}
        <span>{p.price.toLocaleString()}원</span>
        {dc > 0 && <span className="pc-org">{p.original.toLocaleString()}원</span>}
      </div>
    </Tag>
  )
}

export function FitDrawer({ product, onClose }) {
  const [step, setStep] = useState(1)
  const [size, setSize] = useState('')
  const [done, setDone] = useState(false)
  const [f, setF] = useState({ name: '', phone: '', addr: '', addr2: '' })
  const [oid, setOid] = useState('')
  if (!product) return null
  const valid = f.name.trim() && f.phone.replace(/\D/g, '').length >= 9 && f.addr.trim()
  const canNext = step === 1 ? !!size : step === 2 ? !!valid : true
  const submit = () => { const o = createOrder({ kind: 'fitting', customer: f, items: [{ pid: product.id, name: product.name, brand: product.brand, size, qty: 1, price: product.price }] }); setOid(o.id); setDone(true) }
  return (
    <div className="fd-bg" onClick={onClose}>
      <style>{`
        .fd-bg { position: fixed; inset: 0; background: rgba(0,0,0,.45); z-index: 1000; display: flex; justify-content: flex-end; }
        .fd { width: min(440px, 100vw); height: 100dvh; background: #fff; display: flex; flex-direction: column; color: #111; }
        .fd-h { padding: 12px 12px 12px 24px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; font-weight: 600; font-size: 16px; }
        .fd-h button { width: 44px; height: 44px; font-size: 18px; }
        .fd-prog { height: 2px; background: #eee; } .fd-prog i { display: block; height: 100%; background: #3D6A4F; transition: width .3s; }
        .fd-b { flex: 1; overflow-y: auto; padding: 24px; }
        .fd-f { padding: 16px 24px; border-top: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; }
        .fd-prod { display: flex; gap: 14px; padding: 14px; background: #fafaf8; margin-bottom: 20px; }
        .fd-prod img { width: 64px; height: 80px; object-fit: cover; flex-shrink: 0; }
        .fd-sizes { display: flex; gap: 8px; flex-wrap: wrap; margin: 10px 0 20px; }
        .fd-size { width: 56px; height: 44px; border: 1px solid #e5e5e5; font-size: 13px; color: #555; background: #fff; }
        .fd-size.on { border-color: #111; background: #111; color: #fff; }
        .fd-inp { width: 100%; padding: 12px 14px; border: 1px solid #e5e5e5; font-size: 14px; font-family: inherit; margin-bottom: 12px; min-height: 44px; }
        .fd-inp:focus { outline: none; border-color: #111; }
        .fd-note { background: #fafaf8; padding: 14px 16px; font-size: 13px; line-height: 1.7; color: #444; }
        .fd-sum { display: flex; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid #eee; font-size: 14px; }
        .fd-sum span:first-child { color: #8a8a8a; }
        .fd-btn { padding: 0 28px; min-height: 48px; background: #111; color: #fff; font-size: 14px; font-weight: 500; }
        .fd-btn:disabled { background: #ccc; cursor: not-allowed; }
      `}</style>
      <div className="fd" role="dialog" aria-modal="true" aria-label="피팅박스 신청" onClick={e => e.stopPropagation()}>
        <div className="fd-h"><span>{done ? '신청이 접수됐어요' : `피팅박스 신청 (${step}/3)`}</span><button onClick={onClose} aria-label="닫기">✕</button></div>
        {!done && <div className="fd-prog"><i style={{ width: `${step * 33.3}%` }} /></div>}
        <div className="fd-b">
          <div className="fd-prod">
            <Img src={product.image} alt={product.name} />
            <div><div className="pc-brand" style={{ fontSize: 12, color: '#8a8a8a' }}>{product.brand}</div><div style={{ fontSize: 14, fontWeight: 500, margin: '2px 0 4px' }}>{product.name}</div><div style={{ fontSize: 14, fontWeight: 600 }}>{product.price.toLocaleString()}원</div></div>
          </div>
          {done ? (
            <div>
              <p style={{ fontSize: 14, color: '#6b6b6b', lineHeight: 1.7, margin: '0 0 20px' }}>신청번호 {oid}. 접수 내역은 주문 내역에서 확인할 수 있어요. 실제 일정은 서비스 오픈 시 확정됩니다.</p>
              <button className="fd-btn" style={{ width: '100%' }} onClick={onClose}>확인</button>
            </div>
          ) : step === 1 ? (
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>사이즈</div>
              <div className="fd-sizes">{['XS', 'S', 'M', 'L', 'XL'].map(z => <button key={z} className={'fd-size' + (size === z ? ' on' : '')} onClick={() => setSize(z)}>{z}</button>)}</div>
              <div className="fd-note">수령 후 48시간 동안 입어보고, 구매를 확정한 제품만 결제됩니다.</div>
            </div>
          ) : step === 2 ? (
            <div>
              <input className="fd-inp" placeholder="받는 분" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} /><input className="fd-inp" type="tel" placeholder="연락처" value={f.phone} onChange={e => setF({ ...f, phone: e.target.value })} />
              <input className="fd-inp" placeholder="주소" value={f.addr} onChange={e => setF({ ...f, addr: e.target.value })} /><input className="fd-inp" placeholder="상세 주소" value={f.addr2} onChange={e => setF({ ...f, addr2: e.target.value })} />
            </div>
          ) : (
            <div>
              <div className="fd-sum"><span>사이즈</span><span>{size}</span></div>
              <div className="fd-sum"><span>착용 기간</span><span>수령 후 48시간</span></div>
              <div className="fd-sum"><span>구매 확정 시 결제</span><span>{product.price.toLocaleString()}원</span></div>
              <div className="fd-note" style={{ marginTop: 20 }}>구매를 확정하기 전에는 결제되지 않습니다. 반납 방법과 비용은 오픈 시 안내됩니다.</div>
            </div>
          )}
        </div>
        {!done && (
          <div className="fd-f">
            <button onClick={() => step > 1 && setStep(step - 1)} style={{ fontSize: 13, color: '#8a8a8a', visibility: step > 1 ? 'visible' : 'hidden', minHeight: 44 }}>이전</button>
            <button className="fd-btn" disabled={!canNext} onClick={() => step < 3 ? setStep(step + 1) : submit()}>{step < 3 ? '다음' : '신청하기'}</button>
          </div>
        )}
      </div>
    </div>
  )
}
