import React from "react";
import "./FAQ.css";

const faqs = [
  {
    question: "What is the Company’s objective?",
    answer:
      "Our objective is to assist immigration consultants to connect with employers who are willing to hire their candidates and to promote RCIC/Immigration companies’ business through our Marketing Campaign. This will be a Win-Win situation for all and ultimately you earn the profit out of this campaign.",
  },
  {
    question: "How many Employers can I get?",
    answer:
      "We can provide you with up to 10 employers in a month based on your requirement and the plan you take.",
  },
  {
    question: "How long does it take to complete the process?",
    answer: (
      <>
        <div>
          • 30 Days will take to complete the Introduction & Employer
          coordination and provide the Employer Lead.
        </div>
        <div>
          • It will take another 30 to 60 Days to provide the documentation
          from the employer.
        </div>
      </>
    ),
  },
  {
    question:
      "If we can’t place any of our candidates what are the options available?",
    answer:
      "Employer lead is final and exclusive to you. You can introduce as many candidates as you want until someone is hired.",
  },
  {
    question: "Can we replace the employer?",
    answer:
      "If the Employer is not able to provide complete supporting documents to the RCIC or LMIA/AAIP/AIPP/BCPNP is refused due to employer compliance then we will replace the employer without any charges.",
  },
  {
    question: "Will you arrange interviews and a Job offer letter?",
    answer:
      "No, our job will be only to introduce you to the employer, do coordination, if required and arrange documentation once the applicant is selected. For arranging interviews and Job offer letters, you have to talk to the employer or you have to take our Plan B HR Service contract.",
  },
  {
    question: "Can you assist in getting a favourable Wage Rate and Working Hours?",
    answer:
      "Wage rate and working hours are usually decided by the Employer. Wage rates are usually set by HRSDC for that particular region.",
  },
  {
    question: "How long worker needs to stay with the employer?",
    answer:
      "It’s usually 1 to 2 Years as per the work permit. After that, it’s between employer and worker understanding.",
  },
  {
    question:
      "Will I charge for the services or you take it from the employer?",
    answer: (
      <>
        <p>
          Yes, we will charge you an affordable service cost. Our cost includes
          three things Leads, Documentation and Per Diem. We have different
          plans based on your requirement.
        </p>
        <p>
          We don’t sign a staffing contract from the employer which you can do
          if you want.
        </p>
        <p>We have no objection to this.</p>
      </>
    ),
  },
  {
    question: "By Per Diem, what do you mean?",
    answer: (
      <>
        <p>
          This includes expenses incurred in the context of meeting with the
          employer, i.e. Gas, Lodging, Lunch/Dinner with the employer and so
          on.
        </p>
        <p>We charge a fixed amount on per client basis.</p>
      </>
    ),
  },
  {
    question: "Can we negotiate on the cost?",
    answer: (
      <>
        <p>
          Our Service cost is the best and cheapest in the entire BC maybe in
          Canada.
        </p>
        <p>That is why we don’t believe in negotiation.</p>
      </>
    ),
  },
  {
    question: "How have you built your network of Employers?",
    answer: (
      <>
        <p>
          As we are in the staffing business since 2010, we have established
          this through our Network and by physically meeting with the employer.
        </p>
        <p>
          Currently, we have a list of 700 employers which is increasing every
          day.
        </p>
      </>
    ),
  },
  {
    question: "Do you have a network established in Nova Scotia?",
    answer: (
      <>
        <p>
          Yes. In the year 2018, we moved to Nova Scotia to establish a network
          of employers.
        </p>
        <p>
          We have a good variety of employers in this region and we have met
          them physically.
        </p>
      </>
    ),
  },
  {
    question:
      "After the contract is signed, then it is valid for all provinces of Canada or just one in particular?",
    answer:
      "The contract will be for British Columbia, Alberta, Nova Scotia and Yukon. We are working on other provinces as well.",
  },
  {
    question: "What industry/business sector employers you can provide?",
    answer:
      "We have employers in Farming, Hospitality, PSW, Hospitals, IT Sector, Accounting firms, Legal, FMCG, Fishing, Oil & Natural Gas, Lumber, Trucking, and so on.",
  },
  {
    question: "How do we devise the marketing and Public Relation Plan?",
    answer: (
      <>
        <p>
          Once you signed up, we will establish detailed Marketing and Public
          relations plan after discussing your company background and
          services. We will have the Marketing & Public relations plan and Kit
          in place for you. This is part of the program.
        </p>
        <p>
          In addition, we will provide you Grant Establishment Program and this
          will establish a revenue factor for your business.
        </p>
      </>
    ),
  },
  {
    question: "What do we expect from Clients?",
    answer: (
      <div className="faq-client-list">
        <div>
          <span>✓</span>
          <p>
            Clients should take care that candidates are not falsifying their
            resumes and all relevant documents should be with them.
          </p>
        </div>

        <div>
          <span>✓</span>
          <p>
            Once the final lead is provided and all introductions were done
            then Clients should directly talk with the employer.
            <br />
            We will only interfere if any of the parties doesn’t reply or
            delay things.
          </p>
        </div>

        <div>
          <span>✓</span>
          <p>
            The client should make sure of timely payment so that the
            candidate’s work doesn’t affect.
          </p>
        </div>

        <div>
          <span>✓</span>
          <p>
            The client should not involve us in negotiation with the employer.
          </p>
        </div>
      </div>
    ),
  },
];

export default function FAQ() {
  return (
    <main className="faq-page">
      {/* HERO */}
      <section className="faq-hero">
        <div className="faq-hero-overlay" />

        <div className="faq-hero-content">
          <h1>FAQ</h1>

          <div className="faq-breadcrumb">
            <span>HOME</span>
            <span className="faq-breadcrumb-arrow">›</span>
            <span className="active">FAQ</span>
          </div>
        </div>
      </section>

      {/* FAQ CONTENT */}
      <section className="faq-content">
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <article className="faq-item" key={index}>
              <h3>
                <strong>Q:</strong> {faq.question}
              </h3>

              <div className="faq-answer">
                <strong>A.</strong>
                <div className="faq-answer-content">{faq.answer}</div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}