import React, { useEffect, useState } from "react";
import { getAdminStats } from "../../api.js";
export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  useEffect(() => { load(); }, []);
  async function load() {
    const s = await getAdminStats();
    setStats(s);
  }
  if (!stats) return <div>Carregando...</div>;
  return (
    <div className="detail">
      <h2>Estatísticas</h2>
      <div>
        <h3>Por Status</h3>
        {(stats.byStatus||[]).map(s => <div key={s.status}>{s.status}: {s.count}</div>)}
      </div>
      <div>
        <h3>Por Bairro</h3>
        {(stats.byNeighborhood||[]).map(n => <div key={n.neighborhood}>{n.neighborhood}: {n.count}</div>)}
      </div>
      <div>
        <h3>Por Categoria</h3>
        {(stats.byCategory||[]).map(c => <div key={c.category}>{c.category}: {c.count}</div>)}
      </div>
    </div>
  );
}
