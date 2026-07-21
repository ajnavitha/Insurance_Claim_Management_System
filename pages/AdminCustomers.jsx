import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUsers, deleteUser } from "../services/adminService";

export default function AdminCustomers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch {
      toast.error("Failed to load users");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await deleteUser(id);
      toast.success("User deleted successfully");
      loadUsers();
    } catch {
      toast.error("Delete failed");
    }
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container section">

      <h2>Customer Management</h2>

      <input
        type="text"
        placeholder="Search by Name or Email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "350px",
          padding: "10px",
          margin: "20px 0"
        }}
      />

      <div className="card">

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse"
          }}
        >

          <thead>

            <tr>

              <th>ID</th>

              <th>Name</th>

              <th>Email</th>

              <th>Phone</th>

              <th>Work</th>

              <th>Age</th>

              <th>Role</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {filtered.map((u) => (

              <tr key={u.id}>

                <td>{u.id}</td>

                <td>{u.name}</td>

                <td>{u.email}</td>

                <td>{u.phone}</td>

                <td>{u.work}</td>

                <td>{u.age}</td>

                <td>{u.role}</td>

                <td>

                  <button
                    className="btn btn-outline"
                    onClick={() => handleDelete(u.id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}