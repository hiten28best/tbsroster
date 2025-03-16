// Your Google Sheets ID (can be found in the URL of your sheet)
const SPREADSHEET_ID = 'your-spreadsheet-id'; // Replace with your actual spreadsheet ID

// Set up the OAuth Client ID and API scope
const CLIENT_ID = 'your-client-id'; // Replace with your client ID from Google Developer Console
const API_KEY = 'your-api-key'; // Replace with your API key
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly https://www.googleapis.com/auth/spreadsheets';

// Load the Google API Client
function loadClient() {
    gapi.client.setApiKey(API_KEY);
    return gapi.client.load('https://sheets.googleapis.com/$discovery/rest?version=v4');
}

// Sign-in function
function signIn() {
    gapi.auth2.getAuthInstance().signIn().then(() => {
        console.log('Signed in');
        readSheet(); // Call the read function after sign-in
    });
}

// Read data from Google Sheets
function readSheet() {
    const request = gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Sheet1!A1:E10',  // Change the range according to your needs
    });

    request.then((response) => {
        const data = response.result.values;
        console.log(data); // Log the fetched data

        // You can manipulate the data here, for example, rendering it to your webpage
        renderData(data);
    });
}

// Render the fetched data to your page
function renderData(data) {
    let table = document.getElementById('schedule-table'); // Example table element
    table.innerHTML = ''; // Clear the table

    // Loop through the data and add it to the table
    data.forEach(row => {
        let tr = document.createElement('tr');
        row.forEach(cell => {
            let td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });
}

// Load the Google API client and sign in
function start() {
    gapi.load('client:auth2', () => {
        gapi.auth2.init({
            client_id: CLIENT_ID,
        }).then(() => {
            signIn();
        });
    });
}

// Call start function when the page loads
window.onload = start;
