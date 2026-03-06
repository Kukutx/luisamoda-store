/**
 * Route-level loading UI. Shown while segment content is loading.
 */
export default function Loading() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 animate-reveal">
        <div className="w-10 h-10 border-t border-foreground/20 rounded-full animate-spin" />
        <span className="text-xs tracking-widest text-foreground/40 uppercase font-light">
          —
        </span>
      </div>
    </div>
  );
}
