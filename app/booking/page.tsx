import type { Metadata } from 'next';
import BookingTimer from '@/components/BookingTimer';
import LeaveSitePopup from '@/components/LeaveSitePopup';
import BookingSocialProof from '@/components/BookingSocialProof';
import { fetchSanity, urlForImage } from '@/lib/sanity';

export const revalidate = 60;

const bookingQuery = `*[_type == "bookingPage"][0]{
  metaTitle, progressLabel, progressPercent, titleLead, titleRest, calendlyImage,
  barText, timerMinutes,
  proofCount, proofText, proofVerifiedText, proofDelaySeconds,
  leaveTitle, leaveText, leaveCancelText, leaveConfirmText, leaveDelaySeconds
}`;

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchSanity<any>(bookingQuery);
  return {
    title: page?.metaTitle || 'Book Consultation | Accelerate B2B',
    robots: { index: false, follow: false },
  };
}

export default async function BookingPage() {
  const page = await fetchSanity<any>(bookingQuery);
  const pct = page?.progressPercent ?? 95;
  const calendlySrc = page?.calendlyImage
    ? urlForImage(page.calendlyImage).width(1000).url()
    : '/images/booking/calendly-placeholder.png';

  return (
    <main className="booking">
      <div className="booking__inner">
        {/* Progress bar */}
        <div className="booking__progress" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <div className="booking__progress-fill" style={{ width: `${pct}%` }}>
            <span className="booking__progress-label">{page?.progressLabel || 'Almost Done'}</span>
            <span className="booking__progress-pct">{pct}%</span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="booking__title">
          <span className="text-underline">{page?.titleLead || 'Last step:'}</span> {page?.titleRest || 'book your free consultation'}
        </h1>

        {/* Calendly (placeholder image for now) */}
        <div className="booking__card">
          <img src={calendlySrc} alt="Select a date and time" />
        </div>
      </div>

      {/* Bottom prioritization bar */}
      <div className="booking__bar">
        <div className="booking__bar-inner">
          <img className="booking__bar-logo" src="/images/sections/hero/calendly_logo.svg.png" alt="Calendly" />
          <p className="booking__bar-text">{page?.barText || 'Your booking will be prioritized for another'}</p>
          <BookingTimer startSeconds={(page?.timerMinutes ?? 10) * 60} />
        </div>
      </div>

      <BookingSocialProof
        count={page?.proofCount ?? 8}
        text={page?.proofText}
        verifiedText={page?.proofVerifiedText}
        delaySeconds={page?.proofDelaySeconds ?? 2.5}
      />
      <LeaveSitePopup
        title={page?.leaveTitle}
        text={page?.leaveText}
        cancelText={page?.leaveCancelText}
        confirmText={page?.leaveConfirmText}
        delaySeconds={page?.leaveDelaySeconds ?? 30}
      />
    </main>
  );
}
