import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ArrowRight, Gem, Shield, Truck, RotateCcw, Star } from 'lucide-react';
import FeaturedProducts from '@/components/ui/FeaturedProducts';
import NewsletterForm from '@/components/ui/NewsletterForm';

export default function HomePage() {
  const categories = [
    { name: 'Rings', href: '/products?category=rings', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80', count: '48 styles' },
    { name: 'Necklaces', href: '/products?category=necklaces', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80', count: '62 styles' },
    { name: 'Bracelets', href: '/products?category=bracelets', image: 'https://images.unsplash.com/photo-1573408301185-9519f94e2a87?w=600&q=80', count: '35 styles' },
    { name: 'Earrings', href: '/products?category=earrings', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80', count: '54 styles' },
  ];

  const features = [
    { icon: Sparkles, title: 'AR Try-On', desc: 'See how jewelry looks on you before buying using your camera' },
    { icon: Gem, title: '3D Visualization', desc: 'Explore every facet with interactive 360° 3D models' },
    { icon: Shield, title: 'Certified Authentic', desc: 'Every piece comes with a certificate of authenticity' },
    { icon: Truck, title: 'Free Shipping', desc: 'Complimentary insured shipping on all orders over $500' },
    { icon: RotateCcw, title: '30-Day Returns', desc: 'Hassle-free returns within 30 days of purchase' },
    { icon: Star, title: 'Expert Crafted', desc: 'Handcrafted by master jewelers with 20+ years experience' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&q=85"
            alt="Luxury jewelry hero"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #000 30%, rgba(0,0,0,0.7) 60%, transparent)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #000 0%, transparent 50%)' }} />
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: '#C9A84C',
                opacity: 0.3,
                left: `${10 + i * 8}%`,
                top: `${20 + (i % 4) * 20}%`,
                animationDelay: `${i * 0.3}s`,
                animation: `float ${3 + (i % 3)}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>

        <div className="section-padding relative z-10 pt-24 pb-16">
          <div style={{ maxWidth: '36rem' }}>
            <div className="flex items-center gap-2 mb-6">
              <div style={{ height: '1px', width: '2rem', background: '#C9A84C' }} />
              <span className="text-gold text-sm font-medium" style={{ letterSpacing: '0.15em', textTransform: 'uppercase' }}>AR-Powered Jewelry</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="block text-white">Wear Beauty</span>
              <span className="block gradient-text">Before You Buy</span>
            </h1>
            <p className="text-lg mb-8" style={{ color: '#9CA3AF', maxWidth: '32rem', lineHeight: '1.75' }}>
              Try on rings, necklaces, bracelets and earrings virtually using our cutting-edge AR technology.
              Explore stunning 3D models before making your perfect choice.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products" className="btn-gold text-base">
                Shop Now <ArrowRight size={18} />
              </Link>
              <Link href="/products?featured=true" className="btn-outline-gold text-base">
                <Sparkles size={18} /> Featured Pieces
              </Link>
            </div>

            <div className="flex gap-8 mt-12 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              {[['10K+', 'Happy Customers'], ['500+', 'Luxury Pieces'], ['4.9★', 'Average Rating']].map(([num, label]) => (
                <div key={label}>
                  <div className="text-2xl font-bold gradient-text">{num}</div>
                  <div className="text-xs" style={{ color: '#6B7280' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AR Feature Banner */}
      <section className="py-16" style={{ background: 'linear-gradient(to right, #0A0A0A, #111, #0A0A0A)', borderTop: '1px solid rgba(201,168,76,0.1)', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
        <div className="section-padding">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div style={{ flex: 1 }}>
              <div className="inline-flex items-center gap-2 mb-6" style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '9999px', padding: '0.375rem 1rem', color: '#C9A84C', fontSize: '0.875rem', fontWeight: 500 }}>
                <Sparkles size={14} /> New Feature
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Try Before You Buy<br />
                <span className="gradient-text">AR Virtual Try-On</span>
              </h2>
              <p className="mb-6" style={{ color: '#9CA3AF', lineHeight: 1.75 }}>
                Our revolutionary AR technology lets you see exactly how any piece of jewelry looks on you using just your camera. No app needed — works right in your browser.
              </p>
              <ul className="space-y-3 mb-8">
                {['Real-time camera overlay', 'Accurate size simulation', 'Multiple material options', 'Share with friends'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm" style={{ color: '#D1D5DB' }}>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'rgba(201,168,76,0.2)' }}>
                      <div className="w-2 h-2 rounded-full" style={{ background: '#C9A84C' }} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/products" className="btn-gold">
                Try It Now <ArrowRight size={18} />
              </Link>
            </div>
            <div style={{ flex: 1, position: 'relative' }}>
              <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: '16/9', border: '1px solid rgba(255,255,255,0.1)', background: '#000', position: 'relative' }}>
                <Image
                  src="https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&q=80"
                  alt="AR Try-on preview"
                  fill
                  className="object-cover"
                  style={{ opacity: 0.8 }}
                />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '5rem', height: '5rem', borderRadius: '9999px', background: 'rgba(201,168,76,0.2)', border: '2px solid #C9A84C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 0, height: 0, borderTop: '12px solid transparent', borderLeft: '20px solid #C9A84C', borderBottom: '12px solid transparent', marginLeft: '6px' }} />
                  </div>
                </div>
                <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', color: '#C9A84C', fontSize: '0.75rem', padding: '0.25rem 0.75rem', borderRadius: '9999px', border: '1px solid rgba(201,168,76,0.3)' }}>
                  LIVE AR Preview
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Shop by Category</h2>
            <p style={{ color: '#6B7280' }}>Explore our curated collection of fine jewelry</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link key={cat.name} href={cat.href} className="group" style={{ position: 'relative', overflow: 'hidden', borderRadius: '1rem', aspectRatio: '3/4', display: 'block' }}>
                <Image src={cat.image} alt={cat.name} fill className="object-cover" style={{ transition: 'transform 0.5s' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)' }} />
                <div style={{ position: 'absolute', bottom: '1rem', left: '1rem' }}>
                  <div className="text-lg font-bold text-white">{cat.name}</div>
                  <div className="text-xs text-gold">{cat.count}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="py-8 pb-20">
        <div className="section-padding">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">Featured Pieces</h2>
              <p style={{ color: '#6B7280' }}>Handpicked by our expert curators</p>
            </div>
            <Link href="/products?featured=true" className="btn-outline-gold text-sm py-2 px-5" style={{ display: 'none', alignItems: 'center', gap: '0.25rem' }}>
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <FeaturedProducts />
        </div>
      </section>

      {/* Features grid */}
      <section className="py-20" style={{ background: '#080808', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Why LuxeAR?</h2>
            <p style={{ color: '#6B7280' }}>The future of jewelry shopping</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card-glass p-6" style={{ transition: 'all 0.3s' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(201,168,76,0.1)' }}>
                  <Icon size={22} className="text-gold" />
                </div>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm" style={{ color: '#6B7280', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20">
        <div className="section-padding">
          <div className="card-glass p-10 text-center" style={{ maxWidth: '36rem', margin: '0 auto' }}>
            <Gem size={36} className="text-gold mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-3">Stay in the Loop</h2>
            <p className="text-sm mb-6" style={{ color: '#6B7280' }}>Get early access to new arrivals, exclusive offers and AR feature updates.</p>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}
