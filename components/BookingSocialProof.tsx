'use client';

import { useEffect, useState } from 'react';

type Props = {
  count?: number;
  text?: string;
  verifiedText?: string;
  delaySeconds?: number;
};

// Social-proof toast (bottom-left) on the booking page.
export default function BookingSocialProof({
  count = 8,
  text = 'requested a free consultation with us in the last 24 hours',
  verifiedText = 'verified by Calendly',
  delaySeconds = 2.5,
}: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setOpen(true), delaySeconds * 1000);
    return () => window.clearTimeout(t);
  }, [delaySeconds]);

  if (!open) return null;

  return (
    <div className="proof" role="status">
      <div className="proof__icon">
        <img src="/images/booking/proof-calendar.png" alt="" />
      </div>

      <div className="proof__body">
        <p className="proof__text">
          <span className="proof__strong">{count} people</span>{' '}
          <span className="proof__muted">{text}</span>
        </p>
        <span className="proof__verified">
          <img src="/images/booking/verified-badge.png" alt="" />
          {verifiedText}
        </span>
      </div>

      <button type="button" className="proof__close" aria-label="Dismiss" onClick={() => setOpen(false)}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M5.78508 6.53694L8.72257 9.47444C8.85018 9.60205 9.05704 9.60205 9.18459 9.47444L9.47444 9.18459C9.60205 9.05704 9.60205 8.85018 9.47444 8.72257L6.53694 5.78508L9.47444 2.84758C9.60205 2.72 9.60205 2.51314 9.47444 2.38556L9.18459 2.09569C9.05704 1.9681 8.85018 1.9681 8.72257 2.09569L5.78508 5.03318L2.84758 2.09569C2.72 1.9681 2.51314 1.9681 2.38556 2.09569L2.09569 2.38556C1.9681 2.51314 1.9681 2.72 2.09569 2.84758L5.03318 5.78508L2.09569 8.72257C1.9681 8.85018 1.9681 9.05704 2.09569 9.18459L2.38556 9.47444C2.51314 9.60205 2.72 9.60205 2.84758 9.47444L5.78508 6.53694Z" fill="#374151" />
        </svg>
      </button>
    </div>
  );
}
