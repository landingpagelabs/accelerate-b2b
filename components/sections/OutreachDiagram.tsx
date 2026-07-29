'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Outreach-intro diagram animation.
// The designer's isometric "Open State" artwork was split into per-plate SVG
// layers (public/images/sections/outreach-intro/layers/). They stack on one
// shared 1078x454 canvas, so at rest they reproduce the original artwork
// exactly. An autonomous ~6s loop then plays the exploded-assembly sequence:
//
//   1. Enter    — the outer plates fly in (top ones from above, bottom ones
//                 from below), staggered, easing out into the exploded stack.
//   2. Hold     — the stack hangs apart so every layer reads separately.
//   3. Collapse — all plates converge vertically to the stack centre until the
//                 gaps close into one compact block, then a short beat.
//   4. Fly out  — the block drifts diagonally up-right, scaling up slightly and
//                 fading, then the cycle restarts.
//
// The isometric angle never changes and plates never rotate: phases 1-3 move
// strictly along Y, phase 4 along the diagonal.
// Reduced-motion users get the static assembled artwork.
const BASE = '/images/sections/outreach-intro/layers';

// Render order = bottom -> top (z-order). `yIn` is the entrance offset and
// `yOut` the collapsed position, both in % of the layer's own height.
// `order` drives the entrance stagger (top plate first).
//
// `inner: true` marks the two middle plates (the orange gradient and the
// hatched one). They fade out *during* the collapse, hidden behind the top
// plate as it closes over them, so the shut stack is a clean two-plate slab
// with nothing inside — matching the Figma closed state, and leaving no orange
// showing through when the block fades away on the fly-out.
// The two remaining plates therefore meet with only a thin slab edge between
// them (14 canvas units), not a gap sized for the missing filling.
const LAYERS = [
  { file: 'layer-0-bg', bg: true, inner: false, yIn: 0, yOut: 0, order: 0 },
  { file: 'layer-1-base', bg: false, inner: false, yIn: 32, yOut: -26.82, order: 3 },
  { file: 'layer-2-orange', bg: false, inner: true, yIn: 12, yOut: -8.87, order: 2 },
  { file: 'layer-3-hatch', bg: false, inner: true, yIn: -12, yOut: 6.55, order: 1 },
  { file: 'layer-4-top', bg: false, inner: false, yIn: -32, yOut: 26.82, order: 0 },
];

// Phase timings (seconds) — total cycle ~6s.
const IN_DUR = 1.1;
const STAGGER = 0.075;
const HOLD = 1.2;
const COLLAPSE_DUR = 1.1;
const FIX = 0.3; // beat on the assembled block
const OUT_DUR = 1.5;
const TAIL = 0.6; // empty beat before the loop restarts

// Phase 4 travel: up-right, with a slight scale-up.
const FLY_X = 22;
const FLY_Y = -14;
const FLY_SCALE = 1.08;

export default function OutreachDiagram() {
  const rootRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let tl: gsap.core.Timeline | undefined;

    const ctx = gsap.context(() => {
      tl = gsap.timeline({ repeat: -1 });

      const plates = LAYERS.map((l, i) => ({ ...l, el: layerRefs.current[i] })).filter(
        (l) => l.el
      );
      const stack = plates.filter((l) => !l.bg);
      const bg = plates.find((l) => l.bg);

      // Explicit reset so every loop starts from the same state.
      stack.forEach((l) => {
        tl!.set(l.el, { yPercent: l.yIn, xPercent: 0, scale: 1, opacity: 0 }, 0);
      });
      if (bg) tl.set(bg.el, { opacity: 0 }, 0);

      // 1. Enter — plates slide to their exploded positions and fade in.
      stack.forEach((l) => {
        tl!.to(
          l.el,
          { yPercent: 0, opacity: 1, duration: IN_DUR, ease: 'power2.out' },
          l.order * STAGGER
        );
      });
      if (bg) tl.to(bg.el, { opacity: 1, duration: 0.7, ease: 'power1.out' }, 0.1);

      // 2. Hold — nothing moves.
      const tCollapse = IN_DUR + 3 * STAGGER + HOLD;

      // 3. Collapse — everything converges to the stack centre.
      stack.forEach((l) => {
        tl!.to(
          l.el,
          { yPercent: l.yOut, duration: COLLAPSE_DUR, ease: 'power2.inOut' },
          tCollapse
        );
        // The filling disappears as the slab shuts. `power3.in` keeps the inner
        // plates at full opacity while the gaps are still open, then drops them
        // fast at the very end — by which point the top plate covers them, so
        // the vanish is imperceptible.
        if (l.inner) {
          tl!.to(
            l.el,
            { opacity: 0, duration: COLLAPSE_DUR * 0.95, ease: 'power3.in' },
            tCollapse
          );
        }
      });
      // The labels/leader lines point at the exploded plates, so retire them
      // as the stack closes up.
      if (bg) tl.to(bg.el, { opacity: 0, duration: COLLAPSE_DUR * 0.7 }, tCollapse);

      // 4. Fly out — diagonal drift up-right, scaling slightly, fading away.
      const tOut = tCollapse + COLLAPSE_DUR + FIX;
      stack.forEach((l) => {
        tl!.to(
          l.el,
          {
            yPercent: l.yOut + FLY_Y,
            xPercent: FLY_X,
            scale: FLY_SCALE,
            duration: OUT_DUR,
            ease: 'power2.in',
          },
          tOut
        );
        // Only the two visible plates need fading — the filling is already gone.
        if (!l.inner) {
          tl!.to(l.el, { opacity: 0, duration: OUT_DUR * 0.55, ease: 'power1.in' }, tOut);
        }
      });

      // Empty beat so the restart doesn't feel abrupt.
      tl.to({}, { duration: TAIL }, tOut + OUT_DUR);
    }, root);

    // Don't burn frames while the section is off-screen.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!tl) return;
        entry.isIntersecting ? tl.play() : tl.pause();
      },
      { rootMargin: '100px' }
    );
    io.observe(root);

    return () => {
      io.disconnect();
      ctx.revert();
    };
  }, []);

  return (
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
  );
}
