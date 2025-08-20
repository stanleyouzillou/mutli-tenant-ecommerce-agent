export type TenantId = string;

export type Merchant = {
  tenantId: TenantId;
  displayName: string;
};

export interface MerchantRepo {
  getByTenantId(tenantId: TenantId): Promise<Merchant | null>;
}
