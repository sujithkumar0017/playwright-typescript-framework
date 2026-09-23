import { test as setup, expect } from "../src/fixtures/test";
import { environment } from "../src/config/environment";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ loginPage, page }) => {

  await loginPage.navigate('/auth/login');
  await loginPage.login(
    environment.userEmail,
    environment.userPassword
  );

  await expect(page).toHaveURL(/account/);

  await page.context().storageState({
    path: authFile,
  });
});

//storageState saves the authenticated login session so we don't have to perform login again for every functionality test.