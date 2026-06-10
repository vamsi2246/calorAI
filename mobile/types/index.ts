// ====================================================
// CalorAI TypeScript Interface Definitions
// ====================================================

import { FoodItem } from "../constants/foods";

export type SwipeType = "like" | "dislike" | "superlike" | "unsure";

export interface UserPreferences {
  liked: string[];      // food IDs
  disliked: string[];   // food IDs
  superliked: string[]; // food IDs
  unsure: string[];     // food IDs
}

export interface UserData {
  uid: string;
  email: string | null;
  isAnonymous: boolean;
}

export interface TasteProfile {
  profileTags: string[];
  keyHighlights: string[];
  lifestyle: string;
  favCuisines: string[];
  statistics: {
    likes: number;
    dislikes: number;
    superlikes: number;
    unsure: number;
    completion: number;
  };
}

export interface MealDetail {
  name: string;
  emoji: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  reason: string;
}

export interface AlternativeItem {
  original: string;
  healthySwap: string;
  emoji: string;
  caloriesSaved: number;
}

export interface DayPlan {
  day: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  snacks: string;
}

export interface AIRecommendations {
  breakfast: MealDetail;
  lunch: MealDetail;
  dinner: MealDetail;
  snacks: MealDetail;
  alternatives: AlternativeItem[];
  weeklyPlan: DayPlan[];
  cheatMeal: MealDetail;
  explanation: string;
}
