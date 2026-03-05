'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
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
          ? 'bg-white/80 backdrop-blur-2xl border-b border-black/5 py-5' 
          : 'bg-transparent py-10'
      }`}
    >
      <div className="container mx-auto px-8 md:px-12 flex items-center justify-between">
        {/* Logo - More spacing */}
        <Link href="/" className="group relative flex items-center">
          <span className="font-serif text-2xl tracking-ultra uppercase text-foreground transition-all duration-500 group-hover:tracking-mega">
            Luisa <span className="font-light italic opacity-40">Moda</span>
          </span>
        </Link>

        {/* Desktop Nav - Focused & Clean */}
        <nav className="hidden md:flex items-center gap-16">
          {[
            { name: t('index'), path: ROUTES.HOME },
            { name: t('inquiry'), path: ROUTES.CART, count: items.length },
          ].map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-[9px] tracking-mega transition-all duration-500 uppercase flex items-center gap-3 group/item ${
                pathname === item.path ? 'text-foreground' : 'text-foreground/30 hover:text-foreground'
              }`}
            >
              <span className="relative">
                {item.name}
                <span className={`absolute -bottom-1 left-0 w-full h-px bg-foreground transition-transform duration-500 origin-right ${pathname === item.path ? 'scale-x-100' : 'scale-x-0 group-hover/item:scale-x-100 group-hover/item:origin-left'}`} />
              </span>
              {item.count !== undefined && item.count > 0 && (
                <span className="w-4 h-4 rounded-full bg-foreground text-background text-[8px] flex items-center justify-center font-bold animate-fade-in">
                  {item.count}
                </span>
              )}
            </Link>
          ))}
          
          {/* Language Switcher */}
          <div className="flex items-center gap-4 ml-8 border-l border-black/5 pl-8">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => router.replace(pathname as Parameters<ReturnType<typeof useRouter>['replace']>[0], { locale: lang.code })}
                className={`text-[8px] tracking-widest transition-all ${
                  locale === lang.code ? 'text-foreground font-black' : 'text-foreground/20 hover:text-foreground'
                }`}
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
                  className="px-4 py-1.5 border border-black/10 hover:border-black text-[9px] tracking-widest uppercase transition-all"
                >
                  {t('admin')}
                </Link>
              )}
              <span className="text-[9px] text-foreground/30 tracking-tight font-light uppercase">
                {userData?.displayName || user.email?.split('@')[0]}
              </span>
              <button 
                onClick={async () => {
                  await logoutUser();
                  router.push(ROUTES.HOME);
                }}
                className="text-[9px] text-foreground/20 hover:text-foreground tracking-widest transition-colors uppercase"
              >
                {t('signOut')}
              </button>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-foreground/60 hover:text-foreground transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="w-6 flex flex-col gap-1.5 items-end">
            <span className={`h-px bg-current transition-all ${isMobileMenuOpen ? 'w-6 translate-y-2 rotate-45' : 'w-6'}`} />
            <span className={`h-px bg-current transition-all ${isMobileMenuOpen ? 'opacity-0' : 'w-4'}`} />
            <span className={`h-px bg-current transition-all ${isMobileMenuOpen ? 'w-6 -translate-y-2 -rotate-45' : 'w-5'}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu - Immersive Light */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white/95 backdrop-blur-3xl z-40 flex flex-col items-center justify-center gap-12 animate-fade-in">
          {[
            { name: t('index'), path: ROUTES.HOME },
            { name: t('inquiry'), path: ROUTES.CART },
          ].map((item, idx) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-serif text-4xl tracking-widest text-foreground hover:opacity-50 transition-opacity reveal"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {item.name}
            </Link>
          ))}
          {/* Mobile Language Switcher */}
          <div className="flex items-center gap-8 mt-4">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  router.replace(pathname as Parameters<ReturnType<typeof useRouter>['replace']>[0], { locale: lang.code });
                  setIsMobileMenuOpen(false);
                }}
                className={`text-[10px] tracking-ultra transition-all ${
                  locale === lang.code ? 'text-foreground font-black underline underline-offset-8' : 'text-foreground/20'
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
          <div className="h-px w-8 bg-foreground/10 mt-8" />
        </div>
      )}
    </header>
  );
}
