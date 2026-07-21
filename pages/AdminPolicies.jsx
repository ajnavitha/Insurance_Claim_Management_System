import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getPolicies,
  addPolicy,
  updatePolicy,
  deletePolicy,
} from "../services/adminService";

export default function AdminPolicies() {
  const emptyPolicy = {
    policyName: "",
    policyType: "",
    premiumAmount: "",
    coverageAmount: "",
    durationInYears: "",
    description: "",
  };

  const [policies, setPolicies] = useState([]);
  const [policy, setPolicy] = useState(emptyPolicy);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadPolicies();
  }, []);

  const loadPolicies = async () => {
    try {
      const data = await getPolicies();
      setPolicies(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load policies");
    }
  };

  const handleChange = (e) => {
    setPolicy({
      ...policy,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await updatePolicy(editId, {
          id: editId,
          ...policy,
          premiumAmount: Number(policy.premiumAmount),
          coverageAmount: Number(policy.coverageAmount),
          durationInYears: Number(policy.durationInYears),
        });

        toast.success("Policy Updated Successfully");
      } else {
        await addPolicy({
          ...policy,
          premiumAmount: Number(policy.premiumAmount),
          coverageAmount: Number(policy.coverageAmount),
          durationInYears: Number(policy.durationInYears),
        });

        toast.success("Policy Added Successfully");
      }

      setPolicy(emptyPolicy);
      setEditId(null);
      loadPolicies();
    } catch (err) {
      console.error(err);
      toast.error("Operation Failed");
    }
  };

  const handleEdit = (p) => {
    setEditId(p.id);

    setPolicy({
      policyName: p.policyName,
      policyType: p.policyType,
      premiumAmount: p.premiumAmount,
      coverageAmount: p.coverageAmount,
      durationInYears: p.durationInYears,
      description: p.description,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this policy?")) return;

    try {
      await deletePolicy(id);
      toast.success("Policy Deleted");
      loadPolicies();
    } catch (err) {
      console.error(err);
      toast.error("Delete Failed");
    }
  };

  return (
    <div className="container section">
      <h2>Policy Management</h2>

      <form
        onSubmit={handleSubmit}
        className="card"
        style={{ padding: 20, marginBottom: 30 }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: 15,
          }}
        >
          <input
            type="text"
            name="policyName"
            placeholder="Policy Name"
            value={policy.policyName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="policyType"
            placeholder="Policy Type"
            value={policy.policyType}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="premiumAmount"
            placeholder="Premium Amount"
            value={policy.premiumAmount}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="coverageAmount"
            placeholder="Coverage Amount"
            value={policy.coverageAmount}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="durationInYears"
            placeholder="Duration (Years)"
            value={policy.durationInYears}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={policy.description}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div style={{ marginTop: 20 }}>
          <button className="btn btn-primary" type="submit">
            {editId ? "Update Policy" : "Add Policy"}
          </button>

          {editId && (
            <button
              type="button"
              className="btn btn-outline"
              style={{ marginLeft: 10 }}
              onClick={() => {
                setEditId(null);
                setPolicy(emptyPolicy);
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="card">
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Premium</th>
              <th>Coverage</th>
              <th>Duration</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {policies.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  style={{
                    textAlign: "center",
                    padding: 20,
                  }}
                >
                  No Policies Available
                </td>
              </tr>
            ) : (
              policies.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.policyName}</td>
                  <td>{p.policyType}</td>
                  <td>₹{Number(p.premiumAmount).toLocaleString("en-IN")}</td>
                  <td>₹{Number(p.coverageAmount).toLocaleString("en-IN")}</td>
                  <td>{p.durationInYears} Years</td>
                  <td>{p.description}</td>

                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleEdit(p)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-sm btn-outline"
                      style={{ marginLeft: 8 }}
                      onClick={() => handleDelete(p.id)}
                    >
                      Delete
                    </button>
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