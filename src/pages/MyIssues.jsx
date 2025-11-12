import React, { useEffect, useState } from "react";
import { getIssues } from "../api.js";
export default function MyIssues() {
  const [items, setItems] = useState([]);
  const [userId, setUserId] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    setUserId(token ? JSON.parse(atob(token.split(".")[1])).sub : "");
  }, []);
  useEffect(() => { if (userId) load(); }, [userId]);
  async function load() {
    const list = await getIssues({});
    setItems(list.filter(i => i.created_by === userId));
  }
  return (
    <div className="list">
      {items.map(i => (
        <div key={i.id} className="card">
          <div>{i.title}</div>
          <div>{i.status}</div>
          <a href={`/issue/${i.id}`}>Abrir</a>
        </div>
      ))}
    </div>
  );
}
