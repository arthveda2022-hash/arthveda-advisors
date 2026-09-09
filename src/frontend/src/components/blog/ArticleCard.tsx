import { Card } from "@/components/ui/card";
import type { Article } from "@/data/articles";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { motion } from "motion/react";

type ArticleCardProps = {
  article: Article;
  /** 1-based index for deterministic markers. */
  index: number;
  /** Optional className override for the wrapping motion div. */
  className?: string;
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
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

export function ArticleCard({ article, index, className }: ArticleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.45,
        delay: (index % 3) * 0.08,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={cn("h-full", className)}
    >
      <Link
        to="/blog/$slug"
        params={{ slug: article.slug }}
        className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl"
        data-ocid={`blog.article_card.${index}`}
        aria-label={`Read article: ${article.title}`}
      >
        <Card className="group h-full gap-0 overflow-hidden border-border/70 p-0 shadow-card transition-smooth hover:-translate-y-1 hover:border-accent/40 hover:shadow-elevated">
          {/* Cover image — 16:9 */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
            <img
              src={article.coverImage}
              alt={article.coverAlt}
              loading="lazy"
              className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>

          {/* Body */}
          <div className="flex flex-col gap-4 p-6">
            {/* Tags */}
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

            {/* Title */}
            <h3 className="serif-display text-xl font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary">
              {article.title}
            </h3>

            {/* Excerpt */}
            <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
              {article.excerpt}
            </p>

            {/* Byline row */}
            <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4">
              <div className="flex min-w-0 items-center gap-2.5">
                <span
                  className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary font-display text-xs font-semibold text-primary-foreground"
                  aria-hidden="true"
                >
                  {initials(article.authorName)}
                </span>
                <div className="flex min-w-0 flex-col leading-tight">
                  <span className="truncate text-xs font-medium text-foreground">
                    {article.authorName}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {article.authorRole}
                  </span>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-3 text-xs text-muted-foreground">
                <span>{formatDate(article.publishedDate)}</span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="size-3.5" aria-hidden="true" />
                  {article.readingTime} min
                </span>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}

export default ArticleCard;
