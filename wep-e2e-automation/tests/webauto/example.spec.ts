import { test } from '@playwright/test';
import { ExcelUtil } from '../ExcelData'; // Adjust path if needed

let excelDataMap = {};
test('Read Excel and print data', async () => {
  const excelUtil = new ExcelUtil();
  const data = await excelUtil.readExcelData('SauceDemoData.xlsx');

  // Log each row
  data.forEach((row : { Attribute: string; Value: string } , index) => {
    excelDataMap[row.Attribute.trim()] = row.Value.trim();
  });
  await console.log(excelDataMap)
});
