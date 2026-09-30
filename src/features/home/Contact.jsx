import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

import "./Contact.css";

export default function Contact() {
  return (
    <div className="contact-page">

      {/* =========================
          HERO
      ========================= */}
      <section className="contact-hero">
        <div className="contact-hero-overlay"></div>

        <div className="contact-hero-content">
          <h1>Contact Us</h1>

          <div className="contact-breadcrumb">
            <span>HOME</span>
            <span className="contact-breadcrumb-arrow">›</span>
            <span className="contact-breadcrumb-current">
              CONTACT US
            </span>
          </div>
        </div>
      </section>

      {/* =========================
          CONTACT CONTENT
      ========================= */}
      <section className="contact-content">
        <div className="contact-container">

          {/* LEFT SIDE */}
          <div className="contact-details">

            <h2>
              Contacts
              <br />
              <span>Details</span>
            </h2>

            <div className="contact-intro">
              <span className="contact-square"></span>

              <p>
                Please let us know if you have a question
                or want to leave a comment
              </p>
            </div>

            {/* Address */}
            <div className="contact-detail-item">
              <MapPin
                size={27}
                className="contact-detail-icon"
              />

              <div>
                <h4>ADDRESS INFO:</h4>
                <p>BC, Canada</p>
              </div>
            </div>

            {/* Phone */}
            <div className="contact-detail-item">
              <Phone
                size={27}
                className="contact-detail-icon"
              />

              <div>
                <h4>CUSTOMER CARE:</h4>
                <p>+1 (778) 957-2433</p>
              </div>
            </div>

            {/* Email */}
            <div className="contact-detail-item">
              <Mail
                size={27}
                className="contact-detail-icon"
              />

              <div>
                <h4>OUR EMAILS:</h4>

                <p>kc@westventures.ca</p>

                <p>
                  For Sales: sales@westventures.ca
                </p>

                <p>
                  Existing Clients: clients@westventures.ca
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE - FORM */}
          <div className="contact-form-wrapper">

            <form className="contact-form">

              <div className="contact-form-field">
                <label htmlFor="contact-name">
                  Your name
                </label>

                <input
                  id="contact-name"
                  type="text"
                  name="name"
                />
              </div>

              <div className="contact-form-field">
                <label htmlFor="contact-email">
                  Your email
                </label>

                <input
                  id="contact-email"
                  type="email"
                  name="email"
                />
              </div>

              <div className="contact-form-field">
                <label htmlFor="contact-subject">
                  Subject
                </label>

                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                />
              </div>

              <div className="contact-form-field">
                <label htmlFor="contact-message">
                  Your message (optional)
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  rows="8"
                ></textarea>
              </div>

              <button
                type="submit"
                className="contact-submit"
              >
                Submit
              </button>

            </form>

          </div>

        </div>
      </section>

    </div>
  );
}