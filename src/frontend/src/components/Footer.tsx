import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

type QuickLink =
  | { kind: "anchor"; label: string; href: string }
  | { kind: "route"; label: string; to: string };

const QUICK_LINKS: QuickLink[] = [
  { kind: "anchor", label: "Services", href: "#services" },
  { kind: "anchor", label: "About", href: "#about" },
  { kind: "anchor", label: "Contact", href: "#contact" },
  { kind: "route", label: "Blog", to: "/blog" },
];

const SERVICES = [
  "GST Registration",
  "Income Tax Filing",
  "Business Registration",
  "Accounting",
  "Bookkeeping",
  "Trademark",
  "Due Diligence",
] as const;

const CONTACT = {
  address: "Chandrai Capital, Ambegaon BK, Pune, Maharashtra – 411046",
  phone: "+91 76206 62243",
  email: "Arthveda2022@gmail.com",
} as const;

const CURRENT_YEAR = new Date().getFullYear();
const CAFFEINE_URL = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
  typeof window !== "undefined"
    ? window.location.hostname
    : "arthveda-advisors-oe2.caffeine.xyz",
)}`;

function scrollTo(href: string) {
  document
    .querySelector(href)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-md bg-accent font-display text-lg font-semibold text-accent-foreground">
                A
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-lg font-semibold tracking-tight">
                  ArthVeda
                </span>
                <span className="text-[0.625rem] font-medium uppercase tracking-[0.18em] text-primary-foreground/70">
                  Advisors
                </span>
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-primary-foreground/75">
              Trusted financial advisory in Pune — GST, tax, accounting, and
              compliance services for businesses across Maharashtra.
            </p>
          </div>

          {/* Quick links */}
          <nav className="flex flex-col gap-3" aria-label="Footer quick links">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  {link.kind === "anchor" ? (
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollTo(link.href);
                      }}
                      className="text-sm text-primary-foreground/75 transition-colors hover:text-accent"
                      data-ocid={`footer.link.${link.label.toLowerCase()}`}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.to}
                      className="text-sm text-primary-foreground/75 transition-colors hover:text-accent"
                      data-ocid={`footer.link.${link.label.toLowerCase()}`}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <div className="flex flex-col gap-3">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground">
              Services
            </h3>
            <ul className="flex flex-col gap-2">
              {SERVICES.map((service, i) => (
                <li key={service}>
                  {/* biome-ignore lint/a11y/useValidAnchor: in-page anchor navigation to #services */}
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo("#services");
                    }}
                    className="text-sm text-primary-foreground/75 transition-colors hover:text-accent"
                    data-ocid={`footer.service.${i + 1}`}
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground">
              Contact
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-primary-foreground/75">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
                <span className="leading-relaxed">{CONTACT.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-accent" />
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-accent"
                  data-ocid="footer.phone_link"
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-accent" />
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="transition-colors hover:text-accent"
                  data-ocid="footer.email_link"
                >
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-primary-foreground/15 pt-6 text-xs text-primary-foreground/60 sm:flex-row">
          <p>© {CURRENT_YEAR} ArthVeda Advisors. All rights reserved.</p>
          <p>
            Built with love using{" "}
            <a
              href={CAFFEINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent transition-colors hover:text-accent/80"
              data-ocid="footer.caffeine_link"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
