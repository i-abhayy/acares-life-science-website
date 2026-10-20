import { createFileRoute } from "@tanstack/react-router";
import { Info } from "lucide-react";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { PageHero } from "@/components/site/PageHero";
import careersImg from "@/assets/inner-careers.jpg";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — ACARES Life Science Pvt. Ltd." },
      { name: "description", content: "Interested in working with ACARES Life Science? Send us a general career enquiry." },
      { property: "og:title", content: "Careers at ACARES" },
      { property: "og:description", content: "Send us a general career enquiry." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Careers,
});

function Careers() {
  return (
    <>
      <PageHero eyebrow="Careers" title="Build a healthier tomorrow with us" image={careersImg} imageAlt="Team of professionals reviewing documents together in a bright office">
        We value people who share our commitment to quality, our customers, our colleagues and the environment.
      </PageHero>
      <section className="container-site grid gap-10 py-16 lg:grid-cols-[1fr_1.6fr]">
        <div className="flex h-fit gap-3 rounded-2xl bg-ice p-6 text-sm text-muted-foreground">
          <Info className="h-5 w-5 shrink-0 text-primary" />
          <p>There are no specific vacancies listed at the moment. Applications are accepted only through this general enquiry form.</p>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft md:p-10">
          <h2 className="mb-6 text-2xl font-bold text-navy">General career enquiry</h2>
          <EnquiryForm submitLabel="Submit enquiry" fields={[
            { name: "name", label: "Full name", required: true },
            { name: "email", label: "Email", type: "email", required: true },
            { name: "phone", label: "Phone", type: "tel" },
            { name: "area", label: "Area of interest" },
            { name: "message", label: "Tell us about yourself", textarea: true, required: true },
          ]} />
        </div>
      </section>
    </>
  );
}
