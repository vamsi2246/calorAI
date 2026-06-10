// ====================================================
// Authentication Screen for Firebase Login & Guest entry
// ====================================================

import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, Alert } from "react-native";
import { useRouter } from "expo-router";
import { COLORS } from "../../constants/theme";
import { loginGuestUser } from "../../services/firebase";
import { useFoodStore } from "../../store/useFoodStore";
import GlassView from "../../components/GlassView";

export default function LoginScreen() {
  const router = useRouter();
  const setUser = useFoodStore((s) => s.setUser);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);

  const handleGuestLogin = async () => {
    setGuestLoading(true);
    try {
      const guestUser = await loginGuestUser();
      setUser(guestUser);
      router.replace("/(tabs)/swipe");
    } catch (err) {
      Alert.alert("Authentication Failure", "Could not complete guest session registration.");
    } finally {
      setGuestLoading(false);
    }
  };

  const handleMockLogin = async () => {
    if (!email || !password) {
      Alert.alert("Input Error", "Please provide email and password credentials.");
      return;
    }
    setLoading(true);
    // Simulate successful Firebase auth response
    setTimeout(() => {
      setUser({
        uid: "mock_user_" + Math.random().toString(36).substring(2, 9),
        email: email,
        isAnonymous: false
      });
      setLoading(false);
      router.replace("/(tabs)/swipe");
    }, 1200);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appTitle}>Join Calor<Text style={{ color: COLORS.accentCyan }}>AI</Text></Text>
        <Text style={styles.subtitle}>Unlock Your AI Recommendation Profile</Text>
      </View>

      <GlassView style={styles.loginCard} borderRadius={24}>
        <Text style={styles.cardTitle}>Sign In</Text>

        <TextInput
          placeholder="Email Address"
          placeholderTextColor={COLORS.textGray}
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor={COLORS.textGray}
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={styles.loginButton}
          activeOpacity={0.85}
          onPress={handleMockLogin}
          disabled={loading || guestLoading}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.textDark} />
          ) : (
            <Text style={styles.loginBtnText}>Login</Text>
          )}
        </TouchableOpacity>
      </GlassView>

      <View style={styles.socialAuthContainer}>
        <TouchableOpacity
          style={styles.googleButton}
          activeOpacity={0.85}
          onPress={() => {
            setLoading(true);
            setTimeout(() => {
              setUser({
                uid: "google_mock_uid_" + Math.random().toString(36).substring(2, 9),
                email: "google.user@gmail.com",
                isAnonymous: false
              });
              setLoading(false);
              router.replace("/(tabs)/swipe");
            }, 1000);
          }}
          disabled={loading || guestLoading}
        >
          <Text style={styles.googleText}>🔵 Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.guestButton}
          activeOpacity={0.85}
          onPress={handleGuestLogin}
          disabled={loading || guestLoading}
        >
          {guestLoading ? (
            <ActivityIndicator color={COLORS.textLight} />
          ) : (
            <Text style={styles.guestText}>Continue as Guest 👤</Text>
          )}
        </TouchableOpacity>
      </View>
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
    paddingBottom: 60,
  },
  header: {
    alignItems: "center",
  },
  appTitle: {
    fontSize: 36,
    fontWeight: "900",
    color: COLORS.textLight,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.accentIndigo,
    marginTop: 6,
    fontWeight: "600",
    textAlign: "center"
  },
  loginCard: {
    padding: 24,
    gap: 16,
    borderColor: "rgba(255, 255, 255, 0.12)",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.textLight,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    borderRadius: 14,
    height: 52,
    paddingHorizontal: 16,
    color: COLORS.textLight,
    fontSize: 15,
  },
  loginButton: {
    backgroundColor: COLORS.accentCyan,
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  loginBtnText: {
    color: COLORS.textDark,
    fontSize: 16,
    fontWeight: "700",
  },
  socialAuthContainer: {
    gap: 12,
  },
  googleButton: {
    backgroundColor: COLORS.textLight,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
  },
  googleText: {
    color: COLORS.textDark,
    fontSize: 16,
    fontWeight: "700",
  },
  guestButton: {
    borderWidth: 1.5,
    borderColor: COLORS.glassBorder,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
  },
  guestText: {
    color: COLORS.textLight,
    fontSize: 16,
    fontWeight: "600",
  },
});
export default LoginScreen;
