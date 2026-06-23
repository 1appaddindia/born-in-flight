import { Mountain, Target, MessageCircle, Puzzle, BarChart3, Users } from "lucide-react";

// 6 nodes around a center — hexagon positions (angle 0 starts at top, clockwise)
const NODES = [
  { k: "01", t: "Experiential Learning", d: "Activity-led, immersive experiences that turn learning into lasting behaviour change.", Icon: Mountain, angle: -90 },
  { k: "02", t: "Business-Relevant", d: "Every engagement is anchored to a strategic business outcome — not generic content.", Icon: Target, angle: -30 },
  { k: "03", t: "Coaching-Led Facilitation", d: "Senior coach-facilitators who pull insight from the room rather than push frameworks at it.", Icon: MessageCircle, angle: 30 },
  { k: "04", t: "Customised Solutions", d: "Co-created learning journeys tailored to your business priorities, leadership challenges and desired outcomes.", Icon: Puzzle, angle: 90 },
  { k: "05", t: "Measurable Outcomes", d: "Behavioural shifts, business impact and sustained capability tracked beyond the classroom.", Icon: BarChart3, angle: 150 },
  { k: "06", t: "Senior Facilitator Network", d: "A curated network of experienced practitioners with deep industry and leadership expertise.", Icon: Users, angle: 210 },
];

// Convert polar to {left,top} percentages within container (ellipse radii)
function pos(angleDeg, rx = 38, ry = 36) {
  const rad = (angleDeg * Math.PI) / 180;
  return { left: 50 + rx * Math.cos(rad), top: 50 + ry * Math.sin(rad) };
}

export default function DifferenceInfographic() {
  const placed = NODES.map((n) => ({ ...n, ...pos(n.angle) }));
  const cx = 50, cy = 50;

  return (
    <div data-testid="difference-infographic">
      {/* DESKTOP — orbital web */}
      <div className="hidden lg:block relative mx-auto" style={{ height: 720, maxWidth: 1100 }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Lines from every node to every other node (web) */}
          {placed.map((a, i) =>
            placed.slice(i + 1).map((b, j) => (
              <line
                key={`${i}-${j}`}
                x1={a.left} y1={a.top} x2={b.left} y2={b.top}
                stroke="var(--bif-bronze)"
                strokeWidth="0.12"
                opacity="0.35"
                vectorEffect="non-scaling-stroke"
              />
            ))
          )}
          {/* Lines from each node to center (radial) */}
          {placed.map((a, i) => (
            <line
              key={`r-${i}`}
              x1={a.left} y1={a.top} x2={cx} y2={cy}
              stroke="var(--bif-bronze)"
              strokeWidth="0.18"
              opacity="0.55"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        {/* Center hub */}
        <div className="absolute" style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
          <div className="h-40 w-40 rounded-full bg-[var(--bif-ink)] text-[var(--bif-paper)] flex flex-col items-center justify-center text-center px-4 shadow-[0_20px_50px_rgba(11,18,32,0.18)]">
            <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--bif-bronze)]">Born In Flight</div>
            <div className="font-serif-display italic text-2xl font-semibold mt-1 leading-tight">Difference</div>
          </div>
        </div>

        {/* Satellite nodes */}
        {placed.map((n) => (
          <div
            key={n.k}
            data-testid={`difference-node-${n.k}`}
            className="absolute"
            style={{ left: `${n.left}%`, top: `${n.top}%`, transform: "translate(-50%, -50%)", width: 230 }}
          >
            <div className="flex flex-col items-center">
              <div className="h-20 w-20 rounded-full bg-[var(--bif-paper)] border border-[var(--bif-bronze)]/40 flex items-center justify-center shadow-[0_8px_24px_rgba(11,18,32,0.08)]">
                <n.Icon size={26} className="text-[var(--bif-ink)]" strokeWidth={1.6} />
              </div>
              <div className="mt-3 text-center">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--bif-bronze)]">/ {n.k}</div>
                <h3 className="font-display text-lg font-bold mt-1 leading-tight">{n.t}</h3>
                <p className="text-[var(--bif-muted)] text-xs mt-1.5 leading-snug">{n.d}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MOBILE / TABLET — clean grid */}
      <div className="lg:hidden">
        <div className="text-center mb-10">
          <div className="inline-flex flex-col items-center justify-center bg-[var(--bif-ink)] text-[var(--bif-paper)] rounded-full h-32 w-32">
            <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--bif-bronze)]">Born In Flight</div>
            <div className="font-serif-display italic text-xl font-semibold leading-tight">Difference</div>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-px bg-[var(--bif-line)] border hairline">
          {NODES.map((n) => (
            <div key={n.k} data-testid={`difference-node-m-${n.k}`} className="bg-[var(--bif-paper)] p-6 flex gap-4 items-start">
              <div className="h-12 w-12 rounded-full bg-[var(--bif-cream)] border border-[var(--bif-bronze)]/40 flex items-center justify-center shrink-0">
                <n.Icon size={18} className="text-[var(--bif-ink)]" strokeWidth={1.6} />
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--bif-bronze)]">/ {n.k}</div>
                <h3 className="font-display text-lg font-bold mt-1 leading-tight">{n.t}</h3>
                <p className="text-[var(--bif-muted)] text-sm mt-2 leading-relaxed">{n.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
