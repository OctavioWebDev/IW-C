import type { Metadata } from 'next';
import Link from 'next/link';
import GalleryGrid from '@/components/GalleryGrid';
import Footer from '@/components/Footer';
import { getCachedPhotos } from '@/lib/gallery/cached';

// Also picks up gallery changes on its own every hour (see lib/gallery/cached.ts).
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Project Gallery | Integrity Wall and Ceiling of Toledo',
  description: 'Photos of drywall, framing, ceiling and finishing work by Integrity Wall and Ceiling of Toledo.',
};

export default async function GalleryPage() {
  const photos = await getCachedPhotos();
  return (
    <div className="bg-sky-950">
      <section className="p-8">
        <div className="container mx-auto mt-6 mb-8">
          <Link href="/" className="text-sky-200 hover:text-white">&larr; Back to home</Link>
          <h1 className="tracking-tighter text-4xl font-bold text-center mt-6 mb-3 text-transparent bg-clip-text bg-gradient-to-r from-amber-50 to-sky-300">
            Project Gallery
          </h1>
          <p className="text-sky-100 text-center">Tap or point at a photo to see the project details.</p>
        </div>
      </section>
      <GalleryGrid photos={photos} />
      <div className="py-10 text-center">
        <Link href="/#contact-form" className="bg-amber-700 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded transition duration-300">
          Start Your Project
        </Link>
      </div>
      <Footer />
    </div>
  );
}
