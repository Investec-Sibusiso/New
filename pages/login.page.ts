import { Page } from '@playwright/test';

export class loginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto(
      'https://idcs-7a2538a62c0544dd9d9d1de1c3a71bfb.identity.oraclecloud.com/ui/v1/signin',
      { waitUntil: 'networkidle' } 
    );
  }

  async enterUsername(username: string) {
    console.log('Waiting for Oracle login page...');

    // Ensure full UI load
    await this.page.waitForLoadState('networkidle');

    // (Oracle is slow)
    await this.page.waitForTimeout(8000);

    // DEBUG screenshot
    await this.page.screenshot({ path: '01-before-username.png', fullPage: true });

    console.log('Locating username field...');

    // NOT generic input anymore
    const usernameField = this.page.locator('input[type="text"]');

    await usernameField.first().waitFor({
      state: 'visible',
      timeout: 30000
    });

    await usernameField.first().fill(username);

    console.log('Username entered');

    // Click Next button
    const nextButton = this.page.locator('button');

    await nextButton.first().click();

    // Wait for password screen
    await this.page.waitForTimeout(5000);
  }

  async enterPassword(password: string) {
    console.log('Waiting for password field...');

    const passwordField = this.page.locator('input[type="password"]');

    await passwordField.waitFor({
      state: 'visible',
      timeout: 30000
    });

    await passwordField.fill(password);

    console.log('Password entered');

    // Click Sign In
    await this.page.locator('button').first().click();

    // Wait for response
    await this.page.waitForTimeout(5000);
  }

  async getErrorMessage() {
    console.log('Checking for error message...');

    // safer locator (Oracle varies)
    const errorMessage = this.page.locator('text=Invalid');

    await errorMessage.waitFor({
      state: 'visible',
      timeout: 18000
    });

    const text = await errorMessage.innerText();

    console.log('Error message:', text);

    return text;
  }

  async clickMyTeamTab() {
    console.log('Waiting for My Team tab...');

    await this.page.waitForLoadState('networkidle');

    await this.page.waitForTimeout(8000);

    await this.page.screenshot({ path: '02-before-myteam.png', fullPage: true });

    const myTeam = this.page.locator('text=My Team');

    await myTeam.waitFor({
      state: 'visible',
      timeout: 50000
    });

    await myTeam.click();

    console.log('My Team clicked');
  }
}
