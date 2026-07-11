// LLM-info page — a structured entity document for AI assistants.
// Single document (one per site). Edit at: Content → LLM Info Page.

const KIND_LIST = [
  { title: 'Meta line (small grey)', value: 'meta' },
  { title: 'Lead paragraph (intro)', value: 'lead' },
  { title: 'Paragraph', value: 'para' },
  { title: 'Strong line (bold standalone)', value: 'strong' },
  { title: 'Lead-in paragraph (bold label + text)', value: 'leadin' },
  { title: 'Bullet list', value: 'list' },
  { title: 'Definition list (label + value)', value: 'deflist' },
  { title: 'Numbered definition list', value: 'orderedDefList' },
  { title: 'Sub-section (title + body)', value: 'sub' },
  { title: 'Sub-section with bullet list', value: 'subList' },
];

const show = (kinds: string[]) => ({ parent }: any) => !kinds.includes(parent?.kind);

const llmBlock = {
  type: 'object',
  name: 'llmBlock',
  title: 'Block',
  fields: [
    {
      name: 'kind',
      title: 'Block Type',
      type: 'string',
      options: { list: KIND_LIST },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 4,
      hidden: show(['meta', 'lead', 'para', 'strong', 'leadin']),
    },
    {
      name: 'label',
      title: 'Bold Label (lead-in)',
      type: 'string',
      hidden: show(['leadin']),
    },
    {
      name: 'title',
      title: 'Sub-section Title',
      type: 'string',
      hidden: show(['sub', 'subList']),
    },
    {
      name: 'body',
      title: 'Sub-section Body',
      type: 'text',
      rows: 4,
      hidden: show(['sub']),
    },
    {
      name: 'items',
      title: 'List Items',
      type: 'array',
      of: [{ type: 'string' }],
      hidden: show(['list', 'subList']),
    },
    {
      name: 'defItems',
      title: 'Definition Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'value', title: 'Value', type: 'text', rows: 2 },
          ],
          preview: { select: { title: 'label', subtitle: 'value' } },
        },
      ],
      hidden: show(['deflist', 'orderedDefList']),
    },
  ],
  preview: {
    select: { kind: 'kind', text: 'text', title: 'title' },
    prepare({ kind, text, title }: any) {
      return { title: title || text || `(${kind})`, subtitle: kind };
    },
  },
};

const llmInfoPage = {
  name: 'llmInfoPage',
  title: 'LLM Info Page',
  type: 'document',
  fields: [
    { name: 'title', title: 'Page Title (H1)', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'lastUpdated', title: 'Last Updated', type: 'string', description: 'Shown in the eyebrow, e.g. "June 2026".' },
    { name: 'metaTitle', title: 'SEO Title', type: 'string' },
    { name: 'metaDescription', title: 'SEO Description', type: 'text', rows: 2 },
    {
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'llmSection',
          fields: [
            { name: 'heading', title: 'Heading (optional)', type: 'string' },
            { name: 'blocks', title: 'Blocks', type: 'array', of: [llmBlock] },
          ],
          preview: {
            select: { title: 'heading', blocks: 'blocks' },
            prepare({ title, blocks }: any) {
              return { title: title || '(intro / no heading)', subtitle: `${blocks?.length || 0} blocks` };
            },
          },
        },
      ],
    },
  ],
  preview: { prepare: () => ({ title: 'LLM Info Page' }) },
};

export default llmInfoPage;
