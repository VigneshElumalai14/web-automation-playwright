import { Browser, BrowserContext, chromium, expect, Page, test } from '@playwright/test';
import LoginPage, { formLocator } from '../pages/registerpage';
import excelTestData from '../../excelDetails.json';

let browser: Browser;
let context: BrowserContext;
let page: Page;
let loginPage: LoginPage;
let excelDataMap: Record<string, string> = {};

const excelFilePath = excelTestData.LoginPage.ExcelWorkBook;
const sheetName = excelTestData.LoginPage.ExcelLoginSheet;

test.describe('Login Functionality',()=>
{
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

  test('TC_09_Login_With_Valid_Credentials',async()=>
  {
    await loginPage.clickSignupLogin();
    await loginPage.LoginEnterMail(excelDataMap['User Name Mail'],excelDataMap['User password'])
    await loginPage.clickLoginCTA.click();
    await page.pause();
  })
})
