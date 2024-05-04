'use client'
import React, { useState, useEffect } from 'react';

const testimonialsData = [
  {
    quote: "Simply Fantastic job contractor...a great and honest people of God.",
    author: "Rev Paul Aduba"
  },
  {
    quote: "True to the name. Integrity is their game. Quality projects at fair prices.",
    author: "Saaid Saadeh"
  },
  {
    quote: "Great work, done with honesty and integrity.",
    author: "David Bayly"
  }
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
    }, 8000); // Change the testimonial every 3 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-sky-950 border-t border-amber-700 p-8">
      <h1 className="text-3xl mt-10 font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-50 to-sky-300">Testimonials</h1>
      <div className="text-center mt-5 mb-10">
        <p className="text-lg italic">{testimonialsData[index].quote}</p>
        <p className="text-sm mt-2">— {testimonialsData[index].author}</p>
      </div>
    </div>
  );
}

