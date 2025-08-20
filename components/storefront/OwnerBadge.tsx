import { Badge } from "@/components/ui/badge";

export function OwnerBadge({ ownerName }: { ownerName: string }) {
  const initials = ownerName
    .split(" ")
    .map((s) => s[0]?.toUpperCase())
    .join("")
    .slice(0, 2);
  return (
    <div className="flex items-center gap-2">
      <div className="h-6 w-6 rounded-full bg-muted text-xs grid place-items-center">
        {initials}
      </div>
      <Badge variant="secondary">{ownerName}</Badge>
    </div>
  );
}
