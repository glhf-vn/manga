import { google } from "googleapis";

const googleApiKey = process.env.GOOGLE_API_KEY;

export async function getSheetsContent(sheetId, sheetNumber) {
  const sheets = google.sheets({
    version: "v4",
    auth: googleApiKey,
  });

  const range = `${sheetNumber}!A2:F1000`;

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range,
  });

  const data = response.data.values;

  return data.map(([name, source, anilist, image, publisher, type]) => ({
    name,
    source,
    anilist,
    image,
    publisher,
    type,
  }));
}
