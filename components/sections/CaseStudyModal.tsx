'use client';

import { useEffect, useRef } from 'react';
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
  screenshotImage?: any;
};

type Props = {
  caseStudy: CaseStudy | null;
  onClose: () => void;
};

export default function CaseStudyModal({ caseStudy, onClose }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
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
          {/* Tags */}
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

          {/* Title */}
          {caseStudy?.title && (
            <h2 className="cs-modal__title">{caseStudy.title}</h2>
          )}

          <div className="cs-modal__divider" />

          {/* Description + bullets */}
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

          {/* Quote */}
          {(caseStudy?.quote || caseStudy?.author) && (
            <>
              <div className="cs-modal__divider" />
              <div className="cs-modal__quote-wrap">
                <blockquote className="cs-modal__quote">
                  {caseStudy.quote && <p>{caseStudy.quote}</p>}
                  {(caseStudy.authorRole || caseStudy.author) && (
                    <footer className="cs-modal__quote-author">
                      {caseStudy.authorRole || caseStudy.author}
                    </footer>
                  )}
                </blockquote>
              </div>
            </>
          )}

          {/* Screenshot */}
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
