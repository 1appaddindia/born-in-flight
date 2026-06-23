import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const PILLARS = [
  {
    key: "self",
    label: "Develop Self",
    cases: [
      {
        id: "case-self-1",
        title: "Building Executive Presence for Emerging Leaders",
        client: "Global engineering & manufacturing organization",
        challenge: "Wanted to prepare its high-potential managers for enterprise leadership roles. As technical experts transitioned into leadership positions, they needed stronger executive presence, strategic communication and stakeholder influence to lead with greater confidence and impact.",
        solution: "Designed a blended learning journey combining executive presence, strategic storytelling, executive coaching and real-world leadership simulations to help participants communicate with clarity and influence across diverse stakeholders.",
        impact: "Participants demonstrated greater executive confidence, stronger communication, enhanced stakeholder engagement and increased readiness to lead larger teams and strategic business initiatives.",
      },
      {
        id: "case-self-2",
        title: "Building Coaching Leaders in a Global Financial Services Organization",
        client: "Leading global financial services organization",
        challenge: "Wanted its managers to transition from directing work to developing people. As the organization invested in leadership capability, it sought to embed a coaching approach that would strengthen employee engagement, accelerate development and improve team performance.",
        solution: "Designed and delivered a Leaders as Coaches journey that combined experiential learning, coaching practice, peer learning circles, workplace application and ongoing reinforcement. Managers developed practical coaching skills to foster ownership, build capability and lead more meaningful developmental conversations.",
        impact: "Managers embraced a coaching mindset — leading to higher employee engagement, stronger accountability, more effective performance conversations and teams that demonstrated greater ownership and collaboration.",
      },
    ],
  },
  {
    key: "team",
    label: "Develop Team",
    cases: [
      {
        id: "case-team-1",
        title: "Strengthening Influence Across a Matrix Organization",
        client: "Global technology company",
        challenge: "Operating within a complex matrix structure, the organization needed its leaders to collaborate more effectively across functions. Silos, competing priorities and stakeholder misalignment were impacting decision-making, execution speed and business outcomes.",
        solution: "Delivered the Impact 360 learning journey focused on influence, conflict management, stakeholder engagement and cross-functional collaboration.",
        impact: "Teams improved collaboration, strengthened stakeholder relationships and accelerated execution across the organization.",
      },
      {
        id: "case-team-2",
        title: "Transforming Sales Capability for Frontline Leaders",
        client: "Leading FMCG organization",
        challenge: "Sought to strengthen the capabilities of its frontline sales force and Area Sales Managers (ASMs) to improve execution quality, enhance distributor engagement and accelerate premium category growth across diverse markets.",
        solution: "Designed and delivered a nationwide Sales Capability Development Journey that trained 3,000+ frontline sales professionals and managers. The journey combined immersive classroom learning, experiential simulations, field application, product mastery and manager-led reinforcement — focused on consultative selling, gate meeting excellence, outlet execution, stakeholder management and driving category growth.",
        impact: "Sales leaders demonstrated greater confidence in coaching their teams, improved execution discipline, stronger distributor partnerships and more effective customer conversations — resulting in higher sales productivity, better market execution and a more capable frontline sales organization.",
      },
    ],
  },
  {
    key: "organization",
    label: "Develop Organization",
    cases: [
      {
        id: "case-org-1",
        title: "Future-Ready Managers Academy",
        client: "Global materials science & manufacturing company",
        challenge: "Sought to accelerate the transition of newly promoted managers into effective people leaders. As technical experts assumed leadership responsibilities, they needed stronger capabilities to lead teams, drive performance and navigate an increasingly dynamic business environment.",
        solution: "Designed and delivered a Manager Effectiveness Academy combining modular learning, coaching, experiential workshops, workplace application and business-led action learning — focused on people leadership, coaching, communication, decision-making, performance management and execution excellence.",
        impact: "Managers demonstrated stronger leadership confidence, improved people management capabilities, better decision-making, increased accountability and greater effectiveness in leading high-performing teams.",
      },
      {
        id: "case-org-2",
        title: "Building Organizational Capability through Assessment Development Centres",
        client: "Global optics & precision engineering organization",
        challenge: "Sought a robust and objective approach to identify high-potential talent, assess leadership readiness and strengthen its succession pipeline across critical business functions.",
        solution: "Designed and facilitated comprehensive Assessment and Development Centres using competency-based simulations, behavioral interviews, psychometric assessments, business case exercises and personalized development planning to evaluate leadership capability and future potential.",
        impact: "The organization gained deeper insights into leadership capability — enabling more informed talent decisions, targeted succession planning and personalized development journeys that strengthened its future leadership pipeline.",
      },
    ],
  },
];

export default function SuccessStories() {
  return (
    <div data-testid="success-stories-page">
      <section className="pt-16 md:pt-24 pb-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="overline text-[var(--bif-bronze)]">[ Success Stories ]</div>
          <h1 className="font-display font-extrabold mt-6 leading-[0.95] tracking-tight text-[clamp(2.4rem,6vw,5.5rem)] max-w-5xl">
            Where strategy met <span className="font-serif-display italic font-normal text-[var(--bif-bronze)]">behaviour change</span>.
          </h1>
          <p className="mt-10 max-w-3xl text-lg md:text-xl text-[var(--bif-muted)] leading-relaxed">
            Six engagements across our three pillars — each one anchored to a business challenge and measured by outcomes the leadership team cared about.
          </p>
        </div>
      </section>

      {PILLARS.map((p, pIdx) => (
        <section key={p.key} data-testid={`stories-${p.key}`} className={`py-20 md:py-24 ${pIdx % 2 === 0 ? "bg-[var(--bif-cream)]" : ""} border-t hairline`}>
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="flex items-baseline justify-between mb-12">
              <div>
                <div className="overline text-[var(--bif-bronze)]">/ Pillar {String(pIdx + 1).padStart(2, "0")}</div>
                <h2 className="font-display text-3xl md:text-5xl font-bold mt-4">{p.label}</h2>
              </div>
              <span className="hidden md:block font-mono text-xs uppercase tracking-[0.22em] text-[var(--bif-muted)]">{p.cases.length} case studies</span>
            </div>

            <div className="grid md:grid-cols-2 gap-px bg-[var(--bif-line)] border hairline">
              {p.cases.map((c) => (
                <article key={c.id} data-testid={c.id} className="bg-[var(--bif-paper)] p-8 md:p-10 flex flex-col">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--bif-muted)]">{c.client}</div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold mt-4 leading-tight">{c.title}</h3>

                  <div className="mt-8 grid gap-6 flex-1">
                    <Block label="Business Challenge" text={c.challenge} />
                    <Block label="Our Solution" text={c.solution} />
                    <Block label="Business Impact" text={c.impact} accent />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="py-24 bg-[var(--bif-ink)] text-[var(--bif-paper)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-8 items-center">
          <h2 className="md:col-span-8 font-display text-3xl md:text-5xl font-extrabold leading-tight">
            Have a similar challenge? <span className="font-serif-display italic font-normal text-[var(--bif-bronze)]">Let&rsquo;s design your story.</span>
          </h2>
          <div className="md:col-span-4 md:text-right">
            <Link to="/contact" className="btn-outline border-[var(--bif-paper)] text-[var(--bif-paper)] hover:bg-[var(--bif-bronze)] hover:border-[var(--bif-bronze)]" data-testid="stories-final-cta">
              Schedule a Conversation <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Block({ label, text, accent }) {
  return (
    <div>
      <div className={`overline ${accent ? "text-[var(--bif-bronze)]" : "text-[var(--bif-muted)]"}`}>{label}</div>
      <p className={`mt-2 leading-relaxed ${accent ? "text-[var(--bif-ink)] font-medium" : "text-[var(--bif-muted)]"}`}>{text}</p>
    </div>
  );
}
