
import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';

setDefaultTimeout(80 * 1000); // increase timeout

Before(async function () {
  this.browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage']
  });

  const context = await this.browser.newContext();
  this.page = await context.newPage();

  console.log('Browser launched (stable)');
});


After(async function (scenario) {
  if (scenario.result?.status === 'FAILED') {
    await this.page.screenshot({ path: `error.png`, fullPage: true });
  }

  if (this.browser) {
    await this.browser.close();
  }
});
