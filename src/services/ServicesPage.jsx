import React from "react";
import "./ServicesPage.css";

import Reveal from "../components/Reveal";

import heroImage from "../assets/images/hero/img2.jpg";
import staffingImage from "../assets/images/hero/img3.jpg";
import strategyImage from "../assets/images/hero/img4.jpg";
import campusImage from "../assets/images/hero/img1.jpg";

const ServicesPage = () => {
  return (
    <div className="services-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="services-hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="services-hero-overlay" />

        <div className="services-hero-content">

          <h1>Services</h1>

          <div className="services-breadcrumb">
            <span>HOME</span>
            <span className="breadcrumb-arrow">›</span>
            <span className="active">SERVICES</span>
          </div>

        </div>
      </section>


      {/* =====================================================
          LEAD GENERATION
      ===================================================== */}

      <section className="lead-section">

        <div className="services-container lead-grid">

          <Reveal>
            <div className="lead-content">

              <h2>
                Get Verified Leads
                <span>For Your Business</span>
              </h2>

              <div className="yellow-line" />

              <p className="lead-intro">
                We provide leads services to:
              </p>

              <div className="lead-item">
                <h3>Immigration</h3>
                <p>
                  All the verified data of immigration & Holiday
                  company program.
                </p>
              </div>

              <div className="lead-item">
                <h3>Educations</h3>
                <p>
                  Top students leads from overseas.
                </p>
              </div>

              <div className="lead-item">
                <h3>Auto Car Dealership</h3>
                <p>
                  Get leads of new/used car buyers and auto companies.
                </p>
              </div>

              <div className="lead-item">
                <h3>Restaurants</h3>
                <p>
                  Strategy to fill up the restaurant.
                  <br />
                  Revenue to restaurant operations.
                </p>
              </div>

              <div className="lead-item">
                <h3>Overseas Partnership</h3>
                <p>
                  Licenced agents with training.
                </p>
              </div>

            </div>
          </Reveal>


          <Reveal>
            <div className="lead-image">
              <img
                src={strategyImage}
                alt="Business strategy"
              />
            </div>
          </Reveal>

        </div>

      </section>


      {/* =====================================================
          B2B STAFFING INTRO
      ===================================================== */}

      <section className="staffing-intro">

        <div className="staffing-image">
          <img
            src={staffingImage}
            alt="B2B staffing solutions"
          />
        </div>


        <Reveal>

          <div className="staffing-intro-content">

            <h2>B2B STAFFING SOLUTIONS</h2>

            <div className="yellow-line center" />

            <h3>
              We offer to connect you with Canadian
              businesses and agencies seeking partnerships
              with potential employers.
            </h3>

            <p>
              Access to a diverse pool of Employers across all
              parts of British Columbia including Metro Vancouver,
              Lower mainland, Tier 1, Tier 2, Vancouver Island,
              Northern BC, Prince George, Prince Rupert, Victoria,
              Kamloops, Kelowna, Tofino, Cranbrook.
            </p>

            <p>
              <strong>
                Lead generation and initial communication
              </strong>
            </p>

            <p>
              Provide necessary documents like Business License
              Numbers, Tax Returns, and employees on payroll to
              ensure the lead authentic Collaborations available
              across multiple industries like IT, Construction,
              Manufacturing, Hospitality, Accounting, Leisure,
              among others.
            </p>

            <p>
              Marketers with magnifier research marketing
              opportunities chart. Marketing research, marketing
              analysis, market opportunities and problems concept.
            </p>

          </div>

        </Reveal>

      </section>


      {/* =====================================================
          B2B STAFFING SERVICES
      ===================================================== */}

      <section className="staffing-services">

        <Reveal>

          <div className="staffing-services-content">

            <h2>B2B STAFFING SOLUTIONS</h2>

            <div className="yellow-line center" />

            <h3>
              Once you sign up with us, you will have access
              to the following West Force services
            </h3>

            <ul className="service-check-list">

              <li>
                <span>✓</span>
                <p>
                  Searching the most eligible employer or
                  industry for your client
                </p>
              </li>

              <li>
                <span>✓</span>
                <p>
                  Assisting you with finding the right position
                  for your candidate
                </p>
              </li>

              <li>
                <span>✓</span>
                <p>
                  Arranging a meeting with the employer
                </p>
              </li>

              <li>
                <span>✓</span>
                <p>
                  Providing documentation of employers after
                  subsequent interaction
                </p>
              </li>

              <li>
                <span>✓</span>
                <p>
                  Workshop on helping your client connect with
                  your employer
                </p>
              </li>

              <li>
                <span>✓</span>
                <p>
                  Assisting in developing a relationship with
                  your employer through events, networking,
                  and interaction
                </p>
              </li>

            </ul>

            <p className="staffing-bottom-text">
              Customer feedback analysis, lead generation,
              satisfaction and loyalty analysis, customer
              retention increasing, marketing tools concept.
            </p>

          </div>

        </Reveal>


        <div className="staffing-services-image">

          <img
            src={campusImage}
            alt="Business partnership"
          />

        </div>

      </section>


      {/* =====================================================
          CAMPUS CONNECT
      ===================================================== */}

      <section
        className="campus-section"
        style={{
          backgroundImage: `url(${campusImage})`,
        }}
      >

        <div className="campus-overlay" />

        <div className="services-container campus-content">

          <Reveal>

            <h2>CAMPUS CONNECT</h2>

            <div className="yellow-line" />

            <p>
              Networking events with your organization and
              new graduates interested in your industry.
              Inspire them to build a career with your company.
            </p>

          </Reveal>

        </div>

      </section>


      {/* =====================================================
          SERVICE COST
      ===================================================== */}

      <section className="service-cost">

        <div className="services-container">

          <Reveal>

            <div className="section-heading">

              <h2>SERVICE COST</h2>

              <div className="yellow-line center" />

              <p>
                We understand the financial implications of COVID.
                Therefore, we are price conscious and offer you
                a range of plans.
              </p>

              <p>
                So you can pick the one that works for you.
              </p>

            </div>

          </Reveal>


          <div className="pricing-grid">


            {/* TRIAL */}

            <div className="price-card">

              <div className="price-card-top">

                <h3>Trial Plan</h3>

                <div className="money-icon">
                  <svg
                    viewBox="0 0 64 64"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <rect
                      x="8"
                      y="18"
                      width="48"
                      height="28"
                      rx="3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    />

                    <circle
                      cx="32"
                      cy="32"
                      r="8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    />

                    <path
                      d="M16 18c0 5-3 8-8 8M48 18c0 5 3 8 8 8M16 46c0-5-3-8-8-8M48 46c0-5 3-8 8-8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

              </div>

              <div className="price-card-body">

                <p>
                  One lead only
                </p>

                <div className="price-divider" />

                <p>
                  Cost – $5,000 + GST 5%
                </p>

                <div className="price-divider" />

              </div>

            </div>


            {/* 1 MONTH */}

            <div className="price-card">

              <div className="price-card-top">

                <h3>1 Month Plan</h3>

                <div className="money-icon">
                  <svg
                    viewBox="0 0 64 64"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <rect
                      x="8"
                      y="18"
                      width="48"
                      height="28"
                      rx="3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    />

                    <circle
                      cx="32"
                      cy="32"
                      r="8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    />

                    <path
                      d="M16 18c0 5-3 8-8 8M48 18c0 5 3 8 8 8M16 46c0-5-3-8-8-8M48 46c0-5 3-8 8-8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

              </div>

              <div className="price-card-body">

                <p>
                  3 leads
                </p>

                <div className="price-divider" />

                <p>
                  Cost – $15,000 /per month
                  + GST 5%
                </p>

                <div className="price-divider" />

              </div>

            </div>


            {/* 3 MONTHS */}

            <div className="price-card">

              <div className="price-card-top">

                <h3>3 Months Plan</h3>

                <div className="money-icon">
                  <svg
                    viewBox="0 0 64 64"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <rect
                      x="8"
                      y="18"
                      width="48"
                      height="28"
                      rx="3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    />

                    <circle
                      cx="32"
                      cy="32"
                      r="8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    />

                    <path
                      d="M16 18c0 5-3 8-8 8M48 18c0 5 3 8 8 8M16 46c0-5-3-8-8-8M48 46c0-5 3-8 8-8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

              </div>

              <div className="price-card-body">

                <p>
                  3 leads every month
                </p>

                <div className="price-divider" />

                <p>
                  Cost – $12,000 /per month
                  + GST 5%
                </p>

                <div className="price-divider" />

              </div>

            </div>


            {/* 6 MONTHS */}

            <div className="price-card">

              <div className="price-card-top">

                <h3>6 Months Plan</h3>

                <div className="money-icon">
                  <svg
                    viewBox="0 0 64 64"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <rect
                      x="8"
                      y="18"
                      width="48"
                      height="28"
                      rx="3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    />

                    <circle
                      cx="32"
                      cy="32"
                      r="8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    />

                    <path
                      d="M16 18c0 5-3 8-8 8M48 18c0 5 3 8 8 8M16 46c0-5-3-8-8-8M48 46c0-5 3-8 8-8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

              </div>

              <div className="price-card-body">

                <p>
                  3 leads every month
                </p>

                <div className="price-divider" />

                <p>
                  Cost – $10,500 /per month
                  + GST 5%
                </p>

                <div className="price-divider" />

              </div>

            </div>


            {/* 12 MONTHS */}

            <div className="price-card">

              <div className="price-card-top">

                <h3>12 Months Plan</h3>

                <div className="money-icon">
                  <svg
                    viewBox="0 0 64 64"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <rect
                      x="8"
                      y="18"
                      width="48"
                      height="28"
                      rx="3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    />

                    <circle
                      cx="32"
                      cy="32"
                      r="8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    />

                    <path
                      d="M16 18c0 5-3 8-8 8M48 18c0 5 3 8 8 8M16 46c0-5-3-8-8-8M48 46c0-5 3-8 8-8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

              </div>

              <div className="price-card-body">

                <p>
                  3 leads every month
                </p>

                <div className="price-divider" />

                <p>
                  Cost – $9,000 /per month
                  + GST 5%
                </p>

                <div className="price-divider" />

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          ADD ON SERVICES
      ===================================================== */}

      <section className="addon-section">

        <div className="services-container">

          <Reveal>

            <div className="addon-heading">

              <h2>
                ADD ON SERVICES
              </h2>

              <div className="white-line" />

            </div>

          </Reveal>


          <Reveal>

            <div className="addon-content">

              <p>
                Mandatory per diem charges are applicable
                depending on the province.
              </p>

              <p>
                Per diem/technology cost mandatory depends
                on province.
              </p>

              <h3>
                Documentation Services
              </h3>

              <p className="addon-note">
                As of 2021 we charge procurement cost of
                arranging confidential documents of the
                employer through privacy process for a cost
                of $2500
              </p>

            </div>

          </Reveal>

        </div>

      </section>

    </div>
  );
};

export default ServicesPage;