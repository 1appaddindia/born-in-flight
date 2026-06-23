import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { api } from "@/lib/api";

const PILLAR_LABEL = { self: "Develop Self", team: "Develop Team", organization: "Develop Organization" };

const PRINCIPLES = [
  { k: "01", t: "Business-Aligned", d: "Designed around your strategic priorities, leadership challenges and desired business outcomes — not generic learning objectives." },
  { k: "02", t: "Tailored, Not Templated", d: "Every journey is contextualized to your industry, culture, leadership maturity and organizational realities." },
  { k: "03", t: "Built on Coaching & Discovery", d: "We don't simply deliver content — we facilitate insight, reflection, experimentation and meaningful conversations that drive lasting behavioral change." },
  { k: "04", t: "Experiential by Design", d: "Participants learn through immersive experiences, simulations, peer learning, coaching, real business challenges and continuous practice — not passive instruction." },
  { k: "05", t: "Journey-Based, Not Event-Based", d: "True transformation doesn't happen in a workshop. Our programs combine learning, application, coaching, reflection, reinforcement and measurement over time to create sustainable impact." },
  { k: "06", t: "Application-Centered", d: "Every participant applies new learning to live workplace challenges, ensuring immediate relevance and stronger transfer of learning." },
  { k: "07", t: "Driven by Behavioral Science", d: "Our methodology integrates coaching, neuroscience, adult learning principles, NLP, systems thinking and experiential learning to accelerate growth and performance." },
  { k: "08", t: "Measured for Business Impact", d: "Success is evaluated through behavioral change, capability development, participant engagement and measurable business outcomes — not attendance alone." },
];

export default function Programs() {
  const [programs, setPrograms] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    api.get("/programs").then((r) => setPrograms(r.data)).catch(() => {});
  }, []);

  const filtered = filter === "all" ? programs : programs.filter((p) => p.pillar === filter);

  return (
    <div data-testid="programs-page">
      <section className="pt-16 md:pt-24 pb-12">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="overline text-[var(--bif-bronze)]">[ Signature Programs ]</div>
          <h1 className="font-display font-extrabold mt-6 leading-[0.95] tracking-tight text-[clamp(2.4rem,6vw,5.5rem)] max-w-5xl">
            Built for the real business <span className="font-serif-display italic font-normal">challenges you face</span>.
          </h1>
        </div>
      </section>

      {/* THE BORN IN FLIGHT LEARNING EXPERIENCE */}
      <section data-testid="learning-experience" className="py-16 md:py-24 bg-[var(--bif-cream)] border-y hairline">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-10 mb-14">
            <div className="md:col-span-5">
              <div className="overline text-[var(--bif-bronze)]">[ The Born In Flight Learning Experience ]</div>
              <h2 className="font-display text-3xl md:text-5xl font-bold mt-5 leading-[1.05]">
                Every engagement, <span className="font-serif-display italic font-normal">designed around you</span>.
              </h2>
            </div>
            <p className="md:col-span-6 md:col-start-7 self-end text-lg text-[var(--bif-muted)] leading-relaxed">
              Every organization is unique. That&rsquo;s why every Born In Flight engagement is thoughtfully designed around your people, your culture and your business priorities — ensuring learning translates into meaningful and measurable outcomes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--bif-line)] border hairline">
            {PRINCIPLES.map((p) => (
              <div key={p.k} data-testid={`principle-${p.k}`} className="bg-[var(--bif-paper)] p-7 md:p-8 hover:bg-[var(--bif-cream)] transition-colors">
                <div className="font-mono text-xs tracking-[0.22em] text-[var(--bif-bronze)]">/ {p.k}</div>
                <h3 className="font-display text-lg md:text-xl font-bold mt-4 leading-tight">{p.t}</h3>
                <p className="text-[var(--bif-muted)] mt-3 text-sm leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid md:grid-cols-12 gap-10">
            <p className="md:col-span-6 text-[var(--bif-muted)] leading-relaxed">
              Our programs extend beyond the classroom to create a continuous development journey — combining facilitated learning, coaching, workplace application, peer accountability, reflection, feedback and reinforcement. This approach helps transform new knowledge into everyday habits and measurable business performance.
            </p>
            <p className="md:col-span-6 font-serif-display text-xl md:text-2xl italic leading-snug">
              We believe learning is not an event. It is a journey of awareness, action, application &amp; sustained transformation. That&rsquo;s where lasting impact is created.
            </p>
          </div>
        </div>
      </section>

      {/* FILTER */}
      <section className="border-b hairline">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-5 flex flex-wrap gap-2 md:gap-4 items-center">
          <span className="overline text-[var(--bif-muted)] mr-2">Filter</span>
          {[
            { k: "all", l: "All" },
            { k: "self", l: "Develop Self" },
            { k: "team", l: "Develop Team" },
            { k: "organization", l: "Develop Organization" },
          ].map((f) => (
            <button
              key={f.k}
              data-testid={`filter-${f.k}`}
              onClick={() => setFilter(f.k)}
              className={`font-mono text-[11px] uppercase tracking-[0.18em] px-3 py-2 border hairline transition-colors ${filter === f.k ? "bg-[var(--bif-ink)] text-[var(--bif-paper)] border-[var(--bif-ink)]" : "hover:bg-[var(--bif-cream)]"}`}
            >
              {f.l}
            </button>
          ))}
          <span className="ml-auto font-mono text-xs text-[var(--bif-muted)]">{filtered.length} programs</span>
        </div>
      </section>

      {/* LIST */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          {filtered.length === 0 && (
            <div className="py-12 text-[var(--bif-muted)] font-mono text-sm uppercase tracking-[0.18em]">Loading programs…</div>
          )}
          <div className="border-t hairline">
            {filtered.map((p, idx) => (
              <article key={p.id} data-testid={`program-${p.id}`} className="border-b hairline py-10 md:py-12 grid md:grid-cols-12 gap-8 group hover:bg-[var(--bif-cream)]/60 transition-colors px-3 -mx-3">
                <div className="md:col-span-1 font-mono text-xs tracking-[0.22em] text-[var(--bif-muted)]">/ {String(idx + 1).padStart(2, "0")}</div>
                <div className="md:col-span-4">
                  <div className="overline text-[var(--bif-bronze)]">{PILLAR_LABEL[p.pillar]}</div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold mt-3 leading-tight">{p.name}</h3>
                </div>
                <div className="md:col-span-6">
                  <p className="text-[var(--bif-muted)] text-base md:text-lg leading-relaxed">{p.description}</p>
                </div>
                <div className="md:col-span-1 flex md:justify-end items-start">
                  <Link to="/contact" className="inline-flex items-center gap-1 text-[var(--bif-ink)] group-hover:text-[var(--bif-bronze)] transition-colors" data-testid={`request-${p.id}`}>
                    <ArrowUpRight size={20} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
