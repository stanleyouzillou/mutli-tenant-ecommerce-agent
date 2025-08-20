type Seller = { id: string; name: string; sales: number };

export function TopSellers({ items }: { items?: Seller[] }) {
  const data =
    items ??
    ([
      { id: "s-1", name: "Alice Nguyen", sales: 124 },
      { id: "s-2", name: "Bob Martinez", sales: 98 },
      { id: "s-3", name: "Chloe Patel", sales: 73 },
    ] satisfies Seller[]);
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium">Top sellers</h3>
      <ul className="space-y-2">
        {data.map((s) => (
          <li key={s.id} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-muted text-xs grid place-items-center">
                {initials(s.name)}
              </div>
              <span className="text-sm">{s.name}</span>
            </div>
            <span className="text-xs text-muted-foreground">
              {s.sales} sales
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((s) => s[0]?.toUpperCase())
    .join("")
    .slice(0, 2);
}
