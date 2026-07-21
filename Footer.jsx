import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--navy-dark)', color: '#cdd8ea', marginTop: 60 }}>
      <div className="container" style={{ padding: '48px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 32 }}>
        <div>
          <h3 style={{ color: 'var(--white)', fontSize: '1.05rem' }}>InsureApp</h3>
          <p className="mt-8" style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>
            Compare plans. Buy with confidence. Insurance, made honest.
          </p>
        </div>
        <div>
          <h4 style={{ color: 'var(--white)', fontSize: '0.9rem' }}>Company</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12, fontSize: '0.85rem' }}>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/support">Support</Link>
          </div>
        </div>
        <div>
          <h4 style={{ color: 'var(--white)', fontSize: '0.9rem' }}>Plans</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12, fontSize: '0.85rem' }}>
            <Link to="/policies">Compare Plans</Link>
            <Link to="/claims">File a Claim</Link>
            <Link to="/reports">Reports</Link>
          </div>
        </div>
        <div>
          <h4 style={{ color: 'var(--white)', fontSize: '0.9rem' }}>Trust</h4>
          <p className="mt-8" style={{ fontSize: '0.85rem' }}>100% Secure &middot; IRDAI-certified advisors &middot; No spam calls</p>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', textAlign: 'center', padding: '16px', fontSize: '0.78rem' }}>
        © {new Date().getFullYear()} InsureApp. All rights reserved.
      </div>
    </footer>
  );
}
