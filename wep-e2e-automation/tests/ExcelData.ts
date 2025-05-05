import * as XLSX from 'xlsx';


export class ExcelUtil {

  async readExcelData(filePath: string) {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet);
    return jsonData;
  }
}
