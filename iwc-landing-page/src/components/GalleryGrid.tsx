'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import type { GalleryPhoto } from '@/lib/gallery/types';
import { formatDate } from '@/lib/gallery/sort';

// Same flip as the home page tiles, but each tile flips when you point at it or tap it.
function FlipTile({ photo, priority }: { photo: GalleryPhoto; priority: boolean }) {
  const [flipped, setFlipped] = useState(false);
  // A tap also fires hover events, so hover only counts for a real mouse.
  const pointer = useRef<string>('');
  const meta = [formatDate(photo.date), photo.location].filter(Boolean).join(' · ');

  return (
    <button
      type="button"
      onPointerDown={(e) => (pointer.current = e.pointerType)}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setFlipped(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setFlipped(false)}
      onClick={() => {
        // Mouse users already flipped it by pointing; taps and the keyboard toggle it.
        if (pointer.current !== 'mouse') setFlipped((f) => !f);
        pointer.current = '';
      }}
      aria-pressed={flipped}
      aria-label={`${photo.projectName}. Show details`}
      className={`group relative block w-full pb-[100%] bg-amber-700 [perspective:1200px] focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-500 ${flipped ? 'flipped' : ''}`}
    >
      <div className="absolute inset-0 transition-transform duration-700 transform-style-preserve-3d">
        <div className="absolute inset-0 backface-hidden">
          <Image
            src={photo.url}
            alt={photo.description || photo.projectName}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-sky-900 flex flex-col justify-center gap-2 p-6 text-left text-white">
          <p className="text-xl font-semibold text-amber-50">{photo.projectName}</p>
          {meta && <p className="text-sm text-sky-200">{meta}</p>}
          {photo.description && <p className="text-sky-100">{photo.description}</p>}
        </div>
      </div>
    </button>
  );
}

export default function GalleryGrid({ photos }: { photos: GalleryPhoto[] }) {
  return (
    <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3">
      {photos.map((photo, i) => (
        <FlipTile key={photo.id} photo={photo} priority={i < 3} />
      ))}
    </div>
  );
}
