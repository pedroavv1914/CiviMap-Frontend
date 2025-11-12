import React, { useState } from "react";
export default function FilterBar({ onChange }) {
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [sort, setSort] = useState("date");
  const [radius, setRadius] = useState("");
  function apply() {
    const p = { status, category, neighborhood, city, sort };
    if (radius) p.radius = Number(radius);
    onChange(p);
  }
  return (
    <div className="filters">
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option value="">Status</option>
        <option value="open">Aberto</option>
        <option value="in_review">Em análise</option>
        <option value="in_progress">Em andamento</option>
        <option value="resolved">Resolvido</option>
        <option value="closed">Fechado</option>
      </select>
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="">Categoria</option>
        <option value="1">Buraco</option>
        <option value="2">Lixo</option>
        <option value="3">Iluminação</option>
        <option value="4">Outros</option>
      </select>
      <input placeholder="Bairro" value={neighborhood} onChange={e => setNeighborhood(e.target.value)} />
      <input placeholder="Cidade" value={city} onChange={e => setCity(e.target.value)} />
      <select value={sort} onChange={e => setSort(e.target.value)}>
        <option value="date">Mais recentes</option>
        <option value="priority">Prioridade</option>
        <option value="distance">Distância</option>
      </select>
      <input placeholder="Raio (m)" value={radius} onChange={e => setRadius(e.target.value)} />
      <button onClick={apply}>Aplicar</button>
    </div>
  );
}
