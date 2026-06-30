'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Product } from '@/types';
import toast from 'react-hot-toast';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const wishlisted = isWishlisted(product._id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product._id);
    toast.success(wishlisted ? 'Removed from wishlist' : 'Added to wishlist!');
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <Link href={`/products/${product._id}`} className="group block">
      <div className="card-glass overflow-hidden transition-all duration-300 hover:border-[#C9A84C]/30 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(201,168,76,0.15)]">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#1A1A1A] to-[#111]">
          <Image
            src={product.images[0] || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80'}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {discount > 0 && (
              <span className="bg-[#C9A84C] text-black text-xs font-bold px-2 py-0.5 rounded-full">-{discount}%</span>
            )}
            {product.arEnabled && (
              <span className="bg-black/70 backdrop-blur text-[#C9A84C] text-xs font-medium px-2 py-0.5 rounded-full border border-[#C9A84C]/30">AR</span>
            )}
            {product.featured && (
              <span className="bg-white/10 backdrop-blur text-white text-xs px-2 py-0.5 rounded-full">Featured</span>
            )}
          </div>
          {/* Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={handleWishlist}
              className="w-8 h-8 rounded-full bg-black/70 backdrop-blur flex items-center justify-center transition-colors hover:bg-[#C9A84C]"
            >
              <Heart size={14} className={wishlisted ? 'fill-[#C9A84C] text-[#C9A84C]' : 'text-white'} />
            </button>
            <button className="w-8 h-8 rounded-full bg-black/70 backdrop-blur flex items-center justify-center text-white">
              <Eye size={14} />
            </button>
          </div>
          {/* Quick add */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleAddToCart}
              className="w-full py-2.5 bg-[#C9A84C] text-black font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#E4C97A] transition-colors"
            >
              <ShoppingBag size={14} /> Add to Cart
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-xs text-gray-500 mb-1 capitalize">{product.category} · {product.material}</p>
          <h3 className="font-medium text-white text-sm leading-snug mb-2 line-clamp-2 group-hover:text-[#C9A84C] transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={11}
                className={i < Math.floor(product.rating) ? 'fill-[#C9A84C] text-[#C9A84C]' : 'text-gray-700'}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-bold text-white">${product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-600 line-through">${product.originalPrice.toLocaleString()}</span>
            )}
          </div>

          {product.colors.length > 1 && (
            <div className="flex gap-1.5 mt-2">
              {product.colors.slice(0, 4).map((c) => {
                const bg = c === 'Rose Gold' ? '#C98070' : c === 'Yellow Gold' ? '#C9A84C' : c === 'White Gold' ? '#E8E8E8' : '#888';
                return <div key={c} className="w-4 h-4 rounded-full border border-white/10" style={{ background: bg }} title={c} />;
              })}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
