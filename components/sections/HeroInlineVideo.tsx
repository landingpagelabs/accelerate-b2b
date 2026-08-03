'use client';

import { useEffect, useState } from 'react';
import ModalCta from './ModalCta';

/**
 * Hero explainer video.
 *
 * The section renders the YouTube embed directly rather than a poster image that has to be
 * clicked to reveal a player — YouTube draws its own thumbnail and play button, so the
 * visitor plays it in place. "Expand Video" still opens the larger overlay, which is the
 * only thing that ever opened it.
 */
const YT_ID = 'gNZS-YRmZtk';
const START = 2; // ?t=2s from the source URL

function embedUrl(autoplay: boolean) {
  const params = new URLSearchParams({
    rel: '0',
    playsinline: '1',
    start: String(START),
    autoplay: autoplay ? '1' : '0',
  });
  return `https://www.youtube.com/embed/${YT_ID}?${params.toString()}`;
}

export default function HeroInlineVideo(_props: {
  // Kept so the call site does not have to change. The poster is no longer rendered:
  // the embed replaces it.
  poster?: string;
  posterWidth?: number;
  posterHeight?: number;
}) {
  const [expanded, setExpanded] = useState(false);

  // Esc to close + scroll lock while the expanded overlay is open.
  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpanded(false);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [expanded]);

  return (
    <div className="hero-content_video-wrap">
      <div className="hero-content_video hero-video-inline">
        <iframe
          className="hero-video-inline__iframe"
          src={embedUrl(false)}
          title="Explainer video"
          allow="fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
        />
      </div>

      <button
        type="button"
        className="hero-video-expand"
        aria-label="Expand video"
        onClick={() => setExpanded(true)}
      >
        <span>Expand Video</span>
        <img className="hero-video-expand__icon" src="/images/header/hero-play-icon.svg" alt="" aria-hidden="true" />
      </button>

      {expanded && (
        <div
          className="modal-overlay is-open"
          role="dialog"
          aria-modal="true"
          aria-label="Explainer video"
          onClick={(e) => {
            if (e.target === e.currentTarget) setExpanded(false);
          }}
        >
          <button type="button" className="modal-overlay__close" aria-label="Close" onClick={() => setExpanded(false)}>
            <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path
                d="M6.13268 18.2082L4.79102 16.8665L10.1577 11.4998L4.79102 6.13317L6.13268 4.7915L11.4993 10.1582L16.866 4.7915L18.2077 6.13317L12.841 11.4998L18.2077 16.8665L16.866 18.2082L11.4993 12.8415L6.13268 18.2082Z"
                fill="currentColor"
              />
            </svg>
          </button>
          <div className="vsl-card" role="document">
            <div className="vsl-card__media">
              {/* Autoplays here: the visitor asked for it by opening the overlay. */}
              <iframe
                className="vsl-card__image vsl-card__iframe"
                src={embedUrl(true)}
                title="Explainer video"
                allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                allowFullScreen
              />
            </div>
            <ModalCta onNavigate={() => setExpanded(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
