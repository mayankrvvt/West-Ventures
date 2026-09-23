import React from "react";
import "./About.css";
import aboutImage from "../../assets/images/img5.jpg";

export default function AboutPage() {
  return (
    <main className="about-page">

      {/* =========================================================
          HERO — SAME STRUCTURE AS SERVICES
      ========================================================= */}
      <section className="about-hero">
        <div className="about-hero-inner services-container">

          <h1 className="about-hero-title">
            About Us
          </h1>

          <div className="about-breadcrumb" aria-label="Breadcrumb">
            <span>HOME</span>
            <span className="breadcrumb-arrow" aria-hidden="true">›</span>
            <span>ABOUT US</span>
          </div>
        </div>
      </section>


      {/* =========================================================
          WHO WE ARE
      ========================================================= */}
      <section className="about-intro">
        <div className="services-container about-intro-grid">

          <div className="about-intro-heading">
            <p className="eyebrow">
              <span className="about-breadcrumb-line" />
              WHO WE ARE
            </p>

            <h2>
              Connecting
              <br />
              <span>people</span> with
              <br />
              opportunity.
            </h2>
          </div>

          <div className="about-intro-copy">
            <p>
              West Ventures is a Canadian Lead Generation consultancy
              committed to connecting businesses with driven professionals
              who are resourceful, creative problem solvers, and open to
              learning.
            </p>

            <p>
              We listen, research and work together to understand what your
              business actually needs. From staffing and business development
              to lead generation, marketing and digital experiences, we build
              practical routes to growth.
            </p>
          </div>

        </div>
      </section>


      {/* =========================================================
          LIGHT STATISTICS
      ========================================================= */}
      <section className="about-stats-light">
        <div className="services-container about-stats-light-grid">

          <article className="about-light-stat">
            <span className="about-light-stat-number">01</span>
            <span className="about-light-stat-label">STRATEGY</span>
          </article>

          <article className="about-light-stat">
            <span className="about-light-stat-number">02</span>
            <span className="about-light-stat-label">PEOPLE</span>
          </article>

          <article className="about-light-stat">
            <span className="about-light-stat-number">03</span>
            <span className="about-light-stat-label">GROWTH</span>
          </article>

        </div>
      </section>


      {/* =========================================================
          WHY WEST VENTURES
      ========================================================= */}
      <section className="about-why">
        <div className="services-container about-why-grid">

          <div className="about-image-frame">
            <img
              src={aboutImage}
              alt="West Ventures team collaborating"
            />
          </div>

          <div className="about-why-content">
            <p className="eyebrow">WHY WEST VENTURES</p>

            <h2>
              Built around
              <br />
              <span>real connections.</span>
            </h2>

            <p className="about-body-text">
              We believe sustainable growth starts with understanding the
              people, businesses and opportunities behind every connection.
            </p>

            <p className="about-body-text">
              Our work combines research, communication and practical
              execution so that businesses can reach the right audiences and
              build relationships that matter.
            </p>

            <div className="about-feature-list">

              <div className="about-feature-item">
                <span className="about-feature-number">01</span>
                <div>
                  <strong>Research-led thinking</strong>
                  <p>
                    We start by understanding the market, audience and
                    opportunity before recommending a direction.
                  </p>
                </div>
              </div>

              <div className="about-feature-item">
                <span className="about-feature-number">02</span>
                <div>
                  <strong>People-first relationships</strong>
                  <p>
                    We focus on creating meaningful connections between
                    businesses, professionals and potential partners.
                  </p>
                </div>
              </div>

              <div className="about-feature-item">
                <span className="about-feature-number">03</span>
                <div>
                  <strong>Practical execution</strong>
                  <p>
                    Strategy becomes useful when it can be translated into
                    clear actions and measurable opportunities.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>


      {/* =========================================================
          DARK STATISTICS
      ========================================================= */}
      <section className="about-stats-dark">
        <div className="services-container about-dark-stats-grid">

          <article className="about-dark-stat">
            <div className="about-dark-icon">✦</div>
            <span className="about-dark-number">01</span>
            <span className="about-dark-label">STRATEGY</span>
            <span className="about-dark-line" />
          </article>

          <article className="about-dark-stat">
            <div className="about-dark-icon about-star">★</div>
            <span className="about-dark-number">02</span>
            <span className="about-dark-label">PEOPLE</span>
            <span className="about-dark-line" />
          </article>

          <article className="about-dark-stat">
            <div className="about-dark-icon">↗</div>
            <span className="about-dark-number">03</span>
            <span className="about-dark-label">OPPORTUNITY</span>
            <span className="about-dark-line" />
          </article>

        </div>
      </section>


      {/* =========================================================
          OUR APPROACH
      ========================================================= */}
      <section className="about-approach">
        <div className="services-container about-approach-grid">

          <div>
            <p className="eyebrow">OUR APPROACH</p>

            <h2>
              Clear thinking.
              <br />
              <span>Better connections.</span>
            </h2>
          </div>

          <div className="about-approach-copy">
            <p>
              Every engagement starts with a simple question: what does your
              business need to move forward?
            </p>

            <p>
              We combine strategy, research, people and digital experiences
              to create a focused path from opportunity to action.
            </p>

            <a className="btn" href="/contact">
              Get in touch
            </a>
          </div>

        </div>
      </section>


      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="about-final-cta">
        <div className="services-container about-final-content">

          <p className="about-final-eyebrow">
            WEST VENTURES
          </p>

          <h2>
            Have a project
            <br />
            in mind?
          </h2>

          <a className="btn" href="/contact">
            Let's talk
          </a>

        </div>
      </section>

    </main>
  );
}
