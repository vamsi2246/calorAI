# Demo Video Script - CalorAI Showcase

This script outlines a **2-minute video walkthrough** of CalorAI, designed to show recruiters a quick, engaging overview of the app's features and design.

---

## 🎬 Video Overview

* **Duration**: 2:00 minutes
* **Tone**: Energetic, professional, product-focused
* **Visual style**: iOS Simulator running CalorAI with smooth gestures and dark mode UI.

---

## ⏱️ Timeline & Script

### 1. Intro & Splash Screen (0:00 - 0:20)
* **Visual**: App opens on the device. The dark blue canvas shows the CalorAI salad bowl logo pulsing with a glowing cyan overlay. It automatically redirects to the onboarding tutorial.
* **Narrator Voiceover**:
  > *"Hi everyone! Welcome to CalorAI, a food taste profiling and meal recommendation app. The app opens with a dark, premium splash animation and takes us directly to our onboarding flow. Here, users get a quick breakdown of our Tinder-style swipe controls designed to map their preferences."*

### 2. Authentication & Guest Entry (0:20 - 0:40)
* **Visual**: Tap the 'Start Swiping' button. The login screen appears. Tap 'Continue as Guest'. A loading spinner pulses, and the card swiper fades in.
* **Narrator Voiceover**:
  > *"We support full email authentication, Google Login, and anonymous Guest sessions. Let's continue as a guest. The app authenticates immediately and drops us into the main food swiping screen."*

### 3. Food Swiping Gestures (0:40 - 1:15)
* **Visual**: Swipe a few cards:
  * Swipe Avocado right (Like) -> card slides out with a rotation.
  * Swipe Pizza left (Dislike) -> card slides out left.
  * Swipe Salmon up (Super Like) -> card flies off the top.
  * Tap the footer buttons (❌, ❓, ⭐, ❤️) to show they trigger the same animations.
  * Tap 'Undo' -> the last swiped card flies back into the deck.
  * Type "Broccoli" in the search bar -> the deck filters instantly.
* **Narrator Voiceover**:
  > *"This is our core swipe deck. We use React Native Gesture Handler and Reanimated to run 60 FPS transitions directly on the native thread. Users can swipe in four directions or use the custom buttons below. Made a mistake? Just tap 'Undo' to bring the card back. We can also filter the deck by cuisines, search for specific foods, or sort by high-protein options."*

### 4. Taste Profile Generation (1:15 - 1:40)
* **Visual**: The progress bar reaches 100%. The "Generate AI Taste Profile" button slides up at the bottom. Tap it. The screen shows a brief glass loading loader, then transitions to the Taste Profile tab.
* **Narrator Voiceover**:
  > *"Once we complete 15 swipes, the progress bar fills, unlocking our AI generator. Tapping the button compiles our choices and sends them to the Google Gemini API. This returns a profile detailing our lifestyle archetype, cuisine preferences, and macro statistics."*

### 5. AI Meal Recommendations & Outro (1:40 - 2:00)
* **Visual**: Switch to the 'AI Plans' tab. Scroll down to show today's ideal breakfast/lunch/dinner, healthy alternatives, and the weekly calendar.
* **Narrator Voiceover**:
  > *"Switching to our meal plans, the AI generates a customized menu for the week, complete with breakfast, lunch, and dinner. It also recommends healthy swaps for our dislikes, like replacing French Fries with Baked Sweet Potato. Thank you for watching!"*
