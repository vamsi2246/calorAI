# REST API Documentation - CalorAI

This document details the REST API endpoints provided by the CalorAI Express API backend server.

---

## 🔒 Request Headers

All requests to authenticated endpoints should include the following header schemas:

```http
Authorization: Bearer <firebase_id_token>
Content-Type: application/json
```

*Note: If Firebase credentials are not fully configured on the server, the authorization middleware falls back to a Guest context, allowing all requests to proceed.*

---

## 📡 Endpoints Directory

### 1. GET /api/foods
Retrieve the database catalog of food items.

* **Method**: `GET`
* **Endpoint**: `/api/foods`
* **Authentication Required**: `No`
* **Query Parameters**:
  * `q` (string, optional): Search filter query.
  * `category` (string, optional): Cuisine category (e.g. `Indian`, `Italian`).
  * `sort` (string, optional): Sorting option (`calories_asc` \| `calories_desc` \| `protein_desc`).

#### Example Request
```http
GET /api/foods?category=Indian&sort=protein_desc HTTP/1.1
Host: localhost:3000
```

#### Example Response (200 OK)
```json
[
  {
    "id": "ind_12",
    "name": "Tandoori Chicken",
    "emoji": "🍗",
    "image": "https://images.unsplash.com/photo-1585938338392-50a5997042d1?w=500&auto=format&fit=crop&q=60",
    "category": "Indian",
    "calories": 280,
    "protein": 35,
    "carbs": 4,
    "fat": 14
  }
]
```

#### Example Error Response (500 Internal Server Error)
```json
{
  "error": {
    "message": "Internal Server Exception",
    "status": 500,
    "timestamp": "2026-06-11T00:13:26.000Z"
  }
}
```

---

### 2. POST /api/preferences
Log a user preference (swipe event) for a food item.

* **Method**: `POST`
* **Endpoint**: `/api/preferences`
* **Authentication Required**: `Yes`
* **Request Body**:
  * `userId` (string, required): Firebase user UID.
  * `foodId` (string, required): Food item UUID or ID.
  * `type` (string, required): Swiped choice (`like` \| `dislike` \| `superlike` \| `unsure`).

#### Example Request
```http
POST /api/preferences HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Authorization: Bearer mock_token

{
  "userId": "mock_user_123",
  "foodId": "veg_1",
  "type": "like"
}
```

#### Example Response (201 Created)
```json
{
  "success": true,
  "preference": {
    "id": "7ac19d9b-c12e-4b6e-8a7e-8c3b0df2b79a",
    "user_id": "mock_user_123",
    "food_id": "veg_1",
    "swipe_type": "like",
    "created_at": "2026-06-11T00:13:26.000Z"
  }
}
```

#### Example Error Response (400 Bad Request)
```json
{
  "error": {
    "message": "Missing required properties: userId, foodId, and type are required.",
    "status": 400,
    "timestamp": "2026-06-11T00:13:26.000Z"
  }
}
```

---

### 3. POST /api/generate-profile
Send swipe logs to evaluate user tastes and compile profile metrics + recommendations using the Gemini AI model.

* **Method**: `POST`
* **Endpoint**: `/api/generate-profile`
* **Authentication Required**: `Yes`
* **Request Body**:
  * `userId` (string, required): Firebase user UID.
  * `preferences` (object, required): Logged swipes:
    * `liked` (array of strings): Swiped liked food IDs.
    * `disliked` (array of strings): Swiped disliked food IDs.
    * `superliked` (array of strings): Swiped superliked food IDs.
    * `unsure` (array of strings): Swiped unsure food IDs.

#### Example Request
```http
POST /api/generate-profile HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Authorization: Bearer mock_token

{
  "userId": "mock_user_123",
  "preferences": {
    "liked": ["veg_1", "fruit_1"],
    "disliked": ["fast_1"],
    "superliked": ["sea_1"],
    "unsure": ["drn_1"]
  }
}
```

#### Example Response (200 OK)
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

---

### 4. GET /api/profile
Fetch the user's cached taste profile.

* **Method**: `GET`
* **Endpoint**: `/api/profile`
* **Authentication Required**: `Yes`
* **Query Parameters**:
  * `userId` (string, optional): Target user ID.

#### Example Request
```http
GET /api/profile?userId=mock_user_123 HTTP/1.1
Host: localhost:3000
Authorization: Bearer mock_token
```

#### Example Response (200 OK)
```json
{
  "id": "31b01a1c-99e8-4ace-bf80-fc898b387023",
  "user_id": "mock_user_123",
  "profile_tags": ["Healthy Eater"],
  "keyHighlights": ["Averages 120 kcal per liked food"],
  "lifestyle": "Fitness Enthusiast",
  "fav_cuisines": ["Vegetables"],
  "statistics": {
    "likes": 5,
    "dislikes": 0,
    "superlikes": 0,
    "unsure": 0,
    "completion": 100
  },
  "created_at": "2026-06-11T00:13:26.000Z"
}
```

---

### 5. GET /api/recommendations
Fetch the user's cached AI recommendations.

* **Method**: `GET`
* **Endpoint**: `/api/recommendations`
* **Authentication Required**: `Yes`
* **Query Parameters**:
  * `userId` (string, optional): Target user ID.

#### Example Request
```http
GET /api/recommendations?userId=mock_user_123 HTTP/1.1
Host: localhost:3000
Authorization: Bearer mock_token
```

#### Example Response (200 OK)
```json
{
  "id": "34bf1286-44e8-4ace-9f80-fc898b387023",
  "user_id": "mock_user_123",
  "breakfast": {
    "name": "Oatmeal with Berries",
    "calories": 180,
    "protein": 6,
    "carbs": 34,
    "fat": 2.5
  },
  "lunch": {
    "name": "Chicken Wrap",
    "calories": 380,
    "protein": 28,
    "carbs": 32,
    "fat": 16
  },
  "dinner": {
    "name": "Baked Salmon",
    "calories": 440,
    "protein": 40,
    "carbs": 25,
    "fat": 18
  },
  "snacks": {
    "name": "Mixed Almonds",
    "calories": 160,
    "protein": 6,
    "carbs": 6,
    "fat": 14
  },
  "alternatives": [],
  "weekly_plan": [],
  "cheat_meal": {},
  "explanation": "Balanced schedule based on liked items.",
  "created_at": "2026-06-11T00:13:26.000Z"
}
```
