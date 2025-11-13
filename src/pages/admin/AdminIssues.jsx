import React, { useEffect, useState } from "react";
import { getIssues } from "../../api.js";
import StatusBadge from "../../components/StatusBadge.jsx";
import AdminLayout from "../../components/AdminLayout.jsx";
export default function AdminIssues() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  useEffect(()=>{ load(); }, []);
  async function load() {
    const r = await getIssues({ status, category, neighborhood, city, sort: "date", limit, offset, with_count: true });
    const arr = Array.isArray(r) ? r : r.items;
    setItems(arr);
    setTotal(!Array.isArray(r) ? r.total : arr.length);
  }
  return (
    <AdminLayout>
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
        <button onClick={() => { setOffset(0); load(); }}>Aplicar</button>
      </div>
      <div style={{display:'flex',gap:8,alignItems:'center',padding:'0 12px'}}>
        <span>Total: {total}</span>
        <button disabled={offset===0} onClick={()=>{ setOffset(Math.max(0, offset - limit)); load(); }}>Anterior</button>
        <button disabled={offset + limit >= total} onClick={()=>{ setOffset(offset + limit); load(); }}>Próxima</button>
        <select value={limit} onChange={e=>{ setLimit(Number(e.target.value)); setOffset(0); load(); }}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
      <div className="list">
        {items.map(i => (
          <div key={i.id} className="card">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>{i.title}</div>
              <StatusBadge status={i.status} />
            </div>
            <a href={`/admin/issues/${i.id}`}>Abrir</a>
          </div>
        ))}
      </div>
    </div>
    </AdminLayout>
  );
}
