import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import logo from "@/assets/acares-logo-transparent.png";
import { COMPANY, FOOTER_EXTRA, NAV } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy text-navy-foreground">
      <div aria-hidden className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-cyan/15 blur-3xl" />
      <div className="container-site relative grid gap-12 py-20 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <div className="inline-block rounded-2xl bg-background p-3">
            <img src={logo} alt="ACARES Life Science Pvt. Ltd. logo" width={1152} height={928} loading="lazy" className="h-16 w-auto" />
          </div>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-navy-foreground/70">Affordable drugs for a wide range of indications — with the highest priority given to our customers, colleagues and the environment.</p>
        </div>
        <nav aria-label="Footer">
          <h2 className="footer-h">Company</h2>
          <ul className="mt-5 space-y-2.5 text-sm">
            {[...NAV, ...FOOTER_EXTRA].map((n) => (
              <li key={n.to}><Link to={n.to} className="text-navy-foreground/75 transition-colors hover:text-cyan">{n.label}</Link></li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="footer-h">Portfolio</h2>
          <ul className="mt-5 space-y-2.5 text-sm">
            <li><Link to="/products" className="text-navy-foreground/75 hover:text-cyan">All products</Link></li>
            <li><Link to="/products" search={{ category: "Neurology" }} className="text-navy-foreground/75 hover:text-cyan">Neurology</Link></li>
            <li><Link to="/products" search={{ category: "Nutritional Supplements" }} className="text-navy-foreground/75 hover:text-cyan">Nutritional Supplements</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="footer-h">Reach us</h2>
          <address className="mt-5 space-y-4 text-sm not-italic text-navy-foreground/80">
            <p className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan" /><span>{COMPANY.addressLines.map((l) => <span key={l} className="block">{l}</span>)}</span></p>
            <a href={`tel:+91${COMPANY.phone}`} className="flex items-center gap-3 text-base font-semibold hover:text-cyan"><Phone className="h-4 w-4 text-cyan" />{COMPANY.phone}</a>
          </address>
          <Link to="/contact" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan hover:gap-2.5 transition-all">Send an enquiry <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
      </div>
      <div className="relative border-t border-navy-foreground/10">
        <div className="container-site flex flex-wrap justify-between gap-2 py-6 text-xs text-navy-foreground/55">
          <p>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</p>
          <p>Product information is for reference only and is not medical advice.</p>
        </div>
      </div>
    </footer>
  );
}
