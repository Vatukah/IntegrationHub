// services/gmailService.js
import { google } from "googleapis";
import { supabase } from "../db/supabaseClient.js"; // make sure this is exported
import axios from 'axios'


const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } = process.env;

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI
);

/**
 * Step 1: Generate Auth URL
 */
export function getGmailAuthURL(userId) {
  const scopes = ["https://www.googleapis.com/auth/gmail.send","https://www.googleapis.com/auth/gmail.readonly"];

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    state: userId,
    prompt: "consent",
  });

  return url;
}

/**
 * Step 2: Exchange code for tokens and store them in Supabase
 */
export async function getGmailTokens(userId, code) {
  const { tokens } = await oauth2Client.getToken(code);
  
    
  const expiry = new Date(tokens.expiry_date).toISOString(); // Convert to proper date string

  // Store in Supabase
  const { error } = await supabase.from("gmail_tokens").upsert({
    user_id: userId,
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
    scope: tokens.scope,
    token_type: tokens.token_type,
    expiry_date: expiry,
 
  });

  if (error) {
    console.error("❌ Failed to save Gmail tokens:", error.message);
    throw error;
  }

  console.log(`✅ Gmail tokens saved for user: ${userId}`);
  return tokens;
}

/**
 * Step 3: Send email using saved tokens
 */
export async function sendEmail(userId, { to, subject, body }) {
  const { data: tokens, error } = await supabase
    .from("gmail_tokens")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error || !tokens) throw new Error("User not connected to Gmail");

  oauth2Client.setCredentials({
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
  });

  // 🕐 Check if token expired
  if (new Date(tokens.expiry_date) <= new Date()) {
    console.log("⏳ Access token expired — refreshing...");

    const newTokens = await oauth2Client.refreshAccessToken();
    const refreshed = newTokens.credentials;

    // 🗄️ Save new access token
    await supabase
      .from("gmail_tokens")
      .update({
        access_token: refreshed.access_token,
        expiry_date: new Date(refreshed.expiry_date).toISOString(),
      })
      .eq("user_id", userId);

    console.log("✅ Access token refreshed!");
    oauth2Client.setCredentials(refreshed);
  }

  // ✉️ Proceed to send email
  const gmail = google.gmail({ version: "v1", auth: oauth2Client });

  const rawMessage = [
    `To: ${to}`,
    `Subject: ${subject}`,
    "Content-Type: text/plain; charset=utf-8",
    "",
    body,
  ].join("\n");

  const encodedMessage = Buffer.from(rawMessage)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  const result = await gmail.users.messages.send({
    userId: "me",
    requestBody: { raw: encodedMessage },
  });

  return result.data;
}

export async function disconnectGmail(accessToken) {
  try {
    const revokeUrl = `https://oauth2.googleapis.com/revoke?token=${accessToken}`;

    await axios.post(revokeUrl, null, {
      headers: { "Content-type": "application/x-www-form-urlencoded" },
    });

    return { success: true, message: "Gmail disconnected successfully." };
  } catch (error) {
    console.error("Error disconnecting Gmail:", error.message);
    throw new Error("Failed to disconnect Gmail.");
  }
}