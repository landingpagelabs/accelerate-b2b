Rework section_outreach-intro → Dribbble-style per-layer isometric loop
Context
The outreach-intro diagram today is a GSAP ScrollTrigger effect (components/sections/OutreachDiagram.tsx): the section pins and cross-fades three whole-image SVG states (outreach-closed/middle/open.svg) as you scroll. The user wants the Dribbble "Isometric Hero Section Animated" feel: an autonomous, continuously-looping exploded assembly where each isometric plate floats independently (staggered).

Decisions locked with the user: per-layer motion; autonomous loop (drop the scroll-pin); and the layers must be derived from the designer's own SVGs, not invented — the user hands me Closed State svg / Middle State svg / Open State svg (in the repo root) and I do the splitting.

Findings from inspecting those files (byte-for-byte the flat states already in public/images/sections/outreach-intro/): they're not vector-layered. The Open state is one 1078×454 SVG of ~13 unlabeled <g> groups + 4 embedded base64 raster <image>s, with two faint opacity="0.13" groups for the background circle/hatch. No ready-made layers → I decompose it. Also: no SVG rasterizer is installed (no rsvg/cairosvg/inkscape/imagemagick/sharp/resvg/puppeteer) — only macOS qlmanage (Quick Look previews).

Approach

1. Decompose the Open state into per-plate SVG layers (no rasterization, stays vector/transparent)
   Identify which top-level <g>/<use> groups draw each isometric plate by previewing group-toggled copies of the SVG (use qlmanage -t for quick visual previews; add a dev-only renderer only if Quick Look is inadequate — nothing new is shipped to users either way).
   Split the source markup into layer-1.svg … layer-N.svg (~5, bottom→top) + bg.svg (the two opacity="0.13" groups). Each output keeps the same viewBox (0 0 1078 454) and includes the shared <defs> (clipPaths + <image>s) so <use> references still resolve; only the plate's body elements differ. SVGs are transparent by construction, so stacking them reproduces the original Open image exactly.
   Output to public/images/sections/outreach-intro/layers/.
2. Rework the animation → stacked <img> layers, autonomous staggered float
   components/sections/OutreachDiagram.tsx (rewrite): render a LAYERS array as stacked <img className="outreach-diagram__layer"> (+ a static bg). Remove the ScrollTrigger import and the pinned/scrubbed timeline. Per layer: gsap.to(el, { y: -amp(i), duration: 2.4–3.6, ease:'sine.inOut', repeat:-1, yoyo:true, delay: i*stagger }) — amplitude grows toward the top plates, stagger ≈ 0.12–0.2s. Keep 'use client' + gsap.context()/ctx.revert(). Motion is a subtle continuous float near the exploded positions (what the Dribbble actually does), not a full re-assemble — flat art can't nest back cleanly, so keep amplitude modest.
   Guards: keep the prefers-reduced-motion early-return; run on mobile too (remove the <768px skip — a loop is cheap without a pin); add an IntersectionObserver that .pause()/.resume()s off-screen (new, better precedent — none exists today).
   app/globals.css (outreach-diagram block, ~lines 2109–2174): replace the --closed/--middle/--open rules with generic stacked-layer rules (position:absolute; inset:0; width:100%; height:auto; will-change:transform), keep .outreach-diagram { aspect-ratio: 1078/454 }, add @media (prefers-reduced-motion: reduce){ transform:none }. Check .section_outreach-intro { overflow:hidden } — give the diagram vertical headroom so upward float isn't clipped.
   Static / reduced-motion / no-JS fallback: at rest the stacked layers already equal the assembled Open image; keep outreach-open.svg as the reduced-motion single-<img> fallback.
   Cleanup: relocate the root Closed/Middle/Open State svg into the repo and delete them from the root; retire the orphaned outreach-image.webp and any unused states.
   No change to OutreachIntroSection.tsx (heading/text from Sanity), PageBuilder.tsx, or the schema.
   Sequencing
   Decomposition spike — identify plate groups, produce layer-*.svg + bg.svg, and confirm the stacked layers render identical to the original Open state. Report the produced layers before wiring the animation.
   Build the animation framework + CSS; tune amplitude / stagger / duration.
   Clean up root SVGs + unused assets.
   Verification
   npm run dev; scroll to section_outreach-intro: plates float independently and staggered; section no longer pins; layers stay pixel-aligned; no layout shift (aspect-ratio); loop pauses off-screen.
   OS Reduce motion → static assembled image, zero motion. Check desktop + mobile.
   Before enabling motion, confirm the split layers stacked at rest are visually identical to the original Open SVG.
   Risks / fallback
   Clean plate isolation is the main risk (raster-heavy, unlabeled source). If a plate can't be isolated by group-splitting (e.g. multiple plates baked into one embedded raster), that plate stays part of a combined layer, or — worst case — I fall back to a whole-assembly autonomous loop (loop/drift the 3 existing states) which uses the exact art with zero artifacts but isn't per-independent-layer. I'll surface this only if step 1 proves intractable.
