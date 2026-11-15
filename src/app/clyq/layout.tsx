// @ts-nocheck
'use client'
import AdminShell from '../lib/AdminShell'
import { menus } from './_menus'

export default function ClyqLayout({ children }) {
  return <AdminShell menus={menus} home="/clyq" subtitle="본사 관리" avatar="관" userLabel="CLYQ 관리자">{children}</AdminShell>
}
