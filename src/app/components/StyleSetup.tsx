// @ts-nocheck
'use client'
import { useState } from 'react'

const steps = [
  {
    id: 'style',
    title: '선호하는 스타일',
    sub: '평소 즐겨 입는 스타일을 선택해주세요 (복수 선택 가능)',
    type: 'multi',
    max: 3,
    options: [
      { value:'minimal', label:'미니멀', icon:'🖤', desc:'깔끔하고 단순한' },
      { value:'casual', label:'캐주얼', icon:'👖', desc:'편안하고 자유로운' },
      { value:'feminine', label:'페미닌', icon:'🌸', desc:'여성스럽고 우아한' },
      { value:'classic', label:'클래식', icon:'👔', desc:'단정하고 격식있는' },
      { value:'street', label:'스트릿', icon:'🧢', desc:'개성있고 트렌디한' },
      { value:'romantic', label:'로맨틱', icon:'🎀', desc:'사랑스럽고 부드러운' },
      { value:'sporty', label:'스포티', icon:'⚡', desc:'활동적이고 실용적인' },
      { value:'luxe', label:'럭셔리', icon:'💎', desc:'고급스럽고 세련된' },
    ]
  },
  {
    id: 'category',
    title: '주로 구매하는 카테고리',
    sub: '관심 있는 카테고리를 선택해주세요 (복수 선택)',
    type: 'multi',
    max: 4,
    options: [
      { value:'outer', label:'아우터', icon:'🧥' },
      { value:'top', label:'상의', icon:'👚' },
      { value:'bottom', label:'하의', icon:'👖' },
      { value:'dress', label:'원피스·세트', icon:'👗' },
      { value:'bag', label:'가방', icon:'👜' },
      { value:'shoes', label:'슈즈', icon:'👠' },
      { value:'jewelry', label:'주얼리', icon:'💍' },
      { value:'acc', label:'액세서리', icon:'🧣' },
    ]
  },
  {
    id: 'color',
    title: '선호하는 컬러',
    sub: '좋아하는 컬러 계열을 선택해주세요',
    type: 'multi',
    max: 3,
    options: [
      { value:'black_white', label:'블랙/화이트', icon:'⬛', color:'#111' },
      { value:'neutral', label:'뉴트럴·베이지', icon:'🟫', color:'#c8b8a0' },
      { value:'earth', label:'어스톤·카키', icon:'🟢', color:'#7a8a6a' },
      { value:'pastel', label:'파스텔', icon:'🩷', color:'#f4c2c2' },
      { value:'vivid', label:'비비드·원색', icon:'🔴', color:'#e74c3c' },
      { value:'navy_blue', label:'네이비·블루', icon:'🔵', color:'#2c3e7a' },
      { value:'brown', label:'브라운·와인', icon:'🟤', color:'#8b4513' },
      { value:'multi', label:'다양하게', icon:'🌈', color:'linear-gradient(90deg,#e74c3c,#3498db,#2a7a50)' },
    ]
  },
  {
    id: 'tpo',
    title: '주로 입는 상황',
    sub: '어떤 상황에서 주로 옷을 구매하나요?',
    type: 'multi',
    max: 3,
    options: [
      { value:'daily', label:'데일리', icon:'☀️', desc:'매일 편하게' },
      { value:'work', label:'출근·비즈니스', icon:'💼', desc:'직장·미팅용' },
      { value:'date', label:'데이트', icon:'💕', desc:'특별한 만남' },
      { value:'weekend', label:'주말·외출', icon:'🛍️', desc:'쇼핑·카페' },
      { value:'travel', label:'여행', icon:'✈️', desc:'국내외 여행' },
      { value:'special', label:'특별한 날', icon:'🎉', desc:'결혼식·파티' },
      { value:'sports', label:'운동·액티비티', icon:'🏃', desc:'야외활동' },
      { value:'home', label:'홈웨어', icon:'🏠', desc:'집에서도 예쁘게' },
    ]
  },
  {
    id: 'body',
    title: '체형 정보',
    sub: 'AI가 정확한 사이즈를 추천해드려요. 건너뛰기 가능해요.',
    type: 'body',
    options: []
  },
  {
    id: 'budget',
    title: '선호 구매 예산',
    sub: '평균적으로 의류 한 벌에 얼마를 지출하나요?',
    type: 'single',
    options: [
      { value:'under30', label:'3만원 미만', icon:'💰' },
      { value:'30_80', label:'3~8만원', icon:'💰💰' },
      { value:'80_150', label:'8~15만원', icon:'💰💰💰' },
      { value:'150_300', label:'15~30만원', icon:'💎' },
      { value:'300_500', label:'30~50만원', icon:'💎💎' },
      { value:'over500', label:'50만원 이상', icon:'💎💎💎' },
    ]
  },
  {
    id: 'brand',
    title: '관심 브랜드',
    sub: '좋아하는 브랜드가 있으면 선택해주세요 (복수 선택)',
    type: 'multi',
    max: 5,
    options: [
      { value:'marcia', label:'MARCIA', icon:'M' },
      { value:'matin_kim', label:'MATIN KIM', icon:'MK' },
      { value:'eenk', label:'EENK', icon:'E' },
      { value:'eight', label:'EIGHT', icon:'8' },
      { value:'anderssonbell', label:'ANDERSSONBELL', icon:'AB' },
      { value:'dpound', label:'D.POUND', icon:'D' },
      { value:'another_a', label:'ANOTHER A', icon:'AA' },
      { value:'ader', label:'ADER ERROR', icon:'AE' },
      { value:'stml', label:'SORRY TOO MUCH LOVE', icon:'S' },
      { value:'no_brand', label:'브랜드보다 스타일', icon:'✨' },
    ]
  },
]

interface StyleSetupProps {
  onComplete: (data: any) => void
  onSkip?: () => void
  defaultValues?: any
  isModal?: boolean
}

export default function StyleSetup({ onComplete, onSkip, defaultValues = {}, isModal = true }: StyleSetupProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [selections, setSelections] = useState<any>(defaultValues || {})
  const [bodyForm, setBodyForm] = useState({
    height: defaultValues?.height || '',
    weight: defaultValues?.weight || '',
    size: defaultValues?.size || '',
  })

  const step = steps[currentStep]
  const totalSteps = steps.length
  const progress = ((currentStep + 1) / totalSteps) * 100

  function toggleOption(value: string) {
    const current = selections[step.id] || []
    if (step.type === 'single') {
      setSelections({ ...selections, [step.id]: [value] })
      return
    }
    if (current.includes(value)) {
      setSelections({ ...selections, [step.id]: current.filter((v: string) => v !== value) })
    } else {
      if (step.max && current.length >= step.max) return
      setSelections({ ...selections, [step.id]: [...current, value] })
    }
  }

  function isSelected(value: string) {
    return (selections[step.id] || []).includes(value)
  }

  function handleNext() {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      const finalData = { ...selections, ...bodyForm }
      localStorage.setItem('clyq_style', JSON.stringify(finalData))
      onComplete(finalData)
    }
  }

  function handlePrev() {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  function canProceed() {
    if (step.type === 'body') return true
    const selected = selections[step.id] || []
    return selected.length > 0
  }

  const inner = (
    <div style={{
      background: '#fff',
      width: isModal ? 'min(560px, 95vw)' : '100%',
      maxHeight: isModal ? '90dvh' : 'none',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      <style>{`
        .ss-opt { border:1.5px solid #e8e8e8; padding:14px; cursor:pointer; display:flex; align-items:center; gap:12px; transition:all .15s; user-select:none; }
        .ss-opt:hover { border-color:#ccc; }
        .ss-opt.on { border-color:#111; background:#fafafa; }
        .ss-opt.on.fit { border-color:#C94E1A; background:#fff5f2; }
        .ss-icon { width:44px; height:44px; display:flex; align-items:center; justify-content:center; font-size:22px; background:#f5f5f5; flex-shrink:0; }
        .ss-check { width:18px; height:18px; border:1.5px solid #ccc; border-radius:2px; display:flex; align-items:center; justify-content:center; font-size:11px; flex-shrink:0; transition:all .15s; margin-left:auto; }
        .ss-check.on { background:#111; border-color:#111; color:#fff; }
        .ss-input { width:100%; padding:12px 14px; border:1px solid #e8e8e8; font-size:14px; outline:none; font-family:inherit; transition:border-color .15s; }
        .ss-input:focus { border-color:#111; }
        .brand-opt { border:1.5px solid #e8e8e8; padding:12px 8px; cursor:pointer; text-align:center; transition:all .15s; }
        .brand-opt:hover { border-color:#ccc; }
        .brand-opt.on { border-color:#111; background:#f9f7f4; }
        @media (max-width: 520px) {
          .ss-grid-2 { grid-template-columns: 1fr 1fr !important; }
          .ss-grid-3 { grid-template-columns: 1fr 1fr !important; }
          .ss-grid-4 { grid-template-columns: 1fr 1fr 1fr !important; }
        }
      `}</style>

      {/* 헤더 */}
      <div style={{ padding: '24px 28px 0', flexShrink: 0 }}>
        {/* 진행바 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <div style={{ flex: 1, height: '4px', background: '#e8e8e8', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ height: '100%', background: 'linear-gradient(90deg,#C94E1A,#B08D57)', width: progress + '%', borderRadius: '2px', transition: 'width .4s' }}/>
          </div>
          <div style={{ fontSize: '11px', color: '#999', flexShrink: 0 }}>{currentStep + 1} / {totalSteps}</div>
        </div>
        <div style={{ fontSize: '10px', letterSpacing: '3px', color: '#C94E1A', fontWeight: 600, marginBottom: '6px' }}>AI 취향 분석</div>
        <div style={{ fontSize: '20px', fontWeight: 500, color: '#111', marginBottom: '6px' }}>{step.title}</div>
        <div style={{ fontSize: '13px', color: '#999', fontWeight: 300, marginBottom: '20px', lineHeight: 1.6 }}>{step.sub}</div>
      </div>

      {/* 옵션 영역 */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 28px' }}>

        {/* 스타일·TPO: 리스트 형태 */}
        {(step.id === 'style' || step.id === 'tpo') && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }} className="ss-grid-2">
            {step.options.map(opt => (
              <div key={opt.value} className={`ss-opt ${isSelected(opt.value) ? 'on' : ''}`}
                onClick={() => toggleOption(opt.value)}>
                <div className="ss-icon">{opt.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: '#111', marginBottom: '2px' }}>{opt.label}</div>
                  {opt.desc && <div style={{ fontSize: '11px', color: '#999', fontWeight: 300 }}>{opt.desc}</div>}
                </div>
                <div className={`ss-check ${isSelected(opt.value) ? 'on' : ''}`}>
                  {isSelected(opt.value) && '✓'}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 카테고리: 그리드 */}
        {step.id === 'category' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '8px', marginBottom: '16px' }} className="ss-grid-4">
            {step.options.map(opt => (
              <div key={opt.value}
                onClick={() => toggleOption(opt.value)}
                style={{
                  border: `1.5px solid ${isSelected(opt.value) ? '#111' : '#e8e8e8'}`,
                  background: isSelected(opt.value) ? '#f9f7f4' : '#fff',
                  padding: '16px 8px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all .15s',
                }}>
                <div style={{ fontSize: '28px', marginBottom: '6px' }}>{opt.icon}</div>
                <div style={{ fontSize: '11px', color: '#333', fontWeight: isSelected(opt.value) ? 500 : 400 }}>{opt.label}</div>
                {isSelected(opt.value) && <div style={{ fontSize: '10px', color: '#C94E1A', marginTop: '2px' }}>✓ 선택됨</div>}
              </div>
            ))}
          </div>
        )}

        {/* 컬러: 컬러 스와치 */}
        {step.id === 'color' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '8px', marginBottom: '16px' }} className="ss-grid-4">
            {step.options.map(opt => (
              <div key={opt.value}
                onClick={() => toggleOption(opt.value)}
                style={{
                  border: `2px solid ${isSelected(opt.value) ? '#111' : '#e8e8e8'}`,
                  padding: '14px 8px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all .15s',
                }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: opt.color,
                  margin: '0 auto 8px',
                  border: '1px solid rgba(0,0,0,.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '18px',
                }}>
                  {opt.color?.includes('gradient') ? '' : ''}
                </div>
                <div style={{ fontSize: '11px', color: '#333', lineHeight: 1.4, fontWeight: isSelected(opt.value) ? 500 : 400 }}>{opt.label}</div>
                {isSelected(opt.value) && <div style={{ fontSize: '10px', color: '#C94E1A', marginTop: '2px' }}>✓</div>}
              </div>
            ))}
          </div>
        )}

        {/* 예산: 단일 선택 */}
        {step.id === 'budget' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
            {step.options.map(opt => (
              <div key={opt.value} className={`ss-opt ${isSelected(opt.value) ? 'on' : ''}`}
                onClick={() => toggleOption(opt.value)}
                style={{ justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '18px' }}>{opt.icon}</span>
                  <span style={{ fontSize: '14px', fontWeight: isSelected(opt.value) ? 500 : 400 }}>{opt.label}</span>
                </div>
                <div className={`ss-check ${isSelected(opt.value) ? 'on' : ''}`} style={{ borderRadius: '50%' }}>
                  {isSelected(opt.value) && '✓'}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 브랜드 */}
        {step.id === 'brand' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '8px', marginBottom: '16px' }} className="ss-grid-2">
            {step.options.map(opt => (
              <div key={opt.value} className={`ss-opt ${isSelected(opt.value) ? 'on' : ''}`}
                onClick={() => toggleOption(opt.value)}>
                <div style={{
                  width: '36px', height: '36px', background: isSelected(opt.value) ? '#111' : '#f5f5f5',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '10px', fontWeight: 700, color: isSelected(opt.value) ? '#fff' : '#666',
                  flexShrink: 0, letterSpacing: '-0.5px',
                }}>
                  {opt.icon}
                </div>
                <span style={{ fontSize: '12px', fontWeight: isSelected(opt.value) ? 500 : 400, flex: 1 }}>{opt.label}</span>
                <div className={`ss-check ${isSelected(opt.value) ? 'on' : ''}`}>
                  {isSelected(opt.value) && '✓'}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 체형 정보 */}
        {step.id === 'body' && (
          <div style={{ marginBottom: '16px' }}>
            <div style={{ background: '#f9f7f4', padding: '14px', fontSize: '12px', color: '#666', lineHeight: 1.7, marginBottom: '20px' }}>
              💡 입력한 정보는 AI 사이즈 추천에만 활용되며, 외부에 공개되지 않아요. 건너뛰기 가능해요.
            </div>
            {[
              { key: 'height', label: '키', unit: 'cm', placeholder: '예: 165' },
              { key: 'weight', label: '몸무게', unit: 'kg', placeholder: '예: 52' },
            ].map(field => (
              <div key={field.key} style={{ marginBottom: '14px' }}>
                <div style={{ fontSize: '12px', fontWeight: 500, color: '#555', marginBottom: '7px', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{field.label}</span>
                  <span style={{ color: '#999', fontWeight: 300 }}>{field.unit}</span>
                </div>
                <input className="ss-input" type="number" placeholder={field.placeholder}
                  value={bodyForm[field.key]}
                  onChange={e => setBodyForm({ ...bodyForm, [field.key]: e.target.value })}/>
              </div>
            ))}
            <div style={{ marginBottom: '14px' }}>
              <div style={{ fontSize: '12px', fontWeight: 500, color: '#555', marginBottom: '10px' }}>평소 착용 사이즈</div>
              <div style={{ display: 'flex', gap: '6px' }}>
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(sz => (
                  <button key={sz} onClick={() => setBodyForm({ ...bodyForm, size: sz })}
                    style={{
                      flex: 1, padding: '11px 4px', border: `1.5px solid ${bodyForm.size === sz ? '#111' : '#e8e8e8'}`,
                      background: bodyForm.size === sz ? '#111' : '#fff',
                      color: bodyForm.size === sz ? '#fff' : '#666',
                      fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s',
                    }}>
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 선택 카운트 */}
        {step.type === 'multi' && step.max && (
          <div style={{ fontSize: '11px', color: '#999', marginBottom: '8px', textAlign: 'right' }}>
            {(selections[step.id] || []).length} / {step.max} 선택
          </div>
        )}
      </div>

      {/* 푸터 */}
      <div style={{ padding: '16px 28px 24px', borderTop: '1px solid #f0f0f0', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {currentStep > 0 && (
            <button onClick={handlePrev}
              style={{ padding: '13px 20px', border: '1px solid #e8e8e8', background: '#fff', color: '#666', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' }}>
              ← 이전
            </button>
          )}
          {step.type === 'body' && onSkip && currentStep === 0 && (
            <button onClick={onSkip}
              style={{ padding: '13px 16px', border: 'none', background: 'none', color: '#999', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' }}>
              건너뛰기
            </button>
          )}
          <button onClick={handleNext} disabled={!canProceed()}
            style={{
              flex: 1, padding: '14px', background: canProceed() ? '#111' : '#e8e8e8',
              color: canProceed() ? '#fff' : '#999',
              border: 'none', fontSize: '14px', fontWeight: 500, cursor: canProceed() ? 'pointer' : 'not-allowed',
              fontFamily: 'inherit', transition: 'background .2s',
            }}>
            {currentStep === totalSteps - 1 ? '✨ 분석 완료! 저장하기' : `다음 (${currentStep + 1}/${totalSteps})`}
          </button>
          {step.id !== 'body' && onSkip && (
            <button onClick={() => {
              if (currentStep < totalSteps - 1) setCurrentStep(currentStep + 1)
              else onSkip()
            }}
              style={{ padding: '13px 14px', border: 'none', background: 'none', color: '#ccc', fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit' }}>
              건너뛰기
            </button>
          )}
        </div>
      </div>
    </div>
  )

  if (!isModal) return inner

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,.6)',
      zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center',
      backdropFilter: 'blur(4px)', padding: '20px',
    }}>
      {inner}
    </div>
  )
}
