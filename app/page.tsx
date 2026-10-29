'use client';

import { useState } from 'react';
import { site } from '@/lib/site';

type Locale = 'it' | 'zh' | 'en';

const messages = {
  it: {
    tagline: 'SARTORIA DI QUARTIERE',
    navServices: 'Servizi',
    navStores: 'Negozi',
    navContact: 'Contatti',
    heroKicker: 'Cologno Monzese · Calusco',
    heroTitle: 'I tuoi capi,',
    heroTitleAccent: 'come nuovi.',
    heroText:
      'Riparazioni e modifiche sartoriali, con la cura e la semplicità di un servizio di quartiere. Ti aspettiamo in negozio oppure contattaci.',
    contactWhatsApp: 'Scrivici su WhatsApp',
    contactPhone: 'Chiamaci',
    directContact: 'Per informazioni e appuntamenti',
    directContactShop: 'Contatto unico: LZFortuna-store',
    servicesEyebrow: 'QUELLO CHE FACCIAMO',
    servicesTitle: 'Un aiuto per i tuoi vestiti.',
    servicesIntro: 'Piccole modifiche, riparazioni e lavori da valutare insieme, senza moduli o ordini online.',
    service1: 'Orli e lunghezze',
    service1Desc: 'Accorciature di pantaloni, gonne e altri capi.',
    service2: 'Riparazioni',
    service2Desc: 'Cuciture, piccoli strappi e capi da sistemare.',
    service3: 'Modifiche su richiesta',
    service3Desc: 'Raccontaci il lavoro: troviamo insieme una soluzione.',
    storesEyebrow: 'DOVE SIAMO',
    storesTitle: 'Due negozi, vicini a te.',
    storesIntro: 'Per informazioni e appuntamenti puoi sempre usare il contatto di LZFortuna-store.',
    newStore: 'NEGOZIO NUOVO · CONTATTO PER APPUNTAMENTI',
    oldStore: 'NEGOZIO STORICO',
    hours: 'Orario',
    addressPending: 'Indirizzo preciso: chiedici informazioni',
    contactFromStore: 'Contatta il negozio',
    contactEyebrow: 'È FACILE CONTATTARCI',
    contactTitle: 'Hai un capo da sistemare?',
    contactIntro: 'Chiamaci o mandaci un messaggio. Nessuna registrazione, nessun acquisto online.',
    allContact: 'Le richieste per entrambi i negozi passano dal numero di LZFortuna-store.',
    footer: 'Sartoria e riparazioni nella tua zona.',
  },
  zh: {
    tagline: '您身边的裁缝店',
    navServices: '服务',
    navStores: '门店',
    navContact: '联系',
    heroKicker: 'Cologno Monzese · Calusco',
    heroTitle: '改衣缝补，',
    heroTitleAccent: '就在您身边。',
    heroText: '本地裁缝服务：修改衣长、修补衣服和日常改衣。欢迎到店，也可以直接打电话或发 WhatsApp。',
    contactWhatsApp: 'WhatsApp 咨询',
    contactPhone: '拨打电话',
    directContact: '咨询与预约',
    directContactShop: '统一联系新店 LZFortuna-store',
    servicesEyebrow: '我们的服务',
    servicesTitle: '让您的衣服重新合身。',
    servicesIntro: '修改、缝补和其他衣物需求。无需网上下单，直接联系我们。',
    service1: '改裤脚与衣长',
    service1Desc: '修改裤子、裙子等衣物的长度。',
    service2: '衣物修补',
    service2Desc: '补衣服、修补开线和日常缝补。',
    service3: '其他改衣需求',
    service3Desc: '告诉我们需要修改什么，当面或电话沟通。',
    storesEyebrow: '门店位置',
    storesTitle: '两家本地门店。',
    storesIntro: '无论咨询哪家店，均请使用新店 LZFortuna-store 的电话。',
    newStore: '新店 · 主要预约联系方式',
    oldStore: '老店',
    hours: '营业时间',
    addressPending: '详细地址请电话咨询',
    contactFromStore: '联系咨询',
    contactEyebrow: '联系很简单',
    contactTitle: '有衣服需要修改吗？',
    contactIntro: '拨打电话或发 WhatsApp 即可。不用注册，也不用网上下单。',
    allContact: '两家店的咨询均通过新店 LZFortuna-store 的号码。',
    footer: '本地裁缝与衣物修补服务。',
  },
  en: {
    tagline: 'YOUR LOCAL TAILOR',
    navServices: 'Services',
    navStores: 'Shops',
    navContact: 'Contact',
    heroKicker: 'Cologno Monzese · Calusco',
    heroTitle: 'Clothes that fit,',
    heroTitleAccent: 'care that lasts.',
    heroText: 'Friendly local tailoring, clothing repairs and alterations. Visit us in person or get in touch directly.',
    contactWhatsApp: 'Message on WhatsApp',
    contactPhone: 'Call us',
    directContact: 'For information and appointments',
    directContactShop: 'One contact: LZFortuna-store',
    servicesEyebrow: 'WHAT WE DO',
    servicesTitle: 'A little help for your clothes.',
    servicesIntro: 'Alterations, repairs and other requests discussed directly — no online ordering.',
    service1: 'Hems and lengths',
    service1Desc: 'Shortening trousers, skirts and other clothing.',
    service2: 'Clothing repairs',
    service2Desc: 'Mending seams, small tears and everyday repairs.',
    service3: 'Other alterations',
    service3Desc: 'Tell us what you need and we will discuss the options.',
    storesEyebrow: 'FIND US',
    storesTitle: 'Two neighbourhood shops.',
    storesIntro: 'For either location, please contact LZFortuna-store for information and appointments.',
    newStore: 'NEW SHOP · APPOINTMENT CONTACT',
    oldStore: 'ESTABLISHED SHOP',
    hours: 'Hours',
    addressPending: 'Ask us for the exact street address',
    contactFromStore: 'Get in touch',
    contactEyebrow: 'GET IN TOUCH',
    contactTitle: 'Need something altered?',
    contactIntro: 'Call or send us a WhatsApp message. No sign-up or online checkout.',
    allContact: 'All inquiries for both shops use the LZFortuna-store phone number.',
    footer: 'Local tailoring and repairs.',
  },
} as const;

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="21" height="21">
      <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="22" height="22">
      <path d="M12.02 2a9.93 9.93 0 0 0-8.55 15.04 9.87 9.87 0 0 0-1.19 9.85L1 23l6.38-1.67a10.04 10.04 0 0 0 4.63 1.17h.01a10.25 10.25 0 0 0 0-20.5Zm0 18.68a8.44 8.44 0 0 1-4.3-1.17l-.3-.18-3.78.99 1.01-3.68-.2-.32a8.54 8.54 0 1 1 7.57 4.36Zm4.68-6.39c-.26-.13-1.52-.75-1.75-.84-.24-.08-.4-.12-.58.13-.17.25-.66.84-.81 1.01-.15.17-.3.19-.56.06-.26-.13-1.08-.4-2.06-1.28-.76-.68-1.27-1.52-1.42-1.78-.15-.26-.02-.4.12-.53.12-.12.26-.3.4-.46.13-.15.18-.25.27-.43.09-.17.04-.32-.02-.46-.07-.13-.58-1.4-.79-1.91-.21-.5-.42-.43-.58-.44h-.49c-.17 0-.46.06-.7.32-.24.26-.91.89-.91 2.17 0 1.28.93 2.52 1.06 2.69.13.17 1.84 2.81 4.45 3.94.62.27 1.11.43 1.49.56.63.2 1.2.17 1.65.1.5-.07 1.52-.62 1.74-1.22.21-.6.21-1.11.15-1.22-.07-.1-.24-.17-.5-.3Z" />
    </svg>
  );
}

export default function HomePage() {
  const [locale, setLocale] = useState<Locale>('it');
  const t = messages[locale];

  const whatsappLink = site.whatsapp;
  const telLink = `tel:${site.phone}`;

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <a className="identity" href="#top" aria-label="LZFortuna-store">
            <span className="identity-mark" aria-hidden="true">L</span>
            <span className="identity-text">LZFortuna-<span>store</span></span>
          </a>
          <nav aria-label={locale === 'it' ? 'Navigazione principale' : 'Navigation'} className="navigation">
            <a href="#services">{t.navServices}</a>
            <a href="#stores">{t.navStores}</a>
            <a href="#contact">{t.navContact}</a>
          </nav>
          <label className="language">
            <span className="visually-hidden">Lingua / 语言 / Language</span>
            <select
              value={locale}
              onChange={(event) => setLocale(event.target.value as Locale)}
              aria-label="Lingua / 语言 / Language"
            >
              <option value="it">IT</option>
              <option value="zh">中文</option>
              <option value="en">EN</option>
            </select>
          </label>
        </div>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-heading">
          <div className="container hero-content">
            <div className="hero-copy">
              <p className="eyebrow"><span className="eyebrow-line" />{t.tagline}</p>
              <p className="hero-location">{t.heroKicker}</p>
              <h1 id="hero-heading">{t.heroTitle}<br /><em>{t.heroTitleAccent}</em></h1>
              <p className="hero-description">{t.heroText}</p>
              <div className="action-group">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="button button-primary"><WhatsAppIcon />{t.contactWhatsApp}</a>
                <a href={telLink} className="button button-outline"><span aria-hidden="true">☎</span>{t.contactPhone}</a>
              </div>
              <p className="hero-note">{t.directContact} <strong>{site.displayPhone}</strong></p>
            </div>
            <div className="hero-art" aria-hidden="true">
              <div className="art-thread art-thread-a" />
              <div className="art-thread art-thread-b" />
              <div className="art-circle">
                <span className="art-script">Luisa</span>
                <span className="art-divider" />
                <span className="art-script art-script-lower">Moda</span>
              </div>
              <span className="art-label">CURATED WITH CARE · EST. LOCAL</span>
            </div>
          </div>
        </section>

        <section className="section services" id="services" aria-labelledby="services-heading">
          <div className="container">
            <p className="section-eyebrow">{t.servicesEyebrow}</p>
            <h2 id="services-heading">{t.servicesTitle}</h2>
            <p className="section-description">{t.servicesIntro}</p>
            <div className="service-grid">
              {[
                { id: '01', title: t.service1, description: t.service1Desc, motif: '—' },
                { id: '02', title: t.service2, description: t.service2Desc, motif: '✳' },
                { id: '03', title: t.service3, description: t.service3Desc, motif: '✦' },
              ].map((item) => (
                <article className="service-card" key={item.id}>
                  <div className="card-top"><span>{item.id}</span><span className="card-motif" aria-hidden="true">{item.motif}</span></div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section locations" id="stores" aria-labelledby="stores-heading">
          <div className="container">
            <p className="section-eyebrow">{t.storesEyebrow}</p>
            <h2 id="stores-heading">{t.storesTitle}</h2>
            <p className="section-description">{t.storesIntro}</p>
            <div className="location-grid">
              {site.stores.map((store) => (
                <article className={store.mainContact ? 'location-card location-card-featured' : 'location-card'} key={store.id}>
                  <div className="location-card-head">
                    <span className="location-badge">{store.mainContact ? t.newStore : t.oldStore}</span>
                    <span className="location-spark" aria-hidden="true">✳</span>
                  </div>
                  <h3>{store.name}</h3>
                  <p className="location-city">{store.city}</p>
                  <div className="location-information">
                    <p className="info-title">{t.hours}</p>
                    <p className="info-value">{store.hours}</p>
                    {store.address ? <p className="location-address">{store.address}</p> : <p className="location-address">{t.addressPending}</p>}
                  </div>
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="location-link">
                    {t.contactFromStore} <ArrowIcon />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact" aria-labelledby="contact-heading">
          <div className="container contact-inner">
            <div>
              <p className="section-eyebrow">{t.contactEyebrow}</p>
              <h2 id="contact-heading">{t.contactTitle}</h2>
              <p className="contact-description">{t.contactIntro}</p>
              <p className="contact-detail">{t.directContactShop}</p>
              <a className="contact-number" href={telLink}>{site.displayPhone}</a>
            </div>
            <div className="contact-actions">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="button button-primary"><WhatsAppIcon />{t.contactWhatsApp}</a>
              <a href={telLink} className="button button-outline"><span aria-hidden="true">☎</span>{t.contactPhone}</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div><strong>LZFortuna-store</strong> · Cologno Monzese <span className="footer-dot">·</span> <strong>Luisa Moda</strong> · Calusco</div>
          <div>{t.footer}</div>
        </div>
      </footer>
    </>
  );
}
