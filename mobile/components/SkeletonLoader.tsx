// ====================================================
// Premium Skeleton Loading Component with Pulse Animation
// ====================================================

import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence
} from "react-native-reanimated";
import { COLORS } from "../constants/theme";

const { width } = Dimensions.get("window");

export const SkeletonCard: React.FC = () => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.8, { duration: 800 }),
        withTiming(0.3, { duration: 800 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value
  }));

  return (
    <View style={styles.cardContainer}>
      <Animated.View style={[styles.imageSkeleton, animatedStyle]} />
      <View style={styles.contentContainer}>
        <Animated.View style={[styles.titleSkeleton, animatedStyle]} />
        <Animated.View style={[styles.subTitleSkeleton, animatedStyle]} />
        <View style={styles.row}>
          <Animated.View style={[styles.badgeSkeleton, animatedStyle]} />
          <Animated.View style={[styles.badgeSkeleton, animatedStyle]} />
          <Animated.View style={[styles.badgeSkeleton, animatedStyle]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: width * 0.85,
    height: 420,
    backgroundColor: COLORS.cardLight,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    borderRadius: 24,
    overflow: "hidden",
    alignSelf: "center",
    justifyContent: "space-between",
  },
  imageSkeleton: {
    width: "100%",
    height: "60%",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  contentContainer: {
    padding: 20,
    gap: 12,
  },
  titleSkeleton: {
    width: "70%",
    height: 24,
    borderRadius: 6,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  subTitleSkeleton: {
    width: "45%",
    height: 16,
    borderRadius: 6,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  row: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  badgeSkeleton: {
    width: 60,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  }
});
export default SkeletonCard;
