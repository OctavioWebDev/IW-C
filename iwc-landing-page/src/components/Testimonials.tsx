'use client'
import React, { useState, useEffect } from 'react';

const testimonialsData = [
  {
    quote: "Scotty B's LEDs transformed our event space with incredible custom lighting. Their attention to detail and creative designs made all the difference.",
    author: "Alex Johnson"
  },
  {
    quote: "We ordered a custom sign for our cafe, and the result was stunning. Scotty B's LEDs not only delivered high-quality work but also excellent customer service.",
    author: "Samantha Bloom"
  },
  {
    quote: "The digital signs from Scotty B's LEDs have been game-changers for our retail business. The quality is unmatched, and they really know how to make a business shine.",
    author: "Michael Reyes"
  }
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
    }, 3000); // Change the testimonial every 3 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gray-800 text-white p-8">
      <h1 className="text-xl font-bold text-center mb-4">Testimonials</h1>
      <div className="text-center">
        <p className="text-lg italic">{testimonialsData[index].quote}</p>
        <p className="text-sm mt-2">— {testimonialsData[index].author}</p>
      </div>
    </div>
  );
}

