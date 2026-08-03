'use client';

import { useEffect, useRef, useState } from 'react';

const ArrowIcon = (
  <svg className="playbooks__arrow" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.375 9.5H16.625H16.2292" stroke="#212121" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
    <path d="M11.875 15.0418C11.875 11.8752 14.25 10.2918 16.625 9.896V9.10433C14.25 8.7085 11.875 7.12516 11.875 3.9585" stroke="#212121" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
  </svg>
);

/**
 * "View The Playbook" affordance.
 *
 * None of the playbooks exist yet — every card ships without a buttonUrl, so this used to
 * render as `href="#"` and silently jump the visitor back to the top of the page. Until
 * there is something to link to, it's a button that says so.
 */
export default function PlaybookLink({ label, url }: { label: string; url?: string }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, [open]);

  // A real destination exists — behave like a normal link.
  if (url) {
    return (
      <a className="playbooks__link" href={url}>
        <span>{label}</span>
        {ArrowIcon}
      </a>
    );
  }

  return (
    <span className="playbooks__link-wrap" ref={wrapRef}>
      <button
        type="button"
        className="playbooks__link playbooks__link--soon"
        aria-expanded={open}
        title="Coming soon"
        onClick={() => setOpen((v) => !v)}
      >
        <span>{label}</span>
        {ArrowIcon}
      </button>
      {open && (
        <span className="playbooks__soon" role="status">
          <strong>Coming soon.</strong> We&rsquo;re putting these playbooks together now.
        </span>
      )}
    </span>
  );
}
