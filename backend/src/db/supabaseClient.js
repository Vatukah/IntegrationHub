// db/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Load environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables.');
  console.error('Please add SUPABASE_URL and SUPABASE_ANON_KEY to your .env file.');
  process.exit(1);
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Logs compliance actions, AI activity, or audit trails.
 * 
 * @param {Object} logData - Information about the action performed.
 * @param {string} logData.user_id - Auth0 user ID.
 * @param {string} logData.action - Action performed (e.g., "scan_email", "policy_violation").
 * @param {string} logData.status - Result ("success" or "error").
 * @param {Object} [logData.details] - Optional metadata (e.g., messageId, AI output, error info).
 */
export async function logActivity(logData) {
  try {
    const { data, error } = await supabase.from('activity_logs').insert([
      {
        user_id: logData.user_id || 'unknown',
        action: logData.action,
        status: logData.status,
        details: logData.details || {},
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) throw error;
    console.log('✅ Activity logged:', logData.action);
    return data;
  } catch (err) {
    console.error('⚠️ Failed to log activity:', err.message);
    return null;
  }
}

/**
 * Fetch compliance reports or recent logs for a given user.
 * 
 * @param {string} userId - The Auth0 user ID.
 * @param {number} [limit=20] - Number of records to fetch.
 */
export async function getUserLogs(userId, limit = 20) {
  const { data, error } = await supabase
    .from('activity_logs')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('⚠️ Failed to fetch logs:', error.message);
    return [];
  }

  return data;
}

