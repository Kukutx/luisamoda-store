import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { ROUTES } from '@/lib/constants';

/**
 * 404 page for unknown routes under [locale].
 */
export default async function NotFound() {
  const t = await getTranslations('NotFound');
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <p className="font-serif text-6xl md:text-8xl font-light text-foreground/10 tracking-widest italic mb-4">
        {t('code')}
      </p>
      <p className="text-foreground/50 text-sm tracking-widest uppercase font-light mb-2">
        {t('heading')}
      </p>
      <p className="text-foreground/30 text-xs max-w-sm mb-10">
        {t('message')}
      </p>
      <Link
        href={ROUTES.HOME}
        className="inline-flex items-center px-8 py-3 bg-foreground text-background text-sm tracking-widest uppercase font-medium hover:opacity-90 transition-opacity"
      >
        {t('backHome')}
      </Link>
    </div>
  );
}
