import { getInMemoryDeps } from "@/src/modules/checkout/infra/inMemory";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DemoCheckout } from "@/components/demo-checkout";
import { ProductHero } from "@/components/storefront/ProductHero";
import { OwnerBadge } from "@/components/storefront/OwnerBadge";
import { TopSellers } from "@/components/storefront/TopSellers";

export default async function ProductDetailPage({
  params,
}: {
  params: { tenant: string; productId: string };
}) {
  const { tenant: tenantId, productId } = params;
  const deps = getInMemoryDeps();
  const product = await deps.products.getById(tenantId, productId);
  if (!product) return notFound();

  // For now, we treat the tenantId as the storefront owner name (demo data)
  const ownerName = tenantId;

  return (
    <main className="mx-auto max-w-5xl px-6 py-10 space-y-8">
      <Button asChild variant="link">
        <Link href={`/${tenantId}` as any}>← Back to storefront</Link>
      </Button>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <ProductHero
            title={product.title}
            priceCents={product.priceCents}
            description={product.description}
          />
        </div>
        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Owner</CardTitle>
              <CardDescription>Storefront</CardDescription>
            </CardHeader>
            <CardContent>
              <OwnerBadge ownerName={ownerName} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Insights</CardTitle>
              <CardDescription>Top sellers</CardDescription>
            </CardHeader>
            <CardContent>
              <TopSellers />
            </CardContent>
          </Card>
        </aside>
      </div>

      {/* Demo checkout below, matching homepage style (no nested card) */}
      <DemoCheckout />
    </main>
  );
}
