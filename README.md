# Accelerate B2B Mini CMS

Next.js + Sanity starter for landing pages built from reusable block sections.

## How it works
- `studio/` contains Sanity Studio for editing pages
- `app/` renders pages from the CMS using sections
- The `Page` document with a `sections` array lets you build pages like ACF blocks

## Quick start: seed demo content

1. Copy `studio/.env.example` to `studio/.env` and fill `NEXT_PUBLIC_SANITY_PROJECT_ID` and `SANITY_STUDIO_API_TOKEN`.
2. From project root run:

```bash
npm run studio      # starts Sanity Studio at http://localhost:3334
npm run studio:seed # seeds demo `home` page and sample `Post` into your Sanity project (requires tokens)
```


## Setup
1. Copy `.env.local.example` to `.env.local`
2. Fill in `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`

## Running
- `npm install`
- `npm run dev` — start Next.js
- `npm run studio` — start Sanity Studio

## How to create a page
1. Start Sanity Studio
2. Create a `Page` document
3. Add `slug` = `home`
4. Add the needed sections: Hero, Feature, Content, Testimonial, Stats, CTA, Logo Grid

## Adding a blog
1. In Sanity Studio create a `Post` document
2. Set `title`, `slug`, `publishedAt`, `mainImage`, and `body`
3. Open `/posts` in Next.js for the list of posts

## Deploy to Vercel
- Connect the repository to Vercel
- Add environment variables: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_STUDIO_API_TOKEN`
- Set `NODE_ENV=production` by default

