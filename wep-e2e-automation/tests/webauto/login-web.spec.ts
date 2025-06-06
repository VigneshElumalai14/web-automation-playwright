import { test, expect, chromium, Page, Browser, BrowserContext } from '@playwright/test';
import loginpageUi from '../pages/loginpage.ts';
import { ExcelUtil } from '../ExcelData.ts';
import LoginPage from '../pages/loginpage.ts';

//vicky

let page: Page;
let browser: Browser;
let context: BrowserContext;
let loginPageObj: loginpageUi;

let excelUtil: ExcelUtil;
let data: any[];
let excelDataMap = {};

test.describe('Login-Page For Swag Labs', () => {

    test.beforeAll(async () => {

       excelUtil = new ExcelUtil();
       data = await excelUtil.readExcelData('SauceDemoData.xlsx');
    
       data.forEach((row : { Attribute: string; Value: string } , index) => {
        excelDataMap[row.Attribute.trim()] = row.Value.trim();
    });
       browser = await chromium.launch();
       context = await browser.newContext();
       page = await context.newPage();
       loginPageObj = new LoginPage(page);
    });

    
  test('TC1 - Check the content in login page', async () => {
    await loginPageObj.gotoLoginPage();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect.soft(loginPageObj.logoText).toHaveText(excelDataMap['Page Title']);
    await expect.soft(loginPageObj.usernameInput).toHaveAttribute('placeholder', excelDataMap['User Name Placeholder']);
    await expect.soft(loginPageObj.passwordInput).toHaveAttribute('placeholder', excelDataMap['Password Placeholder']);
  });

});
