# Removed / hidden sections archive

Snapshots of homepage sections that were taken out of the visible layout but kept
for safekeeping. The live content still exists in Sanity; these JSON files are a
stable copy so the section can be restored even if it is later deleted in Sanity.

## mechanism-section.json (`section_stages`)

The "stages" section (`mechanismSection`, component `MechanismSection.tsx`). It was
removed from the visible page and the `section_funnel` (`funnelSection`) now renders
in its place.

The removal/reorder is done in code, in `components/PageBuilder.tsx` (see the
"Render-order overrides" block), so the Sanity `page.home` document is unchanged.

To bring stages back:
1. Delete the reorder block in `components/PageBuilder.tsx` (restores natural order
   and re-renders `mechanismSection`).
2. If the section was also deleted from Sanity, re-add this object to the
   `sections` array of the `page.home` document.
