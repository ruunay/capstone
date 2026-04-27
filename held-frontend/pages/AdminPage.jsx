import React, { useEffect, useState } from "react";
import api from "../services/api.js";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/admin/users")
      .then((res) => setUsers(res.data))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this user?")) return;
    await api.delete(`/api/admin/users/${id}`);
    setUsers((u) => u.filter((user) => user.id !== id));
  };

  return (
    <div className="page admin-page theme-soft-pink fade-in">
      <div className="admin-background-blur" />


      <div className="page-header admin-header">
        <h2 className="admin-title">Admin Dashboard</h2>
        <p className="admin-subtitle">
          Manage users, roles, and community safety with care.
        </p>
      </div>

  
      {loading && (
        <div className="loading admin-loading fade-in">Loading users…</div>
      )}


      {!loading && users.length === 0 && (
        <div className="empty-state glass-card fade-in">
          <h3 className="empty-title">No users found</h3>
          <p className="empty-text">
            Your community is quiet right now — check back soon.
          </p>
        </div>
      )}

      {!loading && users.length > 0 && (
        <div className="admin-table-wrap glass-card fade-in">
          <table className="admin-table">
            <thead>
              <tr>
                <th className="admin-th">ID</th>
                <th className="admin-th">Username</th>
                <th className="admin-th">Email</th>
                <th className="admin-th">Role</th>
                <th className="admin-th">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="admin-row">
                  <td className="admin-td">{u.id}</td>
                  <td className="admin-td">{u.username}</td>
                  <td className="admin-td">{u.email}</td>
                  <td className="admin-td">
                    <span className={`role-tag role-${u.role.toLowerCase()}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="admin-td">
                    <button
                      className="btn btn-danger btn-sm admin-delete-btn"
                      onClick={() => handleDelete(u.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
