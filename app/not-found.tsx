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
    <main id="contenuto" className="flex min-h-screen flex-col items-center justify-center gap-7 bg-background px-6 text-center text-foreground">
      <Link href="/" className="font-serif text-3xl tracking-[0.065em]" aria-label="LZ FORTUNA — Torna alla home">
        LZ <span className="italic">FORTUNA</span>
      </Link>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/70">Errore 404</p>
      <h1 className="font-serif text-4xl italic md:text-5xl">Pagina non trovata</h1>
      <p className="max-w-md text-lg leading-8 text-foreground/80">
        L’indirizzo potrebbe essere cambiato. Torna alla home oppure scrivici su WhatsApp.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link href="/" className="inline-flex min-h-14 items-center bg-foreground px-8 text-lg font-semibold text-background hover:bg-neutral-800">
          Torna alla home
        </Link>
        <a href={site.whatsapp} target="_blank" rel="noopener noreferrer"
          className="inline-flex min-h-14 items-center border-2 border-foreground px-8 text-lg font-semibold hover:bg-black/5">
          Scrivici su WhatsApp
        </a>
      </div>
    </main>
  );
}
