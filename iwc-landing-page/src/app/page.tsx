'use client';

// import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import MainSection from '../components/MainSection';
import ContactForm from '../components/ContactForm';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import CallToActionSection from '../components/CallToAction';
import LogoSection from '@/components/LogoSection';
import  PhotoGallery from '@/components/photo-gallery';

export const runtime = 'edge';

interface Photo {
  id: string
  url: string
  description: string
  date: Date
}

const photoData: Photo[][] = [
  [
    {
      id: '1',
      url: '/images/Image-IWC6.jpeg',
      description: 'Ingrity Wall and Ceiling',
      date: new Date('2023-05-01'),
    },
    {
      id: '2',
      url: '/images/Image-IWC5.jpeg',
      description: 'Ingrity Wall and Ceiling',
      date: new Date('2023-05-15'),
    },
  ],
  [
    {
      id: '3',
      url: '/images/Image-IWC4.jpeg',
      description: 'Ingrity Wall and Ceiling',
      date: new Date('2023-06-01'),
    },
    {
      id: '4',
      url: '/images/Image-IWC3.jpeg',
      description: 'Ingrity Wall and Ceiling',
      date: new Date('2023-06-15'),
    },
  ],
  [
    {
      id: '5',
      url: '/images/Image-IWC2-scaled.jpeg',
      description: 'Ingrity Wall and Ceiling',
      date: new Date('2023-07-01'),
    },
    {
      id: '6',
      url: '/images/Image-IWC1.jpeg',
      description: 'Ingrity Wall and Ceiling',
      date: new Date('2023-07-15'),
    },
    {
      id: '7',
      url: '/images/Image-IWC7.jpeg',
      description: 'Ingrity Wall and Ceiling',
      date: new Date('2023-07-15'),
    },
    {
      id: '8',
      url: '/images/Image-IWC8.jpeg',
      description: 'Ingrity Wall and Ceiling',
      date: new Date('2023-07-15'),
    },
  ],
]

export default function Home() {
  return (
    <div>
      {/* <Header /> */}
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PhotoGallery photos={photoData} />
      <MainSection />
      <Testimonials />
      <CallToActionSection />
      <ContactForm />
      <LogoSection />
      <Footer />
    </div>
  );
}

