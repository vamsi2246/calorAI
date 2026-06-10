# Design System Specifications - CalorAI

This document outlines the visual tokens, typography hierarchies, card metrics, and animation dynamics designed to replicate the Apple Fitness inspired dark premium aesthetic.

---

## 🎨 1. Color Palette

Our theme relies on deep dark base surfaces with bright neon accent glow lines.

* **Primary Background**: `#0B0F19` (Deep Obsidian Blue)
* **Surface Backgrounds**:
  * Glass Card: `rgba(30, 41, 59, 0.65)` (`#1E293B` with 65% opacity)
  * Header Panel: `rgba(15, 23, 42, 0.75)` (`#0F172A` with 75% opacity)
* **Accent Colors**:
  * Cyan (Action/Active): `#06B6D4`
  * Emerald (Like/Positive): `#10B981`
  * Rose (Dislike/Negative): `#F43F5E`
  * Indigo (Brand/Super Like): `#6366F1`
  * Amber (Warning/Cheat Meal): `#F59E0B`
* **Typography Colors**:
  * Primary Text: `#F8FAFC` (Slate Light)
  * Secondary Text: `#94A3B8` (Slate Gray)
  * Contrast Text: `#0F172A` (Slate Dark)
* **Borders**:
  * Glass Border: `rgba(255, 255, 255, 0.08)`

---

## ✍️ 2. Typography

We leverage standard system fonts (`System`) styled with weight variations to match Apple Fitness layouts.

| Class Name | Font Size | Font Weight | Color Token | Line Height |
| --- | --- | --- | --- | --- |
| **Splash Title** | 40px | 900 (Black) | `#F8FAFC` | 48px |
| **Welcome Header**| 44px | 900 (Black) | `#F8FAFC` | 52px |
| **Section Header**| 18px | 700 (Bold) | `#F8FAFC` | 24px |
| **Card Name** | 20px | 700 (Bold) | `#F8FAFC` | 26px |
| **Macro Values**  | 16px | 700 (Bold) | `#F8FAFC` | 20px |
| **Body Details**  | 13px | 500 (Medium) | `#94A3B8` | 18px |
| **Utility Badges**| 11px | 600 (Semibold)| `#6366F1` | 14px |

---

## 🎴 3. Card Styles & Border Radii

* **Food Card Dimensions**: Width: 85% of screen width; Height: `440px`.
* **Sub-card Scale**: `0.95` scale factor for depth preview when behind the active card.
* **Border Radii**:
  * Outer Food Card: `24px`
  * Glass details drawer: `18px`
  * Control Action buttons: `27px` (circular `54px` diameter)
  * UI Tags & Badges: `12px` to `16px`
* **Glow & Shadow Effects**:
  * Outer Glass card uses a shadow offset of `(0, 8)`, opacity `0.25`, and blur radius `16px`.
  * Active glow cards utilize accent colors for shadow matching (e.g. Cyan/Indigo glowing filters).

---

## 🔘 4. Button & Icon Styles

* **Primary Pill CTA**: Height `58px`, radius `29px`, background `#10B981` (Emerald) or `#06B6D4` (Cyan).
* **Control Circle Buttons**: Circular `54px` diameter buttons with a `2.5px` border width. Colors match the swiping vectors (Rose for No, Emerald for Yes, Indigo for Super Like, Slate Gray for Unsure).
* **Utility Badges**: Text overlays with a background opacity of `10%` to `15%` of the accent color and a `1px` border matching the accent color.

---

## 📐 5. Spacing System

Our layout follows a standard spacing system based on multipliers of 4px:

* **Horizontal Padding**: `20px` to `24px` for screen boundary gutters.
* **Component Gaps**:
  * Swiper vertical margin: `16px` to `24px` spacing.
  * Card interior items: `12px` to `16px` gaps.
  * Form inputs: `16px` spacing.

---

## 🎬 6. Animation Specs (Reanimated Curves)

* **Spring Transitions**: Used for card centering and swipe release springs.
  * Stiffness: `80` to `120`
  * Damping: `12` to `18`
* **Timing Transitions**: Used for swipe completions and navigation redirects.
  * Swipe timing: Duration `250ms`, Easing curve: `Ease-out`
  * Loading pulses: Duration `800ms` looping from opacity `0.3` to `0.8`.
