import { Page, Locator, expect } from '@playwright/test';
import { ExcelUtil } from '../ExcelData.ts';
import excelTestData from '../../excelDetails.json';
import { error } from 'console';

let excelDataMap: Record<string, string> = {};
let excelFilePath = excelTestData.LoginPage.ExcelWorkBook;
let sheetName = excelTestData.LoginPage.ExcelWorkSheet;
const dataMap: Record<string, string> = {};

export const formLocator = {
    password:'MySecurePass',
    first_name: 'John',
    last_name: 'Doe',
    company:'Hogarth',
    address1: '123 Main Street',
    city: 'Los Angeles',
    state: 'California',
    zipcode: '90001',
    mobile_number: '1234567890'
  };

export default class LoginPage {
    readonly page: Page;
    readonly logoText: Locator;
    readonly signUpLogin:Locator;
    readonly homeVisible:Locator;
    readonly newUserVisible:Locator;
    readonly signUpname: Locator;
    readonly signUpMail: Locator;
    readonly clickSignUp:Locator;
    readonly enterInfoUser:Locator;
    readonly radioGender:Locator;
    readonly idlocatior:Locator;
    readonly selectday:Locator;
    readonly selectmonth:Locator;
    readonly selectyear:Locator;
    readonly clickCreateAccount:Locator;
    readonly accountCreated:Locator;
    readonly clickContinue: Locator;
    readonly loggedinasaUser:Locator;
    readonly loginEmail:Locator;
    loginPassword:Locator;
    clickLoginCTA:Locator;
    deleteAccount:Locator;
     
    constructor(page: Page) {
        this.page = page;
        this.logoText = page.locator('.login_logo');
        this.signUpLogin=page.locator('a[href="/login"]');
        this.homeVisible=page.locator('a[href="/"]');
        this.newUserVisible=page.locator('.signup-form h2');
        this.signUpname=page.getByPlaceholder('Name');
        this.signUpMail=page.locator('[data-qa="signup-email"]');
        this.clickSignUp=page.locator('[data-qa="signup-button"]');
        this.enterInfoUser= page.locator('.login-form h2.title');
        this.radioGender=page.locator('input[name="title"]');
        this.selectday=page.locator('#uniform-days #days');
        this.selectmonth=page.locator('#uniform-months #months');
        this.selectyear=page.locator('#uniform-years #years');
        this.clickCreateAccount=page.locator('.col-sm-4 .btn-default');
        this.accountCreated=page.locator('.col-sm-9 .text-center');
        this.clickContinue=page.locator('.pull-right .btn-primary');
        this.loggedinasaUser=page.locator('.shop-menu ul li:last-child');
        this.loginEmail=page.locator('[data-qa="login-email"]');
        this.loginPassword=page.locator("//input[@placeholder='Password']");
        this.clickLoginCTA=page.locator("[data-qa='login-button']")
        this.deleteAccount=page.locator('.shop-menu ul li .fa-trash-o')

    }


 async readExcelData(filePath: string, sheetName: string): Promise<Record<string, string>> {
        const excelUtil = new ExcelUtil();
        const data = await excelUtil.readExcel(filePath, sheetName);
        data.forEach((row: { Attribute: string; Value: string }) => {
            const key = row.Attribute?.trim();
            const value = row.Value?.trim();
            if (key && value) {
                dataMap[key] = value;
            }
        });

        excelDataMap = dataMap;
        return dataMap;
    }
      
    async gotoLoginPage() {
        await this.page.goto('/');
    }
    
    async clickSignupLogin()
    {
        await this.signUpLogin.click();
    }
    async clickHome()
    {
        return await this.homeVisible.nth(1).click();
    }
    
async fillSignUpForm(UserName:string,EnterSignUpMail:string)
{
    await this.signUpname.fill(UserName);
    await this.signUpMail.fill(EnterSignUpMail);
}

    async LoginEnterMail(LoginMail: string, Loginpasskey:string)
    {
        await this.loginEmail.fill(LoginMail);
        await this.loginPassword.fill(Loginpasskey)
    }
    async SubmitSignup()
    {
        await this.clickSignUp.click();
        
    }
   
    async genderselection()
        {
            excelDataMap=await this.readExcelData(excelFilePath, sheetName);
            let gendervalueMr= await this.radioGender.nth(0).getAttribute('value');
            let gendervalueMrs= await this.radioGender.nth(1).getAttribute('value');
            if(excelDataMap['Gender Value'] ===gendervalueMr)
            {
                await this.radioGender.nth(0).click();
            }
            else if(excelDataMap['Gender Value']===gendervalueMrs)
            {
                await this.radioGender.nth(1).click();   
            }
            else {
                throw new Error(`Gender value "${excelDataMap['Gender Value']}" does not match available options.`);
            }
        }

        async fillInputById(id: string, value: string) {
            const locator = this.page.locator(`#${id}`);
            const isVisible = await locator.isVisible();
            if (!isVisible) {
                return;
            }
        
            await locator.fill(value);
        }

        


}