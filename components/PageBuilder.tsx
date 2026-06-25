import { urlForImage } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
import CongratsReviews from '@/components/sections/CongratsReviews';
import FaqsSection from '@/components/sections/FaqsSection';
import TextImageSection from '@/components/sections/TextImageSection';
import BannerSection from '@/components/sections/BannerSection';
import TutorialsSection from '@/components/sections/TutorialsSection';
import ConsultationModal from '@/components/sections/ConsultationModal';
import VslModal from '@/components/sections/VslModal';

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
            // Same curated reviews block as the /congrats page (hardcoded 3 columns).
            return <CongratsReviews key={index} />;
          case 'faqsSection':
            return <FaqsSection key={index} section={section} />;
          case 'textImageSection':
            return <TextImageSection key={index} section={section} />;
          case 'bannerSection':
            return <BannerSection key={index} section={section} />;
          case 'tutorialsSection':
            return <TutorialsSection key={index} section={section} />;
          case 'consultationModalSection':
            return <ConsultationModal key={index} section={section} />;
          case 'vslModalSection':
            return <VslModal key={index} section={section} />;
          default:
            return <SectionFallback key={index} section={section} />;
        }
      })}

      <Footer />
    </main>
    </>
  );
}
