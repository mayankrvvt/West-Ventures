import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { leadApi } from "../../services/leadApi";
import { siteConfig } from "../../constants/siteConfig";
import Reveal from "../../components/Reveal";
import "./CtaBanner.css";

const initialForm = {
  name: "",
  email: "",
  firm: "",
  region: "BC",
  plan: "A",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function CtaBanner() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const update = (field) => (event) => {
    setForm((current) => ({
      ...current,
      [field]: event.target.value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));

    if (status !== "idle") {
      setStatus("idle");
      setMessage("");
    }
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Enter your full name.";
    }

    if (!emailPattern.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email.";
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validate();

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setStatus("sending");
    setMessage("");

    try {
      await leadApi.createLead(form);

      setStatus("success");
      setMessage(
        "Thanks — an Account Manager will be in touch shortly."
      );

      setForm(initialForm);
    } catch (error) {
      setStatus("error");

      setMessage(
        error.message ||
          `Something didn't go through. Email us directly at ${siteConfig.email}.`
      );
    }
  };

  return (
    <section id="get-started" className="lead-capture-home">
      <div className="container">
        <div className="lead-capture-home-box">
          <Reveal className="lead-capture-home-copy">
            <div className="lead-capture-home-eyebrow">
              GET STARTED
            </div>

            <h2>Talk to an Account Manager</h2>

            <p>
              Tell us a bit about your practice and we'll follow up with
              employer lead availability in your region.
            </p>

            <div className="lead-capture-home-trust">
              <CheckCircle2 size={17} />
              <span>
                Your request is securely routed to our team.
              </span>
            </div>
          </Reveal>

          <Reveal
            className="lead-capture-home-form-wrap"
            delay={120}
            as="div"
          >
            {status === "success" ? (
              <div className="lead-capture-home-success">
                <CheckCircle2 size={30} />

                <p>{message}</p>

                <button
                  type="button"
                  className="lead-capture-home-secondary"
                  onClick={() => {
                    setStatus("idle");
                    setMessage("");
                  }}
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form
                className="lead-capture-home-form"
                onSubmit={handleSubmit}
                noValidate
              >
                {/* NAME */}

                <div className="lead-capture-home-field">
                  <input
                    id="home-lead-name"
                    type="text"
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Full name"
                    autoComplete="name"
                    aria-label="Full name"
                    aria-invalid={Boolean(errors.name)}
                  />

                  {errors.name && (
                    <span>{errors.name}</span>
                  )}
                </div>

                {/* EMAIL */}

                <div className="lead-capture-home-field">
                  <input
                    id="home-lead-email"
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="Email"
                    autoComplete="email"
                    aria-label="Email"
                    aria-invalid={Boolean(errors.email)}
                  />

                  {errors.email && (
                    <span>{errors.email}</span>
                  )}
                </div>

                {/* FIRM */}

                <div className="lead-capture-home-field">
                  <input
                    id="home-lead-firm"
                    type="text"
                    value={form.firm}
                    onChange={update("firm")}
                    placeholder="Firm / practice name"
                    autoComplete="organization"
                    aria-label="Firm or practice name"
                  />
                </div>

                {/* REGION */}

                <select
                  value={form.region}
                  onChange={update("region")}
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
                  onChange={update("plan")}
                  aria-label="Interested service plan"
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

                {/* ERROR */}

                {status === "error" && (
                  <div className="lead-capture-home-error">
                    {message}
                  </div>
                )}

                {/* SUBMIT */}

                <button
                  type="submit"
                  className="lead-capture-home-submit"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? (
                    <>
                      <Loader2
                        size={16}
                        className="lead-capture-home-spinner"
                      />

                      Sending request...
                    </>
                  ) : (
                    <>
                      Request a call

                      <ArrowRight size={16} />
                    </>
                  )}
                </button>

                <div className="lead-capture-home-note">
                  By submitting, you agree that West Ventures may
                  contact you about the services selected.
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}