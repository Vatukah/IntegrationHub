// routes/actions.js
import express from 'express';
import { verifyAuth0Token } from '../auth/verifyAuth0.js';
import { checkPolicy } from '../services/policy.js';
import { sendEmail } from '../services/gmailService.js';
import { logActivity } from '../db/supabaseClient.js';
import { runComplianceAnalysis } from '../services/aiAgent.js';

const router = express.Router();

/**
 * Send Email Flow
 * 1️⃣ Policy Check (Auth0 roles / static rules)
 * 2️⃣ Compliance Check (rule-based analysis)
 * 3️⃣ Send via Gmail (scoped token)
 * 4️⃣ Log to Supabase
 */
router.post('/send-email', verifyAuth0Token, async (req, res) => {
  const user = req.user; // Contains Auth0 claims (sub, roles, permissions, etc.)
  const { to, subject, body, attachments } = req.body;

  if (!to || !subject || !body) {
    return res.status(400).json({ error: 'missing_parameters' });
  }

  try {
    // 1️⃣ Basic policy checks
    const policy = await checkPolicy({ user, to, subject, body });
    if (!policy.allowed) {
      await logActivity({
        user_id: user.sub,
        action: 'send_email',
        status: 'denied',
        details: { to, reason: policy.reason },
      });
      return res.status(403).json({ allowed: false, reason: policy.reason });
    }

    // 2️⃣ Compliance Analysis (rule-based, no OpenAI)
    const compliance = await runComplianceAnalysis({
      subject,
      snippet: body,
      from: user.email,
      to: Array.isArray(to) ? to : [to],
      attachments,
    });

    if (!compliance.compliant) {
      const reason = compliance.issues.join('; ');
      await logActivity({
        user_id: user.sub,
        action: 'send_email',
        status: 'denied',
        details: { to, reason },
      });
      return res.status(403).json({
        allowed: false,
        reason: `Compliance issues detected: ${reason}`,
        issues: compliance.issues,
      });
    }

    // 3️⃣ Send Email (using Gmail service with scoped Auth0 token)
    const result = await sendEmail(user.sub, { to, subject, body });

    // 4️⃣ Log success
    await logActivity({
      user_id: user.sub,
      action: 'send_email',
      status: 'allowed',
      details: { to },
    });

    res.json({ allowed: true, result });
  } catch (err) {
    console.error('❌ send-email error:', err);
    await logActivity({
      user_id: user?.sub || 'unknown',
      action: 'send_email',
      status: 'error',
      details: { error: err.message },
    });
    res.status(500).json({ error: 'internal_error' });
  }
});

export default router;
