'use client';

import { useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import '@splidejs/splide/css/core';
import { urlForImage } from '@/lib/sanity';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return isMobile;
}

function LogoRow({ logos, speed }: { logos: any[]; speed: number }) {
  const isMobile = useIsMobile();
  if (!logos?.length) return null;
  // Loop mode needs enough slides to cover the viewport width without gaps.
  const items = logos.length < 8 ? [...logos, ...logos, ...logos] : logos;
  const effectiveSpeed = isMobile ? speed / 2 : speed;

  return (
    <div className="partners-row">
      <Splide
        options={{
          type: 'loop',
          drag: false,
          arrows: false,
          pagination: false,
          autoWidth: true,
          gap: isMobile ? 6 : 12,
          autoScroll: {
            speed: effectiveSpeed,
            pauseOnHover: false,
            pauseOnFocus: false,
          },
        }}
        extensions={{ AutoScroll }}
        aria-label="Partner logos"
      >
        {items.map((logo: any, i: number) => (
          <SplideSlide key={i}>
            <div className="item_partners">
              {logo.image && (
                <img className="item-partners_img" src={urlForImage(logo.image).url()} alt={logo.alt || ''} />
              )}
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}

export default function PartnersSection({ section }: { section: any }) {
  return (
    <section className="section_partners">
      <div className="padding-global">
        <div className="container-default">
          <div className="partners_wrapper">
            <div className="partners_head">
              <p className="text-label-medium">{section.heading}</p>
            </div>
            <div className="partners_list-wrap">
              <LogoRow logos={section.logos} speed={-0.35} />
              <LogoRow logos={section.logosRow2} speed={0.35} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
