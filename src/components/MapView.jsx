import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
const icon = L.icon({ iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png", iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png", shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png", iconSize: [25,41], iconAnchor: [12,41] });
export default function MapView({ center = [-23.55, -46.63], markers = [], onClick }) {
  return (
    <MapContainer center={center} zoom={13} style={{ height: "70vh" }} whenReady={() => {}}
      onclick={e => { if (onClick) onClick({ lat: e.latlng.lat, lng: e.latlng.lng }); }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {markers.map(m => (
        <Marker key={m.id} position={[m.lat, m.lng]} icon={icon}>
          <Popup>
            <div>
              <div>{m.title}</div>
              <a href={`/issue/${m.id}`}>Detalhes</a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
