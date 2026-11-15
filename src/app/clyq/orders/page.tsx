// @ts-nocheck
'use client'
import { useState } from 'react'
import { Page, Kpis, Badge, Empty, Modal, itemsText } from '../_ui'
import { useOrders, createOrder, brandStatus, setStatus, nextStatus, patchOrder, addClaim, ALL_STATUS, won, dt, DONE } from '../../lib/orders'
import { allProducts } from '../../lib/catalog'

const SAMPLES = [
  { kind: 'purchase', customer: { name: '김지연', phone: '010-1234-5678', addr: '서울 강남구 테헤란로 1', addr2: '101호' }, pick: [1, 7] },
  { kind: 'fitting', customer: { name: '박서윤', phone: '010-2222-3333', addr: '대전 서구 둔산로 10', addr2: '' }, pick: [2] },
  { kind: 'purchase', customer: { name: '이도현', phone: '010-9876-5432', addr: '부산 해운대구 센텀로 5', addr2: '' }, pick: [11] },
]

export default function Orders() {
  const [orders, , ready] = useOrders()
  const [kind, setKind] = useState('전체')
  const [st, setSt] = useState('전체')
  const [q, setQ] = useState('')
  const [sel, setSel] = useState(null)
  const [ctype, setCtype] = useState('취소')
  const [creason, setCreason] = useState('')
  const [memo, setMemo] = useState('')

  const list = orders.filter(o => (kind === '전체' || (kind === '구매' ? o.kind === 'purchase' : o.kind === 'fitting')) && (st === '전체' || o.status === st) &&
    (!q || (o.id + o.customer.name + o.customer.phone).toLowerCase().includes(q.toLowerCase())))
  const cur = sel && orders.find(o => o.id === sel)
  const today = new Date().toDateString()
  const todayN = orders.filter(o => new Date(o.createdAt).toDateString() === today).length
  const wait = orders.filter(o => ['주문접수', '신청접수'].includes(o.status)).length
  const sales = orders.filter(o => DONE.includes(o.status)).reduce((n, o) => n + o.total, 0)
  const statusList = ['전체', ...new Set([...ALL_STATUS.purchase, ...ALL_STATUS.fitting])]

  function seed() {
    SAMPLES.forEach(s => createOrder({ kind: s.kind, customer: s.customer, sample: true, items: s.pick.map(id => { const p = allProducts.find(x => x.id === id); return { pid: p.id, name: p.name, brand: p.brand, size: 'M', qty: 1, price: p.price } }) }))
  }
  function removeSamples() { patchOrderBulk() }
  function patchOrderBulk() { try { const l = JSON.parse(localStorage.getItem('clyq_orders') || '[]').filter(o => !o.sample); localStorage.setItem('clyq_orders', JSON.stringify(l)); window.dispatchEvent(new Event('clyq-data')) } catch {} }

  return (
    <Page title="전체 주문 조회" sub="쇼핑몰 주문·피팅 신청이 실시간으로 들어와요"
      actions={<><button className="ad-btn" onClick={seed}>샘플 주문 3건 만들기</button>{orders.some(o => o.sample) && <button className="ad-btn d" onClick={removeSamples}>샘플 주문 삭제</button>}</>}>
      <div className="ad-note">주문 데이터는 현재 이 브라우저에 저장돼요. 같은 브라우저에서 쇼핑몰에 주문하면 여기에 바로 나타나지만, 다른 기기·고객의 주문은 서버(DB) 연동 후에 모입니다.</div>
      <Kpis items={[{ l: '오늘 접수', v: todayN + '건' }, { l: '처리 대기(접수)', v: wait + '건' }, { l: '전체 주문', v: orders.length + '건' }, { l: '확정 매출', v: won(sales), s: '배송완료·구매확정 기준' }]} />
      <div className="ad-card">
        <div className="ad-bar">
          {['전체', '구매', '피팅'].map(k => <button key={k} className={'ad-chip' + (kind === k ? ' on' : '')} onClick={() => setKind(k)}>{k}</button>)}
          <select className="ad-inp" value={st} onChange={e => setSt(e.target.value)} aria-label="상태">{statusList.map(s => <option key={s}>{s}</option>)}</select>
          <input className="ad-inp" style={{ marginLeft: 'auto', minWidth: 220 }} placeholder="주문번호·이름·연락처 검색" value={q} onChange={e => setQ(e.target.value)} />
        </div>
        {!ready || list.length === 0 ? <Empty>조건에 맞는 주문이 없어요.<br />쇼핑몰에서 주문하거나 위의 ‘샘플 주문’을 만들어 흐름을 확인해 보세요.</Empty> : (
          <div className="ad-scroll"><table className="ad-tbl">
            <thead><tr><th>주문번호</th><th>접수일시</th><th>구분</th><th>고객</th><th>상품</th><th className="ad-r">금액</th><th className="ad-c">상태</th></tr></thead>
            <tbody>{list.map(o => (
              <tr key={o.id} className="click" onClick={() => { setSel(o.id); setMemo(o.memo || '') }}>
                <td className="ad-mono">{o.id}{o.sample && ' (샘플)'}</td><td>{dt(o.createdAt)}</td><td>{o.kind === 'fitting' ? '피팅' : '구매'}</td>
                <td>{o.customer.name}</td><td>{itemsText(o)}</td><td className="ad-r">{won(o.total)}</td><td className="ad-c"><Badge s={o.status} /></td>
              </tr>))}</tbody>
          </table></div>
        )}
      </div>

      {cur && (
        <Modal title={`${cur.id} · ${cur.kind === 'fitting' ? '피팅박스 신청' : '구매 주문'}`} onClose={() => setSel(null)} wide>
          <dl className="ad-dl">
            <dt>상태</dt><dd><Badge s={cur.status} /> <span style={{ color: '#767676', fontSize: 13 }}>{cur.payment}</span></dd>
            <dt>고객</dt><dd>{cur.customer.name} · {cur.customer.phone}</dd>
            <dt>배송지</dt><dd>{cur.customer.addr} {cur.customer.addr2}</dd>
            <dt>송장</dt><dd>{cur.tracking ? `${cur.tracking.carrier} ${cur.tracking.no}` : '-'}</dd>
            {cur.fitStartAt && <dt>피팅 시작</dt>}{cur.fitStartAt && <dd>{dt(cur.fitStartAt)} (48시간 후 {dt(new Date(new Date(cur.fitStartAt).getTime() + 48 * 3600 * 1000).toISOString())})</dd>}
          </dl>
          <div className="ad-h3">상품</div>
          <div className="ad-scroll"><table className="ad-tbl"><tbody>{cur.items.map((i, k) => <tr key={k}><td>{i.brand}</td><td>{i.name}</td><td>{i.size || '-'}</td><td>{i.qty}개</td><td className="ad-r">{won(i.price * i.qty)}</td></tr>)}
            <tr><td colSpan={4}><b>{cur.kind === 'fitting' ? '구매 확정 시 결제액' : '합계'}</b></td><td className="ad-r"><b>{won(cur.total)}</b></td></tr></tbody></table></div>
          <div className="ad-h3">{cur.kind === 'fitting' ? '피팅박스 처리 (본사)' : '상태 (브랜드가 출고 처리)'}</div>
          {cur.kind === 'fitting' && cur.status !== '구매확정' && cur.status !== '취소' ? (
            <div className="ad-row">
              <select className="ad-inp" value={cur.status} onChange={e => setStatus(cur.id, e.target.value)} aria-label="상태 변경">{ALL_STATUS.fitting.map(s => <option key={s}>{s}</option>)}</select>
              {nextStatus(cur) && <button className="ad-btn p" onClick={() => setStatus(cur.id, nextStatus(cur))}>다음 단계: {nextStatus(cur)}</button>}
              <button className="ad-btn d" onClick={() => { if (confirm('이 주문을 취소 처리할까요?')) setStatus(cur.id, '취소') }}>주문 취소</button>
            </div>
          ) : (
            <div className="ad-row"><Badge s={cur.status} />{cur.status !== '취소' && cur.kind === 'purchase' && cur.status !== '배송완료' && cur.status !== '반품완료' && <button className="ad-btn d" onClick={() => { if (confirm('이 주문을 취소 처리할까요?')) setStatus(cur.id, '취소') }}>주문 취소</button>}</div>
          )}
          {(cur.kind === 'purchase' || cur.ship) && (<>
            <div className="ad-h3">브랜드 출고 현황 (조회 전용)</div>
            <div className="ad-scroll"><table className="ad-tbl"><tbody>{[...new Set(cur.items.map(i => i.brand))].map(b => { const s = cur.ship && cur.ship[b]; return <tr key={b}><td>{b}</td><td><Badge s={brandStatus(cur, b)} /></td><td>{s && s.tracking ? `${s.tracking.carrier} ${s.tracking.no}` : '-'}</td><td>{s && s.source ? s.source : ''}</td></tr> })}</tbody></table></div>
          </>)}
          <div className="ad-h3">클레임 등록 (취소·반품·교환)</div>
          <div className="ad-row">
            <select className="ad-inp" value={ctype} onChange={e => setCtype(e.target.value)}>{['취소', '반품', '교환'].map(s => <option key={s}>{s}</option>)}</select>
            <input className="ad-inp" style={{ flex: 1, minWidth: 160 }} placeholder="사유" value={creason} onChange={e => setCreason(e.target.value)} />
            <button className="ad-btn" onClick={() => { addClaim(cur.id, ctype, creason); setCreason('') }}>등록</button>
          </div>
          {(cur.claims || []).length > 0 && <div className="ad-hist" style={{ marginTop: 8 }}>{cur.claims.map(c => <div key={c.id}>{c.type} · {c.status} · {c.by} · {c.reason || '-'} <a href="/clyq/orders/claims" style={{ textDecoration: 'underline' }}>처리하기</a></div>)}</div>}
          <div className="ad-h3">관리자 메모</div>
          <div className="ad-row"><input className="ad-inp" style={{ flex: 1 }} value={memo} onChange={e => setMemo(e.target.value)} placeholder="내부 메모" />
            <button className="ad-btn" onClick={() => patchOrder(cur.id, o => { o.memo = memo; return o }, '메모 저장')}>저장</button></div>
          <div className="ad-h3">처리 이력</div>
          <div className="ad-hist">{[...(cur.history || [])].reverse().map((h, i) => <div key={i}>{dt(h.at)} · {h.by} · {h.text}</div>)}</div>
        </Modal>
      )}
    </Page>
  )
}
