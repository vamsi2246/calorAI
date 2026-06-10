# Component Architecture Guide - CalorAI

This guide documents the reusable UI components implemented in CalorAI, detailing props, local state, animation hooks, and accessibility characteristics.

---

## 🧭 Directory Summary

```
mobile/components/
├── CardStack.tsx        # Gesture controller stack matching Tinder interactions
├── FoodCard.tsx         # Displays food emojis, images, and macros
├── GlassView.tsx        # Reusable container for glassmorphism panels
└── SkeletonLoader.tsx   # Pulse card loader for page loading states
```

---

## 📦 Component Specifications

### 1. GlassView (`GlassView.tsx`)
A custom layout wrapper implementing semi-transparent overlays, borders, and shadows to simulate glassmorphism.

* **Props**:
  * `borderRadius` (number, optional, default: `20`): Card radius.
  * `borderColor` (string, optional, default: `rgba(255, 255, 255, 0.08)`): Highlight border color.
  * `backgroundColor` (string, optional, default: `rgba(30, 41, 59, 0.65)`): Backdrop fill color.
  * `glow` (boolean, optional, default: `false`): Applies neon glow drop-shadows.
  * Extends standard React Native `ViewProps` (supports `style`, `children`, etc.).
* **Styling Principles**: Uses native shadows (`elevation` on Android, `shadowColor` / `shadowRadius` on iOS) coupled with transparent border widths to avoid visual issues across platforms.

---

### 2. SkeletonLoader (`SkeletonLoader.tsx`)
A placeholder component that uses looping opacity animations to indicate loading states.

* **Animation Mechanics**: Utilizes a Reanimated shared value `opacity` looping infinitely between `0.3` and `0.8`:
  ```ts
  opacity.value = withRepeat(
    withSequence(
      withTiming(0.8, { duration: 800 }),
      withTiming(0.3, { duration: 800 })
    ),
    -1,
    true
  );
  ```
* **Performance**: The animation is executed entirely on the native UI thread, preventing main JS thread load.

---

### 3. FoodCard (`FoodCard.tsx`)
A card component that displays a food item's metrics, category tags, and macronutrients.

* **Props**:
  * `item` (FoodItem, required): The target food data payload containing calorie and macro information.
* **Layout Design**: Uses an absolute cover image with a `rgba(11, 15, 25, 0.4)` overlay to keep text readable. The details drawer is wrapped in a `GlassView` container at the bottom.
* **Accessibility**: Implements readable contrast ratios, using bold colored numbers for macros to help low-vision readers.

---

### 4. CardStack (`CardStack.tsx`)
Manages the card stack layout, captures pan gestures, and triggers swipe animations.

* **Props**:
  * `data` (FoodItem[], required): The list of foods remaining in the deck.
  * `onSwipe` (function, required): Callback triggered when a card is swiped.
  * `onEmpty` (function, required): Callback triggered when the deck is cleared.
* **Local State**: `currentIndex` (tracks the index of the active card).
* **Worklets & Refs**: Exposes a ref pointer `CardStackRef` with a `swipe(direction)` method. This allows parent views (like screen footers) to trigger timing translations in any swipe direction.
