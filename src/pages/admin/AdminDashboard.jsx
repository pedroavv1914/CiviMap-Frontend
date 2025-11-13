import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker } from "react-leaflet";
import { getAdminStats, getIssues } from "../../api.js";
import AdminLayout from "../../components/AdminLayout.jsx";
export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [issues, setIssues] = useState([]);
  useEffect(() => { load(); }, []);
  async function load() {
    const s = await getAdminStats();
    setStats(s);
    const list = await getIssues({ sort: "priority", limit: 200 });
    setIssues(Array.isArray(list) ? list : list.items);
  }
  if (!stats) return <AdminLayout><div className="detail">Carregando...</div></AdminLayout>;
  const totalByCategory = (stats.byCategory||[]).reduce((acc,x)=>acc+x.count,0) || 1;
  const maxNeighborhood = Math.max(...(stats.byNeighborhood||[]).map(x=>x.count), 1);
  return (
    <AdminLayout>
      <div className="detail admin-dashboard">
        <h2>Dashboard</h2>
        <div className="admin-cards">
          {(["open","in_progress","resolved","closed"]).map(k => {
            const c = (stats.byStatus||[]).find(x=>x.status===k)?.count || 0;
            const label = k==="open"?"Aberto":k==="in_progress"?"Em andamento":k==="resolved"?"Resolvido":"Fechado";
            const color = k==="open"?"#EF4444":k==="in_progress"?"#F59E0B":k==="resolved"?"#10B981":"#6B7280";
            return (
              <div key={k} className="card admin-card" style={{borderColor:color}}>
                <div style={{color:'#6B7280'}}>{label}</div>
                <div style={{fontSize:28,fontWeight:700,color:color}}>{c}</div>
              </div>
            );
          })}
        </div>
        <div className="admin-panels">
          <div className="card admin-panel">
            <MapContainer center={[-23.55,-46.63]} zoom={12} style={{height:300,borderRadius:12}}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {issues.map(i => {
                const color = i.status==='open'?'#EF4444':i.status==='in_progress'?'#F59E0B':i.status==='resolved'?'#10B981':'#6B7280';
                const r = 7 + Math.min(20, (i.priority_score||0)*2);
                return <CircleMarker key={i.id} center={[i.lat,i.lng]} radius={r} pathOptions={{color,fillColor:color,fillOpacity:0.35}}/>;
              })}
            </MapContainer>
          </div>
          <div className="card admin-panel" style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <svg width="220" height="220" viewBox="0 0 220 220">
              <circle cx="110" cy="110" r="90" fill="#f9fafb" />
              {(stats.byCategory||[]).map((c, idx) => {
                const colors = ['#3B82F6','#10B981','#F59E0B','#EF4444','#6B7280'];
                const val = c.count / totalByCategory;
                const circ = 2 * Math.PI * 90;
                const dash = circ * val;
                const gap = circ - dash;
                const offset = -circ * ((stats.byCategory||[]).slice(0, idx).reduce((a,b)=>a + (b.count/totalByCategory),0));
                return <circle key={c.category} cx="110" cy="110" r="90" fill="transparent" stroke={colors[idx%colors.length]} strokeWidth="20" strokeDasharray={`${dash} ${gap}`} strokeDashoffset={offset} />;
              })}
            </svg>
          </div>
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
      </div>
    </AdminLayout>
  );
}
