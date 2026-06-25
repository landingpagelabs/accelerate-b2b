import type { Metadata } from 'next';
import CongratsFooter from '@/components/CongratsFooter';
import FaqsSection from '@/components/sections/FaqsSection';
import ConfettiOnLoad from '@/components/ConfettiOnLoad';
import CongratsCopyMessage from '@/components/sections/CongratsCopyMessage';
import CongratsReviews from '@/components/sections/CongratsReviews';
import { pageBySlugQuery } from '@/lib/queries';
import { fetchSanity } from '@/lib/sanity';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Consultation Booked — Accelerate B2B',
  robots: { index: false, follow: false },
};

// Декоративний chevron (стрілки вниз) — повторюється в hero та step 03
const DecorChevron = () => (
  <div className="hero-congrats-decor">
    <svg width="74" height="87" viewBox="0 0 74 87" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 17C12 8.16344 19.1634 1 28 1H46C54.8366 1 62 8.16344 62 17V35C62 43.8366 54.8366 51 46 51H28C19.1634 51 12 43.8366 12 35V17Z"
        fill="white"
        fillOpacity="0.5"
      />
      <path
        d="M30.75 27.2498L36.9999 33.4997L43.2498 27.2498M30.75 18.5L36.9999 24.7499L43.2498 18.5"
        stroke="black"
        strokeWidth="2.49995"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

export default async function CongratsPage() {
  // FAQ — той самий, що й на головній сторінці (тягнемо з того ж Sanity-документа)
  const home = await fetchSanity(pageBySlugQuery, { slug: 'home' });
  const faqs = home?.sections?.find((s: any) => s._type === 'faqsSection') ?? null;

  return (
    <div className="page-wrapper">
      <ConfettiOnLoad />

      {/* ============================ HEADER ============================ */}
      <header className="header-congrats">
        <div className="padding-global">
          <div className="container-default">
            <div className="header-congrats_wrapper">
              <a className="header-congrats_logo" href="/">
                <img src="/images/header/Client Logo (1).png" alt="Accelerate B2B" />
              </a>
              <div className="header-congrats_right">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.8125 7.65696L5.93765 10.7821L12.813 3.28174" stroke="#0FA857" strokeWidth="1.87509" />
                </svg>
                <p className="text-body-caption light-gray">
                  <b>CONSULTATION BOOKED!</b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* ============================ HERO ============================ */}
        <section className="hero-congrats">
          <div className="padding-global">
            <div className="container-default">
              <div className="hero-congrats_wrapper">
                <div className="hero-congrats_strapline">
                  <svg width="84" height="23" viewBox="0 0 84 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M0 11.5C0 5.14873 5.14873 0 11.5 0H80.7692C82.5535 0 84 1.44646 84 3.23077V19.7692C84 21.5535 82.5535 23 80.7692 23H11.5C5.14873 23 0 17.8513 0 11.5Z"
                      fill="#12A557"
                    />
                    <path
                      d="M15.4588 10.3281H13.5923C13.5582 10.0866 13.4886 9.87216 13.3835 9.68466C13.2784 9.49432 13.1435 9.33239 12.9787 9.19886C12.8139 9.06534 12.6236 8.96307 12.4077 8.89205C12.1946 8.82102 11.9631 8.78551 11.7131 8.78551C11.2614 8.78551 10.8679 8.89773 10.5327 9.12216C10.1974 9.34375 9.9375 9.66761 9.75284 10.0938C9.56818 10.517 9.47585 11.0312 9.47585 11.6364C9.47585 12.2585 9.56818 12.7812 9.75284 13.2045C9.94034 13.6278 10.2017 13.9474 10.5369 14.1634C10.8722 14.3793 11.2599 14.4872 11.7003 14.4872C11.9474 14.4872 12.1761 14.4545 12.3864 14.3892C12.5994 14.3239 12.7884 14.2287 12.9531 14.1037C13.1179 13.9759 13.2543 13.821 13.3622 13.6392C13.473 13.4574 13.5497 13.25 13.5923 13.017L15.4588 13.0256C15.4105 13.4261 15.2898 13.8125 15.0966 14.1847C14.9063 14.554 14.6491 14.8849 14.3253 15.1776C14.0043 15.4673 13.6207 15.6974 13.1747 15.8679C12.7315 16.0355 12.2301 16.1193 11.6705 16.1193C10.892 16.1193 10.196 15.9432 9.58239 15.5909C8.97159 15.2386 8.48864 14.7287 8.13352 14.0611C7.78125 13.3935 7.60511 12.5852 7.60511 11.6364C7.60511 10.6847 7.78409 9.875 8.14205 9.20739C8.5 8.53977 8.9858 8.03125 9.59943 7.68182C10.2131 7.32955 10.9034 7.15341 11.6705 7.15341C12.1761 7.15341 12.6449 7.22443 13.0767 7.36648C13.5114 7.50852 13.8963 7.71591 14.2315 7.98864C14.5668 8.25852 14.8395 8.58949 15.0497 8.98153C15.2628 9.37358 15.3991 9.82244 15.4588 10.3281ZM24.6818 11.6364C24.6818 12.5881 24.5014 13.3977 24.1407 14.0653C23.7827 14.733 23.2941 15.2429 22.6747 15.5952C22.0583 15.9446 21.3651 16.1193 20.5952 16.1193C19.8196 16.1193 19.1236 15.9432 18.5071 15.5909C17.8907 15.2386 17.4034 14.7287 17.0455 14.0611C16.6875 13.3935 16.5086 12.5852 16.5086 11.6364C16.5086 10.6847 16.6875 9.875 17.0455 9.20739C17.4034 8.53977 17.8907 8.03125 18.5071 7.68182C19.1236 7.32955 19.8196 7.15341 20.5952 7.15341C21.3651 7.15341 22.0583 7.32955 22.6747 7.68182C23.2941 8.03125 23.7827 8.53977 24.1407 9.20739C24.5014 9.875 24.6818 10.6847 24.6818 11.6364ZM22.8111 11.6364C22.8111 11.0199 22.7188 10.5 22.5341 10.0767C22.3523 9.65341 22.0952 9.33239 21.7628 9.11364C21.4304 8.89489 21.0412 8.78551 20.5952 8.78551C20.1492 8.78551 19.76 8.89489 19.4276 9.11364C19.0952 9.33239 18.8367 9.65341 18.652 10.0767C18.4702 10.5 18.3793 11.0199 18.3793 11.6364C18.3793 12.2528 18.4702 12.7727 18.652 13.196C18.8367 13.6193 19.0952 13.9403 19.4276 14.1591C19.76 14.3778 20.1492 14.4872 20.5952 14.4872C21.0412 14.4872 21.4304 14.3778 21.7628 14.1591C22.0952 13.9403 22.3523 13.6193 22.5341 13.196C22.7188 12.7727 22.8111 12.2528 22.8111 11.6364ZM33.2284 7.27273V16H31.6346L27.8378 10.5071H27.7738V16H25.9287V7.27273H27.548L31.315 12.7614H31.3917V7.27273H33.2284ZM40.4198 10.0938C40.3602 9.88636 40.2764 9.70312 40.1684 9.54403C40.0605 9.3821 39.9284 9.24574 39.7721 9.13494C39.6187 9.02131 39.4426 8.93466 39.2437 8.875C39.0477 8.81534 38.8303 8.78551 38.5917 8.78551C38.1457 8.78551 37.7536 8.89631 37.4156 9.1179C37.0803 9.33949 36.819 9.66193 36.6315 10.0852C36.444 10.5057 36.3502 11.0199 36.3502 11.6278C36.3502 12.2358 36.4426 12.7528 36.6272 13.179C36.8119 13.6051 37.0732 13.9304 37.4113 14.1548C37.7494 14.3764 38.1485 14.4872 38.6087 14.4872C39.0264 14.4872 39.3829 14.4134 39.6784 14.2656C39.9766 14.1151 40.2039 13.9034 40.3602 13.6307C40.5193 13.358 40.5988 13.0355 40.5988 12.6634L40.9738 12.7188H38.7238V11.3295H42.3758V12.429C42.3758 13.196 42.2139 13.8551 41.89 14.4062C41.5661 14.9545 41.1201 15.3778 40.5519 15.6761C39.9837 15.9716 39.3332 16.1193 38.6002 16.1193C37.782 16.1193 37.0633 15.9389 36.444 15.5781C35.8247 15.2145 35.3417 14.6989 34.9951 14.0312C34.6514 13.3608 34.4795 12.5653 34.4795 11.6449C34.4795 10.9375 34.5818 10.3068 34.7863 9.75284C34.9937 9.19602 35.2835 8.72443 35.6556 8.33807C36.0278 7.9517 36.461 7.65767 36.9553 7.45597C37.4497 7.25426 37.9852 7.15341 38.5619 7.15341C39.0562 7.15341 39.5164 7.22585 39.9426 7.37074C40.3687 7.51278 40.7465 7.71449 41.0761 7.97585C41.4085 8.23722 41.6798 8.5483 41.89 8.90909C42.1002 9.26705 42.2352 9.66193 42.2948 10.0938H40.4198ZM43.6418 16V7.27273H47.085C47.7441 7.27273 48.3066 7.39062 48.7725 7.62642C49.2412 7.85937 49.5978 8.19034 49.8421 8.61932C50.0892 9.04545 50.2128 9.54687 50.2128 10.1236C50.2128 10.7031 50.0878 11.2017 49.8378 11.6193C49.5878 12.0341 49.2256 12.3523 48.7512 12.5739C48.2796 12.7955 47.7086 12.9062 47.0381 12.9062H44.7327V11.4233H46.7398C47.0921 11.4233 47.3847 11.375 47.6177 11.2784C47.8506 11.1818 48.0239 11.0369 48.1375 10.8438C48.254 10.6506 48.3123 10.4105 48.3123 10.1236C48.3123 9.83381 48.254 9.58949 48.1375 9.39062C48.0239 9.19176 47.8492 9.04119 47.6134 8.93892C47.3804 8.83381 47.0864 8.78125 46.7313 8.78125H45.487V16H43.6418ZM48.3549 12.0284L50.5239 16H48.487L46.3648 12.0284H48.3549ZM52.9011 16H50.9238L53.9366 7.27273H56.3144L59.3229 16H57.3457L55.1596 9.26705H55.0914L52.9011 16ZM52.7775 12.5696H57.4479V14.0099H52.7775V12.5696ZM58.8546 8.79403V7.27273H66.0222V8.79403H63.3503V16H61.5264V8.79403H58.8546ZM71.817 9.78267C71.7829 9.43892 71.6366 9.17187 71.378 8.98153C71.1195 8.79119 70.7687 8.69602 70.3255 8.69602C70.0243 8.69602 69.7701 8.73864 69.5627 8.82386C69.3553 8.90625 69.1962 9.02131 69.0854 9.16903C68.9775 9.31676 68.9235 9.48438 68.9235 9.67188C68.9178 9.82812 68.9505 9.96449 69.0215 10.081C69.0954 10.1974 69.1962 10.2983 69.3241 10.3835C69.4519 10.4659 69.5996 10.5384 69.7672 10.6009C69.9349 10.6605 70.1138 10.7116 70.3042 10.7543L71.0883 10.9418C71.4689 11.027 71.8184 11.1406 72.1366 11.2827C72.4547 11.4247 72.7303 11.5994 72.9633 11.8068C73.1962 12.0142 73.3766 12.2585 73.5045 12.5398C73.6351 12.821 73.7019 13.1435 73.7047 13.5071C73.7019 14.0412 73.5655 14.5043 73.2957 14.8963C73.0286 15.2855 72.6422 15.5881 72.1366 15.804C71.6337 16.017 71.0272 16.1236 70.317 16.1236C69.6124 16.1236 68.9988 16.0156 68.4761 15.7997C67.9562 15.5838 67.5499 15.2642 67.2573 14.8409C66.9675 14.4148 66.8155 13.8878 66.8013 13.2599H68.5868C68.6067 13.5526 68.6905 13.7969 68.8383 13.9929C68.9888 14.1861 69.1891 14.3324 69.4391 14.4318C69.692 14.5284 69.9775 14.5767 70.2957 14.5767C70.6082 14.5767 70.8795 14.5312 71.1096 14.4403C71.3425 14.3494 71.5229 14.223 71.6508 14.0611C71.7786 13.8991 71.8425 13.7131 71.8425 13.5028C71.8425 13.3068 71.7843 13.142 71.6678 13.0085C71.5542 12.875 71.3866 12.7614 71.165 12.6676C70.9462 12.5739 70.6778 12.4886 70.3596 12.4119L69.4093 12.1733C68.6735 11.9943 68.0925 11.7145 67.6664 11.3338C67.2403 10.9531 67.0286 10.4403 67.0314 9.79545C67.0286 9.26705 67.1692 8.8054 67.4533 8.41051C67.7403 8.01562 68.1337 7.70739 68.6337 7.4858C69.1337 7.2642 69.7019 7.15341 70.3383 7.15341C70.986 7.15341 71.5513 7.2642 72.0343 7.4858C72.5201 7.70739 72.8979 8.01562 73.1678 8.41051C73.4377 8.8054 73.5769 9.26278 73.5854 9.78267H71.817ZM76.9608 7.27273L76.7946 13.3835H75.235L75.0645 7.27273H76.9608ZM76.0148 16.1108C75.7335 16.1108 75.4921 16.0114 75.2904 15.8125C75.0887 15.6108 74.9892 15.3693 74.9921 15.0881C74.9892 14.8097 75.0887 14.571 75.2904 14.3722C75.4921 14.1733 75.7335 14.0739 76.0148 14.0739C76.2847 14.0739 76.5219 14.1733 76.7264 14.3722C76.931 14.571 77.0347 14.8097 77.0375 15.0881C77.0347 15.2756 76.985 15.4474 76.8884 15.6037C76.7946 15.7571 76.671 15.8807 76.5176 15.9744C76.3642 16.0653 76.1966 16.1108 76.0148 16.1108Z"
                      fill="white"
                    />
                  </svg>
                  <div className="text-label-medium">I’m looking forward to speaking with you, and...</div>
                </div>

                <div className="hero-congrats-title-wrap">
                  <h1 className="title-h1">You’re one step closer to an outreach system that works</h1>
                </div>

                <div className="hero-congrats-subtitle-wrap">
                  <p className="text-body-large">
                    On the call, I’ll share my read on your market, walk you through how the test campaign and pricing
                    work, and answer any questions. If we’re not a fit, I’ll tell you that too. Please note that your
                    attendance is required.
                  </p>
                </div>

                <DecorChevron />
              </div>
            </div>
          </div>
        </section>

        {/* ============================ STEPS ============================ */}
        <section className="steps">
          <div className="padding-global">
            <div className="container-default">
              <div className="steps_wrapper">
                <div className="steps_title-flashing">
                  <div className="steps_flashing-icon">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="5.62222" cy="5.62222" r="5.62222" fill="#FF5353" />
                    </svg>
                  </div>
                  <h2 className="title-h2">Important! To confirm your call, follow the 3 steps below:</h2>
                </div>

                <div className="steps_list">
                  {/* Step 01 */}
                  <div className="steps_item">
                    <div className="steps_strapline">
                      <p className="text-label-medium">Step 01</p>
                    </div>
                    <div className="steps_item-title">
                      <h5 className="title-h5">Add the event to your calendar and set a reminder</h5>
                    </div>
                    <div className="steps_item-content">
                      <p className="text-body-regular">
                        I’ve sent a confirmation email with all your call details. Please click "Yes" (Google) or
                        "Accept" (Microsoft) to confirm your invite. If something changes and you can't make it, reply to
                        that email and I’ll give your slot to another company. We only have a few each month.
                      </p>
                    </div>
                    <div className="steps_image">
                      <img src="/images/sections/steps/Frame 2147260029 (1).png" alt="Calendar invite" />
                    </div>
                  </div>

                  {/* Step 02 */}
                  <div className="steps_item">
                    <div className="steps_strapline">
                      <p className="text-label-medium">Step 02</p>
                    </div>
                    <div className="steps_item-title">
                      <h5 className="title-h5">Refer a peer who could use a system like this</h5>
                    </div>
                    <div className="steps_item-content">
                      <p className="text-body-regular">
                        Know another founder who’d benefit? Copy the message below and send it their way. If they book
                        too, you both move up the priority list for the test campaign.
                      </p>
                    </div>

                    <CongratsCopyMessage />
                  </div>

                  {/* Step 03 */}
                  <div className="steps_item last">
                    <div className="steps_strapline">
                      <p className="text-label-medium">Step 03/3 (Final Step)</p>
                    </div>
                    <div className="steps_item-title">
                      <h5 className="title-h5">See what happens when cold outreach is done right</h5>
                    </div>
                    <div className="steps_item-content">
                      <p className="text-body-regular">
                        While you wait for your call, scroll the results below: real campaign dashboards and the replies
                        they pulled, from clients like Ben, who had two businesses under contract within 30 days of his
                        first campaign. That’s the system I’ll walk you through on the call.
                      </p>
                    </div>
                    <DecorChevron />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================ REVIEWS / RESULTS ============================ */}
        <CongratsReviews />

        {/* ============================ FAQ (як на головній) ============================ */}
        {faqs && <FaqsSection section={faqs} />}

        {/* ============================ ABOUT BANNER ============================ */}
        <section className="about-banner">
          <div className="padding-global">
            <div className="container-default">
              <div className="about-banner_inner">
                <div className="about-banner_wrapper">
                  <div className="about-banner_title-wrap">
                    <h5 className="title-h5">I look forward to meeting you at our call!</h5>
                  </div>

                  <div className="about-banner_title-wrap-2">
                    <svg width="169" height="1" viewBox="0 0 169 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <line x1="168.763" y1="0.5" x2="-4.37114e-08" y2="0.499985" stroke="#41424D" strokeOpacity="0.3" />
                    </svg>
                    <h5 className="title-h5 gray">TALK SOON</h5>
                    <svg width="169" height="1" viewBox="0 0 169 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <line x1="168.763" y1="0.5" x2="-4.37114e-08" y2="0.499985" stroke="#41424D" strokeOpacity="0.3" />
                    </svg>
                  </div>

                  <div className="about-banner_about-info">
                    <img src="/images/sections/steps/Frame 2147206122.png" alt="Spencer Hirst" />
                    <div className="about-banner_about-info-flex">
                      <p className="text-label-medium">Spencer Hirst</p>
                      <p className="text-body-caption">Founder, Accelerate B2B</p>
                    </div>
                  </div>

                  <div className="about-banner_about-certified">
                    <p className="text-body-small gray-85">Certified Cold Email Expert</p>
                  </div>

                  <div className="about-banner_cta-wrap">
                    <a href="#" className="footer__cta">
                      Check Out My Free Tutorials
                      <span className="footer__cta-arrow">
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                          <path
                            d="M13.0013 2.16602C18.9813 2.16602 23.8346 7.01935 23.8346 12.9993C23.8346 18.9793 18.9813 23.8327 13.0013 23.8327C7.0213 23.8327 2.16797 18.9793 2.16797 12.9993C2.16797 7.01935 7.0213 2.16602 13.0013 2.16602ZM13.0013 11.916H8.66797V14.0827H13.0013V17.3327L17.3346 12.9993L13.0013 8.66602V11.916Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                    </a>
                  </div>

                  <div className="about-banner-list-wrap">
                    <p className="text-label-extra-small gray-85">TRUSTED BY</p>
                    <div className="about-banner-list">
                      {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                        <div key={n} className={`about-banner-item item-${n}`}>
                          <img src={`/images/sections/steps/${n}.png`} alt="" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CongratsFooter />
      </main>
    </div>
  );
}
