import { Suspense } from 'react';
import ProductsGrid from './ProductsGrid';
import FilterSidebar from '@/components/ui/FilterSidebar';

export const metadata = { title: 'All Jewelry — LuxeAR' };

export default function ProductsPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="section-padding">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Our Collection</h1>
          <p style={{ color: '#6B7280' }}>Discover handcrafted luxury jewelry with AR try-on</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-56 shrink-0">
            <Suspense fallback={null}>
              <FilterSidebar />
            </Suspense>
          </aside>
          {/* Grid */}
          <div className="flex-1 min-w-0">
            <Suspense fallback={
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="card-glass aspect-[3/4] shimmer rounded-2xl" />
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
