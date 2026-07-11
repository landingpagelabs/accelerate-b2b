/*
  Seed the /booking page content as a `bookingPage` document in Sanity.
  Uploads the Calendly placeholder image.
  Run:  node studio/scripts/seed-booking.js
*/
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '..', '..', '.env.local') });
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const { createClient } = require('@sanity/client');
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_STUDIO_API_TOKEN || process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2026-06-18',
});

(async () => {
  console.log('Uploading Calendly placeholder...');
  const file = path.join(__dirname, '..', '..', 'public', 'images', 'booking', 'calendly-placeholder.png');
  const asset = await client.assets.upload('image', fs.readFileSync(file), {
    filename: 'calendly-placeholder.png',
    contentType: 'image/png',
  });

  const doc = {
    _id: 'bookingPage-main',
    _type: 'bookingPage',
    metaTitle: 'Book Consultation | Accelerate B2B',
    progressLabel: 'Almost Done',
    progressPercent: 95,
    titleLead: 'Last step:',
    titleRest: 'book your free consultation',
    calendlyImage: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
    barText: 'Your booking will be prioritized for another',
    timerMinutes: 10,
    proofCount: 8,
    proofText: 'requested a free consultation with us in the last 24 hours',
    proofVerifiedText: 'verified by Calendly',
    proofDelaySeconds: 2.5,
    leaveTitle: 'Leave site?',
    leaveText: 'Changes that you made may not be saved.',
    leaveCancelText: 'Cancel',
    leaveConfirmText: 'Leave',
    leaveDelaySeconds: 30,
  };

  await client.createOrReplace(doc);
  console.log('Done. bookingPage seeded.');
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
