'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter, getPathname } from '@/i18n/routing';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { logoutUser } from '@/lib/firebase/auth';
import { ROUTES } from '@/lib/constants';

export default function Header() {
  const t = useTranslations('Header');
  const locale = useLocale();
  const { user, userData } = useAuth();
  const { items } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAdmin = userData?.role === 'admin';
  const languages = [
    { code: 'zh', name: '中' },
    { code: 'en', name: 'EN' },
    { code: 'it', name: 'IT' },
  ];

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 ${isMobileMenuOpen ? 'z-80' : 'z-50'} transition-all duration-700 ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-2xl border-b border-black/5 py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Logo - More spacing */}
        <Link href="/" className="group relative flex items-center">
          <span className="font-serif text-2xl tracking-ultra uppercase text-foreground transition-all duration-500 group-hover:tracking-mega">
            Luisa <span className="font-light italic opacity-40">Moda</span>
          </span>
        </Link>

        {/* Desktop Nav - Focused & Clean */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href={ROUTES.HOME}
            className={`text-sm tracking-mega transition-all duration-500 uppercase flex items-center gap-3 group/item ${
              pathname === ROUTES.HOME ? 'text-foreground' : 'text-foreground/30 hover:text-foreground'
            }`}
          >
            <span className="relative">
              {t('index')}
              <span className={`absolute -bottom-1 left-0 w-full h-px bg-foreground transition-transform duration-500 origin-right ${pathname === ROUTES.HOME ? 'scale-x-100' : 'scale-x-0 group-hover/item:scale-x-100 group-hover/item:origin-left'}`} />
            </span>
          </Link>
          <a
            href={`${getPathname({ locale, href: ROUTES.HOME })}#products`}
            className="text-sm tracking-mega transition-all duration-500 uppercase flex items-center gap-3 group/item text-foreground/30 hover:text-foreground"
          >
            <span className="relative">
              {t('products')}
              <span className="absolute -bottom-1 left-0 w-full h-px bg-foreground transition-transform duration-500 origin-right scale-x-0 group-hover/item:scale-x-100 group-hover/item:origin-left" />
            </span>
          </a>
          <Link
            href={ROUTES.SERVICES.SEWING}
            className={`text-sm tracking-mega transition-all duration-500 uppercase flex items-center gap-3 group/item ${
              pathname === ROUTES.SERVICES.SEWING ? 'text-foreground' : 'text-foreground/30 hover:text-foreground'
            }`}
          >
            <span className="relative">
              {t('sewing')}
              <span className={`absolute -bottom-1 left-0 w-full h-px bg-foreground transition-transform duration-500 origin-right ${pathname === ROUTES.SERVICES.SEWING ? 'scale-x-100' : 'scale-x-0 group-hover/item:scale-x-100 group-hover/item:origin-left'}`} />
            </span>
          </Link>
          <Link
            href={ROUTES.SERVICES.PRINT3D}
            className={`text-sm tracking-mega transition-all duration-500 uppercase flex items-center gap-3 group/item ${
              pathname === ROUTES.SERVICES.PRINT3D ? 'text-foreground' : 'text-foreground/30 hover:text-foreground'
            }`}
          >
            <span className="relative">
              {t('print3d')}
              <span className={`absolute -bottom-1 left-0 w-full h-px bg-foreground transition-transform duration-500 origin-right ${pathname === ROUTES.SERVICES.PRINT3D ? 'scale-x-100' : 'scale-x-0 group-hover/item:scale-x-100 group-hover/item:origin-left'}`} />
            </span>
          </Link>
          <Link
            href={ROUTES.CART}
            className={`text-sm tracking-mega transition-all duration-500 uppercase flex items-center gap-3 group/item ${
              pathname === ROUTES.CART ? 'text-foreground' : 'text-foreground/30 hover:text-foreground'
            }`}
          >
            <span className="relative">
              {t('inquiry')}
              <span className={`absolute -bottom-1 left-0 w-full h-px bg-foreground transition-transform duration-500 origin-right ${pathname === ROUTES.CART ? 'scale-x-100' : 'scale-x-0 group-hover/item:scale-x-100 group-hover/item:origin-left'}`} />
            </span>
            {items.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-foreground text-background text-xs flex items-center justify-center font-bold animate-fade-in">
                {items.length}
              </span>
            )}
          </Link>
          
          {/* Language Switcher */}
          <div className="flex items-center gap-4 ml-8 border-l border-black/5 pl-8" role="group" aria-label="Language">
            {languages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => router.replace(pathname as Parameters<ReturnType<typeof useRouter>['replace']>[0], { locale: lang.code })}
                className={`text-xs tracking-widest transition-all ${
                  locale === lang.code ? 'text-foreground font-black' : 'text-foreground/20 hover:text-foreground'
                }`}
                aria-label={lang.code === 'zh' ? t('langZh') : lang.code === 'en' ? t('langEn') : t('langIt')}
                aria-current={locale === lang.code ? 'true' : undefined}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </nav>

        {/* User - Only show if absolutely identified, otherwise keep it purely clean */}
        <div className="hidden md:flex items-center gap-10">
          {user && (
            <div className="flex items-center gap-8">
              {isAdmin && (
                <Link 
                  href={ROUTES.ADMIN.ROOT}
                  className="px-4 py-1.5 border border-black/10 hover:border-black text-sm tracking-widest uppercase transition-all"
                >
                  {t('admin')}
                </Link>
              )}
              <span className="text-sm text-foreground/30 tracking-tight font-light uppercase">
                {userData?.displayName || user.email?.split('@')[0]}
              </span>
              <button 
                onClick={async () => {
                  await logoutUser();
                  router.push(ROUTES.HOME);
                }}
                className="text-sm text-foreground/20 hover:text-foreground tracking-widest transition-colors uppercase"
              >
                {t('signOut')}
              </button>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          className="md:hidden text-foreground/60 hover:text-foreground transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? t('menuClose') : t('menuOpen')}
          aria-controls="mobile-navigation-panel"
        >
          <div className="w-6 flex flex-col gap-1.5 items-end" aria-hidden="true">
            <span className={`h-px bg-current transition-all ${isMobileMenuOpen ? 'w-6 translate-y-2 rotate-45' : 'w-6'}`} />
            <span className={`h-px bg-current transition-all ${isMobileMenuOpen ? 'opacity-0' : 'w-4'}`} />
            <span className={`h-px bg-current transition-all ${isMobileMenuOpen ? 'w-6 -translate-y-2 -rotate-45' : 'w-5'}`} />
          </div>
        </button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-60 bg-white/72 backdrop-blur-md md:hidden"
            aria-label={t('menuClose')}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <nav
            id="mobile-navigation-panel"
            className="fixed inset-x-4 top-20 bottom-4 z-70 rounded-4xl border border-black/6 bg-white/95 shadow-[0_20px_80px_rgba(0,0,0,0.06)] backdrop-blur-xl md:hidden overflow-y-auto overscroll-contain animate-fade-in"
            aria-label="Main"
          >
            <div className="flex min-h-full flex-col">
              <div className="flex-1 px-5 py-7">
                <div className="flex flex-col gap-4">
                  <Link
                    href={ROUTES.HOME}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="group reveal rounded-2xl bg-black/2 px-5 py-4 text-foreground transition-opacity hover:opacity-60"
                  >
                    <span className="font-serif text-[1.7rem] tracking-[0.05em] leading-none">{t('index')}</span>
                  </Link>
                  <a
                    href={`${getPathname({ locale, href: ROUTES.HOME })}#products`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="group reveal rounded-2xl bg-black/2 px-5 py-4 text-foreground transition-opacity hover:opacity-60"
                    style={{ animationDelay: '0.05s' }}
                  >
                    <span className="font-serif text-[1.7rem] tracking-[0.05em] leading-none">{t('products')}</span>
                  </a>
                  <Link
                    href={ROUTES.SERVICES.SEWING}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="group reveal rounded-2xl bg-black/2 px-5 py-4 text-foreground transition-opacity hover:opacity-60"
                    style={{ animationDelay: '0.1s' }}
                  >
                    <span className="font-serif text-[1.7rem] tracking-[0.05em] leading-none">{t('sewing')}</span>
                  </Link>
                  <Link
                    href={ROUTES.SERVICES.PRINT3D}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="group reveal rounded-2xl bg-black/2 px-5 py-4 text-foreground transition-opacity hover:opacity-60"
                    style={{ animationDelay: '0.15s' }}
                  >
                    <span className="font-serif text-[1.7rem] tracking-[0.05em] leading-none">{t('print3d')}</span>
                  </Link>
                  <Link
                    href={ROUTES.CART}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="group reveal rounded-2xl bg-black/2 px-5 py-4 text-foreground transition-opacity hover:opacity-60"
                    style={{ animationDelay: '0.2s' }}
                  >
                    <span className="font-serif text-[1.7rem] tracking-[0.05em] leading-none">{t('inquiry')}</span>
                    {items.length > 0 && (
                      <span className="ml-3 inline-flex min-w-7 h-7 items-center justify-center rounded-full bg-foreground px-2 text-xs font-bold text-background">
                        {items.length}
                      </span>
                    )}
                  </Link>
                </div>
              </div>

              <div className="px-6 pb-7 pt-3 border-t border-black/5">
                <p className="mb-4 text-[11px] tracking-[0.35em] uppercase text-foreground/25">Language</p>
                <div className="flex items-center gap-3" role="group" aria-label="Language">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        router.replace(pathname as Parameters<ReturnType<typeof useRouter>['replace']>[0], { locale: lang.code });
                        setIsMobileMenuOpen(false);
                      }}
                      className={`inline-flex min-w-12 items-center justify-center rounded-full border px-4 py-2 text-sm tracking-widest transition-all ${
                        locale === lang.code
                          ? 'border-foreground bg-foreground text-background'
                          : 'border-black/10 text-foreground/50 hover:border-black/20 hover:text-foreground'
                      }`}
                      aria-label={lang.code === 'zh' ? t('langZh') : lang.code === 'en' ? t('langEn') : t('langIt')}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  );
}
