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
  const maxStatus = Math.max(...(stats.byStatus||[]).map(x=>x.count), 1);
  const maxNeighborhood = Math.max(...(stats.byNeighborhood||[]).map(x=>x.count), 1);
  const maxCategory = Math.max(...(stats.byCategory||[]).map(x=>x.count), 1);
  return (
    <div className="detail">
      <h2>Estatísticas</h2>
      <div>
        <h3>Por Status</h3>
        {(stats.byStatus||[]).map(s => (
          <div key={s.status} style={{display:'flex',alignItems:'center',gap:8}}>
            <div style={{width:120}}>{s.status}</div>
            <div style={{height:12,background:'#e5e5e5',flex:1,borderRadius:6}}>
              <div style={{height:12,width:`${(s.count/maxStatus)*100}%`,background:'#3b82f6',borderRadius:6}}></div>
            </div>
            <div>{s.count}</div>
          </div>
        ))}
      </div>
      <div>
        <h3>Por Bairro</h3>
        {(stats.byNeighborhood||[]).map(n => (
          <div key={n.neighborhood} style={{display:'flex',alignItems:'center',gap:8}}>
            <div style={{width:180}}>{n.neighborhood}</div>
            <div style={{height:12,background:'#e5e5e5',flex:1,borderRadius:6}}>
              <div style={{height:12,width:`${(n.count/maxNeighborhood)*100}%`,background:'#10b981',borderRadius:6}}></div>
            </div>
            <div>{n.count}</div>
          </div>
        ))}
      </div>
      <div>
        <h3>Por Categoria</h3>
        {(stats.byCategory||[]).map(c => (
          <div key={c.category} style={{display:'flex',alignItems:'center',gap:8}}>
            <div style={{width:180}}>{c.category}</div>
            <div style={{height:12,background:'#e5e5e5',flex:1,borderRadius:6}}>
              <div style={{height:12,width:`${(c.count/maxCategory)*100}%`,background:'#f59e0b',borderRadius:6}}></div>
            </div>
            <div>{c.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
