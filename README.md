# Daily Sales Report Form

Static form on GitHub Pages (index.html) that talks to a Google Apps Script web app (apps-script.gs) bound to the sales sheet. Sheet layout: column A = SAP code, B = store name, C–M = the 11 sales values, N = Last Updated, O = Sales Date. The store dropdown is read from columns A–B; submitting writes into that store's row.

## Deploy
1. Open the sheet → **Extensions → Apps Script**, paste `apps-script.gs`, save.
2. **Deploy → New deployment → Web app** · Execute as *Me* · Access *Anyone*.
3. The `/exec` URL is set as `WEB_APP_URL` in `index.html`.

After editing the script, use **Deploy → Manage deployments → Edit → New version** so the URL stays the same.
