import { test, expect } from "../src/fixtures/test";
import { createSignupData } from "../src/test-data/signup.data";

test.beforeEach(async ({ signupPage }) => {

  await signupPage.navigate("/auth/register");
});

test("Register with valid customer details", async ({ signupPage, page }) => {

  const signupData = createSignupData();

  await signupPage.register(signupData);

  await expect(page).toHaveURL(/auth\/login/);


});