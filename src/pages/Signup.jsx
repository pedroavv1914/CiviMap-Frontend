import React, { useState } from "react";
import { signup } from "../api.js";
export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function submit() {
    await signup({ name, email, password });
    location.href = "/login";
  }
  return (
    <div className="form">
      <input placeholder="Nome" value={name} onChange={e=>setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Senha" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button onClick={submit}>Registrar</button>
    </div>
  );
}
