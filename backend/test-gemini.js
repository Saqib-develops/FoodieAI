require('dotenv').config();
const axios = require('axios');

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL = 'gemini-2.5-flash';

console.log('----------------------------------------');
console.log('Testing Gemini Key with Axios...');
console.log('Key:', API_KEY ? (API_KEY.slice(0, 10) + '...') : 'MISSING');

async function test() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

  try {
    const response = await axios.post(url, {
      contents: [{
        parts: [{ text: 'Say OK' }]
      }]
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log(`✅ SUCCESS! Model ${MODEL} replied: "${text?.trim()}"`);
    console.log('Access token is VALID.');
  } catch (err) {
    console.error(`❌ FAILED: ${err.response?.data?.error?.message || err.message}`);
    console.error('Check your API Key and Model Name.');
  }
  console.log('----------------------------------------');
}

test();
