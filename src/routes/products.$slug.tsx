import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Info, Phone } from "lucide-react";
import { PRODUCTS } from "@/lib/site";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = PRODUCTS.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    const title = p ? `${p.name} — ACARES Life Science` : "Product — ACARES Life Science";
    const desc = p ? `${p.name} (${p.composition}) by ACARES Life Science Pvt. Ltd.` : "ACARES product details.";
    return {
      meta: [
        { title }, { name: "description", content: desc },
        { property: "og:title", content: title }, { property: "og:description", content: desc },
        { property: "og:type", content: "product" }, { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-site pb-24 pt-40 text-center">
      <h1 className="text-3xl font-bold text-navy">Product not found</h1>
      <Link to="/products" className="btn-primary mt-6">Back to products</Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product: p } = Route.useLoaderData();
  return (
    <section className="bg-gradient-hero">
      <div className="container-site pb-16 pt-32">
        <Link to="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"><ArrowLeft className="h-4 w-4" />Back to catalogue</Link>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="overflow-hidden rounded-3xl border border-primary/15 bg-background shadow-lift">
            <img src={p.image} alt={`${p.name} product poster`} width={p.imageW} height={p.imageH} className="w-full object-contain" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-health">{p.category}</span>
            <h1 className="mt-2 text-4xl font-bold text-navy">{p.name}</h1>
            <dl className="mt-6 divide-y divide-border rounded-2xl border border-border bg-background">
              <div className="p-4"><dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Composition</dt><dd className="mt-1 font-medium text-navy">{p.composition}</dd></div>
              <div className="p-4"><dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Pack (as shown)</dt><dd className="mt-1 font-medium text-navy">{p.pack}</dd></div>
              {p.prescription && <div className="p-4"><dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Type</dt><dd className="mt-1 font-medium text-navy">Prescription medicine (Rx)</dd></div>}
            </dl>
            <div className="mt-5 flex gap-3 rounded-2xl bg-ice p-4 text-sm text-muted-foreground">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p>For information only. Statements on promotional material are not independently verified. {p.prescription ? "Use only under the supervision of a registered medical practitioner." : "Consult a healthcare professional before use."}</p>
            </div>
            <Link to="/contact" search={{ product: p.name }} className="btn-primary mt-6"><Phone className="h-4 w-4" />Contact Us about this product</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
