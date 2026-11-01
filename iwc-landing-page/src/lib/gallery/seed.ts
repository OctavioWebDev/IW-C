import type { GalleryPhoto } from './types';

// The photos that ship with the site. They show until the first change is saved
// in the admin, after which the saved list (which starts from these) is used.
const files = [
  'Image-IWC6.jpeg',
  'Image-IWC5.jpeg',
  'Image-IWC4.jpg',
  'Image-IWC3.jpeg',
  'Image-IWC2-scaled.jpeg',
  'Image-IWC1.jpeg',
  'Image-IWC7.jpeg',
  'Image-IWC8.jpeg',
];

export const seedPhotos: GalleryPhoto[] = files.map((file, i) => ({
  id: `seed-${i + 1}`,
  url: `/images/${file}`,
  projectName: 'Integrity Wall and Ceiling',
  description: '',
  date: '',
  location: '',
  // Keeps the original order when sorting.
  createdAt: new Date(Date.UTC(2024, 0, 1, 0, 0, files.length - i)).toISOString(),
}));
