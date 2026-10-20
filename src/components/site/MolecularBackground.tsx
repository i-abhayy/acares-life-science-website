const NODES: [number, number][] = [
  [80, 120], [210, 70], [320, 160], [190, 230], [420, 90], [520, 200], [640, 120], [760, 210], [880, 90], [980, 180], [1100, 110], [1050, 300], [700, 330], [380, 320],
];
const LINKS: [number, number][] = [[0,1],[1,2],[2,3],[3,0],[2,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[9,11],[7,12],[5,13],[13,3],[11,12]];

export function MolecularBackground({ dense = true }: { dense?: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="anim-glow absolute -right-32 -top-32 h-[34rem] w-[34rem] rounded-full bg-cyan/25 blur-3xl" />
      <div className="anim-glow absolute -bottom-40 -left-24 h-[28rem] w-[28rem] rounded-full bg-primary/15 blur-3xl" style={{ animationDelay: "-6s" }} />
      <svg className="absolute inset-x-0 top-10 h-[420px] w-full text-primary/30" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice">
        {LINKS.map(([a, b], i) => (
          <line key={i} className="anim-line" x1={NODES[a]![0]} y1={NODES[a]![1]} x2={NODES[b]![0]} y2={NODES[b]![1]} stroke="currentColor" strokeWidth="1.2" />
        ))}
        {NODES.map(([x, y], i) => (
          <circle key={i} className="anim-node text-cyan" cx={x} cy={y} r={i % 3 === 0 ? 5 : 3.5} fill="currentColor" style={{ animationDelay: `${i * 0.3}s` }} />
        ))}
      </svg>
      {dense && (
        <>
          {[["8%", "70%", 14], ["22%", "40%", 8], ["46%", "82%", 10], ["68%", "60%", 18], ["88%", "75%", 9], ["58%", "18%", 7]].map(([l, t, s], i) => (
            <span key={i} className="anim-drift absolute rounded-full border border-cyan/40 bg-background/40" style={{ left: l as string, top: t as string, width: (s as number) * 3, height: (s as number) * 3, animationDelay: `${-i * 1.7}s` }} />
          ))}
          <span className="anim-drift-x absolute left-[78%] top-[38%] h-5 w-12 rounded-full border border-primary/25 bg-gradient-to-r from-primary/15 to-cyan/15" />
          <span className="anim-drift-x absolute left-[12%] top-[22%] h-4 w-10 rotate-45 rounded-full border border-health/30 bg-health/10" style={{ animationDelay: "-5s" }} />
        </>
      )}
    </div>
  );
}
