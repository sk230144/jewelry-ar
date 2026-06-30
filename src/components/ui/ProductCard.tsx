'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Product } from '@/types';
import toast from 'react-hot-toast';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const wishlisted = isWishlisted(product._id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
    toast.success(`Added to cart!`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product._id);
    toast.success(wishlisted ? 'Removed from wishlist' : 'Saved to wishlist!');
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <Link href={`/products/${product._id}`} style={{ textDecoration: 'none', display: 'block' }} className="product-card-link">
      <div className="product-card card-glass">
        {/* ── Image zone ── */}
        <div style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', background: 'linear-gradient(135deg,#1A1A1A,#111)' }}>
          <Image
            src={product.images[0] || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80'}
            alt={product.name}
            fill
            sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,25vw"
            style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
            className="product-card-img"
          />

          {/* Badges */}
          <div style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            {discount > 0 && (
              <span style={{ background: '#C9A84C', color: '#000', fontSize: '0.65rem', fontWeight: 700, padding: '0.15rem 0.45rem', borderRadius: '9999px' }}>-{discount}%</span>
            )}
            {product.arEnabled && (
              <span style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)', color: '#C9A84C', fontSize: '0.62rem', fontWeight: 600, padding: '0.15rem 0.45rem', borderRadius: '9999px', border: '1px solid rgba(201,168,76,0.35)' }}>AR</span>
            )}
          </div>

          {/* Wishlist button — always visible on touch, hover on desktop */}
          <button
            onClick={handleWishlist}
            style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', width: '2rem', height: '2rem', borderRadius: '9999px', background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
            className="product-wishlist-btn"
            aria-label="Toggle wishlist"
          >
            <Heart size={13} color={wishlisted ? '#C9A84C' : '#fff'} fill={wishlisted ? '#C9A84C' : 'none'} />
          </button>

          {/* Add to cart — slides up on hover */}
          <button
            onClick={handleAddToCart}
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0.6rem', background: '#C9A84C', color: '#000', fontWeight: 700, fontSize: '0.78rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', transition: 'transform 0.3s ease, background 0.2s' }}
            className="product-add-btn"
          >
            <ShoppingBag size={13} /> Add to Cart
          </button>
        </div>

        {/* ── Info zone ── */}
        <div style={{ padding: 'clamp(0.6rem,2vw,0.9rem)' }}>
          <p style={{ fontSize: '0.68rem', color: '#6B7280', marginBottom: '0.25rem', textTransform: 'capitalize' }}>
            {product.category} · {product.material}
          </p>
          <h3 style={{ fontSize: 'clamp(0.78rem,1.5vw,0.88rem)', fontWeight: 500, color: '#fff', lineHeight: 1.3, marginBottom: '0.4rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }} className="product-card-title">
            {product.name}
          </h3>

          {/* Stars */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', marginBottom: '0.5rem' }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={10} color="#C9A84C" fill={i < Math.floor(product.rating) ? '#C9A84C' : 'none'} />
            ))}
            <span style={{ fontSize: '0.65rem', color: '#6B7280', marginLeft: '0.2rem' }}>({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 700, color: '#fff', fontSize: 'clamp(0.85rem,2vw,1rem)' }}>${product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span style={{ fontSize: '0.75rem', color: '#4B5563', textDecoration: 'line-through' }}>${product.originalPrice.toLocaleString()}</span>
            )}
          </div>

          {/* Color swatches */}
          {product.colors.length > 1 && (
            <div style={{ display: 'flex', gap: '0.3rem', marginTop: '0.5rem' }}>
              {product.colors.slice(0, 4).map((c) => {
                const bg = c === 'Rose Gold' ? '#C98070' : c === 'Yellow Gold' ? '#C9A84C' : c === 'White Gold' ? '#E8E8E8' : '#888';
                return <div key={c} title={c} style={{ width: '0.85rem', height: '0.85rem', borderRadius: '9999px', background: bg, border: '1px solid rgba(255,255,255,0.12)' }} />;
              })}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
