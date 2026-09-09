function doGet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("シート1"); // シート名が異なる場合は変更してください
  
  // A2:B の範囲のデータを取得
  const lastRow = sheet.getLastRow();
  
  // データが1件もない場合は空配列を返す
  if (lastRow < 2) {
    return createJsonResponse([]);
  }
  
  const values = sheet.getRange(2, 1, lastRow - 1, 2).getValues();
  
  // JSON用データ構造を作成
  const newsList = [];
  
  for (let i = 0; i < values.length; i++) {
    const category = values[i][0];
    const message = values[i][1];
    
    // 空行はスキップ
    if (category || message) {
      newsList.push({
        category: category || "お知らせ",
        message: message || ""
      });
    }
  }

  return createJsonResponse(newsList);
}

// JSONレスポンスを作成する共通関数
function createJsonResponse(data) {
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
