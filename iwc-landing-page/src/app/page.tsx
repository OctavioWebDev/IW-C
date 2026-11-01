import HeroSection from '../components/HeroSection';
import MainSection from '../components/MainSection';
import ContactForm from '../components/ContactForm';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import CallToActionSection from '../components/CallToAction';
import PhotoGallery from '@/components/photo-gallery';

interface Photo {
  id: string
  url: string
  description: string
}

const photoData: Photo[][] = [
  [
    {
      id: '1',
      url: '/images/Image-IWC6.jpeg',
      description: 'Integrity Wall and Ceiling',
    },
    {
      id: '2',
      url: '/images/Image-IWC5.jpeg',
      description: 'Integrity Wall and Ceiling',
    },
  ],
  [
    {
      id: '3',
      url: '/images/Image-IWC4.jpg',
      description: 'Integrity Wall and Ceiling',
    },
    {
      id: '4',
      url: '/images/Image-IWC3.jpeg',
      description: 'Integrity Wall and Ceiling',
    },
  ],
  [
    {
      id: '5',
      url: '/images/Image-IWC2-scaled.jpeg',
      description: 'Integrity Wall and Ceiling',
    },
    {
      id: '6',
      url: '/images/Image-IWC1.jpeg',
      description: 'Integrity Wall and Ceiling',
    },
    {
      id: '7',
      url: '/images/Image-IWC7.jpeg',
      description: 'Integrity Wall and Ceiling',
    },
    {
      id: '8',
      url: '/images/Image-IWC8.jpeg',
      description: 'Integrity Wall and Ceiling',
    },
  ],
]

export default function Home() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <MainSection />
      <Testimonials />
      <PhotoGallery photos={photoData} />
      <CallToActionSection />
      <ContactForm />
      <Footer />
    </div>
  );
}

