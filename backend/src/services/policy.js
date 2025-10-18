export async function checkPolicy({ user, to, subject, body }) {
// Example deterministic checks you can expand later


// 1) Deny external recipients by default (replace with your domain)
const orgDomain = 'yourcompany.com';
const recipientDomain = to.split('@')[1] || '';
if (recipientDomain.toLowerCase() !== orgDomain) {
return { allowed: false, reason: 'External recipients are blocked by policy' };
}


// 2) Block attachments bigger than X (handled at upload time normally)
// 3) Block simple sensitive keywords
const sensitiveRegex = /(confidential|ssn|password|credit card|dob)/i;
if (sensitiveRegex.test(body)) {
return { allowed: false, reason: 'Sensitive keywords detected' };
}


return { allowed: true };
}