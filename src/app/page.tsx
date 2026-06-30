import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ArrowRight, Gem, Shield, Truck, RotateCcw, Star } from 'lucide-react';
import FeaturedProducts from '@/components/ui/FeaturedProducts';
import NewsletterForm from '@/components/ui/NewsletterForm';

export default function HomePage() {
  const categories = [
    { name: 'Rings',     href: '/products?category=rings',     image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80', count: '48 styles' },
    { name: 'Necklaces', href: '/products?category=necklaces', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80', count: '62 styles' },
    { name: 'Bracelets', href: '/products?category=bracelets', image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&q=80', count: '35 styles' },
    { name: 'Earrings',  href: '/products?category=earrings',  image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80', count: '54 styles' },
  ];

  const features = [
    { icon: Sparkles,  title: 'AR Try-On',          desc: 'See how jewelry looks on you before buying using your camera' },
    { icon: Gem,       title: '3D Visualization',   desc: 'Explore every facet with interactive 360° 3D models' },
    { icon: Shield,    title: 'Certified Authentic', desc: 'Every piece comes with a certificate of authenticity' },
    { icon: Truck,     title: 'Free Shipping',       desc: 'Complimentary insured shipping on all orders over $500' },
    { icon: RotateCcw, title: '30-Day Returns',      desc: 'Hassle-free returns within 30 days of purchase' },
    { icon: Star,      title: 'Expert Crafted',      desc: 'Handcrafted by master jewelers with 20+ years experience' },
  ];

  return (
    <div style={{ overflowX: 'hidden' }}>

      {/* ── Hero ── */}
      <section style={{ position: 'relative', minHeight: '100svh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        {/* Background image */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image
            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&q=85"
            alt="Luxury jewelry"
            fill
            priority
            style={{ objectFit: 'cover', opacity: 0.28 }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg,#000 35%,rgba(0,0,0,0.65) 65%,transparent)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,#000 0%,transparent 45%)' }} />
        </div>

        {/* Gold particles */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          {[...Array(10)].map((_, i) => (
            <div key={i} style={{ position: 'absolute', width: '4px', height: '4px', borderRadius: '9999px', background: '#C9A84C', opacity: 0.25, left: `${8 + i * 9}%`, top: `${15 + (i % 5) * 17}%`, animation: `float ${3 + (i % 3)}s ease-in-out ${i * 0.4}s infinite` }} />
          ))}
        </div>

        <div className="section-padding" style={{ position: 'relative', zIndex: 1, paddingTop: '5.5rem', paddingBottom: '4rem', width: '100%' }}>
          <div style={{ maxWidth: '34rem' }}>
            {/* Eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <div style={{ height: '1px', width: '1.75rem', background: '#C9A84C', flexShrink: 0 }} />
              <span style={{ color: '#C9A84C', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase' }}>AR-Powered Jewelry</span>
            </div>

            {/* Headline */}
            <h1 style={{ fontSize: 'clamp(2.4rem,6vw,4.5rem)', fontWeight: 800, lineHeight: 1.08, marginBottom: '1.25rem', color: '#fff' }}>
              Wear Beauty<br />
              <span className="gradient-text">Before You Buy</span>
            </h1>

            <p style={{ fontSize: 'clamp(0.9rem,2vw,1.1rem)', color: '#9CA3AF', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '28rem' }}>
              Try on rings, necklaces, bracelets and earrings virtually. Explore stunning 3D models before making your perfect choice.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <Link href="/products" className="btn-gold">Shop Now <ArrowRight size={16} /></Link>
              <Link href="/products?featured=true" className="btn-outline-gold"><Sparkles size={16} /> Featured</Link>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: 'clamp(1.5rem,4vw,3rem)', marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              {[['10K+','Customers'],['500+','Pieces'],['4.9★','Rating']].map(([n,l])=>(
                <div key={l}>
                  <div className="gradient-text" style={{ fontSize: 'clamp(1.2rem,3vw,1.6rem)', fontWeight: 800 }}>{n}</div>
                  <div style={{ fontSize: '0.72rem', color: '#6B7280' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── AR Banner ── */}
      <section style={{ borderTop: '1px solid rgba(201,168,76,0.1)', borderBottom: '1px solid rgba(201,168,76,0.1)', background: 'linear-gradient(135deg,#0A0A0A,#111,#0A0A0A)', padding: 'clamp(2.5rem,5vw,4rem) 0' }}>
        <div className="section-padding">
          <div className="ar-banner-grid">
            {/* Text side */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '9999px', padding: '0.3rem 0.9rem', color: '#C9A84C', fontSize: '0.78rem', fontWeight: 500, marginBottom: '1.25rem' }}>
                <Sparkles size={13} /> New Feature
              </div>
              <h2 style={{ fontSize: 'clamp(1.6rem,4vw,2.5rem)', fontWeight: 800, color: '#fff', lineHeight: 1.15, marginBottom: '1rem' }}>
                Try Before You Buy<br />
                <span className="gradient-text">AR Virtual Try-On</span>
              </h2>
              <p style={{ color: '#9CA3AF', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                Our AR technology lets you see exactly how any jewelry looks on you using just your camera. No app needed — browser-native.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.75rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {['Real-time camera overlay','Accurate size simulation','Multiple material options','Share with friends'].map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#D1D5DB', fontSize: '0.85rem' }}>
                    <div style={{ width: '1.1rem', height: '1.1rem', borderRadius: '9999px', background: 'rgba(201,168,76,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <div style={{ width: '0.35rem', height: '0.35rem', borderRadius: '9999px', background: '#C9A84C' }} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/products" className="btn-gold">Try It Now <ArrowRight size={16} /></Link>
            </div>

            {/* Video mockup side */}
            <div style={{ position: 'relative' }}>
              <div style={{ borderRadius: '1rem', overflow: 'hidden', aspectRatio: '16/9', border: '1px solid rgba(255,255,255,0.08)', background: '#000', position: 'relative' }}>
                <Image src="https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&q=80" alt="AR preview" fill style={{ objectFit: 'cover', opacity: 0.75 }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '4rem', height: '4rem', borderRadius: '9999px', background: 'rgba(201,168,76,0.2)', border: '2px solid #C9A84C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 0, height: 0, borderTop: '10px solid transparent', borderLeft: '18px solid #C9A84C', borderBottom: '10px solid transparent', marginLeft: '4px' }} />
                  </div>
                </div>
                <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', color: '#C9A84C', fontSize: '0.7rem', padding: '0.2rem 0.6rem', borderRadius: '9999px', border: '1px solid rgba(201,168,76,0.3)' }}>
                  LIVE AR Preview
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section style={{ padding: 'clamp(3rem,6vw,5rem) 0' }}>
        <div className="section-padding">
          <div style={{ textAlign: 'center', marginBottom: 'clamp(1.5rem,4vw,3rem)' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem,4vw,2.5rem)', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>Shop by Category</h2>
            <p style={{ color: '#6B7280', fontSize: '0.9rem' }}>Explore our curated collection of fine jewelry</p>
          </div>
          <div className="category-grid">
            {categories.map((cat) => (
              <Link key={cat.name} href={cat.href} className="category-card" style={{ position: 'relative' }}>
                <Image src={cat.image} alt={cat.name} fill style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }} sizes="(max-width:640px) 50vw,(max-width:1024px) 25vw,20vw" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,0.85) 0%,rgba(0,0,0,0.15) 55%,transparent)' }} />
                <div style={{ position: 'absolute', bottom: '0.85rem', left: '0.85rem' }}>
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: 'clamp(0.9rem,2vw,1.1rem)' }}>{cat.name}</div>
                  <div style={{ color: '#C9A84C', fontSize: '0.72rem', marginTop: '0.1rem' }}>{cat.count}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section style={{ paddingBottom: 'clamp(3rem,6vw,5rem)' }}>
        <div className="section-padding">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 'clamp(1.5rem,4vw,3rem)', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <h2 style={{ fontSize: 'clamp(1.6rem,4vw,2.5rem)', fontWeight: 800, color: '#fff', marginBottom: '0.25rem' }}>Featured Pieces</h2>
              <p style={{ color: '#6B7280', fontSize: '0.85rem' }}>Handpicked by our expert curators</p>
            </div>
            <Link href="/products?featured=true" className="btn-outline-gold" style={{ fontSize: '0.82rem', padding: '0.45rem 1rem' }}>
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <FeaturedProducts />
        </div>
      </section>

      {/* ── Features grid ── */}
      <section style={{ background: '#080808', borderTop: '1px solid rgba(255,255,255,0.05)', padding: 'clamp(3rem,6vw,5rem) 0' }}>
        <div className="section-padding">
          <div style={{ textAlign: 'center', marginBottom: 'clamp(1.5rem,4vw,3rem)' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem,3.5vw,2.2rem)', fontWeight: 800, color: '#fff', marginBottom: '0.4rem' }}>Why LuxeAR?</h2>
            <p style={{ color: '#6B7280', fontSize: '0.88rem' }}>The future of jewelry shopping</p>
          </div>
          <div className="features-grid">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card-glass" style={{ padding: 'clamp(1rem,3vw,1.5rem)', transition: 'border-color 0.3s' }}>
                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.6rem', background: 'rgba(201,168,76,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.85rem' }}>
                  <Icon size={20} color="#C9A84C" />
                </div>
                <h3 style={{ fontWeight: 600, color: '#fff', marginBottom: '0.4rem', fontSize: '0.95rem' }}>{title}</h3>
                <p style={{ color: '#6B7280', fontSize: '0.8rem', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section style={{ padding: 'clamp(3rem,6vw,5rem) 0' }}>
        <div className="section-padding">
          <div className="card-glass" style={{ padding: 'clamp(1.5rem,5vw,3rem)', textAlign: 'center', maxWidth: '34rem', margin: '0 auto' }}>
            <Gem size={32} color="#C9A84C" style={{ margin: '0 auto 0.75rem' }} />
            <h2 style={{ fontSize: 'clamp(1.2rem,3vw,1.6rem)', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>Stay in the Loop</h2>
            <p style={{ color: '#6B7280', fontSize: '0.83rem', marginBottom: '1.25rem' }}>Early access to new arrivals, offers and AR feature updates.</p>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}
