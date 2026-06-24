import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowRight, ArrowDown } from "lucide-react";
import { api } from "@/lib/api";
import EngagementInfographic from "@/components/EngagementInfographic";
import DifferenceInfographic from "@/components/DifferenceInfographic";

const HERO_IMG = "/images/leadership-hero.jpg";

const CHALLENGES = [
  "Low leadership effectiveness",
  "Team silos",
  "Poor stakeholder management",
  "Change resistance",
  "Inconsistent performance",
  "Low accountability",
];
const INTERVENTIONS = [
  "Leadership Programs",
  "Team Effectiveness",
  "Executive Coaching",
  "Sales Capability",
  "Org. Development",
];
const OUTCOMES = [
  "Stronger Leaders",
  "Better Collaboration",
  "Higher Accountability",
  "Increased Influence",
  "Improved Performance",
  "Sustainable Growth",
];

const PILLARS = [
  { tag: "01", title: "Develop Self",
    items: ["Executive Presence", "Emotional Intelligence", "Influence without Authority", "Story Telling", "NLP Practitioner"] },
  { tag: "02", title: "Develop Team",
    items: ["Team Excellence Accelerator", "High Trust Teams", "Stakeholder Excellence", "Collaborative Leadership", "Leadership in the Age of AI"] },
  { tag: "03", title: "Develop Organization",
    items: ["Leadership Transformation Journey", "Culture, Values and You", "Sales Excellence", "Manager Effectiveness Academy", "Assessment Development Centers"] },
];

const WHY = [
  { k: "EX", t: "Experiential Learning", d: "Activity-led, immersive sessions that move beyond slides into lived behaviour change." },
  { k: "BR", t: "Business-Relevant", d: "Every intervention is anchored to a specific business outcome — not generic content." },
  { k: "CL", t: "Coaching-Led Facilitation", d: "Senior coach-facilitators who pull insight from the room, not push frameworks at it." },
  { k: "CS", t: "Customised Solutions", d: "Diagnostics-driven design. No off-the-shelf modules dressed up for your context." },
  { k: "MO", t: "Measurable Outcomes", d: "Behavioural KPIs, manager check-ins and sustained reinforcement post-program." },
  { k: "SN", t: "Senior Facilitator Network", d: "A curated bench of industry-experienced facilitators across India and globally." },
];

const JOURNEY = [
  { n: "01", t: "Discover", d: "Listen deeply to your business context, leaders, and capability gaps." },
  { n: "02", t: "Diagnose", d: "Assess current state — culture, behaviours, talent benchmarks." },
  { n: "03", t: "Design", d: "Co-create an intervention architecture mapped to outcomes." },
  { n: "04", t: "Deliver", d: "Run experiential journeys with senior facilitators and coaches." },
  { n: "05", t: "Sustain", d: "Embed behaviours with reinforcement, coaching and measurement." },
];

const CLIENT_LOGOS = [
  { src: "/images/client-deloitte.svg", alt: "Deloitte" },
  { src: "/images/client-bosch.svg", alt: "Bosch" },
  { src: "/images/client-sap.svg", alt: "SAP" },
  { src: "/images/client-tata-motors.svg", alt: "Tata Motors" },
  { src: "/images/client-zeiss.svg", alt: "Carl Zeiss" },
  { src: "/images/client-lowes.svg", alt: "Lowe's" },
  { src: "/images/client-paloalto.svg", alt: "Palo Alto" },
  { src: "/images/client-nippon-india.svg", alt: "Nippon India" },
];

export default function Home() {
  const [testimonials, setTestimonials] = useState([]);
  const [tIdx, setTIdx] = useState(0);

  useEffect(() => {
    api.get("/testimonials").then((r) => setTestimonials(r.data)).catch(() => {});
  }, []);

  useEffect(() => {
    if (!testimonials.length) return;
    const id = setInterval(() => setTIdx((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, [testimonials]);

  return (
    <div data-testid="home-page">
      {/* HERO */}
      <section data-testid="hero" className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover opacity-[0.18]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bif-paper)] via-[var(--bif-paper)]/70 to-[var(--bif-paper)]" />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 pt-16 md:pt-28 pb-24 md:pb-36">
          <div className="grid md:grid-cols-12 gap-10 items-end">
            <div className="md:col-span-9">
              <div className="flex items-center gap-3 mb-8">
                <span className="dot" />
                <span className="overline text-[var(--bif-muted)]">[ Leadership · Organisational Development · Talent Transformation ]</span>
              </div>
              <h1 className="font-display font-extrabold leading-[0.95] tracking-tight text-[clamp(2.6rem,7vw,6.5rem)]">
                Developing Leaders.<br />
                Transforming Teams.<br />
                <span className="text-[var(--bif-bronze)]">Elevating Organizations.</span>
              </h1>
              <div className="mt-10 max-w-3xl">
                <div className="font-display text-xl md:text-2xl font-bold leading-snug">
                  Leadership. Organisational Development. Talent Transformation.
                </div>
                <p className="mt-6 text-lg md:text-xl text-[var(--bif-muted)] leading-relaxed">
                  We partner with HR, L&amp;D and business leaders to create measurable impact through leadership development,
                  coaching, culture transformation and capability building.
                </p>
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link to="/contact" data-testid="hero-cta-primary" className="btn-primary">
                  Schedule a Conversation <ArrowUpRight size={14} />
                </Link>
                <Link to="/framework" data-testid="hero-cta-secondary" className="btn-outline">
                  Explore Solutions
                </Link>
              </div>
            </div>
            <div className="md:col-span-3 hidden md:block">
              <div className="border-l hairline pl-6">
                <div className="overline text-[var(--bif-muted)]">Est.</div>
                <div className="font-display text-4xl font-bold mt-2">2014</div>
                <div className="divider-line my-6" />
                <div className="overline text-[var(--bif-muted)]">Leaders Developed</div>
                <div className="font-display text-4xl font-bold mt-2">100k+</div>
                <div className="divider-line my-6" />
                <div className="overline text-[var(--bif-muted)]">Cities Across India</div>
                <div className="font-display text-4xl font-bold mt-2">12+</div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative border-y hairline bg-[var(--bif-cream)]/50">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-8 flex items-center gap-10 overflow-x-auto scrollbar-thin">
            <span className="overline text-[var(--bif-muted)] shrink-0">Trusted by</span>
            {CLIENT_LOGOS.map((c) => (
              <img key={c.alt} src={c.src} alt={c.alt} className="h-7 md:h-8 w-auto opacity-60 hover:opacity-100 transition-opacity shrink-0" />
            ))}
          </div>
        </div>
      </section>

      {/* THE ARC */}
      <section data-testid="infographic" className="py-24 md:py-36">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-8 mb-16">
            <div className="md:col-span-4">
              <div className="overline text-[var(--bif-bronze)]">[ Section 01 / The Arc ]</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-5 leading-[1.05]">From business challenge to business outcome.</h2>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <p className="text-lg text-[var(--bif-muted)] leading-relaxed">
                Organizations don&rsquo;t invest in learning — they invest in <span className="text-[var(--bif-ink)] font-medium">results</span>.
                That&rsquo;s why every engagement starts with a critical business challenge and is designed to create measurable outcomes.
                By connecting leadership, behaviour and execution, we help organizations turn strategy into sustained performance.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-[var(--bif-line)] border hairline">
            <Column title="Business Challenges" tag="A" items={CHALLENGES} accent="ink" />
            <Column title="Born In Flight Interventions" tag="B" items={INTERVENTIONS} accent="bronze" />
            <Column title="Business Outcomes" tag="C" items={OUTCOMES} accent="ink" />
          </div>
        </div>
      </section>

      {/* SIGNATURE SOLUTIONS */}
      <section data-testid="signature-solutions" className="py-24 md:py-32 bg-[var(--bif-ink)] text-[var(--bif-paper)] relative grain">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative">
          <div className="grid md:grid-cols-12 gap-6 mb-14">
            <div className="md:col-span-6">
              <div className="overline text-[var(--bif-bronze)]">[ Section 02 / The Framework ]</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-5 leading-[1.05]">Three pillars. One capability architecture.</h2>
            </div>
            <div className="md:col-span-5 md:col-start-8 self-end">
              <p className="text-white/70 leading-relaxed">
                A clear, recallable model that organizes everything we do — so your leaders, managers and teams know exactly where to plug in.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {PILLARS.map((p) => (
              <div key={p.tag} className="bg-[var(--bif-ink)] p-10 group hover:bg-white/[0.04] transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-[0.22em] text-white/40">/ {p.tag}</span>
                  <ArrowUpRight size={18} className="text-white/40 group-hover:text-[var(--bif-bronze)] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-display text-3xl md:text-4xl font-bold mt-8">{p.title}</h3>
                <ul className="mt-8 space-y-3 border-t border-white/10 pt-6">
                  {p.items.map((i) => (
                    <li key={i} className="flex items-start gap-3 text-white/85">
                      <span className="font-mono text-[10px] text-[var(--bif-bronze)] mt-2">▸</span>
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link to="/framework" data-testid="framework-cta" className="btn-outline border-[var(--bif-paper)] text-[var(--bif-paper)] hover:bg-[var(--bif-paper)] hover:text-[var(--bif-ink)]">
              See the full framework <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY — Difference Infographic */}
      <section data-testid="why-bif" className="py-24 md:py-36">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-6 mb-14">
            <div className="md:col-span-7">
              <div className="overline text-[var(--bif-bronze)]">[ Section 03 / The Born In Flight Difference ]</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-5 leading-[1.05]">Not a Training Company. <span className="font-serif-display italic font-normal">A Capability Partner.</span></h2>
            </div>
            <p className="md:col-span-5 self-end text-[var(--bif-muted)] leading-relaxed">
              A coaching-led, business-focused approach that creates measurable capability and sustainable performance.
            </p>
          </div>
          <DifferenceInfographic />
        </div>
      </section>

      {/* JOURNEY — Engagement Infographic */}
      <section data-testid="journey" className="py-24 md:py-32 bg-[var(--bif-cream)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-6 mb-14">
            <div className="md:col-span-7">
              <div className="overline text-[var(--bif-bronze)]">[ Section 04 / The Born In Flight Transformation Journey ]</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-5 leading-[1.05]">How We Work With You.</h2>
            </div>
            <p className="md:col-span-5 self-end text-[var(--bif-muted)] text-lg leading-relaxed">
              A proven engagement journey that transforms business challenges into measurable capability and performance outcomes.
            </p>
          </div>
          <EngagementInfographic />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section data-testid="testimonials" className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-3">
              <div className="overline text-[var(--bif-bronze)]">[ Voices ]</div>
              <h2 className="font-display text-3xl font-bold mt-5 leading-tight">What clients say.</h2>
              {testimonials.length > 1 && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setTIdx(i)}
                      data-testid={`testimonial-dot-${i}`}
                      className={`h-1 w-6 transition-colors ${i === tIdx ? "bg-[var(--bif-bronze)]" : "bg-[var(--bif-line)]"}`}
                      aria-label={`Testimonial ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="md:col-span-8 md:col-start-5 border-l hairline pl-10 min-h-[260px]">
              {testimonials[tIdx] && (
                <div data-testid="testimonial-active">
                  <p className="font-serif-display text-2xl md:text-3xl leading-[1.35] text-[var(--bif-ink)]">
                    &ldquo;{testimonials[tIdx].quote}&rdquo;
                  </p>
                  <div className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-[var(--bif-muted)]">
                    <span className="text-[var(--bif-ink)] font-semibold">{testimonials[tIdx].author}</span> · {testimonials[tIdx].role}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section data-testid="final-cta" className="py-24 md:py-36 bg-[var(--bif-ink)] text-[var(--bif-paper)] relative grain">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative">
          <div className="grid md:grid-cols-12 gap-10 items-end">
            <div className="md:col-span-8">
              <div className="overline text-[var(--bif-bronze)]">[ Let's Begin ]</div>
              <h2 className="font-display text-5xl md:text-7xl font-extrabold mt-6 leading-[0.95] tracking-tight">
                Let&rsquo;s build capability that creates <span className="font-serif-display italic font-normal">business impact</span>.
              </h2>
            </div>
            <div className="md:col-span-4 flex md:justify-end">
              <Link to="/contact" data-testid="final-cta-button" className="btn-outline border-[var(--bif-paper)] text-[var(--bif-paper)] hover:bg-[var(--bif-bronze)] hover:border-[var(--bif-bronze)]">
                Schedule a Consultation <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Column({ title, tag, items, accent }) {
  const accentColor = accent === "bronze" ? "var(--bif-bronze)" : "var(--bif-ink)";
  return (
    <div className="bg-[var(--bif-paper)] p-8 md:p-10 relative">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs tracking-[0.22em] text-[var(--bif-muted)]">/ {tag}</span>
        <ArrowDown size={16} className="md:hidden text-[var(--bif-bronze)]" />
        <ArrowRight size={16} className="hidden md:block text-[var(--bif-bronze)]" />
      </div>
      <h3 className="font-display text-xl font-bold mt-6" style={{ color: accentColor }}>{title}</h3>
      <ul className="mt-6 space-y-3">
        {items.map((i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-2 h-px w-3 bg-[var(--bif-bronze)] shrink-0" />
            <span className="text-[var(--bif-ink)]">{i}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
