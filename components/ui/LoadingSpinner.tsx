'use client';

/**
 * A standardized loading spinner for the application.
 * Follows the minimalist "reveal" aesthetic.
 */
export default function LoadingSpinner({ fullPage = false }: { fullPage?: boolean }) {
  const spinner = (
    <div className="flex flex-col items-center justify-center gap-6 animate-reveal">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-t border-black/10 rounded-full animate-spin" />
        <div className="absolute inset-0 border-t border-black/40 rounded-full animate-spin duration-1500" />
      </div>
      <span className="text-[10px] tracking-mega text-foreground/40 uppercase font-light">
        Curating Experience
      </span>
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 bg-white z-999 flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return (
    <div className="w-full py-20 flex items-center justify-center">
      {spinner}
    </div>
  );
}
