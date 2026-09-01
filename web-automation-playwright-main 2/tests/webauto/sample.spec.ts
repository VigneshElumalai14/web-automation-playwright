import{test, chromium} from '@playwright/test'

test("TC_01",async()=>
{
    //test log
    let browser = await chromium.launch();
    let context=await browser.newContext();
    let page=await context.newPage();
    await page.goto("https://www.automationexercise.com/signup");

});
