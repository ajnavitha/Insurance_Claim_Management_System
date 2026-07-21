import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaShieldAlt, FaUser, FaEnvelope, FaBriefcase, FaPhone, FaLock } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import api from "../services/api";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: 28,
    work: "Software Engineer",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { t } = useLanguage();

  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, text: "", color: "transparent" };
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 1) return { score: 25, text: t("weak"), color: "var(--accent-rose)" };
    if (score === 2 || score === 3) return { score: 65, text: t("medium"), color: "var(--accent-gold)" };
    return { score: 100, text: t("strong"), color: "var(--accent-emerald)" };
  };

  const strength = getPasswordStrength(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await api.post("/Auth/register", {
        name: formData.name,
        email: formData.email,
        age: parseInt(formData.age, 10),
        work: formData.work,
        phone: formData.phone,
        password: formData.password
      });

      toast.success(response.data?.message || "Account created successfully! Please log in.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div className="glass-panel" style={{ maxWidth: "600px", width: "100%", padding: "40px" }}>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <FaShieldAlt style={{ fontSize: "2.5rem", color: "var(--accent-cyan)", marginBottom: "8px" }} />
          <h2 style={{ fontSize: "1.8rem", fontWeight: 700 }}>Create Policyholder Account</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "4px" }}>
            Join InsurePro AI for seamless claim automation and policy protection.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "6px" }}>Full Name</label>
            <input
              type="text"
              className="glass-input"
              required
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "6px" }}>Email</label>
              <input
                type="email"
                className="glass-input"
                required
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "6px" }}>Phone</label>
              <input
                type="tel"
                className="glass-input"
                required
                placeholder="+91 9876543210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "6px" }}>Age</label>
              <input
                type="number"
                className="glass-input"
                required
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "6px" }}>Occupation</label>
              <input
                type="text"
                className="glass-input"
                required
                value={formData.work}
                onChange={(e) => setFormData({ ...formData, work: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "6px" }}>Password</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                className="glass-input"
                style={{ paddingRight: "44px" }}
                required
                placeholder="Minimum 8 characters"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", color: "var(--text-muted)" }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Password Strength Meter */}
            {formData.password && (
              <div style={{ marginTop: "8px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", marginBottom: "4px" }}>
                  <span style={{ color: "var(--text-muted)" }}>{t("passwordStrength")}:</span>
                  <span style={{ fontWeight: 700, color: strength.color }}>{strength.text}</span>
                </div>
                <div style={{ height: "4px", background: "rgba(255,255,255,0.1)", borderRadius: "2px", overflow: "hidden" }}>
                  <div style={{ width: `${strength.score}%`, height: "100%", background: strength.color, transition: "width 0.3s ease" }}></div>
                </div>
              </div>
            )}
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "6px" }}>Confirm Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="glass-input"
              required
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
          </div>

          <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-block mt-8">
            {isSubmitting ? "Creating Account..." : "Complete Registration"}
          </button>
        </form>

        <p style={{ marginTop: "20px", textAlign: "center", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "var(--accent-cyan)", fontWeight: 600 }}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}