export interface GalleryPhoto {
  id: string;
  url: string;
  /** Set for uploaded photos so they can be deleted from storage. */
  storagePath?: string;
  projectName: string;
  description: string;
  /** YYYY-MM-DD, or empty when unknown. */
  date: string;
  location: string;
  createdAt: string;
}

export type PhotoDetails = Pick<GalleryPhoto, 'projectName' | 'description' | 'date' | 'location'>;
