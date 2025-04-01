import HeroSection from '../components/landingPage/heroSection';
import AboutSection from '../components/landingPage/aboutSection';
import FeaturesSection from '../components/landingPage/featureSection';
import TestimonialsSection from '../components/landingPage/testmonialSection';
import CtaSection from '../components/landingPage/ctaSection';
import ContactSection from '../components/landingPage/contactSection';
import Navbar from '../components/landingPage/navbarSection';
import Footer from '../components/landingPage/footerSection';

export default function HomePage() {
	return (
		<div className='min-h-screen'>
			<Navbar />
			<HeroSection />
			<AboutSection />
			<FeaturesSection />
			<TestimonialsSection />
			<CtaSection />
			<ContactSection />
			<Footer />
		</div>
	);
}
