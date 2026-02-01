# ✅ Pre-Launch Checklist

Before you start, make sure everything is set up:

## Backend Setup

- [x] `backend/.env` file exists
- [x] MongoDB URI configured (Atlas)
- [x] Gemini API key set
- [x] All routes properly configured
- [x] Gemini client working
- [x] MenuItem model has likes/dislikes fields

## Frontend Setup

- [x] Remote baseURL removed (axios)
- [x] Vite proxy configured
- [x] All pages import correctly
- [x] React Router configured

## Dependencies Installed

Run these if you haven't:

```bash
# Backend
cd backend
npm install

# Frontend (in new terminal)
cd frontend
npm install
```

## Environment Check

Run this to verify setup:
```bash
node test-setup.js
```

## Start Application

### Terminal 1: Backend
```bash
cd backend
npm run dev
```

**Expected output:**
```
✅ Gemini Key Loaded: AIzaSy...
✅ Mongo connected successfully
🚀 Server running on port 8080
```

### Terminal 2: Frontend
```bash
cd frontend
npm run dev
```

**Expected output:**
```
VITE v5.x.x ready in xxx ms
➜  Local:   http://localhost:5173/
```

## Test Each Feature

### 1. Home Page
- [ ] Visit http://localhost:5173/
- [ ] See landing page with two buttons
- [ ] Buttons link to /chat and /admin

### 2. Admin Dashboard
- [ ] Visit http://localhost:5173/admin
- [ ] Form displays correctly
- [ ] Can upload image (optional)
- [ ] Fill: name, price, ingredients (comma-separated)
- [ ] Click "Generate AI Description"
- [ ] AI fills in description, allergens, etc.
- [ ] Click "Save to Menu"
- [ ] Item appears in list below

### 3. Customer Chat
- [ ] Visit http://localhost:5173/chat
- [ ] Type: "suggest something under ₹150"
- [ ] Get 3 dish recommendations
- [ ] Each dish shows: name, price, description
- [ ] Can click Like/Dislike buttons

### 4. Feedback System
- [ ] In Customer Chat, click 👍 or 👎
- [ ] Check Admin Dashboard
- [ ] Click "View Analytics"
- [ ] See likes/dislikes count

## Common Issues & Solutions

### Issue: "Cannot connect to MongoDB"
**Solution:** You're using cloud MongoDB (Atlas), just check internet connection

### Issue: "AI unavailable"
**Solution:** 
1. Check backend terminal for Gemini errors
2. Verify API key shows as loaded
3. Try restarting backend

### Issue: "Network Error" in browser
**Solution:**
1. Ensure backend is running (Terminal 1)
2. Check backend shows port 8080
3. Open browser DevTools (F12) → Network tab

### Issue: Frontend blank page
**Solution:**
1. Open browser console (F12)
2. Look for errors
3. Check if Vite is running
4. Try hard refresh (Ctrl+Shift+R)

### Issue: "Menu items found: 0"
**Solution:** Database is empty. Add items via Admin Dashboard first.

## Performance Check

Once everything works:

- [ ] Backend responds quickly (< 1s)
- [ ] AI generation takes 2-5 seconds (normal)
- [ ] Chat responses appear within 3-5 seconds
- [ ] No console errors in browser
- [ ] No error logs in backend terminal

## Ready for Production?

Before deploying:

- [ ] Remove all console.logs (optional)
- [ ] Test with sample data
- [ ] Verify all features work
- [ ] Check mobile responsiveness
- [ ] Test with different browsers
- [ ] Add error boundaries
- [ ] Set up monitoring/logging

## Security Checklist

- [x] `.env` not committed to git
- [x] `.gitignore` includes `.env`
- [ ] API keys kept secret
- [ ] MongoDB credentials secure
- [ ] CORS configured properly

## 🎉 All Done?

If all checks pass, you're ready to:
1. Use locally for development
2. Deploy to production (see README.md)
3. Share with team

**Need help?** Check:
- `START_HERE.md` - Quick start
- `LOCAL_SETUP.md` - Detailed setup
- `README.md` - Full documentation
