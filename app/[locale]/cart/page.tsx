'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, Link } from '@/i18n/routing';
import Image from 'next/image';
import Header from '@/components/user/Header';
import PageHeader from '@/components/ui/PageHeader';
import EmptyState from '@/components/ui/EmptyState';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { ROUTES } from '@/lib/constants';

export default function CartPage() {
  const t = useTranslations('Cart');
  const tProduct = useTranslations('Product');
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    if (items.length === 0) return;
    router.push(ROUTES.CHECKOUT);
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-black selection:text-white">
      <Header />

      <main className="container mx-auto px-8 md:px-12 pt-40 pb-32">
        <PageHeader 
          step="01 / Inquiry"
          title={t('title')}
        />

        {items.length === 0 ? (
          <EmptyState 
            title={t('emptyTitle')}
            description={t('emptyDescription')}
            actionText={t('startDiscovery')}
            actionHref={ROUTES.HOME}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 xl:gap-32">
            {/* List */}
            <div className="lg:col-span-8 space-y-16 reveal reveal-delay-1">
              {items.map((item) => (
                <div key={item.productId} className="flex flex-col sm:flex-row gap-12 group border-b border-black/5 pb-16 last:border-0">
                  {/* Image - Slim Portrait */}
                  <div className="relative w-full sm:w-48 aspect-2/3 shrink-0 bg-neutral-100 overflow-hidden">
                    <Image
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      fill
                      className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 grayscale-[0.1] group-hover:grayscale-0"
                      sizes="200px"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between py-2">
                    <div className="space-y-6">
                      <div className="flex justify-between items-start">
                        <Link href={{ pathname: '/products/[id]', params: { id: item.productId } }} className="font-serif text-3xl tracking-wider uppercase italic group-hover:opacity-50 transition-all duration-500 text-foreground">
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="text-sm text-foreground/20 hover:text-foreground transition-colors tracking-mega uppercase mt-2"
                        >
                          {t('dismiss')}
                        </button>
                      </div>
                      <p className="text-foreground/30 text-sm font-light tracking-widest uppercase max-w-md">{item.product.description}</p>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-8">
                      {/* Quantity - Clean */}
                      <div className="flex items-center gap-10">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="text-foreground/20 hover:text-foreground transition-colors p-1"
                        >
                           −
                        </button>
                        <span className="text-foreground text-xs font-mono w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="text-foreground/20 hover:text-foreground transition-colors p-1"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                         <p className="text-foreground font-bold text-xl tracking-tighter">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                        <p className="text-foreground/10 text-sm tracking-mega mt-2 uppercase">
                          {formatPrice(item.product.price)} {tProduct('unit')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-8">
                <button
                  onClick={clearCart}
                  className="text-sm text-foreground/10 hover:text-foreground/40 transition-colors tracking-mega uppercase"
                >
                  {t('clearList')}
                </button>
              </div>
            </div>

            {/* Summary - Minimalist Surface */}
            <div className="lg:col-span-4 lg:sticky lg:top-48 self-start space-y-16 reveal reveal-delay-2 p-8 border border-black/3 bg-neutral-50/50 backdrop-blur-sm">
              <div className="space-y-10 group/summary">
                 <span className="text-foreground/30 text-sm tracking-mega uppercase border-b border-black/10 pb-2">{t('summary')}</span>
                 <div className="space-y-6">
                    <div className="flex justify-between text-sm text-foreground/40 tracking-widest font-light">
                       <span className="uppercase">{t('collectionTotal')}</span>
                       <span>{formatPrice(getTotalPrice())}</span>
                    </div>
                    <div className="flex justify-between text-sm text-foreground/40 tracking-widest font-light">
                       <span className="uppercase">{t('deliveryFees')}</span>
                       <span className="italic opacity-50 underline decoration-black/10">{t('deliveryFees')}</span>
                    </div>
                    
                    <div className="pt-10 border-t border-black/5 flex justify-between items-baseline">
                       <span className="text-sm tracking-mega uppercase text-foreground font-black">{t('estTotal')}</span>
                       <span className="text-4xl font-black tracking-tighter text-foreground drop-shadow-sm transition-all group-hover/summary:tracking-normal duration-700">{formatPrice(getTotalPrice())}</span>
                    </div>
                 </div>
              </div>

              <div className="space-y-6">
                 <button
                    onClick={handleCheckout}
                    className="w-full bg-foreground text-background py-6 text-sm tracking-mega font-black uppercase transition-all hover:opacity-90 active:scale-95"
                  >
                    {t('confirmOrder')}
                  </button>
                  <p className="text-xs text-foreground/20 leading-relaxed text-center tracking-mega uppercase">
                    {t('negotiationNotice')}
                  </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
