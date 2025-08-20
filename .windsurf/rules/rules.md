---
trigger: always_on
---

# Rules (for the coding agent)

1. **Server-first Next.js App Router**. Use client components only when the browser is required.
2. **DDD boundaries**:
   - `domain` (pure entities/services/events, no I/O)
   - `application` (use-cases + ports)
   - `infra` (adapters; InMemory first)
   - `ui` (thin, calls application)
     Domain must not import infra.
3. **Ports-first**: define `*Repo`, `PaymentGateway`, `AssetStorage`, `LinkSigner`, `Mailer` in application. Implement InMemory now; swap providers later without touching domain.
4. **Multi-tenancy invariants**: every aggregate carries `tenantId`. All queries/mutations are scoped by tenant. Carts are single-tenant.
5. **Events drive side-effects**: `PaymentSucceeded` ⇒ issue `License`, create `DownloadGrant`, send receipt. Idempotent.
6. **Testing**:
   - Unit = domain + application with InMemory adapters (no network).
   - Acceptance/BDD = features/ files are the source of truth.
   - Minimal integration: 1 route ↔ use-case ↔ InMemory adapter per feature.
7. **Commits**: small, conventional. Pause on ambiguity; record options/trade-offs before changing public interfaces.
8. **Security early**: short-lived signed download links, basic rate limits, event/audit logs. Plan Postgres RLS when moving to Prisma.
