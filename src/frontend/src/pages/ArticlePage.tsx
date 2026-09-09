import type { Article as BackendArticle } from "@/backend";
import { Seo } from "@/components/Seo";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { Button } from "@/components/ui/button";
import type { Article as StaticArticle } from "@/data/articles";
import { useBackend } from "@/hooks/useBackend";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Clock, Loader2 } from "lucide-react";
import { motion } from "motion/react";

const SITE_URL = "https://arthveda-advisors-oe2.caffeine.xyz/";
const RELATED_COUNT = 3;
const PLACEHOLDER_IMAGE = "/assets/images/placeholder.svg";

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** Resolve a backend Article's cover image to a renderable URL. */
function coverUrl(article: BackendArticle): string {
  return article.coverImage?.getDirectURL() ?? PLACEHOLDER_IMAGE;
}

/**
 * Adapt a backend Article to the static Article shape used by ArticleCard.
 * readingTime bigint → number; coverImage ExternalBlob → direct URL string.
 */
function toStaticArticle(article: BackendArticle): StaticArticle {
  return {
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    body: article.body,
    coverImage: coverUrl(article),
    coverAlt: article.coverAlt,
    authorName: article.authorName,
    authorRole: article.authorRole,
    publishedDate: article.publishedDate,
    readingTime: Number(article.readingTime),
    tags: article.tags,
  };
}

function buildArticleSchema(article: BackendArticle) {
  const image = coverUrl(article);
  const imageUrl = image.startsWith("http")
    ? image
    : `${SITE_URL}${image.replace(/^\//, "")}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}blog/${article.slug}`,
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedDate,
    dateModified: article.publishedDate,
    image: imageUrl,
    url: `${SITE_URL}blog/${article.slug}`,
    inLanguage: "en-IN",
    author: {
      "@type": "Person",
      name: article.authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "ArthVeda Advisors",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}assets/generated/og-cover.dim_1200x630.jpg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}blog/${article.slug}`,
    },
    articleSection: article.tags.join(", "),
    keywords: article.tags.join(", "),
  };
}

export function ArticlePage() {
  const params = useParams({ from: "/blog/$slug" });
  const slug = params.slug;
  const { actor, isFetching } = useBackend();

  const articleQuery = useQuery<BackendArticle | null>({
    queryKey: ["article", slug],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getPublishedArticle(slug);
    },
    enabled: !!actor && !isFetching,
  });

  // Fetch a few more than needed so we can drop the current article and
  // still fill RELATED_COUNT slots.
  const relatedQuery = useQuery<BackendArticle[]>({
    queryKey: ["article", slug, "related"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLatestArticles(BigInt(RELATED_COUNT + 1));
    },
    enabled: !!actor && !isFetching,
  });

  const loading = articleQuery.isLoading || (isFetching && !articleQuery.data);
  const article = articleQuery.data ?? null;

  if (loading) {
    return (
      <>
        <Seo
          title="Loading article… | ArthVeda Advisors"
          canonicalPath={`blog/${slug}`}
        />
        <section className="bg-background" aria-label="Loading article">
          <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-4 py-24 text-center">
            <Loader2
              className="size-6 animate-spin text-muted-foreground"
              aria-hidden="true"
            />
            <p
              className="text-sm text-muted-foreground"
              data-ocid="article.loading_state"
            >
              Loading article…
            </p>
          </div>
        </section>
      </>
    );
  }

  if (!article) {
    return (
      <>
        <Seo
          title="Article not found | ArthVeda Advisors"
          description="The article you are looking for could not be found."
          canonicalPath={`blog/${slug}`}
        />
        <section className="bg-background" aria-label="Article not found">
          <div
            className="container flex min-h-[60vh] flex-col items-center justify-center gap-6 py-24 text-center"
            data-ocid="article.empty_state"
          >
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-accent-foreground">
              404
            </span>
            <h1 className="serif-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Article not found
            </h1>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              The article you are looking for may have been moved, removed, or
              is not yet published. Browse our latest articles to find what you
              need.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button variant="hero" size="lg" asChild>
                <Link to="/blog" data-ocid="article.not_found.blog_button">
                  Browse all articles
                </Link>
              </Button>
              <Button variant="outlineHero" size="lg" asChild>
                <Link to="/" data-ocid="article.not_found.home_button">
                  Back to home
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </>
    );
  }

  const articleSchema = buildArticleSchema(article);
  const cover = coverUrl(article);
  const readingMinutes = Number(article.readingTime);

  const related: StaticArticle[] = (relatedQuery.data ?? [])
    .filter((a) => a.slug !== slug)
    .slice(0, RELATED_COUNT)
    .map(toStaticArticle);

  return (
    <>
      <Seo
        title={`${article.title} | ArthVeda Advisors`}
        description={article.excerpt}
        canonicalPath={`blog/${article.slug}`}
        ogImage={cover}
        articleAuthor={article.authorName}
        articlePublishedDate={article.publishedDate}
        articleSchema={articleSchema}
      />

      {/* Cover hero */}
      <section className="bg-background" aria-label="Article cover">
        <div className="container pt-10 md:pt-14">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              data-ocid="article.back_to_blog_link"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back to blog
            </Link>
          </motion.div>
        </div>

        <div className="container pt-8">
          {/* Title block */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="mx-auto flex max-w-2xl flex-col gap-5"
          >
            <div className="flex flex-wrap gap-1.5">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-medium text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="serif-display text-balance text-3xl font-semibold leading-[1.12] tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
              <span className="gold-underline">{article.title}</span>
            </h1>
            <p className="text-balance text-lg leading-relaxed text-muted-foreground">
              {article.excerpt}
            </p>

            {/* Byline meta row */}
            <div className="flex flex-wrap items-center gap-3 border-t border-border pt-5 text-sm text-muted-foreground">
              <div className="flex items-center gap-2.5">
                <span
                  className="flex size-9 items-center justify-center rounded-full bg-primary font-display text-xs font-semibold text-primary-foreground"
                  aria-hidden="true"
                >
                  {initials(article.authorName)}
                </span>
                <div className="flex flex-col leading-tight">
                  <span className="font-medium text-foreground">
                    {article.authorName}
                  </span>
                  <span className="text-xs">{article.authorRole}</span>
                </div>
              </div>
              <span aria-hidden="true" className="hidden sm:inline">
                ·
              </span>
              <span>{formatDate(article.publishedDate)}</span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3.5" aria-hidden="true" />
                {readingMinutes} min read
              </span>
            </div>
          </motion.div>
        </div>

        {/* Cover image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          className="container mt-10"
        >
          <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-border shadow-elevated">
            <div className="aspect-[16/9] w-full bg-muted">
              <img
                src={cover}
                alt={article.coverAlt}
                className="size-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Article body */}
      <section className="bg-background" aria-label="Article body">
        <div className="container py-12 md:py-16">
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="mx-auto max-w-2xl prose prose-neutral prose-lg
              prose-headings:font-display prose-headings:tracking-tight prose-headings:text-foreground
              prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-2xl prose-h2:font-semibold
              prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-xl prose-h3:font-semibold
              prose-p:leading-relaxed prose-p:text-muted-foreground
              prose-a:text-primary prose-a:underline-offset-2 hover:prose-a:text-primary/80
              prose-strong:text-foreground prose-strong:font-semibold
              prose-ul:my-5 prose-li:my-1 prose-li:text-muted-foreground
              prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:py-1 prose-blockquote:pr-4 prose-blockquote:text-foreground prose-blockquote:not-italic
              prose-img:rounded-lg"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: article body is authored in trusted TS data
            dangerouslySetInnerHTML={{ __html: article.body }}
          />
        </div>
      </section>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="bg-muted/30" aria-label="Related articles">
          <div className="container py-16 md:py-24">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
              className="flex max-w-2xl flex-col gap-3"
            >
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-accent-foreground">
                Keep reading
              </span>
              <h2 className="serif-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Related Articles
              </h2>
            </motion.div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rel, i) => (
                <ArticleCard key={rel.slug} article={rel} index={i + 1} />
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <Button variant="outlineHero" size="lg" asChild>
                <Link to="/blog" data-ocid="article.view_all_button">
                  View all articles
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default ArticlePage;
