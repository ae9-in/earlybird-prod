import Header from '../components/Header';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import FeaturedOffers from '../components/FeaturedOffers';
import WhyItWorks from '../components/WhyItWorks';
import PartnerWithUs from '../components/PartnerWithUs';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

const LandingPage = () => {
    return (
        <>
            <Header />
            <Hero />
            <HowItWorks />
            <FeaturedOffers />
            <WhyItWorks />
            <PartnerWithUs />
            <CTASection />
            <Footer />
        </>
    );
};

export default LandingPage;
