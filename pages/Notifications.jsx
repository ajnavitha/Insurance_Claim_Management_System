import React from 'react';
import { notifications } from '../data/mockData.js';

const toneMap = { info: 'navy', warning: 'gold', success: 'green' };

export default function Notifications() {
  return (
    <div className="container section">
      <h2>Notification Center</h2>
      <p className="text-muted mt-8">Stay updated on claims, payments, and renewals.</p>

      <div className="card mt-24" style={{ padding: 8 }}>
        {notifications.map((n, i) => (
          <div key={n.title} className="flex-between" style={{ padding: 16, borderTop: i > 0 ? '1px solid var(--gray-100)' : 'none' }}>
            <div className="flex" style={{ gap: 12, alignItems: 'center' }}>
              <span className={`badge badge-${toneMap[n.type]}`} style={{ width: 8, height: 8, padding: 0, borderRadius: '50%' }}></span>
              <span style={{ fontSize: '0.9rem' }}>{n.title}</span>
            </div>
            <span className="text-muted" style={{ fontSize: '0.78rem' }}>{n.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
