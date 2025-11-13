import React from "react";
const map = {
  open: { label: "Aberto", color: "#EF4444" },
  in_review: { label: "Em análise", color: "#3B82F6" },
  in_progress: { label: "Em andamento", color: "#F59E0B" },
  resolved: { label: "Resolvido", color: "#10B981" },
  closed: { label: "Fechado", color: "#6B7280" }
};
export default function StatusBadge({ status }) {
  const s = map[status] || { label: status, color: "#6B7280" };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 10px', borderRadius: 999,
      background: s.color + '22', color: s.color, fontWeight: 600,
      fontFamily: 'Inter, system-ui, Arial'
    }}>
      <span style={{width:8,height:8,borderRadius:999,background:s.color}}></span>
      {s.label}
    </span>
  );
}
