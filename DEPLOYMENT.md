# Production Deployment Guide - CalorAI

This document provides step-by-step instructions to deploy the CalorAI database schema, backend API server, and mobile application to production hosting providers.

---

## 🗄️ 1. Database Setup (Supabase Cloud)

We use Supabase as our PostgreSQL engine.

### Step-by-Step Provisioning:
1. Navigate to [Supabase](https://supabase.com) and log in.
2. Click **New Project** and select your organization.
3. Configure your project credentials:
   * **Name**: `CalorAIDB`
   * **Database Password**: *Set a secure password*
   * **Region**: Choose a region close to your target users
4. Wait for the database instance to launch (approx. 2 minutes).
5. Navigate to the **SQL Editor** tab in the left sidebar menu.
6. Click **New Query** to open an editor console.
7. Paste the schema contents from [schema.sql](file:///Users/apple/Desktop/calorAI/backend/schema.sql) into the SQL editor and click **Run**.
8. Verify that tables (`users`, `foods`, `preferences`, `taste_profiles`, `recommendations`) are successfully created by checking the **Table Editor** tab.
9. To seed the catalog database with the 150 food items, run the seeding scripts or use the backend seed endpoint.
10. Navigate to **Project Settings** (gear icon) -> **API** to retrieve:
    * **Project URL**: Under *API Settings* (e.g. `https://xxx.supabase.co`)
    * **Service Role API Key**: Under *Project API Keys* (keep this secure, do not share it)

---

## 🖥️ 2. Backend API Deployment (Render Cloud)

We use Render to host the Node.js Express server.

### Step-by-Step Server Setup:
1. Register or log in to [Render](https://render.com).
2. Click the **New +** button in the top navigation and select **Web Service**.
3. Connect your GitHub repository.
4. Set the following configurations:
   * **Name**: `calor-ai-backend`
   * **Environment**: `Node`
   * **Region**: Match your database region
   * **Branch**: `main`
   * **Root Directory**: `backend`
   * **Build Command**: `npm install && npm run build`
   * **Start Command**: `npm start`
5. Click **Advanced** to expand options and add the following **Environment Variables**:
   * `PORT`: `10000`
   * `SUPABASE_URL`: *Your Supabase Project URL*
   * `SUPABASE_KEY`: *Your Supabase Service Role Key*
   * `GEMINI_API_KEY`: *Your Google Gemini API Key*
   * `FIREBASE_PROJECT_ID`: *Your Firebase Project ID*
6. Set **Auto Deploy** to `Yes` if you want automatic deployments when pushes hit your main branch.
7. Click **Create Web Service**.
8. Render will pull, compile, and launch the server. Note the generated service URL (e.g. `https://calor-ai-backend.onrender.com`).

---

## 📱 3. Mobile Frontend Deployment (Expo EAS)

We use Expo Application Services (EAS) to compile native Android APK/AAB and iOS IPA packages.

### Step-by-Step Mobile Compilation:

#### Step 1: Install EAS CLI
Install the command line interface globally:
```bash
npm install -g eas-cli
```

#### Step 2: Authenticate with Expo
Log in to your Expo account:
```bash
eas login
```

#### Step 3: Link Project to EAS
Run the linking wizard from the `/mobile` directory:
```bash
cd mobile
eas project:init
```

#### Step 4: Configure the Build Profile
EAS uses an `eas.json` file to manage build configurations. Ensure your file is configured with the target platforms:
```json
{
  "cli": {
    "version": ">= 9.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {}
  }
}
```

#### Step 5: Add Secret Environment Variables
In your Expo project dashboard under **Secrets** (or inside your EAS profile), set the following keys:
* `EXPO_PUBLIC_BACKEND_URL`: `https://calor-ai-backend.onrender.com/api`
* `EXPO_PUBLIC_FIREBASE_API_KEY`: *Your Firebase Web API Key*
* `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN`: *Your Firebase Domain URL*
* `EXPO_PUBLIC_FIREBASE_PROJECT_ID`: *Your Firebase Project ID*
* `EXPO_PUBLIC_FIREBASE_APP_ID`: *Your Firebase App ID*

#### Step 6: Trigger the Build
Run the build command for your target platforms:
* **For Android (AAB for Google Play Store)**:
  ```bash
  eas build --platform android --profile production
  ```
* **For Android (APK for testing)**:
  ```bash
  eas build --platform android --profile preview
  ```
* **For iOS (Apple App Store)**:
  ```bash
  eas build --platform ios --profile production
  ```
* **For iOS Simulator testing**:
  ```bash
  eas build --platform ios --profile preview
  ```

Once compilation completes, EAS will provide installable packages or QR codes to download the build directly.
