import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Building2,
  Calculator,
  FileText,
  type LucideIcon,
  Receipt,
  Search,
  ShieldCheck,
} from "lucide-react";
import { motion } from "motion/react";

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const SERVICES: Service[] = [
  {
    icon: FileText,
    title: "GST Registration & Filing",
    description:
      "Help with GST registration, monthly and quarterly returns, annual returns, and ongoing GST compliance for businesses in Pune.",
  },
  {
    icon: Receipt,
    title: "Income Tax Return Filing",
    description:
      "Accurate and timely ITR filing for individuals, professionals, and businesses — with practical tax optimization guidance built in.",
  },
  {
    icon: Building2,
    title: "Business Registration",
    description:
      "Company incorporation, LLP, partnership firm, and sole proprietorship registration with all regulatory compliance handled end to end.",
  },
  {
    icon: Calculator,
    title: "Accounting & Bookkeeping",
    description:
      "Systematic recording of financial transactions, ledger maintenance, and clean financial statement preparation for informed decisions.",
  },
  {
    icon: ShieldCheck,
    title: "Trademark Registration",
    description:
      "Protect your brand with trademark search, application filing, and registration follow-up so your intellectual property stays secure.",
  },
  {
    icon: Search,
    title: "Due Diligence Services",
    description:
      "Comprehensive financial and legal due diligence for business acquisitions, investments, and partnerships — clarity before you commit.",
  },
];

export function Services() {
  return (
    <section id="services" className="bg-muted/30" aria-label="Our services">
      <div className="container py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          className="flex max-w-2xl flex-col gap-4"
        >
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-accent-foreground">
            What we do
          </span>
          <h2 className="serif-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Our Services
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            A complete financial advisory toolkit for Pune’s businesses and
            individuals — covering compliance, taxation, accounting, and
            protection of what you’ve built.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.08,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                <Card
                  className="h-full gap-0 border-border/70 shadow-card transition-smooth hover:-translate-y-1 hover:border-accent/40 hover:shadow-elevated"
                  data-ocid={`services.card.${index + 1}`}
                >
                  <CardHeader className="gap-4">
                    <span className="flex size-12 items-center justify-center rounded-lg bg-primary/8 text-primary shadow-subtle">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <CardTitle className="serif-display text-xl font-semibold tracking-tight text-foreground">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Services;
