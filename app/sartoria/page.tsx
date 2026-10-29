import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/lib/site';
import { tailoringCategories, otherTailoringServices } from '@/lib/tailoring';

export const metadata: Metadata = {
  title: 'Riparazioni sartoriali e prezzi | LZ FORTUNA',
  description:
    'Orli, riparazioni e modifiche per pantaloni, jeans, camicie, gonne, vestiti e cappotti. Consulta il listino indicativo e contattaci su WhatsApp.',
  alternates: { canonical: '/sartoria/' },
};

export default function SartoriaPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-black/10 bg-white">
        <div className="container mx-auto flex min-h-20 items-center justify-between gap-5 px-6 py-3 md:px-10">
          <Link href="/" aria-label="LZ FORTUNA — Torna alla home" className="shrink-0">
            <Image
              src="/brand/lz-wordmark.png"
              alt="LZ FORTUNA"
              width={781}
              height={98}
              priority
              className="h-auto w-[min(17rem,calc(100vw-8rem))]"
            />
          </Link>
          <Link href="/" className="shrink-0 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-foreground/75 hover:text-foreground sm:tracking-[0.24em]">
            ← HOME
          </Link>
        </div>
      </header>

      <main>
        <section className="container mx-auto border-b border-black/10 px-6 pb-14 pt-16 md:px-10 md:pb-20 md:pt-24">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-foreground/60">
            SARTORIA · SERVIZI
          </p>
          <h1 className="max-w-4xl font-serif text-[clamp(2.8rem,7vw,5.7rem)] font-light italic leading-[1.05] tracking-[0.03em]">
            Riparazioni e modifiche
          </h1>
          <p className="mt-7 max-w-2xl text-[1.1rem] leading-8 text-foreground/75">
            Orli, riparazioni e piccoli lavori di sartoria. Qui trovi un riferimento ai
            prezzi per i servizi più richiesti.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center bg-foreground px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-background hover:bg-neutral-800"
            >
              CHIEDI SU WHATSAPP ↗
            </a>
            <a
              href={`tel:${site.phone}`}
              className="inline-flex min-h-12 items-center justify-center border border-black/65 px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] hover:bg-neutral-100"
            >
              CHIAMA {site.displayPhone}
            </a>
          </div>
        </section>

        <section className="container mx-auto px-6 py-14 md:px-10 md:py-20" aria-labelledby="listino-heading">
          <div className="mb-11 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.35em] text-foreground/60">LISTINO · RIFERIMENTO</span>
              <h2 id="listino-heading" className="mt-3 font-serif text-4xl italic tracking-[0.08em] md:text-5xl">
                Prezzi indicativi
              </h2>
            </div>
            <p className="max-w-sm text-base leading-7 text-foreground/70">
              Il prezzo definitivo si conferma dopo aver valutato il capo.
            </p>
          </div>

          <div className="grid grid-cols-1 items-start gap-x-11 gap-y-12 xl:grid-cols-2">
            {tailoringCategories.map((category, index) => (
              <section key={category.id} id={category.id} className="scroll-mt-12 border-t border-black/80 pt-6" aria-labelledby={`title-${category.id}`}>
                <div className="mb-7 flex items-baseline gap-4">
                  <span className="text-xs font-semibold tracking-widest text-foreground/50">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 id={`title-${category.id}`} className="font-serif text-3xl italic md:text-4xl">
                    {category.title}
                  </h3>
                </div>
                <dl className="divide-y divide-black/10">
                  {category.items.map((item) => (
                    <div key={item.service} className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 py-[0.85rem]">
                      <dt className="min-w-0 text-[1.05rem] leading-7 text-foreground/90">
                        {item.service}
                        {item.note && <span className="mt-1 block text-sm leading-5 text-foreground/60">{item.note}</span>}
                      </dt>
                      <dd className="m-0 whitespace-nowrap pt-0.5 text-right text-[1.05rem] font-semibold tabular-nums text-foreground">
                        {item.price}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}
          </div>

          <section className="mt-14 border-t border-black/80 pt-6" aria-labelledby="altri-servizi-heading">
            <h3 id="altri-servizi-heading" className="font-serif text-3xl italic md:text-4xl">Altri lavori</h3>
            {otherTailoringServices.map((item) => (
              <div key={item.service} className="mt-6 flex flex-wrap items-baseline justify-between gap-3 border-b border-black/10 pb-5 text-[1.05rem]">
                <span>{item.service}</span>
                <strong>{item.price}</strong>
              </div>
            ))}
          </section>
          <p className="mt-10 max-w-3xl border-l-2 border-black/70 pl-5 text-[1.05rem] leading-8 text-foreground/75">
            <strong>Nota sui prezzi.</strong> Importi trascritti da un listino esistente e pubblicati
            come riferimento. Il costo può variare in base al tessuto e al lavoro necessario.
            Chiedi sempre conferma prima della riparazione.
          </p>
        </section>

        <section className="border-t border-black/10 bg-neutral-50 px-6 py-16 text-center md:py-20">
          <h2 className="font-serif text-4xl italic md:text-5xl">Hai un capo da sistemare?</h2>
          <p className="mx-auto mt-5 max-w-xl text-[1.1rem] leading-8 text-foreground/75">
            Raccontaci di cosa hai bisogno. Per informazioni e appuntamenti
            contattaci direttamente, senza moduli o ordini online.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer"
              className="inline-flex min-h-14 items-center justify-center bg-foreground px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-background hover:bg-neutral-800">
              SCRIVICI SU WHATSAPP ↗
            </a>
            <a href={`tel:${site.phone}`} className="inline-flex min-h-14 items-center justify-center border border-black/65 px-8 py-4 text-sm font-bold uppercase tracking-[0.15em]">
              CHIAMA
            </a>
          </div>
          <p className="mt-6 text-base font-medium">{site.displayPhone}</p>
        </section>
      </main>

      <footer className="border-t border-black/10 py-9">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-6 md:px-10">
          <p className="font-serif text-xl italic tracking-[0.07em]">LZ FORTUNA</p>
          <Link href="/" className="text-sm uppercase tracking-[0.18em] text-foreground/75 hover:text-foreground">
            TORNA ALLA HOME ↑
          </Link>
        </div>
      </footer>
    </div>
  );
}
