import { dims, img, urlForImage } from '@/lib/image';
import MultiStepForm from '@/components/sections/MultiStepForm';
import HeroInlineVideo from '@/components/sections/HeroInlineVideo';

export default function HeroSection({ section }: { section: any }) {
  const straplineImg = section.straplineImage ? img(section.straplineImage, 462, 90) : null;
  const straplineDims = dims(section.straplineImage);
  const videoImg = section.videoImage ? img(section.videoImage, 1396, 90) : null;
  // Intrinsic size of the hero poster (the LCP element) so the browser reserves its box
  // before the image arrives — this is the main source of layout shift on the page.
  const videoDims = dims(section.videoImage);

  return (
    <section className="hero">
      <div className="padding-global">
        <div className="container-default">
          <div className="hero_wrappper">
            <div className="hero_head">
              <div className="hero-head_strapline-wrap">
                {straplineImg && (
                  <div className="hero-head-strapline_image">
                    <img
                      className="hero-head-strapline_img"
                      src={straplineImg}
                      width={straplineDims?.width}
                      height={straplineDims?.height}
                      alt="Instantly Certified Expert · LeadMagic Certified Partner"
                    />
                  </div>
                )}
                <div className="hero-head-strapline-text_wrap">
                  <p className="text-label-medium">{section.straplineText}</p>
                </div>
              </div>
              <div className="hero-head_title-wrap">
                <h1 className="title-h1">{section.heading}</h1>
              </div>
              <div className="hero-head_text-wrap">
                <p className="text-body-large">{section.subtitle}</p>
              </div>
            </div>

            <div className="hero_content-wrap">
              <div className="hero-content_strapline-wrap">
                <div className="hero-content-strapline-steps_wrap">
                  <p className="text-label-extra-small">{section.stepLabel}</p>
                </div>
                <div className="hero-content-strapline-text_wrap">
                  <p className="text-label-medium">{section.videoLabel}</p>
                </div>
              </div>
              {videoImg && (
                <HeroInlineVideo
                  poster={videoImg}
                  posterWidth={videoDims?.width}
                  posterHeight={videoDims?.height}
                />
              )}
            </div>

            <MultiStepForm />
          </div>
        </div>
      </div>
    </section>
  );
}
