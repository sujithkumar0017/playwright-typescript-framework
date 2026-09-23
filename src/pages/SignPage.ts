import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { SignupData } from "../types/SignUpData";


export class SignupPage extends BasePage {

  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly dateOfBirthInput: Locator;
  private readonly countrySelect: Locator;
  private readonly postalCodeInput: Locator;
  private readonly houseNumberInput: Locator;
  private readonly streetInput: Locator;
  private readonly cityInput: Locator;
  private readonly stateInput: Locator;
  private readonly phoneInput: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly registerButton: Locator;

  constructor(page: Page) {
    super(page);

    this.firstNameInput = this.page.getByPlaceholder("First name *");
    this.lastNameInput = this.page.getByPlaceholder("Your last name *");
    this.dateOfBirthInput = this.page.getByPlaceholder("YYYY-MM-DD");
    this.countrySelect = this.page.locator('#country');
    this.postalCodeInput = this.page.getByPlaceholder("Your Postcode *");
    this.houseNumberInput = this.page.getByPlaceholder("e.g. 42 *");
    this.streetInput = this.page.getByPlaceholder("Your Street");
    this.cityInput = this.page.getByPlaceholder("Your City *");
    this.stateInput = this.page.getByPlaceholder("Your State *");
    this.phoneInput = this.page.getByPlaceholder("Your phone *");
    this.emailInput = this.page.getByPlaceholder("Your email *");
    this.passwordInput = this.page.getByPlaceholder("Your password");
    this.registerButton = this.page.getByRole("button", { name: "Register" });
  }

  async register(data: SignupData): Promise<void> {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.dateOfBirthInput.fill(data.dateOfBirth);

    // Country dropdown will be handled separately.
    await this.countrySelect.selectOption(data.country);
    await this.postalCodeInput.fill(data.postalCode);
    await this.houseNumberInput.fill(data.houseNumber);
    await this.streetInput.fill(data.street);
    await this.cityInput.fill(data.city);
    await this.stateInput.fill(data.state);
    await this.phoneInput.fill(data.phone);
    await this.emailInput.fill(data.email);
    await this.passwordInput.fill(data.password);
    await this.registerButton.click();
  }
}