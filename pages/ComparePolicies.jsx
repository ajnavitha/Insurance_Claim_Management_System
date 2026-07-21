import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaStar, FaExchangeAlt, FaShieldAlt, FaPlus, FaTrash } from 'react-icons/fa';
import PageHeader from '../components/common/PageHeader';
import { useLanguage } from '../context/LanguageContext';

const MARKET_PLANS = [
  {
    id: 1,
    provider: "InsurePro",
    name: "Enterprise Super Shield Health & Auto",
    premium: 4999,
    coverage: 1500000,
    claimRatio: "99.4%",
    waitingPeriod: "Instant (0 Days)",
    hospitals: "14,500+",
    rating: 4.9,
    isEnterprise: true,
    features: { cashlessGarage: true, aiInspection: true, autoDebit: true, zeroDepreciation: true }
  },
  {
    id: 2,
    provider: "Star Health Market Plan",
    name: "Comprehensive Premier Health",
    premium: 6200,
    coverage: 1000000,
    claimRatio: "96.2%",
    waitingPeriod: "30 Days",
    hospitals: "11,200+",
    rating: 4.6,
    isEnterprise: false,
    features: { cashlessGarage: false, aiInspection: false, autoDebit: true, zeroDepreciation: false }
  },
  {
    id: 3,
    provider: "HDFC ERGO General",
    name: "Optima Secure Drive & Health",
    premium: 5800,
    coverage: 1200000,
    claimRatio: "98.1%",
    waitingPeriod: "15 Days",
    hospitals: "12,800+",
    rating: 4.8,
    isEnterprise: false,
    features: { cashlessGarage: true, aiInspection: false, autoDebit: true, zeroDepreciation: true }
  },
  {
    id: 4,
    provider: "Niva Bupa Health",
    name: "ReAssure 2.0 Max Protection",
    premium: 7100,
    coverage: 2000000,
    claimRatio: "97.5%",
    waitingPeriod: "30 Days",
    hospitals: "10,500+",
    rating: 4.7,
    isEnterprise: false,
    features: { cashlessGarage: false, aiInspection: false, autoDebit: false, zeroDepreciation: true }
  }
];

export default function ComparePolicies() {
  const [selectedPlans, setSelectedPlans] = useState([MARKET_PLANS[0], MARKET_PLANS[1], MARKET_PLANS[2]]);

  const { t } = useLanguage();

  const toggleSelectPlan = (plan) => {
    if (selectedPlans.find(p => p.id === plan.id)) {
      if (selectedPlans.length > 1) {
        setSelectedPlans(selectedPlans.filter(p => p.id !== plan.id));
      }
    } else {
      if (selectedPlans.length < 4) {
        setSelectedPlans([...selectedPlans, plan]);
      }
    }
  };

  return (
    <div className="container" style={{ paddingBottom: '40px' }}>
      <PageHeader
        title={t('compareHeader')}
        subtitle="Compare Enterprise InsureShield plans side-by-side with public market datasets, settlement ratios, and hospital networks."
      />

      {/* Available Plans Selector Bar */}
      <div className="glass-panel" style={{ padding: '20px 24px', marginBottom: '28px' }}>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px' }}>Select Plans to Compare (Max 4)</h4>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {MARKET_PLANS.map((p) => {
            const isSelected = selectedPlans.some(s => s.id === p.id);
            return (
              <button
                key={p.id}
                onClick={() => toggleSelectPlan(p)}
                className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
              >
                {isSelected ? <FaTrash style={{ fontSize: '0.75rem' }} /> : <FaPlus style={{ fontSize: '0.75rem' }} />}
                {p.provider} ({p.name.substring(0, 18)}...)
              </button>
            );
          })}
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="glass-panel" style={{ padding: '24px', overflowX: 'auto' }}>
        <table className="glass-table">
          <thead>
            <tr>
              <th style={{ minWidth: '180px' }}>Plan Features</th>
              {selectedPlans.map(p => (
                <th key={p.id} style={{ minWidth: '220px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {p.isEnterprise && <span className="badge badge-emerald" style={{ width: 'fit-content' }}>Enterprise AI</span>}
                    <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{p.provider}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{p.name}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Annual Premium</td>
              {selectedPlans.map(p => (
                <td key={p.id} style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
                  ₹{p.premium.toLocaleString('en-IN')}<span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>/yr</span>
                </td>
              ))}
            </tr>

            <tr>
              <td style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Sum Insured Coverage</td>
              {selectedPlans.map(p => (
                <td key={p.id} style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>
                  ₹{(p.coverage / 100000).toFixed(1)} Lakhs
                </td>
              ))}
            </tr>

            <tr>
              <td style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Claim Settlement Ratio</td>
              {selectedPlans.map(p => (
                <td key={p.id} style={{ fontWeight: 700 }}>
                  <span className="badge badge-emerald">{p.claimRatio}</span>
                </td>
              ))}
            </tr>

            <tr>
              <td style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Waiting Period</td>
              {selectedPlans.map(p => (
                <td key={p.id}>{p.waitingPeriod}</td>
              ))}
            </tr>

            <tr>
              <td style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Cashless Hospital Network</td>
              {selectedPlans.map(p => (
                <td key={p.id} style={{ fontWeight: 600 }}>{p.hospitals}</td>
              ))}
            </tr>

            <tr>
              <td style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Customer Rating</td>
              {selectedPlans.map(p => (
                <td key={p.id} style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>
                  <FaStar style={{ marginBottom: '-2px' }} /> {p.rating} / 5.0
                </td>
              ))}
            </tr>

            <tr>
              <td style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>AI Damage Vision Inspection</td>
              {selectedPlans.map(p => (
                <td key={p.id}>
                  {p.features.aiInspection ? (
                    <span style={{ color: '#34d399', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <FaCheckCircle /> Supported
                    </span>
                  ) : (
                    <span style={{ color: '#f87171', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <FaTimesCircle /> Not Available
                    </span>
                  )}
                </td>
              ))}
            </tr>

            <tr>
              <td style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Bank Premium Auto-Debit</td>
              {selectedPlans.map(p => (
                <td key={p.id}>
                  {p.features.autoDebit ? (
                    <span style={{ color: '#34d399', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <FaCheckCircle /> Enabled
                    </span>
                  ) : (
                    <span style={{ color: '#f87171', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <FaTimesCircle /> Manual Only
                    </span>
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
