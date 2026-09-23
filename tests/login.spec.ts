import { environment } from "../src/config/environment";
import { test, expect } from "../src/fixtures/test";


test.beforeEach(async ({ loginPage  }) => {
    await loginPage.navigate('/auth/login');
});

test("Login with valid credentials", async ({ loginPage, page}) => {
    await loginPage.login(
        environment.userEmail,
        environment.userPassword
    );

    await expect(page).toHaveURL(/account/);
});