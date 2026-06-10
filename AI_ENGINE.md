# AI Recommendation Engine - CalorAI

This document outlines the AI integration architecture, prompt design patterns, and local scoring models used in CalorAI.

---

## 🤖 AI Profiling & Recommendation Flow

```
                      [ User Swipes Data Array ]
                                   │
                                   ▼
                      [ Express Backend Server ]
                                   │
                      (Check Gemini API Key status)
                                   │
                 ┌─────────────────┴─────────────────┐
                 ▼ Key Present                       ▼ Key Missing / Error
        [ Google Gemini API ]                [ Local Rule Engine ]
        - Model: gemini-1.5-flash            - Macro averaging algorithms
        - Returns structured JSON            - Cuisine frequency analysis
        - High-quality reasoning             - Outputs fallback profile
                 │                                   │
                 └─────────────────┬─────────────────┘
                                   │
                                   ▼
                      [ Supabase SQL Database ]
                     (Caches Taste Profile & Plans)
                                   │
                                   ▼
                       [ Mobile Client View ]
```

---

## ✍️ Prompt Design & Structural Validation

We use structured prompt engineering to ensure the Gemini API returns valid JSON without markdown formatting, which prevents parsing errors.

### Prompt Template structure:
```
You are an expert food nutritionist AI.
Analyze the user's food preferences:
Liked/Superliked foods: [Foods data payload]
Disliked foods: [Foods data payload]
Unsure foods: [Foods data payload]

Return a JSON object containing:
{
  "profileTags": string[],
  "keyHighlights": string[],
  "lifestyle": string,
  "favCuisines": string[],
  "statistics": { "likes": number, ... }
}
Do not wrap response in markdown. Return raw JSON only.
```

---

## 🧮 Local Scoring Algorithms

When the Gemini API key is missing or calls fail, CalorAI relies on a local, rule-based profiling model:

### 1. Macro Averaging
The engine calculates the average macronutrient densities of liked and superliked foods:
$$\text{Average Protein} = \frac{\sum_{i=1}^{N} \text{Protein}_i}{N}$$
$$\text{Average Calories} = \frac{\sum_{i=1}^{N} \text{Calories}_i}{N}$$

* **Archetype Assignment**:
  * If $\text{Average Protein} > 18\text{g}$, the user is tagged as **"Protein Focused"** (Lifestyle: **"Fitness Enthusiast"**).
  * If $\text{Average Calories} < 180\text{ kcal}$, the user is tagged as a **"Healthy Eater"**.

### 2. Cuisine & Category Counts
The local engine tracks cuisine frequencies:
* If a category count is $\ge 2$ (e.g. Italian, Indian, Desserts), the user is tagged with the corresponding profile tag (e.g. **"Italian Food Lover"**).

---

## 📊 Cloud vs. On-Device Feature Comparison

| Feature | Cloud Mode (Gemini API) | Local Mode (Rule Engine) |
| --- | --- | --- |
| **Response Latency** | 1.5 - 3.0 seconds | Instant (< 50ms) |
| **Personalization** | High (Contextual reasoning) | Medium (Rule-based) |
| **Cost** | API usage cost | Free |
| **Resilience** | Requires network connectivity | Works offline |
