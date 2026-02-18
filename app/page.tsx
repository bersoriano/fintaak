import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Partners from "./components/Partners";
import Benefits from "./components/Benefits";
import Transparency from "./components/Transparency";
import Comparison from "./components/Comparison";
import HowItWorks from "./components/HowItWorks";
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
      <RemittanceCalculator />
      <Partners />
      <Benefits />
      <Transparency />
      <Comparison />
      <HowItWorks />
      <FAQ />
      <CTASection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
