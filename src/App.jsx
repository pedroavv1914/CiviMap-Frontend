import React from "react";
import { Link, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import NewIssue from "./pages/NewIssue.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import MyIssues from "./pages/MyIssues.jsx";
import IssueDetail from "./pages/IssueDetail.jsx";
function isAuth() {
  return !!localStorage.getItem("token");
}
export default function App() {
  return (
    <div className="app">
      <header className="header">
        <nav>
          <Link to="/">Mapa</Link>
          <Link to="/new-issue">Nova denúncia</Link>
          <Link to="/my-issues">Minhas denúncias</Link>
          {isAuth() ? (
            <button onClick={() => { localStorage.removeItem("token"); location.href = "/"; }}>Sair</button>
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
        </Routes>
      </main>
    </div>
  );
}
