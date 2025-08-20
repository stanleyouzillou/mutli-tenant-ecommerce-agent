---
trigger: manual
---

# Memories (keep context stable)

- Next.js App Router (server-first), React, TS strict; Tailwind + shadcn/ui.
- DDD layering with ports; InMemory adapters first (Stripe Connect, S3, Prisma/Postgres later).
- Core invariants: tenant scoping, single-tenant carts, idempotent fulfillment on `PaymentSucceeded`, expiring signed links.
