import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

const statusTone = {
  Approved: "green",
  Pending: "gold",
  Rejected: "red",
};

export default function Claims() {
  const [claims, setClaims] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClaims();
  }, []);

  const loadClaims = async () => {
    try {
      const response = await api.get("Claim");
      setClaims(response.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load claims");
    } finally {
      setLoading(false);
    }
  };

  const filteredClaims =
    filter === "All"
      ? claims
      : claims.filter((c) => c.status === filter);

  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h2>Loading Claims...</h2>
      </div>
    );
  }

  return (
    <div className="container section">
      <div className="section-head">
        <div>
          <h2>My Claims </h2>
          <p className="text-muted">
              Track your submitted insurance claims.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => toast.info("Claim form coming soon")}
        >
          + File New Claim
        </button>
      </div>

      <div
        style={{
          display: "flex",
          gap: 10,
          marginBottom: 20,
          flexWrap: "wrap",
        }}
      >
        {["All", "Pending", "Approved", "Rejected"].map((status) => (
          <button
            key={status}
            className={`btn btn-sm ${
              filter === status ? "btn-navy" : "btn-outline"
            }`}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="card" style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "0.9rem",
          }}
        >
          <thead>
            <tr style={{ textAlign: "left" }}>
              <th style={{ padding: 14 }}>ID</th>
              <th style={{ padding: 14 }}>Policy Number</th>
              <th style={{ padding: 14 }}>Claim Type</th>
              <th style={{ padding: 14 }}>Amount</th>
              <th style={{ padding: 14 }}>Status</th>
              <th style={{ padding: 14 }}>Submitted Date</th>
              <th style={{ padding: 14 }}>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredClaims.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  style={{
                    textAlign: "center",
                    padding: 30,
                  }}
                >
                  No Claims Found
                </td>
              </tr>
            ) : (
              filteredClaims.map((c) => (
                <tr
                  key={c.id}
                  style={{
                    borderTop: "1px solid #eee",
                  }}
                >
                  <td style={{ padding: 14 }}>{c.id}</td>

                  <td style={{ padding: 14 }}>
                    {c.policyNumber}
                  </td>

                  <td style={{ padding: 14 }}>
                    {c.claimType}
                  </td>

                  <td style={{ padding: 14 }}>
                    ₹{Number(c.amount).toLocaleString("en-IN")}
                  </td>

                  <td style={{ padding: 14 }}>
                    <span
                      className={`badge badge-${
                        statusTone[c.status]
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>

                  <td style={{ padding: 14 }}>
                    {new Date(
                      c.submittedDate
                    ).toLocaleDateString("en-IN")}
                  </td>

                  <td style={{ padding: 14 }}>
                    <Link
                      to={`/claims/${c.id}`}
                      className="btn btn-outline btn-sm"
                    >
                      View
                    </Link>
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