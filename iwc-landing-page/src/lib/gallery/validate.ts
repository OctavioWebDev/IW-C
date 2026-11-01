import type { PhotoDetails } from './types';

export const LIMITS = { projectName: 80, description: 500, location: 80 };
export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024; // the browser shrinks photos well below this

const clean = (value: FormDataEntryValue | null, max: number) =>
  String(value ?? '').replace(/\s+/g, ' ').trim().slice(0, max);

/** Reads and checks the text fields of the add/edit forms. */
export function parseDetails(form: FormData): { details: PhotoDetails } | { error: string } {
  const details: PhotoDetails = {
    projectName: clean(form.get('projectName'), LIMITS.projectName),
    description: clean(form.get('description'), LIMITS.description),
    date: String(form.get('date') ?? '').trim(),
    location: clean(form.get('location'), LIMITS.location),
  };
  if (!details.projectName) return { error: 'Please enter a project name.' };
  if (details.date && !/^\d{4}-\d{2}-\d{2}$/.test(details.date)) return { error: 'Please pick a valid date.' };
  if (details.date && Number.isNaN(Date.parse(details.date))) return { error: 'Please pick a valid date.' };
  return { details };
}

/** JPEG files start with FF D8 FF; the admin page converts every upload to JPEG. */
export function isJpeg(bytes: Uint8Array): boolean {
  return bytes.length > 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
}
