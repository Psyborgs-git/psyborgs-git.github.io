# GitHub Pages Deployment Guide

This project is configured to automatically build and deploy to GitHub Pages using GitHub Actions.

## 🚀 Setup (One-Time Configuration)

### 1. Enable GitHub Pages in Your Repository

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select **Deploy from a branch**
4. Select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
5. Click **Save**

**Note:** The `gh-pages` branch will be created automatically by the first workflow run.

### 2. Verify Workflows Are Enabled

1. Go to your repository
2. Click **Actions** 
3. You should see two workflows:
   - "Build and Deploy to GitHub Pages"
   - "Test Build"

If workflows are disabled, enable them in repository settings.

## 📝 Workflows Explained

### Deploy Workflow (`deploy.yml`)

**Triggers:**
- On push to `main` branch
- Manual trigger via Actions tab (workflow_dispatch)

**What it does:**
1. Checks out code
2. Sets up Bun
3. Installs dependencies
4. Runs TypeScript type checking
5. Builds the project (`bun run build`)
6. Uploads `dist/` folder to GitHub Pages
7. Deploys to your GitHub Pages URL

**Files used:**
- `package.json` - for scripts and dependencies
- `vite.config.ts` - for build configuration
- `src/` - your React source code

### Test Build Workflow (`test-build.yml`)

**Triggers:**
- On pull requests to `main`
- Manual trigger via Actions tab (workflow_dispatch)

**What it does:**
1. Checks out code
2. Sets up Bun
3. Installs dependencies
4. Runs TypeScript type checking
5. Builds the project
6. Verifies `dist/` folder was created
7. Lists build output

**Purpose:** Catch build issues before merging to main

## 📊 GitHub Pages URL

After the first deploy, your site will be available at:

```
https://<username>.github.io/<repo-name>/
```

Or with a custom domain (if configured via `CNAME`):
```
https://your-custom-domain.com/
```

**Example:**
- GitHub Pages (default): `https://psyborgs-git.github.io/Psyborgs-git/`
- Custom domain: (see your CNAME file)

## 🔄 Deployment Flow

```
Push to main
    ↓
Deploy workflow triggers
    ↓
Build job runs
    ├─ Install dependencies
    ├─ Type check
    └─ Build project
    ↓
Deploy job runs
    └─ Upload to GitHub Pages
    ↓
Site live! 🎉
```

## 🧪 Manual Trigger

To manually trigger a deployment:

1. Go to GitHub repository
2. Click **Actions**
3. Click **"Build and Deploy to GitHub Pages"**
4. Click **"Run workflow"**
5. Select branch (main)
6. Click **"Run workflow"**

Deployment begins immediately!

## ⚙️ Configuration

### Bun Version

The workflows use the latest Bun version. To pin a specific version, edit the workflow:

```yaml
- name: Setup Bun
  uses: oven-sh/setup-bun@v1
  with:
    bun-version: "1.3.11"  # Change this
```

### Custom Base URL

If your site is deployed in a subdirectory (like `/project-name/`), the base URL is set via `BASE_URL` environment variable in vite.config.ts.

Default: `/` (works for user/org sites and custom domains)

### Cache

Both workflows cache Bun dependencies in `~/.bun/install/cache` for faster builds. Clears automatically based on `bun.lockb` changes.

## 📋 Build Requirements

Before workflows run, ensure:
- ✅ `package.json` has `dev`, `build`, and `type-check` scripts
- ✅ TypeScript config is valid
- ✅ All dependencies are in `package.json`
- ✅ `vite.config.ts` is configured correctly

Current setup:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "type-check": "tsc --noEmit",
    "lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
  }
}
```

## 🐛 Troubleshooting

### Workflow Fails with "Module not found"

**Solution:** Run `bun install` locally and commit `bun.lock`:
```bash
bun install
git add bun.lock
git commit -m "update: bun dependencies"
git push
```

### Build Fails with TypeScript Errors

**Solution:** Fix type errors locally:
```bash
bun run type-check
# Fix errors shown
bun run build
```

### Site Not Updating After Push

**Solution:** 
1. Check Actions tab - workflow should show green ✅
2. Check deployment section in Actions for status
3. Hard refresh browser: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

### 404 Error on GitHub Pages

**Solution:** 
1. Verify GitHub Pages is enabled in Settings → Pages
2. Check that build workflow shows "Success"
3. Clear browser cache or use incognito mode
4. Wait 60 seconds for CDN to update

### Deployment Takes Long Time

**Solution:** Normal! First deployment usually takes 2-3 minutes. Subsequent deployments are faster due to caching.

## 🔐 Security

GitHub Actions permissions in workflows:
- `contents: read` - Read repository code
- `pages: write` - Deploy to GitHub Pages
- `id-token: write` - OIDC token for authentication
- No secrets needed - uses OIDC tokens automatically

## 📈 Monitoring Deployments

1. Go to repository → **Actions** tab
2. Click workflow run to see details:
   - Job steps and their status
   - Build logs
   - Deployment URL
   - Execution time

## 🚀 Next Steps

1. **Push to main:**
   ```bash
   git add .
   git commit -m "feat: add github pages workflows"
   git push origin main
   ```

2. **Watch deployment:**
   - Go to Actions tab
   - Watch "Build and Deploy" workflow run
   - Check GitHub Pages link when complete

3. **Verify site:**
   - Open deployment URL
   - Test all features
   - Verify styling loads correctly

## 📞 Support

If workflows fail:

1. **Check Actions logs** - GitHub shows detailed error messages
2. **Verify local build** - `bun run build` should work locally
3. **Check permissions** - Ensure GitHub Pages is enabled in Settings
4. **Review files** - Ensure all source files are committed

---

**Workflows are ready!** Your next push to `main` will automatically build and deploy. 🎉
