import type { Metadata } from 'next';
import { SubpageHeader, SubpageFooter } from '@/components/subpage-chrome';
import { merchandiseCategories } from '@/lib/merchandise';
import { site, whatsappWith } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Prodotti per la casa e la famiglia | LZ FORTUNA',
  description:
    'Abbigliamento, casalinghi, cucina, mobili, cartoleria, cosmetici, giocattoli e tanti altri articoli per la vita quotidiana. Scopri cosa puoi trovare da LZ FORTUNA.',
  alternates: { canonical: '/prodotti/' },
};

export default function ProdottiPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SubpageHeader />

      <main id="contenuto">
        <section className="container mx-auto border-b border-black/10 px-6 py-16 md:px-10 md:py-24">
          <span className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground/75">IL NOSTRO EMPORIO</span>
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
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground/75">COSA PUOI TROVARE</p>
            <h2 id="categorie-heading" className="mt-3 font-serif text-4xl italic md:text-5xl">
              Le nostre categorie
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-foreground/80">
              Qui trovi una panoramica dei prodotti. L’assortimento cambia nel tempo:
              per un articolo specifico, chiedici informazioni.
            </p>
          </div>
          <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {site.stores.map((store) => (
              <div key={store.id} className="border-t-2 border-black/80 pt-4">
                <p className="text-xl font-semibold">{store.name} · {store.city}</p>
                <p className="mt-2 text-lg leading-8 text-foreground/80">
                  {store.mainContact
                    ? 'Negozio piccolo: soprattutto abbigliamento, con accessori e piccoli articoli.'
                    : 'Negozio grande: quasi tutte le categorie qui sotto, con più scelta.'}
                </p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {merchandiseCategories.map((category, index) => (
              <article key={category.title} className="min-h-52 border border-black/15 bg-white px-6 pb-8 pt-6">
                <span className="text-sm font-semibold tracking-widest text-foreground/70">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-7 font-serif text-[1.6rem] leading-8 italic">{category.title}</h3>
                <p className="mt-3 text-lg leading-7 text-foreground/75">{category.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-black/10 bg-neutral-50 px-6 py-16 text-center md:py-20">
          <h2 className="font-serif text-4xl italic md:text-5xl">Cerchi qualcosa in particolare?</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-foreground/75">
            Chiamaci o mandaci un messaggio. Ti aiutiamo a capire se l’articolo
            che cerchi è disponibile in negozio, senza ordini online.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a href={whatsappWith('Buongiorno, vorrei sapere se avete disponibile: ')} target="_blank" rel="noopener noreferrer"
              className="inline-flex min-h-14 items-center justify-center bg-foreground px-8 py-4 text-lg font-semibold text-background hover:bg-neutral-800">
              Chiedi se è disponibile
            </a>
            <a href={`tel:${site.phone}`}
              className="inline-flex min-h-14 items-center justify-center border-2 border-foreground px-8 py-4 text-lg font-semibold">
              Chiama
            </a>
          </div>
          <p className="mt-6 text-base font-medium">{site.displayPhone}</p>
        </section>
      </main>

      <SubpageFooter />
    </div>
  );
}
