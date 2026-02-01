require('dotenv').config();
const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem');

async function updatePhotos() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to DB');

        // Update aloo paratha items
        const alooResult = await MenuItem.updateMany(
            { name: 'aloo paratha' },
            { $set: { photoUrl: '/images/aloo-paratha.png' } }
        );
        console.log(`Updated ${alooResult.modifiedCount} aloo paratha items`);

        // Update chicken biryani
        const biryaniResult = await MenuItem.updateMany(
            { name: 'chicken biryani' },
            { $set: { photoUrl: '/images/chicken-biryani.png' } }
        );
        console.log(`Updated ${biryaniResult.modifiedCount} chicken biryani items`);

        // Verify updates
        const items = await MenuItem.find({});
        console.log('\n📸 Menu items with photos:');
        items.forEach(item => {
            console.log(`- ${item.name}: ${item.photoUrl || 'NO PHOTO'}`);
        });

        mongoose.connection.close();
        console.log('\n✅ Done!');
    } catch (err) {
        console.error('❌ Error:', err);
    }
}

updatePhotos();
