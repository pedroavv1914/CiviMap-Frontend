import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getIssue, getComments, postComment, toggleVote, getPhotos, getVotes, me } from "../api.js";
import StatusBadge from "../components/StatusBadge.jsx";
export default function IssueDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [photos, setPhotos] = useState([]);
  const [votes, setVotes] = useState(null);
  const [user, setUser] = useState(null);
  async function load() {
    const it = await getIssue(id);
    setItem(it);
    const cs = await getComments(id);
    setComments(cs);
    const ps = await getPhotos(id);
    setPhotos(ps);
    try { const v = await getVotes(id); setVotes(v.count); } catch {}
    try { const u = await me(); setUser(u); } catch {}
  }
  useEffect(() => { load(); }, [id]);
  async function sendComment() {
    await postComment(id, content);
    setContent("");
    load();
  }
  async function vote() {
    const r = await toggleVote(id);
    setVotes(r.votes);
    load();
  }
  if (!item) return <div>Carregando...</div>;
  return (
    <div className="detail mobile-detail">
      <div className="mobile-header">
        <a href="/" aria-label="Voltar" className="mobile-back">←</a>
        <div className="mobile-hero__brand">
          <img src="/logo.png" alt="CiviMap" width={24} height={24} />
          <span className="brand-name" style={{fontSize:16}}>CiviMap</span>
        </div>
      </div>
      <h2>{item.title}</h2>
      <div style={{color:'#6B7280'}}>{item.address}{item.neighborhood?`, ${item.neighborhood}`:''}</div>
      <div className="mobile-photo">
        {photos[0] && <img src={photos[0].url} alt="foto" style={{width:'100%',borderRadius:12}} />}
      </div>
      <div>{item.description}</div>
      <div style={{display:'flex',alignItems:'center',gap:8}}>Status: <StatusBadge status={item.status} /></div>
      <div>Categoria: {item.category_id}</div>
      <div>Endereço: {item.address}</div>
      <div>Bairro: {item.neighborhood}</div>
      <div className="photos" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(160px,1fr))',gap:'8px'}}>
        {photos.map(p => (
          <a key={p.id} href={p.url} target="_blank" rel="noreferrer">
            <img src={p.url} alt="foto" style={{width:'100%',borderRadius:'6px'}} />
          </a>
        ))}
      </div>
      <button className="btn btn-primary" onClick={vote}>Apoiar problema</button>
      {votes !== null && <div>Votos: {votes}</div>}
      <h3>Comentários</h3>
      <div className="comments">
        {comments.map(c => (
          <div key={c.id} className="comment" style={{display:'flex',gap:8,alignItems:'center'}}>
            <div style={{width:32,height:32,borderRadius:999,background:'#E5E7EB'}}></div>
            <div>{c.content}</div>
            <div>{new Date(c.created_at).toLocaleString()}</div>
            {user && (user.role === 'admin' || user.id === c.user_id) && (
              <button onClick={async ()=>{ await (await import('../api.js')).deleteComment(c.id); load(); }}>Excluir</button>
            )}
          </div>
        ))}
      </div>
      <textarea placeholder="Adicionar comentário" value={content} onChange={e=>setContent(e.target.value)} />
      <button className="btn btn-secondary" onClick={sendComment}>Enviar</button>
    </div>
  );
}
