'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { LZMonogram } from '@/components/lz-monogram';
import { site } from '@/lib/site';

// Preserve the existing monochrome editorial layout; the brand is now LZ FORTUNA.
const t = {
    home: 'HOME', services: 'SERVIZI', stores: 'NEGOZI', contact: 'CONTATTI',
    heroDescription: 'SARTORIA E SERVIZI PER IL TUO STILE',
    heroDetail: 'COLOGNO MONZESE · CALUSCO',
    discover: 'SCOPRI', scroll: 'SCORRI',
    servicesTitle: 'I NOSTRI SERVIZI', servicesCaption: 'VOL. 01',
    products: 'PRODOTTI', productsDesc: 'ARTICOLI E PICCOLE NECESSITÀ, CHIEDICI INFORMAZIONI.',
    sewing: 'CUCITO E MODIFICHE', sewingDesc: 'ORLI, RIPARAZIONI, MODIFICHE E LAVORI DA DISCUTERE IN NEGOZIO.',
    inquire: 'CHIEDI INFO',
    storesTitle: 'DOVE TROVARCI', storesCaption: 'VOL. 02',
    oldStore: 'NEGOZIO STORICO', newStore: 'NUOVO NEGOZIO',
    hours: 'ORARIO', addressPending: 'INDIRIZZO DISPONIBILE SU RICHIESTA',
    storesNote: 'PER INFO E APPUNTAMENTI CONTATTACI AL NUMERO DI LZFORTUNA-STORE.',
    contactTitle: 'PARLIAMONE', contactCaption: 'VOL. 03',
    contactDesc: 'SCRIVICI SU WHATSAPP O CHIAMACI DIRETTAMENTE. NESSUNA REGISTRAZIONE, NESSUN ORDINE ONLINE.',
    whats: 'WHATSAPP', call: 'CHIAMA',
    footerDesc: 'CUCITO · RIPARAZIONI · SERVIZI LOCALI',
};


const images = [
  'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&q=80&w=800',
] as const;

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, [mobileMenuOpen]);

  const nav = [
    { href: '#top', label: t.home },
    { href: '#services', label: t.services },
    { href: '#stores', label: t.stores },
    { href: '#contact', label: t.contact },
  ];
  const serviceCards = [
    { key: 'products', title: t.products, description: t.productsDesc, image: images[0] },
    { key: 'sewing', title: t.sewing, description: t.sewingDesc, image: images[1] },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-black selection:text-white">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white/90 py-4 backdrop-blur-2xl">
        <div className="container mx-auto flex items-center justify-between gap-4 px-6 md:px-10">
          <a href="#top" className="group flex shrink-0 items-center gap-2.5" aria-label="LZ FORTUNA - Home">
            <LZMonogram className="h-9 w-10 shrink-0 transition-opacity group-hover:opacity-65" />
            <span className="font-serif text-xl tracking-[0.11em] uppercase text-foreground transition-opacity group-hover:opacity-65 sm:text-2xl">
              LZ <span className="font-light italic">FORTUNA</span>
            </span>
          </a>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Navigation">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="text-xs tracking-[0.24em] uppercase text-foreground/65 transition-colors hover:text-foreground">{item.label}</a>
            ))}
          </nav>
          <button type="button" className="flex min-h-11 min-w-11 items-center justify-center border border-black/15 text-xl md:hidden"
            aria-controls="mobile-menu" aria-expanded={mobileMenuOpen} aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? '×' : '☰'}</button>
        </div>
        {mobileMenuOpen && (
          <nav id="mobile-menu" className="flex flex-col gap-2 border-t border-black/5 bg-white px-6 py-5 md:hidden" aria-label="Mobile navigation">
            {nav.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)} className="py-3 text-base tracking-widest uppercase">{item.label}</a>
            ))}
          </nav>
        )}
      </header>

      <main id="top">
        {/* Original centred editorial composition, updated to the LZ identity. */}
        <section className="relative flex min-h-[72vh] items-center justify-center overflow-hidden px-6 pb-24 pt-40 text-center">
          <div className="pointer-events-none absolute inset-0 bg-radial-[circle_at_50%_0%] from-black/2 to-transparent to-50%" />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-10">
            <div className="absolute -top-1/2 h-[120vw] w-[120vw] rounded-full border border-black/5" />
            <div className="absolute -top-1/4 h-[80vw] w-[80vw] rounded-full border border-black/3" />
          </div>
          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-7">
            <h1 className="font-serif text-[clamp(2.8rem,8vw,6rem)] font-light leading-none tracking-[0.12em] text-foreground sm:tracking-[0.18em]">
              <span className="block md:inline">LZ</span>{' '}
              <span className="block font-light italic md:inline">FORTUNA</span>
            </h1>
            <div className="mx-auto h-px w-24 bg-foreground/15" />
            <p className="max-w-lg text-sm font-light uppercase leading-relaxed tracking-[0.35em] text-foreground/55">{t.heroDescription}</p>
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

        {/* Retain the original photographic cards and editorial proportions. */}
        <section id="services" className="container mx-auto scroll-mt-20 border-t border-black/5 px-6 py-14 md:px-10 md:py-20">
          <div className="mb-10">
            <span className="text-xs uppercase tracking-[0.4em] text-foreground/40">{t.servicesCaption}</span>
            <h2 className="mt-3 font-serif text-4xl italic uppercase tracking-[0.16em] md:text-5xl">{t.servicesTitle}</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
            {serviceCards.map((item) => (
              <a key={item.key} href="#contact" className="group block overflow-hidden border border-black/5 transition-all duration-500 hover:border-black/20">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                  <Image src={item.image} alt={item.title} fill unoptimized sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover opacity-90 transition-all duration-700 group-hover:scale-[1.03] group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent" />
                </div>
                <div className="p-5 text-center md:p-6 md:text-left">
                  <h3 className="mb-3 font-serif text-xl italic uppercase tracking-widest md:text-2xl">{item.title}</h3>
                  <p className="mb-5 text-sm font-light uppercase leading-relaxed tracking-[0.13em] text-foreground/60">{item.description}</p>
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-foreground/70 group-hover:text-foreground">{t.inquire} →</span>
                </div>
              </a>
            ))}
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
                  <p className="text-sm leading-7 tracking-[0.1em] text-foreground/60">{store.address || t.addressPending}</p>
                </div>
                <a href={site.whatsapp} target="_blank" rel="noopener noreferrer"
                  className="mt-8 inline-block border-b border-black/40 pb-2 text-sm font-bold uppercase tracking-[0.18em]">{t.inquire} →</a>
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
            <div className="flex items-center gap-2">
              <LZMonogram className="h-10 w-11" />
              <p className="font-serif text-2xl uppercase tracking-[0.18em]">LZ <span className="italic">FORTUNA</span></p>
            </div>
            <p className="text-sm uppercase tracking-[0.18em] text-foreground/55">{t.footerDesc}</p>
            <p className="text-sm tracking-widest text-foreground/50">LZFortuna-store · Cologno Monzese / Luisa Moda · Calusco</p>
          </div>
          <nav className="flex flex-col gap-4 text-sm uppercase tracking-widest text-foreground/50" aria-label="Footer navigation">
            {nav.map((item) => (<a href={item.href} key={item.href} className="hover:text-foreground">{item.label}</a>))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
