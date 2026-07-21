import React from 'react';

export default function StatCard({ label, value, delta, icon, tone = 'navy' }) {
  const toneColor = {
    navy: 'var(--navy)',
    gold: 'var(--gold-dark)',
    green: 'var(--green)',
    red: 'var(--red)'
  }[tone];

  return (
    <div className="card" style={{ padding: 20 }}>
      <div className="flex-between">
        <span className="text-muted" style={{ fontSize: '0.82rem' }}>{label}</span>
        {icon && <span style={{ color: toneColor, fontSize: '1.2rem' }}>{icon}</span>}
      </div>
      <div style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: 6, color: 'var(--navy-dark)' }}>{value}</div>
      {delta && <div className="badge badge-green mt-8">{delta}</div>}
    </div>
  );
}
