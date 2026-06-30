'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Heart, Share2, Star, ChevronLeft, Gem, Truck, Shield, RotateCcw } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Product } from '@/types';
import toast from 'react-hot-toast';

const JewelryViewer = dynamic(() => import('@/components/3d/JewelryViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[420px] rounded-2xl card-glass shimmer flex items-center justify-center">
      <p style={{ color: '#6B7280', fontSize: '0.875rem' }}>Loading 3D viewer...</p>
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
    { icon: Shield, label: 'Certificate of Authenticity' },
    { icon: Truck, label: 'Free Insured Shipping' },
    { icon: RotateCcw, label: '30-Day Returns' },
    { icon: Gem, label: 'Lifetime Warranty' },
  ];

  return (
    <>
      {showAR && (
        <ARTryOn
          productName={product.name}
          category={product.category}
          onClose={() => setShowAR(false)}
        />
      )}

      <div className="pt-24 pb-16">
        <div className="section-padding">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-8" style={{ color: '#6B7280' }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-white transition-colors">Jewelry</Link>
            <span>/</span>
            <Link href={`/products?category=${product.category}`} className="hover:text-white capitalize transition-colors">{product.category}</Link>
            <span>/</span>
            <span className="text-white truncate max-w-xs">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Visual */}
            <div>
              {/* Tab toggle */}
              <div className="flex gap-2 mb-4">
                {(['3d', 'images'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
                    style={{
                      background: activeTab === tab ? '#C9A84C' : 'rgba(255,255,255,0.05)',
                      color: activeTab === tab ? '#000' : '#9CA3AF',
                    }}
                  >
                    {tab === '3d' ? '3D View' : 'Photos'}
                  </button>
                ))}
              </div>

              {activeTab === '3d' ? (
                <JewelryViewer
                  category={product.category as 'rings' | 'necklaces' | 'bracelets' | 'earrings'}
                  colors={product.colors}
                  onARClick={() => setShowAR(true)}
                />
              ) : (
                <div>
                  <div className="relative aspect-square rounded-2xl overflow-hidden card-glass mb-3">
                    <Image
                      src={product.images[activeImage] || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80'}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    {discount > 0 && (
                      <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: '#C9A84C', color: '#000', fontSize: '0.75rem', fontWeight: 700, padding: '0.25rem 0.625rem', borderRadius: '9999px' }}>
                        -{discount}%
                      </div>
                    )}
                  </div>
                  {product.images.length > 1 && (
                    <div className="flex gap-2">
                      {product.images.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveImage(i)}
                          className="relative w-16 h-16 rounded-xl overflow-hidden"
                          style={{ border: activeImage === i ? '2px solid #C9A84C' : '2px solid transparent' }}
                        >
                          <Image src={img} alt="" fill className="object-cover" sizes="64px" />
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
                  className="w-full mt-4 py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all"
                  style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C' }}
                >
                  <Gem size={16} /> Try On with AR — Use Your Camera
                </button>
              )}
            </div>

            {/* Right: Info */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-3 py-1 rounded-full capitalize" style={{ background: 'rgba(201,168,76,0.1)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.2)' }}>
                  {product.category}
                </span>
                {product.arEnabled && (
                  <span className="text-xs px-3 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.05)', color: '#9CA3AF', border: '1px solid rgba(255,255,255,0.1)' }}>
                    AR Enabled
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-bold text-white mb-3">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} style={{ fill: i < Math.floor(product.rating) ? '#C9A84C' : 'transparent', color: i < Math.floor(product.rating) ? '#C9A84C' : '#374151' }} />
                  ))}
                </div>
                <span className="text-sm" style={{ color: '#C9A84C' }}>{product.rating}</span>
                <span className="text-sm" style={{ color: '#6B7280' }}>({product.reviewCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-end gap-3 mb-6">
                <span className="text-4xl font-bold text-white">${product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl line-through" style={{ color: '#6B7280' }}>${product.originalPrice.toLocaleString()}</span>
                    <span className="text-sm font-semibold" style={{ color: '#22C55E' }}>Save ${(product.originalPrice - product.price).toLocaleString()}</span>
                  </>
                )}
              </div>

              <p className="mb-6 leading-relaxed" style={{ color: '#9CA3AF' }}>{product.description}</p>

              {/* Material / Gemstone */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="card-glass p-3 rounded-xl">
                  <div className="text-xs mb-1" style={{ color: '#6B7280' }}>Material</div>
                  <div className="text-sm font-medium text-white">{product.material}</div>
                </div>
                {product.gemstone && (
                  <div className="card-glass p-3 rounded-xl">
                    <div className="text-xs mb-1" style={{ color: '#6B7280' }}>Gemstone</div>
                    <div className="text-sm font-medium text-white">{product.gemstone}</div>
                  </div>
                )}
              </div>

              {/* Color selector */}
              {product.colors.length > 0 && (
                <div className="mb-5">
                  <div className="text-sm font-medium text-white mb-3">Color: <span style={{ color: '#C9A84C' }}>{selectedColor}</span></div>
                  <div className="flex gap-2 flex-wrap">
                    {product.colors.map((c) => {
                      const bg = c === 'Rose Gold' ? '#C98070' : c === 'Yellow Gold' ? '#C9A84C' : c === 'White Gold' ? '#E8E8E8' : '#888';
                      return (
                        <button
                          key={c}
                          onClick={() => setSelectedColor(c)}
                          title={c}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all"
                          style={{
                            border: selectedColor === c ? '2px solid #C9A84C' : '2px solid rgba(255,255,255,0.1)',
                            background: 'rgba(255,255,255,0.03)',
                            color: selectedColor === c ? '#fff' : '#9CA3AF',
                          }}
                        >
                          <div className="w-3.5 h-3.5 rounded-full" style={{ background: bg }} />
                          {c}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Size selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <div className="text-sm font-medium text-white mb-3">Ring Size: <span style={{ color: '#C9A84C' }}>{selectedSize}</span></div>
                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className="w-10 h-10 rounded-lg text-sm font-medium transition-all"
                        style={{
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
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center rounded-full" style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}>
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-2 text-lg text-white hover:text-[#C9A84C] transition-colors">−</button>
                  <span className="px-3 text-white font-medium">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="px-4 py-2 text-lg text-white hover:text-[#C9A84C] transition-colors">+</button>
                </div>
                <button onClick={handleAddToCart} className="btn-gold flex-1 flex items-center justify-center gap-2">
                  <ShoppingBag size={18} /> Add to Cart
                </button>
              </div>

              <div className="flex gap-3 mb-8">
                <button
                  onClick={() => { toggleWishlist(product._id); toast.success(wishlisted ? 'Removed from wishlist' : 'Added to wishlist!'); }}
                  className="flex-1 py-3 rounded-full font-medium flex items-center justify-center gap-2 text-sm transition-all"
                  style={{ border: `1.5px solid ${wishlisted ? '#C9A84C' : 'rgba(255,255,255,0.1)'}`, color: wishlisted ? '#C9A84C' : '#9CA3AF', background: wishlisted ? 'rgba(201,168,76,0.05)' : 'transparent' }}
                >
                  <Heart size={16} style={{ fill: wishlisted ? '#C9A84C' : 'transparent' }} />
                  {wishlisted ? 'Wishlisted' : 'Wishlist'}
                </button>
                <button className="flex-1 py-3 rounded-full font-medium flex items-center justify-center gap-2 text-sm" style={{ border: '1.5px solid rgba(255,255,255,0.1)', color: '#9CA3AF' }}>
                  <Share2 size={16} /> Share
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-2 gap-3 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                {guarantees.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2">
                    <Icon size={14} className="text-gold shrink-0" />
                    <span className="text-xs" style={{ color: '#6B7280' }}>{label}</span>
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
