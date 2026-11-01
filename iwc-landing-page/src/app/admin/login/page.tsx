'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { login } from './actions';
import { site } from '@/lib/site';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="w-full rounded bg-gray-900 py-2 font-semibold text-white hover:bg-gray-700 disabled:opacity-60">
      {pending ? 'Checking…' : 'Log in'}
    </button>
  );
}

export default function LoginPage() {
  const [state, action] = useFormState(login, null);
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <form action={action} className="w-full max-w-sm space-y-4 rounded-lg bg-white p-6 shadow">
        <h1 className="text-xl font-bold">{site.name}</h1>
        <p className="text-sm text-gray-600">Log in to manage the photo gallery.</p>
        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium">Password</label>
          <input id="password" name="password" type="password" autoComplete="current-password" required className="w-full rounded border border-gray-300 p-2" />
        </div>
        {state?.error && <p className="text-sm text-red-600" role="alert">{state.error}</p>}
        <SubmitButton />
      </form>
    </main>
  );
}
