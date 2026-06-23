import { urlForImage } from '@/lib/sanity';
import MultiStepForm from '@/components/sections/MultiStepForm';

export default function HeroSection({ section }: { section: any }) {
  const straplineImg = section.straplineImage ? urlForImage(section.straplineImage).url() : null;
  const videoImg = section.videoImage ? urlForImage(section.videoImage).url() : null;

  return (
    <section className="hero">
      <div className="padding-global">
        <div className="container-default">
          <div className="hero_wrappper">
            <div className="hero_head">
              <div className="hero-head_strapline-wrap">
                {straplineImg && (
                  <div className="hero-head-strapline_image">
                    <img className="hero-head-strapline_img" src={straplineImg} alt="strapline" />
                  </div>
                )}
                <div className="hero-head-strapline_decor"></div>
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
                <div className="hero-content_video-wrap">
                  <img className="hero-content_video" src={videoImg} alt="video" />
                </div>
              )}
            </div>

            <MultiStepForm />
          </div>
        </div>
      </div>
    </section>
  );
}
