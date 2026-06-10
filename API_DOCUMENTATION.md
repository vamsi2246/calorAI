# REST API Documentation - CalorAI

This document details the REST API endpoints provided by the CalorAI Express backend.

---

## 🔒 Headers & Authentication

For authenticated endpoints, clients must include the Firebase ID Token in the request headers:

```http
Authorization: Bearer <firebase_id_token>
Content-Type: application/json
```

*Note: If Firebase credentials are not configured on the server, the authorization middleware falls back to a Guest context, allowing all requests to proceed.*

---

## 📡 Endpoints Specification

### 1. GET /api/foods
Retrieve the database catalog of food items.

* **Query Parameters**:
  * `q` (string, optional): Search filter query.
  * `category` (string, optional): Cuisine category (e.g. `Indian`, `Italian`).
  * `sort` (string, optional): Sorting option (`calories_asc` \| `calories_desc` \| `protein_desc`).

* **Response (200 OK)**:
  ```json
  [
    {
      "id": "veg_1",
      "name": "Broccoli Florets",
      "emoji": "🥦",
      "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=60",
      "category": "Vegetables",
      "calories": 34,
      "protein": 2.8,
      "carbs": 7,
      "fat": 0.4
    }
  ]
  ```

---

### 2. POST /api/preferences
Log a user preference (swipe event) for a food item.

* **Request Body**:
  ```json
  {
    "userId": "firebase_uid_string",
    "foodId": "veg_1",
    "type": "like" // "like" | "dislike" | "superlike" | "unsure"
  }
  ```

* **Response (200 OK or 201 Created)**:
  ```json
  {
    "success": true,
    "preference": {
      "id": "uuid-string",
      "user_id": "firebase_uid_string",
      "food_id": "veg_1",
      "swipe_type": "like",
      "created_at": "2026-06-10T22:08:45.000Z"
    }
  }
  ```

---

### 3. POST /api/generate-profile
Send swipe logs to evaluate user tastes and compile profile metrics + recommendations using the Gemini AI model.

* **Request Body**:
  ```json
  {
    "userId": "firebase_uid_string",
    "preferences": {
      "liked": ["veg_1", "fruit_1"],
      "disliked": ["fast_1"],
      "superliked": ["sea_1"],
      "unsure": ["drn_1"]
    }
  }
  ```

* **Response (200 OK)**:
  ```json
  {
    "profileTags": ["Healthy Eater", "Seafood Lover"],
    "keyHighlights": [
      "Likes average calories around 150 kcal",
      "Prefers high-protein seafoods",
      "Mainly dislikes fried foods"
    ],
    "lifestyle": "Fitness Enthusiast",
    "favCuisines": ["Seafoods", "Vegetables"],
    "statistics": {
      "likes": 2,
      "dislikes": 1,
      "superlikes": 1,
      "unsure": 1,
      "completion": 100
    },
    "recommendations": {
      "breakfast": {
        "name": "Smoked Salmon Bagel",
        "emoji": "🥯",
        "calories": 360,
        "protein": 24,
        "carbs": 42,
        "fat": 10,
        "reason": "Aligns with your preference for clean protein sources."
      },
      "lunch": {
        "name": "Grilled Chicken Caesar Wrap",
        "emoji": "🌯",
        "calories": 380,
        "protein": 28,
        "carbs": 32,
        "fat": 16,
        "reason": "Meets daily macros balance targets."
      },
      "dinner": {
        "name": "Baked Cod & Steamed Asparagus",
        "emoji": "🐟",
        "calories": 280,
        "protein": 32,
        "carbs": 12,
        "fat": 6,
        "reason": "Low calorie option rich in clean proteins."
      },
      "snacks": {
        "name": "Greek Yogurt & Mixed Almonds",
        "emoji": "🥛",
        "calories": 160,
        "protein": 15,
        "carbs": 8,
        "fat": 8,
        "reason": "Provides sustained micronutrients."
      },
      "cheatMeal": {
        "name": "Chocolate Fudge Cheesecake",
        "emoji": "🍰",
        "calories": 450,
        "protein": 6,
        "carbs": 55,
        "fat": 24,
        "reason": "A reward matching your light dessert likes."
      },
      "alternatives": [
        {
          "original": "French Fries",
          "healthySwap": "Baked Sweet Potato Wedges",
          "emoji": "🍠",
          "caloriesSaved": 120
        }
      ],
      "weeklyPlan": [
        {
          "day": "Monday",
          "breakfast": "Egg Scramble",
          "lunch": "Tuna Wrap",
          "dinner": "Steamed Cod",
          "snacks": "Mixed Nuts"
        }
      ],
      "explanation": "This meal layout maximizes high quality lean proteins and limits saturated lipids in line with your average swiped cards preferences."
    }
  }
  ```
