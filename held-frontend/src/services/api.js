// import React, { useEffect, useState } from "react";
// import api from "../services/api.js";

// export default function AdminPage() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     api
//       .get("/api/admin/users")
//       .then((res) => setUsers(res.data))
//       .finally(() => setLoading(false));
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this user?")) return;
//     await api.delete(`/api/admin/users/${id}`);
//     setUsers((u) => u.filter((user) => user.id !== id));
//   };

//   return (
//     <div className="page">
//       <h2>Admin Dashboard</h2>
//       {loading ? (
//         <div className="loading">Loading users...</div>
//       ) : (
//         <div className="admin-table-wrap card">
//           <table className="admin-table">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Username</th>
//                 <th>Email</th>
//                 <th>Role</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((u) => (
//                 <tr key={u.id}>
//                   <td>{u.id}</td>
//                   <td>{u.username}</td>
//                   <td>{u.email}</td>
//                   <td>
//                     <span className={`role-tag ${u.role}`}>{u.role}</span>
//                   </td>
//                   <td>
//                     <button
//                       className="btn btn-danger btn-sm"
//                       onClick={() => handleDelete(u.id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

export default api;