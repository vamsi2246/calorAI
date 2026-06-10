// ====================================================
// Gemini AI Service layer for Profiling & Meal Recommendations
// ====================================================

import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY || "";
let aiClient: any = null;

if (apiKey) {
  try {
    // Correct initialization format for GoogleGenerativeAI
    aiClient = new GoogleGenerativeAI(apiKey);
  } catch (error) {
    console.warn("Failed to initialize GoogleGenerativeAI client:", error);
  }
} else {
  console.warn("⚠️ WARNING: GEMINI_API_KEY is not defined. Running AI service in rule-based fallback mode.");
}

export interface FoodDetails {
  name: string;
  category: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface ProfileInput {
  liked: FoodDetails[];
  disliked: FoodDetails[];
  superliked: FoodDetails[];
  unsure: FoodDetails[];
}

export const generateAITasteProfile = async (input: ProfileInput) => {
  const allLiked = [...input.liked, ...input.superliked];

  
  if (!aiClient || !apiKey) {
    return generateFallbackProfile(input);
  }

  try {
    // Generate taste profile using Gemini API
    const model = aiClient.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `
      You are an expert food nutritionist AI.
      Analyze the user's food preferences:
      Liked/Superliked foods: ${JSON.stringify(allLiked)}
      Disliked foods: ${JSON.stringify(input.disliked)}
      Unsure foods: ${JSON.stringify(input.unsure)}

      Return a JSON object containing:
      {
        "profileTags": string[] (e.g., ["Healthy Eater", "Italian Food Lover"]),
        "keyHighlights": string[] (3 brief sentences summarizing calorie/macro densities and favorite styles),
        "lifestyle": string (e.g., "Fitness Enthusiast" or "Sweet Tooth"),
        "favCuisines": string[] (list up to 3 preferred cuisines based on liked foods),
        "statistics": {
          "likes": number,
          "dislikes": number,
          "superlikes": number,
          "unsure": number,
          "completion": number (percentage out of 15 swiped cards)
        }
      }
      Do not wrap the response in markdown code blocks. Return raw JSON only.
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return JSON.parse(text.replace(/```json/g, "").replace(/```/g, "").trim());
  } catch (error) {
    console.error("Gemini taste profile execution failed, running rule-based fallback:", error);
    return generateFallbackProfile(input);
  }
};

export const generateAIMealPlan = async (profile: any) => {
  if (!aiClient || !apiKey) {
    return generateFallbackMealPlan(profile);
  }

  try {
    const model = aiClient.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `
      You are an expert culinary AI coach.
      Generate a weekly meal plan and daily ideal recommendations based on this user's taste profile:
      Profile: ${JSON.stringify(profile)}

      Return a JSON object containing:
      {
        "breakfast": { "name": string, "emoji": string, "calories": number, "protein": number, "carbs": number, "fat": number, "reason": string },
        "lunch": { "name": string, "emoji": string, "calories": number, "protein": number, "carbs": number, "fat": number, "reason": string },
        "dinner": { "name": string, "emoji": string, "calories": number, "protein": number, "carbs": number, "fat": number, "reason": string },
        "snacks": { "name": string, "emoji": string, "calories": number, "protein": number, "carbs": number, "fat": number, "reason": string },
        "cheatMeal": { "name": string, "emoji": string, "calories": number, "protein": number, "carbs": number, "fat": number, "reason": string },
        "alternatives": [
          { "original": string, "healthySwap": string, "emoji": string, "caloriesSaved": number }
        ],
        "weeklyPlan": [
          { "day": "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday", "breakfast": string, "lunch": string, "dinner": string, "snacks": string }
        ],
        "explanation": string (paragraph explaining how the menu relates to their swiped favorites)
      }
      Do not wrap the response in markdown. Return raw JSON.
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return JSON.parse(text.replace(/```json/g, "").replace(/```/g, "").trim());
  } catch (error) {
    console.error("Gemini meal planning execution failed, running rule-based fallback:", error);
    return generateFallbackMealPlan(profile);
  }
};

// Fallback calculations for offline reliability
function generateFallbackProfile(input: ProfileInput) {
  const allLiked = [...input.liked, ...input.superliked];
  let avgCal = 0, avgProt = 0;
  if (allLiked.length > 0) {
    avgCal = allLiked.reduce((acc, f) => acc + f.calories, 0) / allLiked.length;
    avgProt = allLiked.reduce((acc, f) => acc + f.protein, 0) / allLiked.length;
  }

  const categoryCounts: Record<string, number> = {};
  allLiked.forEach((f) => {
    categoryCounts[f.category] = (categoryCounts[f.category] || 0) + 1;
  });

  const sortedCategories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([cat]) => cat);

  const profileTags: string[] = [];
  let lifestyle = "Balanced Diet";

  if (avgProt > 18) {
    profileTags.push("Protein Focused");
    lifestyle = "Fitness Enthusiast";
  }
  if (avgCal < 180) {
    profileTags.push("Healthy Eater");
  }
  if (profileTags.length === 0) {
    profileTags.push("Balanced Diet");
  }

  const completion = Math.min(
    Math.round(((input.liked.length + input.disliked.length + input.superliked.length + input.unsure.length) / 15) * 100),
    100
  );

  return {
    profileTags,
    keyHighlights: [
      `Likes average calories around ${Math.round(avgCal)} kcal`,
      `Liked foods average protein of ${Math.round(avgProt)}g`,
      `Predominantly likes ${sortedCategories[0] || "Various categories"}`
    ],
    lifestyle,
    favCuisines: sortedCategories.slice(0, 3),
    statistics: {
      likes: input.liked.length,
      dislikes: input.disliked.length,
      superlikes: input.superliked.length,
      unsure: input.unsure.length,
      completion
    }
  };
}

function generateFallbackMealPlan(profile: any) {
  const isHealthy = profile.profileTags.includes("Healthy Eater");
  const isProtein = profile.profileTags.includes("Protein Focused");

  return {
    breakfast: {
      name: isHealthy ? "Egg White Omelet & Spinach" : "Eggs Benedict & Toast",
      emoji: "🍳",
      calories: isHealthy ? 220 : 350,
      protein: 18,
      carbs: 15,
      fat: 10,
      reason: "Calorie-controlled breakfast option matching your preference highlights."
    },
    lunch: {
      name: "Tuna Salad & Whole Wheat Wrap",
      emoji: "🌯",
      calories: 390,
      protein: 30,
      carbs: 34,
      fat: 12,
      reason: "Balanced complex carbs with high protein content for lunch energy."
    },
    dinner: {
      name: isProtein ? "Sirloin Steak & Veggies" : "Baked Salmon & Quinoa",
      emoji: "🐟",
      calories: isProtein ? 550 : 440,
      protein: 40,
      carbs: 25,
      fat: 18,
      reason: "Clean fatty acids combined with high dietary protein intake."
    },
    snacks: {
      name: "Cottage Cheese & Almonds",
      emoji: "🥛",
      calories: 180,
      protein: 14,
      carbs: 6,
      fat: 10,
      reason: "Low-glycemic evening protein snack."
    },
    cheatMeal: {
      name: "Chocolate Fudge Sundae & Fries",
      emoji: "🍨",
      calories: 820,
      protein: 10,
      carbs: 95,
      fat: 38,
      reason: "Calorie surplus reward for consistent weekday profiling tags."
    },
    alternatives: [
      { original: "French Fries", healthySwap: "Steamed Asparagus", emoji: "🌱", caloriesSaved: 220 }
    ],
    weeklyPlan: [
      { day: "Monday", breakfast: "Egg Muffin", lunch: "Tuna Salad", dinner: "Salmon Fillet", snacks: "Almonds" },
      { day: "Tuesday", breakfast: "Oatmeal", lunch: "Chicken Wrap", dinner: "Steak Veggies", snacks: "Yogurt" },
      { day: "Wednesday", breakfast: "Eggs Benedict", lunch: "Cobb Salad", dinner: "Tofu Stir-fry", snacks: "Protein Shake" },
      { day: "Thursday", breakfast: "Avocado Toast", lunch: "Burrito Bowl", dinner: "Baked Cod", snacks: "Fruit Cup" },
      { day: "Friday", breakfast: "Protein Pancakes", lunch: "Sushi Combo", dinner: "Sirloin Steak", snacks: "Rice Cake" },
      { day: "Saturday", breakfast: "Granola Bowl", lunch: "Falafel Wrap", dinner: "Butter Chicken", snacks: "Dark Chocolate" },
      { day: "Sunday", breakfast: "Egg Omelet", lunch: "Shrimp Bowl", dinner: "Minestrone Soup", snacks: "Chia Pudding" }
    ],
    explanation: "This plan maximizes dietary proteins and limits saturated lipid components, in line with your average swiped preferences."
  };
}
