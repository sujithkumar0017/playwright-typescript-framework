import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {

  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly productCards: Locator;

  constructor(page: Page) {
      super(page);

      this.searchInput = this.page.locator('#search-query');
      this.searchButton = this.page.getByRole('button', { name: 'Search' });
      this.productCards = this.page.locator('//a[@class="card"]');
  }

  async searchProduct(productName: string): Promise<void> {
      await this.searchInput.clear();
      await this.searchInput.fill(productName);
      await this.searchButton.click();
  }

  async getProductCount(): Promise<number> {
    return await this.productCards.count();
  }
}