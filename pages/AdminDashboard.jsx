import React, { useEffect, useState } from "react";
import { getDashboard, getClaims } from "../services/adminService";

export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const dashboardData = await getDashboard();
      const claimsData = await getClaims();

      setDashboard(dashboardData);
      setClaims(claimsData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="container section">
      <h2>Admin Dashboard</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "20px",
          marginTop: "20px",
          marginBottom: "30px",
        }}
      >
        <div className="card" style={{ padding: 20 }}>
          <h4>Total Users</h4>
          <h2>{dashboard?.totalUsers ?? 0}</h2>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <h4>Total Policies</h4>
          <h2>{dashboard?.totalPolicies ?? 0}</h2>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <h4>Total Claims</h4>
          <h2>{dashboard?.totalClaims ?? 0}</h2>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <h4>Pending Claims</h4>
          <h2>{dashboard?.pendingClaims ?? 0}</h2>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <h4>Approved Claims</h4>
          <h2>{dashboard?.approvedClaims ?? 0}</h2>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <h4>Rejected Claims</h4>
          <h2>{dashboard?.rejectedClaims ?? 0}</h2>
        </div>
      </div>

      <div className="card" style={{ padding: 20 }}>
        <h3>Recent Claims</h3>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "15px",
          }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Policy Number</th>
              <th>Claim Type</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Submitted Date</th>
            </tr>
          </thead>

          <tbody>
            {claims.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: 20 }}>
                  No Claims Found
                </td>
              </tr>
            ) : (
              claims.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.policyNumber}</td>
                  <td>{c.claimType}</td>
                  <td>₹{Number(c.amount).toLocaleString("en-IN")}</td>
                  <td>{c.status}</td>
                  <td>
                    {new Date(c.submittedDate).toLocaleDateString("en-IN")}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}