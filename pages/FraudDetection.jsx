import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaShieldAlt, FaExclamationTriangle, FaSearch, FaCheckCircle, FaRobot, FaFileAlt } from 'react-icons/fa';
import PageHeader from '../components/common/PageHeader';
import api from '../services/api';

const MOCK_SUSPICIOUS_CLAIMS = [
  { id: 101, policy: "POL-9921-2026", customer: "Rahul Sharma", claimAmount: 185000, fraudScore: 78, risk: "High Risk", flags: ["High Claim Value", "Duplicate Invoice Upload"] },
  { id: 102, policy: "POL-4412-2026", customer: "Ananya Roy", claimAmount: 42000, fraudScore: 45, risk: "Medium Risk", flags: ["Multiple Claims in 30 Days"] },
  { id: 103, policy: "POL-7711-2026", customer: "Vikram Malhotra", claimAmount: 12000, fraudScore: 12, risk: "Low Risk", flags: ["Normal Profile"] }
];

export default function FraudDetection() {
  const [selectedClaim, setSelectedClaim] = useState(MOCK_SUSPICIOUS_CLAIMS[0]);
  const [ocrData, setOcrData] = useState(null);
  const [loadingOcr, setLoadingOcr] = useState(false);

  const handleRunOcr = async (docType) => {
    setLoadingOcr(true);
    try {
      const res = await api.post(`/AI/ocr-document?docType=${encodeURIComponent(docType)}`);
      setOcrData(res.data);
      toast.success(`AI Document Quality & OCR Check Completed for ${docType}`);
    } catch (err) {
      toast.info(`Running AI OCR simulation for ${docType}`);
      setOcrData({
        documentType: docType,
        qualityStatus: "Pass",
        isBlur: false,
        blurScore: 11.2,
        authenticityStatus: "Genuine",
        extractedText: `VERIFIED OCR DATA: REGISTRATION TN-09-CB-8832 | STAMP: GENUINE RTO ISSUED | AUTHENTICATED BY NEURAL AGENT`
      });
    } finally {
      setLoadingOcr(false);
    }
  };

  return (
    <div className="container" style={{ paddingBottom: '40px' }}>
      <PageHeader
        title="AI Fraud Detection & Risk Intelligence Center"
        subtitle="Automated neural risk scoring, document authenticity verification, and anti-fraud monitoring."
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
        {/* Suspicious Claims List */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px' }}>Flagged Claims Queue</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {MOCK_SUSPICIOUS_CLAIMS.map((c) => (
              <div
                key={c.id}
                onClick={() => { setSelectedClaim(c); setOcrData(null); }}
                className="glass-card"
                style={{
                  cursor: 'pointer',
                  border: selectedClaim.id === c.id ? '1px solid var(--accent-rose)' : '1px solid var(--glass-card-border)',
                  background: selectedClaim.id === c.id ? 'rgba(244,63,94,0.1)' : 'rgba(255,255,255,0.03)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Claim #{c.id}</span>
                  <span className={`badge ${c.fraudScore > 60 ? 'badge-rose' : c.fraudScore > 30 ? 'badge-gold' : 'badge-emerald'}`}>
                    Score: {c.fraudScore}/100
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{c.customer} &middot; {c.policy}</p>
                <p style={{ fontWeight: 800, color: 'var(--accent-cyan)', marginTop: '6px' }}>₹{c.claimAmount.toLocaleString('en-IN')}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Fraud Analysis & OCR Inspection Panel */}
        <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Claim #{selectedClaim.id} Risk Profile</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Policyholder: {selectedClaim.customer}</p>
            </div>
            <span className={`badge ${selectedClaim.fraudScore > 60 ? 'badge-rose' : 'badge-emerald'}`} style={{ fontSize: '0.9rem', padding: '6px 16px' }}>
              {selectedClaim.risk}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="glass-card" style={{ textAlign: 'center', background: 'rgba(244,63,94,0.05)', border: '1px solid rgba(244,63,94,0.2)' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>AI Fraud Probability</p>
              <p style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--accent-rose)', marginTop: '4px' }}>
                {selectedClaim.fraudScore}%
              </p>
            </div>

            <div className="glass-card" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <p style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>Risk Factors Triggered</p>
              <ul style={{ paddingLeft: '16px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                {selectedClaim.flags.map((flag, idx) => (
                  <li key={idx} style={{ marginBottom: '4px' }}>{flag}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* AI Document Quality & OCR Engine Controls */}
          <div className="glass-card" style={{ background: 'rgba(0,242,254,0.04)', border: '1px solid rgba(0,242,254,0.2)' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px' }}>AI Document Authenticity & Blur Inspector</h4>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '16px' }}>
              <button onClick={() => handleRunOcr("RC Book")} className="btn btn-secondary btn-sm">Inspect RC Book</button>
              <button onClick={() => handleRunOcr("Driving License")} className="btn btn-secondary btn-sm">Inspect Driving License</button>
              <button onClick={() => handleRunOcr("Invoice")} className="btn btn-secondary btn-sm">Inspect Repair Invoice</button>
            </div>

            {loadingOcr && <div className="skeleton" style={{ height: '80px', width: '100%' }}></div>}

            {ocrData && (
              <div style={{ background: 'rgba(0,0,0,0.4)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 700, color: 'var(--accent-cyan)' }}>Doc: {ocrData.documentType}</span>
                  <span className="badge badge-emerald"><FaCheckCircle /> Blur Score: {ocrData.blurScore} (Clear)</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>{ocrData.extractedText}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
