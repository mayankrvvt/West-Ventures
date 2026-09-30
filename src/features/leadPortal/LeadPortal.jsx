import { useState } from "react";
import Navbar from "../../components/Navbar";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Users,
  BriefcaseBusiness,
} from "lucide-react";
import { leadApi } from "../../services/leadApi";
import "./LeadPortal.css";

const initialForm = {
  name: "",
  email: "",
  firm: "",
  region: "BC",
  plan: "A",
};

export default function LeadPortal() {
  const [form, setForm] = useState(initialForm);

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const update = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));

    // Clear previous status when user edits the form
    if (status.message) {
      setStatus({
        type: "",
        message: "",
      });
    }
  };

  const submit = async (event) => {
    event.preventDefault();

    setStatus({
      type: "",
      message: "",
    });

    // Basic validation
    if (!form.name.trim()) {
      setStatus({
        type: "error",
        message: "Please enter your full name.",
      });
      return;
    }

    if (!form.email.trim()) {
      setStatus({
        type: "error",
        message: "Please enter your email address.",
      });
      return;
    }

    setLoading(true);

    try {
      await leadApi.createLead({
        name: form.name.trim(),
        email: form.email.trim(),
        firm: form.firm.trim(),
        region: form.region,
        plan: form.plan,
      });

      setStatus({
        type: "success",
        message:
          "Thanks — an Account Manager will be in touch shortly.",
      });

      setForm(initialForm);
    } catch (error) {
      console.error("Lead submission error:", error);

      setStatus({
        type: "error",
        message:
          error.message ||
          "We couldn't submit your request. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lead-portal">

      {/* =====================================================
          MAIN WEST VENTURES NAVBAR
          This is the same navbar used throughout the website.
      ====================================================== */}

      <Navbar />

      {/* =====================================================
          PORTAL BRAND BAR
      ====================================================== */}

      <section className="lead-portal-nav">
        <div className="lead-wrap lead-nav-inner">

          <a
            href="/lead-portal"
            className="lead-brands"
            aria-label="West Ventures Lead Portal"
          >
            <span className="lead-west">
              WestVentures
            </span>

            <span className="lead-divider" />

            <span className="lead-gateway">
              Gateway Canada
            </span>
          </a>

          <a
            className="lead-nav-cta"
            href="#capture"
          >
            Get an Employer Lead

            <ArrowRight size={15} />
          </a>

        </div>
      </section>

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="lead-hero">
        <div className="lead-wrap">

          <div className="lead-eyebrow">
            West Ventures × Gateway Canada
          </div>

          <h1>
            Two firms. One path{" "}
            <span>to your next hire.</span>
          </h1>

          <p className="lead-sub">
            West Ventures sources and coordinates the
            employer. Gateway Canada files the immigration
            paperwork. Together, a full-service pipeline
            for immigration consultants across BC and
            Alberta.
          </p>

          <div className="lead-stats">

            <Stat
              number="3"
              label="Integrated services — Plan A, B, C"
            />

            <Stat
              number="2"
              label="Provinces — BC & Alberta"
            />

            <Stat
              number="150–300%"
              label="Typical partner margin"
            />

          </div>

        </div>
      </section>

      {/* =====================================================
          SERVICES
      ====================================================== */}

      <section className="lead-services">
        <div className="lead-wrap">

          <h2>
            One partner, three ways to grow your practice
          </h2>

          <p className="lead-lede">
            Choose one plan or bundle all three — each is
            designed to plug into your existing client
            relationships, not replace them.
          </p>

          <div className="lead-plan-grid">

            <Plan
              className="plan-a"
              tag="Plan A"
              title="Employer Lead Generation"
              icon={<Users size={20} />}
              text="Employer introductions, coordination, and full documentation — LMIA/PNP-eligible leads delivered in ~30 days."
            />

            <Plan
              className="plan-b"
              tag="Plan B"
              title="HR Services"
              icon={<BriefcaseBusiness size={20} />}
              text="Interview coaching, Canadian-style resumes, IELTS training, and certification support for your clients."
            />

            <Plan
              className="plan-c"
              tag="Plan C"
              title="Full-Service Immigration"
              icon={<ShieldCheck size={20} />}
              text="Gateway Canada handles LMIA, PNP, and work permit filing end-to-end with a dedicated case manager."
            />

          </div>

        </div>
      </section>

      {/* =====================================================
          WHY PARTNER WITH US
      ====================================================== */}

      <section className="lead-why">
        <div className="lead-wrap lead-why-grid">

          <h2>
            Why consultants{" "}
            <span>partner with us</span>
          </h2>

          <ul>

            <Benefit
              number="01"
              title="Dedicated Account Manager"
              text="reachable six days a week, coordinating every appointment on your behalf."
            />

            <Benefit
              number="02"
              title="White-labelled software"
              text="hiring, case management, and portal tools run under your brand."
            />

            <Benefit
              number="03"
              title="No employer-side fees"
              text="total transparency, with no restrictions or staffing charges to the employer."
            />

            <Benefit
              number="04"
              title="Compliance built in"
              text="contracts, invoicing, and GST/PST/HST handled as part of the service."
            />

          </ul>

        </div>
      </section>

      {/* =====================================================
          LEAD CAPTURE
      ====================================================== */}

      <section
        className="lead-capture"
        id="capture"
      >
        <div className="lead-wrap">

          <div className="lead-capture-box">

            {/* LEFT SIDE */}

            <div className="lead-capture-copy">

              <div className="lead-eyebrow">
                GET STARTED
              </div>

              <h2>
                Talk to an Account Manager
              </h2>

              <p>
                Tell us a bit about your practice and
                we'll follow up with employer lead
                availability in your region.
              </p>

              <div className="lead-trust">

                <CheckCircle2 size={17} />

                <span>
                  Your request is securely routed to our
                  team.
                </span>

              </div>

            </div>

            {/* RIGHT SIDE */}

            <form
              className="lead-form"
              onSubmit={submit}
              noValidate
            >

              {/* NAME */}

              <input
                value={form.name}
                onChange={(event) =>
                  update("name", event.target.value)
                }
                type="text"
                placeholder="Full name"
                autoComplete="name"
                required
              />

              {/* EMAIL */}

              <input
                value={form.email}
                onChange={(event) =>
                  update("email", event.target.value)
                }
                type="email"
                placeholder="Email"
                autoComplete="email"
                required
              />

              {/* FIRM */}

              <input
                value={form.firm}
                onChange={(event) =>
                  update("firm", event.target.value)
                }
                type="text"
                placeholder="Firm / practice name"
                autoComplete="organization"
              />

              {/* REGION */}

              <select
                value={form.region}
                onChange={(event) =>
                  update("region", event.target.value)
                }
                aria-label="Region"
              >
                <option value="BC">
                  British Columbia
                </option>

                <option value="Alberta">
                  Alberta
                </option>

                <option value="Other">
                  Other
                </option>
              </select>

              {/* PLAN */}

              <select
                value={form.plan}
                onChange={(event) =>
                  update("plan", event.target.value)
                }
                aria-label="Interested plan"
              >
                <option value="A">
                  Interested in Plan A — Lead Generation
                </option>

                <option value="B">
                  Interested in Plan B — HR Services
                </option>

                <option value="C">
                  Interested in Plan C — Immigration Filing
                </option>

                <option value="Bundle">
                  Interested in all three (bundle)
                </option>
              </select>

              {/* STATUS MESSAGE */}

              {status.message && (
                <div
                  className={`lead-status lead-status--${status.type}`}
                  role={
                    status.type === "error"
                      ? "alert"
                      : "status"
                  }
                >
                  {status.message}
                </div>
              )}

              {/* SUBMIT */}

              <button
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Sending request..."
                  : "Request a call"}

                {!loading && (
                  <ArrowRight size={16} />
                )}
              </button>

              {/* NOTE */}

              <div className="lead-note">
                By submitting, you agree that West
                Ventures may contact you about the
                services selected.
              </div>

            </form>

          </div>

        </div>
      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="lead-footer">
        <div className="lead-wrap lead-footer-inner">

          <div className="lead-brands">

            <span className="lead-west">
              WestVentures
            </span>

            <span> × </span>

            <span className="lead-gateway">
              Gateway Canada
            </span>

          </div>

          <div className="lead-footer-meta">
            Employer Referral & HR Consulting ·
            Full-Service Immigration · BC & Alberta
          </div>

        </div>
      </footer>

    </div>
  );
}

/* ============================================================
   STAT COMPONENT
============================================================ */

function Stat({ number, label }) {
  return (
    <div className="lead-stat">

      <div className="lead-stat-number">
        {number}
      </div>

      <div className="lead-stat-label">
        {label}
      </div>

    </div>
  );
}

/* ============================================================
   PLAN COMPONENT
============================================================ */

function Plan({
  className,
  tag,
  title,
  text,
  icon,
}) {
  return (
    <article
      className={`lead-plan ${className}`}
    >

      <div className="lead-plan-top">

        <div className="lead-plan-icon">
          {icon}
        </div>

        <div className="lead-plan-tag">
          {tag}
        </div>

      </div>

      <h3>
        {title}
      </h3>

      <p>
        {text}
      </p>

    </article>
  );
}

/* ============================================================
   BENEFIT COMPONENT
============================================================ */

function Benefit({
  number,
  title,
  text,
}) {
  return (
    <li>

      <span className="lead-benefit-number">
        {number}
      </span>

      <span>
        <b>{title}</b>{" "}
        — {text}
      </span>

    </li>
  );
}