// services/aiAgent.js
import { analyzeEmailContent } from './complianceEngine.js';

export async function runComplianceAnalysis(emailData) {
  // For now, just call the rule-based engine
  const result = analyzeEmailContent(emailData);
  return result;
}
