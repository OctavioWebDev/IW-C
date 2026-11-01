import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/requireAdmin';
import { addPhoto, StorageNotConnected } from '@/lib/gallery/store';
import { MAX_UPLOAD_BYTES, isJpeg, parseDetails } from '@/lib/gallery/validate';
import { refreshGalleryPages } from '@/lib/gallery/cached';

// Upload a new photo. The admin page shrinks the photo and converts it to JPEG
// in the browser first, so it stays well under Vercel's 4.5 MB request limit.
export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Please log in again.' }, { status: 401 });

  const form = await req.formData();
  const file = form.get('image');
  if (!(file instanceof Blob) || file.size === 0) return NextResponse.json({ error: 'Please choose a photo.' }, { status: 400 });
  if (file.size > MAX_UPLOAD_BYTES) return NextResponse.json({ error: 'That photo is too large.' }, { status: 400 });

  const bytes = new Uint8Array(await file.arrayBuffer());
  if (!isJpeg(bytes)) return NextResponse.json({ error: 'Please choose a JPG or PNG photo.' }, { status: 400 });

  const parsed = parseDetails(form);
  if ('error' in parsed) return NextResponse.json(parsed, { status: 400 });

  try {
    const photo = await addPhoto(bytes, parsed.details);
    refreshGalleryPages();
    return NextResponse.json({ photo });
  } catch (e) {
    console.error('upload photo', e);
    const error = e instanceof StorageNotConnected ? e.message : 'Saving the photo failed. Please try again.';
    return NextResponse.json({ error }, { status: 500 });
  }
}
