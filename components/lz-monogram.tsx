type LZMonogramProps = {
  className?: string;
  decorative?: boolean;
};

// Original vector monogram based on the approved LZ FORTUNA concept.
// Paths ensure it renders consistently without loading an external font.
export function LZMonogram({ className, decorative = true }: LZMonogramProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 88"
      fill="currentColor"
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : 'LZ FORTUNA'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15 10H44V14H39V66H60V55H64V71H15V67H21V14H15Z" />
      <path d="M46 17H88V22L57 65H83V54H88V71H45V67L77 22H51V33H46Z" />
      <path d="M20 72C34 76 46 79 58 74" fill="none" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}
