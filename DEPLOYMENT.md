# FoodieAI - Complete Deployment Guide

Deploy your FoodieAI application to production in 3 steps.

---

## Prerequisites

- GitHub account
- Vercel account (free tier)
- Render account (free tier)
- MongoDB Atlas account (already configured)

---

## Step 1: Push Code to GitHub

1. **Initialize Git** (if not already done):
   ```bash
   cd c:\Users\arion\OneDrive\Documents\foodieai-mvp
   git init
   git add .
   git commit -m "Initial commit - FoodieAI MVP"
   ```

2. **Create GitHub Repository:**
   - Go to https://github.com/new
   - Name: `foodieai-mvp`
   - Make it Public or Private
   - Don't initialize with README

3. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/foodieai-mvp.git
   git branch -M main
   git push -u origin main
   ```

---

## Step 2: Deploy Backend to Render

### 2.1 Create Web Service

1. Go to https://render.com/
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select `foodieai-mvp`

### 2.2 Configure Service

**Settings:**
- **Name:** `foodieai-backend`
- **Region:** Choose closest to you
- **Branch:** `main`
- **Root Directory:** `backend`
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Instance Type:** Free

### 2.3 Add Environment Variables

Click **"Environment"** tab and add:

```
GEMINI_API_KEY=<your_actual_gemini_api_key>
MONGO_URI=<your_mongodb_atlas_connection_string>
PORT=8080
NODE_ENV=production
```

> [!IMPORTANT]
> Replace `<your_actual_gemini_api_key>` and `<your_mongodb_atlas_connection_string>` with your actual values from the `.env` file.

### 2.4 Deploy

1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Copy your backend URL: `https://foodieai-backend-xxxx.onrender.com`

### 2.5 Test Backend

Open in browser:
```
https://your-backend-url.onrender.com/api/menu
```

You should see your menu items!

---

## Step 3: Deploy Frontend to Vercel

### 3.1 Import Project

1. Go to https://vercel.com/
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository `foodieai-mvp`

### 3.2 Configure Project

**Settings:**
- **Framework Preset:** Vite
- **Build Command:** Leave default or use: `cd frontend && npm run build`
- **Output Directory:** `frontend/dist`
- **Install Command:** `npm install --prefix frontend`

> [!NOTE]
> The `vercel.json` in your project root handles the configuration automatically.

### 3.3 Add Environment Variable

Click **"Environment Variables"** and add:

```
VITE_API_URL=https://your-backend-url.onrender.com
```

> [!IMPORTANT]
> Replace `https://your-backend-url.onrender.com` with your actual Render backend URL from Step 2.4.

### 3.4 Deploy

1. Click **"Deploy"**
2. Wait for deployment (2-3 minutes)
3. Copy your frontend URL: `https://your-app.vercel.app`

---

## Step 4: Update Backend CORS

### 4.1 Add Frontend URL to Render

1. Go back to Render dashboard
2. Open your `foodieai-backend` service
3. Click **"Environment"** tab
4. Add new variable:
   ```
   FRONTEND_URL=https://your-app.vercel.app
   ```
5. Click **"Save Changes"**
6. Service will auto-redeploy

---

## Step 5: Test on Mobile

### 5.1 Open on Phone

1. Open your Vercel URL on your mobile browser:
   ```
   https://your-app.vercel.app
   ```

2. Navigate to `/chat`

3. Test the chat functionality:
   - Send a message like "I want something spicy"
   - Verify AI responds with recommendations
   - Check that food photos display
   - Test like/dislike buttons

### 5.2 Add to Home Screen (Optional)

**iOS:**
1. Open in Safari
2. Tap Share button
3. Tap "Add to Home Screen"

**Android:**
1. Open in Chrome
2. Tap menu (3 dots)
3. Tap "Add to Home screen"

---

## Troubleshooting

### Backend Issues

**Problem:** API not responding
- Check Render logs: Dashboard → Service → Logs
- Verify environment variables are set correctly
- Ensure MongoDB Atlas IP whitelist allows all IPs (0.0.0.0/0)

**Problem:** CORS errors
- Verify `FRONTEND_URL` environment variable is set
- Check that frontend URL matches exactly (no trailing slash)

### Frontend Issues

**Problem:** Can't connect to backend
- Verify `VITE_API_URL` is set correctly in Vercel
- Check that backend URL is accessible
- Open browser console for error messages

**Problem:** Images not loading
- Images are stored in `frontend/public/images/`
- Ensure they're committed to Git
- Check browser network tab for 404 errors

### Database Issues

**Problem:** Can't connect to MongoDB
- Verify `MONGO_URI` is correct in Render
- Check MongoDB Atlas Network Access settings
- Ensure IP whitelist includes `0.0.0.0/0` (allow all)

---

## Environment Variables Summary

### Backend (Render)
```bash
GEMINI_API_KEY=AIzaSy...
MONGO_URI=mongodb+srv://...
PORT=8080
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app
```

### Frontend (Vercel)
```bash
VITE_API_URL=https://your-backend-url.onrender.com
```

---

## Useful Commands

### Local Testing
```bash
# Frontend
cd frontend
npm run build
npm run preview

# Backend
cd backend
npm start
```

### Update Deployment
```bash
# Make changes, then:
git add .
git commit -m "Update: description of changes"
git push

# Vercel and Render will auto-deploy!
```

---

## Next Steps

1. ✅ Test all features on mobile
2. ✅ Share the Vercel URL with friends
3. ✅ Add more menu items with photos
4. ✅ Monitor usage on Render/Vercel dashboards

---

## Support

- **Render Docs:** https://render.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **MongoDB Atlas:** https://www.mongodb.com/docs/atlas/

---

**Congratulations! 🎉 Your FoodieAI app is now live and accessible from anywhere!**
