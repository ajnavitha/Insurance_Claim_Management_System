import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import {
  FiGrid,
  FiFileText,
  FiClipboard,
  FiUsers,
  FiCreditCard,
  FiBarChart2,
  FiShield,
  FiFolder,
  FiHeadphones,
  FiBell,
  FiSettings,
  FiCamera,
  FiMapPin,
  FiMinimize2,
  FiLayers
} from "react-icons/fi";
import { useLanguage } from "../../context/LanguageContext.jsx";
import "./dashboard-layout.css";

export default function DashboardLayout({ role = "Customer" }) {
  const { t } = useLanguage();

  const customerLinks = [
    { to: "/dashboard", label: t("navDashboard"), icon: <FiGrid /> },
    { to: "/policies", label: t("navPolicies"), icon: <FiFileText /> },
    { to: "/claims", label: t("navClaims"), icon: <FiClipboard /> },
    { to: "/vehicle-inspection", label: t("navInspection"), icon: <FiCamera /> },
    { to: "/map-services", label: t("navMap"), icon: <FiMapPin /> },
    { to: "/bank-accounts", label: t("navBank"), icon: <FiCreditCard /> },
    { to: "/payments", label: t("navPayments"), icon: <FiCreditCard /> },
    { to: "/compare", label: t("navCompare"), icon: <FiLayers /> },
    { to: "/notifications", label: "Notifications", icon: <FiBell /> },
    { to: "/support", label: t("navSupport"), icon: <FiHeadphones /> },
    { to: "/settings", label: "Settings", icon: <FiSettings /> },
  ];

  const adminLinks = [
    { to: "/admin", label: t("navDashboard"), icon: <FiGrid /> },
    { to: "/admin/policies", label: "Policy Management", icon: <FiFileText /> },
    { to: "/claims", label: "Claims Queue", icon: <FiClipboard /> },
    { to: "/admin/customers", label: "Customer Directory", icon: <FiUsers /> },
    { to: "/admin/fraud", label: t("fraudAlertTitle"), icon: <FiShield /> },
    { to: "/reports", label: "Analytics & Reports", icon: <FiBarChart2 /> },
    { to: "/payments", label: "Payment Verification", icon: <FiCreditCard /> },
    { to: "/map-services", label: "Network Facilities", icon: <FiMapPin /> },
    { to: "/settings", label: "System Settings", icon: <FiSettings /> },
  ];

  const links = role.toLowerCase() === "admin" ? adminLinks : customerLinks;

  return (
    <>
      <Navbar />
      <div className="dash-shell" style={{ display: "flex", minHeight: "calc(100vh - 70px)", padding: "20px 24px 40px", gap: "24px" }}>
        <aside className="dash-sidebar glass-panel" style={{ width: "260px", flexShrink: 0, padding: "20px 14px", display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ padding: "8px 12px 16px 12px", borderBottom: "1px solid var(--border-color)", marginBottom: "10px" }}>
            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>Workspace Mode</span>
            <p style={{ fontWeight: 800, fontSize: "0.95rem", color: "var(--accent-cyan)", marginTop: "2px" }}>
              {role === "Admin" ? t("roleAdmin") : t("roleCustomer")}
            </p>
          </div>

          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/dashboard" || l.to === "/admin"}
              className={({ isActive }) =>
                "dash-link" + (isActive ? " active" : "")
              }
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                borderRadius: "12px",
                fontSize: "0.9rem",
                fontWeight: 600,
                color: isActive ? "#060e1a" : "var(--text-secondary)",
                background: isActive ? "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)" : "transparent",
                boxShadow: isActive ? "0 4px 15px rgba(0, 242, 254, 0.3)" : "none",
                transition: "all 0.2s ease"
              })}
            >
              <span style={{ fontSize: "1.1rem" }}>{l.icon}</span>
              <span>{l.label}</span>
            </NavLink>
          ))}
        </aside>

        <section className="dash-content" style={{ flex: 1, minWidth: 0 }}>
          <Outlet />
        </section>
      </div>
    </>
  );
}