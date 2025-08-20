import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DemoCheckout } from "@/components/demo-checkout";

const tenants = [
  {
    id: "acme",
    name: "ACME Books",
    color: "#6D28D9",
    tagline: "Ebooks for builders",
    logo: "A",
  },
  {
    id: "pixel",
    name: "Pixel Press",
    color: "#059669",
    tagline: "Design kits & templates",
    logo: "P",
  },
  {
    id: "sound",
    name: "SoundForge",
    color: "#DC2626",
    tagline: "SFX and loops",
    logo: "S",
  },
];

const products = [
  {
    id: "go-fast-ebook",
    tenant: "acme",
    title: "Ship Fast, TypeScript",
    price: 29,
    cover: "",
  },
  { id: "p2", tenant: "acme", title: "Next.js Playbook", price: 24, cover: "" },
  { id: "p3", tenant: "pixel", title: "UI Icons Pack", price: 19, cover: "" },
  {
    id: "p4",
    tenant: "pixel",
    title: "SaaS Landing Kit",
    price: 39,
    cover: "",
  },
  { id: "p5", tenant: "sound", title: "Indie Game SFX", price: 22, cover: "" },
  { id: "p6", tenant: "sound", title: "Lo-fi Loop Set", price: 14, cover: "" },
];

export default function Page() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
      {/* Hero */}
      <section className="grid gap-6 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Multi-tenant digital marketplace
          </h1>
          <p className="text-lg text-muted-foreground max-w-prose">
            Showcase value instantly with mock data. Click through a demo
            storefront or run the fake checkout to see the happy path.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href={`/${tenants[0].id}`}>Open demo storefront</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href={`/seller-demo`}>Seller dashboard demo</Link>
            </Button>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-6">
          <DemoCheckout />
        </div>
      </section>

      <Separator className="my-12" />

      {/* Featured storefronts */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold">Featured storefronts</h2>
          <Button asChild variant="link">
            <Link href={`/${tenants[0].id}`}>Browse a storefront →</Link>
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tenants.map((t) => (
            <Card key={t.id}>
              <CardHeader className="flex-row items-center gap-3">
                <div
                  className="grid h-10 w-10 place-items-center rounded-full text-white"
                  style={{ background: t.color }}
                >
                  <span className="text-sm font-bold">{t.logo}</span>
                </div>
                <div>
                  <CardTitle className="text-base">{t.name}</CardTitle>
                  <CardDescription>{t.tagline}</CardDescription>
                </div>
              </CardHeader>
              <CardFooter>
                <Button asChild size="sm">
                  <Link href={`/${t.id}`}>Open storefront</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="my-12" />

      {/* Trending products */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold">Trending products</h2>
          <Button asChild variant="link">
            <Link href={`/${tenants[0].id}`}>See all →</Link>
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <Card key={p.id} className="overflow-hidden">
              <div className="aspect-[16/10] w-full bg-muted" />
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{p.title}</h3>
                  <span className="text-sm font-semibold">€{p.price}</span>
                </div>
                <Badge variant="muted">{p.tenant}</Badge>
              </CardContent>
              <CardFooter>
                <Button asChild size="sm" variant="outline">
                  <Link href={`/${p.tenant}/products/${p.id}`}>View</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="my-12" />

      {/* Why it works */}
      <section className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Why it works</CardTitle>
            <CardDescription>
              Platform handles the heavy lifting so sellers can focus on
              products.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              <li>Instant delivery: purchase to download in ≤ 15s p95</li>
              <li>Licensing: automatic license issuance per order</li>
              <li>Analytics: per-tenant insights and event logs</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Build-ready foundations</CardTitle>
            <CardDescription>
              Server-first, DDD boundaries, and swappable adapters.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              <li>Server-first App Router, Tailwind + shadcn/ui</li>
              <li>Ports-first: swap Stripe/S3/Prisma later</li>
              <li>Row-level multi-tenancy and per-tenant RBAC</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <footer className="mt-16 text-center text-xs text-muted-foreground">
        Demo content. Prices and products are placeholders.
      </footer>
    </main>
  );
}
