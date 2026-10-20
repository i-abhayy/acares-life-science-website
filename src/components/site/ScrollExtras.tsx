import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function ScrollExtras() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? window.scrollY / h : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, []);
  return (
    <>
      <div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-brand" style={{ transform: `scaleX(${p})` }} />
      <button
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-navy text-navy-foreground shadow-lift transition-all duration-300 hover:-translate-y-1 hover:bg-primary ${p > 0.08 ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </>
  );
}
