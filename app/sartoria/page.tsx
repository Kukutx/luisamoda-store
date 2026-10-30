import type { Metadata } from 'next';
import { SubpageHeader, SubpageFooter } from '@/components/subpage-chrome';
import { site, fullAddress, hoursLine, whatsappWith } from '@/lib/site';
import { tailoringCategories, otherTailoringServices } from '@/lib/tailoring';

export const metadata: Metadata = {
  title: 'Riparazioni sartoriali e prezzi | LZ FORTUNA',
  description:
    'Orli, riparazioni e modifiche per pantaloni, jeans, camicie, gonne, vestiti e cappotti. Consulta il listino indicativo e contattaci su WhatsApp.',
  alternates: { canonical: '/sartoria/' },
};

const steps = [
  { title: 'Portaci il capo', detail: 'Passa in negozio, oppure mandaci prima una foto su WhatsApp e raccontaci cosa vuoi sistemare.' },
  { title: 'Ti diciamo prezzo e tempi', detail: 'Guardiamo il capo insieme e ti confermiamo il prezzo prima di iniziare il lavoro.' },
  { title: 'Ritiri il capo sistemato', detail: 'Ti avvisiamo quando è pronto: passi in negozio e lo ritiri.' },
];

export default function SartoriaPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SubpageHeader />

      <main id="contenuto">
        <section className="container mx-auto border-b border-black/10 px-6 pb-14 pt-16 md:px-10 md:pb-20 md:pt-24">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.14em] text-foreground/75">
            Sartoria
          </p>
          <h1 className="max-w-4xl font-serif text-[clamp(2.8rem,7vw,5.7rem)] font-light italic leading-[1.05] tracking-[0.03em]">
            Riparazioni e modifiche
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-foreground/75">
            Orli, riparazioni e piccoli lavori di sartoria. Qui trovi un riferimento ai
            prezzi per i servizi più richiesti.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={whatsappWith('Buongiorno, vorrei sapere il prezzo per sistemare questo capo: ')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-14 items-center justify-center bg-foreground px-6 py-3 text-lg font-semibold text-background hover:bg-neutral-800"
            >
              Chiedi un prezzo su WhatsApp
            </a>
            <a
              href={`tel:${site.phone}`}
              className="inline-flex min-h-14 items-center justify-center border-2 border-foreground px-6 py-3 text-lg font-semibold hover:bg-neutral-100"
            >
              Chiama {site.displayPhone}
            </a>
          </div>
        </section>

        <section className="border-b border-black/10 bg-neutral-50 px-6 py-14 md:py-20" aria-labelledby="come-heading">
          <div className="container mx-auto md:px-4">
            <h2 id="come-heading" className="font-serif text-4xl italic md:text-5xl">Come funziona</h2>
            <ol className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {steps.map((step, index) => (
                <li key={step.title} className="border border-black/15 bg-white p-6">
                  <span className="font-serif text-4xl">{index + 1}</span>
                  <h3 className="mt-3 font-serif text-2xl">{step.title}</h3>
                  <p className="mt-2 text-lg leading-8 text-foreground/80">{step.detail}</p>
                </li>
              ))}
            </ol>
            <h2 className="mt-14 font-serif text-3xl italic md:text-4xl">In quale negozio?</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              {site.stores.map((store) => (
                <div key={store.id} className="border-t-2 border-black/80 pt-4">
                  <p className="text-xl font-semibold">{store.name} · {store.city}</p>
                  <p className="mt-2 text-lg leading-8 text-foreground/80">
                    {store.mainContact
                      ? 'Orli e piccole riparazioni, da lasciare e ritirare in negozio.'
                      : 'Il laboratorio di sartoria: riparazioni e modifiche anche più impegnative.'}
                  </p>
                  <p className="mt-2 text-base leading-7 text-foreground/75">{fullAddress(store) || store.city}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 py-14 md:px-10 md:py-20" aria-labelledby="listino-heading">
          <div className="mb-11 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground/75">Listino prezzi</span>
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
                  <span className="text-sm font-semibold tracking-widest text-foreground/70">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 id={`title-${category.id}`} className="font-serif text-3xl italic md:text-4xl">
                    {category.title}
                  </h3>
                </div>
                <dl className="divide-y divide-black/10">
                  {category.items.map((item) => (
                    <div key={item.service} className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 py-[0.85rem]">
                      <dt className="min-w-0 text-lg leading-7 text-foreground/90">
                        {item.service}
                        {item.note && <span className="mt-1 block text-base leading-6 text-foreground/70">{item.note}</span>}
                      </dt>
                      <dd className="m-0 whitespace-nowrap pt-0.5 text-right text-lg font-semibold tabular-nums text-foreground">
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
              <div key={item.service} className="mt-6 flex flex-wrap items-baseline justify-between gap-3 border-b border-black/10 pb-5 text-lg">
                <span>{item.service}</span>
                <strong>{item.price}</strong>
              </div>
            ))}
          </section>
          <p className="mt-10 max-w-3xl border-l-2 border-black/70 pl-5 text-lg leading-8 text-foreground/75">
            <strong>Nota sui prezzi.</strong> Sono prezzi indicativi: il costo può cambiare in base
            al tessuto e al lavoro necessario. Ti diciamo sempre il prezzo prima di iniziare.
            Orari per lasciare e ritirare i capi: {hoursLine(site.stores[0])}.
          </p>
        </section>

        <section className="border-t border-black/10 bg-neutral-50 px-6 py-16 text-center md:py-20">
          <h2 className="font-serif text-4xl italic md:text-5xl">Hai un capo da sistemare?</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-foreground/75">
            Raccontaci di cosa hai bisogno. Per informazioni e appuntamenti
            contattaci direttamente, senza moduli o ordini online.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer"
              className="inline-flex min-h-14 items-center justify-center bg-foreground px-8 py-4 text-lg font-semibold text-background hover:bg-neutral-800">
              Scrivici su WhatsApp
            </a>
            <a href={`tel:${site.phone}`} className="inline-flex min-h-14 items-center justify-center border-2 border-foreground px-8 py-4 text-lg font-semibold">
              Chiama
            </a>
          </div>
          <p className="mt-6 text-xl font-semibold">{site.displayPhone}</p>
        </section>
      </main>

      <SubpageFooter />
    </div>
  );
}
