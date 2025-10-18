import { Router } from "express";
import { verifyAuth0Token } from "../auth/verifyAuth0.js";
import { getGmail_db } from "../services/supabase.service.js";

const router = Router();

router.get("/getGmail", verifyAuth0Token, async (req, res) => {
  const userId = req.user.sub;

  try {
    const data =await getGmail_db(userId);

    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ error: "Internal Error occurs !" });
  }
});

export default router;