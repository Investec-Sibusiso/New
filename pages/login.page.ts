
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
    await this.page.waitForLoadState('networkidle');
  }

  async enterUsername(username: string) {
  await this.page.waitForLoadState('domcontentloaded');
  const usernameField = this.page.getByRole('textbox').first();

  await usernameField.waitFor({ state: 'visible', timeout: 15000 });

  await usernameField.fill(username);

  console.log('Username entered');

  // Click Next
  const nextButton = this.page.getByRole('button');
  await nextButton.first().click();
}

  async enterPassword(password: string) {
    await this.page.waitForSelector('input[name="password"]');
    await this.page.fill('input[name="password"]', password);
    await this.page.click('button[type="submit"]');
  }

  async getErrorMessage() {
    return this.page.locator('.oj-message-content').innerText();
  }
}