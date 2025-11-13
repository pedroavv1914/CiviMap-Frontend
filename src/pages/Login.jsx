import React, { useState } from "react";
import { login } from "../api.js";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function submit() {
    const r = await login({ email, password });
    localStorage.setItem("token", r.token);
    location.href = "/";
  }
  return (
    <div className="form">
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Senha" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button className="btn btn-primary" onClick={submit}>Entrar</button>
    </div>
  );
}
