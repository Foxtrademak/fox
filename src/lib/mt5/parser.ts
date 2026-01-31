import ExcelJS from "exceljs";

/**
 * Reads an Excel file and extracts raw data rows from the most relevant sheet
 */
export const parseMT5ExcelFile = async (file: File): Promise<unknown[][]> => {
  const data = await file.arrayBuffer();
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(data);
  
  const sheetNames = workbook.worksheets.map(w => w.name);
  
  // Strategy to find the correct sheet
  let targetSheetName = sheetNames.find(name => 
    ['positions', 'المراكز'].some(p => name.toLowerCase().includes(p))
  );

  if (!targetSheetName) {
    targetSheetName = sheetNames.find(name => 
      ['deals', 'صفقات', 'العمليات', 'trades', 'history', 'تاريخ'].some(p => name.toLowerCase().includes(p))
    );
  }

  if (!targetSheetName) targetSheetName = sheetNames[0];

  const dealsSheet = workbook.getWorksheet(targetSheetName);
  if (!dealsSheet) {
    throw new Error('Could not find a valid data sheet in the Excel file.');
  }

  const rawData: unknown[][] = [];
  dealsSheet.eachRow({ includeEmpty: true }, (row) => {
    const rowValues: unknown[] = [];
    for (let i = 1; i <= dealsSheet.columnCount; i++) {
      const cell = row.getCell(i);
      let value = cell.value;
      
      // Handle ExcelJS specific cell objects
      if (value && typeof value === 'object' && !(value instanceof Date)) {
        const obj = value as unknown as Record<string, unknown>;
        if (typeof obj.result !== 'undefined') {
          value = obj.result as ExcelJS.CellValue;
        } else if (Array.isArray(obj.richText)) {
          const richText = obj.richText as Array<{ text?: string }>;
          value = richText.map(rt => rt.text || '').join('');
        } else if (typeof obj.text !== 'undefined') {
          value = obj.text as ExcelJS.CellValue;
        }
      }
      
      rowValues.push(value === null || value === undefined ? "" : value);
    }
    rawData.push(rowValues);
  });

  return rawData;
};
