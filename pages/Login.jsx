import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaGoogle, FaMicrosoft, FaGithub, FaShieldAlt, FaKey } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await api.post("/Auth/login", { email, password });
      const data = response.data;

      login(
        {
          id: data.id,
          name: data.name,
          email: data.email,
          role: data.role,
        },
        data.token
      );

      localStorage.setItem("role", data.role);
      if (rememberMe) {
        localStorage.setItem("saved_email", email);
      } else {
        localStorage.removeItem("saved_email");
      }

      toast.success(`${t('welcome')}, ${data.name}!`);
      navigate(data.role === "Admin" ? "/admin" : "/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid email or password");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = (provider) => {
    toast.info(`Initiating ${provider} Single Sign-On...`);
    // Simulated Social OAuth
    setTimeout(() => {
      login({ id: 99, name: `${provider} User`, email: `user@${provider.toLowerCase()}.com`, role: "Customer" }, "mock-jwt-token");
      toast.success(`Successfully authenticated with ${provider}`);
      navigate("/dashboard");
    }, 1200);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      await api.post("/Auth/verify-otp", { email, otp: otpCode });
      toast.success("OTP verified successfully. Proceeding to login...");
      setShowOtpModal(false);
    } catch (err) {
      toast.error("Invalid OTP code");
    }
  };

  return (
    <div style={{ minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div className="glass-panel" style={{ maxWidth: "1000px", width: "100%", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", overflow: "hidden" }}>
        {/* Left Visual Branding Panel */}
        <div style={{ background: "linear-gradient(135deg, rgba(0,242,254,0.15) 0%, rgba(79,172,254,0.2) 100%)", padding: "48px 36px", display: "flex", flexDirection: "column", justifyContent: "between", position: "relative" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "8px 16px", background: "rgba(255,255,255,0.1)", borderRadius: "99px", marginBottom: "24px", backdropFilter: "blur(10px)" }}>
              <FaShieldAlt style={{ color: "var(--accent-cyan)", fontSize: "1.2rem" }} />
              <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>InsureShield AI</span>
            </div>
            <h1 style={{ fontSize: "2.2rem", fontWeight: 800, lineHeight: "1.2" }}>
              Enterprise Insurance <span className="gradient-text">Powered by AI</span>
            </h1>
            <p style={{ marginTop: "16px", color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.6" }}>
              Secure claim settlement, bank auto-debit integration, vehicle damage inspection, and instant policy comparison in one platform.
            </p>
          </div>

          <div style={{ marginTop: "40px", padding: "20px", background: "rgba(255,255,255,0.06)", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.1)" }}>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Bank-Grade Security</p>
            <p style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--accent-cyan)", marginTop: "4px" }}>256-bit AES Encryption & Automated Fraud Detection</p>
          </div>
        </div>

        {/* Right Form Section */}
        <div style={{ padding: "44px 36px" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 700 }}>{t("navLogin")}</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "28px", marginTop: "4px" }}>
            Sign in with your email or social credentials.
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "8px" }}>
                Email Address
              </label>
              <input
                type="email"
                className="glass-input"
                value={email}
                required
                placeholder="name@company.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "8px" }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  className="glass-input"
                  style={{ paddingRight: "44px" }}
                  value={password}
                  required
                  placeholder="••••••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", color: "var(--text-muted)", fontSize: "1rem" }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.88rem" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", color: "var(--text-secondary)" }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ accentColor: "var(--accent-cyan)" }}
                />
                {t("rememberMe")}
              </label>
              <Link to="/forgot-password" style={{ color: "var(--accent-cyan)", fontWeight: 600 }}>
                {t("forgotPassword")}
              </Link>
            </div>

            <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-block">
              {isSubmitting ? <span className="skeleton" style={{ width: "80px", height: "20px", display: "inline-block" }}></span> : t("navLogin")}
            </button>
          </form>

          {/* Social Logins */}
          <div style={{ marginTop: "28px" }}>
            <div style={{ position: "relative", textAlign: "center", margin: "20px 0" }}>
              <div style={{ position: "absolute", top: "50%", left: "0", right: "0", height: "1px", background: "var(--border-color)" }}></div>
              <span style={{ position: "relative", background: "var(--bg-deep-navy)", padding: "0 12px", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                {t("orContinueWith")}
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
              <button onClick={() => handleSocialLogin("Google")} className="btn btn-secondary btn-sm" style={{ gap: "6px" }}>
                <FaGoogle style={{ color: "#ea4335" }} /> Google
              </button>
              <button onClick={() => handleSocialLogin("Microsoft")} className="btn btn-secondary btn-sm" style={{ gap: "6px" }}>
                <FaMicrosoft style={{ color: "#00a4ef" }} /> Azure
              </button>
              <button onClick={() => handleSocialLogin("GitHub")} className="btn btn-secondary btn-sm" style={{ gap: "6px" }}>
                <FaGithub style={{ color: "#ffffff" }} /> GitHub
              </button>
            </div>
          </div>

          <p style={{ marginTop: "24px", textAlign: "center", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
            New to InsurePro ?{" "}
            <Link to="/signup" style={{ color: "var(--accent-cyan)", fontWeight: 600 }}>
              Create an Enterprise Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}