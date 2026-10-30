import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Pagina non trovata | LZ FORTUNA',
  robots: { index: false, follow: true },
};

// Italian 404 with the same monochrome style; Firebase Hosting serves out/404.html.
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-7 bg-background px-6 text-center text-foreground">
      <Link href="/" className="font-serif text-3xl tracking-[0.065em]" aria-label="LZ FORTUNA — Torna alla home">
        LZ <span className="italic">FORTUNA</span>
      </Link>
      <p className="text-xs uppercase tracking-[0.4em] text-foreground/50">Errore 404</p>
      <h1 className="font-serif text-4xl italic md:text-5xl">Pagina non trovata</h1>
      <p className="max-w-md text-base leading-7 text-foreground/70">
        L’indirizzo potrebbe essere cambiato. Torna alla home oppure scrivici su WhatsApp.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link href="/" className="inline-flex min-h-12 items-center bg-foreground px-8 text-sm font-bold uppercase tracking-[0.2em] text-background hover:opacity-80">
          Torna alla home
        </Link>
        <a href={site.whatsapp} target="_blank" rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center border border-foreground px-8 text-sm font-bold uppercase tracking-[0.2em] hover:bg-black/5">
          WhatsApp ↗
        </a>
      </div>
    </main>
  );
}
