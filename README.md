# Daily Sales Report Form

Google Apps Script web app bound to the sales Google Sheet. Sheet layout: column A = SAP code, B = store name, C–M = the 11 sales values, N = Last Updated, O = Sales Date. The store dropdown is read from columns A–B; submitting writes into that store's row.

## Deploy
1. Open the sheet → **Extensions → Apps Script**, paste `apps-script.gs`, save.
2. **Deploy → New deployment → Web app** · Execute as *Me* · Access *Anyone*.
3. Put the `/exec` URL into `WEB_APP_URL` in `index.html` (the GitHub Pages link then opens the form).

After editing the script, use **Deploy → Manage deployments → Edit → New version** so the URL stays the same.
