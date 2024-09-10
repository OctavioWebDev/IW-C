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

export const runtime = 'edge';

export default function Home() {
  return (
    <div>
      {/* <Header /> */}
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <MainSection />
      <Testimonials />
      <CallToActionSection />
      <ContactForm />
      <LogoSection />
      <Footer />
    </div>
  );
}

