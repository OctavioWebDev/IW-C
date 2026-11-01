'use server';

import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { SESSION_COOKIE, SESSION_TTL_MS, checkPassword, sessionCookieOptions, signSession } from '@/lib/adminSession';
import { isLockedOut, recordFailure } from '@/lib/loginThrottle';

export async function login(_prev: { error: string } | null, formData: FormData): Promise<{ error: string } | null> {
  const expected = process.env.ADMIN_PASSWORD ?? '';
  const secret = process.env.ADMIN_SESSION_SECRET ?? '';
  if (!expected || !secret) return { error: 'The admin login is not set up yet.' };

  const ip = (headers().get('x-forwarded-for') ?? 'local').split(',')[0].trim();
  if (isLockedOut(ip)) return { error: 'Too many attempts. Try again in 15 minutes.' };

  if (!(await checkPassword(String(formData.get('password') ?? ''), expected))) {
    recordFailure(ip);
    await new Promise((r) => setTimeout(r, 1000));
    return { error: 'Wrong password.' };
  }

  cookies().set(SESSION_COOKIE, await signSession(Date.now() + SESSION_TTL_MS, secret), sessionCookieOptions());
  redirect('/admin');
}

export async function logout() {
  cookies().delete(SESSION_COOKIE);
  redirect('/admin/login');
}
