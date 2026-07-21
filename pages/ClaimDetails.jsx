import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { claims, claimTimeline, documents } from '../data/mockData.js';

export default function ClaimDetails() {
  const { id } = useParams();
  const claim = claims.find((c) => c.id === id) || claims[0];

  return (
    <div className="container section">
      <Link to="/claims" className="text-muted" style={{ fontSize: '0.85rem' }}>&larr; Back to claims</Link>
      <div className="flex-between mt-16" style={{ flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h2>Claim #{claim.id}</h2>
          <p className="text-muted mt-8">{claim.type} &middot; Policy {claim.policy} &middot; Submitted 10 May 2026</p>
        </div>
        <span className="badge badge-gold">{claim.status}</span>
      </div>

      <div className="card mt-32" style={{ padding: 24 }}>
        <h3 style={{ fontSize: '1rem' }}>Claim Timeline</h3>
        <div style={{ display: 'flex', overflowX: 'auto', gap: 0, marginTop: 24, paddingBottom: 8 }}>
          {claimTimeline.map((step, i) => (
            <div key={step.step} style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 130 }}>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{
                  width: 30, height: 30, borderRadius: '50%', margin: '0 auto',
                  background: step.done ? 'var(--green)' : 'var(--gray-300)',
                  color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700
                }}>{step.done ? '✓' : i + 1}</div>
                <p style={{ fontSize: '0.75rem', marginTop: 8, fontWeight: 600 }}>{step.step}</p>
                <p className="text-muted" style={{ fontSize: '0.7rem' }}>{step.date}</p>
              </div>
              {i < claimTimeline.length - 1 && (
                <div style={{ height: 2, flex: 1, background: step.done ? 'var(--green)' : 'var(--gray-300)', marginBottom: 30 }} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid mt-24" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: '1rem' }}>Claim Details</h3>
          <div className="mt-16" style={{ fontSize: '0.86rem', display: 'grid', gap: 10 }}>
            <div className="flex-between"><span className="text-muted">Claim Amount</span><strong>₹{claim.amount.toLocaleString('en-IN')}</strong></div>
            <div className="flex-between"><span className="text-muted">Assigned Officer</span><strong>{claim.officer}</strong></div>
            <div className="flex-between"><span className="text-muted">Risk Level</span><strong>{claim.risk}</strong></div>
          </div>
        </div>
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: '1rem' }}>Documents</h3>
          <div className="mt-16" style={{ display: 'grid', gap: 10, fontSize: '0.86rem' }}>
            {documents.slice(0, 4).map((d) => (
              <div key={d.name} className="flex-between">
                <span>{d.name}</span>
                <span className="badge badge-navy">{d.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
