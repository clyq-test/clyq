// @ts-nocheck
'use client'
import { useState, useEffect } from 'react'
import AdminShell from '../lib/AdminShell'
import { menus } from './_menus'
import { BRAND, setBrand } from './_brand'
import { BRANDS } from '../lib/catalog'

export default function AdminLayout({ children }) {
  const [ok, setOk] = useState(false)
  useEffect(() => setOk(true), []) // 브랜드 선택값(localStorage)을 읽은 뒤에 그려 서버 화면과 어긋나지 않게 함
  if (!ok) return null
  const sw = (
    <label style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'12px', color:'#A8D5BA' }}>브랜드 전환(테스트)
      <select value={BRAND} onChange={e => setBrand(e.target.value)} aria-label="브랜드 전환(테스트)"
        style={{ background:'#0F3D2E', color:'#F9FCF8', border:'1px solid #4C956C', borderRadius:'4px', padding:'4px 6px', fontSize:'12px', fontFamily:'inherit' }}>
        {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
      </select>
    </label>
  )
  return <AdminShell menus={menus} home="/admin" subtitle={BRAND + ' 브랜드 파트너'} avatar={BRAND[0]} userLabel={BRAND + ' 담당자'} extra={sw}>{children}</AdminShell>
}
