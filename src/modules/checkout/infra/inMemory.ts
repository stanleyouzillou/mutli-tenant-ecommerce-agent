import type {
  DownloadGrant,
  DownloadGrantId,
  DownloadGrantRepo,
  License,
  LicenseRepo,
  Order,
  OrderRepo,
  PaymentGateway,
  Product,
  ProductRepo,
  TenantId,
  ProductId,
} from "@/src/modules/checkout/application/ports";

// Simple id helper
function id(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

// Seed
const TENANT_ACME: TenantId = "acme";
const PRODUCT_GO_FAST: ProductId = "go-fast-ebook";

const products: Product[] = [
  {
    id: PRODUCT_GO_FAST,
    tenantId: TENANT_ACME,
    title: "Go Fast eBook",
    priceCents: 1000,
    description:
      "A concise guide to shipping high-quality code quickly with TypeScript and Next.js.",
  },
];
const orders: Order[] = [];
const licenses: License[] = [];
const grants: DownloadGrant[] = [];

class InMemoryProductRepo implements ProductRepo {
  async getById(tenantId: TenantId, id: ProductId) {
    return products.find((p) => p.tenantId === tenantId && p.id === id) ?? null;
  }
  async listByTenant(tenantId: TenantId) {
    return products.filter((p) => p.tenantId === tenantId);
  }
}

class InMemoryOrderRepo implements OrderRepo {
  async create(order: Omit<Order, "id">): Promise<Order> {
    const created: Order = { id: id("ord"), ...order };
    orders.push(created);
    return created;
  }
}

class InMemoryLicenseRepo implements LicenseRepo {
  async create(license: Omit<License, "id">): Promise<License> {
    const created: License = { id: id("lic"), ...license };
    licenses.push(created);
    return created;
  }
}

class InMemoryDownloadGrantRepo implements DownloadGrantRepo {
  async create(
    grant: Omit<DownloadGrant, "id" | "used">
  ): Promise<DownloadGrant> {
    const created: DownloadGrant = { id: id("dwn"), used: false, ...grant };
    grants.push(created);
    return created;
  }
  async getByIdForTenant(
    tenantId: TenantId,
    id: DownloadGrantId
  ): Promise<DownloadGrant | null> {
    return grants.find((g) => g.id === id && g.tenantId === tenantId) ?? null;
  }
  async markUsed(tenantId: TenantId, id: DownloadGrantId): Promise<void> {
    const g = grants.find((x) => x.id === id && x.tenantId === tenantId);
    if (g) g.used = true;
  }
}

class FakePaymentGateway implements PaymentGateway {
  async charge(): Promise<
    | { status: "succeeded"; paymentId: string }
    | { status: "failed"; reason: string }
  > {
    return { status: "succeeded", paymentId: id("pay") };
  }
}

let singleton: {
  products: ProductRepo;
  orders: OrderRepo;
  licenses: LicenseRepo;
  grants: DownloadGrantRepo;
  payments: PaymentGateway;
} | null = null;

export function getInMemoryDeps() {
  if (singleton) return singleton;
  singleton = {
    products: new InMemoryProductRepo(),
    orders: new InMemoryOrderRepo(),
    licenses: new InMemoryLicenseRepo(),
    grants: new InMemoryDownloadGrantRepo(),
    payments: new FakePaymentGateway(),
  };
  return singleton;
}

export const seed = {
  tenantId: TENANT_ACME,
  productId: PRODUCT_GO_FAST,
  productTitle: "Go Fast eBook",
  priceCents: 1000,
};
