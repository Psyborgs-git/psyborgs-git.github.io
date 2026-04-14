# Deploy to GitHub Pages - Quick Start

## ✅ Prerequisites

- [x] Repository is on GitHub
- [x] Workflows created (`.github/workflows/deploy.yml` and `test-build.yml`)
- [x] `package.json` has build script

## 🚀 One-Time Setup (5 minutes)

### Step 1: Enable GitHub Pages

1. Go to repository **Settings**
2. Scroll to **Pages** section
3. Under "Source", select **Deploy from a branch**
4. Select:
   - **Branch:** `gh-pages`
   - **Folder:** `/ (root)`
5. Click **Save**

✅ Done! The `gh-pages` branch will be created automatically.

### Step 2: Verify Workflows

1. Push any change to `main` branch (or manually trigger)
2. Go to **Actions** tab
3. Watch the workflow run
4. After ~2 minutes, site will be live!

## 📍 Find Your Deployment URL

**Default GitHub Pages URL:**
```
https://<username>.github.io/<repo-name>/
```

**Example:**
- User: `psyborgs-git`
- Repo: `supreme-video-composer`
- URL: `https://psyborgs-git.github.io/supreme-video-composer/`

**With custom domain (if you have CNAME):**
```
https://your-custom-domain.com/
```

## 🔄 Deploy Your Changes

### Automatic (After every push to main):
```bash
git add .
git commit -m "your message"
git push origin main
```

Workflow automatically:
1. Installs dependencies
2. Type checks code
3. Builds the project
4. Deploys to GitHub Pages

✅ Site updates in ~2 minutes

### Manual (Anytime):
1. Go to **Actions** tab
2. Click **"Build and Deploy to GitHub Pages"**
3. Click **Run workflow** dropdown
4. Select `main` branch
5. Click **Run workflow**

✅ Deployment starts immediately

## ✨ Verify Deployment

1. **Check workflow status:**
   - Go to Actions tab
   - See green ✅ next to workflow name

2. **Check deployment environment:**
   - Go to Deployments section
   - See `github-pages` with checkmark

3. **Check live site:**
   - Open your GitHub Pages URL
   - Site should be live!

## 🧪 Test Before Deploying to Main

Create a pull request (PR):
```bash
git checkout -b feature/my-changes
# Make changes
git add .
git commit -m "feat: my changes"
git push origin feature/my-changes
```

Then:
1. Create PR on GitHub
2. "Test Build" workflow auto-runs
3. If it passes, merge safely!

## 📱 Force Refresh Browser

If changes don't show:
- **Mac:** Cmd + Shift + R
- **Windows:** Ctrl + Shift + R
- **Or:** Open in Incognito/Private mode

## ⚠️ Common Issues

| Issue | Solution |
|-------|----------|
| **Workflow fails** | Check Actions logs for errors |
| **Build takes long** | First build slower; cache added for next time |
| **404 error** | Enable GitHub Pages in Settings → Pages |
| **Site not updating** | Hard refresh browser + wait 60 seconds |
| **Type errors** | Run `bun run type-check` locally first |

## 📊 Workflow Status Badge

Optionally add to `README.md`:

```markdown
[![Build and Deploy](https://github.com/<username>/<repo>/actions/workflows/deploy.yml/badge.svg)](https://github.com/<username>/<repo>/actions)
```

## 🚀 You're Ready!

```bash
# Make sure everything is pushed
git push origin main

# Then watch it deploy! 🎉
# Go to Actions tab and see the workflow run
```

---

**Need help?** See `.github/DEPLOYMENT_GUIDE.md` for detailed information.
