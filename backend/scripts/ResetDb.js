// scripts/resetDb.js
const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, '..', 'db.json');

const defaultData = {
    users: [],
    books: [],
    transactions: [],
    lastItemId: 0
};

fs.writeFile(dbPath, JSON.stringify(defaultData, null, 2), (err) => {
    if (err) {
        console.error('❌ Failed to reset database:', err);
    } else {
        console.log('✅ Database has been reset to default state.');
    }
});
