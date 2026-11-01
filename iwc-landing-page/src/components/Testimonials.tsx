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

const initials = (name: string) =>
  name.split(' ').slice(-2).map((part) => part[0]).join('').toUpperCase();

const StarRating = () => (
  <div className="flex mb-2">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
        setFade(true);
      }, 500);
    }, 8000); 

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-sky-950 border-t border-amber-700 p-8">
      <h2 className="text-3xl mt-10 font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-amber-50 to-sky-300">Testimonials</h2>
      <div className="flex justify-center">
        <div className={`bg-sky-900 p-6 shadow-lg max-w-md transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
          <StarRating />
          <div className="mb-4 w-24 h-24 mx-auto rounded-full bg-amber-700 flex items-center justify-center text-3xl font-bold text-amber-50" aria-hidden="true">
            {initials(testimonialsData[index].author)}
          </div>
          <p className="text-lg italic text-sky-100 mb-4">{testimonialsData[index].quote}</p>
          <p className="text-sm text-amber-50">— {testimonialsData[index].author}</p>
        </div>
      </div>
    </div>
  );
}