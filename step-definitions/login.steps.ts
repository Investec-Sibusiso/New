
import { Given, When, Then } from '@cucumber/cucumber';
import { loginPage as LoginPageClass } from '../pages/login.page';
import { expect, type Page } from '@playwright/test';

type CustomWorld = {
  page: Page;
  loginPage?: LoginPageClass;
};

let loginPageInstance: LoginPageClass;

Given(/^user is on Oracle login page$/, async function () {
  console.log('GIVEN STEP RUNNING');

  loginPageInstance = new LoginPageClass(this.page);

  await loginPageInstance.navigate();

  console.log('Navigation done');
});

When(/^user enters username "([^"]*)"$/, async function (username: string) {
  console.log('WHEN USERNAME STEP');
  console.log('loginPageInstance:', loginPageInstance);

  if (!loginPageInstance) {
    throw new Error('loginPage is NOT initialised');
  }

  await loginPageInstance.enterUsername('Kevin.Xaba');
});


When(/^user enters password "([^"]*)"$/, async function (password: string) {
  await loginPageInstance.enterPassword(password);

});

When(/^user enters password "([^"]*)"$/, async function (password: string) {
  console.log('WHEN PASSWORD STEP');
  console.log('loginPageInstance:', loginPageInstance);
  if (!loginPageInstance) {
    throw new Error('loginPage is NOT initialised');
  }

  await loginPageInstance.enterPassword('InvestecDemo@2026');
});

Then(/^error message should be displayed$/, async function () {
  console.log('THEN STEP');

  const error = await loginPageInstance.getErrorMessage();
  expect(error).toBeTruthy();
});