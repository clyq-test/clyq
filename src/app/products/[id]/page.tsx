// @ts-nocheck
'use client'
import { useState, useRef } from 'react'
import { useParams } from 'next/navigation'
import { useShop } from '../../lib/store'
import { byId, detailOf } from '../../lib/catalog'
import Navbar from '../../components/Navbar'
import { SharedStyle, Footer, Img, U, ProductCard } from '../../components/ui'

/* 샘플 상품 데이터 — 실제 상품 정보가 아닙니다. */
const baseProduct = {
  brand: 'MARCIA', name: '오버핏 캐시미어 울 코트', price: 428000, original: 520000, fit: true,
  images: [
    U('1539533018447-63fcce2678e3', 900), U('1551028719-00167b16eac5', 900), U('1507679799987-c73779587ccf', 900),
    U('1496217590455-aa63a8350eea', 900), U('1515372039744-b8f02a3ae446', 900),
  ],
  sizes: ['XS', 'S', 'M', 'L'], soldout: ['XL'],
  info: ['소재: 캐시미어 30% 울 50% 폴리에스터 20%', '안감: 폴리에스터 100%', '색상: 아이보리', '넉넉한 오버핏, 어깨선이 정돈된 실루엣', '앞 여밈 버튼, 양 측면 포켓'],
  care: ['드라이클리닝 권장', '물세탁·기계 세탁 불가', '건조기 사용 금지'],
  table: [['XS', '100', '100', '41', '59', '104'], ['S', '103', '104', '43', '60', '106'], ['M', '106', '108', '45', '61', '110'], ['L', '109', '112', '47', '62', '114']],
}
const DETAIL_POOL = ['1551232864-3f0890e580d9', '1581044777550-4cfa60707c03', '1583744946564-b52ac1c389c8', '1496217590455-aa63a8350eea', '1515886657613-9f3515b0c78f', '1566174053879-31528523f8ae', '1578932750294-f5075e85f44a', '1539533018447-63fcce2678e3', '1515372039744-b8f02a3ae446', '1551028719-00167b16eac5', '1469334031218-e382a71b716b']
// 상품 번호를 기준으로 섞어서 새로고침해도 같은 이미지가 나오도록 함 (샘플 이미지)
function pickDetail(id, n = 4) {
  let seed = (Number(id) || 1) * 9301 + 49297
  const a = [...DETAIL_POOL]
  for (let i = a.length - 1; i > 0; i--) { seed = (seed * 9301 + 49297) % 233280; const j = Math.floor((seed / 233280) * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a.slice(0, n).map(x => U(x, 1400))
}
const related = [
  { id: 2, brand: 'EIGHT', name: '셔링 디테일 미디 드레스', price: 198000, original: 240000, image: U('1515372039744-b8f02a3ae446'), fit: true },
  { id: 3, brand: 'MATIN KIM', name: '오버핏 레더 재킷', price: 578000, original: 578000, image: U('1551028719-00167b16eac5'), fit: true },
  { id: 6, brand: 'EENK', name: '셔링 미디 스커트', price: 148000, original: 148000, image: U('1496217590455-aa63a8350eea'), fit: true },
  { id: 7, brand: 'D.POUND', name: '라운드넥 실크 블라우스', price: 158000, original: 198000, image: U('1581044777550-4cfa60707c03'), fit: true },
]

export default function ProductDetail() {
  const params = useParams()
  const cp = byId(params?.id)
  const product = cp ? { ...baseProduct, brand: cp.brand, name: cp.name, price: cp.price, original: cp.original, fit: cp.fit, images: [cp.image.replace('w=600', 'w=900'), ...baseProduct.images.filter(x => !x.includes(cp.image.split('photo-')[1].split('?')[0]))].slice(0, 5) } : baseProduct
  const { isWished, toggleWish, addCart } = useShop()
  const det = cp ? detailOf(cp) : null
  const sizeNames = det ? det.table.map(r => r[0]) : null
  async function share() {
    const url = window.location.href
    try {
      if (navigator.share) { await navigator.share({ title: product.brand + ' ' + product.name, url }); return }
      await navigator.clipboard.writeText(url); say('링크를 복사했어요')
    } catch (e) { if (e && e.name !== 'AbortError') say('공유하지 못했어요. 주소창의 링크를 복사해 주세요') }
  }
  const [img, setImg] = useState(0)
  const [size, setSize] = useState('')
  const [drawer, setDrawer] = useState(null) // 'fit' | 'buy'
  const [step, setStep] = useState(1)
  const [done, setDone] = useState(false)
  const [toast, setToast] = useState('')
  const [zoom, setZoom] = useState({ on: false, x: 50, y: 50 })
  const touchX = useRef(0)
  const go = i => { const n = product.images.length; setImg((i + n) % n); setZoom({ on: false, x: 50, y: 50 }) }

  const wish = cp ? isWished(cp.id) : false
  const dc = product.original > product.price ? Math.round((1 - product.price / product.original) * 100) : 0
  const say = m => { setToast(m); setTimeout(() => setToast(''), 2400) }
  function openDrawer(k) {
    if (!size) { say('사이즈를 먼저 선택해 주세요'); return }
    setDrawer(k); setStep(1); setDone(false); document.body.style.overflow = 'hidden'
  }
  function closeDrawer() { setDrawer(null); document.body.style.overflow = '' }

  return (
    <main>
      <SharedStyle />
      <style>{`
        .pd { display: grid; grid-template-columns: 1.25fr 1fr; gap: 72px; padding: 32px 0 64px; align-items: start; }
        .pd-main { position: relative; aspect-ratio: 4/5; max-height: 86vh; width: 100%; background: #f4f4f2; overflow: hidden; touch-action: pan-y; }
        .pd-track { display: flex; height: 100%; transition: transform .35s ease; }
        .pd-slide { flex: 0 0 100%; height: 100%; overflow: hidden; }
        .pd-slide img { width: 100%; height: 100%; object-fit: cover; transition: transform .15s ease-out; }
        .pd-arr { position: absolute; top: 50%; transform: translateY(-50%); width: 44px; height: 44px; background: rgba(255,255,255,.85); font-size: 24px; line-height: 1; }
        .pd-arr.l { left: 10px; } .pd-arr.r { right: 10px; }
        .pd-cnt { position: absolute; right: 10px; bottom: 10px; background: rgba(255,255,255,.85); font-size: 12px; padding: 4px 8px; }
        @media (hover: none) { .pd-slide img { transform: none !important; } }
        .pd-thumbs { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; margin-top: 8px; }
        .pd-th { aspect-ratio: 1; background: #f4f4f2; overflow: hidden; border: 1px solid transparent; padding: 0; }
        .pd-th.on { border-color: #111; }
        .pd-th img { width: 100%; height: 100%; object-fit: cover; }
        .pd-info { position: sticky; top: 88px; }
        .pd-short { font-size: 14px; color: #6b6b6b; line-height: 1.7; margin: -4px 0 16px; }
        .pd-brand { font-size: 13px; color: #8a8a8a; margin-bottom: 6px; }
        .pd-info h1 { font-size: 26px; font-weight: 600; letter-spacing: -0.02em; line-height: 1.35; margin: 0 0 16px; }
        .pd-price { display: flex; align-items: baseline; gap: 10px; margin-bottom: 28px; }
        .pd-price b { font-size: 24px; }
        .pd-price .dc { color: #c04b4b; font-size: 18px; font-weight: 600; }
        .pd-price s { color: #b5b5b5; font-size: 14px; }
        .lbl { font-size: 13px; font-weight: 500; margin-bottom: 10px; display: flex; justify-content: space-between; }
        .sizes { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 28px; }
        .size { width: 60px; height: 46px; border: 1px solid #e5e5e5; font-size: 14px; color: #444; background: #fff; }
        .size.on { border-color: #111; background: #111; color: #fff; }
        .size:disabled { color: #ccc; text-decoration: line-through; cursor: not-allowed; }
        .pd-btns { display: grid; gap: 8px; }
        .btn-fit { background: #3D6A4F; color: #fff; min-height: 52px; font-size: 15px; font-weight: 500; }
        .btn-fit:hover:not(:disabled) { background: #2F5540; }
        .btn-fit:disabled { background: #ececea; color: #a0a0a0; cursor: not-allowed; }
        .fit-info { word-break: keep-all; display: flex; gap: 12px; align-items: flex-start; margin-top: 8px; padding: 16px 18px; font-size: 14px; line-height: 1.6; background: #edf4ef; color: #2f5540; }
        .fit-info.no { background: #f4f4f2; color: #6b6b6b; }
        .fit-info b { display: block; font-weight: 600; margin-bottom: 2px; }
        .pd-fitbadge { position: absolute; top: 12px; left: 12px; z-index: 2; background: #fff; color: #3D6A4F; font-size: 12px; font-weight: 500; padding: 5px 10px; }
        .pd-row { display: grid; grid-template-columns: 1fr 52px 52px; gap: 8px; }
        .pd-sec { padding: 48px 0; border-top: 1px solid #eee; display: grid; grid-template-columns: 240px 1fr; gap: 32px; }
        .pd-sec h2 { font-size: 16px; font-weight: 600; margin: 0; }
        .pd-sec li { list-style: none; font-size: 14px; color: #444; line-height: 1.9; }
        .pd-sec table { border-collapse: collapse; width: 100%; font-size: 13px; }
        .pd-sec th, .pd-sec td { padding: 10px 8px; border-bottom: 1px solid #eee; text-align: center; }
        .pd-sec th { color: #8a8a8a; font-weight: 500; }
        .pd-imgs { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; padding: 24px 0 16px; border-top: 1px solid #eee; }
        .pd-img { aspect-ratio: 4/5; background: #f4f4f2; overflow: hidden; }
        .pd-img img { width: 100%; height: 100%; object-fit: cover; }
        @media (max-width: 768px) { .pd-imgs { grid-template-columns: 1fr; } }
        .pd-dl { display: grid; grid-template-columns: 140px 1fr; margin: 0; font-size: 14px; }
        .pd-dl dt, .pd-dl dd { padding: 12px 0; border-bottom: 1px solid #eee; margin: 0; line-height: 1.7; }
        .pd-dl dt { color: #8a8a8a; }
        .pd-note { font-size: 12px; color: #8a8a8a; margin-top: 12px; }
        .bg { position: fixed; inset: 0; background: rgba(0,0,0,.4); z-index: 1000; display: flex; justify-content: flex-end; }
        .dr { width: min(440px, 100vw); height: 100dvh; background: #fff; display: flex; flex-direction: column; }
        .dr-h { padding: 12px 12px 12px 24px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; font-weight: 600; }
        .dr-b { flex: 1; overflow-y: auto; padding: 24px; }
        .dr-f { padding: 16px 24px; border-top: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; }
        .sum { display: flex; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid #eee; font-size: 14px; }
        .sum span:first-child { color: #8a8a8a; }
        .inp { width: 100%; padding: 12px 14px; border: 1px solid #e5e5e5; font-size: 14px; font-family: inherit; margin-bottom: 12px; min-height: 44px; }
        .inp:focus { outline: none; border-color: #111; }
        .note { background: #fafaf8; padding: 14px 16px; font-size: 13px; line-height: 1.7; color: #444; margin-top: 16px; }
        .toast { position: fixed; left: 50%; bottom: 32px; transform: translateX(-50%); background: #111; color: #fff; padding: 12px 20px; font-size: 13px; z-index: 2000; }
        .crumb { font-size: 12px; color: #8a8a8a; padding-top: 20px; }
        @media (max-width: 900px) {
          .pd { grid-template-columns: 1fr; gap: 24px; padding-top: 16px; }
          .pd-info { position: static; }
          .pd-sec { grid-template-columns: 1fr; gap: 12px; padding: 28px 0; }
        }
      `}</style>
      <Navbar />
      <div className="wrap-full">
        <div className="crumb"><a href="/">홈</a> / <a href="/products/new">신상품</a> / {product.name}</div>
        <div className="pd">
          <div>
            <div className="pd-main"
              onMouseEnter={() => setZoom(z => ({ ...z, on: true }))}
              onMouseLeave={() => setZoom({ on: false, x: 50, y: 50 })}
              onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); setZoom({ on: true, x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 }) }}
              onTouchStart={e => { touchX.current = e.touches[0].clientX }}
              onTouchEnd={e => { const d = e.changedTouches[0].clientX - touchX.current; if (Math.abs(d) > 40) go(img + (d < 0 ? 1 : -1)) }}
              tabIndex={0} onKeyDown={e => { if (e.key === 'ArrowLeft') go(img - 1); if (e.key === 'ArrowRight') go(img + 1) }}
              aria-label="상품 이미지, 좌우 방향키로 넘기기">
              <div className="pd-track" style={{ transform: `translateX(-${img * 100}%)` }}>
                {product.images.map((s, i) => (
                  <div key={i} className="pd-slide">
                    <Img src={s} alt={i === img ? product.name : ''}
                      style={i === img ? { transform: zoom.on ? 'scale(2.2)' : 'scale(1)', transformOrigin: `${zoom.x}% ${zoom.y}%`, cursor: zoom.on ? 'zoom-in' : 'default' } : undefined} />
                  </div>
                ))}
              </div>
              <button className="pd-arr l" onClick={() => go(img - 1)} aria-label="이전 이미지">‹</button>
              <button className="pd-arr r" onClick={() => go(img + 1)} aria-label="다음 이미지">›</button>
              {product.fit && <span className="pd-fitbadge">피팅박스 신청 가능</span>}
              <span className="pd-cnt">{img + 1} / {product.images.length}</span>
            </div>
            <div className="pd-thumbs">
              {product.images.map((s, i) => (
                <button key={i} className={'pd-th' + (img === i ? ' on' : '')} onClick={() => go(i)} aria-label={`이미지 ${i + 1}`}><Img src={s.replace('w=900', 'w=200')} alt="" /></button>
              ))}
            </div>
          </div>
          <div className="pd-info">
            <div className="pd-brand">{product.brand}</div>
            <h1>{product.name}</h1>
            {det && <p className="pd-short">{det.short}</p>}
            <div className="pd-price">{dc > 0 && <span className="dc">{dc}%</span>}<b>{product.price.toLocaleString()}원</b>{dc > 0 && <s>{product.original.toLocaleString()}원</s>}</div>
            <div className="lbl"><span>사이즈</span></div>
            <div className="sizes">
              {(sizeNames || product.sizes).map(z => <button key={z} className={'size' + (size === z ? ' on' : '')} onClick={() => setSize(z)}>{z}</button>)}
              {!sizeNames && product.soldout.map(z => <button key={z} className="size" disabled>{z}</button>)}
            </div>
            <div className={'fit-info' + (product.fit ? '' : ' no')} style={{ marginTop: 0, marginBottom: 12 }}>
              {product.fit ? (
                <div><b>피팅박스 신청 가능</b>집에서 48시간 입어보고, 마음에 들면 구매를 확정하세요. 구매를 확정한 제품만 결제됩니다.</div>
              ) : (
                <div><b>피팅박스 신청 불가</b>이 제품은 피팅박스로 받아볼 수 없어요. 바로 구매로 이용해 주세요.</div>
              )}
            </div>
            <div className="pd-btns">
              <button className="btn-fit" disabled={!product.fit} onClick={() => product.fit && openDrawer('fit')}>{product.fit ? '피팅박스 신청' : '피팅박스 신청 불가 제품'}</button>
              <button className="btn-s" onClick={() => { if (!size) { say('사이즈를 먼저 선택해 주세요'); return } if (cp) { addCart(cp.id, size); say('장바구니에 담았어요') } }}>장바구니 담기</button>
              <div className="pd-row">
                <button className="btn-p" onClick={() => openDrawer('buy')}>바로 구매</button>
                <button className="btn-s" onClick={() => { if (!cp) return; toggleWish(cp.id); say(wish ? '찜을 해제했어요' : '찜했어요') }} aria-label="찜하기" style={{ padding: 0, color: wish ? '#c04b4b' : undefined }}>{wish ? '♥' : '♡'}</button>
                <button className="btn-s" onClick={share} aria-label="공유하기" style={{ padding: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7"/><path d="M16 6l-4-4-4 4"/><path d="M12 2v13"/></svg>
                </button>
              </div>
            </div>
            
          </div>
        </div>

        <div className="pd-imgs">
          {pickDetail(params?.id).map((src, i) => <div key={i} className="pd-img"><Img src={src} alt={`${product.name} 상세 이미지 ${i + 1}`} /></div>)}
        </div>
        <p className="pd-note" style={{ margin: '0 0 40px' }}>상세 이미지는 샘플입니다. 입점 브랜드가 등록한 실제 상세 이미지로 교체됩니다.</p>
        <div className="pd-sec"><h2>상세 정보</h2>
          <div>
            <dl className="pd-dl">
              <dt>브랜드</dt><dd>{product.brand}</dd>
              <dt>제품명</dt><dd>{product.name}</dd>
              <dt>소재(혼용율)</dt><dd>{(det ? det.fabric : product.info).map(t => <div key={t}>{t}</div>)}</dd>
              <dt>세탁 방법</dt><dd>{(det ? det.care : product.care).map(t => <div key={t}>{t}</div>)}</dd>
              <dt>색상</dt><dd>상세 이미지 참고</dd>
              <dt>제조국</dt><dd>입점 브랜드 등록 정보 기준</dd>
            </dl>
            <p className="pd-note">현재 표시된 상세 정보는 화면 구성을 위한 샘플이며, 입점 브랜드가 등록한 실제 정보로 교체됩니다.</p>
          </div>
        </div>
        <div className="pd-sec"><h2>사이즈 가이드</h2>
          <div>
            <table><thead><tr><th>cm</th>{(det ? det.head : ['총장', '가슴', '어깨', '소매', '밑단']).map(h => <th key={h}>{h}</th>)}</tr></thead>
              <tbody>{(det ? det.table : product.table).map(r => <tr key={r[0]}>{r.map((c, i) => i === 0 ? <th key={i}>{c}</th> : <td key={i}>{c}</td>)}</tr>)}</tbody></table>
            <p className="pd-note">측정 방법에 따라 1~3cm 차이가 날 수 있어요. 사이즈가 고민되면 피팅박스로 입어보세요.</p>
          </div>
        </div>
        <div className="pd-sec"><h2>배송·반납</h2><div><p style={{ fontSize: 14, color: '#444', lineHeight: 1.8, margin: 0 }}>배송, 교환, 반품, 피팅박스 반납 조건은 서비스 오픈 전에 확정해 안내합니다.</p><p className="pd-note">이 페이지의 제품 정보는 화면 구성을 위한 샘플입니다.</p></div></div>

        <div style={{ borderTop: '1px solid #eee', padding: '48px 0 72px' }}>
          <h2 className="sec-title" style={{ fontSize: 22, fontWeight: 600, margin: '0 0 24px' }}>함께 보면 좋은 제품</h2>
          <div className="grid-full" style={{ padding: 0 }}>{related.map(p => <ProductCard key={p.id} p={p} />)}</div>
        </div>
      </div>

      {drawer && (
        <div className="bg" onClick={closeDrawer}>
          <div className="dr" role="dialog" aria-modal="true" onClick={e => e.stopPropagation()}>
            <div className="dr-h">
              <span>{done ? (drawer === 'fit' ? '신청이 접수됐어요' : '주문 화면 예시') : drawer === 'fit' ? `피팅박스 신청 (${step}/2)` : '주문 확인'}</span>
              <button style={{ width: 44, height: 44, fontSize: 18 }} onClick={closeDrawer} aria-label="닫기">✕</button>
            </div>
            <div className="dr-b">
              {done ? (
                <div>
                  <p style={{ fontSize: 14, color: '#6b6b6b', lineHeight: 1.7, margin: '0 0 20px' }}>
                    {drawer === 'fit' ? '접수 상태는 알림으로 알려드려요. 실제 일정은 서비스 오픈 시 확정됩니다.' : '현재는 결제가 연결되지 않은 화면 예시입니다.'}
                  </p>
                  <button className="btn-p" style={{ width: '100%' }} onClick={closeDrawer}>확인</button>
                </div>
              ) : (
                <div>
                  <div style={{ display: 'flex', gap: 14, padding: 14, background: '#fafaf8', marginBottom: 20 }}>
                    <Img src={product.images[0].replace('w=900', 'w=200')} alt="" style={{ width: 64, height: 80, objectFit: 'cover' }} />
                    <div><div className="pc-brand">{product.brand}</div><div style={{ fontSize: 14, fontWeight: 500, margin: '2px 0 4px' }}>{product.name}</div><div style={{ fontSize: 14, fontWeight: 600 }}>{product.price.toLocaleString()}원</div></div>
                  </div>
                  {drawer === 'fit' && step === 2 ? (
                    <div>
                      <input className="inp" placeholder="받는 분" />
                      <input className="inp" type="tel" placeholder="연락처" />
                      <input className="inp" placeholder="주소" />
                      <input className="inp" placeholder="상세 주소" />
                    </div>
                  ) : (
                    <div>
                      <div className="sum"><span>사이즈</span><span>{size}</span></div>
                      <div className="sum"><span>{drawer === 'fit' ? '착용 기간' : '결제 금액'}</span><span>{drawer === 'fit' ? '수령 후 48시간' : product.price.toLocaleString() + '원'}</span></div>
                      {drawer === 'fit' && <div className="note">구매를 확정한 제품만 결제됩니다. 반납 방법과 비용은 오픈 시 안내됩니다.</div>}
                    </div>
                  )}
                </div>
              )}
            </div>
            {!done && (
              <div className="dr-f">
                <button onClick={() => step > 1 && setStep(step - 1)} style={{ fontSize: 13, color: '#8a8a8a', visibility: step > 1 ? 'visible' : 'hidden', minHeight: 44 }}>이전</button>
                <button className="btn-p" onClick={() => (drawer === 'fit' && step === 1) ? setStep(2) : setDone(true)}>
                  {drawer === 'fit' ? (step === 1 ? '다음' : '신청하기') : '결제하기'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {toast && <div className="toast" role="status">{toast}</div>}
      <Footer />
    </main>
  )
}
