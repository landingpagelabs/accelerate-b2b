# Adding a case study

The site's text and images live in `content/*.json` in this repo. There's no CMS to log
into — you edit a file, commit it, and the change is live in about a minute.

Case studies are the thing you'll add most often, so this walks through that one end to
end. Everything else on the page works the same way.

## The short version

1. Put the images in `public/images/content/case-studies/`
2. Copy an existing entry in `content/home.json` and change the words
3. Commit and push — Vercel deploys `main` automatically

If you're using Claude Code, this whole file is the brief. Say:

> Add a new case study to content/home.json for [company]. Copy the shape of the existing
> entries. The images are at [paths]. Here's the copy: [...]

## Where it lives

`content/home.json` → the section with `"_type": "caseStudiesSection"` → its `cases` array.

There are 5 entries in there now. **Copy the whole of one and edit it** rather than writing
one from scratch — that way you can't miss a field.

## What each field does

| Field | What it is |
|---|---|
| `_key` | Unique id for this entry. Just make it different from the others (`case_5`, `case_6`…). |
| `title` | The headline on the card. The strongest specific result, e.g. *"Two businesses under contract in the first 30 days, off-market"*. |
| `description` | Two or three sentences on who the client is and what they do. |
| `quote` | Their words, in curly quotes. |
| `author` | `Name, Company` — shown under the quote. |
| `authorRole` | `Name, Role, Company` — the longer form used in the modal. |
| `companyName` | Company name on its own. |
| `category` | Groups the card under a filter tab. **Must exactly match one of the `tabs` values** in the same section, or the card won't show under any tab. |
| `categoryLabel` | The same thing, but capitalised how you want it displayed. |
| `bullets` | List of short outcome lines. |
| `stats` | The number tiles. Keep to the same count as the other entries so the cards line up. |

### The image fields

Five of them, each pointing at a file you've added:

| Field | Used for | Size to export |
|---|---|---|
| `avatar` | Small round headshot | 88px wide |
| `companyLogo` | Logo on the card | 174px wide |
| `image` | Main card image | 680px wide |
| `screenshotImage` | Large image inside the modal | 900px wide |
| `videoThumbnail` | Video poster in the modal | 650px wide |

Each one looks like this:

```json
"avatar": {
  "_type": "image",
  "asset": {
    "src": "/images/content/case-studies/their-headshot.webp",
    "width": 88,
    "height": 88
  }
}
```

Three rules for images:

1. **Save as `.webp`.** Export a PNG or JPG, then convert it — a WebP is roughly a tenth of
   the size for the same quality. Any online converter does it, or ask Claude Code.
2. **`width` and `height` must be the file's real pixel dimensions.** They tell the browser
   how much space to reserve, which stops the page jumping around while images load. Wrong
   numbers are worse than none.
3. **`src` always starts with `/images/content/`** — no domain, no `./`.

## Publishing

```bash
git add content/home.json public/images/content/case-studies/
git commit -m "Add the [company] case study"
git push
```

Vercel picks up the push and redeploys. Give it a minute, then hard-refresh the page.

If the site doesn't change, check the deployment in the Vercel dashboard — a failed build
leaves the previous version live rather than breaking the site, so a stale page usually
means the build didn't succeed.

## If something looks wrong

- **Card doesn't appear** — `category` probably doesn't match one of the `tabs` values
  exactly. It's case- and space-sensitive.
- **Broken image icon** — the `src` path doesn't match the file. Check spelling and that the
  file really is in `public/images/content/case-studies/`.
- **Page won't build** — almost always a JSON typo: a missing comma between entries, or a
  trailing comma after the last one. Paste the file into any JSON validator and it'll point
  at the line.
- **Anything else** — `git revert` the last commit and push. The previous version comes
  straight back.

## The one thing not to do

Don't edit `content/*.json` and `public/images/content/` in the Vercel or GitHub web editor
for anything more than a typo. Both files need to change together for a new case study, and
committing them separately puts a broken state live in between.
