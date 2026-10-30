import Link from 'next/link';
import { site } from '@/lib/site';

// Shared header and footer for the inner pages (/sartoria/, /prodotti/).
export function SubpageHeader() {
  return (
    <header className="border-b border-black/10 bg-white">
      <div className="container mx-auto flex min-h-20 items-center justify-between gap-2 px-3 py-3 sm:gap-5 sm:px-6 md:px-10">
        <Link href="/" aria-label="LZ FORTUNA — Torna alla home"
          className="shrink-0 font-serif text-[clamp(1.1rem,3vw,2rem)] tracking-[0.04em] sm:tracking-[0.065em]">
          LZ <span className="italic">FORTUNA</span>
        </Link>
        <div className="flex shrink-0 items-center gap-2 sm:gap-5">
          <Link href="/" className="py-3 text-xs font-semibold uppercase tracking-[0.15em] text-foreground/75 hover:text-foreground sm:tracking-[0.24em]">
            ← <span className="hidden sm:inline">HOME</span>
          </Link>
          <a href={site.whatsapp} target="_blank" rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center bg-black px-2 text-[10px] font-bold uppercase text-white hover:bg-neutral-800 sm:px-5 sm:text-xs">
            WHATSAPP <span className="hidden sm:inline">↗</span>
          </a>
        </div>
      </div>
    </header>
  );
}

export function SubpageFooter() {
  return (
    <footer className="border-t border-black/10 py-9">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-6 md:px-10">
        <p className="font-serif text-xl italic tracking-[0.07em]">LZ FORTUNA</p>
        <Link href="/" className="text-sm uppercase tracking-[0.18em] text-foreground/75 hover:text-foreground">
          TORNA ALLA HOME ↑
        </Link>
      </div>
    </footer>
  );
}
