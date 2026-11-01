import { timingSafeEqual } from 'crypto';
import { NextResponse } from 'next/server';
import { refreshGalleryPages } from '@/lib/gallery/cached';

// Called by the gallery admin app after a photo is added, edited or deleted.
// It can only rebuild the gallery pages, and only with the shared secret.
export async function POST(req: Request) {
  const secret = process.env.GALLERY_REVALIDATE_SECRET;
  if (!secret) return NextResponse.json({ error: 'Not set up' }, { status: 503 });

  const given = Buffer.from(req.headers.get('authorization') ?? '');
  const expected = Buffer.from(`Bearer ${secret}`);
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  refreshGalleryPages();
  return NextResponse.json({ revalidated: true });
}
