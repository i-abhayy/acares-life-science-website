import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { PRODUCTS } from "@/lib/site";

/** Featured product panel + thumbnail rail with prev/next and arrow-key support. */
export function ProductShowcase() {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((x) => (x + d + PRODUCTS.length) % PRODUCTS.length);
  const p = PRODUCTS[i]!;

  return (
    <div
      className="grid gap-6 lg:grid-cols-[1.5fr_1fr]"
      onKeyDown={(e) => { if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); }}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured products"
    >
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-ice via-background to-accent p-5 shadow-lift md:p-8">
        <div aria-hidden className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-cyan/20 blur-3xl" />
        <div className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-2xl bg-background">
          {PRODUCTS.map((x, k) => (
            <img
              key={x.slug}
              src={x.image}
              alt={`${x.name} product poster`}
              width={x.imageW}
              height={x.imageH}
              loading={k === 0 ? "eager" : "lazy"}
              className={`absolute inset-0 h-full w-full object-contain p-2 transition-all duration-700 ${k === i ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
            />
          ))}
        </div>
        <div className="relative mt-6 flex flex-wrap items-end justify-between gap-4" aria-live="polite">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-health">{p.category}</span>
            <h3 className="mt-1 text-3xl font-bold text-navy">{p.name}</h3>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">{p.composition}</p>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => go(-1)} aria-label="Previous product" className="icon-btn"><ChevronLeft className="h-5 w-5" /></button>
            <span className="w-14 text-center text-sm font-semibold tabular-nums text-navy">{String(i + 1).padStart(2, "0")} / {String(PRODUCTS.length).padStart(2, "0")}</span>
            <button type="button" onClick={() => go(1)} aria-label="Next product" className="icon-btn"><ChevronRight className="h-5 w-5" /></button>
          </div>
        </div>
        <Link to="/products/$slug" params={{ slug: p.slug }} className="relative mt-5 inline-flex items-center gap-1.5 font-semibold text-primary hover:gap-2.5 transition-all">View product details <ArrowRight className="h-4 w-4" /></Link>
      </div>

      <ul className="grid grid-cols-2 content-start gap-3 sm:grid-cols-3 lg:grid-cols-1 lg:gap-2.5">
        {PRODUCTS.map((x, k) => (
          <li key={x.slug}>
            <button
              type="button"
              onClick={() => setI(k)}
              aria-current={k === i}
              className={`group flex w-full items-center gap-3 rounded-2xl border p-2.5 text-left transition-all duration-300 ${k === i ? "border-cyan bg-background shadow-soft" : "border-transparent bg-background/60 hover:border-primary/20 hover:bg-background"}`}
            >
              <span className="grid h-16 w-20 shrink-0 place-items-center overflow-hidden rounded-xl bg-ice">
                <img src={x.image} alt="" width={x.imageW} height={x.imageH} loading="lazy" className="h-full w-full object-contain" />
              </span>
              <span className="min-w-0">
                <span className="block truncate font-display text-sm font-semibold text-navy">{x.name}</span>
                <span className="hidden text-xs text-muted-foreground sm:block">{x.category}</span>
              </span>
              <span className={`ml-auto hidden h-8 w-1 rounded-full transition-colors lg:block ${k === i ? "bg-gradient-brand" : "bg-transparent"}`} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
