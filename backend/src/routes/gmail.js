// src/routes/gmail.js
import express from "express";
import { verifyAuth0Token } from "../auth/verifyAuth0.js";
import { getGmailAuthURL, getGmailTokens, sendEmail } from "../services/gmailService.js";
import { logActivity } from "../db/supabaseClient.js";

const router = express.Router();

// Step 1: Generate Gmail OAuth URL
router.get("/connect", verifyAuth0Token, async (req, res) => {
  try {
    const userId = req.user.sub;
    const url = getGmailAuthURL(userId);
    res.json({ authUrl: url });
  } catch (err) {
    console.error("Gmail connect error:", err);
    res.status(500).json({ error: "internal_error" });
  }
});

// Step 2: Exchange code for tokens
router.post("/callback", verifyAuth0Token, async (req, res) => {
  
  
  try {
    const userId = req.user.sub;
    const { code } = req.body;

    if (!code) return res.status(400).json({ error: "missing_code" });

    const tokens = await getGmailTokens(userId, code);

    

    // Store tokens in DB
    await logActivity({
      user_id: userId,
      action: "connect_gmail",
      status: "allowed",
      details: { tokens_obtained: true },
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Gmail callback error:", err.response?.data || err.message);

    res.status(500).json({ error: "internal_error" });
  }
});

// Step 3: Send email
router.post("/send", verifyAuth0Token, async (req, res) => {
  try {
    const userId = req.user.sub;
    const { to, subject, body } = req.body;
    if (!to || !subject || !body) return res.status(400).json({ error: "missing_parameters" });

    const result = await sendEmail(userId, { to, subject, body });

    await logActivity({
      user_id: userId,
      action: "send_email",
      status: "allowed",
      details: { to, subject },
    });

    res.json({ success: true, result });
  } catch (err) {
    console.error("Gmail send error:", err.message);
    await logActivity({
      user_id: req.user.sub,
      action: "send_email",
      status: "denied",
      details: { error: err.message },
    });
    res.status(500).json({ error: "internal_error" });
  }
});

export default router;
