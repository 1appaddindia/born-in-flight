import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const LOGO = "https://borninflight.com/wp-content/uploads/2021/02/Born-in-Flight-logo.png";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/framework", label: "Framework" },
  { to: "/programs", label: "Programs" },
  { to: "/success-stories", label: "Success Stories" },
  { to: "/media", label: "Media" },
  { to: "/contact", label: "Contact" },
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bif-paper)]">
      <header
        data-testid="site-header"
        className={`sticky top-0 z-50 border-b transition-all ${scrolled ? "bg-[var(--bif-paper)]/95 backdrop-blur hairline" : "bg-transparent border-transparent"}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-24">
          <Link to="/" data-testid="nav-logo" className="flex items-center gap-3">
            <img src={LOGO} alt="Born In Flight" className="h-12 md:h-14 w-auto" />
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                data-testid={`nav-link-${n.label.toLowerCase().replace(/\s+/g, "-")}`}
                className={({ isActive }) =>
                  `text-[12px] font-mono uppercase tracking-[0.18em] transition-colors whitespace-nowrap ${isActive ? "text-[var(--bif-bronze)]" : "text-[var(--bif-ink)] hover:text-[var(--bif-bronze)]"}`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          <Link to="/contact" data-testid="nav-cta" className="hidden xl:inline-flex btn-primary">
            Schedule a Conversation <ArrowUpRight size={14} />
          </Link>

          <button
            data-testid="mobile-menu-toggle"
            className="lg:hidden p-2 -mr-2"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {open && (
          <div data-testid="mobile-menu" className="lg:hidden border-t hairline bg-[var(--bif-paper)]">
            <div className="px-6 py-6 flex flex-col gap-5">
              {NAV.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  end={n.to === "/"}
                  data-testid={`mnav-link-${n.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className={({ isActive }) =>
                    `text-base font-mono uppercase tracking-[0.2em] ${isActive ? "text-[var(--bif-bronze)]" : "text-[var(--bif-ink)]"}`
                  }
                >
                  {n.label}
                </NavLink>
              ))}
              <Link to="/contact" data-testid="mnav-cta" className="btn-primary justify-center mt-2">
                Schedule a Conversation
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer data-testid="site-footer" className="bg-[var(--bif-ink)] text-[var(--bif-paper)] mt-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <div className="overline text-[var(--bif-bronze)]">[ Born In Flight ]</div>
          <h3 className="font-display text-3xl md:text-4xl font-bold mt-5 leading-tight">
            Let's build capability that creates measurable business impact.
          </h3>
          <Link to="/contact" data-testid="footer-cta" className="btn-outline mt-8 border-[var(--bif-paper)] text-[var(--bif-paper)] hover:bg-[var(--bif-paper)] hover:text-[var(--bif-ink)]">
            Schedule a Consultation <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="md:col-span-3">
          <div className="overline text-white/50">Navigate</div>
          <ul className="mt-5 space-y-3 font-mono text-sm">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-[var(--bif-bronze)] transition-colors">{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <div className="overline text-white/50">Reach</div>
          <ul className="mt-5 space-y-3 text-sm">
            <li><a href="mailto:info@borninflight.com" className="hover:text-[var(--bif-bronze)]">info@borninflight.com</a></li>
            <li><a href="tel:+918043943531" className="hover:text-[var(--bif-bronze)]">+91 80 4394 3531</a></li>
            <li className="text-white/70 leading-relaxed">#653, Akshaya, 1st floor, 12th Main, 1st Block, 3rd Stage, Basaveshwarnagar, Bangalore – 560079</li>
            <li className="flex gap-5 mt-4 font-mono text-xs uppercase tracking-[0.2em]">
              <a href="https://www.linkedin.com/in/borninflight/" target="_blank" rel="noreferrer" className="hover:text-[var(--bif-bronze)]">LinkedIn</a>
              <a href="https://www.facebook.com/borninflight/" target="_blank" rel="noreferrer" className="hover:text-[var(--bif-bronze)]">Facebook</a>
              <a href="https://www.instagram.com/borninflight/" target="_blank" rel="noreferrer" className="hover:text-[var(--bif-bronze)]">Instagram</a>
              <a href="https://www.youtube.com/@borninflight1255" target="_blank" rel="noreferrer" className="hover:text-[var(--bif-bronze)]">YouTube</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-mono uppercase tracking-[0.18em] text-white/50">
          <span>© {new Date().getFullYear()} Born In Flight · All rights reserved</span>
          <span>Change · Breakthrough · Transformation</span>
        </div>
      </div>
    </footer>
  );
}
