# Daily Sales Report Form

Mobile-friendly form: pick store → enter VIP / SKY / ARI / AT / KT / Safari sales → Submit. Each submission becomes a new row in a Google Sheet (opens in Excel).

## Connect the sheet (2 minutes)
1. Open your Google Sheet → **Extensions → Apps Script**.
2. Paste the contents of `apps-script.gs`, save.
3. **Deploy → New deployment → Web app** · Execute as: *Me* · Access: *Anyone* → Deploy, authorize.
4. Copy the web-app URL into `SCRIPT_URL` at the top of the script in `index.html`.
5. Edit the `STORES` list in `index.html` with real store names.

Submissions made before the link is set are held on the user's phone and uploaded automatically later.
