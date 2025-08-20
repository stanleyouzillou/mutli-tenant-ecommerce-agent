import { test, expect } from "@playwright/test";

// UI flow covering the happy path from storefront to checkout demo
// - Navigates to tenant storefront
// - Opens product detail
// - Runs the client-side DemoCheckout flow
// - Asserts that the download button appears

test.describe("Storefront UI flow (happy path)", () => {
  test("tenant storefront -> product detail -> demo checkout", async ({
    page,
    baseURL,
  }) => {
    // 1) Tenant storefront
    await page.goto(`${baseURL}/acme`);
    await expect(
      page.getByRole("heading", { name: "Storefront" })
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Products" })).toBeVisible();

    // 2) Open product detail
    await page.getByRole("link", { name: "View details" }).click();
    await expect(page).toHaveURL(/\/acme\/products\/go-fast-ebook$/);

    // Product detail should show title and price via ProductHero
    await expect(
      page.getByRole("heading", { name: "Go Fast eBook" })
    ).toBeVisible();

    // 3) Run DemoCheckout
    await page.getByRole("button", { name: "Buy now (fake)" }).click();

    // Expect progress status updates and final download button (renders as link)
    await expect(page.getByText("Payment succeeded")).toBeVisible();
    await expect(page.getByText("License issued")).toBeVisible();
    await expect(page.getByText("Download link ready")).toBeVisible();

    const downloadLink = page.getByRole("link", { name: "Open download" });
    await expect(downloadLink).toBeVisible();

    // Clicking it navigates same tab to the mocked download URL
    await Promise.all([page.waitForNavigation(), downloadLink.click()]);
    await expect(page).toHaveURL(/\/download\/mock-file\.pdf\?sig=demo$/);
  });
});
