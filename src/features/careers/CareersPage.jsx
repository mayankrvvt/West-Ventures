import { useEffect, useMemo, useState } from "react";
import { ArrowRight, BriefcaseBusiness, MapPin } from "lucide-react";
import { jobsApi } from "../../services/jobsApi";
import "./CareersPage.css";

export default function CareersPage() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All departments");
  const [location, setLocation] = useState("All locations");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    jobsApi
      .getOpenJobs()
      .then(setJobs)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const departments = useMemo(
    () => ["All departments", ...new Set(jobs.map((job) => job.department).filter(Boolean))],
    [jobs]
  );
  const locations = useMemo(
    () => ["All locations", ...new Set(jobs.map((job) => job.location).filter(Boolean))],
    [jobs]
  );

  const filteredJobs = jobs.filter((job) => {
    const haystack = `${job.title} ${job.department} ${job.location} ${job.description}`.toLowerCase();
    return (
      haystack.includes(search.toLowerCase()) &&
      (department === "All departments" || job.department === department) &&
      (location === "All locations" || job.location === location)
    );
  });

  return (
    <section className="careers-page">
      <div className="container careers-hero">
        <span className="eyebrow">CAREERS</span>
        <h1>Build what comes next.</h1>
        <p>Join West Ventures and help build practical solutions for businesses and communities across Canada.</p>
      </div>

      <div className="container careers-content">
        <div className="careers-filters">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search positions..."
            aria-label="Search positions"
          />
          <select value={department} onChange={(event) => setDepartment(event.target.value)}>
            {departments.map((item) => <option key={item}>{item}</option>)}
          </select>
          <select value={location} onChange={(event) => setLocation(event.target.value)}>
            {locations.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>

        {loading && <p className="careers-state">Loading open positions...</p>}
        {!loading && error && <p className="careers-state careers-error">{error}</p>}
        {!loading && !error && filteredJobs.length === 0 && (
          <div className="careers-empty">
            <BriefcaseBusiness size={30} />
            <h2>No open positions right now.</h2>
            <p>We may still be interested in meeting great people. Check back soon.</p>
          </div>
        )}

        <div className="job-grid">
          {filteredJobs.map((job) => (
            <article className="job-card" key={job._id}>
              <div className="job-card-top">
                <span>{job.department}</span>
                <span>{job.employmentType}</span>
              </div>
              <h2>{job.title}</h2>
              <div className="job-meta">
                <span><MapPin size={15} /> {job.location}</span>
                <span>{job.workplace}</span>
              </div>
              <p>{job.description}</p>
              <a className="job-link" href={`/careers/${job._id}`}>
                View position <ArrowRight size={17} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
