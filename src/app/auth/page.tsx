'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Gem, Eye, EyeOff, Loader2, ArrowLeft } from 'lucide-react';
import { useStore } from '@/store/useStore';
import toast from 'react-hot-toast';

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUser } = useStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
      const body = mode === 'login' ? { email: form.email, password: form.password } : form;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setUser(data.user);
      toast.success(mode === 'login' ? 'Welcome back!' : 'Account created!');
      router.push('/');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Error');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.8rem 1rem',
    borderRadius: '0.75rem',
    fontSize: '0.88rem',
    color: '#fff',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box' as const,
  };

  return (
    <div style={{ minHeight: '100svh', display: 'flex', background: '#0A0A0A' }}>

      {/* ── Left panel: jewelry image (hidden on mobile) ── */}
      <div className="auth-left-panel" style={{ position: 'relative', flex: '1', overflow: 'hidden' }}>
        <Image
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=85"
          alt="Luxury jewelry"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        {/* Overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%)' }} />

        {/* Brand mark */}
        <div style={{ position: 'absolute', top: '2rem', left: '2rem', display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
          <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '9999px', background: 'linear-gradient(135deg,#C9A84C,#E4C97A)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Gem size={15} color="#000" />
          </div>
          <span style={{ fontSize: '1.2rem', fontWeight: 700, background: 'linear-gradient(135deg,#C9A84C,#E4C97A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>LuxeAR</span>
        </div>

        {/* Bottom quote */}
        <div style={{ position: 'absolute', bottom: '2.5rem', left: '2rem', right: '2rem' }}>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 'clamp(1.1rem,2.5vw,1.5rem)', fontWeight: 700, lineHeight: 1.3, marginBottom: '0.5rem' }}>
            Wear Beauty<br />Before You Buy
          </p>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem' }}>
            AR-powered virtual try-on for luxury jewelry
          </p>
        </div>
      </div>

      {/* ── Right panel: form ── */}
      <div style={{ width: '100%', maxWidth: '480px', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(1.5rem,5vw,3rem) clamp(1.25rem,5vw,3rem)', position: 'relative', overflowY: 'auto' }}>

        {/* Back to home */}
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#6B7280', fontSize: '0.78rem', textDecoration: 'none', marginBottom: '2.5rem', transition: 'color 0.2s' }}>
          <ArrowLeft size={13} /> Back to home
        </Link>

        {/* Logo (mobile only — left panel is hidden) */}
        <div className="auth-mobile-logo" style={{ display: 'none', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
          <div style={{ width: '2rem', height: '2rem', borderRadius: '9999px', background: 'linear-gradient(135deg,#C9A84C,#E4C97A)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Gem size={14} color="#000" />
          </div>
          <span style={{ fontSize: '1.1rem', fontWeight: 700, background: 'linear-gradient(135deg,#C9A84C,#E4C97A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>LuxeAR</span>
        </div>

        {/* Heading */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: 'clamp(1.6rem,4vw,2.2rem)', fontWeight: 800, color: '#fff', marginBottom: '0.4rem', lineHeight: 1.15 }}>
            {mode === 'login' ? 'Welcome back' : 'Create account'}
          </h1>
          <p style={{ color: '#6B7280', fontSize: '0.88rem' }}>
            {mode === 'login' ? 'Sign in to your LuxeAR account' : 'Join LuxeAR and discover luxury jewelry'}
          </p>
        </div>

        {/* Tab switcher */}
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem', padding: '0.25rem', marginBottom: '1.75rem', border: '1px solid rgba(255,255,255,0.07)' }}>
          {(['login', 'register'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                flex: 1, padding: '0.6rem', borderRadius: '0.55rem', fontSize: '0.85rem', fontWeight: 600,
                border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                background: mode === m ? '#C9A84C' : 'transparent',
                color: mode === m ? '#000' : '#6B7280',
              }}
            >
              {m === 'login' ? 'Sign In' : 'Register'}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>

          {mode === 'register' && (
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#D1D5DB', marginBottom: '0.45rem' }}>Full Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Jane Doe"
                style={inputStyle}
              />
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#D1D5DB', marginBottom: '0.45rem' }}>Email address</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              style={inputStyle}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#D1D5DB' }}>Password</label>
              {mode === 'login' && (
                <button type="button" style={{ fontSize: '0.72rem', color: '#C9A84C', background: 'none', border: 'none', cursor: 'pointer' }}>
                  Forgot password?
                </button>
              )}
            </div>
            <div style={{ position: 'relative' }}>
              <input
                type={showPw ? 'text' : 'password'}
                required
                minLength={6}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                style={{ ...inputStyle, paddingRight: '3rem' }}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                style={{ position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', display: 'flex', alignItems: 'center' }}
              >
                {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
            {mode === 'register' && (
              <p style={{ fontSize: '0.72rem', color: '#6B7280', marginTop: '0.35rem' }}>Minimum 6 characters</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-gold"
            style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', fontSize: '0.92rem', marginTop: '0.25rem', opacity: loading ? 0.75 : 1 }}
          >
            {loading
              ? <><Loader2 size={17} style={{ animation: 'spin 0.8s linear infinite' }} /> {mode === 'login' ? 'Signing in…' : 'Creating account…'}</>
              : mode === 'login' ? 'Sign In' : 'Create Account'
            }
          </button>
        </form>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '1.5rem 0' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
          <span style={{ fontSize: '0.72rem', color: '#4B5563' }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
        </div>

        {/* Switch mode */}
        <p style={{ textAlign: 'center', fontSize: '0.83rem', color: '#6B7280' }}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            style={{ color: '#C9A84C', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.83rem' }}
          >
            {mode === 'login' ? 'Create one' : 'Sign in'}
          </button>
        </p>

        {/* Footer note */}
        <p style={{ textAlign: 'center', fontSize: '0.7rem', color: '#374151', marginTop: '2rem' }}>
          By continuing you agree to our{' '}
          <span style={{ color: '#6B7280' }}>Terms of Service</span> &amp;{' '}
          <span style={{ color: '#6B7280' }}>Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}
