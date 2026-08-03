# Accelerate B2B

The Accelerate B2B landing page. Next.js (App Router), deployed on Vercel.

There is no CMS. Every page's text and images live in `content/*.json` in this repo — edit
the file, commit, and it ships with the next deploy. The site used to read from Sanity at
request time; that was removed in August 2026 (see `git log` for the reasoning).

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
```

That is the whole setup. Nothing is required in the environment to run the site locally —
`.env.local.example` lists the optional variables (Tag Manager container, Formspree form
id, Calendly URL) and what each one is for.

## How a page is built

`content/home.json` holds a `sections` array. Each entry has a `_type`, and
`components/PageBuilder.tsx` maps that `_type` to the component that renders it. To change
what appears on the page you either edit the content, or add a `case` to that switch.

| Route | Content file |
|---|---|
| `/` | `content/home.json` |
| `/booking` | `content/booking.json` |
| `/congrats` | `content/congrats.json` |
| `/privacy`, `/terms` | `content/legal/*.json` |
| `/llm-info` | `content/llm-info.json` |

`/congrats` reuses the reviews, FAQ and partners blocks from `content/home.json` rather
than keeping a second copy, so editing those updates both pages.

**Adding a case study is the common edit — see [CASE-STUDIES.md](CASE-STUDIES.md).**

## Images

Content images are static files under `public/images/content/`, committed to the repo and
served from the site's own domain. They are pre-converted to WebP at the size and quality
each slot renders them at, so nothing is resized at request time.

Each image in the content JSON carries its real dimensions:

```json
"asset": { "src": "/images/content/hero/example.webp", "width": 1396, "height": 786 }
```

Those `width`/`height` values let the browser reserve space before the image loads, which
is what stops the layout jumping. If you add an image, use its true pixel size — wrong
numbers are worse than none.

The helpers in `lib/image.ts` (`img`, `urlForImage`, `dims`) still accept width and quality
arguments, but both are ignored. They are leftovers from the CDN era, kept so the ~30 call
sites did not all have to change.

## Deploying

Push to `main`. Vercel builds and deploys automatically.

A failed build leaves the previous version live rather than breaking the site, so if a
change does not appear, check the deployment status in Vercel before assuming a caching
problem.
