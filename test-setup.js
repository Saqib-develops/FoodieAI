// Quick test script to verify everything is working
require('dotenv').config({ path: './backend/.env' });

console.log('\n🔍 Testing FoodieAI Setup...\n');

// Test 1: Environment Variables
console.log('1️⃣ Environment Variables:');
console.log('   PORT:', process.env.PORT || '❌ NOT SET');
console.log('   MONGO_URI:', process.env.MONGO_URI ? '✅ SET' : '❌ NOT SET');
console.log('   GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? '✅ SET' : '❌ NOT SET');

// Test 2: Check if modules can be loaded
console.log('\n2️⃣ Checking Backend Modules:');
try {
  require('./backend/server.js');
  console.log('   server.js: ❌ (should not run in test mode)');
} catch (e) {
  // Expected - server tries to start
}

try {
  const gemini = require('./backend/services/geminiClient');
  console.log('   geminiClient.js: ✅ Loaded');
} catch (e) {
  console.log('   geminiClient.js: ❌ Error -', e.message);
}

try {
  const MenuItem = require('./backend/models/MenuItem');
  console.log('   MenuItem model: ✅ Loaded');
} catch (e) {
  console.log('   MenuItem model: ❌ Error -', e.message);
}

console.log('\n3️⃣ Recommended Next Steps:');
console.log('   1. Run: cd backend && npm run dev');
console.log('   2. Run in new terminal: cd frontend && npm run dev');
console.log('   3. Visit: http://localhost:5173');
console.log('\n✨ Happy coding!\n');
