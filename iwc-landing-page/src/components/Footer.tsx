import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
  const position = [51.505, -0.09]; // Example position for the map (London)

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
          <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '200px', width: '100%' }}>
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

