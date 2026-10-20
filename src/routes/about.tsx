import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Pause, Play } from "lucide-react";
import animMission from "@/assets/acares-our-mission.mp4.asset.json";
import animMissionPoster from "@/assets/acares-our-mission-poster.jpg.asset.json";
import animVision from "@/assets/acares-our-vision.mp4.asset.json";
import animVisionPoster from "@/assets/acares-our-vision-poster.jpg.asset.json";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import aboutImg from "@/assets/inner-about.jpg";
import missionVideo from "@/assets/mission-video.mp4.asset.json";
import missionVideoWebm from "@/assets/mission-video.webm.asset.json";
import missionPoster from "@/assets/mission-poster.jpg.asset.json";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { MISSION, VISION, WHAT_WE_DO } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — ACARES Life Science Pvt. Ltd." },
      { name: "description", content: "What ACARES Life Science does, our mission and our vision." },
      { property: "og:title", content: "About ACARES Life Science" },
      { property: "og:description", content: "What we do, our mission and our vision." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function AnimatedStatement({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.pause();
      setPlaying(false);
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (!playing) return;
      if (e?.isIntersecting) el.play().catch(() => {});
      else el.pause();
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, [playing]);

  function toggle() {
    const el = ref.current;
    if (!el) return;
    if (el.paused) { el.play().catch(() => {}); setPlaying(true); } else { el.pause(); setPlaying(false); }
  }

  return (
    <div className="group relative overflow-hidden rounded-[2rem] shadow-lift">
      <video ref={ref} src={src} poster={poster} muted loop playsInline preload="metadata" aria-label={label} className="aspect-video w-full bg-navy/10 object-cover" />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause video" : "Play video"}
        className="absolute bottom-4 right-4 grid h-12 w-12 place-items-center rounded-full bg-background/85 text-navy shadow-soft backdrop-blur transition hover:scale-105"
      >
        {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
      </button>
    </div>
  );
}

function Statements({ label, items, dark }: { label: string; items: string[]; dark?: boolean }) {
  return (
    <ol className="space-y-0">
      {items.map((m, i) => (
        <Reveal as="li" key={m} delay={i * 70} className={`grid grid-cols-[3rem_1fr] gap-4 border-t py-6 ${dark ? "border-navy-foreground/15" : "border-border"}`}>
          <span className="font-display text-sm font-bold text-cyan">{label}{i + 1}</span>
          <p className={`text-lg leading-relaxed ${dark ? "text-navy-foreground/85" : "text-foreground/80"}`}>{m}</p>
        </Reveal>
      ))}
    </ol>
  );
}

const DEFAULT_TRANSCRIPT = `On-screen text: Discovering breakthroughs, improving lives, ensuring access.
Speech: No speech.
Visual description: An illustration of scientists working with microscopes and test tubes. A flowing ribbon leads to a DNA strand and floating medicine icons, then to a globe marked with hospitals, where a smiling family waves in front of a city skyline.`;

function MissionLoop() {
  const video = useRef<HTMLVideoElement>(null);
  const [custom, setCustom] = useState<{ url: string; type: string; transcript: string | null } | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const { data } = await supabase.from("mission_media").select("video_path, mime_type, transcript").eq("id", "mission").maybeSingle();
      if (!data || !alive) return;
      const { data: s } = await supabase.storage.from("site-media").createSignedUrl(data.video_path, 60 * 60 * 6);
      if (s && alive) setCustom({ url: s.signedUrl, type: data.mime_type, transcript: data.transcript });
    })();
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    el.muted = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) el.pause();
  }, [custom]);

  const transcript = custom ? custom.transcript : DEFAULT_TRANSCRIPT;

  return (
    <div className="mt-8">
      <video
        key={custom?.url ?? "default"}
        ref={video}
        poster={custom ? undefined : missionPoster.url}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Our mission video"
        aria-describedby={transcript ? "mission-transcript" : undefined}
        className={`w-full rounded-[2rem] bg-navy/5 object-cover shadow-soft ${custom ? "" : "aspect-[1280/516]"}`}
      >
        {custom ? (
          <source src={custom.url} type={custom.type} />
        ) : (
          <>
            <source src={missionVideo.url} type="video/mp4" />
            <source src={missionVideoWebm.url} type="video/webm" />
          </>
        )}
      </video>
      {transcript && (
        <details className="mt-4 rounded-2xl bg-background/70 px-5 py-3 text-sm">
          <summary className="cursor-pointer font-semibold text-navy">Video transcript</summary>
          <p id="mission-transcript" className="mt-3 whitespace-pre-line leading-relaxed text-foreground/80">{transcript}</p>
        </details>
      )}
    </div>
  );
}

function About() {
  return (
    <>
      <PageHero eyebrow="About Us" title={<>Affordable drugs for a <span className="text-gradient-brand">wide range</span> of indications</>} image={aboutImg} imageAlt="Glowing scientific network flowing into medicine blister packs">
        ACARES Life Science Pvt. Ltd. is based in Ludhiana, Punjab.
      </PageHero>

      <section className="container-site py-24">
        <Reveal className="mx-auto max-w-4xl">
          <p className="eyebrow"><span className="h-px w-8 bg-cyan" />What we do</p>
          <p className="mt-6 font-display text-2xl font-medium leading-snug text-navy md:text-4xl">{WHAT_WE_DO}</p>
          <Link to="/approach" className="mt-8 inline-flex items-center gap-1.5 font-semibold text-primary hover:gap-2.5 transition-all">Our areas of focus <ArrowRight className="h-4 w-4" /></Link>
        </Reveal>
      </section>

      <section className="bg-ice py-24">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">Our Mission</p>
            <h2 className="mt-4 text-4xl font-bold text-navy md:text-5xl">What drives us</h2>
            <MissionLoop />
          </Reveal>
          <Statements label="M" items={MISSION} />
        </div>
        <Reveal className="container-site mt-16">
          <AnimatedStatement src={animMission.url} poster={animMissionPoster.url} label="Animated video of our mission statements" />
        </Reveal>
      </section>

      <section className="bg-navy py-24 text-navy-foreground">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow !text-cyan">Our Vision</p>
            <h2 className="mt-4 text-4xl font-bold md:text-5xl">Where we are headed</h2>
          </Reveal>
          <Statements label="V" items={VISION} dark />
        </div>
        <Reveal className="container-site mt-16">
          <AnimatedStatement src={animVision.url} poster={animVisionPoster.url} label="Animated video of our vision statements" />
        </Reveal>
      </section>
    </>
  );
}
