import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ChatWidget from "../components/ChatWidget";
import ScrollProgressBar from "../components/ScrollProgressBar";
import SectionRail from "../components/SectionRail";

import HomePage from "../features/home/HomePage";
import About from "../features/home/About";
import FAQ from "../features/home/FAQ";
import Contact from "../features/home/Contact";

import ServicesPage from "../services/ServicesPage";

import { useSmoothScroll } from "../hooks/useSmoothScroll";

export default function App() {
  useSmoothScroll();

  const path = window.location.pathname;

  // =========================
  // ROUTES
  // =========================

  const isHomePage = path === "/";
  const isAboutPage = path === "/about";
  const isServicesPage = path === "/services";
  const isFAQPage = path === "/faq";
  const isContactPage = path === "/contact";

  // =========================
  // PAGE
  // =========================

  const renderPage = () => {
    if (isAboutPage) {
      return <About />;
    }

    if (isServicesPage) {
      return <ServicesPage />;
    }

    if (isFAQPage) {
      return <FAQ />;
    }

    if (isContactPage) {
      return <Contact />;
    }

    return <HomePage />;
  };

  return (
    <div className="app">
      {/* Scroll progress */}
      <ScrollProgressBar />

      {/* Navbar */}
      <Navbar />

      {/* Page */}
      <main>{renderPage()}</main>

      {/* Section rail - Home page only */}
      {isHomePage && <SectionRail />}

      {/* Footer */}
      <Footer />

      {/* Chat widget */}
      <ChatWidget />
    </div>
  );
}