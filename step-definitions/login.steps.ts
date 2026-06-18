
import { Given, When, Then } from '@cucumber/cucumber';
import { loginPage as LoginPageClass } from '../pages/login.page';
import { expect, type Page } from '@playwright/test';

let loginPageInstance: LoginPageClass;

Given(/^user is on Oracle login page$/, async function () {
  console.log('GIVEN STEP RUNNING');

  loginPageInstance = new LoginPageClass(this.page);

  await loginPageInstance.navigate();

  console.log('Navigation done');
});

When(/^user enters username "([^"]*)"$/, async function (username: string) {
  console.log('WHEN USERNAME STEP');

  if (!loginPageInstance) {
    throw new Error('loginPage is NOT initialised');
  }

  await loginPageInstance.enterUsername(username);
});

When(/^user enters password "([^"]*)"$/, async function (password: string) {
  console.log('WHEN PASSWORD STEP');

  if (!loginPageInstance) {
    throw new Error('loginPage is NOT initialised');
  }

  await loginPageInstance.enterPassword(password);
});

Then(/^error message should be displayed$/, async function () {
  console.log('THEN STEP');

  const error = await loginPageInstance.getErrorMessage();
  expect(error).toBeTruthy();
});

Then(/^user clicks on My Team tab$/, async function () {
  console.log('THEN STEP - My Team');

  const myTeamButton = this.page.getByRole('link', { name: 'My Team' });

  await myTeamButton.waitFor({ state: 'visible', timeout: 15000 });
  await myTeamButton.click();
});

Then(/^user should see My Team page$/, async function () {
  console.log('VERIFY My Team page');

  const myTeamHeader = this.page.getByRole('heading', { name: 'My Team' });

  await myTeamHeader.waitFor({ state: 'visible', timeout: 15000 });

  const headerText = await myTeamHeader.innerText();
  expect(headerText).toBe('My Team');
});
