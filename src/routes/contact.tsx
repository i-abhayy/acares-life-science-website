import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone } from "lucide-react";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { PageHero } from "@/components/site/PageHero";
import contactImg from "@/assets/inner-contact.jpg";
import { COMPANY } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  validateSearch: (s: Record<string, unknown>): { product?: string } =>
    typeof s["product"] === "string" ? { product: s["product"].slice(0, 80) } : {},
  head: () => ({
    meta: [
      { title: "Contact Us — ACARES Life Science Pvt. Ltd." },
      { name: "description", content: "Contact ACARES Life Science Pvt. Ltd., Satjot Nagar, Ludhiana, Punjab. Phone 7033027878." },
      { property: "og:title", content: "Contact ACARES Life Science" },
      { property: "og:description", content: "Get in touch with ACARES Life Science in Ludhiana, Punjab." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { product } = Route.useSearch();
  return (
    <>
      <PageHero eyebrow="Contact" title={<>Let's talk <span className="text-gradient-brand">healthcare</span></>} image={contactImg} imageAlt="Glowing network of connected points over a dotted map pattern">Reach our Ludhiana office by phone, or send a message using the form.</PageHero>
      <section className="container-site grid gap-8 py-16 lg:grid-cols-[1fr_1.6fr]">
        <aside className="h-fit rounded-3xl bg-gradient-brand p-8 text-primary-foreground shadow-lift">
          <h2 className="text-2xl font-bold">{COMPANY.name}</h2>
          <address className="mt-6 space-y-5 not-italic">
            <p className="flex gap-3"><MapPin className="mt-1 h-5 w-5 shrink-0" /><span>{COMPANY.addressLines.map((l) => <span key={l} className="block">{l}</span>)}</span></p>
            <a href={`tel:+91${COMPANY.phone}`} className="flex items-center gap-3 text-lg font-semibold hover:underline"><Phone className="h-5 w-5" />{COMPANY.phone}</a>
          </address>
        </aside>
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft md:p-10">
          <h2 className="mb-6 text-2xl font-bold text-navy">Send a message</h2>
          <EnquiryForm
            defaults={product ? { subject: `Enquiry about ${product}` } : {}}
            fields={[
              { name: "name", label: "Name", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "subject", label: "Subject", required: true, wide: true },
              { name: "message", label: "Message", textarea: true, required: true },
            ]}
          />
        </div>
      </section>
    </>
  );
}
