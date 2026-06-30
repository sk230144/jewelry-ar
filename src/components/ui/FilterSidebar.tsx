'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Filter, ChevronDown, X } from 'lucide-react';

const categories = ['rings', 'necklaces', 'bracelets', 'earrings'];
const materials = ['18K Rose Gold', '18K Yellow Gold', '18K White Gold', '14K Yellow Gold', '14K White Gold', '14K Rose Gold', 'Platinum'];
const sorts = [
  { value: 'createdAt', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Best Rated' },
];

export default function FilterSidebar() {
  const router = useRouter();
  const params = useSearchParams();
  const [open, setOpen] = useState(false);

  const update = (key: string, value: string | null) => {
    const p = new URLSearchParams(params.toString());
    if (value) p.set(key, value); else p.delete(key);
    p.delete('page');
    router.push(`/products?${p.toString()}`);
  };

  const clearAll = () => router.push('/products');

  const hasFilters = params.get('category') || params.get('material') || params.get('minPrice') || params.get('maxPrice');

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden flex items-center gap-2 btn-outline-gold text-sm py-2 px-4 mb-4"
      >
        <Filter size={16} /> Filters {hasFilters && <span className="w-2 h-2 rounded-full bg-[#C9A84C]" />}
      </button>

      <div className={`${open ? 'block' : 'hidden'} lg:block space-y-6`}>
        {hasFilters && (
          <button onClick={clearAll} className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition-colors">
            <X size={12} /> Clear all filters
          </button>
        )}

        {/* Category */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            Category <ChevronDown size={14} className="text-gray-500" />
          </h4>
          <div className="space-y-2">
            <button
              onClick={() => update('category', null)}
              className={`block w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${!params.get('category') ? 'bg-[#C9A84C]/20 text-[#C9A84C]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => update('category', cat)}
                className={`block w-full text-left text-sm px-3 py-2 rounded-lg capitalize transition-colors ${params.get('category') === cat ? 'bg-[#C9A84C]/20 text-[#C9A84C]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Sort By</h4>
          <div className="space-y-2">
            {sorts.map((s) => (
              <button
                key={s.value}
                onClick={() => update('sort', s.value)}
                className={`block w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${params.get('sort') === s.value || (!params.get('sort') && s.value === 'createdAt') ? 'bg-[#C9A84C]/20 text-[#C9A84C]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Price */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Price Range</h4>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              defaultValue={params.get('minPrice') || ''}
              onBlur={(e) => update('minPrice', e.target.value || null)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#C9A84C]"
            />
            <input
              type="number"
              placeholder="Max"
              defaultValue={params.get('maxPrice') || ''}
              onBlur={(e) => update('maxPrice', e.target.value || null)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#C9A84C]"
            />
          </div>
        </div>

        {/* Material */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Material</h4>
          <div className="space-y-2">
            {materials.map((m) => (
              <button
                key={m}
                onClick={() => update('material', params.get('material') === m ? null : m)}
                className={`block w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${params.get('material') === m ? 'bg-[#C9A84C]/20 text-[#C9A84C]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
