// 브랜드 파트너 관리페이지가 보는 브랜드. 로그인(인증) 연동 전에는 기본 MARCIA이고,
// 관리페이지 상단의 '브랜드 전환(테스트)'으로 15개 브랜드 중 하나를 선택해 각 브랜드 입장에서 주문·정산을 확인할 수 있습니다.
// 선택값은 이 브라우저에만 저장되며, 전환 시 페이지를 새로 불러옵니다. 실서비스에서는 로그인한 브랜드 계정으로 대체해야 합니다.
const KEY = 'clyq_admin_brand'
export let BRAND = 'MARCIA'
if (typeof window !== 'undefined') {
  try { const v = JSON.parse(localStorage.getItem(KEY) || 'null'); if (typeof v === 'string' && v) BRAND = v } catch {}
}
export const setBrand = (b: string) => { try { localStorage.setItem(KEY, JSON.stringify(b)) } catch {} location.reload() }
