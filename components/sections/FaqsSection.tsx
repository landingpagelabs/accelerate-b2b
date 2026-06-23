'use client';

import { useState } from 'react';

export default function FaqsSection({ section }: { section: any }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs: any[] = section.faqs || [];

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="section_faqs">
      <div className="padding-global">
        <div className="faqs__container">
          <h2 className="title-h2">{section.heading}</h2>
          <ul className="faqs__list">
            {faqs.map((faq: any, i: number) => (
              <li key={i} className={`faqs__item${openIndex === i ? ' faqs__item--open' : ''}`}>
                <button className="faqs__head" onClick={() => toggle(i)}>
                  <span className="faqs__question">{faq.question}</span>
                  <span className="faqs__icon">
                    <svg className="faqs__icon-plus" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <svg className="faqs__icon-minus" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 10H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </span>
                </button>
                <div className="faqs__body">
                  <div className="faqs__body-inner">
                    <p className="faqs__answer">{faq.answer}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
