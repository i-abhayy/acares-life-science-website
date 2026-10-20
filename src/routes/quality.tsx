import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import qualityImg from "@/assets/inner-quality.jpg";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { MISSION, VISION } from "@/lib/site";

export const Route = createFileRoute("/quality")({
  head: () => ({
    meta: [
      { title: "Quality — ACARES Life Science Pvt. Ltd." },
      { name: "description", content: "Quality at ACARES Life Science: high quality, safe and effective products, delivered in a quality-conscious manner." },
      { property: "og:title", content: "Quality at ACARES" },
      { property: "og:description", content: "High quality, safe and effective products." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Quality,
});

const PILLARS = [
  { t: "Quality, safety, efficacy", d: MISSION[0] },
  { t: "People & environment", d: MISSION[1] },
  { t: "Manufacturing excellence", d: MISSION[3] },
  { t: "Health, quality & safety", d: VISION[2] },
];

function Quality() {
  return (
    <>
      <PageHero eyebrow="Quality" title={<>Quality-conscious, <span className="text-gradient-brand">by principle</span></>} image={qualityImg} imageAlt="Gloved hand inspecting a capsule beside a precision balance and data charts">
        {VISION[0]}
      </PageHero>
      <section className="container-site py-24">
        <div className="grid gap-px overflow-hidden rounded-[2rem] bg-border md:grid-cols-2">
          {PILLARS.map((p, i) => (
            <Reveal key={p.t} delay={i * 80} className="bg-background p-8 md:p-12">
              <span className="font-display text-sm font-bold tracking-[0.2em] text-cyan">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="mt-5 text-2xl font-bold text-navy">{p.t}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{p.d}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-[2rem] bg-ice p-8 md:p-12">
          <p className="max-w-xl font-display text-2xl font-semibold text-navy">Questions about our products or standards? Our team is happy to help.</p>
          <Link to="/contact" className="btn-primary">Contact Us <ArrowRight className="h-4 w-4" /></Link>
        </Reveal>
      </section>
    </>
  );
}
