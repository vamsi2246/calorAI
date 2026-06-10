// ====================================================
// FoodCard Component for Swiper Deck
// ====================================================

import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { FoodItem } from "../constants/foods";
import { COLORS } from "../constants/theme";
import GlassView from "./GlassView";

const { width } = Dimensions.get("window");

interface FoodCardProps {
  item: FoodItem;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item }) => {
  return (
    <View style={styles.cardContainer}>
      {/* Background Stock Food Category Image */}
      <Image
        source={{ uri: item.image }}
        style={styles.imageBackground}
        resizeMode="cover"
      />
      {/* Dim Overlay */}
      <View style={styles.overlay} />

      {/* Floating Emoji Badge */}
      <View style={styles.emojiBadge}>
        <Text style={styles.emojiText}>{item.emoji}</Text>
      </View>

      {/* Bottom Glass Drawer containing info */}
      <GlassView style={styles.detailsDrawer} borderRadius={18}>
        <View style={styles.headerRow}>
          <Text style={styles.foodName} numberOfLines={1}>
            {item.name}
          </Text>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
        </View>

        {/* Macros Breakdown */}
        <View style={styles.macrosRow}>
          <View style={styles.macroCol}>
            <Text style={styles.macroVal}>{item.calories}</Text>
            <Text style={styles.macroLabel}>kcal</Text>
          </View>
          <View style={[styles.macroCol, styles.borderLeft]}>
            <Text style={[styles.macroVal, { color: COLORS.accentEmerald }]}>
              {item.protein}g
            </Text>
            <Text style={styles.macroLabel}>Protein</Text>
          </View>
          <View style={[styles.macroCol, styles.borderLeft]}>
            <Text style={[styles.macroVal, { color: COLORS.accentCyan }]}>
              {item.carbs}g
            </Text>
            <Text style={styles.macroLabel}>Carbs</Text>
          </View>
          <View style={[styles.macroCol, styles.borderLeft]}>
            <Text style={[styles.macroVal, { color: COLORS.accentRose }]}>
              {item.fat}g
            </Text>
            <Text style={styles.macroLabel}>Fat</Text>
          </View>
        </View>
      </GlassView>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: width * 0.85,
    height: 440,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: COLORS.cardLight,
    borderWidth: 1.5,
    borderColor: COLORS.glassBorder,
    justifyContent: "flex-end",
    position: "relative"
  },
  imageBackground: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(11, 15, 25, 0.4)",
  },
  emojiBadge: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "rgba(15, 23, 42, 0.85)",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: COLORS.accentIndigo,
    shadowColor: COLORS.accentIndigo,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4
  },
  emojiText: {
    fontSize: 32,
  },
  detailsDrawer: {
    margin: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)"
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  foodName: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.textLight,
    flex: 1,
    marginRight: 8,
  },
  categoryBadge: {
    backgroundColor: "rgba(99, 102, 241, 0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 0.8,
    borderColor: COLORS.accentIndigo,
  },
  categoryText: {
    fontSize: 11,
    color: COLORS.accentIndigo,
    fontWeight: "600",
  },
  macrosRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  macroCol: {
    flex: 1,
    alignItems: "center",
  },
  borderLeft: {
    borderLeftWidth: 1,
    borderLeftColor: "rgba(255, 255, 255, 0.08)",
  },
  macroVal: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.textLight,
  },
  macroLabel: {
    fontSize: 10,
    color: COLORS.textGray,
    marginTop: 2,
    textTransform: "uppercase",
  },
});
export default FoodCard;
