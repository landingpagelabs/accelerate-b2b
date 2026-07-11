'use client';

import { useEffect, useRef } from 'react';

// YouTube / Vimeo → embed URL with autoplay. If unrecognized, return as-is.
function toEmbedUrl(url: string): string {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0`;
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1`;
  return url;
}

type Props = {
  videoUrl: string | null;
  onClose: () => void;
};

// Controlled player modal. Pass videoUrl — it opens and autoplays;
// null — closed. The iframe mounts only while open, so sound stops on close.
export default function VideoModal({ videoUrl, onClose }: Props) {
  const open = !!videoUrl;
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    cardRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const embed = videoUrl ? toEmbedUrl(videoUrl) : null;

  return (
    <div
      className={`modal-overlay${open ? ' is-open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Video"
      aria-hidden={!open}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <button type="button" className="modal-overlay__close" aria-label="Close" onClick={onClose}>
        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M6.13268 18.2082L4.79102 16.8665L10.1577 11.4998L4.79102 6.13317L6.13268 4.7915L11.4993 10.1582L16.866 4.7915L18.2077 6.13317L12.841 11.4998L18.2077 16.8665L16.866 18.2082L11.4993 12.8415L6.13268 18.2082Z" fill="currentColor" />
        </svg>
      </button>

      <div className="vsl-card" role="document" tabIndex={-1} ref={cardRef}>
        <div className="vsl-card__media">
          {open && embed ? (
            <iframe
              className="vsl-card__image vsl-card__iframe"
              src={embed}
              title="Video"
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
              allowFullScreen
            />
          ) : (
            <div className="vsl-card__image vsl-card__iframe" />
          )}
        </div>
      </div>
    </div>
  );
}
