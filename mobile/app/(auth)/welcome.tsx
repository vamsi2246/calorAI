// ====================================================
// Welcome Screen for Onboarding & Tutorial Guide
// ====================================================

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { COLORS } from "../../constants/theme";
import GlassView from "../../components/GlassView";

const { width } = Dimensions.get("window");

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appTitle}>Calor<Text style={{ color: COLORS.accentCyan }}>AI</Text></Text>
        <Text style={styles.subtitle}>Build Your Taste Profile</Text>
      </View>

      <GlassView style={styles.cardInfo} borderRadius={24}>
        <Text style={styles.titleInfo}>Design Your Food Plan</Text>
        
        <View style={styles.bulletRow}>
          <Text style={styles.bulletIcon}>👉</Text>
          <Text style={styles.bulletText}>
            <Text style={styles.boldText}>Swipe Right</Text> on foods you love.
          </Text>
        </View>

        <View style={styles.bulletRow}>
          <Text style={styles.bulletIcon}>👈</Text>
          <Text style={styles.bulletText}>
            <Text style={styles.boldText}>Swipe Left</Text> on foods you don't.
          </Text>
        </View>

        <View style={styles.bulletRow}>
          <Text style={styles.bulletIcon}>👆</Text>
          <Text style={styles.bulletText}>
            <Text style={styles.boldText}>Swipe Up</Text> to Super Like favorites.
          </Text>
        </View>

        <View style={styles.bulletRow}>
          <Text style={styles.bulletIcon}>👇</Text>
          <Text style={styles.bulletText}>
            <Text style={styles.boldText}>Swipe Down</Text> if you are Unsure.
          </Text>
        </View>
      </GlassView>

      <TouchableOpacity
        style={styles.actionButton}
        activeOpacity={0.85}
        onPress={() => router.push("/(auth)/login")}
      >
        <Text style={styles.actionButtonText}>Start Swiping</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 24,
    justifyContent: "space-between",
    paddingTop: 80,
    paddingBottom: 50,
  },
  header: {
    alignItems: "center",
  },
  appTitle: {
    fontSize: 44,
    fontWeight: "900",
    color: COLORS.textLight,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.accentIndigo,
    textTransform: "uppercase",
    letterSpacing: 2,
    marginTop: 6,
    fontWeight: "600",
  },
  cardInfo: {
    padding: 24,
    gap: 20,
    borderColor: "rgba(255, 255, 255, 0.12)",
  },
  titleInfo: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.textLight,
    marginBottom: 8,
    textAlign: "center"
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  bulletIcon: {
    fontSize: 22,
  },
  bulletText: {
    fontSize: 15,
    color: COLORS.textGray,
    flex: 1,
  },
  boldText: {
    color: COLORS.textLight,
    fontWeight: "600",
  },
  actionButton: {
    backgroundColor: COLORS.accentEmerald,
    width: "100%",
    height: 58,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.accentEmerald,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  actionButtonText: {
    color: COLORS.textDark,
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
export default WelcomeScreen;
