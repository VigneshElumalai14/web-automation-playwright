import * as ExcelJS from 'exceljs';

export class ExcelUtil {
  async readExcel(filePath: string, sheetName: string)
  {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const sheet = workbook.getWorksheet(sheetName);

    const rows: Array<{ Attribute: string; Value: string }> = [];

    if (sheet) {
      sheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return; // skip header row

        const rowData: any = {};
        sheet.getRow(1).eachCell((cell, colNumber) => {
          const header = cell.value?.toString().trim();
          if (header) {
            const cellValue = row.getCell(colNumber).value;
           
            let valueAsString = '';
            if (typeof cellValue === 'object' && cellValue !== null && 'text' in cellValue) {
              valueAsString = (cellValue as any).text;
            } else {
              valueAsString = cellValue?.toString().trim() || '';
            }
            rowData[header] = valueAsString;
          }
        });

        rows.push(rowData);
        // console.log(rowData)
      });
    }

    return rows; // ✅ YOU NEED THIS!
  }
}
