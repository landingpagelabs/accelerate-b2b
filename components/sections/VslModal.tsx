'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { urlForImage } from '@/lib/sanity';

const DEFAULT_IMAGE = '/images/modal/vsl-modal-image.jpg';
// Будь-який елемент із цим атрибутом або лінк на ці хеші відкриває VSL-модалку.
const TRIGGER_SELECTOR = '[data-open-vsl], a[href="#vsl"], a[href="#explainer-video"]';

// YouTube / Vimeo → embed URL з автозапуском. Інакше null (звичайний <video>).
function toEmbedUrl(url: string): string | null {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0`;
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1`;
  return null;
}

export default function VslModal({ section }: { section: any }) {
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const isVideo = section?.mediaType === 'video';
  const videoSrc = section?.videoFileUrl || section?.videoUrl || '';
  const embedUrl = isVideo && section?.videoUrl && !section?.videoFileUrl ? toEmbedUrl(section.videoUrl) : null;
  const posterSrc = section?.poster ? urlForImage(section.poster).width(1796).url() : undefined;
  const imageSrc = section?.image ? urlForImage(section.image).width(1796).url() : DEFAULT_IMAGE;

  const close = useCallback(() => setOpen(false), []);

  // Відкриття по кліку на будь-який тригер у документі
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest(TRIGGER_SELECTOR)) {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  // Esc, блокування скролу, фокус
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

  // Відео монтуємо лише коли модалка відкрита: тоді воно автозапускається,
  // а при закритті — розмонтовується і звук зупиняється.
  const renderMedia = () => {
    if (isVideo && videoSrc) {
      if (embedUrl) {
        return open ? (
          <iframe
            className="vsl-card__image vsl-card__iframe"
            src={embedUrl}
            title="VSL video"
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen
          />
        ) : (
          <div className="vsl-card__image vsl-card__iframe" />
        );
      }
      return open ? (
        <video
          className="vsl-card__image"
          src={videoSrc}
          poster={posterSrc}
          controls
          autoPlay
          playsInline
        />
      ) : (
        <div className="vsl-card__image" style={{ aspectRatio: '898 / 508' }} />
      );
    }
    return <img className="vsl-card__image" src={imageSrc} alt={section?.buttonText || 'VSL'} />;
  };

  return (
    <div
      className={`modal-overlay${open ? ' is-open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Video"
      aria-hidden={!open}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <button type="button" className="modal-overlay__close" aria-label="Close" onClick={close}>
        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path
            d="M6.13268 18.2082L4.79102 16.8665L10.1577 11.4998L4.79102 6.13317L6.13268 4.7915L11.4993 10.1582L16.866 4.7915L18.2077 6.13317L12.841 11.4998L18.2077 16.8665L16.866 18.2082L11.4993 12.8415L6.13268 18.2082Z"
            fill="currentColor"
          />
        </svg>
      </button>

      <div className="vsl-card" role="document" tabIndex={-1} ref={cardRef}>
        {!isVideo && section?.imageLink ? (
          <a className="vsl-card__media" href={section.imageLink} target="_blank" rel="noopener noreferrer">
            {renderMedia()}
          </a>
        ) : (
          <div className="vsl-card__media">{renderMedia()}</div>
        )}

        <div className="vsl-card__cta-stack">
          {section?.buttonText &&
            (section?.buttonUrl ? (
              <a className="vsl-card__cta" href={section.buttonUrl} target="_blank" rel="noopener noreferrer">
                <span>{section.buttonText}</span>
                <span className="vsl-card__cta-arrow" aria-hidden="true">
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M13.0013 2.1665C18.9813 2.1665 23.8346 7.01984 23.8346 12.9998C23.8346 18.9798 18.9813 23.8332 13.0013 23.8332C7.0213 23.8332 2.16797 18.9798 2.16797 12.9998C2.16797 7.01984 7.0213 2.1665 13.0013 2.1665ZM13.0013 11.9165H8.66797V14.0832H13.0013V17.3332L17.3346 12.9998L13.0013 8.6665V11.9165Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              </a>
            ) : (
              <button type="button" className="vsl-card__cta">
                <span>{section.buttonText}</span>
                <span className="vsl-card__cta-arrow" aria-hidden="true">
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M13.0013 2.1665C18.9813 2.1665 23.8346 7.01984 23.8346 12.9998C23.8346 18.9798 18.9813 23.8332 13.0013 23.8332C7.0213 23.8332 2.16797 18.9798 2.16797 12.9998C2.16797 7.01984 7.0213 2.1665 13.0013 2.1665ZM13.0013 11.9165H8.66797V14.0832H13.0013V17.3332L17.3346 12.9998L13.0013 8.6665V11.9165Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              </button>
            ))}
          {section?.note && <p className="vsl-card__note">{section.note}</p>}
        </div>
      </div>
    </div>
  );
}
