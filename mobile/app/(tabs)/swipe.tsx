// ====================================================
// Food Swiping screen with filters, sorting & history controls
// ====================================================

import React, { useRef, useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useFoodStore } from "../../store/useFoodStore";
import { useGetFoods, useSavePreference, useGenerateTasteProfile } from "../../services/api";
import { CardStack, CardStackRef } from "../../components/CardStack";
import { FOOD_ITEMS, FoodItem } from "../../constants/foods";
import { COLORS } from "../../constants/theme";
import GlassView from "../../components/GlassView";

const CUISINES = ["All", "Vegetables", "Fruits", "Indian", "Italian", "Chinese", "Mexican", "American", "Healthy Foods", "Fast Foods", "Seafoods", "Desserts", "Breakfast", "Lunch", "Dinner", "Protein Foods", "Snacks", "Drinks"];

export default function SwipeScreen() {
  const router = useRouter();
  const cardStackRef = useRef<CardStackRef>(null);

  // Zustand Store states & actions
  const {
    user,
    swipeFood,
    undoLastSwipe,
    redoSwipe,
    resetSwipes,
    swipeHistory,
    redoHistory,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    getCompletionRate
  } = useFoodStore();

  // API hooks
  const { data: foods = FOOD_ITEMS, isLoading: foodsLoading } = useGetFoods();
  const savePreferenceMutation = useSavePreference();
  const generateProfileMutation = useGenerateTasteProfile();

  const completionRate = getCompletionRate();
  const totalSwipedCount = swipeHistory.length;

  // Filter & Sort computation
  const filteredFoods = useMemo(() => {
    // Extract already swiped food IDs from history to avoid showing them again
    const swipedIds = swipeHistory.map((s) => s.foodId);
    let list = foods.filter((f) => !swipedIds.includes(f.id));

    // Category Filter
    if (selectedCategory && selectedCategory !== "All") {
      list = list.filter((f) => f.category === selectedCategory);
    }

    // Search Query
    if (searchQuery.trim()) {
      list = list.filter((f) => f.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // Sorting
    if (sortBy === "calories_asc") {
      list.sort((a, b) => a.calories - b.calories);
    } else if (sortBy === "calories_desc") {
      list.sort((a, b) => b.calories - a.calories);
    } else if (sortBy === "protein_desc") {
      list.sort((a, b) => b.protein - a.protein);
    }

    return list;
  }, [foods, swipeHistory, selectedCategory, searchQuery, sortBy]);

  const handleSwipeAction = (food: FoodItem, direction: "like" | "dislike" | "superlike" | "unsure") => {
    // Update Zustand state locally
    swipeFood(food.id, direction);

    // Sync preference with backend database
    if (user) {
      savePreferenceMutation.mutate({
        userId: user.uid,
        foodId: food.id,
        type: direction
      });
    }
  };

  const handleFooterButtonPress = (direction: "like" | "dislike" | "superlike" | "unsure") => {
    if (filteredFoods.length > 0 && cardStackRef.current) {
      cardStackRef.current.swipe(direction);
    }
  };

  const handleGenerateProfile = async () => {
    if (totalSwipedCount < 15) {
      Alert.alert("Profile Locked", `Please swipe at least ${15 - totalSwipedCount} more foods to build your taste profile.`);
      return;
    }

    if (user) {
      generateProfileMutation.mutate(
        { userId: user.uid },
        {
          onSuccess: () => {
            router.push("/(tabs)/profile");
          },
          onError: () => {
            Alert.alert("Generation Failed", "Could not generate profile via AI, check server connectivity.");
          }
        }
      );
    } else {
      // Direct local analysis
      generateProfileMutation.mutate(
        { userId: "guest_user" },
        {
          onSuccess: () => {
            router.push("/(tabs)/profile");
          }
        }
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Header / Progress Area */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Calor<Text style={{ color: COLORS.accentCyan }}>AI</Text></Text>
          <Text style={styles.swipeCount}>Swiped: {totalSwipedCount}/15</Text>
        </View>

        {/* Animated Progress Bar */}
        <View style={styles.progressTrack}>
          <View style={[styles.progressBar, { width: `${completionRate}%` }]} />
        </View>
      </View>

      {/* Control Action Tools (Search, Filter, Sort) */}
      <View style={styles.toolbar}>
        <TextInput
          placeholder="Search foods..."
          placeholderTextColor={COLORS.textGray}
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchBar}
        />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cuisineRow} contentContainerStyle={{ gap: 8 }}>
          {CUISINES.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => setSelectedCategory(category === "All" ? null : category)}
              style={[
                styles.cuisineBadge,
                (selectedCategory === category || (category === "All" && !selectedCategory)) && styles.activeCuisineBadge
              ]}
            >
              <Text
                style={[
                  styles.cuisineText,
                  (selectedCategory === category || (category === "All" && !selectedCategory)) && styles.activeCuisineText
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Sorting badge filters */}
        <View style={styles.sortContainer}>
          <TouchableOpacity
            style={[styles.sortBadge, sortBy === "default" && styles.activeSortBadge]}
            onPress={() => setSortBy("default")}
          >
            <Text style={styles.sortText}>Default</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sortBadge, sortBy === "protein_desc" && styles.activeSortBadge]}
            onPress={() => setSortBy("protein_desc")}
          >
            <Text style={styles.sortText}>🥩 High Protein</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sortBadge, sortBy === "calories_asc" && styles.activeSortBadge]}
            onPress={() => setSortBy("calories_asc")}
          >
            <Text style={styles.sortText}>🥗 Low Cal</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main card stack canvas */}
      <View style={styles.deckContainer}>
        {foodsLoading || generateProfileMutation.isPending ? (
          <ActivityIndicator size="large" color={COLORS.accentCyan} />
        ) : filteredFoods.length > 0 ? (
          <CardStack
            ref={cardStackRef}
            data={filteredFoods}
            onSwipe={handleSwipeAction}
            onEmpty={() => {}}
          />
        ) : (
          <GlassView style={styles.emptyContainer} borderRadius={24}>
            <Text style={styles.emptyEmoji}>🍽️</Text>
            <Text style={styles.emptyTitle}>Deck Cleared!</Text>
            <Text style={styles.emptyDesc}>
              No more foods fit your search criteria or you swiped all 150 items.
            </Text>
            <TouchableOpacity style={styles.resetButton} onPress={resetSwipes}>
              <Text style={styles.resetBtnText}>Reset Swiping History</Text>
            </TouchableOpacity>
          </GlassView>
        )}
      </View>

      {/* Generate Profile CTA triggers at 15 items swiped */}
      {totalSwipedCount >= 15 && (
        <TouchableOpacity
          style={styles.generateCta}
          activeOpacity={0.85}
          onPress={handleGenerateProfile}
        >
          <Text style={styles.generateCtaText}>✨ Generate AI Taste Profile ✨</Text>
        </TouchableOpacity>
      )}

      {/* Bottom Footer Gestures & Controls */}
      <View style={styles.footerControls}>
        {/* Swiping controls row */}
        <View style={styles.swipeButtonsRow}>
          <TouchableOpacity
            style={[styles.controlCircle, { borderColor: COLORS.accentRose }]}
            onPress={() => handleFooterButtonPress("dislike")}
          >
            <Text style={styles.swipeText}>❌</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.controlCircle, { borderColor: COLORS.textGray }]}
            onPress={() => handleFooterButtonPress("unsure")}
          >
            <Text style={styles.swipeText}>❓</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controlCircle, { borderColor: COLORS.accentIndigo }]}
            onPress={() => handleFooterButtonPress("superlike")}
          >
            <Text style={styles.swipeText}>⭐</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controlCircle, { borderColor: COLORS.accentEmerald }]}
            onPress={() => handleFooterButtonPress("like")}
          >
            <Text style={styles.swipeText}>❤️</Text>
          </TouchableOpacity>
        </View>

        {/* Undo, Redo, Save Progress tools */}
        <View style={styles.utilityControlsRow}>
          <TouchableOpacity
            style={[styles.utilButton, swipeHistory.length === 0 && styles.disabledUtil]}
            onPress={undoLastSwipe}
            disabled={swipeHistory.length === 0}
          >
            <Text style={styles.utilText}>↩️ Undo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.utilButton, redoHistory.length === 0 && styles.disabledUtil]}
            onPress={redoSwipe}
            disabled={redoHistory.length === 0}
          >
            <Text style={styles.utilText}>🔁 Redo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.utilButton}
            onPress={() => {
              Alert.alert("Progress Cached", "Swiping state has been successfully preserved. You can resume later.");
            }}
          >
            <Text style={styles.utilText}>💾 Cache</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 60,
    paddingBottom: 90,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "900",
    color: COLORS.textLight,
  },
  swipeCount: {
    fontSize: 14,
    color: COLORS.textGray,
    fontWeight: "600",
  },
  progressTrack: {
    width: "100%",
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 3,
    marginTop: 10,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: COLORS.accentCyan,
    borderRadius: 3,
  },
  toolbar: {
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 10,
  },
  searchBar: {
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    height: 40,
    borderRadius: 12,
    paddingHorizontal: 12,
    color: COLORS.textLight,
    fontSize: 14,
  },
  cuisineRow: {
    flexGrow: 0,
  },
  cuisineBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  activeCuisineBadge: {
    backgroundColor: COLORS.accentIndigo,
    borderColor: COLORS.accentIndigo,
  },
  cuisineText: {
    color: COLORS.textGray,
    fontSize: 12,
    fontWeight: "600",
  },
  activeCuisineText: {
    color: COLORS.textLight,
  },
  sortContainer: {
    flexDirection: "row",
    gap: 8,
  },
  sortBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  activeSortBadge: {
    borderColor: COLORS.accentCyan,
    backgroundColor: "rgba(6, 182, 212, 0.1)",
  },
  sortText: {
    color: COLORS.textGray,
    fontSize: 11,
    fontWeight: "500",
  },
  deckContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyContainer: {
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
    borderColor: "rgba(255, 255, 255, 0.12)",
  },
  emptyEmoji: {
    fontSize: 44,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.textLight,
    marginBottom: 6,
  },
  emptyDesc: {
    fontSize: 13,
    color: COLORS.textGray,
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 20,
  },
  resetButton: {
    backgroundColor: COLORS.accentCyan,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  resetBtnText: {
    color: COLORS.textDark,
    fontSize: 13,
    fontWeight: "700",
  },
  generateCta: {
    backgroundColor: COLORS.accentEmerald,
    marginHorizontal: 20,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    shadowColor: COLORS.accentEmerald,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  generateCtaText: {
    color: COLORS.textDark,
    fontSize: 16,
    fontWeight: "700",
  },
  footerControls: {
    paddingHorizontal: 20,
    gap: 16,
  },
  swipeButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  controlCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 2.5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(15, 23, 42, 0.95)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  swipeText: {
    fontSize: 18,
  },
  utilityControlsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  utilButton: {
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  disabledUtil: {
    opacity: 0.35,
  },
  utilText: {
    color: COLORS.textLight,
    fontSize: 12,
    fontWeight: "600",
  },
});
export default SwipeScreen;
