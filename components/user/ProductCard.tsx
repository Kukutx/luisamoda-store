'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { ROUTES } from '@/lib/constants';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations('Product');

  return (
    <Link href={{ pathname: '/products/[id]', params: { id: product.id } }} className="group block">
      <div className="relative space-y-5 transition-all duration-1000">
        {/* Image - Immersive portrait */}
        <div className="relative w-full aspect-3/4 overflow-hidden bg-surface">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-1200 cubic-bezier(0.16, 1, 0.3, 1)"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          
          {/* Subtle Corner Gradient */}
          <div className="absolute inset-0 bg-linear-45 from-black/10 to-transparent to-40%" />
          
        {/* Status Overlay - Ultra Minimalist (Modified for Light) */}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
              <span className="text-foreground text-sm tracking-mega font-medium uppercase border-y border-black/10 py-2 px-6">
                {t('archived')}
              </span>
            </div>
          )}
        </div>

        {/* Info - Elegant Spacing */}
        <div className="space-y-4 px-1">
          <div className="flex flex-col gap-2">
            <h3 className="text-foreground font-serif text-xl tracking-widest transition-opacity group-hover:opacity-60 duration-700">
              {product.name}
            </h3>
            <p className="text-foreground/20 text-sm tracking-mega uppercase font-light">
              {t('seriesPiece')}
            </p>
          </div>
          
          <div className="pt-4 border-t border-black/5 flex justify-between items-baseline">
             <span className="text-foreground text-sm font-bold tracking-tighter">
              {formatPrice(product.price)}
            </span>
             {product.originalPrice && product.originalPrice > product.price && (
               <span className="text-foreground/20 text-sm line-through font-light">
                 {formatPrice(product.originalPrice)}
               </span>
             )}
          </div>
        </div>
      </div>
    </Link>
  );
}
