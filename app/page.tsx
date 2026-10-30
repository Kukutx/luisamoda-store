import Image from 'next/image';
import { MobileMenu } from '@/components/mobile-menu';
import { site, fullAddress, mapsUrl } from '@/lib/site';

// Preserve the existing monochrome editorial layout; the brand is now LZ FORTUNA.
const t = {
    home: 'HOME', services: 'SERVIZI', stores: 'NEGOZI', contact: 'CONTATTI',
    heroDetail: 'COLOGNO MONZESE · CALUSCO D’ADDA',
    discover: 'SCOPRI', scroll: 'SCORRI',
    servicesTitle: 'I NOSTRI SERVIZI', servicesCaption: 'VOL. 01',
    products: 'PRODOTTI PER TUTTI I GIORNI',
    productsDesc: 'Abbigliamento, mobili, articoli per la casa e la cucina, scuola, cosmetici, giocattoli e molto altro.',
    sewing: 'CUCITO E MODIFICHE',
    sewingDesc: 'Orli, riparazioni e modifiche sartoriali. Consulta il listino e chiedici informazioni.',
    inquire: 'CHIEDI INFO',
    storesTitle: 'DOVE TROVARCI', storesCaption: 'VOL. 02',
    oldStore: 'NEGOZIO STORICO', newStore: 'NUOVO NEGOZIO',
    hours: 'ORARIO', address: 'INDIRIZZO', addressPending: 'INDIRIZZO DISPONIBILE SU RICHIESTA', directions: 'INDICAZIONI',
    storesNote: 'Per entrambi i negozi, contattaci direttamente su WhatsApp o al numero 366 892 7486.',
    contactTitle: 'PARLIAMONE', contactCaption: 'VOL. 03',
    contactDesc: 'Hai una domanda o cerchi un prodotto? Scrivici su WhatsApp o chiamaci direttamente: saremo felici di aiutarti.',
    whats: 'WHATSAPP', call: 'CHIAMA',
    footerDesc: 'CUCITO · RIPARAZIONI · SERVIZI LOCALI',
};


const sewingImage = '/images/sartoria.jpg';

export default function HomePage() {
  const nav = [
    { href: '#top', label: t.home },
    { href: '#services', label: t.services },
    { href: '#stores', label: t.stores },
    { href: '#contact', label: t.contact },
  ];
  return (
    <div id="top" className="min-h-screen bg-background text-foreground selection:bg-black selection:text-white">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white/90 py-4 backdrop-blur-2xl">
        <div className="container mx-auto flex items-center justify-between gap-1.5 px-3 sm:gap-4 sm:px-6 md:px-10">
          <a href="#top" className="group shrink-0 font-serif text-[clamp(1.1rem,3vw,2rem)] tracking-[0.04em] text-foreground transition-opacity hover:opacity-65 sm:tracking-[0.065em]" aria-label="LZ FORTUNA — Inizio pagina">
            LZ <span className="italic">FORTUNA</span>
          </a>
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-4">
            <nav className="hidden items-center gap-3 lg:gap-7 md:flex" aria-label="Navigazione principale">
              {nav.map((item) => (
                <a key={item.href} href={item.href} className="text-[11px] tracking-[0.13em] uppercase text-foreground/65 transition-colors hover:text-foreground lg:text-xs lg:tracking-[0.2em]">{item.label}</a>
              ))}
            </nav>
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Scrivici su WhatsApp"
              className="inline-flex min-h-11 shrink-0 items-center justify-center bg-black px-2 text-[10px] font-bold uppercase tracking-[0.02em] text-white hover:bg-neutral-800 sm:px-5 sm:text-xs sm:tracking-[0.08em]">
              WhatsApp <span className="hidden sm:inline">↗</span>
            </a>
            <MobileMenu items={nav} />
          </div>
        </div>
      </header>

      <main id="contenuto" className="scroll-mt-20">
        {/* Original centred editorial composition, updated to the LZ identity. */}
        <section className="relative flex min-h-[72vh] items-center justify-center overflow-hidden px-6 pb-24 pt-40 text-center">
          <div className="pointer-events-none absolute inset-0 bg-radial-[circle_at_50%_0%] from-black/2 to-transparent to-50%" />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-10">
            <div className="absolute -top-1/2 h-[120vw] w-[120vw] rounded-full border border-black/5" />
            <div className="absolute -top-1/4 h-[80vw] w-[80vw] rounded-full border border-black/3" />
          </div>
          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-7">
            <h1 className="font-serif text-[clamp(3.2rem,10vw,7.5rem)] font-light leading-[0.95] tracking-[0.07em] text-foreground">
              LZ <span className="italic">FORTUNA</span>
            </h1>
            <p className="flex w-full max-w-[42rem] items-center justify-center gap-3 text-center text-[clamp(0.65rem,1.5vw,0.9rem)] font-medium uppercase leading-relaxed tracking-[0.13em] text-foreground/70 sm:gap-5 sm:tracking-[0.25em]">
              <span aria-hidden="true" className="h-px min-w-6 flex-1 bg-foreground/25" />
              <span>Sartoria e servizi per il tuo stile</span>
              <span aria-hidden="true" className="h-px min-w-6 flex-1 bg-foreground/25" />
            </p>
            <p className="max-w-xl text-xs font-light uppercase leading-7 tracking-[0.22em] text-foreground/50">{t.heroDetail}</p>
            <a href="#services" className="group bg-foreground px-12 py-4 text-sm font-extrabold uppercase tracking-[0.35em] text-background transition-opacity hover:opacity-80">
              {t.discover}
            </a>
          </div>
          <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
            <span className="h-9 w-px bg-linear-to-b from-foreground/25 to-transparent" />
            <span className="text-[11px] uppercase tracking-widest text-foreground/30">{t.scroll}</span>
          </div>
        </section>

        {/* Original image-led service cards: pictures only illustrate products, never replace live text. */}
        <section id="services" className="container mx-auto scroll-mt-28 border-t border-black/5 px-6 py-14 md:px-10 md:py-20">
          <div className="mb-10">
            <span className="text-xs uppercase tracking-[0.4em] text-foreground/40">{t.servicesCaption}</span>
            <h2 className="mt-3 font-serif text-4xl italic uppercase tracking-[0.16em] md:text-5xl">{t.servicesTitle}</h2>
          </div>
          <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 md:gap-10">
            <article className="flex flex-col overflow-hidden border border-black/10">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                <Image
                  src="/images/assortimento-prodotti.jpg"
                  alt="Assortimento illustrativo: abbigliamento e accessori, casa e cucina, cartoleria e giocattoli"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col border-t border-black/10 p-5 text-left md:p-7">
                <h3 className="mb-3 font-serif text-2xl italic uppercase tracking-[0.04em]">{t.products}</h3>
                <p className="mb-5 text-base leading-7 text-foreground/80">{t.productsDesc}</p>
                <a href="/prodotti/" className="mt-auto inline-flex min-h-12 items-center text-sm font-bold uppercase tracking-[0.13em] hover:underline">
                  SCOPRI LE CATEGORIE →
                </a>
              </div>
            </article>

            <article className="flex flex-col overflow-hidden border border-black/10">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                <Image
                  src={sewingImage}
                  alt="Lavori di cucito e modifiche di abbigliamento"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col border-t border-black/10 p-5 text-left md:p-7">
                <h3 className="mb-3 font-serif text-2xl italic uppercase tracking-[0.04em]">{t.sewing}</h3>
                <p className="mb-5 text-base leading-7 text-foreground/80">{t.sewingDesc}</p>
                <div className="mt-auto flex flex-wrap items-center gap-4">
                  <a href="/sartoria/" className="inline-flex min-h-12 items-center text-sm font-bold uppercase tracking-[0.13em] hover:underline">
                    VEDI IL LISTINO →
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section id="stores" className="container mx-auto scroll-mt-20 border-t border-black/5 px-6 py-16 md:px-10 md:py-24">
          <span className="text-xs uppercase tracking-[0.4em] text-foreground/40">{t.storesCaption}</span>
          <h2 className="mb-12 mt-3 font-serif text-4xl italic uppercase tracking-[0.16em] md:text-5xl">{t.storesTitle}</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {site.stores.map((store) => (
              <article key={store.id} className="border border-black/10 p-7 md:p-10">
                <p className="mb-7 text-xs font-medium uppercase tracking-[0.3em] text-foreground/50">{store.mainContact ? t.newStore : t.oldStore}</p>
                <h3 className="mb-3 font-serif text-3xl tracking-[0.1em] md:text-4xl">{store.name}</h3>
                <p className="mb-8 text-base uppercase tracking-[0.17em] text-foreground/65">{store.city}</p>
                <div className="border-t border-black/10 pt-6">
                  <p className="mb-2 text-xs uppercase tracking-[0.3em] text-foreground/50">{t.hours}</p>
                  <p className="mb-4 text-2xl tracking-widest">{store.hours}</p>
                  <p className="mb-2 text-xs uppercase tracking-[0.3em] text-foreground/50">{t.address}</p>
                  {fullAddress(store) ? (
                    <address className="text-base not-italic leading-7 tracking-[0.06em] text-foreground/80">{fullAddress(store)}</address>
                  ) : (
                    <p className="text-sm leading-7 tracking-[0.1em] text-foreground/60">{t.addressPending}</p>
                  )}
                </div>
                <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
                  {mapsUrl(store) && (
                    <a href={mapsUrl(store)!} target="_blank" rel="noopener noreferrer"
                      className="inline-block border-b border-black/40 pb-2 text-sm font-bold uppercase tracking-[0.18em]">{t.directions} ↗</a>
                  )}
                  <a href={site.whatsapp} target="_blank" rel="noopener noreferrer"
                    className="inline-block border-b border-black/40 pb-2 text-sm font-bold uppercase tracking-[0.18em]">{t.inquire} →</a>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-8 text-sm leading-7 tracking-[0.14em] text-foreground/60">{t.storesNote}</p>
        </section>

        <section id="contact" className="scroll-mt-20 border-t border-black/5 bg-neutral-50/50 px-6 py-16 text-center md:py-24">
          <span className="text-xs uppercase tracking-[0.4em] text-foreground/40">{t.contactCaption}</span>
          <h2 className="mb-6 mt-3 font-serif text-4xl italic uppercase tracking-[0.17em] md:text-5xl">{t.contactTitle}</h2>
          <p className="mx-auto mb-7 max-w-2xl text-sm uppercase leading-8 tracking-[0.16em] text-foreground/60">{t.contactDesc}</p>
          <a href={`tel:${site.phone}`} className="mb-8 inline-block font-serif text-3xl tracking-[0.15em] md:text-4xl">{site.displayPhone}</a>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer"
              className="inline-block bg-foreground px-10 py-4 text-sm font-bold uppercase tracking-[0.25em] text-background hover:opacity-80">{t.whats}</a>
            <a href={`tel:${site.phone}`} className="inline-block border border-foreground px-10 py-4 text-sm font-bold uppercase tracking-[0.25em] hover:bg-black/5">{t.call}</a>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/5 bg-neutral-50/30 py-16 md:py-20">
        <div className="container mx-auto flex flex-col justify-between gap-10 px-6 md:flex-row md:px-10">
          <div className="space-y-4">
            <p className="font-serif text-3xl tracking-[0.08em]">LZ <span className="italic">FORTUNA</span></p>
            <p className="text-sm uppercase tracking-[0.18em] text-foreground/55">{t.footerDesc}</p>
            <p className="text-sm tracking-widest text-foreground/50">LZ Fortuna · Cologno Monzese / Luisa Moda · Calusco d’Adda</p>
          </div>
          <nav className="flex flex-col gap-4 text-sm uppercase tracking-widest text-foreground/50" aria-label="Navigazione a piè di pagina">
            {nav.map((item) => (<a href={item.href} key={item.href} className="hover:text-foreground">{item.label}</a>))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
