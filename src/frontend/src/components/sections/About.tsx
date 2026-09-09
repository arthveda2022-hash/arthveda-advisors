import { Card } from "@/components/ui/card";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";

const CONTACT = {
  address: "Chandrai Capital, Ambegaon BK, Pune, Maharashtra – 411046",
  phone: "+91 76206 62243",
  email: "Arthveda2022@gmail.com",
  hours: "Mon–Fri: 9:30 AM – 6:30 PM · Sat: 10:00 AM – 2:00 PM",
} as const;

export function About() {
  return (
    <section
      id="about"
      className="bg-background"
      aria-label="About ArthVeda Advisors"
    >
      <div className="container py-16 md:py-24">
        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* Left — narrative */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col gap-6"
          >
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-accent-foreground">
              Who we are
            </span>
            <h2 className="serif-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              About ArthVeda Advisors
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              ArthVeda Advisors is a Pune-based financial advisory firm helping
              businesses and individuals navigate the regulatory landscape with
              confidence. From GST and income tax to accounting, trademark, and
              due diligence, we bring a calm, methodical approach to every
              engagement — translating complex compliance into clear, actionable
              guidance for clients across Maharashtra.
            </p>

            <div className="my-2 h-px w-full bg-border" />

            <h3 className="serif-display text-xl font-semibold tracking-tight text-foreground">
              Founder: Pandhari Burkul
            </h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              Pandhari Burkul founded ArthVeda Advisors with a simple conviction
              — that trustworthy financial advice should be accessible,
              personal, and grounded in real understanding of each client’s
              goals. With years of hands-on experience in taxation, accounting,
              and business compliance, he leads every engagement with the
              diligence and transparency that Pune’s business community relies
              on.
            </p>
          </motion.div>

          {/* Right — address / contact highlight card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12, ease: [0.4, 0, 0.2, 1] }}
            className="lg:justify-self-end"
          >
            <Card className="w-full max-w-md gap-0 border-border/70 bg-card p-7 shadow-elevated">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-accent-foreground">
                Visit our office
              </span>
              <h3 className="serif-display mt-3 text-2xl font-semibold tracking-tight text-foreground">
                ArthVeda Advisors
              </h3>

              <div className="my-6 h-px w-full bg-border" />

              <ul className="flex flex-col gap-5 text-sm">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/8 text-primary">
                    <MapPin className="size-4" aria-hidden="true" />
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-foreground">
                      Office address
                    </span>
                    <span className="leading-relaxed text-muted-foreground">
                      {CONTACT.address}
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/8 text-primary">
                    <Phone className="size-4" aria-hidden="true" />
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-foreground">Phone</span>
                    <a
                      href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                      className="leading-relaxed text-muted-foreground transition-colors hover:text-accent-foreground"
                      data-ocid="about.phone_link"
                    >
                      {CONTACT.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/8 text-primary">
                    <Mail className="size-4" aria-hidden="true" />
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-foreground">Email</span>
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="leading-relaxed text-muted-foreground transition-colors hover:text-accent-foreground"
                      data-ocid="about.email_link"
                    >
                      {CONTACT.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/8 text-primary">
                    <Clock className="size-4" aria-hidden="true" />
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-foreground">
                      Business hours
                    </span>
                    <span className="leading-relaxed text-muted-foreground">
                      {CONTACT.hours}
                    </span>
                  </div>
                </li>
              </ul>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
