require('dotenv').config();
const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem');

async function getMenuItems() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to DB');

        const items = await MenuItem.find({});
        console.log(`Found ${items.length} items:\n`);

        items.forEach(item => {
            console.log(`- ${item.name} (₹${item.price})`);
        });

        mongoose.connection.close();
    } catch (err) {
        console.error(err);
    }
}

getMenuItems();
