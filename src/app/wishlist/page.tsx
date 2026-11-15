// @ts-nocheck
'use client'
import Navbar from '../components/Navbar'
import { SharedStyle, Footer, ProductCard } from '../components/ui'
import { useShop } from '../lib/store'
import { byId } from '../lib/catalog'

export default function Wishlist() {
  const { wish } = useShop()
  const items = wish.map(byId).filter(Boolean)
  return (
    <main>
      <SharedStyle />
      <Navbar />
      <div className="wrap-full">
        <div className="page-head"><h1>찜한 제품</h1><p>마음에 둔 제품을 모아봤어요. {items.length > 0 && `${items.length}개`}</p></div>
        {items.length === 0 ? (
          <div className="empty">아직 찜한 제품이 없어요.<br /><a href="/products/new" className="btn-p" style={{ marginTop: 20 }}>제품 둘러보기</a></div>
        ) : (
          <div className="grid-full" style={{ paddingTop: 16 }}>{items.map(p => <ProductCard key={p.id} p={p} />)}</div>
        )}
      </div>
      <Footer />
    </main>
  )
}
