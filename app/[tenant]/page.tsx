import { ProductList } from "@/components/storefront/ProductList";
import { OwnerBadge } from "@/components/storefront/OwnerBadge";
import { getTenancyInMemoryDeps } from "@/src/modules/tenancy/infra/inMemory";

export default async function Page({ params }: { params: { tenant: string } }) {
  const tenantId = params.tenant;
  const tenancy = getTenancyInMemoryDeps();
  const merchant = await tenancy.merchants.getByTenantId(tenantId);
  const ownerName = merchant?.displayName ?? tenantId;
  return (
    <main className="mx-auto max-w-5xl px-6 py-10 space-y-8">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Storefront</h1>
        <OwnerBadge ownerName={ownerName} />
      </header>
      <section className="space-y-4">
        <h2 className="text-lg font-medium">Products</h2>
        <ProductList tenantId={tenantId} />
      </section>
    </main>
  );
}
