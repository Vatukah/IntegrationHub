import { google } from "googleapis";
import { GaxiosError } from "gaxios";
import { getAccessTokenFromTokenVault } from "@auth0/ai-vercel";
import { TokenVaultError } from "@auth0/ai/interrupts";

import { withGmail } from "./authorizers.js";
import { tool } from "ai";
import { z } from "zod";

export const readLatestEmail = withGmail(
  tool(
    async ({ unreadOnly }) => {
      // Get the access token from Auth0 AI Token Vault
      const accessToken = getAccessTokenFromTokenVault();

      try {
        // Gmail SDK setup
        const gmail = google.gmail("v1");
        const auth = new google.auth.OAuth2();
        auth.setCredentials({ access_token: accessToken });

        // Query parameters
        const query = unreadOnly ? "is:unread" : "";

        // Get the latest email ID
        const listResponse = await gmail.users.messages.list({
          auth,
          userId: "me",
          maxResults: 1,
          q: query,
        });

        const message = listResponse.data.messages?.[0];
        if (!message) {
          return { message: "📭 No emails found." };
        }

        // Fetch full message details
        const msgResponse = gmail.users.messages.get({
          auth,
          userId: "me",
          id: message.id,
        });

        const payload = msgResponse.data.payload;
        const headers = payload.headers.reduce((acc, h) => {
          acc[h.name.toLowerCase()] = h.value;
          return acc;
        }, {});

        const emailData = {
          from: headers["from"],
          subject: headers["subject"],
          date: headers["date"],
          snippet: msgResponse.data.snippet,
        };

        return {
          success: true,
          email: emailData,
        };
      } catch (err) {
        if (err instanceof GaxiosError && err.status === 401) {
          throw new TokenVaultError(
            `Authorization required to access the Token Vault connection`
          );
        }
        throw err;
      }
    },
    {
      name: "read_latest_email",
      description:
        "Fetch the user's latest Gmail message (optionally only unread). Returns sender, subject, snippet, and date.",
      schema: z.object({
        unreadOnly: z.boolean().optional().default(false),
      }),
    }
  )
);
