import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import { ContactBar } from '@/components/contact-bar';
import { site, fullAddress } from '@/lib/site';
import './globals.css';

// Restore the original storefront's two font families.
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-cormorant',
});

const title = 'LZ FORTUNA | Emporio di quartiere e sartoria';
const description =
  'LZ FORTUNA: abbigliamento, casa, cucina, cartoleria, cosmetici, giocattoli e sartoria. Oltre vent’anni di esperienza nel negozio storico. Contattaci su WhatsApp.';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  alternates: { canonical: '/' },
  openGraph: {
    title,
    description,
    url: site.url,
    siteName: site.name,
    locale: 'it_IT',
    type: 'website',
    images: [{ url: '/brand/og-image.png', width: 1200, height: 630, alt: 'LZ FORTUNA — Sartoria e servizi per il tuo stile' }],
  },
  icons: { icon: '/brand/icon.png', apple: '/brand/apple-touch-icon.png' },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: site.phone,
      contactType: 'customer service',
      availableLanguage: ['Italian'],
    },
    subOrganization: site.stores.map((store) => ({
      '@type': 'LocalBusiness',
      name: store.name,
      telephone: site.phone,
      ...(store.tiktok && { sameAs: [store.tiktok.url] }),
      address: {
        '@type': 'PostalAddress',
        ...(fullAddress(store) && { streetAddress: store.address, postalCode: store.postalCode }),
        addressLocality: store.city,
        addressRegion: store.province,
        addressCountry: 'IT',
      },
    })),
  };
  return (
    <html lang="it" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="pb-16 md:pb-0">
        <a href="#contenuto" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-foreground focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-background">
          Vai al contenuto
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
        <ContactBar />
      </body>
    </html>
  );
}
