# Decisions (ADRs, concise)

1) **Multi-tenancy data model**: start row-level (shared DB) with strict app-layer guards; add Postgres RLS later. *Why*: fastest MVP, clear upgrade path.
2) **Payments**: design port for Stripe Connect; ship FakePay first. *Why*: marketplace payouts; production-ready path.
3) **Server-first UI**: Next.js App Router + RSC; client islands only when necessary. *Why*: performance + simplicity.
4) **Components**: Tailwind + shadcn/ui. *Why*: fast, accessible, customizable.
5) **Licensing model**: perpetual license with optional revocation in MVP. *Why*: simple mental model; room to extend.
