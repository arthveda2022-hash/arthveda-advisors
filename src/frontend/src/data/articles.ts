/**
 * Code-based article data for the ArthVeda Advisors blog.
 * Articles are authored as TypeScript data (no admin editor) — see the
 * project's doNotBuild contract. Cover images live under
 * /assets/generated/ and were generated for each article.
 */

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  /** HTML body content — rendered inside a `prose` container. */
  body: string;
  coverImage: string;
  coverAlt: string;
  authorName: string;
  authorRole: string;
  /** ISO date string (YYYY-MM-DD). */
  publishedDate: string;
  /** Reading time in minutes. */
  readingTime: number;
  tags: string[];
};

export const ARTICLES: Article[] = [
  {
    slug: "gst-registration-process-in-pune",
    title: "GST Registration Process in Pune: Step-by-Step Guide",
    excerpt:
      "A practical, end-to-end walkthrough of GST registration for businesses in Pune — documents required, the portal process, common reasons for rejection, and how to stay compliant from day one.",
    body: `
<p>For most businesses in Pune with an annual turnover above the threshold limit, GST registration is not optional — it is a legal requirement. Yet the process is often treated as a box-ticking exercise, which leads to rejection notices, delays, and avoidable compliance headaches. This guide walks through the GST registration process step by step, with the documents and decisions Pune businesses need to get right the first time.</p>

<h2>1. Confirm whether you need to register</h2>
<p>Registration is mandatory if your aggregate turnover exceeds ₹40 lakh for goods (₹20 lakh for services) in a financial year. Special category businesses — inter-state suppliers, e-commerce operators, casual taxable persons, and those liable under reverse charge — must register regardless of turnover. If you supply goods or services across Maharashtra state borders from day one, registration is compulsory from the first invoice.</p>

<h2>2. Gather the required documents</h2>
<p>Before you begin on the GST portal, keep these documents ready as scanned copies:</p>
<ul>
  <li>PAN of the business and promoters</li>
  <li>Proof of business registration (incorporation certificate, partnership deed, or shop establishment licence)</li>
  <li>Address proof of the principal place of business (electricity bill, rent agreement, or property tax receipt)</li>
  <li>Bank account details with a cancelled cheque or bank statement</li>
  <li>Authorised signatory's photograph and Aadhaar</li>
  <li>Digital signature certificate (DSC) for companies and LLPs</li>
</ul>
<p>In Pune, the address proof must match the registered address exactly. A mismatch between the electricity bill name and the rent agreement is one of the most common reasons for show-cause notices.</p>

<h2>3. Apply on the GST portal</h2>
<p>Log in to <strong>gst.gov.in</strong>, navigate to Services → Registration → New Registration, and fill Part A with your PAN, mobile number, and email. An OTP is sent to both, and a Temporary Reference Number (TRN) is generated. Use the TRN within 15 days to complete Part B, where you upload documents, add business details, and appoint the authorised signatory.</p>

<h2>4. Verification and Aadhaar authentication</h2>
<p>After submission, the application is routed to the jurisdictional officer. Aadhaar authentication speeds this up — authenticated applications are typically approved within 3 working days. Without Aadhaar authentication, a physical site visit may be scheduled, extending the timeline to 7–10 working days.</p>

<h2>5. Receive your GSTIN</h2>
<p>Once approved, a 15-digit GST Identification Number (GSTIN) is issued and a registration certificate is made available for download. From this date, you must charge GST on taxable supplies, file periodic returns, and display your GSTIN on invoices and signage.</p>

<h2>Common reasons for rejection</h2>
<p>Most rejections in Pune come down to three issues: blurry or mismatched address proof, an incomplete rent agreement without a no-objection certificate from the landlord, and incorrect constitution (e.g. selecting "Proprietorship" when the PAN belongs to a company). A careful review before submission prevents weeks of back-and-forth.</p>

<h2>How ArthVeda Advisors helps</h2>
<p>We handle the entire registration process end-to-end — document review, portal filing, officer follow-up, and the first return filing — so your business starts compliant. Book a free consultation to get started.</p>
`,
    coverImage: "/assets/generated/blog-gst-registration-pune.dim_1200x675.jpg",
    coverAlt:
      "Open GST registration certificate with a fountain pen and brass paperweight on a soft off-white surface",
    authorName: "Pandhari Burkul",
    authorRole: "Founder & Lead Advisor",
    publishedDate: "2026-01-12",
    readingTime: 6,
    tags: ["GST", "Business Registration"],
  },
  {
    slug: "income-tax-filing-deadlines-2026",
    title:
      "Income Tax Filing Deadlines 2026: What Pune Businesses Need to Know",
    excerpt:
      "The 2026 income tax filing calendar brings a few shifts that Pune businesses cannot afford to miss. Here is a clear breakdown of every due date, who it applies to, and the cost of missing it.",
    body: `
<p>Missing an income tax filing deadline is rarely a one-off penalty — it cascades into interest under sections 234A, 234B, and 234C, loss of carry-forward benefits, and in some cases, prosecution exposure. For Pune businesses, the 2026 calendar has a few dates worth marking early.</p>

<h2>Audit-assessed businesses: 31 October 2026</h2>
<p>Companies, LLPs, and proprietorships whose turnover requires a tax audit under section 44AB must file their return by 31 October 2026. This applies to businesses with turnover above ₹1 crore (₹10 crore if 95% of receipts and payments are digital), and to professionals with gross receipts above ₹50 lakh. The audit report in Form 3CA-3CD or 3CB-3CD must be filed before the return.</p>

<h2>Non-audit businesses and working professionals: 31 July 2026</h2>
<p>Proprietorships and professionals below the audit threshold, along with individuals and HUFs not covered by audit, must file by 31 July 2026. This is the most commonly missed deadline — not because businesses forget, but because documentation (Form 16, capital gains statements, 80D receipts) is gathered late.</p>

<h2>Transfer pricing reports: 31 October 2026</h2>
<p>Entities with international or specified domestic transactions above the prescribed threshold must file Form 3CEB by 31 October 2026, ahead of the ITR filing. Pune's growing export-oriented IT and manufacturing units should treat this as a separate workstream, not a last-minute add-on.</p>

<h2>Quarterly TDS/TCS returns</h2>
<p>For businesses that deduct tax at source, the quarterly due dates remain:</p>
<ul>
  <li>Q1 (Apr–Jun): 31 July 2026</li>
  <li>Q2 (Jul–Sep): 31 October 2026</li>
  <li>Q3 (Oct–Dec): 31 January 2027</li>
  <li>Q4 (Jan–Mar): 31 May 2027</li>
</ul>
<p>TDS certificates (Form 16 and 16A) and the annual return in Form 24Q/27Q follow their own timelines — late filing attracts a fee of ₹200 per day under section 234E, capped at the TDS amount.</p>

<h2>Belated and revised returns</h2>
<p>If you miss the original due date, a belated return under section 139(4) can be filed by 31 December 2026, with a late fee of ₹1,000–₹5,000 depending on income. A revised return under section 139(5) — to correct errors in an already-filed return — is also available until 31 December 2026.</p>

<h2>The cost of missing a deadline</h2>
<p>Beyond the late fee, missing the due date forfeits the right to carry forward certain losses (business and capital gains), triggers interest on unpaid tax, and can disallow refund claims until the return is filed. For businesses, it also weakens your position in any future scrutiny assessment.</p>

<h2>Plan ahead with ArthVeda Advisors</h2>
<p>We maintain a filing calendar for every client, send reminders 30 days before each due date, and prepare the return in advance so there is no last-minute scramble. Get in touch to set up your 2026 filing calendar.</p>
`,
    coverImage:
      "/assets/generated/blog-income-tax-deadlines-2026.dim_1200x675.jpg",
    coverAlt:
      "Calendar marked with key dates, calculator, and stacked financial documents on a soft off-white surface",
    authorName: "Pandhari Burkul",
    authorRole: "Founder & Lead Advisor",
    publishedDate: "2026-02-04",
    readingTime: 5,
    tags: ["Income Tax"],
  },
  {
    slug: "choose-right-business-structure-maharashtra",
    title: "How to Choose the Right Business Structure in Maharashtra",
    excerpt:
      "Sole proprietorship, partnership, LLP, or private limited company — the choice you make at registration shapes your tax exposure, liability, and ability to raise funds. Here is how to decide.",
    body: `
<p>The business structure you choose at registration is not a formality — it determines your personal liability, your tax burden, your compliance load, and how easily you can raise capital. For entrepreneurs in Maharashtra, the decision should be driven by the nature of the business, the number of founders, and the long-term vision. Here is a practical comparison.</p>

<h2>Sole proprietorship</h2>
<p>The simplest structure — one owner, no separate legal entity, and minimal compliance. It is ideal for small service providers, freelancers, and local traders testing a business idea. The trade-off is unlimited personal liability: business debts can be recovered from personal assets, and the business ceases on the owner's death. Tax is paid at individual slab rates, which can be advantageous at lower incomes but inefficient once profits grow.</p>

<h2>Partnership firm</h2>
<p>A partnership is governed by the Indian Partnership Act and is created by a partnership deed. It allows two or more people to share profits, capital, and management. Like a proprietorship, partners have unlimited liability and the firm is not a separate legal entity. Partnership firms are taxed at 30% (plus surcharge and cess), which is higher than the individual slabs that apply to proprietorships at lower incomes.</p>

<h2>Limited Liability Partnership (LLP)</h2>
<p>An LLP combines the operational flexibility of a partnership with the limited liability of a company. Partners are liable only to the extent of their contribution. It has fewer compliance requirements than a private limited company and is a popular choice for professional firms and small businesses in Pune. LLPs are taxed at 30% (plus surcharge and cess), though certain conditions can reduce the effective rate.</p>

<h2>Private limited company</h2>
<p>A private limited company is a separate legal entity with shareholders and directors. It offers the strongest liability protection, is the most recognised structure for raising equity, and is preferred by investors and lenders. Compliance is heavier — board meetings, statutory audits, annual filings with the Registrar of Companies (ROC), and director responsibilities under the Companies Act. Tax is levied at 25% (turnover up to ₹400 crore) or 30%, plus surcharge and cess.</p>

<h2>How to decide</h2>
<p>Ask four questions:</p>
<ul>
  <li><strong>Will you raise external funding?</strong> If yes, a private limited company is almost always required.</li>
  <li><strong>How many founders are involved?</strong> Two or more founders usually need a partnership, LLP, or company — not a proprietorship.</li>
  <li><strong>Is personal asset protection important?</strong> For businesses with significant contracts, inventory, or debt, choose an LLP or company.</li>
  <li><strong>How much compliance can you handle?</strong> Proprietorships and LLPs have the lightest load; companies have the heaviest.</li>
</ul>

<h2>Switching structures later</h2>
<p>It is possible to convert a proprietorship into a partnership, LLP, or company — but each conversion has tax and legal implications, and some benefits (like carry-forward losses) are conditional. Choosing the right structure early avoids costly restructuring later.</p>

<h2>Get advice before you register</h2>
<p>The cost of getting the structure wrong — in tax, liability, and lost funding opportunities — is far higher than the cost of a consultation. At ArthVeda Advisors, we help Pune entrepreneurs choose and register the right structure for their business. Book a free consultation to discuss your case.</p>
`,
    coverImage:
      "/assets/generated/blog-business-structure-maharashtra.dim_1200x675.jpg",
    coverAlt:
      "Wooden building blocks arranged in different business-structure shapes with a brass scale of justice on a soft off-white surface",
    authorName: "Pandhari Burkul",
    authorRole: "Founder & Lead Advisor",
    publishedDate: "2026-02-18",
    readingTime: 7,
    tags: ["Business Registration"],
  },
  {
    slug: "common-gst-mistakes-small-businesses",
    title: "Common GST Mistakes Small Businesses Make",
    excerpt:
      "From mismatched invoices to missed reverse-charge entries, these are the GST errors that quietly cost Pune small businesses the most — and how to prevent them.",
    body: `
<p>Most GST penalties small businesses face are not the result of evasion — they are the result of avoidable errors. A wrong HSN code, a missed reverse-charge entry, or an invoice that does not match the supplier's return can each trigger a notice. Here are the most common GST mistakes we see at ArthVeda Advisors, and how to prevent them.</p>

<h2>1. Mismatched invoices between GSTR-1 and GSTR-2B</h2>
<p>The GST system reconciles what you report as a supplier (GSTR-1) against what your suppliers report about you (GSTR-2B). If a supplier files late or reports a different amount, your input tax credit (ITC) is blocked. The fix is procedural: reconcile supplier invoices against GSTR-2B every month before filing, and follow up with suppliers whose returns are missing.</p>

<h2>2. Claiming ITC on ineligible expenses</h2>
<p>Section 17(5) of the CGST Act blocks ITC on a defined list of expenses — motor vehicles for non-transport businesses, construction of immovable property (with exceptions), and goods lost, stolen, or destroyed, among others. Claiming ITC on these is one of the most common reasons for recovery notices. Maintain a clear list of blocked expenses and exclude them from your ITC workings.</p>

<h2>3. Missing reverse-charge entries</h2>
<p>Reverse charge applies to specified services — most notably, legal services from advocates and the Goods Transport Agency (GTA) when paid on a non-forward-charge basis. These must be self-invoiced, and the tax paid in cash. Missing reverse-charge entries lead to interest and penalty, even when the underlying expense is legitimate.</p>

<h2>4. Wrong HSN/SAC codes</h2>
<p>HSN (goods) and SAC (services) codes determine the rate of tax and the place of supply. A wrong code can mean underpayment of tax, denial of ITC for the recipient, or a wrong tax rate charged to the customer. Businesses with turnover above ₹5 crore must report 4-digit HSN codes; smaller businesses report 4-digit codes for B2B and may use 2-digit for B2C. Review your HSN/SAC mapping annually.</p>

<h2>5. Not filing nil returns</h2>
<p>Even if there is no business activity in a period, a nil GST return must be filed. Skipping a nil return attracts a late fee of ₹50 per day (₹20 per day for nil returns) and can lead to suspension of the GSTIN after repeated defaults.</p>

<h2>6. Ignoring e-invoice and e-way bill thresholds</h2>
<p>Businesses with turnover above ₹5 crore must generate e-invoices for B2B supplies. E-way bills are required for movement of goods above ₹50,000 in value. Missing either can result in detention of goods, penalty, and denial of ITC for the recipient.</p>

<h2>7. Poor record-keeping</h2>
<p>GST law requires records to be maintained for six years from the end of the financial year. Invoices, credit notes, debit notes, and reconciliation statements must be retrievable on demand. Disorganised records make scrutiny assessments far harder — and far more expensive — than they need to be.</p>

<h2>How to prevent these mistakes</h2>
<p>Most of these errors are preventable with a monthly reconciliation routine, a clear ITC eligibility list, and a calendar of filing dates. At ArthVeda Advisors, we provide monthly GST compliance for Pune small businesses — reconciliation, filing, and proactive flagging of issues before they become notices. Get in touch to set up your compliance routine.</p>
`,
    coverImage: "/assets/generated/blog-common-gst-mistakes.dim_1200x675.jpg",
    coverAlt:
      "Stack of GST return forms with a red exclamation mark stamp and a magnifying glass on a soft off-white surface",
    authorName: "Pandhari Burkul",
    authorRole: "Founder & Lead Advisor",
    publishedDate: "2026-03-09",
    readingTime: 6,
    tags: ["GST", "Accounting"],
  },
  {
    slug: "trademark-registration-india-complete-guide",
    title: "Trademark Registration in India: A Complete Guide",
    excerpt:
      "Your brand is one of your most valuable assets. This guide walks through the trademark registration process in India — search, application, examination, opposition, and renewal.",
    body: `
<p>A trademark is how your customers recognise you — your name, logo, tagline, or a distinctive combination. Registering it gives you exclusive legal rights across India, the ability to stop copycats, and a valuable asset you can license or sell. This guide walks through the full registration process under the Trade Marks Act, 1999.</p>

<h2>1. What can be registered?</h2>
<p>Under Indian law, a trademark can include a word, logo, slogan, shape of goods, packaging, combination of colours, or even a sound — provided it is capable of distinguishing your goods or services from others. Generic or descriptive terms are difficult to register; distinctive, coined terms are the strongest.</p>

<h2>2. Conduct a trademark search</h2>
<p>Before applying, search the public trademark database at <strong>ipindia.gov.in</strong> to check whether an identical or similar mark is already registered or pending in your class. The Nice Classification groups goods and services into 45 classes — goods in classes 1–34, services in 35–45. A mark available in one class may be taken in another, so search across all relevant classes.</p>

<h2>3. File the application</h2>
<p>The application is filed online through the IP India portal, with the applicant's details, a representation of the mark, the class, and a description of goods or services. The government fee is ₹4,500 per class for individuals, startups, and small enterprises, and ₹9,000 per class for others. Once filed, the application is allotted a number and the mark can be used with the ™ symbol.</p>

<h2>4. Examination by the registry</h2>
<p>The trademark office examines the application on absolute grounds (distinctiveness) and relative grounds (similarity to existing marks). The examination report issues within 1–3 months. If objections are raised, a reply must be filed within 30 days, often with evidence of distinctiveness or use. If the examiner is satisfied, the mark is advertised in the Trade Marks Journal.</p>

<h2>5. Opposition period</h2>
<p>Once advertised, the mark is open to opposition by any third party for four months. If opposed, both parties file evidence and a hearing is held. Most applications proceed without opposition, but a well-known mark in a contested class can face challenges.</p>

<h2>6. Registration and the ® symbol</h2>
<p>If no opposition is filed — or if opposition is decided in your favour — the mark is registered and a registration certificate is issued. Registration is valid for 10 years from the date of application and can be renewed indefinitely. Only after registration can the ® symbol be used; using ® before registration is an offence.</p>

<h2>7. Renewal and maintenance</h2>
<p>Renewal is due every 10 years, with a window of six months before and six months after the expiry date (with a late fee). A registered mark can be removed from the register for non-use if it has not been used for five consecutive years — so maintain evidence of use (invoices, advertising, packaging) to defend the mark if challenged.</p>

<h2>Common pitfalls</h2>
<ul>
  <li><strong>Skipping the search</strong> — applying for a mark already taken wastes the fee and months of time.</li>
  <li><strong>Wrong class</strong> — registering in the wrong class leaves your actual goods or services unprotected.</li>
  <li><strong>Descriptive marks</strong> — marks that describe the goods (e.g. "Soft Cotton" for textiles) face examination objections.</li>
  <li><strong>Not responding to examination reports</strong> — applications are abandoned if the reply is not filed in time.</li>
</ul>

<h2>How ArthVeda Advisors helps</h2>
<p>We handle the full trademark lifecycle — search, application drafting, examination reply, opposition defence, and renewal tracking — so your brand stays protected without you navigating the registry alone. Book a free consultation to discuss your mark.</p>
`,
    coverImage:
      "/assets/generated/blog-trademark-registration-india.dim_1200x675.jpg",
    coverAlt:
      "Trademark registration certificate with a wax seal and a brass TM symbol paperweight on a soft off-white surface",
    authorName: "Pandhari Burkul",
    authorRole: "Founder & Lead Advisor",
    publishedDate: "2026-03-24",
    readingTime: 7,
    tags: ["Business Registration"],
  },
];

/** All unique tags across articles, in a stable display order. */
export const ALL_TAGS: string[] = (() => {
  const seen = new Set<string>();
  const ordered: string[] = [];
  for (const article of ARTICLES) {
    for (const tag of article.tags) {
      if (!seen.has(tag)) {
        seen.add(tag);
        ordered.push(tag);
      }
    }
  }
  return ordered;
})();

/** Lookup an article by slug. Returns undefined if not found. */
export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((article) => article.slug === slug);
}

/** Articles sorted newest-first by published date. */
export function getArticlesSorted(): Article[] {
  return [...ARTICLES].sort((a, b) =>
    b.publishedDate.localeCompare(a.publishedDate),
  );
}

/** The N most recent articles (newest-first). */
export function getLatestArticles(count: number): Article[] {
  return getArticlesSorted().slice(0, count);
}

/** Articles that include the given tag (case-sensitive). Empty tag returns all. */
export function getArticlesByTag(tag: string | null): Article[] {
  const sorted = getArticlesSorted();
  if (!tag) return sorted;
  return sorted.filter((article) => article.tags.includes(tag));
}
