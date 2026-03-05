'use client';

import { useState } from 'react';
import { useRouter, Link } from '@/i18n/routing';
import { registerUser } from '@/lib/firebase/auth';
import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/lib/constants';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { user } = useAuth();

  if (user) {
    router.push(ROUTES.HOME);
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Sequence mismatch. Passwords must be identical.');
      return;
    }
    if (password.length < 6) {
      setError('Complexity failed. Minimal 6 characters required.');
      return;
    }

    setLoading(true);
    try {
      await registerUser(email, password, displayName || undefined);
      router.push(ROUTES.HOME);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Initialization failed. Contact core.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden py-32 selection:bg-black selection:text-white text-foreground">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-radial-[circle_at_50%_0%] from-black/2 to-transparent to-50%" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-full h-px bg-black/3 -rotate-6 reveal opacity-10" />

      <div className="relative w-full max-w-sm reveal">
        {/* Header Section */}
        <div className="text-center mb-24">
          <Link href="/" className="font-serif text-5xl text-foreground tracking-mega block mb-10 group">
             LUISA <span className="opacity-10 group-hover:opacity-100 transition-opacity duration-1000">MODA</span>
          </Link>
          <div className="flex flex-col items-center gap-6">
             <div className="h-px w-16 bg-foreground/10" />
             <p className="text-foreground/20 text-sm tracking-mega uppercase font-light leading-loose italic">Initialize Series Identity / Formal Access</p>
          </div>
        </div>

        {/* Register Form */}
        <div className="bg-transparent space-y-12">
          {error && (
            <div className="text-foreground/60 border border-black/5 bg-black/2 px-6 py-4 text-sm tracking-[0.3em] uppercase leading-relaxed text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="space-y-4">
              <label className="block text-sm text-foreground/30 tracking-mega uppercase font-bold">Formal Designation</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="NAME / ALIAS"
                className="w-full bg-transparent border-b border-black/10 text-foreground placeholder-black/10 py-4 text-xs focus:outline-none focus:border-black transition-all tracking-widest"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm text-foreground/30 tracking-mega uppercase font-bold">Email Coordinate</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="USER@COORDINATE.COM"
                className="w-full bg-transparent border-b border-black/10 text-foreground placeholder-black/10 py-4 text-xs focus:outline-none focus:border-black transition-all tracking-widest"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm text-foreground/30 tracking-mega uppercase font-bold">Personal Key</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent border-b border-black/10 text-foreground placeholder-black/10 py-4 text-xs focus:outline-none focus:border-black transition-all tracking-widest"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm text-foreground/30 tracking-mega uppercase font-bold">Key Verification</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent border-b border-black/10 text-foreground placeholder-black/10 py-4 text-xs focus:outline-none focus:border-black transition-all tracking-widest"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-foreground text-background py-5 text-sm tracking-mega font-black uppercase hover:opacity-90 transition-all disabled:opacity-20 mt-8 active:scale-95"
            >
              {loading ? 'Creating Sequence...' : 'Initialize'}
            </button>
          </form>

          <div className="flex flex-col gap-10 text-center pt-8">
             <Link href="/" className="text-foreground/10 hover:text-foreground/30 text-sm tracking-mega uppercase transition-colors">
              ← Return to INDEX
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
