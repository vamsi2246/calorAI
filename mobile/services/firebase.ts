// ====================================================
// Firebase Authentication Configuration & Mock Fail-safes
// ====================================================

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, signInAnonymously, signOut, onAuthStateChanged, User } from "firebase/auth";
import { UserData } from "../types";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || "MOCK_KEY",
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || "calor-ai.firebaseapp.com",
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || "calor-ai",
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || "1:mock:web:id"
};

// Check if credentials are mock/missing to determine behavior
const isMockMode = firebaseConfig.apiKey === "MOCK_KEY";

let app;
let auth: any;

if (!isMockMode) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
  } catch (error) {
    console.warn("Firebase Init Failed, falling back to Mock Auth Mode:", error);
    auth = null;
  }
}

export const loginGuestUser = async (): Promise<UserData> => {
  if (isMockMode || !auth) {
    // Simulate successful API roundtrip latency
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      uid: "guest_mock_uid_" + Math.random().toString(36).substring(2, 9),
      email: null,
      isAnonymous: true
    };
  }

  try {
    const credential = await signInAnonymously(auth);
    return {
      uid: credential.user.uid,
      email: null,
      isAnonymous: true
    };
  } catch (error: any) {
    console.error("Firebase Guest Login Error, falling back to mock:", error);
    return {
      uid: "guest_fallback_" + Math.random().toString(36).substring(2, 9),
      email: null,
      isAnonymous: true
    };
  }
};

export const logoutUser = async (): Promise<void> => {
  if (isMockMode || !auth) {
    return;
  }
  await signOut(auth);
};

export const subscribeToAuthChanges = (callback: (user: UserData | null) => void) => {
  if (isMockMode || !auth) {
    // Simulate immediate guest auto-login trigger for demo convenience
    callback({
      uid: "guest_demo_user",
      email: null,
      isAnonymous: true
    });
    return () => {};
  }

  return onAuthStateChanged(auth, (firebaseUser: User | null) => {
    if (firebaseUser) {
      callback({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        isAnonymous: firebaseUser.isAnonymous
      });
    } else {
      callback(null);
    }
  });
};
