import { Link } from "react-router-dom";
import { ArrowUpRight, BookOpen, Linkedin } from "lucide-react";

const FLIGHT = [
  { l: "F", w: "Focus", d: "We start by anchoring every learning intervention to a measurable business goal — not a generic competency list." },
  { l: "L", w: "Learn", d: "Practical concepts, frameworks and models — taught the way working leaders absorb them: fast, concrete, applicable." },
  { l: "I", w: "Immerse", d: "Activities, simulations and live-business challenges that turn theory into muscle memory in the room." },
  { l: "G", w: "Grow", d: "One-on-one and group coaching to translate insight into behaviour change over weeks, not minutes." },
  { l: "H", w: "Harness", d: "On-the-job reinforcement, manager nudges and structured reflection so new behaviours actually stick." },
  { l: "T", w: "Transform", d: "Outcomes measured in business KPIs — accountability, performance, retention, revenue — not smile sheets." },
];

const VALUES = [
  { t: "Substance over showmanship", d: "We measure success by behaviour change in the months after a program, not the energy in the room on day one." },
  { t: "Client context is sacred", d: "No off-the-shelf decks. Every design starts with diagnostics, leader interviews and your real business challenges." },
  { t: "Coaching as the default mode", d: "We pull from the room rather than push at it — because adults change through reflection, not lectures." },
  { t: "Measurable or it didn't happen", d: "Behavioural KPIs, manager check-ins, sustained reinforcement — built into every engagement." },
];

const STATS = [
  { n: "12+", l: "Years of experience" },
  { n: "100k+", l: "Leaders developed" },
  { n: "12+", l: "Cities across India" },
  { n: "93%", l: "Repeat client rate" },
];

const PRAKASH_IMG = "/images/prakash-rao.png";
const BOOK_LINKS = [
  { l: "Amazon India", u: "https://www.amazon.in/dp/B0GCFFPMYB" },
  { l: "Amazon Global", u: "https://www.amazon.com/dp/B0GCFFPMYB" },
  { l: "Amazon UK", u: "https://www.amazon.co.uk/dp/B0GCFFPMYB" },
  { l: "Flipkart", u: "https://www.flipkart.com/go-on/p/itm2eb1bc58a6995?pid=9798900899657&affid=editornoti" },
  { l: "Notion Press", u: "https://notionpress.com/in/read/go-on-become-the-athlete-within-you" },
];

export default function About() {
  return (
    <div data-testid="about-page">
      {/* HERO */}
      <section className="relative pt-16 md:pt-24 pb-12">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="overline text-[var(--bif-bronze)]">[ About Born In Flight ]</div>
          <h1 className="font-display font-extrabold mt-6 leading-[0.95] tracking-tight text-[clamp(2.4rem,6vw,5.5rem)] max-w-5xl">
            Since 2014, we&rsquo;ve been the quiet partner behind <span className="font-serif-display italic font-normal text-[var(--bif-bronze)]">leaders, teams and organizations</span> that actually transform.
          </h1>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section data-testid="philosophy" className="py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <div className="overline text-[var(--bif-bronze)]">[ Our Philosophy ]</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-5 leading-[1.1]">
              Every transformation begins while you&rsquo;re <span className="font-serif-display italic font-normal">already in motion</span>.
            </h2>
            <div className="mt-10 flex flex-wrap gap-3">
              {["Change", "Breakthrough", "Transformation"].map((w) => (
                <span key={w} className="font-mono text-xs uppercase tracking-[0.22em] border hairline px-4 py-2 bg-[var(--bif-cream)]">{w}</span>
              ))}
            </div>
          </div>
          <div className="md:col-span-7 text-lg text-[var(--bif-muted)] leading-relaxed space-y-5">
            <p>
              Born In Flight was founded on a simple yet powerful belief: people and organizations don&rsquo;t transform by standing still — they evolve while navigating change. Inspired by the mythical Himalayan bird that lives entirely in flight, our philosophy celebrates the moments when leaders, teams and organizations choose to embrace uncertainty, rethink possibilities, and rise to a higher level of performance. Every new role, strategic shift, cultural transformation or business challenge is an opportunity to be &lsquo;Born In Flight.&rsquo;
            </p>
            <p>
              Since 2014, we have partnered with organizations across industries to unlock leadership potential, strengthen teams and build future-ready organizations. Headquartered in Bangalore and delivering programs across India and globally, we combine coaching, leadership development, experiential learning and behavioral science to create transformation that is both deeply human and commercially meaningful.
            </p>
            <p>
              Our work is designed around the outcomes that matter most — stronger leaders, high-performing teams, healthier cultures, and measurable business impact. We work with first-time managers, senior leadership teams and executive leaders, helping them navigate complexity with greater clarity, influence and confidence.
            </p>
            <p>
              At Born In Flight, we believe every individual, every team and every organization possesses untapped potential. Our role is not simply to train — it is to create the conditions where transformation becomes possible, sustainable and measurable. Because the greatest growth doesn&rsquo;t happen before the journey begins. It happens while you&rsquo;re already in flight.
            </p>
          </div>
        </div>
      </section>

      {/* F.L.I.G.H.T METHODOLOGY */}
      <section data-testid="flight-methodology" className="py-24 md:py-32 bg-[var(--bif-ink)] text-[var(--bif-paper)] relative grain">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative">
          <div className="grid md:grid-cols-12 gap-6 mb-16">
            <div className="md:col-span-6">
              <div className="overline text-[var(--bif-bronze)]">[ Our Methodology ]</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-5 leading-[1.05]">
                The F.L.I.G.H.T<span className="text-[var(--bif-bronze)]">.</span> Learning Methodology
              </h2>
            </div>
            <p className="md:col-span-5 md:col-start-8 self-end text-white/70 text-lg leading-relaxed">
              A proprietary six-stage approach that takes a learner from business focus to lasting transformation — built from a decade of work inside Fortune 500 enterprises.
            </p>
          </div>

          <div className="border-t border-white/10">
            {FLIGHT.map((step, idx) => (
              <div key={step.l} data-testid={`flight-step-${step.l.toLowerCase()}`} className="grid md:grid-cols-12 gap-6 items-center border-b border-white/10 py-8 md:py-10 group hover:bg-white/[0.03] transition-colors">
                <div className="md:col-span-1 font-mono text-xs tracking-[0.22em] text-white/40">/ {String(idx + 1).padStart(2, "0")}</div>
                <div className="md:col-span-3 font-display text-[clamp(5rem,10vw,9rem)] font-extrabold leading-none text-[var(--bif-bronze)] group-hover:translate-x-2 transition-transform">{step.l}</div>
                <div className="md:col-span-3 font-display text-3xl md:text-4xl font-bold">{step.w}</div>
                <div className="md:col-span-5 text-white/75 text-lg leading-relaxed">{step.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section data-testid="values" className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-6 mb-14">
            <div className="md:col-span-6">
              <div className="overline text-[var(--bif-bronze)]">[ What We Stand For ]</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-5 leading-[1.05]">Four convictions that shape every engagement.</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-px bg-[var(--bif-line)] border hairline">
            {VALUES.map((v, i) => (
              <div key={v.t} className="bg-[var(--bif-paper)] p-10 md:p-12">
                <div className="font-mono text-xs tracking-[0.22em] text-[var(--bif-bronze)]">/ V{i + 1}</div>
                <h3 className="font-display text-2xl md:text-3xl font-bold mt-4">{v.t}</h3>
                <p className="text-[var(--bif-muted)] mt-4 text-lg leading-relaxed">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CLIENTS CHOOSE US */}
      <section data-testid="why-clients" className="py-24 md:py-32 bg-[var(--bif-cream)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-6">
              <div className="overline text-[var(--bif-bronze)]">[ Why Clients Choose Us ]</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-5 leading-[1.05]">
                We&rsquo;re built for organizations that take <span className="font-serif-display italic font-normal">capability seriously</span>.
              </h2>
              <p className="mt-6 text-[var(--bif-muted)] text-lg leading-relaxed max-w-xl">
                If you&rsquo;re looking for a vendor to deliver a workshop, there are many. If you&rsquo;re looking for a partner to move a behavioural needle inside your business — that&rsquo;s where we live.
              </p>
              <Link to="/contact" className="btn-primary mt-10" data-testid="about-cta">
                Start a Conversation <ArrowUpRight size={14} />
              </Link>
            </div>
            <div className="md:col-span-6">
              <div className="grid grid-cols-2 gap-px bg-[var(--bif-line)] border hairline">
                {STATS.map((s) => (
                  <div key={s.l} data-testid={`stat-${s.l.replace(/\s+/g, "-").toLowerCase()}`} className="bg-[var(--bif-paper)] p-8">
                    <div className="font-display text-4xl md:text-5xl font-extrabold text-[var(--bif-bronze)]">{s.n}</div>
                    <div className="overline text-[var(--bif-muted)] mt-3">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MEET PRAKASH RAO */}
      <section data-testid="prakash-rao" className="py-24 md:py-32 bg-[var(--bif-ink)] text-[var(--bif-paper)] relative grain">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <img src={PRAKASH_IMG} alt="Prakash Rao" className="w-full aspect-[4/5] object-cover" />
          </div>
          <div className="md:col-span-7">
            <div className="overline text-[var(--bif-bronze)]">[ The Founder ]</div>
            <h2 className="font-display text-4xl md:text-6xl font-extrabold mt-5 leading-[0.95]">Meet Prakash Rao</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Master Certified Coach (ICF)", "International NLP Trainer", "Author", "Leadership Transformation Architect"].map((c) => (
                <span key={c} className="font-mono text-[10px] uppercase tracking-[0.18em] border border-white/20 text-white/80 px-3 py-2">{c}</span>
              ))}
            </div>
            <div className="mt-8 text-white/75 text-lg leading-relaxed space-y-5">
              <p>
                Prakash Rao is a globally recognized executive coach, leadership development expert and founder of Born In Flight. For over two decades, he has partnered with leaders, teams and organizations to unlock human potential, build high-performing cultures and create measurable business impact.
              </p>
              <p>
                As a Master Certified Coach (MCC), Prakash brings a rare combination of strategic business insight, coaching mastery and deep expertise in human behavior. His work integrates executive coaching, Neuro-Linguistic Programming (NLP), behavioral science and experiential learning to help leaders navigate complexity, influence with authenticity, and lead transformational change.
              </p>
              <p>
                Throughout his career, Prakash has coached thousands of senior leaders and designed leadership journeys that have impacted professionals across multiple industries and countries. He is also an International NLP Trainer, author of <em className="font-serif-display">Go On — Become the Athlete Within</em>, keynote speaker, and passionate advocate for the belief that sustainable performance begins with personal mastery.
              </p>
              <p>
                Beyond the boardroom, Prakash embodies the principles he teaches. A marathon runner, certified mountaineer, powerlifter and lifelong learner, he believes leadership is not defined by position but by the courage to continuously grow, adapt and elevate others. Every person is a &lsquo;Hero&rsquo; in their life — Prakash&rsquo;s quest is helping individuals discover the &lsquo;Hero&rsquo; in them and explore the &lsquo;Heroics&rsquo; they are capable of.
              </p>
            </div>
            <a href="https://www.linkedin.com/in/prakirao/" target="_blank" rel="noreferrer" data-testid="prakash-linkedin" className="inline-flex items-center gap-2 mt-10 btn-outline border-[var(--bif-paper)] text-[var(--bif-paper)] hover:bg-[var(--bif-paper)] hover:text-[var(--bif-ink)]">
              <Linkedin size={14} /> Follow Prakash on LinkedIn <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* FEATURED BOOK */}
      <section data-testid="featured-book" className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-5">
            <div className="overline text-[var(--bif-bronze)]">[ Featured Book ]</div>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold mt-5 leading-[0.95]">
              Go On &mdash; <span className="font-serif-display italic font-normal">Become the Athlete Within</span>
            </h2>
            <div className="mt-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[var(--bif-muted)]">
              <BookOpen size={14} /> By Prakash Rao · Available Worldwide
            </div>
          </div>
          <div className="md:col-span-7">
            <p className="text-lg text-[var(--bif-muted)] leading-relaxed">
              Success is not reserved for elite athletes — it&rsquo;s available to anyone willing to cultivate an athlete&rsquo;s mindset. In <em className="font-serif-display">Go On — Become the Athlete Within</em>, Prakash Rao shares powerful insights, practical tools and transformational stories that help readers build resilience, overcome self-imposed limits, embrace discomfort, and unlock sustainable peak performance in work and life.
            </p>
            <p className="text-lg text-[var(--bif-muted)] leading-relaxed mt-5">
              Whether you&rsquo;re a leader, entrepreneur, professional, student or someone seeking personal growth, this book offers a practical roadmap to becoming the strongest version of yourself.
            </p>
            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-px bg-[var(--bif-line)] border hairline">
              {BOOK_LINKS.map((b) => (
                <a key={b.l} href={b.u} target="_blank" rel="noreferrer" data-testid={`buy-${b.l.replace(/\s+/g, "-").toLowerCase()}`} className="bg-[var(--bif-paper)] p-5 flex items-center justify-between hover:bg-[var(--bif-cream)] transition-colors group">
                  <span className="font-mono text-xs uppercase tracking-[0.18em]">{b.l}</span>
                  <ArrowUpRight size={14} className="text-[var(--bif-bronze)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
