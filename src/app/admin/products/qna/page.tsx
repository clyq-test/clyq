// @ts-nocheck
'use client'
import { useState } from 'react'
import { Page, Kpis, Empty } from '../../../clyq/_ui'
import { useKV, answerInquiry, addInquiry, dt } from '../../../lib/orders'
import { BRAND } from '../../_brand'

export default function ProductQna() {
  const [all] = useKV('clyq_inq', [])
  const [ans, setAns] = useState({})
  const list = all.filter(q => q.type === 'qna' && q.brand === BRAND)
  const open = list.filter(q => !q.answer).length
  return (
    <Page title="Q&A 관리" sub="상품 상세에서 고객이 남긴 상품 문의" actions={<button className="ad-btn" onClick={() => addInquiry({ type: 'qna', brand: BRAND, who: '샘플 고객', text: '사이즈가 어떻게 나오나요?' })}>샘플 문의 만들기</button>}>
      <div className="ad-note">쇼핑몰 상품 상세 하단의 ‘상품 문의’에서 고객이 남긴 질문이 여기로 들어와요. 답변은 고객 화면에 표시됩니다.</div>
      <Kpis items={[{ l: '답변 대기', v: open + '건' }, { l: '전체', v: list.length + '건' }]} />
      <div className="ad-card">
        {list.length === 0 ? <Empty>접수된 문의가 없어요.</Empty> : list.map(q => (
          <div key={q.id} style={{ padding: '16px 20px', borderBottom: '1px solid #f2f2f0' }}>
            <div style={{ fontSize: 13, color: '#767676' }}>{dt(q.at)} · {q.who}{q.orderId ? ' · ' + q.orderId : ''}{q.pid ? ' · 상품 #' + q.pid : ''}</div>
            <p style={{ margin: '6px 0 10px', fontSize: 14, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{q.text}</p>
            {q.answer ? <div className="ad-note" style={{ margin: 0 }}><b>답변</b> ({dt(q.answeredAt)})<br />{q.answer}</div> : (
              <div className="ad-row"><input className="ad-inp" style={{ flex: 1, minWidth: 200 }} placeholder="답변 작성" value={ans[q.id] || ''} onChange={e => setAns({ ...ans, [q.id]: e.target.value })} />
                <button className="ad-btn p" onClick={() => { if ((ans[q.id] || '').trim()) answerInquiry(q.id, ans[q.id].trim()) }}>답변 등록</button></div>)}
          </div>))}
      </div>
    </Page>
  )
}
