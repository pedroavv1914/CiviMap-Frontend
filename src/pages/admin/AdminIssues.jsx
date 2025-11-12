import React, { useEffect, useState } from "react";
import { getIssues } from "../../api.js";
export default function AdminIssues() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  useEffect(()=>{ load(); }, []);
  async function load() {
    const r = await getIssues({ status, category, neighborhood, city, sort: "date", limit: 200 });
    setItems(r);
  }
  return (
    <div className="detail">
      <h2>Issues</h2>
      <div className="filters">
        <select value={status} onChange={e=>setStatus(e.target.value)}>
          <option value="">Status</option>
          <option value="open">Aberto</option>
          <option value="in_review">Em análise</option>
          <option value="in_progress">Em andamento</option>
          <option value="resolved">Resolvido</option>
          <option value="closed">Fechado</option>
        </select>
        <select value={category} onChange={e=>setCategory(e.target.value)}>
          <option value="">Categoria</option>
          <option value="1">Buraco</option>
          <option value="2">Lixo</option>
          <option value="3">Iluminação</option>
          <option value="4">Outros</option>
        </select>
        <input placeholder="Bairro" value={neighborhood} onChange={e=>setNeighborhood(e.target.value)} />
        <input placeholder="Cidade" value={city} onChange={e=>setCity(e.target.value)} />
        <button onClick={load}>Aplicar</button>
      </div>
      <div className="list">
        {items.map(i => (
          <div key={i.id} className="card">
            <div>{i.title}</div>
            <div>{i.status}</div>
            <a href={`/admin/issues/${i.id}`}>Abrir</a>
          </div>
        ))}
      </div>
    </div>
  );
}
