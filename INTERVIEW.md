# Technical Interview Preparation Guide - CalorAI

This document outlines the architectural decisions, structural flows, and key technical concepts behind CalorAI, designed to help you ace your system design and coding interviews.

---

## 🛠️ Stack Decisions & Architectural Justifications

### 1. Why React Native?
* **Cross-Platform Delivery**: React Native allows writing one codebase that runs on both iOS and Android, saving startup development time and maintenance overhead.
* **Native Thread Performance**: Unlike hybrid web-view shells, React Native compiles UI components into standard native layout elements (e.g., `UIView` on iOS, `android.view` on Android) communicating via standard asynchronous bridges or high-performance JSI (JavaScript Interface) engines.

### 2. Why Expo?
* **Rapid Prototyping**: Expo simplifies mobile tooling. It abstracts native workspace setup (`ios/` and `android/` folders) and provides high-quality EAS (Expo Application Services) compilation and OTA (Over-The-Air) update distribution.
* **Expo Router**: Implements file-based routing standard in modern React systems like Next.js, making deep-linking and layout organization intuitive.

### 3. Why TypeScript?
* **Type Safety & Reliability**: In a data-heavy application managing macros and swiping records, TypeScript prevents runtime crashes by validating properties (e.g., ensuring food items map exactly to calories, fat, protein, and carb schemas) during compilation.

### 4. Why Zustand?
* **Minimalist Global State**: Unlike Redux, which introduces excessive boilerplate (actions, reducers, selectors), Zustand provides a clean, hooks-based store.
* **Performance**: Zustand does not require wrapping the app in context providers, reducing unnecessary re-renders when updating state (e.g., swiping a food item).

### 5. Why Supabase?
* **PostgreSQL Engine**: Relational tables map swipes, user details, and cached meal schedules cleanly. Supabase provides instantaneous REST endpoints and robust safety constraints out of the box.

### 6. Why Firebase?
* **Anonymous Guest Auth**: Firebase provides guest login capabilities out of the box, allowing users to experience the application immediately. We can easily link these anonymous profiles to real Google accounts later.

---

## 🏎️ Gesture Interactions & Animation Architectures

### How Swipe Gestures Work
* We use **React Native Gesture Handler**'s `PanGestureHandler`.
* On gesture start (`onStart`), we capture initial coordinate points.
* On movement active (`onActive`), we update shared values `translateX` and `translateY` representing the translation vector.
* On gesture release (`onEnd`), we check if the velocity or translation threshold (SWIPE_THRESHOLD, set to 35% of the screen width) is crossed:
  * **Exceeded**: Trigger a timing animation that carries the card off-screen in the target direction, then trigger JS callbacks to swap the cards.
  * **Not Exceeded**: Spring the card back to the center (`0, 0`).

### How Reanimated Transitions Work
* Traditional React Native animation APIs communicate over the JSON bridge, creating stuttering frames if the main JS thread blocks.
* **React Native Reanimated (v3)** runs animations directly on the UI main thread using *worklets* (JavaScript code compiled to run in the native UI thread context).
* The rotation effect is calculated using **interpolation**:
  ```ts
  const rotate = interpolate(
    translateX.value,
    [-screenWidth / 2, 0, screenWidth / 2],
    [-10, 0, 10]
  );
  ```
  This maps translation coordinates to rotation angles, giving cards a natural tilt during swipes.

---

## 🔮 AI Recommendation Engine Logic

### In-Memory vs. Server Pipeline
1. **Express Server Flow**: The mobile app packages the swiped history payload and posts it to `/api/generate-profile`. The Express controller feeds this preference profile to the Gemini API (`gemini-1.5-flash`), parses the structured JSON recommendation, caches it in Supabase, and returns it.
2. **Offline Fallback Flow**: If the backend is down or the device is offline, our mobile services catch the network failure and trigger `analyzeTasteProfileLocally()` and `generateRecommendationsLocally()`. This calculates average protein, carbohydrates, and calories, identifies favorite cuisines, and constructs a balanced meal plan locally.

---

## 💬 Common Technical Interview Questions

### Q1: How do you optimize card deck rendering performance when swiping through large lists of foods?
**Answer**: We only mount two cards at any time: the active foreground card and the background preview card. As the active card is swiped away, we increment `currentIndex` in the local state, causing the background card to become the active foreground card and rendering the next item as the new background card. This keeps memory usage low regardless of list size.

### Q2: What is the benefit of Zustand over React Context?
**Answer**: React Context triggers re-renders on all consumer components whenever any value in the context changes. Zustand uses selectors to allow components to subscribe to specific slices of state. For instance, a search input subscribing only to `searchQuery` will not re-render when `swipeHistory` is updated.

### Q3: How do you handle database write bottlenecks when a user swipes rapidly?
**Answer**: We update the local state instantly for a lag-free UI. The API write is handled asynchronously. To optimize further, we can implement **debounce** or **write-batching**: queuing swipes in memory and posting them to the database in batches of 5-10 swipes, rather than sending a request for every single card.
