# CalorAI - AI Food Taste Profiling & Meal Recommendation App

CalorAI is a food taste profiling and meal recommendation mobile application built to redefine nutrition tracking. Using a Tinder-style card interface, users swipe on different food categories to build a detailed taste profile. The Google Gemini API then processes these preferences to output personalized weekly meal plans and healthy alternatives.

```
                  ┌───────────────────────────────┐
                  │      CalorAI Mobile App       │
                  │      (React Native Expo)      │
                  └──────────────┬────────────────┘
                                 │
                   Firebase JWT /│/api/preferences
                   HTTPS requests│
                                 ▼
                  ┌───────────────────────────────┐
                  │      Express API Server       │
                  │     (Node.js + TypeScript)    │
                  └──────────────┬────────┬───────┘
                                 │        │
                     Postgres SQL│        │Prompt engineering
                                 ▼        ▼
                      ┌─────────────┐  ┌─────────────┐
                      │  Supabase   │  │ Google AI   │
                      │  Database   │  │ Gemini API  │
                      └─────────────┘  └─────────────┘
```

---

## 🚀 Key Features

* **Tinder-like Card Swiper**: Interactive deck utilizing React Native Gesture Handler and Reanimated.
  * **Swipe Right**: Like
  * **Swipe Left**: Dislike
  * **Swipe Up**: Super Like
  * **Swipe Down**: Unsure
* **Dynamic Search & Filtering**: Instant keyword searches, cuisine filters (Indian, Italian, Seafood, Keto, etc.), and macros sorting.
* **Smart Undo / Redo / Reset**: Complete history buffers to retrieve cards swiped by accident.
* **Offline Fallback Resilience**: Local rule-based AI engine to evaluate profiles on-device if the API server is unreachable.
* **Weekly Meal Planner**: AI-generated breakfast, lunch, dinner, snacks, healthy alternatives, and cheat meal recommendations.
* **Premium UI/UX**: Dark theme, glassmorphic sheets, neon gradients, and pulsing skeleton loader pages designed for an Apple Fitness style aesthetic.
* **Secure Auth**: Firebase anonymous guest sessions and verified OAuth configurations.

---

## 🛠️ Technology Stack

### Frontend
* **Core**: React Native, Expo, TypeScript, Expo Router
* **Styling**: NativeWind (Tailwind CSS for Native views)
* **Animation**: React Native Reanimated (v3), React Native Gesture Handler
* **State Management**: Zustand
* **API Requests**: React Query (TanStack Query), Axios

### Backend & Database
* **Server**: Node.js, Express.js, TypeScript
* **Database**: Supabase (PostgreSQL)
* **Authentication**: Firebase Authentication / Admin SDK
* **Artificial Intelligence**: Google Gemini API (`gemini-1.5-flash`)

---

## 📁 Repository Structure

```
calor-ai/
├── mobile/                  # React Native Mobile App
│   ├── app/                 # Expo Router Screens & Layouts
│   ├── assets/              # Mock assets & Icons
│   ├── components/          # Reusable UI elements (CardStack, GlassView, etc.)
│   ├── constants/           # Color tokens & 150 items local food database
│   ├── hooks/               # Custom hooks
│   ├── services/            # Firebase, Axios client & Local AI fallback
│   ├── store/               # Zustand global preferences store
│   └── types/               # TypeScript interface templates
│
├── backend/                 # Node + Express Server
│   ├── src/
│   │   ├── config/          # Supabase & Gemini Initializers
│   │   ├── controllers/     # Route logic for foods, swipes & AI
│   │   ├── middlewares/     # Firebase authentication & error boundaries
│   │   ├── routes/          # Express route bindings
│   │   ├── services/        # Gemini API prompt integrations
│   │   ├── utils/           # Food catalog database
│   │   └── __tests__/       # API integration tests
│   ├── schema.sql           # Database schema migration
│   └── jest.config.js       # Backend testing suite configurations
│
├── README.md                # Project walkthrough
└── .env.example             # Global environment templates
```

---

## ⚙️ Installation & Setup

### Prerequisites
* Node.js (v18+)
* Expo Go (on your mobile device or simulator)

### 1. Setup Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` and add your Google Gemini and Supabase keys:
   ```bash
   cp .env.example .env
   ```
4. Seed the database schema in Supabase using the script inside [schema.sql](file:///Users/apple/Desktop/calorAI/backend/schema.sql).
5. Spin up the local development server:
   ```bash
   npm run dev
   ```

### 2. Setup Mobile Frontend
1. Navigate to the mobile directory:
   ```bash
   cd ../mobile
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Setup environmental values:
   ```bash
   cp .env.example .env
   ```
4. Launch the Expo bundler:
   ```bash
   npx expo start
   ```
5. Scan the QR code with your Expo Go app (Android) or Camera app (iOS) to load the application.

---

## 🧪 Running Tests

### Backend Route Tests
Runs Supertest integration suites targeting Express controllers:
```bash
cd backend
npm run test
```

### Frontend State Tests
Runs Jest tests verifying Zustand swiping stacks and metrics updates:
```bash
cd mobile
npm run test
```

---

## 📈 API Documentation Summary

The backend exposes the following REST endpoints under the prefix `/api`:

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/foods` | Queries the food catalog (supports `q`, `category`, `sort`) | No |
| `POST` | `/preferences` | Logs a card swipe event (like, dislike, superlike, unsure) | Yes |
| `POST` | `/generate-profile` | Evaluates swipes and returns Gemini Taste Profile + Meal Plan | Yes |
| `GET` | `/profile` | Fetches the user's cached taste profile | Yes |
| `GET` | `/recommendations` | Fetches the user's cached AI recommendations | Yes |

---

## 🔮 Future Roadmaps

1. **Camera Meal Scanner**: Integrate Gemini Vision API to parse meals from camera captures directly.
2. **Apple Health & Google Fit Connect**: Sync swiped protein/calorie averages directly to health kits.
3. **Multi-User Swiping (Date Night for Food)**: Swipe together with a friend/partner and generate a shared restaurant recommendation list where tastes intersect.

---

## 📜 License
This project is licensed under the MIT License - see the LICENSE file for details.
