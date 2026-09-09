import { Seo } from "@/components/Seo";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Button } from "@/components/ui/button";
import { getLatestArticles } from "@/data/articles";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const LATEST_COUNT = 3;

export function HomePage() {
  const latest = getLatestArticles(LATEST_COUNT);

  return (
    <>
      <Seo />
      <Hero />
      <Services />
      <About />

      {/* Latest Articles — links to /blog */}
      <section
        id="latest-articles"
        className="bg-muted/30"
        aria-label="Latest articles"
      >
        <div className="container py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          >
            <div className="flex max-w-2xl flex-col gap-4">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-accent-foreground">
                Insights &amp; Advisory
              </span>
              <h2 className="serif-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Latest Articles
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                Practical guidance on GST, income tax, and business finance from
                our Pune team — written to help you stay compliant and make
                confident decisions.
              </p>
            </div>
            <Button
              variant="outlineHero"
              size="lg"
              className="w-fit shrink-0"
              asChild
            >
              <Link to="/blog" data-ocid="home.view_all_articles_button">
                View all articles
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </motion.div>

          {latest.length > 0 ? (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latest.map((article, i) => (
                <ArticleCard
                  key={article.slug}
                  article={article}
                  index={i + 1}
                />
              ))}
            </div>
          ) : (
            <div
              className="mt-12 flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border/70 bg-card/40 py-16 text-center"
              data-ocid="home.latest_articles.empty_state"
            >
              <p className="serif-display text-lg font-medium text-foreground">
                No articles published yet
              </p>
              <p className="max-w-md text-sm text-muted-foreground">
                We are preparing fresh insights on GST, income tax, and business
                finance. Please check back soon.
              </p>
            </div>
          )}
        </div>
      </section>

      <Contact />
    </>
  );
}

export default HomePage;
