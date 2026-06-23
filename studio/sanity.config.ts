import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { schemaTypes } from './schemas/schema';

export default defineConfig({
  name: 'accelerate-b2b-studio',
  title: 'Accelerate B2B CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '25d88evy',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [deskTool()],
  schema: {
    types: schemaTypes,
  },
});
