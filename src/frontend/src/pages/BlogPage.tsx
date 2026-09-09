import { Seo } from "@/components/Seo";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { Button } from "@/components/ui/button";
import {
  ALL_TAGS,
  type Article,
  getArticlesByTag,
  getArticlesSorted,
} from "@/data/articles";
import { cn } from "@/lib/utils";
import { Link, useSearch } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useMemo } from "react";

const SITE_URL = "https://arthveda-advisors-oe2.caffeine.xyz/";

function buildBlogSchema(articles: Article[]) {
  return {
    "@context": "https://schema.org",
    "@type": ["Blog", "CollectionPage"],
    "@id": `${SITE_URL}blog`,
    name: "ArthVeda Advisors — Insights & Advisory",
    description:
      "Practical guidance on GST, income tax, business registration, accounting, and trademark from ArthVeda Advisors, a Pune-based financial advisory firm.",
    url: `${SITE_URL}blog`,
    inLanguage: "en-IN",
    isPartOf: { "@id": `${SITE_URL}#website` },
    publisher: { "@id": `${SITE_URL}#business` },
    blogPost: articles.map((article) => {
      const cover = article.coverImage;
      const imageUrl = cover.startsWith("http")
        ? cover
        : `${SITE_URL}${cover.replace(/^\//, "")}`;
      return {
        "@type": "BlogPosting",
        headline: article.title,
        description: article.excerpt,
        datePublished: article.publishedDate,
        url: `${SITE_URL}blog/${article.slug}`,
        image: imageUrl,
        author: {
          "@type": "Person",
          name: article.authorName,
        },
      };
    }),
  };
}

export function BlogPage() {
  const search = useSearch({ from: "/blog" });
  const activeTag = search.tag ?? null;

  const articles = useMemo(() => {
    return activeTag ? getArticlesByTag(activeTag) : getArticlesSorted();
  }, [activeTag]);

  const tags = ALL_TAGS;

  const blogSchema = useMemo(() => buildBlogSchema(articles), [articles]);

  return (
    <>
      <Seo
        title="Insights & Advisory | ArthVeda Advisors Blog"
        description="Practical guidance on GST registration, income tax filing, business structure, accounting, and trademark registration — written by ArthVeda Advisors, a Pune-based financial advisory firm."
        canonicalPath="blog"
        blogSchema={blogSchema}
      />

      {/* Hero */}
      <section className="bg-background" aria-label="Blog hero">
        <div className="container py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="flex max-w-2xl flex-col gap-4"
          >
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-accent-foreground">
              Insights &amp; Advisory
            </span>
            <h1 className="serif-display text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl">
              Practical guidance on{" "}
              <span className="gold-underline">
                GST, tax &amp; business finance
              </span>{" "}
              from our Pune team
            </h1>
            <p className="max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
              Clear, field-tested articles on compliance, taxation, and business
              structure — written to help Pune’s businesses stay compliant and
              make confident decisions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tag filter + grid */}
      <section className="bg-muted/30" aria-label="Article list">
        <div className="container py-16 md:py-24">
          {/* Filter pills */}
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/blog"
              className={cn(
                "inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium transition-smooth",
                !activeTag
                  ? "bg-primary text-primary-foreground shadow-subtle"
                  : "bg-accent/15 text-primary hover:bg-accent/25",
              )}
              data-ocid="blog.filter.all"
            >
              All
            </Link>
            {tags.map((tag) => {
              const isActive = activeTag === tag;
              return (
                <Link
                  key={tag}
                  to="/blog"
                  search={{ tag: isActive ? undefined : tag }}
                  className={cn(
                    "inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium transition-smooth",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-subtle"
                      : "bg-accent/15 text-primary hover:bg-accent/25",
                  )}
                  data-ocid={`blog.filter.${tag.toLowerCase().replace(/\s+/g, "_")}`}
                >
                  {tag}
                </Link>
              );
            })}
          </div>

          {/* Grid / empty */}
          {articles.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, i) => (
                <ArticleCard
                  key={article.slug}
                  article={article}
                  index={i + 1}
                />
              ))}
            </div>
          ) : (
            <div
              className="mt-10 flex flex-col items-center gap-4 rounded-xl border border-dashed border-border bg-card py-16 text-center"
              data-ocid="blog.empty_state"
            >
              <p className="serif-display text-xl font-semibold text-foreground">
                No articles found
              </p>
              <p className="max-w-md text-sm text-muted-foreground">
                {activeTag
                  ? `There are no articles tagged “${activeTag}” yet. Try a different filter or browse all articles.`
                  : "We are preparing fresh insights on GST, income tax, and business finance. Please check back soon."}
              </p>
              {activeTag && (
                <Button variant="outlineHero" asChild>
                  <Link to="/blog" data-ocid="blog.empty_state.view_all_button">
                    View all articles
                  </Link>
                </Button>
              )}
            </div>
          )}

          {/* CTA band */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            className="mt-16 flex flex-col items-start justify-between gap-6 rounded-xl border border-border bg-card p-8 shadow-card sm:flex-row sm:items-center"
          >
            <div className="flex max-w-xl flex-col gap-2">
              <h2 className="serif-display text-2xl font-semibold tracking-tight text-foreground">
                Need help with GST, tax, or compliance?
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Book a free consultation with ArthVeda Advisors — we help Pune’s
                businesses stay compliant and financially confident.
              </p>
            </div>
            <Button variant="hero" size="lg" asChild className="shrink-0">
              <Link to="/" data-ocid="blog.cta.book_consultation_button">
                Book Free Consultation
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default BlogPage;
