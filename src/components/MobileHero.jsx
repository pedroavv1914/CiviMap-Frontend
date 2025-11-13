import React from "react";
import { Link } from "react-router-dom";
export default function MobileHero() {
  return (
    <div className="mobile-hero">
      <div className="mobile-hero__brand">
        <img src="/logo.png" alt="CiviMap" width={28} height={28} />
        <span className="brand-name">CiviMap</span>
      </div>
      <h1 className="mobile-hero__title">Participe da melhoria da sua cidade.</h1>
      <Link to="/new-issue" className="btn btn-primary mobile-hero__cta">Registrar um problema</Link>
    </div>
  );
}
