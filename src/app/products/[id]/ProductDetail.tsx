'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Heart, Share2, Star, Gem, Truck, Shield, RotateCcw } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Product } from '@/types';
import toast from 'react-hot-toast';

const JewelryViewer = dynamic(() => import('@/components/3d/JewelryViewer'), {
  ssr: false,
  loading: () => (
    <div style={{ width: '100%', height: '420px', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
      <p style={{ color: '#6B7280', fontSize: '0.875rem' }}>Loading 3D viewer…</p>
    </div>
  ),
});

const ARTryOn = dynamic(() => import('@/components/ar/ARTryOn'), { ssr: false });

interface Props { product: Product }

export default function ProductDetail({ product }: Props) {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [qty, setQty] = useState(1);
  const [showAR, setShowAR] = useState(false);
  const [activeTab, setActiveTab] = useState<'3d' | 'images'>('3d');
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const wishlisted = isWishlisted(product._id);

  const handleAddToCart = () => {
    addToCart(product, qty, selectedColor, selectedSize);
    toast.success(`${product.name} added to cart!`);
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const guarantees = [
    { icon: Shield,    label: 'Certificate of Authenticity' },
    { icon: Truck,     label: 'Free Insured Shipping' },
    { icon: RotateCcw, label: '30-Day Returns' },
    { icon: Gem,       label: 'Lifetime Warranty' },
  ];

  const colorMap: Record<string, string> = {
    'Rose Gold': '#C98070',
    'Yellow Gold': '#C9A84C',
    'White Gold': '#E8E8E8',
    'Silver': '#C0C0C0',
    'Platinum': '#E5E4E2',
  };

  return (
    <>
      {showAR && (
        <ARTryOn
          productName={product.name}
          category={product.category}
          onClose={() => setShowAR(false)}
        />
      )}

      <div style={{ paddingTop: '5.5rem', paddingBottom: '4rem' }}>
        <div className="section-padding">

          {/* ── Breadcrumb ── */}
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.4rem', fontSize: '0.78rem', color: '#6B7280', marginBottom: '2rem' }}>
            <Link href="/" style={{ color: '#6B7280', textDecoration: 'none', transition: 'color 0.2s' }}>Home</Link>
            <span>/</span>
            <Link href="/products" style={{ color: '#6B7280', textDecoration: 'none', transition: 'color 0.2s' }}>Jewelry</Link>
            <span>/</span>
            <Link href={`/products?category=${product.category}`} style={{ color: '#6B7280', textDecoration: 'none', textTransform: 'capitalize', transition: 'color 0.2s' }}>{product.category}</Link>
            <span>/</span>
            <span style={{ color: '#D1D5DB', maxWidth: '18rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.name}</span>
          </div>

          {/* ── Two-column layout ── */}
          <div className="product-detail-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))', gap: '3rem', alignItems: 'start' }}>

            {/* ════ LEFT: Visual Panel ════ */}
            <div>
              {/* Tab toggle */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                {(['3d', 'images'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      padding: '0.4rem 1.1rem',
                      borderRadius: '9999px',
                      fontSize: '0.82rem',
                      fontWeight: 500,
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      background: activeTab === tab ? '#C9A84C' : 'rgba(255,255,255,0.06)',
                      color: activeTab === tab ? '#000' : '#9CA3AF',
                    }}
                  >
                    {tab === '3d' ? '3D · Drag to rotate' : 'Photos'}
                  </button>
                ))}
              </div>

              {/* Viewer or photo */}
              {activeTab === '3d' ? (
                <JewelryViewer
                  category={product.category as 'rings' | 'necklaces' | 'bracelets' | 'earrings'}
                  colors={product.colors}
                  onARClick={() => setShowAR(true)}
                />
              ) : (
                <div>
                  <div style={{ position: 'relative', aspectRatio: '1/1', borderRadius: '1rem', overflow: 'hidden', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '0.75rem' }}>
                    <Image
                      src={product.images[activeImage] || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80'}
                      alt={product.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width:1024px) 100vw, 50vw"
                    />
                    {discount > 0 && (
                      <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: '#C9A84C', color: '#000', fontSize: '0.72rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '9999px' }}>
                        -{discount}%
                      </div>
                    )}
                  </div>
                  {product.images.length > 1 && (
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {product.images.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveImage(i)}
                          style={{ position: 'relative', width: '4rem', height: '4rem', borderRadius: '0.625rem', overflow: 'hidden', border: activeImage === i ? '2px solid #C9A84C' : '2px solid rgba(255,255,255,0.1)', background: 'none', cursor: 'pointer', flexShrink: 0 }}
                        >
                          <Image src={img} alt="" fill style={{ objectFit: 'cover' }} sizes="64px" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* AR CTA */}
              {product.arEnabled && (
                <button
                  onClick={() => setShowAR(true)}
                  style={{ width: '100%', marginTop: '1rem', padding: '0.85rem', borderRadius: '0.75rem', fontSize: '0.85rem', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.25)', color: '#C9A84C', cursor: 'pointer', transition: 'all 0.2s' }}
                >
                  <Gem size={15} /> Try On with AR — Use Your Camera
                </button>
              )}
            </div>

            {/* ════ RIGHT: Info Panel ════ */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>

              {/* Badges */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.875rem' }}>
                <span style={{ fontSize: '0.72rem', padding: '0.25rem 0.75rem', borderRadius: '9999px', textTransform: 'capitalize', background: 'rgba(201,168,76,0.1)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.2)' }}>
                  {product.category}
                </span>
                {product.arEnabled && (
                  <span style={{ fontSize: '0.72rem', padding: '0.25rem 0.75rem', borderRadius: '9999px', background: 'rgba(255,255,255,0.05)', color: '#9CA3AF', border: '1px solid rgba(255,255,255,0.1)' }}>
                    AR Enabled
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)', fontWeight: 800, color: '#fff', lineHeight: 1.15, marginBottom: '0.75rem' }}>
                {product.name}
              </h1>

              {/* Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.1rem' }}>
                <div style={{ display: 'flex', gap: '0.15rem' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} style={{ fill: i < Math.floor(product.rating) ? '#C9A84C' : 'transparent', color: i < Math.floor(product.rating) ? '#C9A84C' : '#374151' }} />
                  ))}
                </div>
                <span style={{ fontSize: '0.85rem', color: '#C9A84C', fontWeight: 600 }}>{product.rating}</span>
                <span style={{ fontSize: '0.82rem', color: '#6B7280' }}>({product.reviewCount} reviews)</span>
              </div>

              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: 'clamp(2rem,4vw,2.75rem)', fontWeight: 800, color: '#fff', lineHeight: 1 }}>${product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <>
                    <span style={{ fontSize: '1.15rem', textDecoration: 'line-through', color: '#6B7280' }}>${product.originalPrice.toLocaleString()}</span>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#22C55E' }}>Save ${(product.originalPrice - product.price).toLocaleString()}</span>
                  </>
                )}
              </div>

              {/* Description */}
              <p style={{ color: '#9CA3AF', lineHeight: 1.75, fontSize: '0.9rem', marginBottom: '1.25rem' }}>{product.description}</p>

              {/* Material / Gemstone row */}
              <div style={{ display: 'grid', gridTemplateColumns: product.gemstone ? '1fr 1fr' : '1fr', gap: '0.65rem', marginBottom: '1.25rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.75rem', padding: '0.75rem 1rem' }}>
                  <div style={{ fontSize: '0.7rem', color: '#6B7280', marginBottom: '0.2rem' }}>Material</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#fff' }}>{product.material}</div>
                </div>
                {product.gemstone && (
                  <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.75rem', padding: '0.75rem 1rem' }}>
                    <div style={{ fontSize: '0.7rem', color: '#6B7280', marginBottom: '0.2rem' }}>Gemstone</div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#fff' }}>{product.gemstone}</div>
                  </div>
                )}
              </div>

              {/* Color selector */}
              {product.colors.length > 0 && (
                <div style={{ marginBottom: '1.1rem' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#fff', marginBottom: '0.6rem' }}>
                    Color: <span style={{ color: '#C9A84C' }}>{selectedColor}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {product.colors.map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedColor(c)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '0.45rem',
                          padding: '0.35rem 0.85rem', borderRadius: '9999px', fontSize: '0.82rem',
                          cursor: 'pointer', transition: 'all 0.2s',
                          border: selectedColor === c ? '2px solid #C9A84C' : '2px solid rgba(255,255,255,0.1)',
                          background: selectedColor === c ? 'rgba(201,168,76,0.08)' : 'rgba(255,255,255,0.03)',
                          color: selectedColor === c ? '#fff' : '#9CA3AF',
                        }}
                      >
                        <div style={{ width: '0.85rem', height: '0.85rem', borderRadius: '9999px', background: colorMap[c] || '#888', flexShrink: 0 }} />
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#fff', marginBottom: '0.6rem' }}>
                    Ring Size: <span style={{ color: '#C9A84C' }}>{selectedSize}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        style={{
                          width: '2.5rem', height: '2.5rem', borderRadius: '0.5rem',
                          fontSize: '0.82rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s',
                          background: selectedSize === s ? '#C9A84C' : 'rgba(255,255,255,0.05)',
                          color: selectedSize === s ? '#000' : '#9CA3AF',
                          border: selectedSize === s ? 'none' : '1px solid rgba(255,255,255,0.1)',
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Qty + Add to cart */}
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '9999px', background: 'rgba(255,255,255,0.03)', flexShrink: 0 }}>
                  <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ padding: '0.55rem 1rem', fontSize: '1.1rem', color: '#fff', background: 'none', border: 'none', cursor: 'pointer', lineHeight: 1 }}>−</button>
                  <span style={{ padding: '0 0.6rem', color: '#fff', fontWeight: 600, fontSize: '0.9rem', minWidth: '1.75rem', textAlign: 'center' }}>{qty}</span>
                  <button onClick={() => setQty(qty + 1)} style={{ padding: '0.55rem 1rem', fontSize: '1.1rem', color: '#fff', background: 'none', border: 'none', cursor: 'pointer', lineHeight: 1 }}>+</button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="btn-gold"
                  style={{ flex: 1, justifyContent: 'center', gap: '0.5rem', fontSize: '0.92rem', padding: '0.75rem 1.25rem' }}
                >
                  <ShoppingBag size={17} /> Add to Cart
                </button>
              </div>

              {/* Wishlist + Share */}
              <div style={{ display: 'flex', gap: '0.65rem', marginBottom: '1.5rem' }}>
                <button
                  onClick={() => { toggleWishlist(product._id); toast.success(wishlisted ? 'Removed from wishlist' : 'Added to wishlist!'); }}
                  style={{
                    flex: 1, padding: '0.7rem', borderRadius: '9999px', fontSize: '0.82rem', fontWeight: 500,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', cursor: 'pointer', transition: 'all 0.2s',
                    border: `1.5px solid ${wishlisted ? '#C9A84C' : 'rgba(255,255,255,0.1)'}`,
                    color: wishlisted ? '#C9A84C' : '#9CA3AF',
                    background: wishlisted ? 'rgba(201,168,76,0.05)' : 'transparent',
                  }}
                >
                  <Heart size={15} style={{ fill: wishlisted ? '#C9A84C' : 'transparent' }} />
                  {wishlisted ? 'Wishlisted' : 'Wishlist'}
                </button>
                <button style={{ flex: 1, padding: '0.7rem', borderRadius: '9999px', fontSize: '0.82rem', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', border: '1.5px solid rgba(255,255,255,0.1)', color: '#9CA3AF', background: 'transparent', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <Share2 size={15} /> Share
                </button>
              </div>

              {/* Guarantees */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                {guarantees.map(({ icon: Icon, label }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Icon size={13} color="#C9A84C" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
