// Replace with your own client ID and API key
const CLIENT_ID = 'sales_srdt';
const API_KEY = 'AIzaSyBjvwdmHjokhcSuB1rrGtPFI-WO3fzVhy0';
const SPREADSHEET_ID = 'https://docs.google.com/spreadsheets/d/1LwobK7UU8EILhEqLqYjS-qlqJpodYN_oej-xpPMbZqg/edit#gid=0';

// Load the Google Sheets API
gapi.load('client:auth2', () => {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    scope: 'https://www.googleapis.com/auth/spreadsheets',
  });

  gapi.client.load('sheets', 'v4').then(() => {
    // Authenticate the user
    gapi.auth2.getAuthInstance().signIn().then(() => {
      // Data to be added to Google Sheets
      const data = [
        [new Date(), 'John Doe', '123 Main St', '2023-10-01', 'Parking Tiles', 'FOUR PLUS', '10'],
      ];

      // Append data to the spreadsheet
      gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Sheet1', // Change to your specific sheet name
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        resource: {
          values: data,
        },
      }).then((response) => {
        console.log('Data appended:', response.result);
      }).catch((error) => {
        console.error('Error appending data:', error);
      });
    });
  });
});
