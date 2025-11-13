import React, { useEffect, useState } from "react";
import MapView from "../components/MapView.jsx";
import FilterBar from "../components/FilterBar.jsx";
import MobileHero from "../components/MobileHero.jsx";
import { getIssues } from "../api.js";
export default function Home() {
  const [issues, setIssues] = useState([]);
  const [center, setCenter] = useState([-23.55, -46.63]);
  useEffect(() => { navigator.geolocation.getCurrentPosition(p => setCenter([p.coords.latitude, p.coords.longitude])); }, []);
  async function load(params = {}) {
    const r = await getIssues(params);
    setIssues(r);
  }
  useEffect(() => { load({ sort: "date", limit: 200 }); }, []);
  function onFilters(p) {
    if (p.sort === "distance") {
      p.lat = center[0];
      p.lng = center[1];
    }
    load({ ...p, limit: 200 });
  }
  return (
    <div>
      <div className="hidden-desktop"><MobileHero /></div>
      <FilterBar onChange={onFilters} />
      <MapView center={center} markers={issues} />
    </div>
  );
}
