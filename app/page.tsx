import Image from 'next/image';
import { MobileMenu } from '@/components/mobile-menu';
import { site, fullAddress, mapsUrl, whatsappWith, hoursLine } from '@/lib/site';

// Monochrome editorial identity, written for local customers of every age:
// large readable type, plain words and one tap to chat, call or get directions.
const t = {
    services: 'Servizi', stores: 'Negozi', contact: 'Contatti',
    heroDetail: 'Cologno Monzese · Calusco d’Adda',
    heroIntro: 'Il tuo emporio di quartiere: abbigliamento, articoli per la casa e riparazioni sartoriali. Scrivici o chiamaci, ti rispondiamo noi.',
    whatsCta: 'Scrivici su WhatsApp', callCta: 'Chiama',
    quickTitle: 'Come possiamo aiutarti?',
    quickIntro: 'Tocca una voce: si apre WhatsApp con il messaggio già pronto. Ti basta completarlo e inviarlo.',
    servicesTitle: 'I nostri servizi',
    products: 'PRODOTTI PER TUTTI I GIORNI',
    productsDesc: 'Abbigliamento, mobili, articoli per la casa e la cucina, scuola, cosmetici, giocattoli e molto altro.',
    sewing: 'CUCITO E MODIFICHE',
    sewingDesc: 'Orli, riparazioni e modifiche sartoriali. Consulta il listino e chiedici informazioni.',
    storesTitle: 'Dove trovarci',
    storesIntro: 'Due negozi di famiglia, con lo stesso numero per entrambi.',
    oldStore: 'Negozio storico', newStore: 'Nuovo negozio',
    findHere: 'Cosa trovi', hours: 'Orario', address: 'Indirizzo', addressPending: 'Indirizzo disponibile su richiesta',
    directions: 'Indicazioni', inquire: 'Scrivici',
    contactTitle: 'Parliamone',
    contactDesc: 'Hai una domanda, cerchi un prodotto o vuoi passare in negozio? Scrivici su WhatsApp o chiamaci: ti rispondiamo noi.',
    tiktok: 'Seguici su TikTok',
    footerDesc: 'Emporio di quartiere e sartoria',
};

const quickActions = [
  {
    title: 'Avete questo articolo?',
    detail: 'Chiedi se un prodotto è disponibile, anche con una foto.',
    message: 'Buongiorno, vorrei sapere se avete disponibile: ',
  },
  {
    title: 'Quanto costa sistemare un capo?',
    detail: 'Descrivi il lavoro o manda una foto del capo.',
    message: 'Buongiorno, vorrei sapere il prezzo per sistemare questo capo: ',
  },
  {
    title: 'Vorrei passare in negozio',
    detail: 'Fissa una prova, un ritiro o una consegna.',
    message: 'Buongiorno, vorrei passare in negozio per ',
  },
];

const sewingImage = '/images/sartoria.jpg';

export default function HomePage() {
  const nav = [
    { href: '#servizi', label: t.services },
    { href: '#negozi', label: t.stores },
    { href: '/sartoria/', label: 'Sartoria' },
    { href: '#contatti', label: t.contact },
  ];
  return (
    <div id="top" className="min-h-screen bg-background text-foreground selection:bg-black selection:text-white">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-white/95 py-3 backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between gap-2 px-4 sm:gap-4 sm:px-6 md:px-10">
          <a href="#top" className="shrink-0 font-serif text-[clamp(1.25rem,3vw,2rem)] tracking-[0.05em] text-foreground hover:opacity-70" aria-label="LZ FORTUNA — Inizio pagina">
            LZ <span className="italic">FORTUNA</span>
          </a>
          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <nav className="hidden items-center gap-6 md:flex" aria-label="Navigazione principale">
              {nav.map((item) => (
                <a key={item.href} href={item.href} className="py-2 text-base text-foreground/80 hover:text-foreground hover:underline">{item.label}</a>
              ))}
            </nav>
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Scrivici su WhatsApp"
              className="inline-flex min-h-12 shrink-0 items-center justify-center bg-black px-3 text-sm font-semibold text-white hover:bg-neutral-800 sm:px-5">
              WhatsApp
            </a>
            <MobileMenu items={nav} />
          </div>
        </div>
      </header>

      <main id="contenuto" className="scroll-mt-20">
        <section className="relative flex items-center justify-center overflow-hidden px-5 pb-16 pt-32 text-center md:pb-24 md:pt-44">
          <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6">
            <h1 className="font-serif text-[clamp(3.2rem,10vw,7.5rem)] font-light leading-[0.95] tracking-[0.07em] text-foreground">
              LZ <span className="italic">FORTUNA</span>
            </h1>
            <p className="flex w-full max-w-[42rem] items-center justify-center gap-3 text-center text-sm font-medium uppercase leading-relaxed tracking-[0.14em] text-foreground/80 sm:gap-5 sm:tracking-[0.22em]">
              <span aria-hidden="true" className="h-px min-w-6 flex-1 bg-foreground/30" />
              <span>Sartoria e servizi per il tuo stile</span>
              <span aria-hidden="true" className="h-px min-w-6 flex-1 bg-foreground/30" />
            </p>
            <p className="text-base font-medium tracking-[0.08em] text-foreground/75">{t.heroDetail}</p>
            <p className="max-w-xl text-lg leading-8 text-foreground/85">{t.heroIntro}</p>
            <div className="mt-2 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row">
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer"
                className="inline-flex min-h-14 items-center justify-center bg-foreground px-8 text-lg font-semibold text-background hover:bg-neutral-800">
                {t.whatsCta}
              </a>
              <a href={`tel:${site.phone}`}
                className="inline-flex min-h-14 items-center justify-center border-2 border-foreground px-8 text-lg font-semibold hover:bg-black/5">
                {t.callCta} {site.displayPhone}
              </a>
            </div>
            <a href="#negozi" className="py-2 text-base text-foreground/80 underline underline-offset-4 hover:text-foreground">
              Dove siamo e orari ↓
            </a>
          </div>
        </section>

        <section id="aiuto" className="scroll-mt-24 border-t border-black/10 bg-neutral-50 px-5 py-14 md:py-20" aria-labelledby="aiuto-heading">
          <div className="container mx-auto md:px-5">
            <h2 id="aiuto-heading" className="font-serif text-4xl italic md:text-5xl">{t.quickTitle}</h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-foreground/80">{t.quickIntro}</p>
            <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              {quickActions.map((action) => (
                <li key={action.title}>
                  <a href={whatsappWith(action.message)} target="_blank" rel="noopener noreferrer"
                    className="flex h-full min-h-28 flex-col justify-between gap-3 border border-black/20 bg-white p-5 hover:border-black md:p-6">
                    <span className="font-serif text-2xl leading-tight">{action.title}</span>
                    <span className="text-base leading-7 text-foreground/75">{action.detail}</span>
                    <span className="text-base font-semibold">Scrivi su WhatsApp →</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Image-led service cards: pictures only illustrate products, never replace live text. */}
        <section id="servizi" className="container mx-auto scroll-mt-24 border-t border-black/10 px-5 py-14 md:px-10 md:py-20">
          <h2 className="mb-10 font-serif text-4xl italic md:text-5xl">{t.servicesTitle}</h2>
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
                <p className="mb-5 text-lg leading-8 text-foreground/80">{t.productsDesc}</p>
                <a href="/prodotti/" className="mt-auto inline-flex min-h-12 items-center text-base font-semibold underline underline-offset-4">
                  Vedi cosa trovi in negozio →
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
                <p className="mb-5 text-lg leading-8 text-foreground/80">{t.sewingDesc}</p>
                <a href="/sartoria/" className="mt-auto inline-flex min-h-12 items-center text-base font-semibold underline underline-offset-4">
                  Vedi i prezzi delle riparazioni →
                </a>
              </div>
            </article>
          </div>
        </section>

        <section id="negozi" className="container mx-auto scroll-mt-24 border-t border-black/10 px-5 py-14 md:px-10 md:py-20">
          <h2 className="font-serif text-4xl italic md:text-5xl">{t.storesTitle}</h2>
          <p className="mb-10 mt-4 text-lg leading-8 text-foreground/80">{t.storesIntro}</p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {site.stores.map((store) => (
              <article key={store.id} className="flex flex-col border border-black/15 p-6 md:p-9">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-foreground/70">{store.mainContact ? t.newStore : t.oldStore} · {store.city}</p>
                <h3 className="font-serif text-4xl tracking-[0.06em]">{store.name}</h3>
                <p className="mt-2 text-lg leading-7 text-foreground/80">{store.tagline}</p>

                <h4 className="mt-7 font-sans text-sm font-semibold uppercase tracking-[0.14em] text-foreground/70">{t.findHere}</h4>
                <ul className="mt-3 space-y-2 text-lg leading-7">
                  {store.highlights.map((item) => (
                    <li key={item} className="flex gap-3"><span aria-hidden="true">·</span><span>{item}</span></li>
                  ))}
                </ul>

                <dl className="mt-7 grid grid-cols-1 gap-5 border-t border-black/10 pt-6 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground/70">{t.hours}</dt>
                    <dd className="mt-1">
                      <p className="text-lg leading-7">{store.hours.days}</p>
                      {store.hours.times.map((time) => (
                        <p key={time.opens} className="text-2xl leading-9 tabular-nums">{time.opens}–{time.closes}</p>
                      ))}
                      <p className="mt-1 text-lg font-semibold leading-7">{store.hours.closed}</p>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground/70">{t.address}</dt>
                    <dd className="mt-1">
                      {fullAddress(store) ? (
                        <address className="text-lg not-italic leading-7">{fullAddress(store)}</address>
                      ) : (
                        <span className="text-lg leading-7 text-foreground/75">{t.addressPending}</span>
                      )}
                    </dd>
                  </div>
                </dl>

                <div className="mt-8 flex flex-wrap gap-3 md:mt-auto md:pt-8">
                  {mapsUrl(store) && (
                    <a href={mapsUrl(store)!} target="_blank" rel="noopener noreferrer"
                      className="inline-flex min-h-12 items-center justify-center bg-foreground px-5 text-base font-semibold text-background hover:bg-neutral-800">{t.directions} ↗</a>
                  )}
                  <a href={whatsappWith(`Buongiorno, ho una domanda per il negozio di ${store.city}: `)} target="_blank" rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center justify-center border-2 border-foreground px-5 text-base font-semibold hover:bg-black/5">{t.inquire}</a>
                  {store.tiktok && (
                    <a href={store.tiktok.url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex min-h-12 items-center justify-center px-2 text-base font-semibold underline underline-offset-4">TikTok {store.tiktok.handle} ↗</a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contatti" className="scroll-mt-24 border-t border-black/10 bg-neutral-50 px-5 py-14 text-center md:py-20">
          <h2 className="font-serif text-4xl italic md:text-5xl">{t.contactTitle}</h2>
          <p className="mx-auto mb-7 mt-5 max-w-2xl text-lg leading-8 text-foreground/80">{t.contactDesc}</p>
          <a href={`tel:${site.phone}`} className="mb-8 inline-block font-serif text-4xl tracking-[0.12em] md:text-5xl">{site.displayPhone}</a>
          <div className="mx-auto flex max-w-md flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center">
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer"
              className="inline-flex min-h-14 items-center justify-center bg-foreground px-8 text-lg font-semibold text-background hover:bg-neutral-800">{t.whatsCta}</a>
            <a href={`tel:${site.phone}`} className="inline-flex min-h-14 items-center justify-center border-2 border-foreground px-8 text-lg font-semibold hover:bg-black/5">{t.callCta}</a>
            <a href={site.tiktok} target="_blank" rel="noopener noreferrer"
              className="inline-flex min-h-14 items-center justify-center px-4 text-lg font-semibold underline underline-offset-4">{t.tiktok} ↗</a>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/10 py-12 md:py-16">
        <div className="container mx-auto flex flex-col justify-between gap-10 px-5 md:flex-row md:px-10">
          <div className="space-y-3">
            <p className="font-serif text-3xl tracking-[0.08em]">LZ <span className="italic">FORTUNA</span></p>
            <p className="text-base text-foreground/80">{t.footerDesc}</p>
            {site.stores.map((store) => (
              <p key={store.id} className="text-base leading-7 text-foreground/80">
                <strong className="font-semibold text-foreground">{store.name}</strong> · {fullAddress(store) || store.city} · {hoursLine(store)}
              </p>
            ))}
            <p className="text-base text-foreground/80">Telefono e WhatsApp: <a href={`tel:${site.phone}`} className="font-semibold underline underline-offset-4">{site.displayPhone}</a></p>
          </div>
          <nav className="flex flex-col gap-1 text-base" aria-label="Navigazione a piè di pagina">
            {[...nav, { href: '/prodotti/', label: 'Prodotti' }, { href: site.tiktok, label: 'TikTok' }].map((item) => (
              <a href={item.href} key={item.href} className="py-2 text-foreground/80 hover:text-foreground hover:underline">{item.label}</a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
