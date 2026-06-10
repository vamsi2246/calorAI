// ====================================================
// AI Recommendations screen displaying personalized plans
// ====================================================

import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from "react-native";
import { useRouter } from "expo-router";
import { useFoodStore } from "../../store/useFoodStore";
import { useGetRecommendations } from "../../services/api";
import { COLORS } from "../../constants/theme";
import GlassView from "../../components/GlassView";

export default function RecommendationsScreen() {
  const router = useRouter();
  const { tasteProfile, recommendations } = useFoodStore();

  // Triggers recommendations query, which maps to local rule fallback if server offline
  const { refetch, isRefetching } = useGetRecommendations();
  const [activeDay, setActiveDay] = useState("Monday");

  if (!tasteProfile) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyEmoji}>🔒</Text>
        <Text style={styles.emptyTitle}>AI Recommendations Locked</Text>
        <Text style={styles.emptyDesc}>
          Please swipe at least 15 foods to complete your Taste Profile. The AI engine uses that profile to draft your meal plan.
        </Text>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => router.push("/(tabs)/swipe")}
        >
          <Text style={styles.actionBtnText}>Go to Swiper Deck</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!recommendations) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyEmoji}>⚡</Text>
        <Text style={styles.emptyTitle}>AI Calculation Pending</Text>
        <Text style={styles.emptyDesc}>
          Preparing your custom meals, healthy alternatives, and weekly schedule...
        </Text>
      </View>
    );
  }

  const activeDayPlan = recommendations.weeklyPlan.find((d) => d.day === activeDay) || recommendations.weeklyPlan[0];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={COLORS.accentCyan} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>AI Meal Plans</Text>
        <Text style={styles.subtitle}>Custom recommendations engine</Text>
      </View>

      {/* AI Explanation Box */}
      <GlassView style={styles.explanationCard} borderRadius={20} glow>
        <Text style={styles.explanationTitle}>🧠 AI PROFILE ANALYSIS</Text>
        <Text style={styles.explanationText}>{recommendations.explanation}</Text>
      </GlassView>

      {/* Daily Recommendations Highlights */}
      <Text style={styles.sectionTitle}>Today's Ideal Meals</Text>

      {/* Breakfast Card */}
      <GlassView style={styles.mealCard} borderRadius={18}>
        <View style={styles.mealHeader}>
          <Text style={styles.mealEmoji}>{recommendations.breakfast.emoji}</Text>
          <View style={styles.mealMeta}>
            <Text style={styles.mealCategory}>BREAKFAST</Text>
            <Text style={styles.mealName}>{recommendations.breakfast.name}</Text>
          </View>
          <Text style={styles.mealCal}>{recommendations.breakfast.calories} cal</Text>
        </View>
        <Text style={styles.mealReason}>{recommendations.breakfast.reason}</Text>
        <View style={styles.macroPillRow}>
          <Text style={styles.macroPill}>🥩 P: {recommendations.breakfast.protein}g</Text>
          <Text style={styles.macroPill}>🍞 C: {recommendations.breakfast.carbs}g</Text>
          <Text style={styles.macroPill}>🥑 F: {recommendations.breakfast.fat}g</Text>
        </View>
      </GlassView>

      {/* Lunch Card */}
      <GlassView style={styles.mealCard} borderRadius={18}>
        <View style={styles.mealHeader}>
          <Text style={styles.mealEmoji}>{recommendations.lunch.emoji}</Text>
          <View style={styles.mealMeta}>
            <Text style={styles.mealCategory}>LUNCH</Text>
            <Text style={styles.mealName}>{recommendations.lunch.name}</Text>
          </View>
          <Text style={styles.mealCal}>{recommendations.lunch.calories} cal</Text>
        </View>
        <Text style={styles.mealReason}>{recommendations.lunch.reason}</Text>
        <View style={styles.macroPillRow}>
          <Text style={styles.macroPill}>🥩 P: {recommendations.lunch.protein}g</Text>
          <Text style={styles.macroPill}>🍞 C: {recommendations.lunch.carbs}g</Text>
          <Text style={styles.macroPill}>🥑 F: {recommendations.lunch.fat}g</Text>
        </View>
      </GlassView>

      {/* Dinner Card */}
      <GlassView style={styles.mealCard} borderRadius={18}>
        <View style={styles.mealHeader}>
          <Text style={styles.mealEmoji}>{recommendations.dinner.emoji}</Text>
          <View style={styles.mealMeta}>
            <Text style={styles.mealCategory}>DINNER</Text>
            <Text style={styles.mealName}>{recommendations.dinner.name}</Text>
          </View>
          <Text style={styles.mealCal}>{recommendations.dinner.calories} cal</Text>
        </View>
        <Text style={styles.mealReason}>{recommendations.dinner.reason}</Text>
        <View style={styles.macroPillRow}>
          <Text style={styles.macroPill}>🥩 P: {recommendations.dinner.protein}g</Text>
          <Text style={styles.macroPill}>🍞 C: {recommendations.dinner.carbs}g</Text>
          <Text style={styles.macroPill}>🥑 F: {recommendations.dinner.fat}g</Text>
        </View>
      </GlassView>

      {/* Snacks Card */}
      <GlassView style={styles.mealCard} borderRadius={18}>
        <View style={styles.mealHeader}>
          <Text style={styles.mealEmoji}>{recommendations.snacks.emoji}</Text>
          <View style={styles.mealMeta}>
            <Text style={styles.mealCategory}>SNACK / RECOVERY</Text>
            <Text style={styles.mealName}>{recommendations.snacks.name}</Text>
          </View>
          <Text style={styles.mealCal}>{recommendations.snacks.calories} cal</Text>
        </View>
        <Text style={styles.mealReason}>{recommendations.snacks.reason}</Text>
        <View style={styles.macroPillRow}>
          <Text style={styles.macroPill}>🥩 P: {recommendations.snacks.protein}g</Text>
          <Text style={styles.macroPill}>🍞 C: {recommendations.snacks.carbs}g</Text>
          <Text style={styles.macroPill}>🥑 F: {recommendations.snacks.fat}g</Text>
        </View>
      </GlassView>

      {/* Healthy Swaps / Alternatives */}
      <Text style={styles.sectionTitle}>Healthy Swaps</Text>
      <GlassView style={styles.swapsCard} borderRadius={20}>
        {recommendations.alternatives.map((alt, idx) => (
          <View key={alt.original} style={[styles.swapItem, idx > 0 && styles.divider]}>
            <View style={styles.swapRow}>
              <Text style={styles.swapOriginal}>{alt.original}</Text>
              <Text style={styles.arrowIcon}>➡️</Text>
              <Text style={styles.swapHealthy}>{alt.emoji} {alt.healthySwap}</Text>
            </View>
            <Text style={styles.savedCal}>Saved: -{alt.caloriesSaved} kcal</Text>
          </View>
        ))}
      </GlassView>

      {/* Cheat Meal Spotlight */}
      <Text style={styles.sectionTitle}>Weekly Cheat Reward</Text>
      <GlassView style={[styles.mealCard, { borderColor: "rgba(245, 158, 11, 0.3)" }]} borderRadius={18}>
        <View style={styles.mealHeader}>
          <Text style={styles.mealEmoji}>{recommendations.cheatMeal.emoji}</Text>
          <View style={styles.mealMeta}>
            <Text style={[styles.mealCategory, { color: COLORS.accentAmber }]}>CHEAT MEAL</Text>
            <Text style={styles.mealName}>{recommendations.cheatMeal.name}</Text>
          </View>
          <Text style={styles.mealCal}>{recommendations.cheatMeal.calories} cal</Text>
        </View>
        <Text style={styles.mealReason}>{recommendations.cheatMeal.reason}</Text>
        <View style={styles.macroPillRow}>
          <Text style={styles.macroPill}>🥩 P: {recommendations.cheatMeal.protein}g</Text>
          <Text style={styles.macroPill}>🍞 C: {recommendations.cheatMeal.carbs}g</Text>
          <Text style={styles.macroPill}>🥑 F: {recommendations.cheatMeal.fat}g</Text>
        </View>
      </GlassView>

      {/* Weekly Planner Grid */}
      <Text style={styles.sectionTitle}>Weekly Meal Schedule</Text>
      
      {/* Day Selector Badge Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.daySelectorRow} contentContainerStyle={{ gap: 8 }}>
        {recommendations.weeklyPlan.map((d) => (
          <TouchableOpacity
            key={d.day}
            onPress={() => setActiveDay(d.day)}
            style={[
              styles.dayBadge,
              activeDay === d.day && styles.activeDayBadge
            ]}
          >
            <Text
              style={[
                styles.dayText,
                activeDay === d.day && styles.activeDayText
              ]}
            >
              {d.day.substring(0, 3)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Planner Card Details */}
      <GlassView style={styles.plannerCard} borderRadius={20}>
        <Text style={styles.plannerDayTitle}>{activeDay} Schedule</Text>

        <View style={styles.plannerRow}>
          <Text style={styles.plannerLabel}>Breakfast</Text>
          <Text style={styles.plannerValue}>{activeDayPlan.breakfast}</Text>
        </View>

        <View style={[styles.plannerRow, styles.divider]}>
          <Text style={styles.plannerLabel}>Lunch</Text>
          <Text style={styles.plannerValue}>{activeDayPlan.lunch}</Text>
        </View>

        <View style={[styles.plannerRow, styles.divider]}>
          <Text style={styles.plannerLabel}>Dinner</Text>
          <Text style={styles.plannerValue}>{activeDayPlan.dinner}</Text>
        </View>

        <View style={[styles.plannerRow, styles.divider]}>
          <Text style={styles.plannerLabel}>Snacks</Text>
          <Text style={styles.plannerValue}>{activeDayPlan.snacks}</Text>
        </View>
      </GlassView>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 110,
    gap: 20,
  },
  header: {
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: COLORS.textLight,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.accentIndigo,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 4,
  },
  explanationCard: {
    padding: 18,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  explanationTitle: {
    fontSize: 11,
    color: COLORS.accentCyan,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 13,
    color: COLORS.textGray,
    lineHeight: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textLight,
    marginTop: 8,
  },
  mealCard: {
    padding: 16,
    borderColor: COLORS.glassBorder,
    gap: 12,
  },
  mealHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  mealEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  mealMeta: {
    flex: 1,
  },
  mealCategory: {
    fontSize: 9,
    color: COLORS.accentCyan,
    fontWeight: "700",
    letterSpacing: 1,
  },
  mealName: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.textLight,
    marginTop: 2,
  },
  mealCal: {
    fontSize: 13,
    color: COLORS.textGray,
    fontWeight: "600",
  },
  mealReason: {
    fontSize: 12,
    color: COLORS.textGray,
    lineHeight: 16,
  },
  macroPillRow: {
    flexDirection: "row",
    gap: 8,
  },
  macroPill: {
    fontSize: 11,
    color: COLORS.textLight,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: COLORS.glassBorder,
    fontWeight: "600",
  },
  swapsCard: {
    padding: 16,
    borderColor: COLORS.glassBorder,
  },
  swapItem: {
    paddingVertical: 10,
    gap: 6,
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.08)",
  },
  swapRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  swapOriginal: {
    fontSize: 13,
    color: COLORS.accentRose,
    fontWeight: "600",
  },
  arrowIcon: {
    fontSize: 13,
  },
  swapHealthy: {
    fontSize: 13,
    color: COLORS.accentEmerald,
    fontWeight: "600",
  },
  savedCal: {
    fontSize: 11,
    color: COLORS.textGray,
    fontWeight: "500",
  },
  daySelectorRow: {
    flexGrow: 0,
  },
  dayBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  activeDayBadge: {
    backgroundColor: COLORS.accentCyan,
    borderColor: COLORS.accentCyan,
  },
  dayText: {
    color: COLORS.textGray,
    fontSize: 12,
    fontWeight: "600",
  },
  activeDayText: {
    color: COLORS.textDark,
  },
  plannerCard: {
    padding: 16,
    borderColor: COLORS.glassBorder,
    gap: 12,
  },
  plannerDayTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.textLight,
  },
  plannerRow: {
    flexDirection: "row",
    paddingVertical: 8,
    justifyContent: "space-between",
  },
  plannerLabel: {
    fontSize: 13,
    color: COLORS.textGray,
    fontWeight: "600",
  },
  plannerValue: {
    fontSize: 13,
    color: COLORS.textLight,
    fontWeight: "500",
    flex: 1,
    textAlign: "right",
    marginLeft: 12,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  emptyEmoji: {
    fontSize: 60,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.textLight,
    marginBottom: 8,
  },
  emptyDesc: {
    fontSize: 14,
    color: COLORS.textGray,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 28,
  },
  actionBtn: {
    backgroundColor: COLORS.accentCyan,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 24,
    shadowColor: COLORS.accentCyan,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  actionBtnText: {
    color: COLORS.textDark,
    fontSize: 15,
    fontWeight: "700",
  },
});
export default RecommendationsScreen;
