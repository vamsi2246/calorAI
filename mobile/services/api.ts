// ====================================================
// Axios client & React Query Services with Server Fallback
// ====================================================

import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FOOD_ITEMS } from "../constants/foods";
import { useFoodStore } from "../store/useFoodStore";
import { analyzeTasteProfileLocally, generateRecommendationsLocally } from "./ai";

const API_BASE_URL = process.env.EXPO_PUBLIC_BACKEND_URL || "http://localhost:3000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json"
  }
});

// GET FOODS HOOK
export const useGetFoods = () => {
  return useQuery({
    queryKey: ["foods"],
    queryFn: async () => {
      try {
        const response = await apiClient.get("/foods");
        return response.data;
      } catch (error) {
        console.warn("Backend foods API offline, falling back to static list:", error);
        return FOOD_ITEMS;
      }
    }
  });
};

// MUTATION FOR POSTING PREFERENCES
export const useSavePreference = () => {
  return useMutation({
    mutationFn: async (payload: { userId: string; foodId: string; type: string }) => {
      try {
        const response = await apiClient.post("/preferences", payload);
        return response.data;
      } catch (error) {
        console.warn("Backend preferences API offline, saving preference in local store history.");
        return { success: true, localOnly: true };
      }
    }
  });
};

// GENERATE TASTE PROFILE HOOK
export const useGenerateTasteProfile = () => {
  const queryClient = useQueryClient();
  const setTasteProfile = useFoodStore((s) => s.setTasteProfile);
  const { likedFoods, dislikedFoods, superLikedFoods, unsureFoods } = useFoodStore();

  return useMutation({
    mutationFn: async (payload: { userId: string }) => {
      try {
        const response = await apiClient.post("/generate-profile", {
          userId: payload.userId,
          preferences: {
            liked: likedFoods,
            disliked: dislikedFoods,
            superliked: superLikedFoods,
            unsure: unsureFoods
          }
        });
        setTasteProfile(response.data);
        return response.data;
      } catch (error) {
        console.warn("Backend profile API offline, analyzing taste profile locally:", error);
        const localProfile = analyzeTasteProfileLocally(
          likedFoods,
          dislikedFoods,
          superLikedFoods,
          unsureFoods
        );
        setTasteProfile(localProfile);
        return localProfile;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    }
  });
};

// GET RECOMMENDATIONS HOOK
export const useGetRecommendations = () => {
  const setRecommendations = useFoodStore((s) => s.setRecommendations);
  const tasteProfile = useFoodStore((s) => s.tasteProfile);

  return useQuery({
    queryKey: ["recommendations"],
    queryFn: async () => {
      try {
        const response = await apiClient.get("/recommendations");
        setRecommendations(response.data);
        return response.data;
      } catch (error) {
        console.warn("Backend recommendations API offline, generating locally:", error);
        if (tasteProfile) {
          const localRecs = generateRecommendationsLocally(tasteProfile);
          setRecommendations(localRecs);
          return localRecs;
        }
        // Fallback default
        const defaultProfile = analyzeTasteProfileLocally([], [], [], []);
        const localRecs = generateRecommendationsLocally(defaultProfile);
        setRecommendations(localRecs);
        return localRecs;
      }
    },
    enabled: true
  });
};
