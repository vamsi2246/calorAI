// ====================================================
// Splash Screen with Reanimated Glow and Redirection
// ====================================================

import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming
} from "react-native-reanimated";
import { COLORS } from "../constants/theme";

export default function SplashScreen() {
  const router = useRouter();
  const scale = useSharedValue(0.9);
  const opacity = useSharedValue(0.5);

  useEffect(() => {
    // Pulse logo animation
    scale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 900 }),
        withTiming(0.9, { duration: 900 })
      ),
      -1,
      true
    );

    opacity.value = withRepeat(
      withSequence(
        withTiming(1.0, { duration: 900 }),
        withTiming(0.5, { duration: 900 })
      ),
      -1,
      true
    );

    // Auto navigate after 2.2 seconds
    const timer = setTimeout(() => {
      router.replace("/(auth)/welcome");
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  const animatedLogoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value
  }));

  return (
    <View style={styles.container}>
      {/* Glow Backdrop Circles */}
      <View style={styles.glowCircle} />
      
      <Animated.View style={[styles.logoContainer, animatedLogoStyle]}>
        <Text style={styles.logoText}>🥗</Text>
        <Text style={styles.brandTitle}>Calor<Text style={styles.highlightText}>AI</Text></Text>
        <Text style={styles.brandSubtitle}>Taste Profiling & Meal Plans</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  },
  glowCircle: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: COLORS.accentIndigo,
    opacity: 0.15,
    filter: "blur(50px)",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: 72,
    marginBottom: 16,
  },
  brandTitle: {
    fontSize: 40,
    fontWeight: "900",
    color: COLORS.textLight,
    letterSpacing: 1,
  },
  highlightText: {
    color: COLORS.accentCyan,
  },
  brandSubtitle: {
    fontSize: 14,
    color: COLORS.textGray,
    marginTop: 6,
    letterSpacing: 2,
    textTransform: "uppercase",
  }
});
export default SplashScreen;
