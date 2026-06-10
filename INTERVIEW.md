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

---

### Part 6: System Design & Mobile Performance

#### Q31: How do you optimize React Native list rendering performance with FlatList or FlashList?
**Answer**: FlashList (by Shopify) recycles views instead of destroying and rebuilding them as FlatList does, reducing the garbage collection load and CPU strain. For FlatList:
1. Provide a unique string key using `keyExtractor`.
2. Implement `getItemLayout` if item heights are fixed, bypassing dynamic layout calculations.
3. Keep the render function light and avoid inline function declarations to prevent garbage collection sweeps on scroll.

#### Q32: What is Metro Bundler and what is its role in React Native development?
**Answer**: Metro is the JavaScript bundler built for React Native. It resolves JavaScript/TypeScript imports, performs hot module replacement (HMR) during development, compiles code into a single index bundle file, and serves assets to the iOS/Android native client wrapper.

#### Q33: How does React Native's new architecture (Fabric and TurboModules) differ from the old bridge architecture?
**Answer**: The old architecture relies on an asynchronous JSON bridge, which can bottleneck performance during intensive UI actions. The new architecture uses JSI (JavaScript Interface), allowing direct, synchronous C++ invocations between JavaScript and native code. **Fabric** replaces the old shadow tree with a synchronous rendering engine, and **TurboModules** enables lazy loading of native modules to speed up app boot times.

#### Q34: What is Hermes JS Engine, and why does Expo enable it by default?
**Answer**: Hermes is an open-source JavaScript engine optimized for running React Native. It uses ahead-of-time (AOT) compilation to compile JavaScript into bytecode during the build phase. This reduces memory footprint, speeds up app startup times, and minimizes bundle sizes compared to JIT (Just-In-Time) engines.

#### Q35: How would you configure React Native Gesture Handler inside root views, and why is GestureHandlerRootView required?
**Answer**: On Android, gestures must be intercepted before they reach native views. Wrapping the app root inside `<GestureHandlerRootView style={{ flex: 1 }}>` ensures that drag, pinch, and rotation handlers are correctly registered and managed by the gesture responder system.

#### Q36: How does virtualized list layout implementation in React Native prevent memory leaks?
**Answer**: Virtualized lists only render views that are currently visible within the screen viewport (plus a small render buffer). Off-screen views are unmounted and their memory is freed, maintaining a flat memory layout even when scrolling through large data catalogs.

#### Q37: How do you handle deep linking in Expo Router?
**Answer**: We define a scheme in `app.json` (e.g. `"scheme": "calorai"`) and configure linking paths in Expo Router. Expo Router maps URL patterns directly to files in the `app/` folder (e.g. `calorai://recommendations` routes the user to `app/(tabs)/recommendations.tsx`).

#### Q38: What are Reanimated Worklets, and how do they function under the hood?
**Answer**: Worklets are small JavaScript functions compiled to run inside a separate JS context on the UI main thread. They allow code to bypass the asynchronous bridge to read and update UI shared values at 60 FPS. They are identified using the `"worklet";` directive.

#### Q39: How do you mock external API calls in Jest for mobile state unit tests?
**Answer**: We use Jest's spy modules to mock API clients:
```ts
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn().mockResolvedValue({ data: [] }),
    post: jest.fn().mockResolvedValue({ data: { success: true } })
  }))
}));
```
This intercepts network calls and returns mock data, ensuring tests run reliably in isolation.

#### Q40: What is code splitting, and does React Native support lazy loading of components?
**Answer**: Code splitting breaks down the JavaScript bundle into smaller chunks that can be loaded on demand. React Native supports lazy loading using `React.lazy()` and `Suspense`, allowing components to load only when they are rendered.

---

### Part 7: Security, DevOps & AI Integrations

#### Q41: Explain Row-Level Security (RLS) in Supabase and how it protects database tables.
**Answer**: RLS is a PostgreSQL feature that defines security policies at the row level. We can restrict users to only select or update rows where the `user_id` matches their authenticated Firebase UID (`auth.uid() = user_id`), preventing access to other users' data.

#### Q42: How does the Node.js cluster module work, and how does it compare to PM2?
**Answer**: The cluster module spawns child processes that share port connections, allowing Express to balance traffic across multiple CPU cores. PM2 is a process manager that automates clustering, restarts crashed instances, and manages server resource utilization.

#### Q43: How do you defend against Cross-Site Scripting (XSS) and SQL Injection in an Express Node server?
**Answer**: 
* **SQL Injection**: Use parameterized queries or an ORM/Query Builder (like Supabase Client or Prisma) instead of raw string concatenation.
* **XSS**: Sanitize inputs, enforce CORS policies, and use security headers like `Helmet` to set Content Security Policies (CSP).

#### Q44: What is the benefit of rate limiting, and how would you configure it in an Express gateway?
**Answer**: Rate limiting protects the server from DDoS attacks and API resource exhaustion. We can configure middleware like `express-rate-limit` to limit the number of requests a single IP can make within a time window (e.g. max 100 requests per 15 minutes).

#### Q45: How do you securely manage environment keys during EAS production builds?
**Answer**: We avoid committing secrets to version control. Instead, we upload keys to the Expo dashboard under **Secrets** or configure them securely inside our CI/CD runner environments, injecting them during build time.

#### Q46: How does the Gemini SDK handle model contexts, and what does the max token parameter influence?
**Answer**: Context represents the input history and prompt instructions the model evaluates. The `maxOutputTokens` parameter limits the length of the generated response, helping manage API costs and prevent incomplete cut-offs.

#### Q47: How does database connection pooling improve performance, and how do you handle it in Supabase/PG?
**Answer**: Establishing database connections is computationally expensive. Connection pooling keeps a pool of active connections open for reuse. Supabase provides built-in pooling using PgBouncer, allowing the backend to handle multiple concurrent requests without overwhelming Postgres.

#### Q48: What is the Git Rebase workflow, and how does it compare to Git Merge?
**Answer**: `git merge` combines branches by creating a merge commit, preserving the exact history. `git rebase` moves the local commit history to the tip of the target branch, keeping the commit timeline linear and clean.

#### Q49: What are Git Hooks, and how do you set up lint checks before commits (Husky)?
**Answer**: Git hooks are scripts that run automatically at key points in the git workflow (e.g. `pre-commit`, `pre-push`). We use **Husky** to configure pre-commit hooks that run linting and formatting checks, ensuring clean code commits.

#### Q50: How do you configure Docker Compose to run PostgreSQL locally for testing?
**Answer**: We define a database service in `docker-compose.yml` using the official Postgres image, configure environment variables for credentials, map ports, and mount volume directories to persist data:
```yaml
db:
  image: postgres:15-alpine
  ports:
    - "5432:5432"
  environment:
    POSTGRES_DB: calorai
    POSTGRES_PASSWORD: secret_password
```

---

## 📅 Two-Day Study Plan - Interview Preparation

This plan is structured to help you confidently explain the entire CalorAI codebase and system design during your interviews.

### 🌅 Day 1: Mobile Client & State Architecture
* **Morning (9:00 - 12:00)**: Study the Gesture and Animation mechanics. Focus on [CardStack.tsx](file:///Users/apple/Desktop/calorAI/mobile/components/CardStack.tsx) and [FoodCard.tsx](file:///Users/apple/Desktop/calorAI/mobile/components/FoodCard.tsx). Practice explaining how `PanGestureHandler` translates drag events and how `useAnimatedStyle` interpolates card tilt.
* **Afternoon (13:30 - 17:00)**: Study Zustand Store Management. Review [useFoodStore.ts](file:///Users/apple/Desktop/calorAI/mobile/store/useFoodStore.ts) to understand the swipe list mutations, progress indicators, and the Undo/Redo history stacks.
* **Evening (18:30 - 21:00)**: Review the API integration layer. Look at [api.ts](file:///Users/apple/Desktop/calorAI/mobile/services/api.ts) to see how Axios hooks catch network failures and fall back to local profiling functions in [ai.ts](file:///Users/apple/Desktop/calorAI/mobile/services/ai.ts).

### 🌌 Day 2: Express Server, Database & AI Prompting
* **Morning (9:00 - 12:00)**: Study the Backend Server setup. Review [index.ts](file:///Users/apple/Desktop/calorAI/backend/src/index.ts), [auth.middleware.ts](file:///Users/apple/Desktop/calorAI/backend/src/middlewares/auth.middleware.ts), and routes. Practice explaining how JWT tokens are validated and how guest logins are handled.
* **Afternoon (13:30 - 17:00)**: Study AI Prompts and the Database Schema. Review [gemini.service.ts](file:///Users/apple/Desktop/calorAI/backend/src/services/gemini.service.ts) and [schema.sql](file:///Users/apple/Desktop/calorAI/backend/schema.sql) to understand the SQL table schema and how prompts are structured to ensure valid JSON responses.
* **Evening (18:30 - 21:00)**: Run mock interviews using the **50 Questions & Answers** in this guide. Practice explaining the system architecture and explaining why we made our specific tech stack choices.

