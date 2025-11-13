import React from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
function colorByStatus(status) {
  if (status === 'open') return '#EF4444';
  if (status === 'in_progress') return '#F59E0B';
  if (status === 'resolved') return '#10B981';
  if (status === 'closed') return '#6B7280';
  return '#3B82F6';
}
export default function MapView({ center = [-23.55, -46.63], markers = [], onClick }) {
  return (
    <MapContainer center={center} zoom={13} style={{ height: "70vh" }} whenReady={() => {}}
      onClick={e => { if (onClick) onClick({ lat: e.latlng.lat, lng: e.latlng.lng }); }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {markers.map(m => {
        const color = colorByStatus(m.status);
        return (
          <CircleMarker key={m.id} center={[m.lat, m.lng]} radius={9} pathOptions={{ color, fillColor: color, fillOpacity: 0.6 }}>
            <Popup>
              <div>
                <div style={{fontWeight:600}}>{m.title}</div>
                <a href={`/issue/${m.id}`}>Detalhes</a>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
