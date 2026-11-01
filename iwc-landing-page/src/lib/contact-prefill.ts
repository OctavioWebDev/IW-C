// Lets a tool on the page drop a summary into the contact form's message box.
export const PREFILL_EVENT = 'contact-prefill';

export function prefillContact(message: string) {
  window.dispatchEvent(new CustomEvent<string>(PREFILL_EVENT, { detail: message }));
  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
}
