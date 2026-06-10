// ====================================================
// Express Routes for Food Catalog Endpoints
// ====================================================

import { Router } from "express";
import { getFoods } from "../controllers/food.controller";

const router = Router();

// GET /api/foods - retrieve items catalog
router.get("/", getFoods);

export default router;
