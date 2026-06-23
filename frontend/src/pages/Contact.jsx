import { useState } from "react";
import { ArrowUpRight, Check, Phone, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";

const INTERESTS = [
  "Leadership Development",
  "Team Effectiveness",
  "Coaching",
  "Organizational Development",
  "NLP Certification",
  "Assessment & Development Centers",
  "Other",
];

const ADDRESS = "#653, Akshaya, 1st floor, 12th Main, 1st Block, 3rd Stage, Basaveshwarnagar, Bangalore – 560079";
const MAPS_EMBED = `https://www.google.com/maps?q=${encodeURIComponent("Basaveshwarnagar, Bangalore 560079")}&output=embed`;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "", interest: "", message: "" });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill name, email and message.");
      return;
    }
    setSending(true);
    try {
      await api.post("/leads", form);
      setDone(true);
      toast.success("Thank you. We'll reach out within one business day.");
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Could not submit. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div data-testid="contact-page">
      <section className="pt-16 md:pt-24 pb-12">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="overline text-[var(--bif-bronze)]">[ Start a Conversation ]</div>
          <h1 data-testid="contact-headline" className="font-display font-extrabold mt-6 leading-[0.95] tracking-tight text-[clamp(2.2rem,5.5vw,5rem)] max-w-5xl">
            Every Transformation Starts With a <span className="font-serif-display italic font-normal text-[var(--bif-bronze)]">Conversation</span>.
          </h1>
          <p data-testid="contact-subhead" className="mt-8 font-display text-xl md:text-2xl font-semibold max-w-3xl">
            Your Next Breakthrough Starts Here. Let&rsquo;s talk capability.
          </p>
          <p className="mt-6 max-w-3xl text-lg text-[var(--bif-muted)] leading-relaxed">
            Whether you&rsquo;re looking to develop leaders, strengthen teams, or transform organizational capability, we&rsquo;d love to understand your goals. Share your challenge with us, and we&rsquo;ll set up a 30-minute discovery call — no pitch deck, just clarity.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-16">
          <div className="md:col-span-5">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="border hairline p-2 mt-1"><Mail size={16} /></div>
                <div>
                  <div className="overline text-[var(--bif-muted)]">Email</div>
                  <a href="mailto:info@borninflight.com" data-testid="contact-email" className="font-display text-xl md:text-2xl mt-1 inline-block hover:text-[var(--bif-bronze)]">info@borninflight.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="border hairline p-2 mt-1"><Phone size={16} /></div>
                <div>
                  <div className="overline text-[var(--bif-muted)]">Phone</div>
                  <a href="tel:+918043943531" data-testid="contact-phone" className="font-display text-xl md:text-2xl mt-1 inline-block hover:text-[var(--bif-bronze)]">+91 80 4394 3531</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="border hairline p-2 mt-1"><MapPin size={16} /></div>
                <div>
                  <div className="overline text-[var(--bif-muted)]">Address</div>
                  <p data-testid="contact-address" className="text-lg mt-1 leading-relaxed">{ADDRESS}</p>
                </div>
              </div>

              <div className="divider-line" />
              <div>
                <div className="overline text-[var(--bif-muted)] mb-3">Connect</div>
                <div className="flex gap-5 font-mono text-xs uppercase tracking-[0.2em]">
                  <a href="https://www.linkedin.com/in/borninflight/" target="_blank" rel="noreferrer" className="hover:text-[var(--bif-bronze)]" data-testid="contact-linkedin">LinkedIn</a>
                  <a href="https://www.facebook.com/borninflight/" target="_blank" rel="noreferrer" className="hover:text-[var(--bif-bronze)]">Facebook</a>
                  <a href="https://www.instagram.com/borninflight/" target="_blank" rel="noreferrer" className="hover:text-[var(--bif-bronze)]">Instagram</a>
                  <a href="https://www.youtube.com/@borninflight1255" target="_blank" rel="noreferrer" className="hover:text-[var(--bif-bronze)]">YouTube</a>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div data-testid="contact-map" className="mt-10 border hairline overflow-hidden">
              <iframe
                title="Born In Flight office location"
                src={MAPS_EMBED}
                width="100%"
                height="280"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0 }}
              />
            </div>
          </div>

          <div className="md:col-span-7 md:col-start-7">
            <div className="border hairline bg-[var(--bif-paper)] p-8 md:p-12">
              {done ? (
                <div data-testid="contact-success" className="py-16 text-center">
                  <div className="inline-flex items-center justify-center h-14 w-14 border-2 border-[var(--bif-bronze)] text-[var(--bif-bronze)]">
                    <Check size={28} />
                  </div>
                  <h2 className="font-display text-3xl font-bold mt-8">Message received.</h2>
                  <p className="mt-4 text-[var(--bif-muted)] max-w-md mx-auto">
                    Thank you for reaching out. A Born In Flight partner will get back to you within one business day.
                  </p>
                </div>
              ) : (
                <form data-testid="contact-form" onSubmit={onSubmit} className="space-y-7">
                  <div className="grid md:grid-cols-2 gap-7">
                    <Field label="Name *" value={form.name} onChange={(v) => setForm({ ...form, name: v })} testId="contact-name" />
                    <Field label="Email *" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} testId="contact-email-input" />
                    <Field label="Company" value={form.company} onChange={(v) => setForm({ ...form, company: v })} testId="contact-company" />
                    <Field label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} testId="contact-phone-input" />
                  </div>

                  <div>
                    <div className="overline text-[var(--bif-muted)] mb-3">I&rsquo;m looking for</div>
                    <select
                      data-testid="contact-interest"
                      value={form.interest}
                      onChange={(e) => setForm({ ...form, interest: e.target.value })}
                      className="input"
                    >
                      <option value="">Select an area…</option>
                      {INTERESTS.map((i) => (
                        <option key={i} value={i}>{i}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="overline text-[var(--bif-muted)]">Tell us about your challenge *</label>
                    <textarea
                      data-testid="contact-message"
                      className="input mt-3 resize-none"
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Share a little about your priorities, objectives, or capability needs."
                    />
                  </div>

                  <button type="submit" disabled={sending} data-testid="contact-submit" className="btn-primary disabled:opacity-60">
                    {sending ? "Sending…" : "Send Message"} <ArrowUpRight size={14} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", testId }) {
  return (
    <div>
      <label className="overline text-[var(--bif-muted)]">{label}</label>
      <input
        data-testid={testId}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input mt-2"
      />
    </div>
  );
}
