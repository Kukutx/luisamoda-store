'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Header from '@/components/user/Header';
import { ROUTES, CONTACT } from '@/lib/constants';

export default function SewingServicePage() {
  const t = useTranslations('Services.sewing');
  const tBack = useTranslations('Services');

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-black selection:text-white">
      <Header />

      <main className="container mx-auto px-6 md:px-10 pt-28 pb-20 max-w-3xl">
        <div className="mb-8 reveal">
          <Link
            href={ROUTES.HOME}
            className="text-sm text-foreground/30 hover:text-foreground tracking-mega uppercase transition-colors"
          >
            ← {tBack('backToHome')}
          </Link>
        </div>

        <div className="space-y-24 reveal reveal-delay-1">
          <div className="border-b border-black/5 pb-10">
            <h1 className="font-serif text-5xl md:text-6xl text-foreground tracking-widest uppercase italic leading-tight mb-8">
              {t('title')}
            </h1>
            <p className="text-foreground/50 text-sm leading-relaxed max-w-xl">
              {t('intro')}
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-foreground/40 text-sm tracking-widest uppercase font-light">
              {t('process')}
            </p>
          </div>

          <div className="pt-6 border-t border-black/5 space-y-8">
            <p className="text-foreground/30 text-sm tracking-mega uppercase font-medium">
              {t('contactCta')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-4">
                <span className="text-foreground/20 text-xs tracking-mega uppercase font-bold">WeChat</span>
                <p className="text-foreground font-serif text-xl tracking-widest italic">{CONTACT.WECHAT}</p>
              </div>
              <div className="space-y-4">
                <span className="text-foreground/20 text-xs tracking-mega uppercase font-bold">WhatsApp</span>
                <a
                  href={CONTACT.WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-foreground hover:opacity-50 text-sm tracking-widest font-bold transition-opacity underline decoration-black/10 underline-offset-4 uppercase"
                >
                  {t('contactCta')} →
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
