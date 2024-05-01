'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

// Dynamically import react-leaflet components
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

export default function Footer() {
  // Define position as a tuple [latitude, longitude]
  const position: [number, number] = [51.505, -0.09]; // Example position for the map (London)

  return (
    <div className="bg-gray-800 text-white p-4">
      <h1 className="text-lg font-bold">Footer</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Business Info */}
        <div>
          <h2 className="font-semibold">Contact Us</h2>
          <p><FontAwesomeIcon icon={faMapMarkerAlt} /> 123 Business St, City</p>
          <p><FontAwesomeIcon icon={faPhone} /> +123 456 7890</p>
          <p><FontAwesomeIcon icon={faEnvelope} /> contact@example.com</p>
        </div>

        {/* Map */}
        <div>
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
        </div>

        {/* Social Icons */}
        <div>
          <h2 className="font-semibold">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="#"><FontAwesomeIcon icon={faPhone} className="hover:text-gray-400" /></a>
            <a href="#"><FontAwesomeIcon icon={faEnvelope} className="hover:text-gray-400" /></a>
            <a href="#"><FontAwesomeIcon icon={faMapMarkerAlt} className="hover:text-gray-400" /></a>
          </div>
        </div>
      </div>
    </div>
  );
}


