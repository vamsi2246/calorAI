// ====================================================
// Express Controller for AI Profiling & Meal Planning
// ====================================================

import { Request, Response, NextFunction } from "express";
import { generateAITasteProfile, generateAIMealPlan, ProfileInput } from "../services/gemini.service";
import { supabase } from "../config/supabase";
import { FOODS_CATALOG } from "../utils/foods-db";

export const generateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, preferences } = req.body;

    if (!userId || !preferences) {
      res.status(400).json({ error: "Missing required properties: userId and preferences are required." });
      return;
    }

    const { liked, disliked, superliked, unsure } = preferences;

    // Helper to resolve detailed food objects from IDs
    const resolveFoods = (ids: string[] = []) => {
      // Maps localized string indices or DB UUIDs
      return FOODS_CATALOG.filter((f, index) => {
        const idStr = `db_${index + 1}`;
        return ids.includes(idStr) || ids.includes(f.name);
      });
    };

    const formattedInput: ProfileInput = {
      liked: resolveFoods(liked),
      disliked: resolveFoods(disliked),
      superliked: resolveFoods(superliked),
      unsure: resolveFoods(unsure)
    };

    // 1. Generate Taste Profile
    const tasteProfile = await generateAITasteProfile(formattedInput);

    // 2. Generate Meal Recommendations
    const mealPlan = await generateAIMealPlan(tasteProfile);

    const isSupabaseOnline = process.env.SUPABASE_URL && process.env.SUPABASE_KEY;

    if (isSupabaseOnline) {
      try {
        // Cache profile
        await supabase.from("taste_profiles").upsert({
          user_id: userId,
          profile_tags: tasteProfile.profileTags,
          key_highlights: tasteProfile.keyHighlights,
          lifestyle: tasteProfile.lifestyle,
          fav_cuisines: tasteProfile.favCuisines,
          statistics: tasteProfile.statistics,
          updated_at: new Date()
        });

        // Cache recommendations
        await supabase.from("recommendations").upsert({
          user_id: userId,
          breakfast: mealPlan.breakfast,
          lunch: mealPlan.lunch,
          dinner: mealPlan.dinner,
          snacks: mealPlan.snacks,
          alternatives: mealPlan.alternatives,
          weekly_plan: mealPlan.weeklyPlan,
          cheat_meal: mealPlan.cheatMeal,
          explanation: mealPlan.explanation,
          updated_at: new Date()
        });
      } catch (cacheError) {
        console.warn("Could not cache profile/meals in Supabase, returning directly:", cacheError);
      }
    }

    // Return combined dataset
    res.status(200).json({
      ...tasteProfile,
      recommendations: mealPlan
    });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.query.userId || req.user?.uid;
    const isSupabaseOnline = process.env.SUPABASE_URL && process.env.SUPABASE_KEY;

    if (isSupabaseOnline && userId) {
      const { data, error } = await supabase
        .from("taste_profiles")
        .select("*")
        .eq("user_id", userId as string)
        .single();

      if (error) {
        res.status(404).json({ error: "Taste Profile not found." });
        return;
      }

      res.status(200).json(data);
    } else {
      res.status(400).json({ error: "Profile retrieval requires active database connection." });
    }
  } catch (error) {
    next(error);
  }
};

export const getRecommendations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.query.userId || req.user?.uid;
    const isSupabaseOnline = process.env.SUPABASE_URL && process.env.SUPABASE_KEY;

    if (isSupabaseOnline && userId) {
      const { data, error } = await supabase
        .from("recommendations")
        .select("*")
        .eq("user_id", userId as string)
        .single();

      if (error) {
        res.status(404).json({ error: "Recommendations not found." });
        return;
      }

      res.status(200).json(data);
    } else {
      res.status(400).json({ error: "Recommendations query requires active database connection." });
    }
  } catch (error) {
    next(error);
  }
};
export default { generateProfile, getProfile, getRecommendations };
