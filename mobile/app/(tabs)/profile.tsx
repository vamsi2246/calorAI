// ====================================================
// Taste Profile screen displaying statistics & highlights
// ====================================================

import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useFoodStore } from "../../store/useFoodStore";
import { FOOD_ITEMS } from "../../constants/foods";
import { COLORS } from "../../constants/theme";
import GlassView from "../../components/GlassView";

export default function ProfileScreen() {
  const router = useRouter();
  const { tasteProfile, resetSwipes, swipeHistory } = useFoodStore();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleReset = () => {
    Alert.alert(
      "Reset Taste Profile",
      "Are you sure you want to clear all swiping logs and restart your taste profile design?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: () => {
            resetSwipes();
            router.replace("/(tabs)/swipe");
          }
        }
      ]
    );
  };

  if (!tasteProfile) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyEmoji}>🔒</Text>
        <Text style={styles.emptyTitle}>Taste Profile Locked</Text>
        <Text style={styles.emptyDesc}>
          Please swipe at least 15 foods in the Swiper deck to unlock your personalized AI food profiling dashboard.
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

  // Helper to resolve food objects from store list
  const getFoodEmojis = (idList: string[]) => {
    return FOOD_ITEMS.filter((f) => idList.includes(f.id)).map((f) => f.emoji);
  };

  const likedEmojis = getFoodEmojis(useFoodStore.getState().likedFoods);
  const dislikedEmojis = getFoodEmojis(useFoodStore.getState().dislikedFoods);
  const superLikedEmojis = getFoodEmojis(useFoodStore.getState().superLikedFoods);
  const unsureEmojis = getFoodEmojis(useFoodStore.getState().unsureFoods);

  const stats = tasteProfile.statistics;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.accentCyan} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>Taste Profile</Text>
        <Text style={styles.subtitle}>AI Food Profiling Engine</Text>
      </View>

      {/* Main Lifestyle Card */}
      <GlassView style={styles.lifestyleCard} borderRadius={24} glow>
        <View style={styles.lifestyleRow}>
          <Text style={styles.lifestyleLabel}>LIFESTYLE ARCHETYPE</Text>
          <View style={styles.archetypeBadge}>
            <Text style={styles.archetypeText}>Active</Text>
          </View>
        </View>
        <Text style={styles.lifestyleTitle}>{tasteProfile.lifestyle}</Text>
        <View style={styles.tagsContainer}>
          {tasteProfile.profileTags.map((tag) => (
            <View key={tag} style={styles.tagBadge}>
              <Text style={styles.tagText}>✨ {tag}</Text>
            </View>
          ))}
        </View>
      </GlassView>

      {/* Stats Quick Grid */}
      <View style={styles.statsGrid}>
        <GlassView style={styles.statsBox} borderRadius={16}>
          <Text style={[styles.statsVal, { color: COLORS.accentEmerald }]}>{stats.likes}</Text>
          <Text style={styles.statsLabel}>Likes</Text>
        </GlassView>
        <GlassView style={styles.statsBox} borderRadius={16}>
          <Text style={[styles.statsVal, { color: COLORS.accentRose }]}>{stats.dislikes}</Text>
          <Text style={styles.statsLabel}>Dislikes</Text>
        </GlassView>
        <GlassView style={styles.statsBox} borderRadius={16}>
          <Text style={[styles.statsVal, { color: COLORS.accentIndigo }]}>{stats.superlikes}</Text>
          <Text style={styles.statsLabel}>Supers</Text>
        </GlassView>
        <GlassView style={styles.statsBox} borderRadius={16}>
          <Text style={[styles.statsVal, { color: COLORS.textGray }]}>{stats.unsure}</Text>
          <Text style={styles.statsLabel}>Unsure</Text>
        </GlassView>
      </View>

      {/* Highlights */}
      <Text style={styles.sectionTitle}>Key Highlights</Text>
      <GlassView style={styles.infoCard} borderRadius={20}>
        {tasteProfile.keyHighlights.map((highlight, index) => (
          <View key={index} style={[styles.bulletRow, index > 0 && styles.divider]}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletContent}>{highlight}</Text>
          </View>
        ))}
      </GlassView>

      {/* Favorite Cuisines */}
      <Text style={styles.sectionTitle}>Preferred Cuisines</Text>
      <GlassView style={styles.infoCard} borderRadius={20}>
        <View style={styles.cuisinesGrid}>
          {tasteProfile.favCuisines.length > 0 ? (
            tasteProfile.favCuisines.map((cuisine) => (
              <View key={cuisine} style={styles.cuisineBadge}>
                <Text style={styles.cuisineText}>🍽️ {cuisine}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noDataText}>No cuisine preference determined.</Text>
          )}
        </View>
      </GlassView>

      {/* Foods logs maps */}
      <Text style={styles.sectionTitle}>Food Breakdown</Text>
      
      <GlassView style={styles.breakdownCard} borderRadius={20}>
        {/* Likes */}
        <View style={styles.breakdownRow}>
          <Text style={styles.breakdownLabel}>Loved Foods ({likedEmojis.length})</Text>
          <Text style={styles.emojiList} numberOfLines={1}>
            {likedEmojis.length > 0 ? likedEmojis.join(" ") : "None"}
          </Text>
        </View>

        {/* Dislikes */}
        <View style={[styles.breakdownRow, styles.divider]}>
          <Text style={styles.breakdownLabel}>Hated Foods ({dislikedEmojis.length})</Text>
          <Text style={styles.emojiList} numberOfLines={1}>
            {dislikedEmojis.length > 0 ? dislikedEmojis.join(" ") : "None"}
          </Text>
        </View>

        {/* Super Likes */}
        <View style={[styles.breakdownRow, styles.divider]}>
          <Text style={styles.breakdownLabel}>Super Liked ({superLikedEmojis.length})</Text>
          <Text style={styles.emojiList} numberOfLines={1}>
            {superLikedEmojis.length > 0 ? superLikedEmojis.join(" ") : "None"}
          </Text>
        </View>

        {/* Unsure */}
        <View style={[styles.breakdownRow, styles.divider]}>
          <Text style={styles.breakdownLabel}>Unsure Foods ({unsureEmojis.length})</Text>
          <Text style={styles.emojiList} numberOfLines={1}>
            {unsureEmojis.length > 0 ? unsureEmojis.join(" ") : "None"}
          </Text>
        </View>
      </GlassView>

      <TouchableOpacity
        style={styles.resetBtn}
        activeOpacity={0.8}
        onPress={handleReset}
      >
        <Text style={styles.resetBtnText}>Reset Profile & Swipes</Text>
      </TouchableOpacity>
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
    marginBottom: 8,
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
  lifestyleCard: {
    padding: 20,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  lifestyleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lifestyleLabel: {
    fontSize: 10,
    color: COLORS.textGray,
    fontWeight: "700",
    letterSpacing: 1,
  },
  archetypeBadge: {
    backgroundColor: "rgba(16, 185, 129, 0.15)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  archetypeText: {
    fontSize: 10,
    color: COLORS.accentEmerald,
    fontWeight: "700",
  },
  lifestyleTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: COLORS.textLight,
    marginTop: 10,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 14,
  },
  tagBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  tagText: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: "600",
  },
  statsGrid: {
    flexDirection: "row",
    gap: 10,
  },
  statsBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderColor: COLORS.glassBorder,
  },
  statsVal: {
    fontSize: 20,
    fontWeight: "800",
  },
  statsLabel: {
    fontSize: 10,
    color: COLORS.textGray,
    marginTop: 4,
    textTransform: "uppercase",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textLight,
    marginTop: 8,
  },
  infoCard: {
    padding: 16,
    borderColor: COLORS.glassBorder,
  },
  bulletRow: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 8,
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.08)",
  },
  bulletPoint: {
    fontSize: 16,
    color: COLORS.accentCyan,
  },
  bulletContent: {
    fontSize: 14,
    color: COLORS.textGray,
    flex: 1,
    lineHeight: 18,
  },
  cuisinesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  cuisineBadge: {
    backgroundColor: "rgba(6, 182, 212, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.accentCyan,
  },
  cuisineText: {
    fontSize: 12,
    color: COLORS.accentCyan,
    fontWeight: "600",
  },
  noDataText: {
    color: COLORS.textGray,
    fontSize: 13,
  },
  breakdownCard: {
    padding: 16,
    borderColor: COLORS.glassBorder,
  },
  breakdownRow: {
    paddingVertical: 10,
    gap: 6,
  },
  breakdownLabel: {
    fontSize: 13,
    color: COLORS.textLight,
    fontWeight: "600",
  },
  emojiList: {
    fontSize: 18,
    color: COLORS.textGray,
  },
  resetBtn: {
    borderWidth: 1.5,
    borderColor: "rgba(244, 63, 94, 0.3)",
    backgroundColor: "rgba(244, 63, 94, 0.05)",
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  resetBtnText: {
    color: COLORS.accentRose,
    fontSize: 15,
    fontWeight: "700",
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
export default ProfileScreen;
