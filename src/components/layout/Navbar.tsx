'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, Gem, User, LogOut } from 'lucide-react';
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
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

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
    { href: '/products', label: 'All Jewelry' },
  ];

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(10,10,10,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201,168,76,0.15)' : 'none',
        }}
      >
        <div className="section-padding">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#E4C97A] flex items-center justify-center">
                <Gem size={16} className="text-black" />
              </div>
              <span className="text-xl font-bold gradient-text tracking-wide hidden sm:block">LuxeAR</span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    pathname === link.href ? 'text-gold' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              <Link href="/wishlist" className="p-2 text-gray-400 hover:text-[#C9A84C] transition-colors" aria-label="Wishlist">
                <Heart size={20} />
              </Link>

              <Link href="/cart" className="relative p-2 text-gray-400 hover:text-[#C9A84C] transition-colors" aria-label="Cart">
                <ShoppingBag size={20} />
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#C9A84C] text-black text-xs font-bold flex items-center justify-center">
                    {count}
                  </span>
                )}
              </Link>

              {user ? (
                <div className="hidden lg:flex items-center gap-2">
                  <span className="text-sm text-gray-400">{user.name.split(' ')[0]}</span>
                  <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-400 transition-colors" title="Logout">
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <Link href="/auth" className="hidden lg:block btn-outline-gold text-sm py-2 px-4">
                  Sign In
                </Link>
              )}

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2 text-gray-400 hover:text-white"
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t border-white/10 bg-black/80 backdrop-blur-xl">
            <div className="section-padding py-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
                    setSearchOpen(false);
                  }
                }}
                className="flex gap-3"
              >
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search rings, necklaces, diamonds..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A84C] transition-colors"
                />
                <button type="submit" className="btn-gold py-2.5 px-6 text-sm">Search</button>
              </form>
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/10">
            <div className="section-padding py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-300 hover:text-white py-2 border-b border-white/5 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              {user ? (
                <button onClick={handleLogout} className="flex items-center gap-2 text-red-400 py-2">
                  <LogOut size={18} /> Logout
                </button>
              ) : (
                <Link href="/auth" onClick={() => setMenuOpen(false)} className="btn-gold text-center mt-2">
                  Sign In / Register
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
