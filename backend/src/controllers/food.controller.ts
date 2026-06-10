// ====================================================
// Express Controller for Food Catalog Queries
// ====================================================

import { Request, Response, NextFunction } from "express";
import { supabase } from "../config/supabase";
import { FOODS_CATALOG } from "../utils/foods-db";

export const getFoods = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { q, category, sort } = req.query;

    // Check if Supabase connection is configured and online
    const isSupabaseOnline = process.env.SUPABASE_URL && process.env.SUPABASE_KEY;

    let foodsList = [];

    if (isSupabaseOnline) {
      // Query from Supabase Postgres Database
      let query = supabase.from("foods").select("*");

      if (category) {
        query = query.eq("category", category as string);
      }
      if (q) {
        query = query.ilike("name", `%${q}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.warn("Supabase query error, falling back to static catalog:", error);
        foodsList = [...FOODS_CATALOG];
      } else if (data && data.length > 0) {
        foodsList = data;
      } else {
        foodsList = [...FOODS_CATALOG];
      }
    } else {
      foodsList = [...FOODS_CATALOG];
    }

    // Apply client filters locally if query parameter matches static database formats
    if (!isSupabaseOnline) {
      if (category) {
        foodsList = foodsList.filter((f) => f.category === category);
      }
      if (q) {
        foodsList = foodsList.filter((f) => f.name.toLowerCase().includes((q as string).toLowerCase()));
      }
    }

    // Map IDs to mock strings if missing
    const responseData = foodsList.map((item: any, index: number) => ({
      id: item.id || `db_${index + 1}`,
      name: item.name,
      emoji: item.emoji,
      image: item.image_url || item.image,
      category: item.category,
      calories: item.calories,
      protein: item.protein,
      carbs: item.carbs,
      fat: item.fat
    }));

    // Apply Sorting logic
    if (sort === "calories_asc") {
      responseData.sort((a, b) => a.calories - b.calories);
    } else if (sort === "calories_desc") {
      responseData.sort((a, b) => b.calories - a.calories);
    } else if (sort === "protein_desc") {
      responseData.sort((a, b) => b.protein - a.protein);
    }

    res.status(200).json(responseData);
  } catch (error) {
    next(error);
  }
};
export default { getFoods };
