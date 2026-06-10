// ====================================================
// Zustand Store for CalorAI Food Swiping & Preferences
// ====================================================

import { create } from "zustand";
import { UserData, SwipeType, TasteProfile, AIRecommendations } from "../types";

interface FoodState {
  // Auth State
  user: UserData | null;
  
  // Swipe StateLists
  likedFoods: string[];
  dislikedFoods: string[];
  superLikedFoods: string[];
  unsureFoods: string[];
  
  // Action Undo/Redo Stacks
  swipeHistory: Array<{ foodId: string; type: SwipeType }>;
  redoHistory: Array<{ foodId: string; type: SwipeType }>;
  
  // Search, Filter and Sort
  searchQuery: string;
  selectedCategory: string | null;
  sortBy: "default" | "calories_asc" | "calories_desc" | "protein_desc";
  
  // AI Generated Data
  tasteProfile: TasteProfile | null;
  recommendations: AIRecommendations | null;
  
  // Loading & Sync status
  loading: boolean;
  error: string | null;

  // Actions
  setUser: (user: UserData | null) => void;
  swipeFood: (foodId: string, type: SwipeType) => void;
  undoLastSwipe: () => void;
  redoSwipe: () => void;
  resetSwipes: () => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  setSortBy: (sortBy: "default" | "calories_asc" | "calories_desc" | "protein_desc") => void;
  setTasteProfile: (profile: TasteProfile | null) => void;
  setRecommendations: (recs: AIRecommendations | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  getCompletionRate: () => number;
}

export const useFoodStore = create<FoodState>((set, get) => ({
  user: null,
  likedFoods: [],
  dislikedFoods: [],
  superLikedFoods: [],
  unsureFoods: [],
  swipeHistory: [],
  redoHistory: [],
  searchQuery: "",
  selectedCategory: null,
  sortBy: "default",
  tasteProfile: null,
  recommendations: null,
  loading: false,
  error: null,

  setUser: (user) => set({ user }),

  swipeFood: (foodId, type) => {
    set((state) => {
      // Remove any existing records of this food to prevent duplicates
      const liked = state.likedFoods.filter(id => id !== foodId);
      const disliked = state.dislikedFoods.filter(id => id !== foodId);
      const superliked = state.superLikedFoods.filter(id => id !== foodId);
      const unsure = state.unsureFoods.filter(id => id !== foodId);

      // Add to proper list
      if (type === "like") liked.push(foodId);
      if (type === "dislike") disliked.push(foodId);
      if (type === "superlike") superliked.push(foodId);
      if (type === "unsure") unsure.push(foodId);

      const newHistory = [...state.swipeHistory, { foodId, type }];
      
      return {
        likedFoods: liked,
        dislikedFoods: disliked,
        superLikedFoods: superliked,
        unsureFoods: unsure,
        swipeHistory: newHistory,
        redoHistory: [], // Clear redo stack on new action
      };
    });
  },

  undoLastSwipe: () => {
    const { swipeHistory } = get();
    if (swipeHistory.length === 0) return;

    set((state) => {
      const historyCopy = [...state.swipeHistory];
      const lastAction = historyCopy.pop()!;
      const { foodId, type } = lastAction;

      return {
        swipeHistory: historyCopy,
        redoHistory: [...state.redoHistory, lastAction],
        likedFoods: type === "like" ? state.likedFoods.filter(id => id !== foodId) : state.likedFoods,
        dislikedFoods: type === "dislike" ? state.dislikedFoods.filter(id => id !== foodId) : state.dislikedFoods,
        superLikedFoods: type === "superlike" ? state.superLikedFoods.filter(id => id !== foodId) : state.superLikedFoods,
        unsureFoods: type === "unsure" ? state.unsureFoods.filter(id => id !== foodId) : state.unsureFoods,
      };
    });
  },

  redoSwipe: () => {
    const { redoHistory } = get();
    if (redoHistory.length === 0) return;

    set((state) => {
      const redoCopy = [...state.redoHistory];
      const nextAction = redoCopy.pop()!;
      const { foodId, type } = nextAction;

      const liked = [...state.likedFoods];
      const disliked = [...state.dislikedFoods];
      const superliked = [...state.superLikedFoods];
      const unsure = [...state.unsureFoods];

      if (type === "like") liked.push(foodId);
      if (type === "dislike") disliked.push(foodId);
      if (type === "superlike") superliked.push(foodId);
      if (type === "unsure") unsure.push(foodId);

      return {
        swipeHistory: [...state.swipeHistory, nextAction],
        redoHistory: redoCopy,
        likedFoods: liked,
        dislikedFoods: disliked,
        superLikedFoods: superliked,
        unsureFoods: unsure,
      };
    });
  },

  resetSwipes: () => {
    set({
      likedFoods: [],
      dislikedFoods: [],
      superLikedFoods: [],
      unsureFoods: [],
      swipeHistory: [],
      redoHistory: [],
      tasteProfile: null,
      recommendations: null,
      error: null
    });
  },

  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  setSortBy: (sortBy) => set({ sortBy }),
  setTasteProfile: (tasteProfile) => set({ tasteProfile }),
  setRecommendations: (recommendations) => set({ recommendations }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  getCompletionRate: () => {
    const totalSwipes = get().swipeHistory.length;
    const targetSwipes = 15; // Set swiping threshold to 15 items
    return Math.min(Math.round((totalSwipes / targetSwipes) * 100), 100);
  }
}));
