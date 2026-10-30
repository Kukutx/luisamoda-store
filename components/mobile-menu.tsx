'use client';

import { useEffect, useState } from 'react';

type NavItem = { href: string; label: string };

// The only interactive part of the homepage; everything else is rendered as static HTML.
export function MobileMenu({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, [open]);

  return (
    <>
      <button type="button" className="flex min-h-11 min-w-11 items-center justify-center border border-black/15 text-xl md:hidden"
        aria-controls="mobile-menu" aria-expanded={open} aria-label={open ? 'Chiudi il menu' : 'Apri il menu'}
        onClick={() => setOpen(!open)}>{open ? '×' : '☰'}</button>
      {open && (
        <nav id="mobile-menu" className="absolute inset-x-0 top-full flex flex-col gap-2 border-y border-black/5 bg-white px-6 py-5 md:hidden" aria-label="Navigazione mobile">
          {items.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="py-3 text-xl">{item.label}</a>
          ))}
        </nav>
      )}
    </>
  );
}
