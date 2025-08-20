import { describe, it, expect } from "vitest";
import {
  buyProduct,
  type BuyProductDeps,
} from "@/src/modules/checkout/application/use_cases/buyProduct";
import { getInMemoryDeps, seed } from "@/src/modules/checkout/infra/inMemory";

describe("buyProduct use-case", () => {
  it("succeeds: records order, issues license, creates one-time download grant", async () => {
    const deps = getInMemoryDeps();
    const result = await buyProduct(deps, {
      tenantId: seed.tenantId,
      productId: seed.productId,
      buyerEmail: "bo@example.com",
    });

    expect(result.orderId).toBeTypeOf("string");
    expect(result.licenseId).toBeTypeOf("string");
    expect(result.grantId).toBeTypeOf("string");
  });

  it("fails when payment is declined", async () => {
    const base = getInMemoryDeps();
    // Override payments with a failing gateway
    const deps: BuyProductDeps = {
      ...base,
      payments: {
        async charge() {
          return { status: "failed", reason: "card_declined" } as const;
        },
      },
    };

    await expect(
      buyProduct(deps, {
        tenantId: seed.tenantId,
        productId: seed.productId,
        buyerEmail: "bo@example.com",
      })
    ).rejects.toThrow(/Payment failed/i);
  });
});
