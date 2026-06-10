# CalorAI - AI Food Taste Profiling & Meal Recommendation App

CalorAI is a cross-platform mobile application and companion API backend designed to automate food taste profiling and construct personalized AI-driven meal recommendation plans. Built around an intuitive, interactive Tinder-like food swiping interface, it translates simple swipe decisions into comprehensive nutritional architectures.

---

## 📌 Problem Statement

Adhering to nutritional goals (weight loss, muscle gain, clean eating) is notoriously difficult. Existing applications force users to manually track foods, logging every gram of carbohydrate, protein, and fat. This introduces high cognitive friction, leading to user drop-off within the first two weeks. Additionally, traditional apps lack customization; they output generic meal plans that ignore user taste preferences, dietary intolerances, and cultural backgrounds, resulting in unpalatable menu plans that users fail to stick to.

## 💡 Solution

CalorAI solves this track-and-plan fatigue by transforming preference profiling into a game. 
1. **Frictionless Onboarding**: Users swipe through a visual deck of food cards (right for like, left for dislike, up for superlike, down for unsure) to quickly share their preferences.
2. **Macronutrient Analysis**: The app silently aggregates the macro densities (protein, fat, carbs) of liked foods behind the scenes.
3. **AI Taste Profiler**: Using the Google Gemini API, CalorAI compiles these preference patterns into a custom "Taste Profile" representing their lifestyle archetype (e.g. Clean Eater, Protein Focused, Dessert Lover).
4. **Tailored Meal Plans**: The AI recommendation engine drafts weekly meal plans and healthy swaps that match the user's tastes.

---

## ✨ Features

* **Tinder-like Card Swiper**: High-performance gesture-driven card deck running on native UI threads (60 FPS) with custom quick-action footers.
* **Interactive Navigation Tools**: Real-time keyword search, cuisine filters, and sorting by calorie/protein metrics.
* **Swipe State Controls**: Built-in Undo stack, Redo buffers, cached progress saves, and full state resets.
* **AI Profiler & Recommendation Engine**: Dual-mode engine utilizing Google Gemini API for cloud recommendations and an on-device rule engine fallback for offline resilience.
* **Visual Statistics**: Beautiful stats displays (likes, dislikes, completions) coupled with progress trackers.
* **Premium Theme**: Dark-mode visual aesthetic featuring glassmorphism cards, gradients, and pulsing skeleton loaders.
* **Firebase Authentication**: Anonymous guest sessions and verified token handshakes.

---

## 🛠️ Technology Stack

### Frontend Mobile
* **Framework**: React Native, Expo (SDK 51), TypeScript
* **Routing**: Expo Router (file-based navigation)
* **Gestures & Animations**: React Native Gesture Handler, React Native Reanimated (v3)
* **State Management**: Zustand (with in-memory queues)
* **Server Sync**: React Query (TanStack Query), Axios
* **Styling**: NativeWind (Tailwind CSS integration)

### Backend API
* **Runtime & Framework**: Node.js, Express.js, TypeScript
* **Database Interface**: Supabase JS Client (Postgres)
* **AI Model**: Google Gemini API via `@google/generative-ai` SDK
* **Auth Verification**: Firebase Admin SDK

---

## 🧭 Architecture

```
                               ┌────────────────────────────────┐
                               │       CalorAI Mobile App       │
                               │      (React Native Expo)       │
                               └──────────────┬─────────────────┘
                                              │
                                Firebase JWT /│/api/preferences
                                HTTPS requests│
                                              ▼
                               ┌────────────────────────────────┐
                               │       Express API Server       │
                               │     (Node.js + TypeScript)     │
                               └──────────────┬────────┬────────┘
                                              │        │
                                  Postgres SQL│        │Prompt engineering
                                              ▼        ▼
                                   ┌─────────────┐  ┌─────────────┐
                                   │  Supabase   │  │  Google AI  │
                                   │  Database   │  │ Gemini API  │
                                   └─────────────┘  └─────────────┘
```

---

## 📁 Folder Structure

```
calor-ai/
├── mobile/                  # React Native Mobile App
│   ├── app/                 # Expo Router layout & screen routing
│   │   ├── (auth)/          # welcome.tsx, login.tsx
│   │   └── (tabs)/          # swipe.tsx, profile.tsx, recommendations.tsx
│   ├── assets/              # Placeholders & PNG icons
│   ├── components/          # Reusable UI widgets (CardStack, GlassView, etc.)
│   ├── constants/           # Color tokens & local static foods database
│   ├── services/            # Client APIs, Firebase Auth, and local AI logic
│   ├── store/               # Zustand preference state manager
│   └── types/               # TypeScript interface templates
│
├── backend/                 # Node + Express Server
│   ├── src/
│   │   ├── config/          # Client initializers (Supabase, Gemini)
│   │   ├── controllers/     # Food lists, preferences, and AI endpoints
│   │   ├── middlewares/     # Firebase verifying & error boundary
│   │   ├── routes/          # Express routing links
│   │   ├── services/        # Gemini API prompt formatting
│   │   ├── utils/           # Centralized foods database catalog
│   │   └── __tests__/       # Router integration testing modules
│   ├── schema.sql           # Supabase Database schema migration
│   └── jest.config.js       # Jest compiler settings
│
├── README.md                # Main documentation
└── .env.example             # Global environment configurations
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root workspace, `/mobile` and `/backend` directories:

### Root `.env.example`
```env
PORT=3000
SUPABASE_URL=https://your-supabase-project.supabase.co
SUPABASE_KEY=your_supabase_anon_or_service_role_key
GEMINI_API_KEY=your_google_gemini_api_key
FIREBASE_PROJECT_ID=your_firebase_project_id
BACKEND_URL=http://localhost:3000
```

### Mobile `.env.example`
```env
EXPO_PUBLIC_BACKEND_URL=http://localhost:3000/api
EXPO_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain_url
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
```

### Backend `.env.example`
```env
PORT=3000
SUPABASE_URL=https://your-supabase-project.supabase.co
SUPABASE_KEY=your_supabase_service_role_key
GEMINI_API_KEY=your_google_gemini_api_key
FIREBASE_PROJECT_ID=your_firebase_project_id
```

---

## 💻 Local Setup & Installation

### Prerequisite Checklist
* Install [Node.js](https://nodejs.org/) (version 18+ recommended)
* Install [Expo Go](https://expo.dev/client) on your iOS/Android test device

### Step 1: Install Dependencies
```bash
# Install backend packages
cd backend
npm install

# Install mobile packages
cd ../mobile
npm install
```

### Step 2: Database Provisioning
Run the SQL queries inside [schema.sql](file:///Users/apple/Desktop/calorAI/backend/schema.sql) in your Supabase project's SQL Editor to instantiate the Postgres tables and indexes.

### Step 3: Run Backend API Server
```bash
cd backend
npm run dev
```
The Express server starts listening at `http://localhost:3000`.

### Step 4: Run Mobile Frontend App
```bash
cd mobile
npx expo start
```
Use the Expo QR code printed in the terminal to load the application inside the Expo Go app.

---

## 📡 API Documentation & AI Integration

The Express backend exposes REST routes under `/api` for logging preferences and managing profiles. For detailed schema examples and parameter values, refer to [API_DOCUMENTATION.md](file:///Users/apple/Desktop/calorAI/API_DOCUMENTATION.md).

### AI Integration Flow
1. **Swipe Data Capture**: The app collects swipe history array indicators.
2. **Gemini Prompt Parsing**: The server formats these swipes and prompt instructions, sending them to the `gemini-1.5-flash` model.
3. **Structured Outputs**: Gemini returns structured raw JSON matching our nutritional typing configurations.

---

## 🚀 Deployment

Complete multi-platform production builds and environment deployment guidelines are detailed in [DEPLOYMENT.md](file:///Users/apple/Desktop/calorAI/DEPLOYMENT.md).

---

## 🔮 Future Improvements

Refer to [FUTURE_IMPROVEMENTS.md](file:///Users/apple/Desktop/calorAI/FUTURE_IMPROVEMENTS.md) for details on planned features, including Apple Health synchronizations, computer vision food camera parsing, and shared double-swiping matching.
