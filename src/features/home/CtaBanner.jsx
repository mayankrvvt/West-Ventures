import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { siteConfig } from "../../constants/siteConfig";
import { submitContactRequest } from "../../services/contactService";
import Reveal from "../../components/Reveal";
import "./CtaBanner.css";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialForm = { name: "", email: "", message: "" };

export default function CtaBanner() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const updateField = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Tell us your name.";
    if (!emailPattern.test(form.email)) nextErrors.email = "Enter a valid email.";
    if (!form.message.trim()) nextErrors.message = "Add a line about the project.";
    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");
    try {
      await submitContactRequest(form);
      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="cta-banner">
      <div className="container cta-banner-inner">
        <Reveal className="cta-banner-intro">
          <h2 className="cta-banner-heading">Have a project in mind?</h2>
          <p className="cta-banner-copy">
            Tell us where you want to grow. We'll tell you what it takes to get there.
          </p>
          <p className="cta-banner-phone">{siteConfig.phone} &middot; {siteConfig.email}</p>
        </Reveal>

        <Reveal className="cta-banner-form-wrap" delay={120} as="div">
          {status === "success" ? (
            <div className="cta-form-success">
              <CheckCircle2 size={28} />
              <p>Thanks — that's landed with our team. We'll reply within one business day.</p>
              <button type="button" className="btn btn-ghost-light" onClick={() => setStatus("idle")}>
                Send another
              </button>
            </div>
          ) : (
            <form className="cta-form" onSubmit={handleSubmit} noValidate>
              <div className="cta-form-row">
                <label htmlFor="cta-name">Name</label>
                <input
                  id="cta-name"
                  type="text"
                  value={form.name}
                  onChange={updateField("name")}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "cta-name-error" : undefined}
                />
                {errors.name && <span id="cta-name-error" className="cta-form-error">{errors.name}</span>}
              </div>

              <div className="cta-form-row">
                <label htmlFor="cta-email">Email</label>
                <input
                  id="cta-email"
                  type="email"
                  value={form.email}
                  onChange={updateField("email")}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "cta-email-error" : undefined}
                />
                {errors.email && <span id="cta-email-error" className="cta-form-error">{errors.email}</span>}
              </div>

              <div className="cta-form-row">
                <label htmlFor="cta-message">What are you looking to do?</label>
                <textarea
                  id="cta-message"
                  rows={3}
                  value={form.message}
                  onChange={updateField("message")}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "cta-message-error" : undefined}
                />
                {errors.message && <span id="cta-message-error" className="cta-form-error">{errors.message}</span>}
              </div>

              {status === "error" && (
                <p className="cta-form-error cta-form-error--banner">
                  Something didn't go through. Email us directly at{" "}
                  <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> instead.
                </p>
              )}

              <button type="submit" className="btn btn-primary cta-form-submit" disabled={status === "sending"}>
                {status === "sending" ? (
                  <>
                    <Loader2 size={16} className="cta-form-spinner" /> Sending...
                  </>
                ) : (
                  <>
                    Send message <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
