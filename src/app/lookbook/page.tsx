// @ts-nocheck
'use client'
import Navbar from '../components/Navbar'
import { SharedStyle, Footer } from '../components/ui'

export default function Page() {
  return (
    <main>
      <SharedStyle />
      <Navbar />
      <div className="wrap">
        <div className="page-head"><h1>룩북</h1><p>시즌 스타일 제안을 준비하고 있어요.</p></div>
        <div className="empty">오픈 전 준비 중인 페이지예요. <a href="/products/new" style={{ textDecoration: 'underline' }}>제품 보러가기</a></div>
      </div>
      <Footer />
    </main>
  )
}
