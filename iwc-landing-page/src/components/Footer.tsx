'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import "leaflet/dist/leaflet.css";

// Dynamically import react-leaflet components
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

export default function Footer() {
  // Define position as a tuple [latitude, longitude]
  const position: [number, number] = [41.626884, -83.610681]; // Example position for the map (London)

  return (
    <div className="bg-sky-950 text-white p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Business Info */}
        <div className='py-5 space-y-3'>
          <h2 className="font-semibold">Contact Us</h2>
          <p>
            <a href="https://maps.google.com/?q=2857+Airport+Hwy,+Toledo,+Ohio" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faMapMarkerAlt} /> 2857 Airport Hwy, Toledo, Ohio
            </a>
          </p>
          <p>
            <a href="tel:+14193811855">
              <FontAwesomeIcon icon={faPhone} /> +1(419)381-1855
            </a>
          </p>
          <p>
            <a href="mailto:contact@iwctoledo.com">
              <FontAwesomeIcon icon={faEnvelope} /> contact@iwctoledo.com
            </a>
          </p>
        </div>
        {/* Map */}
        <div className='map-container py-5'>
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
          <h2 className="font-semibold py-5">Contact</h2>
          <div className="flex space-x-4">
            <a href="tel:+14193811855" className="hover:text-gray-400"><FontAwesomeIcon icon={faPhone} /></a>
            <a href="mailto:contact@iwctoledo.com" className="hover:text-gray-400"><FontAwesomeIcon icon={faEnvelope} /></a>
            <a href="https://maps.google.com/?q=2857+Airport+Hwy,+Toledo,+Ohio" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400"><FontAwesomeIcon icon={faMapMarkerAlt} /></a>
          </div>
        </div>
      </div>
    </div>
  );
}


