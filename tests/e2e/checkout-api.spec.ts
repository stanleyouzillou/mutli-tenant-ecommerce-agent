import { test, expect } from "@playwright/test";

const endpoint = "/api/checkout/fake";

test.describe("fake checkout API", () => {
  test("happy path returns order, license, grant and downloadUrl", async ({
    request,
    baseURL,
  }) => {
    const res = await request.post(`${baseURL}${endpoint}`, {
      data: {
        tenantId: "acme",
        productId: "go-fast-ebook",
        buyerEmail: "bo@example.com",
      },
    });
    expect(res.ok()).toBeTruthy();
    const json = await res.json();
    expect(json.ok).toBe(true);
    expect(typeof json.orderId).toBe("string");
    expect(typeof json.licenseId).toBe("string");
    expect(typeof json.grantId).toBe("string");
    expect(typeof json.downloadUrl).toBe("string");
  });

  test("failure path returns 400 with ok=false when forced", async ({
    request,
    baseURL,
  }) => {
    const res = await request.post(`${baseURL}${endpoint}`, {
      data: {
        tenantId: "acme",
        productId: "go-fast-ebook",
        buyerEmail: "bo@example.com",
        forceFail: true,
      },
    });
    expect(res.status()).toBe(400);
    const json = await res.json();
    expect(json.ok).toBe(false);
    expect(typeof json.error).toBe("string");
  });
});
