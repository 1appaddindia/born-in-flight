import { Compass, Target, Map, Flag, TrendingUp } from "lucide-react";

/*
  Positions are computed to sit ON the bronze curve path below.
  Curve: M 40 380 C 240 380, 340 340, 500 250  S 800 100, 1080 30
  Sampled at t = 0.25 and 0.75 of each cubic segment to space circles evenly.
*/
const STEPS = [
  { k: "01", t: "Discover",  d: "Understand your business, people and strategic priorities.",                          Icon: Compass,     x: 14.5, y: 62 },
  { k: "02", t: "Diagnose",  d: "Identify capability gaps, behavioural patterns and opportunities.",                   Icon: Target,      x: 32.4, y: 51 },
  { k: "03", t: "Design",    d: "Co-create a learning journey aligned to business outcomes.",                          Icon: Map,         x: 51.6, y: 31 },
  { k: "04", t: "Deliver",   d: "Create transformational learning through coaching and experiential practice.",        Icon: Flag,        x: 74.5, y: 14 },
  { k: "05", t: "Drive",     d: "Embed lasting behavioural change through reinforcement, coaching and measurement.",   Icon: TrendingUp,  x: 90,   y: 5  },
];

export default function EngagementInfographic() {
  return (
    <div data-testid="engagement-infographic" className="relative">
      {/* DESKTOP — ascending curve journey */}
      <div className="hidden lg:block relative" style={{ height: 620 }}>
        <svg viewBox="0 0 1200 600" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Mountain silhouette */}
          <path
            d="M 780 260 L 870 130 L 925 180 L 990 100 L 1055 160 L 1110 110 L 1200 160 L 1200 380 L 780 380 Z"
            fill="var(--bif-line)"
            opacity="0.32"
          />
          {/* Airplane trail (dashed loop) */}
          <path
            d="M 540 50 Q 700 10 880 35 T 1140 12"
            stroke="var(--bif-muted)"
            strokeWidth="1.2"
            strokeDasharray="5 6"
            fill="none"
            opacity="0.5"
          />
          {/* Plane silhouette */}
          <g transform="translate(1148 10) rotate(-24)" opacity="0.65">
            <path d="M 0 0 L 18 -3 L 22 -1 L 18 1 L 14 4 L 6 4 L 4 8 L 1 8 L 2 4 L -4 4 L -6 6 L -8 6 L -6 2 L -8 -2 L -6 -2 L -4 -4 L 2 -4 L 4 -8 L 7 -8 L 6 -4 Z" fill="var(--bif-muted)" />
          </g>
          {/* Main ascending bronze curve — circles sit on this path */}
          <path
            d="M 40 380 C 240 380, 340 340, 500 250 S 800 100, 1080 30"
            stroke="var(--bif-bronze)"
            strokeWidth="2.6"
            fill="none"
            strokeLinecap="round"
          />
          {/* Arrowhead at end */}
          <g transform="translate(1080 30) rotate(-22)">
            <path d="M 0 0 L -14 -6 M 0 0 L -14 6" stroke="var(--bif-bronze)" strokeWidth="2.6" fill="none" strokeLinecap="round" />
          </g>
        </svg>

        {/* Nodes sit ON the curve; labels go below each circle */}
        {STEPS.map((s) => (
          <div
            key={s.k}
            data-testid={`engagement-step-${s.k}`}
            className="absolute"
            style={{ left: `${s.x}%`, top: `${s.y}%`, transform: "translate(-50%, -40px)", width: 210 }}
          >
            <div className="flex flex-col items-center">
              <div className="h-20 w-20 rounded-full bg-[var(--bif-paper)] border border-[var(--bif-bronze)]/40 flex items-center justify-center shadow-[0_8px_24px_rgba(11,18,32,0.08)] relative z-10">
                <s.Icon size={28} className="text-[var(--bif-ink)]" strokeWidth={1.6} />
              </div>
              <div className="mt-4 text-center">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--bif-bronze)]">/ {s.k}</div>
                <h3 className="font-display text-2xl font-bold mt-1.5 leading-tight">{s.t}</h3>
                <p className="text-[var(--bif-muted)] text-sm mt-2 leading-snug">{s.d}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MOBILE / TABLET — stacked vertical timeline */}
      <div className="lg:hidden relative pl-14">
        <div className="absolute left-7 top-3 bottom-3 w-px bg-[var(--bif-bronze)]" />
        <div className="space-y-10">
          {STEPS.map((s) => (
            <div key={s.k} className="relative" data-testid={`engagement-step-m-${s.k}`}>
              <div className="absolute -left-14 top-0 h-14 w-14 rounded-full bg-[var(--bif-paper)] border border-[var(--bif-bronze)]/50 flex items-center justify-center">
                <s.Icon size={20} className="text-[var(--bif-ink)]" strokeWidth={1.6} />
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--bif-bronze)]">/ {s.k}</div>
              <h3 className="font-display text-2xl font-bold mt-1.5 leading-tight">{s.t}</h3>
              <p className="text-[var(--bif-muted)] mt-2 leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
