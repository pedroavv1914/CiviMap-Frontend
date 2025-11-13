import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { getIssues } from "../../api.js";
export default function AdminMap() {
  const [issues, setIssues] = useState([]);
  const [center, setCenter] = useState([-23.55, -46.63]);
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  useEffect(() => { navigator.geolocation.getCurrentPosition(p => setCenter([p.coords.latitude, p.coords.longitude])); }, []);
  async function load() {
    const r = await getIssues({ status, category, neighborhood, city, sort: "priority", limit: 1000 });
    const arr = Array.isArray(r) ? r : r.items;
    setIssues(arr);
  }
  useEffect(() => { load(); }, []);
  return (
    <div className="detail">
      <h2>Mapa de Ocorrências (Admin)</h2>
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
      <MapContainer center={center} zoom={12} style={{ height: "70vh" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {issues.map(i => {
          const p = Math.max(0, Number(i.priority_score || 0));
          const r = 8 + Math.min(40, p * 4);
          const color = p >= 10 ? "#ef4444" : p >= 5 ? "#f59e0b" : "#10b981";
          return (
            <CircleMarker key={i.id} center={[i.lat, i.lng]} radius={r} pathOptions={{ color, fillColor: color, fillOpacity: 0.4 }}>
              <Popup>
                <div>
                  <div>{i.title}</div>
                  <div>Prioridade: {i.priority_score || 0}</div>
                  <a href={`/admin/issues/${i.id}`}>Abrir</a>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
