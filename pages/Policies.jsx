import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPolicies } from "../services/adminService";

export default function Policies() {
  const [compareList, setCompareList] = useState([]);
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    loadPolicies();
  }, []);

  const loadPolicies = async () => {
    try {
      const data = await getPolicies();
      setPolicies(data);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleCompare = (id) => {
    setCompareList((prev) =>
      prev.includes(id)
        ? prev.filter((p) => p !== id)
        : [...prev, id].slice(-2)
    );
  };

  return (
    <div className="container section">
      <div className="section-head">
        <div>
          <h2>Browse Insurance Policies</h2>
          <p className="text-muted">
            Browse and compare insurance policies from our database.
          </p>
        </div>

        {compareList.length === 2 && (
          <Link to="/compare" className="btn btn-navy">
            Compare Selected ({compareList.length})
          </Link>
        )}
      </div>

      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))",
        }}
      >
        {policies.map((p) => (
          <div key={p.id} className="card" style={{ padding: 20 }}>
            <div className="flex-between">
              <span className="badge badge-gold">
                {p.policyType}
              </span>

              <button
                className="btn btn-outline btn-sm"
                onClick={() => toggleCompare(p.id)}
              >
                {compareList.includes(p.id)
                  ? "Added ✓"
                  : "Add to Compare"}
              </button>
            </div>

            <h3 className="mt-16">{p.policyName}</h3>

            <p className="text-muted mt-8">
              Coverage :
              ₹{Number(p.coverageAmount).toLocaleString("en-IN")}
            </p>

            <p className="text-muted">
              Duration : {p.durationInYears} Years
            </p>

            <p className="text-muted">
              {p.description}
            </p>

            <div className="flex-between mt-24">
              <span
                style={{
                  fontWeight: "700",
                  fontSize: "1.1rem",
                }}
              >
                ₹{Number(p.premiumAmount).toLocaleString("en-IN")}
                <span
                  className="text-muted"
                  style={{
                    fontWeight: 400,
                    fontSize: "0.75rem",
                  }}
                >
                  /year
                </span>
              </span>

              <Link
                to={`/policies/${p.id}`}
                className="btn btn-primary btn-sm"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}