import { test, expect } from "@playwright/test";
import { ProductPage} from '../src/pages/ProductPage';
 
// test("Search Product",async({ page })=>{
//     await page.goto('/');
//     const productPage = new ProductPage(page);
//     await productPage.searchProduct("hammer");
// });

test("Search the product with valid keyword and get the product count",async({ page })=>{
    await page.goto('/');
    const productPage = new ProductPage(page);
    await productPage.searchProduct('Hammer');
    await expect(productPage.productCards).toHaveCount(6);
});

test("Search the product with Invaild Keyword",async({ page })=>{
    await page.goto('/');
    const productPage = new ProductPage(page);
    await productPage.searchProduct('uieuieuiwreir');
    await expect(productPage.productCards).toHaveCount(0)
});