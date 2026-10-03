import React, { useEffect, useState } from "react";
import "./FAQ.css";

// Hero images
import heroImg from "../../assets/images/hero/img.jpg";
import heroImg1 from "../../assets/images/hero/img1.jpg";
import heroImg2 from "../../assets/images/hero/img2.jpg";
import heroImg3 from "../../assets/images/hero/img3.jpg";
import heroImg4 from "../../assets/images/hero/img4.jpg";

const heroImages = [
  heroImg,
  heroImg1,
  heroImg2,
  heroImg3,
  heroImg4,
];

const faqs = [
  {
    question: "What is the company's objective?",
    answer:
      "Our objective is to assist immigration consultants in connecting with employers who are willing to hire their candidates and to promote RCIC/immigration companies' businesses through our marketing campaigns. This will be a win-win situation for everyone, and ultimately, you can earn a profit from this campaign.",
  },

  {
    question: "How many employers can I get?",
    answer:
      "We can provide you with up to 10 employers per month, based on your requirements and the plan you choose.",
  },

  {
    question: "How long does it take to complete the process?",
    answer: (
      <>
        <div>
          • It will take 30 days to complete the introduction and employer
          coordination and provide the employer lead.
        </div>

        <div>
          • It will take another 30 to 60 days to obtain the required
          documentation from the employer.
        </div>
      </>
    ),
  },

  {
    question:
      "If we can't place any of our candidates, what options are available?",
    answer:
      "The employer lead is final and exclusive to you. You can introduce as many candidates as you want until one of them is hired.",
  },

  {
    question: "Can we replace the employer?",
    answer:
      "If the employer is unable to provide complete supporting documents to the RCIC, or if an LMIA/AAIP/AIPP/BCPNP application is refused due to employer compliance issues, we will replace the employer at no additional charge.",
  },

  {
    question: "Will you arrange interviews and job offer letters?",
    answer:
      "No. Our role is only to introduce you to the employer, coordinate with them if required, and arrange documentation once the applicant is selected. For arranging interviews and job offer letters, you will need to speak directly with the employer, or you can choose our Plan B HR Service Contract.",
  },

  {
    question:
      "Can you assist in obtaining a favourable wage rate and working hours?",
    answer:
      "Wage rates and working hours are usually decided by the employer. Wage rates are usually set according to the applicable requirements for that particular region.",
  },

  {
    question: "How long does a worker need to stay with the employer?",
    answer:
      "It is usually 1 to 2 years, depending on the work permit. After that, it depends on the understanding between the employer and the worker.",
  },

  {
    question:
      "Will you charge me for the services, or do you charge the employer?",
    answer: (
      <>
        <p>
          Yes, we will charge you an affordable service fee. Our costs include
          three things: leads, documentation, and per diem. We have different
          plans based on your requirements.
        </p>

        <p>
          We do not sign a staffing contract with the employer, although you
          can do so if you wish.
        </p>

        <p>We have no objection to this.</p>
      </>
    ),
  },

  {
    question: "What do you mean by per diem?",
    answer: (
      <>
        <p>
          This includes expenses incurred in connection with meetings with the
          employer, such as gas, lodging, lunch/dinner with the employer, and
          so on.
        </p>

        <p>We charge a fixed amount per client.</p>
      </>
    ),
  },

  {
    question: "Can we negotiate the cost?",
    answer: (
      <>
        <p>
          Our service cost is among the most competitive in BC and possibly
          across Canada.
        </p>

        <p>That is why we do not negotiate on pricing.</p>
      </>
    ),
  },

  {
    question: "How have you built your network of employers?",
    answer: (
      <>
        <p>
          As we have been in the staffing business since 2010, we have
          established our network through our connections and by meeting with
          employers in person.
        </p>

        <p>
          Currently, we have a list of 700 employers, which is growing every
          day.
        </p>
      </>
    ),
  },

  {
    question: "Do you have an established network in Nova Scotia?",
    answer: (
      <>
        <p>
          Yes. In 2018, we moved to Nova Scotia to establish a network of
          employers.
        </p>

        <p>
          We have a good variety of employers in this region, and we have met
          with them in person.
        </p>
      </>
    ),
  },

  {
    question:
      "After the contract is signed, is it valid for all provinces of Canada or just one in particular?",
    answer:
      "The contract will cover British Columbia, Alberta, Nova Scotia, and Yukon. We are working on expanding into other provinces as well.",
  },

  {
    question:
      "What industries/business sectors can you provide employers in?",
    answer:
      "We have employers in farming, hospitality, PSW, healthcare, IT, accounting, legal services, FMCG, fishing, oil and natural gas, lumber, trucking, and other sectors.",
  },

  {
    question:
      "How do we devise the Marketing and Public Relations Plan?",
    answer: (
      <>
        <p>
          Once you sign up, we will establish a detailed Marketing and Public
          Relations Plan after discussing your company's background and
          services. We will have the Marketing and Public Relations Plan and
          Kit in place for you. This is part of the program.
        </p>

        <p>
          In addition, we will provide you with our Grant Establishment
          Program, which will help establish an additional revenue stream for
          your business.
        </p>
      </>
    ),
  },

  {
    question: "What do we expect from clients?",
    answer: (
      <div className="faq-client-list">
        <div>
          <span>✓</span>

          <p>
            Clients should ensure that candidates are not falsifying their
            resumes and that all relevant documents are available and accurate.
          </p>
        </div>

        <div>
          <span>✓</span>

          <p>
            Once the final lead has been provided and all introductions have
            been made, clients should communicate directly with the employer.
            <br />
            We will only intervene if either party does not respond or if there
            are significant delays.
          </p>
        </div>

        <div>
          <span>✓</span>

          <p>
            The client should ensure timely payment so that the candidate's
            process is not affected.
          </p>
        </div>

        <div>
          <span>✓</span>

          <p>
            The client should not involve us in negotiations with the employer.
          </p>
        </div>
      </div>
    ),
  },
];

export default function FAQ() {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((current) => (current + 1) % heroImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="faq-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="faq-hero">

        {/* Rotating hero images */}
        <div className="faq-hero-images">
          {heroImages.map((image, index) => (
            <img
              key={image}
              src={image}
              alt=""
              className={`faq-hero-image ${
                index === activeImage ? "is-active" : ""
              }`}
              aria-hidden="true"
            />
          ))}
        </div>

        {/* Dark overlay */}
        <div className="faq-hero-overlay" />

        {/* Hero content */}
        <div className="faq-hero-content">
          <h1>FAQ</h1>

          <div
            className="faq-breadcrumb"
            aria-label="Breadcrumb"
          >
            <span>HOME</span>

            <span
              className="faq-breadcrumb-arrow"
              aria-hidden="true"
            >
              ›
            </span>

            <span className="active">FAQ</span>
          </div>
        </div>
      </section>

      {/* =====================================================
          FAQ CONTENT
      ===================================================== */}

      <section className="faq-content">
        <div className="faq-container">

          {faqs.map((faq, index) => (
            <article
              className="faq-item"
              key={index}
            >
              <h3>
                <strong>Q:</strong> {faq.question}
              </h3>

              <div className="faq-answer">
                <strong>A.</strong>

                <div className="faq-answer-content">
                  {faq.answer}
                </div>
              </div>
            </article>
          ))}

        </div>
      </section>

    </main>
  );
}