# 🚀 START HERE - FoodieAI Local Setup

## ✅ What I Fixed For You

1. **Removed remote server URLs** - Changed from production (render.com) to local development
2. **Fixed Vite proxy** - Added proper proxy configuration to route `/api` calls to backend
3. **Verified environment variables** - Your `.env` file is correctly configured
4. **Fixed ingredients splitting** - Now properly saves comma-separated ingredients as array

## 🎯 Quick Start (3 Steps)

### Step 1: Open TWO terminals

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Wait for: `✅ Mongo connected successfully` and `🚀 Server running on port 8080`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Wait for: `Local: http://localhost:5173/`

### Step 2: Open Browser

Go to: **http://localhost:5173/**

You should see three pages:
- **Home** (/) - Landing page
- **Customer Chat** (/chat) - For customers to get recommendations
- **Admin Dashboard** (/admin) - For restaurant staff to manage menu

### Step 3: Test Everything

**Test Admin Dashboard:**
1. Go to http://localhost:5173/admin
2. Fill in: Dish Name, Price, Ingredients (comma-separated)
3. Click "⚡ Generate AI Description"
4. Click "✅ Save to Menu"

**Test Customer Chat:**
1. Go to http://localhost:5173/chat
2. Type: "suggest something under ₹150"
3. You should see 3 dish recommendations

## 📋 Current Configuration

### Backend (Port 8080)
- ✅ MongoDB Atlas (cloud) - No local MongoDB needed
- ✅ Google Gemini AI API configured
- ✅ Express server with CORS enabled
- ✅ Routes: /api/chat, /api/admin, /api/menu, /api/feedback, /api/analytics

### Frontend (Port 5173)
- ✅ React with Vite
- ✅ Proxy configured to forward /api to localhost:8080
- ✅ Axios configured for API calls
- ✅ React Router for navigation

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
- You're using MongoDB Atlas (cloud), so check internet connection
- Verify MONGO_URI in backend/.env

### "AI unavailable"
- Check backend terminal for Gemini API errors
- API key should show as: `✅ Gemini Key Loaded: AIzaSy...`

### "Network Error" in browser
- Make sure backend is running (Terminal 1)
- Check backend terminal for errors
- Open browser console (F12) for details

### Frontend shows blank page
- Check browser console (F12) for errors
- Make sure frontend terminal shows "ready"
- Try clearing browser cache (Ctrl+Shift+R)

### Port already in use
- Backend: Change PORT in `.env` file
- Frontend: Vite will auto-suggest another port

## 📂 File Structure

```
foodieai-mvp/
├── backend/
│   ├── .env                    ← Your secrets (MongoDB, Gemini API)
│   ├── server.js               ← Main server
│   ├── routes/                 ← API endpoints
│   │   ├── chat.js            ← Customer chat
│   │   ├── admin.js           ← AI generation
│   │   ├── menu.js            ← CRUD menu items
│   │   ├── feedback.js        ← Likes/dislikes
│   │   └── analytics.js       ← Dashboard stats
│   ├── services/
│   │   └── geminiClient.js    ← Gemini AI integration
│   └── models/
│       └── MenuItem.js        ← MongoDB schema
│
├── frontend/
│   ├── vite.config.js         ← Proxy configuration
│   └── src/
│       ├── pages/
│       │   ├── Home.jsx       ← Landing page
│       │   ├── CustomerChat.jsx  ← Customer interface
│       │   └── AdminDashboard.jsx ← Admin interface
│       └── App.jsx            ← Routes
│
├── README.md                   ← Full documentation
├── LOCAL_SETUP.md             ← Detailed setup guide
└── START_HERE.md              ← This file
```

## 🔐 Security Note

Your `.env` file contains:
- MongoDB connection string with credentials
- Google Gemini API key

**Never commit this file to GitHub!**

## 📚 Additional Resources

- **Full Documentation**: See `README.md`
- **Detailed Setup**: See `LOCAL_SETUP.md`
- **Test Setup**: Run `node test-setup.js`

## ✨ Features Working

✅ AI-powered dish recommendations  
✅ Menu management with image upload  
✅ AI-generated descriptions and captions  
✅ Customer feedback (likes/dislikes)  
✅ Analytics dashboard  
✅ Ingredient array storage  

## 🎉 You're Ready!

Everything is configured for local development. Just run the two commands above and start coding!

**Questions?** Check the troubleshooting section or review the logs in your terminals.
