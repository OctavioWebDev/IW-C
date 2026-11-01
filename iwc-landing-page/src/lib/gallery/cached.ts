import { unstable_cache, revalidatePath, revalidateTag } from 'next/cache';
import { getPhotos } from './store';

// The photo list is cached; the gallery admin app asks for a refresh after every
// change (see app/api/revalidate), and the cache also expires every hour.
export const REFRESH_SECONDS = 3600;

export const getCachedPhotos = unstable_cache(getPhotos, ['gallery-photos'], {
  tags: ['gallery'],
  revalidate: REFRESH_SECONDS,
});

export function refreshGalleryPages() {
  revalidateTag('gallery');
  revalidatePath('/');
  revalidatePath('/gallery');
}
