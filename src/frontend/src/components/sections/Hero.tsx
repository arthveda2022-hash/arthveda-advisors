import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, BadgeCheck, MapPin, Sparkles, Users } from "lucide-react";
import { motion } from "motion/react";

const TRUST_SIGNALS = [
  { icon: MapPin, label: "Pune-based advisory" },
  { icon: BadgeCheck, label: "GST & ITR certified" },
  { icon: Users, label: "500+ clients served" },
] as const;

function scrollTo(href: string) {
  document
    .querySelector(href)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero() {
  return (
    <section id="hero" className="bg-background" aria-label="Hero">
      <div className="container py-16 md:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* Left — editorial copy */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col gap-6"
          >
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-accent-foreground">
              <Sparkles className="size-3.5" aria-hidden="true" />
              Financial Advisory in Pune
            </span>

            <h1 className="serif-display text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              ArthVeda Advisors —{" "}
              <span className="gold-underline">
                Trusted GST, Tax &amp; Accounting
              </span>{" "}
              Consultants in Pune
            </h1>

            <p className="max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
              Professional financial advisory services for businesses and
              individuals across Maharashtra — from GST registration and income
              tax filing to accounting, compliance, and due diligence. Clarity,
              accuracy, and trust in every engagement.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                variant="hero"
                size="lg"
                onClick={() => scrollTo("#contact")}
                data-ocid="hero.book_consultation_button"
              >
                Book Free Consultation
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
              <Button
                variant="outlineHero"
                size="lg"
                onClick={() => scrollTo("#services")}
                data-ocid="hero.view_services_button"
              >
                View Services
              </Button>
            </div>
          </motion.div>

          {/* Right — founder / trust card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12, ease: [0.4, 0, 0.2, 1] }}
            className="lg:justify-self-end"
          >
            <Card className="w-full max-w-md gap-0 border-border/70 bg-card p-7 shadow-elevated">
              <div className="flex items-center gap-4">
                <span
                  className="flex size-14 items-center justify-center rounded-full bg-primary font-display text-2xl font-semibold text-primary-foreground shadow-subtle"
                  aria-hidden="true"
                >
                  PB
                </span>
                <div className="flex flex-col">
                  <span className="font-display text-lg font-semibold tracking-tight text-foreground">
                    Pandhari Burkul
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Founder &amp; Lead Advisor
                  </span>
                </div>
              </div>

              <div className="my-6 h-px w-full bg-border" />

              <p className="text-sm leading-relaxed text-muted-foreground">
                “We help Pune’s businesses stay compliant and financially
                confident — combining deep regulatory knowledge with a calm,
                personal approach to every client engagement.”
              </p>

              <div className="mt-6 flex flex-col gap-3">
                {TRUST_SIGNALS.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 text-sm font-medium text-foreground"
                  >
                    <span className="flex size-8 items-center justify-center rounded-md bg-accent/12 text-accent-foreground">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    {label}
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Trust band */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="mt-14 grid grid-cols-1 divide-y divide-border rounded-xl border border-border bg-muted/30 sm:grid-cols-3 sm:divide-x sm:divide-y-0"
        >
          {[
            { stat: "500+", label: "Clients served across Pune" },
            { stat: "12+", label: "Years of advisory experience" },
            { stat: "100%", label: "Compliance-first engagements" },
          ].map(({ stat, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1 px-6 py-6 text-center"
            >
              <span className="serif-display text-3xl font-semibold text-foreground">
                {stat}
              </span>
              <span className="text-sm text-muted-foreground">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
