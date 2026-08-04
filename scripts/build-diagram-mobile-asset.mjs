// Derives the mobile variant of the outreach diagram's label layer.
//
// layer-0-bg.svg carries four things on one 1078x454 canvas: the labels
// ("Data & Signals", "Personalization", "Integration", "Message Sending"),
// their leader lines, the floating tool marks, and the background texture.
// The labels are outlined paths at 19px on that canvas, so at a 390px viewport
// they render around 7.4px — unreadable. On mobile we ship the artwork without
// them and render the four terms as real text instead (see OutreachDiagram.tsx),
// which also lets the graphic itself grow: dropping the label columns collapses
// the used canvas from 1078 wide to 592, so the plates get ~1.7x bigger.
//
// The eight paths (4 labels + 4 leaders) sit in one contiguous range, so this is
// a pure deletion — the tool marks and texture are outside it and untouched.
//
// This runs as `prebuild`. If the designer re-exports layer-0-bg.svg and the
// markers move, it THROWS and the build fails. That is deliberate: the
// alternative is silently shipping stale artwork to mobile forever.
import { readFileSync, writeFileSync } from 'node:fs';

const BASE = 'public/images/sections/outreach-intro/layers/layer-0-bg';

// First byte of the "Data & Signals" glyph run, and the last leader line's tail.
const START = '<path d="M687.629 93.5117';
const END = 'fill="url(#paint15_linear_829_7174)" fill-opacity="0.25"/>';

const src = readFileSync(`${BASE}.svg`, 'utf8');
const from = src.indexOf(START);
const to = src.indexOf(END);

if (from < 0 || to < 0) {
  throw new Error(
    `build-diagram-mobile-asset: label block markers not found in ${BASE}.svg. ` +
      'The source artwork changed — re-derive the range before building.'
  );
}

const out = src.slice(0, from) + src.slice(to + END.length);
writeFileSync(`${BASE}--nolabels.svg`, out);

console.log(
  `build-diagram-mobile-asset: ${BASE}--nolabels.svg ` +
    `(${src.length} -> ${out.length} bytes, ${src.length - out.length} stripped)`
);
