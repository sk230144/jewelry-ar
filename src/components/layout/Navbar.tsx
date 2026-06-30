'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, Gem, LogOut } from 'lucide-react';
import { useStore } from '@/store/useStore';
import toast from 'react-hot-toast';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const { cartCount, user, logout } = useStore();
  const count = cartCount();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // close menu on route change
  useEffect(() => { setMenuOpen(false); setSearchOpen(false); }, [pathname]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    logout();
    toast.success('Logged out');
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products?category=rings', label: 'Rings' },
    { href: '/products?category=necklaces', label: 'Necklaces' },
    { href: '/products?category=bracelets', label: 'Bracelets' },
    { href: '/products?category=earrings', label: 'Earrings' },
    { href: '/products', label: 'All' },
  ];

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href.split('?')[0]);

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'background 0.3s, border-color 0.3s',
        background: scrolled ? 'rgba(10,10,10,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.15)' : '1px solid transparent',
      }}
    >
      <div className="section-padding">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '3.75rem' }}>

          {/* Logo — always visible */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', flexShrink: 0 }}>
            <div style={{ width: '2rem', height: '2rem', borderRadius: '9999px', background: 'linear-gradient(135deg,#C9A84C,#E4C97A)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Gem size={15} color="#000" />
            </div>
            <span className="gradient-text" style={{ fontSize: '1.15rem', fontWeight: 700, letterSpacing: '0.02em' }}>LuxeAR</span>
          </Link>

          {/* Desktop links */}
          <div className="nav-desktop-links">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: '0.85rem', fontWeight: 500, textDecoration: 'none',
                  color: isActive(link.href) ? '#C9A84C' : '#D1D5DB',
                  transition: 'color 0.2s',
                  paddingBottom: '2px',
                  borderBottom: isActive(link.href) ? '1.5px solid #C9A84C' : '1.5px solid transparent',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <button
              onClick={() => { setSearchOpen(!searchOpen); setMenuOpen(false); }}
              style={{ padding: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: searchOpen ? '#C9A84C' : '#9CA3AF', transition: 'color 0.2s' }}
              aria-label="Search"
            >
              <Search size={19} />
            </button>

            <Link href="/wishlist" style={{ padding: '0.5rem', color: '#9CA3AF', transition: 'color 0.2s', display: 'flex' }} aria-label="Wishlist">
              <Heart size={19} />
            </Link>

            <Link href="/cart" style={{ padding: '0.5rem', color: '#9CA3AF', transition: 'color 0.2s', display: 'flex', position: 'relative' }} aria-label="Cart">
              <ShoppingBag size={19} />
              {count > 0 && (
                <span style={{ position: 'absolute', top: '2px', right: '2px', width: '1.1rem', height: '1.1rem', borderRadius: '9999px', background: '#C9A84C', color: '#000', fontSize: '0.65rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </Link>

            {/* Sign in — desktop only */}
            {user ? (
              <div className="nav-desktop-links" style={{ alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>{user.name.split(' ')[0]}</span>
                <button onClick={handleLogout} style={{ padding: '0.4rem', background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', transition: 'color 0.2s' }} title="Logout">
                  <LogOut size={17} />
                </button>
              </div>
            ) : (
              <Link href="/auth" className="btn-outline-gold nav-desktop-links" style={{ fontSize: '0.8rem', padding: '0.4rem 1rem' }}>
                Sign In
              </Link>
            )}

            {/* Hamburger */}
            <button
              onClick={() => { setMenuOpen(!menuOpen); setSearchOpen(false); }}
              className="nav-hamburger"
              style={{ padding: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF' }}
              aria-label="Menu"
            >
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
      </div>

      {/* Search bar */}
      {searchOpen && (
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', background: 'rgba(10,10,10,0.97)', backdropFilter: 'blur(20px)' }}>
          <div className="section-padding" style={{ paddingTop: '0.75rem', paddingBottom: '0.75rem' }}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
                  setSearchOpen(false);
                  setSearchQuery('');
                }
              }}
              style={{ display: 'flex', gap: '0.5rem' }}
            >
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search rings, necklaces, diamonds…"
                style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '9999px', padding: '0.55rem 1.1rem', fontSize: '0.85rem', color: '#fff', outline: 'none', minWidth: 0 }}
              />
              <button type="submit" className="btn-gold" style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem' }}>Search</button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: 'rgba(8,8,8,0.98)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="section-padding" style={{ paddingTop: '1rem', paddingBottom: '1.25rem' }}>
            {/* Nav links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{ color: isActive(link.href) ? '#C9A84C' : '#D1D5DB', fontSize: '0.95rem', fontWeight: 500, textDecoration: 'none', padding: '0.65rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'block', transition: 'color 0.2s' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Auth row */}
            <div style={{ marginTop: '1rem' }}>
              {user ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Hi, {user.name.split(' ')[0]}</span>
                  <button onClick={() => { handleLogout(); setMenuOpen(false); }} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#F87171', fontSize: '0.85rem', background: 'none', border: 'none', cursor: 'pointer' }}>
                    <LogOut size={15} /> Sign out
                  </button>
                </div>
              ) : (
                <Link href="/auth" className="btn-gold" style={{ width: '100%', justifyContent: 'center', fontSize: '0.9rem' }} onClick={() => setMenuOpen(false)}>
                  Sign In / Register
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
