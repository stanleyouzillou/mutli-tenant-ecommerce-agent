# Project brief (v1)

**Vision**: A multi-tenant marketplace for digital goods where independent sellers run customized storefronts while the platform handles identity, payments, delivery, licensing, and analytics.

**Measurable outcomes (MVP):**
1. Purchase → download ready ≤ **15s p95**.
2. Tenant onboarding (create store + first product) ≤ **3 minutes** with defaults.
3. Data isolation enforced by policy + tests for **100%** tenant-bound reads/writes.
4. First release: **ebooks + generic files**, throughput target **5 orders/min** burst.
5. Platform fee & payouts reconciled to **±€0.01**.

**Assumptions**: Marketplace fee model; EU buyers imply VAT later; start with simple VAT-inclusive prices. Row-level multi-tenancy; per-tenant RBAC.

**Open questions**: 
- Global buyer account vs per-tenant accounts (recommend global + per-tenant profile).
- Tax scope (none/manual/basic) for MVP (recommend basic note only).
- Payout cadence (manual vs automatic).
- Theming depth (presets vs fully custom) — recommend presets.
