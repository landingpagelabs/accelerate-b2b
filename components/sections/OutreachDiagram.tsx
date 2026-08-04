'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Outreach-intro diagram animation.
// The designer's isometric artwork was split into per-plate SVG layers
// (public/images/sections/outreach-intro/layers/). They stack on one shared
// 1078x454 canvas, so at rest they reproduce the full "Open State" exactly.
//
// The loop plays the designer's three states in order:
//
//   1. Closed   — Figma "Closed State" (5771:5652). Plates converged into one
//                 compact slab, the orange and hatched fillings hidden inside,
//                 no labels. Just the branded top plate.
//   2. Middle   — Figma "Middle State" (5771:5672). The slab opens: plates
//                 separate along Y and the two inner plates fade up, so the
//                 construction reads. Still no labels.
//   3. Open     — Figma "Open State" (5771:5323). The labels, leader lines and
//                 floating tool icons fade in around the exploded stack.
//
// It runs ONCE, the first time it scrolls into view, and then rests on the Open
// state — it is not a loop. It used to repeat forever and drift off-screen at the
// end of each cycle, which meant the finished diagram (the thing the section is
// actually explaining) was only on screen for a beat at a time.
//
// The isometric angle never changes and plates never rotate: the open motion is
// strictly along Y.
// Reduced-motion users get the static assembled artwork (the Open state).
const BASE = '/images/sections/outreach-intro/layers';

// Render order = bottom -> top (z-order). `yClosed` is the plate's position in
// the collapsed state, in % of the layer's own height; 0 is its exploded
// (at-rest) position.
// `order` drives the opening stagger — the top plate lifts off first.
//
// `inner: true` marks the two middle plates (the orange gradient and the
// hatched one). They are hidden while the slab is shut, behind the top plate as
// it closes over them, so the closed stack is a clean two-plate slab with
// nothing inside — matching the Figma closed state, and leaving no orange
// showing through. The two remaining plates therefore meet with only a thin
// slab edge between them (14 canvas units), not a gap sized for the filling.
//
// `bg: true` is the layer carrying the labels ("Data & Signals",
// "Personalization", "Integration", "Message Sending"), their leader lines and
// the floating tool icons. It is precisely what separates the Middle state from
// the Open state, so it stays hidden until the final reveal.
// The four plate names, top plate -> bottom plate, matching the leader-line
// order in the design (Figma 5874:4436). They are baked into layer-0-bg.svg as
// outlined paths, so this list exists purely to give them accessible text.
const LABEL_TEXT = ['Data & Signals', 'Personalization', 'Integration', 'Message Sending'];

const LAYERS = [
  { file: 'layer-0-bg', bg: true, inner: false, yClosed: 0, order: 0 },
  { file: 'layer-1-base', bg: false, inner: false, yClosed: -26.82, order: 3 },
  { file: 'layer-2-orange', bg: false, inner: true, yClosed: -8.87, order: 2 },
  { file: 'layer-3-hatch', bg: false, inner: true, yClosed: 6.55, order: 1 },
  { file: 'layer-4-top', bg: false, inner: false, yClosed: 26.82, order: 0 },
];

// Phase timings (seconds) — the run is ~4s end to end, then it holds on Open.
const FADE_IN = 0.5; // the closed slab appears
const CLOSED_HOLD = 0.7; // state 1 reads
const OPEN_DUR = 1.15; // closed -> middle
const STAGGER = 0.075;
const MIDDLE_HOLD = 0.85; // state 2 reads
const LABELS_DUR = 0.75; // middle -> open

export default function OutreachDiagram() {
  const rootRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let tl: gsap.core.Timeline | undefined;

    const ctx = gsap.context(() => {
      // Starts paused and never repeats — the IntersectionObserver below plays it
      // once, the first time the section comes into view.
      tl = gsap.timeline({ paused: true });

      const plates = LAYERS.map((l, i) => ({ ...l, el: layerRefs.current[i] })).filter(
        (l) => l.el
      );
      const stack = plates.filter((l) => !l.bg);
      const bg = plates.find((l) => l.bg);

      // --- State 1: Closed ---------------------------------------------------
      // Reset so every loop starts shut: plates converged, filling hidden inside,
      // labels off. Applied immediately as well as on the timeline so the first
      // frame is already the closed state rather than the at-rest open artwork.
      const closed = (l: (typeof stack)[number]) => ({
        yPercent: l.yClosed,
        xPercent: 0,
        scale: 1,
        opacity: 0,
      });
      stack.forEach((l) => {
        gsap.set(l.el, closed(l));
        tl!.set(l.el, closed(l), 0);
      });
      if (bg) {
        gsap.set(bg.el, { opacity: 0 });
        tl.set(bg.el, { opacity: 0 }, 0);
      }

      // The closed slab fades up (only the two outer plates are visible here —
      // the filling stays hidden until the stack opens).
      stack
        .filter((l) => !l.inner)
        .forEach((l) => {
          tl!.to(l.el, { opacity: 1, duration: FADE_IN, ease: 'power1.out' }, 0);
        });

      // --- State 2: Middle ---------------------------------------------------
      // The slab opens. Plates travel back to their exploded (at-rest) positions
      // and the orange + hatched fillings fade up as the gaps appear.
      const tOpen = FADE_IN + CLOSED_HOLD;
      stack.forEach((l) => {
        tl!.to(
          l.el,
          { yPercent: 0, duration: OPEN_DUR, ease: 'power2.out' },
          tOpen + l.order * STAGGER
        );
        // `power2.out` on the filling brings it up early in the move, so it is
        // already visible by the time the gap is wide enough to see into.
        if (l.inner) {
          tl!.to(
            l.el,
            { opacity: 1, duration: OPEN_DUR * 0.7, ease: 'power2.out' },
            tOpen + l.order * STAGGER
          );
        }
      });

      // --- State 3: Open -----------------------------------------------------
      // Labels, leader lines and floating tool icons fade in around the stack.
      const tLabels = tOpen + OPEN_DUR + 3 * STAGGER + MIDDLE_HOLD;
      if (bg) tl.to(bg.el, { opacity: 1, duration: LABELS_DUR, ease: 'power1.out' }, tLabels);

      // No exit phase: the timeline ends on the Open state and stays there.
    }, root);

    // Play once, the first time it scrolls into view. Disconnecting on that first
    // intersection is what stops it replaying every time the visitor scrolls back.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tl?.play();
          io.disconnect();
        }
      },
      { rootMargin: '-10% 0px' }
    );
    io.observe(root);

    return () => {
      io.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <>
      <div className="outreach-diagram" ref={rootRef} aria-hidden="true">
        <div className="outreach-diagram__inner">
          {LAYERS.map((layer, i) => (
            <img
              key={layer.file}
              ref={(el) => {
                layerRefs.current[i] = el;
              }}
              className="outreach-diagram__layer"
              src={`${BASE}/${layer.file}.svg`}
              alt=""
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      </div>

      {/* Screen-reader only, at every width. The diagram is aria-hidden with
          alt="", so without this the four plate names have no accessible text
          at all — they exist only as outlined paths inside the artwork. */}
      <ol className="outreach-diagram__labels">
        {LABEL_TEXT.map((label) => (
          <li key={label}>{label}</li>
        ))}
      </ol>
    </>
  );
}
