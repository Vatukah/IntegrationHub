import express from "express";
import { verifyAuth0Token } from "../auth/verifyAuth0.js";
import { getUserLogs } from "../db/supabaseClient.js";

const router = express.Router();

router.get("/", verifyAuth0Token, async (req, res) => {
  try {
    const userId = req.user.sub;
    const logs = await getUserLogs(userId); // fetch from Supabase
    res.json({ logs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch logs" });
  }
});

export default router;
