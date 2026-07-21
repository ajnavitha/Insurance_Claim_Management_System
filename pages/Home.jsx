import React from 'react';
import { Link } from 'react-router-dom';
import { FiShield, FiPhoneCall, FiCheckCircle, FiSlash } from 'react-icons/fi';
import { insuranceCategories } from '../data/mockData.js';
import './home.css';

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div>
            <span className="hero-eyebrow">Trusted by 50,000+ Indian families</span>
            <h1>
              Compare plans.<br />
              Buy with confidence.<br />
              <span className="accent">Insurance, made honest.</span>
            </h1>
            <p>Compare Health, Life, Car, Bike, Travel and Home insurance from India's leading insurers, side by side, and buy the policy that actually fits your family.</p>

            <div className="hero-search">
              <input placeholder="Enter pincode" />
              <select defaultValue="">
                <option value="" disabled>Select family type</option>
                <option>Individual</option>
                <option>Family Floater</option>
                <option>Senior Citizen</option>
              </select>
              <Link to="/policies" className="btn btn-primary">View Plans</Link>
            </div>

            <div className="hero-trust">
              <span><FiShield /> 100% Secure</span>
              <span><FiSlash /> No spam calls</span>
              <span><FiCheckCircle /> Expert advice</span>
              <span><FiPhoneCall /> Easy claims</span>
            </div>
          </div>
          <div className="hero-illustration">🛡️</div>
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <div>
            <h2>Choose your cover</h2>
            <p>Six ways to protect what matters</p>
          </div>
          <Link to="/policies" className="btn btn-outline btn-sm">View all</Link>
        </div>
        <div className="category-grid">
          {insuranceCategories.map((c) => (
            <div key={c.key} className="category-card">
              <div className="category-icon">{c.icon}</div>
              <h4>{c.name}</h4>
              <p>{c.tagline}</p>
              <Link to="/policies">Compare plans →</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="advisor-band">
          <div>
            <h2 style={{ color: 'var(--white)' }}>Not sure which plan fits your family?</h2>
            <p style={{ color: '#c9d5ea', marginTop: 8 }}>Talk to an IRDAI-certified advisor, free of charge, no obligation to buy.</p>
          </div>
          <Link to="/contact" className="btn btn-primary">Talk to an advisor</Link>
        </div>
      </section>
    </>
  );
}
