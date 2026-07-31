'use client';

import { useEffect, useState } from 'react';

// Hero explainer video. Shows the demo poster; clicking the poster — or the
// "Expand Video" button — opens a larger overlay that plays the video.
const YT_ID = 'gNZS-YRmZtk';
const START = 1; // ?t=1s from the source URL

function embedUrl() {
  const params = new URLSearchParams({
    rel: '0',
    playsinline: '1',
    start: String(START),
    autoplay: '1',
  });
  return `https://www.youtube.com/embed/${YT_ID}?${params.toString()}`;
}

export default function HeroInlineVideo({
  poster,
  posterWidth,
  posterHeight,
}: {
  poster: string;
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
      <button
        type="button"
        className="hero-video-poster"
        aria-label="Expand video"
        onClick={() => setExpanded(true)}
      >
        {/* The wrapping button is already labelled "Expand video", so the poster itself
            carries no extra meaning for assistive tech. No loading="lazy" here — this is
            the LCP element and must stay eagerly fetched. */}
        <img
          className="hero-content_video"
          src={poster}
          width={posterWidth}
          height={posterHeight}
          alt=""
          fetchPriority="high"
        />
      </button>

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
              <iframe
                className="vsl-card__image vsl-card__iframe"
                src={embedUrl()}
                title="Explainer video"
                allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
