/*
  Seed script for Sanity Studio sample content.
  Usage: set env vars and run from project root:
    NEXT_PUBLIC_SANITY_PROJECT_ID=... SANITY_STUDIO_API_TOKEN=... node studio/scripts/seed.js
*/
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const rootEnv = path.join(__dirname, '..', '..', '.env.local');
const studioEnv = path.join(__dirname, '..', '.env');

dotenv.config({ path: rootEnv });
dotenv.config({ path: studioEnv });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_STUDIO_API_TOKEN || process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_STUDIO_API_TOKEN. Exiting.');
  process.exit(1);
}

const { createClient } = require('@sanity/client');
const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion: '2026-06-18',
});

const samplesDir = path.join(__dirname, '..', 'samples');
const sampleFiles = fs.readdirSync(samplesDir).filter((filename) => filename.endsWith('.json'));
const samples = sampleFiles.map((filename) => {
  const filePath = path.join(samplesDir, filename);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
});

(async () => {
  try {
    for (const sample of samples) {
      console.log('Creating/Updating sample document:', sample._id);
      await client.createOrReplace(sample);
    }
    console.log('Seed complete.');
  } catch (err) {
    console.error('Seed failed:', err.message || err);
    process.exit(1);
  }
})();
