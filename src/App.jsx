import React, { useEffect, useState } from "react";
import { Link, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import NewIssue from "./pages/NewIssue.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import MyIssues from "./pages/MyIssues.jsx";
import IssueDetail from "./pages/IssueDetail.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminIssues from "./pages/admin/AdminIssues.jsx";
import AdminIssueDetail from "./pages/admin/AdminIssueDetail.jsx";
import AdminMap from "./pages/admin/AdminMap.jsx";
function isAuth() {
  return !!localStorage.getItem("token");
}
function isAdmin() {
  try {
    const t = localStorage.getItem("token");
    if (!t) return false;
    const payload = JSON.parse(atob(t.split(".")[1]));
    return payload.role === "admin" || payload.role === "staff";
  } catch { return false; }
}
export default function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function load() {
      try {
        const r = await (await import("./api.js")).me();
        setUser(r);
      } catch {}
    }
    if (isAuth()) load();
  }, []);
  return (
    <div className="app">
      <header className="header">
        <nav>
          <Link to="/">Mapa</Link>
          <Link to="/new-issue">Nova denúncia</Link>
          <Link to="/my-issues">Minhas denúncias</Link>
          {isAdmin() && <Link to="/admin/map">Mapa Admin</Link>}
          {isAuth() ? (
            <>
              <span>{user ? `Olá, ${user.name}` : ""}</span>
              <button onClick={() => { localStorage.removeItem("token"); location.href = "/"; }}>Sair</button>
            </>
          ) : (
            <>
              <Link to="/login">Entrar</Link>
              <Link to="/signup">Registrar</Link>
            </>
          )}
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/issue/:id" element={<IssueDetail />} />
          <Route path="/new-issue" element={isAuth() ? <NewIssue /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/my-issues" element={isAuth() ? <MyIssues /> : <Navigate to="/login" />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={isAdmin() ? <AdminDashboard /> : <Navigate to="/admin/login" />} />
          <Route path="/admin/issues" element={isAdmin() ? <AdminIssues /> : <Navigate to="/admin/login" />} />
          <Route path="/admin/issues/:id" element={isAdmin() ? <AdminIssueDetail /> : <Navigate to="/admin/login" />} />
          <Route path="/admin/map" element={isAdmin() ? <AdminMap /> : <Navigate to="/admin/login" />} />
        </Routes>
      </main>
    </div>
  );
}
