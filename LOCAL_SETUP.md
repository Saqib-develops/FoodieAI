# 🚀 Local Development Setup

Follow these steps to run FoodieAI locally:

## Step 1: Verify Environment Variables

Make sure `backend/.env` exists with:
```env
PORT=8080
MONGO_URI=mongodb+srv://arionistxiaomi_db_user:zljNEBTEbvFRE0d4@dataofrestaurants.rdlff9a.mongodb.net/foodieai?retryWrites=true&w=majority&appName=dataofRestaurants
GEMINI_API_KEY=AIzaSyCZYiD9FnnYLV2QxHRwlg8O8CuHLhjtN-s
```

## Step 2: Start Backend

Open a terminal:
```bash
cd backend
npm install  # (only first time)
npm run dev
```

You should see:
```
✅ Gemini Key Loaded: AIzaSy...
🚀 Server running on port 8080
✅ Mongo connected successfully
```

## Step 3: Start Frontend

Open a NEW terminal:
```bash
cd frontend
npm install  # (only first time)
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

## Step 4: Open Browser

Visit:
- **Home**: http://localhost:5173/
- **Customer Chat**: http://localhost:5173/chat


## ✅ Everything Working?

Test these:

2. **Customer Chat** → Ask: "suggest something under ₹150"
3. Check backend terminal for logs

## ❌ Troubleshooting

**"Cannot connect to MongoDB"**
- Your MongoDB Atlas connection is already configured
- Check internet connection

**"AI unavailable"**
- Backend should log Gemini API errors
- API key is already set correctly

**"Network Error" in frontend**
- Make sure backend is running on port 8080
- Check browser console (F12) for errors

**Port already in use**
- Backend: Change PORT in `.env`
- Frontend: Vite will auto-suggest another port

## 📝 Important Notes

- Backend runs on: `http://localhost:8080`
- Frontend runs on: `http://localhost:5173`
- Frontend uses Vite proxy to forward `/api` requests to backend
- MongoDB is hosted on Atlas (cloud), no local MongoDB needed
