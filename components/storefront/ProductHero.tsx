import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ProductHero({
  title,
  priceCents,
  description,
}: {
  title: string;
  priceCents: number;
  description?: string | null;
}) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-[16/10] w-full bg-muted" />
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          <span className="font-medium">€{(priceCents / 100).toFixed(0)}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="prose prose-sm dark:prose-invert max-w-none">
        <p>{description ?? "No description provided."}</p>
      </CardContent>
    </Card>
  );
}
