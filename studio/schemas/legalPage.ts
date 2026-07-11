const legalPage = {
  name: 'legalPage',
  title: 'Legal Page (Privacy / Terms)',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Page heading, e.g. "Privacy Policy".',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL path: "privacy" or "terms".',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'string',
      description: 'Shown in the eyebrow, e.g. "June 9, 2026".',
    },
    {
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
    },
    {
      name: 'ctaUrl',
      title: 'CTA Button URL',
      type: 'string',
    },
    {
      name: 'ctaNote',
      title: 'CTA Note (small text under button)',
      type: 'string',
    },
    {
      name: 'sections',
      title: 'Content Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Section Title', type: 'string' },
            {
              name: 'body',
              title: 'Section Body',
              type: 'text',
              rows: 6,
              description: 'Use a blank line between paragraphs.',
            },
          ],
          preview: { select: { title: 'title' } },
        },
      ],
    },
    {
      name: 'metaTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Browser tab / search result title.',
    },
    {
      name: 'metaDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current' },
  },
};

export default legalPage;
