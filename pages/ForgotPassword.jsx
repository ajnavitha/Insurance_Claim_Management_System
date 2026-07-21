import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaKey, FaShieldAlt, FaEnvelope, FaLock } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import api from "../services/api";

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1: Send OTP, 2: Verify OTP & New Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await api.post(`/Auth/send-otp?email=${encodeURIComponent(email)}`);
      toast.success(res.data?.message || "OTP code sent to your registered email");
      setStep(2);
    } catch (err) {
      toast.error("Failed to send OTP. Check your email address.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post("/Auth/verify-otp", { email, otp });
      const res = await api.post("/Auth/reset-password", { email, newPassword });
      toast.success(res.data?.message || "Password reset successful! Please log in.");
      navigate("/login");
    } catch (err) {
      toast.error("Invalid OTP or reset request failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div className="glass-panel" style={{ maxWidth: "460px", width: "100%", padding: "40px" }}>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <FaKey style={{ fontSize: "2.5rem", color: "var(--accent-gold)", marginBottom: "10px" }} />
          <h2 style={{ fontSize: "1.6rem", fontWeight: 700 }}>Reset Password</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", marginTop: "4px" }}>
            {step === 1 ? "Enter your email to receive a 6-digit verification code." : "Enter OTP code and your new password."}
          </p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleSendOtp} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "6px" }}>Email Address</label>
              <input
                type="email"
                className="glass-input"
                required
                placeholder="registered@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button type="submit" disabled={isSubmitting} className="btn btn-gold btn-block">
              {isSubmitting ? "Sending OTP..." : "Send Verification OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "6px" }}>6-Digit OTP Code</label>
              <input
                type="text"
                className="glass-input"
                required
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "6px" }}>New Password</label>
              <input
                type="password"
                className="glass-input"
                required
                placeholder="Enter new strong password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-block">
              {isSubmitting ? "Resetting Password..." : "Confirm & Update Password"}
            </button>
          </form>
        )}

        <div style={{ marginTop: "24px", textAlign: "center" }}>
          <Link to="/login" style={{ color: "var(--accent-cyan)", fontSize: "0.9rem", fontWeight: 600 }}>
            Return to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
