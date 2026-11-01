'use server';

import { requireAdmin } from '@/lib/requireAdmin';
import { deletePhoto, updatePhoto, StorageNotConnected } from '@/lib/gallery/store';
import { parseDetails } from '@/lib/gallery/validate';
import { refreshGalleryPages } from '@/lib/gallery/cached';

type Result = { error: string } | { ok: true };

const failure = (e: unknown): Result => ({
  error: e instanceof StorageNotConnected ? e.message : 'Something went wrong. Please try again.',
});

export async function savePhotoDetails(id: string, formData: FormData): Promise<Result> {
  await requireAdmin();
  const parsed = parseDetails(formData);
  if ('error' in parsed) return parsed;
  try {
    await updatePhoto(id, parsed.details);
  } catch (e) {
    console.error('savePhotoDetails', e);
    return failure(e);
  }
  refreshGalleryPages();
  return { ok: true };
}

export async function removePhoto(id: string): Promise<Result> {
  await requireAdmin();
  try {
    await deletePhoto(id);
  } catch (e) {
    console.error('removePhoto', e);
    return failure(e);
  }
  refreshGalleryPages();
  return { ok: true };
}
