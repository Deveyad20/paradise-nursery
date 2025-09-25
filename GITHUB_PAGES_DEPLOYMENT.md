# 🚀 Deploy Paradise Nursery to GitHub Pages

A comprehensive guide to deploy your Paradise Nursery PWA to GitHub Pages with automatic CI/CD.

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [⚙️ Prerequisites](#%EF%B8%8F-prerequisites)
- [🔧 Configuration](#-configuration)
- [🚀 Deployment Steps](#-deployment-steps)
- [🔄 Automatic Deployment](#-automatic-deployment)
- [🧪 Testing Deployment](#-testing-deployment)
- [🐛 Troubleshooting](#-troubleshooting)
- [📚 Additional Resources](#-additional-resources)

---

## 🎯 Overview

**GitHub Pages Deployment** allows you to host your Paradise Nursery PWA directly from your GitHub repository with:

### ✨ **Features**
- **Free Hosting**: No cost for hosting your application
- **Automatic Deployment**: CI/CD with GitHub Actions
- **Custom Domain**: Support for custom domains
- **SSL Certificate**: Automatic HTTPS configuration
- **PWA Support**: Full Progressive Web App functionality

### 🏗️ **Architecture**
```
GitHub Repository
    ↓ (GitHub Actions)
Automatic Build & Deploy
    ↓
GitHub Pages
    ↓
Your Live PWA
```

---

## ⚙️ Prerequisites

### 1. GitHub Repository
- ✅ **GitHub Account**: [github.com](https://github.com)
- ✅ **Repository**: Public or Private (Public recommended for Pages)
- ✅ **Git**: Installed and configured

### 2. Repository Settings
1. **Go to Repository Settings**
   ```
   https://github.com/YOUR_USERNAME/YOUR_REPOSITORY/settings
   ```

2. **Enable GitHub Pages**
   - Scroll to "Pages" section
   - Set Source to "GitHub Actions"
   - Save changes

3. **Repository Permissions**
   - Ensure repository is public (for free hosting)
   - Or upgrade to GitHub Pro for private repositories

### 3. Local Development
- ✅ **Node.js 18+**: For building the application
- ✅ **Git**: For version control
- ✅ **GitHub CLI** (optional): For easier deployment

---

## 🔧 Configuration

### 1. Environment Configuration

#### Production Environment Variables
Create `.env.production` file:
```env
VITE_APP_NAME="Paradise Nursery"
VITE_APP_VERSION="1.0.0"
VITE_API_BASE_URL=https://your-api-domain.com/api
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_SENTRY=true
VITE_SENTRY_DSN=your-sentry-dsn-here
VITE_GA_ID=your-google-analytics-id
VITE_PWA_ENABLED=true
```

#### GitHub Secrets (Optional)
For enhanced security, set these in repository settings:
- `VITE_API_BASE_URL`: Your production API URL
- `VITE_SENTRY_DSN`: Error tracking DSN
- `VITE_GA_ID`: Google Analytics ID

### 2. Build Configuration

#### Vite Configuration
The `vite.config.js` is already configured for GitHub Pages:
```javascript
export default defineConfig({
  base: process.env.GITHUB_PAGES ? '/paradise-nursery/' : '/',
  // ... other config
})
```

#### Package.json Scripts
Deployment scripts are ready:
```json
{
  "scripts": {
    "build:github": "GITHUB_PAGES=true vite build",
    "predeploy:github": "npm run build:github",
    "deploy:github": "gh-pages -d dist -t true"
  }
}
```

---

## 🚀 Deployment Steps

### Option 1: Automatic Deployment (Recommended)

#### 1. Push to Main Branch
```bash
# Commit your changes
git add .
git commit -m "Prepare for GitHub Pages deployment"

# Push to main branch
git push origin main
```

#### 2. Monitor Deployment
1. **Go to Actions Tab**
   ```
   https://github.com/YOUR_USERNAME/YOUR_REPOSITORY/actions
   ```

2. **Watch the Workflow**
   - Look for "Deploy to GitHub Pages" workflow
   - Monitor build progress
   - Check for any errors

3. **Wait for Completion**
   - Build takes 2-5 minutes
   - Deployment is automatic
   - No manual intervention needed

#### 3. Access Your Site
After successful deployment:
```
https://YOUR_USERNAME.github.io/paradise-nursery/
```

### Option 2: Manual Deployment

#### 1. Build for GitHub Pages
```bash
# Build with GitHub Pages configuration
npm run build:github

# Verify build output
ls -la dist/
```

#### 2. Deploy to GitHub Pages
```bash
# Deploy using gh-pages
npm run deploy:github

# Or use GitHub CLI
gh-pages -d dist
```

#### 3. Verify Deployment
```bash
# Check deployment
curl -s https://YOUR_USERNAME.github.io/paradise-nursery/ | head -20
```

---

## 🔄 Automatic Deployment

### GitHub Actions Workflow

The `.github/workflows/deploy.yml` handles automatic deployment:

#### Workflow Triggers
- ✅ **Push to main/master**: Automatic deployment
- ✅ **Pull Request**: Build validation
- ✅ **Manual Trigger**: Via GitHub Actions UI

#### Workflow Steps
1. **Checkout Code**: Gets latest repository code
2. **Setup Node.js**: Configures Node.js 18 environment
3. **Install Dependencies**: Runs `npm ci` for clean install
4. **Build Application**: Uses GitHub Pages configuration
5. **Setup Pages**: Configures GitHub Pages deployment
6. **Upload Artifact**: Prepares build for deployment
7. **Deploy**: Publishes to GitHub Pages

#### Workflow Configuration
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
```

### Environment Variables

#### Build Time Variables
```yaml
env:
  GITHUB_PAGES: true  # Enables GitHub Pages build mode
```

#### Repository Secrets (Optional)
Set these in repository settings for enhanced security:
- `VITE_API_BASE_URL`: Production API endpoint
- `VITE_SENTRY_DSN`: Error tracking
- `VITE_GA_ID`: Analytics tracking

---

## 🧪 Testing Deployment

### 1. Local Testing
```bash
# Build for GitHub Pages locally
npm run build:github

# Preview build
npm run preview

# Test at: http://localhost:4173
```

### 2. GitHub Pages Testing

#### URL Structure
```
Base URL: https://YOUR_USERNAME.github.io/paradise-nursery/
├── index.html          # Main application
├── assets/             # CSS, JS, images
├── favicon.ico         # Site icon
└── manifest.json       # PWA manifest
```

#### Testing Checklist
- [ ] **Site Loads**: Main page displays correctly
- [ ] **Navigation Works**: All routes function properly
- [ ] **PWA Features**: Can be installed as app
- [ ] **Responsive Design**: Works on mobile/desktop
- [ ] **Performance**: Fast loading times
- [ ] **Assets Load**: All images and styles load
- [ ] **Offline Support**: Basic functionality offline

### 3. PWA Validation

#### Install as PWA
```bash
# In browser:
# 1. Visit your GitHub Pages URL
# 2. Look for install icon in address bar
# 3. Click "Install Paradise Nursery"
# 4. Verify app installs and works offline
```

#### Service Worker Test
```bash
# Check service worker registration
# Open DevTools > Application > Service Workers
# Verify service worker is active
```

#### Manifest Validation
```bash
# Validate PWA manifest
# Open DevTools > Application > Manifest
# Check all fields are present and correct
```

### 4. Performance Testing

#### Lighthouse Audit
```bash
# Run Lighthouse in Chrome DevTools
# Target scores:
# Performance: 90+
# Accessibility: 90+
# Best Practices: 90+
# SEO: 90+
# PWA: 95+
```

#### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Build Fails
```bash
# Check for errors in GitHub Actions
# Go to Actions tab and view workflow logs

# Common solutions:
# 1. Check Node.js version (should be 18+)
# 2. Verify all dependencies are installed
# 3. Check for TypeScript/JavaScript errors
```

#### 2. Page Not Loading
```bash
# Check if site is published
curl -s https://YOUR_USERNAME.github.io/paradise-nursery/

# Verify repository settings
# Go to Settings > Pages
# Check if source is set to "GitHub Actions"
```

#### 3. Assets Not Loading
```bash
# Check base path configuration
# In vite.config.js, ensure base is set correctly
base: '/paradise-nursery/'

# Verify asset paths in built files
grep -r "src=" dist/ | head -5
```

#### 4. PWA Not Installing
```bash
# Check manifest.json
curl https://YOUR_USERNAME.github.io/paradise-nursery/manifest.json

# Verify all required fields:
# - name, short_name
# - icons (192x192, 512x512)
# - start_url, scope
# - display: standalone
```

#### 5. Routing Issues (SPA 404 Fix)
```bash
# GitHub Pages doesn't support SPA routing by default
# SOLUTION: We've implemented automatic 404.html redirect

# How it works:
# 1. 404.html catches all missing routes
# 2. Redirects to index.html with path as query parameter
# 3. main.jsx parses and restores the correct route
# 4. React Router handles the routing normally

# Test routing:
# 1. Visit: https://YOUR_USERNAME.github.io/paradise-nursery/products
# 2. Should load products page, not 404
# 3. Try direct URL access and refresh
# 4. Test browser back/forward buttons
```

### Debug Steps

#### 1. Check GitHub Actions Logs
```bash
# Go to Actions tab
# Click on workflow run
# View build logs for errors
```

#### 2. Test Build Locally
```bash
# Build locally with same configuration
GITHUB_PAGES=true npm run build

# Check build output
ls -la dist/
```

#### 3. Verify Configuration
```bash
# Check vite.config.js
# Ensure base path is correct
# Verify build configuration
```

#### 4. Check Browser Console
```bash
# Open browser DevTools
# Check for JavaScript errors
# Verify network requests
```

### Getting Help

#### GitHub Support
- **Actions Documentation**: [docs.github.com/actions](https://docs.github.com/actions)
- **Pages Documentation**: [docs.github.com/pages](https://docs.github.com/pages)
- **Community Forum**: [github.community](https://github.community)

#### Common Solutions
- **Clear GitHub Pages Cache**: Go to repository Settings > Pages > Clear cache
- **Rebuild Workflow**: Go to Actions > Deploy workflow > Re-run workflow
- **Check Repository Permissions**: Ensure Pages is enabled in repository settings

---

## 📚 Additional Resources

### Documentation
- [GitHub Pages Guide](https://docs.github.com/pages) - Official documentation
- [GitHub Actions Guide](https://docs.github.com/actions) - CI/CD documentation
- [Vite Deployment Guide](https://vitejs.dev/guide/deploy.html) - Build tool deployment
- [PWA Deployment](https://web.dev/pwa/) - Progressive Web Apps

### Tools
- [GitHub CLI](https://cli.github.com/) - Command line interface
- [GitHub Desktop](https://desktop.github.com/) - GUI for Git
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Performance testing
- [WebPageTest](https://www.webpagetest.org/) - Website testing

### Examples
- [Vite + GitHub Pages Example](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react)
- [PWA Examples](https://github.com/GoogleChrome/samples/tree/gh-pages/web-fundamentals/tools/lighthouse/pwa)
- [React Router GitHub Pages](https://github.com/rafgraph/react-router-hash-link)

### Community
- [GitHub Community](https://github.community/c/github-pages) - Pages discussion
- [Stack Overflow](https://stackoverflow.com/questions/tagged/github-pages) - Q&A
- [Dev.to GitHub Pages](https://dev.to/t/githubpages) - Tutorials and articles

---

## 🎉 **Deployment Complete!**

### 🌐 **Your Live Site:**
```
https://YOUR_USERNAME.github.io/paradise-nursery/
```

### 📱 **PWA Features:**
- ✅ Installable on devices
- ✅ Offline functionality
- ✅ App-like experience
- ✅ Automatic updates

### 🚀 **Next Steps:**
1. **Test thoroughly** on different devices
2. **Configure custom domain** (optional)
3. **Set up monitoring** (optional)
4. **Add analytics** (optional)

### 💬 **Need Help?**
- Check troubleshooting section
- Review GitHub Actions logs
- Open issue on repository

---

**Happy deploying! 🌱✨**

*Your Paradise Nursery PWA is now live on GitHub Pages!*