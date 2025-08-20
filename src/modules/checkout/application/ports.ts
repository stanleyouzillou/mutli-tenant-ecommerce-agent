export type TenantId = string;
export type ProductId = string;
export type OrderId = string;
export type LicenseId = string;
export type DownloadGrantId = string;

export interface Product {
  id: ProductId;
  tenantId: TenantId;
  title: string;
  priceCents: number;
  description?: string;
}

export interface Order {
  id: OrderId;
  tenantId: TenantId;
  buyerEmail: string;
  productId: ProductId;
  totalCents: number;
  status: "paid" | "failed";
}

export interface License {
  id: LicenseId;
  tenantId: TenantId;
  productId: ProductId;
  buyerEmail: string;
}

export interface DownloadGrant {
  id: DownloadGrantId;
  tenantId: TenantId;
  productId: ProductId;
  buyerEmail: string;
  oneTime: boolean;
  used: boolean;
}

// Ports (interfaces)
export interface ProductRepo {
  getById(tenantId: TenantId, id: ProductId): Promise<Product | null>;
  listByTenant(tenantId: TenantId): Promise<Product[]>;
}

export interface OrderRepo {
  create(order: Omit<Order, "id">): Promise<Order>;
}

export interface LicenseRepo {
  create(license: Omit<License, "id">): Promise<License>;
}

export interface DownloadGrantRepo {
  create(grant: Omit<DownloadGrant, "id" | "used">): Promise<DownloadGrant>;
  getByIdForTenant(
    tenantId: TenantId,
    id: DownloadGrantId
  ): Promise<DownloadGrant | null>;
  markUsed(tenantId: TenantId, id: DownloadGrantId): Promise<void>;
}

export interface PaymentGateway {
  charge(params: {
    tenantId: TenantId;
    amountCents: number;
    buyerEmail: string;
  }): Promise<
    | { status: "succeeded"; paymentId: string }
    | { status: "failed"; reason: string }
  >;
}
