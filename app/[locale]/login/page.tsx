'use client';

import { useState } from 'react';
import { useRouter, Link } from '@/i18n/routing';
import { loginUser } from '@/lib/firebase/auth';
import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/lib/constants';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    setLoading(true);
    try {
      await loginUser(email, password);
      router.push(ROUTES.HOME);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Access denied. Verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden selection:bg-black selection:text-white text-foreground">
      {/* Dynamic Background (Light Mod) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(0,0,0,0.02)_0%,_transparent_50%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] h-px bg-black/3 rotate-12 reveal opacity-10" />

      <div className="relative w-full max-w-sm reveal">
        {/* Header Section */}
        <div className="text-center mb-24">
          <Link href="/" className="font-serif text-5xl text-foreground tracking-[0.5em] uppercase block mb-10 group">
            LUISA <span className="opacity-10 group-hover:opacity-100 transition-opacity duration-1000">MODA</span>
          </Link>
          <div className="flex flex-col items-center gap-6">
             <div className="h-px w-16 bg-foreground/10" />
             <p className="text-foreground/20 text-[9px] tracking-mega uppercase font-light leading-loose italic">Identity validation / Luisa Series</p>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-transparent space-y-12">
          {error && (
            <div className="text-foreground/60 border border-black/5 bg-black/2 px-6 py-4 text-[9px] tracking-[0.3em] uppercase leading-relaxed text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="space-y-4">
              <label className="block text-[9px] text-foreground/30 tracking-mega uppercase font-bold">Email Coordinate</label>
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
              <label className="block text-[9px] text-foreground/30 tracking-mega uppercase font-bold">Encrypted Key</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent border-b border-black/10 text-foreground placeholder-black/10 py-4 text-xs focus:outline-none focus:border-black transition-all tracking-widest"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-foreground text-background py-5 text-[11px] tracking-mega font-black uppercase hover:opacity-90 transition-all disabled:opacity-20 mt-8 active:scale-95"
            >
              {loading ? 'Validating...' : 'Identify'}
            </button>
          </form>

          <div className="flex flex-col gap-10 text-center pt-8">
             <Link href="/" className="text-foreground/10 hover:text-foreground/30 text-[9px] tracking-mega uppercase transition-colors">
              ← Return to Main INDEX
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
