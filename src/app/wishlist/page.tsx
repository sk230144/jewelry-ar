'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '@/store/useStore';
import toast from 'react-hot-toast';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useStore();

  if (!wishlist.length) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center px-4">
        <Heart size={56} className="mb-6" style={{ color: '#374151' }} />
        <h2 className="text-2xl font-bold text-white mb-3">Your wishlist is empty</h2>
        <p className="mb-6" style={{ color: '#6B7280' }}>Save your favorite pieces here</p>
        <Link href="/products" className="btn-gold">Browse Jewelry <ArrowRight size={16} /></Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="section-padding">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Wishlist</h1>
            <p style={{ color: '#6B7280', fontSize: '0.875rem' }}>{wishlist.length} saved item{wishlist.length !== 1 ? 's' : ''}</p>
          </div>
          <button
            onClick={() => { wishlist.forEach((id) => toggleWishlist(id)); toast.success('Wishlist cleared'); }}
            className="text-sm flex items-center gap-1.5 hover:text-red-400 transition-colors"
            style={{ color: '#6B7280' }}
          >
            <Trash2 size={14} /> Clear all
          </button>
        </div>

        {/* Note: wishlist holds IDs only — needs product data from store cart or a fetch */}
        <div className="text-center py-12 card-glass rounded-2xl">
          <Heart size={40} className="mx-auto mb-4 text-gold" />
          <p className="text-white font-medium mb-2">You have {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} wishlisted</p>
          <p className="text-sm mb-6" style={{ color: '#6B7280' }}>Items are saved locally. Browse products to see your wishlist in action.</p>
          <Link href="/products" className="btn-gold inline-flex">
            Browse & Add Products <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
