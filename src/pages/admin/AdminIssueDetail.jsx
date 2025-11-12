import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getIssue, getStatusHistory, patchIssueStatus } from "../../api.js";
export default function AdminIssueDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [history, setHistory] = useState([]);
  const [newStatus, setNewStatus] = useState("in_review");
  async function load() {
    const it = await getIssue(id);
    setItem(it);
    const h = await getStatusHistory(id);
    setHistory(h);
  }
  useEffect(()=>{ load(); }, [id]);
  async function changeStatus() {
    await patchIssueStatus(id, newStatus);
    await load();
  }
  if (!item) return <div>Carregando...</div>;
  return (
    <div className="detail">
      <h2>{item.title}</h2>
      <div>Status atual: {item.status}</div>
      <select value={newStatus} onChange={e=>setNewStatus(e.target.value)}>
        <option value="in_review">Em análise</option>
        <option value="in_progress">Em andamento</option>
        <option value="resolved">Resolvido</option>
        <option value="closed">Fechado</option>
      </select>
      <button onClick={changeStatus}>Alterar status</button>
      <h3>Histórico</h3>
      <div className="comments">
        {history.map(h => (
          <div key={h.id}>
            <div>{h.old_status} → {h.new_status}</div>
            <div>{new Date(h.created_at).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
