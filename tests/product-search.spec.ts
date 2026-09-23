import { test, expect } from "../src/fixtures/test";
import { productData } from "../src/test-data/productData";
 
// test("Search Product",async({ page })=>{
//     await page.goto('/');
//     const productPage = new ProductPage(page);
//     await productPage.searchProduct("hammer");
// });
test.describe("Product Search", () => {
test.beforeEach(async ({ productPage  }) => {
    await productPage.navigate('/');
});


test("Search the product with valid keyword", async ({ productPage }) => {
    await productPage.searchProduct(productData.validProduct);

    await expect(productPage.productCards).toHaveCount(productData.expectedValidProductCount);
});

test("Search the product with invalid keyword", async ({
    productPage,
  }) => {
    await productPage.searchProduct(productData.invalidProduct);
  
    const productCount = await productPage.getProductCount();
  
        expect(productCount).toBe(productData.expectedInvalidProductCount);
    });
});