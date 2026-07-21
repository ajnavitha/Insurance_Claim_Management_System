import React from 'react';

export default function About() {
  return (
    <div className="container section" style={{ maxWidth: 800 }}>
      <h2>About InsureApp</h2>
      <p className="text-muted mt-16" style={{ lineHeight: 1.8 }}>
        InsureApp helps Indian families compare and buy insurance from trusted providers, and process
        claims transparently — from submission through fraud checks to final settlement. We believe
        insurance should be honest, fast, and easy to understand.
      </p>
      <div className="grid mt-32" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="card" style={{ padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: '1.4rem', fontWeight: 700 }}>50,000+</div>
          <div className="text-muted" style={{ fontSize: '0.82rem' }}>Families protected</div>
        </div>
        <div className="card" style={{ padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: '1.4rem', fontWeight: 700 }}>500+</div>
          <div className="text-muted" style={{ fontSize: '0.82rem' }}>Plans compared</div>
        </div>
        <div className="card" style={{ padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: '1.4rem', fontWeight: 700 }}>86.5%</div>
          <div className="text-muted" style={{ fontSize: '0.82rem' }}>Claim approval rate</div>
        </div>
      </div>
    </div>
  );
}
