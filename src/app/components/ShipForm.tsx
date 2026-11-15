// @ts-nocheck
'use client'
import { useState, useEffect, useRef } from 'react'
import { addrList, fromAddress, newShip, REQ_PRESETS, REQ_CUSTOM } from '../lib/auth'

/* 주소 검색: 카카오(다음) 우편번호 서비스(공개 스크립트, 키 불필요)를 레이어로 띄웁니다.
   스크립트를 불러오지 못하면(차단·오프라인) 직접 입력으로 대체합니다. */
const DAUM_SRC = 'https://t1.kakaocdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
function loadDaum() {
  return new Promise((resolve, reject) => {
    if (window.daum && window.daum.Postcode) return resolve()
    let s = document.querySelector('script[data-daum-postcode]')
    if (!s) { s = document.createElement('script'); s.src = DAUM_SRC; s.async = true; s.dataset.daumPostcode = '1'; document.head.appendChild(s) }
    s.addEventListener('load', () => (window.daum && window.daum.Postcode ? resolve() : reject()))
    s.addEventListener('error', () => { s.remove(); reject() })
  })
}

function AddressSearch({ onPick, onClose }) {
  const box = useRef(null)
  const [failed, setFailed] = useState(false)
  const [man, setMan] = useState({ zip: '', addr: '' })
  useEffect(() => {
    let alive = true
    loadDaum().then(() => {
      if (!alive || !box.current) return
      new window.daum.Postcode({
        width: '100%', height: '100%',
        oncomplete(d) {
          let addr = d.userSelectedType === 'R' ? d.roadAddress : d.jibunAddress
          if (d.userSelectedType === 'R') {
            const extra = []
            if (d.bname && /[동로가]$/.test(d.bname)) extra.push(d.bname)
            if (d.buildingName && d.apartment === 'Y') extra.push(d.buildingName)
            if (extra.length) addr += ` (${extra.join(', ')})`
          }
          onPick({ zip: d.zonecode, addr })
        },
      }).embed(box.current)
    }).catch(() => alive && setFailed(true))
    const esc = e => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', esc)
    return () => { alive = false; window.removeEventListener('keydown', esc) }
  }, [])
  return (
    <div className="sf-bg" onClick={onClose}>
      <div className="sf-pop" role="dialog" aria-modal="true" aria-label="주소 검색" onClick={e => e.stopPropagation()}>
        <div className="sf-pop-h"><b>주소 검색</b><button type="button" onClick={onClose} aria-label="닫기">✕</button></div>
        {failed ? (
          <div className="sf-man">
            <p>주소 검색 서비스를 불러오지 못했어요. 네트워크를 확인하거나 아래에 직접 입력해 주세요.</p>
            <input className="sf-inp" placeholder="우편번호 (선택)" inputMode="numeric" value={man.zip} onChange={e => setMan({ ...man, zip: e.target.value })} />
            <input className="sf-inp" placeholder="기본 주소 (도로명·지번)" value={man.addr} onChange={e => setMan({ ...man, addr: e.target.value })} />
            <button type="button" className="sf-btn" disabled={!man.addr.trim()} onClick={() => onPick({ zip: man.zip.trim(), addr: man.addr.trim() })}>이 주소로 입력</button>
          </div>
        ) : <div ref={box} className="sf-embed" />}
      </div>
    </div>
  )
}

export const SHIP_STYLE = `
  .sf-inp { width: 100%; padding: 12px 14px; border: 1px solid #e5e5e5; font-size: 14px; font-family: inherit; margin-bottom: 10px; min-height: 44px; background: #fff; color: #111; border-radius: 0; }
  .sf-inp:focus { outline: none; border-color: #111; }
  .sf-inp[readonly] { cursor: pointer; background: #fafaf8; }
  .sf-row { display: flex; gap: 8px; }
  .sf-row .sf-inp:first-child { flex: 1; min-width: 0; }
  .sf-btn { flex-shrink: 0; padding: 0 16px; min-height: 44px; background: #111; color: #fff; font-size: 13px; font-weight: 500; border: 0; margin-bottom: 10px; }
  .sf-btn:disabled { background: #ccc; }
  .sf-chips { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px; }
  .sf-chip { padding: 0 12px; min-height: 36px; border: 1px solid #e5e5e5; background: #fff; font-size: 13px; color: #555; border-radius: 18px; }
  .sf-chip.on { border-color: #111; background: #111; color: #fff; }
  .sf-lbl { font-size: 12px; color: #8a8a8a; margin: 4px 0 6px; display: block; }
  .sf-chk { display: flex; gap: 8px; align-items: center; font-size: 13px; color: #444; min-height: 36px; cursor: pointer; }
  .sf-chk input { width: 18px; height: 18px; accent-color: #3D6A4F; }
  .sf-save { background: #fafaf8; padding: 10px 14px; margin-top: 4px; }
  .sf-bg { position: fixed; inset: 0; background: rgba(0,0,0,.5); z-index: 1300; display: flex; align-items: center; justify-content: center; padding: 16px; }
  .sf-pop { background: #fff; width: min(480px, 100%); height: min(560px, 90dvh); display: flex; flex-direction: column; }
  .sf-pop-h { display: flex; justify-content: space-between; align-items: center; padding: 6px 6px 6px 18px; border-bottom: 1px solid #eee; }
  .sf-pop-h button { width: 44px; height: 44px; font-size: 18px; }
  .sf-embed { flex: 1; min-height: 0; }
  .sf-man { padding: 18px; } .sf-man p { font-size: 13px; color: #6b6b6b; line-height: 1.6; margin: 0 0 14px; }
`

/* 배송지 입력 폼 — 피팅박스 신청·바로 구매·장바구니 주문서에서 공통 사용.
   f/setF: shipOf(f)로 주문에 저장할 값을 만들고, saveShip(member.id, f)로 배송지 목록에 저장합니다. */
export default function ShipForm({ f, setF, member, hideSave = false, hidePicker = false }) {
  const [pop, setPop] = useState(false)
  const list = addrList(member)
  const set = patch => setF(prev => ({ ...prev, ...patch }))
  const pick = a => setF(fromAddress(a, member))
  const fresh = () => setF(newShip(member))
  const openSearch = () => setPop(true)
  return (
    <div>
      <style>{SHIP_STYLE}</style>
      {list.length > 0 && !hidePicker && (
        <>
          <span className="sf-lbl">배송지 선택</span>
          <div className="sf-chips">
            {list.map(a => <button type="button" key={a.id} className={'sf-chip' + (f.aid === a.id ? ' on' : '')} onClick={() => pick(a)}>{a.label}{a.def ? ' ★' : ''}</button>)}
            <button type="button" className={'sf-chip' + (!f.aid ? ' on' : '')} onClick={fresh}>+ 새 배송지</button>
          </div>
        </>
      )}
      <input className="sf-inp" placeholder="받는 분" value={f.name} onChange={e => set({ name: e.target.value })} autoComplete="name" />
      <input className="sf-inp" type="tel" placeholder="연락처 (숫자만)" value={f.phone} onChange={e => set({ phone: e.target.value })} autoComplete="tel" />
      <div className="sf-row">
        <input className="sf-inp" placeholder="우편번호" value={f.zip || ''} readOnly onClick={openSearch} aria-label="우편번호" />
        <button type="button" className="sf-btn" onClick={openSearch}>주소 검색</button>
      </div>
      <input className="sf-inp" placeholder="클릭해서 주소 검색" value={f.addr} readOnly onClick={openSearch}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), openSearch())} aria-label="주소" />
      <input className="sf-inp" placeholder="상세 주소 (동·호수 등)" value={f.addr2 || ''} onChange={e => set({ addr2: e.target.value })} />
      <span className="sf-lbl">배송 정보</span>
      <select className="sf-inp" value={f.reqSel || ''} onChange={e => set({ reqSel: e.target.value })} aria-label="배송 요청사항">
        <option value="">배송 요청사항 선택 (선택)</option>
        {REQ_PRESETS.map(r => <option key={r} value={r}>{r}</option>)}
        <option value={REQ_CUSTOM}>{REQ_CUSTOM}</option>
      </select>
      {f.reqSel === REQ_CUSTOM && <input className="sf-inp" maxLength={50} placeholder="요청사항 (50자 이내)" value={f.reqCustom || ''} onChange={e => set({ reqCustom: e.target.value })} />}
      <input className="sf-inp" maxLength={60} placeholder="공동현관 출입방법 (선택, 예: 비밀번호 #1234)" value={f.entry || ''} onChange={e => set({ entry: e.target.value })} />
      {hideSave ? (
        <div className="sf-chips" style={{ margin: '6px 0 10px' }}>
          {['집', '회사', '기타'].map(l => <button type="button" key={l} className={'sf-chip' + (f.label === l ? ' on' : '')} onClick={() => set({ label: l })}>{l}</button>)}
          <label className="sf-chk" style={{ marginLeft: 8 }}><input type="checkbox" checked={!!f.makeDef} onChange={e => set({ makeDef: e.target.checked })} />기본 배송지</label>
        </div>
      ) : <div className="sf-save">
        <label className="sf-chk"><input type="checkbox" checked={!!f.saveAddr} onChange={e => set({ saveAddr: e.target.checked })} />배송지·배송 정보 저장 (다음 주문에 자동 입력)</label>
        {f.saveAddr && (
          <>
            <div className="sf-chips" style={{ margin: '6px 0' }}>
              {['집', '회사', '기타'].map(l => <button type="button" key={l} className={'sf-chip' + (f.label === l ? ' on' : '')} onClick={() => set({ label: l })}>{l}</button>)}
            </div>
            <label className="sf-chk"><input type="checkbox" checked={!!f.makeDef} onChange={e => set({ makeDef: e.target.checked })} />기본 배송지로 설정</label>
          </>
        )}
      </div>}
      {pop && <AddressSearch onClose={() => setPop(false)} onPick={a => { set({ zip: a.zip, addr: a.addr, aid: '' }); setPop(false) }} />}
    </div>
  )
}
