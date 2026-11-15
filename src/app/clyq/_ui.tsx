// @ts-nocheck
'use client'
import { tone } from '../lib/orders'

export function Page({ title, sub, actions, children }) {
  return (
    <div>
      <div className="ad-head">
        <div>{sub && <div className="ad-sub">{sub}</div>}<h1 className="ad-h1">{title}</h1></div>
        {actions && <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{actions}</div>}
      </div>
      {children}
    </div>
  )
}
export function Kpis({ items }) {
  return <div className="ad-kpis">{items.map(k => <div key={k.l} className="ad-kpi"><div className="ad-kl">{k.l}</div><div className="ad-kv">{k.v}</div>{k.s && <div className="ad-ks">{k.s}</div>}</div>)}</div>
}
export function Badge({ s, t }) { return <span className={'ad-badge ' + (t || tone(s))}>{s}</span> }
export function Empty({ children }) { return <div className="ad-empty">{children}</div> }
export function Modal({ title, onClose, children, wide }) {
  return (
    <div className="ad-mbg" onClick={onClose}>
      <div className="ad-modal" style={wide ? { maxWidth: 760 } : null} onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="ad-mh"><b>{title}</b><button className="ad-x" onClick={onClose} aria-label="닫기">✕</button></div>
        <div className="ad-mb">{children}</div>
      </div>
    </div>
  )
}
export const itemsText = o => o.items.length ? o.items[0].name + (o.items.length > 1 ? ` 외 ${o.items.length - 1}` : '') : '-'
