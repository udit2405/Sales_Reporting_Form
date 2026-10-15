var FIELDS = ['VIP Sale', 'SKY Sale', 'ARI Sale', 'VIP Total Sale', 'VIP MTD Sale',
              'AT', 'KT', 'AT TOTAL SALE', 'AT MTD', 'SAFARI SALE', 'SAFARI MTD'];
var FIRST_VALUE_COL = 3;   // column C
var STAMP_COL = 14;        // column N
var DATE_COL = 15;         // column O (sales date picked on the form)

function sheet_() { return SpreadsheetApp.getActive().getSheets()[0]; }

// The website (GitHub Pages) calls this to fill the store dropdown.
function doGet() {
  return ContentService.createTextOutput(JSON.stringify(getStores()))
    .setMimeType(ContentService.MimeType.JSON);
}

// The website posts {code, date, values:{...}} here.
function doPost(e) {
  var d = JSON.parse(e.postData.contents);
  submitSale(d.code, d.values, d.date);
  return ContentService.createTextOutput('ok');
}

function getStores() {
  var v = sheet_().getDataRange().getValues(), out = [];
  for (var i = 1; i < v.length; i++) {
    if (v[i][0] !== '' && v[i][1] !== '') out.push({ code: String(v[i][0]).trim(), name: String(v[i][1]).trim() });
  }
  return out;
}

function submitSale(code, values, dateStr) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var sh = sheet_(), v = sh.getDataRange().getValues(), row = -1;
    for (var i = 1; i < v.length; i++) {
      if (String(v[i][0]).trim() === String(code).trim()) { row = i + 1; break; }
    }
    if (row < 0) throw new Error('Store not found');
    var vals = FIELDS.map(function (f) { return (values[f] === '' || values[f] == null) ? '' : Number(values[f]); });
    sh.getRange(row, FIRST_VALUE_COL, 1, FIELDS.length).setValues([vals]);
    sh.getRange(1, STAMP_COL).setValue('Last Updated');
    sh.getRange(row, STAMP_COL).setValue(new Date());
    sh.getRange(1, DATE_COL).setValue('Sales Date');
    if (dateStr) {
      var p = String(dateStr).split('-');
      sh.getRange(row, DATE_COL).setValue(new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]))).setNumberFormat('dd-mmm-yyyy');
    }
    return 'ok';
  } finally {
    lock.releaseLock();
  }
}
