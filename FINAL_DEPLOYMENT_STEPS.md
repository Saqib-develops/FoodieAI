# 🚀 Final Deployment Setup - Complete This Now!

## ✅ What We Fixed
- Frontend now uses `VITE_API_URL` environment variable to connect to backend
- Code has been pushed to GitHub
- Vercel will auto-deploy the new code

---

## 🎯 Step 1: Add Environment Variable on Vercel

### Go to Vercel Dashboard:
**Link:** https://vercel.com/foodieais-projects/foodieai-mvp/settings/environment-variables

### Add the following variable:

| Field | Value |
|-------|-------|
| **Key** | `VITE_API_URL` |
| **Value** | `https://foodieai-backend.onrender.com` |
| **Environments** | ✅ Production<br>✅ Preview<br>✅ Development |

### Steps:
1. Click **"Add New"** or **"Add"** button
2. Enter the key: `VITE_API_URL`
3. Enter the value: `https://foodieai-backend.onrender.com`
4. Check all three environment boxes (Production, Preview, Development)
5. Click **"Save"**

---

## 🎯 Step 2: Redeploy on Vercel

After adding the environment variable:

1. Go to: https://vercel.com/foodieais-projects/foodieai-mvp
2. Click **"Deployments"** tab
3. Find the latest deployment
4. Click the **three dots (•••)** menu
5. Click **"Redeploy"**
6. Confirm the redeployment

**OR** Vercel may auto-deploy from your latest git push - check the Deployments tab!

---

## 🎯 Step 3: Update Backend CORS on Render

Your backend needs to allow requests from your Vercel frontend.

### Go to Render Dashboard:
**Link:** https://dashboard.render.com/

### Update Environment Variable:

1. Find your **foodieai-backend** service
2. Click on it
3. Go to **"Environment"** tab
4. Look for `FRONTEND_URL` variable
5. **Update or Add:**
   - **Key:** `FRONTEND_URL`
   - **Value:** `https://foodieai-mvp.vercel.app`
6. Click **"Save Changes"**
7. Backend will auto-redeploy (takes ~2-3 minutes)

---

## 🧪 Step 4: Test Your Application

### After both deployments complete:

1. **Visit:** https://foodieai-mvp.vercel.app
2. **Navigate to:** `/chat` page
3. **Send a test message:** "I want something spicy"
4. **Verify:**
   - ✅ AI responds with dish recommendations
   - ✅ Food photos display
   - ✅ Like/Dislike buttons work
   - ✅ No CORS errors in browser console

---

## 🐛 Troubleshooting

### If you still see errors:

**Check Browser Console (F12):**
- Look for any error messages
- Check the Network tab for failed requests

**Common Issues:**

| Error | Solution |
|-------|----------|
| CORS error | Make sure `FRONTEND_URL` is set on Render backend |
| 404 error | Check that `VITE_API_URL` is set correctly on Vercel |
| 405 error | Environment variable not applied - redeploy on Vercel |
| Timeout | Render backend may be sleeping - wait 30 seconds and retry |

---

## 📋 Quick Checklist

- [ ] Added `VITE_API_URL` on Vercel
- [ ] Redeployed on Vercel
- [ ] Updated `FRONTEND_URL` on Render
- [ ] Waited for Render backend to redeploy
- [ ] Tested the app at https://foodieai-mvp.vercel.app/chat
- [ ] Verified chat functionality works

---

## 🎉 Success Criteria

When everything is working, you should see:
1. ✅ Frontend loads at https://foodieai-mvp.vercel.app
2. ✅ Chat page works at https://foodieai-mvp.vercel.app/chat
3. ✅ AI responds with dish recommendations
4. ✅ Photos display inline with recommendations
5. ✅ No errors in browser console

---

**Need help?** Share any error messages you see and I'll help debug!
