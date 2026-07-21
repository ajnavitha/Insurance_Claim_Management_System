import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaQrcode, FaCreditCard, FaUniversity, FaWallet, FaDownload, FaFileInvoice, FaCheckCircle, FaLock } from 'react-icons/fa';
import PageHeader from '../components/common/PageHeader';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upi'); // 'upi', 'card', 'netbanking', 'wallet'
  const [amount, setAmount] = useState('4999');
  const [policyNumber, setPolicyNumber] = useState('POL-8832-2026');
  const [processing, setProcessing] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const { t } = useLanguage();

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await api.get('/Payment/history');
      setPayments(res.data);
    } catch (err) {
      toast.error('Failed to load payment history.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleMakePayment = async (e) => {
    if (e) e.preventDefault();
    setProcessing(true);

    try {
      const res = await api.post('/Payment', {
        policyNumber,
        amount: parseFloat(amount),
        paymentMethod: activeTab.toUpperCase()
      });

      toast.success('Premium Payment Completed Successfully!');
      fetchHistory();
      // Auto open receipt for the new payment
      handleOpenReceipt(res.data.payment.id);
    } catch (err) {
      toast.error('Payment processing failed.');
    } finally {
      setProcessing(false);
    }
  };

  const handleOpenReceipt = async (id) => {
    try {
      const res = await api.get(`/Payment/receipt/${id}`);
      setSelectedReceipt(res.data);
    } catch (err) {
      toast.error('Could not fetch receipt details.');
    }
  };

  const handleDownloadPdf = () => {
    window.print(); // Triggers native browser print / save to PDF for the receipt modal
  };

  return (
    <div className="container" style={{ paddingBottom: '40px' }}>
      <PageHeader
        title={t('navPayments')}
        subtitle="Pay your policy premiums instantly with secure UPI QR, Credit Cards, or Net Banking and download GST Receipts."
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px' }}>
        {/* Payment Gateway Panel */}
        <div className="glass-panel" style={{ padding: '32px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px' }}>Premium Checkout Gateway</h3>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', background: 'rgba(255,255,255,0.04)', padding: '6px', borderRadius: '12px' }}>
            <button
              onClick={() => setActiveTab('upi')}
              className={`btn btn-sm ${activeTab === 'upi' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ flex: 1 }}
            >
              <FaQrcode /> UPI QR
            </button>
            <button
              onClick={() => setActiveTab('card')}
              className={`btn btn-sm ${activeTab === 'card' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ flex: 1 }}
            >
              <FaCreditCard /> Card
            </button>
            <button
              onClick={() => setActiveTab('netbanking')}
              className={`btn btn-sm ${activeTab === 'netbanking' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ flex: 1 }}
            >
              <FaUniversity /> NetBanking
            </button>
            <button
              onClick={() => setActiveTab('wallet')}
              className={`btn btn-sm ${activeTab === 'wallet' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ flex: 1 }}
            >
              <FaWallet /> Wallet
            </button>
          </div>

          <form onSubmit={handleMakePayment} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Policy Number</label>
              <input
                type="text"
                className="glass-input"
                required
                value={policyNumber}
                onChange={(e) => setPolicyNumber(e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Premium Amount (₹)</label>
              <input
                type="number"
                className="glass-input"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            {/* Dynamic Tab Views */}
            {activeTab === 'upi' && (
              <div className="glass-card" style={{ textAlign: 'center', padding: '24px', background: 'rgba(255,255,255,0.03)' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>Scan & Pay via GPay / PhonePe / Paytm / BHIM</p>
                <div style={{ background: '#ffffff', padding: '16px', display: 'inline-block', borderRadius: '12px', boxShadow: '0 4px 18px rgba(0,0,0,0.3)' }}>
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=upi://pay?pa=insureshield@hdfcbank%26pn=InsureShield%26am=${amount}%26cu=INR`}
                    alt="UPI QR"
                    style={{ display: 'block' }}
                  />
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '12px' }}>UPI ID: insureshield@hdfcbank</p>
              </div>
            )}

            {activeTab === 'card' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input type="text" className="glass-input" placeholder="Card Number (4532 •••• •••• 8821)" required />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <input type="text" className="glass-input" placeholder="MM/YY" required />
                  <input type="password" className="glass-input" placeholder="CVV" maxLength={3} required />
                </div>
              </div>
            )}

            {activeTab === 'netbanking' && (
              <select className="glass-input" required>
                <option value="HDFC">HDFC Bank NetBanking</option>
                <option value="SBI">State Bank of India</option>
                <option value="ICICI">ICICI Corporate Banking</option>
                <option value="AXIS">Axis Bank</option>
              </select>
            )}

            {activeTab === 'wallet' && (
              <select className="glass-input" required>
                <option value="PAYTM">Paytm Wallet</option>
                <option value="AMAZON">Amazon Pay Wallet</option>
                <option value="MOBIKWIK">MobiKwik</option>
              </select>
            )}

            <button type="submit" disabled={processing} className="btn btn-primary btn-block mt-8">
              {processing ? 'Processing Secure Payment...' : `Confirm & Pay ₹${amount}`}
            </button>
          </form>
        </div>

        {/* Payment History & Receipt Download Table */}
        <div className="glass-panel" style={{ padding: '32px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px' }}>Payment History & GST Receipts</h3>

          {loading ? (
            <div className="skeleton" style={{ height: '240px', width: '100%' }}></div>
          ) : (
            <div className="table-responsive">
              <table className="glass-table">
                <thead>
                  <tr>
                    <th>Txn ID</th>
                    <th>Policy</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Receipt</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No previous transactions found.</td>
                    </tr>
                  ) : (
                    payments.map((p) => (
                      <tr key={p.id}>
                        <td style={{ fontWeight: 600, fontSize: '0.85rem' }}>{p.transactionId?.substring(0, 12)}...</td>
                        <td>{p.policyNumber}</td>
                        <td style={{ fontWeight: 700, color: 'var(--accent-cyan)' }}>₹{p.amount?.toLocaleString('en-IN')}</td>
                        <td><span className="badge badge-cyan">{p.paymentMethod}</span></td>
                        <td>
                          <button onClick={() => handleOpenReceipt(p.id)} className="btn btn-secondary btn-sm" style={{ padding: '4px 10px', fontSize: '0.78rem' }}>
                            <FaFileInvoice /> View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Official Receipt Modal */}
      {selectedReceipt && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div className="glass-panel" style={{ maxWidth: '580px', width: '100%', padding: '40px', background: '#0b1d3a', border: '1px solid var(--accent-cyan)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '20px' }}>
              <div>
                <h3 className="gradient-text" style={{ fontSize: '1.4rem', fontWeight: 800 }}>InsureShield AI</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Official Premium Tax Invoice & Receipt</p>
              </div>
              <span className="badge badge-emerald"><FaCheckCircle /> Payment Successful</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '0.88rem', marginBottom: '20px' }}>
              <div>
                <p style={{ color: 'var(--text-muted)' }}>Receipt No:</p>
                <p style={{ fontWeight: 700 }}>{selectedReceipt.receiptNumber}</p>
              </div>
              <div>
                <p style={{ color: 'var(--text-muted)' }}>Txn ID:</p>
                <p style={{ fontWeight: 700 }}>{selectedReceipt.transactionId}</p>
              </div>
              <div>
                <p style={{ color: 'var(--text-muted)' }}>Customer:</p>
                <p style={{ fontWeight: 700 }}>{selectedReceipt.customerName}</p>
              </div>
              <div>
                <p style={{ color: 'var(--text-muted)' }}>Policy No:</p>
                <p style={{ fontWeight: 700 }}>{selectedReceipt.policyNumber}</p>
              </div>
              <div>
                <p style={{ color: 'var(--text-muted)' }}>Date & Time:</p>
                <p style={{ fontWeight: 700 }}>{selectedReceipt.paymentDate}</p>
              </div>
              <div>
                <p style={{ color: 'var(--text-muted)' }}>Payment Mode:</p>
                <p style={{ fontWeight: 700 }}>{selectedReceipt.paymentMethod}</p>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '16px', marginBottom: '24px', background: 'rgba(255,255,255,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span>Base Premium:</span>
                <span>₹{selectedReceipt.amount?.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <span>GST (18%):</span>
                <span>₹{selectedReceipt.gstAmount?.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.1rem', borderTop: '1px dashed var(--border-color)', paddingTop: '10px', color: 'var(--accent-cyan)' }}>
                <span>Total Amount Paid:</span>
                <span>₹{selectedReceipt.totalPaid?.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setSelectedReceipt(null)} className="btn btn-secondary btn-block">
                Close
              </button>
              <button onClick={handleDownloadPdf} className="btn btn-primary btn-block">
                <FaDownload /> Download PDF Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
