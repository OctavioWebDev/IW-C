'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// Import images
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
    }, 4000); // Change the image every 4 seconds

    return () => clearInterval(timer); // Clear the interval on component unmount
  }, []);

  return (
    <div className="image-carousel -z-50 relative w-full">
      <div className="image-item text-center px-4 py-8">
        {images.map((imageData, index) => (
          <div key={index} className={`transition-opacity duration-700 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0 absolute'}`} style={{ position: 'relative', width: '100%', height: '480px' }}>
            <Image
              src={imageData.src}
              alt={`Display Image ${index + 1}`}
              width={500}
              height={500}
              quality={75}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;


