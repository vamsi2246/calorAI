# Demo Video Script - CalorAI Showcase

This script outlines a **2-minute showcase walk-through** of CalorAI. It details both visual cues (screen actions) and corresponding audio scripts (narrator voiceover).

---

## 🎬 Video Timeline & Screen Flow

| Time | Visual / Screen Action | Audio / Narrator Script |
| --- | --- | --- |
| **0:00 - 0:15** | **App Opening**: Show the emulator screen launching CalorAI. The Splash logo pulses with a cyan neon circular glow, then transitions to the onboarding welcome screen. | *"Hello everyone, I'm excited to present CalorAI: an AI-driven food taste profiling and meal recommendation mobile app designed to take the friction out of nutrition tracking."* |
| **0:15 - 0:30** | **Onboarding Welcome**: The welcome tutorial shows the swiping gesture instructions. The user clicks the **'Start Swiping'** button. | *"Standard calorie counters force users to manually log every meal, which introduces high friction and leads to high drop-off. CalorAI solves this by turning preference profiling into an interactive game. Let's get started."* |
| **0:30 - 0:45** | **Auth Login**: The login screen displays email inputs and social login buttons. The user taps **'Continue as Guest'** to log in anonymously. | *"We support secure authentication, including anonymous Guest login, so users can test the swiping mechanics immediately without immediate sign-up barriers."* |
| **0:45 - 1:10** | **Food Swiping Deck**: The Tinder-style card deck is displayed. The user performs swipes: swipe right (Like), swipe left (Dislike), swipe up (Super Like), and swipe down (Unsure). The user also uses the undo button to retrieve a card. | *"Here is our core swipe deck. Using React Native Gesture Handler and Reanimated, we run card gestures at 60 frames per second on native threads. Users swipe right to like, left to dislike, up to superlike, or down if unsure. Footer buttons trigger the same animations, and the 'Undo' button allows retrieving mistakes."* |
| **1:10 - 1:25** | **Taste Profile**: The swiping progress bar reaches 100%. The user clicks **'Generate AI Taste Profile'**. The screen transitions to the Taste Profile tab, displaying highlights, lifestyle tags, and stats. | *"As cards are swiped, we calculate macro densities behind the scenes. Once the progress bar fills, the AI engine processes these logs to determine the user's lifestyle archetype (e.g., Clean Eater) and favorite cuisines."* |
| **1:25 - 1:40** | **AI recommendations**: Switch to the **'AI Plans'** tab. Scroll through the recommended meals for Breakfast, Lunch, Dinner, and Snacks. Show the "Healthy Swaps" section. | *"CalorAI then builds a tailored weekly meal plan based on the user's profile, recommending healthy alternatives for their dislikes (e.g., swapping French Fries for Baked Sweet Potato) and explaining the nutritional reasoning behind each choice."* |
| **1:40 - 1:55** | **Architecture & Backend**: Open the terminal to show the backend log console. Highlight the Express server routing logs and the database connection status. | *"Under the hood, we have a TypeScript Node.js backend using Express router controls and a Supabase database catalog. We communicate with the Google Gemini API to generate taste profiles, fallback to local profiling when offline."* |
| **1:55 - 2:00** | **Professional Outro**: Display the repo homepage on screen with contact links. | *"CalorAI demonstrates a clean tech stack and a premium mobile experience. Thank you for your time, and I look forward to your feedback!"* |
