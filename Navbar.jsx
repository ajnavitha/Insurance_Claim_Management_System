import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiBell, FiSearch, FiChevronDown, FiUser, FiGlobe, FiMoon, FiSun, FiShield, FiCheckCircle } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext.jsx";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";
import { insuranceCategories } from "../../data/mockData.js";
import "./navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { lang, setLang, t } = useLanguage();
  const { isDarkMode, toggleTheme } = useTheme();

  const [showInsurance, setShowInsurance] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifDrawer, setShowNotifDrawer] = useState(false);

  const navigate = useNavigate();

  const goToDashboard = () => {
    if (user?.role?.toLowerCase() === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <header className="navbar" style={{ background: "var(--glass-bg)", backdropFilter: "blur(16px)", borderBottom: "1px solid var(--border-color)", sticky: "top", zIndex: 100 }}>
      <div className="container navbar-inner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 24px" }}>
        <Link to="/" className="navbar-logo" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ background: "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)", width: "36px", height: "36px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: "#060e1a", fontWeight: 800 }}>
            <FiShield size={20} />
          </div>
          <span className="gradient-text" style={{ fontSize: "1.3rem", fontWeight: 800, letterSpacing: "-0.5px" }}>
            {t("appName")}
          </span>
        </Link>

        <nav className="navbar-links" style={{ display: "flex", alignItems: "center", gap: "22px", fontSize: "0.92rem", fontWeight: 600 }}>
          <Link to="/">{t("navHome")}</Link>
          <Link to="/policies">{t("navPolicies")}</Link>
          <Link to="/compare">{t("navCompare")}</Link>
          <Link to="/claims">{t("navClaims")}</Link>
          <Link to="/vehicle-inspection">{t("navInspection")}</Link>
          <Link to="/map-services">{t("navMap")}</Link>
          <Link to="/bank-accounts">{t("navBank")}</Link>
          <Link to="/payments">{t("navPayments")}</Link>
        </nav>

        <div className="navbar-actions" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Language Dropdown Selector */}
          <div style={{ position: "relative" }}>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="glass-input"
              style={{ padding: "6px 10px", fontSize: "0.78rem", borderRadius: "8px", cursor: "pointer" }}
            >
              <option value="en">EN</option>
              <option value="ta">தமிழ்</option>
              <option value="hi">हिंदी</option>
              <option value="te">తెలుగు</option>
              <option value="kn">ಕನ್ನಡ</option>
              <option value="ml">മലയാളം</option>
            </select>
          </div>

          {/* Theme Switcher Button */}
          <button onClick={toggleTheme} className="icon-btn" title={t("themeToggle")} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid var(--border-color)", padding: "8px", borderRadius: "8px", color: "var(--text-primary)" }}>
            {isDarkMode ? <FiMoon style={{ color: "var(--accent-cyan)" }} /> : <FiSun style={{ color: "var(--accent-gold)" }} />}
          </button>

          {user && (
            <div style={{ position: "relative" }}>
              <button
                className="icon-btn"
                aria-label="Notifications"
                onClick={() => setShowNotifDrawer(!showNotifDrawer)}
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid var(--border-color)", padding: "8px", borderRadius: "8px", color: "var(--text-primary)" }}
              >
                <FiBell />
                <span style={{ position: "absolute", top: "2px", right: "2px", width: "8px", height: "8px", background: "var(--accent-rose)", borderRadius: "50%" }}></span>
              </button>

              {/* Notification Drawer Modal */}
              {showNotifDrawer && (
                <div className="glass-panel" style={{ position: "absolute", right: 0, top: "45px", width: "320px", padding: "16px", zIndex: 200, boxShadow: "var(--glass-shadow)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", borderBottom: "1px solid var(--border-color)", paddingBottom: "8px" }}>
                    <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>Notifications</span>
                    <button onClick={() => navigate("/notifications")} style={{ fontSize: "0.75rem", color: "var(--accent-cyan)", background: "none" }}>View All</button>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.82rem" }}>
                    <div style={{ padding: "8px", background: "rgba(255,255,255,0.03)", borderRadius: "6px" }}>
                      <p style={{ fontWeight: 600, color: "var(--accent-cyan)" }}>Claim #101 Approved</p>
                      <p style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>Disbursement completed via HDFC auto-debit.</p>
                    </div>
                    <div style={{ padding: "8px", background: "rgba(255,255,255,0.03)", borderRadius: "6px" }}>
                      <p style={{ fontWeight: 600, color: "var(--accent-gold)" }}>Premium Due Alert</p>
                      <p style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>Auto-debit scheduled in 3 days.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {!user ? (
            <>
              <Link to="/login" className="btn btn-secondary btn-sm">
                {t("navLogin")}
              </Link>
              <Link to="/signup" className="btn btn-primary btn-sm">
                {t("navSignup")}
              </Link>
            </>
          ) : (
            <div
              className="navbar-dropdown"
              style={{ position: "relative" }}
              onMouseEnter={() => setShowProfile(true)}
              onMouseLeave={() => setShowProfile(false)}
            >
              <span className="profile-chip" style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 14px", background: "rgba(0,242,254,0.1)", border: "1px solid rgba(0,242,254,0.2)", borderRadius: "99px", color: "var(--accent-cyan)", fontWeight: 700, cursor: "pointer" }}>
                <FiUser /> {user.name}
              </span>

              {showProfile && (
                <div className="glass-panel" style={{ position: "absolute", right: 0, top: "40px", width: "200px", padding: "12px", zIndex: 200, display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.88rem" }}>
                  <button onClick={goToDashboard} className="btn btn-secondary btn-sm btn-block" style={{ justifyContent: "flex-start" }}>
                    {t("navDashboard")}
                  </button>
                  <Link to="/profile" className="btn btn-secondary btn-sm btn-block" style={{ justifyContent: "flex-start" }}>
                    Profile
                  </Link>
                  <Link to="/settings" className="btn btn-secondary btn-sm btn-block" style={{ justifyContent: "flex-start" }}>
                    Settings
                  </Link>
                  <button
                    onClick={() => { logout(); navigate("/"); }}
                    className="btn btn-danger btn-sm btn-block"
                  >
                    {t("navLogout")}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}