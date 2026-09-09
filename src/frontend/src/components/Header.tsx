import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

type NavLink =
  | { kind: "anchor"; label: string; href: string }
  | { kind: "route"; label: string; to: string };

const NAV_LINKS: NavLink[] = [
  { kind: "anchor", label: "Services", href: "#services" },
  { kind: "anchor", label: "About", href: "#about" },
  { kind: "anchor", label: "Contact", href: "#contact" },
  { kind: "route", label: "Blog", to: "/blog" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change.
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally react to pathname changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    document
      .querySelector(href)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const isBlogActive = location.pathname.startsWith("/blog");

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 border-b transition-smooth",
        scrolled ? "border-border shadow-subtle" : "border-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Brand */}
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5"
          aria-label="ArthVeda Advisors — home"
          data-ocid="header.brand_link"
        >
          <span className="flex size-9 items-center justify-center rounded-md bg-primary font-display text-lg font-semibold text-primary-foreground shadow-subtle">
            A
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-semibold tracking-tight text-foreground">
              ArthVeda
            </span>
            <span className="text-[0.625rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Advisors
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) =>
            link.kind === "anchor" ? (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNav(link.href);
                }}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                data-ocid={`header.nav.${link.label.toLowerCase()}`}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-foreground",
                  isBlogActive ? "text-foreground" : "text-muted-foreground",
                )}
                data-ocid={`header.nav.${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        {/* Desktop CTA */}
        <Button
          variant="hero"
          size="default"
          className="hidden md:inline-flex"
          onClick={() => {
            // If on the homepage, smooth-scroll to contact; otherwise navigate home then scroll.
            if (location.pathname === "/") {
              handleNav("#contact");
            } else {
              window.location.assign("/#contact");
            }
          }}
          data-ocid="header.consultation_button"
        >
          Get Consultation
        </Button>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          data-ocid="header.menu_toggle"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-card md:hidden">
          <nav
            className="container flex flex-col gap-1 py-4"
            aria-label="Mobile"
          >
            {NAV_LINKS.map((link) =>
              link.kind === "anchor" ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav(link.href);
                  }}
                  className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  data-ocid={`header.nav.${link.label.toLowerCase()}`}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
                    isBlogActive ? "text-foreground" : "text-muted-foreground",
                  )}
                  data-ocid={`header.nav.${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Link>
              ),
            )}
            <Button
              variant="hero"
              className="mt-2"
              onClick={() => {
                if (location.pathname === "/") {
                  handleNav("#contact");
                } else {
                  window.location.assign("/#contact");
                }
              }}
              data-ocid="header.consultation_button"
            >
              Get Consultation
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
