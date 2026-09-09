# Design Brief — ArthVeda Advisors ("ArthVeda Established")

> Trustworthy Pune financial-advisory aesthetic. Light theme primary; deep teal-green for trust, warm gold for CTAs. Serif display + clean sans body.

## Direction
"ArthVeda Established" — premium, established, calm authority. Editorial serif headlines over a quiet off-white canvas; gold used like a seal of trust, never as decoration.

## Tone
Professional, reassuring, precise. Reads like a private advisor's letterhead — confident, not loud. Generous whitespace, restrained color, typographic hierarchy doing the heavy lifting.

## Color Palette
| Token | Light (OKLCH) | Dark (OKLCH) | Use |
|---|---|---|---|
| background | 0.985 0.004 95 | 0.18 0.018 240 | Page canvas |
| foreground | 0.21 0.02 240 | 0.95 0.006 95 | Body text |
| primary | 0.42 0.14 240 | 0.72 0.13 220 | Trust teal-green, links, headings accents |
| accent | 0.72 0.15 75 | 0.78 0.14 75 | Warm gold — CTAs, highlights, seals |
| secondary | 0.95 0.012 240 | 0.27 0.022 240 | Quiet surfaces |
| muted-foreground | 0.52 0.018 240 | 0.62 0.015 95 | Captions, meta |
| card | 1.0 0.003 95 | 0.22 0.02 240 | Elevated surfaces |
| border | 0.9 0.01 240 | 0.32 0.02 240 | Hairlines |
| destructive | 0.55 0.22 25 | 0.62 0.2 22 | Errors |

## Typography
- Display: Fraunces (serif, opsz 9–144) — h1–h5, brand wordmark, article titles. Letter-spacing -0.015em.
- Body: General Sans (fallback Inter / system-ui) — paragraphs, UI, forms, article prose.
- Mono: JetBrains Mono — figures, codes, tabular data.
- Article body uses `prose` typography plugin: serif headings, sans paragraphs, 1.75rem leading, max-w-2xl measure.
- Binary font copy was blocked; Google Fonts @import + local() system fallbacks used. See index.css `@font-face`.

## Elevation
- `shadow-subtle`: cards at rest — 1–2px soft teal-tinted.
- `shadow-elevated`: hover/focus lift — 4px diffuse.
- `shadow-card`: default content card.
- `shadow-gold`: gold CTA glow — warm 2px halo.
- Dark theme shadows use same tokens at lower opacity.

## Structural Zones
1. Header — sticky, transparent→solid on scroll; serif logo left, nav + gold "Book Consultation" CTA right. Blog link added to NAV_LINKS (route /blog, not anchor).
2. Hero — editorial split: serif headline + trust line; right-side advisor card with founder name.
3. Services grid — 3×2 cards, gold icon, serif title, 2-line description.
4. Latest Articles (NEW) — 3-card row on bg-background, after Services, before About. See Blog Surfaces.
5. About — left narrative; right Card with office address/phone/email/hours.
6. Contact — form on bg-muted/30, left Card with CONTACT_DETAILS, right react-hook-form.
7. Footer — 4-column: brand, services, contact, legal; deep teal background. Blog link added to QUICK_LINKS.

## Spacing
8px base. Section padding `py-16 md:py-24` (6rem desktop / 3rem mobile). Card padding 1.5rem. Container max 1400px centered, 2rem gutter. Article body max-w-2xl (42rem) for reading measure.

## Component Patterns
- Cards: `rounded-lg` (0.625rem), `shadow-card`, 1px border, hover lifts to `shadow-elevated` + `-translate-y-1`.
- Buttons: primary teal solid; gold variant (`variant=hero`) for consultation CTA only; `variant=outlineHero` for secondary.
- Accordion: serif question, sans answer, gold plus-icon rotate.
- Forms: floating labels, teal focus ring, gold submit.
- Badges: pill, gold-tinted background (`bg-accent/15`), teal text. Tag chips reuse this pattern.
- Article cards: cover image (16:9, `rounded-t-lg`), Card body with serif title, 2-line excerpt clamp, byline row (avatar dot + author + date), tag chips. Whole card links via `<Link to="/blog/:slug">`.

## Motion
- 300ms cubic-bezier(0.4,0,0.2,1) for all transitions (`.transition-smooth`).
- Cards: translateY(-2px) + shadow elevation on hover.
- Section entrance: staggered fade-up via framer-motion (variants stagger 0.08s, fade 0.5s). Reused on blog cards and article hero.
- Accordion: height ease-out 200ms.
- No parallax, no autoplay, no decorative animation — motion only confirms intent.

## Constraints
- Multi-route site (TanStack Router): / (homepage), /blog (listing), /blog/:slug (article). Existing in-page anchors (#services, #about, #contact) remain on /.
- No admin article editor, no email newsletter signup (per doNotBuild). Articles are code-based TS data.
- No Google Search Console verification meta tag or submission flow.
- Light theme is default; dark theme must remain fully functional.
- All colors OKLCH; no hex/named colors in components.
- Accessibility: AA contrast on all text; focus-visible rings on all interactive elements.

## Blog Surfaces (NEW)
| Surface | Layout | Tokens Reused | New Tokens |
|---|---|---|---|
| Homepage Latest Articles | 3-card grid after Services, `py-16 md:py-24`, section header with gold-underline + "View all articles" outlineHero CTA → /blog | Card, Button outlineHero, shadow-card→elevated, staggered fade-up | None |
| Blog listing /blog | Page header (serif h1 + intro p, `py-16 md:py-24`), tag filter row (pill badges, active = bg-primary text-primary-foreground), 3-col card grid (1-col mobile), empty state Card | Card, badge pill, bg-muted/30 page bg, staggered fade-up | None |
| Article /blog/:slug | Cover hero (16:9 full-width, `rounded-lg`), serif h1, byline row (author + role + date + reading time), tag chips, `prose` body max-w-2xl, back link, related-articles 3-card row | Card, badge, Button outlineHero (back link as ghost), shadow-card | None |

- Article card grid: `grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8`.
- Tag filter: horizontal scroll on mobile, wrap on desktop; URL search param `?tag=GST` persisted.
- Related articles: 2–3 cards sharing a tag, same Card pattern, below article body.
- Not-found state: centered Card with serif "Article not found" + ghost Button → /blog.
- SEO: Seo.tsx extended with props (title, description, canonical, ogImage, article author/date); Article + Blog JSON-LD via existing `data-arthveda-seo` script pattern with cleanup.

## Admin Editor Area (NEW — extends, never overrides, public tokens)
Hidden /admin (owner-only via Internet Identity; no header/footer link). Reuses Layout, Card, Button (primary teal, outlineHero secondary, gold hero for "New Article"). Public tokens untouched.

### Admin Tokens (index.css :root + .dark)
| Token | Light | Dark | Use |
|---|---|---|---|
| admin-surface | 0.97 0.006 95 | 0.22 0.02 240 | Article list panel |
| admin-chrome | 0.99 0.004 95 | 0.24 0.022 240 | Editor form chrome |
| status-draft / -bg | 0.62 0.04 75 / 0.93 0.025 75 | 0.72 0.08 75 / 0.3 0.04 75 | Draft badge text / fill |
| status-published / -bg | 0.52 0.12 160 / 0.9 0.05 160 | 0.7 0.13 160 / 0.28 0.05 160 | Published badge text / fill |
| editor-toolbar | 0.985 0.004 95 | 0.24 0.022 240 | Quill toolbar bg |

### Admin Utilities & Layout
- `.status-badge` pill + dot; `.status-draft` / `.status-published` set color+bg. `.admin-surface` / `.admin-chrome` panel bgs. `.editor-content .ql-editor` General Sans 1.75 leading 42rem; `.ql-editor h1–h3` Fraunces. Tailwind: `bg-admin-surface/chrome`, `bg-status-draft/published`, `animate-badge-pop`.
- Split view: left list (admin-surface 35% / stacked mobile), right editor (admin-chrome 65%). List row = 16:9 thumb + serif title (2-line clamp) + byline + status badge; selected = teal left border + `bg-primary/5`.
- Editor chrome: back arrow + serif "Edit Article" + Save Draft (outlineHero) / Publish (primary). Form: Title (serif placeholder), Author + Tags (pill chips, free-form "+"), Quill toolbar + content, cover upload dropzone (dashed teal), footer Delete (destructive-text) + Save/Publish. Validation: title+body required; sonner toast on create/edit/delete/publish. No scheduled publish, no analytics, no multi-author roles (per doNotBuild).

## Signature Detail
The gold underline accent (`.gold-underline` utility) beneath key serif phrases — a quiet "seal of trust" mark evoking notary embossing, used on hero headline, section titles, and article page h1.
