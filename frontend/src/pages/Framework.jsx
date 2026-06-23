import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { api } from "@/lib/api";

const PILLARS = [
  {
    key: "self",
    tag: "I",
    title: "Develop Self",
    blurb: "Individual leadership effectiveness — for high-potential talent, managers and senior leaders.",
    focus: ["Self Leadership", "Communication", "Executive Presence", "Emotional Intelligence", "Personal Effectiveness", "Influence"],
  },
  {
    key: "team",
    tag: "II",
    title: "Develop Team",
    blurb: "Team effectiveness, alignment and collaboration across functions and geographies.",
    focus: ["Team Effectiveness", "Collaboration", "Conflict Management", "Stakeholder Management", "Coaching Conversations", "Leadership Skills"],
  },
  {
    key: "organization",
    tag: "III",
    title: "Develop Organization",
    blurb: "Enterprise-scale leadership pipelines, culture transformation and capability building.",
    focus: ["Leadership Development", "Culture Transformation", "Organizational Effectiveness", "Sales Excellence", "Change Management", "Capability Building"],
  },
];

export default function Framework() {
  const [active, setActive] = useState("self");
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    api.get("/programs").then((r) => setPrograms(r.data)).catch(() => {});
  }, []);

  const activePillar = PILLARS.find((p) => p.key === active);
  const activePrograms = useMemo(() => programs.filter((p) => p.pillar === active), [programs, active]);

  return (
    <div data-testid="framework-page">
      <section className="pt-16 md:pt-24 pb-12 md:pb-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="overline text-[var(--bif-bronze)]">[ Capability Framework ]</div>
          <h1 className="font-display font-extrabold mt-6 leading-[0.95] tracking-tight text-[clamp(2.4rem,6vw,5.5rem)] max-w-5xl">
            One architecture. <span className="font-serif-display italic font-normal">Three pillars.</span> Every capability you need.
          </h1>
          <p className="mt-10 max-w-3xl text-lg md:text-xl text-[var(--bif-muted)] leading-relaxed">
            Click a pillar to explore focus areas and the signature programs that sit underneath it.
          </p>
        </div>
      </section>

      <section data-testid="framework-pillars" className="border-y hairline bg-[var(--bif-cream)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid md:grid-cols-3 gap-px bg-[var(--bif-line)]">
          {PILLARS.map((p) => {
            const isActive = active === p.key;
            return (
              <button
                key={p.key}
                onClick={() => setActive(p.key)}
                data-testid={`pillar-btn-${p.key}`}
                className={`text-left p-8 md:p-10 transition-colors ${isActive ? "bg-[var(--bif-ink)] text-[var(--bif-paper)]" : "bg-[var(--bif-paper)] hover:bg-[var(--bif-cream)]"}`}
              >
                <div className={`flex items-center justify-between ${isActive ? "text-[var(--bif-bronze)]" : "text-[var(--bif-muted)]"}`}>
                  <span className="font-mono text-xs tracking-[0.22em]">/ Pillar {p.tag}</span>
                  <ArrowRight size={16} className={isActive ? "translate-x-1" : ""} />
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-bold mt-5">{p.title}</h3>
                <p className={`mt-3 text-sm leading-relaxed ${isActive ? "text-white/70" : "text-[var(--bif-muted)]"}`}>{p.blurb}</p>
              </button>
            );
          })}
        </div>
      </section>

      <section data-testid="pillar-detail" className="py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <div className="overline text-[var(--bif-bronze)]">[ Focus Areas ]</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-5 leading-[1.05]">{activePillar.title}</h2>
              <p className="mt-5 text-[var(--bif-muted)] text-lg leading-relaxed">{activePillar.blurb}</p>
              <ul className="mt-10 border-t hairline">
                {activePillar.focus.map((f, i) => (
                  <li key={f} className="flex items-center justify-between py-4 border-b hairline">
                    <span className="flex items-center gap-4">
                      <span className="font-mono text-xs text-[var(--bif-muted)]">{String(i + 1).padStart(2, "0")}</span>
                      <span className="font-medium">{f}</span>
                    </span>
                    <span className="h-px w-6 bg-[var(--bif-bronze)]" />
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-8">
              <div className="overline text-[var(--bif-bronze)]">[ Signature Programs ]</div>
              <h3 className="font-display text-2xl md:text-3xl font-bold mt-5">
                Programs under {activePillar.title} <span className="text-[var(--bif-muted)] font-mono text-sm ml-2">/ {activePrograms.length}</span>
              </h3>
              <div className="mt-8 border-t hairline">
                {activePrograms.length === 0 && (
                  <div className="py-12 text-[var(--bif-muted)] font-mono text-sm uppercase tracking-[0.18em]">Loading programs…</div>
                )}
                {activePrograms.map((p) => (
                  <div key={p.id} data-testid={`program-row-${p.id}`} className="grid md:grid-cols-12 gap-6 py-7 border-b hairline group hover:bg-[var(--bif-cream)] transition-colors px-3 -mx-3">
                    <div className="md:col-span-5">
                      <h4 className="font-display text-xl font-bold">{p.name}</h4>
                    </div>
                    <div className="md:col-span-6">
                      <p className="text-[var(--bif-muted)] text-sm leading-relaxed">{p.description}</p>
                    </div>
                    <div className="md:col-span-1 flex md:justify-end items-start">
                      <Link to="/contact" className="text-[var(--bif-ink)] group-hover:text-[var(--bif-bronze)] transition-colors" aria-label="Inquire">
                        <ArrowUpRight size={20} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/programs" className="btn-ghost mt-10 inline-flex" data-testid="see-all-programs">
                See all signature programs <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[var(--bif-ink)] text-[var(--bif-paper)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-8 items-center">
          <h2 className="md:col-span-8 font-display text-3xl md:text-5xl font-extrabold leading-tight">
            Not sure which pillar to start with? <span className="font-serif-display italic font-normal text-[var(--bif-bronze)]">Let&rsquo;s diagnose together.</span>
          </h2>
          <div className="md:col-span-4 md:text-right">
            <Link to="/contact" className="btn-outline border-[var(--bif-paper)] text-[var(--bif-paper)] hover:bg-[var(--bif-bronze)] hover:border-[var(--bif-bronze)]" data-testid="framework-final-cta">
              Schedule a Diagnostic <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
