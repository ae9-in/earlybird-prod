import type { Metadata } from 'next';
import Header from '../components/Header';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import FeaturedOffers from '../components/FeaturedOffers';
import WhyItWorks from '../components/WhyItWorks';
import PartnerWithUs from '../components/PartnerWithUs';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import { HomepageSchema, SoftwareApplicationSchema, FAQSchema } from '../components/seo/schemas';
import HomepageFAQ from '../components/HomepageFAQ';

export const metadata: Metadata = {
  title: 'EarlyBird India — #1 Brand Promoter & Influencer Marketing Platform in India',
  description:
    'Discover and hire 50,000+ verified brand promoters, micro-influencers & content ' +
    'creators across India. Launch campaigns on Instagram, YouTube, Reels & LinkedIn. ' +
    'Trusted by 5,000+ brands. Start free.',
  alternates: {
    canonical: 'https://www.earlybirdindia.online',
  },
};

// FAQ content targets "brand promoter india" + "influencer marketing india" keywords
// Rendered as visible HTML + JSON-LD → readable by Google without JS execution
export const brandPromoterFaqs = [
  {
    q: 'What is a brand promoter in India?',
    a: "A brand promoter in India is a content creator, influencer, or field sales professional who represents and promotes a brand's products or services to their audience across platforms like Instagram, YouTube, and offline events. They build authentic connections that drive high-intent conversions.",
  },
  {
    q: 'How do I hire an influencer in India for my brand?',
    a: 'On EarlyBird India, you can browse 50,000+ verified influencers, filter by niche, city, follower count, and platform, then directly book them for your campaign — no agency fees or middlemen.',
  },
  {
    q: 'What is the cost of influencer marketing in India?',
    a: 'Influencer marketing costs in India vary by tier: nano-influencers (1K–10K followers) charge ₹500–₹5,000 per post, micro-influencers (10K–100K) charge ₹5,000–₹50,000, and macro-influencers (100K+) charge ₹50,000 and above. EarlyBird India helps brands connect with creators at transparent, upfront rates.',
  },
  {
    q: 'Which is the best influencer marketing platform in India?',
    a: "EarlyBird India is one of India's top platforms for brand promotion and influencer marketing, offering verified creator profiles, direct booking, campaign management, and ROI analytics — free for brands to get started.",
  },
  {
    q: 'Is EarlyBird India free for brands?',
    a: 'Yes. Brands can sign up, browse influencers, and launch campaigns on EarlyBird India for free. We charge a small platform fee only on successful campaign completions.',
  },
];

export default function Home() {
  return (
    <>
      {/* JSON-LD Structured Data — read by Google without JS */}
      <HomepageSchema />
      <SoftwareApplicationSchema />
      <FAQSchema faqs={brandPromoterFaqs} />

      <Header />
      <Hero />
      <HowItWorks />
      <FeaturedOffers />
      <WhyItWorks />
      <PartnerWithUs />
      <HomepageFAQ faqs={brandPromoterFaqs} />
      <CTASection />
      <Footer />
    </>
  );
}
