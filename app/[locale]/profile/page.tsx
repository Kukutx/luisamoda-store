'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/user/Header';
import { useAuth } from '@/context/AuthContext';
import { updateUser } from '@/lib/firebase/firestore';
import { logoutUser } from '@/lib/firebase/auth';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { useAsyncData } from '@/hooks/useAsyncData';
import { ROUTES } from '@/lib/constants';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function ProfilePage() {
  const { user, userData, loading: authLoading } = useRequireAuth();
  const [displayName, setDisplayName] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (userData) setDisplayName(userData.displayName || '');
  }, [userData]);

  const { execute: handleSave, loading: saving } = useAsyncData(async () => {
    if (!user) return;
    await updateUser(user.uid, { displayName });
    setMsg('SUCCESSFUL');
    setTimeout(() => setMsg(''), 3000);
  });

  const handleSignOut = async () => {
    await logoutUser();
    window.location.href = ROUTES.HOME;
  };

  if (authLoading || !user) return <LoadingSpinner fullPage />;

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-black selection:text-white">
      <Header />
      <main className="container mx-auto px-8 md:px-12 pt-40 pb-32 max-w-4xl">
        <div className="flex flex-col gap-6 mb-24 animate-reveal">
           <span className="text-foreground/20 text-sm tracking-mega uppercase font-medium">Step 04 / Identity</span>
           <h1 className="font-serif text-6xl md:text-8xl tracking-widest uppercase italic leading-none">Profile</h1>
        </div>

        <div className="animate-reveal bg-neutral-50/30 border border-black/3 p-12 md:p-20 space-y-20 shadow-premium" style={{ animationDelay: '0.2s' }}>
          <div className="flex justify-between items-baseline border-b border-black/10 pb-8">
            <h2 className="text-sm text-foreground/40 tracking-mega uppercase font-bold">Personal Archive</h2>
            {msg && (
              <span className="text-sm tracking-mega uppercase font-black text-black">
                / {msg}
              </span>
            )}
          </div>

          <div className="space-y-12">
            <div className="space-y-4">
              <label className="block text-sm text-foreground/20 tracking-mega uppercase font-bold">Registration Coordinate</label>
              <div className="w-full bg-transparent border-b border-black/5 text-foreground/30 py-4 text-xs tracking-widest font-mono uppercase cursor-not-allowed">
                {user.email || 'UNSIGNED'}
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm text-foreground/20 tracking-mega uppercase font-bold">Formal Designation</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full bg-transparent border-b border-black/10 text-foreground py-4 text-xs focus:outline-none focus:border-black transition-all tracking-widest font-bold uppercase placeholder:text-gray-200"
                placeholder="ENTER YOUR NAME"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm text-foreground/20 tracking-mega uppercase font-bold">Identity Clearance</label>
              <div className="w-full bg-transparent border-b border-black/5 text-foreground/30 py-4 text-xs tracking-widest font-bold uppercase cursor-not-allowed">
                {userData?.role === 'admin' ? 'ADMINISTRATOR' : 'MEMBER'}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 pt-12">
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-foreground text-background px-12 py-5 text-sm tracking-mega font-black uppercase hover:bg-neutral-800 transition-all disabled:opacity-20 active:scale-95 shadow-premium"
              >
                {saving ? 'UPDATING...' : 'Save Sequence'}
              </button>
              <button
                onClick={handleSignOut}
                className="border border-black/10 text-foreground/40 px-12 py-5 text-sm tracking-mega uppercase font-bold hover:text-foreground hover:border-black transition-all"
              >
                Sign Out / Exit
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


