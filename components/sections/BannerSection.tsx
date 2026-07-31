import { img, urlForImage } from '@/lib/image';

export default function BannerSection({ section }: { section: any }) {
  return (
    <section className="section_banner">
      <div className="padding-global">
        <div className="banner__container">
          {section.leftIcon && (
            <>
              <img loading="lazy" decoding="async"
                className="banner__icon"
                src={img(section.leftIcon, 335)}
                alt="trust icon"
              />
              <div className="banner__divider" />
            </>
          )}
          {section.text && (
            <p className="banner__text">
              {section.text.split('\n').map((line: string, i: number) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </p>
          )}
          {section.rightImage && (
            <img loading="lazy" decoding="async"
              className="banner__image"
              src={img(section.rightImage, 602)}
              alt="trust image"
            />
          )}
        </div>
      </div>
    </section>
  );
}
