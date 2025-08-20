# Unit tests

- Scope: domain and application layers only.
- Use only InMemory adapters; no network or file I/O.
- Prove invariants:
  - Every entity carries `tenantId`.
  - Cart is single-tenant.
  - `PaymentSucceeded` is idempotent (issues exactly one license and one download grant).
