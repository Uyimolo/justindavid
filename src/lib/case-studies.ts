// src/lib/case-studies.ts
import type { StaticImageData } from "next/image";
import jacinthforge from "@/src/assets/images/jacinthforge.webp";
import osagiemedia from "@/src/assets/images/osagiemedia.webp";
import justindavid from "@/src/assets/images/justindavid-hero.webp";
import pastura from "@/src/assets/images/pastura.webp";

export type CaseStudySection = {
  id: string;
  heading: string;
  /** Paragraphs. Each string is one <p>. */
  body: string[];
  /** Optional code block rendered after the body. */
  code?: {
    language: string;
    content: string;
    caption?: string;
  };
  /** Optional bullet list rendered after the body (and after code, if both present). */
  list?: string[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  tagline: string;
  /** Short one-liner under the title in the hero. */
  summary: string;
  year: string;
  duration: string;
  role: string;
  status: "live" | "delivered" | "ongoing";
  liveUrl?: string;
  repoUrl?: string;
  heroImage: StaticImageData;
  overview: string;
  brief: string;
  constraints: string[];
  sections: CaseStudySection[];
  impact: { label: string; value: string; note?: string }[];
  stack: { group: string; items: string[] }[];
  reflection: string;
  /** Optional. Renders as a "Progress" section before "Impact".
   *  Only set for ongoing projects. */
  progress?: {
    shipped: string[];
    next: string[];
  };
};

export const caseStudies: CaseStudy[] = [


  // ─────────────────────────────────────────────────────────────
  // OSAGIE MEDIA
  // ─────────────────────────────────────────────────────────────
  {
    slug: "osagiemedia",
    title: "Osagie Media",
    tagline: "Solo build • Delivered in four weeks",
    summary:
      "A full-stack marketing site and admin panel for a UK wedding photographer, with a live booking-to-deposit flow and a DNS migration that turned into an upgrade.",
    year: "2026",
    duration: "4 weeks",
    role: "Sole Developer",
    status: "delivered",
    liveUrl: "https://osagiemedia.com",
    heroImage: osagiemedia,
    overview:
      "Osagie Media is a wedding photography studio. The brief was a public site that felt premium, an admin panel the photographer could actually use without calling me, and a booking flow that didn't ask for money before the photographer had confirmed they were available.",
    brief:
      "Build the whole thing, deploy it, hand it over. The client owned a domain registered at GoDaddy, ran their email through Microsoft 365, and had no technical background. They wanted a booking system that collected a deposit — but only after they'd confirmed the date was free. And they wanted it live in four weeks.",
    constraints: [
      "Solo developer, four-week deadline, no team",
      "Zero hosting budget — the entire stack had to run on free tiers without violating terms of service",
      "Client is non-technical. Anything they can't edit through an admin panel is a support ticket six months later",
      "Booking flow cannot request a deposit until the photographer has explicitly confirmed availability",
      "The client's existing Microsoft 365 inbox cannot break during DNS work",
    ],
    sections: [
      {
        id: "rendering-strategy",
        heading: "Two rendering strategies in one app",
        body: [
          "The public site and the admin panel have opposite data requirements. Public pages are read-heavy, change rarely, and benefit from caching at the edge. The admin panel is write-heavy, single-user, and needs to see the truth the moment a mutation lands.",
          "I started with React Server Components on both. On the public site that worked. On the admin panel it was wrong — every mutation required a full server round-trip and a router refresh, and the optimistic states felt sluggish on a slow connection. Mid-project I migrated the admin panel to TanStack Query while leaving the public site on RSC.",
          "The split lives at one file: src/app/admin/(authed)/layout.tsx. Everything above that boundary is server-rendered. Everything below it is a client island that talks to Route Handlers over fetch.",
          "The payoff was honest: the public site stayed fast, and the admin panel got the optimistic UI and cache management it needed. The cost was one migration I could have avoided by asking the right question at the start — 'who is this screen optimised for?' — before writing a single component.",
        ],
      },
      {
        id: "deposit-flow",
        heading: "Post-confirmation deposit flow with HMAC tokens",
        body: [
          "The client's requirement was specific: the client submits a booking enquiry, the photographer reviews it, and only after they confirm the date is free does the client get asked for a deposit. That meant the deposit request needed to be a state transition, not a form field.",
          "I modelled the booking lifecycle as a state machine: PENDING → AWAITING_DEPOSIT → CONFIRMED → COMPLETED, with DECLINED and CANCELLED as terminal off-ramps. The state machine is the deposit tracker — no parallel depositStatus field, no risk of the two falling out of sync.",
          "When the admin confirms availability, they get a modal with the deposit amount prefilled from the package's category. They can override it — repeat clients, corporate discounts, negotiated rates. On submit, the backend writes the amount and percentage to the booking (snapshot, not recompute), signs an HMAC token, and emails the client a link.",
          "The token format is {bookingId}.{expiryUnix}.{hmac}, base64url-encoded. There's no token table — no rows to clean up, no expiry sweeps. Revocation is handled by state: once the booking leaves AWAITING_DEPOSIT, the token stops working because the verification step rejects it.",
        ],
        code: {
          language: "typescript",
          caption:
            "Token verification is stateless. The state machine is the revocation list.",
          content: `// src/lib/bookings/booking-token.ts (excerpt)
export function verifyBookingToken(token: string) {
  const decoded = Buffer.from(token, "base64url").toString("utf-8");
  const [bookingId, expiryStr, providedHmac] = decoded.split(".");

  const expiry = Number(expiryStr);
  if (!bookingId || !expiry || !providedHmac) return null;
  if (Date.now() / 1000 > expiry) return null;

  const expectedHmac = createHmac("sha256", env.BOOKING_TOKEN_SECRET)
    .update(\`\${bookingId}.\${expiry}\`)
    .digest("hex");

  const a = Buffer.from(providedHmac);
  const b = Buffer.from(expectedHmac);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  return { bookingId, expiry };
}`,
        },
      },
      {
        id: "image-pipeline",
        heading: "Images never touch the deployment platform",
        body: [
          "The deployment ran on Netlify's free tier. Bandwidth credits would be consumed by every image request the site served. A photography portfolio would blow through them in a week.",
          "The solution was to point every image URL directly at Cloudflare R2 through a custom Next.js image loader. The loader maps the requested width to one of three pre-generated variants — thumb, medium, large — and returns the R2 URL. Netlify never sees an image request.",
          "Processing happens in the browser before upload. The admin selects a file, the canvas API resizes and converts it to WebP, and the processed file goes straight to R2 through a presigned PUT. The server never touches image bytes. R2 never stores originals.",
        ],
        code: {
          language: "typescript",
          caption:
            "One loader file, no image CDN, no bandwidth credits spent on media.",
          content: `// src/lib/r2-image-loader.ts
import type { ImageLoaderProps } from "next/image";

export default function r2Loader({ src, width }: ImageLoaderProps) {
  const variant = width <= 600 ? "thumb" : width <= 1400 ? "medium" : "large";
  return src.replace(".webp", \`-\${variant}.webp\`);
}`,
        },
      },
      {
        id: "dns-migration",
        heading: "The DNS migration that wasn't supposed to be one",
        body: [
          "The domain was registered at GoDaddy. Email ran through Microsoft 365, resold through GoDaddy. DNS was managed at GoDaddy. The plan was to add five records — an A record, a www CNAME, and three DKIM/SPF records for Resend — and be done in two hours.",
          "GoDaddy's delegate session broke. The login flow redirected into a mandatory phone verification interstitial, which failed six times before locking the verification method for 24 hours. The client's own login worked, but routing them through manual DNS edits on a live production zone was a bad idea — one mistyped DKIM value would silently break their email.",
          "I migrated the zone to Cloudflare instead. Cloudflare's import tool scanned the existing zone and pulled all 17 records automatically, including the long Microsoft selector1 and selector2 DKIM CNAMEs. What had been a blocker became an upgrade: Cloudflare's DNS panel doesn't lock you out, propagates faster, and supports R2 custom domains natively — which the original plan had deferred for lack of a Cloudflare zone.",
          "The migration took a day. The client's inbox never broke. And the deferred R2 custom domain and cache rules became possible immediately after.",
        ],
      },
    ],
    impact: [
      { label: "Delivery", value: "4 weeks", note: "Kickoff to live production" },
      { label: "PageSpeed (mobile)", value: "100 / 96 / 100 / 100", note: "Perf / A11y / BP / SEO" },
      { label: "Security checklist", value: "21 / 21", note: "All items verified with evidence" },
      { label: "Year-one cost", value: "$0", note: "Excluding client-owned domain" },
    ],
    stack: [
      { group: "Framework", items: ["Next.js 16", "React 19", "TypeScript"] },
      { group: "Data", items: ["Prisma 7", "Neon Postgres", "TanStack Query"] },
      { group: "Storage", items: ["Cloudflare R2", "Custom image loader"] },
      { group: "Email", items: ["Resend", "React Email"] },
      { group: "Infra", items: ["Vercel", "Cloudflare DNS", "Upstash Redis"] },
      { group: "Auth", items: ["Argon2id", "Opaque session tokens", "HMAC deposit tokens"] },
    ],
    reflection:
      "If I did this again, I'd split the RSC decision earlier. The admin panel migration cost a week mid-project that I could have avoided by asking who the screen was optimised for before writing the first component. The rest held up: the token-based deposit flow, the client-side image pipeline, and the DNS migration all worked because they were designed to fail safely — rate limiter fails open, deposit tokens fail closed, images never touch a service that charges by the byte.",
  },

     // ─────────────────────────────────────────────────────────────
  // PASTURA
  // ─────────────────────────────────────────────────────────────
  {
  slug: "pastura",
  title: "Pastura",
  tagline: "Church operations platform • In progress",
  summary:
    "A multi-tenant SaaS for Nigerian Pentecostal churches. Twenty modules spanning auth, financial infrastructure, scheduling, content delivery, and messaging — built solo over seven months, with AI as a planning partner rather than just a code generator.",
  year: "2026",
  duration: "7 months · ongoing",
  role: "Founder & Sole Developer",
  status: "ongoing",
  liveUrl: "https://pastura.xyz",
  heroImage: pastura,
  overview:
    "Pastura is a church management platform built for Nigerian Pentecostal churches with 2–20 branches. It handles the operational core — members, attendance, giving, remittances, schedules, events, tasks — and adds a content/LMS module for discipleship training, a messaging system with a branch-scoped credit ledger, and a payment layer that reconciles through Paystack. The codebase is a Turborepo monorepo: Fastify 5 API, Next.js frontend running in CSR mode (a Tauri desktop shell is planned), Prisma on Neon, and a shared api-contracts package that keeps the frontend and backend from drifting. Twenty modules. One developer.",
  brief:
    "Church management software in the Nigerian market mostly looks like CRUD with a coat of paint. The ambition here was different: build an operational system that helps leaders understand what's happening in their church and what to do about it. That means every decision is made with the assumption that the platform will eventually carry real financial data, real pastoral notes, and multi-branch hierarchies — even in v1, where the test set is a handful of churches and the smallest is around twenty members.",
  constraints: [
    "Multi-tenant from day one — organization and branch isolation enforced at every API boundary, not just at login",
    "Financial data (giving, remittances) must be immutable once recorded, with a full audit trail and void-and-replace correction",
    "Monetary values stored as BigInt in kobo — floating-point arithmetic on money is not negotiable",
    "The role model must not explode as features arrive — department leaders stay MEMBER in their JWT and receive scoped permissions instead of a new global role",
    "Feature entitlements live at the service boundary (`requireFeatureAccess`) rather than being scattered through feature code — free tier and paid tier share one implementation",
    "Certificate issuance, remittance reconciliation, and task synchronization all need strong idempotency — a retry must never produce a duplicate",
    "Tauri desktop shell is a hard constraint that dictates a pure-CSR Next.js frontend and a Fastify API independent of the Next.js runtime",
    "The API must be provider-agnostic — swapping Paystack or Termii should touch one directory, not the whole codebase",
  ],
  sections: [
    {
      id: "multi-tenancy",
      heading: "Multi-tenancy without leaks",
      body: [
        "The critical security boundary is Organization A ╳ Organization B. A user authenticated into one org must never be able to manipulate another org's members, giving, attendance, or financial records — even if they know the resource ID. That rules out the pattern most CRUD apps fall into: `if (user.role === 'GO') { allow }`. Role checks alone are insufficient because the same role exists in every org. Every read and write is scoped by `orgId` and, where relevant, `branchId` — enforced in the service layer, not just route middleware.",
        "The role model was deliberately kept small. Five global roles: `GENERAL_OVERSEER`, `REGIONAL_HEAD`, `BRANCH_PASTOR`, `FINANCIAL_SECRETARY`, `MEMBER`. A department leader stays `MEMBER` in their JWT and receives a scoped permission grant instead. This avoids the failure mode where every new capability adds a new global role — and it keeps authorization tractable as the platform grows. Feature entitlements follow the same principle: `requireFeatureAccess(orgId, 'JOURNEY')` is called once at the service boundary, and the feature implementation below it has no idea whether the org is on the free tier or the paid tier.",
        "Every domain table carries `orgId` and, where relevant, `branchId` as explicit columns — never derived at query time from a joined member record. Scheduled jobs and webhooks bypass user-level auth but use their own secret and scope, and never touch tenant data without an explicit `orgId` from the request. Invite tokens expose only masked information so users can accept an invitation without seeing sensitive org data first.",
      ],
      list: [
        "Three audit log tables — `GivingAuditLog`, `RemittanceAuditLog`, `MembershipAuditLog` — share the same shape and the same deliberate choice: plain indexed string columns for actor IDs instead of Prisma relations, so an audit trail outlives the record it describes and is never blocked by referential integrity on a deleted member.",
        "`Transaction.providerEventId` is non-nullable with a `\"\"` default. In Postgres, `NULL != NULL`, so a nullable composite unique would silently allow unlimited rows with `(provider=X, providerEventId=NULL)`. The sentinel gives every row a real string value from the first write.",
        "The `Provider Naming Rule` is stated once and enforced by review: the strings `paystack` and `termii` appear in exactly three places — the concrete provider folders and the one `getProvider()` switch that maps a provider string to an implementation. Everywhere else in the codebase is provider-agnostic.",
      ],
    },
    {
      id: "financial-infrastructure",
      heading: "Financial infrastructure as a first-class concern",
      body: [
        "Most of Pastura's modules are interesting. The financial modules are the ones where mistakes cost real money, and they're designed accordingly. Giving records are immutable once created — to correct an error, you void the original and create a replacement, preserving the audit trail. Remittance periods are enforced sequentially in SERIALIZABLE transactions: you can't submit period 5 if period 4 hasn't closed, and the rate is snapshotted at submission time inside the transaction so a concurrent rate change can't produce a snapshot inconsistent with what the branch saw.",
        "The messaging credit system is where the financial discipline shows most clearly. A branch buys credits through Paystack, spends them on SMS and WhatsApp sends, and gets refunds under a policy that reads like it was written by someone who has thought carefully about failure modes. Credits live in an append-only ledger. `BranchMessagingAccount.creditsAvailable` is a denormalized cache, and the ledger is the source of truth. In any discrepancy, the ledger wins. The write order enforces this: ledger entry first, cache update second. A crash between the two leaves a stale cache that a future reconciliation job can repair by summing the ledger — and `getBalance()` can switch to ledger-sum mode without any other code changing.",
        "Idempotency is layered three independent ways. `Transaction.reference` is unique — a duplicate payment intent can't create two transactions. `@@unique([provider, providerEventId])` prevents a webhook replay from being processed twice. `MessageCreditLedgerEntry.idempotencyKey` is unique — a worker retry can't double-credit a branch. Any one of these alone would prevent most duplicate processing. All three together make the system safe under concurrent webhook delivery, worker retries, and cron repair runs happening simultaneously.",
        "The provider abstraction is what makes any of this portable. Every SMS and WhatsApp send returns a `DeliveryResult` — a three-state union of `ACCEPTED`, `REJECTED`, or `UNKNOWN`. Each provider implementation translates its own chaotic HTTP responses into one of those three states, and the worker reads only `result.status`. It never inspects `result.providerResponse` fields. Adding a second SMS provider means implementing the interface and adding a routing case — the worker doesn't change. The payment side follows the same pattern.",
      ],
      code: {
        language: "ts",
        caption:
          "Three states, one honest answer. The default is UNKNOWN because classifying something as ACCEPTED or REJECTED when you're not sure is worse than admitting you don't know.",
        content: `type DeliveryResult =
  | { status: "ACCEPTED"; providerMessageId: string; providerResponse: Record<string, unknown> }
  | { status: "REJECTED"; providerResponse: Record<string, unknown> }
  | { status: "UNKNOWN";  providerResponse: Record<string, unknown> };

// Termii classification, lives only inside termii.sms.provider.ts:
//   HTTP 2xx + message ID     → ACCEPTED
//   HTTP 2xx, no message ID   → UNKNOWN
//   HTTP 4xx                  → REJECTED
//   HTTP 5xx                  → UNKNOWN
//   Network error / timeout   → UNKNOWN`,
      },
      list: [
        "The refund policy is conservative by design: refund only on explicit `REJECTED`. Never on `UNKNOWN` (the message may have been accepted). Never on worker crash (delivery state is ambiguous). Over-refunding is exploitable and silent; under-refunding is visible and recoverable via manual adjustment.",
        "`attemptCount` on a message recipient counts lock acquisitions, not confirmed provider calls. A crashed worker burns one retry slot. This is deliberate — the alternative would allow infinite retry loops under crash conditions, which is the more dangerous failure mode.",
        "Remittance uses SERIALIZABLE isolation on every state transition because two concurrent submissions could both pass the sequential-period check independently and then interleave writes that break the gapless timeline. Postgres serialization failures are caught and returned as `409 Conflict`.",
        "All money is stored as `BigInt` in kobo. `0.1 + 0.2 !== 0.3` is not an acceptable bug in a financial system, and the choice was made before the first line of giving code was written.",
      ],
    },
    {
      id: "task-sync",
      heading: "A synchronization engine for scheduled tasks",
      body: [
        "Church operations are recurring. A Sunday service needs someone on chairs, someone on sound, someone on the welcome desk. Pastura models this as Task Templates attached to Service Schedules: define the tasks once, and they regenerate every time the schedule produces a new service instance.",
        "The engineering problem is that scheduled services and generated tasks are two independent state machines that need to stay in sync. A service can be edited (time changes), deleted (schedule pattern changed), or rescheduled. Tasks can be edited by users (detach from the template) or cancelled. When the schedule regenerates its instances, it must not destroy any service row that a task still points at — and it must update the tasks whose services were patched rather than recreated.",
        "The reconciliation runs inside the same transaction as the service regeneration. When a schedule's pattern changes, the engine finds every upcoming service, checks which ones are still referenced by a task via a polymorphic `linkedType`/`linkedId` column pair, and either deletes or patches each one. That polymorphic link is deliberately *not* a Prisma relation — a task can link to a service, an event, or an event instance, and three nullable foreign keys would be worse than two plain string columns with an index. The cost is that reconciliation is a two-query intersection in application code instead of a nested relation filter. The benefit is that adding a fourth link target later requires zero schema migration.",
        "The sync state machine has two states: `SYNCED` and `DETACHED`. A user editing a template-sourced task with scope `THIS` detaches it. Editing with `ALL_FUTURE` propagates the change to every synced task on every upcoming service. Template deletion cancels the synced tasks but leaves detached ones alone. The backfill dedup keys on 'any task row exists for this (template, service) pair regardless of status' — a cancelled-then-detached tombstone still counts as existing, which prevents resurrection after a hard delete. Get that rule wrong and you either resurrect killed tasks or under-generate new ones.",
      ],
      code: {
        language: "ts",
        caption:
          "Two-query intersection instead of a nested Prisma filter — `Task` has no relation field to `Service`, by design.",
        content: `const candidates = await tx.service.findMany({
  where: { scheduleId: schedule.id, isModified: false, status: "UPCOMING" },
  select: { id: true, date: true, startTime: true, endTime: true },
});

const linkedServiceIds = new Set(
  (await tx.task.findMany({
    where: { linkedType: "SERVICE", linkedId: { in: candidates.map(c => c.id) } },
    select: { linkedId: true },
    distinct: ["linkedId"],
  })).map(t => t.linkedId!),
);

const toDelete = candidates.filter(c => !linkedServiceIds.has(c.id));
const toPatch  = candidates.filter(c =>  linkedServiceIds.has(c.id));`,
      },
      list: [
        "The implementation plan for this module went through three versions. The v2 plan assumed a Prisma relation that didn't exist. The v3 plan was produced by reading the actual schema and every route handler the plan would touch — three real discrepancies were caught at the plan level rather than becoming bugs in production.",
        "Task creation authorization is centralized: standalone tasks go through `resolveTaskCreationScope` with a hierarchy-based matrix, while delegated tasks linked to a service or event inherit the write-authorization of the underlying resource instead of re-deriving a scope. One function, two entry points.",
      ],
    },
    {
      id: "content-lms",
      heading: "Content module: sequential gating without a rules engine",
      body: [
        "The content module lets a General Overseer author training courses — sections, typed lessons, quizzes, pricing — and lets org members browse, enroll, learn, earn certificates, and rate. Courses are org-scoped; the GO is the only author role, and they have structural access to every course in their org rather than appearing as an enrolled learner.",
        "A lesson's content type (`ARTICLE`, `DOCUMENT`, `VIDEO`, `QUIZ`) is immutable after creation. Changing it requires delete-and-recreate. This looks restrictive, but the alternative would mean dropping old columns, populating new ones, deleting orphaned quiz rows, invalidating every learner's progress on that lesson, and potentially cascading to certificates. Every step is destructive and there's no clean rollback. The mitigation isn't a mutability flag — it's a deliberate friction at creation time, followed by a `Duplicate as` action if the user picked wrong.",
        "Sequential lesson gating is flattened across the whole course, not per-section. Lesson N is fetchable only if lesson N−1 has a `completedAt`. This avoids the reasoning trap of 'finish Section 1, unlock all of Section 2' and keeps the ordering rule trivial to reason about: there is one list, in one order.",
        "Certificates are issued eagerly — inside the same transaction as the completion write that triggers them. The `(userId, courseId)` unique constraint is what prevents double issuance under concurrency: the second request catches its own `P2002` violation and returns `{ issued: false }` because the first request will have already emitted the notification. The catch is narrowed to check `err.meta.target` includes `userId_courseId` so a `verificationCode` collision (astronomically unlikely) still surfaces as a real error instead of being silently swallowed.",
      ],
      code: {
        language: "ts",
        caption:
          "Certificate issuance returns a discriminated union so the caller knows whether to emit the notification. The P2002 catch is narrow on purpose.",
        content: `try {
  const cert = await tx.contentCertificate.create({
    data: { userId, courseId, verificationCode: nanoid(12) },
  });
  return { issued: true, certificate: cert };
} catch (err) {
  if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === "P2002" &&
    (err.meta?.target as string[])?.includes("userId_courseId")
  ) {
    return { issued: false };
  }
  throw err;
}`,
      },
      list: [
        "Curriculum locks at publish time, not at first certificate. Content freezes; metadata (title, cover, category, roles) and price stay editable. Course deletion is blocked on non-DRAFT status, and archived courses can't be deleted either — certificates must survive, and entitlements grant perpetual access.",
        "Quiz grading is single-correct with no partial credit, enforced at both write time and grading time. `isCorrect` is never returned to learners in API responses until after submission — the frontend literally never receives which option is right.",
        "Every user-visible noun comes from a single `copy.ts` file. The backend says 'Lesson' but the UI says 'Session', because 'Lesson' carries K-12 weight that doesn't fit adult discipleship training. One file changes if a term turns out wrong.",
      ],
    },
    {
      id: "ai-workflow",
      heading: "Solo development with AI as a planning partner",
      body: [
        "Pastura is built by one developer. The tooling that makes that feasible isn't a code generator — it's a discipline of writing implementation plans detailed enough to be reviewed, corrected, and handed off. Every module starts as a planning document that specifies schema changes, service-layer responsibilities, transaction boundaries, authorization rules, error shapes, test cases, and rollback path. The plan is reviewed for over-engineering, missing edge cases, and assumptions that contradict the actual codebase before a single line of production code is written.",
        "The Task Synchronization plan went through three versions. The v2 plan made an assumption about the schema — that `Task` had a Prisma relation to `Service` — that turned out to be wrong. The v3 plan was produced by reading the actual `schema.prisma`, every service file the plan would touch, and every route handler that would consume the new functions. Three real discrepancies were found and fixed at the plan level. None of them became bugs, because the plan was audited before implementation.",
        "This is what makes the AI-assisted workflow tractable at Pastura's scale. Models are good at generating code and bad at knowing whether the code fits. The discipline is: use the model to explore the shape of the solution, then reconcile the plan against the real code, then implement. The plan document is the artifact that bridges the two — it's what makes the workflow reproducible, reviewable, and correctable.",
        "The honest version is that some modules were right the first time and some were corrected three times. Both are in the git history. That's the real story of building something this large solo, and it's more useful than pretending the first draft is always the last.",
      ],
      list: [
        "Planning is done with higher-reasoning models; implementation is done with cheaper ones. The plan is the artifact that makes the handoff work.",
        "Every plan document specifies its dependency graph against other modules, its merge-conflict surfaces with parallel work, and its rollback path — because none of those are obvious once the code exists.",
        "Reconciling a plan against the real codebase is a step, not an afterthought. It's what caught the `Task`→`Service` relation assumption before it shipped.",
      ],
    },
    {
      id: "journey",
      heading: "What's next: the Journey module",
      body: [
        "The direction Pastura is building toward is a module called Journey. It sits above members, attendance, events, giving, and content, and turns historical church activity into actionable follow-up workflows. The central question it answers is: which members need attention, why do they need attention, what should we do, who should do it, and what happened afterward?",
        "The first trigger will be attendance-based: three consecutive missed main worship services creates a follow-up case, assigned to the member's department leader rather than the pastor. The system detects signals, not diagnoses — the trigger creates a follow-up opportunity, not a judgment. A missing member could be traveling, studying, sick, or attending another approved activity; the follow-up is how the church finds out which.",
        "The architectural discipline is the same as everywhere else in Pastura: the attendance module emits a domain event, the Journey trigger evaluator listens, and the Journey module creates the case. Attendance never knows about Journey, and Journey never reimplements attendance logic. Strong idempotency at the database level — not just the application level — prevents the failure mode where a retried evaluation creates fourteen identical cases for the same member.",
        "Journey is still in planning. The specification is written; the implementation is next. The point of writing this case study now, before the module ships, is to make the trajectory visible — a church management platform is unremarkable, but a church operations system that turns historic activity into actionable care is a different product category entirely.",
      ],
    },
  ],
  impact: [
    {
      label: "Status",
      value: "Pre-launch",
      note: "v1 feature-complete, in testing",
    },
    {
      label: "Modules shipped",
      value: "20",
      note: "Auth · Orgs · Regions · Branches · Departments · Members · Invites · Giving · Remittances · Attendance · Schedules · Events · Tasks · Calendar · Content · Messaging · Payments · Credits · Notifications · Dashboard",
    },
    {
      label: "Platform",
      value: "Multi-tenant",
      note: "Organization and branch isolation at every boundary",
    },
    {
      label: "Team",
      value: "1",
      note: "Solo developer · 7 months · AI-assisted planning workflow",
    },
  ],
  progress: {
    shipped: [
      "Auth & Identity — dual-layer session model (platform identity + org-scoped) with rotating refresh tokens, session lineage, and transparent bcrypt→Argon2id migration on first login",
      "Organization hierarchy — Region → Branch → Department with enforced multi-tenant isolation",
      "Members, proxy members, and invitation flow with masked-email public endpoints",
      "Giving — immutable records with void-and-replace corrections, BigInt kobo arithmetic, and locked accounting periods",
      "Remittances — SERIALIZABLE transactions, sequential period enforcement, rate snapshotting, and cross-boundary reconciliation",
      "Attendance — unified session model for services and events with QR check-in and worker headcount",
      "Schedules & Events — 31-day rolling window, `FOR UPDATE SKIP LOCKED` job queue, event instance normalization",
      "Tasks — full template synchronization engine with SYNCED/DETACHED state, backfill dedup, and per-instance scope control",
      "Calendar — read-only aggregator projecting services, events, and tasks into one feed",
      "Content/LMS — authoring, purchase, sequential gating, quizzes, eager certificate issuance",
      "Messaging — SMS + WhatsApp with branch-scoped credit ledger, three-layer idempotency, and a conservative refund policy",
      "Payments — provider-agnostic abstraction over Paystack with a reconciliation cron as the safety net for lost webhooks",
      "Notifications — EventBus + orchestrator + SSE/push/email channels with dedupe-key uniqueness",
      "Dashboard and Insights — role-scoped views for GO, Branch Pastor, Financial Secretary, and Member",
    ],
    next: [
      "Journey — attendance-based follow-up workflows with structured resolution, assignment hierarchy, and audit history",
      "Church Secretary role — non-financial operational visibility without finance permissions",
      "Online Giving — provider-agnostic payment service already designed, integration pending",
      "Registrations and custom forms for events, visitors, and membership applications",
      "Tauri desktop shell — API-first architecture already supports it, packaging is the remaining work",
      "Public Content Marketplace — long-term direction for church content discovery",
    ],
  },
  stack: [
    { group: "Monorepo", items: ["Turborepo", "pnpm workspaces", "Shared api-contracts package"] },
    { group: "Backend", items: ["Fastify 5", "TypeScript", "Prisma 6", "PostgreSQL (Neon)"] },
    { group: "Frontend", items: ["Next.js 16 (CSR)", "TanStack Query", "Zustand", "Tailwind CSS", "shadcn/ui"] },
    { group: "Storage", items: ["Cloudflare R2", "Presigned uploads"] },
    { group: "Integrations", items: ["Paystack", "Termii", "Resend"] },
    { group: "Infrastructure", items: ["Railway (API)", "Vercel (web)", "Docker", "Luxon", "Argon2id"] },
  ],
  reflection:
    "The single biggest lesson from building Pastura has been that the plan is the artifact. The code is downstream of it, and the workflow that works — for me, for the models I use, for the future maintainer of this codebase — is the one where the plan is explicit enough to be reviewed and corrected before it becomes code. The second lesson is that small architectural decisions compound. Choosing BigInt for money instead of number looked like a formality at the start; seven months later it's the reason the financial modules don't have a category of bug that most CRUD church software ships with. The third, and the one I'm most aware of as I move into Journey: the temptation to over-engineer is strongest right when you have the most momentum. Journey could be a workflow engine, a rules DSL, an AI-driven churn-scoring system. It should be none of those things in v1. It should be: detect a pattern, assign a person, record what happened, and let the church decide what it means.",
},

  // ─────────────────────────────────────────────────────────────
  // JACINTHFORGE
  // ─────────────────────────────────────────────────────────────
  {
    slug: "jacinth-forge",
    title: "JacinthForge",
    tagline: "Frontend Engineer • Production LMS",
    summary:
      "An e-learning platform connecting instructors with apprentices. I built the frontend end-to-end: a four-step course wizard, a media pipeline, a quiz builder, and a certificate generator that runs entirely in the browser.",
    year: "2025",
    duration: "Multi-month",
    role: "Frontend Engineer",
    status: "live",
    liveUrl: "https://jacinthforge.com",
    heroImage: jacinthforge,
    overview:
      "JacinthForge is an LMS that lets instructors publish courses and apprentices enroll, consume content, take assessments, and receive verifiable certificates. I owned the frontend from UI through API integration, and contributed to product decisions, UX improvements, and production troubleshooting.",
    brief:
      "Build the frontend for a three-role platform — apprentice, instructor, admin. Instructors need to create courses across four dependent steps, with arbitrary nesting inside the curriculum. Every lecture can hold video, text, a document, or a quiz. Every course ends in a certificate that needs to be downloadable, shareable, and verifiable by URL.",
    constraints: [
      "Course data is deeply nested: sections contain lectures, lectures contain content of three different types, quizzes contain questions with options, and the whole thing needs to save incrementally",
      "Users lose work: tabs close, laptops die, someone opens the same course in two tabs",
      "File uploads need a lecture ID that doesn't exist yet — you upload attachments to a lecture you're still creating",
      "Certificates need to be downloadable as PDF, shareable as images, and verifiable by ID — with no backend rendering service",
    ],
    sections: [
      {
        id: "wizard",
        heading: "Course creation as a multi-step wizard",
        body: [
          "The course editor is four steps that depend on each other: Basic Info → Advanced Info → Curriculum → Publish. Each step hydrates from a Zustand store, edits through its own React Hook Form instance, and writes back on submit.",
          "The interesting problem was structural changes inside the Curriculum step. Adding a section or a lecture needs to persist to the server immediately — otherwise the user closes the tab, comes back, and finds their outline gone. But a section that exists only in the browser has no ID yet, and the file upload inside a lecture needs a lecture ID to attach to.",
          "I solved it with temp IDs. Every new section gets temp-section-{uuid}, every new lecture gets temp-lecture-{uuid}. When the server responds with the real IDs, the store swaps them in and RHF resets. The UI never waits on the network for a structural change; it rolls back on failure instead.",
        ],
        code: {
          language: "typescript",
          caption:
            "Temp IDs are stripped before the server write, and reconciled on the response.",
          content: `// src/components/dashboard/instructor/create-course/curriculum-step/CurriculumCourseFormWrapper.tsx (excerpt)
const dataForBackend = {
  sections: form.getValues().sections.map((section) => ({
    ...section,
    id: section.id?.startsWith("temp-") ? "" : section.id,
    lectures: section.lectures.map((lecture) => ({
      ...lecture,
      id: lecture.id?.startsWith("temp-") ? "" : lecture.id,
    })),
  })),
};

const updatedSections = await handleAutoSaveCurriculum(dataForBackend);

// Swap temp IDs for real ones
if (updatedSections) {
  form.setValue(\`sections.\${newIndex}\`, updatedSections[newIndex], {
    shouldValidate: true,
  });
}`,
        },
        list: [
          "Uploads queue when the parent lecture ID doesn't exist yet, and fire automatically once the ID arrives. The user sees a spinner, not an error.",
          "A local draft system lives in localStorage under course_draft::{id}, with a 24-hour TTL. On page load, the local draft's timestamp is compared against the server's. Local newer → show a modal. Server newer → silently sync.",
          "Every step has its own RHF instance and hydration key. Adding a new step is adding a new file, not editing a shared wizard.",
        ],
      },
      {
        id: "certificates",
        heading: "Certificates rendered in the browser",
        body: [
          "Certificates needed to be downloadable as PDFs, shareable as images on mobile, and verifiable through a public URL. The backend wasn't set up for image rendering, and I wanted the certificate to be a React component so designers could iterate on it in JSX.",
          "The approach: render the certificate in an off-screen container, wait for every image inside to load and for the browser to paint, capture the DOM with html-to-image, then ship it through jsPDF for PDF export and the Web Share API for mobile sharing.",
          "The hard parts were all timing. Safari captures before fonts and images have rendered unless you wait — I use a double requestAnimationFrame plus a 50ms buffer to guarantee the paint is done. html-to-image doesn't wait for <img> elements, so I query every image inside the container and await their load or error events before capturing. The QR code is generated asynchronously as a data URL, which means the whole capture path is stateful — the image isn't ready until the QR is.",
        ],
        code: {
          language: "typescript",
          caption:
            "The paint-wait: four lines that say I have fought Safari and won.",
          content: `// src/hooks/useCertificate.ts (excerpt)
await new Promise<void>((resolve) => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      setTimeout(resolve, 50); // extra buffer for Safari
    });
  });
});

const dataUrl = await toPng(containerRef.current, {
  cacheBust: true,
  backgroundColor: "#ffffff",
  pixelRatio: 2,
  skipFonts: true,
});`,
        },
        list: [
          "One hook — useCertificate — powers the download button, the share sheet, and the public verification page. The abstraction held across all three consumers.",
          "The certificate is a React component a designer can edit. No backend rendering service, no server round-trip, no format drift between PDF and PNG.",
          "Every capture path (PNG, PDF, share, preview) goes through the same wait-then-capture pipeline, so behaviour is identical no matter which button the user clicks.",
        ],
      },
    ],
    impact: [
      { label: "PageSpeed", value: "96", note: "Frontend performance score" },
      { label: "Course creation", value: "4 steps", note: "Down from a single monolithic form" },
      { label: "Certificate generation", value: "0 backend calls", note: "Entirely client-side" },
      { label: "Lost-work incidents", value: "0", note: "Post draft system launch" },
    ],
    stack: [
      { group: "Framework", items: ["Next.js", "React", "TypeScript"] },
      { group: "Forms", items: ["React Hook Form", "Zod"] },
      { group: "State", items: ["Zustand"] },
      { group: "Editor", items: ["TipTap"] },
      { group: "Uploads", items: ["S3 presigned URLs", "react-dropzone"] },
      { group: "Certificate", items: ["html-to-image", "jsPDF", "QR code generation"] },
    ],
    reflection:
      "The temp ID reconciliation is the part I'd rewrite. It's fragile if the server ever returns entities in a different order — the index-based matching would silently attach the wrong real ID to the wrong temp one. A proper ID mapping returned by the API would be more robust. The certificate pipeline is the part I'm proudest of: it's a real abstraction that solved the same problem three different ways without a single branch inside the hook.",
  },

 
  // ─────────────────────────────────────────────────────────────
  // JUSTINDAVID.DEV
  // ─────────────────────────────────────────────────────────────
  {
  slug: "justindavid-dev",
  title: "justindavid.dev",
  tagline: "Design system • Case-study architecture",
  summary:
    "A portfolio that doubles as a case study. Server Components by default, a semantic design system in Tailwind v4, and navigation that tracks scroll without flicker.",
  year: "2026",
  duration: "Ongoing",
  role: "Designer & Developer",
  status: "live",
  liveUrl: "https://justindavid.dev",
  repoUrl: "https://github.com/uyimolo/justindavid",
  heroImage: justindavid,
  overview:
    "A single-page portfolio with dedicated case-study routes, an all-projects grid, and a design system in Tailwind v4's CSS-first config. The goal was simple: build the site I'd want to be judged by, then use it as the template for every project page that follows.",
  brief:
    "Present frontend craft, not just project screenshots. Every claim in a case study should be backed by a piece of code or a measurable outcome. The site itself should demonstrate the discipline it describes — Server Components by default, accessible semantics, real performance numbers, and a design system that doesn't leak implementation details into components.",
  constraints: [
    "Case study pages have to scale — one template, N projects, no bespoke layouts per project",
    "Design tokens must work in light and dark mode without components knowing dark mode exists",
    "Scroll-driven navigation cannot flicker during smooth-scroll — the active pill needs to feel like it's glued to the section, not chasing it",
    "The site must pass WCAG AA contrast in both modes without hand-tuning individual components",
    "Deploy has to be zero-config — no separate design-token pipeline, no runtime theme provider, no CSS-in-JS",
  ],
  sections: [
    {
      id: "server-by-default",
      heading: "Server Components by default, Client Components by exception",
      body: [
        "In the App Router, every file is a Server Component unless you opt out with `\"use client\"`. That directive is a commitment — the file and everything it imports get shipped to the browser. It's easy to add out of habit and hard to remove once it's there, because removing it means auditing every dependency for browser-only APIs.",
        "I started with `\"use client\"` on About, Works, and Footer because I planned to animate them with Framer Motion. Mid-build I swapped to pure CSS transitions — `group-hover:`, `transition-transform`, `duration-700` — which do the same job for card hovers and image scale effects without shipping the motion runtime. The directive stayed behind and the components kept shipping to the browser for no reason.",
        "Auditing those files dropped the client bundle and removed the runtime hydration cost for three sections that had no business being interactive. The visible impact on PageSpeed was small because the site was already fast — but the point isn't the number, it's the discipline. Every new file inherits the pattern, and a codebase where `\"use client\"` is the exception stays fast by default.",
      ],
      code: {
        language: "tsx",
        caption:
          "The rule of thumb: reach for `\"use client\"` when you need state, effects, event handlers, or a browser-only API. If the only reason is animation, check whether Tailwind can do it first.",
        content: `// ❌ Unnecessary — no state, no effects, no event handlers
"use client";
export function About() {
  return (
    <div className="transition-transform hover:-translate-y-1">
      <Heading2>A little about me</Heading2>
    </div>
  );
}

// ✅ Identical output, server-rendered
export function About() {
  return (
    <div className="transition-transform hover:-translate-y-1">
      <Heading2>A little about me</Heading2>
    </div>
  );
}`,
      },
    },
    {
      id: "design-tokens",
      heading: "A design system in Tailwind v4's CSS-first config",
      body: [
        "Tailwind v4 dropped `tailwind.config.ts`. Theme configuration lives in `@theme` blocks inside `globals.css`, and every variable declared with the `--color-*` prefix becomes a utility class. `--color-primary` gives you `bg-primary`, `text-primary`, `border-primary` — no plugin, no build config, no separate token file.",
        "Components never touch raw colors. They use `bg-background`, not `bg-[#0B132B]`. They use `text-foreground`, not `text-slate-200`. The benefit is that dark mode becomes a single class swap on `<html>` — every semantic token is redefined inside `.dark`, and components don't know the mode exists.",
        "I wrote raw colors in `oklch` because the perceptual uniformity is real. `oklch(0.55 0.18 250)` reads as \"vibrant blue\" in a way that `rgb(59, 130, 246)` doesn't, and interpolating between two oklch values doesn't produce the muddy grey you get from RGB transitions. Tuning contrast ratios to pass WCAG AA in both modes was faster because I could reason about lightness directly.",
      ],
      code: {
        language: "css",
        caption:
          "Raw brand colors → semantic aliases. Components import the alias, not the raw color.",
        content: `@theme {
  /* Semantic aliases — light mode */
  --color-background: oklch(100% 0.00011 271.152);
  --color-foreground: oklch(0.25 0.04 240);
  --color-primary: oklch(0.55 0.18 250);
  --color-muted: oklch(0.92 0.02 240);
}

.dark {
  /* Same names, different values */
  --color-background: oklch(0.14 0.02 250);
  --color-foreground: oklch(0.95 0.02 240);
  --color-primary: oklch(0.7 0.14 210);
  --color-muted: oklch(0.22 0.04 250);
}`,
      },
      list: [
        "Semantic tokens mean a component written once works in both modes. No `dark:` variants on individual elements.",
        "The `@theme inline` block maps the CSS variables into Tailwind utilities. Adding a new token is one line — no config file to update, no rebuild of a plugin.",
        "Because Tailwind v4 has no runtime, there's no theme provider, no flash-of-wrong-theme on load, no hydration mismatch. Dark mode is applied by a `<script>` tag in `<head>` before paint.",
      ],
    },
    {
      id: "scroll-nav",
      heading: "Scroll-driven navigation that doesn't flicker",
      body: [
        "The header highlights the section the user is currently reading. On scroll this is easy — an `IntersectionObserver` fires as sections cross into a band near the top of the viewport. On click it's harder: clicking \"Contact\" triggers a smooth scroll that passes through every section between the current position and the target. Without intervention, the active pill flickers through Home → About → Work → Contact on the way, one per frame.",
        "The fix is a click lock. When a nav item is clicked, I set a ref to `true` for 900 milliseconds — long enough for the browser's smooth-scroll to settle. The observer callback returns early while the lock is set. On release, the observer resumes; by then the target section is where it should be and the callback fires with the correct value. The user sees one transition, not four.",
        "The observation band uses `rootMargin: \"-25% 0px -55% 0px\"`, which shrinks the watched area to a strip between 25% and 45% of viewport height. A section becomes active when its content reaches the top quarter of the screen — which matches where a reader's eye actually is when they start reading a heading.",
        "The callback keeps a `Set` of currently-visible section IDs and picks the topmost one in nav order. This handles the brief moment during scroll where two sections overlap in the band — the earlier one wins until it exits, so the highlight never bounces.",
      ],
      code: {
        language: "tsx",
        caption:
          "The click lock: suppress the observer during smooth scroll, resume once it settles.",
        content: `const observer = new IntersectionObserver(
  (entries) => {
    if (lockRef.current) return; // suppress during click scroll

    entries.forEach((entry) => {
      entry.isIntersecting
        ? visibleRef.current.add(entry.target.id)
        : visibleRef.current.delete(entry.target.id);
    });

    const firstVisible = anchorItems
      .map((i) => i.match)
      .find((id) => visibleRef.current.has(id));

    if (firstVisible) setActiveAnchor(firstVisible);
  },
  { rootMargin: "-25% 0px -55% 0px" },
);

const handleNavClick = (item) => {
  if (item.type !== "anchor") return;
  setActiveAnchor(item.match);       // optimistic
  lockRef.current = true;            // suppress observer
  setTimeout(() => (lockRef.current = false), 900);
};`,
      },
    },
    {
      id: "editorial-layout",
      heading: "Case studies that don't need a max-width",
      body: [
        "Case study pages have a natural tendency to look cheap. The pattern most portfolios fall into is a centered column of text with `max-w-prose`, a stack of headings, and a lot of empty space on either side. It works, but it reads like a Medium article — everything the same width, everything centered for no reason.",
        "I wanted an editorial layout: a narrow label column on the left (section number, heading), and a wide content column on the right that flows at the full container width. On mobile the columns collapse — the label stacks above the content. On desktop, the content column is naturally bounded by the two-column grid, so no `max-w-3xl` is needed and paragraphs don't feel artificially truncated.",
        "The only place I kept a max-width is inside code blocks. Code that spans 1,200 pixels is unreadable. Everything else — paragraphs, bullet lists, impact cards — flows at the width the layout gives them.",
      ],
      code: {
        language: "tsx",
        caption:
          "Two-column editorial row. Content flows wide on desktop; no arbitrary cap.",
        content: `<section className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(180px,240px)_1fr] lg:gap-16">
  <div>
    <p className="font-mono text-xs uppercase">03</p>
    <Heading3>{heading}</Heading3>
  </div>
  <div>
    {body.map((p) => <Paragraph key={p}>{p}</Paragraph>)}
    {code && <div className="max-w-3xl"><CodeBlock {...code} /></div>}
  </div>
</section>`,
      },
    },
  ],
  impact: [
    {
      label: "PageSpeed (mobile)",
      value: "100 / 96 / 100 / 100",
      note: "Performance · Accessibility · Best Practices · SEO",
    },
    {
      label: "Client Components",
      value: "2",
      note: "Header and ThemeToggle — everything else renders on the server",
    },
    {
      label: "Case studies",
      value: "2",
      note: "JacinthForge and Osagie Media · Pastura in progress",
    },
    {
      label: "Runtime config files",
      value: "0",
      note: "Tailwind v4 CSS-first — no tailwind.config.ts",
    },
  ],
  stack: [
    { group: "Framework", items: ["Next.js 16", "React 19", "TypeScript"] },
    { group: "Styling", items: ["Tailwind v4", "CSS-first config", "oklch tokens"] },
    { group: "Motion", items: ["Motion (framer-motion)", "CSS transitions"] },
    { group: "Content", items: ["Typed case-study data", "Dynamic routes", "Static params"] },
    { group: "SEO", items: ["Dynamic metadata", "JSON-LD", "Open Graph", "Sitemap"] },
    { group: "Tooling", items: ["ESLint 9", "Prettier + tailwind plugin", "pnpm"] },
  ],
  reflection:
    "The intersection lock timing is a magic number — 900 milliseconds, tuned by feel. It should be derived from the CSS `scroll-behavior: smooth` duration, but the browser doesn't expose that. A cleaner approach would be to detect `prefers-reduced-motion`, use instant scroll for those users (no lock needed), and use smooth scroll for everyone else. The other thing I'd change: the About and Works sections still rely on `hover:` for their primary interactions on desktop, which is correct, but the mobile equivalents could use one more beat of tactile feedback — an `active:scale-[0.99]` on the card, maybe. Small, but it's the kind of detail that separates a portfolio from a product.",
}
];

export const getCaseStudyBySlug = (slug: string) =>
  caseStudies.find((cs) => cs.slug === slug);

export const getNextCaseStudy = (slug: string) => {
  const idx = caseStudies.findIndex((cs) => cs.slug === slug);
  if (idx === -1) return null;
  return caseStudies[(idx + 1) % caseStudies.length];
};