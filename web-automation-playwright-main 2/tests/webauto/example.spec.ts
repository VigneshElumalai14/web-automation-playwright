// import { Browser, BrowserContext, chromium, expect, Page, test } from '@playwright/test';
// import LoginPage ,{formLocator}from '../pages/registerpage.ts';
// import excelTestData from '../../excelDetails.json';
// import { Console } from 'console';

// let browser: Browser;
// let page: Page;
// let context: BrowserContext;
// let loginPageVa: LoginPage;
// let excelDataMap: Record<string, string> = {};
// let excelFilePath: string;
// let sheetName: string;
// let  homeTextColor:string | null;

// // Load Excel File and Sheet Names
// excelFilePath = excelTestData.LoginPage.ExcelWorkBook;
// sheetName = excelTestData.LoginPage.ExcelWorkSheet;

// test.describe("Signup and Login Functionality", () => {
//  test.beforeAll(async () => {
//      browser = await chromium.launch();
//      context = await browser.newContext();
//      page = await context.newPage();
//      loginPageVa = new LoginPage(page);
//      excelDataMap = await loginPageVa.readExcelData(excelFilePath, sheetName);
//      await loginPageVa.gotoLoginPage();
//  });

//  test.afterAll(async () => {
//      await browser.close();
//  });


//  test("TC_01_Verify Home Section is Visible", async () => {
//      await expect(page).toHaveURL('/');
//      await expect.soft(loginPageVa.homeVisible.nth(1)).toBeVisible();
//      homeTextColor = await loginPageVa.homeVisible.nth(1).getAttribute('style');
//      if (!homeTextColor?.includes(excelDataMap['home Text Color'])) {
//          await loginPageVa.clickHome();
//          homeTextColor = await loginPageVa.homeVisible.nth(1).getAttribute('style');
//      }
//      await expect.soft(homeTextColor).toContain(excelDataMap['home Text Color']);
//  });


//  test("TC_02_Navigate to Signup/Login Page", async () => {
//      await loginPageVa.clickSignupLogin();
//      await expect(loginPageVa.newUserVisible).toBeVisible();
//      await expect.soft(loginPageVa.newUserVisible).toHaveText(excelDataMap['New User header']);
//  });


//  test("TC_03_Validate Signup Form Placeholders", async () => {
//      const namePlaceholder = await loginPageVa.signUpname.getAttribute('placeholder');
//      expect.soft(namePlaceholder).toBe(excelDataMap['Name Text Box']);
//      const emailPlaceholder = await loginPageVa.signUpMail.getAttribute('placeholder');
//      expect.soft(emailPlaceholder).toBe(excelDataMap['Email Address Text Box']);
//  });


//  test("TC_04_Submit Signup Form", async () => {
//      await loginPageVa.signUpEnterUsername(excelDataMap['User Name']);
//      await loginPageVa.SignUpEnterMail(excelDataMap['User Mail Id']);
//      await loginPageVa.SubmitSignup();
//      await expect.soft(loginPageVa.enterInfoUser.nth(0)).toHaveText(excelDataMap['User Details Header']);
//  });


//  test("TC_05_Fill Account Information", async () => {
//      await loginPageVa.selectday.selectOption(excelDataMap['select day']);
//      await loginPageVa.selectmonth.selectOption(excelDataMap['select month']);
//      await loginPageVa.selectyear.selectOption(excelDataMap['select year']);
//      await loginPageVa.genderselection();
//      for (const id in formLocator) {
//          await loginPageVa.fillInputById(id, formLocator[id]);    
//      }
        
//  });
//   test("TC_06_Create Account & Verify Account Created", async () => {
//     await loginPageVa.clickCreateAccount.click();
//     expect.soft(await loginPageVa.accountCreated.textContent()).toBe(excelDataMap['Account Created'])
//     await loginPageVa.clickContinue.click();  
   
//   });
//   test("TC_07_Verify Logged in as User", async () => {

//     const lastText = (await loginPageVa.loggedinasaUser.innerText()).trim();
//     expect.soft(lastText).toBe(`Logged in as ${excelDataMap['User Name']}`);
    
//   });

//   test('TC_08_Delete Account', async () => {
//   await page.locator('.shop-menu ul li .fa-trash-o').click();
//   expect.soft(await loginPageVa.accountCreated.textContent()).toBe(excelDataMap['Account Deleted']);
//   await loginPageVa.clickContinue.click();  
// });


// });