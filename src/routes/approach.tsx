import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import approachImg from "@/assets/inner-approach.jpg";
import { MolecularBackground } from "@/components/site/MolecularBackground";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { MISSION, THERAPY_AREAS, VISION, WHAT_WE_DO } from "@/lib/site";

export const Route = createFileRoute("/approach")({
  head: () => ({
    meta: [
      { title: "Our Approach — ACARES Life Science Pvt. Ltd." },
      { name: "description", content: "The therapeutic areas ACARES Life Science focuses on, from cardiovascular to central nervous system." },
      { property: "og:title", content: "Our Approach — ACARES Life Science" },
      { property: "og:description", content: "Areas of focus across major therapeutic categories." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Approach,
});

function Approach() {
  return (
    <>
      <PageHero eyebrow="Our Approach" title={<>Products in all major <span className="text-gradient-brand">therapeutic areas</span></>} image={approachImg} imageAlt="Illustration of the human body linked to organ systems across therapeutic areas">
        {WHAT_WE_DO}
      </PageHero>

      <section className="container-site py-24">
        <Reveal className="max-w-2xl">
          <p className="eyebrow"><span className="h-px w-8 bg-cyan" />Areas of focus</p>
          <h2 className="mt-4 text-4xl font-bold text-navy md:text-5xl">{THERAPY_AREAS.length} areas, one commitment</h2>
        </Reveal>
        <ol className="mt-14 border-t border-border">
          {THERAPY_AREAS.map((t, i) => (
            <Reveal as="li" key={t} delay={(i % 4) * 50} className="group grid grid-cols-[3.5rem_1fr_auto] items-center gap-4 border-b border-border py-6 transition-colors hover:bg-ice md:grid-cols-[6rem_1fr_auto] md:px-4">
              <span className="font-display text-2xl font-bold text-cyan/70 transition-colors group-hover:text-cyan md:text-4xl">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-xl font-semibold text-navy md:text-3xl">{t}</span>
              <span className="h-px w-8 bg-primary/30 transition-all group-hover:w-16 group-hover:bg-cyan" />
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="relative overflow-hidden bg-navy py-28 text-navy-foreground">
        <MolecularBackground />
        <div className="container-site relative grid gap-10 md:grid-cols-2">
          <Reveal>
            <p className="eyebrow !text-cyan">Growth</p>
            <p className="mt-5 font-display text-2xl font-semibold leading-snug md:text-3xl">{MISSION[2]}</p>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow !text-cyan">Ambition</p>
            <p className="mt-5 font-display text-2xl font-semibold leading-snug md:text-3xl">{VISION[0]}</p>
          </Reveal>
        </div>
        <div className="container-site relative mt-14">
          <Link to="/products" className="btn-light">Explore Our Products <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </>
  );
}
