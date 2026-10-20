import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, MapPin, Phone } from "lucide-react";
import missionCare from "@/assets/mission-care-community.png.asset.json";
import { useEffect, useRef } from "react";
import heroLabMp4 from "@/assets/hero-lab.mp4.asset.json";
import heroLabWebm from "@/assets/hero-lab.webm.asset.json";
import heroPoster from "@/assets/hero-lab-poster.jpg.asset.json";
import healthcarePanorama from "@/assets/healthcare-innovation-panorama.png.asset.json";
import visionPartnership from "@/assets/vision-global-partnership.png.asset.json";
import { MolecularBackground } from "@/components/site/MolecularBackground";
import { Reveal } from "@/components/site/Reveal";
import { ProductShowcase } from "@/components/site/ProductShowcase";
import { TiltCard } from "@/components/site/TiltCard";
import { COMPANY, MISSION, THERAPY_AREAS, VISION, WHAT_WE_DO } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ACARES Life Science Pvt. Ltd. — Advancing Healthcare. Inspired by Life." },
      { name: "description", content: "ACARES Life Science Pvt. Ltd., Ludhiana — a pharmaceutical portfolio including Divocare OD 500, Leviac-500, Calcam-K2 and Oxicare." },
      { property: "og:title", content: "ACARES Life Science — Advancing Healthcare. Inspired by Life." },
      { property: "og:description", content: "Affordable drugs for a wide range of indications, with a commitment to quality." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const heroVideo = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = heroVideo.current;
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (mq.matches) el.pause();
      else void el.play().catch(() => {});
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-navy text-navy-foreground">
        <video
          ref={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={heroPoster.url}
          aria-hidden="true"
          className="hero-zoom absolute inset-0 h-full w-full object-cover"
        >
          <source src={heroLabMp4.url} type="video/mp4" />
          <source src={heroLabWebm.url} type="video/webm" />
        </video>
        <div className="container-site hero-copy relative pb-20 pt-36 md:pb-28">
          <p className="hero-in eyebrow !text-cyan rounded-full bg-scrim/60 px-4 py-1.5 backdrop-blur-sm"><span className="h-px w-8 bg-cyan" />ACARES Life Science Pvt. Ltd.</p>
          <h1 className="hero-in mt-6 max-w-4xl text-5xl font-bold leading-[1.02] sm:text-6xl lg:text-[5.5rem]" style={{ animationDelay: "120ms" }}>
            Advancing Healthcare.<br /><span className="text-cyan">Inspired by Life.</span>
          </h1>
          <p className="hero-in mt-7 inline-block max-w-xl rounded-2xl bg-scrim/45 px-5 py-4 text-lg font-medium leading-relaxed text-navy-foreground backdrop-blur-sm" style={{ animationDelay: "240ms" }}>
            ACARES Life Science is committed to its healthcare-focused vision through its pharmaceutical portfolio and dedication to quality.
          </p>
          <div className="hero-in mt-10 flex flex-wrap gap-3" style={{ animationDelay: "360ms" }}>
            <Link to="/products" className="btn-light">Explore Our Products <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/about" className="btn-ghost-light">Discover ACARES</Link>
          </div>
          <a href="#story" className="absolute bottom-8 right-5 hidden items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-navy-foreground hover:text-cyan md:flex md:right-8">
            Scroll <span className="grid h-10 w-10 place-items-center rounded-full border border-navy-foreground/60 bg-scrim/30 backdrop-blur-sm"><ArrowDown className="h-4 w-4 anim-drift" /></span>
          </a>
        </div>
      </section>

      {/* Brand story */}
      <section id="story" className="relative scroll-mt-20 overflow-hidden py-24 md:py-32">
        <div className="container-site grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative order-2 lg:order-1">
            <TiltCard className="rounded-[2.5rem]">
              <img src={healthcarePanorama.url} alt="Panorama of global healthcare innovation — medicines, research and connected care" width={1213} height={1296} loading="lazy" className="aspect-[4/5] w-full rounded-[2.5rem] object-cover shadow-lift sm:aspect-square lg:aspect-[4/5]" />
            </TiltCard>
            <div className="absolute -bottom-6 -right-4 max-w-[16rem] rounded-3xl bg-navy p-6 text-navy-foreground shadow-lift sm:-right-8">
              <p className="font-display text-4xl font-bold text-cyan">{THERAPY_AREAS.length}</p>
              <p className="mt-1 text-sm text-navy-foreground/80">therapeutic areas named in our company brochure</p>
            </div>
          </Reveal>
          <Reveal delay={100} className="order-1 lg:order-2">
            <p className="eyebrow"><span className="h-px w-8 bg-cyan" />Who we are</p>
            <h2 className="mt-5 text-4xl font-bold leading-[1.08] text-navy md:text-5xl">Science With Purpose.<br /><span className="text-gradient-brand">Healthcare With Care.</span></h2>
            <p className="mt-7 text-lg leading-relaxed text-muted-foreground">{WHAT_WE_DO}</p>
            <Link to="/about" className="btn-outline mt-9">About ACARES <ArrowRight className="h-4 w-4" /></Link>
          </Reveal>
        </div>
      </section>

      {/* Mission & Vision — split panel */}
      <section className="bg-ice py-24 md:py-32">
        <div className="container-site">
          <Reveal className="mb-12">
            <p className="eyebrow"><span className="h-px w-8 bg-cyan" />Mission &amp; Vision</p>
            <h2 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-navy md:text-5xl">What drives us, every day</h2>
          </Reveal>
          <Reveal className="grid overflow-hidden rounded-[2.5rem] shadow-soft md:grid-cols-2">
            {/* Mission side */}
            <div className="flex flex-col bg-background">
              <div className="relative overflow-hidden">
                <img
                  src={missionCare.url}
                  alt="A hand holding a glowing globe with a family inside, surrounded by DNA and healthcare symbols"
                  width={768}
                  height={1365}
                  loading="lazy"
                  className="h-64 w-full object-cover transition-transform duration-700 hover:scale-[1.04] md:h-72"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              </div>
              <div className="flex flex-1 flex-col p-8 md:p-12">
                <p className="font-display text-sm font-bold tracking-[0.2em] text-cyan">01 — MISSION</p>
                <p className="mt-5 font-display text-2xl font-semibold leading-snug text-navy md:text-3xl">“{MISSION[0]}”</p>
                <ul className="mt-7 space-y-3 border-l-2 border-cyan/40 pl-5 text-muted-foreground">
                  {MISSION.slice(1).map((m) => <li key={m}>{m}</li>)}
                </ul>
              </div>
            </div>
            {/* Vision side */}
            <div className="flex flex-col bg-navy text-navy-foreground">
              <div className="relative overflow-hidden">
                <img
                  src={visionPartnership.url}
                  alt="Illustration of a handshake beneath a connected globe, with pharmaceutical research, medicines and transport"
                  width={768}
                  height={1367}
                  loading="lazy"
                  className="h-64 w-full object-cover transition-transform duration-700 hover:scale-[1.04] md:h-72"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
              </div>
              <div className="flex flex-1 flex-col p-8 md:p-12">
                <p className="font-display text-sm font-bold tracking-[0.2em] text-cyan">02 — VISION</p>
                <p className="mt-5 font-display text-2xl font-semibold leading-snug md:text-3xl">“{VISION[1]}”</p>
                <ul className="mt-7 space-y-3 border-l-2 border-cyan/40 pl-5 text-navy-foreground/75">
                  {[VISION[0], VISION[2]].map((m) => <li key={m}>{m}</li>)}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Products */}
      <section className="py-24 md:py-32">
        <div className="container-site">
          <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow"><span className="h-px w-8 bg-cyan" />Our Products</p>
              <h2 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-navy md:text-5xl">A portfolio built around patient needs</h2>
            </div>
            <Link to="/products" className="btn-primary">Explore Our Portfolio <ArrowRight className="h-4 w-4" /></Link>
          </Reveal>
          <Reveal><ProductShowcase /></Reveal>
          <p className="mt-6 text-xs text-muted-foreground">Product information is for reference only. Prescription medicines should be used only under the supervision of a registered medical practitioner.</p>
        </div>
      </section>

      {/* Interlude */}
      <section className="relative overflow-hidden bg-navy py-28 text-navy-foreground md:py-40">
        <MolecularBackground />
        <div className="container-site relative">
          <Reveal>
            <p className="eyebrow !text-cyan"><span className="h-px w-8 bg-cyan" />Our Approach</p>
            <h2 className="mt-6 max-w-5xl text-5xl font-bold leading-[1.02] md:text-7xl lg:text-8xl">Affordable drugs for a <span className="text-cyan">wide range</span> of indications.</h2>
          </Reveal>
          <ol className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-navy-foreground/10 sm:grid-cols-2 lg:grid-cols-4">
            {THERAPY_AREAS.slice(0, 8).map((t, i) => (
              <Reveal as="li" key={t} delay={i * 50} className="group bg-navy p-6 transition-colors hover:bg-primary/40">
                <span className="font-display text-sm font-bold text-cyan">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-6 font-display text-lg font-semibold">{t}</p>
              </Reveal>
            ))}
          </ol>
          <Link to="/approach" className="btn-ghost-light mt-10">See all areas of focus <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      {/* Quality */}
      <section className="py-24 md:py-32">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <p className="eyebrow"><span className="h-px w-8 bg-cyan" />Quality</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-navy md:text-5xl">Quality-conscious, in every market we serve.</h2>
            <Link to="/quality" className="btn-outline mt-8">Our approach to quality <ArrowRight className="h-4 w-4" /></Link>
          </Reveal>
          <div className="divide-y divide-border border-y border-border">
            {[
              ["Safe & effective", MISSION[0]],
              ["Excellence", MISSION[3]],
              ["Responsibility", VISION[2]],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 80} className="grid gap-2 py-7 sm:grid-cols-[10rem_1fr]">
                <h3 className="font-display text-lg font-semibold text-navy">{t}</h3>
                <p className="text-muted-foreground">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="container-site pb-24">
        <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-gradient-brand p-8 text-primary-foreground shadow-lift md:p-16">
          <div aria-hidden className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-cyan/40 blur-3xl" />
          <div className="relative grid items-end gap-10 md:grid-cols-[1.3fr_1fr]">
            <div>
              <h2 className="text-4xl font-bold leading-tight md:text-5xl">Let's talk healthcare.</h2>
              <p className="mt-4 max-w-md text-primary-foreground/80">For product, distribution or general enquiries, reach out to our Ludhiana office.</p>
              <Link to="/contact" className="btn-light mt-8">Contact Us <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <address className="space-y-4 not-italic">
              <p className="flex gap-3"><MapPin className="mt-1 h-5 w-5 shrink-0" />{COMPANY.addressLines.join(" ")}</p>
              <a href={`tel:+91${COMPANY.phone}`} className="flex items-center gap-3 text-2xl font-bold hover:underline"><Phone className="h-5 w-5" />{COMPANY.phone}</a>
            </address>
          </div>
        </Reveal>
      </section>
    </>
  );
}
