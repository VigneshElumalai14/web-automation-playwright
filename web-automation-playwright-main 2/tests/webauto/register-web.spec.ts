import { Browser, BrowserContext, chromium, expect, Page, test } from '@playwright/test';
import LoginPage, { formLocator } from '../pages/registerpage';
import excelTestData from '../../excelDetails.json';

let browser: Browser;
let context: BrowserContext;
let page: Page;
let loginPage: LoginPage;
let excelDataMap: Record<string, string> = {};

const excelFilePath = excelTestData.LoginPage.ExcelWorkBook;
const sheetName = excelTestData.LoginPage.ExcelWorkSheet;

test.describe('Signup Functionality', () => {

test.beforeAll(async () => {
  browser = await chromium.launch();
  context = await browser.newContext();
  page = await context.newPage();
  loginPage = new LoginPage(page);
  excelDataMap = await loginPage.readExcelData(excelFilePath, sheetName);
  await loginPage.gotoLoginPage();
});

test.afterAll(async () => {
  await browser.close();
});

  test('TC_01_Verify Home Section is Visible', async () => {
    await expect(page).toHaveURL('/');
    const homeSection = loginPage.homeVisible.nth(1);
    await expect.soft(homeSection).toBeVisible();

    let homeTextColor = await homeSection.getAttribute('style');
    if (!homeTextColor?.includes(excelDataMap['home Text Color'])) {
      await loginPage.clickHome();
      homeTextColor = await homeSection.getAttribute('style');
    }
    await expect.soft(homeTextColor).toContain(excelDataMap['home Text Color']);
  });

  test('TC_02_Navigate to Signup/Login Page', async () => {
    await loginPage.clickSignupLogin();
    await expect(loginPage.newUserVisible).toBeVisible();
    await expect.soft(loginPage.newUserVisible).toHaveText(excelDataMap['New User header']);
  });

  test('TC_03_Validate Signup Form Placeholders', async () => {
    const namePlaceholder = await loginPage.signUpname.getAttribute('placeholder');
    expect.soft(namePlaceholder).toBe(excelDataMap['Name Text Box']);

    const emailPlaceholder = await loginPage.signUpMail.getAttribute('placeholder');
    expect.soft(emailPlaceholder).toBe(excelDataMap['Email Address Text Box']);
  });

  test('TC_04_Submit Signup Form', async () => {
    await loginPage.fillSignUpForm(excelDataMap['User Name'],excelDataMap['User Mail Id']);
    await loginPage.SubmitSignup();
    await expect.soft(loginPage.enterInfoUser.nth(0)).toHaveText(excelDataMap['User Details Header']);
  });

  test('TC_05_Fill Account Information', async () => {
    await loginPage.selectday.selectOption(excelDataMap['select day']);
    await loginPage.selectmonth.selectOption(excelDataMap['select month']);
    await loginPage.selectyear.selectOption(excelDataMap['select year']);
    await loginPage.genderselection();

    for (const id in formLocator) {
      await loginPage.fillInputById(id, formLocator[id]);
    }
  });

  test('TC_06_Create Account & Verify Account Created', async () => {
    await loginPage.clickCreateAccount.click();
    const accountText = await loginPage.accountCreated.textContent();
    expect.soft(accountText?.trim()).toBe(excelDataMap['Account Created']);
    await loginPage.clickContinue.click();
  });

  test('TC_07_Verify Logged in as User', async () => {
    const loggedText = (await loginPage.loggedinasaUser.innerText()).trim();
    expect.soft(loggedText).toBe(`Logged in as ${excelDataMap['User Name']}`);
  });

  test('TC_08_Delete Account', async () => {
    await loginPage.deleteAccount.click();
    const deletedText = await loginPage.accountCreated.textContent();
    expect.soft(deletedText?.trim()).toBe(excelDataMap['Account Deleted']);
    await loginPage.clickContinue.click();
  });
});

