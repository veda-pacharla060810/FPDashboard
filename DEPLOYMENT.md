# Future Physicians — Deployment Guide

Complete instructions for deploying to GitHub Pages + Supabase.

---

## Folder Structure

```
future-physicians/
├── index.html                  ← Root redirect (auth → dashboard)
├── 404.html                    ← GitHub Pages custom 404
├── schema.sql                  ← Run once in Supabase SQL Editor
├── DEPLOYMENT.md               ← This file
│
├── css/
│   ├── global.css              ← Design system + all shared styles
│   └── auth.css                ← Auth page styles
│
├── js/
│   ├── supabase-client.js      ← ⚠️ Add your credentials here
│   ├── sidebar.js              ← Sidebar nav renderer
│   └── utils.js                ← Shared utilities
│
└── pages/
    ├── login.html
    ├── register.html
    ├── reset-password.html
    ├── dashboard.html           ← Member dashboard
    ├── events.html              ← Member event browser
    ├── volunteer-hours.html     ← Member hours tracker
    ├── announcements.html       ← Member announcements
    ├── attendance.html          ← Member attendance history
    ├── profile.html             ← Shared profile (member + admin)
    ├── admin-dashboard.html     ← Admin overview
    ├── admin-events.html        ← Admin event CRUD
    ├── admin-announcements.html ← Admin announcement CRUD
    ├── admin-hours.html         ← Admin hours review
    └── admin-users.html         ← Admin user management
```

---

## Step 1 — Supabase Setup

### 1A. Create Supabase Project
1. Go to https://supabase.com and sign in.
2. Click **New project** and fill in the details.
3. Wait for provisioning to complete.

### 1B. Configure Authentication
1. In your Supabase dashboard, go to **Authentication → Providers**.
2. Ensure **Email** provider is enabled.
3. Under **Authentication → URL Configuration**, set:
   - **Site URL**: `https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO_NAME`
   - **Redirect URLs**: Add `https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO_NAME/pages/reset-password.html`
4. Save changes.

### 1C. Run the Database Schema
1. In the Supabase dashboard, go to **SQL Editor**.
2. Click **New query**.
3. Copy the entire contents of `schema.sql` and paste it.
4. Click **Run** (or Ctrl+Enter).
5. You should see "Success" for all statements.

### 1D. Get Your API Keys
1. Go to **Settings → API** in your Supabase dashboard.
2. Copy:
   - **Project URL** (looks like `https://abc123.supabase.co`)
   - **anon public** key (a long JWT string)

---

## Step 2 — Configure Your Credentials

Open `js/supabase-client.js` and replace the placeholder values:

```js
const SUPABASE_URL = 'https://YOUR_PROJECT_REF.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY_HERE';
```

Replace with your actual values. Example:

```js
const SUPABASE_URL = 'https://xyzabc123.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

**Security note:** The anon key is safe to expose in frontend code. It has Row Level Security protecting your data. Never expose your `service_role` key.

---

## Step 3 — GitHub Pages Deployment

### 3A. Push to GitHub
```bash
# If starting fresh
git init
git add .
git commit -m "Initial Future Physicians platform commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main

# If repo already exists
git add .
git commit -m "Add Future Physicians platform"
git push
```

### 3B. Enable GitHub Pages
1. Go to your repository on GitHub.
2. Click **Settings → Pages**.
3. Under **Source**, select **Deploy from a branch**.
4. Set branch to `main` and folder to `/ (root)`.
5. Click **Save**.
6. Wait 1–2 minutes. Your site will be live at:
   `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

### 3C. Update Supabase Redirect URLs
After your site is live, go back to Supabase → Authentication → URL Configuration and update:
- **Site URL**: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`
- **Redirect URL**: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/pages/reset-password.html`

---

## Step 4 — Create the First Admin

After deploying, you need to manually promote a user to admin:

1. **Register** a new account at your site's `/pages/register.html`
2. Open **Supabase → SQL Editor**
3. Run:
   ```sql
   UPDATE public.profiles
   SET role = 'admin'
   WHERE email = 'your-email@example.com';
   ```
4. Sign in again — you'll be redirected to the Admin Dashboard.

---

## Step 5 — Seed Data (Optional)

The `schema.sql` includes a seed block that auto-populates sample events and announcements **once an admin exists**. To trigger it after creating your admin:

```sql
-- Re-run the seed block from schema.sql, or manually insert:
DO $$
DECLARE admin_id UUID;
BEGIN
  SELECT id INTO admin_id FROM public.profiles WHERE role = 'admin' LIMIT 1;
  -- (seed inserts follow)
END $$;
```

Or just create events and announcements through the Admin Dashboard.

---

## Local Development

Since this project uses no build tools, you can run it locally with any static file server:

**Option A — Python (built-in)**
```bash
cd future-physicians
python3 -m http.server 8080
# Open: http://localhost:8080
```

**Option B — Node http-server (optional)**
```bash
npx http-server . -p 8080 -c-1
# Open: http://localhost:8080
```

**Option C — VS Code Live Server**
Install the "Live Server" extension, right-click `index.html` → Open with Live Server.

> **Note:** ES module imports (`type="module"`) require a server; opening HTML files directly from the filesystem (`file://`) will cause CORS errors. Always use a local server.

---

## Troubleshooting

| Problem | Solution |
|---|---|
| White screen / no redirect | Check browser console for import errors. Verify your Supabase URL and anon key are set correctly in `js/supabase-client.js`. |
| "Failed to fetch" errors | Check that your Supabase project is active (not paused). Free plans pause after inactivity. |
| Can't sign in after registering | If email confirmation is enabled in Supabase, users must confirm their email first. Check Supabase Auth → Settings to disable confirmation for testing. |
| Password reset link doesn't work | Make sure the redirect URL is added to Supabase → Auth → URL Configuration → Redirect URLs. |
| Admin dashboard redirects to member dashboard | Run the SQL to set `role = 'admin'` in the profiles table for your account. |
| RLS errors (403) | Run `schema.sql` again to ensure all RLS policies are applied. Check the Supabase logs under Logs → Edge Functions. |
| GitHub Pages shows 404 | Wait a few minutes after enabling Pages. Ensure the repo is public (required for free GitHub Pages). |
| Module imports fail locally | Use a local server, not `file://`. See Local Development above. |

---

## Security Notes

- Row Level Security (RLS) is enabled on all tables.
- Members can only read/write their own data.
- Admins have elevated access enforced server-side via `is_admin()` Postgres function.
- The anon key is safe to commit to a public repo (RLS protects the data).
- Never commit your `service_role` key.
- Password reset links expire after 24 hours (Supabase default).
- All user-generated content is HTML-escaped before rendering to prevent XSS.

---

## Feature Reference

### Member features
| Feature | Page |
|---|---|
| Sign in / register / reset password | `login.html`, `register.html`, `reset-password.html` |
| Dashboard with stats + upcoming events | `dashboard.html` |
| Browse all upcoming events, check in | `events.html` |
| Log volunteer hours, view submission status | `volunteer-hours.html` |
| Read all announcements | `announcements.html` |
| View attendance history | `attendance.html` |
| Edit profile, change password | `profile.html` |

### Admin features
| Feature | Page |
|---|---|
| Platform stats overview | `admin-dashboard.html` |
| Create / edit / delete events | `admin-events.html` |
| Create / edit / delete announcements | `admin-announcements.html` |
| Approve / reject volunteer hours | `admin-hours.html` |
| View members, promote/demote admins | `admin-users.html` |
| Edit own profile | `profile.html` |

---

*Built with HTML, CSS, JavaScript, and Supabase. No frameworks or build tools required.*
