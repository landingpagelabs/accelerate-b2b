import { urlForImage } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import Header from '@/components/Header';
import HeroSection from '@/components/sections/HeroSection';
import FeatureSection from '@/components/sections/FeatureSection';
import ContentSection from '@/components/sections/ContentSection';
import TestimonialSection from '@/components/sections/TestimonialSection';
import StatsSection from '@/components/sections/StatsSection';
import CtaSection from '@/components/sections/CtaSection';
import LogoGridSection from '@/components/sections/LogoGridSection';
import PartnersSection from '@/components/sections/PartnersSection';
import ComparisonSection from '@/components/sections/ComparisonSection';
import MeetingSection from '@/components/sections/MeetingSection';
import MechanismSection from '@/components/sections/MechanismSection';
import ServicesSection from '@/components/sections/ServicesSection';
import CaseStudiesSection from '@/components/sections/CaseStudiesSection';
import InfoSection from '@/components/sections/InfoSection';
import ReviewsSection from '@/components/sections/ReviewsSection';
import FaqsSection from '@/components/sections/FaqsSection';
import TextImageSection from '@/components/sections/TextImageSection';
import BannerSection from '@/components/sections/BannerSection';
import TutorialsSection from '@/components/sections/TutorialsSection';

function SectionFallback({ section }: { section: any }) {
  return (
    <section className="section section--alt">
      <div className="container">
        <h2 className="section-title">Невідомий блок: {section._type}</h2>
        <p className="section-copy">Додайте цей блок у Sanity або оновіть PageBuilder.</p>
      </div>
    </section>
  );
}

export function PageBuilder({ page }: { page: any }) {
  return (
    <>
    <Header />
    <main>
      {page.sections?.map((section: any, index: number) => {
        switch (section._type) {
          case 'heroSection':
            return <HeroSection key={index} section={section} />;
          case 'featureSection':
            return <FeatureSection key={index} section={section} />;
          case 'contentSection':
            return <ContentSection key={index} section={section} />;
          case 'testimonialSection':
            return <TestimonialSection key={index} section={section} />;
          case 'statsSection':
            return <StatsSection key={index} section={section} />;
          case 'ctaSection':
            return <CtaSection key={index} section={section} />;
          case 'logoGridSection':
            return <LogoGridSection key={index} section={section} />;
          case 'partnersSection':
            return <PartnersSection key={index} section={section} />;
          case 'comparisonSection':
            return <ComparisonSection key={index} section={section} />;
          case 'meetingSection':
            return <MeetingSection key={index} section={section} />;
          case 'mechanismSection':
            return <MechanismSection key={index} section={section} />;
          case 'servicesSection':
            return <ServicesSection key={index} section={section} />;
          case 'caseStudiesSection':
            return <CaseStudiesSection key={index} section={section} />;
          case 'infoSection':
            return <InfoSection key={index} section={section} />;
          case 'reviewsSection':
            return <ReviewsSection key={index} section={section} />;
          case 'faqsSection':
            return <FaqsSection key={index} section={section} />;
          case 'textImageSection':
            return <TextImageSection key={index} section={section} />;
          case 'bannerSection':
            return <BannerSection key={index} section={section} />;
          case 'tutorialsSection':
            return <TutorialsSection key={index} section={section} />;
          default:
            return <SectionFallback key={index} section={section} />;
        }
      })}

      <footer className="footer">
        <div className="padding-global">
          <div className="footer__main">
            <div className="footer__brand">
              <div className="footer__logo">
                <img
                  className="footer__logo-icon"
                  src="/images/footer/footer_badge-icon.svg"
                  alt="Accelerate B2B logo"
                />
                <span className="footer__logo-name">Accelerate B2B</span>
              </div>
            </div>
            <p className="footer__description">
              Accelerate B2B is a founder-led cold outreach agency. We find the companies that match your best clients, make sure every contact fits, and run the outreach that turns them into conversations.
            </p>
            <div className="footer__cta-stack">
              <a href="#" className="footer__cta">
                Apply For Your Free Test Campaign
                <span className="footer__cta-arrow">
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.0013 2.16602C18.9813 2.16602 23.8346 7.01935 23.8346 12.9993C23.8346 18.9793 18.9813 23.8327 13.0013 23.8327C7.0213 23.8327 2.16797 18.9793 2.16797 12.9993C2.16797 7.01935 7.0213 2.16602 13.0013 2.16602ZM13.0013 11.916H8.66797V14.0827H13.0013V17.3327L17.3346 12.9993L13.0013 8.66602V11.916Z" fill="white"/>
                  </svg>
                </span>
              </a>
              <p className="footer__cta-note">No Setup Fee | No Lock-In | Only A Few Spots Available</p>
            </div>
            <div className="footer__nav">
              <div className="footer__col">
                <p className="footer__col-title">Navigation</p>
                <ul className="footer__links">
                  <li><a href="#" className="footer__link">Book Consultation</a></li>
                  <li><a href="#" className="footer__link">Explainer Video</a></li>
                  <li><a href="#" className="footer__link">Why Us</a></li>
                  <li><a href="#" className="footer__link">Services</a></li>
                  <li><a href="#" className="footer__link">Reviews</a></li>
                </ul>
              </div>
              <div className="footer__col">
                <p className="footer__col-title">Case Studies</p>
                <ul className="footer__links">
                  <li><a href="#" className="footer__link">All Case Studies</a></li>
                  <li><a href="#" className="footer__link">LH Capital Group</a></li>
                  <li><a href="#" className="footer__link">Forge Origination</a></li>
                  <li><a href="#" className="footer__link">LolaBird Fundraising</a></li>
                  <li><a href="#" className="footer__link">Vibra Media</a></li>
                </ul>
              </div>
              <div className="footer__col">
                <p className="footer__col-title">Resources</p>
                <ul className="footer__links">
                  <li><a href="#" className="footer__link">Blog</a></li>
                  <li><a href="#" className="footer__link">AI? Read this</a></li>
                  <li><a href="#" className="footer__link">Tutorials</a></li>
                  <li><a href="#" className="footer__link">Careers</a></li>
                  <li><a href="#" className="footer__link">FAQs</a></li>
                </ul>
              </div>
              <div className="footer__col">
                <p className="footer__col-title">Socials</p>
                <ul className="footer__links">
                  <li><a href="#" className="footer__link">LinkedIn</a></li>
                  <li><a href="#" className="footer__link">YouTube</a></li>
                </ul>
              </div>
              <div className="footer__col">
                <p className="footer__col-title">Company</p>
                <ul className="footer__links">
                  <li><a href="mailto:spencer@accelerateb2b.com" className="footer__link">spencer@accelerateb2b.com</a></li>
                  <li><a href="#" className="footer__link">London, UK</a></li>
                  <li><a href="#" className="footer__link">Privacy Policy</a></li>
                  <li><a href="#" className="footer__link">Terms of Service</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <div className="footer__bottom-inner padding-global">
            <a href="#" className="footer__built">
              <img className="footer__built-icon" src="/images/footer/footer_bottom-icon.svg" alt="" />
              Built By Landing Page Labs
            </a>
            <p className="footer__copy">Accelerate B2B {new Date().getFullYear()}. All Rights Reserved.</p>
          </div>
        </div>
        <span className="footer__stripe" />
      </footer>
    </main>
    </>
  );
}
