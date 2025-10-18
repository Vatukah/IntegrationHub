// services/complianceEngine.js
/**
 * Basic rule-based compliance checker for Gmail messages.
 * You can expand this with more sophisticated rules later.
 */

export function analyzeEmailContent({ subject, snippet, from, to, attachments }) {
  const issues = [];

  // Rule 1: Detect sensitive info (like phone numbers or PAN)
  const sensitivePattern = /\b\d{10}\b|[A-Z]{5}\d{4}[A-Z]{1}/g;
  if (snippet.match(sensitivePattern)) {
    issues.push('Possible sensitive information (phone/PAN) detected');
  }

  // Rule 2: External domain alert
  const externalRecipients = (to || []).filter(email => !email.endsWith('@yourcompany.com'));
  if (externalRecipients.length > 0) {
    issues.push(`Email sent to external domains: ${externalRecipients.join(', ')}`);
  }

  // Rule 3: Missing disclaimer
  if (!snippet.toLowerCase().includes('confidential')) {
    issues.push('Missing confidentiality disclaimer');
  }

  // Rule 4: Suspicious attachments
  const riskyAttachments = (attachments || []).filter(a =>
    a.filename?.match(/\.(exe|zip|bat|js)$/i)
  );
  if (riskyAttachments.length > 0) {
    issues.push('Suspicious attachment(s) detected');
  }

  return {
    compliant: issues.length === 0,
    issues,
  };
}
