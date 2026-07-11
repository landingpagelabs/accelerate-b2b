'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { urlForImage } from '@/lib/sanity';

const DEFAULT_IMAGE = '/images/modal/modal-image000.png';

export default function ConsultationModal({ section }: { section: any }) {
  const maxPerLoad = Number(section?.maxPerSession ?? 2);
  const fallbackDelay = Number(section?.fallbackDelaySeconds ?? 15);
  const scrollPercent = Number(section?.scrollPercent ?? 60);

  const [open, setOpen] = useState(false);
  const lastClosedAt = useRef(0);
  // Show counter is kept in memory — it resets on every page reload
  // (the limit applies within a single page load).
  const shownCount = useRef(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const imageSrc = section?.image ? urlForImage(section.image).width(900).url() : DEFAULT_IMAGE;

  const trigger = useCallback(() => {
    // don't show: already open, limit reached, or just closed (cooldown)
    if (open) return;
    if (shownCount.current >= maxPerLoad) return;
    if (Date.now() - lastClosedAt.current < 1000) return;
    shownCount.current += 1;
    setOpen(true);
  }, [open, maxPerLoad]);

  const close = useCallback(() => {
    lastClosedAt.current = Date.now();
    setOpen(false);
  }, []);

  // Appearance triggers
  useEffect(() => {
    if (shownCount.current >= maxPerLoad) return;

    const isCoarse =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(pointer: coarse)').matches;

    const cleanups: Array<() => void> = [];

    if (isCoarse) {
      // Mobile / touch: fallback trigger — delay OR scroll (whichever comes first)
      if (fallbackDelay >= 0) {
        const t = window.setTimeout(trigger, fallbackDelay * 1000);
        cleanups.push(() => window.clearTimeout(t));
      }
      const onScroll = () => {
        const scrolled =
          window.scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1);
        if (scrolled * 100 >= scrollPercent) trigger();
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      cleanups.push(() => window.removeEventListener('scroll', onScroll));
    } else {
      // Desktop: exit-intent — cursor leaves the top edge of the window
      const onMouseOut = (e: MouseEvent) => {
        if (!e.relatedTarget && e.clientY <= 0) trigger();
      };
      document.addEventListener('mouseout', onMouseOut);
      cleanups.push(() => document.removeEventListener('mouseout', onMouseOut));
    }

    return () => cleanups.forEach((fn) => fn());
  }, [trigger, maxPerLoad, fallbackDelay, scrollPercent]);

  // Esc, scroll lock, focus
  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement;
    cardRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
      previouslyFocused.current?.focus?.();
    };
  }, [open, close]);

  return (
    <div
      className={`modal-overlay${open ? ' is-open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="consultation-modal-title"
      aria-hidden={!open}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <button
        type="button"
        className="modal-overlay__close"
        aria-label="Close"
        onClick={close}
      >
        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path
            d="M6.13268 18.2082L4.79102 16.8665L10.1577 11.4998L4.79102 6.13317L6.13268 4.7915L11.4993 10.1582L16.866 4.7915L18.2077 6.13317L12.841 11.4998L18.2077 16.8665L16.866 18.2082L11.4993 12.8415L6.13268 18.2082Z"
            fill="currentColor"
          />
        </svg>
      </button>

      <div className="modal-card" role="document" tabIndex={-1} ref={cardRef}>
        <span className="modal-card__glow" aria-hidden="true" />
        <img className="modal-card__dots" src="/images/modal/dotted-bg.png" alt="" aria-hidden="true" />

        {imageSrc && (
          <div className="modal-card__media">
            <img src={imageSrc} alt="" />
          </div>
        )}

        <div className="modal-card__text">
          <h2 id="consultation-modal-title" className="modal-card__title">
            {section?.heading || 'Can’t find what you’re looking for?'}
          </h2>
          {section?.description && <p className="modal-card__copy">{section.description}</p>}
        </div>

        {section?.buttonText &&
          (section?.buttonUrl ? (
            <a className="modal-card__cta" href={section.buttonUrl} target="_blank" rel="noopener noreferrer">
              {section.buttonText}
            </a>
          ) : (
            <button type="button" className="modal-card__cta">
              {section.buttonText}
            </button>
          ))}
      </div>
    </div>
  );
}
