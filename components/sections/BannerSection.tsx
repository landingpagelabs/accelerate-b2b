import { urlForImage } from '@/lib/sanity';

export default function BannerSection({ section }: { section: any }) {
  return (
    <section className="section_banner">
      <div className="padding-global">
        <div className="banner__container">
          {section.leftIcon && (
            <>
              <img
                className="banner__icon"
                src={urlForImage(section.leftIcon).url()}
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
            <>
              <div className="banner__divider" />
              <img
                className="banner__image"
                src={urlForImage(section.rightImage).url()}
                alt="trust image"
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
