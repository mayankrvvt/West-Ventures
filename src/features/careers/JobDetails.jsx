import { useEffect, useState } from "react";
import { ArrowLeft, Check, MapPin } from "lucide-react";
import { jobsApi } from "../../services/jobsApi";
import "./CareersPage.css";

export default function JobDetails({ jobId }) {
  const [job, setJob] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    jobsApi.getJob(jobId).then(setJob).catch((err) => setError(err.message));
  }, [jobId]);

  if (error) return <section className="careers-page"><div className="container careers-state careers-error">{error}</div></section>;
  if (!job) return <section className="careers-page"><div className="container careers-state">Loading position...</div></section>;

  return (
    <section className="careers-page">
      <div className="container job-details">
        <a href="/careers" className="back-link"><ArrowLeft size={17} /> All positions</a>
        <span className="eyebrow">{job.department}</span>
        <h1>{job.title}</h1>
        <div className="job-details-meta">
          <span><MapPin size={16} /> {job.location}</span>
          <span>{job.employmentType}</span>
          <span>{job.workplace}</span>
          {job.salary && <span>{job.salary}</span>}
        </div>

        <div className="job-details-grid">
          <div>
            <h2>About the role</h2>
            <p className="job-long-text">{job.description}</p>

            {job.responsibilities?.length > 0 && <ListSection title="Responsibilities" items={job.responsibilities} />}
            {job.requirements?.length > 0 && <ListSection title="Requirements" items={job.requirements} />}
            {job.benefits?.length > 0 && <ListSection title="What we offer" items={job.benefits} />}
          </div>

          <aside className="apply-card">
            <h3>Interested in this role?</h3>
            <p>Send your resume and a short introduction to our team.</p>
            <a className="btn btn-primary" href={`mailto:${job.applicationEmail}?subject=Application - ${encodeURIComponent(job.title)}`}>
              Apply by email
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}

function ListSection({ title, items }) {
  return (
    <div className="job-list-section">
      <h2>{title}</h2>
      <ul>
        {items.map((item, index) => <li key={`${item}-${index}`}><Check size={17} /> <span>{item}</span></li>)}
      </ul>
    </div>
  );
}
