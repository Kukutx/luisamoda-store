'use client';

import { useEffect, useState } from 'react';
import { openStatus, type OpenInterval } from '@/lib/hours';

// "Aperto ora / Chiuso ora" line under the opening hours. It is worked out in the
// visitor's browser (the page itself is static), so nothing shows until it is known.
export function OpenNow({ times }: { times: OpenInterval[] }) {
  const [status, setStatus] = useState<ReturnType<typeof openStatus>>(null);

  useEffect(() => {
    const update = () => setStatus(openStatus(times, new Date()));
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, [times]);

  if (!status) return null;
  return (
    <p className="mt-3 flex items-center gap-2 text-lg font-semibold leading-7">
      <span aria-hidden="true" className={`size-3 shrink-0 rounded-full ${status.open ? 'bg-green-700' : 'border-2 border-foreground/60'}`} />
      {status.text}
    </p>
  );
}
