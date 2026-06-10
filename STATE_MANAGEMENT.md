# State Management Architecture - CalorAI

This document outlines the state architecture, stores schemas, and data synchronization flows designed for CalorAI.

---

## 🏬 Global State Engine (Zustand)

We use **Zustand** to manage client-side state because of its performance, simple boilerplate, and selector-based re-rendering.

```
       ┌───────────────────────────────────────────────────┐
       │                 Zustand Store                     │
       │                                                   │
       │  [User Profile]       [Filters]     [Swipe Lists] │
       │  - user (UID, email)  - search      - liked       │
       │  - profileTags        - category    - disliked    │
       │  - recommendations    - sortBy      - superliked  │
       │                                     - unsure      │
       └─────────────────────────┬─────────────────────────┘
                                 │
                 Updates trigger │ locally on user gesture
                                 ▼
       ┌───────────────────────────────────────────────────┐
       │            History Buffer Management              │
       │                                                   │
       │   [swipeHistory Array]  ◄──►  [redoHistory Array]  │
       │   (Undo pops here)             (Redo pushes here)  │
       └─────────────────────────┬─────────────────────────┘
                                 │
                   Dispatches API│ request asynchronously
                                 ▼
       ┌───────────────────────────────────────────────────┐
       │                React Query Sync                   │
       │         (Axios REST mutations to server)          │
       └───────────────────────────────────────────────────┘
```

---

## 🗃️ Store Schema Details

The Zustand store tracks state in the following structures:

### 1. Preference Lists
* `likedFoods`: Array of string food IDs that the user liked.
* `dislikedFoods`: Array of string food IDs that the user disliked.
* `superLikedFoods`: Array of string food IDs that the user superliked.
* `unsureFoods`: Array of string food IDs that the user marked as unsure.

### 2. History Stacks
* `swipeHistory`: Array of `{ foodId: string; type: SwipeType }` objects.
* `redoHistory`: Array of `{ foodId: string; type: SwipeType }` objects containing undone actions.

---

## 🛠️ Core State Operations

### 1. Swiping Action (`swipeFood`)
Logs the swipe event, updates the appropriate preference list, adds the event to `swipeHistory`, and clears the `redoHistory` stack to keep the timeline consistent.

### 2. Undo Action (`undoLastSwipe`)
Retrieves the last swipe event from the history:
1. Pops the last action from `swipeHistory`.
2. Removes the food ID from its associated preference list (e.g. `likedFoods`).
3. Pushes the action onto `redoHistory` to allow for a Redo.

### 3. Redo Action (`redoSwipe`)
Re-applies the next action from the redo stack:
1. Pops the next action from `redoHistory`.
2. Adds the food ID back to its associated preference list.
3. Pushes the action back onto `swipeHistory`.

### 4. Reset Action (`resetSwipes`)
Clears all preference lists, resets history stacks, and removes cached AI profiles and recommendations to start fresh.

---

## 🔄 Syncing with the Backend API

We separate UI updates from database writes to keep the user experience smooth:
* **Immediate Local Update**: When a user swipes, the card is immediately added to the Zustand store, keeping card transitions lag-free.
* **Asynchronous API Call**: In the background, React Query triggers `useSavePreference` which uses Axios to send the swipe event to the Express server.
* **Resilient Offline Fallback**: If the API write fails due to a network issue, the app logs a warning and relies on the local state, preventing connection drops from interrupting the user experience.
