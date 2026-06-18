
import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';

setDefaultTimeout(80 * 1000); // increase timeout

Before(async function () {
  const browser = await chromium.launch({
    headless: true,        // MUST be true in Codespaces
    args: ['--no-sandbox'] 
  });

  const page = await browser.newPage();

  this.browser = browser;
  this.page = page;

  console.log('Browser launched (headless)');
});


After(async function (scenario) {
  if (scenario.result?.status === 'FAILED') {
    await this.page.screenshot({ path: `error.png`, fullPage: true });
  }

  if (this.browser) {
    await this.browser.close();
  }
});
