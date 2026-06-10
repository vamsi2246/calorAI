// ====================================================
// Express Routes for AI Profiling & Recommendation Endpoints
// ====================================================

import { Router } from "express";
import { generateProfile, getProfile, getRecommendations } from "../controllers/ai.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const router = Router();

// POST /api/generate-profile - calculate profile and recommendations
router.post("/generate-profile", verifyToken, generateProfile);

// POST /api/ai-analysis - alias for profile evaluation
router.post("/ai-analysis", verifyToken, generateProfile);

// GET /api/profile - fetch cached user taste profile
router.get("/profile", verifyToken, getProfile);

// GET /api/recommendations - fetch cached meal recommendations
router.get("/recommendations", verifyToken, getRecommendations);

export default router;
