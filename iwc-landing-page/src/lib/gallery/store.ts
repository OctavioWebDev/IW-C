import 'server-only';
import { list } from '@vercel/blob';
import { site } from '../site';
import { seedPhotos } from './seed';
import { sortPhotos } from './sort';
import type { GalleryPhoto } from './types';

// Photos are managed in the separate gallery admin app, which writes this site's
// folder (site.id) in the shared Blob store: photos plus a small JSON list,
// <site.id>/index-<random>.json. This site only ever reads the newest list.

/** Every photo, newest first. Falls back to the photos that ship with the site. */
export async function getPhotos(): Promise<GalleryPhoto[]> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return sortPhotos(seedPhotos);
  // Errors are thrown on purpose: during a refresh Next.js then keeps serving the
  // last good page instead of replacing it with the starting photos.
  const { blobs } = await list({ prefix: `${site.id}/index-` });
  const latest = blobs.sort((a, b) => +new Date(b.uploadedAt) - +new Date(a.uploadedAt))[0];
  if (!latest) return sortPhotos(seedPhotos);
  // Every save writes the list to a new address, so caching it by URL is safe.
  // 'no-store' would make Next.js abort the refresh of these cached pages.
  const res = await fetch(latest.url, { cache: 'force-cache' });
  if (!res.ok) throw new Error(`Could not read the photo list (${res.status})`);
  return sortPhotos(await res.json());
}
