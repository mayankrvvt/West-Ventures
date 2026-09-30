import { useEffect, useMemo, useState } from "react";
import { LogOut, RefreshCw, Trash2 } from "lucide-react";
import { leadApi } from "../services/leadApi";
import "./AdminCareers.css";

const statuses = ["new", "contacted", "qualified", "converted", "closed"];

export default function AdminLeads() {
  const [token, setToken] = useState(() => localStorage.getItem("wv_admin_token"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    if (!token) return;
    setLoading(true); setError("");
    try { setLeads(await leadApi.getAdminLeads(token)); }
    catch (err) { setError(err.message); setToken(null); localStorage.removeItem("wv_admin_token"); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, [token]);

  const doLogin = async (event) => {
    event.preventDefault(); setLoading(true); setError("");
    try {
      const result = await leadApi.adminLogin(email, password);
      localStorage.setItem("wv_admin_token", result.token); setToken(result.token);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const visible = useMemo(() => filter === "all" ? leads : leads.filter((lead) => lead.status === filter), [leads, filter]);
  const changeStatus = async (lead, status) => { try { const updated = await leadApi.updateLead(token, lead._id, { status }); setLeads((items) => items.map((x) => x._id === updated._id ? updated : x)); } catch (err) { setError(err.message); } };
  const remove = async (lead) => { if (!window.confirm(`Delete the lead from ${lead.name}?`)) return; try { await leadApi.deleteLead(token, lead._id); setLeads((items) => items.filter((x) => x._id !== lead._id)); } catch (err) { setError(err.message); } };
  const logout = () => { localStorage.removeItem("wv_admin_token"); setToken(null); };

  if (!token) return <main className="admin-page"><div className="admin-login"><span className="eyebrow">WEST VENTURES</span><h1>Leads admin</h1><p>Sign in to manage portal enquiries.</p><form onSubmit={doLogin} className="admin-form"><label className="admin-field"><span>Email</span><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label><label className="admin-field"><span>Password</span><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>{error && <div className="admin-error">{error}</div>}<button className="btn btn-primary" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button></form></div></main>;

  return <main className="admin-page"><div className="container admin-container">
    <div className="admin-header"><div><span className="eyebrow">ADMIN</span><h1>Lead Portal</h1><p>{leads.length} total enquiries</p></div><div style={{ display: "flex", gap: 10 }}><button className="admin-secondary" onClick={load}><RefreshCw size={16} /> Refresh</button><button className="admin-secondary" onClick={logout}><LogOut size={16} /> Log out</button></div></div>
    {error && <div className="admin-error">{error}</div>}
    <section className="admin-panel">
      <div className="admin-panel-heading"><h2>Enquiries</h2><select value={filter} onChange={(e) => setFilter(e.target.value)}><option value="all">All statuses</option>{statuses.map((status) => <option key={status} value={status}>{status}</option>)}</select></div>
      <div className="lead-admin-table-wrap"><table className="lead-admin-table"><thead><tr><th>Lead</th><th>Firm</th><th>Region</th><th>Plan</th><th>Received</th><th>Status</th><th></th></tr></thead><tbody>{visible.map((lead) => <tr key={lead._id}><td><strong>{lead.name}</strong><small>{lead.email}</small></td><td>{lead.firm || "—"}</td><td>{lead.region}</td><td>Plan {lead.plan}</td><td>{new Date(lead.createdAt).toLocaleString()}</td><td><select className={`lead-status-select status--${lead.status}`} value={lead.status} onChange={(e) => changeStatus(lead, e.target.value)}>{statuses.map((status) => <option key={status} value={status}>{status}</option>)}</select></td><td><button className="admin-icon-button" onClick={() => remove(lead)} aria-label="Delete lead"><Trash2 size={16} /></button></td></tr>)}{visible.length === 0 && <tr><td colSpan="7" className="lead-empty">No leads found.</td></tr>}</tbody></table></div>
    </section>
  </div></main>;
}
