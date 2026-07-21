import React from 'react';
import { Link } from 'react-router-dom';
import { policies } from '../data/mockData.js';

export default function Favorites() {
  const favorites = policies.slice(0, 2);

  return (
    <div className="container section">
      <h2>Favorites</h2>
      <p className="text-muted mt-8">Policies you've saved for later.</p>

      <div className="grid mt-24" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        {favorites.map((p) => (
          <div key={p.id} className="card" style={{ padding: 20 }}>
            <span className="badge badge-gold">{p.type}</span>
            <h3 className="mt-16" style={{ fontSize: '1.05rem' }}>{p.name}</h3>
            <div className="flex-between mt-24">
              <span style={{ fontWeight: 700 }}>₹{p.premium.toLocaleString('en-IN')}/yr</span>
              <Link to={`/policies/${p.id}`} className="btn btn-primary btn-sm">View</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
