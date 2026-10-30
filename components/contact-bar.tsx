import { site } from '@/lib/site';

// Phone-only bar fixed to the bottom of the screen: chat or call with one thumb, on every page.
export function ContactBar() {
  return (
    <nav aria-label="Contatti rapidi"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-black/15 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden">
      <a href={site.whatsapp} target="_blank" rel="noopener noreferrer"
        className="flex min-h-16 items-center justify-center bg-foreground text-lg font-semibold text-background">
        WhatsApp
      </a>
      <a href={`tel:${site.phone}`} className="flex min-h-16 items-center justify-center text-lg font-semibold">
        Chiama
      </a>
    </nav>
  );
}
