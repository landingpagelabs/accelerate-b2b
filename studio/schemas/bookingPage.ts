// /booking — standalone booking funnel page. Single document.
// Edit at: Content → Booking Page.

const bookingPage = {
  name: 'bookingPage',
  title: 'Booking Page',
  type: 'document',
  groups: [
    { name: 'top', title: 'Progress & Title' },
    { name: 'calendly', title: 'Calendly' },
    { name: 'bar', title: 'Bottom Bar' },
    { name: 'proof', title: 'Social Proof' },
    { name: 'leave', title: 'Leave Popup' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    { name: 'metaTitle', title: 'SEO Title', type: 'string', group: 'seo' },

    { name: 'progressLabel', title: 'Progress Label', type: 'string', description: 'e.g. "Almost Done"', group: 'top' },
    { name: 'progressPercent', title: 'Progress %', type: 'number', validation: (R: any) => R.min(0).max(100), group: 'top' },
    { name: 'titleLead', title: 'Title — underlined part', type: 'string', description: 'e.g. "Last step:"', group: 'top' },
    { name: 'titleRest', title: 'Title — rest', type: 'string', description: 'e.g. "book your free consultation"', group: 'top' },

    { name: 'calendlyImage', title: 'Calendly Image (placeholder)', type: 'image', options: { hotspot: true }, group: 'calendly' },

    { name: 'barText', title: 'Bottom Bar Text', type: 'string', group: 'bar' },
    { name: 'timerMinutes', title: 'Countdown (minutes)', type: 'number', validation: (R: any) => R.min(1), group: 'bar' },

    { name: 'proofCount', title: 'People Count', type: 'number', group: 'proof' },
    { name: 'proofText', title: 'Proof Text', type: 'string', description: 'After the bold count, e.g. "requested a free consultation with us in the last 24 hours"', group: 'proof' },
    { name: 'proofVerifiedText', title: 'Verified Label', type: 'string', description: 'e.g. "verified by Calendly"', group: 'proof' },
    { name: 'proofDelaySeconds', title: 'Show after (seconds)', type: 'number', group: 'proof' },

    { name: 'leaveTitle', title: 'Leave Popup Title', type: 'string', group: 'leave' },
    { name: 'leaveText', title: 'Leave Popup Text', type: 'string', group: 'leave' },
    { name: 'leaveCancelText', title: 'Cancel Button', type: 'string', group: 'leave' },
    { name: 'leaveConfirmText', title: 'Leave Button', type: 'string', group: 'leave' },
    { name: 'leaveDelaySeconds', title: 'Arm exit-intent after (seconds)', type: 'number', group: 'leave' },
  ],
  preview: { prepare: () => ({ title: 'Booking Page' }) },
};

export default bookingPage;
