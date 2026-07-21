import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaGlobe, FaMoon, FaSun, FaShieldAlt, FaDesktop, FaMobileAlt, FaKey, FaBell, FaTrash } from 'react-icons/fa';
import PageHeader from '../components/common/PageHeader';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function Settings() {
  const { lang, setLang, t } = useLanguage();
  const { isDarkMode, toggleTheme } = useTheme();
  const [twoFactor, setTwoFactor] = useState(true);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(true);

  const [activeDevices, setActiveDevices] = useState([
    { id: 1, name: "Windows 11 PC - Chrome 126", location: "Chennai, India", current: true, time: "Active Now" },
    { id: 2, name: "iPhone 15 Pro - Safari Mobile", location: "Bengaluru, India", current: false, time: "2 hours ago" }
  ]);

  const handleRevokeDevice = (id) => {
    setActiveDevices(activeDevices.filter(d => d.id !== id));
    toast.info("Device session revoked successfully.");
  };

  return (
    <div className="container" style={{ paddingBottom: '40px' }}>
      <PageHeader
        title="Account & System Settings"
        subtitle="Manage global application language, glass theme preferences, 2FA security, and active sessions."
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
        {/* Appearance & Language Settings */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaGlobe style={{ color: 'var(--accent-cyan)' }} /> Language & Theme
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                Application Display Language
              </label>
              <select
                className="glass-input"
                value={lang}
                onChange={(e) => {
                  setLang(e.target.value);
                  toast.success("Application language updated!");
                }}
              >
                <option value="en">English (US / IN)</option>
                <option value="ta">தமிழ் (Tamil)</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="te">తెలుగు (Telugu)</option>
                <option value="kn">ಕನ್ನಡ (Kannada)</option>
                <option value="ml">മലയാളം (Malayalam)</option>
              </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Glassmorphism Visual Theme</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Toggle between Deep Dark Blue Glass & Modern Light Glass</p>
              </div>
              <button onClick={toggleTheme} className="btn btn-secondary btn-sm" style={{ gap: '8px' }}>
                {isDarkMode ? <FaMoon style={{ color: 'var(--accent-cyan)' }} /> : <FaSun style={{ color: 'var(--accent-gold)' }} />}
                {isDarkMode ? "Dark Blue Glass" : "Light Mode"}
              </button>
            </div>
          </div>
        </div>

        {/* Security & 2FA */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaShieldAlt style={{ color: 'var(--accent-gold)' }} /> Security & 2FA
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Two-Factor Authentication (2FA)</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Require SMS / Authenticator OTP for high-value claims</p>
              </div>
              <input
                type="checkbox"
                checked={twoFactor}
                onChange={(e) => {
                  setTwoFactor(e.target.checked);
                  toast.success(`2FA ${e.target.checked ? 'enabled' : 'disabled'}`);
                }}
                style={{ width: '20px', height: '20px', accentColor: 'var(--accent-cyan)', cursor: 'pointer' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Email Claim Alerts</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Instant notification on approval/rejection</p>
              </div>
              <input
                type="checkbox"
                checked={emailNotifs}
                onChange={(e) => setEmailNotifs(e.target.checked)}
                style={{ width: '20px', height: '20px', accentColor: 'var(--accent-cyan)', cursor: 'pointer' }}
              />
            </div>
          </div>
        </div>

        {/* Active Session & Device Manager */}
        <div className="glass-panel" style={{ padding: '28px', gridColumn: '1 / -1' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaDesktop style={{ color: 'var(--accent-cyan)' }} /> Active Device Sessions
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {activeDevices.map(device => (
              <div key={device.id} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  {device.name.includes("Mobile") ? <FaMobileAlt style={{ fontSize: '1.4rem', color: 'var(--accent-cyan)' }} /> : <FaDesktop style={{ fontSize: '1.4rem', color: 'var(--accent-blue)' }} />}
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>
                      {device.name} {device.current && <span className="badge badge-emerald" style={{ marginLeft: '8px' }}>Current Session</span>}
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{device.location} &middot; {device.time}</p>
                  </div>
                </div>

                {!device.current && (
                  <button onClick={() => handleRevokeDevice(device.id)} className="btn btn-secondary btn-sm" style={{ color: 'var(--accent-rose)' }}>
                    <FaTrash /> Revoke Access
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
