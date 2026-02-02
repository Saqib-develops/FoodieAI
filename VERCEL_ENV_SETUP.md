# 🚨 CRITICAL: Environment Variable Not Set on Vercel

## The Problem

Your frontend is calling:
```
https://foodieai-mvp.vercel.app/api/chat/query  ❌
```

It should be calling:
```
https://foodieai-backend.onrender.com/api/chat/query  ✅
```

This means `VITE_API_URL` is NOT in your production build.

---

## ✅ Step-by-Step: Add Environment Variable on Vercel

### **Step 1: Go to Vercel Settings**

Open this exact link in your browser:
```
https://vercel.com/foodieais-projects/foodieai-mvp/settings/environment-variables
```

### **Step 2: Click "Add New" Button**

Look for a button that says:
- "Add New"
- "Add Environment Variable"
- Or a **"+"** icon

Click it.

### **Step 3: Fill in the Form**

You'll see a form with these fields:

**Field 1 - Key/Name:**
```
VITE_API_URL
```
⚠️ **IMPORTANT:** Must be EXACTLY `VITE_API_URL` (all caps, with underscores)

**Field 2 - Value:**
```
https://foodieai-backend.onrender.com
```
⚠️ **IMPORTANT:** No trailing slash!

**Field 3 - Environments:**
Check ALL THREE boxes:
- ✅ Production
- ✅ Preview  
- ✅ Development

### **Step 4: Save**

Click the **"Save"** or **"Add"** button.

### **Step 5: CRITICAL - Redeploy**

After saving, you MUST redeploy:

1. Go to: https://vercel.com/foodieais-projects/foodieai-mvp
2. Click **"Deployments"** tab
3. Find the LATEST deployment (top of the list)
4. Click the **three dots (•••)** on the right
5. Click **"Redeploy"**
6. Confirm by clicking **"Redeploy"** again

---

## 🔍 How to Verify It's Set

After adding the variable:

1. Go back to: https://vercel.com/foodieais-projects/foodieai-mvp/settings/environment-variables
2. You should see a row with:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://foodieai-backend.onrender.com` (may be hidden as `•••••`)
   - **Environments:** Production, Preview, Development

If you DON'T see this, the variable is NOT set!

---

## 🧪 Test After Redeployment

1. Wait for deployment to complete (2-3 minutes)
2. Visit: https://foodieai-mvp.vercel.app/chat
3. **Hard refresh:** `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
4. Open DevTools (F12)
5. Go to **Network** tab
6. Send a test message
7. Click on the `query` request
8. Check **Request URL** - it should be:
   ```
   https://foodieai-backend.onrender.com/api/chat/query  ✅
   ```

---

## 🚨 If It's STILL Not Working

If you've done all the above and it's still calling Vercel, then:

**Option 1: Delete and Re-add the Variable**
1. Go to environment variables page
2. Delete the `VITE_API_URL` variable
3. Add it again from scratch
4. Redeploy

**Option 2: Use Vercel CLI to Set It**
```bash
vercel env add VITE_API_URL production
```
When prompted, enter: `https://foodieai-backend.onrender.com`

Then redeploy.

---

## 📸 What You Should See on Vercel

When you go to the environment variables page, you should see something like:

```
┌─────────────────┬──────────────────────────────────────┬─────────────────────────────┐
│ Key             │ Value                                 │ Environments                │
├─────────────────┼──────────────────────────────────────┼─────────────────────────────┤
│ VITE_API_URL    │ https://foodieai-backend.onrender... │ Production, Preview, Dev    │
└─────────────────┴──────────────────────────────────────┴─────────────────────────────┘
```

If you DON'T see this table with `VITE_API_URL`, **the variable is not set!**

---

**Please follow these steps EXACTLY and tell me if you can see the `VITE_API_URL` variable in the Vercel settings page.**
