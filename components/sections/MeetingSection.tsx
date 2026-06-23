'use client';

import { useRef, useState } from 'react';
import { urlForImage } from '@/lib/sanity';

const MULTIPLIER = 5;
const MAX = 100;

export default function MeetingSection({ section }: { section: any }) {
  const [val, setVal] = useState<number>(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const clamp = (n: number) => Math.max(0, Math.min(MAX, Math.round(n)));
  const emailCount = val * MULTIPLIER;
  const progressPct = (val / MAX) * 100;

  const setFromClientX = (clientX: number) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    setVal(clamp(pct * MAX));
  };

  return (
    <section className="meeeting">
      <div className="padding-global">
        <div className="container-default">
          <div className="meeting_wrapper">
            <div className="meeting_title-wrap">
              <h2 className="title-h2">{section.heading || 'How many meetings do you want per month?'}</h2>
            </div>
            <div className="meeting_form">
              <div className="meeting_form_content">
                <p className="text-body-large">I Want</p>
                <input
                  className="meeting_form-number"
                  type="number"
                  min={0}
                  max={MAX}
                  value={val}
                  onChange={(e) => setVal(clamp(parseInt(e.target.value) || 0))}
                />
                <p className="text-body-large">Meetings Per Month</p>
              </div>
              <div
                className="progress-bar"
                ref={trackRef}
                onPointerDown={(e) => {
                  dragging.current = true;
                  (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
                  setFromClientX(e.clientX);
                }}
                onPointerMove={(e) => {
                  if (dragging.current) setFromClientX(e.clientX);
                }}
                onPointerUp={() => {
                  dragging.current = false;
                }}
              >
                <div className="progress-thumb" style={{ width: `${progressPct}%` }}>
                  <div className="progress-thumb-icon">
                    <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g filter="url(#filter0_ddi_meeting)">
                        <rect x="8.668" y="8.667" width="40" height="40" rx="20" fill="white"/>
                        <rect x="9.668" y="9.667" width="38" height="38" rx="19" stroke="#E6E6E7" strokeWidth="2"/>
                      </g>
                      <defs>
                        <filter id="filter0_ddi_meeting" x="0.001" y="0" width="61.667" height="61.667" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                          <feOffset dx="2.167" dy="2.167"/>
                          <feGaussianBlur stdDeviation="5.417"/>
                          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
                          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                        </filter>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
              <p className="meeting_form-text text-body-regular">
                We&apos;ll write and send <span className="progress-multi">{emailCount}</span> emails to make that happen
              </p>
              <div className="meeting_comment-wrap">
                <div className="meeting_comment">
                  <div className="meeting_avatar">
                    {section.testimonialAvatar ? (
                      <img src={urlForImage(section.testimonialAvatar).url()} alt={section.testimonialAuthor || ''} />
                    ) : (
                      <img src="/images/sections/reviews/Ellipse 8094 (1).png" alt="avatar" />
                    )}
                  </div>
                  <div className="meeting_avatar-flex">
                    <p className="meeting_text-1">
                      &ldquo;{section.testimonialQuote || 'Spencer took us from zero to 50,000 emails a month.'}&rdquo;
                    </p>
                    <div className="meeting_avatar-info">
                      <p className="meeting_avatar-text">{section.testimonialAuthor || 'Matt Hickerson'} &bull;</p>
                      <p className="meeting_avatar-caption">{section.testimonialRole || 'VP of Operations, Forge Origination'}</p>
                      <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.75668 16.6641L4.31751 14.1248L1.59066 13.49L1.85577 10.5539L0 8.33203L1.85577 6.11016L1.59066 3.17411L4.31751 2.53929L5.75668 0L8.33203 1.15061L10.9074 0L12.3466 2.53929L15.0734 3.17411L14.8083 6.11016L16.6641 8.33203L14.8083 10.5539L15.0734 13.49L12.3466 14.1248L10.9074 16.6641L8.33203 15.5134L5.75668 16.6641ZM7.5367 11.1491L11.8163 6.66563L10.7559 5.51501L7.5367 8.8875L5.90817 7.22109L4.84773 8.33203L7.5367 11.1491Z" fill="#3897F0" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
