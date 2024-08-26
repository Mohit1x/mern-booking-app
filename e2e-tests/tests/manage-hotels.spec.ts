import test, { expect } from "@playwright/test";
import { waitForDebugger } from "inspector";
import path from "path";

const UI_URL = " http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByRole("link", { name: "Sign In" }).click();
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("mohit9@gmail.com");
  await page.locator("[name=password]").fill("123456");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Sign in sucessfull")).toBeVisible();
});

test("should allow user to add hotel", async ({ page }) => {
  await page.goto(`${UI_URL}add-hotel`);

  await page.locator("[name=name]").fill("Mumbai Gateways");
  await page.locator("[name=city]").fill("Mumbai");
  await page.locator("[name=country]").fill("India");
  await page
    .locator("[name=description]")
    .fill("This is the description of the perticular hotel");
  await page.locator("[name=pricePerNight]").fill("100");
  await page.selectOption('select[name="starRating"]', "3");
  await page.getByText("luxury").click();
  await page.getByLabel("parking").check();
  await page.getByLabel("spa").check();
  await page.locator("[name=adultCount]").fill("2");
  await page.locator("[name=childCount]").fill("1");
  await page.setInputFiles("[name=imageFiles]", [
    path.join(__dirname, "files", "1.jpeg"),
    // path.join(__dirname, "files", "2.png"),
  ]);

  await page.getByRole("button", { name: "Save" }).click();
  await page.waitForTimeout(10 * 1000);
  await expect(page.locator('li:has-text("Hotel Saved!")')).toBeVisible();
});
