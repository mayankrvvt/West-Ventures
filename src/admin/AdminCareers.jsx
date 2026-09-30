import { useEffect, useState } from "react";
import { LogOut, Pencil, Plus, Trash2, X } from "lucide-react";
import { jobsApi } from "../services/jobsApi";
import "./AdminCareers.css";

const emptyJob = {
  title: "", department: "", location: "", employmentType: "Full-time", workplace: "Hybrid",
  salary: "", description: "", responsibilities: "", requirements: "", benefits: "",
  applicationEmail: "careers@westventures.ca", status: "draft", closingDate: "",
};

function toPayload(form) {
  return {
    ...form,
    responsibilities: form.responsibilities.split("\n").map((x) => x.trim()).filter(Boolean),
    requirements: form.requirements.split("\n").map((x) => x.trim()).filter(Boolean),
    benefits: form.benefits.split("\n").map((x) => x.trim()).filter(Boolean),
    closingDate: form.closingDate || null,
  };
}

function fromJob(job) {
  return {
    ...job,
    responsibilities: (job.responsibilities || []).join("\n"),
    requirements: (job.requirements || []).join("\n"),
    benefits: (job.benefits || []).join("\n"),
    closingDate: job.closingDate ? job.closingDate.slice(0, 10) : "",
  };
}

export default function AdminCareers() {
  const [token, setToken] = useState(() => localStorage.getItem("wv_admin_token"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState(emptyJob);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loadJobs = async () => {
    if (!token) return;
    try { setJobs(await jobsApi.getAdminJobs(token)); }
    catch (err) { setError(err.message); setToken(null); localStorage.removeItem("wv_admin_token"); }
  };

  useEffect(() => { loadJobs(); }, [token]);

  const login = async (event) => {
    event.preventDefault(); setError(""); setLoading(true);
    try {
      const result = await jobsApi.adminLogin(email, password);
      localStorage.setItem("wv_admin_token", result.token); setToken(result.token);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const save = async (event) => {
    event.preventDefault(); setError(""); setLoading(true);
    try {
      if (editingId) await jobsApi.updateJob(token, editingId, toPayload(form));
      else await jobsApi.createJob(token, toPayload(form));
      setForm(emptyJob); setEditingId(null); await loadJobs();
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const edit = (job) => { setEditingId(job._id); setForm(fromJob(job)); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const remove = async (id) => {
    if (!window.confirm("Delete this job permanently?")) return;
    try { await jobsApi.deleteJob(token, id); await loadJobs(); } catch (err) { setError(err.message); }
  };
  const closeJob = async (job) => {
    try { await jobsApi.updateJob(token, job._id, { status: job.status === "closed" ? "open" : "closed" }); await loadJobs(); }
    catch (err) { setError(err.message); }
  };
  const logout = () => { localStorage.removeItem("wv_admin_token"); setToken(null); };

  if (!token) return (
    <main className="admin-page"><div className="admin-login">
      <span className="eyebrow">WEST VENTURES</span><h1>Careers admin</h1><p>Sign in to manage job openings.</p>
      <form onSubmit={login} className="admin-form">
        <label className="admin-field"><span>Email</span><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
        <label className="admin-field"><span>Password</span><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>
        {error && <div className="admin-error">{error}</div>}
        <button className="btn btn-primary" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button>
      </form>
    </div></main>
  );

  return (
    <main className="admin-page"><div className="container admin-container">
      <div className="admin-header"><div><span className="eyebrow">ADMIN</span><h1>Careers</h1></div><button className="admin-secondary" onClick={logout}><LogOut size={16} /> Log out</button></div>
      <div className="admin-layout">
        <section className="admin-panel">
          <div className="admin-panel-heading"><h2>{editingId ? "Edit position" : "Add position"}</h2>{editingId && <button onClick={() => { setEditingId(null); setForm(emptyJob); }}><X size={18} /></button>}</div>
          <form onSubmit={save} className="admin-form">
            <div className="admin-two"><Field label="Job title" value={form.title} set={"title"} form={form} setForm={setForm} required /><Field label="Department" value={form.department} set={"department"} form={form} setForm={setForm} required /></div>
            <div className="admin-two"><Field label="Location" value={form.location} set={"location"} form={form} setForm={setForm} required /><Field label="Salary" value={form.salary} set={"salary"} form={form} setForm={setForm} /></div>
            <div className="admin-two"><SelectField label="Employment type" name="employmentType" value={form.employmentType} form={form} setForm={setForm} options={["Full-time","Part-time","Contract","Internship","Temporary"]} /><SelectField label="Workplace" name="workplace" value={form.workplace} form={form} setForm={setForm} options={["On-site","Hybrid","Remote"]} /></div>
            <div className="admin-two"><SelectField label="Status" name="status" value={form.status} form={form} setForm={setForm} options={["draft","open","closed"]} /><Field label="Closing date" type="date" value={form.closingDate} set={"closingDate"} form={form} setForm={setForm} /></div>
            <Field label="Application email" type="email" value={form.applicationEmail} set={"applicationEmail"} form={form} setForm={setForm} />
            <TextField label="Description" name="description" value={form.description} form={form} setForm={setForm} required />
            <TextField label="Responsibilities (one per line)" name="responsibilities" value={form.responsibilities} form={form} setForm={setForm} />
            <TextField label="Requirements (one per line)" name="requirements" value={form.requirements} form={form} setForm={setForm} />
            <TextField label="Benefits (one per line)" name="benefits" value={form.benefits} form={form} setForm={setForm} />
            {error && <div className="admin-error">{error}</div>}
            <button className="btn btn-primary" disabled={loading}>{editingId ? "Save changes" : "Publish position"}</button>
          </form>
        </section>

        <section className="admin-panel"><div className="admin-panel-heading"><h2>Positions</h2><button className="admin-secondary" onClick={() => { setEditingId(null); setForm(emptyJob); }}><Plus size={16} /> New</button></div>
          <div className="admin-jobs">{jobs.map((job) => <div className="admin-job" key={job._id}><div><h3>{job.title}</h3><p>{job.department} · {job.location}</p></div><span className={`status status--${job.status}`}>{job.status}</span><div className="admin-job-actions"><button onClick={() => edit(job)} aria-label="Edit"><Pencil size={16} /></button><button onClick={() => closeJob(job)} aria-label="Open or close">{job.status === "closed" ? "Open" : "Close"}</button><button onClick={() => remove(job._id)} aria-label="Delete"><Trash2 size={16} /></button></div></div>)}</div>
        </section>
      </div>
    </div></main>
  );
}

function Field({ label, value, set, form, setForm, type = "text", required = false }) {
  return <label className="admin-field"><span>{label}</span><input type={type} value={value} onChange={(e) => setForm({ ...form, [set]: e.target.value })} required={required} /></label>;
}
function TextField({ label, name, value, form, setForm, required = false }) {
  return <label className="admin-field"><span>{label}</span><textarea rows={5} value={value} onChange={(e) => setForm({ ...form, [name]: e.target.value })} required={required} /></label>;
}
function SelectField({ label, name, value, form, setForm, options }) {
  return <label className="admin-field"><span>{label}</span><select value={value} onChange={(e) => setForm({ ...form, [name]: e.target.value })}>{options.map((option) => <option key={option}>{option}</option>)}</select></label>;
}
