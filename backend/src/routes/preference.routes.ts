// ====================================================
// Express Routes for Preference Logging Endpoints
// ====================================================

import { Router } from "express";
import { savePreference } from "../controllers/preference.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const router = Router();

// POST /api/preferences - record user swipe choices
router.post("/", verifyToken, savePreference);

export default router;
