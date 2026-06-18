
import { Page } from '@playwright/test';

export class loginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto(
      'https://idcs-7a2538a62c0544dd9d9d1de1c3a71bfb.identity.oraclecloud.com/ui/v1/signin'
    );
   }

  async enterUsername(username: string) {
    await this.page.waitForLoadState('domcontentloaded');

    const inputFields = this.page.locator('input');

    await inputFields.first().waitFor({ state: 'visible', timeout: 20000 });

    await inputFields.first().fill(username);

    console.log('Username entered');

    const nextButton = this.page.locator('button[type="submit"]');
    await nextButton.first().click();

    await this.page.waitForTimeout(3000);
  }

  async enterPassword(password: string) {
    const passwordField = this.page.locator('input[type="password"]');

    await passwordField.waitFor({ state: 'visible', timeout: 20000 });

    await passwordField.fill(password);

    console.log('Password entered');

    await this.page.locator('button[type="submit"]').click();
  }

  async getErrorMessage() {
    // Try a generic Oracle error container
    const errorMessage = this.page.locator('text=invalid');

    await errorMessage.waitFor({ state: 'visible', timeout: 10000 });

    const text = await errorMessage.innerText();

    console.log('Error message:', text);

    return text;
  }
}

