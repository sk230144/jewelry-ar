'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Subscribed! Thank you for joining LuxeAR.');
      setEmail('');
    }
  };

  return (
    <form className="flex gap-3" style={{ maxWidth: '28rem', margin: '0 auto' }} onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '9999px', padding: '0.75rem 1.25rem', fontSize: '0.875rem', color: '#fff', outline: 'none' }}
      />
      <button type="submit" className="btn-gold py-3 px-6 text-sm whitespace-nowrap">Subscribe</button>
    </form>
  );
}
