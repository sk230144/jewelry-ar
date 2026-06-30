import { Suspense } from 'react';
import ProductsGrid from './ProductsGrid';
import FilterSidebar from '@/components/ui/FilterSidebar';

export const metadata = { title: 'All Jewelry — LuxeAR' };

export default function ProductsPage() {
  return (
    <div style={{ paddingTop: '5rem', paddingBottom: '4rem' }}>
      <div className="section-padding">
        {/* Header */}
        <div style={{ marginBottom: '1.75rem' }}>
          <h1 style={{ fontSize: 'clamp(1.6rem,4vw,2.5rem)', fontWeight: 800, color: '#fff', marginBottom: '0.3rem' }}>
            Our Collection
          </h1>
          <p style={{ color: '#6B7280', fontSize: '0.88rem' }}>Discover handcrafted luxury jewelry with AR try-on</p>
        </div>

        <div className="products-layout">
          {/* Sidebar */}
          <aside className="products-sidebar">
            <Suspense fallback={null}>
              <FilterSidebar />
            </Suspense>
          </aside>

          {/* Grid */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <Suspense fallback={
              <div className="products-listing-grid">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="card-glass shimmer rounded-2xl" style={{ aspectRatio: '3/4' }} />
                ))}
              </div>
            }>
              <ProductsGrid />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
