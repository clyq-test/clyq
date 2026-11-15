// @ts-nocheck
'use client'
import AdminShell from '../lib/AdminShell'
import { menus } from './_menus'
import { BRAND } from './_brand'

export default function AdminLayout({ children }) {
  return <AdminShell menus={menus} home="/admin" subtitle={BRAND + ' 브랜드 파트너'} avatar={BRAND[0]} userLabel={BRAND + ' 담당자'}>{children}</AdminShell>
}
