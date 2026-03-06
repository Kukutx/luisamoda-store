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

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
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
        >
          <div className="w-6 flex flex-col gap-1.5 items-end" aria-hidden="true">
            <span className={`h-px bg-current transition-all ${isMobileMenuOpen ? 'w-6 translate-y-2 rotate-45' : 'w-6'}`} />
            <span className={`h-px bg-current transition-all ${isMobileMenuOpen ? 'opacity-0' : 'w-4'}`} />
            <span className={`h-px bg-current transition-all ${isMobileMenuOpen ? 'w-6 -translate-y-2 -rotate-45' : 'w-5'}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu - Immersive Light */}
      {isMobileMenuOpen && (
        <nav className="fixed inset-0 bg-white/95 backdrop-blur-3xl z-40 flex flex-col items-center justify-center gap-12 animate-fade-in" aria-label="Main">
          <Link href={ROUTES.HOME} onClick={() => setIsMobileMenuOpen(false)} className="font-serif text-4xl tracking-widest text-foreground hover:opacity-50 transition-opacity reveal">
            {t('index')}
          </Link>
          <a href={`${getPathname({ locale, href: ROUTES.HOME })}#products`} onClick={() => setIsMobileMenuOpen(false)} className="font-serif text-4xl tracking-widest text-foreground hover:opacity-50 transition-opacity reveal" style={{ animationDelay: '0.1s' }}>
            {t('products')}
          </a>
          <Link href={ROUTES.SERVICES.SEWING} onClick={() => setIsMobileMenuOpen(false)} className="font-serif text-4xl tracking-widest text-foreground hover:opacity-50 transition-opacity reveal" style={{ animationDelay: '0.2s' }}>
            {t('sewing')}
          </Link>
          <Link href={ROUTES.SERVICES.PRINT3D} onClick={() => setIsMobileMenuOpen(false)} className="font-serif text-4xl tracking-widest text-foreground hover:opacity-50 transition-opacity reveal" style={{ animationDelay: '0.3s' }}>
            {t('print3d')}
          </Link>
          <Link href={ROUTES.CART} onClick={() => setIsMobileMenuOpen(false)} className="font-serif text-4xl tracking-widest text-foreground hover:opacity-50 transition-opacity reveal" style={{ animationDelay: '0.4s' }}>
            {t('inquiry')}
          </Link>
          {/* Mobile Language Switcher */}
          <div className="flex items-center gap-8 mt-4" role="group" aria-label="Language">
            {languages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  router.replace(pathname as Parameters<ReturnType<typeof useRouter>['replace']>[0], { locale: lang.code });
                  setIsMobileMenuOpen(false);
                }}
                className={`text-sm tracking-ultra transition-all ${
                  locale === lang.code ? 'text-foreground font-black underline underline-offset-8' : 'text-foreground/20'
                }`}
                aria-label={lang.code === 'zh' ? t('langZh') : lang.code === 'en' ? t('langEn') : t('langIt')}
              >
                {lang.name}
              </button>
            ))}
          </div>
          <div className="h-px w-8 bg-foreground/10 mt-8" aria-hidden="true" />
        </nav>
      )}
    </header>
  );
}
