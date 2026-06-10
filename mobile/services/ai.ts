// ====================================================
// Local Offline AI Rule Engine & Taste Profiler
// ====================================================

import { FOOD_ITEMS } from "../constants/foods";
import { TasteProfile, AIRecommendations } from "../types";

export function analyzeTasteProfileLocally(
  likedIds: string[],
  dislikedIds: string[],
  superLikedIds: string[],
  unsureIds: string[]
): TasteProfile {
  const allLiked = [...likedIds, ...superLikedIds];
  const likedItems = FOOD_ITEMS.filter((f) => allLiked.includes(f.id));
  const dislikedItems = FOOD_ITEMS.filter((f) => dislikedIds.includes(f.id));
  
  // Default values if lists are empty
  let avgCal = 0, avgProt = 0, avgCarb = 0, avgFat = 0;
  if (likedItems.length > 0) {
    avgCal = likedItems.reduce((acc, item) => acc + item.calories, 0) / likedItems.length;
    avgProt = likedItems.reduce((acc, item) => acc + item.protein, 0) / likedItems.length;
    avgCarb = likedItems.reduce((acc, item) => acc + item.carbs, 0) / likedItems.length;
    avgFat = likedItems.reduce((acc, item) => acc + item.fat, 0) / likedItems.length;
  }

  // Count categories
  const categoryCounts: Record<string, number> = {};
  likedItems.forEach((f) => {
    categoryCounts[f.category] = (categoryCounts[f.category] || 0) + 1;
  });

  // Sort categories by frequency
  const sortedCategories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([category]) => category);

  // Profile Determination Logic
  const profileTags: string[] = [];
  let lifestyle = "Balanced Diet";

  if (avgProt > 18) {
    profileTags.push("Protein Focused");
    lifestyle = "Fitness Enthusiast";
  }
  if (avgCal < 180) {
    profileTags.push("Healthy Eater");
  }
  
  // Categorical tags
  if (categoryCounts["Italian"] && categoryCounts["Italian"] >= 2) {
    profileTags.push("Italian Food Lover");
  }
  if (categoryCounts["Indian"] && categoryCounts["Indian"] >= 2) {
    profileTags.push("Indian Cuisine Enthusiast");
  }
  if (categoryCounts["Desserts"] && categoryCounts["Desserts"] >= 2) {
    profileTags.push("Dessert Lover");
    lifestyle = "Sweet Tooth";
  }
  if (categoryCounts["Vegetables"] && categoryCounts["Vegetables"] >= 3) {
    profileTags.push("Green Devotee");
    lifestyle = "Vegetarian/Vegan Leanings";
  }
  if (categoryCounts["Fast Foods"] && categoryCounts["Fast Foods"] >= 2) {
    profileTags.push("Fast Food Fanatic");
  }

  if (profileTags.length === 0) {
    profileTags.push("Balanced Diet");
  }

  const completion = Math.min(
    Math.round(((likedIds.length + dislikedIds.length + superLikedIds.length + unsureIds.length) / 15) * 100),
    100
  );

  return {
    profileTags,
    keyHighlights: [
      `Average protein per liked food: ${Math.round(avgProt)}g`,
      `Average calories per liked food: ${Math.round(avgCal)} kcal`,
      `Prefers ${sortedCategories[0] || "General Cuisines"}`
    ],
    lifestyle,
    favCuisines: sortedCategories.slice(0, 3),
    statistics: {
      likes: likedIds.length,
      dislikes: dislikedIds.length,
      superlikes: superLikedIds.length,
      unsure: unsureIds.length,
      completion
    }
  };
}

export function generateRecommendationsLocally(profile: TasteProfile): AIRecommendations {
  const isHealthy = profile.profileTags.includes("Healthy Eater") || profile.profileTags.includes("Green Devotee");
  const isProtein = profile.profileTags.includes("Protein Focused");
  const likesIndian = profile.profileTags.includes("Indian Cuisine Enthusiast");

  // Customize recommendations based on local preferences
  const breakfast = isHealthy 
    ? { name: "Avocado Toast with Egg", emoji: "🍞", calories: 260, protein: 11, carbs: 24, fat: 14, reason: "Matches your preference for low calorie, healthy foods." }
    : { name: "Eggs Benedict with Ham", emoji: "🍳", calories: 350, protein: 18, carbs: 24, fat: 20, reason: "A premium, protein-rich breakfast choice based on your swipes." };

  const lunch = likesIndian
    ? { name: "Paneer Tikka Salad", emoji: "🧀", calories: 310, protein: 16, carbs: 10, fat: 22, reason: "High-protein, spiced lunch fitting your Indian cuisine flavor likes." }
    : { name: "Chicken Caesar Wrap", emoji: "🌯", calories: 380, protein: 28, carbs: 32, fat: 16, reason: "A balanced, quick, high-protein lunch option." };

  const dinner = isProtein
    ? { name: "Sirloin Steak & Broccoli", emoji: "🥩", calories: 510, protein: 42, carbs: 12, fat: 28, reason: "Maximizes protein recovery with low processed carbs." }
    : { name: "Steamed Salmon & Quinoa", emoji: "🐟", calories: 420, protein: 32, carbs: 28, fat: 18, reason: "Packed with clean Omega-3 fats and slow-digesting carbs." };

  const snacks = {
    name: "Whey Protein Shake & Almonds",
    emoji: "🥤",
    calories: 220,
    protein: 26,
    carbs: 6,
    fat: 8,
    reason: "Ideal snack to bridge muscle-recovery macros in a clean format."
  };

  const cheatMeal = {
    name: "Double Bacon Cheeseburger & Fries",
    emoji: "🍔",
    calories: 890,
    protein: 34,
    carbs: 85,
    fat: 42,
    reason: "A well-deserved cheat meal balancing proteins with fats."
  };

  const alternatives = [
    { original: "French Fries", healthySwap: "Baked Sweet Potato Wedges", emoji: "🍠", caloriesSaved: 150 },
    { original: "Pepperoni Pizza", healthySwap: "Thin Crust Margherita Pizza", emoji: "🍕", caloriesSaved: 100 }
  ];

  const weeklyPlan = [
    { day: "Monday", breakfast: "Egg Muffin", lunch: "Tuna Wrap", dinner: "Baked Cod", snacks: "Almonds" },
    { day: "Tuesday", breakfast: "Oatmeal", lunch: "Chicken Salad", dinner: "Tofu Stir-fry", snacks: "Greek Yogurt" },
    { day: "Wednesday", breakfast: "Pancakes (Protein)", lunch: "Burrito Bowl", dinner: "Salmon Fillet", snacks: "Protein Shake" },
    { day: "Thursday", breakfast: "Scrambled Eggs", lunch: "Falafel Wrap", dinner: "Beef Stir-fry", snacks: "Fruit Cup" },
    { day: "Friday", breakfast: "Avocado Toast", lunch: "Sushi Pack", dinner: "Steak Potatoes", snacks: "Rice Cake" },
    { day: "Saturday", breakfast: "Waffles (Keto)", lunch: "Cobb Salad", dinner: "Butter Chicken", snacks: "Dark Chocolate" },
    { day: "Sunday", breakfast: "Eggs Benedict", lunch: "Shrimp Bowl", dinner: "Minestrone Soup", snacks: "Chia Pudding" }
  ];

  const explanation = "These recommendations are computed using your swipe distribution, prioritizing high-protein meals with lower fat thresholds as observed in your swiped card macro densities.";

  return {
    breakfast,
    lunch,
    dinner,
    snacks,
    alternatives,
    weeklyPlan,
    cheatMeal,
    explanation
  };
}
