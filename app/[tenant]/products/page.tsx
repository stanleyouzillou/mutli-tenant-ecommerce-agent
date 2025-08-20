import { ProductList } from "@/components/storefront/ProductList";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Server-first: this page is a server component.
export default function Page({ params }: { params: { tenant: string } }) {
  const tenantId = params.tenant;
  return (
    <main className="mx-auto max-w-5xl px-6 py-10 space-y-8">
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold">Products</h1>
        <Button asChild variant="link">
          <Link href={`/${tenantId}` as any}>← Back to storefront</Link>
        </Button>
      </div>
      <ProductList tenantId={tenantId} />
    </main>
  );
}
