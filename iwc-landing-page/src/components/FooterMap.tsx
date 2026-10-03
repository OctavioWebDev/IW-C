'use client';

// Leaflet touches `window` as soon as it is imported, so this file must only
// ever be loaded in the browser. Footer imports it with next/dynamic and ssr: false.
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';

export default function FooterMap({ position }: { position: [number, number] }) {
  return (
    <MapContainer center={position} zoom={13} style={{ height: '200px', width: '100%' }} scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          We are here!
        </Popup>
      </Marker>
    </MapContainer>
  );
}
