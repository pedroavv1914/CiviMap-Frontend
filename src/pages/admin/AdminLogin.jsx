import React, { useState } from "react";
import { login } from "../../api.js";
export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function submit() {
    const r = await login({ email, password });
    localStorage.setItem("token", r.token);
    location.href = "/admin/dashboard";
  }
  return (
    <div className="form">
      <h2>Admin Login</h2>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Senha" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button onClick={submit}>Entrar</button>
    </div>
  );
}
