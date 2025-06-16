import{test,request, expect} from '@playwright/test'
// import { request } from 'http';

let requestvalue;

test.describe("",async()=>
{

test.beforeAll("",async()=>
    {
        requestvalue =await request.newContext(
            {
                baseURL:'https://automationexercise.com/api/',
                extraHTTPHeaders: {
                    'Accept': 'application/json',
  }       
            }
        );

    })
test("TC_01_API_Get All Products List",async()=>
{
    const allProducts=await requestvalue.get("productsList");
    const text = await allProducts.text();
    try {
    const json = JSON.parse(text);
    console.log('Parsed JSON:', json);
  } catch (err) {
    console.error('Not valid JSON:', err.message);
  }
})
test("TC_02_API_POST To All Products List",async()=>
{
    let allProducts=await requestvalue.post("productsList");
    const postAllproductlist= await allProducts.text();
    console.log(postAllproductlist);

})

});

