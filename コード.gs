const FOLDER_ID = "1etAjqcCXzsubdWkLnndvBNXZVx6jj8D6"
const SPREAD_SHEET_ID = "1yc7I8rEGc-rVn-CXySwOR79CWyH4fk5t4dWaOZHpBtY";
const SHEET_NAME = "シート1"
const ACCESS_TOKEN = "3srB7Sh2G/msHdJ6Tnl3Mh54K14+qcXa3D0GG0nKt7WfI7e5B0XsRfthrAA7yWMbZ5KbHoE8VSXYA40d1oE6+Q0JM3bkEZ+5ee/o6prRW/NrSxxKS1pHdGAO/tPx3OuAMMllehXsrW11nXGC9ShJ1gdB04t89/1O/w1cDnyilFU=";

const sheet = SpreadsheetApp.openById(SPREAD_SHEET_ID).getSheetByName(SHEET_NAME);
const bot = new LineBotSdk.client(ACCESS_TOKEN);
function doPost(e) { bot.call(e, callback) };
function callback(e) {
  if (e.message.type == "image") {
    const url = "https://api-data.line.me/v2/bot/message/"+e.message.id+"/content";
    const options = { "headers" : { 'Authorization': 'Bearer ' + ACCESS_TOKEN } };
    const blob = UrlFetchApp.fetch(url, options).getBlob();
    const driveOptions = { title: e.message.id, parents: [{id: FOLDER_ID}] };
    const image = Drive.Files.insert(driveOptions, blob, { "ocr": true, "ocrLanguage": "ja" });
    const text = DocumentApp.openById(image.id).getBody().getText();
    sheet.appendRow([text, text.includes('合計') ? 'はい' : 'いいえ']);
    bot.replyMessage(e, [bot.textMessage("ご使用ありがとうございます！")]);
  }
};