import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { customerPolicies, claims, payments } from '../data/mockData.js';

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="container section">
      <div className="card" style={{ padding: 28 }}>
        <div className="flex" style={{ gap: 20, alignItems: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--blue-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 700, color: 'var(--navy)' }}>
            {(user?.name || 'G U').split(' ').map((n) => n[0]).join('')}
          </div>
          <div>
            <h2>{user?.name || 'Guest User'}</h2>
            <p className="text-muted mt-8">{user?.email || 'guest@example.com'} &middot; Customer ID CUST10023</p>
          </div>
        </div>
      </div>

      <div className="grid mt-24" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="card" style={{ padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: '1.4rem', fontWeight: 700 }}>{customerPolicies.length}</div>
          <div className="text-muted" style={{ fontSize: '0.82rem' }}>Policies</div>
        </div>
        <div className="card" style={{ padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: '1.4rem', fontWeight: 700 }}>{claims.length}</div>
          <div className="text-muted" style={{ fontSize: '0.82rem' }}>Claims</div>
        </div>
        <div className="card" style={{ padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: '1.4rem', fontWeight: 700 }}>₹{payments.reduce((s, p) => s + p.amount, 0).toLocaleString('en-IN')}</div>
          <div className="text-muted" style={{ fontSize: '0.82rem' }}>Total Paid</div>
        </div>
      </div>
    </div>
  );
}
