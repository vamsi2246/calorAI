// ====================================================
// Express Backend Router Integration Tests
// ====================================================

import request from "supertest";
import app from "../index";

describe("CalorAI Express Server Endpoints API Tests", () => {
  
  test("GET /health - should return status OK", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("OK");
    expect(res.body).toHaveProperty("timestamp");
  });

  test("GET /api/foods - should return the entire catalog of foods", async () => {
    const res = await request(app).get("/api/foods");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(150);
    expect(res.body[0]).toHaveProperty("name");
    expect(res.body[0]).toHaveProperty("calories");
    expect(res.body[0]).toHaveProperty("protein");
    expect(res.body[0]).toHaveProperty("carbs");
    expect(res.body[0]).toHaveProperty("fat");
  });

  test("GET /api/foods?category=Indian - should filter by cuisine", async () => {
    const res = await request(app).get("/api/foods?category=Indian");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    const allAreIndian = res.body.every((item: any) => item.category === "Indian");
    expect(allAreIndian).toBe(true);
  });

  test("GET /api/foods?q=Broccoli - should search by keyword", async () => {
    const res = await request(app).get("/api/foods?q=Broccoli");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].name).toContain("Broccoli");
  });

  test("GET /api/foods?sort=calories_asc - should sort by calories ascending", async () => {
    const res = await request(app).get("/api/foods?sort=calories_asc");
    expect(res.status).toBe(200);
    const caloriesList = res.body.map((item: any) => item.calories);
    // Check if sorted
    for (let i = 0; i < caloriesList.length - 1; i++) {
      expect(caloriesList[i]).toBeLessThanOrEqual(caloriesList[i + 1]);
    }
  });

  test("POST /api/preferences - should accept and record swipe logs", async () => {
    const payload = {
      userId: "mock_test_uid",
      foodId: "34bf1286-44e8-4ace-9f80-fc898b387023", // uuid mock
      type: "like"
    };

    const res = await request(app)
      .post("/api/preferences")
      .send(payload);

    expect(res.status).toBe(200); // 200 returned under offline fallback mode
    expect(res.body.success).toBe(true);
  });
});
