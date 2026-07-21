import React from 'react';
import { toast } from 'react-toastify';

const faqs = [
  { q: 'How do I file a claim?', a: 'Go to Claims → File New Claim, select your policy, and upload the required documents.' },
  { q: 'What documents are required?', a: 'This depends on the claim type — hospitalization claims need bills and medical reports; accident claims need an FIR and repair estimate.' },
  { q: 'How long does claim approval take?', a: 'On average, claims are processed within 3-5 business days after all documents are verified.' }
];

export default function Support() {
  const submitTicket = (e) => {
    e.preventDefault();
    toast.success('Support ticket raised — we will get back to you shortly');
  };

  return (
    <div className="container section">
      <h2>Customer Support</h2>
      <p className="text-muted mt-8">We're here to help with policies, claims, and payments.</p>

      <div className="grid mt-24" style={{ gridTemplateColumns: '1.3fr 1fr' }}>
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: '1rem' }}>Frequently Asked Questions</h3>
          <div className="mt-16" style={{ display: 'grid', gap: 16 }}>
            {faqs.map((f) => (
              <div key={f.q}>
                <strong style={{ fontSize: '0.9rem' }}>{f.q}</strong>
                <p className="text-muted mt-8" style={{ fontSize: '0.85rem' }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        <form className="card" style={{ padding: 24 }} onSubmit={submitTicket}>
          <h3 style={{ fontSize: '1rem' }}>Raise a Ticket</h3>
          <div className="field"><label>Subject</label><input required placeholder="Issue with claim #CLM1078" /></div>
          <div className="field"><label>Message</label><textarea required rows={4} style={{ padding: 11, borderRadius: 8, border: '1.5px solid var(--gray-300)' }} /></div>
          <button className="btn btn-primary btn-block mt-16" type="submit">Submit Ticket</button>
        </form>
      </div>
    </div>
  );
}
