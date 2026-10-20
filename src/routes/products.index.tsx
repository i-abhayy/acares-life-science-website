import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight, Info, Maximize2, Search, SearchX } from "lucide-react";
import { useMemo, useState } from "react";
import productsImg from "@/assets/inner-products.jpg";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { TiltCard } from "@/components/site/TiltCard";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { CATEGORIES, PRODUCTS, type Product } from "@/lib/site";

type Cat = (typeof CATEGORIES)[number];

export const Route = createFileRoute("/products/")({
  validateSearch: (s: Record<string, unknown>): { category?: Cat } =>
    CATEGORIES.includes(s["category"] as Cat) && s["category"] !== "All" ? { category: s["category"] as Cat } : {},
  head: () => ({
    meta: [
      { title: "Our Products — ACARES Life Science Pvt. Ltd." },
      { name: "description", content: "The ACARES portfolio: Divocare OD 500, Leviac-500, Calcam-K2, Oxicare-600 and Oxicare-450." },
      { property: "og:title", content: "ACARES Product Portfolio" },
      { property: "og:description", content: "Browse the ACARES Life Science product range." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Products,
});

function Products() {
  const { category } = Route.useSearch();
  const navigate = Route.useNavigate();
  const cat: Cat = category ?? "All";
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<number | null>(null);
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return PRODUCTS.filter((p) => (cat === "All" || p.category === cat) && (!s || `${p.name} ${p.composition}`.toLowerCase().includes(s)));
  }, [q, cat]);
  const setCat = (c: Cat) => navigate({ search: c === "All" ? {} : { category: c }, replace: true, resetScroll: false });

  return (
    <>
      <PageHero eyebrow="Our Products" title={<>An art-directed <span className="text-gradient-brand">portfolio</span></>} image={productsImg} imageAlt="Unbranded medicine boxes and blister strips on studio pedestals">
        Explore the medicines in the ACARES range. Product information is for healthcare professionals and general reference only.
      </PageHero>

      <section className="container-site py-14">
        <div className="sticky top-[72px] z-20 -mx-2 flex flex-col gap-4 rounded-2xl bg-background/85 p-2 backdrop-blur-md md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <label htmlFor="psearch" className="sr-only">Search products</label>
            <input id="psearch" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or composition" className="field !rounded-full !pl-10" />
          </div>
          <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${cat === c ? "bg-navy text-navy-foreground shadow-soft" : "border border-border bg-background text-navy hover:border-cyan"}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">{list.length} product{list.length === 1 ? "" : "s"}</p>

        {list.length ? (
          <ul className="mt-4 grid auto-rows-auto gap-5 md:grid-cols-6">
            {list.map((p, k) => (
              <Reveal as="li" key={p.slug} delay={Math.min(k, 5) * 70} className={k === 0 ? "md:col-span-4 md:row-span-2" : k < 3 ? "md:col-span-2" : "md:col-span-3"}>
                <TiltCard className="h-full rounded-[1.75rem]" glare="sheen">
                  <Tile p={p} big={k === 0} onOpen={() => setOpen(k)} />
                </TiltCard>
              </Reveal>
            ))}
          </ul>
        ) : (
          <Reveal className="mt-6 flex flex-col items-center rounded-3xl border border-dashed border-primary/25 bg-ice px-6 py-16 text-center">
            <SearchX className="h-10 w-10 text-primary" />
            <h2 className="mt-4 text-xl font-bold text-navy">No products match your search</h2>
            <p className="mt-2 text-muted-foreground">Try a different name or clear the filters.</p>
            <button type="button" onClick={() => { setQ(""); setCat("All"); }} className="btn-outline mt-6">Clear filters</button>
          </Reveal>
        )}
      </section>

      <ProductModal list={list} index={open} setIndex={setOpen} />
    </>
  );
}

function Tile({ p, big, onOpen }: { p: Product; big: boolean; onOpen: () => void }) {
  return (
    <button type="button" onClick={onOpen} className="group relative flex h-full w-full flex-col overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-ice to-accent p-3 text-left transition-all duration-500 hover:-translate-y-1 hover:shadow-lift focus-visible:shadow-lift">
      <span className={`relative grid flex-1 place-items-center overflow-hidden rounded-2xl bg-background ${big ? "min-h-[320px] md:min-h-[440px]" : "aspect-[4/3]"}`}>
        <img src={p.image} alt={`${p.name} product poster`} width={p.imageW} height={p.imageH} loading="lazy" className="absolute inset-0 h-full w-full object-contain p-2 transition-transform duration-700 group-hover:scale-[1.04]" />
        <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-navy/80 text-navy-foreground opacity-0 transition-opacity group-hover:opacity-100"><Maximize2 className="h-4 w-4" /></span>
      </span>
      <span className="flex items-end justify-between gap-3 px-2 pb-1 pt-4">
        <span>
          <span className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-health">{p.category}</span>
          <span className={`block font-display font-bold text-navy ${big ? "text-2xl md:text-3xl" : "text-lg"}`}>{p.name}</span>
          {big && <span className="mt-1 block text-sm text-muted-foreground">{p.composition}</span>}
        </span>
        <ArrowRight className="mb-1 h-5 w-5 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
      </span>
    </button>
  );
}

function ProductModal({ list, index, setIndex }: { list: Product[]; index: number | null; setIndex: (i: number | null) => void }) {
  const p = index !== null ? list[index] : undefined;
  const go = (d: number) => index !== null && setIndex((index + d + list.length) % list.length);
  return (
    <Dialog open={!!p} onOpenChange={(o) => !o && setIndex(null)}>
      <DialogContent className="max-h-[92vh] max-w-5xl overflow-y-auto rounded-3xl p-0 sm:rounded-3xl" onKeyDown={(e) => { if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); }}>
        {p && (
          <div className="grid md:grid-cols-[1.4fr_1fr]">
            <div className="grid place-items-center bg-ice p-4 md:p-6">
              <img src={p.image} alt={`${p.name} product poster`} width={p.imageW} height={p.imageH} className="max-h-[60vh] w-full rounded-2xl bg-background object-contain" />
            </div>
            <div className="flex flex-col p-6 md:p-8">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-health">{p.category}</span>
              <DialogTitle className="mt-1 font-display text-3xl font-bold text-navy">{p.name}</DialogTitle>
              <DialogDescription className="mt-2 text-muted-foreground">{p.composition}</DialogDescription>
              <dl className="mt-5 divide-y divide-border border-y border-border text-sm">
                <div className="flex justify-between py-3"><dt className="text-muted-foreground">Pack (as shown)</dt><dd className="font-semibold text-navy">{p.pack}</dd></div>
                <div className="flex justify-between py-3"><dt className="text-muted-foreground">Type</dt><dd className="font-semibold text-navy">{p.prescription ? "Prescription (Rx)" : "Supplement"}</dd></div>
              </dl>
              <p className="mt-4 flex gap-2 text-xs text-muted-foreground"><Info className="h-4 w-4 shrink-0 text-primary" />For information only. Consult a registered medical practitioner.</p>
              <Link to="/products/$slug" params={{ slug: p.slug }} className="btn-primary mt-6 justify-center">Full product page <ArrowRight className="h-4 w-4" /></Link>
              {list.length > 1 && (
                <div className="mt-auto flex items-center justify-between pt-6">
                  <button type="button" onClick={() => go(-1)} className="icon-btn" aria-label="Previous product"><ChevronLeft className="h-5 w-5" /></button>
                  <span className="text-sm font-semibold tabular-nums text-navy">{(index ?? 0) + 1} / {list.length}</span>
                  <button type="button" onClick={() => go(1)} className="icon-btn" aria-label="Next product"><ChevronRight className="h-5 w-5" /></button>
                </div>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
