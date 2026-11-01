'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { GalleryPhoto } from '@/lib/gallery/types';
import { LIMITS } from '@/lib/gallery/validate';
import { formatDate } from '@/lib/gallery/sort';
import { removePhoto, savePhotoDetails } from './actions';

const MAX_SIDE = 2400; // pixels on the long side after shrinking
const input = 'w-full rounded border border-gray-300 p-2';
const labelCls = 'mb-1 block text-sm font-medium';

/** Shrinks the photo and converts it to JPEG in the browser (also fixes phone rotation). */
async function toJpeg(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.85));
  if (!blob) throw new Error('convert');
  return blob;
}

function DetailFields({ photo, idPrefix }: { photo?: GalleryPhoto; idPrefix: string }) {
  return (
    <>
      <div>
        <label htmlFor={`${idPrefix}-name`} className={labelCls}>Project name *</label>
        <input id={`${idPrefix}-name`} name="projectName" required maxLength={LIMITS.projectName} defaultValue={photo?.projectName} className={input} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${idPrefix}-date`} className={labelCls}>Date</label>
          <input id={`${idPrefix}-date`} name="date" type="date" defaultValue={photo?.date} className={input} />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-location`} className={labelCls}>Location</label>
          <input id={`${idPrefix}-location`} name="location" maxLength={LIMITS.location} placeholder="e.g. Perrysburg, OH" defaultValue={photo?.location} className={input} />
        </div>
      </div>
      <div>
        <label htmlFor={`${idPrefix}-description`} className={labelCls}>Description</label>
        <textarea id={`${idPrefix}-description`} name="description" rows={3} maxLength={LIMITS.description} defaultValue={photo?.description} className={input} />
      </div>
    </>
  );
}

function AddPhotoForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ text: string; error: boolean } | null>(null);

  const onFile = (file: File | undefined) => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const file = form.get('image');
    if (!(file instanceof File) || file.size === 0) {
      setMessage({ text: 'Please choose a photo.', error: true });
      return;
    }
    setBusy(true);
    setMessage(null);
    try {
      let jpeg: Blob;
      try {
        jpeg = await toJpeg(file);
      } catch {
        setMessage({ text: "This photo type can't be read here. Please choose a JPG or PNG.", error: true });
        return;
      }
      form.set('image', jpeg, 'photo.jpg');
      const res = await fetch('/api/admin/photos', { method: 'POST', body: form });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessage({ text: data.error ?? 'Saving the photo failed. Please try again.', error: true });
        return;
      }
      formRef.current?.reset();
      onFile(undefined);
      setMessage({ text: 'Photo added to the gallery.', error: false });
      router.refresh();
    } catch {
      setMessage({ text: 'Saving the photo failed. Check your connection and try again.', error: true });
    } finally {
      setBusy(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={onSubmit} className="space-y-4 rounded-lg bg-white p-6 shadow">
      <h2 className="text-lg font-semibold">Add a photo</h2>
      <div>
        <label htmlFor="add-image" className={labelCls}>Photo *</label>
        <input id="add-image" name="image" type="file" accept="image/*" required onChange={(e) => onFile(e.target.files?.[0])} className="block w-full text-sm" />
        {preview && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="Selected photo" className="mt-3 max-h-60 rounded object-contain" />
        )}
      </div>
      <DetailFields idPrefix="add" />
      {message && (
        <p className={`text-sm ${message.error ? 'text-red-600' : 'text-green-700'}`} role={message.error ? 'alert' : 'status'}>
          {message.text}
        </p>
      )}
      <button type="submit" disabled={busy} className="rounded bg-gray-900 px-4 py-2 font-semibold text-white hover:bg-gray-700 disabled:opacity-60">
        {busy ? 'Uploading…' : 'Add to gallery'}
      </button>
    </form>
  );
}

function PhotoRow({ photo }: { photo: GalleryPhoto }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const result = await savePhotoDetails(photo.id, new FormData(e.currentTarget));
    setBusy(false);
    if ('error' in result) return setError(result.error);
    setEditing(false);
    router.refresh();
  };

  const onDelete = async () => {
    if (!window.confirm(`Delete "${photo.projectName}" from the gallery? This can't be undone.`)) return;
    setBusy(true);
    setError(null);
    const result = await removePhoto(photo.id);
    setBusy(false);
    if ('error' in result) return setError(result.error);
    router.refresh();
  };

  const meta = [formatDate(photo.date), photo.location].filter(Boolean).join(' · ');

  return (
    <li className="rounded-lg bg-white p-4 shadow">
      <div className="flex gap-4">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded bg-gray-200">
          <Image src={photo.url} alt={photo.projectName} fill sizes="96px" className="object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold">{photo.projectName}</p>
          {meta && <p className="text-sm text-gray-600">{meta}</p>}
          {photo.description && <p className="mt-1 line-clamp-2 text-sm text-gray-700">{photo.description}</p>}
          {!editing && (
            <div className="mt-2 flex gap-2">
              <button type="button" onClick={() => setEditing(true)} disabled={busy} className="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50">Edit</button>
              <button type="button" onClick={onDelete} disabled={busy} className="rounded border border-red-300 px-3 py-1 text-sm text-red-700 hover:bg-red-50">
                {busy ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          )}
        </div>
      </div>
      {editing && (
        <form onSubmit={onSave} className="mt-4 space-y-4 border-t border-gray-200 pt-4">
          <DetailFields photo={photo} idPrefix={`edit-${photo.id}`} />
          <div className="flex gap-2">
            <button type="submit" disabled={busy} className="rounded bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 disabled:opacity-60">
              {busy ? 'Saving…' : 'Save'}
            </button>
            <button type="button" onClick={() => setEditing(false)} disabled={busy} className="rounded border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">Cancel</button>
          </div>
        </form>
      )}
      {error && <p className="mt-2 text-sm text-red-600" role="alert">{error}</p>}
    </li>
  );
}

export default function AdminGallery({ photos }: { photos: GalleryPhoto[] }) {
  return (
    <div className="space-y-8">
      <AddPhotoForm />
      <section>
        <h2 className="mb-3 text-lg font-semibold">Photos in the gallery</h2>
        {photos.length === 0 ? (
          <p className="text-gray-600">No photos yet.</p>
        ) : (
          <ul className="space-y-3">
            {photos.map((photo) => (
              <PhotoRow key={photo.id} photo={photo} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
