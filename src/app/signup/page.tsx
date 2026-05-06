// @ts-nocheck
'use client'
import { useState } from 'react'
import Navbar from '../components/Navbar'

const TERMS = {
  service: `제1조 (목적)
본 약관은 CLYQ(이하 "회사")가 제공하는 피팅박스 서비스 및 쇼핑 서비스(이하 "서비스")의 이용 조건 및 절차에 관한 사항을 규정함을 목적으로 합니다.

제2조 (서비스 이용)
① 회원은 회사가 정한 절차에 따라 서비스를 이용할 수 있습니다.
② 회원은 서비스 이용 시 관련 법령 및 본 약관을 준수해야 합니다.

제3조 (피팅박스 서비스)
① 피팅박스 서비스란 회원이 제품을 구매하기 전에 일정 기간 착용해볼 수 있는 서비스입니다.
② 피팅 기간은 수령일을 포함하여 3일이며, 기간 초과 시 자동 구매 확정 처리됩니다.
③ 피팅박스 서비스는 무료이나, 제품 구매 확정 시 해당 제품 금액이 결제됩니다.`,

  privacy: `개인정보보호법에 따라 CLYQ에 회원가입을 신청하시는 분께 수집하는 개인정보의 항목, 목적, 보유기간 등에 대하여 안내 드립니다.

1. 수집하는 개인정보 항목
· 필수: 이메일, 비밀번호, 이름, 휴대폰번호
· 선택: 생년월일, 성별, 주소, 체형 정보

2. 수집 목적
· 서비스 제공 및 회원관리
· 피팅박스 배송 및 수거 처리
· 구매 확정 및 결제 처리

3. 보유 기간
· 회원 탈퇴 시까지 (단, 관련 법령에 따라 일정 기간 보관)`,

  fitting: `[ 피팅박스 제품 관리 약관 — 필수 동의 ]

제1조 (목적)
본 약관은 CLYQ 피팅박스 서비스 이용 시 제품 관리 책임 및 손상·훼손 발생 시의 처리 기준을 명확히 하기 위해 제정되었습니다.

제2조 (제품 상태 확인)
① 회원은 피팅박스 수령 즉시 제품 상태를 확인해야 합니다.
② 수령 시 이미 존재하던 하자는 24시간 이내에 CLYQ 고객센터에 신고해야 하며, 미신고 시 정상 수령으로 간주됩니다.

제3조 (제품 관리 책임)
① 회원은 피팅 기간 동안 제품을 선량한 관리자의 주의로 보관·관리해야 합니다.
② 다음의 행위는 절대 금지됩니다:
   - 세탁, 드라이클리닝, 수선, 리폼
   - 향수, 화장품, 오일 등 약품류의 직접 접촉
   - 고의적 훼손 또는 타인 전달
   - 동물 접촉 또는 흡연 환경 노출

제4조 (손상·훼손 시 패널티)
① 반납된 제품이 아래 기준에 해당하는 경우, 회원에게 배상 책임이 발생합니다:

   [경미한 손상 — 제품 정가의 30% 배상]
   · 단순 세탁으로 복원 불가능한 이염, 오염
   · 스트레칭으로 인한 원단 변형
   · 소재 특성상 복원 불가능한 구김

   [중대한 손상 — 제품 정가의 70~100% 배상]
   · 찢어짐, 구멍, 절단
   · 단추·지퍼·부자재 파손
   · 심각한 오염(혈액, 유분 등 복원 불가 상태)
   · 분실

   [고의적 훼손 — 제품 정가의 100% 배상 + 손해배상 청구]
   · 고의로 제품을 훼손한 사실이 확인된 경우

② 배상금액은 피팅박스 신청 시 등록된 결제 수단으로 자동 청구됩니다.

제5조 (법적 조치)
① 아래의 경우 CLYQ는 민·형사상 법적 조치를 취할 수 있습니다:
   · 제품 반납 거부 또는 고의 지연 (3일 초과)
   · 반납 제품 교체 또는 위조
   · 피팅박스 제품을 제3자에게 판매하거나 대여한 경우
   · 고의 훼손 후 정상 반납을 주장하는 허위 신고

② 법적 조치에는 다음이 포함될 수 있습니다:
   · 손해배상 청구 소송 (민사)
   · 사기·횡령·재물손괴 혐의로 형사 고소
   · 신용정보기관 등록 및 채권추심

제6조 (분쟁 해결)
① 본 약관과 관련된 분쟁은 대한민국 법률에 따르며, 관할 법원은 서울중앙지방법원으로 합니다.
② CLYQ는 분쟁 발생 시 먼저 고객센터를 통한 원만한 해결을 시도하며, 합의가 이루어지지 않을 경우 법적 절차를 진행합니다.

본 약관에 동의함으로써 회원은 피팅박스 제품에 대한 관리 책임을 인지하고 수락한 것으로 간주됩니다.`,

  marketing: `CLYQ의 신상품, 프로모션, 이벤트 등의 마케팅 정보를 이메일, SMS, 카카오 알림톡으로 수신하는 것에 동의합니다. 동의하지 않아도 서비스 이용에 제한이 없으며, 언제든지 수신 거부할 수 있습니다.`,
}

export default function SignupPage() {
  const [step, setStep] = useState(1)
  const [agreements, setAgreements] = useState({service:false, privacy:false, fitting:false, marketing:false})
  const [allChecked, setAllChecked] = useState(false)
  const [expandedTerm, setExpandedTerm] = useState<string|null>(null)
  const [form, setForm] = useState({name:'',email:'',pw:'',pw2:'',phone:'',birthdate:'',gender:'',referral:''})
  const [errors, setErrors] = useState<any>({})
  const [done, setDone] = useState(false)
  const [pwVisible, setPwVisible] = useState(false)

  function toggleAll(checked: boolean) {
    setAllChecked(checked)
    setAgreements({service:checked, privacy:checked, fitting:checked, marketing:checked})
  }

  function toggleOne(key: string, checked: boolean) {
    const next = {...agreements, [key]: checked}
    setAgreements(next)
    setAllChecked(Object.values(next).every(Boolean))
  }

  function canProceed() {
    return agreements.service && agreements.privacy && agreements.fitting
  }

  function validateStep2() {
    const errs: any = {}
    if (!form.name.trim()) errs.name = '이름을 입력해주세요'
    if (!form.email.includes('@')) errs.email = '올바른 이메일을 입력해주세요'
    if (form.pw.length < 8) errs.pw = '비밀번호는 8자 이상이어야 해요'
    if (form.pw !== form.pw2) errs.pw2 = '비밀번호가 일치하지 않아요'
    if (form.phone.length < 10) errs.phone = '올바른 휴대폰 번호를 입력해주세요'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const termItems = [
    {key:'service', label:'[필수] 서비스 이용약관', required:true},
    {key:'privacy', label:'[필수] 개인정보 수집·이용 동의', required:true},
    {key:'fitting', label:'[필수] 피팅박스 제품 관리 약관', required:true, highlight:true},
    {key:'marketing', label:'[선택] 마케팅 정보 수신 동의', required:false},
  ]

  return (
    <main style={{background:'#fafafa',minHeight:'100vh'}}>
      <style>{`
        .su-wrap { max-width:560px; margin:0 auto; padding:40px 20px 80px; }
        .su-title { font-family:Georgia,serif; font-size:28px; font-weight:300; color:#111; margin-bottom:6px; text-align:center; }
        .su-sub { font-size:13px; color:#999; text-align:center; margin-bottom:32px; }
        .su-step { display:flex; align-items:center; justify-content:center; gap:0; margin-bottom:36px; }
        .su-step-item { display:flex; flex-direction:column; align-items:center; gap:4px; }
        .su-step-num { width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:500; }
        .su-step-num.on { background:#111; color:#fff; }
        .su-step-num.done { background:#2a7a50; color:#fff; }
        .su-step-num.off { background:#e8e8e8; color:#999; }
        .su-step-label { font-size:10px; color:#999; }
        .su-step-label.on { color:#111; font-weight:500; }
        .su-step-line { width:48px; height:1px; background:#e8e8e8; margin:0 4px; margin-bottom:14px; }
        .su-card { background:#fff; border:1px solid #e8e8e8; padding:28px; margin-bottom:16px; }
        .su-input-wrap { margin-bottom:14px; }
        .su-label { font-size:11px; font-weight:500; color:#555; margin-bottom:6px; display:flex; justify-content:space-between; align-items:center; }
        .su-input { width:100%; padding:12px 14px; border:1px solid #e8e8e8; font-size:13px; outline:none; font-family:inherit; transition:border-color .15s; }
        .su-input:focus { border-color:#111; }
        .su-input.error { border-color:#e74c3c; }
        .su-error { font-size:11px; color:#e74c3c; margin-top:4px; }
        .su-btn { width:100%; padding:14px; background:#111; color:#fff; font-size:14px; font-weight:500; border:none; cursor:pointer; font-family:inherit; transition:background .2s; }
        .su-btn:hover { background:#C94E1A; }
        .su-btn:disabled { background:#ccc; cursor:not-allowed; }
        .su-btn-outline { width:100%; padding:13px; border:1px solid #e8e8e8; background:#fff; color:#666; font-size:13px; cursor:pointer; font-family:inherit; margin-top:8px; }
        .su-btn-outline:hover { border-color:#111; color:#111; }
        /* 약관 체크박스 */
        .term-all { display:flex; align-items:center; gap:10px; padding:16px; background:#f9f7f4; border-radius:2px; margin-bottom:16px; cursor:pointer; }
        .term-item { display:flex; align-items:center; gap:10px; padding:10px 0; border-bottom:1px solid #f5f5f5; }
        .term-item:last-child { border-bottom:none; }
        .cbox { width:18px; height:18px; border:1.5px solid #ccc; border-radius:2px; display:flex; align-items:center; justify-content:center; flex-shrink:0; cursor:pointer; transition:all .15s; }
        .cbox.on { background:#111; border-color:#111; color:#fff; }
        .cbox.highlight.on { background:#C94E1A; border-color:#C94E1A; }
        .term-label { font-size:13px; color:#333; flex:1; cursor:pointer; }
        .term-label.highlight { font-weight:500; color:#C94E1A; }
        .term-expand { font-size:11px; color:#999; cursor:pointer; text-decoration:underline; flex-shrink:0; }
        .term-expand:hover { color:#111; }
        .term-content { background:#f9f9f9; border:1px solid #f0f0f0; padding:14px 16px; font-size:11px; color:#666; line-height:1.9; white-space:pre-wrap; max-height:200px; overflow-y:auto; margin:8px 0; font-weight:300; }
        .term-highlight-banner { background:#fff5f2; border-left:3px solid #C94E1A; padding:12px 14px; margin-bottom:16px; font-size:12px; color:#333; line-height:1.7; }
        /* 완료 */
        .su-done { text-align:center; padding:40px 0; }
        .su-done-icon { width:72px; height:72px; border-radius:50%; background:#2a7a50; display:flex; align-items:center; justify-content:center; font-size:28px; margin:0 auto 20px; color:#fff; }
        @media (max-width:768px) {
          .su-wrap { padding:24px 16px 80px; }
          .su-card { padding:20px 16px; }
        }
      `}</style>

      <Navbar />

      <div className="su-wrap">
        <div className="su-title">CLY<span style={{color:'#C94E1A'}}>Q</span></div>
        <div className="su-sub">회원가입</div>

        {/* 스텝 표시 */}
        <div className="su-step">
          {['약관 동의','정보 입력','가입 완료'].map((label,i) => (
            <div key={i} style={{display:'flex',alignItems:'center'}}>
              <div className="su-step-item">
                <div className={`su-step-num ${done?'done':step===i+1?'on':step>i+1?'done':'off'}`}>
                  {done || step > i+1 ? '✓' : i+1}
                </div>
                <div className={`su-step-label ${step===i+1&&!done?'on':''}`}>{label}</div>
              </div>
              {i < 2 && <div className="su-step-line"/>}
            </div>
          ))}
        </div>

        {/* STEP 1 — 약관 동의 */}
        {step === 1 && (
          <>
            <div className="su-card">
              {/* 피팅 약관 강조 배너 */}
              <div className="term-highlight-banner">
                <strong>📦 피팅박스 제품 관리 약관을 반드시 확인해주세요</strong><br/>
                CLYQ의 피팅박스 제품은 다수의 회원이 공유하는 제품입니다. 훼손·손상 발생 시 배상 책임이 발생하며, 고의적 훼손의 경우 법적 조치가 취해질 수 있습니다.
              </div>

              {/* 전체 동의 */}
              <div className="term-all" onClick={() => toggleAll(!allChecked)}>
                <div className={`cbox ${allChecked?'on':''}`}>{allChecked&&'✓'}</div>
                <div style={{fontWeight:600,fontSize:'14px',color:'#111'}}>전체 동의하기</div>
                <div style={{fontSize:'11px',color:'#999',marginLeft:'auto'}}>(필수 3개 + 선택 1개)</div>
              </div>

              {/* 개별 약관 */}
              <div>
                {termItems.map(item => (
                  <div key={item.key}>
                    <div className="term-item">
                      <div className={`cbox ${agreements[item.key]?'on':''} ${item.highlight?'highlight':''}`}
                        onClick={() => toggleOne(item.key, !agreements[item.key])}>
                        {agreements[item.key]&&'✓'}
                      </div>
                      <div className={`term-label ${item.highlight?'highlight':''}`}
                        onClick={() => toggleOne(item.key, !agreements[item.key])}>
                        {item.label}
                      </div>
                      <span className="term-expand"
                        onClick={() => setExpandedTerm(expandedTerm===item.key?null:item.key)}>
                        {expandedTerm===item.key?'접기':'보기'}
                      </span>
                    </div>
                    {expandedTerm === item.key && (
                      <div className="term-content">
                        {TERMS[item.key as keyof typeof TERMS]}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button className="su-btn" disabled={!canProceed()} onClick={() => setStep(2)}>
              동의하고 계속하기
            </button>
            <div style={{textAlign:'center',fontSize:'12px',color:'#999',marginTop:'12px'}}>
              이미 회원이신가요?{' '}
              <a href="/" style={{color:'#C94E1A',fontWeight:500,cursor:'pointer',textDecoration:'none'}}>로그인</a>
            </div>
          </>
        )}

        {/* STEP 2 — 정보 입력 */}
        {step === 2 && (
          <>
            <div className="su-card">
              <div style={{fontSize:'14px',fontWeight:500,marginBottom:'20px',color:'#111'}}>기본 정보</div>

              {/* 이름 */}
              <div className="su-input-wrap">
                <div className="su-label">이름 <span style={{color:'#e74c3c'}}>*</span></div>
                <input className={`su-input ${errors.name?'error':''}`} type="text" placeholder="실명을 입력해주세요"
                  value={form.name} onChange={e => setForm({...form,name:e.target.value})}/>
                {errors.name && <div className="su-error">{errors.name}</div>}
              </div>

              {/* 이메일 */}
              <div className="su-input-wrap">
                <div className="su-label">이메일 <span style={{color:'#e74c3c'}}>*</span></div>
                <input className={`su-input ${errors.email?'error':''}`} type="email" placeholder="example@clyq.com"
                  value={form.email} onChange={e => setForm({...form,email:e.target.value})}/>
                {errors.email && <div className="su-error">{errors.email}</div>}
              </div>

              {/* 비밀번호 */}
              <div className="su-input-wrap">
                <div className="su-label">
                  비밀번호 <span style={{color:'#e74c3c'}}>*</span>
                  <span style={{fontSize:'11px',color:'#999',fontWeight:300,cursor:'pointer'}} onClick={() => setPwVisible(!pwVisible)}>
                    {pwVisible?'숨기기':'보기'}
                  </span>
                </div>
                <input className={`su-input ${errors.pw?'error':''}`} type={pwVisible?'text':'password'} placeholder="8자 이상, 영문+숫자 조합"
                  value={form.pw} onChange={e => setForm({...form,pw:e.target.value})}/>
                {errors.pw && <div className="su-error">{errors.pw}</div>}
                {/* 비밀번호 강도 */}
                {form.pw && (
                  <div style={{marginTop:'6px',display:'flex',gap:'4px'}}>
                    {[form.pw.length>=8, /[A-Z]/.test(form.pw)||/[0-9]/.test(form.pw), /[^a-zA-Z0-9]/.test(form.pw)].map((ok,i) => (
                      <div key={i} style={{flex:1,height:'3px',borderRadius:'2px',background:ok?i<2?'#2a7a50':'#B08D57':'#e8e8e8',transition:'background .3s'}}/>
                    ))}
                  </div>
                )}
              </div>

              {/* 비밀번호 확인 */}
              <div className="su-input-wrap">
                <div className="su-label">비밀번호 확인 <span style={{color:'#e74c3c'}}>*</span></div>
                <input className={`su-input ${errors.pw2?'error':form.pw2&&form.pw===form.pw2?'':''}`} type={pwVisible?'text':'password'} placeholder="비밀번호 다시 입력"
                  value={form.pw2} onChange={e => setForm({...form,pw2:e.target.value})}/>
                {errors.pw2 && <div className="su-error">{errors.pw2}</div>}
                {form.pw2 && form.pw === form.pw2 && !errors.pw2 && (
                  <div style={{fontSize:'11px',color:'#2a7a50',marginTop:'4px'}}>✓ 비밀번호가 일치해요</div>
                )}
              </div>

              {/* 휴대폰 */}
              <div className="su-input-wrap">
                <div className="su-label">휴대폰 번호 <span style={{color:'#e74c3c'}}>*</span></div>
                <div style={{display:'flex',gap:'8px'}}>
                  <input className={`su-input ${errors.phone?'error':''}`} type="tel" placeholder="010-0000-0000" style={{flex:1}}
                    value={form.phone} onChange={e => setForm({...form,phone:e.target.value.replace(/[^0-9-]/g,'')})}/>
                  <button style={{padding:'12px 16px',border:'1px solid #111',background:'#fff',fontSize:'12px',cursor:'pointer',whiteSpace:'nowrap',fontFamily:'inherit'}}>
                    인증
                  </button>
                </div>
                {errors.phone && <div className="su-error">{errors.phone}</div>}
              </div>
            </div>

            {/* 추가 정보 */}
            <div className="su-card">
              <div style={{fontSize:'14px',fontWeight:500,marginBottom:'4px',color:'#111'}}>추가 정보 <span style={{fontSize:'11px',color:'#999',fontWeight:300'}}>(선택)</span></div>
              <div style={{fontSize:'11px',color:'#999',marginBottom:'20px'}}>입력하면 AI 맞춤 추천 정확도가 높아져요</div>

              {/* 생년월일 */}
              <div className="su-input-wrap">
                <div className="su-label">생년월일</div>
                <input className="su-input" type="text" placeholder="YYYYMMDD (예: 19900101)"
                  value={form.birthdate} onChange={e => setForm({...form,birthdate:e.target.value})}/>
              </div>

              {/* 성별 */}
              <div className="su-input-wrap">
                <div className="su-label">성별</div>
                <div style={{display:'flex',gap:'8px'}}>
                  {['여성','남성','선택 안 함'].map(g => (
                    <button key={g} onClick={() => setForm({...form,gender:g})}
                      style={{flex:1,padding:'11px',border:`1px solid ${form.gender===g?'#111':'#e8e8e8'}`,background:form.gender===g?'#111':'#fff',color:form.gender===g?'#fff':'#666',fontSize:'13px',cursor:'pointer',fontFamily:'inherit',transition:'all .15s'}}>
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* 추천인 */}
              <div className="su-input-wrap" style={{marginBottom:0}}>
                <div className="su-label">추천인 코드 <span style={{fontSize:'11px',color:'#B08D57',fontWeight:300}}>입력 시 위디 200P 지급</span></div>
                <input className="su-input" type="text" placeholder="추천인 코드 (선택)"
                  value={form.referral} onChange={e => setForm({...form,referral:e.target.value})}/>
              </div>
            </div>

            {/* 피팅 약관 동의 확인 배너 */}
            <div style={{background:'#fff8f5',border:'1px solid rgba(201,78,26,.2)',padding:'14px 16px',fontSize:'12px',color:'#333',lineHeight:1.7,marginBottom:'16px'}}>
              <strong>📦 피팅박스 제품 관리 약관에 동의하셨습니다.</strong><br/>
              피팅 제품 훼손 시 배상 책임이 발생하며, 고의적 훼손의 경우 법적 조치가 취해질 수 있습니다. 피팅 기간(3일) 내 반납 부탁드립니다.
            </div>

            <button className="su-btn" onClick={() => { if(validateStep2()) { setStep(3); setDone(true) } }}>
              가입 완료하기
            </button>
            <button className="su-btn-outline" onClick={() => setStep(1)}>← 이전 단계</button>
          </>
        )}

        {/* STEP 3 — 완료 */}
        {step === 3 && done && (
          <div className="su-card">
            <div className="su-done">
              <div className="su-done-icon">✓</div>
              <div style={{fontSize:'24px',fontWeight:400,marginBottom:'8px'}}>
                환영합니다, <strong>{form.name||'회원'}</strong>님!
              </div>
              <div style={{fontSize:'13px',color:'#999',marginBottom:'8px'}}>
                CLYQ 회원이 되셨어요 🎉
              </div>
              <div style={{background:'#f9f7f4',padding:'16px',marginBottom:'24px'}}>
                <div style={{fontSize:'12px',color:'#666',lineHeight:1.8}}>
                  가입 축하 혜택이 지급됐어요<br/>
                  <strong style={{color:'#B08D57'}}>💛 위디 포인트 500P</strong> 자동 적립<br/>
                  {agreements.marketing && <><strong style={{color:'#B08D57'}}>💛 마케팅 동의 보너스 100P</strong> 추가 적립<br/></>}
                  {form.referral && <><strong style={{color:'#B08D57'}}>💛 추천인 코드 보너스 200P</strong> 추가 적립<br/></>}
                </div>
              </div>
              <a href="/" style={{display:'block',width:'100%',padding:'14px',background:'#111',color:'#fff',fontSize:'14px',fontWeight:500,textDecoration:'none',textAlign:'center',marginBottom:'8px'}}>
                쇼핑 시작하기
              </a>
              <a href="/fitting" style={{display:'block',width:'100%',padding:'13px',border:'1px solid #e8e8e8',color:'#666',fontSize:'13px',textDecoration:'none',textAlign:'center'}}>
                📦 피팅박스 신청하러 가기
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
