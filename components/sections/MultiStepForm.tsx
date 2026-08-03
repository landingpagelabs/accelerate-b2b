'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

/**
 * Step order mirrors the Figma source of truth (Multi-Step Form, node 4783:8406):
 * all six qualifiers first, then name, then email, then the booking step.
 * The build previously interleaved name/email between the qualifiers.
 */
type ChoiceKey =
  | 'wants_meetings'
  | 'market_100k'
  | 'clv_10k'
  | 'sales_team'
  | 'revenue_1m'
  | 'adapt_offer';

type Answer = 'Yes' | 'No';

type Step =
  | { kind: 'choice'; title: string; key: ChoiceKey }
  | { kind: 'input'; title: string; field: 'name' | 'email'; inputType: string; placeholder: string }
  | { kind: 'final'; title: React.ReactNode };

const STEPS: Step[] = [
  { kind: 'choice', key: 'wants_meetings', title: 'Do you want 15-30 meetings per month?' },
  { kind: 'choice', key: 'market_100k', title: 'Are there roughly 100,000+ companies in your target market?' },
  { kind: 'choice', key: 'clv_10k', title: 'Is your customer lifetime value $10,000 or more?' },
  { kind: 'choice', key: 'sales_team', title: 'Does your business have a dedicated sales rep or team?' },
  { kind: 'choice', key: 'revenue_1m', title: 'Has your business done more than $1 million in revenue?' },
  { kind: 'choice', key: 'adapt_offer', title: 'Are you open to adapting your offer for a cold audience before launch?' },
  { kind: 'input', title: 'What’s your first name?', field: 'name', inputType: 'text', placeholder: 'First name' },
  { kind: 'input', title: 'What’s your work email?', field: 'email', inputType: 'email', placeholder: 'Work email' },
  {
    kind: 'final',
    // Figma 4783:8447 carries the congrats line above the instruction; the build
    // was only showing the second half.
    title: (
      <>
        Congrats, you&rsquo;ve pre-qualified for a free test campaign.
        <br />
        <span className="text-underline">Last step:</span> book your free discovery call
      </>
    ),
  },
];

// Human-readable labels, in the order they should appear as Formspree columns.
const CHOICE_LABELS: Record<ChoiceKey, string> = {
  wants_meetings: 'Q1 Wants 15-30 Meetings',
  market_100k: 'Q2 Market 100k+ Companies',
  clv_10k: 'Q3 Customer LTV $10k+',
  sales_team: 'Q4 Has Sales Rep Or Team',
  revenue_1m: 'Q5 Revenue $1m+',
  adapt_offer: 'Q6 Open To Adapting Offer',
};

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;
const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL;

const VerifiedBadge = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8.33345" cy="8.33199" r="5.3022" fill="white" />
    <path d="M5.75668 16.6641L4.31751 14.1248L1.59066 13.49L1.85577 10.5539L0 8.33203L1.85577 6.11016L1.59066 3.17411L4.31751 2.53929L5.75668 0L8.33203 1.15061L10.9074 0L12.3466 2.53929L15.0734 3.17411L14.8083 6.11016L16.6641 8.33203L14.8083 10.5539L15.0734 13.49L12.3466 14.1248L10.9074 16.6641L8.33203 15.5134L5.75668 16.6641ZM7.5367 11.1491L11.8163 6.66563L10.7559 5.51501L7.5367 8.8875L5.90817 7.22109L4.84773 8.33203L7.5367 11.1491Z" fill="#3897F0" />
  </svg>
);

const Testimonial = () => (
  <div className="hero-content_form-comment">
    <div className="hero-content_form-comment-left">
      <div className="hero-content_form-avatar">
        <img className="form-avatar--desktop" src="/images/sections/hero/Ellipse 8094 (1).png" alt="" />
        <img className="form-avatar--mobile" src="/images/sections/hero/mobile-form-avatar.png" alt="" />
      </div>
      <div className="hero-content_form-comment-info">
        <p className="text-body-small">“They blew me away, high recommend!”</p>
        <div className="hero-content_form-comment-info-flex">
          <p className="text-label-double-extra-small">Ben K. Owner @ LH Capital Group •</p>
          <p className="text-body-caption">800k Followers </p>
          <VerifiedBadge />
        </div>
      </div>
    </div>
    <svg width="1" height="44" viewBox="0 0 1 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="1" height="44" fill="#E6E6E8" />
    </svg>
    <div className="hero-content_form-comment-right">
      <img src="/images/sections/hero/Frame 2147260759.png" alt="" />
    </div>
  </div>
);

function ProgressBar({ step }: { step: number }) {
  const width = ((step + 1) / STEPS.length) * 100;
  return (
    <div className="hero_content-progress">
      <div className="hero_content-progress-thumb" style={{ width: `${width}%` }} />
    </div>
  );
}

/**
 * Calendly inline embed. Both the booking step and the not-a-fit step carry one in Figma.
 * Calendly is configured to redirect to /congrats on event_scheduled — we deliberately do
 * NOT listen for the postMessage and navigate ourselves: that would be a client-side
 * navigation (no GTM page view, so the conversion goes untracked) and it would couple the
 * visitor's journey to an undocumented payload shape.
 */
function CalendlyEmbed() {
  if (!CALENDLY_URL) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[apply-form] NEXT_PUBLIC_CALENDLY_URL is not set — no calendar will render.');
    }
    return null;
  }
  return (
    <>
      <div
        className="calendly-inline-widget hero-content_form-calendly"
        data-url={CALENDLY_URL}
        style={{ minWidth: 320, height: 700 }}
      />
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />
    </>
  );
}

function BookingTimer({ minutes, seconds }: { minutes: number; seconds: number }) {
  return (
    <div className="hero-content_form-timer">
      <div className="hero-content_form-timer-image">
        <img src="/images/sections/hero/calendly_logo.svg.png" alt="Calendly" />
      </div>
      <p className="hero-content_form-timer-center">Your booking will be prioritized for another</p>
      <div className="hero-content_form-timer-numbers">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.7334 0.189728C7.10168 -0.0824228 8.5197 0.0572228 9.80859 0.591095C11.0975 1.12498 12.1995 2.02875 12.9746 3.18875C13.7497 4.34874 14.1631 5.7126 14.1631 7.1077C14.1631 8.97849 13.4195 10.7731 12.0967 12.096C10.7739 13.4185 8.97995 14.1614 7.10938 14.1614C5.71428 14.1614 4.35041 13.748 3.19043 12.9729C2.03043 12.1978 1.12666 11.0958 0.592773 9.80692C0.0589082 8.51803 -0.0807424 7.09999 0.191406 5.73172C0.46358 4.36341 1.1346 3.10591 2.12109 2.11942C3.10759 1.13292 4.36509 0.461902 5.7334 0.189728ZM7.10938 1.3284C5.96633 1.3284 4.84886 1.667 3.89844 2.30203C2.94803 2.93708 2.20697 3.83975 1.76953 4.89578C1.3321 5.95185 1.2184 7.11452 1.44141 8.23563C1.66447 9.35655 2.21431 10.3865 3.02246 11.1946C3.83063 12.0028 4.86051 12.5526 5.98145 12.7757C7.10256 12.9987 8.26523 12.885 9.32129 12.4475C10.3773 12.0101 11.28 11.269 11.915 10.3186C12.5501 9.36822 12.8887 8.25074 12.8887 7.1077C12.8887 5.57489 12.2801 4.10464 11.1963 3.02078C10.1124 1.93692 8.64219 1.3284 7.10938 1.3284ZM7.10938 3.55399C7.27828 3.55399 7.44009 3.62112 7.55957 3.74051C7.67899 3.85993 7.74601 4.02184 7.74609 4.1907V6.8118L9.30566 8.37137C9.36686 8.43264 9.41609 8.50518 9.44922 8.58524C9.48231 8.66527 9.49905 8.75155 9.49902 8.83817C9.49895 8.92471 9.48136 9.01022 9.44824 9.09012C9.41511 9.17004 9.36682 9.24278 9.30566 9.30399C9.24436 9.36525 9.17091 9.4144 9.09082 9.44754C9.01092 9.48053 8.92531 9.49735 8.83887 9.49734C8.7522 9.49731 8.666 9.48073 8.58594 9.44754C8.5458 9.43089 8.50761 9.41008 8.47168 9.38602L8.37207 9.30399L6.66309 7.59012C6.59819 7.52633 6.54758 7.44937 6.51465 7.36453C6.48171 7.27956 6.46768 7.18796 6.47266 7.09695V4.1907C6.47274 4.02184 6.53976 3.85993 6.65918 3.74051C6.77866 3.62113 6.94047 3.55399 7.10938 3.55399Z" fill="white" stroke="white" strokeWidth="0.107692" />
        </svg>
        <div className="hero_content-timer-numbers" id="minutes">{minutes}</div>
        <div className="hero_content-timer-numbers">:</div>
        <div className="hero_content-timer-numbers" id="seconds">{seconds < 10 ? `0${seconds}` : seconds}</div>
      </div>
    </div>
  );
}

export default function MultiStepForm() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<{ name: string; email: string }>({ name: '', email: '' });
  const [answers, setAnswers] = useState<Partial<Record<ChoiceKey, Answer>>>({});
  const [qualified, setQualified] = useState(true);
  const [error, setError] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(10 * 60);
  const timerStarted = useRef(false);
  const submitted = useRef(false);

  const current = STEPS[step];

  /**
   * Sends the application. Deliberately fire-and-forget: neither the Formspree POST nor the
   * dataLayer push is allowed to block or break the visitor reaching the calendar.
   */
  const submit = (finalValues: { name: string; email: string }, finalAnswers: Record<ChoiceKey, Answer>) => {
    if (submitted.current) return;
    submitted.current = true;

    const isQualified = (Object.keys(CHOICE_LABELS) as ChoiceKey[]).every((k) => finalAnswers[k] === 'Yes');
    setQualified(isQualified);

    // Formspree renders columns as the ASCII-sorted union of every key it has ever seen, so
    // leading spaces (invisible in the header) are the only way to control column order.
    const fields: [string, string][] = [
      ['Name', finalValues.name],
      ['Email', finalValues.email],
      ['Qualified', isQualified ? 'Yes' : 'No'],
      ...(Object.keys(CHOICE_LABELS) as ChoiceKey[]).map(
        (k) => [CHOICE_LABELS[k], finalAnswers[k] ?? ''] as [string, string],
      ),
      ['Page', typeof window !== 'undefined' ? window.location.pathname : ''],
    ];
    const payload = Object.fromEntries(
      fields.map(([key, value], i) => [' '.repeat(fields.length - i) + key, value]),
    );

    if (!FORMSPREE_ID) {
      // Loud on purpose: a silently-swallowed application reads as "leads are down" weeks later.
      console.error('[apply-form] NEXT_PUBLIC_FORMSPREE_ID is not set — this application was NOT saved.');
    } else {
      fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          if (!res.ok) console.error('[apply-form] Formspree rejected the submission:', res.status);
        })
        .catch((err) => console.error('[apply-form] Formspree request failed:', err));
    }

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'lpl_testcampaign_form_submission',
      form_name: 'test_campaign_application',
      form_qualified: isQualified ? 'yes' : 'no',
    });
  };

  const next = () => {
    setError('');
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const answerChoice = (answer: Answer) => {
    if (current.kind !== 'choice') return;
    setAnswers((a) => ({ ...a, [current.key]: answer }));
    next();
  };

  const validateAndNext = () => {
    if (current.kind !== 'input') return next();

    const value = values[current.field].trim();
    if (value === '') {
      setError('This field is required');
      return;
    }
    // Classic email validation: local@domain.tld
    if (current.inputType === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');

    // The email step is the last one before the calendar, so the application is complete here.
    if (STEPS[step + 1]?.kind === 'final') {
      submit({ ...values, [current.field]: value }, answers as Record<ChoiceKey, Answer>);
    }
    next();
  };

  // countdown timer on the final step
  useEffect(() => {
    if (current.kind !== 'final' || timerStarted.current) return;
    timerStarted.current = true;
    const id = setInterval(() => {
      setSecondsLeft((s) => (s <= 0 ? 0 : s - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [current.kind]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const showDisqualified = current.kind === 'final' && !qualified;

  return (
    <div className="hero-content_multi-step" id="apply-form">
      <div className="hero-content_multi-step-flex">
        <div className="hero-content-strapline-steps_wrap">
          <p className="text-label-extra-small">Step 2/2</p>
        </div>
        <p className="text-label-medium">Apply For Your Free Test Campaign</p>
      </div>

      <div className="hero-content_form">
        <div className="hero-content_form-wrap">
          <ProgressBar step={step} />

          {/* Was an <h3>, which sat directly under the page <h1> and broke heading order.
              It is a question rather than a section heading, so it is no longer part of the
              document outline — it still names the form via aria-labelledby below. */}
          <p className="hero-content_form-title" id="apply-form-title">
            {showDisqualified ? 'Thanks for applying' : current.title}
          </p>

          {showDisqualified && (
            <p className="hero-content_form-body">
              Based on your answers, the free test campaign may not be the right fit right now. But we can
              likely still help. Book a call below and we’ll give you our honest advice on your outbound,
              free of charge.
            </p>
          )}

          {current.kind === 'choice' && (
            <div className="hero-content_form-actions" role="group" aria-labelledby="apply-form-title">
              {/* Real <button>s, not divs with role="button" — the previous markup was
                  focusable and announced as a button but had no key handler, so Enter and
                  Space did nothing and the form could not be completed by keyboard. */}
              <button type="button" className="hero-content_form-btn" onClick={() => answerChoice('Yes')}>
                <span>Yes</span>
              </button>
              <button type="button" className="hero-content_form-btn prev" onClick={() => answerChoice('No')}>
                <span>No</span>
              </button>
            </div>
          )}

          {current.kind === 'input' && (
            <div className="hero-content_form-input-wrap">
              <div className="hero-content_form-input-row">
                {/* The placeholder was the only accessible name, so it disappeared as soon
                    as the visitor typed. The visible question text is reused as a real
                    label rather than inventing new copy. */}
                <label className="sr-only" htmlFor="apply-form-input">
                  {current.title}
                </label>
                <input
                  id="apply-form-input"
                  className="hero-content_form-input"
                  type={current.inputType}
                  autoComplete={current.inputType === 'email' ? 'email' : 'name'}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? 'apply-form-error' : undefined}
                  placeholder={current.placeholder}
                  value={values[current.field]}
                  onChange={(e) => {
                    setValues((v) => ({ ...v, [current.field]: e.target.value }));
                    if (error) setError('');
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      validateAndNext();
                    }
                  }}
                  style={error ? { borderColor: '#e24b4a', boxShadow: '0 0 0 3px rgba(226,75,74,0.15)' } : undefined}
                />
                {values[current.field].trim() !== '' && (
                  <button
                    type="button"
                    className="hero-content_form-enter"
                    onClick={validateAndNext}
                    aria-label="Continue"
                  >
                    <span className="hero-content_form-enter-label">Enter</span>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 10h11M11 6l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                )}
              </div>
              {error && (
                <p className="input-error-msg" id="apply-form-error" role="alert">
                  {error}
                </p>
              )}
            </div>
          )}

          {current.kind === 'final' && (
            <>
              <CalendlyEmbed />
              <BookingTimer minutes={minutes} seconds={seconds} />
            </>
          )}

          {current.kind !== 'final' && <Testimonial />}
        </div>
      </div>
    </div>
  );
}
