import { Locator, Page } from '@playwright/test';

export class ProductPage {

  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly productCards: Locator;

  constructor(private readonly page: Page) {
    this.searchInput = page.getByPlaceholder('Search');
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.productCards = page.locator('//a[@class="card"]');
  }

  async searchProduct(productName: string): Promise<void> {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

}