# Frontend Deployment on Vercel - Troubleshooting Guide

## Your Setup (Correct! ✅)
- **Backend:** Render (traditional Node.js server)
- **Frontend:** Vercel (Vite React SPA)

---

## ✅ What I Fixed

Updated `vercel.json` to properly handle the monorepo structure where frontend is in the `frontend/` subdirectory.

### Changes Made:
```json
{
    "buildCommand": "cd frontend && npm install && npm run build",
    "outputDirectory": "frontend/dist",
    "installCommand": "cd frontend && npm install",
    "framework": "vite",
    "rewrites": [
        {
            "source": "/(.*)",
            "destination": "/index.html"
        }
    ]
}
```

---

## 🚀 Deployment Steps for Vercel

### 1. Push Changes to GitHub
```bash
git add .
git commit -m "Fix Vercel frontend deployment configuration"
git push
```

### 2. Deploy on Vercel

**Option A: Using Vercel Dashboard (Recommended)**

1. Go to https://vercel.com/
2. Click **"Add New..."** → **"Project"**
3. Import your `foodieai-mvp` repository
4. Vercel should auto-detect the `vercel.json` settings
5. **Add Environment Variable:**
   - Name: `VITE_API_URL`
   - Value: `https://your-backend-url.onrender.com` (your Render backend URL)
6. Click **"Deploy"**

**Option B: Using Vercel CLI**
```bash
npm i -g vercel
cd c:\Users\arion\OneDrive\Documents\foodieai-mvp
vercel
```

### 3. Verify Deployment
- Visit your Vercel URL
- Check that the app loads
- Test the chat functionality
- Verify it connects to your Render backend

---

## 🐛 Common Vercel Errors & Solutions

### Error: "No such file or directory: frontend/dist"
**Cause:** Build command not running from correct directory  
**Solution:** ✅ Already fixed in `vercel.json`

### Error: "Build failed" or "Command not found"
**Cause:** npm install not running in frontend directory  
**Solution:** ✅ Already fixed with `installCommand` in `vercel.json`

### Error: "404 on page refresh"
**Cause:** SPA routing not configured  
**Solution:** ✅ Already fixed with `rewrites` in `vercel.json`

### Error: "Cannot connect to API" or CORS errors
**Cause:** Missing or incorrect `VITE_API_URL` environment variable  
**Solution:** 
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add: `VITE_API_URL` = `https://your-backend.onrender.com`
3. Redeploy

### Error: "Failed to compile" with Vite errors
**Cause:** Missing dependencies or syntax errors in code  
**Solution:** 
1. Test build locally: `cd frontend && npm run build`
2. Fix any errors shown
3. Push changes and redeploy

---

## 📋 Environment Variables Checklist

### Backend (Render) ✅
```
GEMINI_API_KEY=AIzaSyC6KUnhkZb2tn9Yz4bgj-3RvXrpnLIC2xI
MONGO_URI=mongodb+srv://arionistxiaomi_db_user:zljNEBTEbvFRE0d4@dataofrestaurants.rdlff9a.mongodb.net/foodieai
PORT=8080
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app
```

### Frontend (Vercel) ⚠️
```
VITE_API_URL=https://your-backend-url.onrender.com
```

> [!IMPORTANT]
> After deploying frontend, go back to Render and update the `FRONTEND_URL` environment variable with your actual Vercel URL to fix CORS.

---

## 🔍 How to Debug Vercel Deployment

1. **Check Build Logs:**
   - Vercel Dashboard → Your Project → Deployments
   - Click on the failed deployment
   - Review the build logs for errors

2. **Test Build Locally:**
   ```bash
   cd frontend
   npm install
   npm run build
   npm run preview
   ```

3. **Check Vercel Settings:**
   - Framework Preset: Should auto-detect as "Vite"
   - Build Command: Should use the one from `vercel.json`
   - Output Directory: Should be `frontend/dist`

---

## 🎯 Next Steps

1. ✅ Push the updated `vercel.json` to GitHub
2. ✅ Deploy frontend to Vercel
3. ✅ Add `VITE_API_URL` environment variable on Vercel
4. ✅ Update `FRONTEND_URL` on Render backend
5. ✅ Test the complete application

---

## 📞 Still Having Issues?

**Share the following information:**
1. The exact error message from Vercel deployment logs
2. Screenshot of Vercel build logs (if possible)
3. Your Vercel project settings (Framework, Build Command, Output Directory)

I'll help you debug the specific issue!

---

**Note:** The `vercel.json` configuration should now work correctly for your monorepo structure with frontend in a subdirectory.
