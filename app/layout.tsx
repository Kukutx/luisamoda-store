import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import { site } from '@/lib/site';
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

export const metadata: Metadata = {
  title: 'LZFortuna-store e Luisa Moda | Sartoria e riparazioni',
  description:
    'Servizi di sartoria, riparazioni e modifiche a Cologno Monzese e Calusco. Contatta LZFortuna-store su WhatsApp o per telefono.',
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1c4b3c',
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
      availableLanguage: ['Italian', 'Chinese', 'English'],
    },
    subOrganization: site.stores.map((store) => ({
      '@type': 'LocalBusiness',
      name: store.name,
      address: {
        '@type': 'PostalAddress',
        addressLocality: store.city,
        addressCountry: 'IT',
      },
    })),
  };
  return (
    <html lang="it" className={`${inter.variable} ${cormorant.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
