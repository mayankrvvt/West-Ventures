import { useEffect, useState } from "react";

import {
  Users,
  GraduationCap,
  TrendingUp,
  Bot,
  ArrowRight,
} from "lucide-react";

import { services } from "../../constants/services";
import { classNames } from "../../utils/classNames";
import Reveal from "../../components/Reveal";

import heroImg from "../../assets/images/hero/img.jpg";
import heroImg1 from "../../assets/images/hero/img1.jpg";
import heroImg2 from "../../assets/images/hero/img2.jpg";
import heroImg3 from "../../assets/images/hero/img3.jpg";
import heroImg4 from "../../assets/images/hero/img4.jpg";

import "./Services.css";

/* =========================================================
   HERO IMAGES
========================================================= */

const heroImages = [
  heroImg,
  heroImg1,
  heroImg2,
  heroImg3,
  heroImg4,
];

/* =========================================================
   SERVICE ICONS
========================================================= */

const icons = {
  staffing: Users,
  campus: GraduationCap,
  "lead-gen": TrendingUp,
  "custom-ai-agents": Bot,
};

export default function Services() {
  const [activeId, setActiveId] = useState(
    services[0]?.id
  );

  const [heroIndex, setHeroIndex] = useState(0);

  const activeService = services.find(
    (service) => service.id === activeId
  );

  /*
   * Fallback to Bot if an ID does not have an icon.
   * This prevents the page from crashing.
   */
  const ActiveIcon =
    icons[activeService?.id] || Bot;

  /* =========================================================
     ROTATE HERO IMAGES
  ========================================================= */

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((currentIndex) => {
        return (
          (currentIndex + 1) %
          heroImages.length
        );
      });
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  /* =========================================================
     SERVICE CONTACT LINK
  ========================================================= */

  const getServiceLink = (serviceId) => {
    return `/contact?service=${encodeURIComponent(
      serviceId
    )}`;
  };

  return (
    <main className="services-page">

      {/* =====================================================
          SERVICES HERO
      ===================================================== */}

      <section className="services-hero">

        {/* Hero image slideshow */}
        <div
          className="services-hero-images"
          aria-hidden="true"
        >
          {heroImages.map((image, index) => (
            <img
              key={image}
              src={image}
              alt=""
              className={classNames(
                "services-hero-image",
                index === heroIndex &&
                  "is-active"
              )}
            />
          ))}
        </div>

        {/* Dark overlay */}
        <div
          className="services-hero-overlay"
          aria-hidden="true"
        />

        {/* Hero content */}
        <div className="services-hero-content">

          <h1>Services</h1>

          <div className="services-hero-breadcrumb">

            <span>HOME</span>

            <span
              className="services-hero-breadcrumb-arrow"
              aria-hidden="true"
            >
              ›
            </span>

            <span className="active">
              SERVICES
            </span>

          </div>

        </div>

      </section>

      {/* =====================================================
          SERVICES CONTENT
      ===================================================== */}

      <section
        id="services"
        className="section services"
      >

        <div className="container services-grid">

          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <Reveal className="services-intro">

            <p className="eyebrow">
              What we do
            </p>

            <h2 className="services-heading">
              Four service lines, coordinated as one
              engagement.
            </h2>

            <p className="services-copy">
              Pick the ones you need now — or just
              hover to preview each one. Every service
              is built to hand off cleanly to the next
              as your business grows.
            </p>

          </Reveal>

          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <Reveal
            className="services-interactive"
            delay={100}
          >

            {/* =================================================
                SERVICE LIST
            ================================================= */}

            <ul className="services-list">

              {services.map((service) => (

                <li key={service.id}>

                  <button
                    type="button"
                    className={classNames(
                      "services-list-item",
                      service.id === activeId &&
                        "is-active"
                    )}
                    onClick={() =>
                      setActiveId(service.id)
                    }
                    onMouseEnter={() =>
                      setActiveId(service.id)
                    }
                  >

                    <span className="services-list-text">

                      <span className="services-list-title">
                        {service.label}
                      </span>

                      <span className="services-list-summary">
                        {service.summary}
                      </span>

                    </span>

                    <ArrowRight
                      size={18}
                      className="services-list-arrow"
                    />

                  </button>

                </li>

              ))}

            </ul>

            {/* =================================================
                ACTIVE SERVICE DETAILS
            ================================================= */}

            {activeService && (

              <div
                className="services-detail"
                key={activeService.id}
              >

                {/* Service icon */}
                <div className="services-detail-icon">
                  <ActiveIcon size={28} />
                </div>

                {/* Service title */}
                <h3 className="services-detail-title">
                  {activeService.label}
                </h3>

                {/* Service description */}
                <p className="services-detail-copy">
                  {activeService.description}
                </p>

                {/* Working service link */}
                <a
                  href={getServiceLink(
                    activeService.id
                  )}
                  className="services-detail-link"
                >

                  <span>
                    Talk about{" "}
                    {activeService.label.toLowerCase()}
                  </span>

                  <ArrowRight size={18} />

                </a>

              </div>

            )}

          </Reveal>

        </div>

      </section>

    </main>
  );
}