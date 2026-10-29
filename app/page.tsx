'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { site } from '@/lib/site';

type Locale = 'it' | 'zh' | 'en';

// Only copy and shop information changes. The composition, typography, imagery,
// and monochrome styling follow the original 8d3fbcb storefront.
const messages = {
  it: {
    home: 'HOME', services: 'SERVIZI', stores: 'NEGOZI', contact: 'CONTATTI',
    year: '2026', heroDescription: 'MINIMAL · PRATICO · VICINO A TE',
    heroDetail: 'SARTORIA E SERVIZI LOCALI · COLOGNO MONZESE · CALUSCO',
    discover: 'SCOPRI', scroll: 'SCORRI',
    servicesTitle: 'I NOSTRI SERVIZI', servicesCaption: 'VOL. 01',
    products: 'PRODOTTI', productsDesc: 'ARTICOLI E PICCOLE NECESSITÀ, CHIEDICI INFORMAZIONI.',
    sewing: 'CUCITO E MODIFICHE', sewingDesc: 'ORLI, RIPARAZIONI, MODIFICHE E LAVORI DA DISCUTERE IN NEGOZIO.',
    print3d: 'STAMPA 3D E INCISIONE', print3dDesc: 'DESCRIVICI LA TUA IDEA E CHIEDI INFORMAZIONI.',
    inquire: 'CHIEDI INFO',
    storesTitle: 'DOVE TROVARCI', storesCaption: 'VOL. 02',
    oldStore: 'NEGOZIO STORICO', newStore: 'NUOVO NEGOZIO',
    hours: 'ORARIO', addressPending: 'INDIRIZZO DISPONIBILE SU RICHIESTA',
    storesNote: 'PER INFO E APPUNTAMENTI CONTATTACI AL NUMERO DI LZFORTUNA-STORE.',
    contactTitle: 'PARLIAMONE', contactCaption: 'VOL. 03',
    contactDesc: 'SCRIVICI SU WHATSAPP O CHIAMACI DIRETTAMENTE. NESSUNA REGISTRAZIONE, NESSUN ORDINE ONLINE.',
    whats: 'WHATSAPP', call: 'CHIAMA',
    footerDesc: 'CUCITO · RIPARAZIONI · SERVIZI LOCALI',
  },
  zh: {
    home: '首页', services: '服务', stores: '门店', contact: '联系',
    year: '2026', heroDescription: '简约 · 实用 · 就在您身边',
    heroDetail: '本地裁缝与便民服务 · COLOGNO MONZESE · CALUSCO',
    discover: '了解服务', scroll: '向下浏览',
    servicesTitle: '我们的服务', servicesCaption: '第 01 部分',
    products: '日用百货', productsDesc: '日常用品，可直接联系我们咨询。',
    sewing: '缝纫与改衣', sewingDesc: '改裤脚、修补衣服与其他裁缝服务，欢迎到店咨询。',
    print3d: '3D 打印与雕刻', print3dDesc: '告诉我们您的想法，直接联系咨询。',
    inquire: '联系咨询',
    storesTitle: '我们的门店', storesCaption: '第 02 部分',
    oldStore: '老店', newStore: '新店',
    hours: '营业时间', addressPending: '具体地址请联系我们',
    storesNote: '两家门店的咨询及预约均请联系新店 LZFortuna-store。',
    contactTitle: '直接联系我们', contactCaption: '第 03 部分',
    contactDesc: '通过 WhatsApp 或电话联系我们，无需注册或网上下单。',
    whats: 'WHATSAPP 联系', call: '拨打电话',
    footerDesc: '缝纫 · 改衣 · 本地服务',
  },
  en: {
    home: 'HOME', services: 'SERVICES', stores: 'SHOPS', contact: 'CONTACT',
    year: '2026', heroDescription: 'MINIMAL · PRACTICAL · CLOSE TO HOME',
    heroDetail: 'LOCAL TAILORING · COLOGNO MONZESE · CALUSCO',
    discover: 'DISCOVER', scroll: 'SCROLL',
    servicesTitle: 'OUR SERVICES', servicesCaption: 'VOL. 01',
    products: 'GOODS', productsDesc: 'EVERYDAY ITEMS. ASK US FOR MORE INFORMATION.',
    sewing: 'TAILORING & ALTERATIONS', sewingDesc: 'HEMS, REPAIRS, ADJUSTMENTS AND OTHER CLOTHING REQUESTS.',
    print3d: '3D PRINTING & ENGRAVING', print3dDesc: 'TELL US YOUR IDEA AND GET IN TOUCH.',
    inquire: 'ASK US',
    storesTitle: 'FIND OUR SHOPS', storesCaption: 'VOL. 02',
    oldStore: 'ESTABLISHED SHOP', newStore: 'NEW SHOP',
    hours: 'HOURS', addressPending: 'PLEASE ASK FOR THE EXACT ADDRESS',
    storesNote: 'PLEASE CONTACT LZFORTUNA-STORE FOR BOTH SHOPS AND APPOINTMENTS.',
    contactTitle: 'GET IN TOUCH', contactCaption: 'VOL. 03',
    contactDesc: 'MESSAGE US ON WHATSAPP OR CALL DIRECTLY. NO REGISTRATION OR ONLINE CHECKOUT.',
    whats: 'WHATSAPP', call: 'CALL US',
    footerDesc: 'TAILORING · REPAIRS · LOCAL SERVICES',
  },
} as const;

const images = [
  'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80&w=800',
] as const;

export default function HomePage() {
  const [locale, setLocale] = useState<Locale>('it');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = messages[locale];

  useEffect(() => { document.documentElement.lang = locale; }, [locale]);

  const nav = [
    { href: '#top', label: t.home },
    { href: '#services', label: t.services },
    { href: '#stores', label: t.stores },
    { href: '#contact', label: t.contact },
  ];
  const serviceCards = [
    { key: 'products', title: t.products, description: t.productsDesc, image: images[0] },
    { key: 'sewing', title: t.sewing, description: t.sewingDesc, image: images[1] },
    { key: 'print3d', title: t.print3d, description: t.print3dDesc, image: images[2] },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-black selection:text-white">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white/90 py-4 backdrop-blur-2xl">
        <div className="container mx-auto flex items-center justify-between gap-4 px-6 md:px-10">
          <a href="#top" className="group flex shrink-0 items-center" aria-label="Luisa Moda">
            <span className="font-serif text-2xl tracking-[0.24em] uppercase text-foreground transition-opacity hover:opacity-60">
              Luisa <span className="font-light italic opacity-40">Moda</span>
            </span>
          </a>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Navigation">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="text-xs tracking-[0.24em] uppercase text-foreground/65 transition-colors hover:text-foreground">{item.label}</a>
            ))}
            <div className="ml-2 flex items-center gap-4 border-l border-black/10 pl-6" aria-label="Language">
              {(['zh', 'en', 'it'] as const).map((value) => (
                <button key={value} type="button" onClick={() => setLocale(value)}
                  aria-label={value === 'zh' ? '中文' : value === 'it' ? 'Italiano' : 'English'}
                  aria-pressed={locale === value}
                  className={`text-xs tracking-widest ${locale === value ? 'font-black text-foreground' : 'text-foreground/40 hover:text-foreground'}`}>
                  {value === 'zh' ? '中' : value.toUpperCase()}
                </button>
              ))}
            </div>
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
            <div className="flex gap-6 border-t border-black/10 pt-5">
              {(['zh', 'en', 'it'] as const).map((value) => (
                <button type="button" key={value} onClick={() => { setLocale(value); setMobileMenuOpen(false); }}
                  className={`min-h-11 text-sm tracking-widest ${locale === value ? 'font-bold' : 'opacity-45'}`}>
                  {value === 'zh' ? '中文' : value.toUpperCase()}
                </button>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main id="top">
        {/* Preserve the original centred LUISA / year hero and monochrome motifs. */}
        <section className="relative flex min-h-[72vh] items-center justify-center overflow-hidden px-6 pb-24 pt-40 text-center">
          <div className="pointer-events-none absolute inset-0 bg-radial-[circle_at_50%_0%] from-black/2 to-transparent to-50%" />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-10">
            <div className="absolute -top-1/2 h-[120vw] w-[120vw] rounded-full border border-black/5" />
            <div className="absolute -top-1/4 h-[80vw] w-[80vw] rounded-full border border-black/3" />
          </div>
          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-7">
            <h1 className="font-serif text-6xl font-light leading-none tracking-widest text-foreground md:text-8xl">
              LUISA <span className="font-light italic opacity-10">{t.year}</span>
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

        {/* Same three photographic tiles and editorial card proportions as the original. */}
        <section id="services" className="container mx-auto scroll-mt-20 border-t border-black/5 px-6 py-14 md:px-10 md:py-20">
          <div className="mb-10">
            <span className="text-xs uppercase tracking-[0.4em] text-foreground/40">{t.servicesCaption}</span>
            <h2 className="mt-3 font-serif text-4xl italic uppercase tracking-[0.16em] md:text-5xl">{t.servicesTitle}</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
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
            <p className="font-serif text-2xl uppercase tracking-[0.3em]">Luisa Moda</p>
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
