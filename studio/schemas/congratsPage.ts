// /congrats — "Consultation Booked" thank-you page. Single document.
// Edit at: Content → Congrats Page. (Header/footer chrome stays in code.)

const congratsPage = {
  name: 'congratsPage',
  title: 'Congrats Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'steps', title: 'Steps' },
    { name: 'about', title: 'About Banner' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    { name: 'metaTitle', title: 'SEO Title', type: 'string', group: 'seo' },
    { name: 'headerBadge', title: 'Header Badge', type: 'string', description: 'Top-right badge, e.g. "CONSULTATION BOOKED!".', group: 'hero' },
    { name: 'heroStrapline', title: 'Hero Strapline', type: 'string', group: 'hero' },
    { name: 'heroTitle', title: 'Hero Title (H1)', type: 'text', rows: 2, group: 'hero' },
    { name: 'heroSubtitle', title: 'Hero Subtitle', type: 'text', rows: 4, group: 'hero' },

    { name: 'stepsHeading', title: 'Steps Heading', type: 'text', rows: 2, group: 'steps' },
    {
      name: 'steps',
      title: 'Steps',
      type: 'array',
      group: 'steps',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'strapline', title: 'Strapline (e.g. "Step 01")', type: 'string' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'body', title: 'Body', type: 'text', rows: 4 },
            {
              name: 'widget',
              title: 'Trailing Widget',
              type: 'string',
              description: 'Extra element shown under the step.',
              options: {
                layout: 'radio',
                list: [
                  { title: 'Image', value: 'image' },
                  { title: 'Copy-message box', value: 'copyMessage' },
                  { title: 'Decorative chevron', value: 'chevron' },
                  { title: 'None', value: 'none' },
                ],
              },
              initialValue: 'none',
            },
            { name: 'image', title: 'Image (for "Image" widget)', type: 'image', options: { hotspot: true }, hidden: ({ parent }: any) => parent?.widget !== 'image' },
          ],
          preview: { select: { title: 'title', subtitle: 'strapline' } },
        },
      ],
    },
    { name: 'referralMessage', title: 'Referral Message (copy box)', type: 'text', rows: 5, group: 'steps' },

    { name: 'aboutTitle', title: 'About Title', type: 'string', group: 'about' },
    { name: 'aboutDividerText', title: 'Divider Text (e.g. "TALK SOON")', type: 'string', group: 'about' },
    { name: 'aboutImage', title: 'About Avatar', type: 'image', options: { hotspot: true }, group: 'about' },
    { name: 'aboutName', title: 'Name', type: 'string', group: 'about' },
    { name: 'aboutRole', title: 'Role', type: 'string', group: 'about' },
    { name: 'aboutCertified', title: 'Certified Text', type: 'string', group: 'about' },
    { name: 'aboutCtaText', title: 'CTA Text', type: 'string', group: 'about' },
    { name: 'aboutCtaUrl', title: 'CTA URL', type: 'string', group: 'about' },
  ],
  preview: { prepare: () => ({ title: 'Congrats Page' }) },
};

export default congratsPage;
