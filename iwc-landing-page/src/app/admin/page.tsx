import Link from 'next/link';
import { requireAdmin } from '@/lib/requireAdmin';
import { getPhotos, storageReady } from '@/lib/gallery/store';
import { site } from '@/lib/site';
import { logout } from './login/actions';
import AdminGallery from './AdminGallery';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  await requireAdmin();
  const photos = await getPhotos();
  const connected = storageReady() || process.env.NODE_ENV !== 'production';

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{site.name} Gallery</h1>
          <p className="text-sm text-gray-600">
            {photos.length} photo{photos.length === 1 ? '' : 's'} ·{' '}
            <Link href="/gallery" className="underline" target="_blank">View the gallery</Link>
          </p>
        </div>
        <form action={logout}>
          <button type="submit" className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm hover:bg-gray-50">Log out</button>
        </form>
      </header>

      {!connected && (
        <p className="mb-6 rounded border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900" role="alert">
          Photo storage isn&apos;t connected yet, so changes can&apos;t be saved. Ask your web developer to connect Vercel Blob.
        </p>
      )}

      <AdminGallery photos={photos} />
    </main>
  );
}
