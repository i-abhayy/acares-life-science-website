import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/acares-logo-transparent.png";
import { COMPANY, NAV } from "@/lib/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const overDark = path === "/" && !scrolled && !open;

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled && !open ? "bg-background/90 shadow-soft backdrop-blur-xl" : "bg-transparent"}`}>
      <div className={`container-site flex items-center justify-between gap-6 transition-all duration-500 ${scrolled ? "h-[72px]" : "h-24"}`}>
        <Link to="/" className={`relative z-10 shrink-0 rounded-2xl px-3 py-1.5 transition-colors ${overDark ? "bg-background/90 shadow-soft" : ""}`} aria-label="ACARES Life Science home">
          <img src={logo} alt="ACARES Life Science Pvt. Ltd. logo" width={1152} height={928} className={`w-auto transition-all duration-500 ${scrolled ? "h-11" : "h-14"}`} />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className={`flex items-center gap-1 rounded-full px-2 py-1.5 transition-colors ${overDark ? "bg-navy/75 backdrop-blur-md" : ""}`}>
            {NAV.filter((n) => n.to !== "/contact").map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  activeOptions={{ exact: n.to === "/" }}
                  className={`nav-link ${overDark ? "text-navy-foreground/85 hover:text-navy-foreground data-[status=active]:text-navy-foreground" : "text-foreground/70 hover:text-primary data-[status=active]:text-primary"}`}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative z-10 flex items-center gap-2">
          <Link to="/contact" className="btn-primary hidden !py-2.5 sm:inline-flex">
            Contact Us <ArrowUpRight className="h-4 w-4" />
          </Link>
          <button
            type="button"
            className={`grid h-11 w-11 place-items-center rounded-full lg:hidden ${overDark ? "bg-background/90 text-navy shadow-soft" : "bg-ice text-navy"}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="relative block h-3.5 w-5">
              <span className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 top-1.5 h-0.5 w-5 rounded bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </div>

      <div id="mobile-nav" className={`fixed inset-0 -z-0 bg-background transition-[clip-path] duration-500 ease-out lg:hidden ${open ? "[clip-path:circle(150%_at_100%_0)]" : "pointer-events-none [clip-path:circle(0%_at_100%_0)]"}`}>
        <nav aria-label="Mobile" className="container-site flex h-full flex-col pt-28 pb-8">
          <ul className="flex flex-col">
            {NAV.map((n, i) => (
              <li key={n.to} className="border-b border-border" style={{ transitionDelay: open ? `${120 + i * 50}ms` : "0ms" }}>
                <Link to={n.to} activeOptions={{ exact: n.to === "/" }} tabIndex={open ? 0 : -1} className={`flex items-center justify-between py-4 font-display text-2xl font-semibold text-navy transition-all duration-500 data-[status=active]:text-primary ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
                  {n.label} <ArrowUpRight className="h-5 w-5 text-cyan" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto space-y-3 text-sm text-muted-foreground">
            <p className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-primary" />{COMPANY.addressLines.join(" ")}</p>
            <a href={`tel:+91${COMPANY.phone}`} tabIndex={open ? 0 : -1} className="flex items-center gap-2 font-semibold text-navy"><Phone className="h-4 w-4 text-primary" />{COMPANY.phone}</a>
          </div>
        </nav>
      </div>
    </header>
  );
}
