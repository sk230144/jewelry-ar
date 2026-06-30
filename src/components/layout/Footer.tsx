import Link from 'next/link';
import { Gem, Mail, Phone, MapPin } from 'lucide-react';

const shopLinks = ['Rings', 'Necklaces', 'Bracelets', 'Earrings', 'New Arrivals', 'Sale'];
const helpLinks = ['Contact Us', 'Size Guide', 'Shipping Info', 'Returns', 'FAQ', 'Care Guide'];

export default function Footer() {
  return (
    <footer className="ft-root">
      {/* ── Main grid ── */}
      <div className="section-padding ft-main">
        <div className="footer-grid">

          {/* Brand */}
          <div className="footer-brand">
            <Link href="/" className="ft-logo">
              <div className="ft-logo-icon">
                <Gem size={14} color="#000" />
              </div>
              <span className="gradient-text ft-logo-text">LuxeAR</span>
            </Link>
            <p className="ft-tagline">
              Luxury jewelry with immersive AR try-on &amp; 3D visualization.
            </p>
            <div className="ft-socials">
              {['IG', 'TW', 'FB'].map((s) => (
                <span key={s} className="ft-social-btn">{s}</span>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div className="footer-col">
            <p className="ft-col-head">Shop</p>
            <ul className="ft-link-list">
              {shopLinks.map((item) => (
                <li key={item}>
                  <Link href={`/products?category=${item.toLowerCase().replace(' ', '-')}`} className="ft-link">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div className="footer-col">
            <p className="ft-col-head">Help</p>
            <ul className="ft-link-list">
              {helpLinks.map((item) => (
                <li key={item}>
                  <Link href="/contact" className="ft-link">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <p className="ft-col-head">Contact</p>
            <ul className="ft-contact-list">
              <li>
                <MapPin size={13} color="#C9A84C" className="ft-contact-icon" />
                <span>123 Diamond District,<br />New York, NY 10036</span>
              </li>
              <li>
                <Phone size={13} color="#C9A84C" className="ft-contact-icon" />
                <span>+1 (800) LUXE-ART</span>
              </li>
              <li>
                <Mail size={13} color="#C9A84C" className="ft-contact-icon" />
                <span>hello@luxear.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="ft-bottom-wrap">
        <div className="section-padding ft-bottom">
          <p className="ft-copy">© {new Date().getFullYear()} LuxeAR. All rights reserved.</p>
          <div className="ft-legal">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((t) => (
              <Link key={t} href="#" className="ft-link">{t}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
