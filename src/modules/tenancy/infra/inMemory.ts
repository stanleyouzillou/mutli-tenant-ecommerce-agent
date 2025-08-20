import type {
  Merchant,
  MerchantRepo,
  TenantId,
} from "@/src/modules/tenancy/application/ports";

const merchants: Merchant[] = [
  { tenantId: "acme", displayName: "ACME Publishing" },
];

class InMemoryMerchantRepo implements MerchantRepo {
  async getByTenantId(tenantId: TenantId): Promise<Merchant | null> {
    return merchants.find((m) => m.tenantId === tenantId) ?? null;
  }
}

let singleton: { merchants: MerchantRepo } | null = null;

export function getTenancyInMemoryDeps() {
  if (singleton) return singleton;
  singleton = { merchants: new InMemoryMerchantRepo() };
  return singleton;
}
