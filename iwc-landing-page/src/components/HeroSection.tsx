'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

import img1 from '/public/images/Image-IWC1.jpeg';
import img2 from '/public/images/Image-IWC2-scaled.jpeg';
import img3 from '/public/images/Image-IWC3.jpeg';
import img4 from '/public/images/Image-IWC4.jpg';
import img5 from '/public/images/Image-IWC5.jpeg';
import img6 from '/public/images/Image-IWC6.jpeg';
import img7 from '/public/images/Image-IWC7.jpeg';
import img8 from '/public/images/Image-IWC8.jpeg';

const images = [img1, img2, img3, img4, img5, img6, img7, img8];

const HeroCarousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 9000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[70vh] md:h-screen overflow-hidden">
      {images.map((src, index) => (
        <Image
          key={index}
          src={src}
          alt={`Integrity Wall and Ceiling project ${index + 1}`}
          fill
          priority={index === 0}
          sizes="100vw"
          quality={75}
          className={`object-cover transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center px-6">
        <Image
          src="/logo/f7af910b-5db7-4e3d-8a5b-8045d220b5fb.png"
          alt="Integrity Wall and Ceiling Of Toledo"
          width={500}
          height={200}
          priority
          className="max-w-full h-auto"
        />
      </div>
    </section>
  );
};

export default HeroCarousel;
