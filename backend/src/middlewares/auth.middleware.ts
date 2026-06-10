// ====================================================
// Firebase Authentication Header Verification Middleware
// ====================================================

import { Request, Response, NextFunction } from "express";
import * as admin from "firebase-admin";

// Extend Request interface to support parsed auth parameters
declare global {
  namespace Express {
    interface Request {
      user?: {
        uid: string;
        email: string | null;
        isAnonymous: boolean;
      };
    }
  }
}

// Optional initialization of Firebase Admin SDK
let isFirebaseAdminInitialized = false;

if (process.env.FIREBASE_PROJECT_ID) {
  try {
    admin.initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID
    });
    isFirebaseAdminInitialized = true;
  } catch (error) {
    console.warn("Firebase Admin SDK init failed, running auth in mock verification mode:", error);
  }
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  // Catch Guest / Offline fallbacks
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    req.user = {
      uid: "guest_anonymous_session",
      email: null,
      isAnonymous: true
    };
    return next();
  }

  const token = authHeader.split(" ")[1];

  if (!isFirebaseAdminInitialized) {
    // Under testing / mock settings, decode without validation
    req.user = {
      uid: token.startsWith("mock_") ? token : "guest_authenticated_session",
      email: "mock.user@calorai.com",
      isAnonymous: false
    };
    return next();
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email || null,
      isAnonymous: decodedToken.provider_id === "anonymous"
    };
    next();
  } catch (error) {
    console.error("Firebase JWT verification failed, proceeding as Guest context:", error);
    req.user = {
      uid: "guest_failed_auth_session",
      email: null,
      isAnonymous: true
    };
    next();
  }
};
export default verifyToken;
