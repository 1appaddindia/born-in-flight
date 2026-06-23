import { Link } from "react-router-dom";
import { ArrowUpRight, Award, Newspaper, Video } from "lucide-react";

const FEATURES = [
  {
    id: "asia-business-outlook",
    type: "award",
    year: "2023",
    publisher: "Asia Business Outlook",
    title: "Top 10 Most Promising Executive Coaches in India 2023",
    summary: "Born In Flight recognized among the top 10 executive coaches in India for empowering leaders to soar to new heights.",
    href: "https://www.asiabusinessoutlook.com/hr/vendor/born-in-flight-empowering-leaders-to-soar-to-new-heights-cid-2060.html",
  },
  {
    id: "vygr-founder-life",
    type: "feature",
    year: "2023",
    publisher: "VYGR · Founder Life",
    title: "Prakash Rao Leads The Leaders — Putting Performance at the Centre of Transformation",
    summary: "Feature on Prakash Rao's philosophy of placing performance front, right and centre of every transformation engagement.",
    href: "https://www.asiabusinessoutlook.com/hr/vendor/born-in-flight-empowering-leaders-to-soar-to-new-heights-cid-2060.html",
  },
  {
    id: "vygr-brand-story",
    type: "feature",
    year: "2023",
    publisher: "VYGR · Brand Story",
    title: "Born In Flight Goes Above And Beyond With Coaching India's Future Leaders",
    summary: "A deep-dive into how Born In Flight is shaping India's next generation of leadership through coaching and immersive development.",
    href: "https://www.linkedin.com/posts/vygrofficial_born-in-flight-goes-above-and-beyond-with-activity-7058683571066011648-eP6Q",
  },
  {
    id: "world-hrd-congress",
    type: "award",
    year: "Feb 2023",
    publisher: "31st World HRD Congress · Times Ascent",
    title: "100 Most Influential Coaches in India",
    summary: "Prakash Rao felicitated at the 31st World HRD Congress as one of the 100 most influential coaches in India.",
    href: "https://www.linkedin.com/posts/prakirao_thankyou-leaders-india-activity-7031638599020290048-EbwX",
  },
  {
    id: "digital-revolution-seminar",
    type: "video",
    year: "Seminar",
    publisher: "YouTube",
    title: "Invention & Interference of Digital Revolution in Workplace Performance",
    summary: "Keynote on how the digital revolution is reshaping workplace performance — and what leaders must do about it.",
    href: "https://youtu.be/3rZhxDwsi0A",
  },
];

const SOCIALS = [
  { l: "LinkedIn", u: "https://www.linkedin.com/in/borninflight/" },
  { l: "YouTube", u: "https://www.youtube.com/@borninflight1255" },
  { l: "Instagram", u: "https://www.instagram.com/borninflight/" },
  { l: "Facebook", u: "https://www.facebook.com/borninflight/" },
];

function IconFor({ type }) {
  if (type === "award") return <Award size={16} />;
  if (type === "video") return <Video size={16} />;
  return <Newspaper size={16} />;
}

export default function Media() {
  return (
    <div data-testid="media-page">
      <section className="pt-16 md:pt-24 pb-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="overline text-[var(--bif-bronze)]">[ In the Media ]</div>
          <h1 className="font-display font-extrabold mt-6 leading-[0.95] tracking-tight text-[clamp(2.4rem,6vw,5.5rem)] max-w-5xl">
            Awards, features and <span className="font-serif-display italic font-normal text-[var(--bif-bronze)]">conversations</span> shaping our work.
          </h1>
          <p className="mt-10 max-w-3xl text-lg md:text-xl text-[var(--bif-muted)] leading-relaxed">
            Over the years, Prakash Rao and Born In Flight have been featured by respected publications and recognized by leading industry bodies for advancing leadership excellence, executive coaching and organizational transformation. Discover the stories, conversations and recognitions that continue to shape our journey.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 border-y hairline">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="border-t hairline">
            {FEATURES.map((f, idx) => (
              <a
                key={f.id}
                href={f.href}
                target="_blank"
                rel="noreferrer"
                data-testid={`media-${f.id}`}
                className="grid md:grid-cols-12 gap-6 border-b hairline py-8 md:py-10 hover:bg-[var(--bif-cream)] transition-colors px-3 -mx-3 group"
              >
                <div className="md:col-span-1 font-mono text-xs tracking-[0.22em] text-[var(--bif-muted)]">/ {String(idx + 1).padStart(2, "0")}</div>
                <div className="md:col-span-2">
                  <div className="inline-flex items-center gap-2 border hairline px-3 py-1.5 text-[var(--bif-bronze)]">
                    <IconFor type={f.type} />
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em]">{f.type}</span>
                  </div>
                  <div className="mt-3 font-mono text-xs text-[var(--bif-muted)] uppercase tracking-[0.18em]">{f.year}</div>
                </div>
                <div className="md:col-span-3">
                  <div className="overline text-[var(--bif-muted)]">Publisher</div>
                  <div className="font-display text-lg font-bold mt-2">{f.publisher}</div>
                </div>
                <div className="md:col-span-5">
                  <h3 className="font-display text-xl md:text-2xl font-bold leading-tight">{f.title}</h3>
                  <p className="mt-3 text-[var(--bif-muted)] text-sm leading-relaxed">{f.summary}</p>
                </div>
                <div className="md:col-span-1 flex md:justify-end items-start">
                  <span className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.18em] text-[var(--bif-ink)] group-hover:text-[var(--bif-bronze)] transition-colors">
                    Read <ArrowUpRight size={14} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-6">
              <div className="overline text-[var(--bif-bronze)]">[ Connect ]</div>
              <h2 className="font-display text-3xl md:text-5xl font-bold mt-5 leading-[1.05]">
                Follow our work in <span className="font-serif-display italic font-normal">real time</span>.
              </h2>
              <p className="mt-5 text-[var(--bif-muted)] leading-relaxed max-w-md">
                Behind-the-scenes from workshops, frameworks-in-progress, and Prakash&rsquo;s weekly notes on leadership, coaching and performance.
              </p>
            </div>
            <div className="md:col-span-6">
              <div className="grid grid-cols-2 gap-px bg-[var(--bif-line)] border hairline">
                {SOCIALS.map((s) => (
                  <a key={s.l} href={s.u} target="_blank" rel="noreferrer" data-testid={`social-${s.l.toLowerCase()}`} className="bg-[var(--bif-paper)] p-7 flex items-center justify-between hover:bg-[var(--bif-cream)] transition-colors group">
                    <span className="font-display text-2xl font-bold">{s.l}</span>
                    <ArrowUpRight size={18} className="text-[var(--bif-bronze)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[var(--bif-ink)] text-[var(--bif-paper)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-8 items-center">
          <h2 className="md:col-span-8 font-display text-3xl md:text-5xl font-extrabold leading-tight">
            Writing about leadership, coaching or HRD? <span className="font-serif-display italic font-normal text-[var(--bif-bronze)]">Let&rsquo;s talk.</span>
          </h2>
          <div className="md:col-span-4 md:text-right">
            <Link to="/contact" className="btn-outline border-[var(--bif-paper)] text-[var(--bif-paper)] hover:bg-[var(--bif-bronze)] hover:border-[var(--bif-bronze)]" data-testid="media-final-cta">
              Reach Out <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
