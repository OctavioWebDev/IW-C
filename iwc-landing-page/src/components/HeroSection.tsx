import { FC } from 'react';
import HeroCarousel from './ui/HeroCarousel'; // Corrected import path

const HeroSection: FC = () => {
  const images = [
    '/images/slide1.jpg',
    '/images/slide2.jpg',
    '/images/slide3.jpg'
  ]; // Example image paths

  return (
    <div>
      <HeroCarousel images={images} />
    </div>
  );
};

export default HeroSection;


