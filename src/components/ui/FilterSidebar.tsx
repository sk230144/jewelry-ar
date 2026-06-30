'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';

const categories = ['rings', 'necklaces', 'bracelets', 'earrings'];
const materials = ['18K Rose Gold', '18K Yellow Gold', '18K White Gold', '14K Yellow Gold', '14K White Gold', '14K Rose Gold', 'Platinum'];
const sorts = [
  { value: 'createdAt',  label: 'Newest' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating',     label: 'Best Rated' },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '1rem' }}>
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 0.6rem', marginBottom: collapsed ? 0 : '0.5rem' }}
      >
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fff', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{title}</span>
        <ChevronDown size={13} color="#6B7280" style={{ transition: 'transform 0.2s', transform: collapsed ? 'rotate(-90deg)' : 'rotate(0deg)' }} />
      </button>
      {!collapsed && children}
    </div>
  );
}

function FilterBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'block', width: '100%', textAlign: 'left',
        padding: '0.45rem 0.75rem', borderRadius: '0.5rem',
        fontSize: '0.82rem', border: 'none', cursor: 'pointer',
        transition: 'all 0.15s',
        background: active ? 'rgba(201,168,76,0.15)' : 'transparent',
        color: active ? '#C9A84C' : '#9CA3AF',
        fontWeight: active ? 600 : 400,
      }}
    >
      {children}
    </button>
  );
}

export default function FilterSidebar() {
  const router = useRouter();
  const params = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);

  const update = (key: string, value: string | null) => {
    const p = new URLSearchParams(params.toString());
    if (value) p.set(key, value); else p.delete(key);
    p.delete('page');
    router.push(`/products?${p.toString()}`);
  };

  const clearAll = () => router.push('/products');
  const hasFilters = params.get('category') || params.get('material') || params.get('minPrice') || params.get('maxPrice');
  const activeSort = params.get('sort') || 'createdAt';

  const panel = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

      {/* Clear filters */}
      {hasFilters && (
        <button
          onClick={clearAll}
          style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: '#F87171', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: '0.25rem' }}
        >
          <X size={12} /> Clear all filters
        </button>
      )}

      {/* Category */}
      <Section title="Category">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
          <FilterBtn active={!params.get('category')} onClick={() => update('category', null)}>All</FilterBtn>
          {categories.map((cat) => (
            <FilterBtn key={cat} active={params.get('category') === cat} onClick={() => update('category', cat)}>
              <span style={{ textTransform: 'capitalize' }}>{cat}</span>
            </FilterBtn>
          ))}
        </div>
      </Section>

      {/* Sort */}
      <Section title="Sort By">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
          {sorts.map((s) => (
            <FilterBtn key={s.value} active={activeSort === s.value} onClick={() => update('sort', s.value)}>
              {s.label}
            </FilterBtn>
          ))}
        </div>
      </Section>

      {/* Price range */}
      <Section title="Price Range">
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="number"
            placeholder="Min"
            defaultValue={params.get('minPrice') || ''}
            onBlur={(e) => update('minPrice', e.target.value || null)}
            style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', padding: '0.45rem 0.65rem', fontSize: '0.8rem', color: '#fff', outline: 'none' }}
          />
          <input
            type="number"
            placeholder="Max"
            defaultValue={params.get('maxPrice') || ''}
            onBlur={(e) => update('maxPrice', e.target.value || null)}
            style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', padding: '0.45rem 0.65rem', fontSize: '0.8rem', color: '#fff', outline: 'none' }}
          />
        </div>
      </Section>

      {/* Material */}
      <Section title="Material">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
          {materials.map((m) => (
            <FilterBtn key={m} active={params.get('material') === m} onClick={() => update('material', params.get('material') === m ? null : m)}>
              {m}
            </FilterBtn>
          ))}
        </div>
      </Section>

    </div>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="btn-outline-gold"
        style={{ display: 'none', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', padding: '0.5rem 1rem', marginBottom: '1rem' }}
        id="filter-mobile-btn"
      >
        <Filter size={15} /> Filters {hasFilters && <span style={{ width: '0.45rem', height: '0.45rem', borderRadius: '9999px', background: '#C9A84C', display: 'inline-block' }} />}
      </button>

      {/* Desktop: always visible card */}
      <div className="filter-sidebar-desktop" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '1rem', padding: '1.25rem 1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.25rem', paddingBottom: '0.875rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <Filter size={14} color="#C9A84C" />
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff', letterSpacing: '0.04em' }}>Filters</span>
          {hasFilters && <span style={{ width: '0.45rem', height: '0.45rem', borderRadius: '9999px', background: '#C9A84C', marginLeft: 'auto', display: 'inline-block' }} />}
        </div>
        {panel}
      </div>

      {/* Mobile: collapsible */}
      {mobileOpen && (
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '1rem', padding: '1.25rem 1rem', marginBottom: '1rem' }} className="filter-sidebar-mobile">
          {panel}
        </div>
      )}
    </>
  );
}
