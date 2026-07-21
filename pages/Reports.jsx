import React from 'react';
import { toast } from 'react-toastify';
import { dashboardStats } from '../data/mockData.js';

export default function Reports() {
  return (
    <div className="container section">
      <div className="section-head">
        <div>
          <h2>Reports & Analytics</h2>
          <p className="text-muted">Revenue, claims, and growth insights.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-outline btn-sm" onClick={() => toast.info('Exporting PDF')}>Export PDF</button>
          <button className="btn btn-outline btn-sm" onClick={() => toast.info('Exporting Excel')}>Export Excel</button>
          <button className="btn btn-outline btn-sm" onClick={() => toast.info('Exporting CSV')}>Export CSV</button>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: '1rem' }}>Revenue Trend</h3>
          <div className="text-muted mt-16" style={{ fontSize: '0.85rem' }}>
            {/* Chart placeholder — wire up Chart.js / react-chartjs-2 here using live data from GET /api/reports/revenue */}
            📈 Revenue chart renders here (Chart.js)
          </div>
        </div>
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: '1rem' }}>Claims per Month</h3>
          <div className="text-muted mt-16" style={{ fontSize: '0.85rem' }}>
            📊 Claims bar chart renders here (Chart.js)
          </div>
        </div>
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: '1rem' }}>Claim Approval Rate</h3>
          <div style={{ fontSize: '2rem', fontWeight: 700, marginTop: 12 }}>{dashboardStats.claimApprovalRate}</div>
        </div>
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: '1rem' }}>Average Processing Time</h3>
          <div style={{ fontSize: '2rem', fontWeight: 700, marginTop: 12 }}>{dashboardStats.avgProcessingTime}</div>
        </div>
      </div>
    </div>
  );
}
