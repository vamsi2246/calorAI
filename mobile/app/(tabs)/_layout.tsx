// ====================================================
// Tab Navigator Layout with Glassmorphic Bottom Bar
// ====================================================

import React from "react";
import { Tabs } from "expo-router";
import { StyleSheet, View, Text } from "react-native";
import { COLORS } from "../../constants/theme";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.accentCyan,
        tabBarInactiveTintColor: COLORS.textGray,
        tabBarStyle: styles.tabBar,
        tabBarBackground: () => <View style={styles.tabBarBackground} />,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tabs.Screen
        name="swipe"
        options={{
          title: "Swipe",
          tabBarIcon: ({ color, focused }) => (
            <Text style={{ fontSize: 22, color }}>🎴</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Taste Profile",
          tabBarIcon: ({ color, focused }) => (
            <Text style={{ fontSize: 22, color }}>📊</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="recommendations"
        options={{
          title: "AI Plans",
          tabBarIcon: ({ color, focused }) => (
            <Text style={{ fontSize: 22, color }}>🪄</Text>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 24,
    left: 20,
    right: 20,
    elevation: 4,
    backgroundColor: "transparent",
    borderRadius: 24,
    height: 64,
    borderTopWidth: 0,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
  },
  tabBarBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.glassBgHeader,
    borderWidth: 1.5,
    borderColor: COLORS.glassBorder,
    borderRadius: 24,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: "600",
    marginBottom: 6,
  },
});
export default TabsLayout;
