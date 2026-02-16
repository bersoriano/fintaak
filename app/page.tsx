import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Partners from "./components/Partners";
import Benefits from "./components/Benefits";
import Transparency from "./components/Transparency";
import HowItWorks from "./components/HowItWorks";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import RemittanceCalculator from "./components/RemittanceCalculator";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

export default function Home() {
  return (
    <div className="min-h-screen">
      <a href="#main-content" className="skip-to-content">
        Saltar al contenido principal
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
      <Partners />
      <Benefits />
      <Transparency />
      <RemittanceCalculator />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTASection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
