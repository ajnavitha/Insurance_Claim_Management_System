import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getPolicyById } from "../services/adminService";

export default function PolicyDetails() {
  const { id } = useParams();

  const [policy, setPolicy] = useState(null);

  useEffect(() => {
    loadPolicy();
  }, [id]);

  const loadPolicy = async () => {
    try {
      const data = await getPolicyById(id);
      setPolicy(data);
    } catch (err) {
      console.error(err);
      toast.error("Unable to load policy");
    }
  };

  if (!policy) {
    return (
      <div className="container section">
        <h2>Loading Policy...</h2>
      </div>
    );
  }

  return (
    <div className="container section">

      <Link
        to="/policies"
        className="text-muted"
        style={{ fontSize: "0.85rem" }}
      >
        ← Back to Policies
      </Link>

      <div
        className="flex-between mt-16"
        style={{
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div>

          <span className="badge badge-gold">
            {policy.policyType}
          </span>

          <h2 className="mt-8">
            {policy.policyName}
          </h2>

          <p className="text-muted mt-8">
            Policy ID : {policy.id}
          </p>

        </div>

        <div
          style={{
            display: "flex",
            gap: 10,
          }}
        >
          <button
            className="btn btn-outline"
            onClick={() => toast.success("Added to Favorites")}
          >
            Favorite
          </button>

          <button
            className="btn btn-outline"
            onClick={() => toast.info("PDF Download Coming Soon")}
          >
            Download PDF
          </button>

          <button
            className="btn btn-primary"
            onClick={() => toast.success("Buy Policy feature coming next")}
          >
            Buy Policy
          </button>

        </div>

      </div>

      <div
        className="grid mt-32"
        style={{
          gridTemplateColumns: "2fr 1fr",
        }}
      >

        <div>

          <div
            className="card"
            style={{
              padding: 24,
            }}
          >
            <h3>Policy Details</h3>

            <div
              className="grid mt-16"
              style={{
                gridTemplateColumns: "1fr 1fr",
                gap: 15,
              }}
            >

              <div>
                <b>Coverage Amount</b>
                <br />
                ₹{Number(policy.coverageAmount).toLocaleString("en-IN")}
              </div>

              <div>
                <b>Premium Amount</b>
                <br />
                ₹{Number(policy.premiumAmount).toLocaleString("en-IN")}
              </div>

              <div>
                <b>Duration</b>
                <br />
                {policy.durationInYears} Years
              </div>

              <div>
                <b>Policy Type</b>
                <br />
                {policy.policyType}
              </div>

            </div>

          </div>

          <div
            className="card mt-24"
            style={{
              padding: 24,
            }}
          >

            <h3>Description</h3>

            <p
              className="mt-16"
              style={{
                lineHeight: 1.8,
              }}
            >
              {policy.description}
            </p>

          </div>

        </div>

        <div
          className="card"
          style={{
            padding: 24,
            height: "fit-content",
          }}
        >

          <span className="text-muted">
            Annual Premium
          </span>

          <h2>
            ₹{Number(policy.premiumAmount).toLocaleString("en-IN")}
          </h2>

          <button
            className="btn btn-primary btn-block mt-16"
            onClick={() =>
              toast.success("Buy Policy module will be implemented next")
            }
          >
            Buy Policy
          </button>

          <button
            className="btn btn-outline btn-block mt-8"
            onClick={() =>
              toast.info("Added to Compare")
            }
          >
            Add to Compare
          </button>

        </div>

      </div>

    </div>
  );
}