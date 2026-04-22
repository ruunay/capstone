import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const [data, setData] = useState({ username:"", email:"", password:"" });

  const submit = async (e) => {
    e.preventDefault();
    await register(data);
    window.location.href="/dashboard";
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Register</h2>
        <form onSubmit={submit}>
          <input className="input" placeholder="Username" onChange={e=>setData({...data,username:e.target.value})}/>
          <input className="input" placeholder="Email" onChange={e=>setData({...data,email:e.target.value})}/>
          <input className="input" type="password" placeholder="Password" onChange={e=>setData({...data,password:e.target.value})}/>
          <button className="btn">Register</button>
        </form>
      </div>
    </div>
  );
}