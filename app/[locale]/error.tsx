'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ROUTES } from '@/lib/constants';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('Error');

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error(error);
    }
  }, [error]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center px-6 text-center">
      <p className="text-foreground/50 text-sm tracking-widest uppercase font-light mb-6">
        {t('heading')}
      </p>
      <p className="text-foreground/30 text-xs max-w-md mb-10">
        {t('message')}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="px-6 py-3 border border-foreground/20 text-foreground text-sm tracking-widest uppercase font-medium hover:border-foreground/40 transition-colors"
        >
          {t('retry')}
        </button>
        <Link
          href={ROUTES.HOME}
          className="px-6 py-3 bg-foreground text-background text-sm tracking-widest uppercase font-medium hover:opacity-90 transition-opacity"
        >
          {t('backHome')}
        </Link>
      </div>
    </div>
  );
}
