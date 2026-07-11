'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  title?: string;
  text?: string;
  cancelText?: string;
  confirmText?: string;
  delaySeconds?: number;
};

// Exit-intent "Leave site?" popup. Arms after a delay, then shows once when the
// cursor leaves the top of the viewport (desktop exit intent).
export default function LeaveSitePopup({
  title = 'Leave site?',
  text = 'Changes that you made may not be saved.',
  cancelText = 'Cancel',
  confirmText = 'Leave',
  delaySeconds = 30,
}: Props) {
  const [open, setOpen] = useState(false);
  const armed = useRef(false);
  const shown = useRef(false);

  useEffect(() => {
    const t = window.setTimeout(() => { armed.current = true; }, delaySeconds * 1000);

    const onMouseOut = (e: MouseEvent) => {
      if (!armed.current || shown.current) return;
      if (!e.relatedTarget && e.clientY <= 0) {
        shown.current = true;
        setOpen(true);
      }
    };
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      window.clearTimeout(t);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, [delaySeconds]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div
      className={`leave-overlay${open ? ' is-open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="leave-title"
      aria-hidden={!open}
    >
      <div className="leave-card" role="document">
        <div className="leave-card__icon">
          <img src="/images/leave-icon.png" alt="" />
        </div>
        <h2 id="leave-title" className="leave-card__title">{title}</h2>
        <p className="leave-card__text">{text}</p>
        <div className="leave-card__actions">
          <button type="button" className="leave-btn leave-btn--primary" onClick={() => setOpen(false)}>
            {cancelText}
          </button>
          <button type="button" className="leave-btn leave-btn--secondary" onClick={() => setOpen(false)}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
