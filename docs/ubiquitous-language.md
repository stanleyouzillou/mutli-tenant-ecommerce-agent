# Ubiquitous language (core invariants)

- **Tenant**: isolated namespace for sellers. *Invariant*: every entity carries `tenantId`.
- **Storefront**: tenant's public catalog/branding. *Invariant*: only **published** products appear.
- **Product**: immutable **version** at publish time; price belongs to version.
- **Cart**: belongs to a buyer, **single-tenant**.
- **Order**: immutable record of a successful payment; one or more line items from the same tenant.
- **License**: grants right to download/use a product version; states `active|revoked|expired`.
- **DownloadGrant**: time-bound, tokenized access; expiry and max-attempts enforced.
