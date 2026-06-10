# API Integration Flow & Resilience - CalorAI

This document outlines the API communication architecture, request sequences, and error-handling strategies used in CalorAI.

---

## 📡 Request Sequence Flow

The diagram below outlines the flow of API requests and error-handling paths:

```
                  [ Mobile Client Gesture/Action ]
                                │
                                ▼
                   [ React Query Trigger Hook ]
                                │
                                ▼
                       [ Axios API Call ]
                                │
                 ┌──────────────┴──────────────┐
                 ▼ Success                     ▼ Network Failure
         [ HTTP 200/201 OK ]             [ Catch Block Trigger ]
                 │                             │
                 ▼                             ▼
       [ Cache DB Updates ]          [ Local Rule Engine Call ]
                 │                             │
                 ▼                             ▼
     [ Return Backend Data ]         [ Return Local Fallback ]
                 │                             │
                 └──────────────┬──────────────┘
                                │
                                ▼
                   [ Render Screen Component ]
```

---

## 🎛️ Network Client Configuration (Axios)

The client configuration includes a timeout threshold to prevent requests from hanging indefinitely:

```ts
import axios from "axios";

const API_BASE_URL = process.env.EXPO_PUBLIC_BACKEND_URL || "http://localhost:3000/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // Timeout after 5 seconds to trigger fallback quickly
  headers: {
    "Content-Type": "application/json"
  }
});
```

---

## 🛡️ Network Resilience & Fallback Strategies

To ensure usability offline or when the server is down, we implement try-catch fallbacks in our React Query configurations:

### 1. Food Catalog Queries (`useGetFoods`)
* **Online Path**: Fetches the food list from the `/foods` endpoint.
* **Offline Path**: If the request fails, the catch block intercepts the error and returns the local `FOOD_ITEMS` array, keeping the swiper deck usable.

### 2. Preference Syncing (`useSavePreference`)
* **Online Path**: Sends the swipe event (`userId`, `foodId`, `type`) to the backend to log it in Supabase.
* **Offline Path**: If the request fails, the app records the swipe locally in the Zustand history stack and continues.

### 3. Profile Generation (`useGenerateTasteProfile`)
* **Online Path**: Sends the compiled swipe history to `/generate-profile` to generate a profile using the Gemini API and cache it in Supabase.
* **Offline Path**: If the request fails, the local `analyzeTasteProfileLocally` function evaluates the swiped cards to generate the profile.

### 4. Meal Recommendations (`useGetRecommendations`)
* **Online Path**: Retrieves the cached weekly meal plan and healthy alternatives from the database.
* **Offline Path**: If the request fails, the local `generateRecommendationsLocally` function builds a recommendation plan based on the user's taste profile.
