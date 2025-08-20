import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getInMemoryDeps } from "@/src/modules/checkout/infra/inMemory";

export async function ProductList({ tenantId }: { tenantId: string }) {
  const deps = getInMemoryDeps();
  const products = await deps.products.listByTenant(tenantId);
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <Card key={p.id}>
          <div className="aspect-[16/10] bg-muted" />
          <CardHeader>
            <CardTitle className="text-base">{p.title}</CardTitle>
            <CardDescription>
              <span className="font-medium">
                €{(p.priceCents / 100).toFixed(0)}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter>
            <Button asChild>
              <Link href={`/${tenantId}/products/${p.id}`}>View details</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
