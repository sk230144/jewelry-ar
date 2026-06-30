'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '@/types';

interface StoreState {
  cart: CartItem[];
  wishlist: string[];
  user: { _id: string; name: string; email: string; role: string } | null;

  addToCart: (product: Product, qty?: number, color?: string, size?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
  cartCount: () => number;

  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  setUser: (user: StoreState['user']) => void;
  logout: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      user: null,

      addToCart: (product, qty = 1, color, size) => {
        set((state) => {
          const existing = state.cart.find(
            (i) => i.product._id === product._id && i.selectedColor === color && i.selectedSize === size
          );
          if (existing) {
            return {
              cart: state.cart.map((i) =>
                i.product._id === product._id && i.selectedColor === color
                  ? { ...i, quantity: i.quantity + qty }
                  : i
              ),
            };
          }
          return { cart: [...state.cart, { product, quantity: qty, selectedColor: color, selectedSize: size }] };
        });
      },

      removeFromCart: (productId) =>
        set((state) => ({ cart: state.cart.filter((i) => i.product._id !== productId) })),

      updateQty: (productId, qty) =>
        set((state) => ({
          cart: state.cart.map((i) =>
            i.product._id === productId ? { ...i, quantity: Math.max(1, qty) } : i
          ),
        })),

      clearCart: () => set({ cart: [] }),

      cartTotal: () => get().cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0),

      cartCount: () => get().cart.reduce((sum, i) => sum + i.quantity, 0),

      toggleWishlist: (productId) =>
        set((state) => ({
          wishlist: state.wishlist.includes(productId)
            ? state.wishlist.filter((id) => id !== productId)
            : [...state.wishlist, productId],
        })),

      isWishlisted: (productId) => get().wishlist.includes(productId),

      setUser: (user) => set({ user }),

      logout: () => set({ user: null }),
    }),
    { name: 'jewelry-store' }
  )
);
