'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, Link } from '@/i18n/routing';
import Image from 'next/image';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/lib/constants';

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const t = useTranslations('Product');
  const tHeader = useTranslations('Header');
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const { user } = useAuth();

  const handleAddToCart = () => {
    if (!user) {
      router.push(ROUTES.LOGIN);
      return;
    }
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <div className="mb-20 flex items-center gap-4 text-sm text-foreground/20 tracking-mega uppercase animate-reveal">
        <Link href="/" className="hover:text-foreground transition-colors uppercase">{tHeader('index')}</Link>
        <span className="opacity-30">/</span>
        <span className="text-foreground/40">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 xl:gap-32">
        <div className="lg:col-span-7 bg-neutral-50 flex items-center justify-center overflow-hidden animate-reveal">
          <div className="relative w-full aspect-3/4">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover opacity-95 transition-all duration-1000 grayscale-[0.2] hover:grayscale-0"
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority
            />
            <div className="absolute inset-0 bg-linear-45 from-black/2 to-transparent to-50%" />
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col justify-start space-y-16 animate-reveal" style={{ animationDelay: '0.2s' }}>
          <div className="space-y-8 pb-16 border-b border-black/5">
            {product.categoryName && (
              <p className="text-foreground/20 text-sm tracking-mega uppercase font-medium">{product.categoryName} Series</p>
            )}
            <h1 className="font-serif text-5xl xl:text-7xl text-foreground leading-tight tracking-wider uppercase italic">
              {product.name}
            </h1>
            
            <div className="flex items-baseline gap-8 pt-4">
              <span className="text-3xl font-bold text-foreground tracking-tighter">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xl text-foreground/10 line-through font-light decoration-foreground/20">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-16">
             <div className="space-y-6">
                <span className="text-sm text-foreground/40 tracking-mega uppercase font-bold">{t('concept')}</span>
                <p className="text-foreground/50 text-sm leading-relaxed font-light max-w-md">
                  {product.description}
                </p>
             </div>

             {product.stock > 0 ? (
               <div className="space-y-12">
                 <div className="flex items-center justify-between py-6 border-y border-black/5">
                   <span className="text-sm text-foreground/30 tracking-mega uppercase">{t('quantity')}</span>
                   <div className="flex items-center gap-10">
                     <button
                       onClick={() => setQuantity(Math.max(1, quantity - 1))}
                       className="text-foreground/30 hover:text-foreground transition-colors px-2 text-xl"
                     >
                       −
                     </button>
                     <span className="text-foreground text-xs font-mono w-6 text-center">{quantity}</span>
                     <button
                       onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                       className="text-foreground/30 hover:text-foreground transition-colors px-2 text-xl"
                     >
                       +
                     </button>
                   </div>
                 </div>

                 <button
                   onClick={handleAddToCart}
                   className={`w-full py-6 text-sm tracking-mega uppercase font-extrabold transition-all duration-700 border ${
                     added
                       ? 'bg-transparent border-black text-black'
                       : 'bg-foreground text-background border-foreground hover:bg-transparent hover:text-foreground shadow-premium'
                   }`}
                 >
                   {added ? t('added').toUpperCase() : t('addInquiry').toUpperCase()}
                 </button>
               </div>
             ) : (
               <div className="w-full py-6 text-sm tracking-mega border border-black/10 text-foreground/20 text-center uppercase font-mono">
                 Piece currently {t('archived')}
               </div>
             )}
          </div>
          
          <p className="text-xs text-foreground/10 tracking-mega uppercase pt-10 font-mono">
             Artisan Piece No. {product.id.toString().slice(-4).toUpperCase()}
          </p>
        </div>
      </div>
    </>
  );
}
