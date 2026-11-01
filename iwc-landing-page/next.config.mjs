/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Gallery photos uploaded through /admin are stored in Vercel Blob.
    remotePatterns: [{ protocol: 'https', hostname: '*.public.blob.vercel-storage.com' }],
  },
};

export default nextConfig;
