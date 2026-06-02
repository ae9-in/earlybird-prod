# Vercel Deployment Guide: Early Bird (Next.js Version)

This guide outlines the steps to deploy the **Early Bird** landing page to Vercel and connect it to your **Neon Database**.

---

## 1. Vercel Deployment Settings

Since the project is structured as a monorepo with `frontend/` containing the Next.js application, you **must** configure the **Root Directory** settings in your Vercel Dashboard to compile and run the application correctly.

### Steps
1. **GitHub Connection**:
   - Go to [vercel.com](https://vercel.com) and click **"Add New"** > **"Project"**.
   - Import your repository: `https://github.com/ae9-in/earlybird-prod`.

2. **Project Configuration (CRITICAL)**:
   - **Framework Preset**: Choose **Next.js** (Vercel should auto-detect this once the Root Directory is set).
   - **Root Directory**: Set this to **`frontend`** (Click "Edit" next to Root Directory, select the `frontend` folder, and save).
   - **Build Command**: Leave as default (`npm run build`).
   - **Output Directory**: Leave as default (Next.js automatic `.next` directory).

3. **Environment Variables**:
   - Add the following variables under the project settings (see section below for details).

4. **Deploy**:
   - Click **"Deploy"**. Vercel will now enter the `frontend/` directory, resolve the `package.json` correctly, install dependencies, compile your 159 routes, and output the production build.

---

## 2. Environment Variables

Add these in the Vercel Dashboard under **Settings > Environment Variables** of your Vercel Project:

| Variable Name | Value Description |
| :--- | :--- |
| `VITE_NEON_DATABASE_URL` | Your Neon Connection String (e.g., `postgresql://neondb_owner:...`) |
| `VITE_SITE_URL` | Your production URL (e.g., `https://early-bird.vercel.app`) |

> [!NOTE]
> - Since this project supports database queries on the server side (SSR/ISR), these database variables are read securely at request time.
> - Ensure your database is accessible (see the Neon Database setup below).

---

## 3. Database Setup (Neon)

1. Open your **Neon Console**.
2. Go to the **SQL Editor**.
3. Copy and run the content of `backend/db_setup.sql` (to create `influencers` and `blog_posts` tables and indexes).
4. Go to **Dashboard** and copy your **Connection String**.
5. Save this connection string as `VITE_NEON_DATABASE_URL` in your Vercel Environment Variables.
