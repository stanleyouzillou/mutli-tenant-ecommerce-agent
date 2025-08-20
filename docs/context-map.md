# Bounded contexts & relations

- **Tenancy**: tenants, storefront settings, roles, branding. Upstream of all.
- **Catalog**: products, versions, pricing, assets. Depends on Tenancy.
- **Checkout & Orders**: cart, checkout, payments, orders, refunds.
- **Licensing & Delivery**: licenses, download grants/links, revocation, audit.
- **Analytics & Reporting**: sales/download metrics via domain events.

```
Tenancy ──► Catalog ──► Checkout&Orders ──► Licensing&Delivery ──► Analytics
           ▲                                         │
           └──────────────────────────── events ─────┘
```
