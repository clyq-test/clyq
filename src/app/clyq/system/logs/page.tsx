// @ts-nocheck
'use client'
import { useState } from 'react'
import { Page, Empty } from '../../_ui'
import { useKV, dt } from '../../../lib/orders'

export default function Logs() {
  const [log] = useKV('clyq_log', [])
  const [q, setQ] = useState('')
  const list = log.filter(l => !q || (l.text + l.by).includes(q))
  return (
    <Page title="처리 로그" sub="주문·정산·계정 변경 이력 (최근 500건)">
      <div className="ad-note">누가 언제 무엇을 처리했는지 기록해요. 로그인(접속) 기록은 인증 연동 후에 추가됩니다. 작업자는 현재 ‘관리자’/‘고객’으로만 구분돼요.</div>
      <div className="ad-card">
        <div className="ad-bar"><input className="ad-inp" style={{ minWidth: 220 }} placeholder="검색 (주문번호·내용)" value={q} onChange={e => setQ(e.target.value)} /></div>
        {list.length === 0 ? <Empty>기록된 로그가 없어요.</Empty> : (
          <div className="ad-scroll"><table className="ad-tbl"><thead><tr><th>일시</th><th>작업자</th><th>내용</th></tr></thead>
            <tbody>{list.map((l, i) => <tr key={i}><td>{dt(l.at)}</td><td>{l.by}</td><td style={{ whiteSpace: 'normal' }}>{l.text}</td></tr>)}</tbody></table></div>
        )}
      </div>
    </Page>
  )
}
