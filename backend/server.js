require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const chatRouter = require('./routes/chat');

const menuRouter = require('./routes/menu');
const feedbackRouter = require('./routes/feedback');
const analyticsRouter = require('./routes/analytics');

// Initialize express app
const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  "https://foodieai-frontend.onrender.com",  // Production frontend
  process.env.FRONTEND_URL || 'https://your-app.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/chat', chatRouter);

app.use('/api/menu', menuRouter);
app.use('/api/feedback', feedbackRouter);
app.use('/api/analytics', analyticsRouter);

// MongoDB Connection
const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/foodieai';

mongoose.connect(MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ Mongo connected successfully'))
  .catch(err => console.error('❌ Mongo connection failed:', err.message));

// ❌ REMOVE frontend serving — frontend will deploy to Netlify/Vercel
// No static serve here, because we are deploying backend alone.

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


