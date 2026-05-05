import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CLYQ — 입어보고 결정하는 패션',
  description: 'AI가 취향을 읽고, 집에서 먼저 입어보고, 확실한 것만 구매하는 패션 쇼핑',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Noto+Sans+KR:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}