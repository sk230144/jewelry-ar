'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, ShoppingBag, ArrowRight, Gem } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function CartPage() {
  const { cart, removeFromCart, updateQty, cartTotal } = useStore();
  const total = cartTotal();
  const shipping = total >= 500 ? 0 : 25;
  const tax = total * 0.08;
  const grand = total + shipping + tax;

  if (!cart.length) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center px-4">
        <ShoppingBag size={56} className="mb-6" style={{ color: '#374151' }} />
        <h2 className="text-2xl font-bold text-white mb-3">Your cart is empty</h2>
        <p className="mb-6" style={{ color: '#6B7280' }}>Discover our stunning jewelry collection</p>
        <Link href="/products" className="btn-gold">Browse Jewelry <ArrowRight size={16} /></Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="section-padding">
        <h1 className="text-3xl font-bold text-white mb-8">Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={`${item.product._id}-${item.selectedColor}`} className="card-glass p-4 rounded-2xl flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0" style={{ background: '#111' }}>
                  <Image
                    src={item.product.images[0] || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&q=80'}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/products/${item.product._id}`} className="font-medium text-white hover:text-gold transition-colors line-clamp-1">
                    {item.product.name}
                  </Link>
                  <p className="text-xs mt-0.5" style={{ color: '#6B7280' }}>{item.product.material} {item.selectedColor && `· ${item.selectedColor}`} {item.selectedSize && `· Size ${item.selectedSize}`}</p>
                  <p className="font-bold text-gold mt-1">${item.product.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex items-center rounded-full" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                    <button onClick={() => updateQty(item.product._id, item.quantity - 1)} className="px-3 py-1 text-white hover:text-gold transition-colors">−</button>
                    <span className="px-2 text-sm text-white">{item.quantity}</span>
                    <button onClick={() => updateQty(item.product._id, item.quantity + 1)} className="px-3 py-1 text-white hover:text-gold transition-colors">+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.product._id)} className="p-2 text-gray-600 hover:text-red-400 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div>
            <div className="card-glass p-6 rounded-2xl sticky top-28">
              <h3 className="font-bold text-white text-lg mb-5">Order Summary</h3>
              <div className="space-y-3 text-sm mb-5">
                <div className="flex justify-between">
                  <span style={{ color: '#6B7280' }}>Subtotal</span>
                  <span className="text-white">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#6B7280' }}>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-400' : 'text-white'}>{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#6B7280' }}>Tax (8%)</span>
                  <span className="text-white">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-3 font-bold text-base" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <span className="text-white">Total</span>
                  <span className="text-gold">${grand.toFixed(2)}</span>
                </div>
              </div>

              {total < 500 && (
                <div className="mb-4 p-3 rounded-xl text-xs" style={{ background: 'rgba(201,168,76,0.1)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.2)' }}>
                  Add ${(500 - total).toFixed(0)} more for FREE shipping!
                </div>
              )}

              <Link href="/checkout" className="btn-gold w-full justify-center block text-center">
                Proceed to Checkout
              </Link>
              <Link href="/products" className="block text-center text-sm mt-3 text-gold hover:underline">
                Continue Shopping
              </Link>

              <div className="flex items-center justify-center gap-2 mt-5 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <Gem size={14} className="text-gold" />
                <span className="text-xs" style={{ color: '#6B7280' }}>Secure checkout with SSL encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
