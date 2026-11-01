import { unstable_cache, revalidatePath, revalidateTag } from 'next/cache';
import { getPhotos } from './store';

/** Cached photo list for the public pages; refreshed whenever the admin saves a change. */
export const getCachedPhotos = unstable_cache(getPhotos, ['gallery-photos'], { tags: ['gallery'] });

export function refreshGalleryPages() {
  revalidateTag('gallery');
  revalidatePath('/');
  revalidatePath('/gallery');
}
