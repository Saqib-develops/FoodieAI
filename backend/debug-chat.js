require('dotenv').config();
const mongoose = require('mongoose');
const { callGeminiConversational } = require('./services/geminiClient');
const MenuItem = require('./models/MenuItem');

async function debugChat() {
    try {
        console.log('Connecting to DB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ DB Connected');

        // 1. Fetch Menu
        let menu = await MenuItem.find().lean();
        console.log(`Found ${menu.length} items`);

        if (!menu.length) {
            console.log("Menu is empty");
            return;
        }

        // 2. Prepare Context
        menu = menu.sort((a, b) => ((b.likes || 0) - (b.dislikes || 0)) - ((a.likes || 0) - (a.dislikes || 0)));
        const menuContext = JSON.stringify(
            menu.map(item => ({
                name: item.name,
                price: item.price,
                description: item.description || "",
                score: (item.likes || 0) - (item.dislikes || 0)
            })),
            null,
            2
        );

        const message = "I want something spicy and veg";
        console.log(`\nUser Query: "${message}"`);

        // 3. Prompt
        const prompt = `
You are FoodieAI, a friendly Indian restaurant recommendation buddy 😄

Recommend exactly **3 dishes** from the menu below.
Focus on **high score dishes** — customers like them more.
Avoid low-score dishes unless the user has very limited options.

Return ONLY pure JSON:
[
  {
    "name": "Dish Name",
    "price": 120,
    "description": "very short flavor note",
    "tags": ["veg", "spicy"]
  }
]

Menu (with popularity score):
${menuContext}

User request:
"${message}"
`;

        console.log("\nSending prompt to Gemini...");
        const ai = await callGeminiConversational(prompt);

        console.log("\n----- RAW AI RESPONSE START -----");
        console.log(ai.output);
        console.log("----- RAW AI RESPONSE END -----\n");

        // 4. Parse
        let raw = (ai.output || "").trim();
        raw = raw.replace(/```json/gi, "").replace(/```/g, "").trim();

        try {
            const parsed = JSON.parse(raw);
            console.log("✅ JSON Parse SUCCESS:");
            console.log(JSON.stringify(parsed, null, 2));
        } catch (err) {
            console.error("❌ JSON Parse FAILED!");
            console.error("Cleaned string was:");
            console.log(raw);
            console.error(err.message);
        }

        mongoose.connection.close();

    } catch (err) {
        console.error("Error:", err);
    }
}

debugChat();
