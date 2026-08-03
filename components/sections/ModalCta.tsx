'use client';

/**
 * The CTA stack that every video modal carries in the design (VSL Modal - Desktop,
 * node 4679:9736): the primary apply button plus the reassurance line beneath it.
 *
 * The hero explainer modal and the video testimonial modals were both shipping without
 * it, so a visitor who watched a video had no way to act on it without closing the modal
 * and hunting for the form.
 */
export default function ModalCta({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="vsl-card__cta-stack">
      <a className="vsl-card__cta" href="/#apply-form" onClick={onNavigate}>
        <span>Apply For Your Free Test Campaign</span>
        <span className="vsl-card__cta-arrow" aria-hidden="true">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13.0013 2.1665C18.9813 2.1665 23.8346 7.01984 23.8346 12.9998C23.8346 18.9798 18.9813 23.8332 13.0013 23.8332C7.0213 23.8332 2.16797 18.9798 2.16797 12.9998C2.16797 7.01984 7.0213 2.1665 13.0013 2.1665ZM13.0013 11.9165H8.66797V14.0832H13.0013V17.3332L17.3346 12.9998L13.0013 8.6665V11.9165Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </a>
      <p className="vsl-card__note">No Setup Fee | No Lock-In | Only A Few Spots Available</p>
    </div>
  );
}
