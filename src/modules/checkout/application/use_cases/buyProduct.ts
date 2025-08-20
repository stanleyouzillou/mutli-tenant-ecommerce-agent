import type {
  TenantId,
  ProductId,
  OrderId,
  LicenseId,
  DownloadGrantId,
  ProductRepo,
  OrderRepo,
  LicenseRepo,
  DownloadGrantRepo,
  PaymentGateway,
} from "@/src/modules/checkout/application/ports";

export type BuyProductDeps = {
  products: ProductRepo;
  orders: OrderRepo;
  licenses: LicenseRepo;
  grants: DownloadGrantRepo;
  payments: PaymentGateway;
};

export type BuyProductInput = {
  tenantId: TenantId;
  productId: ProductId;
  buyerEmail: string;
};

export type BuyProductResult = {
  orderId: OrderId;
  licenseId: LicenseId;
  grantId: DownloadGrantId;
};

export async function buyProduct(
  deps: BuyProductDeps,
  { tenantId, productId, buyerEmail }: BuyProductInput
): Promise<BuyProductResult> {
  const product = await deps.products.getById(tenantId, productId);
  if (!product) throw new Error("Product not found for tenant");

  const charge = await deps.payments.charge({
    tenantId,
    amountCents: product.priceCents,
    buyerEmail,
  });
  if (charge.status !== "succeeded") {
    throw new Error(
      `Payment failed${
        "reason" in charge && charge.reason ? ": " + charge.reason : ""
      }`
    );
  }

  const order = await deps.orders.create({
    tenantId,
    buyerEmail,
    productId,
    totalCents: product.priceCents,
    status: "paid",
  });

  const license = await deps.licenses.create({
    tenantId,
    productId,
    buyerEmail,
  });

  const grant = await deps.grants.create({
    tenantId,
    productId,
    buyerEmail,
    oneTime: true,
  });

  return { orderId: order.id, licenseId: license.id, grantId: grant.id };
}
