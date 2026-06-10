# Deployment Guide - CalorAI

This document provides step-by-step instructions for deploying the CalorAI backend server, database, and mobile application to production.

---

## 🗄️ 1. Database Setup (Supabase)

1. Go to the [Supabase Dashboard](https://supabase.com) and create a new project.
2. In your project, navigate to the **SQL Editor** tab.
3. Paste the contents of the database schema file [schema.sql](file:///Users/apple/Desktop/calorAI/backend/schema.sql) into the SQL editor and click **Run**.
4. Navigate to **Project Settings** -> **API** to retrieve your **Project URL** and **Anon Key**. You will need these for your environment variables.

---

## 🖥️ 2. Backend Server Deployment (Render)

We use Render to host our Express API server.

1. Create a [Render account](https://render.com).
2. Click **New** -> **Web Service** and connect your GitHub repository.
3. Configure the service settings:
   * **Name**: `calor-ai-backend`
   * **Environment**: `Node`
   * **Root Directory**: `backend`
   * **Build Command**: `npm install && npm run build`
   * **Start Command**: `npm start`
4. Add the following **Environment Variables** in the Render settings:
   * `PORT`: `10000`
   * `SUPABASE_URL`: *Your Supabase URL*
   * `SUPABASE_KEY`: *Your Supabase Service Role Key*
   * `GEMINI_API_KEY`: *Your Google Gemini API Key*
   * `FIREBASE_PROJECT_ID`: *Your Firebase Project ID*
5. Click **Deploy Web Service**. Render will build and host your server at a URL like `https://calor-ai-backend.onrender.com`.

---

## 📱 3. Mobile App Deployment (Expo EAS)

We use Expo Application Services (EAS) to compile our React Native application.

### Prerequisites
Install the EAS CLI globally:
```bash
npm install -g eas-cli
```
Log in to your Expo account:
```bash
eas login
```

### Build Configuration
1. Initialize EAS in the mobile directory:
   ```bash
   cd mobile
   eas build:configure
   ```
   This generates an `eas.json` file.
2. Add your production environment variables to your Expo project dashboard under **Secrets** or in `eas.json`:
   * `EXPO_PUBLIC_BACKEND_URL`: *Your deployed Render server URL (e.g. `https://calor-ai-backend.onrender.com/api`)*
   * `EXPO_PUBLIC_FIREBASE_API_KEY`: *Your Firebase Web API Key*
   * `EXPO_PUBLIC_FIREBASE_PROJECT_ID`: *Your Firebase Project ID*

### Build the App
Compile binaries for distribution:
* **For Android (APK)**:
  ```bash
  eas build --platform android --profile preview
  ```
* **For iOS (Simulator Build)**:
  ```bash
  eas build --platform ios --profile preview
  ```
* **Submit to App Stores (App Store / Google Play)**:
  ```bash
  eas build --platform all
  ```
EAS builds the binaries on cloud servers, providing a QR code and URL to download the installable app once complete.
