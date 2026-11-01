/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Gallery photos uploaded through the gallery admin app
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
      // The admin saves this site's starting photos by their full address
      { protocol: 'https', hostname: 'www.iwctoledo.com' },
    ],
  },
};

export default nextConfig;
