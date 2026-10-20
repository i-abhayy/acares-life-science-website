import { useRef, type ReactNode } from "react";

/** Tilts its content toward the pointer with a soft glare. Disabled for reduced motion and touch. */
export function TiltCard({ children, className = "", max = 8, glare = "soft" }: { children: ReactNode; className?: string; max?: number; glare?: "soft" | "sheen" }) {
  const ref = useRef<HTMLDivElement>(null);

  function move(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(0.5 - y) * max}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * max}deg`);
    el.style.setProperty("--gx", `${x * 100}%`);
    el.style.setProperty("--gy", `${y * 100}%`);
    el.style.setProperty("--go", "1");
  }

  function leave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--go", "0");
  }

  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={leave} className={`tilt-card ${className}`}>
      {children}
      <span aria-hidden className={glare === "sheen" ? "tilt-glare tilt-glare-sheen" : "tilt-glare"} />
    </div>
  );
}
