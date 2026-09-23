import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {

  private readonly loginInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);

    this.loginInput = this.page.getByPlaceholder("Your email");
    this.passwordInput = this.page.getByPlaceholder("Your password");
    this.loginButton = this.page.getByRole("button", { name: "Login" });
  }

  async login(email: string, password: string): Promise<void> {
    await this.loginInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}