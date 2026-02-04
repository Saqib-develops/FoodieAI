const axios = require('axios');

console.log("🔍 Testing Backend Connection...");
const url = "https://foodieai-backend.onrender.com/api/chat/query";

axios.post(url, { message: "test ping" })
    .then(res => {
        console.log("✅ Success! Backend is ALIVE.");
        console.log("Status:", res.status);
        console.log("Data:", JSON.stringify(res.data, null, 2));
    })
    .catch(err => {
        console.log("❌ Connection Failed");
        if (err.response) {
            console.log("Status:", err.response.status);
            console.log("Status Text:", err.response.statusText);
            console.log("Data:", err.response.data);
        } else {
            console.log("Error:", err.message);
        }
    });
