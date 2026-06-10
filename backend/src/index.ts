// ====================================================
// CalorAI Express Server Entry Point
// ====================================================

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import foodRoutes from "./routes/food.routes";
import preferenceRoutes from "./routes/preference.routes";
import aiRoutes from "./routes/ai.routes";
import { errorHandler } from "./middlewares/error.middleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS requests from the mobile client
app.use(cors());

// Parse incoming JSON body payloads
app.use(express.json());

// Routes Bindings
app.use("/api/foods", foodRoutes);
app.use("/api/preferences", preferenceRoutes);
app.use("/api", aiRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date() });
});

// Catch-all route handler
app.use((req, res, next) => {
  res.status(404).json({ error: "Endpoint Route Not Found" });
});

// Global central Error boundary
app.use(errorHandler);

// Only listen when not in a test runner environment (avoids ports in use errors)
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`🚀 CalorAI Server listening at http://localhost:${PORT}`);
  });
}

export default app;
export { app };
