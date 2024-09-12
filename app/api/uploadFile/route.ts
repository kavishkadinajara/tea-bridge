/* eslint-disable no-console */
// app/api/uploadFile/route.ts
import fs from "fs";
import path from "path";

import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const REDIRECT_URI = "https://developers.google.com/oauthplayground"; // Use your actual redirect URI
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN!;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file = form.get("file") as Blob;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  // Convert Blob to Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Convert Buffer to Uint8Array for compatibility if necessary
  const uint8Array = new Uint8Array(buffer);

  const tmpPath = path.join("/tmp", file.name);

  // Save the file locally to /tmp
  fs.writeFileSync(tmpPath, uint8Array);

  try {
    const response = await drive.files.create({
      requestBody: {
        name: file.name,
        mimeType: file.type,
      },
      media: {
        mimeType: file.type,
        body: fs.createReadStream(tmpPath),
      },
    });

    fs.unlinkSync(tmpPath); // Cleanup local file after upload

    return NextResponse.json({ fileId: response.data.id });
  } catch (error) {
    console.error("Error uploading file to Google Drive:", error);

    return NextResponse.json(
      { error: "Error uploading file to Google Drive" },
      { status: 500 },
    );
  }
}
