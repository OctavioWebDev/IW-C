import 'server-only';
import { randomUUID } from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';
import { put, list, del } from '@vercel/blob';
import { site } from '../site';
import { seedPhotos } from './seed';
import { sortPhotos } from './sort';
import type { GalleryPhoto, PhotoDetails } from './types';

// The photo list is a small JSON file next to the photos. Each save writes a new
// file (unique name, so no stale CDN copy) and removes the older ones.
const PREFIX = `${site.id}/`;
const INDEX_PREFIX = `${PREFIX}index-`;

export const storageReady = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);
const isLocalDev = () => !storageReady() && process.env.NODE_ENV !== 'production';

// Local development without a Blob token: keep everything under public/dev-uploads.
const LOCAL_DIR = path.join(process.cwd(), 'public', 'dev-uploads', site.id);
const LOCAL_INDEX = path.join(LOCAL_DIR, 'index.json');

export class StorageNotConnected extends Error {
  constructor() {
    super('Photo storage is not connected yet.');
  }
}

async function readIndex(): Promise<GalleryPhoto[] | null> {
  if (isLocalDev()) {
    try {
      return JSON.parse(await fs.readFile(LOCAL_INDEX, 'utf8'));
    } catch {
      return null;
    }
  }
  if (!storageReady()) return null;
  const { blobs } = await list({ prefix: INDEX_PREFIX });
  const latest = blobs.sort((a, b) => +new Date(b.uploadedAt) - +new Date(a.uploadedAt))[0];
  if (!latest) return null;
  const res = await fetch(latest.url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Could not read the photo list (${res.status})`);
  return res.json();
}

async function writeIndex(photos: GalleryPhoto[]): Promise<void> {
  const body = JSON.stringify(photos, null, 2);
  if (isLocalDev()) {
    await fs.mkdir(LOCAL_DIR, { recursive: true });
    await fs.writeFile(LOCAL_INDEX, body);
    return;
  }
  if (!storageReady()) throw new StorageNotConnected();
  const saved = await put(`${INDEX_PREFIX}.json`, body, {
    access: 'public',
    addRandomSuffix: true,
    contentType: 'application/json',
    cacheControlMaxAge: 60,
  });
  const { blobs } = await list({ prefix: INDEX_PREFIX });
  const old = blobs.filter((b) => b.url !== saved.url).map((b) => b.url);
  if (old.length) await del(old);
}

/** Every photo, newest first. Falls back to the photos that ship with the site. */
export async function getPhotos(): Promise<GalleryPhoto[]> {
  return sortPhotos((await readIndex()) ?? seedPhotos);
}

export async function addPhoto(image: Uint8Array, details: PhotoDetails): Promise<GalleryPhoto> {
  const photos = (await readIndex()) ?? seedPhotos;
  const id = randomUUID();
  let url: string;
  let storagePath: string;
  if (isLocalDev()) {
    await fs.mkdir(LOCAL_DIR, { recursive: true });
    await fs.writeFile(path.join(LOCAL_DIR, `${id}.jpg`), image);
    url = `/dev-uploads/${site.id}/${id}.jpg`;
    storagePath = url;
  } else {
    if (!storageReady()) throw new StorageNotConnected();
    const blob = await put(`${PREFIX}photos/${id}.jpg`, Buffer.from(image), {
      access: 'public',
      contentType: 'image/jpeg',
    });
    url = blob.url;
    storagePath = blob.url;
  }
  const photo: GalleryPhoto = { id, url, storagePath, ...details, createdAt: new Date().toISOString() };
  await writeIndex([...photos, photo]);
  return photo;
}

export async function updatePhoto(id: string, details: PhotoDetails): Promise<void> {
  const photos = (await readIndex()) ?? seedPhotos;
  if (!photos.some((p) => p.id === id)) throw new Error('That photo no longer exists.');
  await writeIndex(photos.map((p) => (p.id === id ? { ...p, ...details } : p)));
}

export async function deletePhoto(id: string): Promise<void> {
  const photos = (await readIndex()) ?? seedPhotos;
  const photo = photos.find((p) => p.id === id);
  if (!photo) return;
  await writeIndex(photos.filter((p) => p.id !== id));
  // Photos that ship with the site (seed) live in /public and are left alone.
  if (photo.storagePath) {
    if (isLocalDev()) {
      await fs.rm(path.join(process.cwd(), 'public', photo.storagePath), { force: true });
    } else {
      await del(photo.storagePath);
    }
  }
}
