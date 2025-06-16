import { test, request } from '@playwright/test';

test('Fetch productsList from automationexercise.com', async () => {
  const apiContext = await request.newContext();

  const response = await apiContext.get('https://automationexercise.com/api/productsList');


  const text = await response.text();
//   console.log('Raw response:', text);

  // Try to parse if it's JSON (even if wrongly labeled)
  try {
    const json = JSON.parse(text);
    console.log('Parsed JSON:', json);
  } catch (err) {
    console.error('Not valid JSON:', err.message);
  }
});
