// ====================================================
// Express Controller for Food Preference Swiping Logs
// ====================================================

import { Request, Response, NextFunction } from "express";
import { supabase } from "../config/supabase";

export const savePreference = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, foodId, type } = req.body;

    if (!userId || !foodId || !type) {
      res.status(400).json({ error: "Missing required properties: userId, foodId, and type are required." });
      return;
    }

    const isSupabaseOnline = process.env.SUPABASE_URL && process.env.SUPABASE_KEY;

    if (isSupabaseOnline) {
      // Ensure the user exists in our DB to prevent foreign key issues
      await supabase.from("users").upsert({ id: userId, updated_at: new Date() });

      // Upsert preferences
      const { data, error } = await supabase
        .from("preferences")
        .upsert(
          { user_id: userId, food_id: foodId, swipe_type: type },
          { onConflict: "user_id,food_id" }
        )
        .select();

      if (error) {
        throw error;
      }

      res.status(201).json({ success: true, preference: data[0] });
    } else {
      // Fallback
      res.status(200).json({ success: true, localOnly: true, userId, foodId, type });
    }
  } catch (error) {
    next(error);
  }
};
export default { savePreference };
