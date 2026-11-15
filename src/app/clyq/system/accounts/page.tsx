// @ts-nocheck
'use client'
import { useState } from 'react'
import { Page, Badge, Empty } from '../../_ui'
import { useKV, logAct, dt } from '../../../lib/orders'

const ROLES = ['최고관리자', '운영', '물류·검수', '정산', '열람 전용']
export default function Accounts() {
  const [list, setList] = useKV('clyq_admins', [{ id: 'a1', name: 'CLYQ 관리자', email: '', role: '최고관리자', active: true, at: new Date(0).toISOString() }])
  const [f, setF] = useState({ name: '', email: '', role: ROLES[1] })
  const add = () => { if (!f.name.trim()) return; setList([...list, { id: 'a' + Date.now().toString(36), ...f, active: true, at: new Date().toISOString() }]); logAct(`관리자 계정 추가 ${f.name}(${f.role})`); setF({ name: '', email: '', role: ROLES[1] }) }
  return (
    <Page title="관리자 계정" sub="담당자와 권한 목록">
      <div className="ad-note"><b>중요:</b> 현재 본사 관리 화면에는 로그인 보호가 없어요. 이 목록은 담당자·권한을 기록하는 용도이고, 실제 접근 차단은 인증(로그인) 연동 후에 적용됩니다. 실제 고객 주문을 받기 전에 반드시 인증을 붙여야 해요.</div>
      <div className="ad-card">
        <div className="ad-bar">
          <input className="ad-inp" placeholder="이름" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} />
          <input className="ad-inp" placeholder="이메일" value={f.email} onChange={e => setF({ ...f, email: e.target.value })} />
          <select className="ad-inp" value={f.role} onChange={e => setF({ ...f, role: e.target.value })}>{ROLES.map(r => <option key={r}>{r}</option>)}</select>
          <button className="ad-btn p" onClick={add}>계정 추가</button>
        </div>
        {list.length === 0 ? <Empty>등록된 계정이 없어요.</Empty> : (
          <div className="ad-scroll"><table className="ad-tbl"><thead><tr><th>이름</th><th>이메일</th><th>권한</th><th className="ad-c">상태</th><th>관리</th></tr></thead>
            <tbody>{list.map(a => <tr key={a.id}><td><b>{a.name}</b></td><td>{a.email || '-'}</td>
              <td><select className="ad-inp" value={a.role} onChange={e => setList(list.map(x => x.id === a.id ? { ...x, role: e.target.value } : x))}>{ROLES.map(r => <option key={r}>{r}</option>)}</select></td>
              <td className="ad-c"><Badge s={a.active ? '사용중' : '중지'} t={a.active ? 'g' : 'n'} /></td>
              <td><div className="ad-row"><button className="ad-btn s" onClick={() => setList(list.map(x => x.id === a.id ? { ...x, active: !x.active } : x))}>{a.active ? '중지' : '사용'}</button>
                {a.id !== 'a1' && <button className="ad-btn d s" onClick={() => { if (confirm(a.name + ' 계정을 삭제할까요?')) setList(list.filter(x => x.id !== a.id)) }}>삭제</button>}</div></td></tr>)}</tbody></table></div>
        )}
      </div>
    </Page>
  )
}
