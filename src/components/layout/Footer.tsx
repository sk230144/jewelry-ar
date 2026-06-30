import Link from 'next/link';
import { Gem, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-white/5 mt-20">
      <div className="section-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#E4C97A] flex items-center justify-center">
                <Gem size={16} className="text-black" />
              </div>
              <span className="text-xl font-bold gradient-text">LuxeAR</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              Experience jewelry like never before with our immersive AR virtual try-on and 3D visualization technology.
            </p>
            <div className="flex gap-4">
              {['IG', 'TW', 'FB'].map((label, i) => (
                <button key={i} className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#C9A84C] hover:border-[#C9A84C] transition-colors text-xs font-bold">
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold text-white mb-4">Shop</h4>
            <ul className="space-y-2.5 text-sm text-gray-500">
              {['Rings', 'Necklaces', 'Bracelets', 'Earrings', 'New Arrivals', 'Sale'].map((item) => (
                <li key={item}>
                  <Link href={`/products?category=${item.toLowerCase()}`} className="hover:text-[#C9A84C] transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-semibold text-white mb-4">Help</h4>
            <ul className="space-y-2.5 text-sm text-gray-500">
              {['Contact Us', 'Size Guide', 'Shipping Info', 'Returns', 'FAQ', 'Care Guide'].map((item) => (
                <li key={item}>
                  <Link href="/contact" className="hover:text-[#C9A84C] transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-gold mt-0.5 shrink-0" />
                <span>123 Diamond District, New York, NY 10036</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-gold shrink-0" />
                <span>+1 (800) LUXE-ART</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-gold shrink-0" />
                <span>hello@luxear.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} LuxeAR. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-[#C9A84C] transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#C9A84C] transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-[#C9A84C] transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
