'use client';

import { useCallback, useEffect, useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Header from '@/components/user/Header';
import ProductCard from '@/components/user/ProductCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import EmptyState from '@/components/ui/EmptyState';
import Image from 'next/image';
import { getProducts, getCategories } from '@/lib/firebase/firestore';
import { Product, Category } from '@/types';
import { useAsyncData } from '@/hooks/useAsyncData';
import { ROUTES, HOME_SECTION_IMAGES } from '@/lib/constants';

export default function HomePage() {
  const tHero = useTranslations('Hero');
  const tCollection = useTranslations('Collection');
  const tFooter = useTranslations('Footer');
  const tHeader = useTranslations('Header');
  const tHome = useTranslations('Home');

  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  // Use the new useAsyncData hook for cleaner async logic
  const { data: products, loading: productsLoading, execute: loadProducts } = useAsyncData(getProducts);
  const { data: categories, loading: categoriesLoading, execute: loadCategories } = useAsyncData(getCategories);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    loadProducts(selectedCategory || undefined);
  }, [selectedCategory, loadProducts]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const loading = productsLoading || categoriesLoading;

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-black selection:text-white">
      <Header />

      {/* Hero - 略收紧留白 */}
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden py-16">
        <div className="absolute inset-0 bg-radial-[circle_at_50%_0%] from-black/2 to-transparent to-50%" />
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
           <div className="w-[120vw] h-[120vw] border border-black/5 rounded-full absolute -top-1/2 animate-reveal" />
           <div className="w-[80vw] h-[80vw] border border-black/3 rounded-full absolute -top-1/4 animate-reveal delay-500" />
        </div>
        
        <div className="relative z-10 text-center space-y-8 px-6">
          <div className="space-y-4 reveal">
            <h1 className="font-serif text-6xl md:text-8xl font-light text-foreground tracking-widest leading-none">
              {tHero('title')} <span className="font-light italic opacity-10">{tHero('year')}</span>
            </h1>
            <div className="h-0.5 w-24 bg-foreground/10 mx-auto" />
          </div>
          
          <div className="reveal reveal-delay-1 flex flex-col items-center gap-6">
            <p className="text-foreground/40 text-sm tracking-[0.6em] uppercase font-light max-w-lg leading-relaxed text-balance">
               {tHero('description')}
            </p>
            <p className="text-foreground/30 text-xs tracking-mega uppercase font-light max-w-md text-center">
              {tHero('businessModel')}
            </p>
            <a
              href="#products"
              className="group relative px-12 py-4 bg-foreground text-background text-sm tracking-ultra uppercase font-extrabold transition-all hover:px-14 hover:opacity-90 active:scale-95"
            >
              {tHero('collection')}
            </a>
          </div>
        </div>
        
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 reveal reveal-delay-2">
           <div className="h-10 w-px bg-linear-to-b from-foreground/20 to-transparent" />
           <span className="text-xs tracking-widest text-foreground/20 uppercase" aria-hidden="true">{tHero('scroll')}</span>
        </div>
      </section>

      {/* Three sections - 百货 · 缝纫 · 3D（图为主、一眼就懂） */}
      <section className="container mx-auto px-6 md:px-10 py-14 md:py-20 border-t border-black/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          <a
            href="#products"
            className="group block border border-black/5 hover:border-black/15 transition-all duration-500 reveal overflow-hidden"
          >
            <div className="relative w-full aspect-[4/3] bg-neutral-100 overflow-hidden">
              <Image
                src={HOME_SECTION_IMAGES.PRODUCTS}
                alt={tHome('sectionProducts')}
                priority
                fill
                className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            <div className="p-5 md:p-6 text-center md:text-left">
              <h2 className="font-serif text-xl md:text-2xl text-foreground tracking-widest uppercase italic mb-3 group-hover:opacity-70 transition-opacity">
                {tHome('sectionProducts')}
              </h2>
              <p className="text-foreground/40 text-sm tracking-widest uppercase font-light mb-4 leading-relaxed">
                {tHome('sectionProductsDesc')}
              </p>
              <span className="text-foreground/50 text-xs tracking-mega uppercase font-bold group-hover:text-foreground transition-colors">
                {tHome('ctaProducts')} →
              </span>
            </div>
          </a>
          <Link
            href={ROUTES.SERVICES.SEWING}
            className="group block border border-black/5 hover:border-black/15 transition-all duration-500 reveal reveal-delay-1 overflow-hidden"
          >
            <div className="relative w-full aspect-[4/3] bg-neutral-100 overflow-hidden">
              <Image
                src={HOME_SECTION_IMAGES.SEWING}
                alt={tHome('sectionSewing')}
                fill
                className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            <div className="p-5 md:p-6 text-center md:text-left">
              <h2 className="font-serif text-xl md:text-2xl text-foreground tracking-widest uppercase italic mb-3 group-hover:opacity-70 transition-opacity">
                {tHome('sectionSewing')}
              </h2>
              <p className="text-foreground/40 text-sm tracking-widest uppercase font-light mb-4 leading-relaxed">
                {tHome('sectionSewingDesc')}
              </p>
              <span className="text-foreground/50 text-xs tracking-mega uppercase font-bold group-hover:text-foreground transition-colors">
                {tHome('ctaSewing')} →
              </span>
            </div>
          </Link>
          <Link
            href={ROUTES.SERVICES.PRINT3D}
            className="group block border border-black/5 hover:border-black/15 transition-all duration-500 reveal reveal-delay-2 overflow-hidden"
          >
            <div className="relative w-full aspect-[4/3] bg-neutral-100 overflow-hidden">
              <Image
                src={HOME_SECTION_IMAGES.PRINT3D}
                alt={tHome('sectionPrint3d')}
                fill
                className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            <div className="p-5 md:p-6 text-center md:text-left">
              <h2 className="font-serif text-xl md:text-2xl text-foreground tracking-widest uppercase italic mb-3 group-hover:opacity-70 transition-opacity">
                {tHome('sectionPrint3d')}
              </h2>
              <p className="text-foreground/40 text-sm tracking-widest uppercase font-light mb-4 leading-relaxed">
                {tHome('sectionPrint3dDesc')}
              </p>
              <span className="text-foreground/50 text-xs tracking-mega uppercase font-bold group-hover:text-foreground transition-colors">
                {tHome('ctaPrint3d')} →
              </span>
            </div>
          </Link>
        </div>
      </section>

      <main className="container mx-auto px-6 md:px-10 py-16 md:py-24" id="products">

        {/* Categories & Filter */}
        <div className="mb-16 reveal">
          <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-10">
            <div className="space-y-3">
               <span className="text-foreground/20 text-sm tracking-mega uppercase font-medium">{tCollection('volume')}</span>
               <h2 className="font-serif text-4xl md:text-5xl text-foreground tracking-widest uppercase italic">{tCollection('title')}</h2>
            </div>
            
            <div className="w-full lg:w-auto flex flex-col gap-6 lg:items-end">
              <input
                type="text"
                placeholder={tCollection('searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-b border-foreground/10 text-foreground placeholder-foreground/20 px-0 py-3 w-full lg:w-80 focus:outline-none focus:border-foreground/40 transition-all text-sm tracking-mega"
              />
              <div className="flex gap-6 flex-wrap text-foreground/30">
                <button
                  onClick={() => setSelectedCategory('')}
className={`text-sm tracking-mega transition-all uppercase relative py-2 ${
                  selectedCategory === '' ? 'text-foreground font-bold' : 'hover:text-foreground'
                  }`}
                >
                  {tCollection('all')}
                  {selectedCategory === '' && <span className="absolute bottom-0 left-0 w-full h-px bg-foreground animate-fade-in" />}
                </button>
                {categories?.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`text-sm tracking-mega transition-all uppercase relative py-2 ${
                      selectedCategory === category.id ? 'text-foreground font-bold' : 'hover:text-foreground'
                    }`}
                  >
                    {category.name}
                    {selectedCategory === category.id && <span className="absolute bottom-0 left-0 w-full h-px bg-foreground animate-fade-in" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <LoadingSpinner />
        ) : filteredProducts.length === 0 ? (
          <EmptyState 
            title={tCollection('noPiecesFound')}
            description={tCollection('noPiecesDescription')}
            actionText={tCollection('clearFilter')}
            actionHref={ROUTES.HOME}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-14 reveal reveal-delay-1">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      {/* Footer - Symmetrical & Clean */}
      <footer className="border-t border-black/5 py-16 md:py-20 bg-neutral-50/30">
        <div className="container mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="space-y-4">
              <p className="font-serif text-2xl text-foreground tracking-[0.3em] uppercase">{tFooter('brand')}</p>
              <p className="text-foreground/40 text-sm tracking-mega uppercase max-w-sm leading-relaxed">
                {tFooter('description')}
              </p>
              <p className="text-foreground/30 text-xs tracking-mega uppercase max-w-sm leading-relaxed">
                {tFooter('businessModel')}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-x-12 gap-y-6">
               <div className="space-y-4">
                  <span className="text-foreground/10 text-sm tracking-mega uppercase font-bold">{tFooter('nav')}</span>
                  <div className="flex flex-col gap-3 text-sm tracking-widest text-foreground/40 uppercase">
                    <Link href={ROUTES.HOME} className="hover:text-foreground transition-colors">{tHeader('index')}</Link>
                    <a href="#products" className="hover:text-foreground transition-colors">{tHeader('products')}</a>
                    <Link href={ROUTES.SERVICES.SEWING} className="hover:text-foreground transition-colors">{tHeader('sewing')}</Link>
                    <Link href={ROUTES.SERVICES.PRINT3D} className="hover:text-foreground transition-colors">{tHeader('print3d')}</Link>
                    <Link href={ROUTES.CART} className="hover:text-foreground transition-colors">{tHeader('inquiry')}</Link>
                  </div>
               </div>
               <div className="space-y-4">
                  <span className="text-foreground/10 text-sm tracking-mega uppercase font-bold">{tFooter('legal')}</span>
                  <div className="flex flex-col gap-3 text-sm tracking-widest text-foreground/40 uppercase font-light">
                    <span>{tFooter('privacy')}</span>
                    <span>{tFooter('terms')}</span>
                    <span>© {tHero('year')}</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
