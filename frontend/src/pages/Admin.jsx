import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ArrowUpRight, LogOut, Save, Trash2, Plus } from "lucide-react";
import { api, adminApi } from "@/lib/api";

const LOGO = "https://borninflight.com/wp-content/uploads/2021/02/Born-in-Flight-logo.png";

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem("bif_admin_token") || "");
  const [authed, setAuthed] = useState(false);
  const [input, setInput] = useState("");
  const [tab, setTab] = useState("leads");

  useEffect(() => {
    if (token) {
      adminApi(token).get("/leads").then(() => setAuthed(true)).catch(() => {
        setAuthed(false);
        localStorage.removeItem("bif_admin_token");
        setToken("");
      });
    }
  }, [token]);

  const login = async (e) => {
    e.preventDefault();
    try {
      await api.post("/admin/login", { token: input });
      localStorage.setItem("bif_admin_token", input);
      setToken(input);
      setAuthed(true);
      toast.success("Welcome back.");
    } catch {
      toast.error("Invalid token.");
    }
  };

  const logout = () => {
    localStorage.removeItem("bif_admin_token");
    setToken("");
    setAuthed(false);
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bif-paper)] p-6" data-testid="admin-login">
        <form onSubmit={login} className="w-full max-w-sm border hairline bg-[var(--bif-paper)] p-10">
          <img src={LOGO} alt="" className="h-8 mb-8" />
          <div className="overline text-[var(--bif-bronze)]">[ Admin ]</div>
          <h1 className="font-display text-3xl font-bold mt-3">CMS Access</h1>
          <p className="mt-3 text-sm text-[var(--bif-muted)]">Enter your admin token to manage content and leads.</p>
          <input
            data-testid="admin-token-input"
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Admin token"
            className="input mt-8"
          />
          <button type="submit" data-testid="admin-login-submit" className="btn-primary w-full justify-center mt-6">
            Sign In <ArrowUpRight size={14} />
          </button>
          <Link to="/" className="btn-ghost mt-6 inline-flex">← Back to site</Link>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bif-paper)]" data-testid="admin-dashboard">
      <header className="border-b hairline bg-[var(--bif-paper)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <img src={LOGO} alt="" className="h-7" />
            <span className="overline text-[var(--bif-muted)]">[ CMS Admin ]</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="btn-ghost">View site</Link>
            <button onClick={logout} data-testid="admin-logout" className="btn-ghost flex items-center gap-2">
              <LogOut size={12} /> Logout
            </button>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex gap-6">
          {[
            { k: "leads", l: "Leads" },
            { k: "programs", l: "Programs" },
            { k: "testimonials", l: "Testimonials" },
          ].map((t) => (
            <button
              key={t.k}
              data-testid={`admin-tab-${t.k}`}
              onClick={() => setTab(t.k)}
              className={`py-4 font-mono text-xs uppercase tracking-[0.2em] border-b-2 transition-colors ${tab === t.k ? "border-[var(--bif-bronze)] text-[var(--bif-bronze)]" : "border-transparent text-[var(--bif-muted)] hover:text-[var(--bif-ink)]"}`}
            >
              {t.l}
            </button>
          ))}
        </div>
      </header>
      <main className="max-w-[1400px] mx-auto px-6 md:px-10 py-10">
        {tab === "leads" && <LeadsPanel token={token} />}
        {tab === "programs" && <ProgramsPanel token={token} />}
        {tab === "testimonials" && <TestimonialsPanel token={token} />}
      </main>
    </div>
  );
}

function LeadsPanel({ token }) {
  const [leads, setLeads] = useState([]);
  useEffect(() => { adminApi(token).get("/leads").then((r) => setLeads(r.data)); }, [token]);
  return (
    <div data-testid="admin-leads">
      <h2 className="font-display text-3xl font-bold">Leads <span className="text-[var(--bif-muted)] font-mono text-base ml-2">/ {leads.length}</span></h2>
      <div className="mt-8 border hairline overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[var(--bif-cream)] text-left">
            <tr>
              {["Date", "Name", "Email", "Company", "Interest", "Message"].map((h) => (
                <th key={h} className="px-4 py-3 font-mono text-xs uppercase tracking-[0.18em] text-[var(--bif-muted)]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <tr key={l.id} className="border-t hairline">
                <td className="px-4 py-4 font-mono text-xs">{new Date(l.created_at).toLocaleString()}</td>
                <td className="px-4 py-4 font-medium">{l.name}</td>
                <td className="px-4 py-4">{l.email}</td>
                <td className="px-4 py-4">{l.company || "—"}</td>
                <td className="px-4 py-4">{l.interest || "—"}</td>
                <td className="px-4 py-4 max-w-md text-[var(--bif-muted)]">{l.message}</td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-10 text-center text-[var(--bif-muted)] font-mono text-xs uppercase tracking-[0.2em]">No leads yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProgramsPanel({ token }) {
  const [items, setItems] = useState([]);
  const reload = () => api.get("/programs").then((r) => setItems(r.data));
  useEffect(() => { reload(); }, []);

  const save = async (p) => {
    try {
      await adminApi(token).put(`/programs/${p.id}`, p);
      toast.success("Saved");
      reload();
    } catch { toast.error("Save failed"); }
  };
  const del = async (id) => {
    if (!confirm("Delete this program?")) return;
    await adminApi(token).delete(`/programs/${id}`);
    toast.success("Deleted");
    reload();
  };
  const add = () => {
    const id = `new-${Date.now()}`;
    setItems([{ id, pillar: "self", name: "New Program", description: "" }, ...items]);
  };

  return (
    <div data-testid="admin-programs">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-3xl font-bold">Programs <span className="text-[var(--bif-muted)] font-mono text-base ml-2">/ {items.length}</span></h2>
        <button onClick={add} className="btn-outline" data-testid="admin-add-program"><Plus size={14}/> Add Program</button>
      </div>
      <div className="mt-8 space-y-4">
        {items.map((p, idx) => (
          <div key={p.id} className="border hairline p-6 bg-[var(--bif-paper)]">
            <div className="grid md:grid-cols-12 gap-4">
              <div className="md:col-span-7">
                <label className="overline text-[var(--bif-muted)]">Name</label>
                <input className="input" value={p.name} onChange={(e) => { const n = [...items]; n[idx] = { ...p, name: e.target.value }; setItems(n); }} />
              </div>
              <div className="md:col-span-5">
                <label className="overline text-[var(--bif-muted)]">Pillar</label>
                <select className="input" value={p.pillar} onChange={(e) => { const n = [...items]; n[idx] = { ...p, pillar: e.target.value }; setItems(n); }}>
                  <option value="self">Develop Self</option>
                  <option value="team">Develop Team</option>
                  <option value="organization">Develop Organization</option>
                </select>
              </div>
              <div className="md:col-span-12">
                <label className="overline text-[var(--bif-muted)]">Description</label>
                <textarea rows={4} className="input resize-none" value={p.description || ""} onChange={(e) => { const n = [...items]; n[idx] = { ...p, description: e.target.value }; setItems(n); }} />
              </div>
            </div>
            <div className="mt-5 flex gap-3">
              <button className="btn-primary" onClick={() => save(p)} data-testid={`save-${p.id}`}><Save size={14}/> Save</button>
              <button className="btn-ghost text-red-700 border-red-700 hover:text-red-900 hover:border-red-900" onClick={() => del(p.id)}><Trash2 size={14}/> Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TestimonialsPanel({ token }) {
  const [items, setItems] = useState([]);
  const reload = () => api.get("/testimonials").then((r) => setItems(r.data));
  useEffect(() => { reload(); }, []);

  const save = async (t) => { try { await adminApi(token).put(`/testimonials/${t.id}`, t); toast.success("Saved"); reload(); } catch { toast.error("Failed"); } };
  const del = async (id) => { if (!confirm("Delete?")) return; await adminApi(token).delete(`/testimonials/${id}`); reload(); };
  const add = () => setItems([{ id: `t-${Date.now()}`, quote: "", author: "", role: "" }, ...items]);

  return (
    <div data-testid="admin-testimonials">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-3xl font-bold">Testimonials</h2>
        <button onClick={add} className="btn-outline"><Plus size={14}/> Add</button>
      </div>
      <div className="mt-8 space-y-4">
        {items.map((t, idx) => (
          <div key={t.id} className="border hairline p-6">
            <div className="grid md:grid-cols-12 gap-4">
              <div className="md:col-span-12">
                <label className="overline text-[var(--bif-muted)]">Quote</label>
                <textarea rows={2} className="input resize-none" value={t.quote} onChange={(e) => { const n = [...items]; n[idx] = { ...t, quote: e.target.value }; setItems(n); }} />
              </div>
              <div className="md:col-span-4">
                <label className="overline text-[var(--bif-muted)]">Author</label>
                <input className="input" value={t.author} onChange={(e) => { const n = [...items]; n[idx] = { ...t, author: e.target.value }; setItems(n); }} />
              </div>
              <div className="md:col-span-8">
                <label className="overline text-[var(--bif-muted)]">Role</label>
                <input className="input" value={t.role} onChange={(e) => { const n = [...items]; n[idx] = { ...t, role: e.target.value }; setItems(n); }} />
              </div>
            </div>
            <div className="mt-5 flex gap-3">
              <button className="btn-primary" onClick={() => save(t)}><Save size={14}/> Save</button>
              <button className="btn-ghost text-red-700 border-red-700 hover:text-red-900 hover:border-red-900" onClick={() => del(t.id)}><Trash2 size={14}/> Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
