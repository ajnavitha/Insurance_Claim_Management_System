import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import StatCard from "../components/common/StatCard";
import {
  FiFileText,
  FiClipboard,
  FiCreditCard,
  FiBell,
} from "react-icons/fi";

import {
  getProfile,
  getPolicies,
  getMyClaims,
  getPayments,
  getNotifications,
} from "../services/customerService";

export default function CustomerDashboard() {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({});
  const [policies, setPolicies] = useState([]);
  const [claims, setClaims] = useState([]);
  const [payments, setPayments] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const profileData = await getProfile();
      const policyData = await getPolicies();
      const claimData = await getMyClaims();
      const paymentData = await getPayments();
      const notificationData = await getNotifications();

      setProfile(profileData);
      setPolicies(policyData);
      setClaims(claimData);
      setPayments(paymentData);
      setNotifications(notificationData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h3>Loading Dashboard...</h3>
      </div>
    );
  }

  return (
    <div>

      <div
        className="card"
        style={{
          padding: 25,
          marginBottom: 25,
          borderRadius: 15,
          background:
            "linear-gradient(135deg,#0f172a,#1e3a8a)",
          color: "white",
        }}
      >
        <h2>
          Welcome back, {profile.name || user?.name || "Customer"} 👋
        </h2>

        <p style={{ marginTop: 10, opacity: .9 }}>
          {profile.email || user?.email}
        </p>

{(profile.work || profile.phone) && (
  <p style={{ marginTop: 5 }}>
    {profile.work}
    {profile.work && profile.phone ? " | " : ""}
    {profile.phone}
  </p>
)}


      </div>

      <div
        className="grid"
        style={{
          gridTemplateColumns:
            "repeat(auto-fit,minmax(230px,1fr))",
          gap: 20,
        }}
      >
        <StatCard
          label="Active Policies"
          value={policies.length}
          icon={<FiFileText />}
          tone="navy"
        />

        <StatCard
          label="My Claims"
          value={claims.length}
          icon={<FiClipboard />}
          tone="gold"
        />

        <StatCard
          label="Payments"
          value={payments.length}
          icon={<FiCreditCard />}
          tone="green"
        />

        <StatCard
          label="Notifications"
          value={notifications.length}
          icon={<FiBell />}
          tone="red"
        />
      

      <div
        className="grid mt-24"
        style={{
          gridTemplateColumns: "2fr 1fr",
          gap: 20,
        }}
      ></div>        <div className="card" style={{ padding: 24 }}>
          <div className="flex-between">
            <h3>My Policies</h3>

            <Link
              to="/policies"
              className="text-muted"
              style={{ fontSize: "0.85rem" }}
            >
              View All
            </Link>
          </div>

          <div
            className="mt-16"
            style={{
              display: "grid",
              gap: 12,
            }}
          >
            {policies.length === 0 ? (
              <p className="text-muted">No policies found.</p>
            ) : (
              policies.map((p) => (
                <div
                  key={p.id}
                  className="flex-between"
                  style={{
                    padding: 15,
                    borderRadius: 12,
                    background: "#f8fafc",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <div>
                    <strong>{p.policyName || p.policyType || "Policy"}</strong>

                    <div className="text-muted">
                      {p.policyNumber}
                    </div>
                  </div>

                  <span
                    className={`badge ${
                      p.status === "Active"
                        ? "badge-green"
                        : "badge-gold"
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <h3>Quick Actions</h3>

          <div
            className="mt-16"
            style={{
              display: "grid",
              gap: 10,
            }}
          >
            <Link
              to="/policies"
              className="btn btn-primary btn-block"
            >
              Buy Policy
            </Link>

            <Link
              to="/claims"
              className="btn btn-navy btn-block"
            >
              File New Claim
            </Link>

            <Link
              to="/payments"
              className="btn btn-outline btn-block"
            >
              Make Payment
            </Link>

            <Link
              to="/support"
              className="btn btn-outline btn-block"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>

      <div
        className="grid mt-24"
        style={{
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
        }}
      >
        <div className="card" style={{ padding: 24 }}>
          <h3>Recent Payments</h3>

          <div
            className="mt-16"
            style={{
              display: "grid",
              gap: 12,
            }}
          >
            {payments.length === 0 ? (
              <p className="text-muted">
                No payment history available.
              </p>
            ) : (
              payments.map((p) => (
                <div
                  key={p.id}
                  className="flex-between"
                >
                  <div>
                    <strong>
                      {p.policyNumber}
                    </strong>

                    <div className="text-muted">
                      {p.paymentMethod}
                    </div>
                  </div>

                  <span className="badge badge-green">
                    ₹{p.amount}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <h3>Notifications</h3>

          <div
            className="mt-16"
            style={{
              display: "grid",
              gap: 12,
            }}
          >
            {notifications.length === 0 ? (
              <p className="text-muted">
                No notifications available.
              </p>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className="flex-between"
                >
                  <div>
                    <strong>{n.title}</strong>

                    <div
                      className="text-muted"
                      style={{
                        fontSize: ".8rem",
                      }}
                    >
                      {n.message}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}