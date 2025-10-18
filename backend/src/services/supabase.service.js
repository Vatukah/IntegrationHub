import { supabase } from "../db/supabaseClient.js";

export async function getGmail_db(userId) {
  const { data, error } = await supabase
    .from("gmail_tokens")
    .select("user_id, expiry_date")
    .eq("user_id", String(userId)).maybeSingle();;

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
