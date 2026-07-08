# ESTARR APP - OAuth Setup Guide

To enable GitHub and LinkedIn synchronization, follow these steps to configure your developer applications.

## 1. GitHub Configuration
1. Sign in to your [GitHub Developer Settings](https://github.com/settings/developers).
2. Navigate to **OAuth Apps** > **New OAuth App**.
3. **Application Name**: ESTARR APP
4. **Homepage URL**: `https://estarrapp.com`
5. **Authorization callback URL**: `https://estarrapp.com/auth/github/callback`
6. Click **Register application**.
7. Generate a **Client Secret**.
8. **Credentials to use**:
   - **Client ID**: `Ov23lioYvK31f64paons`
   - **Client Secret**: `f17ced66672e819d8a874033e5c29dadf60004f7`

---

## 2. LinkedIn Configuration
1. Go to the [LinkedIn Developer Portal](https://www.linkedin.com/developers/).
2. Click **Create App** and follow the prompts.
3. Under the **Products** tab, request access to **"Sign In with LinkedIn using OpenID Connect"**.
4. Under **Auth**, add the **Authorized Redirect URL**: `https://estarrapp.com/auth/linkedin/callback`
5. **Credentials to use**:
   - **Client ID**: `77ekke32ko05bu`
   - **Client Secret**: `WPL_AP1.DL6t6MTwtp0Vli8t.52QI3g==`

---

## 3. Apply Credentials to AI Studio
Once you have the IDs and Secrets, you must add them to your environment variables in AI Studio:

1. Open the **Settings** menu in AI Studio.
2. Go to **Secrets** or **Environment Variables**.
3. Add the following keys and their respective values:
   - `GITHUB_CLIENT_ID`
   - `GITHUB_CLIENT_SECRET`
   - `LINKEDIN_CLIENT_ID`
   - `LINKEDIN_CLIENT_SECRET`
   - `APP_URL=https://estarrapp.com`

---

## Technical Note for Iframe Compatibility
The application uses `window.postMessage` to communicate between the OAuth popup and the main window. This ensures compatibility with the AI Studio preview environment.

**Callback Routes implemented in `server.ts`**:
- GitHub: `/auth/github/callback`
- LinkedIn: `/auth/linkedin/callback`
