import { test as base } from "@playwright/test";
import { ProductPage } from "../pages/ProductPage";
import { LoginPage } from "../pages/LoginPage";
import { SignupPage } from "../pages/SignPage";

type Fixtures = {
    productPage: ProductPage;
    loginPage: LoginPage;
    signupPage: SignupPage;
};

export const test = base.extend<Fixtures>({
    productPage: async ({ page }, use) => {
        const productPage = new ProductPage(page);
        await use(productPage);
    },
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    signupPage: async ({ page }, use) => {
        const signupPage = new SignupPage(page);
        await use(signupPage);
    },
});

export { expect } from "@playwright/test";



//A fixture is something that prepares and provides a dependency to your test.
//Fixture = preparation + providing something that the test needs.


//"A fixture is a helper mechanism that prepares and provides the required Page Object to each test, so we don't have to manually create the Page Object in every test."

// Test
//  │
//  │ asks for productPage
//  ▼
// Fixture
//  │
//  │ new ProductPage(page)
//  ▼
// ProductPage object
//  │
//  │ use(productPage)
//  ▼
// Test receives productPage