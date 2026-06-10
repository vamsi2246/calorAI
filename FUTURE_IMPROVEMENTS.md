# Future Improvements & Roadmap - CalorAI

This document outlines planned features, code optimizations, and architectural enhancements for future versions of CalorAI.

---

## 🗺️ Product Roadmap

### 1. Computer Vision Meal Scanner (Gemini 2.0 Flash Integration)
* **Goal**: Enable users to photograph meals and instantly import estimated caloric and macronutrient values.
* **Architecture**: Capture image -> Upload to backend -> Call Gemini Vision API to analyze photo context -> Match with database items.

### 2. Apple Health & Google Fit Sync
* **Goal**: Automatically write logged macro metrics (average proteins, lipids, carbohydrates) into device health systems.
* **Architecture**: Implement `react-native-health` and `react-native-google-fit` libraries to sync logged food records daily.

### 3. Shared Dine swiping ("Tinder for Dining")
* **Goal**: Resolve the "what should we eat tonight?" dilemma. Two users swipe through a deck of local restaurant items, and a shared matched list is generated where liked items intersect.
* **Architecture**: Implement Supabase Realtime channels to broadcast swiping statuses, and cross-reference liked lists to compute overlaps.

---

## ⚡ Technical & Infrastructure Enhancements

### 1. Local Database Persistence (WatermelonDB or SQLite)
* **Goal**: Persist swiped card history locally on the device so it survives app terminations when offline.
* **Action**: Migrate Zustand's in-memory arrays to persist middleware linking directly to SQLite or MMKV storage.

### 2. Request Batching & Queues
* **Goal**: Optimize backend bandwidth by batching database writes.
* **Action**: Instead of sending a POST request to `/api/preferences` for every single swipe, queue swipes in memory and send a batched write request every 5 swipes.
