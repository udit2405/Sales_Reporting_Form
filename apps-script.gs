// Paste this into the Google Sheet: Extensions > Apps Script. Then Deploy > New deployment > Web app
// (Execute as: Me, Who has access: Anyone). Copy the web-app URL into SCRIPT_URL in index.html.
const SHEET_NAME = "Sales";
const HEADERS = ["Submitted At","Store","Date","VIP Sale","SKY Sale","ARI Sale","VIP Total Sale","VIP MTD Sale",
                 "AT","KT","AT Total Sale","AT MTD","Safari Sale","Safari MTD"];
const KEYS = ["submitted_at","store","date","vip_sale","sky_sale","ari_sale","vip_total_sale","vip_mtd_sale",
              "at_sale","kt_sale","at_total_sale","at_mtd","safari_sale","safari_mtd"];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const d = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sh.getLastRow() === 0) { sh.appendRow(HEADERS); sh.setFrozenRows(1); sh.getRange(1,1,1,HEADERS.length).setFontWeight("bold"); }
    sh.appendRow(KEYS.map(k => {
      const v = d[k];
      return (k === "submitted_at" || k === "store" || k === "date") ? v : Number(v);
    }));
    return ContentService.createTextOutput("ok");
  } finally {
    lock.releaseLock();
  }
}
