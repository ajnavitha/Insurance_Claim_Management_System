import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaUniversity, FaCreditCard, FaLock, FaCheckCircle, FaExchangeAlt, FaSync, FaShieldAlt } from 'react-icons/fa';
import PageHeader from '../components/common/PageHeader';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';

export default function BankAccounts() {
  const [bank, setBank] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [form, setForm] = useState({
    bankName: "HDFC Bank",
    accountHolder: "",
    accountNumber: "",
    balance: "150000"
  });

  const { t } = useLanguage();

  const fetchBankDetails = async () => {
    setLoading(true);
    try {
      const res = await api.get('/BankAccount');
      setBank(res.data);
    } catch (err) {
      toast.error("Failed to load bank account details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBankDetails();
  }, []);

  const handleToggleAutoDebit = async () => {
    try {
      const res = await api.put('/BankAccount/toggle-autodebit');
      setBank(prev => ({ ...prev, autoDebitEnabled: res.data.autoDebit }));
      toast.success(res.data.message);
    } catch (err) {
      toast.error("Failed to update auto-debit preference.");
    }
  };

  const handleLinkBank = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/BankAccount/link', {
        bankName: form.bankName,
        accountHolder: form.accountHolder,
        accountNumber: form.accountNumber,
        balance: parseFloat(form.balance)
      });
      toast.success("Bank account linked successfully!");
      setShowLinkModal(false);
      fetchBankDetails();
    } catch (err) {
      toast.error("Failed to link bank account.");
    }
  };

  return (
    <div className="container" style={{ paddingBottom: '40px' }}>
      <PageHeader
        title={t('navBank')}
        subtitle="Securely link your bank account for automated premium auto-debit and claim payouts."
        actions={
          <button onClick={() => setShowLinkModal(true)} className="btn btn-primary btn-sm">
            <FaUniversity /> Link New Bank
          </button>
        }
      />

      {loading ? (
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
          <div className="skeleton" style={{ height: '200px', width: '100%', borderRadius: '16px' }}></div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {/* Glass Virtual Card UI */}
          <div
            className="glass-panel"
            style={{
              padding: '32px',
              background: 'linear-gradient(135deg, rgba(11,37,69,0.9) 0%, rgba(19,49,92,0.95) 100%)',
              border: '1px solid rgba(0,242,254,0.3)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 12px 36px rgba(0,0,0,0.4)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <span className="gradient-text" style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '1px' }}>
                {bank?.bankName || "Linked Bank"}
              </span>
              <FaCreditCard style={{ fontSize: '1.8rem', color: 'var(--accent-cyan)' }} />
            </div>

            <p style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '3px', color: '#ffffff', margin: '20px 0' }}>
              {bank?.accountNumber || "•••• •••• •••• 9842"}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '30px' }}>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Account Holder</p>
                <p style={{ fontWeight: 600, fontSize: '1rem', color: '#ffffff' }}>{bank?.accountHolder || "Policyholder"}</p>
              </div>

              <div>
                <span className="badge badge-emerald">
                  <FaShieldAlt /> Verified & Encrypted
                </span>
              </div>
            </div>
          </div>

          {/* Balance & Auto Debit Control */}
          <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Real-Time Account Balance</h3>
                <button onClick={fetchBankDetails} className="btn btn-secondary btn-sm" style={{ padding: '6px 10px' }}>
                  <FaSync /> Refresh
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div className="glass-card" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Current Balance</p>
                  <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-cyan)', marginTop: '4px' }}>
                    ₹{bank?.balance?.toLocaleString('en-IN') || "1,58,500"}
                  </p>
                </div>

                <div className="glass-card" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Available Balance</p>
                  <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-gold)', marginTop: '4px' }}>
                    ₹{bank?.availableBalance?.toLocaleString('en-IN') || "1,45,000"}
                  </p>
                </div>
              </div>

              {/* Auto Debit Toggle */}
              <div
                className="glass-card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'space-between',
                  background: bank?.autoDebitEnabled ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                  border: bank?.autoDebitEnabled ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--border-color)'
                }}
              >
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Premium Auto-Debit</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Automated monthly premium deduction on due date</p>
                </div>

                <button
                  onClick={handleToggleAutoDebit}
                  className={`btn ${bank?.autoDebitEnabled ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                >
                  {bank?.autoDebitEnabled ? "Enabled" : "Enable Now"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Linked Bank Modal */}
      {showLinkModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div className="glass-panel" style={{ maxWidth: '480px', width: '100%', padding: '32px' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '8px' }}>Link Bank Account</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '20px' }}>
              Connect your bank account via IFSC / Net Banking credentials.
            </p>

            <form onSubmit={handleLinkBank} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Bank Name</label>
                <select
                  className="glass-input"
                  value={form.bankName}
                  onChange={(e) => setForm({ ...form, bankName: e.target.value })}
                >
                  <option value="HDFC Bank">HDFC Bank Ltd.</option>
                  <option value="State Bank of India">State Bank of India (SBI)</option>

                  <option value="ICICI Bank">ICICI Bank Ltd.</option>
                  <option value="Axis Bank">Axis Bank</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Account Holder Name</label>
                <input
                  type="text"
                  className="glass-input"
                  required
                  placeholder="Full name as in bank"
                  value={form.accountHolder}
                  onChange={(e) => setForm({ ...form, accountHolder: e.target.value })}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Account Number</label>
                <input
                  type="password"
                  className="glass-input"
                  required
                  placeholder="Enter account number"
                  value={form.accountNumber}
                  onChange={(e) => setForm({ ...form, accountNumber: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button type="button" onClick={() => setShowLinkModal(false)} className="btn btn-secondary btn-block">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-block">
                  Link Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
