-- ====================================================
-- CalorAI PostgreSQL Database Schema (Supabase)
-- ====================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- USERS TABLE
CREATE TABLE IF NOT EXISTS public.users (
    id VARCHAR(255) PRIMARY KEY, -- Firebase Auth UID
    email VARCHAR(255) NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- FOODS CATALOG TABLE
CREATE TABLE IF NOT EXISTS public.foods (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    emoji VARCHAR(50) NOT NULL,
    image_url TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    calories INTEGER NOT NULL,
    protein INTEGER NOT NULL,
    carbs INTEGER NOT NULL,
    fat INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- USER SWIPE PREFERENCES TABLE
CREATE TABLE IF NOT EXISTS public.preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(255) REFERENCES public.users(id) ON DELETE CASCADE,
    food_id UUID REFERENCES public.foods(id) ON DELETE CASCADE,
    swipe_type VARCHAR(50) NOT NULL, -- 'like', 'dislike', 'superlike', 'unsure'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_food_swipe UNIQUE (user_id, food_id)
);

-- TASTE PROFILES CACHE TABLE
CREATE TABLE IF NOT EXISTS public.taste_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(255) REFERENCES public.users(id) ON DELETE CASCADE UNIQUE,
    profile_tags TEXT[] NOT NULL, -- e.g. ['Healthy Eater', 'Italian Lover']
    key_highlights TEXT[] NOT NULL,
    lifestyle VARCHAR(255) NOT NULL,
    fav_cuisines TEXT[] NOT NULL,
    statistics JSONB NOT NULL, -- e.g. { "likes": 12, "dislikes": 5, "superlikes": 2, "unsure": 1 }
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- AI MEAL RECOMMENDATIONS CACHE TABLE
CREATE TABLE IF NOT EXISTS public.recommendations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(255) REFERENCES public.users(id) ON DELETE CASCADE UNIQUE,
    breakfast JSONB NOT NULL, -- { "name": "...", "calories": 350, ... }
    lunch JSONB NOT NULL,
    dinner JSONB NOT NULL,
    snacks JSONB NOT NULL,
    alternatives JSONB NOT NULL, -- Array of healthy swaps
    weekly_plan JSONB NOT NULL, -- Array of days with meal plans
    cheat_meal JSONB NOT NULL,
    explanation TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- INDEXES FOR PERFORMANCE OPTIMIZATION
CREATE INDEX IF NOT EXISTS idx_preferences_user_id ON public.preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_foods_category ON public.foods(category);
CREATE INDEX IF NOT EXISTS idx_taste_profiles_user_id ON public.taste_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_user_id ON public.recommendations(user_id);
