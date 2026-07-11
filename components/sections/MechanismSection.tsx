'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { urlForImage } from '@/lib/sanity';

// Diagram art is a fixed, hand-calibrated illustration: each PNG's connector
// dot is pixel-measured (fraction of the image's own size), so these are not
// CMS-editable — only the text content below is.
const STAGE_ART = [
  { image: '/images/sections/stages/stage-1.png', dot: { x: 0.0623, y: 0.7215 } },
  { image: '/images/sections/stages/stage-2.png', dot: { x: 0.3071, y: 0.6733 } },
  { image: '/images/sections/stages/stage-3.png', dot: { x: 0.5019, y: 0.5909 } },
  { image: '/images/sections/stages/stage-4.png', dot: { x: 0.6592, y: 0.4943 } },
];

const DEFAULT_STAGES = [
  { label: 'STAGE 01 · CONTACTED', text: '120,000  prospects in your ideal customer profile contacted' },
  { label: 'STAGE 02 · POSITIVE REPLIES', text: '400 positive replies from sales-qualified leads' },
  { label: 'STAGE 03 · MEETINGS', text: '120 meetings with ICP leads' },
  { label: 'STAGE 04 · DEALS', text: '10-20 closed deals' },
];

const VerifiedBadge = () => (
  <svg width="14" height="14" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.75668 16.6641L4.31751 14.1248L1.59066 13.49L1.85577 10.5539L0 8.33203L1.85577 6.11016L1.59066 3.17411L4.31751 2.53929L5.75668 0L8.33203 1.15061L10.9074 0L12.3466 2.53929L15.0734 3.17411L14.8083 6.11016L16.6641 8.33203L14.8083 10.5539L15.0734 13.49L12.3466 14.1248L10.9074 16.6641L8.33203 15.5134L5.75668 16.6641ZM7.5367 11.1491L11.8163 6.66563L10.7559 5.51501L7.5367 8.8875L5.90817 7.22109L4.84773 8.33203L7.5367 11.1491Z"
      fill="#3897F0"
    />
  </svg>
);

type Point = { x: number; y: number };

function useConnectorPoints(rowRefs: React.RefObject<(HTMLDivElement | null)[]>, diagramRef: React.RefObject<HTMLDivElement | null>) {
  const [points, setPoints] = useState<Point[] | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      const diagramEl = diagramRef.current;
      if (!diagramEl) return;
      const diagramRect = diagramEl.getBoundingClientRect();
      const next: Point[] = STAGE_ART.map((art, i) => {
        const imgEl = rowRefs.current?.[i];
        if (!imgEl) return { x: 0, y: 0 };
        const rect = imgEl.getBoundingClientRect();
        return {
          x: rect.left - diagramRect.left + art.dot.x * rect.width,
          y: rect.top - diagramRect.top + art.dot.y * rect.height,
        };
      });
      setPoints(next);
    };

    measure();
    window.addEventListener('resize', measure);
    const ro = new ResizeObserver(measure);
    if (diagramRef.current) ro.observe(diagramRef.current);

    return () => {
      window.removeEventListener('resize', measure);
      ro.disconnect();
    };
  }, [rowRefs, diagramRef]);

  return points;
}

function Connectors({ points }: { points: Point[] | null }) {
  if (!points) return null;
  return (
    <>
      {points.slice(0, -1).map((a, i) => {
        const b = points[i + 1];
        const left = Math.min(a.x, b.x);
        const top = Math.min(a.y, b.y);
        const width = Math.abs(b.x - a.x) || 1;
        const height = Math.abs(b.y - a.y) || 1;
        const x1 = a.x < b.x ? 0 : width;
        const y1 = a.y < b.y ? 0 : height;
        const x2 = a.x < b.x ? width : 0;
        const y2 = a.y < b.y ? height : 0;
        return (
          <svg
            key={i}
            className="stages_connector"
            style={{ left, top, width, height }}
            viewBox={`0 0 ${width} ${height}`}
            fill="none"
            aria-hidden="true"
          >
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#888888" strokeOpacity="0.7" strokeDasharray="4 4" />
          </svg>
        );
      })}
    </>
  );
}

export default function MechanismSection({ section }: { section: any }) {
  const diagramRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const points = useConnectorPoints(rowRefs, diagramRef);

  const stagesText = section?.stages?.length ? section.stages : DEFAULT_STAGES;
  const avatarUrl = section?.quoteAvatar
    ? urlForImage(section.quoteAvatar).url()
    : '/images/sections/reviews/Matt Hickerson.png';

  return (
    <section className="section_stages">
      <div className="padding-global">
        <div className="container-default">
          <div className="stages_wrapper">
            <h2 className="stages_title">
              {section?.heading || 'Go from unpredictable lead flow to 10 - 20 closed deals or more each month'}
            </h2>

            <div className="stages_diagram" ref={diagramRef}>
              <Connectors points={points} />
              {STAGE_ART.map((art, i) => {
                const stage = stagesText[i] || DEFAULT_STAGES[i];
                return (
                  <div className="stages_row" key={i}>
                    <div className="stages_row-text">
                      <p className="stages_label">{stage.label}</p>
                      <p className="stages_desc">{stage.text}</p>
                    </div>
                    <div className="stages_row-image" ref={(el) => { rowRefs.current[i] = el; }}>
                      <img src={art.image} alt={stage.label} />
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="stages_note">
              {section?.note || '*Average yearly outcomes. Results depend on multiple factors.'}
            </p>

            <div className="stages_quote">
              <img className="stages_quote-avatar" src={avatarUrl} alt="" />
              <div className="stages_quote-body">
                <p className="stages_quote-text">
                  &ldquo;{section?.quoteText || 'Spencer took us from zero to 50,000 emails a month.'}&rdquo;
                </p>
                <p className="stages_quote-author">
                  {section?.quoteAuthorName || 'Matt Hickerson'} <span className="stages_quote-dot">•</span>{' '}
                  {section?.quoteAuthorRole || 'VP of Operations, Forge Origination'} <VerifiedBadge />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
