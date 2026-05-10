import HeroBanner from './widgets/hero-banner/HeroBanner';
import WhyChoose from './widgets/why-choose/WhyChoose';
import Testimonials from './widgets/testimonials/Testimonials';
import NewsSection from './widgets/news-section/NewsSection';
import HomeAbout from './widgets/home/HomeAbout';
import HomeStats from './widgets/home/HomeStats';
import HomePhilosophy from './widgets/home/HomePhilosophy';
import HomeCTA from './widgets/home/HomeCTA';

export const COMPONENT_MAP = {
  HeroBanner: HeroBanner,
  WhoWeAre: HomeAbout,
  Stats: HomeStats,
  Philosophy: HomePhilosophy,
  WhyChoose: WhyChoose,
  Testimonials: Testimonials,
  NewsSection: NewsSection,
  CTA: HomeCTA,
};
