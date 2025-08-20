"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export function ClientBuy({
  tenantId,
  productId,
}: {
  tenantId: string;
  productId: string;
}) {
  const [loading, setLoading] = React.useState(false);
  const [downloadUrl, setDownloadUrl] = React.useState<string | null>(null);

  async function buy() {
    setLoading(true);
    setDownloadUrl(null);
    try {
      const res = await fetch("/api/checkout/fake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tenantId,
          productId,
          buyerEmail: "bo@example.com",
        }),
      });
      const data = await res.json();
      if (data.ok) setDownloadUrl(data.downloadUrl);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex gap-2">
      <Button onClick={buy} disabled={loading}>
        {loading ? "Processing..." : "Buy now"}
      </Button>
      {downloadUrl && (
        <Button asChild variant="secondary">
          <a href={downloadUrl}>Download</a>
        </Button>
      )}
    </div>
  );
}
