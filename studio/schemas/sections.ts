export const heroSection = {
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  fields: [
    { name: 'straplineImage', title: 'Strapline Logo', type: 'image', options: { hotspot: true } },
    { name: 'straplineText', title: 'Strapline Text', type: 'string' },
    { name: 'heading', title: 'Heading (H1)', type: 'string' },
    { name: 'subtitle', title: 'Subtitle', type: 'text' },
    { name: 'stepLabel', title: 'Step Label (e.g. Step 1/2)', type: 'string' },
    { name: 'videoLabel', title: 'Video Label', type: 'string' },
    { name: 'videoImage', title: 'Video Thumbnail', type: 'image', options: { hotspot: true } },
  ],
};

export const outreachIntroSection = {
  name: 'outreachIntroSection', title: 'Outreach Intro Section', type: 'object',
  fields: [
    { name: 'heading', title: 'Heading', type: 'string' },
    { name: 'text', title: 'Text', type: 'text' },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }: any) => ({ title: title || 'Outreach Intro Section' }),
  },
};

export const featureSection = {
  name: 'featureSection',
  title: 'Feature Section',
  type: 'object',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'subtitle', title: 'Subtitle', type: 'text' },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'feature',
          fields: [
            { name: 'title', title: 'Feature Title', type: 'string' },
            { name: 'description', title: 'Feature Description', type: 'text' },
          ],
        },
      ],
    },
  ],
};

export const contentSection = {
  name: 'contentSection',
  title: 'Content Section',
  type: 'object',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }] },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    {
      name: 'imagePosition',
      title: 'Image Position',
      type: 'string',
      options: {
        list: [
          { title: 'Right', value: 'right' },
          { title: 'Left', value: 'left' },
        ],
        layout: 'radio',
      },
      initialValue: 'right',
    },
  ],
};

export const testimonialSection = {
  name: 'testimonialSection',
  title: 'Testimonial Section',
  type: 'object',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'subtitle', title: 'Subtitle', type: 'text' },
    {
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'quote', title: 'Quote', type: 'text' },
            { name: 'authorName', title: 'Author Name', type: 'string' },
            { name: 'authorRole', title: 'Author Role', type: 'string' },
          ],
        },
      ],
    },
  ],
};

export const statsSection = {
  name: 'statsSection',
  title: 'Stats Section',
  type: 'object',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    {
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'value', title: 'Value', type: 'string' },
          ],
        },
      ],
    },
  ],
};

export const ctaSection = {
  name: 'ctaSection',
  title: 'CTA Section',
  type: 'object',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'subtitle', title: 'Subtitle', type: 'text' },
    { name: 'buttonText', title: 'Button Text', type: 'string' },
    { name: 'buttonUrl', title: 'Button URL', type: 'url', validation: (Rule: any) => Rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] }) },
  ],
};

export const logoGridSection = {
  name: 'logoGridSection',
  title: 'Logo Grid Section',
  type: 'object',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    {
      name: 'logos',
      title: 'Logos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Alt text', type: 'string' },
            { name: 'image', title: 'Logo image', type: 'image', options: { hotspot: true } },
          ],
        },
      ],
    },
  ],
};

export const partnersSection = {
  name: 'partnersSection', title: 'Partners Section', type: 'object',
  fields: [
    { name: 'heading', title: 'Heading', type: 'string' },
    { name: 'logos', title: 'Logos — Row 1', type: 'array', of: [{ type: 'object', fields: [
      { name: 'image', title: 'Logo', type: 'image', options: { hotspot: true } },
      { name: 'alt', title: 'Alt text', type: 'string' },
    ]}]},
    { name: 'logosRow2', title: 'Logos — Row 2', type: 'array', of: [{ type: 'object', fields: [
      { name: 'image', title: 'Logo', type: 'image', options: { hotspot: true } },
      { name: 'alt', title: 'Alt text', type: 'string' },
    ]}]},
  ],
};

export const comparisonSection = {
  name: 'comparisonSection', title: 'Comparison Section', type: 'object',
  fields: [
    { name: 'reviewQuote', title: 'Review Quote (left)', type: 'string' },
    { name: 'reviewQuote2', title: 'Review Quote (right, hidden on mobile)', type: 'string' },
    { name: 'heading', title: 'Heading', type: 'string' },
    { name: 'text', title: 'Text', type: 'text' },
    { name: 'col1Title', title: 'Column 1 Title', type: 'string' },
    { name: 'col1Image', title: 'Column 1 Image', type: 'image', options: { hotspot: true } },
    { name: 'col1Items', title: 'Column 1 Items (negatives)', type: 'array', of: [{ type: 'string' }] },
    { name: 'col2Title', title: 'Column 2 Title', type: 'string' },
    { name: 'col2Badge', title: 'Column 2 Badge', type: 'string' },
    { name: 'col2Image', title: 'Column 2 Image', type: 'image', options: { hotspot: true } },
    { name: 'col2Items', title: 'Column 2 Items (positives)', type: 'array', of: [{ type: 'string' }] },
  ],
};

export const mechanismSection = {
  name: 'mechanismSection', title: 'Mechanism Section (Stages Funnel)', type: 'object',
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'quote', title: 'Quote' },
  ],
  fields: [
    { name: 'heading', title: 'Heading', type: 'string', group: 'content' },
    {
      name: 'stages',
      title: 'Stages (exactly 4, top to bottom)',
      type: 'array',
      group: 'content',
      validation: (Rule: any) => Rule.max(4),
      of: [{ type: 'object', fields: [
        { name: 'label', title: 'Label', type: 'string', description: 'e.g. "STAGE 01 · CONTACTED"' },
        { name: 'text', title: 'Description', type: 'string', description: 'e.g. "120,000 prospects in your ideal customer profile contacted"' },
      ]}],
    },
    { name: 'note', title: 'Footnote', type: 'string', description: 'e.g. "*Average yearly outcomes. Results depend on multiple factors."', group: 'content' },

    { name: 'quoteAvatar', title: 'Avatar', type: 'image', options: { hotspot: true }, group: 'quote' },
    { name: 'quoteText', title: 'Quote Text', type: 'string', group: 'quote' },
    { name: 'quoteAuthorName', title: 'Author Name', type: 'string', group: 'quote' },
    { name: 'quoteAuthorRole', title: 'Author Role', type: 'string', group: 'quote' },
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }: any) => ({ title: title || 'Mechanism Section (Stages Funnel)' }),
  },
};

export const servicesSection = {
  name: 'servicesSection', title: 'Services Section', type: 'object',
  fields: [
    { name: 'heading', title: 'Heading', type: 'string' },
    { name: 'services', title: 'Services', type: 'array', of: [{ type: 'object', fields: [
      { name: 'title', title: 'Title', type: 'string' },
      { name: 'description', title: 'Description', type: 'text' },
      { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    ]}]},
  ],
};

export const caseStudiesSection = {
  name: 'caseStudiesSection', title: 'Case Studies Section', type: 'object',
  fields: [
    { name: 'heading', title: 'Heading', type: 'string' },
    { name: 'tabs', title: 'Tab Labels', type: 'array', of: [{ type: 'string' }] },
    { name: 'cases', title: 'Case Studies', type: 'array', of: [{ type: 'object', fields: [
      { name: 'image', title: 'Card Image', type: 'image', options: { hotspot: true } },
      { name: 'companyLogo', title: 'Company Logo', type: 'image', options: { hotspot: true } },
      { name: 'companyName', title: 'Company Name (modal tag)', type: 'string' },
      { name: 'title', title: 'Title', type: 'string' },
      { name: 'quote', title: 'Quote', type: 'text' },
      { name: 'author', title: 'Author', type: 'string' },
      { name: 'authorRole', title: 'Author Role (e.g. Owner, LH Capital Group)', type: 'string' },
      { name: 'avatar', title: 'Author Avatar', type: 'image', options: { hotspot: true } },
      { name: 'category', title: 'Category (tab)', type: 'string' },
      { name: 'categoryLabel', title: 'Modal Category Pill (defaults to Category)', type: 'string' },
      { name: 'description', title: 'Modal Description (paragraph before bullets)', type: 'text' },
      { name: 'bullets', title: 'Modal Bullet Points', type: 'array', of: [{ type: 'string' }] },
      { name: 'stats', title: 'Modal Stats', type: 'array', of: [{ type: 'object', fields: [
        { name: 'value', title: 'Value (e.g. $500K)', type: 'string' },
        { name: 'label', title: 'Label (e.g. In fees)', type: 'string' },
      ]}]},
      { name: 'screenshotImage', title: 'Modal Screenshot Image', type: 'image', options: { hotspot: true } },
    ]}]},
  ],
};

export const infoSection = {
  name: 'infoSection', title: 'Info / Founder Section', type: 'object',
  fields: [
    { name: 'heading', title: 'Heading', type: 'string' },
    { name: 'decorImage', title: 'Decor Image (sticky note, top right)', type: 'image', options: { hotspot: true } },
    { name: 'body', title: 'Body Text (leave a blank line between paragraphs)', type: 'text', rows: 12 },
    { name: 'authorName', title: 'Author Name', type: 'string' },
    { name: 'authorRole', title: 'Author Role', type: 'string' },
    { name: 'signatureImage', title: 'Signature / small image (next to name)', type: 'image', options: { hotspot: true } },
  ],
};

export const reviewsSection = {
  name: 'reviewsSection', title: 'Reviews Section', type: 'object',
  fields: [
    { name: 'heading', title: 'Heading', type: 'string' },
    { name: 'reviews', title: 'Reviews', type: 'array', of: [{ type: 'object', fields: [
      { name: 'cardType', title: 'Card Type', type: 'string', options: { layout: 'radio', list: [
        { title: 'Testimonial (stars + quote)', value: 'testimonial' },
        { title: 'Video (Vimeo + quote)', value: 'video' },
        { title: 'Result (title + image)', value: 'result' },
      ]}, initialValue: 'testimonial' },
      { name: 'quote', title: 'Quote (testimonial/video)', type: 'text' },
      { name: 'authorName', title: 'Author Name', type: 'string' },
      { name: 'authorRole', title: 'Author Role', type: 'string' },
      { name: 'avatar', title: 'Avatar', type: 'image', options: { hotspot: true } },
      { name: 'videoUrl', title: 'Video embed URL (video card)', type: 'url' },
      { name: 'title', title: 'Title (result card)', type: 'string' },
      { name: 'image', title: 'Image (result card)', type: 'image', options: { hotspot: true } },
      { name: 'category', title: 'Tab Category', type: 'string', options: { layout: 'radio', list: [
        { title: 'Testimonials', value: 'testimonial' },
        { title: 'Results', value: 'result' },
        { title: 'Replies', value: 'reply' },
      ]}},
    ]}]},
  ],
};

export const faqsSection = {
  name: 'faqsSection', title: 'FAQs Section', type: 'object',
  fields: [
    { name: 'heading', title: 'Heading', type: 'string' },
    { name: 'faqs', title: 'FAQs', type: 'array', of: [{ type: 'object', fields: [
      { name: 'question', title: 'Question', type: 'string' },
      { name: 'answer', title: 'Answer', type: 'text' },
    ]}]},
  ],
};

export const textImageSection = {
  name: 'textImageSection', title: 'Text + Image Section', type: 'object',
  fields: [
    { name: 'heading', title: 'Heading', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
  ],
};

export const bannerSection = {
  name: 'bannerSection', title: 'Banner Section', type: 'object',
  fields: [
    { name: 'leftIcon', title: 'Left Icon', type: 'image', options: { hotspot: true } },
    { name: 'text', title: 'Text', type: 'text' },
    { name: 'rightImage', title: 'Right Image', type: 'image', options: { hotspot: true } },
  ],
  preview: {
    select: { text: 'text', media: 'leftIcon' },
    prepare({ text, media }: any) {
      return { title: 'Banner Section', subtitle: text, media };
    },
  },
};

export const consultationModalSection = {
  name: 'consultationModalSection',
  title: 'Consultation Modal (popup)',
  type: 'object',
  description: "Popup \"Can't find what you're looking for?\". Shows on exit-intent (desktop) or after a delay/scroll (mobile).",
  fields: [
    { name: 'heading', title: 'Heading', type: 'string', initialValue: "Can't find what you're looking for?" },
    { name: 'description', title: 'Description', type: 'text', rows: 3 },
    { name: 'buttonText', title: 'Button Text', type: 'string', initialValue: 'Book Your Free Consultation' },
    { name: 'buttonUrl', title: 'Button URL', type: 'url', validation: (Rule: any) => Rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] }) },
    { name: 'image', title: 'Preview Image (optional, falls back to default)', type: 'image', options: { hotspot: true } },
    {
      name: 'maxPerSession',
      title: 'Max shows per session',
      type: 'number',
      description: 'Maximum number of times to show to one user per session.',
      initialValue: 2,
      validation: (Rule: any) => Rule.min(1).max(10),
    },
    {
      name: 'fallbackDelaySeconds',
      title: 'Mobile fallback delay (seconds)',
      type: 'number',
      description: 'On mobile (no cursor) the popup appears after this many seconds.',
      initialValue: 15,
      validation: (Rule: any) => Rule.min(0),
    },
    {
      name: 'scrollPercent',
      title: 'Mobile fallback scroll (%)',
      type: 'number',
      description: 'Or when the user scrolls this % of the page (whichever comes first).',
      initialValue: 60,
      validation: (Rule: any) => Rule.min(0).max(100),
    },
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }: any) {
      return { title: title || 'Consultation Modal', subtitle: 'Popup / exit-intent' };
    },
  },
};

export const vslModalSection = {
  name: 'vslModalSection',
  title: 'VSL Modal (video popup)',
  type: 'object',
  description: 'Video/image modal (VSL). Opens on click of an element with the data-open-vsl attribute or a link to #vsl / #explainer-video.',
  fields: [
    {
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      description: 'What to show in the popup — image or video.',
      options: {
        layout: 'radio',
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
      },
      initialValue: 'image',
    },
    {
      name: 'image',
      title: 'Image (optional, falls back to default)',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }: any) => parent?.mediaType === 'video',
    },
    {
      name: 'videoFile',
      title: 'Upload Video',
      type: 'file',
      description: 'Upload your own video (mp4/webm). Takes priority over Video URL.',
      options: { accept: 'video/*' },
      hidden: ({ parent }: any) => parent?.mediaType !== 'video',
    },
    {
      name: 'videoUrl',
      title: 'Or Video URL (YouTube / Vimeo / .mp4)',
      type: 'url',
      description: 'If you are not uploading a file, paste a video link.',
      hidden: ({ parent }: any) => parent?.mediaType !== 'video',
    },
    {
      name: 'poster',
      title: 'Video Poster (optional)',
      type: 'image',
      description: 'Poster image shown before the video plays.',
      options: { hotspot: true },
      hidden: ({ parent }: any) => parent?.mediaType !== 'video',
    },
    { name: 'imageLink', title: 'Image Link (optional, only for Image)', type: 'url', hidden: ({ parent }: any) => parent?.mediaType === 'video' },
    { name: 'buttonText', title: 'Button Text', type: 'string', initialValue: 'Apply For Your Free Test Campaign' },
    { name: 'buttonUrl', title: 'Button URL', type: 'url', validation: (Rule: any) => Rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] }) },
    { name: 'note', title: 'Note (under button)', type: 'string', initialValue: 'No Setup Fee | No Lock-In | Only A Few Spots Available' },
  ],
  preview: {
    select: { title: 'buttonText', media: 'image' },
    prepare({ title }: any) {
      return { title: 'VSL Modal', subtitle: title || 'Video popup' };
    },
  },
};

export const tutorialsSection = {
  name: 'tutorialsSection', title: 'Tutorials / YouTube Section', type: 'object',
  fields: [
    { name: 'heading', title: 'Heading', type: 'string' },
    { name: 'bigVideoUrl', title: 'Main Video (YouTube link)', type: 'url' },
    { name: 'smallVideos', title: 'Small Videos (YouTube links)', type: 'array', of: [{ type: 'url' }] },
    { name: 'ctaText', title: 'Button Text', type: 'string', initialValue: 'View YouTube Channel' },
    { name: 'ctaUrl', title: 'Button URL', type: 'url', validation: (Rule: any) => Rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] }) },
  ],
};
