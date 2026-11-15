// @ts-nocheck
'use client'
import { Page, Kpis, Badge } from '../../../clyq/_ui'
import { useKV } from '../../../lib/orders'
import { allProducts } from '../../../lib/catalog'
import { BRAND } from '../../_brand'

const SIZES = ['XS', 'S', 'M', 'L', 'XL']
export default function Stock() {
  const [stock, setStock] = useKV('clyq_stock', {})
  const mine = allProducts.filter(p => p.brand === BRAND)
  const get = (id, z) => (stock[id] && stock[id][z]) ?? 0
  const set = (id, z, v) => setStock({ ...stock, [id]: { ...(stock[id] || {}), [z]: Math.max(0, Number(v) || 0) } })
  const total = id => SIZES.reduce((n, z) => n + get(id, z), 0)
  return (
    <Page title="재고관리" sub="사이즈별 판매 재고">
      <div className="ad-note">쇼핑몰에 등록된 {BRAND} 상품(샘플 카탈로그) 기준이에요. 재고 수량은 이 브라우저에 저장되며, 아직 쇼핑몰의 품절 표시나 주문 차감과는 연결되지 않았습니다.</div>
      <Kpis items={[{ l: '관리 상품', v: mine.length + '개' }, { l: '품절 상품', v: mine.filter(p => total(p.id) === 0).length + '개' }, { l: '재고 3개 이하', v: mine.filter(p => total(p.id) > 0 && total(p.id) <= 3).length + '개' }]} />
      <div className="ad-card"><div className="ad-scroll"><table className="ad-tbl">
        <thead><tr><th>상품</th>{SIZES.map(z => <th key={z} className="ad-c">{z}</th>)}<th className="ad-c">합계</th><th className="ad-c">상태</th></tr></thead>
        <tbody>{mine.map(p => <tr key={p.id}><td><b>{p.name}</b><br /><span style={{ color: '#767676', fontSize: 13 }}>{p.fit ? '피팅 가능' : '피팅 불가'}</span></td>
          {SIZES.map(z => <td key={z} className="ad-c"><input className="ad-inp" type="number" min="0" style={{ width: 64, textAlign: 'center' }} value={get(p.id, z)} onChange={e => set(p.id, z, e.target.value)} aria-label={p.name + ' ' + z} /></td>)}
          <td className="ad-c"><b>{total(p.id)}</b></td><td className="ad-c"><Badge s={total(p.id) === 0 ? '품절' : total(p.id) <= 3 ? '부족' : '충분'} t={total(p.id) === 0 ? 'r' : total(p.id) <= 3 ? 'n' : 'g'} /></td></tr>)}</tbody></table></div></div>
    </Page>
  )
}
