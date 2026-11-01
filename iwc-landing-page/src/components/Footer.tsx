'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

// Leaflet needs `window`, so the whole map loads only in the browser
const FooterMap = dynamic(() => import('./FooterMap'), { ssr: false });

export default function Footer() {
  // 2857 Airport Hwy, Toledo, OH 43609
  const position: [number, number] = [41.62787, -83.61036];

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
          <div>
            <h3 className="font-bold mb-2">Hours of Operation</h3>
            <p>Mon - Fri: 9:00am - 5:00pm</p>
            <p>Sat & Sun: Closed</p>
          </div>
          <p>
            <a href="mailto:icm@iwctoledo.com">
              <FontAwesomeIcon icon={faEnvelope} /> icm@iwctoledo.com
            </a>
          </p>
        </div>
        {/* Map */}
        <div className='map-container py-5'>
          <FooterMap position={position} />
        </div>

        {/* Social Icons */}
        <div>
          <h2 className="font-semibold py-5">Contact</h2>
          <div className="flex space-x-4">
            <a href="tel:+14193811855" className="hover:text-gray-400"><FontAwesomeIcon icon={faPhone} /></a>
            <a href="mailto:icm@iwctoledo.com" className="hover:text-gray-400"><FontAwesomeIcon icon={faEnvelope} /></a>
            <a href="https://maps.google.com/?q=2857+Airport+Hwy,+Toledo,+Ohio" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400"><FontAwesomeIcon icon={faMapMarkerAlt} /></a>
          </div>
        </div>
      </div>
    </div>
  );
}


