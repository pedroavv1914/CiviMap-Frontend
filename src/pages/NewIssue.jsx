import React, { useState } from "react";
import MapView from "../components/MapView.jsx";
import { createIssue, uploadIssuePhotos } from "../api.js";
export default function NewIssue() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("1");
  const [address, setAddress] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [pos, setPos] = useState({ lat: -23.55, lng: -46.63 });
  const [photos, setPhotos] = useState([]);
  async function submit() {
    const created = await createIssue({ title, description, category_id: Number(category), lat: pos.lat, lng: pos.lng, address, neighborhood });
    if (photos.length) await uploadIssuePhotos(created.id, photos);
    location.href = "/issue/" + created.id;
  }
  return (
    <div className="form mobile-form">
      <h2 style={{margin:'8px 0'}}>Registrar um problema</h2>
      <label>Título</label>
      <input placeholder="Título" value={title} onChange={e=>setTitle(e.target.value)} />
      <label>Descrição</label>
      <textarea placeholder="Descreva o problema" value={description} onChange={e=>setDescription(e.target.value)} />
      <label>Categoria</label>
      <select value={category} onChange={e=>setCategory(e.target.value)}>
        <option value="1">Buraco</option>
        <option value="2">Lixo</option>
        <option value="3">Iluminação</option>
        <option value="4">Outros</option>
      </select>
      <label>Endereço</label>
      <input placeholder="Endereço" value={address} onChange={e=>setAddress(e.target.value)} />
      <label>Bairro</label>
      <input placeholder="Bairro" value={neighborhood} onChange={e=>setNeighborhood(e.target.value)} />
      <input type="file" multiple onChange={e=>setPhotos(Array.from(e.target.files||[]))} />
      <div className="mobile-map-wrapper">
        <MapView center={[pos.lat, pos.lng]} markers={[{ id: "new", title, lat: pos.lat, lng: pos.lng, status:'open' }]} onClick={setPos} />
      </div>
      <button className="btn btn-primary" onClick={submit}>Enviar denúncia</button>
    </div>
  );
}
