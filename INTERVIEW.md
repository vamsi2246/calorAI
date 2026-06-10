# Technical Interview Preparation Guide & QA - CalorAI

This guide details the architectural decisions, structural flows, and key technical concepts behind CalorAI, coupled with **30 comprehensive technical interview questions and answers** to help you ace your interviews.

---

## 🧭 Project Flow & Technology Stack Rationale

### 1. Project Flow
1. **Launch**: The user is welcomed by an animated Splash screen that transitions to the onboarding Welcome screen.
2. **Onboarding**: The onboarding welcome tutorial shows the swiping controls.
3. **Authentication**: The login screen logs the user in anonymously (Guest Login) or authenticated via Firebase.
4. **Deck Swiper**: The user is presented with a Tinder-style stack of food cards. Swiping cards filters and tracks user preferences.
5. **Completion Lock**: Swiping progress is tracked by a progress bar. At 15 swipes, the user can click "Generate AI Taste Profile".
6. **AI Analysis**: The swipe choices are evaluated locally or on the backend via the Gemini API to output taste tags, macro averages, and lifestyle archetypes.
7. **Meal Recommendations**: A custom AI-generated weekly calendar, meal schedule, and healthy alternatives are loaded in the tabs view.

### 2. Why React Native?
React Native enables cross-platform development (iOS and Android) using a single codebase. It renders native components rather than rendering in web-view containers, offering superior UI performance.

### 3. Why Expo?
Expo abstracts native toolchain complexities (Xcode and Android Studio builds), streamlining development. It offers EAS (Expo Application Services) for compiling binaries on cloud hardware and managing Over-The-Air (OTA) JavaScript bundle deployments.

### 4. Why TypeScript?
TypeScript prevents runtime type crashes by enforcing type checking. It ensures that API response contracts, state management, and props models (like `FoodItem` properties) are validated during development.

### 5. Why Zustand?
Zustand is a lightweight state management library. Unlike Redux, it has minimal boilerplate. It uses custom hook selectors to prevent unnecessary component re-renders.

### 6. Why Supabase?
Supabase acts as our Postgres database, providing instant REST API capabilities. It allows easy storage of user configurations, logs, and meal profiles, backed by database indexes.

### 7. Why Firebase?
Firebase Authentication offers secure OAuth and anonymous guest login. Guest accounts can later be linked to authenticated credentials.

### 8. Why Node.js & Express?
Node.js offers an asynchronous, event-driven runtime environment. Express is a minimalist routing shell, allowing us to build lightweight REST APIs in TypeScript.

---

## ⚙️ Interactive Gesture & Animation Mathematics

### How Swipe Gestures Work
Using React Native Gesture Handler's `PanGestureHandler`, gesture state transitions occur on three axes:
1. **`onStart`**: Caches initial position offsets.
2. **`onActive`**: Tracks translation changes on the screen (`event.translationX` and `event.translationY`) and updates shared variables.
3. **`onEnd`**: Evaluates coordinate distances. If translations cross the threshold (35% of the screen width), the card flies off-screen via timing animations. If not, the card springs back to the center (`0, 0`).

### How Animations Work
React Native Reanimated (v3) runs animations on a dedicated native UI thread, bypassing the JavaScript thread. Worklets execute animations smoothly at 60 FPS.
The card tilt effect is calculated using interpolation:
```ts
const rotate = interpolate(
  translateX.value,
  [-screenWidth / 2, 0, screenWidth / 2],
  [-10, 0, 10]
);
```
As `translateX` moves left or right, the card tilts counter-clockwise or clockwise.

---

## 💬 30 Technical Interview Questions & Answers

### Part 1: Mobile UI & Animations (Gesture Handler & Reanimated)

#### Q1: What is the benefit of React Native Reanimated over the standard Animated API?
**Answer**: The standard React Native `Animated` API sends animation frame coordinates across the bridge from the JavaScript thread to the UI thread. If the JS thread blocks (due to network calls or heavy rendering), animations will stutter. React Native Reanimated runs animations on a separate UI thread using compiled *worklets*, ensuring smooth 60 FPS animations even if the JS thread is busy.

#### Q2: How do swipe gestures translate to card movements in `CardStack.tsx`?
**Answer**: We wrap the active `FoodCard` in a `PanGestureHandler`. The handler updates `translateX` and `translateY` shared values on the UI thread during drag events. A Reanimated hook `useAnimatedStyle` applies these shared values as translation transforms, making the card follow the user's finger.

#### Q3: How do you calculate the card rotation tilt in Reanimated?
**Answer**: We use the `interpolate` function to map `translateX.value` to a rotation range in degrees. For example, moving the card by half the screen width left (`-screenWidth / 2`) translates to a `-10deg` rotation, while moving it right translates to `10deg`. This creates a natural swinging tilt during swipes.

#### Q4: What happens mathematically when the user releases a card before the swipe threshold?
**Answer**: When the gesture ends (`onEnd`), we check the absolute translation distance. If it is less than `SWIPE_THRESHOLD` (35% of screen width), we animate `translateX` and `translateY` back to `0` using `withSpring()`. This springs the card back to the center of the screen.

#### Q5: How do you trigger swipe animations when a user taps a footer button instead of swiping?
**Answer**: We expose a ref handler `CardStackRef` from the `CardStack` component using `React.useImperativeHandle`. When a footer button is clicked, we animate the target shared value (e.g., animating `translateX` to `screenWidth * 1.5` for a "like" action) using `withTiming`. Once the animation completes, we trigger the swipe callback in JavaScript.

#### Q6: How do you ensure the background card scales up smoothly as the foreground card is swiped away?
**Answer**: We define an animated style for the background card. We interpolate the translation of the foreground card (the absolute value of `translateX` or `translateY`) from `0` to `SWIPE_THRESHOLD`, mapping it to a scale range from `0.95` to `1.0`. As the foreground card moves further from the center, the background card scales up to its full size.

#### Q7: Why do we only render the top two cards in the stack instead of loading all 150 items?
**Answer**: Rendering 150 image cards simultaneously would cause memory issues and slow down the app. By rendering only the active foreground card and the background preview card, we keep the view hierarchy lightweight. As a card is swiped away, we increment the index, mount the new background card, and clean up the old one.

---

### Part 2: React Native & State Management (Zustand & React Query)

#### Q8: Why use Zustand instead of Redux for global state in a mobile app?
**Answer**: Redux introduces a lot of boilerplate (actions, dispatchers, reducers) and requires wrapping the app in context providers, which can trigger unnecessary re-renders. Zustand is a lightweight, hooks-based state manager. It does not require context providers and allows components to subscribe only to the state slices they need.

#### Q9: How do you prevent unnecessary re-renders in components consuming the Zustand store?
**Answer**: We use selectors to subscribe to specific slices of state. For example, `const likedFoods = useFoodStore(state => state.likedFoods)` ensures the component only re-renders when `likedFoods` changes, ignoring updates to other states like `searchQuery` or `loading`.

#### Q10: How does the Undo/Redo stack history work in `useFoodStore.ts`?
**Answer**: We maintain a `swipeHistory` array of swiped cards and a `redoHistory` array for undone cards. 
* **Undo**: We pop the last swipe from `swipeHistory`, remove the food ID from its preference list, and push it to `redoHistory`.
* **Redo**: We pop from `redoHistory`, re-add the food ID to its preference list, and push it back to `swipeHistory`.
* **New Swipe**: A new swipe action clears the `redoHistory` stack to maintain a clean timeline.

#### Q11: How does React Query (TanStack Query) improve data fetching in CalorAI?
**Answer**: React Query automates caching, deduplicates requests, and handles loading states for network queries. It keeps our UI in sync with the backend, managing cache invalidation when preferences are updated.

#### Q12: How do you handle network failure when fetching the food catalog or posting swipes?
**Answer**: We implement offline fallbacks. If the Axios request to `/api/foods` fails due to a network error, the React Query query function catches the error, logs a warning, and returns the static `FOOD_ITEMS` catalog from local memory. This ensures the app remains usable offline.

#### Q13: How does local offline profiling work if the server is unreachable when generating a taste profile?
**Answer**: If the API call to `/api/generate-profile` fails, the catch block calls `analyzeTasteProfileLocally` and `generateRecommendationsLocally`. These functions calculate macro averages and category frequencies from the user's swipes to generate a local profile and meal plan, ensuring offline usability.

#### Q14: How do you persist the Zustand swiping history across app restarts?
**Answer**: We can use Zustand's `persist` middleware. This automatically serializes and saves the store state to local storage (like `AsyncStorage` or `react-native-mmkv`) on every update, reloading it when the app starts.

---

### Part 3: Backend & API Architectures (Node.js, Express & TypeScript)

#### Q15: What is the benefit of using Node.js for an API backend?
**Answer**: Node.js uses an event-driven, non-blocking I/O model. This makes it efficient for handling multiple concurrent requests, such as database updates and external AI API calls. Using TypeScript on both the frontend and backend also allows sharing data models easily.

#### Q16: How do you organize routes, controllers, and services in an Express application?
**Answer**: We use a clean separation of concerns:
* **Routes**: Define the API endpoints and map them to controllers.
* **Controllers**: Parse requests, validate inputs, call the service layer, and return HTTP responses.
* **Services**: Handle business logic and external integrations (e.g. Supabase DB calls, Gemini AI API requests).
* **Middlewares**: Handle cross-cutting concerns like authentication and error handling.

#### Q17: What is the role of the global error-handling middleware in Express?
**Answer**: It acts as a central catch-all for any errors thrown in our controllers or services. This prevents the Node server from crashing on unhandled exceptions and ensures the client receives a consistent error response format.

#### Q18: How does the authentication middleware verify requests from the mobile app?
**Answer**: The client sends a Firebase JWT token in the `Authorization: Bearer <token>` header. The backend middleware decodes and verifies this token using the Firebase Admin SDK. Once verified, it attaches the decoded user context (UID, email) to the `req.user` object for downstream controllers.

#### Q19: Why does the authentication middleware allow guest requests if the Authorization header is missing?
**Answer**: To support anonymous guest users, the middleware falls back to a guest user context if no authorization header is provided. This allows guests to test the app and generate meal plans without requiring immediate sign-up.

#### Q20: How do you structure unit tests for Express routers using Jest and Supertest?
**Answer**: We import the Express app instance into our tests and wrap it in Supertest. Supertest allows us to simulate HTTP requests (e.g. `request(app).get("/api/foods")`) and assert response status codes, header types, and JSON structures without needing to start the actual network server.

---

### Part 4: Database & AI Integration (Supabase & Gemini API)

#### Q21: What is the role of Supabase in our tech stack?
**Answer**: Supabase provides a hosted PostgreSQL database. It acts as our storage engine for users, food catalogs, swipe logs, taste profiles, and meal plans. It also offers database features like row-level security and indexes.

#### Q22: Why did we define a composite unique constraint on `preferences(user_id, food_id)`?
**Answer**: This constraint ensures a user can only have one swipe record per food item. If they swipe the same food again (e.g. after resetting or re-indexing), the database performs an `UPSERT` to update the existing record rather than creating a duplicate swipe.

#### Q23: How do database indexes on foreign keys improve query performance?
**Answer**: Indexes on columns like `preferences(user_id)` and `recommendations(user_id)` allow the database engine to locate records quickly without doing a full table scan. This reduces lookup times for user profiles and recommendations.

#### Q24: What model did we choose for AI recommendations, and how do we connect to it?
**Answer**: We use the Google Gemini API (`gemini-1.5-flash`) via the official `@google/generative-ai` SDK. We initialize a `GoogleGenerativeAI` client with our API key, retrieve the generative model, and send our preference prompt.

#### Q25: How do you prevent the server from blocking while waiting for Gemini API responses?
**Answer**: We handle the API calls asynchronously using `async/await`. Since Node.js runs on a non-blocking event loop, the server continues to handle other requests while waiting for the Gemini API response.

#### Q26: How do you prompt the Gemini model to return a structured JSON response?
**Answer**: We write structured instructions in the prompt, specifying the exact keys and data types we expect in the JSON response. We also instruct the model to return raw JSON without markdown formatting, and use `JSON.parse` on the response text.

#### Q27: How does database caching work for AI meal recommendations?
**Answer**: Generating recommendations via AI takes time and costs API credits. To optimize this, once Gemini generates the profile and meal plans, we cache them in the `taste_profiles` and `recommendations` tables. When the user visits their profile, we serve the cached data, regenerating it only when they request a profile reset or log new swipes.

---

### Part 5: Deployment & System Scalability

#### Q28: How does Render's deployment pipeline handle Express TypeScript code?
**Answer**: Render connects to our GitHub repository. During the build phase, it runs `npm run build` which compiles our TypeScript code into JavaScript using `tsc`. In the start phase, it runs `node dist/index.js` to start the compiled server.

#### Q29: What is Expo EAS, and how does it compile mobile app packages?
**Answer**: EAS (Expo Application Services) compiles React Native apps in the cloud. It manages the certificates, native dependencies, and compilation flags for iOS and Android, outputting installable binaries (`.apk` or `.ipa` files) without requiring a local macOS build machine.

#### Q30: How would you scale this application to support millions of active users?
**Answer**: 
1. **Caching**: Cache food list queries using Redis on the backend to reduce database load.
2. **Batching Database Writes**: Queue swipe events in the mobile app and write them to the database in batches of 5-10, instead of sending a request for every single swipe.
3. **Load Balancing**: Deploy the Express backend inside Docker containers across multiple cloud server nodes behind a load balancer.
4. **AI Queueing**: Limit the frequency of AI generation requests to manage API rate limits.
