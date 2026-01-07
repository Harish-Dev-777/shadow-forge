# Deployment Guide for Shadow Forge

This document indicates how to deploy the Shadow Forge application to Vercel.

## 1. Deploy Convex Backend

Before deploying the frontend, ensure your Convex backend is running in production.

1.  Open your terminal in the project root.
2.  Run the deployment command:
    ```bash
    npx convex deploy
    ```
3.  This command will guide you to set up a production deployment on Convex.
4.  Once finished, it will display your **Production Deployment URL** (e.g., `https://your-project.convex.cloud`).
    - _Keep this URL handy for the next step._
5.  **Important**: Since you are using `@convex-dev/resend`, go to your [Convex Dashboard](https://dashboard.convex.dev), select your project, go to **Settings** -> **Environment Variables**, and ensure `RESEND_API_KEY` is set.

## 2. Deploy Frontend to Vercel

1.  **Push your code** to a Git provider (GitHub, GitLab, or Bitbucket).
2.  **Log in to Vercel** and click **"Add New..."** -> **"Project"**.
3.  **Import** the repository you just pushed.
4.  **Configure Project**:
    - **Framework Preset**: Select `Vite` (it should trigger automatically).
    - **Root Directory**: `./` (default).

5.  **Environment Variables**:
    You MUST add the following environment variables in the Vercel dashboard before clicking Deploy.

    | Variable Name     | Value                                     | Description                                 |
    | :---------------- | :---------------------------------------- | :------------------------------------------ |
    | `VITE_CONVEX_URL` | `https://...`                             | The URL from Step 1 (Convex Production URL) |
    | `GEMINI_API_KEY`  | `AIzaSyCRLFX2FCydER8DUrMKpsjy4oFo_YXCr40` | Your Google Gemini API Key                  |

    _Note: The Gemini API Key is required for the application's AI features._

6.  **Deploy**:
    - Click **Deploy**.
    - Wait for the build to complete.

## 3. Post-Deployment Checks

- Visit the deployed URL.
- Check the browser console (F12) to ensure there are no connection errors to Convex.
- Test the functionality that relies on the Gemini API to ensure the key is correctly loaded.

## Troubleshooting

- **Error: "Env variable not found"**: Ensure you added the variables _exactly_ as named above. If you added them after the deployment started, you must **Redeploy** (Go to Deployments -> specific deployment -> Redeploy) for changes to take effect.
- **Convex Connection Error**: Verify `VITE_CONVEX_URL` matches your Convex production deployment, not your local dev instance.
