// ====================================================
// Custom Glassmorphism Wrapper Component
// ====================================================

import React from "react";
import { View, ViewProps, StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";

interface GlassViewProps extends ViewProps {
  intensity?: number;
  borderRadius?: number;
  borderColor?: string;
  backgroundColor?: string;
  glow?: boolean;
}

export const GlassView: React.FC<GlassViewProps> = ({
  children,
  style,
  borderRadius = 20,
  borderColor = COLORS.glassBorder,
  backgroundColor = COLORS.glassBg,
  glow = false,
  ...props
}) => {
  return (
    <View
      style={[
        styles.glassContainer,
        {
          borderRadius,
          borderColor,
          backgroundColor,
        },
        glow && styles.glowStyle,
        style
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  glassContainer: {
    borderWidth: 1.5,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  glowStyle: {
    shadowColor: COLORS.accentIndigo,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  }
});
export default GlassView;
