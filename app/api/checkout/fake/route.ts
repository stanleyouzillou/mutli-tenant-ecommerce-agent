import { NextResponse } from "next/server";
import { buyProduct } from "@/src/modules/checkout/application/use_cases/buyProduct";
import { getInMemoryDeps, seed } from "@/src/modules/checkout/infra/inMemory";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const tenantId: string = body.tenantId ?? seed.tenantId;
    const productId: string = body.productId ?? seed.productId;
    const buyerEmail: string = body.buyerEmail ?? "bo@example.com";
    const forceFail: boolean = !!body.forceFail;

    const base = getInMemoryDeps();
    const deps = forceFail
      ? {
          ...base,
          payments: {
            async charge() {
              return { status: "failed", reason: "forced" } as const;
            },
          },
        }
      : base;

    const result = await buyProduct(deps, { tenantId, productId, buyerEmail });

    const downloadUrl = `/api/download/${
      result.grantId
    }?tenant=${encodeURIComponent(tenantId)}`;

    return NextResponse.json({
      ok: true,
      orderId: result.orderId,
      licenseId: result.licenseId,
      grantId: result.grantId,
      downloadUrl,
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Unknown error" },
      { status: 400 }
    );
  }
}
