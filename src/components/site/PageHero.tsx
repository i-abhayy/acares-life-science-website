import type { ReactNode } from "react";
import { MolecularBackground } from "./MolecularBackground";
import { Reveal } from "./Reveal";
import { TiltCard } from "./TiltCard";

export function PageHero({ eyebrow, title, children, image, imageAlt = "" }: { eyebrow: string; title: ReactNode; children?: ReactNode; image?: string; imageAlt?: string }) {
  return (
    <section className="relative overflow-hidden bg-gradient-hero pt-24">
      <MolecularBackground dense={false} />
      <div className="container-site relative grid items-end gap-10 py-16 md:py-24 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <p className="eyebrow"><span className="h-px w-8 bg-cyan" />{eyebrow}</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.08] text-navy md:text-6xl">{title}</h1>
          {children && <div className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{children}</div>}
        </Reveal>
        {image && (
          <Reveal delay={140} className="relative hidden lg:block">
            <TiltCard className="rounded-[2rem]">
              <div className="overflow-hidden rounded-[2rem] shadow-lift"><img src={image} alt={imageAlt} width={1280} height={1024} className="hero-drift aspect-[5/4] w-full object-cover" /></div>
            </TiltCard>
            <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-3xl border-2 border-cyan/50" aria-hidden />
          </Reveal>
        )}
      </div>
    </section>
  );
}
