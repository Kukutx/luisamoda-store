import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { merchandiseCategories } from '@/lib/merchandise';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Prodotti per la casa e la famiglia | LZ FORTUNA',
  description:
    'Abbigliamento, casalinghi, cucina, mobili, cartoleria, cosmetici, giocattoli e tanti altri articoli per la vita quotidiana. Scopri cosa puoi trovare da LZ FORTUNA.',
  alternates: { canonical: '/prodotti/' },
};

export default function ProdottiPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-black/10 bg-white">
        <div className="container mx-auto flex min-h-20 items-center justify-between gap-4 px-6 py-3 md:px-10">
          <Link href="/" aria-label="LZ FORTUNA — Torna alla home" className="shrink-0">
            <Image src="/brand/lz-wordmark.png" alt="LZ FORTUNA" width={781} height={98}
              priority className="h-auto w-[min(17rem,calc(100vw-8rem))]" />
          </Link>
          <Link href="/" className="shrink-0 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-foreground/75 hover:text-foreground">
            ← HOME
          </Link>
        </div>
      </header>

      <main>
        <section className="container mx-auto border-b border-black/10 px-6 py-16 md:px-10 md:py-24">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/65">IL NOSTRO EMPORIO</span>
          <h1 className="mt-5 max-w-4xl font-serif text-[clamp(3rem,7vw,5.8rem)] italic font-light leading-[1.08]">
            Tutto per la vita di ogni giorno.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-foreground/80">
            Dall’abbigliamento agli articoli per la casa, dalla scuola alla cucina:
            un assortimento di prodotti utili, accessori e piccole scoperte per tutta la famiglia.
          </p>
        </section>

        <section className="container mx-auto px-6 py-14 md:px-10 md:py-20" aria-labelledby="categorie-heading">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-foreground/60">COSA PUOI TROVARE</p>
            <h2 id="categorie-heading" className="mt-3 font-serif text-4xl italic md:text-5xl">
              Le nostre categorie
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-foreground/75">
              Qui trovi una panoramica dei prodotti. L’assortimento cambia nel tempo:
              per un articolo specifico, chiedici informazioni.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {merchandiseCategories.map((category, index) => (
              <article key={category.title} className="min-h-52 border border-black/15 bg-white px-6 pb-8 pt-6">
                <span className="text-xs font-bold tracking-[0.3em] text-foreground/50">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-7 font-serif text-[1.6rem] leading-8 italic">{category.title}</h3>
                <p className="mt-3 text-[1.05rem] leading-7 text-foreground/75">{category.description}</p>
              </article>
            ))}
          </div>
          <p className="mt-7 text-sm leading-7 text-foreground/65">
            Le categorie sono indicative e non costituiscono un catalogo con disponibilità in tempo reale.
          </p>
        </section>

        <section className="border-t border-black/10 bg-neutral-50 px-6 py-16 text-center md:py-20">
          <h2 className="font-serif text-4xl italic md:text-5xl">Cerchi qualcosa in particolare?</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-foreground/75">
            Chiamaci o mandaci un messaggio. Ti aiutiamo a capire se l’articolo
            che cerchi è disponibile in negozio, senza ordini online.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer"
              className="inline-flex min-h-14 items-center justify-center bg-foreground px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-background hover:bg-neutral-800">
              SCRIVICI SU WHATSAPP ↗
            </a>
            <a href={`tel:${site.phone}`}
              className="inline-flex min-h-14 items-center justify-center border border-black/70 px-8 py-4 text-sm font-bold uppercase tracking-[0.15em]">
              CHIAMA
            </a>
          </div>
          <p className="mt-6 text-base font-medium">{site.displayPhone}</p>
        </section>
      </main>

      <footer className="border-t border-black/10 px-6 py-9">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 md:px-10">
          <span className="font-serif text-xl italic tracking-[0.07em]">LZ FORTUNA</span>
          <Link href="/" className="text-sm uppercase tracking-[0.18em] text-foreground/70">TORNA ALLA HOME ↑</Link>
        </div>
      </footer>
    </div>
  );
}
