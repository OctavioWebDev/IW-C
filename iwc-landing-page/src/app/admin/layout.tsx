import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery Admin',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-gray-100 text-gray-900">{children}</div>;
}
