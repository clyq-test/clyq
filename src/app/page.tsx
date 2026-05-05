import Navbar from '../components/Navbar'
import { supabase } from '../lib/supabase'

async function getProducts() {
  const { data } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
  return data || []
}

export default async function Home() {
  const products = await getProducts()

  return (
    <main>
      <Navbar />

      {/* 히어로 배너 */}
      <div style={{
        height: '500px',
        background: 'linear-gradient(130deg, #1a1814 55%, #2c2520)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 80px',
        gap: '80px'
      }}>
        <div>
          <div style={{
            fontSize: '11px',
            letterSpacing: '4px',
            color: '#C94E1A',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span style={{ display: 'inline-block', width: '20px', height: '1px', background: '#C94E1A' }}/>
            2026 F/W NEW COLLECTION
          </div>
          <h1 style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: '56px',
            fontWeight: 300,
            color: '#fff',
            lineHeight: 1.15,
            marginBottom: '16px'
          }}>
            입어보고<br />
            <em style={{ fontStyle: 'italic', color: '#e8d5c0' }}>확실한 것만</em><br />
            담아가세요
          </h1>
          <p style={{
            fontSize: '13px',
            color: 'rgba(255,255,255,0.45)',
            fontWeight: 300,
            lineHeight: 1.8,
            marginBottom: '32px'
          }}>
            AI가 취향을 읽고 피팅 박스를 보내드려요.<br />
            집에서 입어보고, 마음에 드는 것만 구매하면 됩니다.
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <a href="/fitting" style={{
              padding: '13px 28px',
              background: '#fff',
              color: '#111',
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '1px'
            }}>
              선피팅 신청하기
            </a>
            <a href="/products" style={{
              padding: '12px 24px',
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '12px',
              letterSpacing: '0.5px'
            }}>
              전체 상품 보기
            </a>
          </div>
        </div>
      </div>

      {/* 피팅 서비스 안내 스트립 */}
      <div style={{
        background: 'linear-gradient(90deg, #1a1814, #2c2218, #1a1814)',
        padding: '20px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{
            background: '#C94E1A',
            color: '#fff',
            fontSize: '10px',
            fontWeight: 700,
            padding: '5px 10px',
            letterSpacing: '1px'
          }}>선피팅 서비스</span>
          <span style={{ fontSize: '13px', color: '#fff', fontWeight: 300 }}>
            <strong style={{ fontWeight: 500 }}>집에서 먼저 입어보고</strong>, 마음에 드는 옷만 구매하세요
          </span>
        </div>
        <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
          {[
            { num: '24H', label: '전국 배송' },
            { num: '3일', label: '피팅 기간' },
            { num: '0원', label: '피팅 비용' },
          ].map(item => (
            <div key={item.label} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: '22px',
                color: '#fff',
                fontWeight: 300
              }}>{item.num}</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>{item.label}</div>
            </div>
          ))}
          <a href="/fitting" style={{
            padding: '10px 20px',
            border: '1px solid rgba(255,255,255,0.25)',
            color: 'rgba(255,255,255,0.8)',
            fontSize: '12px',
            letterSpacing: '0.5px'
          }}>
            신청하기 →
          </a>
        </div>
      </div>

      {/* 상품 목록 */}
      <section style={{ padding: '56px 40px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '28px'
        }}>
          <div>
            <div style={{
              fontSize: '10px',
              letterSpacing: '3px',
              color: '#999',
              marginBottom: '6px'
            }}>PRODUCTS</div>
            <div style={{ fontSize: '20px', fontWeight: 500 }}>전체 상품</div>
          </div>
          <a href="/products" style={{
            fontSize: '11px',
            color: '#666',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            전체보기 ›
          </a>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '24px 20px'
        }}>
          {products.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 0', color: '#999' }}>
              상품을 준비 중이에요. Supabase에 상품을 등록해주세요.
            </div>
          ) : (
            products.map((product: any) => (
              
                key={product.id}
                href={`/products/${product.id}`}
                style={{ display: 'block', cursor: 'pointer' }}
              >
                {/* 상품 이미지 */}
                <div style={{
                  aspectRatio: '3/4',
                  background: '#f5f5f5',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span style={{ fontSize: '80px' }}>🧥</span>
                  )}
                  {/* 피팅 가능 배지 */}
                  {product.is_fittable && (
                    <div style={{
                      position: 'absolute',
                      top: '10px', left: '10px',
                      background: '#C94E1A',
                      color: '#fff',
                      fontSize: '9px',
                      fontWeight: 700,
                      padding: '3px 7px',
                      letterSpacing: '0.5px'
                    }}>
                      선피팅 가능
                    </div>
                  )}
                </div>

                {/* 상품 정보 */}
                <div style={{
                  fontSize: '10px',
                  letterSpacing: '1.5px',
                  color: '#999',
                  marginBottom: '4px'
                }}>
                  {product.brand}
                </div>
                <div style={{
                  fontSize: '13px',
                  color: '#333',
                  marginBottom: '6px',
                  fontWeight: 300,
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis'
                }}>
                  {product.name}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 500 }}>
                    {product.price.toLocaleString()}원
                  </span>
                  {product.original_price > product.price && (
                    <>
                      <span style={{ fontSize: '12px', color: '#ccc', textDecoration: 'line-through' }}>
                        {product.original_price.toLocaleString()}원
                      </span>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#c0392b' }}>
                        {Math.round((1 - product.price / product.original_price) * 100)}%
                      </span>
                    </>
                  )}
                </div>
                <div style={{ fontSize: '10px', color: '#B08D57', marginTop: '4px' }}>
                  W {product.withy_points?.toLocaleString()}P 적립
                </div>
              </a>
            ))
          )}
        </div>
      </section>

      {/* 푸터 */}
      <footer style={{
        background: '#111',
        padding: '48px 40px 32px'
      }}>
        <div style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: '24px',
          color: '#fff',
          letterSpacing: '4px',
          marginBottom: '12px'
        }}>
          CLY<span style={{ color: '#C94E1A' }}>Q</span>
        </div>
        <div style={{
          fontSize: '12px',
          color: 'rgba(255,255,255,0.3)',
          lineHeight: 1.9,
          fontWeight: 300
        }}>
          Personalized Fashion Experience Universe<br />
          © 2026 CLYQ Inc. exyai company. All rights reserved.
        </div>
      </footer>
    </main>
  )
}