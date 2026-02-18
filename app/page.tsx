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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Fintaak",
  url: "https://fintaak.com",
  description:
    "Compara proveedores de remesas, calcula comisiones y tipo de cambio real. Transparencia total para enviar dinero a México desde EE.UU.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  inLanguage: "es",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  creator: {
    "@type": "Organization",
    name: "Fintaak",
    url: "https://fintaak.com",
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@fintaak.com",
      contactType: "customer service",
      availableLanguage: ["Spanish", "English"],
    },
  },
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
