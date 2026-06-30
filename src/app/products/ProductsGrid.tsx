'use client';
import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product } from '@/types';
import ProductCard from '@/components/ui/ProductCard';
import { Loader2, PackageOpen } from 'lucide-react';

export default function ProductsGrid() {
  const params = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const page = parseInt(params.get('page') || '1');

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/products?${params.toString()}&limit=12`);
      const data = await res.json();
      setProducts(data.products || []);
      setTotal(data.total || 0);
      setPages(data.pages || 1);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 size={32} className="text-gold animate-spin" />
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="text-center py-20">
        <PackageOpen size={48} className="mx-auto mb-4" style={{ color: '#374151' }} />
        <p className="text-white font-medium mb-2">No products found</p>
        <p className="text-sm" style={{ color: '#6B7280' }}>Try adjusting your filters or visit <a href="/api/products/seed" className="text-gold underline">/api/products/seed</a> to seed data</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm mb-6" style={{ color: '#6B7280' }}>{total} products found</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((p) => <ProductCard key={p._id} product={p} />)}
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          {[...Array(pages)].map((_, i) => {
            const p2 = new URLSearchParams(params.toString());
            p2.set('page', String(i + 1));
            return (
              <a
                key={i}
                href={`/products?${p2.toString()}`}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-sm transition-colors"
                style={{
                  background: page === i + 1 ? '#C9A84C' : 'rgba(255,255,255,0.05)',
                  color: page === i + 1 ? '#000' : '#9CA3AF',
                  fontWeight: page === i + 1 ? 600 : 400,
                }}
              >
                {i + 1}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
