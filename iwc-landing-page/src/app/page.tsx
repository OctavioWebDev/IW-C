import HeroSection from '../components/HeroSection';
import MainSection from '../components/MainSection';
import ContactForm from '../components/ContactForm';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import CallToActionSection from '../components/CallToAction';
import Link from 'next/link';
import PhotoGallery from '@/components/photo-gallery';
import { getCachedPhotos } from '@/lib/gallery/cached';
import type { GalleryPhoto } from '@/lib/gallery/types';

// Also picks up gallery changes on its own every hour (see lib/gallery/cached.ts).
export const revalidate = 3600;

// The home strip shows the newest photos, dealt across its three flipping tiles.
function groupForStrip(photos: GalleryPhoto[], tiles = 3, perTile = 3): GalleryPhoto[][] {
  const groups: GalleryPhoto[][] = Array.from({ length: tiles }, () => []);
  photos.slice(0, tiles * perTile).forEach((photo, i) => groups[i % tiles].push(photo));
  return groups.filter((g) => g.length > 0);
}

export default async function Home() {
  const photos = await getCachedPhotos();
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <MainSection />
      <Testimonials />
      <PhotoGallery photos={groupForStrip(photos)} />
      <div className="bg-sky-950 py-8 text-center">
        <Link href="/gallery" className="bg-amber-700 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded transition duration-300">
          See All Project Photos
        </Link>
      </div>
      <CallToActionSection />
      <ContactForm />
      <Footer />
    </div>
  );
}

