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
    <div className="form">
      <input placeholder="Título" value={title} onChange={e=>setTitle(e.target.value)} />
      <textarea placeholder="Descrição" value={description} onChange={e=>setDescription(e.target.value)} />
      <select value={category} onChange={e=>setCategory(e.target.value)}>
        <option value="1">Buraco</option>
        <option value="2">Lixo</option>
        <option value="3">Iluminação</option>
        <option value="4">Outros</option>
      </select>
      <input placeholder="Endereço" value={address} onChange={e=>setAddress(e.target.value)} />
      <input placeholder="Bairro" value={neighborhood} onChange={e=>setNeighborhood(e.target.value)} />
      <input type="file" multiple onChange={e=>setPhotos(Array.from(e.target.files||[]))} />
      <MapView center={[pos.lat, pos.lng]} markers={[{ id: "new", title, lat: pos.lat, lng: pos.lng }]} onClick={setPos} />
      <button onClick={submit}>Enviar denúncia</button>
    </div>
  );
}
