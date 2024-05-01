'use client';

import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import MainSection from '../components/MainSection';
import ContactForm from '../components/ContactForm';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

export const runtime = 'edge';

export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      <MainSection />
      <Testimonials />
      <ContactForm />
      <Footer />
    </div>
  );
}

