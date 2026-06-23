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
    { name: 'buttonUrl', title: 'Button URL', type: 'url' },
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
    { name: 'logos', title: 'Logos', type: 'array', of: [{ type: 'object', fields: [
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

export const meetingSection = {
  name: 'meetingSection', title: 'Meeting Calculator Section', type: 'object',
  fields: [
    { name: 'heading', title: 'Heading', type: 'string' },
    { name: 'testimonialQuote', title: 'Testimonial Quote', type: 'string' },
    { name: 'testimonialAuthor', title: 'Testimonial Author', type: 'string' },
    { name: 'testimonialRole', title: 'Testimonial Role', type: 'string' },
    { name: 'testimonialAvatar', title: 'Testimonial Avatar', type: 'image', options: { hotspot: true } },
  ],
};

export const mechanismSection = {
  name: 'mechanismSection', title: 'Mechanism Section', type: 'object',
  fields: [
    { name: 'heading', title: 'Heading', type: 'string' },
    { name: 'text', title: 'Text', type: 'text' },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
  ],
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
      { name: 'title', title: 'Title', type: 'string' },
      { name: 'quote', title: 'Quote', type: 'text' },
      { name: 'author', title: 'Author', type: 'string' },
      { name: 'avatar', title: 'Author Avatar', type: 'image', options: { hotspot: true } },
      { name: 'category', title: 'Category (tab)', type: 'string' },
    ]}]},
  ],
};

export const infoSection = {
  name: 'infoSection', title: 'Info / Founder Section', type: 'object',
  fields: [
    { name: 'heading', title: 'Heading', type: 'string' },
    { name: 'body', title: 'Body Text (leave a blank line between paragraphs)', type: 'text', rows: 12 },
    { name: 'authorName', title: 'Author Name', type: 'string' },
    { name: 'authorRole', title: 'Author Role', type: 'string' },
    { name: 'signatureImage', title: 'Signature / small image (next to name)', type: 'image', options: { hotspot: true } },
    { name: 'contentImage', title: 'Big content image (bottom)', type: 'image', options: { hotspot: true } },
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
};

export const tutorialsSection = {
  name: 'tutorialsSection', title: 'Tutorials / YouTube Section', type: 'object',
  fields: [
    { name: 'heading', title: 'Heading', type: 'string' },
    { name: 'bigVideoUrl', title: 'Main Video (YouTube link)', type: 'url' },
    { name: 'smallVideos', title: 'Small Videos (YouTube links)', type: 'array', of: [{ type: 'url' }] },
    { name: 'ctaText', title: 'Button Text', type: 'string', initialValue: 'View YouTube Channel' },
    { name: 'ctaUrl', title: 'Button URL', type: 'url' },
  ],
};
