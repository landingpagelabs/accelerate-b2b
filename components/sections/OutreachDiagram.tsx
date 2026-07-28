'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Outreach-intro diagram animation.
// Three pixel-perfect Figma states (Closed -> Middle -> Open) are stacked and
// cross-faded. The section is PINNED (the screen "holds") while the user scrolls,
// and the scroll position scrubs the cross-fade — a GSAP ScrollTrigger effect.
// The layers are aligned by the central logo (horizontally centered in all three;
// it rises as the stack opens, matching the design). Reduced-motion users get the
// static Open state with no pinning.
const BASE = '/images/sections/outreach-intro';

export default function OutreachDiagram() {
  const rootRef = useRef<HTMLDivElement>(null);
  const closedRef = useRef<HTMLImageElement>(null);
  const middleRef = useRef<HTMLImageElement>(null);
  const openRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    // Skip the pinned scrub for reduced-motion users and on small screens
    // (pinning + the wide, spilling diagram is janky on mobile) — CSS shows the
    // static Open state in both cases.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(min-width: 768px)').matches) return;

    const section = (root.closest('.section_outreach-intro') as HTMLElement) || root;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(closedRef.current, { opacity: 1 });
      gsap.set([middleRef.current, openRef.current], { opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'center center',
          end: () => '+=' + Math.round(window.innerHeight * 1.15),
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Closed -> Middle (first half), Middle -> Open (second half).
      tl.to(closedRef.current, { opacity: 0, duration: 0.5 }, 0)
        .to(middleRef.current, { opacity: 1, duration: 0.5 }, 0)
        .to(middleRef.current, { opacity: 0, duration: 0.5 }, 0.5)
        .to(openRef.current, { opacity: 1, duration: 0.5 }, 0.5);
    }, root);

    // Recompute once the large SVGs have painted, in case layout shifted.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);

    return () => {
      window.removeEventListener('load', refresh);
      ctx.revert();
    };
  }, []);

  return (
    <div className="outreach-diagram" ref={rootRef} aria-hidden="true">
      <div className="outreach-diagram__inner">
        <img ref={closedRef} className="outreach-diagram__layer outreach-diagram__layer--closed" src={`${BASE}/outreach-closed.svg`} alt="" loading="lazy" decoding="async" />
        <img ref={middleRef} className="outreach-diagram__layer outreach-diagram__layer--middle" src={`${BASE}/outreach-middle.svg`} alt="" loading="lazy" decoding="async" />
        <img ref={openRef} className="outreach-diagram__layer outreach-diagram__layer--open" src={`${BASE}/outreach-open.svg`} alt="" loading="lazy" decoding="async" />
      </div>
    </div>
  );
}
