// ====================================================
// CalorAI Theme Design System Tokens
// ====================================================

export const COLORS = {
  background: "#0B0F19",
  cardDark: "#1E293B",
  cardLight: "#0F172A",
  accentEmerald: "#10B981",
  accentCyan: "#06B6D4",
  accentIndigo: "#6366F1",
  accentRose: "#F43F5E",
  accentAmber: "#F59E0B",
  textLight: "#F8FAFC",
  textGray: "#94A3B8",
  textDark: "#0F172A",
  glassBorder: "rgba(255, 255, 255, 0.08)",
  glassBg: "rgba(30, 41, 59, 0.65)",
  glassBgHeader: "rgba(15, 23, 42, 0.75)"
};

export const GRADIENTS = {
  primary: [COLORS.accentIndigo, COLORS.accentCyan],
  emeraldCyan: [COLORS.accentEmerald, COLORS.accentCyan],
  roseIndigo: [COLORS.accentRose, COLORS.accentIndigo],
  darkCard: [COLORS.cardDark, COLORS.cardLight],
  amberRose: [COLORS.accentAmber, COLORS.accentRose]
};

export const SHADOWS = {
  premium: {
    shadowColor: COLORS.accentIndigo,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6
  },
  neonEmerald: {
    shadowColor: COLORS.accentEmerald,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6
  },
  neonRose: {
    shadowColor: COLORS.accentRose,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6
  }
};
