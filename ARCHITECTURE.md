# System Architecture & Design - CalorAI

This document details the system architecture, component communication structures, and database flows of the CalorAI application.

---

## 🏗️ System Design Overview

CalorAI uses a client-server architecture. The mobile application communicates with our Node.js Express server to log swiping preferences and retrieve AI recommendations.

```mermaid
graph TD
    User([User])
    MobileApp[Mobile Client - React Native / Expo]
    ExpressAPI[Backend Gateway - Node.js Express]
    SupabaseDB[(Database - Supabase PostgreSQL)]
    GeminiModel(AI Engine - Google Gemini API)

    User -->|Interacts / Swipes| MobileApp
    MobileApp -->|Firebase JWT Auth / REST API| ExpressAPI
    ExpressAPI -->|Read / Write Preferences| SupabaseDB
    ExpressAPI -->|Generate Profile / Prompts| GeminiModel
```

---

## 📡 Core System Flow Diagram

The following sequence diagram outlines the process of card swiping, taste profile compilation, database caching, and AI meal recommendations generation:

```mermaid
sequenceDiagram
    autonumber
    actor User as User
    participant App as Mobile App (Expo)
    participant API as Express API Server
    participant DB as Supabase Database
    participant AI as Gemini API

    User->>App: Launch App & Log In
    App->>API: GET /api/foods (Fetch catalog list)
    API-->>App: Return 150 items food catalog list
    loop Swiping Flow
        User->>App: Swipe food card (Like / Dislike / Super / Unsure)
        App->>App: Log swipe to Zustand Store
        App->>API: POST /api/preferences (Async swipe sync)
        API->>DB: UPSERT swipe preference record
    end
    Note over App: Progress bar reaches 100% (15 swipes completed)
    User->>App: Tap "Generate AI Taste Profile"
    App->>API: POST /api/generate-profile (Send preferences payload)
    API->>AI: Send prompt containing swipes & food details
    AI-->>API: Return structured JSON (Profile & recommendations)
    API->>DB: Cache Taste Profile & Recommendations in database
    API-->>App: Return profile + meal recommendations
    App-->>User: Render Taste Profile stats and Meal schedule
```

---

## 🏛️ Component Specifications

### 1. Mobile Client (React Native + Expo)
* **View Layer**: Implemented using **Expo Router** slots. View styling is compiled using **NativeWind** (Tailwind CSS for React Native).
* **Gesture Layer**: Handled by **React Native Gesture Handler**'s `PanGestureHandler` and animated via **React Native Reanimated (v3)** to maintain 60 FPS transitions.
* **State Store**: Managed by **Zustand**. Stores local swipe selections, undo history stacks, and active user details.
* **API Client**: Implemented with **Axios** (linking client endpoints) and **React Query** (managing cached state, loading variables, and offline fallbacks).

### 2. Backend Gateway (Node.js + Express)
* **Router**: Standard routing modules using TypeScript compiles.
* **Auth Middleware**: Verifies incoming Firebase ID Tokens using the `firebase-admin` verification SDK.
* **Error Boundary**: Catches controller exceptions and returns standard JSON error responses.

### 3. Database Layer (Supabase PostgreSQL)
* **Users Table**: Syncs Firebase Auth accounts.
* **Foods Table**: Stores the 150 food items catalog.
* **Preferences Table**: Stores user swipe selections (Like, Dislike, Super Like, Unsure), with a unique constraint on `(user_id, food_id)` to prevent duplicates.
* **Taste Profiles Table**: Caches taste highlights, lifestyles, and cuisines.
* **Recommendations Table**: Caches meal plans and weekly schedules.

### 4. AI Recommendation Engine (Google Gemini)
* Interfaces with the `gemini-1.5-flash` model.
* Formats user swipe logs into a nutritional structured prompt.
* Instructs Gemini to return a structured JSON response, which is parsed and cached.
