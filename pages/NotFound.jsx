import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container section" style={{ textAlign: 'center', padding: '100px 24px' }}>
      <h1 style={{ fontSize: '4rem', color: 'var(--navy)' }}>404</h1>
      <p className="text-muted mt-16">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary mt-24">Back to Home</Link>
    </div>
  );
}
