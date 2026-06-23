import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '25d88evy',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-06-18',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_STUDIO_API_TOKEN,
});
