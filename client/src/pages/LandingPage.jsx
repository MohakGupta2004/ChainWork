import NavbarLandingPage  from '../components/NavbarLandingPage';
import Hero from '../components/Hero';
import Features from '../components/Features';
import { HowItWorks } from '../components/HowItWorks';
import { Testimonials } from '../components/Testimonials';
import { CTA } from '../components/CTA';
import { Footer } from '../components/Footer';

function App() {
  return (
    <>
      {/* Fixed Background */}
      <div className="grid-pattern" />
      <div className="background-orbs">
        <div className="background-orb background-orb-1" />
        <div className="background-orb background-orb-2" />
      </div>

      {/* Content */}
      <div className="content-layer">
        <NavbarLandingPage />
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <CTA />
        <Footer />
      </div>
    </>
  );
}

export default App;