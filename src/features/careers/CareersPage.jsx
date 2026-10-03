import React, { useEffect, useState } from "react";

import heroImg0 from "../../assets/images/hero/img.jpg";
import heroImg1 from "../../assets/images/hero/img1.jpg";
import heroImg2 from "../../assets/images/hero/img2.jpg";
import heroImg3 from "../../assets/images/hero/img3.jpg";
import heroImg4 from "../../assets/images/hero/img4.jpg";

const heroImages = [
  heroImg0,
  heroImg1,
  heroImg2,
  heroImg3,
  heroImg4,
];

export default function CareersPage() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((previous) => {
        return (previous + 1) % heroImages.length;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        /* =========================================
           CAREERS PAGE
        ========================================= */

        .careers-page {
          width: 100%;
          background: #f7f4ed;
          color: #10142a;
        }

        /* =========================================
           HERO
        ========================================= */

        .careers-hero {
          position: relative;
          width: 100%;
          min-height: 400px;

          display: flex;
          align-items: center;
          justify-content: center;

          overflow: hidden;
          background: #10142a;
        }

        /* Background images */

        .careers-hero-images {
          position: absolute;
          inset: 0;

          width: 100%;
          height: 100%;

          overflow: hidden;
        }

        .careers-hero-image {
          position: absolute;
          inset: 0;

          width: 100%;
          height: 100%;

          object-fit: cover;
          object-position: center;

          opacity: 0;

          transform: scale(1.05);

          transition:
            opacity 1.2s ease-in-out,
            transform 7s ease-out;
        }

        .careers-hero-image.is-active {
          opacity: 1;
          transform: scale(1);
        }

        /* Dark overlay */

        .careers-hero-overlay {
          position: absolute;
          inset: 0;

          z-index: 1;

          background: rgba(8, 12, 25, 0.55);
        }

        /* Hero content */

        .careers-hero-content {
          position: relative;

          z-index: 2;

          width: 100%;

          display: flex;
          flex-direction: column;

          align-items: center;
          justify-content: center;

          text-align: center;

          padding: 80px 20px;

          color: #ffffff;
        }

        .careers-hero-content h1 {
          margin: 0 0 22px;

          color: #ffffff;

          font-family: Georgia, "Times New Roman", serif;

          font-size: clamp(3rem, 6vw, 5.5rem);

          line-height: 1;
          font-weight: 500;
        }

        /* =========================================
           BREADCRUMB
        ========================================= */

        .careers-breadcrumb {
          display: flex;

          align-items: center;
          justify-content: center;

          gap: 12px;

          color: #ffffff;

          font-size: 14px;
          font-weight: 600;

          letter-spacing: 0.12em;
        }

        .careers-breadcrumb-arrow {
          font-size: 22px;

          line-height: 1;

          opacity: 0.85;
        }

        .careers-breadcrumb-current {
          opacity: 0.7;
        }

        /* =========================================
           CAREERS CONTENT
        ========================================= */

        .careers-content {
          padding: 110px 0;

          background: #f7f4ed;
        }

        .careers-content-inner {
          width: min(1200px, calc(100% - 40px));

          margin: 0 auto;
        }

        .careers-heading {
          max-width: 800px;
        }

        .careers-eyebrow {
          margin: 0 0 20px;

          color: #b8862c;

          font-size: 14px;

          font-weight: 700;

          letter-spacing: 0.16em;
        }

        .careers-heading h2 {
          margin: 0 0 25px;

          color: #10142a;

          font-family: Georgia, "Times New Roman", serif;

          font-size: clamp(3rem, 6vw, 5rem);

          line-height: 1;

          font-weight: 500;
        }

        .careers-heading-description {
          max-width: 700px;

          margin: 0;

          color: #5c6379;

          font-size: 20px;

          line-height: 1.7;
        }

        /* =========================================
           JOBS
        ========================================= */

        .careers-jobs {
          margin-top: 80px;

          padding-top: 50px;

          border-top: 1px solid rgba(16, 20, 42, 0.15);
        }

        .careers-jobs h3 {
          margin: 0 0 12px;

          color: #10142a;

          font-family: Georgia, "Times New Roman", serif;

          font-size: 32px;

          font-weight: 500;
        }

        .careers-jobs p {
          margin: 0;

          color: #5c6379;

          font-size: 18px;

          line-height: 1.6;
        }

        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 768px) {
          .careers-hero {
            min-height: 340px;
          }

          .careers-hero-content {
            padding: 70px 20px;
          }

          .careers-hero-content h1 {
            font-size: 3.2rem;
          }

          .careers-content {
            padding: 80px 0;
          }

          .careers-content-inner {
            width: calc(100% - 32px);
          }

          .careers-heading h2 {
            font-size: 3rem;
          }

          .careers-heading-description {
            font-size: 17px;
          }
        }
      `}</style>

      <main className="careers-page">

        {/* =========================================
            CAREERS HERO
        ========================================= */}

        <section className="careers-hero">

          <div className="careers-hero-images">
            {heroImages.map((image, index) => (
              <img
                key={image}
                src={image}
                alt="West Ventures"
                className={`careers-hero-image ${
                  index === currentImage ? "is-active" : ""
                }`}
              />
            ))}
          </div>

          <div
            className="careers-hero-overlay"
            aria-hidden="true"
          />

          <div className="careers-hero-content">

            <h1>Careers</h1>

            <div className="careers-breadcrumb">
              <span>HOME</span>

              <span className="careers-breadcrumb-arrow">
                ›
              </span>

              <span className="careers-breadcrumb-current">
                CAREERS
              </span>
            </div>

          </div>

        </section>

        {/* =========================================
            CAREERS CONTENT
        ========================================= */}

        <section className="careers-content">

          <div className="careers-content-inner">

            <div className="careers-heading">

              <p className="careers-eyebrow">
                CAREERS
              </p>

              <h2>
                Build what connects.
              </h2>

              <p className="careers-heading-description">
                Join West Ventures and help connect ambitious
                businesses with the people, opportunities, and
                ideas that help them grow.
              </p>

            </div>

            <div className="careers-jobs">

              <h3>
                Open Positions
              </h3>

              <p>
                Explore opportunities to join our growing team.
              </p>

            </div>

          </div>

        </section>

      </main>
    </>
  );
}