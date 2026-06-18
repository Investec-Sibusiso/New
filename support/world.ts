
import { Given, When, Then, setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, Page } from '@playwright/test';
import { loginPage } from '../pages/login.page';
//import { expect } from '@playwright/test';

export class CustomWorld extends World {
  browser!: Browser;
  page!: Page;
  loginPage!: loginPage;
}

setWorldConstructor(CustomWorld);
