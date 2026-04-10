# Vercel Deployment Guide: Early Bird

This guide outlines the steps to deploy the **Early Bird** landing page to Vercel and connect it to your **Neon Database**.

## 1. Vercel Deployment

### Steps
1. **GitHub Connection**:
   - Go to [vercel.com](https://vercel.com) and click **"Add New"** > **"Project"**.
   - Import your repository: `https://github.com/ae9-in/earlybird-prod`.

2. **Project Configuration**:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

3. **Environment Variables**:
   - Add the following variables (see section below for details).

4. **Deploy**:
   - Click **"Deploy"**. Vercel will build the frontend and provide you with a production URL.

---

## 2. Environment Variables

Add these in the Vercel Dashboard under **Settings > Environment Variables**.

| Variable Name | Value Description |
| :--- | :--- |
| `VITE_NEON_DATABASE_URL` | Your Neon Connection String (e.g., `postgres://user:pass@host/db?sslmode=require`) |
| `VITE_SITE_URL` | Your production URL (e.g., `https://early-bird.vercel.app`) |

> [!NOTE]
> Since this is a Vite project, variables must be prefixed with `VITE_` to be accessible in the frontend code.

---

## 3. Database Setup (Neon)

1. Open your **Neon Console**.
2. Go to the **SQL Editor**.
3. Copy and run the content of `earlybird_schema.sql` (found in the root directory).
4. Go to **Dashboard** and copy your **Connection String**.
5. Use this Connection String in the `VITE_NEON_DATABASE_URL` environment variable.

---

## 4. (Optional) Backend Integration
If you wish to handle form submissions (Waitlist/Partner) directly:
- Use **Vercel Serverless Functions** by creating an `api/` directory in the root.
- Use a library like `pg` or `postgres` to connect to Neon using the `VITE_NEON_DATABASE_URL`.
