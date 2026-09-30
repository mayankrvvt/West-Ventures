import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ChatWidget from "../components/ChatWidget";
import ScrollProgressBar from "../components/ScrollProgressBar";
import SectionRail from "../components/SectionRail";

import HomePage from "../features/home/HomePage";
import About from "../features/home/About";
import FAQ from "../features/home/FAQ";
import Contact from "../features/home/Contact";
import CareersPage from "../features/careers/CareersPage";
import JobDetails from "../features/careers/JobDetails";
import AdminCareers from "../admin/AdminCareers";
import AdminLeads from "../admin/AdminLeads";
import LeadPortal from "../features/leadPortal/LeadPortal";

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
  const isCareersPage = path === "/careers";
  const isAdminCareersPage = path === "/admin/careers";
  const isAdminLeadsPage = path === "/admin/leads";
  const isLeadPortalPage = path === "/lead-portal";
  const isAdminLoginPage = path === "/admin/login";
  const isJobDetailsPage = path.startsWith("/careers/") && path.split("/")[2];

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

    if (isAdminLeadsPage) {
      return <AdminLeads />;
    }

    if (isAdminCareersPage || isAdminLoginPage) {
      return <AdminCareers />;
    }

    if (isLeadPortalPage) {
      return <LeadPortal />;
    }

    if (isJobDetailsPage) {
      return <JobDetails jobId={path.split("/")[2]} />;
    }

    if (isCareersPage) {
      return <CareersPage />;
    }

    return <HomePage />;
  };

  return (
    <div className="app">
      {/* Scroll progress */}
      <ScrollProgressBar />

      {/* Navbar - hidden on admin pages */}
      {!isAdminCareersPage && !isAdminLoginPage && !isAdminLeadsPage && !isLeadPortalPage && <Navbar />}

      {/* Page */}
      <main>{renderPage()}</main>

      {/* Section rail - Home page only */}
      {isHomePage && <SectionRail />}

      {!isAdminCareersPage && !isAdminLoginPage && !isAdminLeadsPage && !isLeadPortalPage && <Footer />}

      {!isAdminCareersPage && !isAdminLoginPage && !isAdminLeadsPage && !isLeadPortalPage && <ChatWidget />}
    </div>
  );
}