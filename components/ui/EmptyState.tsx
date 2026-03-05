'use client';

import Link from 'next/link';
import { ROUTES } from '@/lib/constants';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  icon?: React.ReactNode;
}

/**
 * A standardized empty state component for lists, carts, or results.
 */
export default function EmptyState({
  title,
  description,
  actionText,
  actionHref,
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center animate-reveal">
      {icon && <div className="mb-8 text-foreground/20">{icon}</div>}
      
      <h3 className="text-xl font-serif tracking-widest text-foreground mb-4 uppercase">
        {title}
      </h3>
      
      <p className="text-sm text-foreground/40 font-light max-w-sm mb-12 leading-relaxed">
        {description}
      </p>
      
      {actionText && actionHref && (
        <Link 
          href={actionHref}
          className="group relative inline-flex items-center px-8 py-3 bg-foreground text-background text-[11px] tracking-ultra uppercase transition-all duration-700 hover:pr-12"
        >
          <span>{actionText}</span>
          <span className="absolute right-4 opacity-0 group-hover:opacity-100 transition-all duration-700">
            →
          </span>
        </Link>
      )}
    </div>
  );
}
