'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

import img1 from '/public/images/Image-IWC1.jpeg';
import img2 from '/public/images/Image-IWC2-scaled.jpeg';
import img3 from '/public/images/Image-IWC3.jpeg';
import img4 from '/public/images/Image-IWC4.jpeg';
import img5 from '/public/images/Image-IWC5.jpeg';
import img6 from '/public/images/Image-IWC6.jpeg';
import img7 from '/public/images/Image-IWC7.jpeg';
import img8 from '/public/images/Image-IWC8.jpeg';

interface ImageData {
  src: any;
}

const images: ImageData[] = [
  { src: img1 },
  { src: img2 },
  { src: img3 },
  { src: img4 },
  { src: img5 },
  { src: img6 },
  { src: img7 },
  { src: img8 },
];

const HeroCarousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 9000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="image-carousel relative w-full h-secreen overflow-hidden">
      <div className="image-item px-48 py-48">
        {images.map((imageData, index) => (
          <div key={index} className={`transition-opacity duration-9000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0 absolute'} absolute inset-0`}>
            <Image
              src={imageData.src}
              alt={`Display Image ${index + 1}`}
              layout='fill'
              objectFit='cover'
              quality={75}
            />
            <div className="overlay absolute inset-0 bg-amber-700 bg-opacity-60 flex items-center justify-center">
            <Image
                src={'/logo/INTEGRITY_LOGO_WHITE.svg'}
                alt="Integrity Wall and Ceiling Of Toledo"
                width={500}
                height={200} 
                className="max-w-full h-auto"
              />          
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;



