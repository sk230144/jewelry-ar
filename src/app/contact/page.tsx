'use client';
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSent(true);
      toast.success(data.message);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to send');
    } finally {
      setLoading(false);
    }
  };

  const contacts = [
    { icon: Mail, label: 'Email', value: 'hello@luxear.com', href: 'mailto:hello@luxear.com' },
    { icon: Phone, label: 'Phone', value: '+1 (800) LUXE-ART', href: 'tel:+18005893278' },
    { icon: MapPin, label: 'Address', value: '123 Diamond District, New York, NY 10036', href: '#' },
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="section-padding">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Get in Touch</h1>
          <p style={{ color: '#6B7280' }}>We&apos;re here to help with any questions about our jewelry</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-6">
            {contacts.map(({ icon: Icon, label, value, href }) => (
              <a key={label} href={href} className="flex items-start gap-4 card-glass p-5 rounded-2xl hover:border-gold/30 transition-colors group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(201,168,76,0.1)' }}>
                  <Icon size={18} className="text-gold" />
                </div>
                <div>
                  <div className="text-xs mb-1" style={{ color: '#6B7280' }}>{label}</div>
                  <div className="text-sm font-medium text-white group-hover:text-gold transition-colors">{value}</div>
                </div>
              </a>
            ))}

            <div className="card-glass p-5 rounded-2xl">
              <h4 className="font-semibold text-white mb-2">Business Hours</h4>
              <div className="space-y-1.5 text-sm" style={{ color: '#6B7280' }}>
                <div className="flex justify-between"><span>Mon – Fri</span><span>9:00 AM – 6:00 PM</span></div>
                <div className="flex justify-between"><span>Saturday</span><span>10:00 AM – 4:00 PM</span></div>
                <div className="flex justify-between"><span>Sunday</span><span>Closed</span></div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {sent ? (
              <div className="card-glass p-10 rounded-2xl text-center">
                <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                <p style={{ color: '#9CA3AF' }}>We&apos;ll get back to you within 24 hours.</p>
                <button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }} className="btn-outline-gold mt-6">
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card-glass p-8 rounded-2xl space-y-4">
                <h3 className="font-bold text-white text-lg mb-2">Send a Message</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-1.5">Your Name</label>
                    <input required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-1.5">Email</label>
                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-1.5">Subject</label>
                  <input type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="How can we help?"
                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-1.5">Message</label>
                  <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your inquiry..."
                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none resize-none"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
                </div>
                <button type="submit" disabled={loading} className="btn-gold w-full justify-center">
                  {loading ? <Loader2 size={18} className="animate-spin" /> : <><Send size={16} /> Send Message</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
