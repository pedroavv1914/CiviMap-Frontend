import React from "react";
import { Link, useLocation } from "react-router-dom";
export default function AdminLayout({ children }) {
  const { pathname } = useLocation();
  function active(p) { return pathname.startsWith(p) ? 'active' : ''; }
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="brand">
          <img src="/logo.png" alt="CiviMap" width={28} height={28} />
          <span className="brand-name">CiviMap</span>
        </div>
        <nav>
          <Link className={active('/admin/dashboard')} to="/admin/dashboard">Dashboard</Link>
          <Link className={active('/admin/issues')} to="/admin/issues">Issues</Link>
          <Link className={active('/admin/map')} to="/admin/map">Map</Link>
          <a href="#" className="disabled">Settings</a>
        </nav>
      </aside>
      <section className="admin-content">
        {children}
      </section>
    </div>
  );
}
