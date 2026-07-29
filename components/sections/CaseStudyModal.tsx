'use client';

import { useEffect, useRef, useState } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { urlForImage } from '@/lib/sanity';

type Stat = { value: string; label: string };

type CaseStudy = {
  companyName?: string;
  companyLogo?: any;
  category?: string;
  categoryLabel?: string;
  title?: string;
  description?: string;
  bullets?: string[];
  stats?: Stat[];
  quote?: string;
  author?: string;
  authorRole?: string;
  avatar?: any;
  modalQuote?: string;
  modalAuthor?: string;
  modalAvatar?: any;
  videoThumbnail?: any;
  videoUrl?: string;
  screenshotImage?: any;
};

type Props = {
  caseStudy: CaseStudy | null;
  onClose: () => void;
};

// Shared placeholder testimonial video — same fallback the Reviews section uses,
// so case-study videos play the same clip until real per-case URLs are set.
const DEFAULT_VIDEO_URL = 'https://vimeo.com/22439234';

// YouTube / Vimeo → embed URL with autoplay. If unrecognized, return as-is.
function toEmbedUrl(url: string): string {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0`;
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1`;
  return url;
}

// Instagram-style blue verified seal shown next to the author.
const VerifiedBadge = () => (
  <svg className="cs-modal__quote-verified" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M5.75668 16.6641L4.31751 14.1248L1.59066 13.49L1.85577 10.5539L0 8.33203L1.85577 6.11016L1.59066 3.17411L4.31751 2.53929L5.75668 0L8.33203 1.15061L10.9074 0L12.3466 2.53929L15.0734 3.17411L14.8083 6.11016L16.6641 8.33203L14.8083 10.5539L15.0734 13.49L12.3466 14.1248L10.9074 16.6641L8.33203 15.5134L5.75668 16.6641ZM7.5367 11.1491L11.8163 6.66563L10.7559 5.51501L7.5367 8.8875L5.90817 7.22109L4.84773 8.33203L7.5367 11.1491Z" fill="#3897F0" />
  </svg>
);

// Play button (dark blurred circle + white triangle) — from the designer's SVG.
const PlayIcon = () => (
  <span className="cs-modal__video-play" aria-hidden="true">
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M35.5453 25.8486C37.0265 26.7037 37.0265 28.8416 35.5453 29.6968L25.5476 35.4689C24.0665 36.3241 22.215 35.2551 22.215 33.5449L22.215 22.0005C22.215 20.2902 24.0665 19.2213 25.5476 20.0764L35.5453 25.8486Z" fill="white" />
    </svg>
  </span>
);

export default function CaseStudyModal({ caseStudy, onClose }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const isOpen = !!caseStudy;

  useEffect(() => {
    if (!isOpen) return;
    cardRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose]);

  // Reset the inline player whenever a different case study opens/closes.
  useEffect(() => {
    setPlaying(false);
  }, [caseStudy]);

  // `author` already holds the full "Name, Company" string (e.g. "Ben Kelly,
  // LH Capital Group"), so use it as-is — don't append authorRole.
  // The modal-only overrides win when set: some cases have a different person
  // giving the video testimonial than the one quoted on the card.
  const attribution = caseStudy?.modalAuthor || caseStudy?.author || '';
  const quote = caseStudy?.modalQuote || caseStudy?.quote || '';
  const avatar = caseStudy?.modalAvatar || caseStudy?.avatar;
  // `auto('format')` matters more than it looks here. The posters are 8-bit
  // palette PNGs (TinyPNG output, 256 colours); resizing alone makes Sanity
  // re-encode them as full 32-bit RGBA PNG, which came out 2.5x heavier than
  // the source at a smaller size. Serving WebP at q=90 keeps the same 650px
  // and drops each poster from ~670KB to ~50KB.
  const videoPoster = caseStudy?.videoThumbnail
    ? urlForImage(caseStudy.videoThumbnail).width(650).auto('format').quality(90).url()
    : null;
  const embedUrl = toEmbedUrl(caseStudy?.videoUrl || DEFAULT_VIDEO_URL);

  return (
    <div
      className={`modal-overlay${isOpen ? ' is-open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <button type="button" className="modal-overlay__close" aria-label="Close" onClick={onClose}>
        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.13268 18.2082L4.79102 16.8665L10.1577 11.4998L4.79102 6.13317L6.13268 4.7915L11.4993 10.1582L16.866 4.7915L18.2077 6.13317L12.841 11.4998L18.2077 16.8665L16.866 18.2082L11.4993 12.8415L6.13268 18.2082Z" fill="currentColor" />
        </svg>
      </button>

      <div className="cs-modal__wrap">
      <div className="cs-modal" ref={cardRef} tabIndex={-1} role="document">
        <SimpleBar className="cs-modal__scroll" autoHide={false}>
          <div className="cs-modal__inner">
          {/* Meta: company + industry tag */}
          {(caseStudy?.companyName || caseStudy?.category || caseStudy?.categoryLabel) && (
            <div className="cs-modal__tags">
              {caseStudy.companyName && (
                <span className="cs-modal__tag-company">{caseStudy.companyName}</span>
              )}
              {(caseStudy.categoryLabel || caseStudy.category) && (
                <span className="cs-modal__tag">{caseStudy.categoryLabel || caseStudy.category}</span>
              )}
            </div>
          )}

          {/* Headline */}
          {caseStudy?.title && (
            <h2 className="cs-modal__title">{caseStudy.title}</h2>
          )}

          <div className="cs-modal__divider" />

          {/* Body: intro paragraph + bullets */}
          {(caseStudy?.description || (caseStudy?.bullets && caseStudy.bullets.length > 0)) && (
            <div className="cs-modal__body">
              {caseStudy.description && (
                <p className="cs-modal__desc">{caseStudy.description}</p>
              )}
              {caseStudy.bullets && caseStudy.bullets.length > 0 && (
                <ul className="cs-modal__bullets">
                  {caseStudy.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Stats */}
          {caseStudy?.stats && caseStudy.stats.length > 0 && (
            <div className="cs-modal__stats">
              {caseStudy.stats.map((s, i) => (
                <div key={i} className="cs-modal__stat">
                  <span className="cs-modal__stat-value">{s.value}</span>
                  <span className="cs-modal__stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Video + quote */}
          {(quote || attribution || videoPoster) && (
            <>
              <div className="cs-modal__divider" />
              <div className="cs-modal__media">
                {videoPoster && (
                  <div className="cs-modal__video">
                    {playing && embedUrl ? (
                      <iframe
                        className="cs-modal__video-iframe"
                        src={embedUrl}
                        title="Testimonial video"
                        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                        allowFullScreen
                      />
                    ) : (
                      <button
                        type="button"
                        className="cs-modal__video-poster"
                        style={{ backgroundImage: `url(${videoPoster})` }}
                        onClick={() => setPlaying(true)}
                        aria-label="Play testimonial video"
                      >
                        <PlayIcon />
                      </button>
                    )}
                  </div>
                )}

                {(quote || attribution) && (
                  <div className="cs-modal__quote-card">
                    {(attribution || avatar) && (
                      <div className="cs-modal__quote-head">
                        {avatar && (
                          <img
                            className="cs-modal__quote-avatar"
                            src={urlForImage(avatar).width(88).height(88).url()}
                            alt=""
                          />
                        )}
                        <span className="cs-modal__quote-attr">
                          {attribution && <span className="cs-modal__quote-name">{attribution}</span>}
                          <VerifiedBadge />
                        </span>
                      </div>
                    )}
                    {quote && <p className="cs-modal__quote-text">{quote}</p>}
                  </div>
                )}
              </div>
            </>
          )}

          {/* Screenshot / dashboard image */}
          {caseStudy?.screenshotImage && (
            <div className="cs-modal__screenshot">
              <img src={urlForImage(caseStudy.screenshotImage).width(900).url()} alt="" />
            </div>
          )}
          </div>
        </SimpleBar>
      </div>

      <a href="/booking" className="footer__cta cs-modal__cta">
        Apply For Your Free Test Campaign
        <span className="footer__cta-arrow">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.0013 2.16602C18.9813 2.16602 23.8346 7.01935 23.8346 12.9993C23.8346 18.9793 18.9813 23.8327 13.0013 23.8327C7.0213 23.8327 2.16797 18.9793 2.16797 12.9993C2.16797 7.01935 7.0213 2.16602 13.0013 2.16602ZM13.0013 11.916H8.66797V14.0827H13.0013V17.3327L17.3346 12.9993L13.0013 8.66602V11.916Z" fill="white" />
          </svg>
        </span>
      </a>
      </div>
    </div>
  );
}
