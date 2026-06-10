// ====================================================
// Supabase Database Connection Configuration
// ====================================================

import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || "https://placeholder-url.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY || "placeholder-key";

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  console.warn(
    "⚠️ WARNING: Supabase credentials are not fully configured. Database features will fallback to memory catalogs."
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
