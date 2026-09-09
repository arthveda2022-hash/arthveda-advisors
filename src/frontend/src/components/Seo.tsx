import { useEffect } from "react";

/**
 * Seo — injects JSON-LD structured data scripts into the document head at
 * runtime for LocalBusiness (AccountingService), WebSite, and BreadcrumbList
 * schemas. Static meta tags (title, description, OG, Twitter, canonical, geo,
 * hreflang, robots) are set directly in index.html as defaults; this component
 * overrides title/description/canonical/OG dynamically per page when props are
 * provided.
 *
 * When `articleSchema` is provided, an Article JSON-LD script is injected.
 * When `blogSchema` is provided, a Blog/CollectionPage JSON-LD script is
 * injected. The base LocalBusiness, WebSite, and BreadcrumbList schemas are
 * always injected.
 *
 * Scripts are tagged with a data attribute so re-renders replace rather than
 * duplicate.
 */

const SITE_URL = "https://arthveda-advisors-oe2.caffeine.xyz/";

export type SeoProps = {
  /** Document <title>. Falls back to the index.html default when omitted. */
  title?: string;
  /** Meta description. Falls back to the index.html default when omitted. */
  description?: string;
  /** Path relative to SITE_URL, e.g. "blog" or "blog/gst-registration". */
  canonicalPath?: string;
  /** Absolute or path-relative OG image URL. */
  ogImage?: string;
  /** Article author name (drives Article schema + meta author). */
  articleAuthor?: string;
  /** ISO date string for Article schema datePublished. */
  articlePublishedDate?: string;
  /** Full Article JSON-LD object. When provided, Article schema is injected. */
  articleSchema?: Record<string, unknown>;
  /** Full Blog/CollectionPage JSON-LD object. When provided, Blog schema is injected. */
  blogSchema?: Record<string, unknown>;
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["AccountingService", "ProfessionalService", "LocalBusiness"],
  "@id": `${SITE_URL}#business`,
  name: "ArthVeda Advisors",
  description:
    "Pune-based financial advisory firm offering GST registration, income tax filing, business registration, accounting, bookkeeping, trademark filing, and due diligence services.",
  url: SITE_URL,
  telephone: "+91-76206-62243",
  email: "Arthveda2022@gmail.com",
  image: `${SITE_URL}assets/generated/og-cover.dim_1200x630.jpg`,
  logo: `${SITE_URL}assets/generated/og-cover.dim_1200x630.jpg`,
  priceRange: "₹₹",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, Credit Card, UPI, Bank Transfer",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Chandrai Capital, Ambegaon BK",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    postalCode: "411046",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 18.5204,
    longitude: 73.8567,
  },
  areaServed: "Pune",
  founder: {
    "@type": "Person",
    name: "Pandhari Burkul",
  },
  knowsAbout: [
    "GST Registration",
    "Income Tax Filing",
    "Business Registration",
    "Accounting",
    "Bookkeeping",
    "Trademark Registration",
    "Due Diligence",
  ],
  openingHours: "Mo-Fr 09:30-18:30, Sa 10:00-14:00",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:30",
      closes: "18:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "10:00",
      closes: "14:00",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "ArthVeda Advisors Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "GST Registration & Filing",
          description:
            "End-to-end GST registration, monthly and annual GST return filing, reconciliation, and compliance support for businesses in Pune.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Income Tax Return Filing",
          description:
            "Accurate and timely income tax return filing for individuals, professionals, and businesses with tax planning and refund support.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Business Registration",
          description:
            "Company, LLP, partnership, and proprietorship registration with all statutory compliances handled end-to-end.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Accounting & Bookkeeping",
          description:
            "Reliable accounting and bookkeeping services including ledger maintenance, financial statements, and MIS reporting.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Trademark Registration",
          description:
            "Trademark search, application filing, and opposition handling to protect your brand identity across India.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Due Diligence Services",
          description:
            "Comprehensive due diligence for mergers, acquisitions, and investments covering financial, tax, and compliance reviews.",
        },
      },
    ],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}#website`,
  url: SITE_URL,
  name: "ArthVeda Advisors",
  description:
    "GST, Income Tax & Accounting Consultants in Pune — ArthVeda Advisors.",
  publisher: { "@id": `${SITE_URL}#business` },
  inLanguage: "en-IN",
};

function buildBreadcrumb(path?: string) {
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
  ];
  if (path && path !== "" && path !== "/") {
    const segments = path.replace(/^\/+|\/+$/g, "").split("/");
    if (segments[0] === "blog") {
      items.push({
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}blog`,
      });
      if (segments[1]) {
        items.push({
          "@type": "ListItem",
          position: 3,
          name: "Article",
          item: `${SITE_URL}blog/${segments[1]}`,
        });
      }
    }
  }
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

const SCRIPT_MARKER = "data-arthveda-seo";

function setMeta(name: string, content: string) {
  let el = document.head.querySelector(
    `meta[name="${name}"][${SCRIPT_MARKER}]`,
  ) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    el.setAttribute(SCRIPT_MARKER, "true");
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setMetaProperty(property: string, content: string) {
  let el = document.head.querySelector(
    `meta[property="${property}"][${SCRIPT_MARKER}]`,
  ) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    el.setAttribute(SCRIPT_MARKER, "true");
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector(
    `link[rel="canonical"][${SCRIPT_MARKER}]`,
  ) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    el.setAttribute(SCRIPT_MARKER, "true");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setDocumentTitle(title: string) {
  let el = document.head.querySelector(
    `title[${SCRIPT_MARKER}]`,
  ) as HTMLTitleElement | null;
  if (!el) {
    el = document.createElement("title");
    el.setAttribute(SCRIPT_MARKER, "true");
    document.head.appendChild(el);
  }
  el.textContent = title;
}

export function Seo({
  title,
  description,
  canonicalPath,
  ogImage,
  articleAuthor,
  articlePublishedDate,
  articleSchema,
  blogSchema,
}: SeoProps) {
  useEffect(() => {
    // Remove any previously injected scripts (HMR / re-render safety).
    for (const node of document.querySelectorAll(`script[${SCRIPT_MARKER}]`)) {
      node.remove();
    }

    const schemas: Record<string, unknown>[] = [
      localBusinessSchema,
      websiteSchema,
      buildBreadcrumb(canonicalPath),
    ];
    if (articleSchema) schemas.push(articleSchema);
    if (blogSchema) schemas.push(blogSchema);

    for (const schema of schemas) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute(SCRIPT_MARKER, "true");
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    // Dynamic meta overrides — only set when provided.
    if (title) setDocumentTitle(title);
    if (description) {
      setMeta("description", description);
      setMetaProperty("og:description", description);
      setMeta("twitter:description", description);
    }
    if (title) {
      setMetaProperty("og:title", title);
      setMeta("twitter:title", title);
    }
    if (canonicalPath) {
      const canonicalHref = `${SITE_URL}${canonicalPath.replace(/^\/+/, "")}`;
      setCanonical(canonicalHref);
      setMetaProperty("og:url", canonicalHref);
    }
    if (ogImage) {
      const imageUrl = ogImage.startsWith("http")
        ? ogImage
        : `${SITE_URL}${ogImage.replace(/^\/+/, "")}`;
      setMetaProperty("og:image", imageUrl);
      setMeta("twitter:image", imageUrl);
    }
    if (articleAuthor) {
      setMeta("author", articleAuthor);
    }
    if (articlePublishedDate) {
      setMeta("article:published_time", articlePublishedDate);
    }

    return () => {
      for (const node of document.querySelectorAll(
        `script[${SCRIPT_MARKER}]`,
      )) {
        node.remove();
      }
    };
  }, [
    title,
    description,
    canonicalPath,
    ogImage,
    articleAuthor,
    articlePublishedDate,
    articleSchema,
    blogSchema,
  ]);

  return null;
}

export default Seo;
